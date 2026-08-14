#!/usr/bin/env bash
# Preview-only uploader. It never retrieves, prints, or creates secrets.
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd -P)"
SECRETS_FILE="${1:-}"
ALIAS="${CLOUDFLARE_PREVIEW_ALIAS:-enquiry-api}"
WRANGLER_BIN="${WRANGLER_BIN:-}"

if [[ -z "$SECRETS_FILE" || ! -f "$SECRETS_FILE" ]]; then
  echo "Usage: $0 /absolute/path/to/memory-backed-secrets-file" >&2
  exit 64
fi
if [[ "$WRANGLER_BIN" != /* || ! -x "$WRANGLER_BIN" || "$WRANGLER_BIN" == "$ROOT"/* ]]; then
  echo "Set WRANGLER_BIN to the approved absolute Wrangler executable outside this repository." >&2
  exit 64
fi
if [[ "$SECRETS_FILE" != /* || "$SECRETS_FILE" == "$ROOT"/* ]]; then
  echo "Refusing a repository-relative secrets file." >&2
  exit 64
fi
if [[ "$(stat -c '%a' "$SECRETS_FILE")" != "600" ]]; then
  echo "Secrets file must have mode 0600." >&2
  exit 64
fi
if ! grep -qx 'TURNSTILE_SECRET_KEY=.*' "$SECRETS_FILE" || ! grep -qx 'ENQUIRY_FROM_EMAIL=.*' "$SECRETS_FILE"; then
  echo "Secrets file must contain TURNSTILE_SECRET_KEY and ENQUIRY_FROM_EMAIL." >&2
  exit 64
fi

cd "$ROOT"
node scripts/build-cloudflare.mjs
"$WRANGLER_BIN" deploy --dry-run
"$WRANGLER_BIN" versions upload --secrets-file "$SECRETS_FILE" --preview-alias "$ALIAS" --message "Enquiry staging preview $(git rev-parse --short HEAD)"
