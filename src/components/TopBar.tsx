import { ChevronLeft } from 'lucide-react'
import logo from '../assets/mm-logo-white.png'

export default function TopBar() {
  return (
    <div className="wrap flex items-center justify-between gap-4 py-4 sm:py-6">
      <a href="#/" className="block shrink-0 rounded-md" aria-label="VIG & GE Hub home">
        <img src={logo} alt="Mad Monkey" width={600} height={181} className="h-8 w-auto sm:h-10" />
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
