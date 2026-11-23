import { useRef } from 'react'
import { Play, X } from 'lucide-react'

/* The "how to use the hub" video, pinned at the top of the homepage.
   Tapping the banner opens it full screen with sound. The video and poster live in
   public/ and are made by the scripts in video/ (see the README). */

const VIDEO = `${import.meta.env.BASE_URL}walkthrough.mp4`
const POSTER = `${import.meta.env.BASE_URL}walkthrough-poster.jpg`

export default function Walkthrough() {
  const dialog = useRef<HTMLDialogElement>(null)
  const video = useRef<HTMLVideoElement>(null)

  const open = () => {
    dialog.current?.showModal()
    const v = video.current
    if (v) {
      v.currentTime = 0
      v.play().catch(() => {
        /* autoplay refused: the controls are there to press play */
      })
    }
  }
  const close = () => dialog.current?.close()

  return (
    <>
      <div className="wrap pt-2">
        <button
          type="button"
          onClick={open}
          aria-haspopup="dialog"
          style={{ ['--pop' as string]: '#ccff01' }}
          className="lift group flex w-full items-center gap-4 rounded-2xl border border-pop-lime/60 bg-surface p-3 pr-4 text-left sm:p-4 sm:pr-6"
        >
          <span className="relative h-[88px] w-[41px] shrink-0 overflow-hidden rounded-lg bg-ink">
            <img src={POSTER} alt="" width={540} height={1168} className="h-full w-full object-cover" />
          </span>
          <span className="min-w-0 flex-1">
            <span className="eyebrow block text-pop-lime">New here? Start here</span>
            <span className="mt-1 block text-lg font-black uppercase leading-tight tracking-tight sm:text-xl">
              How to use the hub
            </span>
            <span className="mt-1 block text-sm text-muted">Quick video, under 90 seconds. Sound on.</span>
          </span>
          <span className="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-pop-lime text-ink transition-transform group-hover:scale-105">
            <Play className="ml-0.5 h-5 w-5 fill-current" aria-hidden="true" />
          </span>
        </button>
      </div>

      <dialog
        ref={dialog}
        aria-label="How to use the hub"
        onClose={() => video.current?.pause()}
        onClick={(e) => {
          // tap outside the video to close
          if (e.target === e.currentTarget) close()
        }}
        className="max-h-none max-w-none border-0 bg-transparent p-0 backdrop:bg-ink/90"
      >
        <div className="relative">
          <video
            ref={video}
            src={VIDEO}
            poster={POSTER}
            controls
            playsInline
            preload="none"
            width={780}
            height={1688}
            className="block h-auto max-h-[calc(100dvh-24px)] w-auto max-w-[calc(100vw-24px)] rounded-2xl bg-ink"
          >
            Your browser can't play this video.
          </video>
          <button
            type="button"
            onClick={close}
            aria-label="Close video"
            className="absolute right-2 top-2 grid h-11 w-11 place-items-center rounded-full bg-ink/80 text-cream ring-1 ring-cream/30 transition-colors hover:bg-ink"
          >
            <X className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
      </dialog>
    </>
  )
}
