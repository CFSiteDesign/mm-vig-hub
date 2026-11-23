#!/usr/bin/env python3
"""Voiceover for the hub walkthrough, one WAV per line of video/script.json.

Uses the local Kokoro model from ~/jarvis (no API key, runs offline):
    ~/jarvis/venv/bin/python video/make_vo.py <out_dir>
Writes <out_dir>/<id>.wav and <out_dir>/durations.json.
"""
import json
import sys
from pathlib import Path

import soundfile as sf
from kokoro_onnx import Kokoro

HERE = Path(__file__).resolve().parent
MODELS = Path.home() / "jarvis" / "models"

out = Path(sys.argv[1])
out.mkdir(parents=True, exist_ok=True)
script = json.loads((HERE / "script.json").read_text())
kokoro = Kokoro(str(MODELS / "kokoro-v1.0.onnx"), str(MODELS / "voices-v1.0.bin"))

# "voice" is a Kokoro voice name, or a blend like {"af_heart": 0.5, "bf_alice": 0.5}
voice = script["voice"]
if isinstance(voice, dict):
    voice = sum(weight * kokoro.get_voice_style(name) for name, weight in voice.items())
lang = script.get("lang", "en-gb")

durations = {}
for line in script["lines"]:
    samples, sr = kokoro.create(line["say"], voice=voice, speed=script["speed"], lang=lang)
    sf.write(out / f"{line['id']}.wav", samples, sr, subtype="PCM_16")
    durations[line["id"]] = round(len(samples) / sr, 3)
    print(f"{line['id']:>14}  {durations[line['id']]:5.2f}s  {line['say']}")

(out / "durations.json").write_text(json.dumps({"sample_rate": sr, "durations": durations}, indent=2))
print(f"total speech {sum(durations.values()):.1f}s")
