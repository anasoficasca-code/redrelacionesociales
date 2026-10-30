// federacion-biotica.js
// Rediseño visual interactivo con ICONOS FLAT VECTORIALES orientado a PROGRAMA ARQUITECTÓNICO:
// 1. Federación Policéntrica (Sin Líder) vs. Jerarquía Piramidal
// 2. Red Sociobiótica: Dónde (Lugares) + Quiénes (Personas) + Humedal El Burro (Relaciones Bióticas y Para qué)
// 1b. Cómo funciona la federación: explicación animada en 6 pasos
// 3. Programa Arquitectónico: Zonificación, Áreas (9.000 m²) y Sección Bioclimática de la Biorrefinería
// 4. Arquitectura de la Canasta Familiar & Fases de Implantación Constructiva

(function(){
  // --- DICCIONARIO DE SÍMBOLOS SVG FLAT ---
  const SVG_DEFS = `
  <defs>
    <!-- Institución / Alcaldía / UAESP -->
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

    <!-- Persona individual / Hortelano -->
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

    <!-- Mesa Federativa / Coordinación Horizontal Rotativa -->
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

    <!-- Hongos / Micología / Proteína fúngica -->
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

    <!-- Custodio / Veeduría ambiental -->
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

    <!-- Maquinaria / Automatización / Engranaje -->
    <symbol id="ic-engranaje" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <circle cx="12" cy="12" r="3"/>
      <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"/>
    </symbol>

    <!-- Canasta Familiar / Nutrición -->
    <symbol id="ic-canasta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M4 10h16l-2 10H6L4 10z"/>
      <path d="M9 10V6a3 3 0 0 1 6 0v4"/>
      <line x1="4" y1="10" x2="20" y2="10"/>
    </symbol>

    <!-- Plano / Arquitectura / Cuadrícula -->
    <symbol id="ic-plano" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect width="18" height="18" x="3" y="3" rx="2"/>
      <path d="M3 9h18M3 15h18M9 3v18M15 3v18"/>
    </symbol>

    <!-- Sección / Corte arquitectónico / Capas -->
    <symbol id="ic-seccion" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <path d="M2 12h20M2 6h20M2 18h20"/>
      <path d="m6 3 12 18"/>
    </symbol>
  </defs>
  `;

  function iconSvgHtml(iconId, size = 16, color = 'currentColor', extraStyle = '') {
    return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="${color}" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:-3px;pointer-events:none;${extraStyle}"><use href="#ic-${iconId}"/></svg>`;
  }

  // --- ESTILOS CSS VISUALES ---
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
    top: 10px;
    left: 20px;
    right: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 10px;
    z-index: 20;
    pointer-events: none;
  }
  .fed-topbar > * { pointer-events: auto; }
  .fed-switcher {
    display: inline-flex;
    background: rgba(14, 18, 28, 0.94);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.12);
    border-radius: 999px;
    padding: 3px;
    box-shadow: 0 8px 24px rgba(0,0,0,0.5);
    flex-wrap: wrap;
  }
  .fed-tab-btn {
    background: none;
    border: 0;
    color: #94a3b8;
    padding: 6px 14px;
    border-radius: 999px;
    font-size: 11.5px;
    font-weight: 600;
    cursor: pointer;
    transition: all .15s;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    white-space: nowrap;
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
    background: rgba(14, 18, 28, 0.94);
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255,255,255,0.1);
    border-radius: 999px;
    padding: 3px 6px;
    gap: 4px;
  }
  .ff-btn {
    background: none;
    border: 0;
    color: #94a3b8;
    font-size: 11px;
    font-weight: 600;
    padding: 4px 10px;
    border-radius: 999px;
    cursor: pointer;
    transition: all .15s;
    display: inline-flex;
    align-items: center;
    gap: 5px;
  }
  .ff-btn:hover { color: #fff; }
  .ff-btn.active {
    background: rgba(255,255,255,0.12);
    color: #38bdf8;
    font-weight: 700;
  }

  .fed-svg-stage {
    width: 100%;
    height: 100%;
    display: block;
    cursor: default;
  }

  .fed-floating-tip {
    position: absolute;
    bottom: 18px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(10, 14, 24, 0.96);
    backdrop-filter: blur(12px);
    border: 1.5px solid #38bdf8;
    border-radius: 12px;
    padding: 10px 20px;
    max-width: 680px;
    width: 90%;
    box-shadow: 0 16px 40px rgba(0,0,0,0.85);
    z-index: 25;
    pointer-events: none;
    transition: opacity .2s, transform .2s;
  }
  .fed-floating-tip.hidden {
    opacity: 0;
    transform: translateX(-50%) translateY(12px);
  }
  .tip-badge {
    font: 700 9.5px 'JetBrains Mono', monospace;
    text-transform: uppercase;
    letter-spacing: .08em;
    display: inline-block;
    padding: 2px 6px;
    border-radius: 4px;
    margin-bottom: 3px;
  }
  .tip-title {
    margin: 0;
    font-size: 14.5px;
    font-weight: 700;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 7px;
  }
  .tip-desc {
    margin: 3px 0 0;
    font-size: 12px;
    line-height: 1.35;
    color: #cbd5e1;
  }
  .tip-desc b { color: #6ee7b7; font-weight: 700; }

  .fed-curve-link {
    fill: none;
    transition: opacity .2s, stroke-width .2s, stroke .2s;
  }
  `;

  const sEl = document.createElement('style');
  sEl.textContent = css;
  document.head.appendChild(sEl);

  // --- DATOS TAB 1: COMPARACIÓN JERARQUÍA VS FEDERACIÓN ---
  const DATA_COMP = {
    jerarquia: {
      titulo: 'Hoy: Jerarquía Piramidal',
      sub: 'Mando vertical: un solo orden para todo',
      nodos: [
        { id:'j1', n:'Alcaldía Local & UAESP', icon:'institucion', y:135, tag:'Decisión y Contratos', col:'#f87171' },
        { id:'j2', n:'Gerencia Corabastos', icon:'bodega', y:210, tag:'Monopolio Mayorista', col:'#fb923c' },
        { id:'j3', n:'Transporte & Aseo', icon:'transporte', y:285, tag:'Operación Externa', col:'#fbbf24' },
        { id:'j4', n:'Recicladores & Coteros', icon:'obrero', y:360, tag:'Trabajo Físico y Riesgo', col:'#94a3b8' },
        { id:'j5', n:'Vecinos & Humedal El Burro', icon:'comunidad', y:435, tag:'Soportan Costos y Contaminación', col:'#64748b' }
      ]
    },
    federacion: {
      titulo: 'Propuesta: Federación Policéntrica',
      sub: 'SIN LÍDER CENTRAL · Red horizontal de núcleos autónomos',
      centro: { id:'fc', n:'Mesa Federativa', icon:'mesa', tag:'Vocerías rotativas · Cero jefes', col:'#38bdf8' },
      nodos: [
        { id:'f1', n:'Huertas & Alimentos', icon:'huerta', tag:'Soberanía y comensalidad', col:'#4ade80', angle: -Math.PI/2 },
        { id:'f2', n:'Humedal & Agua', icon:'agua', tag:'Custodios El Burro', col:'#38bdf8', angle: -Math.PI/2 + (2*Math.PI/5) },
        { id:'f3', n:'Circularidad & Compost', icon:'reciclaje', tag:'Recicladores de oficio', col:'#facc15', angle: -Math.PI/2 + 2*(2*Math.PI/5) },
        { id:'f4', n:'Comercio Barrial', icon:'tienda', tag:'Tenderos y ferias', col:'#fb923c', angle: -Math.PI/2 + 3*(2*Math.PI/5) },
        { id:'f5', n:'Soporte Distrital', icon:'institucion', tag:'Soporte técnico, no manda', col:'#c084fc', angle: -Math.PI/2 + 4*(2*Math.PI/5) }
      ]
    }
  };

  // --- DATOS TAB 2: RED SOCIOBIÓTICA (4 COLUMNAS) ---
  const NODOS_SOCIOBIOTICA = [
    // Columna 1: QUIÉNES
    { id:'P_hor', col_idx:1, cat:'persona', n:'Hortelanos & Familias', icon:'persona', col:'#86efac', x:140, y:120,
      quienes:'Vecinas y hortelanos de barrios populares',
      paraque:'Siembra, cuidado cotidiano y cosecha en terrazas y lotes' },
    { id:'P_rec', col_idx:1, cat:'persona', n:'Recicladores de Oficio', icon:'obrero', col:'#fde047', x:140, y:200,
      quienes:'Asociaciones de recicladores organizados',
      paraque:'Rutas de recolección selectiva y operación técnica de compostaje' },
    { id:'P_cus', col_idx:1, cat:'persona', n:'Custodios del Humedal', icon:'custodio', col:'#38bdf8', x:140, y:280,
      quienes:'Colectivos ambientales de El Burro y La Vaca',
      paraque:'Cuidado ecológico, monitoreo hídrico y protección comunitaria' },
    { id:'P_ten', col_idx:1, cat:'persona', n:'Tenderos Barriales', icon:'carrito', col:'#fdba74', x:140, y:360,
      quienes:'Comerciantes de víveres locales y ferias',
      paraque:'Comercialización justa de cosechas locales a precios de cercanía' },
    { id:'P_coc', col_idx:1, cat:'persona', n:'Cocineras Comunitarias', icon:'comedor', col:'#d8b4fe', x:140, y:440,
      quienes:'Madres líderes de comedores populares',
      paraque:'Transformación culinaria en raciones calientes saludables' },
    { id:'P_jac', col_idx:1, cat:'persona', n:'Juntas Comunales (JAC)', icon:'comunidad', col:'#67e8f9', x:140, y:520,
      quienes:'Líderes comunales y asambleas barriales',
      paraque:'Disponibilidad de salones, baldíos y mingas de trabajo' },

    // Columna 2: DÓNDE (Huertas & Ronda Humedal)
    { id:'L_inv', col_idx:2, cat:'lugar', n:'Huerta en Invasión', icon:'hogar', col:'#4ade80', x:380, y:140,
      quienes:'Familias de asentamiento informal',
      paraque:'Soberanía alimentaria inmediata y autoconsumo diario' },
    { id:'L_alt', col_idx:2, cat:'lugar', n:'Huerta en Altura', icon:'edificio', col:'#38bdf8', x:380, y:240,
      quienes:'Vecinos de conjuntos residenciales',
      paraque:'Aprovechamiento de terrazas ociosas y mitigación de isla térmica' },
    { id:'L_bal', col_idx:2, cat:'lugar', n:'Huerta en Baldío', icon:'terreno', col:'#2dd4bf', x:380, y:340,
      quienes:'Juntas Comunales y colectivos juveniles',
      paraque:'Recuperación de lotes abandonados para producción comunitaria' },
    { id:'L_hum', col_idx:2, cat:'lugar', n:'Ronda Humedal El Burro', icon:'agua', col:'#06b6d4', x:380, y:450,
      quienes:'Custodios y habitantes de la ribera',
      paraque:'Franja agroecológica de amortiguamiento y biofiltración hídrica' },

    // Columna 3: DÓNDE (Transformación & Alimentos)
    { id:'L_com', col_idx:3, cat:'lugar', n:'Estación Compostaje', icon:'reciclaje', col:'#eab308', x:620, y:140,
      quienes:'Recicladores de orgánicos y coteros',
      paraque:'Desviar toneladas de orgánicos de Corabastos y crear abono vivo' },
    { id:'L_aco', col_idx:3, cat:'lugar', n:'Acopio & Tiendas', icon:'tienda', col:'#f97316', x:620, y:240,
      quienes:'Tenderos barriales y ferias',
      paraque:'Canal de venta directa sin intermediación especulativa' },
    { id:'L_hon', col_idx:3, cat:'lugar', n:'Distrito de Hongos', icon:'hongo', col:'#ec4899', x:620, y:340,
      quienes:'Técnicos comunitarios en micología',
      paraque:'Producción de proteína de setas sobre rastrojos agrícolas' },
    { id:'L_esc', col_idx:3, cat:'lugar', n:'Comedores & Escuelas', icon:'comedor', col:'#a855f7', x:620, y:450,
      quienes:'Cocineras populares y comunidad educativa',
      paraque:'Comensalidad digna y talleres de pedagogía alimentaria' },

    // Columna 4: RELACIONES BIÓTICAS (Atraídas del Humedal)
    { id:'B_abe', col_idx:4, cat:'biotica', n:'Abejas & Mariposas', icon:'abeja', col:'#fde047', x:860, y:120,
      quienes:'Bombus pauloensis, Abeja angelita nativa, mariposas',
      paraque:'Polinizar flores de hortalizas y frutales: ¡aumenta la cosecha un 40%!' },
    { id:'B_ave', col_idx:4, cat:'biotica', n:'Tinguas & Aves Nativas', icon:'ave', col:'#38bdf8', x:860, y:210,
      quienes:'Tingua bogotana, cucarachero, colibrí, mirlas',
      paraque:'Control biológico natural de orugas y gusanos sin pesticidas tóxicos' },
    { id:'B_lom', col_idx:4, cat:'biotica', n:'Lombrices & Microbiota', icon:'lombriz', col:'#fb923c', x:860, y:300,
      quienes:'Lombriz roja y bacterias nitrificantes',
      paraque:'Degradación acelerada de residuos orgánicos para generar humus vivo rico en nutrientes' },
    { id:'B_ran', col_idx:4, cat:'biotica', n:'Rana Sabanera', icon:'rana', col:'#4ade80', x:860, y:390,
      quienes:'Dendropsophus labialis (anfibio nativo)',
      paraque:'Depredación voraz de larvas de zancudos y bioindicador de agua no contaminada' },
    { id:'B_flo', col_idx:4, cat:'biotica', n:'Flora Nativa (Aliso/Chilco)', icon:'flora', col:'#a3e635', x:860, y:480,
      quienes:'Aliso, chilco, botón de oro y caléndula',
      paraque:'Cercas vivas cortaviento, hospederos florales y fijación de nitrógeno en el suelo' }
  ];

  const ENLACES_SOCIOBIOTICA = [
    { s:'P_hor', t:'L_inv', label:'Cultiva y cuida cotidianamente' },
    { s:'P_hor', t:'L_alt', label:'Manejo de terrazas residenciales' },
    { s:'P_jac', t:'L_bal', label:'Asigna y convoca asambleas en baldíos' },
    { s:'P_cus', t:'L_hum', label:'Restaura y custodia la ronda hídrica' },
    { s:'P_rec', t:'L_com', label:'Opera camas técnicas de compostaje' },
    { s:'P_ten', t:'L_aco', label:'Distribuye y vende en tiendas de barrio' },
    { s:'P_coc', t:'L_esc', label:'Cocina raciones saludables' },
    { s:'L_inv', t:'L_aco', label:'Entrega excedentes a tiendas barriales' },
    { s:'L_bal', t:'L_aco', label:'Aporta cosechas comunitarias' },
    { s:'L_com', t:'L_inv', label:'Abona las huertas con compost vivo' },
    { s:'L_com', t:'L_bal', label:'Abona lotes recuperados' },
    { s:'L_aco', t:'L_esc', label:'Abastece comedores con alimentos frescos' },
    { s:'L_hon', t:'L_esc', label:'Aporta proteína de setas' },
    { s:'L_inv', t:'B_abe', label:'Atrae polinizadores (+40% cosecha)' },
    { s:'L_alt', t:'B_abe', label:'Conecta islas florales urbanas' },
    { s:'L_bal', t:'B_ave', label:'Dispersa semillas nativas' },
    { s:'L_hum', t:'B_ave', label:'Hábitat y control biológico de plagas' },
    { s:'L_hum', t:'B_ran', label:'Control biológico de larvas de mosquitos' },
    { s:'L_inv', t:'B_ran', label:'Bioindicador de agua sana y no venenosa' },
    { s:'L_com', t:'B_lom', label:'Digiere residuos orgánicos de Corabastos' },
    { s:'L_inv', t:'B_lom', label:'Nutre las camas vivas de cultivo' },
    { s:'L_hum', t:'B_flo', label:'Cerca viva y biofiltro de ronda' },
    { s:'L_inv', t:'B_flo', label:'Barrera y repelente botánico natural' }
  ];

  // --- HTML ESTRUCTURAL ---
  const html = `
  <div id="viewFederacion" class="view-federacion-stage">
    <div class="fed-topbar">
      <div class="fed-switcher">
        <button class="fed-tab-btn active" data-tab="comparacion">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 3v18M4 7l8-4 8 4"/></svg>
          1. Jerarquía vs. federación
        </button>
        <button class="fed-tab-btn" data-tab="funciona">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><polygon points="6 4 20 12 6 20 6 4"/></svg>
          2. Cómo funciona
        </button>
        <button class="fed-tab-btn" data-tab="sociobiotica">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          3. Red sociobiótica
        </button>
        <button class="fed-tab-btn" data-tab="fases">
          ${iconSvgHtml('plano', 13)} 4. Programa arquitectónico
        </button>
        <button class="fed-tab-btn" data-tab="canasta">
          ${iconSvgHtml('seccion', 13)} 5. Canasta y fases
        </button>
      </div>

      <div class="fed-filters-pill" id="fedFilters" style="display:none">
        <button class="ff-btn active" data-filter="all">Todo (19)</button>
        <button class="ff-btn" data-filter="persona">${iconSvgHtml('comunidad', 13)} Quiénes (6)</button>
        <button class="ff-btn" data-filter="lugar">${iconSvgHtml('hogar', 13)} Dónde (8)</button>
        <button class="ff-btn" data-filter="biotica">${iconSvgHtml('abeja', 13)} Para qué (5)</button>
      </div>
    </div>

    <svg id="fedSvg" class="fed-svg-stage" viewBox="0 0 1000 620" preserveAspectRatio="xMidYMid meet"></svg>

    <div id="fedTip" class="fed-floating-tip hidden">
      <span class="tip-badge" id="tipBadge">Elemento</span>
      <h3 class="tip-title" id="tipTitle">Título</h3>
      <p class="tip-desc" id="tipDesc">Descripción</p>
    </div>
  </div>
  `;

  const stageEl = document.getElementById('stage');
  if (stageEl) {
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    stageEl.appendChild(wrap.firstElementChild);
  }

  // --- MOTOR DE DIBUJO D3 ---
  let activeTab = 'comparacion';
  let activeFilter = 'all';
  let funStep = 0;
  let animTimers = [];
  let rafId = null;
  let autoplayId = null;

  function later(fn, ms) { animTimers.push(setTimeout(fn, ms)); }
  function clearAnims() {
    animTimers.forEach(clearTimeout);
    animTimers = [];
    if (rafId) cancelAnimationFrame(rafId);
    rafId = null;
  }
  function stopAutoplay() {
    if (autoplayId) clearInterval(autoplayId);
    autoplayId = null;
  }

  // Texto SVG con salto de línea automático. Devuelve el número de líneas.
  function wrapText(sel, str, maxChars, lh) {
    const words = String(str).split(/\s+/);
    const lines = [];
    let cur = '';
    words.forEach(w => {
      if ((cur + ' ' + w).trim().length > maxChars && cur) { lines.push(cur); cur = w; }
      else cur = (cur + ' ' + w).trim();
    });
    if (cur) lines.push(cur);
    const x = sel.attr('x') || 0;
    lines.forEach((l, i) => sel.append('tspan').attr('x', x).attr('dy', i === 0 ? 0 : lh).text(l));
    return lines.length;
  }

  // Etiqueta tipo "píldora" con texto
  function pill(parent, x, y, text, col, opts = {}) {
    const fs = opts.fs || 10;
    const w = Math.max(30, text.length * fs * 0.56 + 18);
    const g = parent.append('g').attr('transform', `translate(${x},${y})`).style('pointer-events', 'none');
    g.append('rect').attr('x', -w / 2).attr('y', -fs - 2).attr('width', w).attr('height', fs * 2 + 2).attr('rx', fs + 1)
      .attr('fill', opts.bg || '#0a0f19').attr('stroke', col).attr('stroke-width', 1.2);
    g.append('text').text(text).attr('text-anchor', 'middle').attr('y', fs * 0.36)
      .attr('fill', opts.fg || col).attr('font-size', fs + 'px').attr('font-weight', 700);
    return g;
  }

  function renderView() {
    clearAnims();
    const svg = d3.select('#fedSvg');
    svg.selectAll('*').remove();
    svg.html(SVG_DEFS);

    // Puntas de flecha reutilizables
    const defs = svg.select('defs');
    [['fedArrowBlue', '#38bdf8'], ['fedArrowGreen', '#10b981'], ['fedArrowRed', '#ef4444'], ['fedArrowGrey', '#64748b']].forEach(([id, c]) => {
      defs.append('marker').attr('id', id).attr('viewBox', '0 0 10 10').attr('refX', 8).attr('refY', 5)
        .attr('markerWidth', 6).attr('markerHeight', 6).attr('orient', 'auto-start-reverse')
        .append('path').attr('d', 'M0,0 L10,5 L0,10 z').attr('fill', c);
    });

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
    function hideTip() { if (tip) tip.classList.add('hidden'); }
    hideTip();

    if (activeTab === 'comparacion') renderComparacion(svg, showTip, hideTip);
    else if (activeTab === 'funciona') renderFunciona(svg, showTip, hideTip);
    else if (activeTab === 'fases') renderProgramaArquitectonico(svg, showTip, hideTip);
    else if (activeTab === 'canasta') renderArquitecturaCanasta(svg, showTip, hideTip);
    else renderSociobiotica(svg, showTip, hideTip);
  }

  // =====================================================================
  // 1. COMPARACIÓN: Jerarquía vs Federación
  // =====================================================================
  function renderComparacion(svg, showTip, hideTip) {
    const gBg = svg.append('g');
    gBg.append('rect').attr('x', 35).attr('y', 55).attr('width', 440).attr('height', 535).attr('rx', 18)
      .attr('fill', '#0e1320').attr('stroke', 'rgba(239,68,68,0.35)').attr('stroke-width', 1.5);
    gBg.append('rect').attr('x', 525).attr('y', 55).attr('width', 440).attr('height', 535).attr('rx', 18)
      .attr('fill', '#0c1a24').attr('stroke', 'rgba(56,189,248,0.45)').attr('stroke-width', 1.5);

    const h1 = svg.append('g').attr('transform', 'translate(255, 85)');
    h1.append('text').text('HOY: JERARQUÍA PIRAMIDAL').attr('text-anchor', 'middle')
      .attr('fill', '#f87171').attr('font-weight', '800').attr('font-size', '15px').attr('letter-spacing', '0.06em');
    h1.append('text').text('Las órdenes bajan; los costos se quedan abajo').attr('text-anchor', 'middle')
      .attr('fill', '#94a3b8').attr('font-size', '11.5px').attr('y', 18);

    const h2 = svg.append('g').attr('transform', 'translate(745, 85)');
    h2.append('text').text('PROPUESTA: FEDERACIÓN POLICÉNTRICA').attr('text-anchor', 'middle')
      .attr('fill', '#38bdf8').attr('font-weight', '800').attr('font-size', '15px').attr('letter-spacing', '0.06em');
    h2.append('text').text('Sin líder central: núcleos autónomos que se coordinan').attr('text-anchor', 'middle')
      .attr('fill', '#34d399').attr('font-size', '11.5px').attr('font-weight', '700').attr('y', 18);

    // --- Jerarquía ---
    const jN = DATA_COMP.jerarquia.nodos.map((n, i) => Object.assign({}, n, { y: 140 + i * 78 }));
    const gJer = svg.append('g');

    for (let i = 0; i < jN.length - 1; i++) {
      gJer.append('line').attr('x1', 255).attr('y1', jN[i].y + 21).attr('x2', 255).attr('y2', jN[i + 1].y - 24)
        .attr('stroke', '#ef4444').attr('stroke-width', 2).attr('stroke-dasharray', '4 4')
        .attr('marker-end', 'url(#fedArrowRed)');
    }

    // Flecha lateral: las órdenes bajan
    gJer.append('line').attr('x1', 445).attr('y1', 130).attr('x2', 445).attr('y2', 450)
      .attr('stroke', '#ef4444').attr('stroke-width', 2.5).attr('marker-end', 'url(#fedArrowRed)');
    gJer.append('text').text('ÓRDENES Y CONTRATOS').attr('transform', 'translate(458, 290) rotate(90)')
      .attr('text-anchor', 'middle').attr('fill', '#f87171').attr('font-size', '9.5px').attr('font-weight', 800).attr('letter-spacing', '0.08em');

    // Flecha lateral: la voz de abajo no llega
    gJer.append('line').attr('x1', 65).attr('y1', 450).attr('x2', 65).attr('y2', 260)
      .attr('stroke', '#64748b').attr('stroke-width', 2).attr('stroke-dasharray', '3 5').attr('marker-end', 'url(#fedArrowGrey)');
    gJer.append('text').text('QUEJAS SIN PESO').attr('transform', 'translate(52, 355) rotate(-90)')
      .attr('text-anchor', 'middle').attr('fill', '#64748b').attr('font-size', '9.5px').attr('font-weight', 800).attr('letter-spacing', '0.08em');
    gJer.append('text').text('✕').attr('x', 65).attr('y', 250).attr('text-anchor', 'middle').attr('fill', '#ef4444').attr('font-size', '14px').attr('font-weight', 800);

    jN.forEach((n, idx) => {
      const g = gJer.append('g').attr('transform', `translate(255, ${n.y})`).style('cursor', 'pointer');
      g.append('rect').attr('x', -160).attr('y', -21).attr('width', 320).attr('height', 42).attr('rx', 10)
        .attr('fill', '#151d2e').attr('stroke', n.col).attr('stroke-width', idx === 0 ? 2.5 : 1.2);
      g.append('circle').attr('cx', -134).attr('cy', 0).attr('r', 13).attr('fill', '#090d16').attr('stroke', n.col).attr('stroke-width', 1.5);
      g.append('use').attr('href', '#ic-' + n.icon).attr('x', -142).attr('y', -8).attr('width', 16).attr('height', 16)
        .style('color', n.col).style('pointer-events', 'none');
      g.append('text').text(n.n).attr('x', -112).attr('y', -2).attr('fill', '#fff').attr('font-weight', '700').attr('font-size', '12px');
      g.append('text').text(n.tag).attr('x', -112).attr('y', 12).attr('fill', n.col).attr('font-size', '10px').attr('font-weight', '600');
      g.append('circle').attr('cx', 138).attr('cy', 0).attr('r', 10).attr('fill', n.col).attr('opacity', 0.2);
      g.append('text').text(idx + 1).attr('x', 138).attr('y', 3.5).attr('text-anchor', 'middle').attr('fill', n.col).attr('font-size', '9.5px').attr('font-weight', '800');
      g.on('mouseenter', () => showTip('Jerarquía actual', n.col, `${iconSvgHtml(n.icon, 20, n.col)} ${n.n}`, `<b>Nivel ${idx + 1}:</b> ${n.tag}. En el modelo actual, la decisión se concentra arriba y excluye a quienes hacen el trabajo cotidiano.`));
      g.on('mouseleave', hideTip);
    });

    const bJer = svg.append('g').attr('transform', 'translate(255, 552)');
    bJer.append('rect').attr('x', -180).attr('y', -15).attr('width', 360).attr('height', 30).attr('rx', 15)
      .attr('fill', 'rgba(239,68,68,0.14)').attr('stroke', '#ef4444').attr('stroke-width', 1);
    bJer.append('text').text('✕ DECIDE QUIEN FIRMA · PAGA QUIEN VIVE AHÍ')
      .attr('text-anchor', 'middle').attr('y', 4).attr('fill', '#f87171').attr('font-weight', '800').attr('font-size', '11px');

    // --- Federación ---
    const gFed = svg.append('g');
    const fC = { x: 745, y: 322 };
    const R = 134;
    const fN = DATA_COMP.federacion.nodos.map(n => Object.assign({}, n, {
      x: fC.x + Math.cos(n.angle) * R,
      y: fC.y + Math.sin(n.angle) * R
    }));

    // Intercambio directo entre vecinos (anillo de arcos con doble flecha)
    fN.forEach((n, i) => {
      const m = fN[(i + 1) % fN.length];
      const a1 = n.angle + 0.30, a2 = (i === fN.length - 1 ? m.angle + 2 * Math.PI : m.angle) - 0.30;
      const p1 = [fC.x + Math.cos(a1) * R, fC.y + Math.sin(a1) * R];
      const p2 = [fC.x + Math.cos(a2) * R, fC.y + Math.sin(a2) * R];
      gFed.append('path').attr('d', `M${p1[0]},${p1[1]} A${R},${R} 0 0 1 ${p2[0]},${p2[1]}`)
        .attr('fill', 'none').attr('stroke', '#10b981').attr('stroke-width', 2)
        .attr('marker-start', 'url(#fedArrowGreen)').attr('marker-end', 'url(#fedArrowGreen)').attr('opacity', 0.8);
    });

    // Delegación: líneas punteadas cortas en ambos sentidos (la mesa no manda)
    fN.forEach(n => {
      const dx = Math.cos(n.angle), dy = Math.sin(n.angle);
      gFed.append('line')
        .attr('x1', fC.x + dx * 46).attr('y1', fC.y + dy * 46)
        .attr('x2', n.x - dx * 38).attr('y2', n.y - dy * 38)
        .attr('stroke', '#38bdf8').attr('stroke-width', 1.4).attr('stroke-dasharray', '3 4').attr('opacity', 0.7)
        .attr('marker-start', 'url(#fedArrowBlue)').attr('marker-end', 'url(#fedArrowBlue)');
    });

    const gC = gFed.append('g').attr('transform', `translate(${fC.x}, ${fC.y})`).style('cursor', 'pointer');
    gC.append('circle').attr('r', 42).attr('fill', '#091c2b').attr('stroke', '#38bdf8').attr('stroke-width', 1.8).attr('stroke-dasharray', '5 4');
    gC.append('use').attr('href', '#ic-mesa').attr('x', -12).attr('y', -24).attr('width', 24).attr('height', 24)
      .style('color', '#38bdf8').style('pointer-events', 'none');
    gC.append('text').text('MESA').attr('text-anchor', 'middle').attr('y', 12)
      .attr('fill', '#38bdf8').attr('font-size', '10.5px').attr('font-weight', '800').attr('letter-spacing', '0.06em');
    gC.append('text').text('punto de encuentro').attr('text-anchor', 'middle').attr('y', 24)
      .attr('fill', '#94a3b8').attr('font-size', '8.5px');
    gC.on('mouseenter', () => showTip('Punto de encuentro', '#38bdf8', `${iconSvgHtml('mesa', 20, '#38bdf8')} Mesa Federativa`, '<b>No es un jefe:</b> es el lugar donde se encuentran 2 delegados de cada núcleo, con mandato de su asamblea y revocables. Decide solo lo que afecta a todos, por consentimiento. La vocería rota cada 1 a 3 meses.'));
    gC.on('mouseleave', hideTip);

    fN.forEach(n => {
      const g = gFed.append('g').attr('transform', `translate(${n.x}, ${n.y})`).style('cursor', 'pointer');
      g.append('circle').attr('r', 32).attr('fill', '#111e30').attr('stroke', n.col).attr('stroke-width', 2.5);
      g.append('use').attr('href', '#ic-' + n.icon).attr('x', -13).attr('y', -13).attr('width', 26).attr('height', 26)
        .style('color', n.col).style('pointer-events', 'none');
      const below = Math.sin(n.angle) > -0.5;
      const ty = below ? 48 : -58;
      const lab = g.append('g').attr('transform', `translate(0, ${ty})`).style('pointer-events', 'none');
      lab.append('text').text(n.n).attr('text-anchor', 'middle')
        .attr('fill', '#fff').attr('font-size', '11px').attr('font-weight', '700')
        .style('paint-order', 'stroke').style('stroke', '#0c1a24').style('stroke-width', '4px');
      lab.append('text').text(n.tag).attr('text-anchor', 'middle').attr('y', 13)
        .attr('fill', n.col).attr('font-size', '9px').attr('font-weight', '600')
        .style('paint-order', 'stroke').style('stroke', '#0c1a24').style('stroke-width', '4px');
      g.on('mouseenter', () => showTip('Núcleo autónomo', n.col, `${iconSvgHtml(n.icon, 20, n.col)} ${n.n}`, `<b>${n.tag}.</b> Decide en su propia asamblea cómo hace su trabajo. Intercambia directamente con los núcleos vecinos y envía 2 delegados a la mesa solo para lo que afecta a todos.`));
      g.on('mouseleave', hideTip);
    });

    // Convenciones de la federación
    const lg = svg.append('g').attr('transform', 'translate(556, 516)');
    lg.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 22).attr('y2', 0).attr('stroke', '#10b981').attr('stroke-width', 2);
    lg.append('text').text('Intercambio directo entre núcleos').attr('x', 28).attr('y', 3.5).attr('fill', '#cbd5e1').attr('font-size', '9.5px');
    lg.append('line').attr('x1', 200).attr('y1', 0).attr('x2', 222).attr('y2', 0).attr('stroke', '#38bdf8').attr('stroke-width', 1.4).attr('stroke-dasharray', '3 4');
    lg.append('text').text('Delegación con mandato (ida y vuelta)').attr('x', 228).attr('y', 3.5).attr('fill', '#cbd5e1').attr('font-size', '9.5px');

    // Botón hacia la explicación paso a paso
    const bBanner = svg.append('g').attr('transform', 'translate(745, 552)').style('cursor', 'pointer');
    bBanner.append('rect').attr('x', -195).attr('y', -15).attr('width', 390).attr('height', 30).attr('rx', 15)
      .attr('fill', 'rgba(16,185,129,0.18)').attr('stroke', '#10b981').attr('stroke-width', 1.2);
    bBanner.append('text').text('▶ VER CÓMO FUNCIONA, PASO A PASO')
      .attr('text-anchor', 'middle').attr('y', 4).attr('fill', '#34d399').attr('font-weight', '800').attr('font-size', '11.5px').attr('letter-spacing', '0.04em');
    bBanner.on('mouseenter', function () { d3.select(this).select('rect').attr('fill', 'rgba(16,185,129,0.32)'); });
    bBanner.on('mouseleave', function () { d3.select(this).select('rect').attr('fill', 'rgba(16,185,129,0.18)'); });
    bBanner.on('click', () => { funStep = 0; setTab('funciona'); });
  }

  // =====================================================================
  // 2. CÓMO FUNCIONA: explicación animada paso a paso
  // =====================================================================
  const FUN_CAPS = {
    f1: 'decide qué sembrar y dónde',
    f2: 'decide zonas de cuidado',
    f3: 'decide rutas de compost',
    f4: 'decide precios y ferias',
    f5: 'aporta técnica y recursos'
  };

  const FUN_STEPS = [
    { t: 'Núcleos autónomos',
      body: 'La federación arranca desde abajo: cinco núcleos de hortelanas, custodios del humedal, recicladores, tenderos y el soporte distrital. Cada uno decide en su propia asamblea cómo hace su trabajo.',
      ver: 'Los puntos alrededor de cada círculo son las personas del núcleo. Todavía no hay líneas: nadie necesita permiso de otro para decidir lo suyo.',
      hoy: 'Hoy esas decisiones bajan desde la Alcaldía, la UAESP y la gerencia de Corabastos.' },
    { t: 'Delegan, no obedecen',
      body: 'Para lo que afecta a todos, cada núcleo elige 2 delegados y les da un mandato concreto: qué pueden aceptar y qué no. La Mesa Federativa es solo el lugar donde se encuentran; no tiene presidente.',
      ver: 'Dos personas salen de cada núcleo hacia la mesa. La línea punteada es su mandato: llevan la voz del núcleo, no la propia.',
      hoy: 'Hoy la comunidad solo puede radicar quejas; no participa en la decisión.' },
    { t: 'Deciden por consentimiento',
      body: 'Una propuesta avanza cuando ningún núcleo tiene una objeción de fondo. Si alguien objeta, no se vota para ganarle: se ajusta la propuesta hasta que todos puedan vivir con ella.',
      ver: 'Ejemplo: abrir una estación de compostaje. Humedal objeta porque quedaría sobre la ronda; se cambia la ubicación y los cinco núcleos dan su consentimiento.',
      hoy: 'Hoy decide quien firma el contrato, aunque los costos los paguen los vecinos.' },
    { t: 'La vocería rota',
      body: 'Alguien tiene que convocar las reuniones y hablar con el Distrito. Esa tarea, la vocería, pasa de un núcleo a otro cada 1 a 3 meses. Comunica lo acordado, pero no decide.',
      ver: 'La insignia amarilla recorre los cinco núcleos: ningún grupo se queda con el cargo.',
      hoy: 'Hoy los cargos de mando son fijos y concentran la información.' },
    { t: 'Intercambian directo',
      body: 'Lo cotidiano no pasa por la mesa. Los núcleos se abastecen entre sí en un circuito: el compost abona las huertas, las cosechas van a las tiendas y los residuos de las tiendas vuelven al compost.',
      ver: 'Lo que circula por las líneas son materiales reales. El humedal aporta polinizadores y agua; el soporte distrital entrega asesoría y recursos, no órdenes.',
      hoy: 'Hoy los residuos salen de Kennedy hacia el relleno sanitario y los alimentos llegan desde afuera.' },
    { t: 'Rinden cuentas y se revocan',
      body: 'Los delegados vuelven a su núcleo y cuentan lo acordado. Si un delegado se salió del mandato, su núcleo lo revoca y envía a otra persona, sin esperar a una nueva elección.',
      ver: 'Un delegado de Comercio Barrial se pasa del mandato (rojo), regresa y es reemplazado por otra vecina (verde) que vuelve a la mesa.',
      hoy: 'Hoy un cargo dura todo su periodo aunque no responda a la comunidad.' }
  ];

  function renderFunciona(svg, showTip, hideTip) {
    const step = funStep;
    const C = { x: 315, y: 345 };
    const R = 178;
    const SEAT_R = 66;

    const nodos = DATA_COMP.federacion.nodos.map(n => {
      const dx = Math.cos(n.angle), dy = Math.sin(n.angle);
      const o = Object.assign({}, n, { dx, dy, x: C.x + dx * R, y: C.y + dy * R });
      // 6 personas por núcleo; las 2 más cercanas a la mesa son las delegadas
      o.members = d3.range(6).map(k => {
        const a = n.angle + Math.PI + (k - 2.5) * (Math.PI / 3);
        return { x: o.x + Math.cos(a) * 52, y: o.y + Math.sin(a) * 52, a };
      });
      o.members.sort((p, q) => Math.hypot(p.x - C.x, p.y - C.y) - Math.hypot(q.x - C.x, q.y - C.y));
      o.seats = [-0.2, 0.2].map(off => ({ x: C.x + Math.cos(n.angle + off) * SEAT_R, y: C.y + Math.sin(n.angle + off) * SEAT_R }));
      return o;
    });
    const byId = Object.fromEntries(nodos.map(n => [n.id, n]));

    // Capas
    const gFlows = svg.append('g');
    const gMand = svg.append('g');
    const gMesa = svg.append('g');
    const gNodes = svg.append('g');
    const gPeople = svg.append('g');
    const gPart = svg.append('g');
    const gFx = svg.append('g');

    // --- Mesa ---
    const mesaVisible = step >= 1;
    const mesaOpacity = step === 4 ? 0.18 : (step === 3 ? 0.55 : 1);
    const mesa = gMesa.append('g').attr('transform', `translate(${C.x},${C.y})`).attr('opacity', mesaVisible ? 0 : 0);
    mesa.append('circle').attr('r', 54).attr('fill', '#091c2b').attr('stroke', '#38bdf8').attr('stroke-width', 1.8).attr('stroke-dasharray', '5 4');
    mesa.append('circle').attr('r', SEAT_R).attr('fill', 'none').attr('stroke', 'rgba(56,189,248,0.18)').attr('stroke-width', 10);
    const mesaTitle = mesa.append('text').attr('text-anchor', 'middle').attr('y', -6)
      .attr('fill', '#38bdf8').attr('font-size', '10.5px').attr('font-weight', 800).attr('letter-spacing', '0.05em').text('MESA');
    const mesaSub = mesa.append('text').attr('text-anchor', 'middle').attr('y', 8)
      .attr('fill', '#94a3b8').attr('font-size', '8.5px').text('sin presidente');
    const mesaSub2 = mesa.append('text').attr('text-anchor', 'middle').attr('y', 20)
      .attr('fill', '#94a3b8').attr('font-size', '8.5px').text('');
    if (mesaVisible) mesa.transition().duration(700).attr('opacity', mesaOpacity);

    // --- Núcleos ---
    nodos.forEach(n => {
      const g = gNodes.append('g').attr('transform', `translate(${n.x},${n.y})`).style('cursor', 'pointer');
      n.ring = g.append('circle').attr('r', 38).attr('fill', '#111e30').attr('stroke', n.col).attr('stroke-width', 2.5);
      g.append('use').attr('href', '#ic-' + n.icon).attr('x', -14).attr('y', -14).attr('width', 28).attr('height', 28)
        .style('color', n.col).style('pointer-events', 'none');
      const ty = n.dy < -0.9 ? -76 : 70;
      g.append('text').text(n.n).attr('text-anchor', 'middle').attr('y', ty)
        .attr('fill', '#fff').attr('font-size', '12px').attr('font-weight', 700)
        .style('paint-order', 'stroke').style('stroke', '#080b11').style('stroke-width', '4px').style('pointer-events', 'none');
      n.cap = g.append('text').text(FUN_CAPS[n.id]).attr('text-anchor', 'middle').attr('y', ty + 14)
        .attr('fill', n.col).attr('font-size', '10px').attr('font-weight', 600)
        .attr('opacity', step === 0 ? 1 : 0.55)
        .style('paint-order', 'stroke').style('stroke', '#080b11').style('stroke-width', '4px').style('pointer-events', 'none');
      g.on('mouseenter', () => showTip('Núcleo autónomo', n.col, `${iconSvgHtml(n.icon, 20, n.col)} ${n.n}`, `<b>${n.tag}.</b> En su asamblea ${FUN_CAPS[n.id]}. Envía 2 delegados a la mesa solo para lo que afecta a todos.`));
      g.on('mouseleave', hideTip);
    });

    // --- Personas ---
    nodos.forEach(n => {
      n.dots = n.members.map((m, k) => gPeople.append('circle')
        .attr('cx', m.x).attr('cy', m.y).attr('r', k < 2 ? 6 : 4.5)
        .attr('fill', k < 2 ? n.col : '#0b111c').attr('stroke', n.col).attr('stroke-width', 1.6));
    });

    function mandateLine(n, k, color) {
      const s = n.seats[k];
      const len = Math.hypot(s.x - n.x, s.y - n.y);
      const x1 = n.x - n.dx * 40, y1 = n.y - n.dy * 40;
      return gMand.append('line').attr('x1', x1).attr('y1', y1).attr('x2', s.x).attr('y2', s.y)
        .attr('stroke', color || n.col).attr('stroke-width', 1.4).attr('stroke-dasharray', '3 4').attr('opacity', 0)
        .transition().delay(300).duration(600).attr('opacity', 0.75).selection();
      void len;
    }

    function sendDelegates(delay = 0, stagger = 140) {
      nodos.forEach((n, i) => {
        [0, 1].forEach(k => {
          n.dots[k].transition().delay(delay + i * stagger + k * 60).duration(900).ease(d3.easeCubicInOut)
            .attr('cx', n.seats[k].x).attr('cy', n.seats[k].y);
          later(() => mandateLine(n, k), delay + i * stagger);
        });
      });
    }
    function placeDelegatesAtSeats() {
      nodos.forEach(n => [0, 1].forEach(k => {
        n.dots[k].attr('cx', n.seats[k].x).attr('cy', n.seats[k].y);
        mandateLine(n, k);
      }));
    }

    // --- Lógica por paso ---
    if (step === 0) {
      // Cada núcleo se enciende en secuencia
      nodos.forEach((n, i) => {
        later(() => {
          n.ring.transition().duration(350).attr('stroke-width', 6).transition().duration(600).attr('stroke-width', 2.5);
          n.dots.slice(2).forEach(d => d.transition().duration(300).attr('r', 6.5).transition().duration(500).attr('r', 4.5));
          n.dots.slice(0, 2).forEach(d => d.transition().duration(300).attr('r', 8).transition().duration(500).attr('r', 6));
        }, 400 + i * 700);
      });
    }

    if (step === 1) {
      sendDelegates(500);
      later(() => { mesaSub2.text('2 delegados × 5 núcleos'); }, 1800);
    }

    if (step === 2) {
      placeDelegatesAtSeats();
      mesaTitle.text('PROPUESTA');
      mesaSub.text('nueva estación');
      mesaSub2.text('de compostaje');
      const marks = {};
      nodos.forEach((n, i) => {
        const p = { x: C.x + n.dx * 100, y: C.y + n.dy * 100 };
        const objeta = n.id === 'f2';
        later(() => {
          const g = gFx.append('g').attr('transform', `translate(${p.x},${p.y})`).attr('opacity', 0);
          const c = g.append('circle').attr('r', 11).attr('fill', objeta ? '#f59e0b' : '#10b981');
          const t = g.append('text').attr('text-anchor', 'middle').attr('y', 4.5).attr('fill', '#06110c')
            .attr('font-size', '13px').attr('font-weight', 900).text(objeta ? '!' : '✓');
          g.transition().duration(300).attr('opacity', 1);
          marks[n.id] = { c, t };
          if (objeta) {
            const b = pill(gFx, n.x + 10, n.y + 102, 'Objeción: queda sobre la ronda', '#f59e0b', { fs: 10 });
            b.attr('opacity', 0).transition().duration(300).attr('opacity', 1);
            later(() => b.transition().duration(400).attr('opacity', 0).remove(), 3600);
          }
        }, 600 + i * 600);
      });
      later(() => {
        mesaTitle.text('AJUSTE').attr('fill', '#f59e0b');
        mesaSub.text('se mueve fuera');
        mesaSub2.text('de la ronda');
      }, 4000);
      later(() => {
        const m = marks.f2;
        if (m) { m.c.transition().duration(300).attr('fill', '#10b981'); m.t.text('✓'); }
      }, 5000);
      later(() => {
        mesaTitle.text('✓ ACORDADO').attr('fill', '#34d399');
        mesaSub.text('con el consentimiento');
        mesaSub2.text('de los 5 núcleos');
        mesa.select('circle').transition().duration(400).attr('stroke', '#10b981').attr('stroke-width', 3);
      }, 5800);
    }

    if (step === 3) {
      mesaSub2.text('solo se reúne');
      const periods = ['Mes 1–3', 'Mes 4–6', 'Mes 7–9', 'Mes 10–12', 'Mes 13–15'];
      const badge = gFx.append('g').attr('opacity', 0);
      badge.append('rect').attr('x', -40).attr('y', -22).attr('width', 80).attr('height', 34).attr('rx', 8)
        .attr('fill', '#facc15').attr('stroke', '#0b0f17').attr('stroke-width', 2);
      badge.append('text').attr('text-anchor', 'middle').attr('y', -8).attr('fill', '#111').attr('font-size', '10px').attr('font-weight', 900).attr('letter-spacing', '0.06em').text('VOCERÍA');
      const bt = badge.append('text').attr('text-anchor', 'middle').attr('y', 5).attr('fill', '#111').attr('font-size', '9.5px').attr('font-weight', 700);
      const halo = gFx.append('circle').attr('r', 48).attr('fill', 'none').attr('stroke', '#facc15').attr('stroke-width', 2.5).attr('stroke-dasharray', '4 3').attr('opacity', 0);
      function pos(n) {
        // insignia hacia fuera del pentágono
        return { x: n.x + (n.dx >= -0.01 ? 1 : -1) * 98, y: n.y + 4 };
      }
      let k = 0;
      function move() {
        const n = nodos[k % nodos.length];
        const p = pos(n);
        bt.text(periods[k % periods.length]);
        if (k === 0) {
          badge.attr('transform', `translate(${p.x},${p.y})`).transition().duration(400).attr('opacity', 1);
          halo.attr('cx', n.x).attr('cy', n.y).transition().duration(400).attr('opacity', 1);
        } else {
          badge.transition().duration(700).ease(d3.easeCubicInOut).attr('transform', `translate(${p.x},${p.y})`);
          halo.transition().duration(700).ease(d3.easeCubicInOut).attr('cx', n.x).attr('cy', n.y);
        }
        k++;
        later(move, 1500);
      }
      later(move, 300);
    }

    if (step === 4) {
      const FLOWS = [
        { s: 'f3', t: 'f1', label: 'abono', col: '#facc15', bow: 46 },
        { s: 'f1', t: 'f4', label: 'cosechas', col: '#4ade80', bow: 46 },
        { s: 'f4', t: 'f3', label: 'residuos orgánicos', col: '#fb923c', bow: 34 },
        { s: 'f2', t: 'f1', label: 'polinizadores y agua', col: '#38bdf8', bow: 28 },
        { s: 'f5', t: 'f1', label: 'asesoría', col: '#c084fc', bow: 28, dash: true },
        { s: 'f5', t: 'f4', label: 'recursos', col: '#c084fc', bow: 28, dash: true }
      ];
      const parts = [];
      FLOWS.forEach((f, i) => {
        const a = byId[f.s], b = byId[f.t];
        const ux = b.x - a.x, uy = b.y - a.y, L = Math.hypot(ux, uy);
        const x1 = a.x + ux / L * 46, y1 = a.y + uy / L * 46;
        const x2 = b.x - ux / L * 50, y2 = b.y - uy / L * 50;
        const mx = (x1 + x2) / 2, my = (y1 + y2) / 2;
        let ox = mx - C.x, oy = my - C.y; const oL = Math.hypot(ox, oy) || 1; ox /= oL; oy /= oL;
        const cx = mx + ox * f.bow, cy = my + oy * f.bow;
        const path = gFlows.append('path').attr('d', `M${x1},${y1} Q${cx},${cy} ${x2},${y2}`)
          .attr('fill', 'none').attr('stroke', f.col).attr('stroke-width', f.dash ? 1.6 : 2.4)
          .attr('stroke-dasharray', f.dash ? '5 4' : null).attr('opacity', 0);
        path.transition().delay(i * 250).duration(500).attr('opacity', 0.75);
        const node = path.node();
        const len = node.getTotalLength();
        const mid = node.getPointAtLength(len / 2);
        const lp = pill(gFx, mid.x + ox * 10, mid.y + oy * 10, f.label, f.col, { fs: 10 });
        lp.attr('opacity', 0).transition().delay(i * 250 + 300).duration(400).attr('opacity', 1);
        const n = f.dash ? 2 : 4;
        for (let j = 0; j < n; j++) {
          parts.push({ node, len, off: j / n, col: f.col,
            el: gPart.append('circle').attr('r', f.dash ? 3 : 4.2).attr('fill', f.col).attr('opacity', 0) });
        }
      });
      const t0 = performance.now();
      function tick(now) {
        const t = (now - t0) / 1000;
        parts.forEach(p => {
          if (t < 1.2) return;
          const u = ((t - 1.2) * 0.22 + p.off) % 1;
          const pt = p.node.getPointAtLength(u * p.len);
          p.el.attr('cx', pt.x).attr('cy', pt.y).attr('opacity', Math.sin(u * Math.PI) * 0.95 + 0.05);
        });
        rafId = requestAnimationFrame(tick);
      }
      rafId = requestAnimationFrame(tick);
      mesaSub.text('lo cotidiano');
      mesaSub2.text('no pasa por aquí');
      // Ciclo central
      const cyc = pill(gFx, C.x, C.y + 88, '↻ circuito cerrado', '#34d399', { fs: 10 });
      cyc.attr('opacity', 0).transition().delay(1600).duration(500).attr('opacity', 1);
    }

    if (step === 5) {
      placeDelegatesAtSeats();
      mesaTitle.text('ACUERDO');
      mesaSub.text('cada delegado');
      mesaSub2.text('vuelve a informar');
      // 1) vuelven a casa
      later(() => {
        gMand.selectAll('line').transition().duration(500).attr('opacity', 0);
        nodos.forEach((n, i) => [0, 1].forEach(k => {
          n.dots[k].transition().delay(i * 100).duration(900).ease(d3.easeCubicInOut)
            .attr('cx', n.members[k].x).attr('cy', n.members[k].y);
        }));
        nodos.forEach((n, i) => later(() => {
          const b = pill(gFx, n.x, n.y + (n.dy < -0.9 ? 52 : -52), 'informa', n.col, { fs: 9 });
          b.attr('opacity', 0).transition().duration(300).attr('opacity', 1)
            .transition().delay(1400).duration(400).attr('opacity', 0).remove();
        }, 900 + i * 120));
      }, 900);
      const n = byId.f4;
      const bad = n.dots[0];
      // 2) uno se pasó del mandato
      later(() => {
        bad.transition().duration(400).attr('fill', '#ef4444').attr('stroke', '#ef4444').attr('r', 8);
        const b = pill(gFx, n.x - 6, n.y - 80, 'se salió del mandato', '#ef4444', { fs: 10 });
        b.attr('opacity', 0).transition().duration(300).attr('opacity', 1)
          .transition().delay(1500).duration(300).attr('opacity', 0).remove();
      }, 3000);
      // 3) se revoca
      later(() => {
        bad.transition().duration(700).attr('r', 0).attr('opacity', 0);
        const b = pill(gFx, n.x - 6, n.y - 80, 'revocado por su núcleo', '#f87171', { fs: 10 });
        b.attr('opacity', 0).transition().duration(300).attr('opacity', 1)
          .transition().delay(1200).duration(300).attr('opacity', 0).remove();
      }, 5000);
      // 4) entra otra persona y vuelve a la mesa
      later(() => {
        const m = n.members[5];
        const nuevo = gPeople.append('circle').attr('cx', m.x).attr('cy', m.y).attr('r', 0)
          .attr('fill', '#22c55e').attr('stroke', '#bbf7d0').attr('stroke-width', 2);
        nuevo.transition().duration(400).attr('r', 8);
        const b = pill(gFx, n.x - 6, n.y - 80, 'nueva delegada', '#22c55e', { fs: 10 });
        b.attr('opacity', 0).transition().duration(300).attr('opacity', 1)
          .transition().delay(1600).duration(300).attr('opacity', 0).remove();
        later(() => {
          nuevo.transition().duration(1000).ease(d3.easeCubicInOut).attr('cx', n.seats[0].x).attr('cy', n.seats[0].y).attr('r', 6);
          mandateLine(n, 0, '#22c55e');
        }, 1300);
      }, 6700);
    }

    // --- Convenciones ---
    const lg = svg.append('g').attr('transform', 'translate(40, 600)');
    lg.append('circle').attr('cx', 0).attr('cy', 0).attr('r', 4.5).attr('fill', '#0b111c').attr('stroke', '#94a3b8').attr('stroke-width', 1.6);
    lg.append('text').text('persona del núcleo').attr('x', 10).attr('y', 3.5).attr('fill', '#94a3b8').attr('font-size', '10px');
    lg.append('circle').attr('cx', 130).attr('cy', 0).attr('r', 6).attr('fill', '#94a3b8');
    lg.append('text').text('delegada/o (2 por núcleo)').attr('x', 141).attr('y', 3.5).attr('fill', '#94a3b8').attr('font-size', '10px');
    lg.append('line').attr('x1', 290).attr('y1', 0).attr('x2', 312).attr('y2', 0).attr('stroke', '#94a3b8').attr('stroke-width', 1.4).attr('stroke-dasharray', '3 4');
    lg.append('text').text('mandato').attr('x', 318).attr('y', 3.5).attr('fill', '#94a3b8').attr('font-size', '10px');

    // --- Panel explicativo ---
    const s = FUN_STEPS[step];
    const P = { x: 640, y: 58, w: 336, h: 552 };
    const panel = svg.append('g');
    panel.append('rect').attr('x', P.x).attr('y', P.y).attr('width', P.w).attr('height', P.h).attr('rx', 16)
      .attr('fill', '#0c1420').attr('stroke', 'rgba(56,189,248,0.35)').attr('stroke-width', 1.2);
    const px = P.x + 22;
    let y = P.y + 32;
    panel.append('text').text('CÓMO FUNCIONA LA FEDERACIÓN').attr('x', px).attr('y', y)
      .attr('fill', '#38bdf8').attr('font-size', '10.5px').attr('font-weight', 800).attr('letter-spacing', '0.08em');
    y += 22;
    panel.append('text').text(`PASO ${step + 1} DE ${FUN_STEPS.length}`).attr('x', px).attr('y', y)
      .attr('fill', '#64748b').attr('font-size', '10px').attr('font-weight', 700).attr('letter-spacing', '0.08em');
    y += 30;
    const tl = wrapText(panel.append('text').attr('x', px).attr('y', y).attr('fill', '#fff').attr('font-size', '22px').attr('font-weight', 800), s.t, 24, 26);
    y += (tl - 1) * 26 + 26;
    const bl = wrapText(panel.append('text').attr('x', px).attr('y', y).attr('fill', '#cbd5e1').attr('font-size', '13px'), s.body, 44, 19);
    y += bl * 19 + 12;

    const verG = panel.append('g');
    const verRect = verG.append('rect').attr('x', px - 8).attr('y', y).attr('width', P.w - 28).attr('rx', 10)
      .attr('fill', 'rgba(56,189,248,0.08)').attr('stroke', 'rgba(56,189,248,0.35)');
    verG.append('text').text('EN EL DIAGRAMA').attr('x', px + 4).attr('y', y + 20)
      .attr('fill', '#38bdf8').attr('font-size', '9.5px').attr('font-weight', 800).attr('letter-spacing', '0.08em');
    const vl = wrapText(verG.append('text').attr('x', px + 4).attr('y', y + 38).attr('fill', '#e2e8f0').attr('font-size', '12px'), s.ver, 44, 17);
    const verH = 38 + (vl - 1) * 17 + 14;
    verRect.attr('height', verH);
    y += verH + 10;

    const hoyG = panel.append('g');
    const hoyRect = hoyG.append('rect').attr('x', px - 8).attr('y', y).attr('width', P.w - 28).attr('rx', 10)
      .attr('fill', 'rgba(239,68,68,0.08)').attr('stroke', 'rgba(239,68,68,0.35)');
    hoyG.append('text').text('EN CAMBIO, HOY').attr('x', px + 4).attr('y', y + 20)
      .attr('fill', '#f87171').attr('font-size', '9.5px').attr('font-weight', 800).attr('letter-spacing', '0.08em');
    const hl = wrapText(hoyG.append('text').attr('x', px + 4).attr('y', y + 38).attr('fill', '#fecaca').attr('font-size', '12px'), s.hoy, 44, 17);
    hoyRect.attr('height', 38 + (hl - 1) * 17 + 14);

    // Barra de progreso (clicable)
    const segW = (P.w - 44 - (FUN_STEPS.length - 1) * 6) / FUN_STEPS.length;
    const prog = panel.append('g').attr('transform', `translate(${px}, ${P.y + P.h - 74})`);
    FUN_STEPS.forEach((st, i) => {
      const g = prog.append('g').attr('transform', `translate(${i * (segW + 6)},0)`).style('cursor', 'pointer');
      g.append('rect').attr('width', segW).attr('height', 6).attr('rx', 3)
        .attr('fill', i < step ? '#0284c7' : i === step ? '#38bdf8' : 'rgba(255,255,255,0.12)');
      g.append('rect').attr('y', -8).attr('width', segW).attr('height', 22).attr('fill', 'transparent');
      g.append('title').text(`${i + 1}. ${st.t}`);
      g.on('click', () => { stopAutoplay(); goStep(i); });
    });

    // Botones
    function button(x, w, label, primary, onClick, enabled = true) {
      const g = panel.append('g').attr('transform', `translate(${x}, ${P.y + P.h - 52})`)
        .style('cursor', enabled ? 'pointer' : 'default').attr('opacity', enabled ? 1 : 0.35);
      g.append('rect').attr('width', w).attr('height', 32).attr('rx', 16)
        .attr('fill', primary ? '#0284c7' : 'rgba(255,255,255,0.06)')
        .attr('stroke', primary ? '#38bdf8' : 'rgba(255,255,255,0.18)');
      g.append('text').text(label).attr('x', w / 2).attr('y', 20.5).attr('text-anchor', 'middle')
        .attr('fill', '#fff').attr('font-size', '12px').attr('font-weight', 700);
      if (enabled) g.on('click', onClick);
    }
    const last = FUN_STEPS.length - 1;
    button(px, 92, '← Anterior', false, () => { stopAutoplay(); goStep(step - 1); }, step > 0);
    button(px + 100, 96, autoplayId ? '❚❚ Pausa' : '▶ Reproducir', false, () => {
      if (autoplayId) { stopAutoplay(); renderView(); return; }
      if (funStep === last) funStep = 0;
      autoplayId = setInterval(() => {
        if (funStep >= last) { stopAutoplay(); renderView(); return; }
        goStep(funStep + 1);
      }, 9000);
      renderView();
    });
    button(px + 204, 92, step === last ? 'Reiniciar ↺' : 'Siguiente →', true, () => { stopAutoplay(); goStep(step === last ? 0 : step + 1); });
  }

  function goStep(i) {
    funStep = Math.max(0, Math.min(FUN_STEPS.length - 1, i));
    renderView();
  }

  // =====================================================================
  // 3. RED SOCIOBIÓTICA (4 columnas)
  // =====================================================================
  function renderSociobiotica(svg, showTip, hideTip) {
    const Y = y => 150 + (y - 120) * 0.9; // deja espacio a la barra superior
    const all = NODOS_SOCIOBIOTICA.map(n => Object.assign({}, n, { y: Y(n.y) }));
    const nodes = activeFilter === 'all' ? all : all.filter(n => n.cat === activeFilter);
    const nodeMap = new Map(all.map(n => [n.id, n]));

    const colsInfo = [
      { x: 140, label: 'QUIÉNES', sub: 'Personas y organizaciones', col: '#38bdf8' },
      { x: 380, label: 'DÓNDE · HUERTAS', sub: 'Producción y humedal', col: '#4ade80' },
      { x: 620, label: 'DÓNDE · CIRCUITO', sub: 'Compost, tiendas y comedores', col: '#fb923c' },
      { x: 860, label: 'PARA QUÉ · ESPECIES', sub: 'Lo que atrae el humedal', col: '#fde047' }
    ];
    colsInfo.forEach((ci, i) => {
      svg.append('rect').attr('x', ci.x - 105).attr('y', 78).attr('width', 210).attr('height', 482).attr('rx', 14)
        .attr('fill', i % 2 ? 'rgba(255,255,255,0.015)' : 'rgba(255,255,255,0.03)');
      const gH = svg.append('g').attr('transform', `translate(${ci.x}, 100)`);
      gH.append('text').text(ci.label).attr('text-anchor', 'middle')
        .attr('fill', ci.col).attr('font-size', '12px').attr('font-weight', '800').attr('letter-spacing', '0.06em');
      gH.append('text').text(ci.sub).attr('text-anchor', 'middle')
        .attr('fill', '#64748b').attr('font-size', '10px').attr('y', 14);
      if (i < 3) {
        svg.append('text').text('→').attr('x', ci.x + 120).attr('y', 104).attr('text-anchor', 'middle')
          .attr('fill', '#334155').attr('font-size', '16px').attr('font-weight', 800);
      }
    });

    const gLinks = svg.append('g');
    const gNodes = svg.append('g');

    const visibleIds = new Set(nodes.map(n => n.id));
    const links = ENLACES_SOCIOBIOTICA.filter(l => visibleIds.has(l.s) && visibleIds.has(l.t));

    function baseStyle(sel) {
      sel.style('opacity', d => d.isBio ? 0.5 : 0.45).style('stroke-width', d => d.isBio ? 1.8 : 1.5).style('stroke', null);
    }

    const linkData = links.map(l => {
      const s = nodeMap.get(l.s), t = nodeMap.get(l.t);
      const isBio = s.cat === 'biotica' || t.cat === 'biotica';
      let d;
      if (s.x === t.x) {
        // misma columna: arco lateral para no atravesar otros nodos
        const bow = 70 + Math.abs(t.y - s.y) * 0.15;
        d = `M ${s.x + 26} ${s.y} C ${s.x + bow} ${s.y}, ${t.x + bow} ${t.y}, ${t.x + 28} ${t.y}`;
      } else {
        const sg = Math.sign(t.x - s.x);
        const sx = s.x + sg * 27, tx = t.x - sg * 31;
        const dx = (tx - sx) * 0.5;
        d = `M ${sx} ${s.y} C ${sx + dx} ${s.y}, ${tx - dx} ${t.y}, ${tx} ${t.y}`;
      }
      return Object.assign({}, l, { d, isBio });
    });

    const paths = gLinks.selectAll('path').data(linkData).enter().append('path')
      .attr('class', 'fed-curve-link').attr('d', d => d.d)
      .attr('stroke', d => d.isBio ? '#10b981' : '#38bdf8')
      .attr('stroke-dasharray', d => d.isBio ? '4 3' : null)
      .attr('marker-end', d => d.isBio ? 'url(#fedArrowGreen)' : 'url(#fedArrowBlue)');
    baseStyle(paths);

    // Etiqueta de relación visible al pasar el cursor
    const gLabels = svg.append('g').style('pointer-events', 'none');

    nodes.forEach(n => {
      const g = gNodes.append('g').attr('transform', `translate(${n.x}, ${n.y})`).style('cursor', 'pointer');
      const isLugar = n.cat === 'lugar', isBio = n.cat === 'biotica';
      if (isLugar) {
        g.append('rect').attr('x', -22).attr('y', -22).attr('width', 44).attr('height', 44).attr('rx', 10)
          .attr('fill', '#111827').attr('stroke', n.col).attr('stroke-width', 2);
        g.append('use').attr('href', '#ic-' + n.icon).attr('x', -10).attr('y', -10).attr('width', 20).attr('height', 20)
          .style('color', n.col).style('pointer-events', 'none');
      } else if (isBio) {
        g.append('polygon').attr('points', '0,-24 24,0 0,24 -24,0')
          .attr('fill', '#08201b').attr('stroke', n.col).attr('stroke-width', 2);
        g.append('use').attr('href', '#ic-' + n.icon).attr('x', -9).attr('y', -9).attr('width', 18).attr('height', 18)
          .style('color', n.col).style('pointer-events', 'none');
      } else {
        g.append('circle').attr('r', 21).attr('fill', '#161e2e').attr('stroke', n.col).attr('stroke-width', 2);
        g.append('use').attr('href', '#ic-' + n.icon).attr('x', -9).attr('y', -9).attr('width', 18).attr('height', 18)
          .style('color', n.col).style('pointer-events', 'none');
      }
      g.append('text').text(n.n).attr('text-anchor', 'middle').attr('y', isLugar ? 36 : isBio ? 38 : 35)
        .attr('fill', '#fff').attr('font-size', '10.5px').attr('font-weight', '700')
        .style('paint-order', 'stroke').style('stroke', '#080b11').style('stroke-width', '3px');

      g.on('mouseenter', () => {
        paths.style('opacity', 0.07);
        const on = paths.filter(d => d.s === n.id || d.t === n.id)
          .style('opacity', 1).style('stroke-width', 2.8).style('stroke', '#facc15');
        on.each(function (d) {
          const p = this.getPointAtLength(this.getTotalLength() / 2);
          pill(gLabels, p.x, p.y, d.label, '#facc15', { fs: 9 });
        });
        const catName = isLugar ? 'Lugar (dónde)' : isBio ? 'Especie del humedal (para qué)' : 'Actor social (quiénes)';
        showTip(catName, n.col, `${iconSvgHtml(n.icon, 20, n.col)} ${n.n}`, `<b>Participantes:</b> ${n.quienes}<br><b>¿Para qué?</b> ${n.paraque}`);
      });
      g.on('mouseleave', () => {
        baseStyle(paths);
        gLabels.selectAll('*').remove();
        hideTip();
      });
    });

    const leg = svg.append('g').attr('transform', 'translate(30, 578)');
    leg.append('rect').attr('width', 740).attr('height', 30).attr('rx', 6).attr('fill', 'rgba(14,18,28,0.85)').attr('stroke', 'rgba(255,255,255,0.08)');
    leg.append('text').text('Convenciones:').attr('x', 14).attr('y', 19).attr('fill', '#94a3b8').attr('font-size', '10.5px').attr('font-weight', '700');
    leg.append('circle').attr('cx', 110).attr('cy', 15).attr('r', 6).attr('fill', '#161e2e').attr('stroke', '#38bdf8').attr('stroke-width', 1.5);
    leg.append('text').text('Personas').attr('x', 121).attr('y', 19).attr('fill', '#cbd5e1').attr('font-size', '10px');
    leg.append('rect').attr('x', 175).attr('y', 9).attr('width', 12).attr('height', 12).attr('rx', 3).attr('fill', '#111827').attr('stroke', '#4ade80').attr('stroke-width', 1.5);
    leg.append('text').text('Lugares').attr('x', 193).attr('y', 19).attr('fill', '#cbd5e1').attr('font-size', '10px');
    leg.append('polygon').attr('points', '252,9 258,15 252,21 246,15').attr('fill', '#09231f').attr('stroke', '#fde047').attr('stroke-width', 1.5);
    leg.append('text').text('Especies').attr('x', 264).attr('y', 19).attr('fill', '#cbd5e1').attr('font-size', '10px');
    leg.append('line').attr('x1', 322).attr('y1', 15).attr('x2', 344).attr('y2', 15).attr('stroke', '#38bdf8').attr('stroke-width', 1.5).attr('marker-end', 'url(#fedArrowBlue)');
    leg.append('text').text('Trabajo y flujos').attr('x', 350).attr('y', 19).attr('fill', '#cbd5e1').attr('font-size', '10px');
    leg.append('line').attr('x1', 438).attr('y1', 15).attr('x2', 460).attr('y2', 15).attr('stroke', '#10b981').attr('stroke-width', 1.5).attr('stroke-dasharray', '4 3').attr('marker-end', 'url(#fedArrowGreen)');
    leg.append('text').text('Relación biótica').attr('x', 466).attr('y', 19).attr('fill', '#cbd5e1').attr('font-size', '10px');
    leg.append('text').text('Pasa el cursor por un nodo').attr('x', 728).attr('y', 19).attr('text-anchor', 'end').attr('fill', '#64748b').attr('font-size', '10px').attr('font-style', 'italic');
  }

  // =====================================================================
  // 4 y 5. PROGRAMA ARQUITECTÓNICO Y CANASTA (versión del equipo, sin cambios)
  // =====================================================================
  function renderProgramaArquitectonico(svg, showTip, hideTip) {
    const header = svg.append('g').attr('transform', 'translate(500, 48)');
    header.append('text').text('PROGRAMA ARQUITECTÓNICO: COMPLEJO BIOTECNOLÓGICO URBANO (9.000 m²)')
      .attr('text-anchor', 'middle').attr('fill', '#38bdf8').attr('font-weight', '800').attr('font-size', '15px').attr('letter-spacing', '0.05em');
    header.append('text').text('Zonificación funcional, áreas y corte espacial bioclimático en el borde Corabastos – Humedal El Burro')
      .attr('text-anchor', 'middle').attr('fill', '#94a3b8').attr('font-size', '11.5px').attr('y', 17);

    // --- COLUMNA IZQUIERDA: CUADRO DE ÁREAS Y PAQUETES PROGRAMÁTICOS (x=35, w=450) ---
    const gAreas = svg.append('g').attr('transform', 'translate(35, 82)');
    gAreas.append('rect').attr('width', 450).attr('height', 455).attr('rx', 14)
      .attr('fill', '#0a101d').attr('stroke', 'rgba(56,189,248,0.35)').attr('stroke-width', 1.4);

    gAreas.append('text').text('CUADRO GENERAL DE ÁREAS Y ZONIFICACIÓN')
      .attr('x', 18).attr('y', 26).attr('fill', '#38bdf8').attr('font-size', '11.5px').attr('font-weight', '800');
    gAreas.append('text').text('Total construido: 9.000 m² cubiertos + 2.500 m² espacio público')
      .attr('x', 18).attr('y', 41).attr('fill', '#94a3b8').attr('font-size', '10px');

    const PAQUETES = [
      {
        nom: 'ZONA A: Biorrefinería Mecatrónica', m2: '2.800 m²', col: '#38bdf8', ic: 'ic-engranaje',
        sub: 'Muelle automatizado (600m²), trommels ópticos (700m²), biodigestor biogás (800m²), compostaje cerrado (700m²)',
        tip: '<b>Zona A (2.800 m²):</b> Muelle de descarga continua con cintas mecanizadas que reciben las 350 ton/día de mermas de Corabastos. Erradica el cargue a lomo en la espalda. Digestores anaerobios que capturan biogás para energizar la planta.'
      },
      {
        nom: 'ZONA B: Bóvedas de Micoproteína', m2: '2.200 m²', col: '#ec4899', ic: 'ic-hongo',
        sub: 'Cámaras de fructificación Pleurotus (1.000m²), lab inoculación aséptica (400m²), secado y empaque (800m²)',
        tip: '<b>Zona B (2.200 m²):</b> Salas oscuras climatizadas con masa térmica para cultivo de setas Pleurotus y Shiitake sobre rastrojos agrícolas. Producción de 40 ton/mes de proteína de alta digestibilidad sin deforestación.'
      },
      {
        nom: 'ZONA C: Silos de Acopio & Canasta', m2: '1.800 m²', col: '#facc15', ic: 'ic-bodega',
        sub: 'Silos tecnificados de tubérculos andinos (800m²), cuartos fríos hortalizas (500m²), línea pesaje digital (500m²)',
        tip: '<b>Zona C (1.800 m²):</b> Silos con ventilación forzada para conservar papa, arracacha y yuca de la Sabana Sur sin pérdidas. Estación mecatrónica de pesado y ensamblado de la Canasta Familiar.'
      },
      {
        nom: 'ZONA D: Centro Transición Laboral', m2: '800 m²', col: '#94a3b8', ic: 'ic-obrero',
        sub: 'Aulas técnicas SENA (300m²), talleres de mecatrónica (250m²), vestuarios, duchas y descanso ergonómico (250m²)',
        tip: '<b>Zona D (800 m²):</b> Espacio de dignificación sociolaboral. Los antiguos coteros y recicladores se capacitan como técnicos operadores de maquinaria y laboratoristas de micología con instalaciones dignas.'
      },
      {
        nom: 'ZONA E: Comedor Cívico & Humedal', m2: '1.400 m²', col: '#4ade80', ic: 'ic-comedor',
        sub: 'Comedor comunitario (500m²), mercado de cercanía (600m²), umbral fitodepuración hacia El Burro (300m²)',
        tip: '<b>Zona E (1.400 m²):</b> Remate público del edificio conectado con el Humedal El Burro. Comedor social para 500 raciones/día, feria campesina barrial y biofiltro vegetal de aguas.'
      }
    ];

    PAQUETES.forEach((pq, i) => {
      const pY = 56 + i * 76;
      const gRow = gAreas.append('g').attr('transform', `translate(14, ${pY})`).style('cursor', 'pointer');
      
      gRow.append('rect').attr('width', 422).attr('height', 68).attr('rx', 8)
        .attr('fill', '#111828').attr('stroke', pq.col + '40').attr('stroke-width', 1);

      gRow.append('circle').attr('cx', 24).attr('cy', 34).attr('r', 14).attr('fill', pq.col + '20').attr('stroke', pq.col).attr('stroke-width', 1.2);
      gRow.append('use').attr('href', '#' + pq.ic).attr('x', 15).attr('y', 25).attr('width', 18).attr('height', 18)
        .style('color', pq.col).style('pointer-events', 'none');

      gRow.append('text').text(pq.nom).attr('x', 46).attr('y', 23)
        .attr('fill', '#fff').attr('font-size', '11px').attr('font-weight', '700');
      
      gRow.append('rect').attr('x', 338).attr('y', 11).attr('width', 74).attr('height', 18).attr('rx', 4)
        .attr('fill', pq.col + '25').attr('stroke', pq.col).attr('stroke-width', 1);
      gRow.append('text').text(pq.m2).attr('x', 375).attr('y', 23).attr('text-anchor', 'middle')
        .attr('fill', pq.col).attr('font-size', '9.5px').attr('font-weight', '800');

      // Descripción wrap
      gRow.append('text').text(pq.sub).attr('x', 46).attr('y', 42)
        .attr('fill', '#94a3b8').attr('font-size', '8.5px')
        .call(wrapSvgText, 355);

      gRow.on('mouseenter', () => showTip('Zona Arquitectónica', pq.col, `${iconSvgHtml(pq.ic, 18, pq.col)} ${pq.nom} (${pq.m2})`, pq.tip));
      gRow.on('mouseleave', hideTip);
    });

    // --- COLUMNA DERECHA: SECCIÓN / CORTE BIOCLIMÁTICO (x=505, w=460) ---
    const gSec = svg.append('g').attr('transform', 'translate(505, 82)');
    gSec.append('rect').attr('width', 460).attr('height', 455).attr('rx', 14)
      .attr('fill', '#09131e').attr('stroke', 'rgba(16,185,129,0.35)').attr('stroke-width', 1.4);

    gSec.append('text').text('CORTE ARQUITECTÓNICO BIOCLIMÁTICO (SECCIÓN A - A\')')
      .attr('x', 18).attr('y', 26).attr('fill', '#10b981').attr('font-size', '11.5px').attr('font-weight', '800');
    gSec.append('text').text('Flujos térmicos, masa biológica y transición de cota hacia el Humedal')
      .attr('x', 18).attr('y', 41).attr('fill', '#94a3b8').attr('font-size', '10px');

    // Diagrama de Niveles en Corte
    const NIVELES = [
      {
        cota: '+13.50m', tit: 'Cubierta Productiva & Captación', col: '#4ade80', y: 58,
        desc: 'Huertas de hortalizas en azotea (1.500m²), biofiltros verdes y captación de agua lluvia para riego y proceso.',
        ic: 'ic-huerta'
      },
      {
        cota: '+9.00m', tit: 'Cámaras de Micelio & Climatización Pasiva', col: '#ec4899', y: 146,
        desc: 'Bóvedas isotérmicas de setas Pleurotus aisladas con muros de tierra compactada para mantener 18°C sin gasto de aire acondicionado.',
        ic: 'ic-hongo'
      },
      {
        cota: '+4.50m', tit: 'Planta de Operación & Centro de Formación', col: '#facc15', y: 234,
        desc: 'Laboratorios asépticos, aulas de reconversión laboral SENA, vestuarios y pasarelas de monitoreo mecatrónico.',
        ic: 'ic-obrero'
      },
      {
        cota: '±0.00m', tit: 'Muelle Mecanizado (Norte) · Comedor & Plaza (Sur)', col: '#38bdf8', y: 322,
        desc: 'Segregación radical de flujos: carga pesada automatizada con cintas hacia Corabastos; plaza cívica y comedor abiertos hacia el Humedal.',
        ic: 'ic-transporte'
      }
    ];

    NIVELES.forEach(niv => {
      const gN = gSec.append('g').attr('transform', `translate(14, ${niv.y})`).style('cursor', 'pointer');
      gN.append('rect').attr('width', 432).attr('height', 74).attr('rx', 8)
        .attr('fill', '#0e1c2b').attr('stroke', niv.col + '45').attr('stroke-width', 1);

      // Cota nivel
      gN.append('rect').attr('x', 10).attr('y', 10).attr('width', 64).attr('height', 20).attr('rx', 4)
        .attr('fill', niv.col + '20').attr('stroke', niv.col).attr('stroke-width', 1);
      gN.append('text').text(niv.cota).attr('x', 42).attr('y', 24).attr('text-anchor', 'middle')
        .attr('fill', niv.col).attr('font-size', '9.5px').attr('font-weight', '800');

      gN.append('text').text(niv.tit).attr('x', 84).attr('y', 24)
        .attr('fill', '#fff').attr('font-size', '11px').attr('font-weight', '700');

      gN.append('text').text(niv.desc).attr('x', 12).attr('y', 45)
        .attr('fill', '#cbd5e1').attr('font-size', '8.5px')
        .call(wrapSvgText, 410);

      gN.on('mouseenter', () => showTip('Corte Bioclimático ' + niv.cota, niv.col, `${iconSvgHtml(niv.ic, 18, niv.col)} ${niv.tit}`, niv.desc));
      gN.on('mouseleave', hideTip);
    });

    // Biofiltro del humedal en base del corte (+-0.00m base)
    const gBioFiltro = gSec.append('g').attr('transform', 'translate(14, 404)');
    gBioFiltro.append('rect').attr('width', 432).attr('height', 38).attr('rx', 6)
      .attr('fill', 'rgba(16,185,129,0.18)').attr('stroke', '#10b981').attr('stroke-width', 1.2);
    gBioFiltro.append('text').text('TALUD DE FITODEPURACIÓN: CERO LIXIVIADOS AL HUMEDAL EL BURRO')
      .attr('x', 216).attr('y', 23).attr('text-anchor', 'middle').attr('fill', '#34d399').attr('font-size', '9.5px').attr('font-weight', '800');

    // Banner pie
    const bBanner = svg.append('g').attr('transform', 'translate(500, 565)');
    bBanner.append('rect').attr('x', -360).attr('y', -14).attr('width', 720).attr('height', 28).attr('rx', 14)
      .attr('fill', 'rgba(56,189,248,0.14)').attr('stroke', '#38bdf8').attr('stroke-width', 1.2);
    bBanner.append('text').text('✓ CRITERIO ARQUITECTÓNICO: SEGREGACIÓN TÉCNICA DE CARGA HACIA CORABASTOS Y APERTURA CÍVICO-ECOLÓGICA AL HUMEDAL')
      .attr('text-anchor', 'middle').attr('y', 4).attr('fill', '#38bdf8').attr('font-weight', '800').attr('font-size', '10px');
  }

  // 4. TAB 4: ARQUITECTURA DE LA CANASTA & FASES DE IMPLANTACIÓN
  function renderArquitecturaCanasta(svg, showTip, hideTip) {
    const header = svg.append('g').attr('transform', 'translate(500, 48)');
    header.append('text').text('ARQUITECTURA DE LA CANASTA FAMILIAR & FASES CONSTRUCTIVAS')
      .attr('text-anchor', 'middle').attr('fill', '#facc15').attr('font-weight', '800').attr('font-size', '15px').attr('letter-spacing', '0.05em');
    header.append('text').text('Espacialización de la nutrición (DANE / ENSIN) y plan maestro de implantación física en 3 fases')
      .attr('text-anchor', 'middle').attr('fill', '#94a3b8').attr('font-size', '11.5px').attr('y', 17);

    // --- TOP: 3 MÓDULOS ARQUITECTÓNICOS DE LA CANASTA (y=80, h=210) ---
    const MODULOS = [
      {
        tit: 'MÓDULO PROTEICO (2.200 m²)', sub: 'Bóvedas de Micelio & Deshidratado',
        col: '#ec4899', ic: 'ic-hongo', x: 35,
        espacios: ['Cámaras oscuras de fructificación Pleurotus', 'Inoculación aséptica en sala blanca (ISO 7)', 'Línea de secado y empaque aséptico al vacío'],
        met: '40 ton/mes proteína fúngica · 28% proteína seca',
        tip: '<b>Módulo Arquitectónico Proteico:</b> Espacio industrial limpio con control de CO2, humedad al 85% y temperatura a 18°C. Produce proteína de setas en 21 días sobre rastrojos agrícolas de Corabastos, democratizando el acceso a proteína barata y nutritiva.'
      },
      {
        tit: 'MÓDULO CARBOHIDRATOS (1.800 m²)', sub: 'Silos de Tubérculos Andinos',
        col: '#facc15', ic: 'ic-bodega', x: 350,
        espacios: ['Silos en doble altura con ventilación cruzada', 'Tolvas de recepción directa desde camiones', 'Pesaje electrónico y empaque mecanizado'],
        met: 'Pérdidas postcosecha reducidas del 30% a <3%',
        tip: '<b>Módulo de Carbohidratos:</b> Almacén tecnificado que recibe papa, arracacha, plátano y yuca de pequeños campesinos. Elimina intermediarios usureros y garantiza pesaje exacto sin merma.'
      },
      {
        tit: 'MÓDULO VEGETALES (1.400 m²)', sub: 'Cubiertas & Cuartos Fríos Solares',
        col: '#4ade80', ic: 'ic-huerta', x: 665,
        espacios: ['1.500m² cubiertas productivas biofertilizadas', 'Cámaras de frío solar para hortalizas de hoja', 'Puntos de acopio de 10 huertas barriales'],
        met: 'Cosecha fresca en <24h · 100% sin agrotóxicos',
        tip: '<b>Módulo de Vegetales:</b> Articula las huertas en terrazas, baldíos y ronda del humedal con la planta de frío solar, proveyendo acelgas, espinacas y tomates frescos a comedores y tiendas.'
      }
    ];

    MODULOS.forEach(m => {
      const g = svg.append('g').attr('transform', `translate(${m.x}, 80)`).style('cursor', 'pointer');
      g.append('rect').attr('width', 300).attr('height', 215).attr('rx', 12)
        .attr('fill', '#0c1322').attr('stroke', m.col).attr('stroke-width', 1.4);

      g.append('circle').attr('cx', 28).attr('cy', 26).attr('r', 13).attr('fill', m.col + '20').attr('stroke', m.col).attr('stroke-width', 1.2);
      g.append('use').attr('href', '#' + m.ic).attr('x', 19).attr('y', 17).attr('width', 18).attr('height', 18)
        .style('color', m.col).style('pointer-events', 'none');

      g.append('text').text(m.tit).attr('x', 48).attr('y', 23)
        .attr('fill', m.col).attr('font-size', '10px').attr('font-weight', '800');
      g.append('text').text(m.sub).attr('x', 48).attr('y', 36)
        .attr('fill', '#fff').attr('font-size', '10px').attr('font-weight', '600');

      g.append('line').attr('x1', 14).attr('y1', 48).attr('x2', 286).attr('y2', 48)
        .attr('stroke', 'rgba(255,255,255,0.08)').attr('stroke-width', 1);

      m.espacios.forEach((esp, idx) => {
        g.append('circle').attr('cx', 22).attr('cy', 68 + idx * 30).attr('r', 2.8).attr('fill', m.col);
        g.append('text').text(esp).attr('x', 32).attr('y', 72 + idx * 30)
          .attr('fill', '#cbd5e1').attr('font-size', '8.5px');
      });

      g.append('rect').attr('x', 14).attr('y', 165).attr('width', 272).attr('height', 34).attr('rx', 6)
        .attr('fill', m.col + '15').attr('stroke', m.col + '35').attr('stroke-width', 1);
      g.append('text').text(m.met).attr('x', 150).attr('y', 186).attr('text-anchor', 'middle')
        .attr('fill', m.col).attr('font-size', '9px').attr('font-weight', '700');

      g.on('mouseenter', () => showTip(m.tit, m.col, `${iconSvgHtml(m.ic, 18, m.col)} ${m.sub}`, m.tip));
      g.on('mouseleave', hideTip);
    });

    // --- BOTTOM: FASES DE IMPLANTACIÓN FÍSICA Y CONSTRUCTIVA (y=310, h=230) ---
    const gFases = svg.append('g').attr('transform', 'translate(35, 310)');
    gFases.append('rect').attr('width', 930).attr('height', 230).attr('rx', 14)
      .attr('fill', '#09101d').attr('stroke', 'rgba(56,189,248,0.3)').attr('stroke-width', 1.3);

    gFases.append('text').text('FASES DE IMPLANTACIÓN ARQUITECTÓNICA Y CONSTRUCTIVA (PLAN MAESTRO)')
      .attr('x', 20).attr('y', 26).attr('fill', '#38bdf8').attr('font-size', '11.5px').attr('font-weight', '800');
    gFases.append('text').text('Secuencia de obra, mecanización progresiva de carga y reconversión física de suelos')
      .attr('x', 20).attr('y', 41).attr('fill', '#94a3b8').attr('font-size', '10px');

    const FASES_ARQ = [
      {
        num: 'FASE 1 (Meses 1–12)', tit: 'Implantación Piloto & Muelle Mecánico', m2: '3.000 m² construidos',
        col: '#38bdf8', x: 20,
        items: [
          'Estructura modular desmontable de acero reciclado',
          'Instalación del muelle con cintas de descarga continua',
          'Primeras aulas técnicas para capacitar a los coteros'
        ],
        tip: '<b>Fase 1 Constructiva:</b> Edificación rápida en estructura de acero modular sobre lote aledaño a Corabastos. Se inicia la mecanización de carga pesada que sustituye el esfuerzo físico en la espalda.'
      },
      {
        num: 'FASE 2 (Meses 13–24)', tit: 'Bóvedas Biológicas & Silos Canasta', m2: '3.500 m² construidos',
        col: '#fb923c', x: 320,
        items: [
          'Construcción de cámaras climatizadas para Pleurotus',
          'Silos de acopio con ventilación pasiva para tubérculos',
          'Línea automatizada de empaque y canastas barriales'
        ],
        tip: '<b>Fase 2 Constructiva:</b> Se expande la nave hacia las bóvedas fúngicas y los silos. Se eliminan por completo los bultos a lomo y el producto sale empacado a las tiendas barriales.'
      },
      {
        num: 'FASE 3 (Meses 25–48)', tit: 'Borde Cívico & Comedor del Humedal', m2: '2.500 m² construidos',
        col: '#4ade80', x: 620,
        items: [
          'Comedor comunitario para 500 raciones diarias',
          'Plaza de mercado de cercanía y comercio justo',
          'Talud de fitodepuración y restauración ecológica'
        ],
        tip: '<b>Fase 3 Constructiva:</b> Remate cívico del complejo. Se entrega la plaza pública permeable, el comedor popular y los biofiltros que conectan con el Humedal El Burro.'
      }
    ];

    FASES_ARQ.forEach(fa => {
      const gF = gFases.append('g').attr('transform', `translate(${fa.x}, 55)`).style('cursor', 'pointer');
      gF.append('rect').attr('width', 285).attr('height', 155).attr('rx', 10)
        .attr('fill', '#111b2c').attr('stroke', fa.col + '50').attr('stroke-width', 1.2);

      gF.append('text').text(fa.num).attr('x', 14).attr('y', 22)
        .attr('fill', fa.col).attr('font-size', '9.5px').attr('font-weight', '800');
      gF.append('text').text(fa.tit).attr('x', 14).attr('y', 38)
        .attr('fill', '#fff').attr('font-size', '10.5px').attr('font-weight', '700');
      gF.append('text').text(fa.m2).attr('x', 14).attr('y', 52)
        .attr('fill', fa.col).attr('font-size', '9px').attr('font-weight', '600');

      fa.items.forEach((it, idx) => {
        gF.append('circle').attr('cx', 18).attr('cy', 74 + idx * 26).attr('r', 2.5).attr('fill', fa.col);
        gF.append('text').text(it).attr('x', 26).attr('y', 78 + idx * 26)
          .attr('fill', '#cbd5e1').attr('font-size', '8.5px');
      });

      gF.on('mouseenter', () => showTip(fa.num, fa.col, `${iconSvgHtml('plano', 18, fa.col)} ${fa.tit}`, fa.tip));
      gF.on('mouseleave', hideTip);
    });

    // Banner pie
    const bBanner = svg.append('g').attr('transform', 'translate(500, 565)');
    bBanner.append('rect').attr('x', -340).attr('y', -14).attr('width', 680).attr('height', 28).attr('rx', 14)
      .attr('fill', 'rgba(250,204,21,0.15)').attr('stroke', '#facc15').attr('stroke-width', 1.2);
    bBanner.append('text').text('✓ PROGRAMA ARQUITECTÓNICO TOTAL: 9.000 m² CONSTRUIDOS · CERO HUELLA ECOLÓGICA · RECONVERSIÓN LABORAL FORMAL')
      .attr('text-anchor', 'middle').attr('y', 4).attr('fill', '#facc15').attr('font-weight', '800').attr('font-size', '9.5px');
  }

  // Helper para hacer wrap de texto SVG
  function wrapSvgText(text, width) {
    text.each(function() {
      const textEl = d3.select(this);
      const words = textEl.text().split(/\s+/).reverse();
      let word;
      let line = [];
      let lineNumber = 0;
      const lineHeight = 1.2; // ems
      const y = textEl.attr('y');
      const x = textEl.attr('x');
      const dy = 0;
      let tspan = textEl.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', dy + 'em');
      while (word = words.pop()) {
        line.push(word);
        tspan.text(line.join(' '));
        if (tspan.node().getComputedTextLength && tspan.node().getComputedTextLength() > width) {
          line.pop();
          tspan.text(line.join(' '));
          line = [word];
          tspan = textEl.append('tspan').attr('x', x).attr('y', y).attr('dy', ++lineNumber * lineHeight + 'em').text(word);
        }
      }
    });
  }


  // --- LÓGICA DE CONTROL ---
  function setTab(tab) {
    if (tab !== 'funciona') stopAutoplay();
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

  // Detener animaciones cuando la vista se oculta
  const fedStage = document.getElementById('viewFederacion');
  if (fedStage && window.MutationObserver) {
    new MutationObserver(() => {
      if (fedStage.style.display === 'none') { stopAutoplay(); clearAnims(); }
    }).observe(fedStage, { attributes: true, attributeFilter: ['style'] });
  }

  // API Global
  window.FEDERACION_BIOTICA = {
    init: function (tab) {
      const stage = document.getElementById('viewFederacion');
      if (stage) stage.style.display = 'block';
      const valid = ['comparacion', 'funciona', 'sociobiotica', 'fases', 'canasta'];
      setTab(valid.includes(tab) ? tab : activeTab);
    },
    paso: function (i) { activeTab = 'funciona'; setTab('funciona'); goStep(i); }
  };

  setTimeout(renderView, 200);
})();
