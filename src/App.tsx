import { useCallback, useEffect, useRef, useState } from 'react'
import { LOGIN_NOTE, isGuideId, propertyById } from './data/hub'
import { useMyProperty, useRoute } from './lib/state'
import TopBar from './components/TopBar'
import Home from './components/Home'
import PropertyView from './components/PropertyView'
import SopPage from './components/guides/SopPage'
import PlaybookPage from './components/guides/PlaybookPage'
import badge from './assets/mm-badge.png'

const GUIDE_TITLES = { sop: 'VIG SOP', playbook: 'WhatsApp Event Comms Playbook' }

export default function App() {
  const route = useRoute()
  const property = route ? propertyById(route) : undefined
  const guide = route && isGuideId(route) ? route : null
  const page = property?.id ?? guide
  const [myProperty, setMyProperty] = useMyProperty()

  // Open countries survive a trip into a property and back
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set())
  const [returnTo, setReturnTo] = useState<string | null>(null)
  const cameFromHome = useRef(false)
  // undefined = first render, null = homepage, string = a property or guide
  const prevRoute = useRef<string | null | undefined>(undefined)

  useEffect(() => {
    const prev = prevRoute.current
    prevRoute.current = page ?? null
    if (page) {
      // make sure the property's country is open when the visitor comes back
      if (property) setExpanded((s) => (s.has(property.country) ? s : new Set(s).add(property.country)))
      cameFromHome.current = prev === null
      setReturnTo(null)
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.title = `${property ? property.name : GUIDE_TITLES[guide!]} · Mad Monkey VIG & GE Hub`
    } else {
      setReturnTo(prev ?? null)
      document.title = 'Mad Monkey VIG & GE Hub'
    }
  }, [page, property, guide])

  const toggleCountry = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  // Back links: step back if they came from the homepage (keeps browser history tidy)
  const goHome = useCallback(() => {
    if (cameFromHome.current) window.history.back()
    else window.location.hash = '/'
  }, [])

  let content
  if (property) {
    content = (
      <PropertyView
        property={property}
        isMine={myProperty === property.id}
        onToggleMine={() => setMyProperty(myProperty === property.id ? null : property.id)}
        onBack={goHome}
      />
    )
  } else if (guide === 'sop') {
    content = <SopPage onBack={goHome} />
  } else if (guide === 'playbook') {
    content = <PlaybookPage onBack={goHome} />
  } else {
    content = <Home expanded={expanded} onToggle={toggleCountry} myProperty={myProperty} returnTo={returnTo} />
  }

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />

      <div className="flex-1">{content}</div>

      <footer className="border-t border-line">
        <div className="wrap flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img src={badge} alt="" width={257} height={256} className="h-10 w-10" />
            <span className="font-semibold text-cream">One link, everything you need to do the job.</span>
          </div>
          <p className="sm:max-w-sm sm:text-right">{LOGIN_NOTE}</p>
        </div>
      </footer>
    </div>
  )
}
