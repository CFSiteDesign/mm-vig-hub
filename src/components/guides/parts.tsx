import { useEffect, useRef, useState, type CSSProperties, type ReactNode } from 'react'
import { ArrowLeft, ArrowUpRight, Check, Copy, Lock } from 'lucide-react'

/* Building blocks shared by the SOP and Playbook pages */

type ShellProps = {
  onBack: () => void
  colour: string
  onColour: string
  eyebrow: string
  title: ReactNode
  intro: ReactNode
  meta?: ReactNode
  original?: { href: string; label: string }
  nav: { id: string; label: string }[]
  children: ReactNode
}

export function GuideShell({ onBack, colour, onColour, eyebrow, title, intro, meta, original, nav, children }: ShellProps) {
  const headingRef = useRef<HTMLHeadingElement>(null)

  // Land keyboard and screen-reader users on the new page
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [])

  return (
    <main className="wrap fade-in pb-16">
      <a
        href="#/"
        onClick={(e) => {
          e.preventDefault()
          onBack()
        }}
        className="inline-flex items-center gap-2 rounded-lg py-2 text-sm font-semibold text-muted transition-colors hover:text-cream"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        Back to the hub
      </a>

      <header className="mt-4 rounded-3xl p-6 sm:p-10" style={{ background: colour, color: onColour }}>
        <p className="eyebrow">{eyebrow}</p>
        <h1 ref={headingRef} tabIndex={-1} className="display mt-3 break-words text-[clamp(40px,10vw,96px)] outline-none">
          {title}
        </h1>
        <div className="mt-5 max-w-2xl text-base font-semibold leading-relaxed sm:text-lg">{intro}</div>
        {(meta || original) && (
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            {meta && <p className="text-sm font-semibold opacity-80">{meta}</p>}
            {original && (
              <a
                href={original.href}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-fit items-center gap-2 rounded-xl bg-ink px-4 py-3 text-sm font-semibold text-cream transition-transform hover:-translate-y-0.5"
              >
                {original.label}
                <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only"> (opens in a new tab)</span>
              </a>
            )}
          </div>
        )}
      </header>

      <nav aria-label="On this page" className="-mx-4 mt-6 overflow-x-auto px-4 sm:mx-0 sm:px-0">
        <ul className="flex w-max gap-2 sm:w-auto sm:flex-wrap">
          {nav.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                onClick={(e) => {
                  // hash links would change the route, so scroll instead
                  e.preventDefault()
                  document.getElementById(n.id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                }}
                className="block whitespace-nowrap rounded-full border border-line px-4 py-2 text-sm font-semibold text-cream transition-colors hover:border-cream"
              >
                {n.label}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      {children}
    </main>
  )
}

export function Section({
  id,
  tag,
  title,
  sub,
  children,
}: {
  id: string
  tag: string
  title: ReactNode
  sub?: ReactNode
  children: ReactNode
}) {
  return (
    <section id={id} aria-labelledby={`${id}-title`} className="scroll-mt-4 border-t border-line pt-10 mt-12 first-of-type:mt-10">
      <p className="inline-flex rounded-full bg-pop-lime px-3 py-1 text-[11px] font-black uppercase tracking-[0.12em] text-ink">
        {tag}
      </p>
      <h2 id={`${id}-title`} className="display mt-4 text-3xl sm:text-5xl">
        {title}
      </h2>
      {sub && <p className="mt-3 max-w-2xl text-muted sm:text-lg">{sub}</p>}
      <div className="mt-8">{children}</div>
    </section>
  )
}

/** A white card, like the template boxes in the deck */
export function Card({ title, children, className = '' }: { title?: ReactNode; children: ReactNode; className?: string }) {
  return (
    <div className={`rounded-2xl border border-line bg-surface p-5 sm:p-6 ${className}`}>
      {title && <h3 className="text-lg font-black uppercase leading-tight tracking-tight">{title}</h3>}
      <div className={title ? 'mt-3' : ''}>{children}</div>
    </div>
  )
}

/** Loud lime banner for the rules that matter most */
export function Callout({ children, tone = 'lime' }: { children: ReactNode; tone?: 'lime' | 'ink' }) {
  const style: CSSProperties =
    tone === 'lime'
      ? { background: '#ccff01', color: '#0a0a0a', boxShadow: '6px 6px 0 0 #f5efe2' }
      : { background: '#0a0a0a', color: '#ccff01', boxShadow: 'inset 0 0 0 2px #ccff01' }
  return (
    <div className="rounded-2xl p-5 text-lg font-black uppercase leading-snug tracking-tight sm:p-6 sm:text-xl" style={style}>
      {children}
    </div>
  )
}

/** Where the login is, never the login itself */
export function LoginNote({ children }: { children: ReactNode }) {
  return (
    <p className="flex gap-2 text-sm leading-relaxed text-cream">
      <Lock className="mt-0.5 h-4 w-4 shrink-0 text-pop-yellow" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}

export function Bullets({ items, tone = 'lime' }: { items: ReactNode[]; tone?: 'lime' | 'pink' }) {
  return (
    <ul className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex gap-3 leading-relaxed">
          <span
            className="mt-2 h-2 w-2 shrink-0 rounded-full"
            style={{ background: tone === 'lime' ? '#ccff01' : '#ff01aa' }}
            aria-hidden="true"
          />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  )
}

/** Numbered steps (these are real steps, so the numbers stay) */
export function Steps({ items }: { items: ReactNode[] }) {
  return (
    <ol className="space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-4 rounded-2xl border border-line bg-surface p-4 sm:p-5">
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-pop-lime text-sm font-black text-ink">
            {i + 1}
          </span>
          <span className="pt-1.5 font-semibold leading-snug">{item}</span>
        </li>
      ))}
    </ol>
  )
}

/** Inline link to another site */
export function Ext({ href, children }: { href: string; children: ReactNode }) {
  if (!href) return <>{children}</>
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="font-semibold text-pop-pink underline decoration-2 underline-offset-4 hover:text-cream"
    >
      {children}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}

/** Inline link to another page in the hub */
export function Internal({ href, children }: { href: string; children: ReactNode }) {
  return (
    <a href={href} className="font-semibold text-pop-pink underline decoration-2 underline-offset-4 hover:text-cream">
      {children}
    </a>
  )
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text)
    return true
  } catch {
    // older phones / non-secure contexts
    const ta = document.createElement('textarea')
    ta.value = text
    ta.setAttribute('readonly', '')
    ta.style.position = 'fixed'
    ta.style.opacity = '0'
    document.body.appendChild(ta)
    ta.select()
    let ok = false
    try {
      ok = document.execCommand('copy')
    } catch {
      ok = false
    }
    ta.remove()
    return ok
  }
}

/** A template ready to paste into WhatsApp */
export function CopyBlock({ label, text }: { label: string; text: string }) {
  const [state, setState] = useState<'idle' | 'copied' | 'failed'>('idle')

  useEffect(() => {
    if (state === 'idle') return
    const t = window.setTimeout(() => setState('idle'), 2000)
    return () => window.clearTimeout(t)
  }, [state])

  return (
    <div className="flex h-full flex-col rounded-2xl bg-cream p-5 text-ink sm:p-6" style={{ boxShadow: '6px 6px 0 0 #ccff01' }}>
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs font-black uppercase tracking-[0.12em]">{label}</p>
        <button
          type="button"
          onClick={async () => setState((await copyText(text)) ? 'copied' : 'failed')}
          className="inline-flex shrink-0 items-center gap-2 rounded-lg bg-ink px-3 py-2 text-xs font-semibold uppercase tracking-[0.1em] text-cream transition-transform hover:-translate-y-0.5"
        >
          {state === 'copied' ? <Check className="h-4 w-4" aria-hidden="true" /> : <Copy className="h-4 w-4" aria-hidden="true" />}
          {state === 'copied' ? 'Copied' : state === 'failed' ? 'Select and copy' : 'Copy'}
        </button>
      </div>
      <pre className="mt-4 flex-1 whitespace-pre-wrap break-words font-sans text-[15px] font-semibold leading-relaxed">{text}</pre>
      <span className="sr-only" aria-live="polite">
        {state === 'copied' ? `${label} copied` : ''}
      </span>
    </div>
  )
}
