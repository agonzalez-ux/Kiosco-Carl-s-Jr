'use strict';

/**
 * Cloudflare Worker — Stripe backend para el kiosco Carl's Jr
 *
 * Cómo desplegar:
 *  1. Instala Wrangler: npm install -g wrangler
 *  2. Inicia sesión: wrangler login
 *  3. Crea el secret: wrangler secret put STRIPE_SECRET_KEY
 *     (pega tu sk_test_... o sk_live_...)
 *  4. Despliega: wrangler deploy
 *  5. Copia la URL que muestra Wrangler (algo como https://stripe-worker.TU-SUBDOMINIO.workers.dev)
 *     y pégala en WORKER_URL dentro de app.js
 */

export default {
  async fetch(request, env) {
    // CORS — el kiosco puede estar en cualquier origen (GitHub Pages, local, etc.)
    const corsHeaders = {
      'Access-Control-Allow-Origin':  '*',
      'Access-Control-Allow-Methods': 'POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { status: 204, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(JSON.stringify({ error: 'Invalid JSON' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    const { action, ...params } = body;

    if (action === 'create_intent') {
      return handleCreateIntent(params, env, corsHeaders);
    }

    return new Response(JSON.stringify({ error: 'Unknown action' }), {
      status: 400,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  },
};

/**
 * Crea un PaymentIntent en Stripe.
 * El frontend recibe el client_secret y confirma el pago con Stripe.js.
 */
async function handleCreateIntent({ amountCents, currency = 'eur', description }, env, corsHeaders) {
  if (!amountCents || amountCents < 50) {
    return jsonResponse({ error: 'amount_cents must be >= 50' }, 400, corsHeaders);
  }

  const formData = new URLSearchParams({
    amount:   String(Math.round(amountCents)),
    currency,
    'automatic_payment_methods[enabled]': 'true',
    description: description || "Carl's Jr — Pedido kiosco",
  });

  const stripeRes = await fetch('https://api.stripe.com/v1/payment_intents', {
    method:  'POST',
    headers: {
      'Authorization': `Bearer ${env.STRIPE_SECRET_KEY}`,
      'Content-Type':  'application/x-www-form-urlencoded',
    },
    body: formData.toString(),
  });

  const data = await stripeRes.json();

  if (!stripeRes.ok) {
    return jsonResponse({ error: data.error?.message || 'Stripe error' }, 502, corsHeaders);
  }

  // Solo devolvemos el client_secret — la clave secreta nunca sale del Worker
  return jsonResponse({ clientSecret: data.client_secret }, 200, corsHeaders);
}

function jsonResponse(body, status, corsHeaders) {
  return new Response(JSON.stringify(body), {
    status,
    headers: { ...corsHeaders, 'Content-Type': 'application/json' },
  });
}
