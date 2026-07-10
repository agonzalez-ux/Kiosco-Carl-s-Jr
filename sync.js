'use strict';

// ══════════════════════════════════════════════════════════════
//  CONFIGURACIÓN FIREBASE
//  Necesario para sincronizar kiosco ↔ KDS ↔ cliente
//  entre dispositivos distintos.
//
//  Pasos:
//  1. Ve a https://console.firebase.google.com
//  2. Crea un proyecto (p.ej. "carlsjr-kiosko")
//  3. Menú izquierdo → Build → Realtime Database
//     → Crear base de datos → Modo de prueba → Europa
//  4. Ajustes del proyecto (⚙) → Tus apps → </> Web
//     → Registra la app → copia el objeto firebaseConfig
//  5. Pégalo aquí sustituyendo el null:
// ══════════════════════════════════════════════════════════════
const FIREBASE_CONFIG = {
  apiKey: "AIzaSyAhb2aE8Zg6hR-J-tsUBHTCsbzI1Wn8eeI",
  authDomain: "carlsjr-kiosko.firebaseapp.com",
  databaseURL: "https://carlsjr-kiosko-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "carlsjr-kiosko",
  storageBucket: "carlsjr-kiosko.firebasestorage.app",
  messagingSenderId: "254893634722",
  appId: "1:254893634722:web:098aee72f81d10db7e93fb"
};

// Ejemplo (sustituye con tus valores reales):
// const FIREBASE_CONFIG = {
//   apiKey:            "AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
//   authDomain:        "carlsjr-kiosko.firebaseapp.com",
//   databaseURL:       "https://carlsjr-kiosko-default-rtdb.europe-west1.firebasedatabase.app",
//   projectId:         "carlsjr-kiosko",
//   storageBucket:     "carlsjr-kiosko.appspot.com",
//   messagingSenderId: "000000000000",
//   appId:             "1:000000000000:web:xxxxxxxxxxxx"
// };

// ── Reglas de Realtime Database recomendadas (modo demo) ──
// {
//   "rules": {
//     ".read":  true,
//     ".write": true
//   }
// }
// ─────────────────────────────────────────────────────────────

const LS_ORDERS = 'cj-kds-orders';
const LS_NUM    = 'cj-order-num';
const FB_PATH   = 'carlsjr';

const CJSync = (function () {
  let db       = null;
  let ready    = false;
  let initDone = false;

  /* ── Init ── */
  function _init() {
    if (initDone) return;
    initDone = true;
    if (!FIREBASE_CONFIG || typeof firebase === 'undefined') return;
    try {
      if (!firebase.apps.length) firebase.initializeApp(FIREBASE_CONFIG);
      db = firebase.database();
      ready = true;
    } catch (e) {
      console.warn('[CJSync] Firebase init error:', e);
    }
  }

  /* ── Guardar pedidos ── */
  function saveOrders(orders) {
    _init();
    // Siempre persistir en localStorage como caché local
    try { localStorage.setItem(LS_ORDERS, JSON.stringify(orders)); } catch (_) {}
    if (!ready) return;
    db.ref(FB_PATH + '/orders')
      .set({ data: JSON.stringify(orders), ts: Date.now() })
      .catch(e => console.warn('[CJSync] saveOrders error:', e));
  }

  /* ── Número de pedido (transacción atómica cross-device) ── */
  function nextOrderNum(cb) {
    _init();
    if (!ready) {
      // Fallback local
      const n = (parseInt(localStorage.getItem(LS_NUM) || '0', 10) % 200) + 1;
      localStorage.setItem(LS_NUM, String(n));
      cb(n);
      return;
    }
    db.ref(FB_PATH + '/orderNum').transaction(current => {
      return ((current || 0) % 200) + 1;
    }).then(result => {
      const n = result.snapshot.val();
      localStorage.setItem(LS_NUM, String(n));
      cb(n);
    }).catch(() => {
      // Fallback local si la transacción falla
      const n = (parseInt(localStorage.getItem(LS_NUM) || '0', 10) % 200) + 1;
      localStorage.setItem(LS_NUM, String(n));
      cb(n);
    });
  }

  /* ── Escuchar cambios en tiempo real ── */
  function onOrdersChange(callback) {
    _init();
    if (!ready) return false;
    db.ref(FB_PATH + '/orders').on('value', snap => {
      try {
        const val = snap.val();
        if (!val) return;
        const orders = JSON.parse(val.data || '[]');
        // Mantener localStorage sincronizado
        localStorage.setItem(LS_ORDERS, JSON.stringify(orders));
        callback(orders);
      } catch (e) {
        console.warn('[CJSync] onOrdersChange parse error:', e);
      }
    });
    return true;
  }

  /* ── ¿Firebase disponible? ── */
  function isEnabled() {
    _init();
    return ready;
  }

  return { saveOrders, nextOrderNum, onOrdersChange, isEnabled };
})();
