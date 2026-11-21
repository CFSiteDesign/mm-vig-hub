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
- **A property's WhatsApp or Instagram**: its line in `PROPERTIES`
- **A property-specific Canva / Studio / dashboard link**: add `canva`, `studio` or
  `experienceDashboard` to that property's line (otherwise it uses `TOOLS`)
- **Add a property**: copy a line in `PROPERTIES`, give it a new `id`
- **Missing link**: leave it as `''` and the page shows "Not added yet" instead of a
  dead button
- **Idea box**: set `SUGGEST_URL` to show the "Got an idea for the hub?" card

Never put logins or passwords in this file. The page points people to their GM or
Marketing for access.

## Addresses

- Homepage: `/`
- A property: `/#/koh-rong` (the `id` from `PROPERTIES`). Share these with each team.

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

WhatsApp and Instagram links were copied from the hostel QR link hub
(`mm-linktree`, `src/lib/constants.ts`) on 21 Nov 2026.
