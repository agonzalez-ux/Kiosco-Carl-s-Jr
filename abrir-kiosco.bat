@echo off
REM ============================================================
REM  Carl's Jr - Lanzador del kiosco
REM
REM  --kiosk-printing es IMPRESCINDIBLE: es lo unico que hace que
REM  al pulsar "Imprimir ticket" el ticket salga directo por la
REM  impresora sin mostrar la ventana de confirmacion de Chrome.
REM  Ese dialogo NO se puede quitar desde el codigo de la pagina.
REM
REM  Antes de usarlo:
REM   1. Pon la impresora de tickets como impresora PREDETERMINADA
REM      en Windows (Configuracion > Bluetooth y dispositivos >
REM      Impresoras y escaneres). Chrome imprime siempre en la
REM      predeterminada cuando usa --kiosk-printing.
REM   2. Arranca el servidor del kiosco antes de abrir este .bat.
REM ============================================================

set "URL=http://localhost:3877/kiosk.html"

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
