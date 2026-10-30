// federacion-biotica.js
// Visualizador interactivo de:
// 1. Federación Territorial Policéntrica (Sin Líder Central) vs. Jerarquía Tradicional
// 2. Matriz Operativa del Problema: Qué resolvemos, Dónde, Con Qué y Quiénes (Google Sheet)
// 3. Red Sociobiótica: Lugares, Actores Humanos y Especies del Humedal El Burro Atraídas (humedalburro)

(function(){
  // --- DATOS DE LA MATRIZ OPERATIVA (Google Spreadsheet) ---
  const MATRIZ_PROBLEMA = [
    {
      id: 'm1',
      dinamica: 'Compra concentrada en un solo nodo',
      problema: 'P1 · Dependencia alimentaria de Corabastos: la concentración del abastecimiento de alimentos en un solo nodo hace que tiendas, restaurantes, comedores y hogares de Kennedy dependan de él.',
      actividad: 'Tiendas, restaurantes y comedores se abastecen en la central; los hogares compran lo que esa cadena distribuye.',
      quienes: 'Corabastos S.A., mayoristas, intermediarios, transportadoras, coteros, tenderos, restaurantes, hogares.',
      con_que: 'Camiones de carga pesada, bodegas comerciales, dinero y crédito informal. (Proveedor externo concentrado).',
      donde: 'Espacio: Central Corabastos (entorno externo; no intervenido). Tiempo: diario, madrugada y mañana.',
      adyacencia: 'Corabastos no se modifica; se reconoce como el punto de partida de la vulnerabilidad y dependencia.',
      acceso: 'De Corabastos a tiendas y hogares: acceso indirecto por vías colapsadas del barrio en vehículos de terceros.',
      modelo: 'Variable: dependencia de Corabastos. Bucle de equilibrio: la central responde si baja la compra.'
    },
    {
      id: 'm2',
      dinamica: 'Producción en huertas comunales gestionadas por los barrios',
      problema: 'P1 · Dependencia de Corabastos / Soberanía alimentaria barrial',
      actividad: 'Cultivo, cuidado y cosecha en vivienda de asentamiento informal / invasión (patio, cubierta o lote pequeño).',
      quienes: 'Hogares y vecinos hortelanos, Juntas de Acción Comunal (JAC), residentes.',
      con_que: 'Suelo vivo, compost, lombrices californianas, polinizadores (abejas, abejorros, mariposas), aves pequeñas. Condiciones: suelo sin contaminantes; agua lluvia captada; sin plaguicidas de síntesis.',
      donde: 'Espacio: huerta de vivienda en asentamiento informal. Tiempo: cuidado diario corto; cosecha semanal continua.',
      adyacencia: 'La huerta va junto a la vivienda y cerca de la estación de compostaje y semillero local.',
      acceso: 'Hacia el punto de acopio y distribución: acceso indirecto por rutas del barrio, en carreta o bicicleta.',
      modelo: 'Variables: superficie productiva, producción para autoconsumo y excedentes. Bucle de refuerzo: huertas → excedentes → ingresos → más huertas.'
    },
    {
      id: 'm3',
      dinamica: 'Producción en huertas comunales gestionadas por los barrios',
      problema: 'P1 · Dependencia de Corabastos / Soberanía alimentaria en densidad urbana',
      actividad: 'Cultivo en cubiertas, terrazas, balcones y muros de vivienda en altura (conjuntos residenciales).',
      quienes: 'Copropietarios y residentes, comités de administración del conjunto, hortelanos barriales.',
      con_que: 'Polinizadores, microbiota del sustrato ligero, módulos verticales, bandejas de cultivo. Condiciones: peso admisible de cubierta; riego por goteo sin desperdicio; acuerdos de copropiedad.',
      donde: 'Espacio: cubiertas, terrazas comunitarias y balcones de propiedad horizontal. Tiempo: cuidado semanal; cosechas periódicas.',
      adyacencia: 'La huerta se ubica dentro del conjunto; se conecta con la estación de compostaje para recibir abono.',
      acceso: 'Hacia el punto de acopio: acceso por rutas del barrio. Dentro del edificio: ascensores y escaleras según reglamento.',
      modelo: 'Variables: superficie productiva en altura, reducción de compras externas de hortalizas.'
    },
    {
      id: 'm4',
      dinamica: 'Producción en huertas comunales gestionadas por los barrios',
      problema: 'P1 · Dependencia de Corabastos / Recuperación de suelo baldío',
      actividad: 'Cultivo comunitario en terreno baldío adecuado y biorremediado.',
      quienes: 'JAC, colectivos barriales, vecinos, mediación con Alcaldía Local o dueños de lote.',
      con_que: 'Suelo regenerado, vegetación acompañante (chilco, botón de oro), fauna edáfica. Condiciones: análisis de metales pesados en suelo; cerramiento vivo; biofiltros.',
      donde: 'Espacio: lotes baldíos en desuso en barrios de Kennedy. Tiempo: ciclos estacionales; uso comunitario con turnos.',
      adyacencia: 'La huerta va junto a la estación de compostaje y cerca del punto de acopio; lote con acceso a vía peatonal.',
      acceso: 'Acceso directo desde las calles del barrio para el grupo hortelano con regla de uso transparente.',
      modelo: 'Variables: superficie productiva disponible; límite de suelo y agua. Bucle de equilibrio ecológico.'
    },
    {
      id: 'm5',
      dinamica: 'Producción en huertas comunales gestionadas por los barrios',
      problema: 'P1 · Dependencia de Corabastos / Conectividad socioecológica del humedal',
      actividad: 'Cultivo agroecológico de bajo impacto en la ronda del Humedal El Burro y La Vaca, con restauración.',
      quienes: 'Custodios comunitarios del humedal, colectivos ambientales, vecinos, Secretaría Distrital de Ambiente (SDA).',
      con_que: 'Humedal vivo, aves acuáticas (tinguas, monjitas), anfibios (rana sabanera), flora nativa (aliso, chilco). Condiciones: 100% libre de plaguicidas o fertilizantes químicos; respeto estricto de rondas hídricas y épocas de cría.',
      donde: 'Espacio: franja de amortiguamiento y ronda de humedales. Tiempo: ciclos adaptados al calendario hidrológico.',
      adyacencia: 'Junto al borde del humedal; separada de estaciones de compostaje para evitar lixiviados al espejo de agua.',
      acceso: 'Acceso humano por senderos delimitados; la fauna conserva pasos biológicos libres sin barreras.',
      modelo: 'Variables: restauración ecológica y producción de plantas medicinales y aromáticas. Bucle de equilibrio: preservación del ecosistema.'
    },
    {
      id: 'm6',
      dinamica: 'Autoconsumo y comensalidad de lo producido',
      problema: 'P1 · Inseguridad alimentaria y desnutrición en sectores populares',
      actividad: 'Cocinar y comer colectivamente lo cosechado en los barrios de Kennedy.',
      quienes: 'Hogares, cocineras de comedores comunitarios, colegios públicos (A40), madres comunitarias, cuidadores.',
      con_que: 'Cocinas colectivas, menaje comunitario, alimentos frescos recién cosechados (acelga, lechuga, aromáticas, hongos).',
      donde: 'Espacio: comedores comunitarios, cocinas populares y comedores escolares. Tiempo: raciones calientes diarias al mediodía.',
      adyacencia: 'El comedor se articula con el punto de acopio y huertas cercanas para abastecimiento inmediato.',
      acceso: 'De huertas y punto de acopio al comedor: traslados a pie o en bicitaxi por rutas seguras.',
      modelo: 'Variable: raciones frescas producidas localmente. Reduce la dependencia de compras en Corabastos.'
    },
    {
      id: 'm7',
      dinamica: 'Comercio de excedentes: circuito huertas, vendedores y tiendas',
      problema: 'P1 · Pérdida de excedentes y falta de ingresos para hortelanos',
      actividad: 'Reunir, pesar, clasificar y repartir los excedentes de las huertas comunales.',
      quienes: 'Hortelanos, equipo rotativo del punto de acopio, tenderos de barrio, vendedores populares.',
      con_que: 'Básculas, canastillas limpias, mesas de selección, bicicleta de carga, registro abierto de pesaje.',
      donde: 'Espacio: punto de acopio y distribución barrial. Tiempo: 2 a 3 veces por semana sincronizado con cosechas.',
      adyacencia: 'Junto a ferias vecinales y cerca de tiendas barriales; próximo a ciclorrutas.',
      acceso: 'Acceso directo para hortelanos del vecindario y tenderos que compran hortalizas frescas del día.',
      modelo: 'Variable: excedentes comercializados. Bucle de refuerzo: huertas → excedentes → ingresos justos → más huertas.'
    },
    {
      id: 'm8',
      dinamica: 'Insumos circulares de la red (compost, semillas, agua)',
      problema: 'P1 · Generación masiva de residuos orgánicos y compra costosa de abonos externos',
      actividad: 'Compostar residuos orgánicos de hogares, tiendas y plazas; intercambiar semillas nativas y plántulas.',
      quienes: 'Hortelanos, vecinos, JAC, operadora de aseo, organizaciones de recicladores, UAESP.',
      con_que: 'Microorganismos aerobios, lombrices de tierra (Eisenia foetida), composteras aireadas, semilleros comunitarios.',
      donde: 'Espacio: estación comunitaria de compostaje y semillero local. Tiempo: recepción continua de orgánicos; ciclo de 6-8 semanas.',
      adyacencia: 'Junto a huertas de vivienda y lote baldío; aislada de escorrentías hacia los humedales.',
      acceso: 'Rutas cortas de entrega de residuos orgánicos separados en origen por hogares y tiendas.',
      modelo: 'Variables: toneladas de orgánicos transformadas en abono; reducción de abonos sintéticos comprados afuera.'
    },
    {
      id: 'm9',
      dinamica: 'Distrito biotecnológico: proteína alternativa de bajo costo',
      problema: 'P1 · Alto costo de la proteína animal y desperdicio masivo de rastrojos de Corabastos',
      actividad: 'Cultivar hongos comestibles (Pleurotus ostreatus / setas orellana) sobre sustratos de residuos agrícolas.',
      quienes: 'Técnicos comunitarios en biotecnología, hortelanos, cooperativa gestora, mayoristas proveedores de sustrato.',
      con_que: 'Hongos saprófitos (micelio de Pleurotus), microbiota benéfica, paja/bagazo esterilizado, módulos de fructificación.',
      donde: 'Espacio: unidad de cultivo e inoculación del distrito biotecnológico. Tiempo: ciclos controlados de 3 a 4 semanas.',
      adyacencia: 'Junto al punto de acopio y recepción de residuos agrícolas; área limpia con control de inocuidad.',
      acceso: 'Sustrato entra desde el circuito de Corabastos; la proteína sale directa a comedores y tiendas de barrio.',
      modelo: 'Variables: kilos de proteína de hongos producida; costo de proteína para hogares vulnerables.'
    },
    {
      id: 'm10',
      dinamica: 'Gobierno de la red: federación con rotación de responsabilidades',
      problema: 'P1 · Concentración de poder, desgaste de líderes y riesgo de captura del circuito',
      actividad: 'Deliberar y acordar por asunto (qué se siembra, a quién se vende, cómo se reparten recursos) sin jefes permanentes.',
      quienes: 'Vecinos hortelanos, delegados de JAC, tenderos, cocineras de comedores, recicladores, Alcaldía Local.',
      con_que: 'Asamblea federativa, tableros públicos de información, actas de consentimiento, pactos de cogestión escrita.',
      donde: 'Espacio: salón comunal de JAC, aulas-huerta escolares. Tiempo: asambleas mensuales; vocerías rotan cada 1 a 3 meses.',
      adyacencia: 'Junto al punto de acopio o huerta comunitaria para deliberar en el mismo terreno de producción.',
      acceso: 'Acceso abierto y horizontal para todos los nodos de la red territorial; deliberación por consentimiento.',
      modelo: 'Variables: carga de trabajo por persona, tasa de rotación de vocerías. Previene el desgaste y la captura del circuito.'
    }
  ];

  // --- DATOS DE LA RED SOCIOBIÓTICA (Humedal El Burro & Huertas de Kennedy) ---
  const LUGARES_TERRITORIALES = [
    {
      id: 'L1',
      nombre: 'Huerta en Asentamiento Informal (Invasión)',
      tipo: 'Producción en patio / cubierta baja',
      personas: 'Familias hortelanas, vecinos autoorganizados, comités comunitarios de barrio popular.',
      funcion_humana: 'Cultivo diario para autoconsumo familiar, recolección de aromáticas y semillas criollas.',
      especies_atraidas: ['B1_abejas', 'B2_aves', 'B3_lombrices', 'B6_flora'],
      porque: 'Garantiza comida fresca a costo casi nulo en zonas marginadas y biofiltra aguas lluvias.'
    },
    {
      id: 'L2',
      nombre: 'Huerta en Cubiertas y Terrazas en Altura',
      tipo: 'Producción en propiedad horizontal',
      personas: 'Residentes de conjuntos residenciales, comités de administración, copropietarios voluntarios.',
      funcion_humana: 'Manejo de camas elevadas, cultivo vertical de hortalizas de hoja y compostaje doméstico.',
      especies_atraidas: ['B1_abejas', 'B2_aves'],
      porque: 'Aprovecha techos ociosos, mitiga la isla de calor urbana y crea islas de paso para polinizadores aéreos.'
    },
    {
      id: 'L3',
      nombre: 'Huerta Comunitaria en Lotes Baldíos Adecuados',
      tipo: 'Espacio comunal recuperado',
      personas: 'Juntas de Acción Comunal (JAC), jóvenes barriales, adultos mayores guardianes del lote.',
      funcion_humana: 'Saneamiento del suelo, deshierbe colectivo, siembra de tubérculos y maíz, mingas comunitarias.',
      especies_atraidas: ['B1_abejas', 'B2_aves', 'B3_lombrices', 'B6_flora'],
      porque: 'Transforma botaderos ilegales de escombros en suelo fértil, recreación comunitaria y seguridad barrial.'
    },
    {
      id: 'L4',
      nombre: 'Huerta Agroecológica en Ronda del Humedal El Burro',
      tipo: 'Franja de restauración socioecológica',
      personas: 'Custodios ambientales de El Burro y La Vaca, biólogos comunitarios, vecinos ribereños, Secretaría de Ambiente.',
      funcion_humana: 'Siembra de bajo impacto sin fertilizantes químicos, rescate de flora nativa y monitoreo de aguas.',
      especies_atraidas: ['B1_abejas', 'B2_aves', 'B4_anfibios', 'B6_flora'],
      porque: 'Crea una barrera protectora de amortiguamiento que detiene la invasión de residuos al espejo de agua.'
    },
    {
      id: 'L5',
      nombre: 'Estación Comunitaria de Compostaje y Semillero',
      tipo: 'Infraestructura de circularidad orgánica',
      personas: 'Organizaciones de recicladores de orgánicos, coteros recicladores, hortelanos operadores.',
      funcion_humana: 'Recepción, picado, volteo aeróbico de residuos orgánicos de plazas y hogares, producción de lombricompost.',
      especies_atraidas: ['B3_lombrices', 'B6_flora'],
      porque: 'Desvía toneladas de orgánicos que hoy se pudren en Corabastos o van a Doña Juana, convirtiéndolos en abono gratis.'
    },
    {
      id: 'L6',
      nombre: 'Punto de Acopio, Ferias y Tiendas Barriales',
      tipo: 'Distribución y economía popular',
      personas: 'Tenderos de barrio, vendedores populares de plaza, hortelanos delegados de turno.',
      funcion_humana: 'Pesaje, venta directa a precio justo de excedentes agrícolas y compra preferencial por tiendas locales.',
      especies_atraidas: [],
      porque: 'Evita la especulación de mayoristas externos y retiene los recursos económicos dentro del propio barrio.'
    },
    {
      id: 'L7',
      nombre: 'Distrito Biotecnológico (Unidad de Hongos)',
      tipo: 'Biotecnología popular de alimentos',
      personas: 'Técnicos comunitarios, egresados del SENA/universidades, cooperativas de trabajadores.',
      funcion_humana: 'Inoculación de rastrojos de Corabastos con Pleurotus ostreatus, pasteurización e incubación.',
      especies_atraidas: ['B5_hongos'],
      porque: 'Produce proteína de altísimo valor nutricional para comedores populares a partir de rastrojo agrícola desaprovechado.'
    },
    {
      id: 'L8',
      nombre: 'Comedores Comunitarios y Huertas Escolares',
      tipo: 'Comensalidad y formación de relevo',
      personas: 'Cocineras comunitarias, docentes, estudiantes de colegios (A40), comensales del barrio.',
      funcion_humana: 'Preparación de menús saludables basados en la cosecha barrial, pedagogía agroecológica infantil.',
      especies_atraidas: ['B1_abejas', 'B2_aves'],
      porque: 'Garantiza nutrición digna a niños y adultos mayores, formando a las nuevas generaciones en soberanía territorial.'
    }
  ];

  const ESPECIES_BIOTICAS = [
    {
      id: 'B1_abejas',
      nombre: 'Polinizadores Nativos y Mariposas',
      cientifico: 'Bombus pauloensis, Tetragonisca angustula (abeja angelita), Leptophobia aripa, Danaus plexippus',
      icono: '🐝',
      origen: 'Humedal El Burro y parches verdes de la sabana',
      para_que: 'Polinizan flores de hortalizas (tomate, habas, calabacines, aromáticas), multiplicando la fertilidad de las huertas hasta en un 40% y preservando la biodiversidad genética floral.',
      condiciones: 'Prohibición absoluta de insecticidas químicos; presencia de flores melíferas continuas (botón de oro, caléndula, ruda) y disponibilidad de agua limpia.'
    },
    {
      id: 'B2_aves',
      nombre: 'Aves de Humedal y Aves Urbanas',
      cientifico: 'Tingua azul (Porphyrio martinica), Tingua bogotana (Rallus semiplumbeus), Cucarachero de pantano, Colibrí chillón, Mirla',
      icono: '🦆',
      origen: 'Espejos de agua y totorales del Humedal El Burro y La Vaca',
      para_que: 'Control biológico natural de plagas (orugas, gusanos, pulgones y caracoles) sin venenos; dispersión de semillas de árboles y arbustos nativos, fortaleciendo corredores ecológicos urbanos.',
      condiciones: 'Setos vivos densos para refugio y anidación; ausencia de basuras plásticas cortantes; zonas de suelo blando sin cemento.'
    },
    {
      id: 'B3_lombrices',
      nombre: 'Lombrices de Tierra y Microbiota Edáfica',
      cientifico: 'Eisenia foetida (lombriz roja californiana), bacterias nitrificantes, hongos micorrícicos',
      icono: '🪱',
      origen: 'Suelo vivo y lechos de compostaje agroecológico',
      para_que: 'Descomponen vorazmente la materia orgánica de Corabastos y los hogares, convirtiéndola en humus rico en nitrógeno, fósforo y potasio asimilable para las plantas cultivadas.',
      condiciones: 'Humedad controlada (70%), temperatura moderada, aireación continua, sin presencia de residuos de carnes o heces de mascotas en el lecho.'
    },
    {
      id: 'B4_anfibios',
      nombre: 'Anfibios y Bioindicadores de Agua',
      cientifico: 'Rana sabanera (Dendropsophus labialis / Hyla labialis)',
      icono: '🐸',
      origen: 'Zanjas de bioinfiltración y ronda hídrica del Humedal El Burro',
      para_que: 'Depredan larvas de zancudos y mosquitos vectores de enfermedades; actúan como bioindicador infalible de agua no contaminada con agroquímicos ni metales pesados.',
      condiciones: 'Cuerpos de agua sombreados con vegetación flotante nativa (lenteja de agua, juncos); cero vertimientos de lixiviados o detergentes.'
    },
    {
      id: 'B5_hongos',
      nombre: 'Hongos Saprófitos Comestibles (Proteína)',
      cientifico: 'Pleurotus ostreatus (Setas orellanas), microbiota lignocelulítica',
      icono: '🍄',
      origen: 'Distrito Biotecnológico Comunitario / Saberes micológicos',
      para_que: 'Biotransforman celulosa y lignina de residuos secos de Corabastos (bagazo de caña, cascarilla, rastrojo de maíz) en proteína comestible de alta digestibilidad para los comedores populares.',
      condiciones: 'Cámaras de incubación limpias y oscuras con 85% de humedad, ventilación filtrada y esterilización del sustrato.'
    },
    {
      id: 'B6_flora',
      nombre: 'Flora Nativa de Ronda y Setos Vivos',
      cientifico: 'Aliso (Alnus acuminata), Chilco (Baccharis latifolia), Botón de oro (Tithonia diversifolia), Sauco, Ruda, Caléndula',
      icono: '🌿',
      origen: 'Bosque de ronda del humedal y semilleros comunitarios',
      para_que: 'Fijan nitrógeno en el suelo de las huertas, crean barreras cortaviento y amortiguadoras de ruido, y funcionan como farmacia viva y trampas biológicas para insectos plaga.',
      condiciones: 'Suelo con humedad constante, espacio para desarrollo de raíces y podas selectivas comunitarias.'
    }
  ];

  // --- INYECCIÓN DE ESTILOS CSS ---
  const css = `
  .view-federacion-stage {
    display: none;
    position: absolute;
    inset: 0;
    background: #090c12;
    overflow-y: auto;
    z-index: 10;
    padding: 20px 24px 60px;
    color: #F3F0EA;
    font-family: 'Instrument Sans', system-ui, sans-serif;
  }
  .fed-header {
    margin-bottom: 20px;
    border-bottom: 1px solid rgba(255,255,255,0.08);
    padding-bottom: 16px;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    gap: 16px;
  }
  .fed-badge {
    display: inline-flex;
    align-items: center;
    gap: 6px;
    font: 700 11px 'JetBrains Mono', monospace;
    letter-spacing: .08em;
    text-transform: uppercase;
    background: rgba(56,189,248,0.12);
    color: #38bdf8;
    padding: 4px 10px;
    border-radius: 999px;
    border: 1px solid rgba(56,189,248,0.3);
  }
  .fed-title {
    font-size: 22px;
    font-weight: 700;
    color: #fff;
    margin: 6px 0 2px;
    letter-spacing: -0.02em;
  }
  .fed-sub {
    font-size: 13.5px;
    color: #94a3b8;
    max-width: 80ch;
    line-height: 1.45;
    margin: 0;
  }
  .fed-nav {
    display: flex;
    gap: 8px;
    background: #111522;
    padding: 4px;
    border-radius: 10px;
    border: 1px solid rgba(255,255,255,0.08);
  }
  .fed-nav-btn {
    padding: 7px 14px;
    border-radius: 8px;
    background: none;
    border: 0;
    font-size: 12.5px;
    font-weight: 600;
    color: #94a3b8;
    cursor: pointer;
    transition: all .15s;
    display: inline-flex;
    align-items: center;
    gap: 6px;
  }
  .fed-nav-btn:hover {
    color: #fff;
    background: rgba(255,255,255,0.04);
  }
  .fed-nav-btn.active {
    background: #38bdf8;
    color: #090c12;
    font-weight: 700;
  }

  /* Comparación Jerarquía vs Federación */
  .fed-compare-grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 22px;
    margin-top: 10px;
  }
  @media(max-width: 900px) {
    .fed-compare-grid { grid-template-columns: 1fr; }
  }
  .fed-col {
    background: #0f1420;
    border-radius: 14px;
    border: 1px solid rgba(255,255,255,0.08);
    padding: 20px;
    display: flex;
    flex-direction: column;
  }
  .fed-col.jerarquia {
    border-top: 3px solid #ef4444;
  }
  .fed-col.federacion {
    border-top: 3px solid #10b981;
    background: linear-gradient(180deg, #101827 0%, #0c111a 100%);
  }
  .col-title-wrap {
    margin-bottom: 14px;
  }
  .col-pill {
    font: 700 10.5px 'JetBrains Mono', monospace;
    letter-spacing: .08em;
    text-transform: uppercase;
    display: inline-block;
    padding: 3px 8px;
    border-radius: 6px;
    margin-bottom: 6px;
  }
  .pill-jer { background: rgba(239,68,68,0.18); color: #f87171; border: 1px solid rgba(239,68,68,0.3); }
  .pill-fed { background: rgba(16,185,129,0.18); color: #34d399; border: 1px solid rgba(16,185,129,0.3); }
  .col-title {
    margin: 0;
    font-size: 18px;
    font-weight: 700;
    color: #fff;
  }
  .col-desc {
    margin: 4px 0 0;
    font-size: 12.5px;
    color: #94a3b8;
    line-height: 1.4;
  }

  /* Diagrama Jerarquía */
  .jer-ladder {
    display: flex;
    flex-direction: column;
    gap: 8px;
    margin-top: 14px;
  }
  .jer-step {
    padding: 10px 14px;
    border-radius: 8px;
    background: #141a29;
    border: 1px solid rgba(255,255,255,0.06);
    display: flex;
    align-items: center;
    justify-content: space-between;
    font-size: 13px;
  }
  .jer-step.lead { border-color: #ef4444; background: rgba(239,68,68,0.08); }
  .jer-step .pos { font: 700 11px 'JetBrains Mono'; color: #64748b; width: 22px; }
  .jer-step .name { font-weight: 600; color: #f1f5f9; flex: 1; }
  .jer-step .tag { font-size: 11px; color: #94a3b8; }
  .jer-arrow {
    text-align: center;
    color: #ef4444;
    font-size: 13px;
    line-height: 1;
    opacity: 0.6;
  }

  /* Diagrama Federación (Sin Líder) */
  .fed-radial-wrap {
    margin-top: 12px;
    background: #090d16;
    border-radius: 12px;
    padding: 16px;
    border: 1px solid rgba(16,185,129,0.2);
    position: relative;
    text-align: center;
  }
  .no-leader-banner {
    background: rgba(16,185,129,0.15);
    border: 1px solid #10b981;
    color: #6ee7b7;
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.05em;
    padding: 6px 12px;
    border-radius: 999px;
    display: inline-flex;
    align-items: center;
    gap: 6px;
    margin-bottom: 12px;
  }
  .fed-nodes-grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 8px;
    margin-top: 10px;
    text-align: left;
  }
  .fed-node-card {
    background: #131a29;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 8px;
    padding: 10px 12px;
    transition: all .15s;
  }
  .fed-node-card:hover {
    border-color: #38bdf8;
    background: #192236;
  }
  .fed-node-card .icon-title {
    display: flex;
    align-items: center;
    gap: 6px;
    font-weight: 700;
    font-size: 12.5px;
    color: #fff;
  }
  .fed-node-card .peeps {
    font-size: 11.5px;
    color: #94a3b8;
    margin-top: 4px;
    line-height: 1.35;
  }
  .fed-center-box {
    margin-top: 12px;
    background: #182235;
    border: 1.5px dashed #38bdf8;
    border-radius: 10px;
    padding: 12px;
    text-align: center;
  }
  .fed-center-box h4 {
    margin: 0;
    font-size: 14px;
    color: #38bdf8;
    font-weight: 700;
  }
  .fed-center-box p {
    margin: 4px 0 0;
    font-size: 11.5px;
    color: #cbd5e1;
    line-height: 1.4;
  }

  /* Pestaña 2: Matriz */
  .matrix-intro {
    background: #101624;
    border: 1px solid rgba(255,255,255,0.08);
    border-left: 4px solid #F2B53A;
    border-radius: 10px;
    padding: 14px 18px;
    margin-bottom: 16px;
  }
  .matrix-intro h4 {
    margin: 0 0 4px;
    font-size: 15px;
    color: #F2B53A;
    font-weight: 700;
  }
  .matrix-intro p {
    margin: 0;
    font-size: 12.5px;
    color: #cbd5e1;
    line-height: 1.45;
  }
  .matrix-filter-bar {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 16px;
  }
  .mf-btn {
    padding: 5px 12px;
    border-radius: 999px;
    background: #141926;
    border: 1px solid rgba(255,255,255,0.08);
    color: #94a3b8;
    font-size: 11.5px;
    font-weight: 600;
    cursor: pointer;
    transition: all .15s;
  }
  .mf-btn:hover { color: #fff; border-color: #475569; }
  .mf-btn.active { background: #F2B53A; color: #111; font-weight: 700; border-color: #F2B53A; }

  .matrix-cards-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(360px, 1fr));
    gap: 14px;
  }
  .m-card {
    background: #0f1420;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 16px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    transition: transform .15s, border-color .15s;
  }
  .m-card:hover {
    transform: translateY(-2px);
    border-color: rgba(255,255,255,0.2);
  }
  .m-card-badge {
    font: 700 10.5px 'JetBrains Mono', monospace;
    color: #38bdf8;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  .m-card-title {
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    margin: 0;
    line-height: 1.35;
  }
  .m-pill-row {
    display: flex;
    flex-direction: column;
    gap: 6px;
    font-size: 12px;
  }
  .m-row-item {
    display: grid;
    grid-template-columns: 85px 1fr;
    gap: 8px;
    align-items: baseline;
    color: #cbd5e1;
    line-height: 1.35;
  }
  .m-lbl {
    font-weight: 700;
    color: #64748b;
    font-size: 11px;
    text-transform: uppercase;
    letter-spacing: 0.04em;
  }

  /* Pestaña 3: Red Sociobiótica */
  .bio-stage-layout {
    display: grid;
    grid-template-columns: 1fr 340px;
    gap: 18px;
  }
  @media(max-width: 900px) {
    .bio-stage-layout { grid-template-columns: 1fr; }
  }
  .bio-places-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 12px;
  }
  .bio-place-card {
    background: #0e131d;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 12px;
    padding: 14px;
    cursor: pointer;
    transition: all .15s;
    position: relative;
  }
  .bio-place-card:hover {
    border-color: #10b981;
    background: #141c2c;
    transform: translateY(-2px);
  }
  .bio-place-card.active {
    border-color: #10b981;
    background: #12212f;
    box-shadow: 0 0 16px rgba(16,185,129,0.2);
  }
  .bpc-head {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 6px;
  }
  .bpc-type {
    font: 600 10.5px 'JetBrains Mono';
    color: #10b981;
    text-transform: uppercase;
  }
  .bpc-name {
    font-size: 14px;
    font-weight: 700;
    color: #fff;
    margin: 0 0 6px;
  }
  .bpc-peeps {
    font-size: 12px;
    color: #94a3b8;
    line-height: 1.35;
    margin-bottom: 8px;
  }
  .bpc-species-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 4px;
  }
  .sp-tag {
    font-size: 11px;
    background: rgba(16,185,129,0.12);
    color: #6ee7b7;
    border: 1px solid rgba(16,185,129,0.25);
    border-radius: 6px;
    padding: 2px 7px;
  }

  .bio-species-panel {
    background: #0f1420;
    border: 1px solid rgba(255,255,255,0.08);
    border-radius: 14px;
    padding: 18px;
    position: sticky;
    top: 10px;
    max-height: 85vh;
    overflow-y: auto;
  }
  .bsp-title {
    font-size: 16px;
    font-weight: 700;
    color: #fff;
    margin: 0 0 4px;
  }
  .bsp-sub {
    font-size: 12px;
    color: #94a3b8;
    margin-bottom: 14px;
  }
  .species-card-item {
    background: #141a29;
    border: 1px solid rgba(255,255,255,0.06);
    border-radius: 10px;
    padding: 12px;
    margin-bottom: 10px;
  }
  .sci-head {
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 4px;
  }
  .sci-ico { font-size: 18px; }
  .sci-name { font-weight: 700; font-size: 13px; color: #f1f5f9; }
  .sci-sci { font-size: 11px; font-style: italic; color: #94a3b8; margin-bottom: 6px; }
  .sci-para {
    font-size: 12px;
    color: #6ee7b7;
    background: rgba(16,185,129,0.08);
    border-radius: 6px;
    padding: 6px 8px;
    line-height: 1.35;
    margin-bottom: 6px;
  }
  .sci-para b { color: #fff; font-weight: 700; }
  .sci-cond { font-size: 11.5px; color: #94a3b8; line-height: 1.3; }
  `;

  const styleEl = document.createElement('style');
  styleEl.textContent = css;
  document.head.appendChild(styleEl);

  // --- CONTENEDOR PRINCIPAL HTML ---
  const html = `
  <div id="viewFederacion" class="view-federacion-stage">
    <div class="fed-header">
      <div>
        <div class="fed-badge">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M12 2a14.5 14.5 0 0 0 0 20 14.5 14.5 0 0 0 0-20M2 12h20"/></svg>
          Gobernanza Policéntrica & Red Biótica · Kennedy
        </div>
        <h2 class="fed-title">Federación Territorial y Red Sociobiótica</h2>
        <p class="fed-sub">Descentralización del abastecimiento alimentario de Corabastos, articulación agroecológica en los barrios y atracción activa de la red biótica del Humedal El Burro.</p>
      </div>
      <div class="fed-nav">
        <button class="fed-nav-btn active" data-tab="comparacion" id="btnTabComp">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><path d="M8 12h8m-4-4v8"/></svg>
          Federación (Sin Líder) vs. Jerarquía
        </button>
        <button class="fed-nav-btn" data-tab="matriz" id="btnTabMatriz">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18M9 21V9"/></svg>
          Problema, Dónde, Con Qué y Quiénes
        </button>
        <button class="fed-nav-btn" data-tab="sociobiotica" id="btnTabBio">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/></svg>
          Red Sociobiótica (Huertas & Humedal)
        </button>
      </div>
    </div>

    <!-- SECCIÓN 1: FEDERACIÓN SIN LÍDER VS JERARQUÍA (Corrige la foto) -->
    <div id="fedSecComp" class="fed-tab-sec">
      <div class="fed-compare-grid">
        <!-- Columna Izquierda: Jerarquía -->
        <div class="fed-col jerarquia">
          <div class="col-title-wrap">
            <span class="col-pill pill-jer">Diagnóstico Actual</span>
            <h3 class="col-title">Hoy: Jerarquía Piramidal Centralizada</h3>
            <p class="col-desc">Un solo orden vertical para todo: las instituciones deciden arriba y quienes hacen el trabajo quedan subordinados abajo sin capacidad de incidir.</p>
          </div>
          <div class="jer-ladder">
            <div class="jer-step lead">
              <span class="pos">01</span>
              <span class="name">Alcaldía Local, UAESP & Sec. Ambiente</span>
              <span class="tag">Deciden y contratan</span>
            </div>
            <div class="jer-arrow">▼ órdenes, regulaciones y contratos ▼</div>
            <div class="jer-step">
              <span class="pos">02</span>
              <span class="name">Gerencia Corabastos & Mayoristas</span>
              <span class="tag">Controlan mercancía</span>
            </div>
            <div class="jer-arrow">▼ fijación unilateral de precios y horarios ▼</div>
            <div class="jer-step">
              <span class="pos">03</span>
              <span class="name">Empresas Transportadoras & Operador de Aseo</span>
              <span class="tag">Controlan rutas y flotas</span>
            </div>
            <div class="jer-arrow">▼ asignación de cargas y turnos ▼</div>
            <div class="jer-step">
              <span class="pos">04</span>
              <span class="name">Organizaciones de Recicladores & Coteros</span>
              <span class="tag">Trabajo físico pesado</span>
            </div>
            <div class="jer-arrow">▲ sólo pueden enviar solicitudes no vinculantes ▲</div>
            <div class="jer-step">
              <span class="pos">05</span>
              <span class="name">Vecinos, Huertas Comunitarias, Comedores & Humedal</span>
              <span class="tag">Soportan costos e impactos</span>
            </div>
          </div>
          <p style="margin-top:14px;font-size:12px;color:#94a3b8;line-height:1.4">
            <b style="color:#f87171">Falla estructural:</b> Quienes realizan el trabajo cotidiano (reciclaje, cargue, siembra) no tienen voz vinculante en la fijación de tarifas, horarios ni prioridades del presupuesto local.
          </p>
        </div>

        <!-- Columna Derecha: Federación Policéntrica Sin Líder -->
        <div class="fed-col federacion">
          <div class="col-title-wrap">
            <span class="col-pill pill-fed">Propuesta Territorial</span>
            <h3 class="col-title">Propuesta: Federación Territorial Policéntrica</h3>
            <p class="col-desc">Coordinación horizontal entre núcleos autónomos: <b>NO HAY LÍDER CENTRAL</b> ni escalafón de mando superior. La autoridad reside en los acuerdos por asunto.</p>
          </div>

          <div class="fed-radial-wrap">
            <div class="no-leader-banner">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>
              PRINCIPIO FUNDAMENTAL: CERO LÍDERES PERMANENTES
            </div>

            <div class="fed-nodes-grid">
              <div class="fed-node-card">
                <div class="icon-title">🌿 Núcleo Soberanía Alimentaria</div>
                <div class="peeps">Hogares, hortelanos, comedores comunitarios y escuelas. Deciden qué se siembra y cómo se reparten excedentes.</div>
              </div>
              <div class="fed-node-card">
                <div class="icon-title">🦆 Núcleo Humedal y Restauración</div>
                <div class="peeps">Custodios ambientales de El Burro y La Vaca. Custodia biótica, monitoreo de agua y llave ecológica de la cuenca.</div>
              </div>
              <div class="fed-node-card">
                <div class="icon-title">♻️ Núcleo Circularidad y Orgánicos</div>
                <div class="peeps">Recicladores organizados, coteros y planta comunitaria de compostaje. Manejo autónomo de residuos in situ.</div>
              </div>
              <div class="fed-node-card">
                <div class="icon-title">🏪 Núcleo Comercio Barrial</div>
                <div class="peeps">Tenderos, ferias barriales y puntos de acopio. Precios transparentes y abastecimiento directo sin intermediarios.</div>
              </div>
            </div>

            <div class="fed-center-box">
              <h4>Mesa Federativa de Coordinación de Kennedy</h4>
              <p><b>Sin jerarquía:</b> Funciona con <b>vocerías rotativas cada 1 a 3 meses</b>, mandatos revocables con límites estrictos, deliberación por consentimiento mutuo y pactos de cogestión con entidades públicas (UAESP, SDA, Alcaldía).</p>
            </div>
          </div>

          <p style="margin-top:14px;font-size:12px;color:#94a3b8;line-height:1.4">
            <b style="color:#34d399">Ventaja federativa:</b> Ningún actor manda sobre otro. La entidad pública acompaña y aporta presupuesto participativo; el saber práctico de los trabajadores y hortelanos define la operación real.
          </p>
        </div>
      </div>
    </div>

    <!-- SECCIÓN 2: MATRIZ OPERATIVA (Qué problema, Dónde, Con Qué y Quiénes) -->
    <div id="fedSecMatriz" class="fed-tab-sec" style="display:none">
      <div class="matrix-intro">
        <h4>Problema Central: P1 · Dependencia Alimentaria y Ecológica de Corabastos</h4>
        <p>La concentración absoluta del abastecimiento en un único megamercado monopolizador somete a tiendas, comedores y hogares de Kennedy a precios volátiles, genera pérdidas masivas de residuos orgánicos que colapsan vertederos y contamina los humedales. La propuesta despliega un circuito agroecológico territorial distribuido.</p>
      </div>

      <div class="matrix-filter-bar" id="matrixFilterBar">
        <button class="mf-btn active" data-filter="all">Todas las Dinámicas (10)</button>
        <button class="mf-btn" data-filter="huertas">Huertas Comunales (4)</button>
        <button class="mf-btn" data-filter="comensalidad">Comensalidad y Comedores (1)</button>
        <button class="mf-btn" data-filter="excedentes">Comercio de Excedentes (1)</button>
        <button class="mf-btn" data-filter="insumos">Insumos Circulares & Compost (1)</button>
        <button class="mf-btn" data-filter="biotech">Distrito Biotecnológico (1)</button>
        <button class="mf-btn" data-filter="gobierno">Gobierno Federado (1)</button>
      </div>

      <div class="matrix-cards-grid" id="matrixCardsGrid">
        <!-- Renderizado dinámico vía JS -->
      </div>
    </div>

    <!-- SECCIÓN 3: RED SOCIOBIÓTICA (Huertas & Humedal El Burro) -->
    <div id="fedSecBio" class="fed-tab-sec" style="display:none">
      <div class="matrix-intro" style="border-left-color:#10b981">
        <h4 style="color:#10b981">Atracción de Relaciones Bióticas del Humedal El Burro hacia las Huertas Urbanas</h4>
        <p>Conectamos los 8 lugares territoriales del circuito con los actores humanos que los gestionan y las <b>especies y relaciones bióticas</b> que atraemos activamente desde el Humedal El Burro para garantizar polinización, control biológico de plagas sin pesticidas, suelo fértil y proteína limpia.</p>
      </div>

      <div class="bio-stage-layout">
        <!-- Lugares Territoriales -->
        <div>
          <div style="font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:0.06em;color:#94a3b8;margin-bottom:10px">
            Lugares Territoriales en Kennedy (Toca un lugar para ver qué especies y actores conviven)
          </div>
          <div class="bio-places-grid" id="bioPlacesGrid">
            <!-- Renderizado dinámico vía JS -->
          </div>
        </div>

        <!-- Panel Lateral de Especies Bióticas Atraídas -->
        <div class="bio-species-panel" id="bioSpeciesPanel">
          <h4 class="bsp-title">Red de Relaciones Bióticas</h4>
          <p class="bsp-sub">Especies atraídas desde el Humedal El Burro y su función sistémica ("¿Para qué?"):</p>
          <div id="speciesListContainer">
            <!-- Renderizado dinámico vía JS -->
          </div>
        </div>
      </div>
    </div>
  </div>
  `;

  // Insertar en el escenario de corte-3.html
  const stage = document.getElementById('stage');
  if (stage) {
    const wrap = document.createElement('div');
    wrap.innerHTML = html;
    stage.appendChild(wrap.firstElementChild);
  }

  // --- LÓGICA DE CONTROL DE PESTAÑAS Y RENDERIZADO ---
  function showTab(tabId) {
    document.querySelectorAll('.fed-nav-btn').forEach(b => b.classList.toggle('active', b.dataset.tab === tabId));
    document.getElementById('fedSecComp').style.display = tabId === 'comparacion' ? 'block' : 'none';
    document.getElementById('fedSecMatriz').style.display = tabId === 'matriz' ? 'block' : 'none';
    document.getElementById('fedSecBio').style.display = tabId === 'sociobiotica' ? 'block' : 'none';

    if (tabId === 'matriz') renderMatrixCards('all');
    if (tabId === 'sociobiotica') renderSociobiotica();
  }

  document.querySelectorAll('.fed-nav-btn').forEach(btn => {
    btn.onclick = () => showTab(btn.dataset.tab);
  });

  // Renderizado de tarjetas de la matriz
  function renderMatrixCards(filter) {
    const grid = document.getElementById('matrixCardsGrid');
    if (!grid) return;

    let items = MATRIZ_PROBLEMA;
    if (filter === 'huertas') items = MATRIZ_PROBLEMA.filter(m => m.dinamica.includes('huertas'));
    else if (filter === 'comensalidad') items = MATRIZ_PROBLEMA.filter(m => m.dinamica.includes('Autoconsumo'));
    else if (filter === 'excedentes') items = MATRIZ_PROBLEMA.filter(m => m.dinamica.includes('Comercio de excedentes'));
    else if (filter === 'insumos') items = MATRIZ_PROBLEMA.filter(m => m.dinamica.includes('Insumos circulares'));
    else if (filter === 'biotech') items = MATRIZ_PROBLEMA.filter(m => m.dinamica.includes('Distrito biotecnológico'));
    else if (filter === 'gobierno') items = MATRIZ_PROBLEMA.filter(m => m.dinamica.includes('Gobierno de la red'));

    grid.innerHTML = items.map(it => `
      <div class="m-card">
        <div class="m-card-badge">${it.dinamica}</div>
        <h4 class="m-card-title">${it.actividad}</h4>
        <div class="m-pill-row">
          <div class="m-row-item">
            <span class="m-lbl">¿Dónde?</span>
            <span>${it.donde}</span>
          </div>
          <div class="m-row-item">
            <span class="m-lbl">¿Quiénes?</span>
            <span style="color:#fff;font-weight:600">${it.quienes}</span>
          </div>
          <div class="m-row-item">
            <span class="m-lbl">¿Con qué?</span>
            <span style="color:#6ee7b7">${it.con_que}</span>
          </div>
          <div class="m-row-item">
            <span class="m-lbl">Acceso</span>
            <span>${it.acceso}</span>
          </div>
          <div class="m-row-item">
            <span class="m-lbl">Dinámica</span>
            <span style="color:#F2B53A">${it.modelo}</span>
          </div>
        </div>
      </div>
    `).join('');
  }

  // Filtros de la matriz
  const filterBar = document.getElementById('matrixFilterBar');
  if (filterBar) {
    filterBar.querySelectorAll('.mf-btn').forEach(btn => {
      btn.onclick = () => {
        filterBar.querySelectorAll('.mf-btn').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        renderMatrixCards(btn.dataset.filter);
      };
    });
  }

  // Renderizado de la Red Sociobiótica
  let activePlaceId = 'L4'; // Por defecto la huerta en ronda del humedal
  function renderSociobiotica() {
    const placesGrid = document.getElementById('bioPlacesGrid');
    const spContainer = document.getElementById('speciesListContainer');
    if (!placesGrid || !spContainer) return;

    // Renderizar tarjetas de lugares
    placesGrid.innerHTML = LUGARES_TERRITORIALES.map(p => {
      const isAct = p.id === activePlaceId;
      const spTags = p.especies_atraidas.map(sid => {
        const sp = ESPECIES_BIOTICAS.find(s => s.id === sid);
        return sp ? `<span class="sp-tag">${sp.icono} ${sp.nombre.split(' ')[0]}</span>` : '';
      }).join('');

      return `
        <div class="bio-place-card ${isAct ? 'active' : ''}" data-pid="${p.id}">
          <div class="bpc-head">
            <span class="bpc-type">${p.tipo}</span>
            <span style="font-size:11px;color:#64748b">${p.id}</span>
          </div>
          <h4 class="bpc-name">${p.nombre}</h4>
          <div class="bpc-peeps"><b>Actores humanos:</b> ${p.personas}</div>
          <div class="bpc-peeps" style="color:#cbd5e1"><b>Función:</b> ${p.funcion_humana}</div>
          <div style="margin-top:6px">
            <div style="font-size:11px;font-weight:700;color:#10b981;margin-bottom:3px">Especies atraídas:</div>
            <div class="bpc-species-tags">${spTags || '<span style="font-size:11px;color:#64748b">Circuito comercial</span>'}</div>
          </div>
        </div>
      `;
    }).join('');

    // Click handler en lugares
    placesGrid.querySelectorAll('.bio-place-card').forEach(c => {
      c.onclick = () => {
        activePlaceId = c.dataset.pid;
        renderSociobiotica();
      };
    });

    // Renderizar panel de especies destacando las del lugar activo
    const currPlace = LUGARES_TERRITORIALES.find(p => p.id === activePlaceId);
    const relatedSpeciesIds = new Set(currPlace ? currPlace.especies_atraidas : []);

    spContainer.innerHTML = ESPECIES_BIOTICAS.map(sp => {
      const isLinked = relatedSpeciesIds.has(sp.id);
      return `
        <div class="species-card-item" style="${isLinked ? 'border-color:#10b981;background:#13242b;' : 'opacity:0.65;'}">
          <div class="sci-head">
            <span class="sci-ico">${sp.icono}</span>
            <span class="sci-name">${sp.nombre}</span>
            ${isLinked ? '<span style="margin-left:auto;font:700 10px JetBrains Mono;color:#10b981;text-transform:uppercase">Presente aquí</span>' : ''}
          </div>
          <div class="sci-sci">${sp.cientifico}</div>
          <div class="sci-para">
            <b>¿Para qué se atrae?:</b> ${sp.para_que}
          </div>
          <div class="sci-cond">
            <b>Condiciones ecológicas:</b> ${sp.condiciones}
          </div>
        </div>
      `;
    }).join('');
  }

  // API pública
  window.FEDERACION_BIOTICA = {
    init: function(tab = 'comparacion') {
      showTab(tab);
    },
    selectPlace: function(pid) {
      activePlaceId = pid;
      showTab('sociobiotica');
    }
  };

})();
