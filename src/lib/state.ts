import { useCallback, useEffect, useState } from 'react'
import { isGuideId, propertyById } from '../data/hub'

/* Page address: hub/#/koh-rong opens Koh Rong, hub/#/sop and hub/#/playbook open the
   guides, anything else is the homepage. Hash routes work from any folder or sub-path
   with no server setup. */

const readRoute = () => {
  const hash = window.location.hash
  if (!hash.startsWith('#/')) return null
  const id = decodeURIComponent(hash.slice(2)).replace(/\/$/, '')
  return id && (propertyById(id) || isGuideId(id)) ? id : null
}

export function useRoute() {
  const [route, setRoute] = useState<string | null>(readRoute)

  useEffect(() => {
    const onChange = () => setRoute(readRoute())
    window.addEventListener('hashchange', onChange)
    return () => window.removeEventListener('hashchange', onChange)
  }, [])

  return route
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

/** The current time, ticking every 30 seconds (for "local time" labels) */
export function useNow(intervalMs = 30_000) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const t = window.setInterval(() => setNow(new Date()), intervalMs)
    return () => window.clearInterval(t)
  }, [intervalMs])
  return now
}

const timeFormatters = new Map<string, Intl.DateTimeFormat>()

/** "Mon 3:42 PM" in the given time zone */
export function localTime(date: Date, timeZone: string) {
  let f = timeFormatters.get(timeZone)
  if (!f) {
    f = new Intl.DateTimeFormat('en-US', { timeZone, weekday: 'short', hour: 'numeric', minute: '2-digit' })
    timeFormatters.set(timeZone, f)
  }
  return f.format(date).replace(',', '')
}
