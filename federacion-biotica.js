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
        <button class="fed-tab-btn" data-tab="metropolitano" id="btnTabMetro" style="color:#fde047;border-color:rgba(250,204,21,0.5);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
          4. Plano Bogotá (Fontibón - Kennedy)
        </button>
        <button class="fed-tab-btn" data-tab="fases">
          ${iconSvgHtml('plano', 13)} 5. Corte arquitectónico (9.000 m²)
        </button>
        <button class="fed-tab-btn" data-tab="canasta">
          ${iconSvgHtml('seccion', 13)} 6. Canasta y fases
        </button>
        <button class="fed-tab-btn" data-tab="burbujas" style="color:#0284c7;border:1px solid rgba(2,132,199,0.4);background:rgba(2,132,199,0.08);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><circle cx="12" cy="12" r="9"/><circle cx="8" cy="9" r="2.5"/><circle cx="16" cy="13" r="3"/><circle cx="11" cy="16" r="2"/></svg>
          7. Diagrama de relaciones
        </button>
        <button class="fed-tab-btn" data-tab="sintesis" style="color:#f43f5e;border:1px solid rgba(244,63,94,0.4);background:rgba(244,63,94,0.08);">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="3" x2="12" y2="21"/><path d="M7 8h2M7 12h2M7 16h2M15 8h2M15 12h2"/></svg>
          8. Tablero editorial (Síntesis)
        </button>
      </div>

      <div class="fed-filters-pill" id="fedFilters" style="display:none">
        <button class="ff-btn active" data-filter="all">Todo (19)</button>
        <button class="ff-btn" data-filter="persona">${iconSvgHtml('comunidad', 13)} Quiénes (6)</button>
        <button class="ff-btn" data-filter="lugar">${iconSvgHtml('hogar', 13)} Dónde (8)</button>
        <button class="ff-btn" data-filter="biotica">${iconSvgHtml('abeja', 13)} Para qué (5)</button>
      </div>
    </div>

    <div id="fedRealMap" style="position:absolute;left:20px;right:20px;top:54px;bottom:20px;border-radius:12px;overflow:hidden;border:1.5px solid #38bdf8;box-shadow:0 12px 36px rgba(0,0,0,0.7);display:none;z-index:10;"></div>
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
    const mapEl = document.getElementById('fedRealMap');
    const svgEl = document.getElementById('fedSvg');
    if (mapEl && activeTab !== 'metropolitano') mapEl.style.display = 'none';
    if (svgEl && activeTab !== 'metropolitano') svgEl.style.display = 'block';
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

    if (activeTab === 'metropolitano') renderPlanoMetropolitano(svg, showTip, hideTip);
    else if (activeTab === 'comparacion') renderComparacion(svg, showTip, hideTip);
    else if (activeTab === 'funciona') renderFunciona(svg, showTip, hideTip);
    else if (activeTab === 'fases') renderProgramaArquitectonico(svg, showTip, hideTip);
    else if (activeTab === 'canasta') renderArquitecturaCanasta(svg, showTip, hideTip);
    else if (activeTab === 'burbujas') renderDiagramaBurbujas(svg, 1000, 620, false);
    else if (activeTab === 'sintesis') renderSintesisEditorialBoard(svg, 1000, 620, false);
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
  
  // =========================================================================
  // 4. PLANO DE BOGOTÁ METROPOLITANO: IMPLANTACIÓN (FONTIBÓN - KENNEDY)
  // =========================================================================
  function renderPlanoMetropolitano(svg, showTip, hideTip) {
    const stage = document.getElementById('viewFederacion');
    const svgEl = document.getElementById('fedSvg');
    const mapDiv = document.getElementById('fedRealMap');
    if (!mapDiv) return;

    if (svgEl) svgEl.style.display = 'none';
    mapDiv.style.display = 'block';

    setTimeout(() => { if (window._fedRealMapInstance) window._fedRealMapInstance.resize(); }, 120);
    if (window._fedRealMapInstance) {
      window._fedRealMapInstance.resize();
      return;
    }

    mapDiv.innerHTML = '';

    // Switcher de capas flotante
    const swEl = document.createElement('div');
    swEl.style.cssText = 'position:absolute;top:14px;left:14px;z-index:20;display:flex;gap:6px;background:rgba(11,15,25,0.92);backdrop-filter:blur(8px);border:1px solid #334155;border-radius:20px;padding:3px 8px;box-shadow:0 8px 24px rgba(0,0,0,0.7)';
    swEl.innerHTML = `
      <button id="btnFedDark" style="background:#38bdf8;color:#0f172a;border:0;border-radius:12px;font:700 11px sans-serif;padding:3px 8px;cursor:pointer">🌙 Mapa Carto</button>
      <button id="btnFedSat" style="background:transparent;color:#94a3b8;border:0;border-radius:12px;font:600 11px sans-serif;padding:3px 8px;cursor:pointer">🛰️ Satélite Real</button>
    `;
    mapDiv.appendChild(swEl);

    // Tarjeta HUD informativa
    const hud = document.createElement('div');
    hud.style.cssText = 'position:absolute;right:14px;top:14px;max-width:360px;background:rgba(10,14,24,0.95);backdrop-filter:blur(12px);border:1.5px solid #facc15;border-radius:12px;padding:12px 16px;z-index:20;box-shadow:0 16px 36px rgba(0,0,0,0.85);color:#cbd5e1';
    hud.innerHTML = `
      <div style="font:800 10px 'JetBrains Mono',monospace;color:#facc15;letter-spacing:.08em;text-transform:uppercase">AQUÍ SE IMPLANTA EL PROYECTO</div>
      <div style="font:800 15px 'Instrument Sans',sans-serif;color:#fff;margin:2px 0">COMPLEJO BIOTECNOLÓGICO · 9.000 m²</div>
      <div style="font:700 11.5px 'Instrument Sans',sans-serif;color:#38bdf8;margin-bottom:8px">Borde de FONTIBÓN y al lado de KENNEDY</div>
      <div style="font:500 11px/1.4 'Instrument Sans',sans-serif;display:flex;flex-direction:column;gap:5px">
        <div><b style="color:#38bdf8">📍 Cerca de Fontibón:</b> Acceso directo a Calle 13 / Av. Centenario y zona industrial sin cruzar barrios.</div>
        <div><b style="color:#facc15">📍 Al lado de Kennedy:</b> Adyacente a Corabastos y al Humedal El Burro.</div>
        <div><b style="color:#4ade80">⚙️ Captación directa:</b> 300 t/día de rastrojos orgánicos sin sobrecostos de fletes.</div>
        <div><b style="color:#fb923c">🛒 Circuito corto:</b> Abastecimiento directo a 150 tiendas barriales y comedores.</div>
      </div>
    `;
    mapDiv.appendChild(hud);

    const map = new maplibregl.Map({
      container: 'fedRealMap',
      style: 'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',
      center: [-74.154, 4.643],
      zoom: 12.8,
      pitch: 35,
      bearing: -10,
      attributionControl: { compact: true }
    });
    window._fedRealMapInstance = map;

    map.addControl(new maplibregl.NavigationControl({ showCompass: true, showZoom: true }), 'bottom-right');

    const btnDark = document.getElementById('btnFedDark');
    const btnSat = document.getElementById('btnFedSat');
    btnDark.onclick = () => {
      btnDark.style.background = '#38bdf8'; btnDark.style.color = '#0f172a';
      btnSat.style.background = 'transparent'; btnSat.style.color = '#94a3b8';
      map.setStyle('https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json');
    };
    btnSat.onclick = () => {
      btnSat.style.background = '#38bdf8'; btnSat.style.color = '#0f172a';
      btnDark.style.background = 'transparent'; btnDark.style.color = '#94a3b8';
      map.setStyle({
        version: 8,
        sources: {
          'esri-sat': {
            type: 'raster',
            tiles: ['https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}'],
            tileSize: 256,
            attribution: 'Esri, Maxar'
          }
        },
        layers: [{ id: 'esri-sat-layer', type: 'raster', source: 'esri-sat', minzoom: 0, maxzoom: 19 }]
      });
    };

    map.on('style.load', () => {
      fetch('assets/territorio_kennedy.geojson')
        .then(r => r.json())
        .then(geoK => {
          if (!map.getSource('k-src')) {
            map.addSource('k-src', { type: 'geojson', data: geoK });
            map.addLayer({ id: 'k-fill', type: 'fill', source: 'k-src', paint: { 'fill-color': '#facc15', 'fill-opacity': 0.08 } });
            map.addLayer({ id: 'k-glow', type: 'line', source: 'k-src', paint: { 'line-color': '#facc15', 'line-width': 6, 'line-blur': 5, 'line-opacity': 0.35 } });
            map.addLayer({ id: 'k-line', type: 'line', source: 'k-src', paint: { 'line-color': '#facc15', 'line-width': 2, 'line-opacity': 0.85 } });
          }
        })
        .catch(e => console.log('Kennedy geojson load err', e));

      // Lote del Proyecto 9.000 m²
      const loteCoords = [
        [-74.1585, 4.6405],
        [-74.1565, 4.6405],
        [-74.1565, 4.6420],
        [-74.1585, 4.6420],
        [-74.1585, 4.6405]
      ];
      if (!map.getSource('lote-src')) {
        map.addSource('lote-src', {
          type: 'geojson',
          data: { type: 'Feature', geometry: { type: 'Polygon', coordinates: [loteCoords] } }
        });
        map.addLayer({ id: 'lote-fill', type: 'fill', source: 'lote-src', paint: { 'fill-color': '#38bdf8', 'fill-opacity': 0.45 } });
        map.addLayer({ id: 'lote-line', type: 'line', source: 'lote-src', paint: { 'line-color': '#fde047', 'line-width': 3 } });
      }

      // Marcadores HTML en mapa
      const pinEl = document.createElement('div');
      pinEl.innerHTML = `
        <div style="position:relative;display:flex;align-items:center;justify-content:center;cursor:pointer">
          <div style="position:absolute;width:44px;height:44px;border-radius:50%;background:rgba(253,224,71,0.3);border:2px solid #fde047;animation:fedPulse 2s infinite"></div>
          <div style="position:absolute;width:24px;height:24px;border-radius:50%;background:rgba(56,189,248,0.4);border:2px solid #38bdf8"></div>
          <div style="width:14px;height:14px;border-radius:50%;background:#fde047;border:2px solid #0f172a;box-shadow:0 0 10px #fde047"></div>
          <div style="position:absolute;top:22px;background:#0d131f;border:1.5px solid #fde047;border-radius:6px;padding:3px 8px;font:800 11px sans-serif;color:#fde047;white-space:nowrap;box-shadow:0 4px 12px rgba(0,0,0,0.8)">
            ★ LOTE PROYECTO (9.000 m²)
          </div>
        </div>
      `;
      new maplibregl.Marker({ element: pinEl }).setLngLat([-74.1575, 4.6412]).addTo(map);

      const corEl = document.createElement('div');
      corEl.style.cssText = 'background:rgba(15,23,42,0.9);border:1px solid #f87171;border-radius:6px;padding:2px 7px;font:700 10.5px sans-serif;color:#f87171;white-space:nowrap';
      corEl.textContent = '🛒 Corabastos';
      new maplibregl.Marker({ element: corEl }).setLngLat([-74.1590, 4.6295]).addTo(map);

      const humEl = document.createElement('div');
      humEl.style.cssText = 'background:rgba(15,23,42,0.9);border:1px solid #4ade80;border-radius:6px;padding:2px 7px;font:700 10.5px sans-serif;color:#4ade80;white-space:nowrap';
      humEl.textContent = '🌿 Humedal El Burro';
      new maplibregl.Marker({ element: humEl }).setLngLat([-74.1530, 4.6390]).addTo(map);

      const fonEl = document.createElement('div');
      fonEl.style.cssText = 'background:rgba(15,23,42,0.9);border:1.5px solid #38bdf8;border-radius:6px;padding:3px 8px;font:800 11px sans-serif;color:#38bdf8;white-space:nowrap';
      fonEl.textContent = '🏭 FONTIBÓN (Calle 13 / Zona Industrial)';
      new maplibregl.Marker({ element: fonEl }).setLngLat([-74.1480, 4.6650]).addTo(map);

      const fucEl = document.createElement('div');
      fucEl.style.cssText = 'background:rgba(15,23,42,0.85);border:1px solid #67e8f9;border-radius:6px;padding:2px 6px;font:700 9.5px sans-serif;color:#67e8f9;white-space:nowrap';
      fucEl.textContent = '💧 Río Fucha (Límite Fontibón - Kennedy)';
      new maplibregl.Marker({ element: fucEl }).setLngLat([-74.1620, 4.6465]).addTo(map);
    });
  }

  function renderProgramaArquitectonico(svg, showTip, hideTip) {
    let selZona = 'all';

    const ZONAS_DATA = [
      { id: 'A', nom: 'Zona A: Biorrefinería & Muelle Mecatrónico', m2: '2.800 m²', pct: '31%', col: '#fb923c', cota: '±0.00m',
        eq: 'Tolvas mecatrónicas y cintas continuas: fin de sacos a lomo para coteros y recicladores.' },
      { id: 'B', nom: 'Zona B: Bóvedas de Pleurotus', m2: '2.200 m²', pct: '24%', col: '#38bdf8', cota: '+4.50m',
        eq: 'Cámaras oscuras climatizadas: 40 ton/mes de proteína limpia sobre rastrojos orgánicos.' },
      { id: 'C', nom: 'Zona C: Silos de Carbohidratos', m2: '1.800 m²', pct: '20%', col: '#facc15', cota: '+9.00m',
        eq: 'Silos verticales con ventilación pasiva cruzada para papa pastusa y tubérculos andinos.' },
      { id: 'D', nom: 'Zona D: Reconversión Laboral', m2: '800 m²', pct: '9%', col: '#c084fc', cota: '+4.50m',
        eq: 'Aulas técnicas: 320 coteros y recicladores contratados formalmente como operadores.' },
      { id: 'E', nom: 'Zona E: Borde Cívico & Comedor', m2: '1.400 m²', pct: '16%', col: '#4ade80', cota: '±0.00m / -1.50m',
        eq: '500 raciones diarias, plaza de mercado barrial y biofiltros hacia el Humedal El Burro.' }
    ];

    // Encabezado limpio, con suficiente margen superior para no chocar con la topbar
    const header = svg.append('g').attr('transform', 'translate(500, 48)');
    header.append('text').text('CORTE BIOCLIMÁTICO TRANSVERSAL: COMPLEJO BIOTECNOLÓGICO (9.000 m²)')
      .attr('text-anchor', 'middle').attr('fill', '#38bdf8').attr('font-weight', '800').attr('font-size', '15px').attr('letter-spacing', '0.05em');
    header.append('text').text('Zonificación vertical, masa térmica pasiva y transición de cota: Corabastos → Humedal El Burro')
      .attr('text-anchor', 'middle').attr('fill', '#94a3b8').attr('font-size', '11px').attr('y', 17);

    // Botones de filtro de zona (y=80)
    const gFiltros = svg.append('g').attr('transform', 'translate(500, 84)');
    const botones = [
      { id: 'all', nom: 'Ver Todo (9.000 m²)', col: '#94a3b8' },
      ...ZONAS_DATA
    ];

    const btnWidths = [130, 160, 155, 155, 150, 155];
    let totalBtnW = btnWidths.reduce((a, b) => a + b + 6, -6);
    let curBtnX = -totalBtnW / 2;

    const btnEls = [];
    botones.forEach((b, i) => {
      const bw = btnWidths[i];
      const gBtn = gFiltros.append('g').attr('transform', `translate(${curBtnX}, 0)`).style('cursor', 'pointer');
      curBtnX += bw + 6;

      const bg = gBtn.append('rect').attr('width', bw).attr('height', 24).attr('rx', 12)
        .attr('fill', b.id === selZona ? b.col : '#111827')
        .attr('stroke', b.col).attr('stroke-width', b.id === selZona ? 1.8 : 1).attr('stroke-opacity', 0.6);

      const txt = gBtn.append('text').text(b.id === 'all' ? b.nom : b.nom.split(':')[0])
        .attr('x', bw / 2).attr('y', 15.5).attr('text-anchor', 'middle')
        .attr('fill', b.id === selZona ? (b.id === 'all' ? '#fff' : '#0a0e17') : '#cbd5e1')
        .attr('font-size', '10px').attr('font-weight', b.id === selZona ? '800' : '600');

      gBtn.on('click', () => {
        selZona = b.id;
        updateCorte();
      });
      btnEls.push({ gBtn, bg, txt, b });
    });

    // Marco del Corte Arquitectónico (y=118, h=390)
    const cX = 35, cY = 118, cW = 930, cH = 390;
    const gCorte = svg.append('g').attr('transform', `translate(${cX}, ${cY})`);

    gCorte.append('rect').attr('width', cW).attr('height', cH).attr('rx', 12)
      .attr('fill', '#090d15').attr('stroke', '#1e293b').attr('stroke-width', 1.4);

    // Eje de cotas y cuadrícula técnica arquitectónica
    const gGrid = gCorte.append('g').style('opacity', 0.35);
    const COTAS = [
      { y: 55, cota: '+13.50m', desc: 'Cubierta verde y captación' },
      { y: 130, cota: '+9.00m', desc: 'Silos y extracción solar' },
      { y: 210, cota: '+4.50m', desc: 'Bóvedas de micelio' },
      { y: 300, cota: '±0.00m', desc: 'Muelle y plaza' },
      { y: 360, cota: '-1.50m', desc: 'Humedal El Burro' }
    ];

    COTAS.forEach(c => {
      gGrid.append('line').attr('x1', 55).attr('y1', c.y).attr('x2', cW - 20).attr('y2', c.y)
        .attr('stroke', '#334155').attr('stroke-dasharray', '3 4');
      gCorte.append('text').text(c.cota).attr('x', 45).attr('y', c.y + 3.5).attr('text-anchor', 'end')
        .attr('fill', '#64748b').attr('font-size', '8.5px').attr('font-family', 'JetBrains Mono, monospace');
    });

    // Terreno y topografía natural
    gCorte.append('path')
      .attr('d', `M 50,300 L 680,300 Q 750,300 790,335 L 850,360 L ${cW - 20},360 L ${cW - 20},385 L 50,385 Z`)
      .attr('fill', '#0c1420').attr('stroke', '#334155').attr('stroke-width', 1.5);

    // Agua del Humedal El Burro
    gCorte.append('path')
      .attr('d', `M 820,360 L ${cW - 20},360 L ${cW - 20},385 L 820,385 Z`)
      .attr('fill', 'rgba(56,189,248,0.2)').attr('stroke', '#38bdf8').attr('stroke-width', 1);
    gCorte.append('text').text('HUMEDAL EL BURRO').attr('x', cW - 30).attr('y', 352).attr('text-anchor', 'end')
      .attr('fill', '#38bdf8').attr('font-size', '9px').attr('font-weight', '800');

    // Orientación
    gCorte.append('text').text('← NORTE: CORABASTOS / FONTIBÓN').attr('x', 60).attr('y', 22)
      .attr('fill', '#fb923c').attr('font-size', '10px').attr('font-weight', '700');
    gCorte.append('text').text('SUR: HUMEDAL EL BURRO / KENNEDY →').attr('x', cW - 30).attr('y', 22).attr('text-anchor', 'end')
      .attr('fill', '#4ade80').attr('font-size', '10px').attr('font-weight', '700');

    // Volúmenes de las 5 Zonas (Dibujo arquitectónico limpio sin texto superpuesto)
    const VOLUMENES = [
      {
        id: 'A', nom: 'ZONA A: BIORREFINERÍA', col: '#fb923c',
        path: 'M 70,300 L 70,165 L 260,165 L 260,300 Z',
        badgeX: 165, badgeY: 185, m2: '2.800 m² (31%)'
      },
      {
        id: 'B', nom: 'ZONA B: BÓVEDAS PLEUROTUS', col: '#38bdf8',
        path: 'M 270,210 L 270,105 L 510,105 L 510,210 Z',
        badgeX: 390, badgeY: 125, m2: '2.200 m² (24%)'
      },
      {
        id: 'C', nom: 'ZONA C: SILOS CARBOHIDRATOS', col: '#facc15',
        path: 'M 270,300 L 270,215 L 510,215 L 510,300 Z',
        badgeX: 390, badgeY: 235, m2: '1.800 m² (20%)'
      },
      {
        id: 'D', nom: 'ZONA D: RECONVERSIÓN LABORAL', col: '#c084fc',
        path: 'M 520,300 L 520,175 L 670,175 L 670,300 Z',
        badgeX: 595, badgeY: 195, m2: '800 m² (9%)'
      },
      {
        id: 'E', nom: 'ZONA E: BORDE CÍVICO COMEDOR', col: '#4ade80',
        path: 'M 680,300 L 680,205 L 810,235 L 810,335 L 750,335 Z',
        badgeX: 745, badgeY: 225, m2: '1.400 m² (16%)'
      }
    ];

    // Cubierta verde general inclinada a cota +13.50m
    gCorte.append('path')
      .attr('d', 'M 65,165 L 265,105 L 515,55 L 675,85 L 815,235')
      .attr('fill', 'none').attr('stroke', '#4ade80').attr('stroke-width', 3);
    gCorte.append('text').text('CUBIERTA VERDE PRODUCTIVA (1.500 m²) + CAPTACIÓN PLUVIAL')
      .attr('x', 400).attr('y', 48).attr('text-anchor', 'middle')
      .attr('fill', '#86efac').attr('font-size', '9.5px').attr('font-weight', '800');

    // Maquinaria técnica sin emojis
    // Cinta transportadora en Zona A (limpia, sin texto superpuesto)
    gCorte.append('line').attr('x1', 80).attr('y1', 290).attr('x2', 245).attr('y2', 205)
      .attr('stroke', '#fb923c').attr('stroke-width', 3.5).attr('stroke-dasharray', '6 4').attr('class', 'flowing');
    gCorte.append('circle').attr('cx', 85).attr('cy', 290).attr('r', 5).attr('fill', '#111827').attr('stroke', '#fb923c');
    gCorte.append('circle').attr('cx', 240).attr('cy', 208).attr('r', 5).attr('fill', '#111827').attr('stroke', '#fb923c');
    gCorte.append('text').text('Cinta mecánica continua').attr('x', 165).attr('y', 270).attr('text-anchor', 'middle')
      .attr('fill', '#fb923c').attr('font-size', '8px').attr('font-weight', '700');

    // Silos verticales en Zona C (limpios, sin colisiones)
    gCorte.append('rect').attr('x', 320).attr('y', 245).attr('width', 35).attr('height', 50).attr('rx', 4)
      .attr('fill', '#1a1810').attr('stroke', '#facc15').attr('stroke-width', 1.2);
    gCorte.append('rect').attr('x', 365).attr('y', 245).attr('width', 35).attr('height', 50).attr('rx', 4)
      .attr('fill', '#1a1810').attr('stroke', '#facc15').attr('stroke-width', 1.2);

    // Flujos bioclimáticos animados
    gCorte.append('path')
      .attr('d', `M ${cW - 40},345 C 720,320 600,270 450,280 C 350,290 200,290 80,290`)
      .attr('fill', 'none').attr('stroke', '#38bdf8').attr('stroke-width', 2.5)
      .attr('stroke-dasharray', '6 5').attr('class', 'flowing').attr('stroke-opacity', 0.7);
    gCorte.append('text').text('Brisa fresca del Humedal El Burro').attr('x', cW - 120).attr('y', 320)
      .attr('fill', '#38bdf8').attr('font-size', '8.5px').attr('font-weight', '700');

    // Chimenea solar
    gCorte.append('path')
      .attr('d', 'M 515,95 L 515,30')
      .attr('fill', 'none').attr('stroke', '#f87171').attr('stroke-width', 2)
      .attr('stroke-dasharray', '4 4').attr('class', 'flowing');

    // Generar áreas de zonas arquitectónicas limpias
    const zonaEls = [];
    VOLUMENES.forEach(v => {
      const gZ = gCorte.append('g').style('cursor', 'pointer');
      const poly = gZ.append('path').attr('d', v.path)
        .attr('fill', v.col).attr('fill-opacity', 0.12)
        .attr('stroke', v.col).attr('stroke-width', 1.8).attr('stroke-opacity', 0.7);

      // Badge superior de zona para que nunca se tape con las máquinas
      const gBadge = gZ.append('g').attr('transform', `translate(${v.badgeX}, ${v.badgeY})`);
      gBadge.append('rect').attr('x', -80).attr('y', -12).attr('width', 160).attr('height', 24).attr('rx', 12)
        .attr('fill', 'rgba(10,14,23,0.92)').attr('stroke', v.col).attr('stroke-width', 1.2);
      const tNom = gBadge.append('text').text(v.nom).attr('x', 0).attr('y', 3).attr('text-anchor', 'middle')
        .attr('fill', '#fff').attr('font-size', '8.5px').attr('font-weight', '800');

      gZ.on('click', () => {
        selZona = (selZona === v.id ? 'all' : v.id);
        updateCorte();
      });

      gZ.on('mouseenter', () => {
        const zd = ZONAS_DATA.find(x => x.id === v.id);
        showTip(v.nom, v.col, zd.m2, zd.eq);
      });
      gZ.on('mouseleave', hideTip);

      zonaEls.push({ gZ, poly, gBadge, tNom, v });
    });

    // Ficha técnica ubicada FUERA del dibujo, debajo del corte arquitectónico (y=518)
    const gFicha = svg.append('g').attr('transform', `translate(${mX}, 520)`);
    const fBg = gFicha.append('rect').attr('width', cW).attr('height', 52).attr('rx', 8)
      .attr('fill', '#0e1726').attr('stroke', '#38bdf8').attr('stroke-width', 1.2);
    const fTit = gFicha.append('text').attr('x', 18).attr('y', 20).attr('fill', '#fff').attr('font-size', '11px').attr('font-weight', '800');
    const fDesc = gFicha.append('text').attr('x', 18).attr('y', 36).attr('fill', '#94a3b8').attr('font-size', '9.5px');
    const fBtnCerrar = gFicha.append('text').text('Ver todas ✕').attr('x', cW - 20).attr('y', 28).attr('text-anchor', 'end')
      .attr('fill', '#38bdf8').attr('font-size', '9.5px').attr('font-weight', '700').style('cursor', 'pointer')
      .on('click', () => { selZona = 'all'; updateCorte(); });

    // Barra proporcional al pie (y=580)
    const gBarra = svg.append('g').attr('transform', `translate(${mX}, 582)`);
    let curBarX = 0;
    ZONAS_DATA.forEach(z => {
      const segW = (parseFloat(z.m2.replace('.', '')) / 9000) * cW;
      const gSeg = gBarra.append('g').attr('transform', `translate(${curBarX}, 0)`).style('cursor', 'pointer');
      curBarX += segW;

      gSeg.append('rect').attr('width', segW - 2).attr('height', 16).attr('rx', 4)
        .attr('fill', z.col).attr('fill-opacity', 0.85);
      gSeg.append('text').text(`${z.id} · ${z.pct}`).attr('x', (segW - 2) / 2).attr('y', 11.5).attr('text-anchor', 'middle')
        .attr('fill', '#0f172a').attr('font-size', '8px').attr('font-weight', '800');

      gSeg.on('click', () => {
        selZona = (selZona === z.id ? 'all' : z.id);
        updateCorte();
      });
      gSeg.on('mouseenter', () => showTip(z.nom, z.col, `${z.m2} (${z.pct})`, z.eq));
      gSeg.on('mouseleave', hideTip);
    });

    function updateCorte() {
      btnEls.forEach(({ bg, txt, b }) => {
        const isSel = b.id === selZona;
        bg.attr('fill', isSel ? b.col : '#111827')
          .attr('stroke-width', isSel ? 1.8 : 1);
        txt.attr('fill', isSel ? (b.id === 'all' ? '#fff' : '#0a0e17') : '#cbd5e1')
          .attr('font-weight', isSel ? '800' : '600');
      });

      zonaEls.forEach(({ poly, gBadge, tNom, v }) => {
        const active = selZona === 'all' || selZona === v.id;
        poly.attr('fill-opacity', active ? (selZona === v.id ? 0.35 : 0.14) : 0.03)
          .attr('stroke-width', active ? (selZona === v.id ? 2.8 : 1.8) : 0.8)
          .attr('stroke-opacity', active ? 1 : 0.2);
        gBadge.attr('opacity', active ? 1 : 0.25);
      });

      if (selZona === 'all') {
        fBg.attr('stroke', '#38bdf8');
        fTit.text('COMPLEJO TOTAL: 9.000 m² CUBIERTOS + 2.500 m² DE PARQUE Y RESTAURACIÓN DEL HUMEDAL');
        fDesc.text('Haz clic en cualquier zona del corte arquitectónico o en los botones superiores para inspeccionar su equipamiento.');
        fBtnCerrar.style('display', 'none');
      } else {
        const z = ZONAS_DATA.find(x => x.id === selZona);
        fBg.attr('stroke', z.col);
        fTit.text(`${z.nom.toUpperCase()} (${z.m2} · ${z.pct}) — COTA ${z.cota}`).attr('fill', z.col);
        fDesc.text(z.eq);
        fBtnCerrar.style('display', 'block');
      }
    }

    updateCorte();
  }


  function renderArquitecturaCanasta(svg, showTip, hideTip) {
    let activeSubMode = 'metabolismo'; // 'metabolismo' o 'fases'
    let curFase = 1; // 1, 2, 3
    let autoTimer = null;

    // Encabezado
    const header = svg.append('g').attr('transform', 'translate(500, 36)');
    header.append('text').text('ARQUITECTURA DE LA CANASTA & FASES DE IMPLANTACIÓN')
      .attr('text-anchor', 'middle').attr('fill', '#facc15').attr('font-weight', '800').attr('font-size', '14.5px').attr('letter-spacing', '0.05em');
    header.append('text').text('Metabolismo espacial de la nutrición popular y simulador dinámico de las 3 fases de obra')
      .attr('text-anchor', 'middle').attr('fill', '#94a3b8').attr('font-size', '11px').attr('y', 17);

    // Conmutador interactivo entre Vista de Metabolismo y Simulador de Fases
    const gSwitch = svg.append('g').attr('transform', 'translate(500, 72)');
    const btnMeta = gSwitch.append('g').attr('transform', 'translate(-195, 0)').style('cursor', 'pointer');
    const bgMeta = btnMeta.append('rect').attr('width', 190).attr('height', 26).attr('rx', 13);
    const txtMeta = btnMeta.append('text').text('🛒 1. Metabolismo de la Canasta').attr('x', 95).attr('y', 16.5).attr('text-anchor', 'middle')
      .attr('font-size', '10.5px');

    const btnFase = gSwitch.append('g').attr('transform', 'translate(5, 0)').style('cursor', 'pointer');
    const bgFase = btnFase.append('rect').attr('width', 190).attr('height', 26).attr('rx', 13);
    const txtFase = btnFase.append('text').text('🏗️ 2. Simulador de Fases (Obra)').attr('x', 95).attr('y', 16.5).attr('text-anchor', 'middle')
      .attr('font-size', '10.5px');

    btnMeta.on('click', () => { setSubMode('metabolismo'); });
    btnFase.on('click', () => { setSubMode('fases'); });

    // Contenedor dinámico del diagrama
    const gStage = svg.append('g').attr('transform', 'translate(35, 96)');

    function setSubMode(mode) {
      activeSubMode = mode;
      if (mode !== 'fases' && autoTimer) {
        clearInterval(autoTimer);
        autoTimer = null;
      }
      const isM = mode === 'metabolismo';
      bgMeta.attr('fill', isM ? '#facc15' : '#111827').attr('stroke', '#facc15').attr('stroke-width', isM ? 1.8 : 1);
      txtMeta.attr('fill', isM ? '#0a0e17' : '#cbd5e1').attr('font-weight', isM ? '800' : '600');

      bgFase.attr('fill', !isM ? '#38bdf8' : '#111827').attr('stroke', '#38bdf8').attr('stroke-width', !isM ? 1.8 : 1);
      txtFase.attr('fill', !isM ? '#0a0e17' : '#cbd5e1').attr('font-weight', !isM ? '800' : '600');

      gStage.selectAll('*').remove();
      if (isM) renderDiagramaMetabolismo();
      else renderSimuladorFases();
    }

    // =========================================================================
    // VISTA 1: DIAGRAMA METABÓLICO DE LA CANASTA (FLUJO CIRCULAR VIVO)
    // =========================================================================
    function renderDiagramaMetabolismo() {
      const cW = 930, cH = 460;
      gStage.append('rect').attr('width', cW).attr('height', cH).attr('rx', 12)
        .attr('fill', '#090d15').attr('stroke', 'rgba(250,204,21,0.35)').attr('stroke-width', 1.4);

      // 1. ORIGEN: Rastrojos de Corabastos & Humedal
      const gOrigen = gStage.append('g').attr('transform', 'translate(40, 160)');
      gOrigen.append('rect').attr('width', 130).attr('height', 140).attr('rx', 10)
        .attr('fill', '#111827').attr('stroke', '#fb923c').attr('stroke-width', 1.4);
      gOrigen.append('text').text('INSUMOS LOCALES').attr('x', 65).attr('y', 24).attr('text-anchor', 'middle')
        .attr('fill', '#fb923c').attr('font-size', '10px').attr('font-weight', '800');
      gOrigen.append('circle').attr('cx', 65).attr('cy', 62).attr('r', 24).attr('fill', '#1c2438').attr('stroke', '#fb923c');
      gOrigen.append('use').attr('href', '#ic-reciclaje').attr('x', 51).attr('y', 48).attr('width', 28).attr('height', 28).style('color', '#fb923c');
      gOrigen.append('text').text('300 t/día rastrojos').attr('x', 65).attr('y', 105).attr('text-anchor', 'middle')
        .attr('fill', '#e2e8f0').attr('font-size', '9.5px').attr('font-weight', '700');
      gOrigen.append('text').text('+ Agua lluvia humedal').attr('x', 65).attr('y', 122).attr('text-anchor', 'middle')
        .attr('fill', '#94a3b8').attr('font-size', '8.5px');

      // 2. CENTRO: LOS 3 MÓDULOS DE PRODUCCIÓN NUTRICIONAL
      const MODS = [
        {
          id: 'prot', nom: 'MÓDULO PROTEICO', sub: 'Pleurotus (2.200 m²)', col: '#ec4899', ic: 'hongo', y: 40,
          metrica: '40 ton/mes proteína', detalle: '22% proteína limpia bioasimilable',
          precio: 'Carne $32.000 vs Pleurotus $14.000/kg (-56%)'
        },
        {
          id: 'carb', nom: 'MÓDULO CARBOHIDRATOS', sub: 'Silos de Papa (1.800 m²)', col: '#facc15', ic: 'papa', y: 170,
          metrica: '120 ton/mes acopio', detalle: 'Ventilación pasiva · HR al 85%',
          precio: 'Pérdidas reducidas del 30% a <3%'
        },
        {
          id: 'veg', nom: 'MÓDULO VEGETAL', sub: 'Cubiertas Vivas (1.400 m²)', col: '#4ade80', ic: 'huerta', y: 300,
          metrica: '1.500 m² huertas verdes', detalle: 'Cosecha fresca en menos de 24h',
          precio: '100% agroecológico · Polinizado por humedal'
        }
      ];

      // Líneas de flujo desde insumos hacia los 3 módulos
      MODS.forEach(m => {
        gStage.append('path')
          .attr('d', `M 170,230 C 205,230 205,${m.y + 55} 240,${m.y + 55}`)
          .attr('fill', 'none').attr('stroke', m.col).attr('stroke-width', 2.2)
          .attr('stroke-dasharray', '5 4').attr('class', 'flowing').attr('stroke-opacity', 0.6);
      });

      MODS.forEach(m => {
        const gM = gStage.append('g').attr('transform', `translate(240, ${m.y})`).style('cursor', 'pointer');
        gM.append('rect').attr('width', 240).attr('height', 110).attr('rx', 10)
          .attr('fill', '#111827').attr('stroke', m.col).attr('stroke-width', 1.5);

        gM.append('circle').attr('cx', 32).attr('cy', 34).attr('r', 18).attr('fill', '#1e293b').attr('stroke', m.col);
        gM.append('use').attr('href', '#ic-' + m.ic).attr('x', 21).attr('y', 23).attr('width', 22).attr('height', 22).style('color', m.col);

        gM.append('text').text(m.nom).attr('x', 58).attr('y', 26).attr('fill', m.col).attr('font-size', '10.5px').attr('font-weight', '800');
        gM.append('text').text(m.sub).attr('x', 58).attr('y', 40).attr('fill', '#94a3b8').attr('font-size', '9px');

        gM.append('text').text(m.metrica).attr('x', 24).attr('y', 68).attr('fill', '#fff').attr('font-size', '10px').attr('font-weight', '700');
        gM.append('text').text(m.detalle).attr('x', 24).attr('y', 83).attr('fill', '#cbd5e1').attr('font-size', '8.5px');
        gM.append('text').text(m.precio).attr('x', 24).attr('y', 97).attr('fill', m.col).attr('font-size', '8px').attr('font-weight', '600');

        gM.on('mouseenter', () => showTip(m.nom, m.col, m.sub, `<b>Impacto:</b> ${m.detalle}<br><b>Economía:</b> ${m.precio}`));
        gM.on('mouseleave', hideTip);
      });

      // 3. NODO DE ENSAMBLE: LÍNEA MECATRÓNICA DE EMPAQUE
      const gEmpaque = gStage.append('g').attr('transform', 'translate(540, 160)');
      gEmpaque.append('rect').attr('width', 150).attr('height', 140).attr('rx', 12)
        .attr('fill', '#162032').attr('stroke', '#38bdf8').attr('stroke-width', 2);

      gEmpaque.append('text').text('LÍNEA MECATRÓNICA').attr('x', 75).attr('y', 22).attr('text-anchor', 'middle')
        .attr('fill', '#38bdf8').attr('font-size', '10px').attr('font-weight', '800');
      gEmpaque.append('text').text('EMPAQUE AL VACÍO').attr('x', 75).attr('y', 36).attr('text-anchor', 'middle')
        .attr('fill', '#fff').attr('font-size', '9.5px').attr('font-weight', '700');

      gEmpaque.append('circle').attr('cx', 75).attr('cy', 70).attr('r', 22).attr('fill', '#0e1726').attr('stroke', '#38bdf8');
      gEmpaque.append('use').attr('href', '#ic-canasta').attr('x', 61).attr('y', 56).attr('width', 28).attr('height', 28).style('color', '#38bdf8');

      gEmpaque.append('text').text('Cero bultos a lomo').attr('x', 75).attr('y', 108).attr('text-anchor', 'middle')
        .attr('fill', '#86efac').attr('font-size', '9px').attr('font-weight', '700');
      gEmpaque.append('text').text('Canastas de 12 kg paletizadas').attr('x', 75).attr('y', 124).attr('text-anchor', 'middle')
        .attr('fill', '#94a3b8').attr('font-size', '8px');

      // Líneas convergentes desde los 3 módulos hacia el empaque
      MODS.forEach(m => {
        gStage.append('path')
          .attr('d', `M 480,${m.y + 55} C 510,${m.y + 55} 510,230 540,230`)
          .attr('fill', 'none').attr('stroke', m.col).attr('stroke-width', 2.4)
          .attr('stroke-dasharray', '5 4').attr('class', 'flowing');
      });

      // 4. DISTRIBUCIÓN EN RED: 150 TIENDAS BARRIALES & COMEDORES
      const gDest = gStage.append('g').attr('transform', 'translate(740, 100)');
      gDest.append('rect').attr('width', 160).attr('height', 260).attr('rx', 12)
        .attr('fill', '#111b27').attr('stroke', '#4ade80').attr('stroke-width', 1.8);

      gDest.append('text').text('CIRCUITO CORTO').attr('x', 80).attr('y', 24).attr('text-anchor', 'middle')
        .attr('fill', '#4ade80').attr('font-size', '10.5px').attr('font-weight', '800');
      gDest.append('text').text('DISTRIBUCIÓN BARRIAL').attr('x', 80).attr('y', 40).attr('text-anchor', 'middle')
        .attr('fill', '#fff').attr('font-size', '10px').attr('font-weight', '700');

      // Nodos barriales
      const TIENDAS = [
        { nom: '150 Tiendas Barriales', d: 'Tintal, Patio Bonito, Dindalito', ic: 'tienda' },
        { nom: 'Comedores Populares', d: '500 raciones calientes diarias', ic: 'humedal' },
        { nom: 'Colegios Distritales', d: 'Refrigerios agroecológicos', ic: 'persona' }
      ];

      TIENDAS.forEach((td, idx) => {
        const yT = 60 + idx * 56;
        gDest.append('rect').attr('x', 10).attr('y', yT).attr('width', 140).attr('height', 46).attr('rx', 6)
          .attr('fill', '#172535').attr('stroke', '#4ade80').attr('stroke-opacity', 0.5);
        gDest.append('text').text(td.nom).attr('x', 18).attr('y', yT + 18)
          .attr('fill', '#e2e8f0').attr('font-size', '9.5px').attr('font-weight', '700');
        gDest.append('text').text(td.d).attr('x', 18).attr('y', yT + 33)
          .attr('fill', '#94a3b8').attr('font-size', '8px');
      });

      // Indicador grande de impacto popular
      const gImpacto = gDest.append('g').attr('transform', 'translate(80, 238)');
      gImpacto.append('rect').attr('x', -68).attr('y', -14).attr('width', 136).attr('height', 24).attr('rx', 12)
        .attr('fill', 'rgba(74,222,128,0.18)').attr('stroke', '#4ade80');
      gImpacto.append('text').text('AHORRO FAMILIAR -30%').attr('text-anchor', 'middle').attr('y', 3.5)
        .attr('fill', '#4ade80').attr('font-size', '9px').attr('font-weight', '800');

      // Líneas de flujo desde el empaque a la red de tiendas
      gStage.append('path')
        .attr('d', 'M 690,230 L 740,230')
        .attr('fill', 'none').attr('stroke', '#38bdf8').attr('stroke-width', 3)
        .attr('stroke-dasharray', '6 4').attr('class', 'flowing');

      // Banner resumen interactivo al pie
      const bPie = gStage.append('g').attr('transform', 'translate(465, 435)');
      bPie.append('rect').attr('x', -320).attr('y', -12).attr('width', 640).attr('height', 24).attr('rx', 12)
        .attr('fill', 'rgba(250,204,21,0.12)').attr('stroke', '#facc15').attr('stroke-width', 1.2);
      bPie.append('text').text('✓ CERO INTERMEDIACIÓN ESPECULATIVA · ALIMENTO FRESCO EN <24H · PROTEÍNA VEGETAL ACCESIBLE')
        .attr('text-anchor', 'middle').attr('y', 4).attr('fill', '#facc15').attr('font-size', '9.5px').attr('font-weight', '800');
    }

    // =========================================================================
    // VISTA 2: SIMULADOR INTERACTIVO DE FASES CONSTRUCTIVAS (PLAN MAESTRO)
    // =========================================================================
    function renderSimuladorFases() {
      const cW = 930, cH = 460;
      gStage.append('rect').attr('width', cW).attr('height', cH).attr('rx', 12)
        .attr('fill', '#090d15').attr('stroke', 'rgba(56,189,248,0.35)').attr('stroke-width', 1.4);

      const FASES_DATA = [
        {
          num: 1, nom: 'FASE 1: Nave Mecatrónica & Aulas Técnicas', tiempo: 'Meses 1 a 12', m2: '3.000 m² construidos (33%)', col: '#fb923c',
          hito: 'Cimentación y montaje de pórticos modulares de acero. Instalación de tolvas y cintas mecánicas. Inicio de aulas técnicas para coteros.',
          accion: 'FIN DE BULTOS A LOMO: los coteros se certifican y operan la maquinaria.'
        },
        {
          num: 2, nom: 'FASE 2: Bóvedas de Micelio & Silos Canasta', tiempo: 'Meses 13 a 24', m2: '6.500 m² acumulados (72%)', col: '#38bdf8',
          hito: 'Construcción de las bóvedas isotérmicas de Pleurotus y silos de papa. Montaje de la línea automatizada de empaque.',
          accion: '40 TON/MES DE PROTEÍNA: la Canasta Familiar sale empacada directo a 150 tiendas.'
        },
        {
          num: 3, nom: 'FASE 3: Borde Cívico & Comedor del Humedal', tiempo: 'Meses 25 a 48', m2: '9.000 m² totales (100% consolidado)', col: '#4ade80',
          hito: 'Construcción del comedor popular para 500 raciones, plaza cívica de mercado y talud de fitodepuración hacia el humedal.',
          accion: 'RESTAURACIÓN ECOLÓGICA: vertimiento cero al Humedal El Burro y cogestión comunitaria.'
        }
      ];

      // Barra de pestañas de Fase
      const gFaseBtns = gStage.append('g').attr('transform', 'translate(465, 25)');
      const faseBtnEls = [];

      FASES_DATA.forEach((fa, idx) => {
        const xF = -380 + idx * 260;
        const gFb = gFaseBtns.append('g').attr('transform', `translate(${xF}, 0)`).style('cursor', 'pointer');
        const bg = gFb.append('rect').attr('width', 240).attr('height', 28).attr('rx', 14);
        const txt = gFb.append('text').text(`Fase ${fa.num}: ${fa.tiempo}`).attr('x', 120).attr('y', 18).attr('text-anchor', 'middle')
          .attr('font-size', '10.5px');

        gFb.on('click', () => {
          curFase = fa.num;
          updateFaseView();
        });
        faseBtnEls.push({ bg, txt, fa });
      });

      // Canvas arquitectónico donde evoluciona el edificio físicamente
      const gEvo = gStage.append('g').attr('transform', 'translate(40, 75)');
      const eW = 850, eH = 265;
      gEvo.append('rect').attr('width', eW).attr('height', eH).attr('rx', 10)
        .attr('fill', '#0c121d').attr('stroke', '#1e293b').attr('stroke-width', 1.2);

      // Suelo y niveles
      gEvo.append('line').attr('x1', 30).attr('y1', 210).attr('x2', eW - 30).attr('y2', 210)
        .attr('stroke', '#334155').attr('stroke-width', 2);
      gEvo.append('text').text('Cota ±0.00m (Suelo firme)').attr('x', 40).attr('y', 228).attr('fill', '#64748b').attr('font-size', '8.5px');
      gEvo.append('text').text('Hacia Humedal El Burro →').attr('x', eW - 40).attr('y', 228).attr('text-anchor', 'end').attr('fill', '#38bdf8').attr('font-size', '8.5px');

      // Elementos constructivos evolutivos
      const gFase1D = gEvo.append('g'); // Elementos Fase 1
      const gFase2D = gEvo.append('g'); // Elementos Fase 2
      const gFase3D = gEvo.append('g'); // Elementos Fase 3

      // DIBUJO FASE 1: Pórticos y Nave Modular (Muelle mecatrónico)
      gFase1D.append('rect').attr('x', 60).attr('y', 90).attr('width', 240).attr('height', 120)
        .attr('fill', 'rgba(251,146,60,0.15)').attr('stroke', '#fb923c').attr('stroke-width', 2);
      // Pórticos estructurales
      for (let p = 0; p < 4; p++) {
        gFase1D.append('line').attr('x1', 70 + p * 70).attr('y1', 90).attr('x2', 70 + p * 70).attr('y2', 210)
          .attr('stroke', '#fb923c').attr('stroke-width', 2).attr('stroke-opacity', 0.8);
      }
      gFase1D.append('text').text('NAVE MECATRÓNICA MODULAR').attr('x', 180).attr('y', 135).attr('text-anchor', 'middle')
        .attr('fill', '#fb923c').attr('font-size', '10px').attr('font-weight', '800');
      gFase1D.append('text').text('Tolvas + Cintas continuas + Aulas técnicas').attr('x', 180).attr('y', 155).attr('text-anchor', 'middle')
        .attr('fill', '#e2e8f0').attr('font-size', '8.5px');

      // DIBUJO FASE 2: Bóvedas de Pleurotus y Silos
      gFase2D.append('rect').attr('x', 320).attr('y', 50).attr('width', 260).attr('height', 160)
        .attr('fill', 'rgba(56,189,248,0.15)').attr('stroke', '#38bdf8').attr('stroke-width', 2);
      // Silos
      gFase2D.append('rect').attr('x', 335).attr('y', 70).attr('width', 50).attr('height', 100).attr('rx', 6)
        .attr('fill', '#162338').attr('stroke', '#38bdf8').attr('stroke-width', 1.5);
      gFase2D.append('rect').attr('x', 400).attr('y', 70).attr('width', 50).attr('height', 100).attr('rx', 6)
        .attr('fill', '#162338').attr('stroke', '#38bdf8').attr('stroke-width', 1.5);
      gFase2D.append('text').text('BÓVEDAS & SILOS').attr('x', 450).attr('y', 110).attr('text-anchor', 'middle')
        .attr('fill', '#38bdf8').attr('font-size', '10px').attr('font-weight', '800');
      gFase2D.append('text').text('Pleurotus 40 t/mes + Empacadora').attr('x', 450).attr('y', 130).attr('text-anchor', 'middle')
        .attr('fill', '#e2e8f0').attr('font-size', '8.5px');

      // DIBUJO FASE 3: Borde Cívico, Comedor Popular y Humedal
      gFase3D.append('rect').attr('x', 600).attr('y', 110).attr('width', 200).attr('height', 100)
        .attr('fill', 'rgba(74,222,128,0.15)').attr('stroke', '#4ade80').attr('stroke-width', 2);
      gFase3D.append('text').text('COMEDOR & BORDE CÍVICO').attr('x', 700).attr('y', 150).attr('text-anchor', 'middle')
        .attr('fill', '#4ade80').attr('font-size', '10px').attr('font-weight', '800');
      gFase3D.append('text').text('500 raciones + Biofiltros').attr('x', 700).attr('y', 170).attr('text-anchor', 'middle')
        .attr('fill', '#e2e8f0').attr('font-size', '8.5px');
      // Talud escalonado con agua
      gFase3D.append('path').attr('d', 'M 790,210 L 830,225 L 830,240')
        .attr('fill', 'none').attr('stroke', '#4ade80').attr('stroke-width', 2);

      // Panel de estado e indicadores de la fase activa
      const gInfoFase = gStage.append('g').attr('transform', 'translate(40, 360)');
      const fBox = gInfoFase.append('rect').attr('width', 850).attr('height', 75).attr('rx', 10)
        .attr('fill', '#111827').attr('stroke', '#38bdf8').attr('stroke-width', 1.5);

      const fNum = gInfoFase.append('text').attr('x', 20).attr('y', 24).attr('fill', '#38bdf8').attr('font-size', '12px').attr('font-weight', '800');
      const fM2 = gInfoFase.append('text').attr('x', 360).attr('y', 24).attr('fill', '#fff').attr('font-size', '11px').attr('font-weight', '700');
      const fHito = gInfoFase.append('text').attr('x', 20).attr('y', 44).attr('fill', '#cbd5e1').attr('font-size', '9.5px');
      const fAccion = gInfoFase.append('text').attr('x', 20).attr('y', 62).attr('fill', '#86efac').attr('font-size', '9.5px').attr('font-weight', '700');

      function updateFaseView() {
        const fa = FASES_DATA.find(x => x.num === curFase);

        faseBtnEls.forEach(({ bg, txt, fa: f }) => {
          const isSel = f.num === curFase;
          bg.attr('fill', isSel ? f.col : '#111827').attr('stroke', f.col).attr('stroke-width', isSel ? 1.8 : 1);
          txt.attr('fill', isSel ? '#0f172a' : '#cbd5e1').attr('font-weight', isSel ? '800' : '600');
        });

        // Actualizar visualización evolutiva del edificio
        // Fase 1 siempre visible
        gFase1D.transition().duration(500).style('opacity', 1);

        // Fase 2: visible si curFase >= 2, tenue si curFase === 1
        if (curFase >= 2) {
          gFase2D.transition().duration(500).style('opacity', 1);
          gFase2D.select('rect').attr('stroke-dasharray', null);
        } else {
          gFase2D.transition().duration(500).style('opacity', 0.25);
          gFase2D.select('rect').attr('stroke-dasharray', '4 4');
        }

        // Fase 3: visible si curFase === 3, tenue si curFase < 3
        if (curFase >= 3) {
          gFase3D.transition().duration(500).style('opacity', 1);
          gFase3D.select('rect').attr('stroke-dasharray', null);
        } else {
          gFase3D.transition().duration(500).style('opacity', 0.25);
          gFase3D.select('rect').attr('stroke-dasharray', '4 4');
        }

        // Actualizar panel de información
        fBox.attr('stroke', fa.col);
        fNum.text(`${fa.nom.toUpperCase()} (${fa.tiempo})`).attr('fill', fa.col);
        fM2.text(fa.m2);
        fHito.text(`Obra física: ${fa.hito}`);
        fAccion.text(`Impacto: ${fa.accion}`).attr('fill', fa.col);
      }

      updateFaseView();
    }

    setSubMode(window.FED_SUB === 'fases' ? 'fases' : 'metabolismo');
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
    init: function (tab, sub) {
      window.FED_SUB = sub || null;
      const stage = document.getElementById('viewFederacion');
      if (stage) stage.style.display = 'block';
      const valid = ['comparacion', 'funciona', 'sociobiotica', 'metropolitano', 'fases', 'canasta', 'sintesis', 'burbujas'];
      setTab(valid.includes(tab) ? tab : activeTab);
    },
    paso: function (i) { activeTab = 'funciona'; setTab('funciona'); goStep(i); }
  };

  setTimeout(renderView, 200);
})();



/* =========================================================================
   TABLERO EDITORIAL DE SÍNTESIS (SPREAD MONOGRAFÍA / ALTA DENSIDAD)
   Inspirado en diseño editorial de dos páginas, alto contraste y KPIs clave.
   ========================================================================= */
function renderSintesisEditorialBoard(svg, W, H, P) {
  // Configuración de lienzo escalable a 1000x620
  const gRoot = svg.append('g').attr('class', 'sintesis-editorial-board');
  const baseW = 1000, baseH = 620;
  if (W && H && (W !== baseW || H !== baseH)) {
    const s = Math.min(W / baseW, H / baseH);
    const dx = (W - baseW * s) / 2;
    const dy = (H - baseH * s) / 2;
    gRoot.attr('transform', `translate(${dx},${dy}) scale(${s})`);
  }

  // Defs: Patrones y sombras
  const defs = svg.select('defs').empty() ? svg.append('defs') : svg.select('defs');
  if (defs.select('#patHatchDonut').empty()) {
    defs.append('pattern')
      .attr('id', 'patHatchDonut').attr('width', 6).attr('height', 6)
      .attr('patternTransform', 'rotate(45 0 0)').attr('patternUnits', 'userSpaceOnUse')
      .append('line').attr('x1', 0).attr('y1', 0).attr('x2', 0).attr('y2', 6)
      .attr('stroke', '#94a3b8').attr('stroke-width', 1.4);
  }
  if (defs.select('#spineGrad').empty()) {
    const sg = defs.append('linearGradient').attr('id', 'spineGrad').attr('x1', '0').attr('y1', '0').attr('x2', '1').attr('y2', '0');
    sg.append('stop').attr('offset', '0%').attr('stop-color', 'rgba(0,0,0,0.18)');
    sg.append('stop').attr('offset', '50%').attr('stop-color', 'rgba(0,0,0,0.02)');
    sg.append('stop').attr('offset', '100%').attr('stop-color', 'rgba(0,0,0,0.18)');
  }
  if (defs.select('#bookDropShadow').empty()) {
    const fil = defs.append('filter').attr('id', 'bookDropShadow').attr('x', '-5%').attr('y', '-5%').attr('width', '110%').attr('height', '110%');
    fil.append('feDropShadow').attr('dx', 0).attr('dy', 8).attr('stdDeviation', 12).attr('flood-color', '#000').attr('flood-opacity', '0.45');
  }

  // Fondo general del presenter (oscuro sofisticado)
  gRoot.append('rect').attr('width', baseW).attr('height', baseH).attr('fill', '#0b0e14');

  // --- MONOGRAFÍA DE DOBLE PÁGINA (SPREAD) ---
  const bX = 24, bY = 16, bW = 952, bH = 588;
  const pW = (bW - 8) / 2; // ~472px cada página

  // Sombra exterior del libro
  gRoot.append('rect').attr('x', bX).attr('y', bY).attr('width', bW).attr('height', bH).attr('rx', 4)
    .attr('fill', '#000').attr('filter', 'url(#bookDropShadow)');

  // Página Izquierda (Paper warm ivory)
  gRoot.append('rect').attr('x', bX).attr('y', bY).attr('width', pW).attr('height', bH).attr('rx', 3)
    .attr('fill', '#f7f6f0').attr('stroke', '#e4e0d5').attr('stroke-width', 1);

  // Página Derecha (Paper warm ivory)
  gRoot.append('rect').attr('x', bX + pW + 8).attr('y', bY).attr('width', pW).attr('height', bH).attr('rx', 3)
    .attr('fill', '#f7f6f0').attr('stroke', '#e4e0d5').attr('stroke-width', 1);

  // Pliegue central del libro (spine crease shadow)
  gRoot.append('rect').attr('x', bX + pW - 14).attr('y', bY).attr('width', 36).attr('height', bH)
    .attr('fill', 'url(#spineGrad)').style('pointer-events', 'none');
  gRoot.append('line').attr('x1', bX + pW + 4).attr('y1', bY + 4).attr('x2', bX + pW + 4).attr('y2', bY + bH - 4)
    .attr('stroke', 'rgba(0,0,0,0.12)').attr('stroke-width', 1);

  // =========================================================================
  // PÁGINA IZQUIERDA (FOLIO 04)
  // =========================================================================
  const lX = bX + 22; // Margen izquierdo = 46

  // Folio superior izquierdo
  gRoot.append('text').text('COMPLEJO BIOTECNOLÓGICO URBANO · BOGOTÁ D.C.')
    .attr('x', lX).attr('y', bY + 24)
    .attr('fill', '#78716c').attr('font-size', '8px').attr('font-family', 'JetBrains Mono, monospace')
    .attr('font-weight', '700').attr('letter-spacing', '0.12em');

  // DONUT 1: Canasta Familiar - Proteína (26% carmine red / 74% hatched)
  const d1X = lX + 44, d1Y = bY + 76;
  const gDonut1 = gRoot.append('g').attr('transform', `translate(${d1X},${d1Y})`);
  const arcG1 = d3.arc().innerRadius(22).outerRadius(36);

  // Rebanada roja (26%)
  gDonut1.append('path')
    .attr('d', arcG1({ startAngle: 0, endAngle: 0.26 * 2 * Math.PI }))
    .attr('fill', '#dc2626');
  // Rebanada achurada (74%)
  gDonut1.append('path')
    .attr('d', arcG1({ startAngle: 0.26 * 2 * Math.PI, endAngle: 2 * Math.PI }))
    .attr('fill', 'url(#patHatchDonut)').attr('stroke', '#94a3b8').attr('stroke-width', 0.8);
  // Texto central
  gDonut1.append('text').text('26%').attr('y', 4).attr('text-anchor', 'middle')
    .attr('fill', '#111827').attr('font-size', '11.5px').attr('font-weight', '800').attr('font-family', 'JetBrains Mono, monospace');

  // Textos Donut 1
  const t1X = d1X + 48;
  gRoot.append('text').text('[ DANE / ENSIN ]').attr('x', t1X).attr('y', d1Y - 18)
    .attr('fill', '#dc2626').attr('font-size', '7.5px').attr('font-family', 'JetBrains Mono, monospace').attr('font-weight', '700');
  gRoot.append('text').text('CANASTA FAMILIAR · PROTEÍNA').attr('x', t1X).attr('y', d1Y - 5)
    .attr('fill', '#111827').attr('font-size', '10.5px').attr('font-weight', '800').attr('letter-spacing', '0.04em');
  gRoot.append('text').text('40 t/mes de micoproteína Pleurotus cultivada').attr('x', t1X).attr('y', d1Y + 9)
    .attr('fill', '#4b5563').attr('font-size', '8px');
  gRoot.append('text').text('sobre rastrojos orgánicos. Sustituye carne a').attr('x', t1X).attr('y', d1Y + 20)
    .attr('fill', '#4b5563').attr('font-size', '8px');
  gRoot.append('text').text('un costo 40% menor con 22% proteína bioasimilable.').attr('x', t1X).attr('y', d1Y + 31)
    .attr('fill', '#4b5563').attr('font-size', '8px').attr('font-weight', '600');

  // DONUT 2: Reducción Directa del Gasto (36% carmine red / 64% hatched)
  const d2X = lX + 44, d2Y = bY + 168;
  const gDonut2 = gRoot.append('g').attr('transform', `translate(${d2X},${d2Y})`);
  const arcG2 = d3.arc().innerRadius(22).outerRadius(36);

  gDonut2.append('path')
    .attr('d', arcG2({ startAngle: 0, endAngle: 0.36 * 2 * Math.PI }))
    .attr('fill', '#dc2626');
  gDonut2.append('path')
    .attr('d', arcG2({ startAngle: 0.36 * 2 * Math.PI, endAngle: 2 * Math.PI }))
    .attr('fill', 'url(#patHatchDonut)').attr('stroke', '#94a3b8').attr('stroke-width', 0.8);
  gDonut2.append('text').text('36%').attr('y', 4).attr('text-anchor', 'middle')
    .attr('fill', '#111827').attr('font-size', '11.5px').attr('font-weight', '800').attr('font-family', 'JetBrains Mono, monospace');

  // Textos Donut 2
  const t2X = d2X + 48;
  gRoot.append('text').text('[ CIRCUITO DIRECTO ]').attr('x', t2X).attr('y', d2Y - 18)
    .attr('fill', '#dc2626').attr('font-size', '7.5px').attr('font-family', 'JetBrains Mono, monospace').attr('font-weight', '700');
  gRoot.append('text').text('REDUCCIÓN DIRECTA DEL GASTO').attr('x', t2X).attr('y', d2Y - 5)
    .attr('fill', '#111827').attr('font-size', '10.5px').attr('font-weight', '800').attr('letter-spacing', '0.04em');
  gRoot.append('text').text('Ahorro directo en 150 tiendas y comedores al').attr('x', t2X).attr('y', d2Y + 9)
    .attr('fill', '#4b5563').attr('font-size', '8px');
  gRoot.append('text').text('eliminar intermediación mayorista especulativa.').attr('x', t2X).attr('y', d2Y + 20)
    .attr('fill', '#4b5563').attr('font-size', '8px');
  gRoot.append('text').text('Silos pasivos reducen merma de papa de 30% a <3%.').attr('x', t2X).attr('y', d2Y + 31)
    .attr('fill', '#4b5563').attr('font-size', '8px').attr('font-weight', '600');

  // Línea divisoria izquierda
  gRoot.append('line').attr('x1', lX).attr('y1', bY + 224).attr('x2', bX + pW - 20).attr('y2', bY + 224)
    .attr('stroke', '#e5e2d9').attr('stroke-width', 1);

  // COLUMNA DE MÉTRICAS GIGANTES (con cuadrados rojos al estilo de la referencia)
  const kpiX = lX;
  const KPIS_LEFT = [
    { num: '9.000', unit: 'm²', lab: 'Área cubierta construida del complejo' },
    { num: '320*', unit: 'pers', lab: 'Coteros y recicladores en nómina mecatrónica' },
    { num: '150', unit: 'nodos', lab: 'Tiendas de barrio y comedores en red' },
    { num: '0 L', unit: 'vert', lab: 'Cero vertimientos contaminantes al humedal' }
  ];

  let curKpiY = bY + 248;
  KPIS_LEFT.forEach((kp, i) => {
    // Cuadradito rojo
    gRoot.append('rect').attr('x', kpiX).attr('y', curKpiY - 14).attr('width', 6).attr('height', 6).attr('fill', '#dc2626');
    // Etiqueta superior
    gRoot.append('text').text(kp.lab).attr('x', kpiX + 14).attr('y', curKpiY - 9)
      .attr('fill', '#6b7280').attr('font-size', '7.5px').attr('font-weight', '600');
    // Número gigante
    gRoot.append('text').text(kp.num).attr('x', kpiX + 14).attr('y', curKpiY + 12)
      .attr('fill', '#111827').attr('font-size', '20px').attr('font-weight', '900')
      .attr('font-family', 'JetBrains Mono, monospace').attr('letter-spacing', '-0.02em');
    // Unidad
    gRoot.append('text').text(kp.unit).attr('x', kpiX + 90).attr('y', curKpiY + 12)
      .attr('fill', '#dc2626').attr('font-size', '9px').attr('font-weight', '800').attr('font-family', 'JetBrains Mono, monospace');

    curKpiY += 42;
  });

  // VIÑETA INFERIOR: SILUETA DE MONTAÑA / CORTE ARQUITECTÓNICO CON ANILLOS DIANA
  // (Replica la ilustración de la montaña con target rings del libro)
  const vX = lX, vY = bY + 420, vW = 185, vH = 135;
  const gVignette = gRoot.append('g').attr('transform', `translate(${vX},${vY})`);

  // Marco de la viñeta
  gVignette.append('rect').attr('width', vW).attr('height', vH).attr('rx', 4)
    .attr('fill', '#f0eee6').attr('stroke', '#dfdbce').attr('stroke-width', 1);

  // Silueta arquitectónica en gris oscuro / negro
  gVignette.append('path')
    .attr('d', 'M 10,75 L 35,45 L 75,45 L 115,25 L 145,55 L 175,75 L 175,80 L 10,80 Z')
    .attr('fill', '#18181b');
  gVignette.append('path')
    .attr('d', 'M 40,75 L 60,35 L 85,35 L 105,75 Z')
    .attr('fill', '#27272a');

  // Diana concéntrica (Target rings) en el punto de contacto biótico
  const tgX = 65, tgY = 58;
  gVignette.append('circle').attr('cx', tgX).attr('cy', tgY).attr('r', 18).attr('fill', 'none').attr('stroke', '#dc2626').attr('stroke-width', 3);
  gVignette.append('circle').attr('cx', tgX).attr('cy', tgY).attr('r', 11).attr('fill', 'none').attr('stroke', '#fff').attr('stroke-width', 2);
  gVignette.append('circle').attr('cx', tgX).attr('cy', tgY).attr('r', 5).attr('fill', '#dc2626');

  // Pin con banderín
  gVignette.append('line').attr('x1', tgX).attr('y1', tgY - 18).attr('x2', tgX).attr('y2', tgY - 36).attr('stroke', '#dc2626').attr('stroke-width', 1.8);
  gVignette.append('circle').attr('cx', tgX).attr('cy', tgY - 38).attr('r', 4.5).attr('fill', '#dc2626');

  // Tarjeta de la viñeta
  gVignette.append('rect').attr('x', 8).attr('y', 86).attr('width', vW - 16).attr('height', 42).attr('rx', 3)
    .attr('fill', '#fff').attr('stroke', '#e5e2d9').attr('stroke-width', 0.8);
  gVignette.append('text').text('● CORTE BIOCLIMÁTICO — 12:00 PM').attr('x', 14).attr('y', 99)
    .attr('fill', '#dc2626').attr('font-size', '7.5px').attr('font-weight', '800').attr('font-family', 'JetBrains Mono, monospace');
  gVignette.append('text').text('Bóvedas con inercia térmica pasiva y talud').attr('x', 14).attr('y', 111)
    .attr('fill', '#4b5563').attr('font-size', '7px');
  gVignette.append('text').text('de fitodepuración hacia Humedal El Burro.').attr('x', 14).attr('y', 121)
    .attr('fill', '#4b5563').attr('font-size', '7px').attr('font-weight', '600');

  // Folio número de página abajo a la izquierda
  gRoot.append('text').text('04 · SÍNTESIS DE LA PROPUESTA').attr('x', lX).attr('y', bY + bH - 12)
    .attr('fill', '#a8a29e').attr('font-size', '8px').attr('font-family', 'JetBrains Mono, monospace');

  // =========================================================================
  // BLOQUE CENTRAL: MAPA CARTOGRÁFICO DE ALTO CONTRASTE (SPREAD OVERLAP)
  // Ubicado a caballo entre la página izquierda y derecha, igual que en el libro
  // =========================================================================
  const mapX = bX + 215, mapY = bY + 36, mapW = 390, mapH = 515;
  const gMap = gRoot.append('g').attr('transform', `translate(${mapX},${mapY})`);

  // Caja oscura del mapa (charcoal negro)
  gMap.append('rect').attr('width', mapW).attr('height', mapH).attr('rx', 4)
    .attr('fill', '#111827').attr('stroke', '#374151').attr('stroke-width', 1.2);

  // Cuadrícula técnica cartográfica
  const gMGrid = gMap.append('g').style('opacity', 0.22);
  for (let x = 30; x < mapW; x += 60) {
    gMGrid.append('line').attr('x1', x).attr('y1', 10).attr('x2', x).attr('y2', mapH - 10).attr('stroke', '#64748b').attr('stroke-dasharray', '2 3');
  }
  for (let y = 30; y < mapH; y += 50) {
    gMGrid.append('line').attr('x1', 10).attr('y1', y).attr('x2', mapW - 10).attr('y2', y).attr('stroke', '#64748b').attr('stroke-dasharray', '2 3');
  }

  // Río Bogotá (límite occidental)
  gMap.append('path')
    .attr('d', 'M 40,20 Q 25,110 35,210 Q 15,310 30,420 Q 15,470 25,500')
    .attr('fill', 'none').attr('stroke', '#0284c7').attr('stroke-width', 2.5).attr('stroke-dasharray', '5 3');
  gMap.append('text').text('RÍO BOGOTÁ (OESTE)').attr('transform', 'translate(18, 260) rotate(-90)')
    .attr('fill', '#38bdf8').attr('font-size', '6.5px').attr('font-family', 'JetBrains Mono, monospace').attr('letter-spacing', '0.1em');

  // Cerros orientales (límite oriental)
  gMap.append('path')
    .attr('d', 'M 350,20 Q 365,140 355,260 Q 370,380 350,500')
    .attr('fill', 'none').attr('stroke', '#059669').attr('stroke-width', 1.5).attr('stroke-dasharray', '4 4');

  // POLÍGONO DE FONTIBÓN (Norte - delineado cian)
  gMap.append('path')
    .attr('d', 'M 70,160 L 160,150 L 230,165 L 220,225 L 140,230 L 65,210 Z')
    .attr('fill', 'rgba(56,189,248,0.12)').attr('stroke', '#38bdf8').attr('stroke-width', 1.5);
  gMap.append('text').text('FONTIBÓN').attr('x', 145).attr('y', 190).attr('text-anchor', 'middle')
    .attr('fill', '#38bdf8').attr('font-size', '9.5px').attr('font-weight', '800').attr('letter-spacing', '0.08em');
  gMap.append('text').text('Corredor Carga Calle 13').attr('x', 145).attr('y', 202).attr('text-anchor', 'middle')
    .attr('fill', '#94a3b8').attr('font-size', '6.5px');

  // POLÍGONO DE KENNEDY (Sur - RESALTADO EN ROJO CARMÍN SÓLIDO, COMO LA INDIA EN EL LIBRO)
  gMap.append('path')
    .attr('d', 'M 65,210 L 140,230 L 220,225 L 250,320 L 160,345 L 55,295 Z')
    .attr('fill', 'rgba(220,38,38,0.85)').attr('stroke', '#ef4444').attr('stroke-width', 2);
  gMap.append('text').text('LOCALIDAD DE KENNEDY').attr('x', 155).attr('y', 285).attr('text-anchor', 'middle')
    .attr('fill', '#fff').attr('font-size', '11px').attr('font-weight', '900').attr('letter-spacing', '0.06em');
  gMap.append('text').text('Corabastos · Huertas · 150 Tiendas Barriales').attr('x', 155).attr('y', 298).attr('text-anchor', 'middle')
    .attr('fill', '#fecaca').attr('font-size', '7px').attr('font-weight', '600');

  // Río Fucha (límite y conector natural entre Fontibón y Kennedy)
  gMap.append('path')
    .attr('d', 'M 250,210 Q 180,225 140,230 Q 100,225 65,210')
    .attr('fill', 'none').attr('stroke', '#67e8f9').attr('stroke-width', 2.8).attr('stroke-dasharray', '4 2');
  gMap.append('text').text('Río Fucha (Eje conector)').attr('x', 195).attr('y', 222)
    .attr('fill', '#bae6fd').attr('font-size', '6.5px').attr('font-weight', '700');

  // Ejes Viales Metropolitanos
  // Calle 13 / Av. Centenario
  gMap.append('path').attr('d', 'M 50,175 L 145,180 L 270,195')
    .attr('fill', 'none').attr('stroke', '#facc15').attr('stroke-width', 1.8).attr('stroke-dasharray', '4 3');
  gMap.append('text').text('Calle 13').attr('x', 60).attr('y', 170).attr('fill', '#facc15').attr('font-size', '6.5px').attr('font-weight', '700');

  // Av. Ciudad de Cali
  gMap.append('path').attr('d', 'M 160,80 L 140,230 L 120,380')
    .attr('fill', 'none').attr('stroke', '#fb923c').attr('stroke-width', 1.8);
  gMap.append('text').text('Av. Ciudad de Cali').attr('transform', 'translate(133, 115) rotate(80)')
    .attr('fill', '#fb923c').attr('font-size', '6.5px').attr('font-weight', '700');

  // Humedal El Burro y Corabastos
  gMap.append('ellipse').attr('cx', 140).attr('cy', 242).attr('rx', 18).attr('ry', 8)
    .attr('fill', 'rgba(74,222,128,0.4)').attr('stroke', '#4ade80').attr('stroke-width', 1.5);
  gMap.append('text').text('H. El Burro').attr('x', 140).attr('y', 245).attr('text-anchor', 'middle')
    .attr('fill', '#4ade80').attr('font-size', '6px').attr('font-weight', '800');

  // DIANA PULSANTE / RADAR RINGS EN EL EPICENTRO (LOTE 9.000 m²)
  const pEpicX = 140, pEpicY = 232;
  const gRadar = gMap.append('g').attr('transform', `translate(${pEpicX},${pEpicY})`);
  const rCir1 = gRadar.append('circle').attr('r', 16).attr('fill', 'none').attr('stroke', '#fff').attr('stroke-width', 2.8);
  rCir1.append('animate').attr('attributeName', 'r').attr('values', '12;32').attr('dur', '2s').attr('repeatCount', 'indefinite');
  rCir1.append('animate').attr('attributeName', 'stroke-opacity').attr('values', '1;0').attr('dur', '2s').attr('repeatCount', 'indefinite');

  const rCir2 = gRadar.append('circle').attr('r', 10).attr('fill', 'none').attr('stroke', '#fde047').attr('stroke-width', 2);
  rCir2.append('animate').attr('attributeName', 'r').attr('values', '8;22').attr('dur', '2s').attr('begin', '0.5s').attr('repeatCount', 'indefinite');
  rCir2.append('animate').attr('attributeName', 'stroke-opacity').attr('values', '1;0').attr('dur', '2s').attr('begin', '0.5s').attr('repeatCount', 'indefinite');

  gRadar.append('circle').attr('r', 7).attr('fill', '#fff').attr('stroke', '#dc2626').attr('stroke-width', 2.5);
  gRadar.append('circle').attr('r', 2.5).attr('fill', '#dc2626');

  // Callout superior en el mapa (Escala Metropolitana)
  const gCallTop = gMap.append('g').attr('transform', 'translate(18, 16)');
  gCallTop.append('rect').attr('width', 240).attr('height', 52).attr('rx', 4)
    .attr('fill', 'rgba(15,23,42,0.92)').attr('stroke', '#475569').attr('stroke-width', 0.8);
  gCallTop.append('text').text('● ESCALA METROPOLITANA: FONTIBÓN - KENNEDY').attr('x', 10).attr('y', 16)
    .attr('fill', '#fde047').attr('font-size', '8px').attr('font-weight', '800').attr('font-family', 'JetBrains Mono, monospace');
  gCallTop.append('text').text('Implantación en la bisagra de carga pesada (Calle 13)').attr('x', 10).attr('y', 29)
    .attr('fill', '#e2e8f0').attr('font-size', '7.5px');
  gCallTop.append('text').text('y Corabastos / Humedal El Burro, articuladas por Río Fucha.').attr('x', 10).attr('y', 41)
    .attr('fill', '#94a3b8').attr('font-size', '7px');

  // Callout inferior en el mapa (Área de Influencia)
  const gCallBot = gMap.append('g').attr('transform', `translate(18, ${mapH - 95})`);
  gCallBot.append('rect').attr('width', 230).attr('height', 36).attr('rx', 4)
    .attr('fill', 'rgba(15,23,42,0.92)').attr('stroke', '#dc2626').attr('stroke-width', 0.8);
  gCallBot.append('text').text('● ÁREA DE INFLUENCIA DIRECTA').attr('x', 10).attr('y', 14)
    .attr('fill', '#dc2626').attr('font-size', '8px').attr('font-weight', '800').attr('font-family', 'JetBrains Mono, monospace');
  gCallBot.append('text').text('8 Huertas Barriales · 150 Tiendas · Ronda Hídrica').attr('x', 10).attr('y', 26)
    .attr('fill', '#cbd5e1').attr('font-size', '7.5px');

  // Escala métrica horizontal y fases al pie del mapa
  const gScale = gMap.append('g').attr('transform', `translate(20, ${mapH - 42})`);
  gScale.append('line').attr('x1', 0).attr('y1', 12).attr('x2', mapW - 40).attr('y2', 12).attr('stroke', '#64748b').attr('stroke-width', 1.2);
  const TICKS = [
    { x: 0, t: 'M0' }, { x: (mapW - 40) * 0.25, t: 'Fase 1 (M12)' },
    { x: (mapW - 40) * 0.5, t: 'Fase 2 (M24)' }, { x: mapW - 40, t: 'Fase 3 (M48)' }
  ];
  TICKS.forEach(tk => {
    gScale.append('line').attr('x1', tk.x).attr('y1', 6).attr('x2', tk.x).attr('y2', 18).attr('stroke', '#64748b').attr('stroke-width', 1.2);
    gScale.append('text').text(tk.t).attr('x', tk.x).attr('y', 28).attr('text-anchor', tk.x === 0 ? 'start' : tk.x === mapW - 40 ? 'end' : 'middle')
      .attr('fill', '#94a3b8').attr('font-size', '7px').attr('font-family', 'JetBrains Mono, monospace');
  });

  // =========================================================================
  // PÁGINA DERECHA (FOLIO 05)
  // =========================================================================
  const rX = bX + pW + 28; // Margen izquierdo página derecha = 532 + 28 = 560

  // Folio superior derecho
  gRoot.append('text').text('LOCALIDADES DE FONTIBÓN Y KENNEDY · CORREDOR RÍO FUCHA')
    .attr('x', rX + 70).attr('y', bY + 24)
    .attr('fill', '#78716c').attr('font-size', '8px').attr('font-family', 'JetBrains Mono, monospace')
    .attr('font-weight', '700').attr('letter-spacing', '0.12em');

  // Título y texto de Gobernanza Policéntrica
  const secX = rX + 70;
  gRoot.append('text').text('GOBERNANZA POLICÉNTRICA').attr('x', secX).attr('y', bY + 68)
    .attr('fill', '#111827').attr('font-size', '12px').attr('font-weight', '900').attr('letter-spacing', '0.08em');
  gRoot.append('text').text('Federación horizontal sin líder central estructurada en 5 núcleos').attr('x', secX).attr('y', bY + 84)
    .attr('fill', '#4b5563').attr('font-size', '8px');
  gRoot.append('text').text('autónomos (alimentos, agua, circularidad, comercio, soporte)').attr('x', secX).attr('y', bY + 95)
    .attr('fill', '#4b5563').attr('font-size', '8px');
  gRoot.append('text').text('articulados por vocerías rotativas (1-3 meses) y pactos de cogestión.').attr('x', secX).attr('y', bY + 106)
    .attr('fill', '#4b5563').attr('font-size', '8px').attr('font-weight', '600');

  // Subheader: Reconversión laboral
  gRoot.append('text').text('RECONVERSIÓN LABORAL & MECATRÓNICA').attr('x', secX).attr('y', bY + 138)
    .attr('fill', '#dc2626').attr('font-size', '8.5px').attr('font-weight', '800').attr('letter-spacing', '0.06em');

  // NÚMERO HERO GIGANTE: 320
  gRoot.append('text').text('320').attr('x', secX).attr('y', bY + 194)
    .attr('fill', '#111827').attr('font-size', '48px').attr('font-weight', '900')
    .attr('font-family', 'JetBrains Mono, monospace').attr('letter-spacing', '-0.04em');

  gRoot.append('text').text('Coteros y recicladores formalizados').attr('x', secX + 115).attr('y', bY + 172)
    .attr('fill', '#111827').attr('font-size', '9.5px').attr('font-weight', '800');
  gRoot.append('text').text('como operadores mecatrónicos').attr('x', secX + 115).attr('y', bY + 185)
    .attr('fill', '#dc2626').attr('font-size', '9px').attr('font-weight', '700');
  gRoot.append('text').text('y laboratoristas fúngicos en nómina formal.').attr('x', secX + 115).attr('y', bY + 196)
    .attr('fill', '#6b7280').attr('font-size', '7.5px');

  // FILA DE PICTOGRAMAS HUMANOS (ISOTIPOS, IGUAL QUE EN EL LIBRO DE REFERENCIA)
  const gIso = gRoot.append('g').attr('transform', `translate(${secX}, ${bY + 218})`);

  // Función dibujadora de figurita humana (isotype limpio)
  function drawHuman(g, x, y, col) {
    const h = g.append('g').attr('transform', `translate(${x},${y})`);
    h.append('circle').attr('cx', 0).attr('cy', -6).attr('r', 2.8).attr('fill', col);
    h.append('path').attr('d', 'M -3.2,-2 C -1.5,-2.6 1.5,-2.6 3.2,-2 C 3.8,-0.5 3.6,3 2.8,4 L 2,4 L 2,9 L -2,9 L -2,4 L -2.8,4 C -3.6,3 -3.8,-0.5 -3.2,-2 Z')
      .attr('fill', col);
  }

  // 10 figuras: 5 en rojo carmín (operadores mecatrónicos) + 5 en gris oscuro (actores comunitarios)
  for (let i = 0; i < 10; i++) {
    const col = i < 5 ? '#dc2626' : '#18181b';
    drawHuman(gIso, i * 16 + 8, 0, col);
  }
  gIso.append('text').text('52% Operadores de tolvas y silos · 48% Cogestión barrial').attr('x', 0).attr('y', 20)
    .attr('fill', '#6b7280').attr('font-size', '7px').attr('font-family', 'JetBrains Mono, monospace');

  // LÍNEA VERTICAL CON INDICADORES CIRCULARES (GAUGES 100%, 65%, 30%)
  const gGauges = gRoot.append('g').attr('transform', `translate(${secX}, ${bY + 265})`);

  // Línea guía vertical
  gGauges.append('line').attr('x1', 16).attr('y1', 10).attr('x2', 16).attr('y2', 150).attr('stroke', '#e5e2d9').attr('stroke-width', 1.5);

  const GAUGES_DATA = [
    { y: 20, pct: '100%', col: '#dc2626', tit: 'MECANIZACIÓN TOTAL DE DESCARGA', sub: 'Tolvas mecatrónicas y cintas: fin radical del trabajo a lomo.' },
    { y: 80, pct: '65%', col: '#dc2626', tit: 'RESIDUOS ORGÁNICOS REVALORIZADOS', sub: 'Sustrato de Pleurotus y compost vivo para 8 huertas barriales.' },
    { y: 140, pct: '30%', col: '#18181b', tit: 'REDUCCIÓN PRECIO CANASTA FAMILIAR', sub: 'Circuito corto directo a 150 tiendas y comedores de Kennedy.' }
  ];

  GAUGES_DATA.forEach(g => {
    // Círculo gauge
    gGauges.append('circle').attr('cx', 16).attr('cy', g.y).attr('r', 16).attr('fill', g.col);
    gGauges.append('text').text(g.pct).attr('x', 16).attr('y', g.y + 3.5).attr('text-anchor', 'middle')
      .attr('fill', '#fff').attr('font-size', '8.5px').attr('font-weight', '800').attr('font-family', 'JetBrains Mono, monospace');

    // Textos explicativos al lado
    gGauges.append('text').text(g.tit).attr('x', 40).attr('y', g.y - 3)
      .attr('fill', '#111827').attr('font-size', '8.5px').attr('font-weight', '800').attr('letter-spacing', '0.04em');
    gGauges.append('text').text(g.sub).attr('x', 40).attr('y', g.y + 9)
      .attr('fill', '#6b7280').attr('font-size', '7.5px');
  });

  // TARJETA DE SÍNTESIS EDITORIAL INFERIOR DERECHA
  const gQuote = gRoot.append('g').attr('transform', `translate(${secX}, ${bY + 445})`);
  gQuote.append('rect').attr('width', 275).attr('height', 88).attr('rx', 4)
    .attr('fill', '#f0eee6').attr('stroke', '#dfdbce').attr('stroke-width', 1);

  gQuote.append('line').attr('x1', 0).attr('y1', 0).attr('x2', 4).attr('y2', 0).attr('stroke', '#dc2626').attr('stroke-width', 3);
  gQuote.append('text').text('“La propuesta no es una utopía cosmética:').attr('x', 14).attr('y', 22)
    .attr('fill', '#111827').attr('font-size', '8.5px').attr('font-weight', '700');
  gQuote.append('text').text('es un programa arquitectónico de 9.000 m² que sustituye').attr('x', 14).attr('y', 36)
    .attr('fill', '#374151').attr('font-size', '8px');
  gQuote.append('text').text('la intermediación especulativa y la precarización física').attr('x', 14).attr('y', 48)
    .attr('fill', '#374151').attr('font-size', '8px');
  gQuote.append('text').text('por una infraestructura bioclimática de soberanía biosocial.”').attr('x', 14).attr('y', 60)
    .attr('fill', '#dc2626').attr('font-size', '8px').attr('font-weight', '700');
  gQuote.append('text').text('CORTE III · KENNEDY Y FONTIBÓN · 2026').attr('x', 14).attr('y', 76)
    .attr('fill', '#9ca3af').attr('font-size', '7px').attr('font-family', 'JetBrains Mono, monospace');

  // Folio número de página abajo a la derecha
  gRoot.append('text').text('05 · INDICADORES & IMPACTO METROPOLITANO').attr('x', bX + bW - 20).attr('y', bY + bH - 12)
    .attr('text-anchor', 'end').attr('fill', '#a8a29e').attr('font-size', '8px').attr('font-family', 'JetBrains Mono, monospace');
}




/* =========================================================================
   DIAGRAMA DE RELACIONES ESPACIALES & PROGRAMA ARQUITECTÓNICO (BUBBLE DIAGRAM)
   Inspirado en el diagrama circular de ecosistema programático y flujos urbanos.
   ========================================================================= */
function renderDiagramaBurbujas(svg, W, H, P) {
  const gRoot = svg.append('g').attr('class', 'diagrama-burbujas-root');
  const baseW = 1000, baseH = 620;
  if (W && H && (W !== baseW || H !== baseH)) {
    const s = Math.min(W / baseW, H / baseH);
    const dx = (W - baseW * s) / 2;
    const dy = (H - baseH * s) / 2;
    gRoot.attr('transform', `translate(${dx},${dy}) scale(${s})`);
  }

  // Fondo lámina arquitectónica
  gRoot.append('rect').attr('width', baseW).attr('height', baseH).attr('fill', '#fcfbf8');

  // Retícula técnica de puntos de fondo
  const gGrid = gRoot.append('g').style('opacity', 0.22);
  for (let x = 25; x < baseW; x += 32) {
    for (let y = 25; y < baseH; y += 32) {
      gGrid.append('circle').attr('cx', x).attr('cy', y).attr('r', 0.85).attr('fill', '#94a3b8');
    }
  }

  // Defs: Sombras, clips y gradientes
  const defs = svg.select('defs').empty() ? svg.append('defs') : svg.select('defs');
  
  if (defs.select('#bubbleShadow').empty()) {
    const f = defs.append('filter').attr('id', 'bubbleShadow').attr('x', '-20%').attr('y', '-20%').attr('width', '140%').attr('height', '140%');
    f.append('feDropShadow').attr('dx', 0).attr('dy', 4).attr('stdDeviation', 6).attr('flood-color', '#0f172a').attr('flood-opacity', 0.09);
  }
  if (defs.select('#vignetteShadow').empty()) {
    const fv = defs.append('filter').attr('id', 'vignetteShadow').attr('x', '-25%').attr('y', '-25%').attr('width', '150%').attr('height', '150%');
    fv.append('feDropShadow').attr('dx', 0).attr('dy', 6).attr('stdDeviation', 8).attr('flood-color', '#0f172a').attr('flood-opacity', 0.14);
  }

  // Clips para las 3 viñetas circulares
  if (defs.select('#clipVig1').empty()) defs.append('clipPath').attr('id', 'clipVig1').append('circle').attr('r', 52);
  if (defs.select('#clipVig2').empty()) defs.append('clipPath').attr('id', 'clipVig2').append('circle').attr('r', 52);
  if (defs.select('#clipVig3').empty()) defs.append('clipPath').attr('id', 'clipVig3').append('circle').attr('r', 52);

  // Encabezado editorial superior
  const gHead = gRoot.append('g').attr('transform', 'translate(540, 28)');
  gHead.append('text').text('DIAGRAMA DE RELACIONES ESPACIALES Y PROGRAMA FUNCIONAL')
    .attr('text-anchor', 'middle').attr('fill', '#0f172a').attr('font-size', '13.5px')
    .attr('font-weight', '900').attr('letter-spacing', '0.08em').attr('font-family', 'Instrument Sans, sans-serif');
  gHead.append('text').text('Complejo Biotecnológico Urbano (9.000 m²) · Adyacencias, flujos metabólicos y transición Corabastos ➔ Humedal')
    .attr('text-anchor', 'middle').attr('fill', '#64748b').attr('font-size', '9.5px').attr('y', 16);

  // =========================================================================
  // CÍRCULO MAESTRO Y CURVAS DE CONECTIVIDAD
  // =========================================================================
  const cX = 610, cY = 312, masterR = 250;

  // Gran perímetro circular punteado maestro
  gRoot.append('circle').attr('cx', cX).attr('cy', cY).attr('r', masterR)
    .attr('fill', 'none').attr('stroke', '#cbd5e1').attr('stroke-width', 1.6).attr('stroke-dasharray', '6 5');

  // Arcos conectores entre zonas programáticas (Flujos metabólicos)
  const gLinks = gRoot.append('g').attr('class', 'flow-links');
  function addFlowArc(d, col, strokeW, dash) {
    return gLinks.append('path').attr('d', d)
      .attr('fill', 'none').attr('stroke', col).attr('stroke-width', strokeW || 1.8)
      .attr('stroke-dasharray', dash || '5 4').attr('stroke-opacity', 0.65);
  }

  addFlowArc('M 505,175 Q 600,160 700,180', '#ea580c', 2.4); // Tolvas -> Bóvedas Pleurotus
  addFlowArc('M 720,225 Q 770,270 780,335', '#be123c', 2.4); // Bóvedas -> Comedor / 150 Tiendas
  addFlowArc('M 480,215 Q 425,275 395,340', '#ea580c', 2.0); // Tolvas -> Reconversión Laboral
  addFlowArc('M 450,420 Q 530,470 635,475', '#0284c7', 2.0); // Reconversión -> Humedal
  addFlowArc('M 755,410 Q 720,460 675,475', '#d97706', 2.0); // Comedor -> Humedal (Cierre de ciclo)
  addFlowArc('M 620,435 Q 560,370 515,220', '#059669', 1.8, '3 4'); // Humedal -> Techos productivos

  // Etiquetas de flujo sobre arcos
  gRoot.append('text').text('300 t/día RASTROJO (CORABASTOS)').attr('x', 535).attr('y', 158)
    .attr('fill', '#c2410c').attr('font-size', '7.5px').attr('font-weight', '800').attr('font-family', 'JetBrains Mono, monospace');
  gRoot.append('text').text('40 t/mes MICOPROTEÍNA Pleurotus').attr('x', 760).attr('y', 270)
    .attr('fill', '#be123c').attr('font-size', '7.5px').attr('font-weight', '800').attr('font-family', 'JetBrains Mono, monospace');
  gRoot.append('text').text('320 COTEROS A MECATRÓNICA').attr('x', 360).attr('y', 275)
    .attr('fill', '#0284c7').attr('font-size', '7.5px').attr('font-weight', '800').attr('font-family', 'JetBrains Mono, monospace');
  gRoot.append('text').text('FITODEPURACIÓN (CERO LIXIVIADOS)').attr('x', 670).attr('y', 450)
    .attr('fill', '#059669').attr('font-size', '7.5px').attr('font-weight', '800').attr('font-family', 'JetBrains Mono, monospace');

  // Nubes de fondo orgánicas (burbujas translúcidas de ambientación)
  const gClouds = gRoot.append('g').style('opacity', 0.45);
  function drawCloud(cx, cy, col, count, spread) {
    for (let i = 0; i < count; i++) {
      const a = (i / count) * 2 * Math.PI;
      const r = spread * (0.65 + Math.sin(i * 3.4) * 0.3);
      gClouds.append('circle')
        .attr('cx', cx + Math.cos(a) * r).attr('cy', cy + Math.sin(a) * r)
        .attr('r', 24 + (i % 3) * 7).attr('fill', col);
    }
  }

  drawCloud(505, 175, '#ffedd5', 8, 55); // Nube Tolvas Corabastos
  drawCloud(720, 185, '#ffe4e6', 8, 55); // Nube Bóvedas Pleurotus
  drawCloud(395, 385, '#e0f2fe', 9, 60); // Nube Reconversión
  drawCloud(780, 360, '#fef9c3', 8, 55); // Nube Comedor & Tiendas
  drawCloud(655, 485, '#dcfce7', 8, 55); // Nube Humedal El Burro

  // =========================================================================
  // ESPINA PEATONAL CENTRAL (WAVY CROWD TRAIL)
  // Conecta directamente Corabastos con el Humedal El Burro
  // =========================================================================
  const gTrail = gRoot.append('g').attr('class', 'crowd-spine');
  const pathSpine = 'M 515,225 Q 545,295 595,315 T 650,420';

  // Sombra exterior de la senda
  gTrail.append('path').attr('d', pathSpine)
    .attr('fill', 'none').attr('stroke', 'rgba(148,163,184,0.3)').attr('stroke-width', 30).attr('stroke-linecap', 'round');
  // Cuerpo blanco de la senda
  gTrail.append('path').attr('d', pathSpine)
    .attr('fill', 'none').attr('stroke', '#ffffff').attr('stroke-width', 22).attr('stroke-linecap', 'round');
  // Línea central de guía
  gTrail.append('path').attr('d', pathSpine)
    .attr('fill', 'none').attr('stroke', '#e2e8f0').attr('stroke-width', 1.8).attr('stroke-dasharray', '4 4');

  // Figuras humanas vectoriales que transitan por la senda
  const CROWD = [
    {x: 510, y: 228, c: '#0f172a', act: 'cotero'},
    {x: 518, y: 235, c: '#ea580c', act: 'operario'},
    {x: 524, y: 247, c: '#0f172a', act: 'vecino'},
    {x: 532, y: 258, c: '#0284c7', act: 'estudiante'},
    {x: 540, y: 270, c: '#0f172a', act: 'tendero'},
    {x: 549, y: 282, c: '#059669', act: 'huertero'},
    {x: 559, y: 294, c: '#0f172a', act: 'reciclador'},
    {x: 569, y: 304, c: '#d97706', act: 'comensal'},
    {x: 579, y: 314, c: '#0f172a', act: 'vecino'},
    {x: 590, y: 326, c: '#be123c', act: 'investigadora'},
    {x: 601, y: 340, c: '#0f172a', act: 'cotero'},
    {x: 611, y: 355, c: '#0284c7', act: 'operario'},
    {x: 621, y: 370, c: '#0f172a', act: 'familia'},
    {x: 630, y: 386, c: '#059669', act: 'huertero'},
    {x: 640, y: 402, c: '#0f172a', act: 'educador'},
    {x: 647, y: 416, c: '#ea580c', act: 'comensal'}
  ];

  function drawCrowdPerson(g, x, y, col, act) {
    const p = g.append('g').attr('transform', `translate(${x},${y})`).style('cursor', 'pointer');
    p.append('circle').attr('cx', 0).attr('cy', -5.5).attr('r', 2.2).attr('fill', col);
    p.append('path').attr('d', 'M -2.5,-3 L 2.5,-3 L 2,6 L -2,6 Z').attr('fill', col);
    // Piernas
    p.append('line').attr('x1', -1).attr('y1', 6).attr('x2', -1.5).attr('y2', 9.5).attr('stroke', col).attr('stroke-width', 1.1);
    p.append('line').attr('x1', 1).attr('y1', 6).attr('x2', 1.5).attr('y2', 9.5).attr('stroke', col).attr('stroke-width', 1.1);
    p.on('mouseenter', () => showInfoCard(`TRANSITANTE: ${act.toUpperCase()}`, 'Espina Peatonal Cívica', col, 'Conexión peatonal continua e inclusiva entre el muelle de Corabastos y la reserva del Humedal El Burro.'));
    p.on('mouseleave', hideInfoCard);
  }
  CROWD.forEach(pt => drawCrowdPerson(gTrail, pt.x, pt.y, pt.c, pt.act));

  // Rótulo tipográfico a lo largo de la senda
  gTrail.append('text').text('ESPINA PEATONAL & CONECTIVIDAD CÍVICA')
    .attr('x', 585).attr('y', 270).attr('fill', '#475569').attr('font-size', '7.2px').attr('font-weight', '800')
    .attr('font-family', 'JetBrains Mono, monospace').attr('transform', 'rotate(42 585 270)');

  // =========================================================================
  // LAS 5 GRANDES BURBUJAS PROGRAMÁTICAS (KENNEDY)
  // =========================================================================
  const BUBBLES = [
    {
      id: 'b1', cx: 505, cy: 175, r: 56,
      tit: 'MUELLE & TOLVAS', sub: 'Zona A · 2.800 m²', col: '#ea580c', bg: '#fff7ed', stroke: '#ea580c',
      desc: 'Muelle mecatrónico a cota ±0.00m. Cuatro tolvas automatizadas captan 300 t/día de rastrojo orgánico de Corabastos, con cintas continuas que erradican el cargue a lomo.',
      satellites: [
        { angle: -2.6, dist: 80, r: 19, nom: 'Tolvas automáticas (300 t/día)', icon: 'tolva', spec: 'Captación directa sin flete' },
        { angle: -1.9, dist: 82, r: 19, nom: 'Cintas mecánicas continuas', icon: 'cinta', spec: 'Fin a bultos de 60 kg a la espalda' },
        { angle: -1.2, dist: 80, r: 18, nom: 'Pesaje y sensor digital', icon: 'bascula', spec: 'Telemetría y trazabilidad' },
        { angle: -0.5, dist: 82, r: 19, nom: 'Muelle descarga Calle 13', icon: 'camion', spec: 'Acceso segregado de carga pesada' },
        { angle: 0.2, dist: 80, r: 18, nom: 'Trituración y esterilización', icon: 'triturador', spec: 'Vapor limpio de biomasa' }
      ]
    },
    {
      id: 'b2', cx: 720, cy: 185, r: 60,
      tit: 'BÓVEDAS & SILOS', sub: 'Zonas B y C · 4.000 m²', col: '#be123c', bg: '#fff1f2', stroke: '#be123c',
      desc: 'Complejo biológico: cámaras oscuras para 40 t/mes de proteína de setas Pleurotus ostreatus sobre rastrojo esterilizado, más silos verticales con ventilación pasiva para papa y tubérculos andinos.',
      satellites: [
        { angle: -1.9, dist: 84, r: 20, nom: 'Bóvedas micelio (40 t/mes)', icon: 'hongo', spec: 'Fructificación Pleurotus controlada' },
        { angle: -1.1, dist: 86, r: 20, nom: 'Silos verticales de papa', icon: 'silo', spec: 'Ventilación pasiva sin refrigeración fósil' },
        { angle: -0.3, dist: 84, r: 19, nom: 'Sala blanca inoculación ISO 7', icon: 'lab', spec: 'Siembra aséptica de micelio' },
        { angle: 0.5, dist: 82, r: 19, nom: 'Empaque aséptico al vacío', icon: 'empaque', spec: 'Preservación de cadena nutricional' },
        { angle: 1.3, dist: 80, r: 18, nom: 'Bancos de inóculo fúngico', icon: 'cepa', spec: 'Reserva de cepas adaptadas' }
      ]
    },
    {
      id: 'b3', cx: 395, cy: 385, r: 62,
      tit: 'RECONVERSIÓN LABORAL', sub: 'Zona D · 800 m²', col: '#0284c7', bg: '#f0f9ff', stroke: '#0284c7',
      desc: 'Centro de formación y bienestar: 320 coteros y recicladores de Patio Bonito y María Paz contratados formalmente en nómina y capacitados en operación mecatrónica de tolvas.',
      satellites: [
        { angle: -2.7, dist: 86, r: 20, nom: 'Aulas mecatrónicas coteros', icon: 'aula', spec: 'Certificación técnica SENA/Distrital' },
        { angle: -2.0, dist: 88, r: 20, nom: '320 contratos formalizados', icon: 'contrato', spec: 'Seguridad social y nómina directa' },
        { angle: 2.5, dist: 88, r: 20, nom: 'Mesa Federativa Kennedy', icon: 'mesa', spec: 'Vocerías rotativas JAC sin cacique' },
        { angle: 1.7, dist: 86, r: 19, nom: 'Taller bicicargas eléctricas', icon: 'carretilla', spec: 'Mantenimiento de flota barrial' },
        { angle: 0.9, dist: 84, r: 19, nom: 'Lockers y salud ocupacional', icon: 'lockers', spec: 'Duchas, bienestar y descanso digno' }
      ]
    },
    {
      id: 'b4', cx: 780, cy: 360, r: 58,
      tit: 'COMEDOR & 150 TIENDAS', sub: 'Zona E · 1.400 m²', col: '#d97706', bg: '#fefce8', stroke: '#d97706',
      desc: 'Umbral cívico y de distribución: Comedor comunitario popular para 500 raciones calientes diarias con la SDIS, muelle de despacho a 150 tiendas barriales y cocina pedagógica vecinal.',
      satellites: [
        { angle: -0.8, dist: 84, r: 20, nom: 'Comedor 500 raciones/día', icon: 'plato', spec: 'Nutrición caliente junto a la SDIS' },
        { angle: -0.1, dist: 86, r: 20, nom: 'Red 150 tiendas barriales', icon: 'tienda', spec: 'Circuito corto sin sobreprecio especulativo' },
        { angle: 0.7, dist: 84, r: 19, nom: 'Cocina pedagógica comunitaria', icon: 'cocina', spec: 'Talleres barriales de soberanía' },
        { angle: 1.5, dist: 82, r: 19, nom: 'Plaza de mercado de cercanía', icon: 'plaza', spec: 'Venta directa sin fletes intermediarios' },
        { angle: 2.3, dist: 80, r: 18, nom: 'Enlace comedores escolares', icon: 'colegio', spec: 'Suministro a colegios distritales' }
      ]
    },
    {
      id: 'b5', cx: 655, cy: 485, r: 58,
      tit: 'BORDE ECOLÓGICO', sub: '2.500 m² Parque + 1.500 m² Techos', col: '#059669', bg: '#f0fdf4', stroke: '#059669',
      desc: 'Amortiguación ambiental con el Humedal El Burro: taludes escalonados de fitodepuración (vertimiento cero de lixiviados), 1.500 m² de cubiertas productivas biofertilizadas y refugio de tinguas.',
      satellites: [
        { angle: -0.3, dist: 84, r: 20, nom: 'Taludes de fitodepuración', icon: 'talud', spec: 'Grava y juncos que sanean el agua' },
        { angle: 0.4, dist: 86, r: 20, nom: '1.500 m² cubiertas productivas', icon: 'cubierta', spec: 'Hortalizas frescas biofertilizadas' },
        { angle: 1.2, dist: 86, r: 19, nom: 'Abejas nativas (Bombus)', icon: 'abeja', spec: 'Polinización de huertas de Kennedy' },
        { angle: 2.0, dist: 84, r: 19, nom: 'Biofiltro de juncos y alisos', icon: 'juncos', spec: 'Barrera vegetal y absorción de metales' },
        { angle: 2.8, dist: 82, r: 19, nom: 'Protección tingua bogotana', icon: 'tingua', spec: 'Hábitat restaurado de fauna nativa' }
      ]
    }
  ];

  // Dibujador de iconos vectoriales SVG limpios y precisos
  function drawFlatIcon(g, iconType, col) {
    if (iconType === 'tolva') {
      g.append('polygon').attr('points', '-6,-7 6,-7 3,2 -3,2').attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.4);
      g.append('rect').attr('x', -2).attr('y', 2).attr('width', 4).attr('height', 4).attr('fill', col);
      g.append('path').attr('d', 'M 0,6 L 0,8').attr('stroke', col).attr('stroke-width', 1.4);
    } else if (iconType === 'cinta') {
      g.append('circle').attr('cx', -5).attr('cy', 1).attr('r', 2.8).attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('circle').attr('cx', 5).attr('cy', -2).attr('r', 2.8).attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('line').attr('x1', -5).attr('y1', -2).attr('x2', 5).attr('y2', -5).attr('stroke', col).attr('stroke-width', 1.3);
      g.append('line').attr('x1', -5).attr('y1', 4).attr('x2', 5).attr('y2', 1).attr('stroke', col).attr('stroke-width', 1.3);
      g.append('rect').attr('x', -2).attr('y', -6).attr('width', 4).attr('height', 3).attr('fill', col);
    } else if (iconType === 'bascula') {
      g.append('line').attr('x1', -6).attr('y1', 5).attr('x2', 6).attr('y2', 5).attr('stroke', col).attr('stroke-width', 1.5);
      g.append('rect').attr('x', -4).attr('y', -4).attr('width', 8).attr('height', 8).attr('rx', 1).attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.2);
      g.append('line').attr('x1', -2).attr('y1', -1).attr('x2', 2).attr('y2', -1).attr('stroke', col).attr('stroke-width', 1.2);
    } else if (iconType === 'camion') {
      g.append('rect').attr('x', -7).attr('y', -5).attr('width', 9).attr('height', 7).attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('path').attr('d', 'M 2,-2 L 5,-2 L 7,2 L 2,2 Z').attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('circle').attr('cx', -4).attr('cy', 3.5).attr('r', 1.8).attr('fill', col);
      g.append('circle').attr('cx', 4).attr('cy', 3.5).attr('r', 1.8).attr('fill', col);
    } else if (iconType === 'triturador') {
      g.append('circle').attr('cx', 0).attr('cy', 0).attr('r', 4.5).attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('line').attr('x1', -6).attr('y1', 0).attr('x2', 6).attr('y2', 0).attr('stroke', col).attr('stroke-width', 1.3);
      g.append('line').attr('x1', 0).attr('y1', -6).attr('x2', 0).attr('y2', 6).attr('stroke', col).attr('stroke-width', 1.3);
    } else if (iconType === 'hongo') {
      g.append('path').attr('d', 'M -7,0 C -7,-7 7,-7 7,0 Z').attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.4);
      g.append('path').attr('d', 'M -2,0 L -2,6 C -2,7 2,7 2,6 L 2,0').attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.4);
      g.append('circle').attr('cx', -3).attr('cy', -3).attr('r', 0.9).attr('fill', col);
      g.append('circle').attr('cx', 2).attr('cy', -4).attr('r', 0.9).attr('fill', col);
    } else if (iconType === 'silo') {
      g.append('path').attr('d', 'M -4,-2 C -4,-6 4,-6 4,-2').attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('rect').attr('x', -4).attr('y', -2).attr('width', 8).attr('height', 9).attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('line').attr('x1', -4).attr('y1', 1).attr('x2', 4).attr('y2', 1).attr('stroke', col).attr('stroke-width', 1.1);
      g.append('line').attr('x1', -4).attr('y1', 4).attr('x2', 4).attr('y2', 4).attr('stroke', col).attr('stroke-width', 1.1);
    } else if (iconType === 'lab') {
      g.append('path').attr('d', 'M -2,-7 L 2,-7 M 0,-7 L 0,-3 L -5,5 C -6,7 6,7 5,5 L 0,-3').attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('circle').attr('cx', 0).attr('cy', 3).attr('r', 1.2).attr('fill', col);
    } else if (iconType === 'empaque') {
      g.append('rect').attr('x', -6).attr('y', -5).attr('width', 12).attr('height', 10).attr('rx', 2).attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('path').attr('d', 'M -3,0 L 0,-3 L 3,0 M 0,-3 L 0,3').attr('stroke', col).attr('stroke-width', 1.2);
    } else if (iconType === 'cepa') {
      g.append('circle').attr('cx', 0).attr('cy', 0).attr('r', 5.5).attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('circle').attr('cx', 0).attr('cy', 0).attr('r', 2).attr('fill', col);
      g.append('line').attr('x1', 0).attr('y1', -5).attr('x2', 0).attr('y2', -2).attr('stroke', col).attr('stroke-width', 1.1);
      g.append('line').attr('x1', 0).attr('y1', 2).attr('x2', 0).attr('y2', 5).attr('stroke', col).attr('stroke-width', 1.1);
    } else if (iconType === 'aula') {
      g.append('rect').attr('x', -6).attr('y', -6).attr('width', 12).attr('height', 9).attr('rx', 1.5).attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('line').attr('x1', -6).attr('y1', 6).attr('x2', 6).attr('y2', 6).attr('stroke', col).attr('stroke-width', 1.3);
      g.append('circle').attr('cx', 0).attr('cy', -2).attr('r', 1.5).attr('fill', col);
    } else if (iconType === 'contrato') {
      g.append('rect').attr('x', -5).attr('y', -6).attr('width', 10).attr('height', 12).attr('rx', 1.5).attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('path').attr('d', 'M -2,-2 L 0,0 L 3,-4').attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.4);
      g.append('line').attr('x1', -3).attr('y1', 3).attr('x2', 3).attr('y2', 3).attr('stroke', col).attr('stroke-width', 1.1);
    } else if (iconType === 'mesa') {
      g.append('circle').attr('cx', 0).attr('cy', 0).attr('r', 4).attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      [-4.5, 4.5].forEach(dx => {
        g.append('circle').attr('cx', dx).attr('cy', 0).attr('r', 1.4).attr('fill', col);
        g.append('circle').attr('cx', 0).attr('cy', dx).attr('r', 1.4).attr('fill', col);
      });
    } else if (iconType === 'carretilla') {
      g.append('rect').attr('x', -5).attr('y', -3).attr('width', 8).attr('height', 5).attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('line').attr('x1', 3).attr('y1', -3).attr('x2', 6).attr('y2', -6).attr('stroke', col).attr('stroke-width', 1.4);
      g.append('circle').attr('cx', -3).attr('cy', 4).attr('r', 1.6).attr('fill', col);
      g.append('circle').attr('cx', 2).attr('cy', 4).attr('r', 1.6).attr('fill', col);
    } else if (iconType === 'lockers') {
      g.append('rect').attr('x', -6).attr('y', -6).attr('width', 12).attr('height', 12).attr('rx', 1.5).attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('line').attr('x1', 0).attr('y1', -6).attr('x2', 0).attr('y2', 6).attr('stroke', col).attr('stroke-width', 1.1);
      g.append('line').attr('x1', -3).attr('y1', -1).attr('x2', -3).attr('y2', 1).attr('stroke', col).attr('stroke-width', 1.5);
      g.append('line').attr('x1', 3).attr('y1', -1).attr('x2', 3).attr('y2', 1).attr('stroke', col).attr('stroke-width', 1.5);
    } else if (iconType === 'plato') {
      g.append('ellipse').attr('cx', 0).attr('cy', 3).attr('rx', 6).attr('ry', 3).attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('path').attr('d', 'M -3,0 C -3,-4 -1,-5 -2,-8 M 0,0 C 0,-4 2,-5 1,-8 M 3,0 C 3,-4 5,-5 4,-8').attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.1);
    } else if (iconType === 'tienda') {
      g.append('path').attr('d', 'M -6,-2 L 6,-2 L 5,-6 L -5,-6 Z').attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('rect').attr('x', -5).attr('y', -2).attr('width', 10).attr('height', 8).attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('rect').attr('x', -2).attr('y', 1).attr('width', 4).attr('height', 5).attr('fill', col);
    } else if (iconType === 'cocina') {
      g.append('path').attr('d', 'M -5,0 L 5,0 L 4,5 L -4,5 Z').attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('line').attr('x1', -6).attr('y1', 0).attr('x2', 6).attr('y2', 0).attr('stroke', col).attr('stroke-width', 1.4);
      g.append('path').attr('d', 'M -2,-2 C -2,-4 0,-4 -1,-6 M 1,-2 C 1,-4 3,-4 2,-6').attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.1);
    } else if (iconType === 'plaza') {
      g.append('polygon').attr('points', '0,-6 -6,0 6,0').attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('line').attr('x1', -4).attr('y1', 0).attr('x2', -4).attr('y2', 6).attr('stroke', col).attr('stroke-width', 1.3);
      g.append('line').attr('x1', 4).attr('y1', 0).attr('x2', 4).attr('y2', 6).attr('stroke', col).attr('stroke-width', 1.3);
    } else if (iconType === 'colegio') {
      g.append('polygon').attr('points', '0,-6 -6,-1 6,-1').attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('rect').attr('x', -5).attr('y', -1).attr('width', 10).attr('height', 7).attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('rect').attr('x', -1.5).attr('y', 2).attr('width', 3).attr('height', 4).attr('fill', col);
    } else if (iconType === 'talud') {
      g.append('path').attr('d', 'M -6,-5 L -2,-5 L -2,0 L 2,0 L 2,5 L 6,5').attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.4);
      g.append('circle').attr('cx', -4).attr('cy', -2).attr('r', 1).attr('fill', col);
      g.append('circle').attr('cx', 0).attr('cy', 3).attr('r', 1).attr('fill', col);
    } else if (iconType === 'cubierta') {
      g.append('line').attr('x1', -6).attr('y1', 4).attr('x2', 6).attr('y2', 4).attr('stroke', col).attr('stroke-width', 1.5);
      g.append('path').attr('d', 'M -3,4 Q -4,-2 0,-4 Q 4,-2 3,4').attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('line').attr('x1', 0).attr('y1', -4).attr('x2', 0).attr('y2', 4).attr('stroke', col).attr('stroke-width', 1.2);
    } else if (iconType === 'abeja') {
      g.append('ellipse').attr('cx', 0).attr('cy', 0).attr('rx', 4.5).attr('ry', 3).attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('line').attr('x1', -1).attr('y1', -3).attr('x2', -1).attr('y2', 3).attr('stroke', col).attr('stroke-width', 1.2);
      g.append('line').attr('x1', 2).attr('y1', -3).attr('x2', 2).attr('y2', 3).attr('stroke', col).attr('stroke-width', 1.2);
      g.append('ellipse').attr('cx', 1).attr('cy', -4).attr('rx', 2.5).attr('ry', 1.5).attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.1);
    } else if (iconType === 'juncos') {
      g.append('path').attr('d', 'M -4,6 L -2,-5 M 0,6 L 0,-7 M 4,6 L 2,-4').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('line').attr('x1', -6).attr('y1', 6).attr('x2', 6).attr('y2', 6).attr('stroke', col).attr('stroke-width', 1.4);
      g.append('rect').attr('x', -0.8).attr('y', -6).attr('width', 1.6).attr('height', 4).attr('fill', col);
    } else if (iconType === 'tingua') {
      g.append('path').attr('d', 'M -5,2 C -5,-2 -2,-4 1,-4 C 3,-4 5,-2 4,1 C 3,4 -2,4 -5,2 Z').attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
      g.append('path').attr('d', 'M 3,-3 L 6,-2 L 4,-1').attr('fill', col);
      g.append('line').attr('x1', -6).attr('y1', 4).attr('x2', 6).attr('y2', 4).attr('stroke', col).attr('stroke-width', 1.2);
    } else {
      g.append('circle').attr('r', 4.5).attr('fill', 'none').attr('stroke', col).attr('stroke-width', 1.3);
    }
  }

  // Renderizar burbujas principales y satélites
  const gMainBubbles = gRoot.append('g').attr('class', 'main-bubbles');

  BUBBLES.forEach(b => {
    const gB = gMainBubbles.append('g').style('cursor', 'pointer');

    // Satélites orbitales
    b.satellites.forEach(s => {
      const sx = b.cx + Math.cos(s.angle) * s.dist;
      const sy = b.cy + Math.sin(s.angle) * s.dist;

      // Línea de unión punteada
      gB.append('line').attr('x1', b.cx).attr('y1', b.cy).attr('x2', sx).attr('y2', sy)
        .attr('stroke', '#cbd5e1').attr('stroke-width', 1.3).attr('stroke-dasharray', '3 3');

      // Círculo satélite
      const gSat = gB.append('g').attr('transform', `translate(${sx},${sy})`);
      gSat.append('circle').attr('r', s.r).attr('fill', '#ffffff')
        .attr('stroke', b.col).attr('stroke-width', 1.6).attr('filter', 'url(#bubbleShadow)');
      drawFlatIcon(gSat, s.icon, b.col);

      // Tooltips interactivos
      gSat.on('mouseenter', () => showInfoCard(s.nom, b.tit, b.col, s.spec + ' · ' + b.desc));
      gSat.on('mouseleave', hideInfoCard);
    });

    // Círculo principal
    gB.append('circle').attr('cx', b.cx).attr('cy', b.cy).attr('r', b.r)
      .attr('fill', b.bg).attr('stroke', b.col).attr('stroke-width', 2.4).attr('filter', 'url(#bubbleShadow)')
      .style('transition', 'transform 0.2s, stroke-width 0.2s');

    // Anillo concéntrico interior punteado
    gB.append('circle').attr('cx', b.cx).attr('cy', b.cy).attr('r', b.r - 4.5)
      .attr('fill', 'none').attr('stroke', b.col).attr('stroke-width', 0.85).attr('stroke-dasharray', '3 2');

    // Título y subtítulo
    gB.append('text').text(b.tit).attr('x', b.cx).attr('y', b.cy - 3)
      .attr('text-anchor', 'middle').attr('fill', '#0f172a').attr('font-size', '9.5px')
      .attr('font-weight', '800').attr('font-family', 'Instrument Sans, sans-serif').attr('letter-spacing', '0.04em');
    gB.append('text').text(b.sub).attr('x', b.cx).attr('y', b.cy + 13)
      .attr('text-anchor', 'middle').attr('fill', b.col).attr('font-size', '8px')
      .attr('font-weight', '700').attr('font-family', 'JetBrains Mono, monospace');

    gB.on('mouseenter', () => showInfoCard(b.tit, b.sub, b.col, b.desc));
    gB.on('mouseleave', hideInfoCard);
  });

  // =========================================================================
  // LAS 3 VIÑETAS ILUSTRADAS EN EL BORDE IZQUIERDO (100% VECTOR SVG KENNEDY)
  // Ilustraciones arquitectónicas vectoriales completas, cero imágenes de mapa de bits.
  // =========================================================================
  const gVignettes = gRoot.append('g').attr('class', 'satellite-vignettes');

  // -------------------------------------------------------------------------
  // Viñeta 1: Muelle Mecatrónico Corabastos (Logística y Tolvas Industriales)
  // -------------------------------------------------------------------------
  const v1X = 125, v1Y = 125, v1R = 52;
  // Línea de conexión al clúster de Muelle y Tolvas
  gVignettes.append('line').attr('x1', v1X + v1R).attr('y1', v1Y + 5).attr('x2', 450).attr('y2', 165)
    .attr('stroke', '#cbd5e1').attr('stroke-width', 1.6).attr('stroke-dasharray', '3 3');

  const gV1 = gVignettes.append('g').attr('transform', `translate(${v1X},${v1Y})`).style('cursor', 'pointer');
  // Sombra exterior
  gV1.append('circle').attr('r', v1R).attr('fill', '#ffffff').attr('stroke', '#ea580c').attr('stroke-width', 2.4).attr('filter', 'url(#vignetteShadow)');
  
  // Contenido clipeado
  const c1 = gV1.append('g').attr('clip-path', 'url(#clipVig1)');
  // Cielo y fondo industrial cálido
  c1.append('rect').attr('x', -v1R).attr('y', -v1R).attr('width', v1R * 2).attr('height', v1R * 2).attr('fill', '#ffedd5');
  // Pórtico estructural de acero de la nave (cercha industrial)
  c1.append('polygon').attr('points', `${-v1R},-10 0,-45 ${v1R},-10 ${v1R},-5 ${-v1R},-5`).attr('fill', '#7c2d12');
  // Correas diagonales de cercha
  c1.append('line').attr('x1', -35).attr('y1', -10).attr('x2', 0).attr('y2', -40).attr('stroke', '#fed7aa').attr('stroke-width', 1.2);
  c1.append('line').attr('x1', 35).attr('y1', -10).attr('x2', 0).attr('y2', -40).attr('stroke', '#fed7aa').attr('stroke-width', 1.2);
  // Plataforma de concreto del muelle a cota cero
  c1.append('rect').attr('x', -v1R).attr('y', 15).attr('width', v1R * 2).attr('height', 40).attr('fill', '#64748b');
  // Franja de señalización amarilla y negra en el borde
  c1.append('rect').attr('x', -v1R).attr('y', 13).attr('width', v1R * 2).attr('height', 3).attr('fill', '#eab308');

  // Camión de carga pesada descargando en muelle (izquierda)
  const gTruck = c1.append('g').attr('transform', 'translate(-28, 4)');
  gTruck.append('rect').attr('x', -18).attr('y', -12).attr('width', 20).attr('height', 16).attr('fill', '#991b1b'); // Cabina roja
  gTruck.append('rect').attr('x', -15).attr('y', -10).attr('width', 8).attr('height', 6).attr('fill', '#e2e8f0'); // Parabrisas
  gTruck.append('rect').attr('x', 2).attr('y', -16).attr('width', 16).attr('height', 20).attr('fill', '#cbd5e1'); // Furgón
  gTruck.append('circle').attr('cx', -10).attr('cy', 7).attr('r', 3.5).attr('fill', '#0f172a'); // Rueda delantera
  gTruck.append('circle').attr('cx', 10).attr('cy', 7).attr('r', 3.5).attr('fill', '#0f172a'); // Rueda trasera

  // Tolva mecatrónica de captación automática (centro)
  const gTolva = c1.append('g').attr('transform', 'translate(8, -8)');
  gTolva.append('polygon').attr('points', '-14,-15 14,-15 7,6 -7,6').attr('fill', '#ea580c'); // Tolva
  gTolva.append('rect').attr('x', -4).attr('y', 6).attr('width', 8).attr('height', 6).attr('fill', '#c2410c'); // Boca de descarga
  // Rastrojo orgánico que ingresa
  gTolva.append('circle').attr('cx', -4).attr('cy', -12).attr('r', 2.2).attr('fill', '#84cc16');
  gTolva.append('circle').attr('cx', 2).attr('cy', -14).attr('r', 2.4).attr('fill', '#f97316');
  gTolva.append('circle').attr('cx', 5).attr('cy', -10).attr('r', 2.0).attr('fill', '#eab308');
  // Cinta transportadora mecánica inclinada
  c1.append('line').attr('x1', 8).attr('y1', 2).attr('x2', 45).attr('y2', -22).attr('stroke', '#0f172a').attr('stroke-width', 3);
  c1.append('line').attr('x1', 8).attr('y1', 4).attr('x2', 45).attr('y2', -20).attr('stroke', '#fb923c').attr('stroke-width', 1.8);

  // Cotero operador mecatrónico formalizado (derecha)
  const gCot = c1.append('g').attr('transform', 'translate(26, 4)');
  gCot.append('circle').attr('cx', 0).attr('cy', -9).attr('r', 3).attr('fill', '#0284c7'); // Casco técnico
  gCot.append('path').attr('d', 'M -3,-6 L 3,-6 L 2.5,4 L -2.5,4 Z').attr('fill', '#f97316'); // Chaleco reflectivo
  gCot.append('rect').attr('x', 3).attr('y', -4).attr('width', 5).attr('height', 4).attr('rx', 0.8).attr('fill', '#38bdf8'); // Tablet consola
  gCot.append('line').attr('x1', -1.5).attr('y1', 4).attr('x2', -1.5).attr('y2', 10).attr('stroke', '#0f172a').attr('stroke-width', 1.4);
  gCot.append('line').attr('x1', 1.5).attr('y1', 4).attr('x2', 1.5).attr('y2', 10).attr('stroke', '#0f172a').attr('stroke-width', 1.4);

  // Rótulo inferior sobreimpreso en la viñeta
  gV1.append('rect').attr('x', -46).attr('y', 28).attr('width', 92).attr('height', 17).attr('rx', 4)
    .attr('fill', 'rgba(15,23,42,0.88)').attr('stroke', '#ea580c').attr('stroke-width', 1);
  gV1.append('text').text('CORABASTOS · MUELLE').attr('y', 36).attr('text-anchor', 'middle')
    .attr('fill', '#fed7aa').attr('font-size', '6.5px').attr('font-weight', '800').attr('font-family', 'JetBrains Mono, monospace');
  gV1.append('text').text('300 t/día captadas').attr('y', 42.5).attr('text-anchor', 'middle')
    .attr('fill', '#ffffff').attr('font-size', '5.5px').attr('font-family', 'Instrument Sans, sans-serif');

  gV1.on('mouseenter', () => showInfoCard('VIÑETA 1: MUELLE MECATRÓNICO CORABASTOS', 'Logística & Tolvas Automatizadas', '#ea580c', 'Recepción mecanizada continua de rastrojo y tubérculos sin intermediación especulativa. Formaliza el trabajo de 320 coteros eliminando el cargue a lomo.'));
  gV1.on('mouseleave', hideInfoCard);

  // -------------------------------------------------------------------------
  // Viñeta 2: Comensalidad y Red de 150 Tiendas (Comedor Cívico & Soberanía)
  // -------------------------------------------------------------------------
  const v2X = 95, v2Y = 300, v2R = 52;
  // Líneas de conexión
  gVignettes.append('line').attr('x1', v2X + v2R).attr('y1', v2Y).attr('x2', 335).attr('y2', 365)
    .attr('stroke', '#cbd5e1').attr('stroke-width', 1.6).attr('stroke-dasharray', '3 3');

  const gV2 = gVignettes.append('g').attr('transform', `translate(${v2X},${v2Y})`).style('cursor', 'pointer');
  gV2.append('circle').attr('r', v2R).attr('fill', '#ffffff').attr('stroke', '#d97706').attr('stroke-width', 2.4).attr('filter', 'url(#vignetteShadow)');

  const c2 = gV2.append('g').attr('clip-path', 'url(#clipVig2)');
  // Fondo de espacio cívico cálido
  c2.append('rect').attr('x', -v2R).attr('y', -v2R).attr('width', v2R * 2).attr('height', v2R * 2).attr('fill', '#fef9c3');
  // Estructura de madera laminada vista (pérgola/carpa tensada)
  c2.append('path').attr('d', `M ${-v2R},-15 Q 0,-48 ${v2R},-15`).attr('fill', 'none').attr('stroke', '#b45309').attr('stroke-width', 4);
  c2.append('path').attr('d', `M ${-v2R},-12 Q 0,-44 ${v2R},-12`).attr('fill', '#fef08a').attr('opacity', 0.5);
  // Columnas de madera
  c2.append('line').attr('x1', -28).attr('y1', -25).attr('x2', -28).attr('y2', 20).attr('stroke', '#b45309').attr('stroke-width', 2.2);
  c2.append('line').attr('x1', 28).attr('y1', -25).attr('x2', 28).attr('y2', 20).attr('stroke', '#b45309').attr('stroke-width', 2.2);
  // Lámparas colgantes cálidas
  c2.append('line').attr('x1', -12).attr('y1', -35).attr('x2', -12).attr('y2', -18).attr('stroke', '#78350f').attr('stroke-width', 1);
  c2.append('circle').attr('cx', -12).attr('cy', -16).attr('r', 2.5).attr('fill', '#fde047');
  c2.append('line').attr('x1', 12).attr('y1', -35).attr('x2', 12).attr('y2', -18).attr('stroke', '#78350f').attr('stroke-width', 1);
  c2.append('circle').attr('cx', 12).attr('cy', -16).attr('r', 2.5).attr('fill', '#fde047');

  // Suelo de adoquín
  c2.append('rect').attr('x', -v2R).attr('y', 16).attr('width', v2R * 2).attr('height', 40).attr('fill', '#d97706').attr('opacity', 0.25);

  // Mesa comunal larga con comensales
  c2.append('rect').attr('x', -34).attr('y', 0).attr('width', 68).attr('height', 6).attr('rx', 1.5).attr('fill', '#78350f'); // Mesa
  c2.append('line').attr('x1', -24).attr('y1', 6).attr('x2', -24).attr('y2', 18).attr('stroke', '#78350f').attr('stroke-width', 2);
  c2.append('line').attr('x1', 24).attr('y1', 6).attr('x2', 24).attr('y2', 18).attr('stroke', '#78350f').attr('stroke-width', 2);

  // Platos calientes y canastas de hortalizas sobre la mesa
  c2.append('ellipse').attr('cx', -16).attr('cy', 0).attr('rx', 4).attr('ry', 1.8).attr('fill', '#ffffff');
  c2.append('ellipse').attr('cx', 0).attr('cy', 0).attr('rx', 5).attr('ry', 2.0).attr('fill', '#ffffff');
  c2.append('ellipse').attr('cx', 16).attr('cy', 0).attr('rx', 4).attr('ry', 1.8).attr('fill', '#ffffff');
  // Canasta de setas Pleurotus y hortalizas
  c2.append('rect').attr('x', -7).attr('y', -5).attr('width', 14).attr('height', 4).attr('fill', '#b45309');
  c2.append('circle').attr('cx', -2).attr('cy', -6).attr('r', 2).attr('fill', '#be123c');
  c2.append('circle').attr('cx', 3).attr('cy', -6).attr('r', 2.2).attr('fill', '#16a34a');

  // Tres comensales sentados compartiendo
  function drawDiner(x, col) {
    const d = c2.append('g').attr('transform', `translate(${x},-3)`);
    d.append('circle').attr('cx', 0).attr('cy', -7).attr('r', 2.8).attr('fill', col);
    d.append('path').attr('d', 'M -3,-4 L 3,-4 L 2.5,3 L -2.5,3 Z').attr('fill', col);
  }
  drawDiner(-20, '#0284c7');
  drawDiner(0, '#be123c');
  drawDiner(20, '#15803d');

  // Pizarra de la Mesa Federativa de fondo
  c2.append('rect').attr('x', -14).attr('y', -24).attr('width', 28).attr('height', 10).attr('rx', 1).attr('fill', '#0f172a');
  c2.append('line').attr('x1', -10).attr('y1', -20).attr('x2', 10).attr('y2', -20).attr('stroke', '#38bdf8').attr('stroke-width', 1);
  c2.append('line').attr('x1', -10).attr('y1', -17).attr('x2', 4).attr('y2', -17).attr('stroke', '#fde047').attr('stroke-width', 1);

  // Rótulo inferior
  gV2.append('rect').attr('x', -46).attr('y', 28).attr('width', 92).attr('height', 17).attr('rx', 4)
    .attr('fill', 'rgba(15,23,42,0.88)').attr('stroke', '#d97706').attr('stroke-width', 1);
  gV2.append('text').text('COMENSALIDAD & ASAMBLEA').attr('y', 36).attr('text-anchor', 'middle')
    .attr('fill', '#fde047').attr('font-size', '6.5px').attr('font-weight', '800').attr('font-family', 'JetBrains Mono, monospace');
  gV2.append('text').text('500 raciones/día · SDIS').attr('y', 42.5).attr('text-anchor', 'middle')
    .attr('fill', '#ffffff').attr('font-size', '5.5px').attr('font-family', 'Instrument Sans, sans-serif');

  gV2.on('mouseenter', () => showInfoCard('VIÑETA 2: COMENSALIDAD POPULAR Y ASAMBLEA', 'Comedor Cívico & 150 Tiendas', '#d97706', '500 raciones calientes diarias y despacho de canastas barriales a 150 tiendas locales de Kennedy. Mesa deliberativa sin líderes centrales.'));
  gV2.on('mouseleave', hideInfoCard);

  // -------------------------------------------------------------------------
  // Viñeta 3: Borde Ecológico y Humedal El Burro (Fitodepuración y Tinguas)
  // -------------------------------------------------------------------------
  const v3X = 130, v3Y = 475, v3R = 52;
  // Línea de conexión al clúster ecológico
  gVignettes.append('line').attr('x1', v3X + v3R).attr('y1', v3Y - 8).attr('x2', 595).attr('y2', 485)
    .attr('stroke', '#cbd5e1').attr('stroke-width', 1.6).attr('stroke-dasharray', '3 3');

  const gV3 = gVignettes.append('g').attr('transform', `translate(${v3X},${v3Y})`).style('cursor', 'pointer');
  gV3.append('circle').attr('r', v3R).attr('fill', '#ffffff').attr('stroke', '#059669').attr('stroke-width', 2.4).attr('filter', 'url(#vignetteShadow)');

  const c3 = gV3.append('g').attr('clip-path', 'url(#clipVig3)');
  // Cielo y atmósfera limpia de la reserva
  c3.append('rect').attr('x', -v3R).attr('y', -v3R).attr('width', v3R * 2).attr('height', v3R * 2).attr('fill', '#e0f2fe');
  // Espejo de agua descontaminada del Humedal El Burro
  c3.append('ellipse').attr('cx', 0).attr('cy', 22).attr('rx', 54).attr('ry', 32).attr('fill', '#7dd3fc');
  // Ondas suaves del agua
  c3.append('path').attr('d', 'M -35,16 Q -20,12 -5,16 T 25,16 T 45,16').attr('fill', 'none').attr('stroke', '#0284c7').attr('stroke-width', 1.2).attr('opacity', 0.6);
  c3.append('path').attr('d', 'M -40,26 Q -25,22 -10,26 T 20,26 T 40,26').attr('fill', 'none').attr('stroke', '#0284c7').attr('stroke-width', 1.2).attr('opacity', 0.6);

  // Taludes escalonados de fitodepuración (a la izquierda)
  c3.append('polygon').attr('points', '-52,-10 -25,-10 -30,6 -52,6').attr('fill', '#86efac'); // Terraza 1
  c3.append('polygon').attr('points', '-52,6 -28,6 -35,22 -52,22').attr('fill', '#4ade80'); // Terraza 2
  c3.append('line').attr('x1', -25).attr('y1', -10).attr('x2', -30).attr('y2', 6).attr('stroke', '#166534').attr('stroke-width', 1.4);
  c3.append('line').attr('x1', -28).attr('y1', 6).attr('x2', -35).attr('y2', 22).attr('stroke', '#166534').attr('stroke-width', 1.4);

  // Arboleda nativa de alisos (Alnus acuminata)
  c3.append('circle').attr('cx', 24).attr('cy', -16).attr('r', 16).attr('fill', '#15803d');
  c3.append('circle').attr('cx', 38).attr('cy', -10).attr('r', 14).attr('fill', '#16a34a');
  c3.append('line').attr('x1', 24).attr('y1', 0).attr('x2', 24).attr('y2', 14).attr('stroke', '#78350f').attr('stroke-width', 2);
  c3.append('line').attr('x1', 38).attr('y1', 4).attr('x2', 38).attr('y2', 16).attr('stroke', '#78350f').attr('stroke-width', 2);

  // Juncos y eneas en la orilla
  [-12, -4, 4, 12].forEach(jx => {
    c3.append('line').attr('x1', jx).attr('y1', 18).attr('x2', jx - 2).attr('y2', 0).attr('stroke', '#15803d').attr('stroke-width', 1.4);
    c3.append('line').attr('x1', jx).attr('y1', 18).attr('x2', jx + 2).attr('y2', 2).attr('stroke', '#16a34a').attr('stroke-width', 1.2);
    c3.append('rect').attr('x', jx - 1.2).attr('y', 0).attr('width', 2).attr('height', 5).attr('fill', '#78350f'); // Espiga
  });

  // Tingua bogotana (Rallus semiplumbeus) nadando en el humedal
  const gTingua = c3.append('g').attr('transform', 'translate(-6, 20)');
  gTingua.append('ellipse').attr('cx', 0).attr('cy', 0).attr('rx', 6.5).attr('ry', 4.5).attr('fill', '#334155'); // Cuerpo gris pizarra
  gTingua.append('circle').attr('cx', 5).attr('cy', -3.5).attr('r', 2.8).attr('fill', '#334155'); // Cabeza
  gTingua.append('path').attr('d', 'M 7,-4 L 11,-3 L 7,-2 Z').attr('fill', '#dc2626'); // Pico rojo característico
  gTingua.append('path').attr('d', 'M -4,-2 Q 0,-6 4,-2').attr('stroke', '#b45309').attr('stroke-width', 1.2); // Ala parda

  // Pasarela peatonal elevada de madera (arriba a la derecha)
  c3.append('line').attr('x1', 0).attr('y1', -8).attr('x2', 35).attr('y2', -4).attr('stroke', '#b45309').attr('stroke-width', 3);
  c3.append('line').attr('x1', 0).attr('y1', -14).attr('x2', 35).attr('y2', -10).attr('stroke', '#78350f').attr('stroke-width', 1); // Baranda
  // Visitante observando aves con binoculares
  c3.append('circle').attr('cx', 16).attr('cy', -18).attr('r', 2.5).attr('fill', '#0284c7');
  c3.append('line').attr('x1', 16).attr('y1', -15).attr('x2', 16).attr('y2', -6).attr('stroke', '#0284c7').attr('stroke-width', 1.8);

  // Rótulo inferior
  gV3.append('rect').attr('x', -46).attr('y', 28).attr('width', 92).attr('height', 17).attr('rx', 4)
    .attr('fill', 'rgba(15,23,42,0.88)').attr('stroke', '#059669').attr('stroke-width', 1);
  gV3.append('text').text('HUMEDAL EL BURRO & PARQUE').attr('y', 36).attr('text-anchor', 'middle')
    .attr('fill', '#86efac').attr('font-size', '6.5px').attr('font-weight', '800').attr('font-family', 'JetBrains Mono, monospace');
  gV3.append('text').text('Fitodepuración · Cero lixiviados').attr('y', 42.5).attr('text-anchor', 'middle')
    .attr('fill', '#ffffff').attr('font-size', '5.5px').attr('font-family', 'Instrument Sans, sans-serif');

  gV3.on('mouseenter', () => showInfoCard('VIÑETA 3: BORDE ECOLÓGICO & HUMEDAL EL BURRO', 'Fitodepuración & Restauración Biótica', '#059669', 'Talud escalonado con juncos y alisos que garantiza vertimiento cero de lixiviados hacia la reserva hídrica y atrae de nuevo a la tingua bogotana y polinizadores.'));
  gV3.on('mouseleave', hideInfoCard);

  // =========================================================================
  // TARJETA DE INSPECCIÓN INTERACTIVA (HUD INFERIOR)
  // =========================================================================
  const hudBox = gRoot.append('g').attr('transform', 'translate(510, 565)').style('opacity', 0);
  hudBox.append('rect').attr('x', -260).attr('y', -24).attr('width', 520).attr('height', 48).attr('rx', 8)
    .attr('fill', 'rgba(15,23,42,0.95)').attr('stroke', '#38bdf8').attr('stroke-width', 1.5).attr('filter', 'url(#bubbleShadow)');

  const hudTit = hudBox.append('text').attr('x', -240).attr('y', -6).attr('fill', '#fde047').attr('font-size', '10.5px').attr('font-weight', '800')
    .attr('font-family', 'Instrument Sans, sans-serif');
  const hudSub = hudBox.append('text').attr('x', 40).attr('y', -6).attr('fill', '#38bdf8').attr('font-size', '9px').attr('font-weight', '700')
    .attr('font-family', 'JetBrains Mono, monospace');
  const hudDesc = hudBox.append('text').attr('x', -240).attr('y', 12).attr('fill', '#e2e8f0').attr('font-size', '8.5px')
    .attr('font-family', 'Instrument Sans, sans-serif');

  function showInfoCard(tit, sub, col, desc) {
    hudTit.text(tit.toUpperCase()).attr('fill', col);
    hudSub.text(sub);
    hudDesc.text(desc);
    hudBox.select('rect').attr('stroke', col);
    hudBox.transition().duration(180).style('opacity', 1);
  }
  function hideInfoCard() {
    hudBox.transition().duration(250).style('opacity', 0);
  }

  // Tarjeta fija explicativa de la leyenda al pie
  const gFoot = gRoot.append('g').attr('transform', 'translate(45, 588)');
  gFoot.append('text').text('● PAQUETES:').attr('fill', '#64748b').attr('font-size', '8px').attr('font-weight', '800').attr('font-family', 'JetBrains Mono, monospace');
  const LEGS = [
    {n: 'Muelle Corabastos', c: '#ea580c'},
    {n: 'Bóvedas & Silos', c: '#be123c'},
    {n: 'Reconversión Laboral', c: '#0284c7'},
    {n: 'Comedor & 150 Tiendas', c: '#d97706'},
    {n: 'Humedal El Burro', c: '#059669'}
  ];
  let curLegX = 120;
  LEGS.forEach(lg => {
    gFoot.append('circle').attr('cx', curLegX).attr('cy', -3).attr('r', 3.5).attr('fill', lg.c);
    gFoot.append('text').text(lg.n).attr('x', curLegX + 7).attr('y', 0).attr('fill', '#334155').attr('font-size', '7.5px').attr('font-weight', '600')
      .attr('font-family', 'Instrument Sans, sans-serif');
    curLegX += lg.n.length * 5.4 + 20;
  });
}
