# Mad Monkey VIG & GE Hub

One link, everything VIGs and Guest Experience teams need to do the job: every
property's WhatsApp group and Instagram, the Experience Dashboard, Canva, MM Studio,
and the shared SOPs.

## Run it

```bash
npm install
npm run dev      # http://localhost:5203
npm run build    # static site in dist/
```

## Change a link

Every link lives in **`src/data/hub.ts`**. Edit the URL, rebuild, redeploy. Nothing
else needs touching.

- **Shared resources** (SOP, playbook, SST, dashboard, Studio): `SHARED_RESOURCES`
- **The original Google files** (playbook slides, SST sheet, SOP doc if there is one): `ORIGINALS`
- **Brand Image Library** (Google Drive folder, linked from the playbook .pptx): `TOOLS.brandImageLibrary`

The playbook .pptx links the Experience Dashboard and the design tool to their
`vercel.app` addresses. The hub uses `madmonkeyhostels.com/experiencedashboard` and
`studio.madmonkeygroup.com` instead: same apps, but these open on Lao networks.
- **A property's WhatsApp, Instagram or TikTok**: its line in `PROPERTIES`
- **A property-specific Canva / Studio / dashboard link**: add `canva`, `studio` or
  `experienceDashboard` to that property's line (otherwise it uses `TOOLS`)
- **Add a property**: copy a line in `PROPERTIES`, give it a new `id`
- **Missing link**: leave it as `''` and the page shows "Not added yet" instead of a
  dead button
- **Idea box**: set `SUGGEST_URL` to show the "Got an idea for the hub?" card

Never put logins or passwords in this file. The page says logins are in the shared
password manager and points people to their GM or Marketing for access.

## The guides

The VIG SOP and the WhatsApp Event Comms Playbook are pages inside the hub, so they
read well on a phone and every WhatsApp template has a Copy button:

- `src/components/guides/SopPage.tsx` (from the SOP Word doc, v1.0, 17 Nov 2026)
- `src/components/guides/PlaybookPage.tsx` (from the 16-slide deck)

When Marketing updates the original, update the text here too. Two things are left
out on purpose: the SOP's Experience Dashboard and Studio passwords (the Word file has
them written in), and the playbook's "Real life examples" slide (its screenshots show
guests' phone numbers). Both stay in the originals only.

## Walkthrough video

The "How to use the hub" banner at the top of the homepage opens
`public/walkthrough.mp4` (84 seconds, phone-shaped, voiceover plus burned-in captions).
It is a recording of the real hub, so remake it when the pages change a lot:

```bash
npm run dev                                                    # in another terminal
~/jarvis/venv/bin/python video/make_vo.py /tmp/hub-vo          # 1. voiceover from video/script.json
node video/record.mjs /tmp/hub-vo /tmp/hub-rec                 # 2. record the site on a phone screen
~/jarvis/venv/bin/python video/build.py /tmp/hub-vo /tmp/hub-rec public/walkthrough.mp4 public/walkthrough-poster.jpg
```

- **Words:** `video/script.json`. `say` is what the voice reads (letters spaced out,
  like "V I G", so they're spelled), `caption` is what's shown on screen.
- **Voice:** a 50/50 blend of Kokoro's `af_heart` and `bf_alice`, 12% faster, British
  pronunciation. It's a local model in `~/jarvis/models` (no API key, works offline).
  The first voice, `bf_emma`, sounded flat. Change `voice` in the script to a single
  name (`bf_lily`, `af_sarah`, `bm_lewis`...) or another blend.
- **What happens on screen:** `video/record.mjs`, one `line()` per script line.

## Addresses

- Homepage: `/`
- A property: `/#/koh-rong` (the `id` from `PROPERTIES`). Share these with each team.
- The guides: `/#/sop` and `/#/playbook`

Hash addresses and `base: './'` mean the built site works from any folder or
sub-path (for example `madmonkeyhostels.com/vighub`) with no server rules.

## Demo deploy

Demo: https://mm-vig-hub.vercel.app (Vercel project `mm-vig-hub`, team cfsitedesigns-projects).

```bash
./scripts/deploy-demo.sh
```

Builds, then uploads `dist/` from a folder outside git (no Vercel build, no commit-author check).

## Hosting note

Lao networks cannot resolve `*.vercel.app`. Host the hub on a madmonkeyhostels.com
(or madmonkeygroup.com) address so the Luang Prabang and Vang Vieng teams can open it.

## Data sources

WhatsApp, Instagram and TikTok links come from the Community Management SST
(v1.0, 17 Nov 2026). Kampot (not in the SST) and Siquijor's WhatsApp group (the SST
says MISSING, but the QR hub's link works) come from the hostel QR link hub
(`mm-linktree`, `src/lib/constants.ts`). Every WhatsApp link was checked on 23 Nov 2026.
