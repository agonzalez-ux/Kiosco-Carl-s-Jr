'use strict';

/* ═══════════════════════════════════════════════════════════════
   CARL'S JR — Ayudante de impresión de tickets (proceso local)
   ═══════════════════════════════════════════════════════════════
   Por qué existe este archivo:
   Ninguna página web puede imprimir sin el diálogo de confirmación
   del navegador — es una restricción de seguridad de todos los
   navegadores, no depende del código de la página. La única forma
   de imprimir "de verdad" en silencio, sin preguntar nada, es que
   algo FUERA del navegador hable directamente con la impresora.
   Este script es exactamente eso: un pequeño servidor que corre en
   el mismo PC del kiosco, recibe el texto del ticket, lo guarda como
   .txt y lo manda a la impresora predeterminada de Windows sin abrir
   ninguna ventana ni pedir confirmación.

   Cómo se usa:
   1. node print-helper.js          (o hacer doble clic en
      iniciar-impresora.bat, que lo deja corriendo en segundo plano)
   2. El kiosco (kiosk.html / app.js) le habla por HTTP en
      http://localhost:5217 cada vez que el cliente pulsa
      "Imprimir ticket". Todo esto pasa en segundo plano: el cliente
      no ve ninguna ventana ni mensaje del sistema.

   Requisitos: Node.js instalado en el PC del kiosco. No usa ninguna
   librería externa (solo módulos incluidos en Node).
   ═══════════════════════════════════════════════════════════════ */

const http = require('http');
const fs = require('fs');
const path = require('path');
const { execFile } = require('child_process');

const PORT = 5217;
const TICKETS_DIR = path.join(__dirname, 'tickets-impresos');

if (!fs.existsSync(TICKETS_DIR)) fs.mkdirSync(TICKETS_DIR, { recursive: true });

function withCors(res) {
  // El kiosco se sirve en su propio puerto (p.ej. 3877); este ayudante
  // corre en otro, así que hace falta CORS para que fetch() no lo bloquee.
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
}

function safeOrderNum(n) {
  const s = String(n).replace(/[^a-zA-Z0-9_-]/g, '');
  return s || 'sin-numero';
}

// Envía el archivo a la impresora predeterminada de Windows sin abrir
// ninguna ventana ni diálogo, usando PowerShell en segundo plano.
function printFileSilently(filePath, cb) {
  const psCommand = `Get-Content -LiteralPath "${filePath}" -Raw -Encoding UTF8 | Out-Printer`;
  execFile(
    'powershell.exe',
    ['-NoProfile', '-NonInteractive', '-WindowStyle', 'Hidden', '-Command', psCommand],
    { windowsHide: true, timeout: 15000 },
    (err, stdout, stderr) => {
      if (err) { cb(err); return; }
      cb(null);
    }
  );
}

const server = http.createServer((req, res) => {
  withCors(res);

  if (req.method === 'OPTIONS') { res.writeHead(204); res.end(); return; }

  if (req.method === 'GET' && req.url === '/salud') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (req.method === 'POST' && req.url === '/imprimir') {
    let body = '';
    req.on('data', chunk => { body += chunk; if (body.length > 2_000_000) req.destroy(); });
    req.on('end', () => {
      let data;
      try { data = JSON.parse(body); } catch {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'JSON inválido' }));
        return;
      }

      const orderNum = safeOrderNum(data.orderNum);
      const text = typeof data.text === 'string' ? data.text : '';
      if (!text) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: false, error: 'Falta el texto del ticket' }));
        return;
      }

      const filePath = path.join(TICKETS_DIR, `pedido-${orderNum}.txt`);
      fs.writeFile(filePath, text, 'utf8', (writeErr) => {
        if (writeErr) {
          console.warn('[print-helper] Error guardando el ticket:', writeErr);
          res.writeHead(500, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: false, error: 'No se pudo guardar el ticket' }));
          return;
        }
        console.log(`[print-helper] Guardado ${filePath}`);

        printFileSilently(filePath, (printErr) => {
          if (printErr) {
            console.warn('[print-helper] Error al imprimir:', printErr);
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ ok: false, saved: true, error: 'No se pudo enviar a la impresora' }));
            return;
          }
          console.log(`[print-helper] Enviado a la impresora: pedido-${orderNum}`);
          res.writeHead(200, { 'Content-Type': 'application/json' });
          res.end(JSON.stringify({ ok: true, saved: true, printed: true }));
        });
      });
    });
    return;
  }

  res.writeHead(404, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify({ ok: false, error: 'No encontrado' }));
});

server.listen(PORT, '127.0.0.1', () => {
  console.log(`[print-helper] Escuchando en http://localhost:${PORT}`);
  console.log(`[print-helper] Tickets guardados en: ${TICKETS_DIR}`);
});
