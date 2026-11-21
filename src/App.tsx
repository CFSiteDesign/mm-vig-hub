import { useCallback, useEffect, useRef, useState } from 'react'
import { propertyById } from './data/hub'
import { useMyProperty, useRoute } from './lib/state'
import TopBar from './components/TopBar'
import Home from './components/Home'
import PropertyView from './components/PropertyView'
import logo from './assets/mm-logo-white.png'

export default function App() {
  const propertyId = useRoute()
  const property = propertyId ? propertyById(propertyId) : undefined
  const [myProperty, setMyProperty] = useMyProperty()

  // Open countries survive a trip into a property and back
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set())
  const [returnTo, setReturnTo] = useState<string | null>(null)
  const cameFromHome = useRef(false)
  // undefined = first render, null = homepage, string = a property
  const prevRoute = useRef<string | null | undefined>(undefined)

  useEffect(() => {
    const prev = prevRoute.current
    prevRoute.current = property?.id ?? null
    if (property) {
      // make sure its country is open when the visitor comes back
      setExpanded((s) => (s.has(property.country) ? s : new Set(s).add(property.country)))
      cameFromHome.current = prev === null
      setReturnTo(null)
      window.scrollTo({ top: 0, behavior: 'instant' })
      document.title = `${property.name} · Mad Monkey VIG & GE Hub`
    } else {
      setReturnTo(prev ?? null)
      document.title = 'Mad Monkey VIG & GE Hub'
    }
  }, [property])

  const toggleCountry = useCallback((id: string) => {
    setExpanded((prev) => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }, [])

  // "All properties": step back if they came from the directory (keeps browser history tidy)
  const goHome = useCallback(() => {
    if (cameFromHome.current) window.history.back()
    else window.location.hash = '/'
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      <TopBar />

      <div className="flex-1">
        {property ? (
          <PropertyView
            property={property}
            isMine={myProperty === property.id}
            onToggleMine={() => setMyProperty(myProperty === property.id ? null : property.id)}
            onBack={goHome}
          />
        ) : (
          <Home expanded={expanded} onToggle={toggleCountry} myProperty={myProperty} returnTo={returnTo} />
        )}
      </div>

      <footer className="border-t border-line">
        <div className="wrap flex flex-col gap-4 py-8 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <img src={logo} alt="" width={600} height={181} className="h-7 w-auto" />
            <span className="font-semibold text-cream">One link, everything you need to do the job.</span>
          </div>
          <p>Logins are never shown here. Ask your GM or Marketing for access.</p>
        </div>
      </footer>
    </div>
  )
}
