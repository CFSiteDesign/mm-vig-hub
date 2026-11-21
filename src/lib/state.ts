import { useCallback, useEffect, useState } from 'react'
import { propertyById } from '../data/hub'

/* Page address: hub/#/koh-rong opens Koh Rong, anything else is the homepage.
   Hash routes work from any folder or sub-path with no server setup. */

const readRoute = () => {
  const hash = window.location.hash
  if (!hash.startsWith('#/')) return null
  const id = decodeURIComponent(hash.slice(2)).replace(/\/$/, '')
  return id && propertyById(id) ? id : null
}

export function useRoute() {
  const [propertyId, setPropertyId] = useState<string | null>(readRoute)

  useEffect(() => {
    const onChange = () => setPropertyId(readRoute())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return propertyId
}

/* "My property": remembered on this phone/laptop only, so a VIG lands on
   their own property shortcut next time. Storage can be blocked (private
   mode), so every read and write is guarded. */

const KEY = 'mm-vig-hub:my-property'

const readMine = () => {
  try {
    const id = window.localStorage.getItem(KEY)
    return id && propertyById(id) ? id : null
  } catch {
    return null
  }
}

export function useMyProperty() {
  const [mine, setMine] = useState<string | null>(readMine)

  const save = useCallback((id: string | null) => {
    setMine(id)
    try {
      if (id) window.localStorage.setItem(KEY, id)
      else window.localStorage.removeItem(KEY)
    } catch {
      /* storage blocked: the choice still holds for this visit */
    }
  }, [])

  return [mine, save] as const
}
