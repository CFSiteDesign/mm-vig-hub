import { ChevronLeft } from 'lucide-react'
import badge from '../assets/mm-badge.png'

export default function TopBar() {
  return (
    <div className="wrap flex items-center justify-between gap-4 py-4 sm:py-6">
      <a href="#/" className="block shrink-0 rounded-md" aria-label="VIG & GE Hub home">
        <img src={badge} alt="Mad Monkey Hostels" width={257} height={256} className="h-14 w-14 sm:h-16 sm:w-16" />
      </a>
      <a
        href="https://madmonkeyhostels.com"
        className="inline-flex items-center gap-1 rounded-lg border border-cream/40 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-cream transition-colors hover:border-cream hover:bg-cream hover:text-ink"
      >
        <ChevronLeft className="h-4 w-4" aria-hidden="true" />
        Homepage
      </a>
    </div>
  )
}
