// federacion-biotica.js
// Rediseño 100% visual en forma de RED con ICONOS FLAT VECTORIALES (Sin emojis):
// 1. Diagrama de Red: Jerarquía Vertical vs. Federación Policéntrica (Sin Líder Central)
// 2. Grafo de Red Sociobiótica: Lugares (Dónde) + Personas (Quiénes) + Especies del Humedal El Burro (Relaciones bióticas y Para qué)

(function(){
  // --- DICCIONARIO DE SÍMBOLOS SVG FLAT (Iconos vectoriales stroke, sin emojis) ---
  const SVG_DEFS = `
  <defs>
    <!-- Institución / Alcaldía / Soporte público -->
    <symbol id="ic-institucion" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 21h18M3 10h18M5 10v11M9 10v11M15 10v11M19 10v11M12 2L2 7h20z"/>
    </symbol>

    <!-- Mayorista / Corabastos / Bodega -->
    <symbol id="ic-bodega" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m2 7 3-4h14l3 4"/>
      <path d="M4 11v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9"/>
      <path d="M9 21v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5"/>
      <path d="M2 7h20"/>
    </symbol>

    <!-- Transporte / Camiones / Logística -->
    <symbol id="ic-transporte" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h2"/>
      <path d="M15 18H9"/>
      <path d="M19 18h2a1 1 0 0 0 1-1v-3.65a1 1 0 0 0-.22-.624l-3.48-4.35A1 1 0 0 0 17.52 8H14"/>
      <circle cx="17" cy="18" r="2"/>
      <circle cx="7" cy="18" r="2"/>
    </symbol>

    <!-- Obrero / Cotero / Trabajo manual -->
    <symbol id="ic-obrero" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="7" r="4"/>
      <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2"/>
      <path d="M9 2.5h6"/>
    </symbol>

    <!-- Persona individual -->
    <symbol id="ic-persona" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="7" r="4"/>
      <path d="M5.5 21v-2a6.5 6.5 0 0 1 13 0v2"/>
    </symbol>

    <!-- Colectivo / Vecinos / Comunidad / JAC -->
    <symbol id="ic-comunidad" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="9" cy="7" r="4"/>
      <path d="M3 21v-2a6 6 0 0 1 12 0v2"/>
      <circle cx="17" cy="8" r="3"/>
      <path d="M17 14c2.5 0 4.5 1.5 4.5 4.5v1.5"/>
    </symbol>

    <!-- Mesa Federativa / Red Policéntrica Horizontal -->
    <symbol id="ic-mesa" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3.5"/>
      <circle cx="12" cy="3.5" r="2"/>
      <circle cx="20.5" cy="12" r="2"/>
      <circle cx="12" cy="20.5" r="2"/>
      <circle cx="3.5" cy="12" r="2"/>
      <line x1="12" y1="5.5" x2="12" y2="8.5"/>
      <line x1="18.5" y1="12" x2="15.5" y2="12"/>
      <line x1="12" y1="18.5" x2="12" y2="15.5"/>
      <line x1="5.5" y1="12" x2="8.5" y2="12"/>
    </symbol>

    <!-- Huertas / Alimentos / Hoja / Siembra -->
    <symbol id="ic-huerta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19 2c1 2 2 4.18 2 8 0 5.5-4.78 10-10 10Z"/>
      <path d="M2 21c0-3 1.85-5.36 5.08-6C9.5 14.52 12 13 13 12"/>
    </symbol>

    <!-- Humedal / Agua / Ronda / Cuenca -->
    <symbol id="ic-agua" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 2.69l5.66 5.66a8 8 0 1 1-11.31 0z"/>
    </symbol>

    <!-- Circularidad / Reciclaje / Compost -->
    <symbol id="ic-reciclaje" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M21 2v6h-6"/>
      <path d="M3 12a9 9 0 0 1 15-6.7L21 8"/>
      <path d="M3 22v-6h6"/>
      <path d="M21 12a9 9 0 0 1-15 6.7L3 16"/>
    </symbol>

    <!-- Comercio Barrial / Tienda de barrio / Feria -->
    <symbol id="ic-tienda" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m2 7 3-4h14l3 4"/>
      <path d="M4 11v9a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-9"/>
      <path d="M9 21v-5a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v5"/>
      <path d="M2 7h20"/>
    </symbol>

    <!-- Hogar / Huerta de Asentamiento -->
    <symbol id="ic-hogar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
      <polyline points="9 22 9 12 15 12 15 22"/>
    </symbol>

    <!-- Edificio / Terraza / Huerta en Altura -->
    <symbol id="ic-edificio" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="16" height="20" x="4" y="2" rx="2"/>
      <path d="M9 22v-4h6v4"/>
      <path d="M8 6h.01"/><path d="M16 6h.01"/><path d="M12 6h.01"/>
      <path d="M8 10h.01"/><path d="M16 10h.01"/><path d="M12 10h.01"/>
      <path d="M8 14h.01"/><path d="M16 14h.01"/><path d="M12 14h.01"/>
    </symbol>

    <!-- Lote Baldío / Terreno Comunitario -->
    <symbol id="ic-terreno" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/>
      <line x1="9" y1="3" x2="9" y2="18"/>
      <line x1="15" y1="6" x2="15" y2="21"/>
    </symbol>

    <!-- Hongos / Micología / Proteína sobre rastrojos -->
    <symbol id="ic-hongo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 3a8 8 0 0 0-8 8c0 1 1 2 2 2h12c1 0 2-1 2-2a8 8 0 0 0-8-8z"/>
      <path d="M9 13v7a1 1 0 0 0 1 1h4a1 1 0 0 0 1-1v-7"/>
      <circle cx="9" cy="8" r="1" fill="currentColor"/>
      <circle cx="15" cy="8" r="1" fill="currentColor"/>
    </symbol>

    <!-- Comedores Comunitarios / Escuelas -->
    <symbol id="ic-comedor" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 13h18a9 9 0 0 1-18 0z"/>
      <line x1="12" y1="13" x2="12" y2="20"/>
      <line x1="8" y1="20" x2="16" y2="20"/>
      <path d="M7 6c0-2 2-3 2-3s2 1 2 3"/>
      <path d="M13 6c0-2 2-3 2-3s2 1 2 3"/>
    </symbol>

    <!-- Custodio / Veeduría ambiental / Cuidado -->
    <symbol id="ic-custodio" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
    </symbol>

    <!-- Carrito / Venta barrial / Tenderos -->
    <symbol id="ic-carrito" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="8" cy="21" r="1"/>
      <circle cx="19" cy="21" r="1"/>
      <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"/>
    </symbol>

    <!-- Abeja / Mariposa / Polinizadores -->
    <symbol id="ic-abeja" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <ellipse cx="12" cy="13" rx="4" ry="6"/>
      <line x1="8.5" y1="12" x2="15.5" y2="12"/>
      <line x1="9" y1="15" x2="15" y2="15"/>
      <path d="M8 9C6 6 3 6 3 9c0 3 3 3 5 1"/>
      <path d="M16 9c2-3 5-3 5 0 0 3-3 3-5 1"/>
      <path d="M10 6L9 3M14 6l1-3"/>
    </symbol>

    <!-- Ave / Tingua Bogotana / Cucarachero -->
    <symbol id="ic-ave" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M16 7h.01"/>
      <path d="M3.4 18H12a8 8 0 0 0 8-8V7a4 4 0 0 0-7.28-2.3L2 18z"/>
    </symbol>

    <!-- Lombriz / Microbiota viva del suelo -->
    <symbol id="ic-lombriz" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M3 17c3-3 5 1 8-2s3-4 6-2 2 4 4 1"/>
      <path d="M5 8c2-2 4 0 6-2s2-3 4-1"/>
    </symbol>

    <!-- Rana Sabanera / Bioindicador anfibio -->
    <symbol id="ic-rana" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="7" cy="8" r="2.5"/>
      <circle cx="17" cy="8" r="2.5"/>
      <ellipse cx="12" cy="14" rx="7" ry="6"/>
      <circle cx="9.5" cy="13.5" r="1.2" fill="currentColor"/>
      <circle cx="14.5" cy="13.5" r="1.2" fill="currentColor"/>
      <path d="M8.5 17c1.5 1.2 5.5 1.2 7 0"/>
    </symbol>

    <!-- Flora Nativa / Aliso / Chilco / Biofiltro -->
    <symbol id="ic-flora" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M12 22v-8m0 0C8 14 4 10 4 6c4 0 8 4 8 8zm0 0c4 0 8-4 8-8-4 0-8 4-8 8z"/>
    </symbol>
  </defs>
  `;

  // Helper para generar markup SVG inline de un icono flat
  function iconSvgHtml(iconId, size = 16, color = 'currentColor', extraStyle = '') {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-3px;pointer-events:none;${extraStyle}"><use href="#ic-${iconId}"/></svg>`;
  }

  // --- ESTILOS CSS VISUALES (Minimizando texto, maximizando iconos y grafos) ---
  const css = `
  .view-federacion-stage {
    display: none;
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at 1px 1px, #182032 1px, transparent 1.3px) 0 0/24px 24px, #080b11;
    overflow: hidden;
    z-index: 10;
    color: #F3F0EA;
    font-family: 'Instrument Sans', system-ui, sans-serif;
  }
  .fed-topbar {
    position: absolute;
    top: 12px;
    left: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    z-index: 20;
    pointer-events: none;
  }
  .fed-topbar > * { pointer-events: auto; }
  .fed-switcher {
    display: inline-flex;
    background: rgba(14, 18, 28, 0.92);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 999px;
    padding: 4px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
  }
  .fed-tab-btn {
    background: none;
    border: 0;
    color: #94a3b8;
    padding: 7px 16px;
    border-radius: 999px;
    font-size: 12.5px;
    font-weight: 600;
    cursor: pointer;
    transition: all .15s;
    display: inline-flex;
    align-items: center;
    gap: 7px;
  }
  .fed-tab-btn:hover { color: #fff; }
  .fed-tab-btn.active {
    background: linear-gradient(135deg, #0284c7 0%, #2563eb 100%);
    color: #fff;
    font-weight: 700;
    box-shadow: 0 0 12px rgba(56,189,248,0.35);
  }

  .fed-filters-pill {
    display: inline-flex;
    background: rgba(14, 18, 28, 0.92);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 999px;
    padding: 4px;
    gap: 4px;
  }
  .ff-btn {
    background: none;
    border: 0;
    color: #94a3b8;
    font-size: 11.5px;
    font-weight: 600;
    padding: 5px 12px;
    border-radius: 999px;
    cursor: pointer;
    transition: all .15s;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .ff-btn:hover { color: #fff; }
  .ff-btn.active {
    background: rgba(255,255,255,0.12);
    color: #38bdf8;
    font-weight: 700;
  }

  /* Canvas SVG principal */
  .fed-svg-stage {
    width: 100%;
    height: 100%;
    display: block;
    cursor: grab;
  }
  .fed-svg-stage:active { cursor: grabbing; }

  /* Tooltip flotante limpio y explicativo */
  .fed-floating-tip {
    position: absolute;
    bottom: 24px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(12, 16, 26, 0.95);
    backdrop-filter: blur(12px);
    border: 1.5px solid #38bdf8;
    border-radius: 14px;
    padding: 12px 20px;
    max-width: 620px;
    width: 90%;
    box-shadow: 0 16px 40px rgba(0,0,0,0.8);
    z-index: 25;
    pointer-events: none;
    transition: opacity .2s, transform .2s;
  }
  .fed-floating-tip.hidden {
    opacity: 0;
    transform: translateX(-50%) translateY(12px);
  }
  .tip-badge {
    font: 700 10.5px 'JetBrains Mono', monospace;
    text-transform: uppercase;
    letter-spacing: .08em;
    display: inline-block;
    padding: 2px 7px;
    border-radius: 5px;
    margin-bottom: 4px;
  }
  .tip-title {
    margin: 0;
    font-size: 15.5px;
    font-weight: 700;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .tip-desc {
    margin: 4px 0 0;
    font-size: 12.5px;
    line-height: 1.4;
    color: #cbd5e1;
  }
  .tip-desc b { color: #6ee7b7; font-weight: 700; }
  `;

  const sEl = document.createElement('style');
  sEl.textContent = css;
  document.head.appendChild(sEl);

  // --- DATOS VISUALES PARA LOS DOS GRAFOS ---

  // 1. COMPARACIÓN VISUAL: Jerarquía vs Federación
  const DATA_COMP = {
    jerarquia: {
      titulo: 'Hoy: Jerarquía Piramidal',
      sub: 'Mando vertical: decisiones arriba · costos abajo',
      nodos: [
        { id:'j1', n:'Alcaldía & UAESP', icon:'institucion', y:125, tag:'Decisión y Contratos', col:'#f87171' },
        { id:'j2', n:'Gerencia Corabastos', icon:'bodega', y:200, tag:'Monopolio Mayorista', col:'#fb923c' },
        { id:'j3', n:'Transporte & Aseo', icon:'transporte', y:275, tag:'Operación Externa', col:'#fbbf24' },
        { id:'j4', n:'Recicladores & Coteros', icon:'obrero', y:350, tag:'Trabajo Físico', col:'#94a3b8' },
        { id:'j5', n:'Vecinos & Humedal', icon:'comunidad', y:425, tag:'Soportan Costos y Contaminación', col:'#64748b' }
      ]
    },
    federacion: {
      titulo: 'Propuesta: Federación Policéntrica',
      sub: 'SIN LÍDER CENTRAL · Red horizontal de núcleos autónomos',
      centro: { id:'fc', n:'Mesa Federativa', icon:'mesa', tag:'Vocerías rotativas · Cero jefes', col:'#38bdf8' },
      nodos: [
        { id:'f1', n:'Huertas & Alimentos', icon:'huerta', tag:'Hogares y Comedores', col:'#4ade80', angle: -Math.PI/2 },
        { id:'f2', n:'Humedal & Agua', icon:'agua', tag:'Custodios El Burro', col:'#38bdf8', angle: -Math.PI/2 + (2*Math.PI/5) },
        { id:'f3', n:'Circularidad & Compost', icon:'reciclaje', tag:'Recicladores de Oficio', col:'#facc15', angle: -Math.PI/2 + 2*(2*Math.PI/5) },
        { id:'f4', n:'Comercio Barrial', icon:'tienda', tag:'Tenderos y Ferias', col:'#fb923c', angle: -Math.PI/2 + 3*(2*Math.PI/5) },
        { id:'f5', n:'Soporte Distrital', icon:'institucion', tag:'UAESP y Alcaldía (sin mando)', col:'#c084fc', angle: -Math.PI/2 + 4*(2*Math.PI/5) }
      ]
    }
  };

  // 2. RED SOCIOBIÓTICA: Lugares + Personas + Relaciones Bióticas atraídas
  // Distribución visual equilibrada (Especies arriba, Lugares centro, Personas abajo)
  const NODOS_SOCIOBIOTICA = [
    // --- ESPECIES BIÓTICAS (Atraídas del Humedal El Burro - ¿Para qué?) ---
    { id:'B_abe', cat:'biotica', n:'Abejas & Mariposas', icon:'abeja', col:'#fde047', x:170, y:75,
      quienes:'Bombus pauloensis, Abeja angelita, Mariposas',
      paraque:'Polinizar flores de hortalizas y frutales: ¡aumenta la cosecha un 40%!' },
    { id:'B_ave', cat:'biotica', n:'Tinguas & Cucaracheros', icon:'ave', col:'#38bdf8', x:335, y:75,
      quienes:'Tingua bogotana, cucarachero de pantano, colibrí, mirlas',
      paraque:'Control biológico natural de orugas y plagas sin venenos químicos' },
    { id:'B_ran', cat:'biotica', n:'Rana Sabanera', icon:'rana', col:'#4ade80', x:500, y:75,
      quienes:'Dendropsophus labialis (anfibio nativo)',
      paraque:'Depredar larvas de zancudos y ser bioindicador de agua libre de contaminantes' },
    { id:'B_lom', cat:'biotica', n:'Lombrices & Microbiota', icon:'lombriz', col:'#fb923c', x:665, y:75,
      quienes:'Lombriz roja californiana y bacterias nitrificantes',
      paraque:'Degradar vorazmente los residuos orgánicos y generar abono vivo rico en nitrógeno' },
    { id:'B_flo', cat:'biotica', n:'Flora Nativa (Aliso/Chilco)', icon:'flora', col:'#a3e635', x:830, y:75,
      quienes:'Aliso, chilco, botón de oro, ruda y caléndula',
      paraque:'Cercas vivas cortaviento, hospederos florales y fijación biológica de nitrógeno' },

    // --- LUGARES TERRITORIALES (Dónde) ---
    { id:'L_inv', cat:'lugar', n:'Huerta Invasión', icon:'hogar', col:'#4ade80', x:160, y:230,
      quienes:'Familias de asentamiento informal',
      paraque:'Autoconsumo diario y soberanía alimentaria en barrios populares' },
    { id:'L_alt', cat:'lugar', n:'Huerta en Altura', icon:'edificio', col:'#38bdf8', x:330, y:210,
      quienes:'Vecinos de conjuntos residenciales',
      paraque:'Aprovechar terrazas ociosas y reducir la isla de calor urbana' },
    { id:'L_hum', cat:'lugar', n:'Ronda Humedal El Burro', icon:'agua', col:'#06b6d4', x:500, y:200,
      quienes:'Custodios del humedal y vecinos ribereños',
      paraque:'Franja agroecológica de amortiguamiento y protección hídrica' },
    { id:'L_bal', cat:'lugar', n:'Huerta en Baldío', icon:'terreno', col:'#2dd4bf', x:670, y:210,
      quienes:'Juntas Comunales (JAC) y jóvenes',
      paraque:'Recuperar lotes abandonados y crear espacio comunitario verde' },
    { id:'L_com', cat:'lugar', n:'Estación Compostaje', icon:'reciclaje', col:'#eab308', x:840, y:230,
      quienes:'Recicladores organizados y coteros',
      paraque:'Desviar orgánicos de Corabastos y transformarlos en abono gratis' },

    { id:'L_aco', cat:'lugar', n:'Acopio & Tiendas', icon:'tienda', col:'#f97316', x:260, y:350,
      quienes:'Tenderos barriales y vendedores de feria',
      paraque:'Venta directa a precio justo de excedentes agrícolas locales' },
    { id:'L_esc', cat:'lugar', n:'Comedores & Escuelas', icon:'comedor', col:'#a855f7', x:500, y:340,
      quienes:'Cocineras comunitarias, docentes y estudiantes',
      paraque:'Comensalidad digna y formación de relevo generacional' },
    { id:'L_hon', cat:'lugar', n:'Distrito de Hongos', icon:'hongo', col:'#ec4899', x:740, y:350,
      quienes:'Técnicos comunitarios en micología',
      paraque:'Cultivar proteína de setas sobre rastrojos agrícolas de Corabastos' },

    // --- PERSONAS Y COMUNIDADES (Quiénes) ---
    { id:'P_hor', cat:'persona', n:'Hortelanos & Familias', icon:'persona', col:'#86efac', x:140, y:490,
      quienes:'Vecinas y hortelanos populares',
      paraque:'Siembra, deshierbe y cosecha cotidiana en los barrios' },
    { id:'P_rec', cat:'persona', n:'Recicladores de Orgánicos', icon:'obrero', col:'#fde047', x:290, y:500,
      quienes:'Asociaciones de recicladores de oficio',
      paraque:'Recolección diferenciada y manejo de camas de compostaje' },
    { id:'P_cus', cat:'persona', n:'Custodios Humedal', icon:'custodio', col:'#38bdf8', x:440, y:490,
      quienes:'Colectivos ambientales de El Burro y La Vaca',
      paraque:'Veeduría ambiental, monitoreo de agua y cuidado de la fauna' },
    { id:'P_coc', cat:'persona', n:'Cocineras Comunitarias', icon:'comedor', col:'#d8b4fe', x:590, y:500,
      quienes:'Madres comunitarias y líderes de comedores',
      paraque:'Transformar lo cosechado en raciones calientes saludables' },
    { id:'P_ten', cat:'persona', n:'Tenderos Barriales', icon:'carrito', col:'#fdba74', x:730, y:490,
      quienes:'Comerciantes de víveres del barrio',
      paraque:'Compra preferencial de hortalizas locales para abastecer a las familias' },
    { id:'P_jac', cat:'persona', n:'Juntas Comunales (JAC)', icon:'comunidad', col:'#67e8f9', x:870, y:500,
      quienes:'Dignatarios y líderes vecinales',
      paraque:'Gestión de lotes, salones comunales y mingas de trabajo' }
  ];

  const ENLACES_SOCIOBIOTICA = [
    // Lugares <-> Personas (Quiénes participan)
    { s:'P_hor', t:'L_inv', label:'Cultiva y cuida' },
    { s:'P_hor', t:'L_alt', label:'Manejo de terrazas' },
    { s:'P_jac', t:'L_bal', label:'Asigna y convoca' },
    { s:'P_cus', t:'L_hum', label:'Restaura y custodia' },
    { s:'P_rec', t:'L_com', label:'Opera composteras' },
    { s:'P_ten', t:'L_aco', label:'Distribuye y vende' },
    { s:'P_coc', t:'L_esc', label:'Cocina raciones' },

    // Lugares <-> Especies atraídas del humedal (¿Para qué se atraen?)
    { s:'B_abe', t:'L_inv', label:'Poliniza hortalizas (+40% cosecha)' },
    { s:'B_abe', t:'L_alt', label:'Conecta islas florales' },
    { s:'B_abe', t:'L_bal', label:'Aumenta rendimiento' },
    { s:'B_ave', t:'L_hum', label:'Control biológico de plagas' },
    { s:'B_ave', t:'L_bal', label:'Dispersa semillas nativas' },
    { s:'B_ave', t:'L_esc', label:'Pedagogía ambiental' },
    { s:'B_ran', t:'L_hum', label:'Controla larvas de mosquitos' },
    { s:'B_ran', t:'L_inv', label:'Bioindicador de agua sana' },
    { s:'B_lom', t:'L_com', label:'Digiere residuos orgánicos' },
    { s:'B_lom', t:'L_inv', label:'Nutre las camas de siembra' },
    { s:'B_flo', t:'L_hum', label:'Cerca viva y biofiltro' },
    { s:'B_flo', t:'L_inv', label:'Barrera y repelente natural' },

    // Flujos circulares entre lugares territoriales
    { s:'L_inv', t:'L_aco', label:'Entrega excedentes' },
    { s:'L_bal', t:'L_aco', label:'Entrega cosechas' },
    { s:'L_com', t:'L_inv', label:'Aporta compost vivo' },
    { s:'L_com', t:'L_bal', label:'Aporta compost vivo' },
    { s:'L_aco', t:'L_esc', label:'Abastece comedores' },
    { s:'L_hon', t:'L_esc', label:'Aporta proteína de setas' }
  ];

  // --- HTML ESTRUCTURAL ---
  const html = `
  <div id="viewFederacion" class="view-federacion-stage">
    <div class="fed-topbar">
      <div class="fed-switcher">
        <button class="fed-tab-btn active" data-tab="comparacion" id="btnTabComp">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M8 12h8m-4-4v8"/></svg>
          1. Federación (Sin Líder) vs. Jerarquía
        </button>
        <button class="fed-tab-btn" data-tab="sociobiotica" id="btnTabBio">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          2. Red Sociobiótica (Huertas & Humedal El Burro)
        </button>
      </div>

      <!-- Filtros para la Red Sociobiótica con iconos flat -->
      <div class="fed-filters-pill" id="fedFilters" style="display:none">
        <button class="ff-btn active" data-filter="all">Toda la Red (19)</button>
        <button class="ff-btn" data-filter="lugar">${iconSvgHtml('hogar', 13)} 8 Lugares (Dónde)</button>
        <button class="ff-btn" data-filter="persona">${iconSvgHtml('comunidad', 13)} 6 Personas (Quiénes)</button>
        <button class="ff-btn" data-filter="biotica">${iconSvgHtml('abeja', 13)} 5 Especies (Para qué)</button>
      </div>
    </div>

    <!-- Escenario SVG interactivo -->
    <svg id="fedSvg" class="fed-svg-stage" viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid meet"></svg>

    <!-- Tooltip flotante limpio y explicativo -->
    <div id="fedTip" class="fed-floating-tip hidden">
      <span class="tip-badge" id="tipBadge">Elemento</span>
      <h3 class="tip-title" id="tipTitle">Título</h3>
      <p class="tip-desc" id="tipDesc">Descripción</p>
    </div>
  </div>
  `;

  // Insertar en #stage
  const stageEl = document.getElementById('stage');
  if (stageEl) {
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    stageEl.appendChild(wrap.firstElementChild);
  }

  // --- MOTOR DE DIBUJO D3 ---
  let activeTab = 'comparacion';
  let activeFilter = 'all';

  function renderView() {
    const svg = d3.select('#fedSvg');
    svg.selectAll('*').remove();

    // Inyectar definiciones de símbolos SVG flat
    svg.html(SVG_DEFS);

    const tip = document.getElementById('fedTip');
    const filtersBar = document.getElementById('fedFilters');
    if (filtersBar) filtersBar.style.display = activeTab === 'sociobiotica' ? 'inline-flex' : 'none';

    function showTip(badge, col, titleHtml, desc) {
      if (!tip) return;
      const b = document.getElementById('tipBadge');
      const t = document.getElementById('tipTitle');
      const d = document.getElementById('tipDesc');
      b.textContent = badge;
      b.style.background = col + '22';
      b.style.color = col;
      b.style.border = '1px solid ' + col;
      t.innerHTML = titleHtml;
      d.innerHTML = desc;
      tip.classList.remove('hidden');
    }
    function hideTip() {
      if (tip) tip.classList.add('hidden');
    }

    if (activeTab === 'comparacion') {
      renderComparacion(svg, showTip, hideTip);
    } else {
      renderSociobiotica(svg, showTip, hideTip);
    }
  }

  // 1. RENDERIZAR COMPARACIÓN: Jerarquía vs Federación
  function renderComparacion(svg, showTip, hideTip) {
    const gBg = svg.append('g');

    // Tarjeta Izquierda: Jerarquía Piramidal
    gBg.append('rect').attr('x', 35).attr('y', 55).attr('width', 440).attr('height', 525).attr('rx', 18)
      .attr('fill', '#0e1320').attr('stroke', 'rgba(239,68,68,0.35)').attr('stroke-width', 1.5);

    // Tarjeta Derecha: Federación Policéntrica
    gBg.append('rect').attr('x', 525).attr('y', 55).attr('width', 440).attr('height', 525).attr('rx', 18)
      .attr('fill', '#0c1a24').attr('stroke', 'rgba(56,189,248,0.45)').attr('stroke-width', 1.5);

    // Título Columna 1: Jerarquía
    const h1 = svg.append('g').attr('transform', 'translate(255, 85)');
    h1.append('text').text('HOY: JERARQUÍA PIRAMIDAL').attr('text-anchor', 'middle')
      .attr('fill', '#f87171').attr('font-weight', '800').attr('font-size', '15px').attr('letter-spacing', '0.06em');
    h1.append('text').text('Un solo orden: decisiones arriba · costos abajo').attr('text-anchor', 'middle')
      .attr('fill', '#94a3b8').attr('font-size', '11.5px').attr('y', 18);

    // Título Columna 2: Federación sin líder
    const h2 = svg.append('g').attr('transform', 'translate(745, 85)');
    h2.append('text').text('PROPUESTA: FEDERACIÓN POLICÉNTRICA').attr('text-anchor', 'middle')
      .attr('fill', '#38bdf8').attr('font-weight', '800').attr('font-size', '15px').attr('letter-spacing', '0.06em');
    h2.append('text').text('SIN LÍDER CENTRAL · Nodos autónomos en igualdad horizontal').attr('text-anchor', 'middle')
      .attr('fill', '#34d399').attr('font-size', '11.5px').attr('font-weight', '700').attr('y', 18);

    // --- LADO IZQUIERDO: Jerarquía Piramidal (con badges de iconos flat) ---
    const jN = DATA_COMP.jerarquia.nodos;
    const gJer = svg.append('g');

    // Flechas descendentes de mando
    for (let i = 0; i < jN.length - 1; i++) {
      const y1 = jN[i].y + 24, y2 = jN[i+1].y - 24;
      gJer.append('line').attr('x1', 255).attr('y1', y1).attr('x2', 255).attr('y2', y2)
        .attr('stroke', '#ef4444').attr('stroke-width', 2).attr('stroke-dasharray', '4 4');
      gJer.append('polygon').attr('points', `251,${y2-2} 259,${y2-2} 255,${y2+5}`).attr('fill', '#ef4444');
    }

    // Nodos de Jerarquía
    jN.forEach((n, idx) => {
      const g = gJer.append('g').attr('transform', `translate(255, ${n.y})`).style('cursor', 'pointer');
      
      // Contenedor tarjeta
      g.append('rect').attr('x', -150).attr('y', -20).attr('width', 300).attr('height', 40).attr('rx', 10)
        .attr('fill', '#151d2e').attr('stroke', n.col).attr('stroke-width', idx === 0 ? 2.5 : 1.2);

      // Círculo para el icono flat
      g.append('circle').attr('cx', -124).attr('cy', 0).attr('r', 13).attr('fill', '#090d16').attr('stroke', n.col).attr('stroke-width', 1.5);
      g.append('use').attr('href', '#ic-' + n.icon).attr('x', -132).attr('y', -8).attr('width', 16).attr('height', 16)
        .style('color', n.col).style('pointer-events', 'none');

      // Texto de nivel
      g.append('text').text(n.n).attr('x', -102).attr('y', -1).attr('fill', '#fff').attr('font-weight', '700').attr('font-size', '12.5px');
      g.append('text').text(n.tag).attr('x', -102).attr('y', 13).attr('fill', n.col).attr('font-size', '10px').attr('font-weight', '600');

      // Badge número
      g.append('circle').attr('cx', 130).attr('cy', 0).attr('r', 10).attr('fill', n.col).attr('opacity', 0.2);
      g.append('text').text(idx + 1).attr('x', 130).attr('y', 3.5).attr('text-anchor', 'middle').attr('fill', n.col).attr('font-size', '9.5px').attr('font-weight', '800');

      g.on('mouseenter', () => showTip('Jerarquía Actual', n.col, `${iconSvgHtml(n.icon, 20, n.col)} ${n.n}`, `<b>Nivel ${idx+1}:</b> ${n.tag}. En el modelo actual, la toma de decisiones está concentrada arriba, excluyendo a quienes ejecutan el trabajo cotidiano.`));
      g.on('mouseleave', hideTip);
    });

    // Banner pie jerarquía
    const bJer = svg.append('g').attr('transform', 'translate(255, 545)');
    bJer.append('rect').attr('x', -180).attr('y', -14).attr('width', 360).attr('height', 28).attr('rx', 14)
      .attr('fill', 'rgba(239,68,68,0.14)').attr('stroke', '#ef4444').attr('stroke-width', 1);
    bJer.append('text').text('✕ DECISIÓN CENTRALIZADA · ASIMETRÍA DE PODER')
      .attr('text-anchor', 'middle').attr('y', 4).attr('fill', '#f87171').attr('font-weight', '800').attr('font-size', '11px');

    // --- LADO DERECHO: Red Circular de Federación (Sin Líder) ---
    const gFed = svg.append('g');
    const fC = { x: 745, y: 310 };
    const fN = DATA_COMP.federacion.nodos;
    const R = 145;

    // Posiciones polares de los 5 nodos
    fN.forEach(n => {
      n.x = fC.x + Math.cos(n.angle) * R;
      n.y = fC.y + Math.sin(n.angle) * R;
    });

    // Enlaces de red entre nodos periféricos (malla distribuida)
    for (let i = 0; i < fN.length; i++) {
      for (let j = i + 1; j < fN.length; j++) {
        gFed.append('line').attr('x1', fN[i].x).attr('y1', fN[i].y).attr('x2', fN[j].x).attr('y2', fN[j].y)
          .attr('stroke', '#10b981').attr('stroke-width', 1.2).attr('stroke-dasharray', '3 3').attr('opacity', 0.5);
      }
    }

    // Enlaces hacia el centro (Mesa Federativa)
    fN.forEach(n => {
      gFed.append('line').attr('x1', fC.x).attr('y1', fC.y).attr('x2', n.x).attr('y2', n.y)
        .attr('stroke', '#38bdf8').attr('stroke-width', 2).attr('opacity', 0.7);
    });

    // Centro: Mesa Federativa (Sin Líder)
    const gC = gFed.append('g').attr('transform', `translate(${fC.x}, ${fC.y})`).style('cursor', 'pointer');
    gC.append('circle').attr('r', 48).attr('fill', '#091c2b').attr('stroke', '#38bdf8').attr('stroke-width', 3);
    
    // Icono flat de red
    gC.append('use').attr('href', '#ic-mesa').attr('x', -14).attr('y', -24).attr('width', 28).attr('height', 28)
      .style('color', '#38bdf8').style('pointer-events', 'none');

    gC.append('text').text('MESA FEDERATIVA').attr('text-anchor', 'middle').attr('y', 14)
      .attr('fill', '#38bdf8').attr('font-size', '10.5px').attr('font-weight', '800').attr('letter-spacing', '0.04em');
    gC.append('text').text('Vocerías rotativas · Cero jefes').attr('text-anchor', 'middle').attr('y', 27)
      .attr('fill', '#94a3b8').attr('font-size', '8.5px');

    gC.on('mouseenter', () => showTip('Centro Coordinador', '#38bdf8', `${iconSvgHtml('mesa', 20, '#38bdf8')} Mesa Federativa de Kennedy`, '<b>SIN LÍDER CENTRAL:</b> Espacio donde convergen los delegados con <b>vocerías rotativas cortas (1 a 3 meses)</b> y mandatos revocables. Se decide por consentimiento mutuo y cogestión pública, sin jerarquías.'));
    gC.on('mouseleave', hideTip);

    // Nodos Periféricos de la Federación con iconos flat
    fN.forEach(n => {
      const g = gFed.append('g').attr('transform', `translate(${n.x}, ${n.y})`).style('cursor', 'pointer');
      g.append('circle').attr('r', 36).attr('fill', '#111e30').attr('stroke', n.col).attr('stroke-width', 2.5);
      
      // Icono flat
      g.append('use').attr('href', '#ic-' + n.icon).attr('x', -12).attr('y', -18).attr('width', 24).attr('height', 24)
        .style('color', n.col).style('pointer-events', 'none');

      g.append('text').text(n.n).attr('text-anchor', 'middle').attr('y', 15)
        .attr('fill', '#fff').attr('font-size', '10px').attr('font-weight', '700');
      g.append('text').text(n.tag).attr('text-anchor', 'middle').attr('y', 26)
        .attr('fill', n.col).attr('font-size', '8px').attr('font-weight', '600');

      g.on('mouseenter', () => showTip('Nodo Autónomo', n.col, `${iconSvgHtml(n.icon, 20, n.col)} ${n.n}`, `<b>Composición:</b> ${n.tag}. Autonomía total para su materia sin someterse a jefes. Se conecta en igualdad de condiciones con los demás núcleos.`));
      g.on('mouseleave', hideTip);
    });

    // Banner destacado inferior
    const bBanner = svg.append('g').attr('transform', 'translate(745, 545)');
    bBanner.append('rect').attr('x', -195).attr('y', -14).attr('width', 390).attr('height', 28).attr('rx', 14)
      .attr('fill', 'rgba(16,185,129,0.18)').attr('stroke', '#10b981').attr('stroke-width', 1.2);
    bBanner.append('text').text('✓ CERO LÍDERES · MANDATO ROTATIVO · CONSENTIMIENTO')
      .attr('text-anchor', 'middle').attr('y', 4).attr('fill', '#34d399').attr('font-weight', '800').attr('font-size', '11px');
  }

  // 2. RENDERIZAR RED SOCIOBIÓTICA INTERACTIVA (Sin emojis, 100% Flat vector icons)
  function renderSociobiotica(svg, showTip, hideTip) {
    let nodes = NODOS_SOCIOBIOTICA;
    if (activeFilter !== 'all') {
      nodes = NODOS_SOCIOBIOTICA.filter(n => n.cat === activeFilter);
    }
    const nodeMap = new Map(NODOS_SOCIOBIOTICA.map(n => [n.id, n]));

    const gLinks = svg.append('g').attr('class', 'links');
    const gNodes = svg.append('g').attr('class', 'nodes');

    // Filtrar enlaces visibles
    const visibleIds = new Set(nodes.map(n => n.id));
    const links = ENLACES_SOCIOBIOTICA.filter(l => visibleIds.has(l.s) && visibleIds.has(l.t));

    // Dibujar Enlaces con curvatura y flechas
    links.forEach(l => {
      const s = nodeMap.get(l.s), t = nodeMap.get(l.t);
      if (!s || !t) return;
      const isBio = s.cat === 'biotica' || t.cat === 'biotica';
      const col = isBio ? '#10b981' : '#38bdf8';

      gLinks.append('line')
        .attr('x1', s.x).attr('y1', s.y).attr('x2', t.x).attr('y2', t.y)
        .attr('stroke', col).attr('stroke-width', isBio ? 2.2 : 1.4)
        .attr('stroke-dasharray', isBio ? '4 3' : null)
        .attr('opacity', 0.5)
        .style('transition', 'all .2s');

      // Animación de pulsos ecológicos en relaciones bióticas
      if (isBio) {
        const p = gLinks.append('circle').attr('r', 2.8).attr('fill', '#34d399');
        p.append('animate').attr('attributeName', 'cx').attr('values', `${s.x};${t.x}`).attr('dur', '2.6s').attr('repeatCount', 'indefinite');
        p.append('animate').attr('attributeName', 'cy').attr('values', `${s.y};${t.y}`).attr('dur', '2.6s').attr('repeatCount', 'indefinite');
      }
    });

    // Dibujar Nodos con Iconos Flat SVG
    nodes.forEach(n => {
      const g = gNodes.append('g').attr('transform', `translate(${n.x}, ${n.y})`).style('cursor', 'pointer');
      const isLugar = n.cat === 'lugar', isBio = n.cat === 'biotica';

      if (isLugar) {
        // Cuadro redondeado para lugares territoriales
        g.append('rect').attr('x', -26).attr('y', -26).attr('width', 52).attr('height', 52).attr('rx', 12)
          .attr('fill', '#111827').attr('stroke', n.col).attr('stroke-width', 2.2);
        
        // Icono flat centrado
        g.append('use').attr('href', '#ic-' + n.icon).attr('x', -11).attr('y', -11).attr('width', 22).attr('height', 22)
          .style('color', n.col).style('pointer-events', 'none');
      } else if (isBio) {
        // Diamante brillante para especies bióticas atraídas
        g.append('polygon').attr('points', '0,-28 28,0 0,28 -28,0')
          .attr('fill', '#08201b').attr('stroke', n.col).attr('stroke-width', 2.2);
        
        // Icono flat centrado
        g.append('use').attr('href', '#ic-' + n.icon).attr('x', -10).attr('y', -10).attr('width', 20).attr('height', 20)
          .style('color', n.col).style('pointer-events', 'none');
      } else {
        // Círculo para personas y comunidades
        g.append('circle').attr('r', 24).attr('fill', '#161e2e').attr('stroke', n.col).attr('stroke-width', 2);
        
        // Icono flat centrado
        g.append('use').attr('href', '#ic-' + n.icon).attr('x', -10).attr('y', -10).attr('width', 20).attr('height', 20)
          .style('color', n.col).style('pointer-events', 'none');
      }

      // Nombre del nodo
      g.append('text').text(n.n).attr('text-anchor', 'middle').attr('y', isLugar ? 38 : isBio ? 40 : 36)
        .attr('fill', '#fff').attr('font-size', '10.5px').attr('font-weight', '700')
        .style('paint-order', 'stroke').style('stroke', '#080b11').style('stroke-width', '3px');

      // Interacción hover: resaltar conexiones y mostrar ficha
      g.on('mouseenter', () => {
        gLinks.selectAll('line').style('opacity', 0.12);
        gLinks.selectAll('line')
          .filter(l => l.s === n.id || l.t === n.id)
          .style('opacity', 1).style('stroke-width', 3).style('stroke', '#facc15');

        const catName = isLugar ? 'Lugar Territorial (Dónde)' : isBio ? 'Especie del Humedal El Burro' : 'Actor Humano (Quiénes)';
        showTip(catName, n.col, `${iconSvgHtml(n.icon, 20, n.col)} ${n.n}`, `<b>Participantes:</b> ${n.quienes}<br><b>¿Para qué se articula / atrae?:</b> ${n.paraque}`);
      });

      g.on('mouseleave', () => {
        gLinks.selectAll('line').style('opacity', l => (l.s.startsWith('B_') || l.t.startsWith('B_')) ? 0.5 : 0.45).style('stroke-width', 1.8).style('stroke', null);
        hideTip();
      });
    });

    // Leyenda flotante en esquina con iconos flat
    const leg = svg.append('g').attr('transform', 'translate(30, 565)');
    leg.append('rect').attr('width', 460).attr('height', 36).attr('rx', 8).attr('fill', 'rgba(14,18,28,0.85)').attr('stroke', 'rgba(255,255,255,0.1)');
    leg.append('text').text('Convenciones:').attr('x', 14).attr('y', 22).attr('fill', '#94a3b8').attr('font-size', '11px').attr('font-weight', '700');
    
    // Lugar
    leg.append('rect').attr('x', 105).attr('y', 11).attr('width', 14).attr('height', 14).attr('rx', 3).attr('fill', '#111827').attr('stroke', '#4ade80').attr('stroke-width', 1.5);
    leg.append('text').text('Lugares (Dónde)').attr('x', 125).attr('y', 23).attr('fill', '#cbd5e1').attr('font-size', '10.5px');
    
    // Persona
    leg.append('circle').attr('cx', 242).attr('cy', 18).attr('r', 7).attr('fill', '#161e2e').attr('stroke', '#38bdf8').attr('stroke-width', 1.5);
    leg.append('text').text('Personas (Quiénes)').attr('x', 256).attr('y', 23).attr('fill', '#cbd5e1').attr('font-size', '10.5px');
    
    // Biótica
    leg.append('polygon').attr('points', '385,11 392,18 385,25 378,18').attr('fill', '#09231f').attr('stroke', '#fde047').attr('stroke-width', 1.5);
    leg.append('text').text('Especies Bióticas (Para qué)').attr('x', 400).attr('y', 23).attr('fill', '#cbd5e1').attr('font-size', '10.5px');
  }

  // --- LÓGICA DE CONTROL ---
  function setTab(tab) {
    activeTab = tab;
    document.querySelectorAll('.fed-tab-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tab));
    renderView();
  }

  document.querySelectorAll('.fed-tab-btn').forEach(b => {
    b.onclick = () => setTab(b.dataset.tab);
  });

  const fBar = document.getElementById('fedFilters');
  if (fBar) {
    fBar.querySelectorAll('.ff-btn').forEach(b => {
      b.onclick = () => {
        fBar.querySelectorAll('.ff-btn').forEach(btn => btn.classList.remove('active'));
        b.classList.add('active');
        activeFilter = b.dataset.filter;
        renderView();
      };
    });
  }

  // API Global
  window.FEDERACION_BIOTICA = {
    init: function(tab = 'comparacion') {
      const stage = document.getElementById('viewFederacion');
      if (stage) stage.style.display = 'block';
      setTab(tab === 'sociobiotica' ? 'sociobiotica' : 'comparacion');
    }
  };

  // Render inicial al cargar
  setTimeout(renderView, 200);
})();
