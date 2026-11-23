import type { ReactNode } from 'react'
import { ArrowUpRight, CalendarDays, Clock, Sheet, Sparkles } from 'lucide-react'
import { LOGIN_NOTE, ORIGINALS, TOOLS } from '../../data/hub'
import { InstagramIcon, WhatsAppIcon } from '../icons'
import { SharedResourcesCompact } from '../SharedResources'
import { Bullets, Callout, Card, Ext, GuideShell, Internal, LoginNote, Section, Steps } from './parts'

/*
 * VIG SOP: WhatsApp Groups and Instagram
 * Source: "VIG SOP_ WhatsApp Groups and Instagram.docx" (owner Katrina Riley, v1.0, 17 Nov 2026).
 * The Word file has the Experience Dashboard and Studio passwords written in it.
 * They are deliberately NOT on this page: logins live in the shared password manager.
 */

const NAV = [
  { id: 'purpose', label: 'Purpose' },
  { id: 'whatsapp', label: 'WhatsApp' },
  { id: 'stories', label: 'Instagram Stories' },
  { id: 'tools', label: 'Tools & logins' },
  { id: 'dos', label: "Do's & don'ts" },
]

export default function SopPage({ onBack }: { onBack: () => void }) {
  return (
    <GuideShell
      onBack={onBack}
      colour="#ffc000"
      onColour="#0a0a0a"
      eyebrow="VIG SOP · Source of truth"
      title={
        <>
          WhatsApp groups
          <br />
          &amp; Instagram
        </>
      }
      intro="Follow this every day."
      meta="Role: VIG · Owner: Katrina Riley · Version 1.0 · Updated 17 Nov 2026"
      original={ORIGINALS.vigSop ? { href: ORIGINALS.vigSop, label: 'Open the original doc' } : undefined}
      nav={NAV}
    >
      <Section id="purpose" tag="Purpose" title="Keep guests in the loop" sub="Two channels, every day.">
        <div className="max-w-3xl space-y-4 leading-relaxed">
          <p>
            The VIG keeps guests informed and engaged through Mad Monkey's guest-facing channels. That means daily
            updates in the WhatsApp groups about upcoming events, tours and activities, and Instagram Stories that
            promote the nightly events at their property.
          </p>
          <p className="text-muted">
            Guests should always know what's happening, what's coming up and how to get involved. It drives
            participation, builds connections and makes the hostel more social.
          </p>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
          <ChannelCard
            icon={<WhatsAppIcon className="h-6 w-6" />}
            colour="#03ff01"
            name="WhatsApp"
            purpose="Guest-facing events comms and Q&A"
          />
          <ChannelCard
            icon={<InstagramIcon className="h-6 w-6" />}
            colour="#ff01aa"
            name="Socials"
            purpose="Sharing event content"
          />
        </div>
      </Section>

      <Section
        id="whatsapp"
        tag="Channel playbook"
        title="WhatsApp"
        sub="Post into each location's guest group chat. Every group link is on its property page in this hub."
      >
        <TimeBanner>
          Post between <strong>2pm and 4pm, the property's local time</strong>, so guests see what's on that night and
          can plan around it. Every property page shows its local time.
        </TimeBanner>

        <div className="mt-6 grid grid-cols-1 gap-4 lg:grid-cols-3">
          <Card title="Post 1: Nightly events">
            <p className="text-muted">
              Take the events from the <Ext href={TOOLS.experienceDashboard}>Experience Dashboard</Ext>. One post per
              event per day.
            </p>
            <p className="mt-4 text-xs font-black uppercase tracking-[0.12em]">Every post includes</p>
            <div className="mt-3">
              <Bullets
                items={[
                  'Event image',
                  'Event name',
                  'Start and end time',
                  'One or two lines of description',
                  'Price, if the event is paid',
                ]}
              />
            </div>
            <p className="mt-4 font-semibold">Keep it fun and cheerful.</p>
          </Card>
          <Card title="Post 2: Tours">
            <p className="text-muted">Post any tour running that day or that week.</p>
            <p className="mt-4 font-semibold">Same format: image plus description.</p>
          </Card>
          <Card title="On occasion: Global events">
            <p className="text-muted">Post any global event running that day or that week.</p>
            <p className="mt-4 font-semibold">Same format: image plus description.</p>
          </Card>
        </div>

        <h3 className="mt-10 text-lg font-black uppercase tracking-tight">Rules</h3>
        <div className="mt-4">
          <Bullets
            tone="pink"
            items={[
              <>
                <strong>Local time, not your time.</strong> Check the property's time zone before posting.
              </>,
              'No swearing, no politics, no arguments in groups.',
              <>
                If a guest raises a complaint, ask them to contact the GM or{' '}
                <Ext href="mailto:cs@madmonkeyhostels.com">cs@madmonkeyhostels.com</Ext>.
              </>,
            ]}
          />
        </div>
        <p className="mt-6 text-muted">
          How to write the posts: <Internal href="#/playbook">WhatsApp Event Comms Playbook</Internal>.
        </p>
      </Section>

      <Section
        id="stories"
        tag="Social content"
        title="Instagram Stories"
        sub="Daily target: one Story for the Mad Monkey tour (if there's one that day) and one for the nightly event."
      >
        <TimeBanner>
          Post in the <strong>morning, the property's local time</strong>, so guests see them before the tour and
          before the event.
        </TimeBanner>

        <h3 className="mt-10 text-lg font-black uppercase tracking-tight">Method</h3>
        <div className="mt-4">
          <Steps
            items={[
              <>
                Open the <Ext href={TOOLS.experienceDashboard}>Experience Dashboard</Ext> and find that day's MM tour
                and nightly event.
              </>,
              <>
                Get the asset attached to each one, or create one in <Ext href={TOOLS.studio}>MM Studio</Ext>.
              </>,
              <>
                Post both as Stories on your location's Instagram account. Handles are on each property page; logins
                are in the shared password manager.
              </>,
            ]}
          />
        </div>

        <h3 className="mt-10 text-lg font-black uppercase tracking-tight">Rules</h3>
        <div className="mt-4">
          <Bullets
            tone="pink"
            items={[
              "Post in the property's local time, not your own.",
              <>
                Don't post an event without its asset. If the asset is missing, make one in{' '}
                <Ext href={TOOLS.studio}>MM Studio</Ext>.
              </>,
              'Stories only. Never post to the main grid.',
            ]}
          />
        </div>
      </Section>

      <Section
        id="tools"
        tag="Reference"
        title="Tools & logins"
        sub="All links, handles and events live in the Community Management SST and in this hub."
      >
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
          <ToolCard
            icon={<CalendarDays className="h-6 w-6" aria-hidden="true" />}
            colour="#ffc000"
            title="Experience Dashboard"
            href={TOOLS.experienceDashboard}
            body={
              <>
                <p>Weekly events dashboard and your source of truth. Data can change, so double check before posting.</p>
                <p className="mt-3 text-muted">
                  Signing in: click <strong className="text-cream">"Email me a code instead"</strong> to switch to a
                  password.
                </p>
              </>
            }
          />
          <ToolCard
            icon={<Sparkles className="h-6 w-6" aria-hidden="true" />}
            colour="#ab00ff"
            onColour="#ffffff"
            title="MM Studio"
            href={TOOLS.studio}
            body={
              <p>
                Create simple assets for events. Use <strong>"Event Template"</strong> to make an asset for a WhatsApp
                message or an Instagram Story.
              </p>
            }
          />
          <ToolCard
            icon={<Sheet className="h-6 w-6" aria-hidden="true" />}
            colour="#00fef3"
            title="Community Management SST"
            href={ORIGINALS.communityManagementSst}
            body={
              <>
                <p>
                  <strong>WhatsApp Groups:</strong> the group invite link for every location.
                </p>
                <p className="mt-2">
                  <strong>Social Accounts:</strong> Instagram and TikTok handles and links.
                </p>
              </>
            }
          />
        </div>
        <div className="mt-6 rounded-2xl border border-pop-yellow/60 p-5 sm:p-6">
          <LoginNote>
            <strong>{LOGIN_NOTE}</strong> Logins are never written in this hub or in the SST.
          </LoginNote>
        </div>
      </Section>

      <Section id="dos" tag="Messaging" title="Do's & don'ts">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
          <Card title={<span className="text-pop-lime">Do</span>}>
            <Bullets
              items={[
                'Keep posts short, fun and friendly. Emojis are fine.',
                "Use the property's local time for every event.",
                'Include the image, event name, start and end time, a short description and the price (if paid) in every event post.',
                'Check every detail against the Experience Dashboard and the SST before posting.',
                "Reply to guest questions quickly. If you don't know the answer, say you'll check, then come back to them.",
                <>
                  Point complaints to <Ext href="mailto:cs@madmonkeyhostels.com">cs@madmonkeyhostels.com</Ext> politely
                  and keep them off the group chat.
                </>,
                'Point any other guest questions to reception or the property WhatsApp number.',
                'Say you volunteer with Mad Monkey whenever you mention us on Reddit or anywhere public.',
                "Read a subreddit's rules before you post there.",
                <strong key="human">Keep it human!</strong>,
              ]}
            />
          </Card>
          <Card title={<span className="text-pop-pink">Don't</span>}>
            <Bullets
              tone="pink"
              items={[
                "Swear, talk politics or argue with guests.",
                "Guess prices, times or what's included. If you're unsure, leave it out.",
                'Promise discounts, refunds, free stuff or room changes.',
                "Share guests' personal details, room numbers or photos without their permission.",
                'Post as a "random guest" on Reddit, or use two accounts to back each other up.',
                'Reply to negative reviews or public complaints.',
                'Share logins or passwords with anyone.',
                'Use em dashes (the long dash).',
              ]}
            />
          </Card>
        </div>
        <div className="mt-8">
          <Callout>The Experience Dashboard is your source of truth. Check it before every post.</Callout>
        </div>
      </Section>

      <SharedResourcesCompact exclude="vig-sop" />
    </GuideShell>
  )
}

function ChannelCard({ icon, colour, name, purpose }: { icon: ReactNode; colour: string; name: string; purpose: string }) {
  return (
    <div className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <span className="grid h-12 w-12 shrink-0 place-items-center rounded-xl text-ink" style={{ background: colour }}>
        {icon}
      </span>
      <div className="min-w-0">
        <p className="text-lg font-black uppercase tracking-tight">{name}</p>
        <p className="text-sm text-muted">{purpose}</p>
        <p className="mt-1 text-sm font-semibold">Daily, per location</p>
      </div>
    </div>
  )
}

function TimeBanner({ children }: { children: ReactNode }) {
  return (
    <p className="flex gap-3 rounded-2xl border border-pop-lime/60 bg-surface p-5 leading-relaxed sm:p-6">
      <Clock className="mt-0.5 h-5 w-5 shrink-0 text-pop-lime" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}

function ToolCard({
  icon,
  colour,
  onColour = '#0a0a0a',
  title,
  href,
  body,
}: {
  icon: ReactNode
  colour: string
  onColour?: string
  title: string
  href: string
  body: ReactNode
}) {
  return (
    <div className="flex flex-col rounded-2xl border border-line bg-surface p-5 sm:p-6">
      <span className="grid h-12 w-12 place-items-center rounded-xl" style={{ background: colour, color: onColour }}>
        {icon}
      </span>
      <h3 className="mt-5 text-xl font-black uppercase leading-tight tracking-tight">{title}</h3>
      <div className="mt-3 flex-1 text-sm leading-relaxed">{body}</div>
      {href && (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-5 inline-flex w-fit items-center gap-2 rounded-xl border border-cream/40 px-4 py-3 text-sm font-semibold transition-colors hover:border-cream hover:bg-cream hover:text-ink"
        >
          Open {title}
          <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      )}
    </div>
  )
}
