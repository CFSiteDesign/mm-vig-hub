import { useState } from 'react'
import { Check, RotateCcw } from 'lucide-react'
import { ORIGINALS, TOOLS } from '../../data/hub'
import { SharedResourcesCompact } from '../SharedResources'
import { Bullets, Callout, Card, CopyBlock, Ext, GuideShell, Section, Steps } from './parts'

/*
 * WhatsApp Event Comms Playbook
 * Source: "WhatsApp Event Comms Playbook.pptx" (16 slides). The "Real life examples" slide is
 * left out on purpose: its screenshots show guests' phone numbers. It is still in the original.
 * Dashes in the deck's templates are swapped for hyphens (the SOP says no em dashes).
 */

const NAV = [
  { id: 'standard', label: 'The standard' },
  { id: 'before', label: 'Before you post' },
  { id: 'assets', label: 'Assets' },
  { id: 'voice', label: 'Voice' },
  { id: 'formula', label: 'The formula' },
  { id: 'templates', label: 'Templates' },
  { id: 'checklist', label: 'Checklist' },
]

type ExampleLine = string | { bold: string }

type Template = {
  id: string
  tag: string
  title: string
  sub: string
  template: string
  example: { headline: string; lines: ExampleLine[] }
  rule: string
}

const TEMPLATES: Template[] = [
  {
    id: 'daily',
    tag: 'Daily events',
    title: "What's happening today?",
    sub: 'Daily round-ups, based on the Experience Dashboard.',
    template: `TODAY AT MAD MONKEY
Your plans? Sorted.

[EVENT 1]
[TIME] | [PRICE]
[ONE-LINE DESCRIPTION]
[EVENT 2, 3... SAME FORMAT]

Want in? [SIGN-UP INSTRUCTIONS]
Pick your people. We'll see you there.`,
    example: {
      headline: 'Tonight at Mad Monkey',
      lines: [
        'Your evening plans just got better!',
        { bold: 'PUB QUIZ · 8:30PM | Free to join' },
        'Bring your useless knowledge. It might finally pay off.',
        { bold: 'MUSIC BINGO · 9:00PM | [CONFIRM PRICE]' },
        'Guess the song before your mates do.',
        'Sign up at reception.',
      ],
    },
    rule: 'Example only. Replace all details with the confirmed property schedule.',
  },
  {
    id: 'party',
    tag: 'Party & social',
    title: 'This is your sign',
    sub: 'Parties, pool events, pub crawls and social meet-ups.',
    template: `[EVENT NAME] IS ON.
[Short, high-energy hook.]

[DAY / DATE] | [START TIME]
[LOCATION]
[PRICE] - [KEY INCLUSIONS]
[ONE CLEAR SIGN-UP INSTRUCTION]

Bring your mates. Or make some here.`,
    example: {
      headline: "Foam party. Let's get messy.",
      lines: [
        'The pool is calling. Your afternoon plans are sorted.',
        { bold: 'Today | 1-7PM' },
        'Pool area',
        '[CONFIRMED PRICE / ENTRY DETAILS]',
        'Sign up at reception.',
      ],
    },
    rule: 'Use the approved event image. Only mention drinks, DJs, prizes or inclusions if confirmed.',
  },
  {
    id: 'tours',
    tag: 'Tours & experiences',
    title: 'Out there > in here',
    sub: 'Tours, excursions and experiences listed in the Experience Dashboard.',
    template: `[EXPERIENCE NAME]
Your next adventure starts here.

When: [DATE / PICK-UP TIME]
Price: [CONFIRMED PRICE]
Includes: [KEY INCLUSIONS]
Sign up: [LOCATION / DEADLINE]
[SHORT, RELEVANT REASON TO GO]

Questions? Come chat to the team.`,
    example: {
      headline: 'Elephant sanctuary + sticky waterfall',
      lines: [
        'Two stops. One very good day out.',
        { bold: 'Pick-up: 8:00-8:30AM' },
        'Price: [CONFIRM PRICE]',
        'Includes: [CONFIRM INCLUSIONS]',
        'Sign up at reception.',
      ],
    },
    rule: 'Check the itinerary, ethical activity description, pick-up window and inclusions before posting.',
  },
  {
    id: 'food',
    tag: 'Food, drinks & offers',
    title: 'Good plans. Better prices.',
    sub: 'Happy hours, family dinners, food specials and confirmed bar offers.',
    template: `[OFFER / FOOD SPECIAL]
[Short hook that makes the offer sound appealing.]

When: [TIME]
Where: [LOCATION]
The deal: [EXACT OFFER AND PRICE]
How to get it: [ORDER / SIGN-UP INSTRUCTIONS]

See you there.`,
    example: {
      headline: 'Happy hour. Your wallet said thanks.',
      lines: [
        'Beer + food = a very good decision.',
        { bold: '1-3PM | Main bar' },
        'Buy a beer and get 50% off food.',
        'Order at the bar.',
      ],
    },
    rule: 'Confirm eligible products, prices, dates, exclusions and offer terms before posting.',
  },
  {
    id: 'last-call',
    tag: 'Last call',
    title: 'Last call to get involved',
    sub: 'Only for confirmed events where the start time or deadline makes a reminder useful.',
    template: `[EVENT NAME] STARTS IN [TIME].
Still deciding? This is your nudge.

[START TIME] | [LOCATION]
[PRICE / KEY DETAIL]

Want in? [SIGN-UP INSTRUCTIONS]
See you there.`,
    example: {
      headline: 'Pub crawl starts in 30 minutes.',
      lines: [
        'Your future travel mates might be waiting downstairs.',
        { bold: '10PM | Meet at reception' },
        '[CONFIRMED PRICE AND INCLUSIONS]',
        'Sign up at reception now.',
      ],
    },
    rule: 'Never invent urgency, claim limited spaces without confirmation, or spam the group.',
  },
]

const FORMULA = `[EVENT NAME] [TONIGHT / TODAY / TOMORROW]
[One punchy line that makes guests want to join.]

Time: [TIME]
Location: [LOCATION]
Price: [PRICE / FREE]
Includes: [KEY DETAILS, IF RELEVANT]

Want in? [SIGN-UP INSTRUCTIONS]
See you there.`

const CHECKLIST = [
  'Event is in the Experience Dashboard',
  'Event is confirmed for this property and date',
  'Correct template used',
  'Image is from the approved library or event assets',
  'Time, price, inclusions and location are correct',
  'Sign-up instructions are clear',
  'Copy sounds like Mad Monkey',
  'Image and copy match the event',
  'No outdated details or unconfirmed claims',
  'Going to the correct channel',
]

export default function PlaybookPage({ onBack }: { onBack: () => void }) {
  const imageLibrary = TOOLS.brandImageLibrary ? (
    <Ext href={TOOLS.brandImageLibrary}>Brand Image Library</Ext>
  ) : (
    <>
      Brand Image Library <span className="text-sm font-semibold text-muted">(link coming soon)</span>
    </>
  )

  return (
    <GuideShell
      onBack={onBack}
      colour="#ccff01"
      onColour="#0a0a0a"
      eyebrow="The Mad Monkey Event Comms Playbook"
      title={
        <>
          All in.
          <br />
          Every property.
        </>
      }
      intro={
        <>
          WhatsApp templates. One standard. For every team member posting about what's happening at Mad Monkey.
        </>
      }
      meta="WhatsApp messaging guide for GMs, GEMs and Community Managers"
      original={{ href: ORIGINALS.eventCommsPlaybook, label: 'Open the original slides' }}
      nav={NAV}
    >
      <Section
        id="standard"
        tag="The standard"
        title="Same energy. Everywhere."
        sub="In every property WhatsApp group, our comms should be instantly recognisable."
      >
        <ul className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {['Brand voice', 'Approved image library', 'Source of truth for events'].map((t) => (
            <li key={t} className="rounded-2xl bg-cream p-5 text-ink sm:p-6">
              <p className="display text-4xl text-ink sm:text-5xl">One</p>
              <p className="mt-3 text-lg font-black uppercase leading-tight tracking-tight">{t}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6">
          <Callout>The goal: get guests excited, get them involved and get them through the door.</Callout>
        </div>
      </Section>

      <Section
        id="before"
        tag="What gets promoted?"
        title="The dashboard is the source of truth"
        sub={
          <>
            Only promote events and experiences listed in the approved{' '}
            <Ext href={TOOLS.experienceDashboard}>Experience Dashboard</Ext>.
          </>
        }
      >
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.12em] text-muted">Before you create a message</p>
            <div className="mt-4">
              <Steps
                items={[
                  'Check the Experience Dashboard',
                  'Confirm the event is running at your property',
                  "Verify time, location, price and what's included",
                  'Select the correct WhatsApp and/or social template',
                  <>Use an approved image from the {imageLibrary} when creating any new assets</>,
                ]}
              />
            </div>
          </div>
          <div className="flex flex-col justify-between gap-6 rounded-2xl border border-line bg-surface p-5 sm:p-6">
            <p className="text-xl font-black uppercase leading-snug tracking-tight">
              No invented events.
              <br />
              No unconfirmed offers.
              <br />
              No outdated details.
            </p>
            <Callout>If it's not confirmed, don't post it.</Callout>
          </div>
        </div>

        <h3 className="mt-12 text-lg font-black uppercase tracking-tight">No random assets. No random messaging.</h3>
        <ul className="mt-4 divide-y divide-line overflow-hidden rounded-2xl border border-line">
          {[
            [
              'Use approved images only',
              <>
                Use GM-approved event assets or create new ones in the design tool,{' '}
                <Ext href={TOOLS.studio}>MM Studio</Ext>.
              </>,
            ],
            ['Use the templates', 'No freestyle layouts. No copying old messages without checking details.'],
            ['Get the facts right', 'Confirm name, date, time, price, inclusions and sign-up before posting.'],
            ['Keep it Mad Monkey', 'Short, cheeky, social and specific. No corporate waffle.'],
            ['One event. One clear message.', 'What it is, why they should care, how to join.'],
          ].map(([title, body], i) => (
            <li key={i} className="grid grid-cols-1 gap-1 bg-surface p-4 sm:grid-cols-[2fr_3fr] sm:gap-6 sm:p-5">
              <p className="font-black uppercase leading-snug tracking-tight">{title}</p>
              <p className="text-muted">{body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="assets" tag="Create your asset" title="The design tool. That's it.">
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <Card>
            <p className="text-lg font-semibold leading-snug">
              Use <Ext href={TOOLS.studio}>MM Studio</Ext> to create on-brand WhatsApp event assets. Keep it bold, clear
              and unmistakably Mad Monkey.
            </p>
          </Card>
          <Card>
            <p className="text-lg font-black uppercase leading-snug tracking-tight">
              Need an image? Use the Brand Image Library.
            </p>
            <p className="mt-2">{imageLibrary}</p>
          </Card>
        </div>
        <p className="mt-4 text-muted">
          <strong className="text-cream">GMs:</strong> upload any approved event assets to the{' '}
          <Ext href={TOOLS.experienceDashboard}>Experience Dashboard</Ext>.
        </p>

        <h3 className="mt-12 text-lg font-black uppercase tracking-tight">Make it look the part</h3>
        <p className="mt-2 text-muted">Simple, on-brand event visuals from approved templates and library imagery.</p>
        <div className="mt-4">
          <Steps
            items={[
              <>
                Open <Ext href={TOOLS.studio}>MM Studio</Ext>
              </>,
              'Select the correct WhatsApp image template',
              'Add the confirmed event details',
              'Choose approved photography from the library',
              'Export and attach it to your WhatsApp message',
            ]}
          />
        </div>
        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card title={<span className="text-pop-lime">Keep it on brand</span>}>
            <Bullets
              items={[
                'Approved templates and library images only',
                'Check all event details before exporting',
                'No new layouts, no random images',
                'Keep the message short. Let the visual talk.',
              ]}
            />
          </Card>
          <div className="flex flex-col gap-3">
            <Callout>No starting from scratch. No random Canva creations.</Callout>
            <p className="px-1 text-muted">
              Missing a template or image? Create one in <Ext href={TOOLS.studio}>MM Studio</Ext>.
            </p>
          </div>
        </div>
      </Section>

      <Section
        id="voice"
        tag="The Mad Monkey voice"
        title="Say less. Hit harder."
        sub="We sound like your most-travelled mate telling you to book the flight."
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <div className="flex flex-col gap-4">
            <div className="rounded-2xl bg-pop-lime p-5 text-ink sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.12em]">Do this</p>
              <p className="mt-3 text-xl font-black leading-snug">
                "PUB QUIZ TONIGHT. Think you know your geography? Prove it. 8:30PM at the bar."
              </p>
            </div>
            <div className="rounded-2xl bg-cream p-5 text-ink sm:p-6">
              <p className="text-xs font-black uppercase tracking-[0.12em] text-[#d4008c]">Not this</p>
              <p className="mt-3 text-lg italic leading-snug">
                "Dear valued guests, we are delighted to invite you to participate in our evening entertainment
                programme."
              </p>
            </div>
          </div>
          <Card title={<span className="text-pop-lime">Our rules</span>}>
            <Bullets
              items={[
                'Lead with the event',
                'Short sentences, easy-to-scan details',
                "Emojis are fine in small doses. Don't overuse them.",
                'Playful, confident, a little chaotic',
                'UPPERCASE the hook, not every sentence',
                'British English',
                'Give guests one clear next step',
                "No generic hype, forced slang or promises we can't guarantee",
              ]}
            />
          </Card>
        </div>
      </Section>

      <Section
        id="formula"
        tag="WhatsApp: the formula"
        title="One message. All the details."
        sub="Every event message in a property WhatsApp group follows the same structure."
      >
        <ul className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            ['The hook', 'Why should guests read on?'],
            ['The details', 'Time, location, price, inclusions'],
            ['The action', 'Exactly how to join'],
            ['The asset', 'Attach an event image'],
          ].map(([t, d]) => (
            <li key={t} className="rounded-2xl border border-line bg-surface p-5">
              <p className="font-black uppercase tracking-tight text-pop-lime">{t}</p>
              <p className="mt-1 text-sm">{d}</p>
            </li>
          ))}
        </ul>
        <div className="mt-6 grid grid-cols-1 gap-6 lg:grid-cols-[3fr_2fr]">
          <CopyBlock label="Copy-and-paste structure" text={FORMULA} />
          <div className="flex flex-col gap-4">
            <Callout>Only include fields relevant to the event.</Callout>
            <Callout>Never guess missing information.</Callout>
          </div>
        </div>
      </Section>

      <Section id="templates" tag="WhatsApp templates" title="Pick the right template" sub="Tap Copy, paste into WhatsApp, fill in the confirmed details.">
        <div className="space-y-12">
          {TEMPLATES.map((t) => (
            <article key={t.id} aria-labelledby={`tpl-${t.id}`}>
              <p className="eyebrow text-pop-lime">{t.tag}</p>
              <h3 id={`tpl-${t.id}`} className="display mt-2 text-2xl sm:text-4xl">
                {t.title}
              </h3>
              <p className="mt-2 text-muted">{t.sub}</p>
              <div className="mt-5 grid grid-cols-1 gap-6 lg:grid-cols-2">
                <CopyBlock label="Template" text={t.template} />
                <div className="rounded-2xl border border-line bg-ink p-5 sm:p-6">
                  <p className="text-xs font-black uppercase tracking-[0.12em] text-pop-lime">Example</p>
                  <p className="mt-4 text-2xl font-black uppercase leading-tight tracking-tight text-pop-lime">
                    {t.example.headline}
                  </p>
                  <div className="mt-3 space-y-1.5">
                    {t.example.lines.map((l, i) =>
                      typeof l === 'string' ? (
                        <p key={i}>{l}</p>
                      ) : (
                        <p key={i} className="font-black">
                          {l.bold}
                        </p>
                      ),
                    )}
                  </div>
                </div>
              </div>
              <p className="mt-4 rounded-xl bg-surface px-4 py-3 font-semibold">{t.rule}</p>
            </article>
          ))}
        </div>
        <p className="mt-10 text-muted">
          Real examples from property groups are in the <Ext href={ORIGINALS.eventCommsPlaybook}>original slides</Ext>.
        </p>
      </Section>

      <Checklist />

      <section className="mt-12 rounded-3xl bg-ink p-6 ring-1 ring-line sm:p-10">
        <p className="display text-4xl sm:text-6xl">
          Less guessing.
          <br />
          <span className="text-pop-lime">More guests.</span>
        </p>
        <p className="mt-6 max-w-2xl leading-relaxed text-muted sm:text-lg">
          We're not posting just to fill a feed. We're helping guests discover experiences, meet people and make the
          most of their stay.
        </p>
        <ul className="mt-6 flex flex-wrap gap-3">
          {['One source of truth', 'One approved library', 'One recognisable brand'].map((p) => (
            <li key={p} className="rounded-full bg-pop-lime px-4 py-2 text-xs font-black uppercase tracking-[0.1em] text-ink">
              {p}
            </li>
          ))}
        </ul>
        <p className="mt-8 font-black uppercase tracking-tight text-pop-lime">All in. Every property. Every post.</p>
      </section>

      <SharedResourcesCompact exclude="event-comms-playbook" />
    </GuideShell>
  )
}

function Checklist() {
  const [done, setDone] = useState<boolean[]>(() => CHECKLIST.map(() => false))
  const count = done.filter(Boolean).length
  const all = count === CHECKLIST.length

  return (
    <Section id="checklist" tag="The pre-post checklist" title="Check it. Then send it." sub="Before every WhatsApp message you send, confirm:">
      <div className="flex items-center justify-between gap-4">
        <p className="font-semibold" aria-live="polite">
          {all ? 'All checked. Send it.' : `${count} of ${CHECKLIST.length} checked`}
        </p>
        {count > 0 && (
          <button
            type="button"
            onClick={() => setDone(CHECKLIST.map(() => false))}
            className="inline-flex items-center gap-2 rounded-lg border border-cream/40 px-3 py-2 text-sm font-semibold transition-colors hover:border-cream"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            Start again
          </button>
        )}
      </div>
      <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
        {CHECKLIST.map((item, i) => (
          <li key={item}>
            <label
              className={`flex cursor-pointer items-center gap-4 rounded-2xl border p-4 transition-colors sm:p-5 ${
                done[i] ? 'border-pop-lime bg-pop-lime/10' : 'border-line bg-surface hover:border-cream/40'
              }`}
            >
              <input
                type="checkbox"
                checked={done[i]}
                onChange={() => setDone((d) => d.map((v, j) => (j === i ? !v : v)))}
                className="peer sr-only"
              />
              <span
                className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-colors peer-focus-visible:outline peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-pop-blue ${
                  done[i] ? 'bg-pop-lime text-ink' : 'border-2 border-cream/40 text-transparent'
                }`}
                aria-hidden="true"
              >
                <Check className="h-5 w-5" strokeWidth={3} />
              </span>
              <span className="font-semibold leading-snug">{item}</span>
            </label>
          </li>
        ))}
      </ul>
      <div className="mt-6">
        <Callout tone="ink">If anything is unclear, stop and confirm before posting.</Callout>
      </div>
    </Section>
  )
}
