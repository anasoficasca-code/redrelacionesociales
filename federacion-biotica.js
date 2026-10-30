// federacion-biotica.js
// Rediseño 100% visual en forma de RED con ICONOS:
// 1. Diagrama de Red: Jerarquía Vertical vs. Federación Policéntrica (Sin Líder)
// 2. Grafo de Red Sociobiótica: Lugares (Dónde) + Personas (Quiénes) + Especies del Humedal El Burro (Relaciones bióticas y Para qué)

(function(){
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
    padding: 5px 11px;
    border-radius: 999px;
    cursor: pointer;
    transition: all .15s;
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
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    display: flex;
    align-items: center;
    gap: 8px;
  }
  .tip-desc {
    margin: 4px 0 0;
    font-size: 13px;
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
      titulo: 'Hoy: Jerarquía (Mando Vertical)',
      sub: 'Un solo orden: las entidades deciden arriba; los costos caen sobre las bases.',
      nodos: [
        { id:'j1', n:'Alcaldía & UAESP', icon:'🏛️', y:110, tag:'Decisión y Contratos', col:'#f87171' },
        { id:'j2', n:'Gerencia Corabastos', icon:'🏢', y:190, tag:'Monopolio Mayorista', col:'#fb923c' },
        { id:'j3', n:'Transporte & Aseo', icon:'🚛', y:270, tag:'Operación Externa', col:'#fbbf24' },
        { id:'j4', n:'Recicladores & Coteros', icon:'👷', y:350, tag:'Trabajo Físico', col:'#94a3b8' },
        { id:'j5', n:'Vecinos & Humedal', icon:'👥', y:430, tag:'Soportan Costos', col:'#64748b' }
      ]
    },
    federacion: {
      titulo: 'Propuesta: Federación Policéntrica (Sin Líder)',
      sub: 'Red horizontal de núcleos autónomos: NO HAY LÍDER CENTRAL.',
      centro: { id:'fc', n:'Mesa Federativa', icon:'🤝', tag:'Vocerías rotativas · Consentimiento', col:'#38bdf8' },
      nodos: [
        { id:'f1', n:'Huertas & Alimentos', icon:'🌿', tag:'Hogares y Comedores', col:'#4ade80', angle: -Math.PI/2 },
        { id:'f2', n:'Humedal & Agua', icon:'🦆', tag:'Custodios El Burro', col:'#38bdf8', angle: -Math.PI/2 + (2*Math.PI/5) },
        { id:'f3', n:'Circularidad & Compost', icon:'♻️', tag:'Recicladores', col:'#facc15', angle: -Math.PI/2 + 2*(2*Math.PI/5) },
        { id:'f4', n:'Comercio Barrial', icon:'🏪', tag:'Tenderos y Ferias', col:'#fb923c', angle: -Math.PI/2 + 3*(2*Math.PI/5) },
        { id:'f5', n:'Soporte Público', icon:'🏛️', tag:'UAESP y Alcaldía (sin mando)', col:'#c084fc', angle: -Math.PI/2 + 4*(2*Math.PI/5) }
      ]
    }
  };

  // 2. RED SOCIOBIÓTICA: Lugares + Personas + Relaciones Bióticas atraídas
  const NODOS_SOCIOBIOTICA = [
    // --- LUGARES (Dónde) ---
    { id:'L_inv', cat:'lugar', n:'Huerta Invasión', icon:'🏡', col:'#4ade80', x:320, y:180,
      quienes:'Familias de asentamiento informal',
      paraque:'Autoconsumo diario y soberanía alimentaria en barrios populares' },
    { id:'L_alt', cat:'lugar', n:'Huerta en Altura', icon:'🏢', col:'#38bdf8', x:480, y:140,
      quienes:'Vecinos de conjuntos residenciales',
      paraque:'Aprovechar terrazas ociosas y reducir isla de calor' },
    { id:'L_bal', cat:'lugar', n:'Huerta en Baldío', icon:'🏞️', col:'#2dd4bf', x:640, y:190,
      quienes:'Juntas Comunales (JAC) y jóvenes',
      paraque:'Recuperar lotes abandonados y crear espacio comunitario' },
    { id:'L_hum', cat:'lugar', n:'Ronda Humedal El Burro', icon:'💧', col:'#06b6d4', x:500, y:290,
      quienes:'Custodios del humedal y vecinos ribereños',
      paraque:'Franja agroecológica de amortiguamiento y protección hídrica' },
    { id:'L_com', cat:'lugar', n:'Estación Compostaje', icon:'♻️', col:'#eab308', x:310, y:380,
      quienes:'Recicladores organizados y coteros',
      paraque:'Desviar orgánicos de Corabastos y transformarlos en abono gratis' },
    { id:'L_aco', cat:'lugar', n:'Acopio & Tiendas', icon:'🏪', col:'#f97316', x:670, y:350,
      quienes:'Tenderos barriales y vendedores de feria',
      paraque:'Venta directa a precio justo de excedentes agrícolas' },
    { id:'L_hon', cat:'lugar', n:'Distrito de Hongos', icon:'🍄', col:'#ec4899', x:420, y:460,
      quienes:'Técnicos comunitarios en micología',
      paraque:'Cultivar proteína de setas sobre rastrojos agrícolas de Corabastos' },
    { id:'L_esc', cat:'lugar', n:'Comedores & Escuelas', icon:'🍲', col:'#a855f7', x:580, y:450,
      quienes:'Cocineras comunitarias, docentes y estudiantes',
      paraque:'Comensalidad digna y formación de relevo generacional' },

    // --- PERSONAS (Quiénes) ---
    { id:'P_hor', cat:'persona', n:'Hortelanos & Familias', icon:'👩‍🌾', col:'#86efac', x:160, y:140,
      quienes:'Vecinas y hortelanos populares',
      paraque:'Siembra, deshierbe y cosecha cotidiana en los barrios' },
    { id:'P_jac', cat:'persona', n:'Juntas de Acción Comunal', icon:'👥', col:'#67e8f9', x:800, y:140,
      quienes:'Dignatarios y líderes vecinales',
      paraque:'Gestión de lotes, salones comunales y mingas de trabajo' },
    { id:'P_cus', cat:'persona', n:'Custodios Humedal', icon:'🦆', col:'#38bdf8', x:140, y:270,
      quienes:'Colectivos ambientales de El Burro y La Vaca',
      paraque:'Veeduría ambiental, monitoreo de agua y cuidado de la fauna' },
    { id:'P_rec', cat:'persona', n:'Recicladores de Orgánicos', icon:'🦺', col:'#fde047', x:150, y:400,
      quienes:'Asociaciones de recicladores de oficio',
      paraque:'Recolección diferenciada y manejo de camas de compostaje' },
    { id:'P_ten', cat:'persona', n:'Tenderos Barriales', icon:'🛒', col:'#fdba74', x:820, y:360,
      quienes:'Comerciantes de víveres del barrio',
      paraque:'Compra preferencial de hortalizas locales para abastecer a las familias' },
    { id:'P_coc', cat:'persona', n:'Cocineras Comunitarias', icon:'👩‍🍳', col:'#d8b4fe', x:800, y:470,
      quienes:'Madres comunitarias y líderes de comedores',
      paraque:'Transformar lo cosechado en raciones calientes saludables' },

    // --- ESPECIES BIÓTICAS (Atraídas del Humedal El Burro) ---
    { id:'B_abe', cat:'biotica', n:'Polinizadores (Abejas/Mariposas)', icon:'🐝', col:'#fde047', x:400, y:60,
      quienes:'Bombus pauloensis, Abeja angelita, Mariposas',
      paraque:'Polinizar flores de hortalizas y frutales: ¡aumenta la cosecha un 40%!' },
    { id:'B_ave', cat:'biotica', n:'Aves (Tinguas/Cucarachero)', icon:'🐦', col:'#38bdf8', x:590, y:60,
      quienes:'Tingua bogotana, cucarachero de pantano, colibrí, mirlas',
      paraque:'Control biológico natural de gusanos, orugas y plagas sin pesticidas' },
    { id:'B_lom', cat:'biotica', n:'Lombrices & Microbiota', icon:'🪱', col:'#fb923c', x:330, y:270,
      quienes:'Lombriz roja californiana y bacterias nitrificantes',
      paraque:'Degradar vorazmente los residuos orgánicos y generar abono vivo' },
    { id:'B_ran', cat:'biotica', n:'Rana Sabanera', icon:'🐸', col:'#4ade80', x:640, y:270,
      quienes:'Dendropsophus labialis (anfibio nativo)',
      paraque:'Depredar larvas de zancudos y ser bioindicador de agua sin venenos' },
    { id:'B_flo', cat:'biotica', n:'Flora Nativa (Aliso/Chilco)', icon:'🌿', col:'#a3e635', x:250, y:200,
      quienes:'Aliso, chilco, botón de oro, ruda y caléndula',
      paraque:'Cercas vivas cortaviento, hospederos florales y fijación de nitrógeno' }
  ];

  const ENLACES_SOCIOBIOTICA = [
    // Lugares <-> Personas
    { s:'P_hor', t:'L_inv', label:'Cultiva y cuida' },
    { s:'P_hor', t:'L_alt', label:'Manejo de terrazas' },
    { s:'P_jac', t:'L_bal', label:'Asigna y convoca' },
    { s:'P_cus', t:'L_hum', label:'Restaura y custodia' },
    { s:'P_rec', t:'L_com', label:'Opera composteras' },
    { s:'P_ten', t:'L_aco', label:'Distribuye y vende' },
    { s:'P_coc', t:'L_esc', label:'Cocina raciones' },

    // Lugares <-> Especies atraídas del humedal (¿Para qué?)
    { s:'B_abe', t:'L_inv', label:'Poliniza hortalizas' },
    { s:'B_abe', t:'L_alt', label:'Conecta islas florales' },
    { s:'B_abe', t:'L_bal', label:'Aumenta rendimiento' },
    { s:'B_ave', t:'L_hum', label:'Control biológico de plagas' },
    { s:'B_ave', t:'L_bal', label:'Dispersa semillas nativas' },
    { s:'B_ave', t:'L_esc', label:'Pedagogía ambiental' },
    { s:'B_lom', t:'L_com', label:'Digiere residuos orgánicos' },
    { s:'B_lom', t:'L_inv', label:'Nutre las camas de siembra' },
    { s:'B_ran', t:'L_hum', label:'Controla larvas de mosquitos' },
    { s:'B_flo', t:'L_hum', label:'Cerca viva y biofiltro' },
    { s:'B_flo', t:'L_inv', label:'Barrera y repelente natural' },

    // Flujos entre lugares (El circuito integrado)
    { s:'L_inv', t:'L_aco', label:'Entrega excedentes' },
    { s:'L_bal', t:'L_aco', label:'Entrega cosechas' },
    { s:'L_com', t:'L_inv', label:'Aporta compost' },
    { s:'L_com', t:'L_bal', label:'Aporta compost' },
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

      <!-- Filtros para la Red Sociobiótica -->
      <div class="fed-filters-pill" id="fedFilters" style="display:none">
        <button class="ff-btn active" data-filter="all">Toda la Red (20)</button>
        <button class="ff-btn" data-filter="lugar">🏡 8 Lugares</button>
        <button class="ff-btn" data-filter="persona">👥 6 Personas</button>
        <button class="ff-btn" data-filter="biotica">🐝 6 Especies Bióticas</button>
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

  // --- MOTOR DE DIBUJO D3 DE LAS DOS REDES ---
  let activeTab = 'comparacion';
  let activeFilter = 'all';

  function renderView() {
    const svg = d3.select('#fedSvg');
    svg.selectAll('*').remove();

    const tip = document.getElementById('fedTip');
    const filtersBar = document.getElementById('fedFilters');
    if (filtersBar) filtersBar.style.display = activeTab === 'sociobiotica' ? 'inline-flex' : 'none';

    // Función para mostrar tooltip
    function showTip(badge, col, title, desc) {
      if (!tip) return;
      const b = document.getElementById('tipBadge');
      const t = document.getElementById('tipTitle');
      const d = document.getElementById('tipDesc');
      b.textContent = badge;
      b.style.background = col + '25';
      b.style.color = col;
      b.style.border = '1px solid ' + col;
      t.innerHTML = title;
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
    const W = 1000, H = 620;

    // Fondo dividido
    const gBg = svg.append('g');
    gBg.append('rect').attr('x', 30).attr('y', 55).attr('width', 440).attr('height', 525).attr('rx', 18)
      .attr('fill', '#0e1320').attr('stroke', 'rgba(239,68,68,0.3)').attr('stroke-width', 1.5);
    gBg.append('rect').attr('x', 510).attr('y', 55).attr('width', 460).attr('height', 525).attr('rx', 18)
      .attr('fill', '#0d1924').attr('stroke', 'rgba(56,189,248,0.4)').attr('stroke-width', 1.5);

    // Título Columna 1: Jerarquía
    const h1 = svg.append('g').attr('transform', 'translate(250, 85)');
    h1.append('text').text('HOY: JERARQUÍA PIRAMIDAL').attr('text-anchor', 'middle')
      .attr('fill', '#f87171').attr('font-weight', '800').attr('font-size', '15px').attr('letter-spacing', '0.06em');
    h1.append('text').text('Un solo orden: decisiones arriba · costos abajo').attr('text-anchor', 'middle')
      .attr('fill', '#94a3b8').attr('font-size', '11.5px').attr('y', 18);

    // Título Columna 2: Federación sin líder
    const h2 = svg.append('g').attr('transform', 'translate(740, 85)');
    h2.append('text').text('PROPUESTA: FEDERACIÓN POLICÉNTRICA').attr('text-anchor', 'middle')
      .attr('fill', '#38bdf8').attr('font-weight', '800').attr('font-size', '15px').attr('letter-spacing', '0.06em');
    h2.append('text').text('SIN LÍDER CENTRAL · Nodos autónomos en igualdad horizontal').attr('text-anchor', 'middle')
      .attr('fill', '#34d399').attr('font-size', '11.5px').attr('font-weight', '700').attr('y', 18);

    // Dibujar Escalera de Jerarquía (Lado Izquierdo)
    const jN = DATA_COMP.jerarquia.nodos;
    const gJer = svg.append('g');

    // Flechas descendentes de mando
    for (let i = 0; i < jN.length - 1; i++) {
      const y1 = jN[i].y + 24, y2 = jN[i+1].y - 24;
      gJer.append('line').attr('x1', 250).attr('y1', y1).attr('x2', 250).attr('y2', y2)
        .attr('stroke', '#ef4444').attr('stroke-width', 2.5).attr('stroke-dasharray', '4 4');
      gJer.append('polygon').attr('points', `246,${y2-2} 254,${y2-2} 250,${y2+6}`).attr('fill', '#ef4444');
    }

    // Nodos de Jerarquía
    jN.forEach((n, idx) => {
      const g = gJer.append('g').attr('transform', `translate(250, ${n.y})`).style('cursor', 'pointer');
      g.append('rect').attr('x', -150).attr('y', -20).attr('width', 300).attr('height', 40).attr('rx', 10)
        .attr('fill', '#151d2e').attr('stroke', n.col).attr('stroke-width', idx === 0 ? 2.5 : 1.2);
      g.append('text').text(n.icon).attr('x', -130).attr('y', 6).attr('font-size', '18px');
      g.append('text').text(n.n).attr('x', -98).attr('y', 0).attr('fill', '#fff').attr('font-weight', '700').attr('font-size', '13px');
      g.append('text').text(n.tag).attr('x', -98).attr('y', 14).attr('fill', n.col).attr('font-size', '10.5px').attr('font-weight', '600');
      g.append('circle').attr('cx', 130).attr('cy', 0).attr('r', 11).attr('fill', n.col).attr('opacity', 0.2);
      g.append('text').text(idx + 1).attr('x', 130).attr('y', 4).attr('text-anchor', 'middle').attr('fill', n.col).attr('font-size', '10px').attr('font-weight', '800');

      g.on('mouseenter', () => showTip('Jerarquía Actual', n.col, `${n.icon} ${n.n}`, `<b>Nivel ${idx+1}:</b> ${n.tag}. En el modelo actual, la toma de decisiones está concentrada arriba, excluyendo a quienes ejecutan el trabajo cotidiano.`));
      g.on('mouseleave', hideTip);
    });

    // Dibujar Red Circular de Federación (Lado Derecho)
    const gFed = svg.append('g');
    const fC = { x: 740, y: 325 };
    const fN = DATA_COMP.federacion.nodos;
    const R = 145;

    // Posiciones polares de los 5 nodos
    fN.forEach(n => {
      n.x = fC.x + Math.cos(n.angle) * R;
      n.y = fC.y + Math.sin(n.angle) * R;
    });

    // Enlaces de red entre nodos (malla horizontal)
    for (let i = 0; i < fN.length; i++) {
      for (let j = i + 1; j < fN.length; j++) {
        gFed.append('line').attr('x1', fN[i].x).attr('y1', fN[i].y).attr('x2', fN[j].x).attr('y2', fN[j].y)
          .attr('stroke', '#10b981').attr('stroke-width', 1.2).attr('stroke-dasharray', '3 3').attr('opacity', 0.45);
      }
    }

    // Enlaces hacia el centro (Mesa Federativa)
    fN.forEach(n => {
      gFed.append('line').attr('x1', fC.x).attr('y1', fC.y).attr('x2', n.x).attr('y2', n.y)
        .attr('stroke', '#38bdf8').attr('stroke-width', 2).attr('opacity', 0.7);
    });

    // Centro: Mesa Federativa 🤝
    const gC = gFed.append('g').attr('transform', `translate(${fC.x}, ${fC.y})`).style('cursor', 'pointer');
    gC.append('circle').attr('r', 52).attr('fill', '#0f2438').attr('stroke', '#38bdf8').attr('stroke-width', 3);
    gC.append('text').text('🤝').attr('text-anchor', 'middle').attr('y', -10).attr('font-size', '28px');
    gC.append('text').text('MESA FEDERATIVA').attr('text-anchor', 'middle').attr('y', 14)
      .attr('fill', '#38bdf8').attr('font-size', '10.5px').attr('font-weight', '800').attr('letter-spacing', '0.04em');
    gC.append('text').text('Vocerías rotativas').attr('text-anchor', 'middle').attr('y', 27)
      .attr('fill', '#94a3b8').attr('font-size', '9.5px');

    gC.on('mouseenter', () => showTip('Centro Coordinador', '#38bdf8', '🤝 Mesa Federativa de Kennedy', '<b>SIN LÍDER CENTRAL:</b> Espacio donde convergen los delegados con <b>vocerías rotativas cortas (1 a 3 meses)</b> y mandatos revocables. Se decide por consentimiento mutuo y cogestión pública.'));
    gC.on('mouseleave', hideTip);

    // Nodos Periféricos de la Federación
    fN.forEach(n => {
      const g = gFed.append('g').attr('transform', `translate(${n.x}, ${n.y})`).style('cursor', 'pointer');
      g.append('circle').attr('r', 38).attr('fill', '#111e30').attr('stroke', n.col).attr('stroke-width', 2.5);
      g.append('text').text(n.icon).attr('text-anchor', 'middle').attr('y', -4).attr('font-size', '22px');
      g.append('text').text(n.n).attr('text-anchor', 'middle').attr('y', 16)
        .attr('fill', '#fff').attr('font-size', '10.5px').attr('font-weight', '700');
      g.append('text').text(n.tag).attr('text-anchor', 'middle').attr('y', 27)
        .attr('fill', n.col).attr('font-size', '8.5px').attr('font-weight', '600');

      g.on('mouseenter', () => showTip('Nodo Autónomo', n.col, `${n.icon} ${n.n}`, `<b>Composición:</b> ${n.tag}. Autonomía total para su materia sin someterse a jefes. Se conecta en igualdad de condiciones con los demás núcleos.`));
      g.on('mouseleave', hideTip);
    });

    // Banner destacado inferior
    const bBanner = svg.append('g').attr('transform', 'translate(740, 545)');
    bBanner.append('rect').attr('x', -200).attr('y', -14).attr('width', 400).attr('height', 28).attr('rx', 14)
      .attr('fill', 'rgba(16,185,129,0.18)').attr('stroke', '#10b981').attr('stroke-width', 1.2);
    bBanner.append('text').text('✓ CERO LÍDERES · MANDATO ROTATIVO · CONSENTIMIENTO')
      .attr('text-anchor', 'middle').attr('y', 4).attr('fill', '#34d399').attr('font-weight', '800').attr('font-size', '11.5px');
  }

  // 2. RENDERIZAR RED SOCIOBIÓTICA INTERACTIVA
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

      const line = gLinks.append('line')
        .attr('x1', s.x).attr('y1', s.y).attr('x2', t.x).attr('y2', t.y)
        .attr('stroke', col).attr('stroke-width', isBio ? 2.2 : 1.4)
        .attr('stroke-dasharray', isBio ? '4 3' : null)
        .attr('opacity', 0.5)
        .style('transition', 'all .2s');

      // Animación de partículas ecológicas en relaciones bióticas
      if (isBio) {
        const p = gLinks.append('circle').attr('r', 3).attr('fill', '#34d399');
        p.append('animate').attr('attributeName', 'cx').attr('values', `${s.x};${t.x}`).attr('dur', '2.4s').attr('repeatCount', 'indefinite');
        p.append('animate').attr('attributeName', 'cy').attr('values', `${s.y};${t.y}`).attr('dur', '2.4s').attr('repeatCount', 'indefinite');
      }
    });

    // Dibujar Nodos
    nodes.forEach(n => {
      const g = gNodes.append('g').attr('transform', `translate(${n.x}, ${n.y})`).style('cursor', 'pointer');
      const isLugar = n.cat === 'lugar', isBio = n.cat === 'biotica';

      if (isLugar) {
        g.append('rect').attr('x', -32).attr('y', -32).attr('width', 64).attr('height', 64).attr('rx', 14)
          .attr('fill', '#111827').attr('stroke', n.col).attr('stroke-width', 2.5);
      } else if (isBio) {
        // Diamante brillante para especies bióticas
        g.append('polygon').attr('points', '0,-36 36,0 0,36 -36,0')
          .attr('fill', '#09231f').attr('stroke', n.col).attr('stroke-width', 2.5);
      } else {
        // Círculo para personas
        g.append('circle').attr('r', 30).attr('fill', '#161e2e').attr('stroke', n.col).attr('stroke-width', 2);
      }

      g.append('text').text(n.icon).attr('text-anchor', 'middle').attr('y', 6).attr('font-size', '24px');
      g.append('text').text(n.n).attr('text-anchor', 'middle').attr('y', isLugar ? 46 : isBio ? 48 : 42)
        .attr('fill', '#fff').attr('font-size', '11px').attr('font-weight', '700')
        .style('paint-order', 'stroke').style('stroke', '#080b11').style('stroke-width', '3px');

      // Interacción hover: resaltar conexiones y mostrar ficha rápida
      g.on('mouseenter', () => {
        gLinks.selectAll('line').style('opacity', 0.15);
        gLinks.selectAll('line')
          .filter(l => l.s === n.id || l.t === n.id)
          .style('opacity', 1).style('stroke-width', 3).style('stroke', '#facc15');

        const catName = isLugar ? 'Lugar Territorial (Dónde)' : isBio ? 'Especie del Humedal El Burro' : 'Actor Humano (Quiénes)';
        showTip(catName, n.col, `${n.icon} ${n.n}`, `<b>Participantes:</b> ${n.quienes}<br><b>¿Para qué se articula / atrae?:</b> ${n.paraque}`);
      });

      g.on('mouseleave', () => {
        gLinks.selectAll('line').style('opacity', l => (l.s.startsWith('B_') || l.t.startsWith('B_')) ? 0.5 : 0.45).style('stroke-width', 1.8).style('stroke', null);
        hideTip();
      });
    });

    // Leyenda flotante pequeña en esquina
    const leg = svg.append('g').attr('transform', 'translate(30, 560)');
    leg.append('rect').attr('width', 380).attr('height', 42).attr('rx', 8).attr('fill', 'rgba(14,18,28,0.85)').attr('stroke', 'rgba(255,255,255,0.1)');
    leg.append('text').text('Convenciones:').attr('x', 14).attr('y', 25).attr('fill', '#94a3b8').attr('font-size', '11px').attr('font-weight', '700');
    leg.append('rect').attr('x', 95).attr('y', 14).attr('width', 14).attr('height', 14).attr('rx', 3).attr('fill', '#111827').attr('stroke', '#4ade80').attr('stroke-width', 1.5);
    leg.append('text').text('Lugares (Dónde)').attr('x', 115).attr('y', 26).attr('fill', '#cbd5e1').attr('font-size', '10.5px');
    leg.append('circle').attr('cx', 220).attr('cy', 21).attr('r', 7).attr('fill', '#161e2e').attr('stroke', '#38bdf8').attr('stroke-width', 1.5);
    leg.append('text').text('Personas (Quiénes)').attr('x', 234).attr('y', 26).attr('fill', '#cbd5e1').attr('font-size', '10.5px');
    leg.append('polygon').attr('points', '345,14 352,21 345,28 338,21').attr('fill', '#09231f').attr('stroke', '#fde047').attr('stroke-width', 1.5);
    leg.append('text').text('Especies Bióticas').attr('x', 360).attr('y', 26).attr('fill', '#cbd5e1').attr('font-size', '10.5px');
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
