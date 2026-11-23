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
- **Brand Image Library** (named in the playbook): `TOOLS.brandImageLibrary`
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
