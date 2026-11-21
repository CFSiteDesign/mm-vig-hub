import { useEffect, useRef, type CSSProperties, type ReactNode } from 'react'
import { ArrowLeft, ArrowUpRight, CalendarDays, Lock, Sparkles, Star } from 'lucide-react'
import { TOOLS, countryById, instagramHandle, type Property } from '../data/hub'
import { CanvaIcon, InstagramIcon, WhatsAppIcon } from './icons'
import { SharedResourcesCompact } from './SharedResources'

type Props = {
  property: Property
  isMine: boolean
  onToggleMine: () => void
  onBack: () => void
}

export default function PropertyView({ property: p, isMine, onToggleMine, onBack }: Props) {
  const country = countryById(p.country)!
  const headingRef = useRef<HTMLHeadingElement>(null)

  // Move focus to the property name so keyboard and screen-reader users land on the new page
  useEffect(() => {
    headingRef.current?.focus({ preventScroll: true })
  }, [p.id])

  return (
    <main className="wrap fade-in pb-16" key={p.id}>
      <a
        href="#/"
        onClick={(e) => {
          e.preventDefault()
          onBack()
        }}
        className="inline-flex items-center gap-2 rounded-lg py-2 text-sm font-semibold text-muted transition-colors hover:text-cream"
      >
        <ArrowLeft className="h-4 w-4" aria-hidden="true" />
        All properties
      </a>

      <header
        className="mt-4 rounded-3xl p-6 sm:p-10"
        style={{ background: country.colour, color: country.onColour }}
      >
        <p className="eyebrow">Mad Monkey · {country.name}</p>
        <h1
          ref={headingRef}
          tabIndex={-1}
          className="display mt-3 break-words text-[clamp(44px,12vw,104px)] outline-none"
        >
          {p.name}
        </h1>
        <button
          type="button"
          onClick={onToggleMine}
          aria-pressed={isMine}
          className="mt-6 inline-flex items-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors"
          style={
            isMine
              ? { background: 'transparent', color: country.onColour, boxShadow: `inset 0 0 0 2px ${country.onColour}` }
              : { background: '#0a0a0a', color: '#f5efe2' }
          }
        >
          <Star className={`h-4 w-4 ${isMine ? 'fill-current' : ''}`} aria-hidden="true" />
          {isMine ? 'Your property (saved on this device)' : 'Make this my property'}
        </button>
      </header>

      <section aria-labelledby="channels-title" className="mt-10">
        <h2 id="channels-title" className="eyebrow text-muted">
          Guest channels
        </h2>
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <li className="flex">
            <Tile
              href={p.whatsapp}
              colour="#03ff01"
              onColour="#0a0a0a"
              icon={<WhatsAppIcon className="h-6 w-6" />}
              title="WhatsApp Group"
              description={`${p.name} guest WhatsApp group`}
              large
            />
          </li>
          <li className="flex">
            <Tile
              href={p.instagram}
              colour="#ff01aa"
              onColour="#0a0a0a"
              icon={<InstagramIcon className="h-6 w-6" />}
              title="Instagram"
              detail={p.instagram ? instagramHandle(p.instagram) : undefined}
              description={p.instagramNote ?? `${p.name} Instagram account`}
              note="Need the login? Ask your GM or Marketing to share it."
              large
            />
          </li>
        </ul>
      </section>

      <section aria-labelledby="tools-title" className="mt-10">
        <h2 id="tools-title" className="eyebrow text-muted">
          Tools
        </h2>
        <ul className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <li className="flex">
            <Tile
              href={p.experienceDashboard ?? TOOLS.experienceDashboard}
              colour="#ffc000"
              onColour="#0a0a0a"
              icon={<CalendarDays className="h-6 w-6" aria-hidden="true" />}
              title="Experience Dashboard"
              description="Events and tours"
            />
          </li>
          <li className="flex">
            <Tile
              href={p.canva ?? TOOLS.canvaTemplates}
              colour="#00fef3"
              onColour="#0a0a0a"
              icon={<CanvaIcon className="h-6 w-6" />}
              title="Canva"
              description="Canva access and brand templates"
            />
          </li>
          <li className="flex">
            <Tile
              href={p.studio ?? TOOLS.studio}
              colour="#ab00ff"
              onColour="#ffffff"
              icon={<Sparkles className="h-6 w-6" aria-hidden="true" />}
              title="MM Studio"
              description="Make WhatsApp and Instagram Story assets"
            />
          </li>
        </ul>
      </section>

      <SharedResourcesCompact />
    </main>
  )
}

type TileProps = {
  href: string
  colour: string
  onColour: string
  icon: ReactNode
  title: string
  detail?: string
  description: string
  note?: string
  large?: boolean
}

function Tile({ href, colour, onColour, icon, title, detail, description, note, large }: TileProps) {
  const missing = !href

  const content = (
    <>
      <div className="flex items-start justify-between gap-3">
        <span
          className="grid h-12 w-12 place-items-center rounded-xl"
          style={missing ? { background: 'rgba(245,239,226,0.14)', color: 'rgba(245,239,226,0.64)' } : { background: colour, color: onColour }}
        >
          {icon}
        </span>
        {missing ? (
          <span className="rounded-full bg-line px-3 py-1 text-xs font-semibold text-muted">Not added yet</span>
        ) : (
          <ArrowUpRight className="h-5 w-5 text-muted transition-colors group-hover:text-[color:var(--pop)]" aria-hidden="true" />
        )}
      </div>
      <div className={large ? 'mt-8' : 'mt-6'}>
        <h3 className={`font-black uppercase leading-tight tracking-tight ${large ? 'text-2xl sm:text-3xl' : 'text-xl'}`}>
          {title}
        </h3>
        {detail && <p className="mt-1 break-all font-semibold">{detail}</p>}
        <p className="mt-1 text-sm text-muted">{description}</p>
        {note && !missing && (
          <p className="mt-4 flex gap-2 border-t border-line pt-4 text-sm text-cream">
            <Lock className="mt-0.5 h-4 w-4 shrink-0 text-pop-yellow" aria-hidden="true" />
            {note}
          </p>
        )}
      </div>
    </>
  )

  if (missing) {
    return (
      <div className="flex w-full flex-col rounded-2xl border border-dashed border-line p-5 sm:p-6" aria-disabled="true">
        {content}
      </div>
    )
  }

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      style={{ '--pop': colour } as CSSProperties}
      className="lift group flex w-full flex-col rounded-2xl border border-line bg-surface p-5 sm:p-6"
    >
      {content}
      <span className="sr-only"> (opens in a new tab)</span>
    </a>
  )
}
