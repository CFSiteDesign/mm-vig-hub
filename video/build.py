#!/usr/bin/env python3
"""Turns a recording (video/record.mjs) and the voiceover (video/make_vo.py) into the final MP4.

    ~/jarvis/venv/bin/python video/build.py <vo_dir> <rec_dir> <out.mp4> [poster.jpg]

Frames arrive with their own timestamps (Chrome only sends one when the screen changes),
so each frame is held until the next one, then resampled to a steady 30fps. Each voice
clip is placed at the moment its caption appeared.
"""
import json
import subprocess
import sys
from pathlib import Path

import numpy as np
import soundfile as sf

vo_dir, rec_dir, out = Path(sys.argv[1]), Path(sys.argv[2]), Path(sys.argv[3])
poster = Path(sys.argv[4]) if len(sys.argv) > 4 else None
tl = json.loads((rec_dir / "timeline.json").read_text())
start, end = tl["videoStart"], tl["videoEnd"]
length = end - start

# ---- video: hold each frame until the next one ----
frames = tl["frames"]
first = max((i for i, f in enumerate(frames) if f["t"] <= start), default=0)
kept = frames[first:]
lines = []
for i, f in enumerate(kept):
    t0 = max(f["t"], start)
    t1 = min(kept[i + 1]["t"] if i + 1 < len(kept) else end, end)
    if t1 <= t0:
        continue
    lines.append(f"file '{rec_dir / 'frames' / f['file']}'\nduration {t1 - t0:.4f}")
lines.append(f"file '{rec_dir / 'frames' / kept[-1]['file']}'")  # concat demuxer needs the last file twice
(rec_dir / "frames.txt").write_text("\n".join(lines) + "\n")

# ---- audio: every clip at its caption's start ----
meta = json.loads((vo_dir / "durations.json").read_text())
sr = meta["sample_rate"]
mix = np.zeros(int(length * sr) + sr, dtype=np.float32)
for item in tl["lines"]:
    clip, clip_sr = sf.read(vo_dir / f"{item['id']}.wav", dtype="float32")
    assert clip_sr == sr
    at = int((item["start"] - start) * sr)
    mix[at : at + len(clip)] += clip[: len(mix) - at]
mix = mix[: int(length * sr)]
mix *= 0.89 / max(1e-6, float(np.abs(mix).max()))  # peak at about -1 dBFS
sf.write(rec_dir / "voice.wav", mix, sr, subtype="PCM_16")

# ---- encode ----
subprocess.run(
    [
        "ffmpeg", "-loglevel", "error", "-y",
        "-f", "concat", "-safe", "0", "-i", str(rec_dir / "frames.txt"),
        "-i", str(rec_dir / "voice.wav"),
        "-vf", "fps=30,format=yuv420p",
        "-c:v", "libx264", "-preset", "slow", "-crf", "28", "-profile:v", "high", "-tune", "stillimage",
        "-c:a", "aac", "-b:a", "96k", "-ar", "48000",
        "-t", f"{length:.3f}", "-movflags", "+faststart",
        str(out),
    ],
    check=True,
)
if poster:
    subprocess.run(
        ["ffmpeg", "-loglevel", "error", "-y", "-ss", "0.5", "-i", str(out), "-frames:v", "1", "-q:v", "4",
         "-vf", "scale=540:-2", str(poster)],
        check=True,
    )
print(f"{out}  {length:.1f}s  {out.stat().st_size / 1e6:.1f} MB")
