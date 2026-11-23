import type { CSSProperties } from 'react'
import { ArrowRight, ArrowUpRight, BookOpen, FolderOpen, LayoutDashboard, Lock, Sheet } from 'lucide-react'
import { SHARED_RESOURCES, type ResourceKind, type SharedResource } from '../data/hub'

const KIND: Record<ResourceKind, { label: string; Icon: typeof BookOpen }> = {
  Guide: { label: 'Guide', Icon: BookOpen },
  Sheet: { label: 'Sheet', Icon: Sheet },
  Folder: { label: 'Folder', Icon: FolderOpen },
  Tool: { label: 'Tool', Icon: LayoutDashboard },
}

const BLUE = { '--pop': '#0081f7' } as CSSProperties

/** Where a resource goes: a page inside the hub, an outside link, or nowhere yet */
const target = (r: SharedResource) =>
  r.page ? { href: `#/${r.page}`, external: false } : r.url ? { href: r.url, external: true } : null

const externalProps = { target: '_blank', rel: 'noopener noreferrer' } as const

export default function SharedResources() {
  return (
    <section id="shared" aria-labelledby="shared-title" className="wrap scroll-mt-4 py-12 sm:py-16">
      <h2 id="shared-title" className="display text-4xl sm:text-5xl">
        Shared resources
        <span className="text-pop-blue"> &amp; tools</span>
      </h2>
      <p className="mt-3 text-muted">The same for every property.</p>

      <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {SHARED_RESOURCES.map((r) => (
          <li key={r.id} className="flex">
            <ResourceCard resource={r} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function ResourceCard({ resource: r }: { resource: SharedResource }) {
  const { label, Icon } = KIND[r.kind]
  const to = target(r)

  const body = (
    <>
      <div className="flex items-center justify-between gap-3">
        <span className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted">
          <Icon className="h-3.5 w-3.5" aria-hidden="true" />
          {label}
        </span>
        {!to ? (
          <span className="rounded-full bg-line px-3 py-1 text-xs font-semibold text-muted">Link coming soon</span>
        ) : to.external ? (
          <ArrowUpRight className="h-5 w-5 text-muted transition-colors group-hover:text-pop-blue" aria-hidden="true" />
        ) : (
          <span className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-[0.12em] text-muted transition-colors group-hover:text-pop-blue">
            Read here
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </span>
        )}
      </div>

      {r.badge && (
        <span className="mt-5 inline-flex w-fit rounded-md bg-pop-yellow px-2 py-1 text-[11px] font-black uppercase tracking-[0.1em] text-ink">
          {r.badge}
        </span>
      )}

      <h3 className={`text-xl font-black uppercase leading-tight tracking-tight ${r.badge ? 'mt-3' : 'mt-5'}`}>
        {r.title}
      </h3>
      {r.subtitle && <p className="mt-1 font-semibold">{r.subtitle}</p>}
      <p className="mt-2 text-sm leading-relaxed text-muted">{r.description}</p>

      {r.note && (
        <p className="mt-4 flex gap-2 border-t border-line pt-4 text-sm leading-relaxed text-cream">
          <Lock className="mt-0.5 h-4 w-4 shrink-0 text-pop-yellow" aria-hidden="true" />
          {r.note}
        </p>
      )}
    </>
  )

  if (!to) {
    return (
      <div className="flex w-full flex-col rounded-2xl border border-dashed border-line p-5 sm:p-6" aria-disabled="true">
        {body}
      </div>
    )
  }

  return (
    <a
      id={r.page ? `res-${r.page}` : undefined}
      href={to.href}
      {...(to.external ? externalProps : {})}
      style={BLUE}
      className="lift group flex w-full flex-col rounded-2xl border border-line bg-surface p-5 sm:p-6"
    >
      {body}
      {to.external && <span className="sr-only"> (opens in a new tab)</span>}
    </a>
  )
}

/** Compact version for the bottom of each property and guide page */
export function SharedResourcesCompact({ exclude }: { exclude?: string } = {}) {
  const items = SHARED_RESOURCES.filter((r) => r.id !== exclude)
  return (
    <section aria-labelledby="shared-compact-title" className="mt-12">
      <h2 id="shared-compact-title" className="eyebrow text-muted">
        Shared resources &amp; tools
      </h2>
      <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line">
        {items.map((r) => {
          const { Icon } = KIND[r.kind]
          const to = target(r)
          const inner = (
            <>
              <Icon className="h-5 w-5 shrink-0 text-muted" aria-hidden="true" />
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{r.title}</span>
                <span className="block truncate text-sm text-muted">{r.subtitle ?? r.description}</span>
              </span>
              {!to ? (
                <span className="shrink-0 text-xs font-semibold text-muted">Coming soon</span>
              ) : to.external ? (
                <ArrowUpRight className="h-5 w-5 shrink-0 text-muted group-hover:text-pop-blue" aria-hidden="true" />
              ) : (
                <ArrowRight className="h-5 w-5 shrink-0 text-muted group-hover:text-pop-blue" aria-hidden="true" />
              )}
            </>
          )
          return (
            <li key={r.id}>
              {to ? (
                <a
                  href={to.href}
                  {...(to.external ? externalProps : {})}
                  className="group flex items-center gap-4 bg-surface px-4 py-4 transition-colors hover:bg-ink sm:px-5"
                >
                  {inner}
                  {to.external && <span className="sr-only"> (opens in a new tab)</span>}
                </a>
              ) : (
                <div className="flex items-center gap-4 px-4 py-4 sm:px-5" aria-disabled="true">
                  {inner}
                </div>
              )}
            </li>
          )
        })}
      </ul>
    </section>
  )
}
