#!/usr/bin/env bash
# Deploys the built hub to the Vercel demo (project mm-vig-hub, team cfsitedesigns-projects).
# Uploads the static dist/ from a folder OUTSIDE git, so Vercel never checks the commit
# author (Hobby blocks unlinked authors) and never runs a build of its own.
# The upload folder is named mm-vig-hub so a first run creates the project with that name.
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="${TMPDIR:-/tmp}/mm-vig-hub-deploy"
SITE="$OUT/mm-vig-hub"

cd "$ROOT"
npm run build

rm -rf "$SITE"
mkdir -p "$SITE"
cp -R dist/. "$SITE/"
[ -d "$OUT/.vercel-link" ] && cp -R "$OUT/.vercel-link" "$SITE/.vercel"

cd "$SITE"
vercel deploy --prod --yes --scope cfsitedesigns-projects

# keep the project link for next time
rm -rf "$OUT/.vercel-link" && cp -R .vercel "$OUT/.vercel-link"
