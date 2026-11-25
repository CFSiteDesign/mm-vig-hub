import { useEffect } from 'react'
import { ArrowRight, Lightbulb, Star } from 'lucide-react'
import { COUNTRIES, SUGGEST_URL, countryById, propertyById } from '../data/hub'
import Directory from './Directory'
import SharedResources from './SharedResources'
import Walkthrough from './Walkthrough'
import badge from '../assets/mm-badge-lg.webp'

type Props = {
  expanded: Set<string>
  onToggle: (countryId: string) => void
  myProperty: string | null
  /** Property the visitor just came back from, to put them back where they were */
  returnTo: string | null
}

const scrollTo = (id: string) => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' })

export default function Home({ expanded, onToggle, myProperty, returnTo }: Props) {
  const mine = myProperty ? propertyById(myProperty) : undefined
  const mineCountry = mine ? countryById(mine.country) : undefined

  useEffect(() => {
    if (!returnTo) return
    // a property link in the directory, or a guide card in shared resources
    const el = document.getElementById(`prop-${returnTo}`) ?? document.getElementById(`res-${returnTo}`)
    if (el) {
      el.scrollIntoView({ block: 'center', behavior: 'instant' })
      el.focus({ preventScroll: true })
    }
  }, [returnTo])

  return (
    <main className="fade-in">
      <Walkthrough />

      <header className="wrap relative pb-12 pt-8 sm:pb-16 sm:pt-12">
        <img
          src={badge}
          alt=""
          width={802}
          height={800}
          className="pointer-events-none absolute right-6 top-12 hidden w-[340px] -rotate-6 select-none xl:block"
        />
        <h1 className="relative">
          <span className="eyebrow block text-pop-yellow">Mad Monkey</span>
          <span className="display mt-4 block text-[clamp(48px,13vw,136px)]">
            VIG &amp; GE
            <br />
            Hub
          </span>
        </h1>
        <p className="mt-6 max-w-xl text-lg leading-relaxed text-cream sm:text-xl">
          Everything you need to manage guest communications, promote experiences and keep the Mad Monkey
          community connected.
        </p>

        <div className="mt-8 flex flex-col gap-3 min-[400px]:flex-row">
          <button
            type="button"
            onClick={() => scrollTo('find')}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-cream px-5 py-4 font-semibold text-ink transition-transform hover:-translate-y-0.5"
          >
            Find your property
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
          <button
            type="button"
            onClick={() => scrollTo('shared')}
            className="inline-flex items-center justify-center gap-2 rounded-xl border border-cream/40 px-5 py-4 font-semibold text-cream transition-colors hover:border-cream"
          >
            Shared resources &amp; tools
          </button>
        </div>

        {/* one block per country, in the same colours as the directory */}
        <div className="mt-12 flex h-3 overflow-hidden rounded-full" aria-hidden="true">
          {COUNTRIES.map((c) => (
            <span key={c.id} className="flex-1" style={{ background: c.colour }} />
          ))}
        </div>
      </header>

      {mine && mineCountry && (
        <div className="wrap">
          <a
            href={`#/${mine.id}`}
            className="group flex items-center gap-4 rounded-2xl p-5 transition-transform hover:-translate-y-0.5 sm:p-6"
            style={{ background: mineCountry.colour, color: mineCountry.onColour }}
          >
            <Star className="h-6 w-6 shrink-0 fill-current" aria-hidden="true" />
            <span className="min-w-0 flex-1">
              <span className="eyebrow block">Your property</span>
              <span className="display mt-1 block truncate text-3xl sm:text-4xl">{mine.name}</span>
            </span>
            <ArrowRight className="h-6 w-6 shrink-0 transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>
      )}

      <Directory expanded={expanded} onToggle={onToggle} myProperty={myProperty} />

      <SharedResources />

      {SUGGEST_URL && (
        <div className="wrap pb-12">
          <a
            href={SUGGEST_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="lift flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 sm:p-6"
            style={{ ['--pop' as string]: '#ccff01' }}
          >
            <Lightbulb className="h-6 w-6 shrink-0 text-pop-lime" aria-hidden="true" />
            <span className="flex-1">
              <span className="block font-black uppercase tracking-tight">Got an idea for the hub?</span>
              <span className="block text-sm text-muted">Tell us what links or info would help you.</span>
            </span>
            <ArrowRight className="h-5 w-5 shrink-0" aria-hidden="true" />
          </a>
        </div>
      )}
    </main>
  )
}
