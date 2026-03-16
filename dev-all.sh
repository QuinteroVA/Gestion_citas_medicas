#!/usr/bin/env bash

set -euo pipefail

cleanup() {
  if [[ -n "${SERVER_PID:-}" ]]; then kill "$SERVER_PID" 2>/dev/null || true; fi
  if [[ -n "${VITE_PID:-}" ]]; then kill "$VITE_PID" 2>/dev/null || true; fi
}

trap cleanup EXIT INT TERM

echo "Iniciando API local en http://localhost:4000"
node server/index.js &
SERVER_PID=$!

echo "Iniciando frontend Vite en http://localhost:5173"
npm run dev &
VITE_PID=$!

wait