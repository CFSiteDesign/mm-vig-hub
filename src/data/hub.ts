/**
 * EVERY LINK ON THE HUB LIVES IN THIS FILE.
 *
 * To change a link: edit the URL below and redeploy. Nothing else needs to change.
 * To add a property: copy one line in PROPERTIES and change the values.
 * Leave a link as '' (empty) and the page shows "Not added yet" instead of a broken button.
 *
 * Never put a password or login detail in this file. Logins live in the shared
 * password manager; the page only ever says where to get access.
 *
 * The SOP and Playbook text lives in src/components/guides/.
 */

/* ------------------------------------------------------------------ */
/* Tools used by every property                                        */
/* ------------------------------------------------------------------ */

export const TOOLS = {
  // madmonkeyhostels.com / madmonkeygroup.com addresses (vercel.app is blocked on Lao networks)
  experienceDashboard: 'https://madmonkeyhostels.com/experiencedashboard',
  studio: 'https://studio.madmonkeygroup.com',
  canvaTemplates: 'https://www.canva.com/brand/brand-templates',
  /** Named in the Event Comms Playbook, link not supplied yet */
  brandImageLibrary: '',
}

/** The original files, linked from the VIG SOP (Google Drive, anyone with the link can view) */
export const ORIGINALS = {
  vigSop: '', // the SOP came as a Word file; add its Google Doc link here if there is one
  eventCommsPlaybook:
    'https://docs.google.com/presentation/d/1zda_XBfw33ZPGdo-r2z9G9g_BlSelme3/edit?usp=sharing&rtpof=true&sd=true',
  communityManagementSst:
    'https://docs.google.com/spreadsheets/d/1kZ58LoemV9ochqtZphvUpTgwChj0lf4JYI2nCsfbEns/edit?usp=sharing',
}

/** Where every login lives. Shown wherever a tool needs signing in to. */
export const LOGIN_NOTE = 'Logins are in the shared password manager. No access? Ask your GM or Marketing.'

/* ------------------------------------------------------------------ */
/* Guides that open inside the hub (#/sop, #/playbook)                 */
/* ------------------------------------------------------------------ */

export const GUIDE_IDS = ['sop', 'playbook'] as const
export type GuideId = (typeof GUIDE_IDS)[number]
export const isGuideId = (id: string): id is GuideId => (GUIDE_IDS as readonly string[]).includes(id)

/* ------------------------------------------------------------------ */
/* Shared resources & tools (homepage)                                 */
/* ------------------------------------------------------------------ */

export type ResourceKind = 'Guide' | 'Sheet' | 'Tool'

export interface SharedResource {
  id: string
  title: string
  subtitle?: string
  description: string
  kind: ResourceKind
  /** Opens a page inside the hub (same tab) */
  page?: GuideId
  /** Opens an outside link (new tab). Ignored when `page` is set. */
  url: string
  /** Shown as a highlighted badge on the card */
  badge?: string
  /** Extra line under the description (e.g. how to get access) */
  note?: string
}

export const SHARED_RESOURCES: SharedResource[] = [
  {
    id: 'vig-sop',
    title: 'VIG SOP',
    subtitle: 'WhatsApp Groups and Instagram',
    description: 'Daily responsibilities, posting instructions and channel guidelines.',
    kind: 'Guide',
    badge: 'Main source of truth',
    page: 'sop',
    url: ORIGINALS.vigSop,
  },
  {
    id: 'event-comms-playbook',
    title: 'WhatsApp Event Comms Playbook',
    description: 'Messaging examples and guidelines, with templates you can copy.',
    kind: 'Guide',
    page: 'playbook',
    url: ORIGINALS.eventCommsPlaybook,
  },
  {
    id: 'community-management-sst',
    title: 'Community Management SST',
    description: 'Property links, social accounts and access information.',
    kind: 'Sheet',
    note: LOGIN_NOTE,
    url: ORIGINALS.communityManagementSst,
  },
  {
    id: 'experience-dashboard',
    title: 'Experience Dashboard',
    description: 'Daily events and tours.',
    kind: 'Tool',
    url: TOOLS.experienceDashboard,
  },
  {
    id: 'mad-monkey-studio',
    title: 'Mad Monkey Studio',
    description: 'Create assets for WhatsApp and Instagram Stories.',
    kind: 'Tool',
    url: TOOLS.studio,
  },
]

/**
 * Where VIG/GE teams send ideas for the hub (a form, a WhatsApp group, a mailto: link).
 * Leave empty to hide the "Got an idea?" card.
 */
export const SUGGEST_URL = ''

/* ------------------------------------------------------------------ */
/* Countries                                                           */
/* ------------------------------------------------------------------ */

export interface Country {
  id: string
  name: string
  /** Mad Monkey pop colour used for this country's accents */
  colour: string
  /** Text colour that reads on top of `colour` */
  onColour: string
  /** Local time zone of every property in the country (the SOP: post in local time) */
  timeZone: string
}

export const COUNTRIES: Country[] = [
  { id: 'cambodia', name: 'Cambodia', colour: '#ff01aa', onColour: '#0a0a0a', timeZone: 'Asia/Phnom_Penh' },
  // Bali, Lombok and the Gilis are all on Central Indonesia time (WITA, UTC+8)
  { id: 'indonesia', name: 'Indonesia', colour: '#00fef3', onColour: '#0a0a0a', timeZone: 'Asia/Makassar' },
  { id: 'laos', name: 'Laos', colour: '#ccff01', onColour: '#0a0a0a', timeZone: 'Asia/Vientiane' },
  { id: 'philippines', name: 'Philippines', colour: '#ffc000', onColour: '#0a0a0a', timeZone: 'Asia/Manila' },
  { id: 'thailand', name: 'Thailand', colour: '#ff6600', onColour: '#0a0a0a', timeZone: 'Asia/Bangkok' },
  { id: 'vietnam', name: 'Vietnam', colour: '#ab00ff', onColour: '#ffffff', timeZone: 'Asia/Ho_Chi_Minh' },
]

/* ------------------------------------------------------------------ */
/* Properties                                                          */
/* ------------------------------------------------------------------ */

export interface Property {
  /** Used in the page address: hub/#/koh-rong */
  id: string
  name: string
  country: string
  /** Guest WhatsApp group invite link */
  whatsapp: string
  /** Property Instagram account */
  instagram: string
  /** Property TikTok account (for reference; Stories go on Instagram) */
  tiktok?: string
  /** Optional: overrides the shared tool links for this property */
  canva?: string
  studio?: string
  experienceDashboard?: string
  /** Optional: small note shown on the Instagram tile */
  instagramNote?: string
}

/*
 * WhatsApp, Instagram and TikTok come from the Community Management SST (v1.0, 17 Nov 2026).
 * Not in the SST, kept from the hostel QR link hub (mm-linktree): Kampot, and Siquijor's
 * WhatsApp group (the SST says MISSING, the link works). Every WhatsApp link checked 23 Nov 2026.
 */
export const PROPERTIES: Property[] = [
  // Cambodia
  { id: 'kampot', name: 'Kampot', country: 'cambodia', whatsapp: '', instagram: 'https://www.instagram.com/madmonkeyhostels/', instagramNote: 'Uses the main Mad Monkey account' },
  { id: 'koh-rong', name: 'Koh Rong', country: 'cambodia', whatsapp: 'https://chat.whatsapp.com/JeLfnmqOC5vEkU1JzOxerU', instagram: 'https://www.instagram.com/madmonkeykohrong/', tiktok: 'https://www.tiktok.com/@madmonkeykohrong_' },
  { id: 'koh-sdach', name: 'Koh Sdach', country: 'cambodia', whatsapp: 'https://chat.whatsapp.com/KcCxhxFGWISBS8qL6ZQ3Gw', instagram: 'https://www.instagram.com/madmonkeykohsdach/', tiktok: 'https://www.tiktok.com/@madmonkeykohsdach' },
  { id: 'phnom-penh', name: 'Phnom Penh', country: 'cambodia', whatsapp: 'https://chat.whatsapp.com/ISFzdY6OEfPEnfhG6N8Jsa', instagram: 'https://www.instagram.com/madmonkeyphnompenh/', tiktok: 'https://www.tiktok.com/@madmonkey.phnompenh' },
  { id: 'siem-reap', name: 'Siem Reap', country: 'cambodia', whatsapp: 'https://chat.whatsapp.com/BYBQOX249Ok3kCmtQEbLo4', instagram: 'https://www.instagram.com/madmonkeysiemreap_/', tiktok: 'https://www.tiktok.com/@mad.monkey.siem.r' },

  // Indonesia
  { id: 'gili-trawangan', name: 'Gili Trawangan', country: 'indonesia', whatsapp: '', instagram: 'https://www.instagram.com/madmonkeygilitrawangan/', tiktok: 'https://www.tiktok.com/@mad.monkey.gili.t' },
  { id: 'kuta-lombok', name: 'Kuta Lombok', country: 'indonesia', whatsapp: 'https://chat.whatsapp.com/FuOjWvlRMwBFFyoB0mKYDk', instagram: 'https://www.instagram.com/madmonkeykutalombok/' },
  { id: 'nusa-lembongan', name: 'Nusa Lembongan', country: 'indonesia', whatsapp: 'https://chat.whatsapp.com/JT3T3XicKmTLaKKYM0yu7q', instagram: 'https://www.instagram.com/madmonkeynusalembongan/' },
  { id: 'uluwatu', name: 'Uluwatu', country: 'indonesia', whatsapp: 'https://chat.whatsapp.com/Ke4ZrqDQGnFEXMNNlkuJsT', instagram: 'https://www.instagram.com/madmonkeyuluwatu/', tiktok: 'https://www.tiktok.com/@madmonkeyuluwatu' },

  // Laos
  { id: 'luang-prabang', name: 'Luang Prabang', country: 'laos', whatsapp: 'https://chat.whatsapp.com/J5cf5xgxZ3gIjucZ6nqCGE', instagram: 'https://www.instagram.com/madmonkeyluangprabang/', tiktok: 'https://www.tiktok.com/@madmonkeyluangprabang' },
  { id: 'vang-vieng', name: 'Vang Vieng', country: 'laos', whatsapp: 'https://chat.whatsapp.com/DZFiLDqP3zuJIxxnnhnF7l', instagram: 'https://www.instagram.com/madmonkeyvangvieng/', tiktok: 'https://www.tiktok.com/@madmonkeyvangvieng' },

  // Philippines
  { id: 'dumaguete', name: 'Dumaguete', country: 'philippines', whatsapp: '', instagram: 'https://www.instagram.com/madmonkey_dumaguete/', tiktok: 'https://www.tiktok.com/@madmonkeydumaguete' },
  { id: 'manila', name: 'Manila', country: 'philippines', whatsapp: 'https://chat.whatsapp.com/Jk0b6DoNRhKFceoIBZLj3h', instagram: 'https://www.instagram.com/madmonkeymanila/', tiktok: 'https://www.tiktok.com/@madmonkeycafe_manila' },
  { id: 'nacpan-beach', name: 'Nacpan Beach', country: 'philippines', whatsapp: 'https://chat.whatsapp.com/LcOhfBqA1VF1HxB6ldGHD1', instagram: 'https://www.instagram.com/madmonkey_nacpanbeach/', tiktok: 'https://www.tiktok.com/@madmonkey_nacpanbeach' },
  { id: 'panglao', name: 'Panglao', country: 'philippines', whatsapp: 'https://chat.whatsapp.com/BajoBLC3zsb0c7cfJj68Fl', instagram: 'https://www.instagram.com/madmonkeypanglao/', tiktok: 'https://www.tiktok.com/@madmonkeypanglao' },
  { id: 'siargao', name: 'Siargao', country: 'philippines', whatsapp: 'https://chat.whatsapp.com/BBLy7mC93WcBXD1pP6MYZU', instagram: 'https://www.instagram.com/mad_monkey_siargao/', tiktok: 'https://www.tiktok.com/@mad.monkey.siargao' },
  { id: 'siquijor', name: 'Siquijor', country: 'philippines', whatsapp: 'https://chat.whatsapp.com/H1SOs5oB6BuFpKcdeeS76p', instagram: 'https://www.instagram.com/_madmonkeysiquijor/', tiktok: 'https://www.tiktok.com/@madmonkeysiquijor' },

  // Thailand
  { id: 'bangkok', name: 'Bangkok', country: 'thailand', whatsapp: 'https://chat.whatsapp.com/Ep53YVu6knrDcdamdQuloD', instagram: 'https://www.instagram.com/madmonkeybangkok/', tiktok: 'https://www.tiktok.com/@madmonkeybangkok' },
  { id: 'chiang-mai', name: 'Chiang Mai', country: 'thailand', whatsapp: 'https://chat.whatsapp.com/IeqDN7Ayk5XCunHVNydDmm', instagram: 'https://www.instagram.com/madmonkeychiangmai/', tiktok: 'https://www.tiktok.com/@madmonkeychiangmai' },
  { id: 'pai', name: 'Pai', country: 'thailand', whatsapp: 'https://chat.whatsapp.com/J41C9AvnB2P1HaB4ZgFyda', instagram: 'https://www.instagram.com/madmonkey_pai/', tiktok: 'https://www.tiktok.com/@madmonkeyhostelspai' },
  { id: 'phuket', name: 'Phuket', country: 'thailand', whatsapp: 'https://chat.whatsapp.com/GxO9aCHS8jrCpEXXcSDwdt', instagram: 'https://www.instagram.com/madmonkeyphuket/' },

  // Vietnam
  { id: 'hanoi', name: 'Hanoi', country: 'vietnam', whatsapp: 'https://chat.whatsapp.com/DpI7WUmVDizAfacDxXwzmw', instagram: 'https://www.instagram.com/madmonkeyhanoi/', tiktok: 'https://www.tiktok.com/@madmonkeyhanoi' },
  { id: 'hoi-an', name: 'Hoi An', country: 'vietnam', whatsapp: 'https://chat.whatsapp.com/LR00FjfBvZw9PWpA8v2N5L', instagram: 'https://www.instagram.com/madmonkeyhoian/', tiktok: 'https://www.tiktok.com/@madmonkeyhoian' },
]

/* ------------------------------------------------------------------ */
/* Helpers                                                             */
/* ------------------------------------------------------------------ */

export const countryById = (id: string) => COUNTRIES.find((c) => c.id === id)

export const propertyById = (id: string) => PROPERTIES.find((p) => p.id === id)

export const propertiesIn = (countryId: string) =>
  PROPERTIES.filter((p) => p.country === countryId).sort((a, b) => a.name.localeCompare(b.name))

/** "https://www.instagram.com/madmonkeyhanoi/" -> "@madmonkeyhanoi" */
export const instagramHandle = (url: string) => {
  const m = url.match(/instagram\.com\/([^/?#]+)/i)
  return m ? `@${m[1]}` : ''
}

/** "https://www.tiktok.com/@madmonkeyhanoi" -> "@madmonkeyhanoi" */
export const tiktokHandle = (url: string) => {
  const m = url.match(/tiktok\.com\/(@[^/?#]+)/i)
  return m ? m[1] : ''
}
