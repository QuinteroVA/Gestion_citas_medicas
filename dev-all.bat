@echo off
setlocal
cd /d "%~dp0"

:: ── Verificar Node.js ──────────────────────────────────────────────────────
where node >nul 2>&1
if errorlevel 1 (
  powershell -Command "Add-Type -AssemblyName PresentationFramework; [System.Windows.MessageBox]::Show('Node.js no esta instalado.`nDescargalo desde https://nodejs.org', 'Agendamiento - Error')"
  exit /b 1
)

:: ── Verificar dependencias ─────────────────────────────────────────────────
if not exist "node_modules" (
  powershell -Command "Add-Type -AssemblyName PresentationFramework; [System.Windows.MessageBox]::Show('Instalando dependencias por primera vez...`nEsto puede tardar unos minutos.', 'Agendamiento')"
  call npm install >nul 2>&1
  if errorlevel 1 (
    powershell -Command "Add-Type -AssemblyName PresentationFramework; [System.Windows.MessageBox]::Show('Error al instalar dependencias.', 'Agendamiento - Error')"
    exit /b 1
  )
)

:: ── Obtener IP local de la maquina ────────────────────────────────────────
for /f "tokens=2 delims=:" %%A in ('ipconfig ^| findstr /i "IPv4"') do (
  set RAW_IP=%%A
  goto :got_ip
)
:got_ip
set LOCAL_IP=%RAW_IP: =%

:: ── Levantar API (oculta) ─────────────────────────────────────────────────
start "" /b node server\index.js >nul 2>&1

:: ── Esperar que la API este lista ─────────────────────────────────────────
timeout /t 2 /nobreak >nul

:: ── Levantar Vite con --host (oculta) ─────────────────────────────────────
start "" /b npm run dev -- --host >nul 2>&1

:: ── Esperar que Vite este listo ───────────────────────────────────────────
timeout /t 3 /nobreak >nul

:: ── Abrir navegador automaticamente ──────────────────────────────────────
start "" "http://localhost:5173"

:: ── Mostrar info de red ───────────────────────────────────────────────────
powershell -Command "Add-Type -AssemblyName PresentationFramework; [System.Windows.MessageBox]::Show('Agendamiento iniciado correctamente.En este equipo: http://localhost:5173 Otros equipos en la red:`n  http://%LOCAL_IP%:5173`n`nPara detener la app cierra este proceso desde el Administrador de tareas.', 'Agendamiento')"
