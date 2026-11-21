import { useMemo, useState, type CSSProperties } from 'react'
import { ArrowRight, ChevronDown, Search, Star, X } from 'lucide-react'
import { COUNTRIES, propertiesIn, type Country, type Property } from '../data/hub'

const COUNTRY_CODES: Record<string, string> = {
  cambodia: 'KH',
  indonesia: 'ID',
  laos: 'LA',
  philippines: 'PH',
  thailand: 'TH',
  vietnam: 'VN',
}

type Props = {
  expanded: Set<string>
  onToggle: (countryId: string) => void
  myProperty: string | null
}

export default function Directory({ expanded, onToggle, myProperty }: Props) {
  const [query, setQuery] = useState('')
  const q = query.trim().toLowerCase()

  const groups = useMemo(
    () =>
      COUNTRIES.map((country) => {
        const all = propertiesIn(country.id)
        const matches = q
          ? all.filter((p) => p.name.toLowerCase().includes(q) || country.name.toLowerCase().includes(q))
          : all
        return { country, all, matches }
      }).filter((g) => g.matches.length > 0),
    [q],
  )

  return (
    <section id="find" aria-labelledby="find-title" className="wrap scroll-mt-4 py-12 sm:py-16">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 id="find-title" className="display text-4xl sm:text-5xl">
            Find your property
          </h2>
          <p className="mt-3 text-muted">Pick your country, then your property.</p>
        </div>

        <label className="relative block w-full sm:max-w-xs">
          <span className="sr-only">Search properties</span>
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted" aria-hidden="true" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
            placeholder="Search properties"
            className="w-full rounded-xl border border-line bg-surface py-3 pl-12 pr-12 text-cream placeholder:text-muted focus:border-pop-blue focus:outline-none [&::-webkit-search-cancel-button]:hidden"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              className="absolute right-2 top-1/2 grid h-8 w-8 -translate-y-1/2 place-items-center rounded-lg text-muted hover:text-cream"
              aria-label="Clear search"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          )}
        </label>
      </div>

      <ul className="mt-8 flex flex-col gap-3">
        {groups.map(({ country, all, matches }) => (
          <CountryRow
            key={country.id}
            country={country}
            total={all.length}
            properties={matches}
            open={q ? true : expanded.has(country.id)}
            onToggle={() => onToggle(country.id)}
            searching={Boolean(q)}
            myProperty={myProperty}
          />
        ))}
      </ul>

      {groups.length === 0 && (
        <p className="mt-8 rounded-xl border border-dashed border-line px-4 py-6 text-center text-muted">
          No property matches “{query.trim()}”.
        </p>
      )}
    </section>
  )
}

type RowProps = {
  country: Country
  total: number
  properties: Property[]
  open: boolean
  onToggle: () => void
  searching: boolean
  myProperty: string | null
}

function CountryRow({ country, total, properties, open, onToggle, searching, myProperty }: RowProps) {
  const panelId = `country-${country.id}`
  const style = { '--pop': country.colour, '--on-pop': country.onColour } as CSSProperties

  return (
    <li style={style}>
      <button
        type="button"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={onToggle}
        disabled={searching}
        className={`flex w-full items-center gap-4 rounded-2xl border bg-surface px-4 py-4 text-left transition-[border-color,box-shadow] duration-200 sm:px-6 sm:py-5 ${
          open
            ? 'border-[color:var(--pop)] shadow-[4px_4px_0_0_var(--pop)]'
            : 'border-line hover:border-[color:var(--pop)]'
        }`}
      >
        <span
          className="grid h-11 w-11 shrink-0 place-items-center rounded-xl text-sm font-black tracking-wide sm:h-12 sm:w-12"
          style={{ background: country.colour, color: country.onColour }}
          aria-hidden="true"
        >
          {COUNTRY_CODES[country.id]}
        </span>
        <span className="min-w-0 flex-1">
          <span className="display block text-2xl sm:text-3xl">{country.name}</span>
          <span className="mt-1 block text-sm text-muted">
            {total} {total === 1 ? 'property' : 'properties'}
          </span>
        </span>
        {!searching && (
          <span
            className={`grid h-10 w-10 shrink-0 place-items-center rounded-full border transition-[transform,background-color,border-color,color] duration-200 ${
              open ? 'rotate-180 border-[color:var(--pop)] bg-[color:var(--pop)] text-[color:var(--on-pop)]' : 'border-line text-cream'
            }`}
            aria-hidden="true"
          >
            <ChevronDown className="h-5 w-5" />
          </span>
        )}
      </button>

      <div id={panelId} className="collapse-grid" data-open={open} inert={!open}>
        <div>
          <ul className="grid grid-cols-1 gap-2 pb-2 pt-3 min-[400px]:grid-cols-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-4">
            {properties.map((p) => (
              <li key={p.id}>
                <a
                  id={`prop-${p.id}`}
                  href={`#/${p.id}`}
                  className="group flex min-h-14 items-center justify-between gap-3 rounded-xl border border-line bg-ink px-4 py-3 font-semibold transition-colors duration-150 hover:border-[color:var(--pop)] hover:bg-[color:var(--pop)] hover:text-[color:var(--on-pop)] focus-visible:border-[color:var(--pop)]"
                >
                  <span className="flex min-w-0 items-center gap-2">
                    <span className="truncate">{p.name}</span>
                    {myProperty === p.id && (
                      <Star className="h-4 w-4 shrink-0 fill-current" aria-label="Your property" />
                    )}
                  </span>
                  <ArrowRight
                    className="h-4 w-4 shrink-0 transition-transform duration-150 group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  )
}
