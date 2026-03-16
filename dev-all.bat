@echo off
setlocal

echo Iniciando API local en http://localhost:4000
start "API" cmd /k node server\index.js

echo Iniciando frontend Vite en http://localhost:5173
start "VITE" cmd /k npm run dev

echo.
echo Listo. Se abrieron dos ventanas:
echo - API (Node/Express)
echo - Frontend (Vite)
echo.
echo Para detenerlos, cierra ambas ventanas.