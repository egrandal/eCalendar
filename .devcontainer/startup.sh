#!/usr/bin/env bash
set -euo pipefail
sudo mkdir -p /home/vscode/.config/gh /home/vscode/.codex /home/vscode/.pnpm-store
sudo chown -R vscode:vscode /home/vscode/.config/gh /home/vscode/.codex /home/vscode/.pnpm-store
if gh auth status >/dev/null 2>&1; then
  gh auth setup-git
fi
