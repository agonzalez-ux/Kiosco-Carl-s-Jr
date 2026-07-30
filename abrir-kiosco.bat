@echo off
REM ============================================================
REM  Carl's Jr - Lanzador del kiosco
REM
REM  El boton "Imprimir ticket" ya NO usa el dialogo de impresion
REM  de Chrome: le habla a print-helper.js (un programa aparte que
REM  corre en este mismo PC) y es el que manda el ticket a la
REM  impresora directamente, sin preguntar nada y sin abrir ninguna
REM  ventana. Este .bat arranca ese ayudante en segundo plano, de
REM  forma invisible, antes de abrir el kiosco.
REM  --kiosk-printing se deja puesto solo como red de seguridad,
REM  por si el ayudante no llegara a estar disponible.
REM
REM  Antes de usarlo:
REM   1. Pon la impresora de tickets como impresora PREDETERMINADA
REM      en Windows (Configuracion > Bluetooth y dispositivos >
REM      Impresoras y escaneres).
REM   2. Necesitas Node.js instalado (https://nodejs.org).
REM   3. Arranca el servidor del kiosco antes de abrir este .bat.
REM ============================================================

set "URL=http://localhost:3877/kiosk.html"

where node >nul 2>nul
if %errorlevel%==0 (
  start "" wscript.exe "%~dp0iniciar-impresora.vbs"
) else (
  echo AVISO: no se encontro Node.js. El ticket no se podra imprimir
  echo en segundo plano hasta instalarlo desde https://nodejs.org
)

set "CHROME=%ProgramFiles%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%ProgramFiles(x86)%\Google\Chrome\Application\chrome.exe"
if not exist "%CHROME%" set "CHROME=%LocalAppData%\Google\Chrome\Application\chrome.exe"

if not exist "%CHROME%" (
  echo No se ha encontrado Chrome en las rutas habituales.
  echo Edita este archivo y pon la ruta correcta en la variable CHROME.
  pause
  exit /b 1
)

start "" "%CHROME%" ^
  --kiosk ^
  --kiosk-printing ^
  --disable-print-preview ^
  --no-first-run ^
  --disable-pinch ^
  --overscroll-history-navigation=0 ^
  --user-data-dir="%~dp0.chrome-kiosco" ^
  --app=%URL%
