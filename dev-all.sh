#!/usr/bin/env bash
set -euo pipefail

cd "$(dirname "$0")"

# ── Verificar Node.js ────────────────────────────────────────────────────────
if ! command -v node &>/dev/null; then
  echo "ERROR: Node.js no está instalado."
  echo "Descárgalo desde https://nodejs.org e instálalo antes de continuar."
  exit 1
fi

# ── Verificar dependencias ───────────────────────────────────────────────────
if [ ! -d "node_modules" ]; then
  echo "Instalando dependencias por primera vez..."
  npm install
fi

# ── Limpieza al salir ────────────────────────────────────────────────────────
cleanup() {
  echo ""
  echo "Deteniendo servicios..."
  [[ -n "${SERVER_PID:-}" ]] && kill "$SERVER_PID" 2>/dev/null || true
  [[ -n "${VITE_PID:-}" ]]   && kill "$VITE_PID"   2>/dev/null || true
}
trap cleanup EXIT INT TERM

# ── Levantar servicios ───────────────────────────────────────────────────────
echo "Iniciando API local en http://localhost:4000"
node server/index.js &
SERVER_PID=$!

sleep 1

echo "Iniciando frontend en http://localhost:5173"
npm run dev &
VITE_PID=$!

echo ""
echo "Abre tu navegador en: http://localhost:5173"
echo "Presiona Ctrl+C para detener todo."
echo ""

wait
