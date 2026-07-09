'use strict';

/* ═══════════════════════════════════════════════════
   CARL'S JR — KIOSCO CLIENTE
   ═══════════════════════════════════════════════════ */

const EUR = new Intl.NumberFormat('es-ES', { style: 'currency', currency: 'EUR' });

/* ─── IFRAME-SAFE MODAL ─── */
function safeModal(dialog) {
  try {
    dialog.showModal();
  } catch (e) {
    // Fallback for iframes without allow-modals (e.g. Admira player)
    let bd = dialog._bd;
    if (!bd) {
      bd = document.createElement('div');
      bd.className = 'modal-bd';
      bd.style.cssText = 'position:fixed;inset:0;background:rgba(0,0,0,.75);z-index:998;';
      bd.addEventListener('click', () => safeClose(dialog));
      dialog._bd = bd;
    }
    if (!bd.isConnected) document.body.insertBefore(bd, dialog);
    dialog.style.zIndex = '999';
    dialog.show();
  }
}
function safeClose(dialog) {
  dialog.close();
  if (dialog._bd && dialog._bd.isConnected) dialog._bd.remove();
}

/* ─── PRODUCTOS (reales de carlsjr.es) ─── */
const PRODUCTS = [
  /* HAMBURGUESAS */
  {
    id: 'big-carl', cat: 'burgers', name: 'The Big Carl',
    desc: 'Doble carne de vacuno a la parrilla, queso Cheddar, lechuga y Salsa Clásica Big Carl. Un clásico con carácter.',
    price: 8.95, tags: ['Top ventas', 'Carne'], badge: '🔥 Más pedido',
    badgeStyle: '',
    img: 'https://carlsjr.es/wp-content/uploads/2023/04/Diseno-sin-titulo-2024-06-19T125728.106.png',
    protein: 'beef', hunger: 'high', stars: 5, mods: ['no-onion','no-tomato','no-sauce','extra-cheese','extra-bacon'], extras: ['extra-cheese','extra-bacon']
  },
  {
    id: 'western-bacon', cat: 'burgers', name: 'Western Bacon Cheeseburger',
    desc: 'Carne a la parrilla, bacon ahumado, queso Cheddar, aros de cebolla crujientes y salsa BBQ.',
    price: 9.45, tags: ['BBQ', 'Bacon'], badge: 'Favorito',
    badgeStyle: 'yellow',
    img: 'https://carlsjr.es/wp-content/uploads/2023/04/Western-Bacon-Cheeseburger-nueva.png',
    protein: 'beef', hunger: 'high', stars: 5, mods: ['no-onion','no-tomato','no-sauce','extra-cheese','extra-bacon'], extras: ['extra-cheese','extra-bacon']
  },
  {
    id: 'famous-star', cat: 'burgers', name: 'Famous Star',
    desc: 'La burger icónica: carne a la parrilla, queso, tomate fresco, lechuga, cebolla y salsa especial.',
    price: 7.95, tags: ['Clásica'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Famous-Star.png',
    protein: 'beef', hunger: 'medium', stars: 4, mods: ['no-onion','no-tomato','no-sauce','extra-cheese'], extras: ['extra-cheese']
  },
  {
    id: 'super-star', cat: 'burgers', name: 'Super Star',
    desc: 'Doble carne charbroiled, doble queso Cheddar, tomate, lechuga, mayonesa y salsa especial.',
    price: 10.45, tags: ['Premium', 'Doble'], badge: 'Premium',
    badgeStyle: 'yellow',
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Super-Star-1-1.png',
    protein: 'beef', hunger: 'high', stars: 5, mods: ['no-onion','no-tomato','no-sauce','extra-cheese','extra-bacon'], extras: ['extra-cheese','extra-bacon']
  },
  {
    id: 'guacamole-angus', cat: 'burgers', name: 'Guacamole Bacon Gran Angus',
    desc: 'Hamburguesa Angus 100%, guacamole, bacon crujiente, queso Suizo, lechuga, tomate, cebolla morada y Salsa Santa Fe.',
    price: 11.95, tags: ['Angus', 'Premium', 'Guacamole'], badge: 'Premium',
    badgeStyle: 'yellow',
    img: 'https://carlsjr.es/wp-content/uploads/2023/04/Diseno-sin-titulo-2024-05-30T111453.743.png',
    protein: 'beef', hunger: 'high', stars: 5, mods: ['no-onion','no-tomato','no-sauce','extra-cheese','extra-bacon'], extras: ['extra-cheese','extra-bacon']
  },
  {
    id: 'bacon-cheese-angus', cat: 'burgers', name: 'Bacon Cheese Gran Angus',
    desc: 'Carne Angus 100%, doble bacon, queso Cheddar, cebolla caramelizada y nuestra salsa especial.',
    price: 11.45, tags: ['Angus', 'Bacon'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2025/06/Single-BaconCheese-Gran-Angus_500x500px.png',
    protein: 'beef', hunger: 'high', stars: 4, mods: ['no-onion','no-sauce','extra-cheese','extra-bacon'], extras: ['extra-cheese','extra-bacon']
  },
  {
    id: 'texas-angus', cat: 'burgers', name: 'Texas Bacon Gran Angus',
    desc: 'Angus, bacon ahumado doble, queso Cheddar extra, jalapeños, salsa BBQ y cebolla crujiente.',
    price: 12.45, tags: ['Angus', 'Picante', 'Texas'], badge: '🌶 Hot',
    badgeStyle: '',
    img: 'https://carlsjr.es/wp-content/uploads/2025/01/Single-Texas-Bacon-Gran-Angus_500x500px.png',
    protein: 'beef', hunger: 'high', stars: 4, mods: ['no-onion','no-sauce','extra-cheese','extra-bacon'], extras: ['extra-cheese','extra-bacon']
  },
  {
    id: 'bacon-trufa', cat: 'burgers', name: 'Bacon Trufa',
    desc: 'Carne charbroiled, queso Cheddar, bacon crujiente y la irresistible salsa de trufa negra.',
    price: 10.95, tags: ['Trufa', 'Gourmet'], badge: 'Nuevo',
    badgeStyle: 'green',
    img: 'https://carlsjr.es/wp-content/uploads/2025/12/Bacon_trufa_single.png',
    protein: 'beef', hunger: 'high', stars: 5, mods: ['no-onion','no-sauce','extra-cheese','extra-bacon'], extras: ['extra-cheese','extra-bacon']
  },
  {
    id: 'original-angus', cat: 'burgers', name: 'Original Gran Angus',
    desc: 'La hamburguesa Angus 100% en su expresión más pura: carne, queso, lechuga, tomate y mayonesa.',
    price: 10.95, tags: ['Angus', 'Clásica'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/04/Original_Gran_Angu.png',
    protein: 'beef', hunger: 'high', stars: 4, mods: ['no-onion','no-tomato','no-sauce','extra-cheese'], extras: ['extra-cheese']
  },
  {
    id: 'famous-crispy-chicken', cat: 'burgers', name: 'Famous Crispy Chicken',
    desc: 'Pechuga de pollo crujiente con queso Cheddar, mayonesa, salsa especial, lechuga, tomate, cebolla y pepinillos.',
    price: 8.75, tags: ['Pollo', 'Crujiente'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2025/04/Single-Famous-Crispy-Chicken_500x500px.png',
    protein: 'chicken', hunger: 'medium', stars: 4, mods: ['no-onion','no-tomato','no-sauce','extra-cheese'], extras: ['extra-cheese']
  },
  {
    id: 'famous-grilled-chicken', cat: 'burgers', name: 'Famous Grilled Chicken',
    desc: 'Pechuga de pollo a la plancha, queso Cheddar, mayonesa, salsa especial, lechuga, tomate, cebolla y pepinillos.',
    price: 8.25, tags: ['Pollo', 'Plancha', 'Ligera'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2025/04/Single-Famous-Grilled-Chicken_500x500px.png',
    protein: 'chicken', hunger: 'medium', stars: 4, mods: ['no-onion','no-tomato','no-sauce','extra-cheese'], extras: ['extra-cheese']
  },
  {
    id: 'chicken-crispy-sandwich', cat: 'burgers', name: 'Chicken Crispy Sandwich',
    desc: 'Filete de pollo crujiente, lechuga, mayonesa y pepinillos. Sencillo y adictivo.',
    price: 7.95, tags: ['Pollo', 'Sándwich'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2025/04/Single-Chicken-Crispy-Sandwich_500x500px.png',
    protein: 'chicken', hunger: 'medium', stars: 3, mods: ['no-onion','no-sauce','extra-cheese'], extras: ['extra-cheese']
  },
  {
    id: 'moving-mountains', cat: 'burgers', name: 'Moving Mountains Famous Star',
    desc: 'Proteína 100% vegetal Moving Mountains, queso Cheddar, tomate, pepinillos, cebolla, mayonesa y salsa especial.',
    price: 9.25, tags: ['Vegetal', '100% Plant'], badge: '🌱 Plant',
    badgeStyle: 'green',
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Moving-Mountains-Famous-Star-1.png',
    protein: 'plant', hunger: 'medium', stars: 4, mods: ['no-onion','no-tomato','no-sauce','extra-cheese'], extras: ['extra-cheese']
  },
  /* COMBOS */
  {
    id: 'combo-super-star', cat: 'combos', name: 'Menú Super Star',
    desc: 'Super Star + Patatas Medianas + Bebida Refill. El combo más popular del kiosco.',
    price: 12.95, tags: ['Combo', 'Completo'], badge: '⭐ Top Combo',
    badgeStyle: 'yellow',
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Super-Star-1-1.png',
    protein: 'beef', hunger: 'high', stars: 5, combo: true, mods: [], extras: []
  },
  {
    id: 'combo-big-carl', cat: 'combos', name: 'Menú The Big Carl',
    desc: 'The Big Carl + Crisscuts Medianos + Bebida Refill. El dúo perfecto.',
    price: 12.95, tags: ['Combo', 'Big Carl'], badge: '🔥 Más pedido',
    badgeStyle: '',
    img: 'https://carlsjr.es/wp-content/uploads/2023/04/Diseno-sin-titulo-2024-06-19T125728.106.png',
    protein: 'beef', hunger: 'high', stars: 5, combo: true, mods: [], extras: []
  },
  {
    id: 'combo-western', cat: 'combos', name: 'Menú Western Bacon',
    desc: 'Western Bacon + Patatas Medianas + Bebida Refill. La leyenda de la barbacoa.',
    price: 13.45, tags: ['Combo', 'BBQ'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/04/Western-Bacon-Cheeseburger-nueva.png',
    protein: 'beef', hunger: 'high', stars: 4, combo: true, mods: [], extras: []
  },
  {
    id: 'combo-chicken-crispy', cat: 'combos', name: 'Menú Chicken Crispy Sandwich',
    desc: 'Chicken Crispy Sandwich + Patatas Medianas + Bebida Refill.',
    price: 11.95, tags: ['Combo', 'Pollo'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2025/04/Single-Chicken-Crispy-Sandwich_500x500px.png',
    protein: 'chicken', hunger: 'high', stars: 4, combo: true, mods: [], extras: []
  },
  /* COMPLEMENTOS */
  {
    id: 'crisscuts', cat: 'sides', name: 'Crisscuts',
    desc: 'Las patatas más icónicas de Carl\'s Jr. Crujientes por fuera, esponjosas por dentro.',
    price: 3.75, tags: ['Clásico'], badge: '🔥 Imprescindible',
    badgeStyle: '',
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/crisscuts-2.png',
    protein: 'side', hunger: 'low', stars: 5, mods: [], extras: []
  },
  {
    id: 'fries', cat: 'sides', name: 'Patatas Fritas',
    desc: 'Patatas fritas doradas al punto perfecto.',
    price: 2.95, tags: ['Clásico'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Patatas-Fritas.png',
    protein: 'side', hunger: 'low', stars: 4, mods: [], extras: []
  },
  {
    id: 'nuggets', cat: 'sides', name: 'Chicken Nuggets',
    desc: 'Nuggets de pollo 100% pechuga, crujientes y jugosos.',
    price: 3.95, tags: ['Pollo'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Chicken-Nuggets.png',
    protein: 'chicken', hunger: 'low', stars: 4, mods: [], extras: []
  },
  /* POSTRES */
  {
    id: 'twist-oreo', cat: 'desserts', name: 'Twist Oreo',
    desc: 'Helado suave con sirope y topping crujiente de Oreo.',
    price: 3.95, tags: ['Oreo', 'Postre'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2026/02/twist-oreo-1024x1024.png',
    protein: 'dessert', hunger: 'low', stars: 5, mods: [], extras: []
  },
  {
    id: 'shake-oreo', cat: 'desserts', name: 'American Shake Oreo',
    desc: 'Batido cremoso American-style con galleta Oreo. Espeso y adictivo.',
    price: 4.95, tags: ['Shake', 'Oreo'], badge: 'Favorito',
    badgeStyle: 'yellow',
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/American_Shake_Oreo_500x500.png',
    protein: 'dessert', hunger: 'low', stars: 5, mods: [], extras: []
  },
  {
    id: 'shake-chocolate', cat: 'desserts', name: 'American Shake Chocolate',
    desc: 'Batido de chocolate intenso con helado cremoso y nata.',
    price: 4.95, tags: ['Shake', 'Chocolate'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/American_Shake_Chocolate-500x500px.png',
    protein: 'dessert', hunger: 'low', stars: 4, mods: [], extras: []
  },
  {
    id: 'shake-fresa', cat: 'desserts', name: 'American Shake Fresa',
    desc: 'Batido de fresa natural con un toque cremoso irresistible.',
    price: 4.95, tags: ['Shake', 'Fresa'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/American_Shake_fresa-500x500px.png',
    protein: 'dessert', hunger: 'low', stars: 4, mods: [], extras: []
  },
  /* BEBIDAS */
  {
    id: 'refrescos', cat: 'drinks', name: 'Refresco Refill',
    desc: 'Elige tu favorito: Coca-Cola, Fanta Naranja, Sprite, Aquarius, Fuze Tea o Monster. Vaso refill.',
    price: 2.95, tags: ['Refill'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Refresco_Vaso_Cocacola-sabor-original.png',
    protein: 'drink', hunger: 'low', stars: 4, mods: [], extras: []
  },
  {
    id: 'cafe-te', cat: 'drinks', name: 'Café y Té',
    desc: 'Café solo, cortado, con leche, té negro o manzanilla.',
    price: 2.45, tags: ['Caliente'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Cafe-y-Te-carls-jr-bebidas-2.png',
    protein: 'drink', hunger: 'low', stars: 3, mods: [], extras: []
  },
  /* ENSALADAS */
  {
    id: 'crispy-salad', cat: 'salads', name: 'Chicken Crispy Salad',
    desc: 'Pollo crujiente, lechuga variada, cebolla morada, tomate cherry y croutons.',
    price: 8.95, tags: ['Ensalada', 'Pollo'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Ensalada_crispy_plato_blanco_500x500px.png',
    protein: 'chicken', hunger: 'medium', stars: 4, mods: [], extras: []
  },
  {
    id: 'grilled-salad', cat: 'salads', name: 'Chicken Grilled Salad',
    desc: 'Pollo a la parrilla marinado, lechuga variada, tomate cherry y croutons.',
    price: 8.95, tags: ['Ensalada', 'Plancha', 'Light'], badge: null,
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Chicken_Grilled_Salad_plato_blanco-500x500px.png',
    protein: 'chicken', hunger: 'medium', stars: 4, mods: [], extras: []
  },
  /* MENÚ INFANTIL */
  {
    id: 'kids-burger', cat: 'kids', name: 'Menú Little Stars Burger',
    desc: 'Hamburguesa + Patatas Pequeñas + Bebida + Bebedino. ¡La sorpresa del Bebedino incluida!',
    price: 6.95, tags: ['Infantil', 'Completo'], badge: '⭐ Little Stars',
    badgeStyle: 'yellow',
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Bodegon_Menu_infantil_Bebidino_Hamburger_500x500px.png',
    protein: 'beef', hunger: 'medium', stars: 5, combo: true, mods: ['no-onion','no-sauce'], extras: []
  },
  {
    id: 'kids-nuggets', cat: 'kids', name: 'Menú Little Stars Nuggets',
    desc: '4 Nuggets de pollo + Patatas Pequeñas + Bebida + Bebedino.',
    price: 6.75, tags: ['Infantil', 'Pollo'], badge: '⭐ Little Stars',
    badgeStyle: 'yellow',
    img: 'https://carlsjr.es/wp-content/uploads/2023/03/Bodegon_Menu_infantil_Bebidino_Nuggets_500x500px.png',
    protein: 'chicken', hunger: 'medium', stars: 5, combo: true, mods: [], extras: []
  },
  /* MYSTERY */
  {
    id: 'mystery-carls', cat: 'combos', name: "Mystery Carl's",
    desc: 'Menú sorpresa preparado especialmente para ti. El chef elige lo que más te conviene hoy. ¡Descúbrelo cuando llegue a la bandeja!',
    price: 13.95, tags: ['Sorpresa', 'Misterio'], badge: '🎲 Sorpresa',
    badgeStyle: 'mystery',
    img: '',
    protein: 'mystery', hunger: 'any', stars: 5, isMystery: true, combo: true, mods: [], extras: []
  }
];

/* ─── PRODUCT TRANSLATIONS (EN) ─── */
const PRODUCT_I18N = {
  'big-carl':              { name: 'The Big Carl',                    desc: 'Double charbroiled beef, Cheddar cheese, lettuce and Classic Big Carl Sauce. A classic with character.' },
  'western-bacon':         { name: 'Western Bacon Cheeseburger',      desc: 'Charbroiled beef, smoked bacon, Cheddar cheese, crispy onion rings and BBQ sauce.' },
  'famous-star':           { name: 'Famous Star',                     desc: 'The iconic burger: charbroiled beef, cheese, fresh tomato, lettuce, onion and special sauce.' },
  'super-star':            { name: 'Super Star',                      desc: 'Double charbroiled beef, double Cheddar cheese, tomato, lettuce, mayo and special sauce.' },
  'guacamole-angus':       { name: 'Guacamole Bacon Gran Angus',      desc: '100% Angus beef, guacamole, crispy bacon, Swiss cheese, lettuce, tomato, red onion and Santa Fe Sauce.' },
  'bacon-cheese-angus':    { name: 'Bacon Cheese Gran Angus',         desc: '100% Angus beef, double bacon, Cheddar cheese, caramelized onion and our special sauce.' },
  'texas-angus':           { name: 'Texas Bacon Gran Angus',          desc: 'Angus beef, double smoked bacon, extra Cheddar, jalapeños, BBQ sauce and crispy onion.' },
  'bacon-trufa':           { name: 'Bacon Truffle',                   desc: 'Charbroiled beef, Cheddar cheese, crispy bacon and irresistible black truffle sauce.' },
  'original-angus':        { name: 'Original Gran Angus',             desc: '100% Angus beef at its purest: beef, cheese, lettuce, tomato and mayo.' },
  'famous-crispy-chicken': { name: 'Famous Crispy Chicken',           desc: 'Crispy chicken breast with Cheddar cheese, mayo, special sauce, lettuce, tomato, onion and pickles.' },
  'famous-grilled-chicken':{ name: 'Famous Grilled Chicken',          desc: 'Grilled chicken breast, Cheddar cheese, mayo, special sauce, lettuce, tomato, onion and pickles.' },
  'chicken-crispy-sandwich':{ name: 'Chicken Crispy Sandwich',        desc: 'Crispy chicken fillet, lettuce, mayo and pickles. Simple and addictive.' },
  'moving-mountains':      { name: 'Moving Mountains Famous Star',    desc: '100% plant-based Moving Mountains protein, Cheddar cheese, tomato, pickles, onion, mayo and special sauce.' },
  'combo-super-star':      { name: 'Super Star Combo',                desc: 'Super Star + Medium Fries + Refill Drink. The most popular combo at the kiosk.' },
  'combo-big-carl':        { name: 'The Big Carl Combo',              desc: 'The Big Carl + Medium Crisscuts + Refill Drink. The perfect duo.' },
  'combo-western':         { name: 'Western Bacon Combo',             desc: 'Western Bacon + Medium Fries + Refill Drink. The BBQ legend.' },
  'combo-chicken-crispy':  { name: 'Chicken Crispy Sandwich Combo',   desc: 'Chicken Crispy Sandwich + Medium Fries + Refill Drink.' },
  'crisscuts':             { name: 'Crisscuts',                       desc: "Carl's Jr most iconic fries. Crispy outside, fluffy inside." },
  'fries':                 { name: 'French Fries',                    desc: 'Golden fries cooked to perfection.' },
  'nuggets':               { name: 'Chicken Nuggets',                 desc: '100% chicken breast nuggets, crispy and juicy.' },
  'twist-oreo':            { name: 'Twist Oreo',                      desc: 'Soft-serve ice cream with syrup and crunchy Oreo topping.' },
  'shake-oreo':            { name: 'American Shake Oreo',             desc: 'Creamy American-style shake with Oreo cookie. Thick and addictive.' },
  'shake-chocolate':       { name: 'American Shake Chocolate',        desc: 'Rich chocolate shake with creamy ice cream and whipped cream.' },
  'shake-fresa':           { name: 'American Strawberry Shake',       desc: 'Natural strawberry shake with an irresistible creamy twist.' },
  'refrescos':             { name: 'Refill Soda',                     desc: 'Pick your favorite: Coca-Cola, Fanta Orange, Sprite, Aquarius, Fuze Tea or Monster. Refill cup.' },
  'cafe-te':               { name: 'Coffee & Tea',                    desc: 'Espresso, cortado, white coffee, black tea or chamomile.' },
  'crispy-salad':          { name: 'Chicken Crispy Salad',            desc: 'Crispy chicken, mixed greens, red onion, cherry tomato and croutons.' },
  'grilled-salad':         { name: 'Chicken Grilled Salad',           desc: 'Marinated grilled chicken, mixed greens, cherry tomato and croutons.' },
  'kids-burger':           { name: 'Little Stars Burger Combo',       desc: 'Burger + Small Fries + Drink + Bebedino cup. Bebedino surprise included!' },
  'kids-nuggets':          { name: 'Little Stars Nuggets Combo',      desc: '4 Chicken Nuggets + Small Fries + Drink + Bebedino cup.' },
  'mystery-carls':         { name: "Mystery Carl's",                  desc: "Surprise combo made just for you. The chef picks what suits you best today. Discover it when it hits your tray!" },
};

const CATEGORIES = [
  { id: 'burgers',  label: 'Hamburguesas', icon: '🍔' },
  { id: 'combos',   label: 'Menús',        icon: '⭐' },
  { id: 'sides',    label: 'Complementos', icon: '🍟' },
  { id: 'desserts', label: 'Postres',      icon: '🥛' },
  { id: 'drinks',   label: 'Bebidas',      icon: '🥤' },
  { id: 'salads',   label: 'Ensaladas',    icon: '🥗' },
  { id: 'kids',     label: 'Infantil',     icon: '🌟' }
];

const MODIFIERS = [
  { id: 'no-onion',     label: 'Sin cebolla',    price: 0 },
  { id: 'no-tomato',    label: 'Sin tomate',     price: 0 },
  { id: 'no-sauce',     label: 'Sin salsa',      price: 0 },
  { id: 'extra-cheese', label: 'Extra queso',    price: 0.80 },
  { id: 'extra-bacon',  label: 'Extra bacon',    price: 1.20 }
];

const PAYMENT_METHODS = [
  { id: 'card',    label: 'Tarjeta',     icon: '💳' },
  { id: 'contactless', label: 'Contactless', icon: '📱' },
  { id: 'apple',   label: 'Apple Pay',   icon: '🍎' },
  { id: 'google',  label: 'Google Pay',  icon: '🔵' },
  { id: 'cash',    label: 'Efectivo',    icon: '💵' },
  { id: 'qr',      label: 'QR / Bizum',  icon: '🔲' }
];

const QUIZ = [
  {
    id: 'protein',
    q: '¿Qué te apetece hoy?',
    opts: [
      { id: 'beef',    icon: '🥩', label: 'Carne a la parrilla' },
      { id: 'chicken', icon: '🍗', label: 'Pollo crujiente' },
      { id: 'plant',   icon: '🌱', label: 'Vegetal' }
    ]
  },
  {
    id: 'hunger',
    q: '¿Cuánta hambre tienes?',
    opts: [
      { id: 'low',    icon: '🙂', label: 'Algo ligero' },
      { id: 'medium', icon: '😋', label: 'Tengo hambre' },
      { id: 'high',   icon: '🔥', label: '¡Muuucha hambre!' }
    ]
  },
  {
    id: 'style',
    q: '¿Cuál es tu rollo hoy?',
    opts: [
      { id: 'classic', icon: '⭐', label: 'El clásico de siempre' },
      { id: 'bacon',   icon: '🥓', label: 'Bacon & BBQ' },
      { id: 'premium', icon: '👑', label: 'Premium Angus' }
    ]
  },
  {
    id: 'budget',
    q: '¿Quieres completarlo en combo?',
    opts: [
      { id: 'solo',  icon: '🍔', label: 'Solo la burger' },
      { id: 'combo', icon: '🍟', label: 'Sí, con patatas + bebida' },
      { id: 'full',  icon: '🎉', label: 'Todo: + postre también' }
    ]
  },
  {
    id: 'sweet',
    q: '¿Rematas con algo dulce?',
    opts: [
      { id: 'shake',  icon: '🥛', label: 'Batido helado' },
      { id: 'ice',    icon: '🍦', label: 'Twist Oreo' },
      { id: 'none',   icon: '🙅', label: 'Sin postre, gracias' }
    ]
  }
];

/* ─── UPSELLS CONTEXTUALES (configurables) ─── */
const UPSELL_RULES = [
  { triggerCat: 'burgers', offerProduct: 'crisscuts',  msgKey: 'upsellBurgerMsg', descKey: 'upsellBurgerDesc' },
  { triggerCat: 'burgers', offerProduct: 'refrescos',  msgKey: 'upsellDrinkMsg',  descKey: 'upsellDrinkDesc' },
  { triggerCat: 'sides',   offerProduct: 'shake-oreo', msgKey: 'upsellShakeMsg',  descKey: 'upsellShakeDesc' },
  { triggerCat: 'combos',  offerProduct: 'twist-oreo', msgKey: 'upsellTwistMsg',  descKey: 'upsellTwistDesc' }
];

/* ─── TRANSLATIONS ─── */
const LANGS = {
  es: {
    eyebrow: 'Bigger. Better. Burgers.',
    title: 'Haz tu pedido<br>a lo grande',
    btnLogin: 'Iniciar sesión y sumar puntos ⭐',
    btnGuest: 'Continuar sin cuenta',
    lsTitle: 'Entra con tu cuenta',
    lsSub: 'Escanea el QR con tu móvil o rellena el formulario aquí',
    lsQrHint: '📱 Apunta la cámara',
    lsDivider: 'o rellena aquí',
    lsNameLabel: 'Tu nombre', lsNamePh: 'Ej. María',
    lsEmailLabel: 'Email (para acumular puntos)', lsEmailPh: 'maria@email.com',
    lsSubmit: '¡Entrar y sumar puntos! ⭐',
    lsBack: '← Volver',
    catBurgers: 'Hamburguesas', catCombos: 'Menús', catSides: 'Complementos',
    catDesserts: 'Postres', catDrinks: 'Bebidas', catSalads: 'Ensaladas', catKids: 'Infantil',
    aiBtn: '✨ Sorpréndeme',
    dcTitle: 'Reto del día:', dcText: 'Toca aquí para añadir Crisscuts y ganar', dcPts: '+50 puntos',
    cartTitle: 'Tu pedido', fabCart: 'Mi pedido',
    cartEmpty: 'Tu carrito está vacío.\n¡Elige algo delicioso!',
    subtotal: 'Subtotal', tax: 'IVA (10%)', total: 'Total',
    payBtn: 'Pagar',
    howPay: '¿Cómo pagas?', confirmPay: 'Confirmar pago', backOrder: 'Volver al pedido',
    orderPlaced: '¡Pedido enviado!',
    pointsEarned: (n) => `Has ganado <strong>+${n}</strong> puntos ⭐`,
    sendTicket: 'Enviar ticket a mi email ✓', ticketSent: '✅ ¡Ticket enviado!',
    ticketSentTo: (email) => `✅ ¡Ticket enviado a ${email}!`,
    ticketQuestion: '¿Quieres recibir el ticket en tu email?',
    registerTicket: '⭐ Regístrate y recibe tu ticket',
    newOrder: 'Nuevo pedido',
    payCard: 'Tarjeta', payContactless: 'Contactless', payApple: 'Apple Pay',
    payGoogle: 'Google Pay', payCash: 'Efectivo', payQR: 'QR / Bizum',
    q1: '¿Qué te apetece hoy?', q1o1: 'Carne a la parrilla', q1o2: 'Pollo crujiente', q1o3: 'Vegetal',
    q2: '¿Cuánta hambre tienes?', q2o1: 'Algo ligero', q2o2: 'Tengo hambre', q2o3: '¡Muuucha hambre!',
    q3: '¿Cuál es tu rollo hoy?', q3o1: 'El clásico de siempre', q3o2: 'Bacon & BBQ', q3o3: 'Premium Angus',
    q4: '¿Quieres completarlo en combo?', q4o1: 'Solo la burger', q4o2: 'Sí, con patatas + bebida', q4o3: 'Todo: + postre también',
    q5: '¿Rematas con algo dulce?', q5o1: 'Batido helado', q5o2: 'Twist Oreo', q5o3: 'Sin postre, gracias',
    quizThinking: 'Calculando tu combo perfecto...',
    quizEyebrow: '✨ Tu selección personalizada', quizSubtitle: 'Esto es lo que te recomendamos',
    quizTop: '⭐ Tu mejor opción', quizAlso: 'También te encantará',
    quizCheckout: '🛒 Ver pedido y pagar', quizContinue: '← Seguir comprando', quizRestart: '🔄 Repetir preguntas',
    mysteryLabel: '🎲 Comodín del chef', mysteryAdd: '🎲 ¡Me arriesgo!',
    mysteryRevealed: '¡Sorpresa añadida al pedido! 🎲',
    mysteryChooseDrink: 'Elige tu bebida — lo demás es sorpresa 🎲',
    mysteryAddBtn: '🎲 ¡Quiero esta sorpresa!',
    rdTitle: 'Crea tu cuenta', rdSub: 'Recibe tu ticket y acumula puntos en cada visita ⭐',
    rdName: 'Tu nombre', rdNamePh: 'Ej. María', rdEmail: 'Email', rdEmailPh: 'maria@email.com',
    rdSubmit: '¡Registrarme y recibir ticket! ⭐',
    countdownMsg: 'Nuevo pedido en',
    toastNameEmail: 'Rellena tu nombre y email',
    toastWelcome: (n) => `👋 ¡Bienvenido/a, ${n}! Gana puntos con cada pedido ⭐`,
    toastAdded: (n) => `✅ ${n} añadido`,
    toastDcDone: '🏆 ¡Reto completado! +50 puntos', toastDcRepeat: '🏆 ¡Reto ya completado!',
    toastTicketSent: '📧 Ticket enviado a tu email',
    toastRegistered: '✅ ¡Registrado! Ticket enviado a tu email',
    chooseDrink: '🥤 Elige tu bebida', chooseSide: '🍟 Elige tu acompañamiento',
    chooseDessert: '🍦 ¿Y de postre?', customizeBurger: '🍔 Personaliza tu hamburguesa',
    comboTotalLabel: 'Total del combo', addCombo: 'Añadir combo —',
    completeYourOrder: '✨ Completa tu pedido', included: 'Incluido',
    orderSummaryTitle: 'Resumen del pedido',
    noChanges: 'Sin cambios',
    extrasOptional: 'Extras (opcionales)', customization: 'Personalización',
    quantity: 'Cantidad', addItem: 'Añadir', addToCart: 'Añadir al pedido',
    quizBack: '← Volver',
    upsellAdd: (name) => `Añadir ${name}`,
    upsellBurgerMsg: '¿Y unas Crisscuts para acompañar?',
    upsellBurgerDesc: "Las favoritas de Carl's Jr, siempre crujientes.",
    upsellDrinkMsg: 'Añade un Refresco Refill',
    upsellDrinkDesc: 'Soda ilimitada mientras comes. ¡Por solo 2,95 €!',
    upsellShakeMsg: '¿Un batido Oreo para terminar?',
    upsellShakeDesc: "El mejor final para tu visita a Carl's Jr.",
    upsellTwistMsg: 'El toque final: Twist Oreo',
    upsellTwistDesc: 'Solo 3,95 €. Un pequeño extra para el final.',
    confirmPayLabel: 'Confirmar pago',
    backOrderLabel: 'Volver al pedido',
    'mod-no-onion': 'Sin cebolla', 'mod-no-tomato': 'Sin tomate', 'mod-no-sauce': 'Sin salsa',
    'mod-extra-cheese': 'Extra queso', 'mod-extra-bacon': 'Extra bacon',
    quizQuestion: (n, total) => `Pregunta ${n} de ${total}`,
    comingSoon: 'Próximamente en esta sección',
  },
  en: {
    eyebrow: 'Bigger. Better. Burgers.',
    title: 'Make Your Order<br>Big',
    btnLogin: 'Sign in & earn points ⭐',
    btnGuest: 'Continue without account',
    lsTitle: 'Sign in to your account',
    lsSub: 'Scan the QR with your phone or fill in the form here',
    lsQrHint: '📱 Point your camera',
    lsDivider: 'or fill in here',
    lsNameLabel: 'Your name', lsNamePh: 'E.g. Maria',
    lsEmailLabel: 'Email (to earn points)', lsEmailPh: 'maria@email.com',
    lsSubmit: 'Join & earn points! ⭐',
    lsBack: '← Back',
    catBurgers: 'Burgers', catCombos: 'Combos', catSides: 'Sides',
    catDesserts: 'Desserts', catDrinks: 'Drinks', catSalads: 'Salads', catKids: 'Kids',
    aiBtn: '✨ Surprise me',
    dcTitle: 'Daily Challenge:', dcText: 'Tap here to add Crisscuts and earn', dcPts: '+50 points',
    cartTitle: 'Your order', fabCart: 'My order',
    cartEmpty: "Your cart is empty.\nChoose something delicious!",
    subtotal: 'Subtotal', tax: 'Tax (10%)', total: 'Total',
    payBtn: 'Pay',
    howPay: 'How would you like to pay?', confirmPay: 'Confirm payment', backOrder: 'Back to order',
    orderPlaced: 'Order placed!',
    pointsEarned: (n) => `You earned <strong>+${n}</strong> points ⭐`,
    sendTicket: 'Send ticket to my email ✓', ticketSent: '✅ Ticket sent!',
    ticketSentTo: (email) => `✅ Ticket sent to ${email}!`,
    ticketQuestion: 'Want to receive your ticket by email?',
    registerTicket: '⭐ Sign up & receive your ticket',
    newOrder: 'New order',
    payCard: 'Card', payContactless: 'Contactless', payApple: 'Apple Pay',
    payGoogle: 'Google Pay', payCash: 'Cash', payQR: 'QR / Bizum',
    q1: 'What are you in the mood for?', q1o1: 'Grilled beef', q1o2: 'Crispy chicken', q1o3: 'Plant-based',
    q2: 'How hungry are you?', q2o1: 'Something light', q2o2: "I'm hungry", q2o3: 'Starving!',
    q3: "What's your vibe today?", q3o1: 'Classic all the way', q3o2: 'Bacon & BBQ', q3o3: 'Premium Angus',
    q4: 'Want to make it a combo?', q4o1: 'Just the burger', q4o2: 'Yes, fries + drink', q4o3: 'All in: + dessert too',
    q5: 'Finish with something sweet?', q5o1: 'Milkshake', q5o2: 'Twist Oreo', q5o3: 'No dessert, thanks',
    quizThinking: 'Calculating your perfect combo...',
    quizEyebrow: '✨ Your personalized selection', quizSubtitle: "Here's what we recommend",
    quizTop: '⭐ Your best pick', quizAlso: "You'll love this too",
    quizCheckout: '🛒 View order & pay', quizContinue: '← Keep browsing', quizRestart: '🔄 Retake quiz',
    mysteryLabel: "🎲 Chef's wildcard", mysteryAdd: '🎲 Take the risk!',
    mysteryRevealed: 'Surprise added to your order! 🎲',
    mysteryChooseDrink: 'Pick your drink — the rest is a surprise 🎲',
    mysteryAddBtn: '🎲 I want this surprise!',
    rdTitle: 'Create your account', rdSub: 'Receive your ticket and earn points on every visit ⭐',
    rdName: 'Your name', rdNamePh: 'E.g. Maria', rdEmail: 'Email', rdEmailPh: 'maria@email.com',
    rdSubmit: 'Sign me up & get my ticket! ⭐',
    countdownMsg: 'New order in',
    toastNameEmail: 'Please fill in your name and email',
    toastWelcome: (n) => `👋 Welcome, ${n}! Earn points with every order ⭐`,
    toastAdded: (n) => `✅ ${n} added`,
    toastDcDone: '🏆 Challenge completed! +50 points', toastDcRepeat: '🏆 Challenge already completed!',
    toastTicketSent: '📧 Ticket sent to your email',
    toastRegistered: '✅ Registered! Ticket sent to your email',
    chooseDrink: '🥤 Choose your drink', chooseSide: '🍟 Choose your side',
    chooseDessert: '🍦 And for dessert?', customizeBurger: '🍔 Customize your burger',
    comboTotalLabel: 'Combo total', addCombo: 'Add combo —',
    completeYourOrder: '✨ Complete your order', included: 'Included',
    orderSummaryTitle: 'Order summary',
    noChanges: 'No changes',
    extrasOptional: 'Extras (optional)', customization: 'Customization',
    quantity: 'Quantity', addItem: 'Add', addToCart: 'Add to order',
    quizBack: '← Back',
    upsellAdd: (name) => `Add ${name}`,
    upsellBurgerMsg: 'How about Crisscuts on the side?',
    upsellBurgerDesc: "Carl's Jr favorites, always crispy.",
    upsellDrinkMsg: 'Add a Refill Soda',
    upsellDrinkDesc: 'Unlimited refills while you eat. Just €2.95!',
    upsellShakeMsg: 'Finish with an Oreo Shake?',
    upsellShakeDesc: "The best ending to your Carl's Jr visit.",
    upsellTwistMsg: 'The final touch: Twist Oreo',
    upsellTwistDesc: 'Just €3.95. A little extra to finish.',
    confirmPayLabel: 'Confirm payment',
    backOrderLabel: 'Back to order',
    'mod-no-onion': 'No onion', 'mod-no-tomato': 'No tomato', 'mod-no-sauce': 'No sauce',
    'mod-extra-cheese': 'Extra cheese', 'mod-extra-bacon': 'Extra bacon',
    quizQuestion: (n, total) => `Question ${n} of ${total}`,
    comingSoon: 'Coming soon in this section',
  }
};

const t = key => {
  const val = LANGS[state?.lang]?.[key] ?? LANGS.es[key];
  return val ?? key;
};

/* ─── STATE ─── */
const state = {
  cat: 'burgers',
  cart: [],
  points: parseInt(localStorage.getItem('cj-pts') || '0', 10),
  payment: 'card',
  quizStep: 0,
  quizAnswers: {},
  dcDone: false,
  isGuest: true,
  userName: '',
  lang: 'es'
};

/* ─── HELPERS ─── */
const $ = id => document.getElementById(id);
const round = v => Math.round(v * 100) / 100;
const productById = id => PRODUCTS.find(p => p.id === id);
const pName = p => (state.lang === 'en' ? PRODUCT_I18N[p.id]?.name : null) ?? p.name;
const pDesc = p => (state.lang === 'en' ? PRODUCT_I18N[p.id]?.desc : null) ?? p.desc;
const modLabel = mod => t('mod-' + mod.id) || mod.label;
function modTotal(mods) {
  return mods.reduce((s, id) => s + (MODIFIERS.find(m => m.id === id)?.price || 0), 0);
}

/* ─── INIT ─── */
document.addEventListener('DOMContentLoaded', init);

function init() {
  renderCatNav();
  renderProducts();
  renderCart();
  bindWelcome();
  bindTopbar();
  bindCart();
  bindProductDialog();
  bindCheckout();
  bindQuiz();
  bindDailyChallenge();
  bindComboDialog();
  bindRegisterDialog();
  bindLangSwitcher();
  updatePointsDisplay();
  drawQR();
}

/* ─── WELCOME ─── */
function bindWelcome() {
  // Guest: entra sin cuenta, sin puntos
  $('btnStart').addEventListener('click', () => startApp(true));

  // Login: muestra pantalla QR + form
  $('btnLogin').addEventListener('click', showLoginScreen);

  // Volver desde login
  $('btnLoginBack').addEventListener('click', hideLoginScreen);

  // Submit del formulario
  $('loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const name  = $('loginName').value.trim();
    const email = $('loginEmail').value.trim();
    if (!name || !email) { showToast(t('toastNameEmail')); return; }
    state.userName = name;
    startApp(false);
  });

  initSlider();
  applyI18n();
}

function showLoginScreen() {
  $('loginScreen').hidden = false;
}

function hideLoginScreen() {
  $('loginScreen').hidden = true;
}

function startApp(isGuest) {
  state.isGuest = isGuest;
  const w = $('welcome');
  if (!w) return;
  w.classList.add('out');
  $('app').hidden = false;
  if (isGuest) {
    $('pointsDisplay').classList.add('hidden');
    $('dailyChallenge').hidden = true;
  } else {
    $('pointsDisplay').classList.remove('hidden');
    $('dailyChallenge').hidden = false;
    showToast(t('toastWelcome')(state.userName));
  }
  setTimeout(() => w.remove(), 450);
}

/* ─── QR CODE REAL (qrcodejs) ─── */
function drawQR() {
  const container = $('qrContainer');
  if (!container) return;
  container.innerHTML = '';
  const url = 'https://carlsjr.es/loyalty?utm_source=kiosk&utm_medium=qr&terminal=T-04';
  if (typeof QRCode !== 'undefined') {
    new QRCode(container, {
      text: url,
      width: 154,
      height: 154,
      colorDark: '#0f0f0f',
      colorLight: '#ffffff',
      correctLevel: QRCode.CorrectLevel.H
    });
  } else {
    container.innerHTML = `<div style="padding:20px;font-size:.7rem;color:#555;text-align:center">carlsjr.es/loyalty</div>`;
  }
}

/* ─── SLIDER BIENVENIDA (coverflow) ─── */
function initSlider() {
  const container = $('welcomeSlider');
  const dotsEl = $('wsDots');
  if (!container) return;
  const slides = Array.from(container.querySelectorAll('.ws-slide'));
  const total = slides.length;
  let current = 0;

  // Crear dots
  dotsEl.innerHTML = slides.map((_, i) =>
    `<button class="ws-dot${i === 0 ? ' active' : ''}" data-slide="${i}" type="button" aria-label="Imagen ${i+1}"></button>`
  ).join('');
  dotsEl.querySelectorAll('.ws-dot').forEach(d => {
    d.addEventListener('click', () => goSlide(parseInt(d.dataset.slide, 10)));
  });

  function goSlide(idx) {
    current = ((idx % total) + total) % total;
    positionSlides();
    dotsEl.querySelectorAll('.ws-dot').forEach((d, i) => d.classList.toggle('active', i === current));
  }

  function positionSlides() {
    const W = container.offsetWidth || window.innerWidth;
    slides.forEach((slide, i) => {
      // Distancia desde current (wrap-around)
      let d = i - current;
      if (d > total / 2)  d -= total;
      if (d < -total / 2) d += total;

      const absD = Math.abs(d);
      const scale  = absD === 0 ? 1 : absD === 1 ? 0.68 : 0.5;
      const opacity = absD === 0 ? 1  : absD === 1 ? 0.6  : absD === 2 ? 0.3 : 0;
      const zIndex  = 10 - absD;

      // Centro de cada slide relativo al centro del contenedor
      // slide width = 54vw, gap entre centros = 52% del contenedor
      const slideW = slide.offsetWidth || W * 0.54;
      const offset = d * (W * 0.44);

      slide.style.transform  = `translateX(calc(-50% + ${offset}px)) scale(${scale})`;
      slide.style.opacity    = opacity;
      slide.style.zIndex     = zIndex;
      slide.classList.toggle('center', absD === 0);
    });
  }

  // Init position
  positionSlides();

  // Auto-advance
  setInterval(() => goSlide(current + 1), 2600);
}

/* ─── TOPBAR ─── */
function bindTopbar() {
  $('btnBackToWelcome').addEventListener('click', () => location.reload());
  $('btnCartFab').addEventListener('click', openCart);
}

/* ─── CATEGORY NAV ─── */
const CAT_LABEL_KEYS = {
  burgers: 'catBurgers', combos: 'catCombos', sides: 'catSides',
  desserts: 'catDesserts', drinks: 'catDrinks', salads: 'catSalads', kids: 'catKids'
};

function renderCatNav() {
  $('catNav').innerHTML = CATEGORIES.map(c => `
    <button class="cat-tab ${c.id === state.cat ? 'active' : ''}" data-cat="${c.id}" type="button">
      <span class="cat-icon">${c.icon}</span>
      <span>${t(CAT_LABEL_KEYS[c.id]) || c.label}</span>
    </button>
  `).join('') + `
    <button class="cat-nav-ai" id="btnAI" type="button" aria-label="${t('aiBtn')}">
      ${t('aiBtn')}
    </button>
  `;
  $('catNav').querySelectorAll('[data-cat]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.cat = btn.dataset.cat;
      // If in quiz view, switch back to catalog without resetting quiz state
      if ($('viewQuiz').classList.contains('active')) {
        $('viewQuiz').classList.remove('active');
        $('viewCatalog').classList.add('active');
      }
      renderCatNav();
      renderProducts();
      triggerUpsell();
    });
  });
  $('btnAI').addEventListener('click', openQuiz);
}

/* ─── PRODUCTS ─── */
function renderProducts() {
  const items = PRODUCTS.filter(p => p.cat === state.cat);
  if (!items.length) {
    $('productGrid').innerHTML = `<div class="empty-state"><div class="empty-state-icon">🍔</div><p>${t('comingSoon')}</p></div>`;
    return;
  }
  $('productGrid').innerHTML = items.map(productCard).join('');
  $('productGrid').querySelectorAll('[data-product]').forEach(card => {
    card.addEventListener('click', () => openProduct(card.dataset.product));
  });
}

function productCard(p) {
  const stars = '⭐'.repeat(p.stars) + (p.stars < 5 ? '<span style="opacity:.3">' + '⭐'.repeat(5 - p.stars) + '</span>' : '');
  const badgeHtml = p.badge ? `<div class="pc-badge ${p.badgeStyle || ''}">${p.badge}</div>` : '';
  const imgHtml = p.isMystery
    ? `<img referrerpolicy="no-referrer" src="https://carlsjr.es/wp-content/uploads/2023/03/Western-Bacon-Cheeseburger.png" alt="Sorpresa" class="mystery-card-img"><div class="mystery-card-q">?</div>`
    : p.img
      ? `<img referrerpolicy="no-referrer" src="${p.img}" alt="${pName(p)}" loading="lazy" onerror="this.parentElement.innerHTML='<span class=pc-emoji>🍔</span>'">`
      : `<span class="pc-emoji">🍔</span>`;
  return `
    <article class="product-card" data-product="${p.id}" role="button" tabindex="0" aria-label="${pName(p)}, ${EUR.format(p.price)}">
      ${badgeHtml}
      <div class="pc-img pc-cat-${p.cat}">${imgHtml}</div>
      <div class="pc-body">
        <div class="pc-name">${pName(p)}</div>
        <div class="pc-desc">${pDesc(p)}</div>
        <div class="pc-stars">${stars}</div>
        <div class="pc-footer">
          <span class="pc-price">${EUR.format(p.price)}</span>
          <button class="pc-add" type="button" aria-label="Añadir ${pName(p)}">+</button>
        </div>
      </div>
    </article>
  `;
}

/* ─── PRODUCT DIALOG ─── */
let dialogQty = 1;
let dialogMods = [];
let dialogProduct = null;

function bindProductDialog() {
  $('pdClose').addEventListener('click', () => safeClose($('productDialog')));
  $('productDialog').addEventListener('click', e => { if (e.target === $('productDialog')) safeClose($('productDialog')); });
}

function openDrinkPicker(p) {
  const isCoffee = p.id === 'cafe-te';
  const opts = isCoffee ? COFFEE_OPTIONS : DRINKS_OPTIONS.filter(d => d.id !== 'none');
  dialogProduct = p; dialogQty = 1; dialogMods = [];
  renderProductDialog(p);

  // Inject variant selector before the footer
  const variantHtml = opts.map(o => `
    <button class="combo-opt pick-variant" data-variant="${o.id}" type="button">
      <span class="combo-opt-icon">${o.icon}</span>
      <div><div class="combo-opt-label">${o.label}</div></div>
    </button>`).join('');
  const extraSec = document.createElement('div');
  extraSec.className = 'combo-section pd-variant-section';
  extraSec.innerHTML = `<h3>${isCoffee ? '☕ ¿Qué tipo?' : '🥤 ¿Qué bebida?'} <span class="combo-required">*</span></h3><div class="combo-options">${variantHtml}</div>`;
  const footer = $('pdContent').querySelector('.pd-footer');
  $('pdContent').insertBefore(extraSec, footer);

  const addBtn = $('btnAddCart');
  let chosenVariant = null;
  addBtn.disabled = true;
  addBtn.textContent = isCoffee ? '☕ Elige el tipo' : '🥤 Elige la bebida';

  extraSec.querySelectorAll('.pick-variant').forEach(btn => {
    btn.addEventListener('click', () => {
      chosenVariant = btn.dataset.variant;
      extraSec.querySelectorAll('.pick-variant').forEach(b => b.classList.toggle('selected', b.dataset.variant === chosenVariant));
      addBtn.disabled = false;
      addBtn.textContent = `${t('addToCart')} · ${EUR.format(p.price)}`;
    });
  });

  addBtn.onclick = () => {
    if (!chosenVariant) return;
    const label = (isCoffee ? COFFEE_OPTIONS : DRINKS_OPTIONS).find(o => o.id === chosenVariant)?.label || chosenVariant;
    addToCart(p, [], dialogQty, label);
    safeClose($('productDialog'));
  };
  safeModal($('productDialog'));
}

function openProduct(id) {
  const p = productById(id);
  if (!p) return;
  if (p.isMystery) { openMysteryConfigurator(p); return; }
  if (p.cat === 'drinks') { openDrinkPicker(p); return; }
  if (p.cat === 'combos' || p.cat === 'kids') { openComboConfigurator(p, 'combo'); return; }
  if (p.cat === 'burgers' || p.cat === 'salads') { openComboConfigurator(p, 'solo'); return; }
  dialogProduct = p;
  dialogQty = 1;
  dialogMods = [];
  renderProductDialog(p);
  safeModal($('productDialog'));
  // Scroll dialog to top
  setTimeout(() => $('productDialog').scrollTop = 0, 10);
}

function renderProductDialog(p) {
  const mods = MODIFIERS.filter(m => p.mods.includes(m.id));
  const extras = mods.filter(m => m.price > 0);
  const frees = mods.filter(m => m.price === 0);

  $('pdContent').innerHTML = `
    <div class="pd-hero">
      ${p.img ? `<img referrerpolicy="no-referrer" src="${p.img}" alt="${pName(p)}" onerror="this.style.display='none'">` : `<span style="font-size:5rem">🍔</span>`}
    </div>
    <div class="pd-body">
      <div class="pd-category">${t(CAT_LABEL_KEYS[p.cat]) || p.cat}</div>
      <h2 class="pd-name" id="pdTitle">${pName(p)}</h2>
      <p class="pd-desc">${pDesc(p)}</p>
      <div class="pd-tags">${p.tags.map(tag => `<span class="pd-tag">${tag}</span>`).join('')}</div>
      ${extras.length ? `
        <div class="pd-modifiers">
          <h3>${t('extrasOptional')}</h3>
          <div class="pd-mod-grid">
            ${extras.map(m => `
              <button class="pd-mod-btn" data-mod="${m.id}" type="button">
                ${modLabel(m)}<small>+${EUR.format(m.price)}</small>
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}
      ${frees.length ? `
        <div class="pd-modifiers">
          <h3>${t('customization')}</h3>
          <div class="pd-mod-grid">
            ${frees.map(m => `
              <button class="pd-mod-btn" data-mod="${m.id}" type="button">
                ${modLabel(m)}
              </button>
            `).join('')}
          </div>
        </div>
      ` : ''}
      <div class="pd-qty-row">
        <span class="pd-qty-label">${t('quantity')}</span>
        <div class="pd-qty-ctrl">
          <button class="pd-qty-btn" id="pdQtyMinus" type="button">−</button>
          <span class="pd-qty-val" id="pdQtyVal">1</span>
          <button class="pd-qty-btn" id="pdQtyPlus" type="button">+</button>
        </div>
      </div>
    </div>
    <div class="pd-footer">
      <button class="btn-add-cart" id="btnAddCart" type="button">${t('addItem')} — ${EUR.format(p.price)}</button>
    </div>
  `;

  // Modifier toggles
  $('pdContent').querySelectorAll('[data-mod]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.mod;
      if (dialogMods.includes(id)) {
        dialogMods = dialogMods.filter(m => m !== id);
        btn.classList.remove('active');
      } else {
        dialogMods.push(id);
        btn.classList.add('active');
      }
      updateDialogTotal();
    });
  });

  // Qty
  $('pdQtyMinus').addEventListener('click', () => { if (dialogQty > 1) { dialogQty--; updateDialogTotal(); } });
  $('pdQtyPlus').addEventListener('click', () => { if (dialogQty < 9) { dialogQty++; updateDialogTotal(); } });

  $('btnAddCart').addEventListener('click', () => {
    addToCart(dialogProduct, dialogMods, dialogQty);
    safeClose($('productDialog'));
    dialogProduct = null;
  });
}

function updateDialogTotal() {
  if (!dialogProduct) return;
  const total = (dialogProduct.price + modTotal(dialogMods)) * dialogQty;
  $('pdQtyVal').textContent = dialogQty;
  $('btnAddCart').textContent = `${t('addItem')} — ${EUR.format(round(total))}`;
}

/* ─── CART ─── */
function bindCart() {
  $('btnCloseCart').addEventListener('click', closeCart);
  $('cartOverlay').addEventListener('click', closeCart);
}

function openCart() {
  $('cartPanel').classList.add('open');
  $('cartPanel').setAttribute('aria-hidden', 'false');
  $('cartOverlay').hidden = false;
  renderCartUpsell();
}

function closeCart() {
  $('cartPanel').classList.remove('open');
  $('cartPanel').setAttribute('aria-hidden', 'true');
  $('cartOverlay').hidden = true;
}

function addToCart(product, mods = [], qty = 1, note = '') {
  const item = {
    key: crypto.randomUUID(),
    productId: product.id,
    name: product.name,
    img: product.img,
    unitPrice: product.price,
    mods,
    qty,
    note
  };
  state.cart.push(item);
  renderCart();
  triggerUpsell();
  showToast(t('toastAdded')(pName(product)));
  launchConfetti();

  // Reto del día: si añaden Crisscuts
  if (product.id === 'crisscuts' && !state.dcDone) {
    state.dcDone = true;
    addPoints(50);
    showToast(t('toastDcDone'));
    animateDcBar(100);
  }
}

function removeFromCart(key) {
  state.cart = state.cart.filter(i => i.key !== key);
  renderCart();
  triggerUpsell();
}

function changeQty(key, delta) {
  const item = state.cart.find(i => i.key === key);
  if (!item) return;
  item.qty = Math.max(1, item.qty + delta);
  renderCart();
}

function cartLineTotal(item) {
  return round((item.unitPrice + modTotal(item.mods)) * item.qty);
}

function cartSummary() {
  const subtotal = round(state.cart.reduce((s, i) => s + cartLineTotal(i), 0));
  const tax = round(subtotal * 0.10);
  const total = round(subtotal + tax);
  return { subtotal, tax, total };
}

function renderCart() {
  const itemCount = state.cart.reduce((s, i) => s + i.qty, 0);

  // Badges (FAB)
  const badge = $('cartBadge');
  if (badge) { badge.hidden = itemCount === 0; badge.textContent = itemCount; }
  const fabBadge = $('fabCartBadge');
  fabBadge.hidden = itemCount === 0;
  fabBadge.textContent = itemCount;
  const fab = $('btnCartFab');
  fab.classList.toggle('has-items', itemCount > 0);

  // Items
  // Update static cart labels
  if ($('cartTitleEl')) $('cartTitleEl').textContent = t('cartTitle');
  if ($('fabCartText')) $('fabCartText').textContent = t('fabCart');
  if ($('payBtnLabel')) $('payBtnLabel').textContent = t('payBtn');

  $('cartItems').innerHTML = state.cart.length ? state.cart.map(item => {
    const prod = productById(item.productId);
    const itemName = prod ? pName(prod) : item.name;
    const labels = item.mods.map(id => { const m = MODIFIERS.find(m => m.id === id); return m ? modLabel(m) : null; }).filter(Boolean);
    return `
      <div class="cart-line">
        ${item.img
          ? `<img referrerpolicy="no-referrer" class="cl-img" src="${item.img}" alt="${itemName}" onerror="this.className='cl-emoji';this.outerHTML='<div class=cl-emoji>🍔</div>'">`
          : `<div class="cl-emoji">🍔</div>`}
        <div class="cl-body">
          <div class="cl-name">${itemName}</div>
          <div class="cl-mods">${[labels.join(', ') || t('noChanges'), item.note].filter(Boolean).join(' · ')}</div>
          <div class="cl-qty">
            <button class="cl-qty-btn minus" data-qty-key="${item.key}" data-delta="-1" type="button">−</button>
            <span class="cl-qty-val">${item.qty}</span>
            <button class="cl-qty-btn" data-qty-key="${item.key}" data-delta="1" type="button">+</button>
            <button class="cl-qty-btn minus" style="margin-left:auto" data-remove="${item.key}" type="button" aria-label="Eliminar">🗑</button>
          </div>
        </div>
        <div class="cl-price">${EUR.format(cartLineTotal(item))}</div>
      </div>
    `;
  }).join('') : `
    <div class="cart-empty">
      <div class="cart-empty-icon">🛒</div>
      <p>${t('cartEmpty').replace('\n', '<br>')}</p>
    </div>
  `;

  // Events
  $('cartItems').querySelectorAll('[data-qty-key]').forEach(btn => {
    btn.addEventListener('click', () => changeQty(btn.dataset.qtyKey, parseInt(btn.dataset.delta, 10)));
  });
  $('cartItems').querySelectorAll('[data-remove]').forEach(btn => {
    btn.addEventListener('click', () => removeFromCart(btn.dataset.remove));
  });

  // Totals
  const { subtotal, tax, total } = cartSummary();
  $('cartTotals').innerHTML = `
    <div class="ct-row"><span>${t('subtotal')}</span><span>${EUR.format(subtotal)}</span></div>
    <div class="ct-row"><span>${t('tax')}</span><span>${EUR.format(tax)}</span></div>
    <div class="ct-row total"><span>${t('total')}</span><span>${EUR.format(total)}</span></div>
  `;
  $('checkoutTotal').textContent = EUR.format(total);
  $('btnCheckout').disabled = state.cart.length === 0;
}

/* ─── CART UPSELL ─── */
function renderCartUpsell() {
  if (!state.cart.length) { $('cartUpsell').hidden = true; return; }

  const inCart = new Set(state.cart.map(i => i.productId));

  // Suggest items not in cart that complement what's there
  const suggestions = [];
  if (!inCart.has('crisscuts') && !inCart.has('fries') && !inCart.has('nuggets')) {
    suggestions.push(productById('crisscuts'));
  }
  if (!inCart.has('refrescos') && !inCart.has('cafe-te')) {
    suggestions.push(productById('refrescos'));
  }
  if (!inCart.has('shake-oreo') && !inCart.has('twist-oreo') && !inCart.has('shake-chocolate') && !inCart.has('shake-fresa')) {
    suggestions.push(productById('shake-oreo'));
  }

  const toShow = suggestions.filter(Boolean).slice(0, 2);
  if (!toShow.length) { $('cartUpsell').hidden = true; return; }

  $('cartUpsell').hidden = false;
  $('cartUpsell').innerHTML = `
    <div class="cu-title">${t('completeYourOrder')}</div>
    <div class="cu-items">
      ${toShow.map(p => `
        <div class="cu-item" data-upsell-add="${p.id}" role="button" tabindex="0">
          <img referrerpolicy="no-referrer" src="${p.img}" alt="${pName(p)}" onerror="this.style.display='none'">
          <div class="cu-item-body">
            <div class="cu-item-name">${pName(p)}</div>
            <div class="cu-item-price">${EUR.format(p.price)}</div>
          </div>
          <span class="cu-item-add">+</span>
        </div>
      `).join('')}
    </div>
  `;
  $('cartUpsell').querySelectorAll('[data-upsell-add]').forEach(el => {
    el.addEventListener('click', () => {
      addToCart(productById(el.dataset.upsellAdd));
      renderCartUpsell();
    });
  });
}

/* ─── UPSELL BANNER (en catálogo) ─── */
function triggerUpsell() {
  if (!state.cart.length) { $('upsellBanner').hidden = true; return; }
  const rule = UPSELL_RULES.find(r => r.triggerCat === state.cat && !state.cart.find(i => i.productId === r.offerProduct));
  if (!rule) { $('upsellBanner').hidden = true; return; }
  const product = productById(rule.offerProduct);
  if (!product) { $('upsellBanner').hidden = true; return; }
  $('upsellTitle').textContent = t(rule.msgKey);
  $('upsellDesc').textContent = `${t(rule.descKey)} — ${EUR.format(product.price)}`;
  $('upsellBtn').textContent = t('upsellAdd')(pName(product));
  $('upsellBanner').hidden = false;
  $('upsellBtn').onclick = () => { addToCart(product); $('upsellBanner').hidden = true; };
}

/* ─── DAILY CHALLENGE ─── */
function bindDailyChallenge() {
  $('dailyChallenge').addEventListener('click', () => {
    if (state.dcDone) { showToast(t('toastDcRepeat')); return; }
    const crisscuts = productById('crisscuts');
    if (crisscuts) {
      addToCart(crisscuts, [], 1);
      // addToCart already handles dcDone + points + toast
    }
  });
}

/* ─── QUIZ IA ─── */
function bindQuiz() {
  $('btnQuizBack').addEventListener('click', () => {
    $('viewQuiz').classList.remove('active');
    $('viewCatalog').classList.add('active');
  });
  $('btnQuizBack').textContent = t('quizBack');
}

function openQuiz() {
  const quiz = getQuiz();
  const inProgress = state.quizStep > 0 && state.quizStep < quiz.length;
  if (!inProgress) {
    state.quizStep = 0;
    state.quizAnswers = {};
    $('quizResults').innerHTML = '';
  }
  $('viewCatalog').classList.remove('active');
  $('viewQuiz').classList.add('active');
  renderQuizStep();
}

function getQuiz() {
  return [
    { id: 'protein', q: t('q1'), opts: [
      { id: 'beef', icon: '🥩', label: t('q1o1') },
      { id: 'chicken', icon: '🍗', label: t('q1o2') },
      { id: 'plant', icon: '🌱', label: t('q1o3') }
    ]},
    { id: 'hunger', q: t('q2'), opts: [
      { id: 'low', icon: '🙂', label: t('q2o1') },
      { id: 'medium', icon: '😋', label: t('q2o2') },
      { id: 'high', icon: '🔥', label: t('q2o3') }
    ]},
    { id: 'style', q: t('q3'), opts: [
      { id: 'classic', icon: '⭐', label: t('q3o1') },
      { id: 'bacon', icon: '🥓', label: t('q3o2') },
      { id: 'premium', icon: '👑', label: t('q3o3') }
    ]},
    { id: 'budget', q: t('q4'), opts: [
      { id: 'solo', icon: '🍔', label: t('q4o1') },
      { id: 'combo', icon: '🍟', label: t('q4o2') },
      { id: 'full', icon: '🎉', label: t('q4o3') }
    ]},
    { id: 'sweet', q: t('q5'), opts: [
      { id: 'shake', icon: '🥛', label: t('q5o1') },
      { id: 'ice', icon: '🍦', label: t('q5o2') },
      { id: 'none', icon: '🙅', label: t('q5o3') }
    ]}
  ];
}

function renderQuizStep() {
  const quiz = getQuiz();
  const step = quiz[state.quizStep];
  if (!step) { renderQuizThinking(); return; }

  const pct = (state.quizStep / quiz.length) * 100;
  $('quizBar').style.width = pct + '%';
  $('quizStep').textContent = `${state.quizStep + 1} / ${quiz.length}`;

  $('quizContent').innerHTML = `
    <p class="quiz-q-eyebrow">${t('quizQuestion')(state.quizStep + 1, quiz.length)}</p>
    <h2 class="quiz-q-title">${step.q}</h2>
    <div class="quiz-options">
      ${step.opts.map(o => `
        <button class="quiz-option" data-answer="${o.id}" type="button">
          <span class="quiz-option-icon">${o.icon}</span>
          <span class="quiz-option-label">${o.label}</span>
        </button>
      `).join('')}
    </div>
  `;

  $('quizContent').querySelectorAll('[data-answer]').forEach(btn => {
    btn.addEventListener('click', () => {
      btn.classList.add('selected');
      state.quizAnswers[step.id] = btn.dataset.answer;
      state.quizStep++;
      setTimeout(renderQuizStep, 280);
    });
  });
}

function renderQuizThinking() {
  $('quizBar').style.width = '100%';
  $('quizContent').innerHTML = `
    <div class="quiz-thinking">
      <span class="quiz-thinking-anim">✨</span>
      <h3>${t('quizThinking')}</h3>
    </div>
  `;
  setTimeout(renderQuizResults, 1400);
}

function renderQuizResults() {
  const a = state.quizAnswers;

  // Score products — exclude sides, drinks, mystery
  const scored = PRODUCTS
    .filter(p => !['sides','drinks'].includes(p.cat) && !p.isMystery)
    .map(p => {
      let score = 0;

      // Protein match (strict for plant)
      if (p.protein === a.protein) score += 8;
      else if (a.protein === 'plant') score -= 20;

      // Hunger match
      if (p.hunger === a.hunger) score += 5;
      else if (a.hunger === 'high' && p.hunger === 'medium') score += 2;
      else if (a.hunger === 'low'  && p.hunger === 'medium') score += 1;

      // Style match using tags
      if (a.style === 'bacon') {
        if (p.tags.some(tag => /bacon|bbq/i.test(tag))) score += 6;
      }
      if (a.style === 'premium') {
        if (p.tags.some(tag => /angus|premium|gourmet|trufa/i.test(tag))) score += 6;
        if (p.price >= 10.5) score += 2;
      }
      if (a.style === 'classic') {
        if (p.tags.some(tag => /cl[aá]sic|iconic|star/i.test(tag))) score += 4;
        if (p.cat === 'burgers' && p.price < 10) score += 2;
      }

      // Format match
      if ((a.budget === 'combo' || a.budget === 'full') && (p.combo || p.cat === 'combos')) score += 7;
      if (a.budget === 'solo'  && !p.combo && p.cat === 'burgers') score += 5;
      if (a.budget === 'full'  && p.cat === 'combos') score += 3;

      // Slight boost for stars
      score += (p.stars || 3) * 0.4;

      return { p, score };
    })
    .sort((x, y) => y.score - x.score);

  const top2 = scored.slice(0, 2).map(s => s.p);
  const mystery = productById('mystery-carls');

  // Extras based on sweet preference and format
  const extras = [];
  if (a.sweet === 'shake') extras.push(productById('shake-oreo'));
  if (a.sweet === 'ice')   extras.push(productById('twist-oreo'));
  if ((a.budget === 'combo' || a.budget === 'full') && !top2[0]?.combo) {
    extras.push(productById('crisscuts'), productById('refrescos'));
  }

  $('quizContent').innerHTML = `
    <p class="quiz-q-eyebrow">${t('quizEyebrow')}</p>
    <h2 class="quiz-q-title">${t('quizSubtitle')}</h2>
  `;

  const uniq = [...new Set(extras.filter(Boolean))];
  $('quizResults').innerHTML = `
    <div class="qr-cards">
      ${top2.map((p, i) => qrCard(p, i === 0)).join('')}
      ${mystery ? qrMysteryCard(mystery) : ''}
      ${uniq.slice(0, 1).map(p => qrCard(p, false, t('quizAlso'))).join('')}
    </div>
    <div class="qr-actions">
      <button class="btn-qr-checkout" id="btnQuizCheckout" type="button">${t('quizCheckout')}</button>
      <button class="btn-qr-continue" id="btnQuizContinue" type="button">${t('quizContinue')}</button>
      <button class="qr-restart" id="btnQuizRestart" type="button">${t('quizRestart')}</button>
    </div>
  `;

  $('quizResults').querySelectorAll('[data-qr-add]').forEach(btn => {
    btn.addEventListener('click', () => {
      const p = productById(btn.dataset.qrAdd);
      if (!p) return;
      if (p.isMystery) {
        openMysteryConfigurator(p);
      } else if (p.combo || p.cat === 'combos') {
        openComboConfigurator(p);
      } else {
        openProduct(p.id);
      }
    });
  });
  $('btnQuizCheckout').addEventListener('click', () => {
    $('viewQuiz').classList.remove('active');
    $('viewCatalog').classList.add('active');
    openCart();
  });
  $('btnQuizContinue').addEventListener('click', () => {
    $('viewQuiz').classList.remove('active');
    $('viewCatalog').classList.add('active');
  });
  $('btnQuizRestart').addEventListener('click', () => {
    state.quizStep = 0;
    state.quizAnswers = {};
    $('quizResults').innerHTML = '';
    renderQuizStep();
  });
}

function qrMysteryCard(p) {
  return `
    <div class="qr-card qr-card-mystery">
      <div class="qr-mystery-visual">🎲</div>
      <div class="qr-card-body">
        <div class="qr-card-label">${t('mysteryLabel')}</div>
        <h4>${pName(p)}</h4>
        <p>${pDesc(p)}</p>
        <div class="qr-card-price">${EUR.format(p.price)}</div>
      </div>
      <button class="qr-add qr-add-mystery" data-qr-add="${p.id}" type="button">${t('mysteryAdd')}</button>
    </div>
  `;
}

function qrCard(p, isTop, customLabel = null) {
  const label = customLabel || (isTop ? t('quizTop') : t('quizAlso'));
  return `
    <div class="qr-card ${isTop ? 'top' : ''}">
      <img referrerpolicy="no-referrer" src="${p.img}" alt="${pName(p)}" onerror="this.style.display='none'">
      <div class="qr-card-body">
        <div class="qr-card-label">${label}</div>
        <h4>${pName(p)}</h4>
        <p>${pDesc(p).substring(0, 60)}...</p>
        <div class="qr-card-price">${EUR.format(p.price)}</div>
      </div>
      <button class="qr-add" data-qr-add="${p.id}" type="button">${t('addItem')}</button>
    </div>
  `;
}

/* ─── CHECKOUT ─── */
function bindComboDialog() {
  $('comboClose').addEventListener('click', () => safeClose($('comboDialog')));
  $('comboDialog').addEventListener('click', e => { if (e.target === $('comboDialog')) safeClose($('comboDialog')); });
}

function bindCheckout() {
  $('btnCheckout').addEventListener('click', () => {
    renderPaymentGrid();
    $('checkoutPayment').hidden = false;
    $('checkoutSuccess').hidden = true;
    safeModal($('checkoutDialog'));
    closeCart();
  });
  $('btnCancelCheckout').addEventListener('click', () => {
    safeClose($('checkoutDialog'));
    openCart();
  });
  $('btnPay').addEventListener('click', confirmPayment);
  $('btnNewOrder').addEventListener('click', () => {
    clearInterval(activeCountdownTimer);
    location.reload();
  });
}

const PAY_LABEL_KEYS = {
  card: 'payCard', contactless: 'payContactless', apple: 'payApple',
  google: 'payGoogle', cash: 'payCash', qr: 'payQR'
};

function renderPaymentGrid() {
  if ($('howPayTitle')) $('howPayTitle').textContent = t('howPay');
  if ($('confirmPayBtn')) $('confirmPayBtn').textContent = t('confirmPay');
  if ($('backOrderBtn')) $('backOrderBtn').textContent = t('backOrder');
  $('paymentGrid').innerHTML = PAYMENT_METHODS.map(m => `
    <button class="pay-method ${state.payment === m.id ? 'selected' : ''}" data-pay="${m.id}" type="button">
      <span class="pay-icon">${m.icon}</span>${t(PAY_LABEL_KEYS[m.id]) || m.label}
    </button>
  `).join('');
  $('paymentGrid').querySelectorAll('[data-pay]').forEach(btn => {
    btn.addEventListener('click', () => {
      state.payment = btn.dataset.pay;
      renderPaymentGrid();
    });
  });
}

let activeCountdownTimer = null;

function nextOrderNum() {
  const n = (parseInt(localStorage.getItem('cj-order-num') || '0', 10) % 200) + 1;
  localStorage.setItem('cj-order-num', String(n));
  return n;
}

function pushOrderToKDS(cartSnapshot) {
  try {
    const num = nextOrderNum();
    const orders = JSON.parse(localStorage.getItem('cj-kds-orders') || '[]');
    orders.push({
      id: num,
      timestamp: Date.now(),
      status: 'pending',
      items: cartSnapshot.map(i => {
        const prod = productById(i.productId);
        const modLabels = i.mods.map(id => {
          const m = MODIFIERS.find(m => m.id === id);
          return m ? modLabel(m) : null;
        }).filter(Boolean);
        return { name: prod ? pName(prod) : i.name, qty: i.qty, mods: modLabels, img: prod?.img || null };
      })
    });
    localStorage.setItem('cj-kds-orders', JSON.stringify(orders));
    try { new BroadcastChannel('cj-kds').postMessage({ type: 'new-order' }); } catch(e) {}
    return num;
  } catch(e) { return null; }
}

function confirmPayment() {
  const cartSnapshot = [...state.cart];
  const { total } = cartSummary();
  const pts = Math.round(total * 10);
  addPoints(pts);
  const orderNum = pushOrderToKDS(cartSnapshot);

  if ($('orderPlacedTitle')) $('orderPlacedTitle').textContent = t('orderPlaced');
  if ($('newOrderLabel')) $('newOrderLabel').textContent = t('newOrder');

  $('successOrderId').textContent = `#${orderNum}`;
  $('successPointsRow').hidden = state.isGuest;
  if (!state.isGuest) {
    $('successPointsRow').innerHTML = t('pointsEarned')(pts);
  }

  // Resumen del pedido
  const summaryEl = $('orderSummary');
  summaryEl.innerHTML = `
    <div class="os-title">${t('orderSummaryTitle')}</div>
    <div class="os-items">
      ${cartSnapshot.map(i => `
        <div class="os-line">
          <span>${(() => { const pr = productById(i.productId); return pr ? pName(pr) : i.name; })()} ×${i.qty}</span>
          <span>${EUR.format(cartLineTotal(i))}</span>
        </div>
      `).join('')}
      <div class="os-line os-total-line">
        <span>${t('total')}</span>
        <span>${EUR.format(total)}</span>
      </div>
    </div>
  `;

  // Ticket digital
  const box = $('ticketDigitalBox');
  if (!state.isGuest) {
    box.innerHTML = `
      <div class="ticket-registered">
        <strong>📧 Recibir ticket digital</strong>
        <p>Te lo enviamos a <em>${$('loginEmail')?.value || state.userName}</em></p>
        <button class="btn-ticket" id="btnSendTicket" type="button">${t('sendTicket')}</button>
      </div>
    `;
    $('btnSendTicket').addEventListener('click', () => {
      $('btnSendTicket').textContent = t('ticketSent');
      $('btnSendTicket').disabled = true;
      showToast(t('toastTicketSent'));
    });
  } else {
    box.innerHTML = `
      <div class="ticket-guest">
        <p>${t('ticketQuestion')}</p>
        <button class="btn-ticket-register" id="btnTicketRegister" type="button">
          ${t('registerTicket')}
        </button>
      </div>
    `;
    $('btnTicketRegister').addEventListener('click', () => {
      safeModal($('registerDialog'));
    });
  }

  // Construir recibo imprimible (oculto salvo @media print)
  const existing = document.getElementById('print-receipt');
  if (existing) existing.remove();
  const receipt = document.createElement('div');
  receipt.id = 'print-receipt';
  receipt.style.cssText = 'display:none';
  const receiptDate = new Date().toLocaleString('es-ES', { dateStyle:'short', timeStyle:'short' });
  receipt.innerHTML = `
    <div style="font-family:'Courier New',monospace;width:280px;color:#000;font-size:13px;line-height:1.5">
      <div style="text-align:center;margin-bottom:12px">
        <div style="font-size:22px;font-weight:900;letter-spacing:2px">CARL'S JR</div>
        <div style="font-size:11px;color:#555">Bigger. Better. Burgers.</div>
        <div style="font-size:11px;color:#555;margin-top:4px">${receiptDate}</div>
      </div>
      <div style="border-top:1px dashed #000;margin:8px 0"></div>
      <div style="text-align:center;font-size:32px;font-weight:900;letter-spacing:1px;margin:8px 0">
        PEDIDO #${orderNum}
      </div>
      <div style="border-top:1px dashed #000;margin:8px 0"></div>
      ${cartSnapshot.map(i => {
        const pr = productById(i.productId);
        const name = pr ? pName(pr) : i.name;
        const line = EUR.format(cartLineTotal(i));
        return `<div style="display:flex;justify-content:space-between;margin:4px 0">
          <span>${i.qty}× ${name}</span><span>${line}</span>
        </div>`;
      }).join('')}
      <div style="border-top:1px dashed #000;margin:8px 0"></div>
      <div style="display:flex;justify-content:space-between;font-weight:900;font-size:15px">
        <span>TOTAL</span><span>${EUR.format(total)}</span>
      </div>
      <div style="border-top:1px dashed #000;margin:8px 0"></div>
      ${!state.isGuest ? `<div style="text-align:center;font-size:11px;color:#555;margin-top:4px">+${pts} puntos acumulados ⭐</div>` : ''}
      <div style="text-align:center;font-size:11px;color:#555;margin-top:12px">¡Gracias por tu visita!</div>
    </div>`;
  document.body.appendChild(receipt);

  $('btnPrintTicket').onclick = () => {
    receipt.style.cssText = '';
    window.print();
    receipt.style.cssText = 'display:none';
  };

  $('checkoutPayment').hidden = true;
  $('checkoutSuccess').hidden = false;
  launchConfetti();
  state.cart = [];
  renderCart();

  // Cuenta atrás y vuelta automática
  clearInterval(activeCountdownTimer);
  let countdown = 12;
  $('countdownVal').textContent = countdown;
  $('countdownMsg').textContent = t('countdownMsg') + '...';
  activeCountdownTimer = setInterval(() => {
    countdown--;
    $('countdownVal').textContent = countdown;
    if (countdown <= 0) {
      clearInterval(activeCountdownTimer);
      location.reload();
    }
  }, 1000);
}

/* ─── POINTS ─── */
function addPoints(n) {
  if (state.isGuest) return;
  state.points += n;
  localStorage.setItem('cj-pts', state.points);
  updatePointsDisplay();
}

function updatePointsDisplay() {
  $('pointsValue').textContent = state.points;
  const el = $('pointsDisplay');
  el.classList.remove('bump');
  void el.offsetWidth; // reflow
  el.classList.add('bump');
}

/* ─── DAILY CHALLENGE BAR ─── */
function animateDcBar(pct) {
  $('dcBar').style.width = pct + '%';
}

/* ─── CONFETTI ─── */
function launchConfetti() {
  const canvas = $('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const pieces = Array.from({ length: 60 }, () => ({
    x: Math.random() * canvas.width,
    y: -10,
    w: Math.random() * 10 + 4,
    h: Math.random() * 6 + 4,
    color: ['#CC0000','#FFC82C','#FFFFFF','#FF4444','#FFE066'][Math.floor(Math.random() * 5)],
    vx: (Math.random() - .5) * 4,
    vy: Math.random() * 4 + 2,
    rot: Math.random() * 360,
    drot: (Math.random() - .5) * 8
  }));

  let frame;
  let tick = 0;
  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    pieces.forEach(p => {
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot * Math.PI / 180);
      ctx.fillStyle = p.color;
      ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
      ctx.restore();
      p.x += p.vx; p.y += p.vy; p.rot += p.drot; p.vy += .08;
    });
    tick++;
    if (tick < 90) frame = requestAnimationFrame(draw);
    else ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
  cancelAnimationFrame(frame);
  tick = 0;
  draw();
}

/* ─── COMBO CONFIGURADOR ─── */

function makeCupSvg({ liq, brand, straw, name }) {
  const svg = `<svg viewBox="0 0 120 180" xmlns="http://www.w3.org/2000/svg">
    <polygon points="19,15 101,15 88,167 32,167" fill="${liq}"/>
    <polygon points="19,15 34,15 25,167 32,167" fill="rgba(0,0,0,0.22)"/>
    <polygon points="86,15 101,15 88,167 94,167" fill="rgba(0,0,0,0.22)"/>
    <polygon points="42,15 78,15 72,95 48,95" fill="rgba(255,255,255,0.10)"/>
    <rect x="22" y="20" width="18" height="13" rx="3" fill="rgba(255,255,255,0.62)"/>
    <rect x="48" y="16" width="22" height="15" rx="3" fill="rgba(255,255,255,0.62)"/>
    <rect x="77" y="18" width="16" height="14" rx="3" fill="rgba(255,255,255,0.62)"/>
    <rect x="33" y="31" width="13" height="9" rx="2" fill="rgba(255,255,255,0.50)"/>
    <polygon points="18,14 102,14 89,168 31,168" fill="none" stroke="rgba(255,255,255,0.50)" stroke-width="2"/>
    <polygon points="18,14 26,14 18,80" fill="rgba(255,255,255,0.18)"/>
    <polygon points="25,90 95,90 86,132 34,132" fill="${brand}" fill-opacity="0.93"/>
    <text x="60" y="114" font-size="11" font-weight="900" fill="white" text-anchor="middle" dominant-baseline="middle" font-family="Impact,Arial Black,sans-serif">${name}</text>
    <ellipse cx="60" cy="14" rx="44" ry="5.5" fill="rgba(255,255,255,0.18)" stroke="rgba(255,255,255,0.38)" stroke-width="1"/>
    <rect x="82" y="-8" width="5" height="78" rx="2.5" fill="${straw}" fill-opacity="0.82" transform="rotate(-7,84,30)"/>
  </svg>`;
  return 'data:image/svg+xml,' + encodeURIComponent(svg);
}

const _CUP_URL = 'https://carlsjr.es/wp-content/uploads/2023/03/Refresco_Vaso_Cocacola-sabor-original.png';
const CUP_IMGS = {
  'coca-cola': _CUP_URL,
  'fanta':     _CUP_URL,
  'sprite':    _CUP_URL,
  'aquarius':  _CUP_URL,
  'monster':   _CUP_URL,
  'agua':      _CUP_URL,
};

const DRINKS_OPTIONS = [
  { id: 'none',       label: 'Sin bebida',       labelEn: 'No drink',        icon: '🙅', img: null,                 extra: 0,    retail: 0    },
  { id: 'coca-cola',  label: 'Coca-Cola',         labelEn: 'Coca-Cola',       icon: '🥤', img: CUP_IMGS['coca-cola'], extra: 0,    retail: 2.50 },
  { id: 'fanta',      label: 'Fanta Naranja',     labelEn: 'Fanta Orange',    icon: '🟠', img: CUP_IMGS['fanta'],     extra: 0,    retail: 2.50 },
  { id: 'sprite',     label: 'Sprite',            labelEn: 'Sprite',          icon: '💚', img: CUP_IMGS['sprite'],    extra: 0,    retail: 2.50 },
  { id: 'aquarius',   label: 'Aquarius',          labelEn: 'Aquarius',        icon: '💙', img: CUP_IMGS['aquarius'],  extra: 0,    retail: 2.50 },
  { id: 'monster',    label: 'Monster',           labelEn: 'Monster',         icon: '⚡', img: CUP_IMGS['monster'],   extra: 0.50, retail: 3.00 },
  { id: 'agua',       label: 'Agua',              labelEn: 'Water',           icon: '💧', img: CUP_IMGS['agua'],      extra: 0,    retail: 1.50 },
];

const COFFEE_OPTIONS = [
  { id: 'cafe-solo',    label: 'Café Solo',      labelEn: 'Espresso',      icon: '☕' },
  { id: 'cafe-cortado', label: 'Cortado',        labelEn: 'Cortado',       icon: '☕' },
  { id: 'cafe-leche',   label: 'Café con Leche', labelEn: 'Café Latte',    icon: '☕' },
  { id: 'te-negro',     label: 'Té Negro',       labelEn: 'Black Tea',     icon: '🍵' },
  { id: 'manzanilla',   label: 'Manzanilla',     labelEn: 'Chamomile Tea', icon: '🍵' },
];

const SIDES_OPTIONS = [
  { id: 'none',       label: 'Sin acompañamiento', labelEn: 'No side',         icon: '🙅', img: null, extra: 0,    retail: 0    },
  { id: 'crisscuts',  label: 'Crisscuts',          labelEn: 'Crisscuts',       icon: '🍟', img: 'https://carlsjr.es/wp-content/uploads/2023/03/crisscuts-2.png', extra: 0,    retail: 2.50 },
  { id: 'fries',      label: 'Patatas Fritas',     labelEn: 'French Fries',    icon: '🍟', img: 'https://carlsjr.es/wp-content/uploads/2023/03/Patatas-Fritas.png', extra: 0,    retail: 2.50 },
  { id: 'nuggets',    label: 'Chicken Nuggets',    labelEn: 'Chicken Nuggets', icon: '🍗', img: 'https://carlsjr.es/wp-content/uploads/2023/03/Chicken-Nuggets.png', extra: 0,    retail: 3.00 },
  { id: 'rings',      label: 'Aros de cebolla',    labelEn: 'Onion Rings',     icon: '⭕', img: 'https://carlsjr.es/wp-content/uploads/2023/03/crisscuts-2.png', extra: 0.50, retail: 3.00 },
];

const DESSERT_OPTIONS = [
  { id: 'none',        label: 'Sin postre',       labelEn: 'No dessert',       icon: '🙅', img: null, extra: 0 },
  { id: 'twist-oreo',  label: 'Twist Oreo',       labelEn: 'Twist Oreo',       icon: '🍦', img: 'https://carlsjr.es/wp-content/uploads/2026/02/twist-oreo-1024x1024.png', extra: 3.95 },
  { id: 'shake-oreo',  label: 'Shake Oreo',       labelEn: 'Oreo Shake',       icon: '🥛', img: 'https://carlsjr.es/wp-content/uploads/2023/03/American_Shake_Oreo_500x500.png', extra: 4.95 },
  { id: 'shake-choc',  label: 'Shake Chocolate',  labelEn: 'Chocolate Shake',  icon: '🍫', img: 'https://carlsjr.es/wp-content/uploads/2023/03/American_Shake_Chocolate-500x500px.png', extra: 4.95 },
];

const BURGER_MODS = [
  { id: 'no-onion',     label: 'Sin cebolla',   price: 0 },
  { id: 'no-tomato',    label: 'Sin tomate',    price: 0 },
  { id: 'no-sauce',     label: 'Sin salsa',     price: 0 },
  { id: 'extra-cheese', label: '+Queso',        price: 0.80 },
  { id: 'extra-bacon',  label: '+Bacon',        price: 1.20 },
];

let comboState = {};

function openMysteryConfigurator(product) {
  comboState = { product, drink: null, side: null, dessert: null, mods: [], qty: 1 };
  const optLabel = opt => (state.lang === 'en' && opt.labelEn) ? opt.labelEn : opt.label;

  const drinkHtml = DRINKS_OPTIONS.map(d => `
    <button class="combo-opt ${comboState.drink?.id === d.id ? 'selected' : ''}" data-drink="${d.id}" type="button">
      <img referrerpolicy="no-referrer" src="${d.img}" alt="${optLabel(d)}" onerror="this.style.opacity='.3'">
      <div>
        <div class="combo-opt-label">${optLabel(d)}</div>
        <div class="combo-opt-price">${d.extra ? '+' + EUR.format(d.extra) : t('included')}</div>
      </div>
    </button>
  `).join('');

  $('comboContent').innerHTML = `
    <div class="combo-hero mystery-hero">
      <img referrerpolicy="no-referrer" class="mystery-hero-img" src="https://carlsjr.es/wp-content/uploads/2023/03/Western-Bacon-Cheeseburger.png" alt="Sorpresa" onerror="this.style.display='none'">
      <div class="mystery-hero-q">?</div>
    </div>
    <div class="combo-body">
      <div class="combo-name">Mystery Carl's</div>
      <div class="combo-desc">${pDesc(product)}</div>
      <div class="combo-section">
        <h3>${t('mysteryChooseDrink')} <span class="combo-required">*</span></h3>
        <div class="combo-options">${drinkHtml}</div>
      </div>
      <div class="pd-qty-row">
        <span class="pd-qty-label">${t('quantity')}</span>
        <div class="pd-qty-ctrl">
          <button class="pd-qty-btn" id="comboQtyMinus" type="button">−</button>
          <span class="pd-qty-val" id="comboQtyVal">1</span>
          <button class="pd-qty-btn" id="comboQtyPlus" type="button">+</button>
        </div>
      </div>
    </div>
    <div class="combo-footer">
      <div class="combo-total-row">
        <span class="combo-total-label">${t('comboTotalLabel')}</span>
        <span class="combo-total-price" id="comboTotalPrice">${EUR.format(comboTotal())}</span>
      </div>
      <button class="btn-add-cart mystery-add-btn" id="btnAddCombo" type="button" ${!comboState.drink ? 'disabled' : ''}>
        ${comboState.drink ? `${t('mysteryAddBtn')} · ${EUR.format(comboTotal())}` : '🥤 Elige tu bebida primero'}
      </button>
    </div>
  `;

  $('comboContent').querySelectorAll('[data-drink]').forEach(btn => {
    btn.addEventListener('click', () => {
      comboState.drink = DRINKS_OPTIONS.find(d => d.id === btn.dataset.drink);
      updateComboPrices();
      $('comboContent').querySelectorAll('[data-drink]').forEach(b => b.classList.toggle('selected', b.dataset.drink === btn.dataset.drink));
    });
  });
  $('comboQtyMinus').addEventListener('click', () => { if (comboState.qty > 1) { comboState.qty--; updateComboPrices(); } });
  $('comboQtyPlus').addEventListener('click',  () => { if (comboState.qty < 9) { comboState.qty++; updateComboPrices(); } });
  $('btnAddCombo').addEventListener('click', () => {
    const note = `Bebida: ${comboState.drink.label} · 🎲 Sorpresa`;
    addToCart(comboState.product, [], comboState.qty, note);
    safeClose($('comboDialog'));
    showToast(t('mysteryRevealed'));
  });

  safeModal($('comboDialog'));
}

function openComboConfigurator(product, mode = 'combo') {
  const isSolo = mode === 'solo';
  comboState = {
    product, mode,
    drink:   isSolo ? DRINKS_OPTIONS[0] : null,  // 'none' preselected for solo
    side:    isSolo ? SIDES_OPTIONS[0]  : null,   // 'none' preselected for solo
    dessert: isSolo ? DESSERT_OPTIONS[0]: null,   // 'none' preselected for solo
    mods: [], qty: 1
  };
  renderComboDialog();
  safeModal($('comboDialog'));
}

function optPrice(opt, field) {
  // For solo mode use retail price, for combo use extra upcharge
  return comboState.mode === 'solo' ? (opt?.retail ?? 0) : (opt?.[field] ?? 0);
}

function comboTotal() {
  const drinkCost   = optPrice(comboState.drink,   'extra');
  const sideCost    = optPrice(comboState.side,     'extra');
  const dessertCost = (comboState.dessert?.extra ?? 0);
  const modsExtra   = comboState.mods.reduce((s, id) => s + (BURGER_MODS.find(m => m.id === id)?.price || 0), 0);
  return round((comboState.product.price + drinkCost + sideCost + dessertCost + modsExtra) * comboState.qty);
}

function comboReady() {
  if (comboState.product?.isMystery) return !!comboState.drink;
  if (comboState.mode === 'solo') return true; // none options preselected, always ready
  return !!(comboState.drink && comboState.side && comboState.dessert);
}

function comboBlockMsg() {
  if (comboState.mode === 'solo' || comboState.product?.isMystery) {
    if (!comboState.drink) return '🥤 Elige tu bebida primero';
    return null;
  }
  if (!comboState.drink)   return '🥤 Elige tu bebida primero';
  if (!comboState.side)    return '🍟 Elige tu acompañamiento';
  if (!comboState.dessert) return '🍦 Elige el postre';
  return null;
}

function renderComboDialog() {
  const p = comboState.product;
  const isSolo = comboState.mode === 'solo';
  const optLabel = opt => (state.lang === 'en' && opt.labelEn) ? opt.labelEn : opt.label;

  const drinkPrice = d => {
    const price = isSolo ? d.retail : d.extra;
    if (d.id === 'none') return isSolo ? t('included') : t('included');
    return price ? '+' + EUR.format(price) : t('included');
  };
  const sidePrice = s => {
    const price = isSolo ? s.retail : s.extra;
    if (s.id === 'none') return t('included');
    return price ? '+' + EUR.format(price) : t('included');
  };

  const drinkHtml = DRINKS_OPTIONS.map(d => `
    <button class="combo-opt ${comboState.drink?.id === d.id ? 'selected' : ''}" data-drink="${d.id}" type="button">
      ${d.img ? `<img referrerpolicy="no-referrer" src="${d.img}" alt="${optLabel(d)}" onerror="this.style.opacity='.3'">` : `<span class="combo-opt-icon">${d.icon}</span>`}
      <div>
        <div class="combo-opt-label">${optLabel(d)}</div>
        <div class="combo-opt-price">${drinkPrice(d)}</div>
      </div>
    </button>
  `).join('');

  const sideHtml = SIDES_OPTIONS.map(s => `
    <button class="combo-opt ${comboState.side?.id === s.id ? 'selected' : ''}" data-side="${s.id}" type="button">
      ${s.img ? `<img referrerpolicy="no-referrer" src="${s.img}" alt="${optLabel(s)}" onerror="this.style.display='none'">` : `<span class="combo-opt-icon">${s.icon}</span>`}
      <div>
        <div class="combo-opt-label">${optLabel(s)}</div>
        <div class="combo-opt-price">${sidePrice(s)}</div>
      </div>
    </button>
  `).join('');

  const dessertHtml = DESSERT_OPTIONS.map(d => `
    <button class="combo-opt ${comboState.dessert?.id === d.id ? 'selected' : ''}" data-dessert="${d.id}" type="button">
      ${d.img ? `<img referrerpolicy="no-referrer" src="${d.img}" alt="${optLabel(d)}" onerror="this.style.opacity='.3'">` : `<span class="combo-opt-icon">${d.icon}</span>`}
      <div>
        <div class="combo-opt-label">${optLabel(d)}</div>
        <div class="combo-opt-price">${d.extra ? '+' + EUR.format(d.extra) : t('included')}</div>
      </div>
    </button>
  `).join('');

  const modsHtml = BURGER_MODS.map(m => `
    <button class="combo-mod ${comboState.mods.includes(m.id) ? 'active' : ''}" data-mod="${m.id}" type="button">
      ${t('mod-' + m.id)}${m.price ? ` +${EUR.format(m.price)}` : ''}
    </button>
  `).join('');

  $('comboContent').innerHTML = `
    <div class="combo-hero">
      ${p.img ? `<img referrerpolicy="no-referrer" src="${p.img}" alt="${pName(p)}">` : `<span style="font-size:5rem">🍔</span>`}
    </div>
    <div class="combo-body">
      <div class="combo-name" id="comboTitle">${pName(p)}</div>
      <div class="combo-desc">${pDesc(p)}</div>

      <div class="combo-section">
        <h3>${t('chooseDrink')} ${!isSolo ? '<span class="combo-required">*</span>' : ''}</h3>
        <div class="combo-options">${drinkHtml}</div>
      </div>

      <div class="combo-section">
        <h3>${t('chooseSide')} ${!isSolo ? '<span class="combo-required">*</span>' : ''}</h3>
        <div class="combo-options">${sideHtml}</div>
      </div>

      <div class="combo-section">
        <h3>${t('chooseDessert')} ${!isSolo ? '<span class="combo-required">*</span>' : ''}</h3>
        <div class="combo-options">${dessertHtml}</div>
      </div>

      <div class="combo-section">
        <h3>${t('customizeBurger')}</h3>
        <div class="combo-mods">${modsHtml}</div>
      </div>

      <div class="pd-qty-row">
        <span class="pd-qty-label">${t('quantity')}</span>
        <div class="pd-qty-ctrl">
          <button class="pd-qty-btn" id="comboQtyMinus" type="button">−</button>
          <span class="pd-qty-val" id="comboQtyVal">${comboState.qty}</span>
          <button class="pd-qty-btn" id="comboQtyPlus" type="button">+</button>
        </div>
      </div>
    </div>
    <div class="combo-footer">
      <div class="combo-total-row">
        <span class="combo-total-label">${t('comboTotalLabel')}</span>
        <span class="combo-total-price" id="comboTotalPrice">${EUR.format(comboTotal())}</span>
      </div>
      <button class="btn-add-cart" id="btnAddCombo" type="button" ${!comboReady() ? 'disabled' : ''}>
        ${comboBlockMsg() ?? `${t('addCombo')} ${EUR.format(comboTotal())}`}
      </button>
    </div>
  `;

  // Bind drink selection
  $('comboContent').querySelectorAll('[data-drink]').forEach(btn => {
    btn.addEventListener('click', () => {
      comboState.drink = DRINKS_OPTIONS.find(d => d.id === btn.dataset.drink);
      updateComboPrices();
      $('comboContent').querySelectorAll('[data-drink]').forEach(b => b.classList.toggle('selected', b.dataset.drink === btn.dataset.drink));
    });
  });

  // Bind side selection
  $('comboContent').querySelectorAll('[data-side]').forEach(btn => {
    btn.addEventListener('click', () => {
      comboState.side = SIDES_OPTIONS.find(s => s.id === btn.dataset.side);
      updateComboPrices();
      $('comboContent').querySelectorAll('[data-side]').forEach(b => b.classList.toggle('selected', b.dataset.side === btn.dataset.side));
    });
  });

  // Bind dessert selection
  $('comboContent').querySelectorAll('[data-dessert]').forEach(btn => {
    btn.addEventListener('click', () => {
      comboState.dessert = DESSERT_OPTIONS.find(d => d.id === btn.dataset.dessert);
      updateComboPrices();
      $('comboContent').querySelectorAll('[data-dessert]').forEach(b => b.classList.toggle('selected', b.dataset.dessert === btn.dataset.dessert));
    });
  });

  // Bind mods
  $('comboContent').querySelectorAll('[data-mod]').forEach(btn => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.mod;
      if (comboState.mods.includes(id)) comboState.mods = comboState.mods.filter(m => m !== id);
      else comboState.mods.push(id);
      btn.classList.toggle('active', comboState.mods.includes(id));
      updateComboPrices();
    });
  });

  // Bind qty
  $('comboQtyMinus').addEventListener('click', () => { if (comboState.qty > 1) { comboState.qty--; updateComboPrices(); } });
  $('comboQtyPlus').addEventListener('click',  () => { if (comboState.qty < 9) { comboState.qty++; updateComboPrices(); } });

  // Bind add
  $('btnAddCombo').addEventListener('click', () => {
    if (!comboReady()) return;
    const note = [
      comboState.drink?.id !== 'none'    ? `Bebida: ${comboState.drink.label}` : '',
      comboState.side?.id   !== 'none'   ? `Acomp: ${comboState.side.label}`   : '',
      comboState.dessert?.id !== 'none'  ? `Postre: ${comboState.dessert.label}` : ''
    ].filter(Boolean).join(' · ');

    addToCart(comboState.product, comboState.mods, comboState.qty, note);
    safeClose($('comboDialog'));
  });
}

function updateComboPrices() {
  const total = comboTotal();
  $('comboQtyVal').textContent = comboState.qty;
  $('comboTotalPrice').textContent = EUR.format(total);
  const btn = $('btnAddCombo');
  const msg = comboBlockMsg();
  if (msg) {
    btn.disabled = true;
    btn.textContent = msg;
  } else {
    btn.disabled = false;
    const isMystery = btn.classList.contains('mystery-add-btn');
    btn.textContent = isMystery ? `${t('mysteryAddBtn')} · ${EUR.format(total)}` : `${t('addCombo')} ${EUR.format(total)}`;
  }
}

/* ─── IDIOMA ─── */
function applyI18n() {
  document.querySelectorAll('[data-i18n]').forEach(el => {
    const key = el.dataset.i18n;
    const val = t(key);
    if (key === 'title') el.innerHTML = val;
    else el.textContent = val;
  });
  // Placeholders
  const loginName = $('loginName');
  if (loginName) loginName.placeholder = t('lsNamePh');
  const loginEmail = $('loginEmail');
  if (loginEmail) loginEmail.placeholder = t('lsEmailPh');
  const rdName = $('rdNameInput');
  if (rdName) rdName.placeholder = t('rdNamePh');
  const rdEmail = $('rdEmailInput');
  if (rdEmail) rdEmail.placeholder = t('rdEmailPh');
  // Lang button active state
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.lang === state.lang);
  });
  // Daily challenge text
  if ($('dcTitle')) $('dcTitle').textContent = t('dcTitle');
  if ($('dcText')) $('dcText').textContent = t('dcText');
  if ($('dcPts')) $('dcPts').textContent = t('dcPts');
}

function setLang(lang) {
  state.lang = lang;
  applyI18n();
  renderCatNav();
  renderCart();
  renderProducts();
  triggerUpsell();
  // Quiz back button
  if ($('btnQuizBack')) $('btnQuizBack').textContent = t('quizBack');
  // Re-render quiz if open
  if ($('viewQuiz').classList.contains('active')) {
    $('quizResults').innerHTML = '';
    renderQuizStep();
  }
  // Re-render payment grid if checkout is open
  if ($('checkoutDialog').open) {
    renderPaymentGrid();
  }
  // Re-render combo dialog if open
  if ($('comboDialog').open) {
    renderComboDialog();
  }
  // Re-render product dialog if open
  if ($('productDialog').open && dialogProduct) {
    renderProductDialog(dialogProduct);
  }
  // Update checkout static buttons
  if ($('btnPay')) $('btnPay').textContent = t('confirmPayLabel');
  if ($('btnCancelCheckout')) $('btnCancelCheckout').textContent = t('backOrderLabel');
  if ($('howPayTitle')) $('howPayTitle').textContent = t('howPay');
}

function bindLangSwitcher() {
  document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLang(btn.dataset.lang));
  });
}

/* ─── REGISTRO DESDE CHECKOUT ─── */
function bindRegisterDialog() {
  const dialog = $('registerDialog');
  if (!dialog) return;
  $('rdClose').addEventListener('click', () => safeClose(dialog));
  dialog.addEventListener('click', e => { if (e.target === dialog) safeClose(dialog); });

  $('registerForm').addEventListener('submit', e => {
    e.preventDefault();
    const name  = $('rdNameInput').value.trim();
    const email = $('rdEmailInput').value.trim();
    if (!name || !email) { showToast(t('toastNameEmail')); return; }
    state.userName = name;
    state.isGuest = false;
    $('pointsDisplay').classList.remove('hidden');
    safeClose(dialog);
    showToast(t('toastRegistered'));
    // Update ticket box to show confirmation
    const box = $('ticketDigitalBox');
    if (box) {
      box.innerHTML = `<div class="ticket-registered"><strong>${t('ticketSentTo')(email)}</strong></div>`;
    }
  });
}

/* ─── TOAST ─── */
let toastTimer;
function showToast(msg) {
  const t = $('toast');
  t.textContent = msg;
  t.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove('show'), 2600);
}

/* ─── ATTRACT MODE ─── */
(function() {
  const IDLE_MS    = 30_000;
  const PHOTO_MS   = 6_000; // duración de cada foto

  // Playlist: { type:'video'|'photo', src }
  const PLAYLIST = [
    { type: 'video', src: './promo1.mp4' },
    { type: 'photo', src: './promo1.jpg' },
    { type: 'video', src: './promo2.mp4' },
    { type: 'video', src: './promo3.mp4' },
    { type: 'photo', src: './promo2.jpg' },
    { type: 'video', src: './promo4.mp4' },
  ];

  let idleTimer   = null;
  let photoTimer  = null;
  let idx         = 0;

  const screen = $('attractScreen');
  const video  = $('attractVideo');
  const photo  = $('attractPhoto');
  if (!screen || !video || !photo) return;

  function isOnWelcome() {
    const w = document.getElementById('welcome');
    return w && !w.hidden;
  }

  function playItem(i) {
    idx = ((i % PLAYLIST.length) + PLAYLIST.length) % PLAYLIST.length;
    const item = PLAYLIST[idx];
    clearTimeout(photoTimer);

    if (item.type === 'video') {
      photo.hidden = true;
      video.hidden = false;
      video.src = item.src;
      video.play().catch(() => nextItem()); // si falla el src, salta al siguiente
    } else {
      video.pause(); video.hidden = true;
      photo.src = item.src;
      photo.hidden = false;
      photoTimer = setTimeout(() => nextItem(), PHOTO_MS);
    }
  }

  function nextItem() { playItem(idx + 1); }

  function showAttract() {
    if (!isOnWelcome()) return;
    screen.hidden = false;
    playItem(idx);
  }

  function hideAttract() {
    screen.hidden = true;
    video.pause(); video.src = ''; video.hidden = false;
    photo.hidden = true;
    clearTimeout(photoTimer);
    resetIdle();
  }

  function resetIdle() {
    clearTimeout(idleTimer);
    if (isOnWelcome()) idleTimer = setTimeout(showAttract, IDLE_MS);
  }

  video.addEventListener('ended', nextItem);
  screen.addEventListener('pointerdown', hideAttract);

  ['pointerdown', 'pointermove', 'keydown'].forEach(ev =>
    document.addEventListener(ev, () => {
      if (!screen.hidden) return;
      resetIdle();
    }, { passive: true })
  );

  const observer = new MutationObserver(resetIdle);
  const welcome = document.getElementById('welcome');
  if (welcome) observer.observe(welcome, { attributes: true, attributeFilter: ['hidden'] });

  resetIdle();
})();

