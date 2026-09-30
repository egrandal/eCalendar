#!/usr/bin/env bash
set -euo pipefail
cd /workspace
bash .devcontainer/startup.sh
if [ ! -f .env ]; then cp .env.example .env; fi
pnpm config set store-dir /home/vscode/.pnpm-store --global
pnpm install --frozen-lockfile
pnpm build
printf '\nEntorno preparado. Ejecuta pnpm db:migrate y pnpm dev.\n'
