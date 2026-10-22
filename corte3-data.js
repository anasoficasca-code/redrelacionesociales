// Datos del Corte III · Heterarquía ecosocial de Kennedy
// estado de cada relación: 'normativa' (lo que dice la norma), 'observada' (diagnóstico), 'propuesta' (decisión del grupo)
// ev: 'doc' documentada con fuente · 'hip' hipótesis por verificar · 'prop' decisión de diseño del grupo

window.C3 = {};

C3.SRC = {
  S1: {t: 'Acuerdo Distrital 740 de 2019 y Decreto 768 de 2019: presupuestos participativos; el Distrito elevó al 50 % la inversión local que se decide así.', u: 'https://bogota.gov.co/mi-ciudad/mujer/distrito-convoca-mujeres-incidir-en-presupuestos-participativos', tipo: 'Dato documentado'},
  S2: {t: 'Estatutos de Corabastos: sociedad de economía mixta vinculada al Ministerio de Agricultura, con Asamblea General de Accionistas y Junta Directiva.', u: 'https://corabastos.com.co/wp-content/uploads/2025/05/ESTATUTOS-CORABASTOS-4-1.pdf', tipo: 'Dato documentado'},
  S3: {t: 'Esquema de aseo de Bogotá: Kennedy está en el ASE 3, operado por Ciudad Limpia; la UAESP supervisa.', u: 'https://bogota.gov.co/mi-ciudad/habitat/como-esta-dividido-el-esquema-de-aseo-en-las-localidades-de-bogota', tipo: 'Dato documentado'},
  S4: {t: 'Capas de IDECA y Datos Abiertos Bogotá recortadas a Kennedy: 188 juntas de acción comunal (IDPAC), 811 huertas urbanas (Jardín Botánico), 11 comedores comunitarios (SDIS).', u: 'https://datosabiertos.bogota.gov.co', tipo: 'Dato documentado'},
  S5: {t: 'Red POT de Kennedy del grupo (macromodelos-kennedy, aristas EDG-14, EDG-15, EDG-22, EDG-23): efluentes de Corabastos hacia La Vaca, flujo de camiones, custodia y acciones legales de colectivos ambientales.', u: 'https://github.com/alejagoguti-cpu/macromodelos-kennedy', tipo: 'Diagnóstico del grupo (Corte II)'},
  S6: {t: 'Cifras de residuos de Corabastos no coinciden entre fuentes: un estudio para la SDA reporta 50,9 t/día de residuos sólidos en Corabastos; un trabajo académico posterior estima cerca de 350 t/día. Se conserva la discrepancia.', u: 'https://oab2.ambientebogota.gov.co/documents/10184/506375/Gesti%C3%B3n+de+los+residuos+org%C3%A1nicos+en+las+plazas+de+mercado+de+Bogot%C3%A1.pdf/adf49ada-de92-4f00-9241-24798c6f0ee0', tipo: 'Datos en disputa'},
  S7: {t: 'Crumley, C. (1995). Heterarchy and the Analysis of Complex Societies. Archeological Papers of the American Anthropological Association 6: relación de elementos sin rango fijo o que pueden ordenarse de varias maneras según lo que el sistema requiera.', u: 'https://doi.org/10.1525/ap3a.1995.6.1.1', tipo: 'Referente teórico'},
  S8: {t: 'Ostrom, E. (2010). Beyond Markets and States: Polycentric Governance of Complex Economic Systems. American Economic Review 100(3).', u: '', tipo: 'Referente teórico'},
  S9: {t: 'Operativo de la Policía y la Alcaldía Local en María Paz y El Amparo (julio de 2025): cierre de locales y recuperación de espacio público.', u: 'https://www.publimetro.co/bogota/2025/07/16/megatoma-en-los-barrios-maria-paz-y-el-amparo-deja-cuatro-locales-suspendidos-y-cinco-capturados/', tipo: 'Dato documentado'},
  S10: {t: 'Comparativa Christiania – Findhorn del grupo (Corte III): mecanismos de asamblea, consenso y autogestión estudiados como referentes.', u: '', tipo: 'Referente estudiado por el grupo'}
};

/* ---------- 1 · Ficha del macromodelo ---------- */
C3.ECO = [
  {id:'eco', n:'Ecocéntrico', c:'#ebe5d9', rango:'Marco general: ninguna decisión se evalúa sin sus efectos sobre las interdependencias del territorio.'},
  {id:'hid', n:'Hidrocéntrico', c:'#6ea8d6', rango:'En asuntos de agua, quienes custodian y conocen la cuenca y los humedales encabezan la decisión.'},
  {id:'reg', n:'Regenerativo', c:'#7fbf8e', rango:'Las obras que restauran ecosistemas se priorizan sobre las que solo los compensan.'},
  {id:'com', n:'Comercio ecológico', c:'#cdae67', rango:'En abastecimiento, la voz de comerciantes, coteros y productores pesa tanto como la de la gerencia.'},
  {id:'cir', n:'Circularidad', c:'#e6956a', rango:'En residuos, encabezan quienes separan, transportan y transforman el material: recicladores y trabajadores.'},
  {id:'lim', n:'Límites ecológicos', c:'#b4b4b4', rango:'Ninguna decisión puede aumentar la carga sobre el humedal: existe una llave ecológica que la detiene.'},
  {id:'bio', n:'Biocéntrico', c:'#f0f0f0', rango:'La continuidad de otras formas de vida tiene representantes con voz y con mecanismo para objetar.'}
];

C3.PRINCIPIOS = [
  {t:'El rango lo da el asunto, no el cargo', d:'Ningún actor ocupa siempre la cima. Quien encabeza cambia según la materia: agua, orgánicos, abastecimiento o cuidado.'},
  {t:'Mandato revocable', d:'Las vocerías llevan decisiones, no las toman. Rinden cuentas cada mes y su núcleo puede retirarlas.'},
  {t:'Escala ecológica', d:'La escala de una decisión la define el ciclo que toca (la cuenca, la cadena del alimento), no solo el límite administrativo.'},
  {t:'Quien decide carga', d:'Quien aprueba una tarea aporta trabajo o recursos para cumplirla; quien la ejecuta tiene voz antes de que se apruebe.'},
  {t:'Voz de lo no humano', d:'El humedal tiene representantes identificables (colectivos y monitoreo técnico) que pueden detener una decisión con evidencia.'}
];

C3.REPARTO = [
  {q:'Qué es colectivo', a:'Prioridades de inversión local que ya pasan por presupuestos participativos; reglas de separación y destino de los orgánicos; uso del entorno del humedal.'},
  {q:'Qué se delega', a:'Ejecución técnica (operación de la planta, monitoreo del agua, contratación) en núcleos y vocerías con mandato escrito y plazo.'},
  {q:'Límites de la delegación', a:'Nadie con vocería más de dos periodos seguidos; ninguna vocería decide sobre presupuesto sin acta del núcleo; la llave ecológica no se delega.'},
  {q:'Cómo se revoca', a:'Un tercio del núcleo puede pedir revisión; la mayoría la retira. La rectificación reabre el asunto en la agenda siguiente.'}
];

C3.OBJETIVOS = [
  {o:'Agenda abierta', i:'Proporción de asuntos que entran a la agenda por propuesta de juntas, colectivos, recicladores o comerciantes (no de entidades).', hoy:'Sin registro', meta:'Más de la mitad, con acta pública'},
  {o:'Presupuesto trazable', i:'Parte de la inversión de presupuestos participativos de Kennedy cuyo destino final coincide con lo votado.', hoy:'50 % se decide así por norma (S1); la ejecución no se ha verificado', meta:'Seguimiento de cada proyecto votado'},
  {o:'Carga sobre La Vaca', i:'Toneladas de orgánicos de Corabastos desviadas del humedal y del relleno hacia compostaje o biogás.', hoy:'Cifras en disputa (S6)', meta:'Medición propia mensual'},
  {o:'Rotación real', i:'Vocerías renovadas y mandatos revisados o revocados por periodo.', hoy:'No existe el mecanismo', meta:'Toda vocería rota cada dos periodos'},
  {o:'Trabajo repartido', i:'Horas de trabajo colectivo (incluido cuidado y mantenimiento) por persona, por mes.', hoy:'Sin registro', meta:'Ninguna persona por encima del doble del promedio'}
];

C3.TRANSICION = {
  hoy:'Hoy las decisiones del territorio se ordenan en una sola escalera: entidades distritales y Alcaldía Local deciden y contratan; las juntas y colectivos solicitan; Corabastos decide en su Asamblea de Accionistas, fuera de la localidad; recicladores, coteros, vecinos y el humedal reciben los costos.',
  dejar:['Que la carga orgánica de Corabastos llegue al humedal sin que nadie en la localidad pueda detenerla','Que los operativos de espacio público decidan sobre recicladores y vendedores sin su participación','Que la votación de presupuestos participativos termine en la firma del contrato, sin seguimiento'],
  construir:['Una Mesa Ecosocial con núcleos por asunto y vocerías revocables','Un fondo común que pague el trabajo de la circularidad','Una guardianía del humedal con llave ecológica'],
  impulsan:['Colectivos ambientales','Organizaciones de recicladores','Juntas con agenda ambiental','Red de huertas'],
  resisten:['Intereses dentro de Corabastos que no quieren asumir costos de tratamiento','Contratistas que hoy ejecutan el presupuesto local','Quienes concentran la agenda técnica'],
  disputa:['Orgánicos (material con valor)','Suelo para la planta de compostaje','Presupuesto participativo local','Información sobre vertimientos'],
  inicio:'Hecho que inicia el cambio: el ciclo de presupuestos participativos 2025–2028 (S1) y la actuación estratégica Chucua La Vaca del POT (S5) ponen el humedal y los residuos de la central en la misma agenda.',
  secuencia:[
    {t:'Acuerdo', d:'Juntas, colectivos y recicladores llevan una sola propuesta a presupuestos participativos.'},
    {t:'Conflicto', d:'Corabastos y contratistas discuten quién paga la separación y el transporte de orgánicos.'},
    {t:'Aprendizaje', d:'Un piloto de compostaje con huertas muestra cuánto material se desvía y quién hace el trabajo.'},
    {t:'Decisión', d:'El núcleo de orgánicos aprueba reglas de separación y el reparto del fondo común.'}
  ]
};

C3.MECANISMOS = [
  {m:'Presupuestos participativos locales', origen:'Ya existe (S1)'},
  {m:'Juntas de Acción Comunal y Consejo de Planeación Local', origen:'Ya existe'},
  {m:'Asamblea y decisión por consenso', origen:'Tomado de referentes (S10)'},
  {m:'Núcleos por asunto con rango cambiante', origen:'Propuesto por el grupo (S7, S8)'},
  {m:'Vocerías rotativas y revocables', origen:'Propuesto por el grupo'},
  {m:'Llave ecológica de la guardianía', origen:'Propuesto por el grupo'},
  {m:'Fondo común de circularidad', origen:'Propuesto por el grupo'}
];

/* ---------- 2 · Red de interacciones ---------- */
// tipo: persona, cargo, entidad, colectivo, objeto, operador, regulador, nohumano, instancia
// en: 'hoy' | 'prop' | 'ambos'
C3.NODES = [
 {id:'ALC',n:'Alcaldía Local de Kennedy',tp:'entidad',en:'ambos',am:'Localidad',int:'Cumplir el plan de desarrollo local',rec:'Contratación del Fondo de Desarrollo Local; operativos de espacio público',tr:'Formula, contrata y supervisa proyectos',dec:'Prioriza y contrata la inversión local',af:'Toda la localidad'},
 {id:'ALCC',n:'Alcalde(sa) local',tp:'cargo',en:'ambos',am:'Localidad',int:'Metas del plan distrital y de seguridad',rec:'Firma de contratos y órdenes de operativo',tr:'Dirige la entidad y los operativos con la Policía',dec:'Firma y ordena',af:'Vendedores, recicladores, contratistas',div:'El cargo no es la persona: en 2025 lo ocupaba una alcaldesa designada por la Alcaldía Mayor (S9). La Alcaldía Local es la entidad.'},
 {id:'FDL',n:'Fondo de Desarrollo Local',tp:'entidad',en:'ambos',am:'Localidad',int:'Ejecutar la inversión local',rec:'Presupuesto local; 50 % se decide en presupuestos participativos (S1)',tr:'Paga los contratos',dec:'Ninguna propia: ejecuta lo que firma la Alcaldía',af:'Proyectos de toda la localidad'},
 {id:'JAL',n:'Junta Administradora Local',tp:'entidad',en:'ambos',am:'Localidad',int:'Control político',rec:'Aprobación del presupuesto local',tr:'Debates y control',dec:'Aprueba el presupuesto',af:'Alcaldía Local'},
 {id:'SDA',n:'Secretaría Distrital de Ambiente',tp:'regulador',en:'ambos',am:'Ciudad',int:'Autoridad ambiental urbana',rec:'Permisos de vertimiento y planes de manejo de humedales',tr:'Inspección y sanción',dec:'Autoriza o niega permisos',af:'Corabastos, humedal, planta propuesta'},
 {id:'EAAB',n:'Empresa de Acueducto (EAAB)',tp:'operador',en:'ambos',am:'Ciudad y cuenca',int:'Operar la red hídrica y los humedales',rec:'Red de alcantarillado, presupuesto de obras',tr:'Dragado, control de caudales, obras (S5)',dec:'Calendario y tipo de obra en el humedal',af:'Humedal y vecinos'},
 {id:'UAESP',n:'UAESP',tp:'regulador',en:'ambos',am:'Ciudad',int:'Servicio de aseo y reciclaje',rec:'Contratos de aseo, registro de recicladores',tr:'Supervisión',dec:'Reglas del servicio y del aprovechamiento',af:'Operador de aseo y recicladores'},
 {id:'CLI',n:'Ciudad Limpia (operador de aseo)',tp:'operador',en:'ambos',am:'ASE 3: Kennedy y Fontibón (S3)',int:'Cumplir el contrato al menor costo',rec:'Flota de compactadores, rutas',tr:'Recolección y transporte al relleno',dec:'Rutas y frecuencias',af:'Comercio y hogares'},
 {id:'COMP',n:'Camiones compactadores',tp:'objeto',en:'ambos',am:'Rutas de la localidad',int:'—',rec:'Capacidad de carga',tr:'Llevan residuos mezclados al relleno',dec:'—',af:'Calles y relleno sanitario',div:'Objeto técnico: lo opera Ciudad Limpia y lo regula la UAESP. No decide.'},
 {id:'COR',n:'Corabastos S.A.',tp:'entidad',en:'ambos',am:'Ciudad y región',int:'Operar la central de abastos',rec:'Recinto, bodegas, reglas de operación (S2)',tr:'Administra el recinto',dec:'Uso de bodegas, aseo interno, inversión',af:'Comerciantes, trabajadores, humedal'},
 {id:'ASA',n:'Asamblea de accionistas de Corabastos',tp:'instancia',en:'ambos',am:'Nación y Distrito (S2)',int:'Rentabilidad y función de abastecimiento',rec:'Capital y elección de junta',tr:'—',dec:'Decide sobre la sociedad, fuera de la localidad',af:'Todo lo que pasa en la central',div:'Agrupa accionistas públicos (clase A) y privados (clase B) con intereses distintos (S2).'},
 {id:'GER',n:'Gerencia de Corabastos',tp:'cargo',en:'ambos',am:'Recinto',int:'Orden operativo',rec:'Asignación de bodegas, horarios',tr:'Dirige la administración',dec:'Reglas cotidianas de la central',af:'Comerciantes, coteros'},
 {id:'COMR',n:'Comerciantes mayoristas',tp:'colectivo',en:'ambos',am:'Recinto',int:'Vender y reducir pérdidas',rec:'Mercancía, puestos, contratación de coteros',tr:'Compra y venta diaria',dec:'Qué se desecha y dónde',af:'Coteros, recicladores, humedal',div:'Grandes bodegas y puestos pequeños no comparten intereses ni capacidad de pagar tratamiento.'},
 {id:'COMI',n:'Comité de comerciantes',tp:'instancia',en:'ambos',am:'Recinto',int:'Representar a los comerciantes',rec:'Interlocución con la gerencia',tr:'Reuniones y solicitudes',dec:'Lleva posiciones',af:'Gerencia'},
 {id:'COT',n:'Coteros y trabajadores de cargue',tp:'persona',en:'ambos',am:'Recinto',int:'Ingreso diario',rec:'Fuerza de trabajo',tr:'Cargue, descargue y limpieza',dec:'Ninguna formal',af:'—',div:'Grupo de personas naturales sin instancia propia.'},
 {id:'TRA',n:'Empresas transportadoras',tp:'operador',en:'ambos',am:'Región',int:'Mover carga',rec:'Flota de camiones',tr:'Transporte de alimentos',dec:'Horarios y rutas de llegada',af:'Vías y aire de Kennedy'},
 {id:'CAMC',n:'Camiones de carga de alimentos',tp:'objeto',en:'ambos',am:'Av. Ciudad de Cali y Américas',int:'—',rec:'Capacidad de carga',tr:'Llevan más de 12.000 t/día de alimentos (S5)',dec:'—',af:'Vías, ruido, aire',div:'Objeto técnico: lo opera la transportadora y lo regula la Secretaría de Movilidad.'},
 {id:'SDM',n:'Secretaría de Movilidad',tp:'regulador',en:'ambos',am:'Ciudad',int:'Ordenar el tránsito',rec:'Restricciones de carga',tr:'Regulación',dec:'Horarios y rutas permitidas',af:'Transportadoras'},
 {id:'RED',n:'Red de alcantarillado y canal hacia La Vaca',tp:'objeto',en:'ambos',am:'Cuenca local',int:'—',rec:'—',tr:'Conduce efluentes',dec:'—',af:'Humedal',div:'Objeto técnico: lo opera la EAAB.'},
 {id:'HUM',n:'Humedal La Vaca',tp:'nohumano',en:'ambos',am:'Reserva distrital',int:'Continuidad de su vida y su agua',rec:'Biofiltro, hábitat',tr:'Depura agua',dec:'Ninguna',af:'Aves, vecinos, cuenca',div:'Afectado sin voz hoy: recibe la carga orgánica (S5) sin representación en las decisiones.'},
 {id:'VEC',n:'Vecinos del entorno de La Vaca',tp:'persona',en:'ambos',am:'Barrio',int:'Salud y ambiente cotidiano',rec:'Tiempo, conocimiento local',tr:'Cuidado del barrio',dec:'Ninguna vinculante',af:'—',div:'Afectados sin voz: soportan olores y vectores sin participar en las decisiones de la central.'},
 {id:'REC',n:'Recicladores de oficio',tp:'persona',en:'ambos',am:'Calles y central',int:'Ingreso del material recuperado',rec:'Conocimiento y trabajo de separación',tr:'Recuperan material',dec:'Ninguna formal',af:'—',div:'Asociados e independientes tienen ingresos y protección muy distintos.'},
 {id:'ORGR',n:'Organizaciones de recicladores',tp:'colectivo',en:'ambos',am:'Localidad',int:'Reconocimiento y pago del aprovechamiento',rec:'Bodegas, rutas',tr:'Organizan el trabajo de reciclaje',dec:'Reparto interno del trabajo',af:'Recicladores'},
 {id:'JAC',n:'Juntas de Acción Comunal (188)',tp:'colectivo',en:'ambos',am:'Barrios (S4)',int:'Mejoras barriales',rec:'Salones comunales, convocatoria',tr:'Gestión comunitaria',dec:'Proponen en presupuestos participativos',af:'Barrios',div:'188 juntas con agendas distintas; la presidencia no equivale al mandato de la base.'},
 {id:'COLA',n:'Colectivos ambientales',tp:'colectivo',en:'ambos',am:'Humedales',int:'Proteger los humedales',rec:'Conocimiento, monitoreo, acciones legales (S5)',tr:'Siembra, monitoreo de aves, defensa',dec:'Ninguna vinculante; litigan',af:'Humedal'},
 {id:'HUE',n:'Red de huertas urbanas (811)',tp:'colectivo',en:'ambos',am:'Barrios (S4)',int:'Producir alimento y suelo',rec:'Suelo cultivado, trabajo',tr:'Cultivo y compostaje',dec:'Manejo de sus huertas',af:'Hogares'},
 {id:'JBB',n:'Jardín Botánico',tp:'entidad',en:'ambos',am:'Ciudad',int:'Agricultura urbana y ciencia',rec:'Asistencia técnica, datos',tr:'Acompaña huertas, monitorea',dec:'Programas técnicos',af:'Huertas'},
 {id:'MESA',n:'Mesa Ecosocial de Kennedy',tp:'instancia',en:'prop',am:'Localidad',int:'Coordinar los núcleos',rec:'Agenda pública y actas',tr:'Convoca y publica',dec:'No decide por los núcleos: ordena la agenda',af:'Toda la red'},
 {id:'NRES',n:'Núcleo de orgánicos y circularidad',tp:'instancia',en:'prop',am:'Central y barrios',int:'Desviar orgánicos del humedal y pagar ese trabajo',rec:'Fondo común, planta',tr:'Reglas de separación',dec:'Encabeza cuando el asunto es residuos',af:'Comerciantes, recicladores, humedal'},
 {id:'NAGU',n:'Núcleo de agua y humedal',tp:'instancia',en:'prop',am:'Cuenca local',int:'Calidad del agua de La Vaca',rec:'Monitoreo, conocimiento local',tr:'Seguimiento y alertas',dec:'Encabeza cuando el asunto es agua',af:'Humedal, vecinos'},
 {id:'VOC',n:'Vocerías rotativas y revocables',tp:'cargo',en:'prop',am:'Entre escalas',int:'Llevar mandatos',rec:'Actas del núcleo',tr:'Negocian con entidades',dec:'Ninguna propia: llevan lo decidido',af:'Entidades'},
 {id:'GUAR',n:'Guardianía de La Vaca',tp:'instancia',en:'prop',am:'Humedal',int:'Representar al humedal',rec:'Monitoreo de colectivos y del Jardín Botánico',tr:'Mide y alerta',dec:'Llave ecológica: puede detener lo que aumente la carga',af:'Humedal'},
 {id:'FON',n:'Fondo común de circularidad',tp:'entidad',en:'prop',am:'Localidad',int:'Pagar el trabajo del aprovechamiento',rec:'Aportes por tonelada, venta de compost, inversión local',tr:'Paga',dec:'Reparto aprobado por el núcleo',af:'Recicladores, coteros'},
 {id:'PLA',n:'Planta de compostaje y biogás',tp:'objeto',en:'prop',am:'Entorno de la central (ubicación por definir)',int:'—',rec:'Capacidad de proceso',tr:'Transforma orgánicos',dec:'—',af:'Huertas, humedal',div:'Objeto técnico propuesto: la operarían organizaciones de recicladores y la regula la SDA.'}
];

// k: formal | efectiva | coop | conflicto | flujo · f: info | rec | trab | aut · key: puede detener el flujo · w: 1 ocasional, 2 periódica, 3 continua
C3.EDGES = [
 {s:'ALCC',t:'ALC',k:'formal',w:3,st:'normativa',ev:'doc',en:'ambos',m:'El cargo dirige la entidad: la firma recae en quien lo ocupa.'},
 {s:'FDL',t:'ALC',k:'flujo',f:'rec',w:3,st:'normativa',ev:'doc',src:'S1',en:'ambos',m:'El fondo paga lo que la Alcaldía contrata.'},
 {s:'ALC',t:'FDL',k:'efectiva',w:3,key:1,st:'observada',ev:'hip',en:'hoy',m:'La Alcaldía formula y contrata: puede retrasar o reorientar lo votado. Por verificar con la ejecución real.'},
 {s:'JAC',t:'FDL',k:'formal',w:2,st:'normativa',ev:'doc',src:'S1',en:'hoy',m:'Las juntas y vecinos votan el 50 % de la inversión local, pero no controlan el contrato.'},
 {s:'JAL',t:'ALC',k:'formal',w:2,st:'normativa',ev:'doc',en:'ambos',m:'Control político y aprobación del presupuesto.'},
 {s:'ASA',t:'COR',k:'efectiva',w:3,key:1,st:'normativa',ev:'doc',src:'S2',en:'ambos',m:'La asamblea decide sobre la sociedad fuera de la localidad.'},
 {s:'GER',t:'COR',k:'formal',w:3,st:'normativa',ev:'doc',src:'S2',en:'ambos',m:'La gerencia administra el recinto.'},
 {s:'GER',t:'COMR',k:'efectiva',w:2,st:'observada',ev:'hip',en:'ambos',m:'Asigna bodegas y fija reglas de operación.'},
 {s:'COMI',t:'GER',k:'flujo',f:'info',w:2,st:'observada',ev:'hip',en:'ambos',m:'El comité lleva solicitudes de los comerciantes.'},
 {s:'COMR',t:'COT',k:'flujo',f:'trab',w:3,st:'observada',ev:'hip',en:'ambos',m:'Los comerciantes contratan cargue y limpieza por jornal.'},
 {s:'TRA',t:'CAMC',k:'flujo',f:'trab',w:3,st:'observada',ev:'doc',src:'S5',en:'ambos',m:'Las transportadoras operan los camiones.'},
 {s:'SDM',t:'CAMC',k:'formal',w:2,key:1,st:'normativa',ev:'doc',en:'ambos',m:'Movilidad autoriza horarios y rutas: puede detener la circulación.'},
 {s:'CAMC',t:'COR',k:'flujo',f:'rec',w:3,st:'observada',ev:'doc',src:'S5',en:'ambos',m:'Más de 12.000 t/día de alimentos entran por la Av. Ciudad de Cali.'},
 {s:'COR',t:'RED',k:'flujo',f:'rec',w:3,st:'observada',ev:'doc',src:'S5',en:'hoy',m:'El lavado de productos genera efluentes con alta carga orgánica.'},
 {s:'COR',t:'RED',k:'flujo',f:'rec',w:1,st:'propuesta',ev:'prop',en:'prop',m:'Con separación en origen, el efluente baja: meta medible del núcleo de orgánicos.'},
 {s:'RED',t:'HUM',k:'conflicto',w:3,st:'observada',ev:'doc',src:'S5',en:'hoy',m:'La carga orgánica escurre hacia La Vaca.'},
 {s:'RED',t:'HUM',k:'conflicto',w:1,st:'propuesta',ev:'prop',en:'prop',m:'Carga residual que la guardianía vigila.'},
 {s:'EAAB',t:'RED',k:'efectiva',w:3,key:1,st:'normativa',ev:'doc',src:'S5',en:'ambos',m:'La EAAB opera la red y fija el calendario de obras: puede detener o cambiar el flujo.'},
 {s:'SDA',t:'COR',k:'formal',w:2,key:1,st:'normativa',ev:'doc',en:'ambos',m:'Control de vertimientos: atribución formal cuyo uso efectivo está por verificar.'},
 {s:'UAESP',t:'CLI',k:'formal',w:3,st:'normativa',ev:'doc',src:'S3',en:'ambos',m:'Supervisa el contrato de aseo.'},
 {s:'CLI',t:'COMP',k:'flujo',f:'trab',w:3,st:'normativa',ev:'doc',src:'S3',en:'ambos',m:'Opera la flota de compactadores.'},
 {s:'COMP',t:'COR',k:'flujo',f:'rec',w:3,st:'observada',ev:'hip',en:'hoy',m:'Recogen residuos mezclados y los llevan al relleno.'},
 {s:'COMR',t:'REC',k:'flujo',f:'rec',w:2,st:'observada',ev:'hip',en:'ambos',m:'Material aprovechable que recuperan recicladores sin pago por el servicio.'},
 {s:'REC',t:'ORGR',k:'coop',w:2,st:'observada',ev:'hip',en:'ambos',m:'Parte de los recicladores se asocia.'},
 {s:'ALCC',t:'REC',k:'conflicto',w:2,st:'observada',ev:'doc',src:'S9',en:'hoy',m:'Operativos de espacio público sobre bodegas y ventas en María Paz.'},
 {s:'COLA',t:'HUM',k:'coop',w:3,st:'observada',ev:'doc',src:'S5',en:'ambos',m:'Custodia: siembra, monitoreo de aves y defensa.'},
 {s:'COLA',t:'SDA',k:'conflicto',w:2,st:'observada',ev:'doc',src:'S5',en:'hoy',m:'Acciones populares y tutelas para obligar a proteger los humedales.'},
 {s:'COLA',t:'EAAB',k:'conflicto',w:2,st:'observada',ev:'doc',src:'S5',en:'hoy',m:'Disputa sobre obras y manejo hidráulico.'},
 {s:'JBB',t:'HUE',k:'flujo',f:'info',w:2,st:'observada',ev:'doc',src:'S4',en:'ambos',m:'Asistencia técnica a huertas urbanas.'},
 {s:'HUM',t:'VEC',k:'conflicto',w:2,st:'observada',ev:'hip',en:'hoy',m:'Olores y vectores cuando el humedal recibe carga orgánica.'},
 {s:'VEC',t:'ALC',k:'flujo',f:'info',w:1,st:'observada',ev:'hip',en:'hoy',m:'Quejas sin efecto vinculante.'},
 // propuesta heterárquica
 {s:'JAC',t:'MESA',k:'flujo',f:'info',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Pueden poner asuntos en la agenda pública.'},
 {s:'COLA',t:'MESA',k:'flujo',f:'info',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Pueden poner asuntos en la agenda pública.'},
 {s:'ORGR',t:'MESA',k:'flujo',f:'info',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Pueden poner asuntos en la agenda pública.'},
 {s:'COMI',t:'MESA',k:'flujo',f:'info',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Pueden poner asuntos en la agenda pública.'},
 {s:'VEC',t:'NAGU',k:'flujo',f:'info',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Los vecinos reportan y deliberan sobre el agua.'},
 {s:'MESA',t:'NRES',k:'formal',w:2,st:'propuesta',ev:'prop',en:'prop',m:'La mesa asigna el asunto al núcleo que encabeza esa materia.'},
 {s:'MESA',t:'NAGU',k:'formal',w:2,st:'propuesta',ev:'prop',en:'prop',m:'La mesa asigna el asunto al núcleo que encabeza esa materia.'},
 {s:'ORGR',t:'NRES',k:'efectiva',w:3,st:'propuesta',ev:'prop',en:'prop',m:'En residuos, quienes hacen el trabajo encabezan la decisión.'},
 {s:'COMR',t:'NRES',k:'coop',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Los comerciantes negocian reglas de separación.'},
 {s:'COLA',t:'NAGU',k:'efectiva',w:3,st:'propuesta',ev:'prop',en:'prop',m:'En agua, quienes custodian y monitorean encabezan.'},
 {s:'NRES',t:'VOC',k:'formal',w:2,key:1,st:'propuesta',ev:'prop',en:'prop',m:'El núcleo da y puede revocar el mandato.'},
 {s:'NAGU',t:'VOC',k:'formal',w:2,key:1,st:'propuesta',ev:'prop',en:'prop',m:'El núcleo da y puede revocar el mandato.'},
 {s:'VOC',t:'FDL',k:'efectiva',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Las vocerías llevan los proyectos votados y les hacen seguimiento hasta el pago.'},
 {s:'ALC',t:'MESA',k:'coop',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Cooperación que la Alcaldía tendría que aceptar: no está garantizada.'},
 {s:'COLA',t:'GUAR',k:'coop',w:3,st:'propuesta',ev:'prop',en:'prop',m:'Los colectivos forman la guardianía.'},
 {s:'JBB',t:'GUAR',k:'flujo',f:'info',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Monitoreo técnico del agua y la biodiversidad.'},
 {s:'GUAR',t:'HUM',k:'coop',w:3,st:'propuesta',ev:'prop',en:'prop',m:'Representa al humedal con datos.'},
 {s:'GUAR',t:'NRES',k:'efectiva',w:2,key:1,st:'propuesta',ev:'prop',en:'prop',m:'Llave ecológica: puede detener una regla que aumente la carga sobre La Vaca.'},
 {s:'EAAB',t:'NAGU',k:'coop',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Comparte datos y calendario de obras.'},
 {s:'COR',t:'PLA',k:'flujo',f:'rec',w:3,st:'propuesta',ev:'prop',en:'prop',m:'Orgánicos separados en origen.'},
 {s:'ORGR',t:'PLA',k:'flujo',f:'trab',w:3,st:'propuesta',ev:'prop',en:'prop',m:'Operan la planta.'},
 {s:'COT',t:'PLA',k:'flujo',f:'trab',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Separan y llevan el material.'},
 {s:'SDA',t:'PLA',k:'formal',w:2,key:1,st:'normativa',ev:'doc',en:'prop',m:'El permiso ambiental puede detener la planta.'},
 {s:'PLA',t:'HUE',k:'flujo',f:'rec',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Compost para las huertas.'},
 {s:'COMR',t:'FON',k:'flujo',f:'rec',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Aporte por tonelada separada.'},
 {s:'FDL',t:'FON',k:'flujo',f:'rec',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Parte de la inversión votada; depende de la Alcaldía.'},
 {s:'FON',t:'ORGR',k:'flujo',f:'rec',w:3,st:'propuesta',ev:'prop',en:'prop',m:'Pago por el trabajo de aprovechamiento.'},
 {s:'FON',t:'COT',k:'flujo',f:'rec',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Pago por separación en origen.'},
 {s:'ASA',t:'NRES',k:'conflicto',w:2,st:'propuesta',ev:'prop',en:'prop',m:'La asamblea puede negarse a financiar el tratamiento: tensión visible.'}
];

/* ---------- 3 · Trayecto de una decisión ---------- */
C3.DECISION = '¿Qué se hace con los orgánicos y efluentes de Corabastos que llegan al Humedal La Vaca?';
C3.STEPS = [
 {k:'agenda', n:'Agenda', q:'¿Quién la pone en agenda?',
  hoy:{quien:'Entidades (SDA, EAAB) y la gerencia de Corabastos; los colectivos solo pueden litigar.',ent:'Quejas, tutelas, informes técnicos',sal:'El asunto entra si una entidad lo prioriza',regla:'Competencia de cada entidad',esc:'Ciudad',disp:'Nadie de la localidad puede obligar a tratar el tema'},
  prop:{quien:'Cualquier junta, colectivo, organización de recicladores o el comité de comerciantes, a través de la Mesa Ecosocial.',ent:'Propuesta escrita, datos de la guardianía',sal:'Asunto asignado al núcleo de orgánicos',regla:'Basta una organización con acta',esc:'Localidad',disp:'Qué núcleo encabeza cuando el asunto toca agua y residuos a la vez'}},
 {k:'delib', n:'Deliberación', q:'¿Quién propone y disiente?',
  hoy:{quien:'Técnicos de las entidades y de Corabastos preparan las opciones.',ent:'Estudios con cifras en disputa (S6)',sal:'Opciones técnicas cerradas',regla:'Concepto técnico',esc:'Ciudad',disp:'Quien prepara las opciones fija los supuestos'},
  prop:{quien:'Núcleo de orgánicos (recicladores, comerciantes, coteros) con la guardianía; los técnicos exponen alternativas y supuestos.',ent:'Medición propia, alternativas técnicas',sal:'Dos o tres alternativas con costos y quién carga el trabajo',regla:'Toda alternativa debe decir quién trabaja y quién paga',esc:'Central y barrios',disp:'Lenguaje técnico y horarios que excluyen a quien trabaja de noche'}},
 {k:'resol', n:'Resolución', q:'¿Con qué regla y mandato?',
  hoy:{quien:'Asamblea de accionistas y gerencia deciden dentro de la central; la SDA autoriza o sanciona.',ent:'Opciones técnicas',sal:'Decisión interna',regla:'Mayoría accionaria',esc:'Nación y Distrito',disp:'La decisión se toma fuera de Kennedy'},
  prop:{quien:'El núcleo de orgánicos decide por consentimiento; la guardianía puede activar la llave ecológica.',ent:'Alternativas deliberadas',sal:'Acta con reglas de separación, destino y reparto del fondo',regla:'Consentimiento: se aprueba si nadie tiene una objeción razonada; la llave ecológica exige datos',esc:'Localidad y central',disp:'Corabastos puede no acatar: requiere acuerdo con la asamblea'}},
 {k:'ejec', n:'Ejecución', q:'¿Con qué suelo y dinero?',
  hoy:{quien:'Ciudad Limpia recoge residuos mezclados; coteros y recicladores hacen trabajo sin pago por aprovechamiento.',ent:'Contrato de aseo, jornal',sal:'Residuos al relleno; efluentes al humedal',regla:'Contrato del operador',esc:'Ciudad',disp:'El trabajo lo hacen quienes no decidieron'},
  prop:{quien:'Organizaciones de recicladores operan la planta; coteros separan; el fondo común paga.',ent:'Fondo común, suelo para la planta, permiso SDA',sal:'Compost para 811 huertas registradas (S4); menos carga al humedal',regla:'Pago por tonelada separada',esc:'Central y barrios',disp:'Suelo para la planta y permiso ambiental'}},
 {k:'rect', n:'Rectificación', q:'¿Quién corrige y revoca?',
  hoy:{quien:'Solo entidades sancionan; los afectados recurren a tutelas.',ent:'Inspecciones',sal:'Sanción o nada',regla:'Procedimiento sancionatorio',esc:'Ciudad',disp:'Afectados sin vía directa'},
  prop:{quien:'La guardianía mide; un tercio del núcleo pide revisión; la mayoría puede revocar vocerías y reglas.',ent:'Mediciones mensuales, actas',sal:'Regla ajustada o vocería revocada; el asunto vuelve a la agenda',regla:'Revisión por un tercio, revocación por mayoría',esc:'Localidad',disp:'Desgaste de quienes miden y vigilan'}}
];

/* ---------- 4 · Modelo dinámico-causal ---------- */
// x,y en una grilla de 1000 × 640
C3.VARS = [
 {id:'PAR',n:'Participación efectiva',d:'Personas que sostienen trabajo en los núcleos cada mes',x:40,y:140},
 {id:'TRB',n:'Trabajo colectivo disponible',d:'Horas por mes dedicadas a separar, operar, medir y deliberar',x:290,y:140},
 {id:'ACU',n:'Acuerdos cumplidos',d:'Proporción de reglas del núcleo que se ejecutan en el plazo',x:290,y:340},
 {id:'CON',n:'Confianza fundada',d:'Confianza basada en acuerdos cumplidos y verificados, no en promesas',x:40,y:340},
 {id:'CAR',n:'Carga por persona',d:'Horas de trabajo por participante',x:540,y:40},
 {id:'DES',n:'Desgaste',d:'Abandono y cansancio acumulado',x:790,y:210},
 {id:'ROT',n:'Rotación de mandatos',d:'Vocerías renovadas y tareas redistribuidas',x:790,y:40},
 {id:'APR',n:'Orgánicos aprovechados',d:'Toneladas desviadas a compostaje o biogás',x:540,y:340},
 {id:'HUM',n:'Carga orgánica sobre La Vaca',d:'Efluentes y residuos que llegan al humedal',x:540,y:550},
 {id:'ING',n:'Fondo común',d:'Recursos propios por aportes y venta de compost',x:290,y:550},
 {id:'DEP',n:'Dependencia externa',d:'Parte de la operación que depende de la inversión local contratada por la Alcaldía',x:40,y:550},
 {id:'AGE',n:'Agenda técnica concentrada',d:'Proporción de alternativas preparadas solo por técnicos',x:790,y:400}
];
C3.LINKS = [
 {s:'PAR',t:'TRB',sg:'+',m:'Más personas aportan más horas.',ev:'prop'},
 {s:'TRB',t:'ACU',sg:'+',m:'Con más horas se cumplen más reglas a tiempo.',ev:'hip'},
 {s:'ACU',t:'CON',sg:'+',dl:1,m:'Ver acuerdos cumplidos construye confianza, con retardo de meses.',ev:'hip'},
 {s:'CON',t:'PAR',sg:'+',m:'La confianza fundada atrae y retiene participantes.',ev:'hip'},
 {s:'TRB',t:'CAR',sg:'+',m:'Si el trabajo crece más que las personas, sube la carga individual.',ev:'hip'},
 {s:'CAR',t:'DES',sg:'+',dl:1,m:'La sobrecarga se acumula en desgaste, con retardo.',ev:'hip'},
 {s:'DES',t:'PAR',sg:'-',m:'El desgaste saca gente de los núcleos.',ev:'hip'},
 {s:'ROT',t:'CAR',sg:'-',m:'Rotar mandatos y tareas reparte el trabajo.',ev:'prop'},
 {s:'DES',t:'ROT',sg:'+',m:'Regla propuesta: cuando el desgaste se nota, la rotación se activa.',ev:'prop'},
 {s:'TRB',t:'APR',sg:'+',m:'Más trabajo de separación y operación desvía más orgánicos.',ev:'hip'},
 {s:'APR',t:'HUM',sg:'-',dl:1,m:'Menos orgánicos al alcantarillado bajan la carga sobre el humedal, con retardo.',ev:'hip'},
 {s:'APR',t:'ING',sg:'+',m:'Aportes por tonelada y venta de compost alimentan el fondo.',ev:'prop'},
 {s:'ING',t:'DEP',sg:'-',m:'Con recursos propios baja la dependencia del presupuesto contratado por otros.',ev:'hip'},
 {s:'DEP',t:'ACU',sg:'-',m:'Si la ejecución depende de un contrato ajeno, los plazos se incumplen cuando el contrato se retrasa.',ev:'hip'},
 {s:'HUM',t:'CON',sg:'-',dl:1,m:'Si el humedal mejora de forma medible, la confianza en la mesa crece (signo negativo: menos carga, más confianza).',ev:'hip'},
 {s:'AGE',t:'PAR',sg:'-',m:'Cuando solo los técnicos preparan opciones, quien trabaja deja de participar.',ev:'hip'},
 {s:'ROT',t:'AGE',sg:'-',m:'Rotar la preparación de opciones reparte el conocimiento técnico.',ev:'prop'},
 {s:'APR',t:'AGE',sg:'+',dl:1,m:'Operar una planta exige conocimiento técnico que tiende a concentrarse.',ev:'hip'}
];
C3.LOOPS = [
 {id:'R1',tp:'R',n:'Confianza que se reproduce',path:['PAR','TRB','ACU','CON','PAR'],d:'Reproduce la organización: participación, trabajo, acuerdos cumplidos y confianza se alimentan.'},
 {id:'B1',tp:'B',n:'Desgaste que frena',path:['PAR','TRB','CAR','DES','PAR'],d:'Si el trabajo crece sin reparto, el desgaste saca gente: el límite del crecimiento.'},
 {id:'B2',tp:'B',n:'Rotación que transforma',path:['CAR','DES','ROT','CAR'],d:'Modifica las reglas: la rotación reparte la carga y contrarresta el desgaste.'},
 {id:'R2',tp:'R',n:'Circularidad que da autonomía',path:['TRB','APR','ING','DEP','ACU','CON','PAR','TRB'],d:'Transforma la distribución de recursos: el fondo propio reduce la dependencia y sostiene el cumplimiento.'},
 {id:'B3',tp:'B',n:'Técnica que concentra',path:['APR','AGE','PAR','TRB','APR'],d:'Contradicción interna: el éxito técnico concentra la agenda y aleja a quien trabaja.'}
];
C3.TIEMPO = [
 {t:'Mes 0 · Estado inicial',d:'Orgánicos mezclados al relleno y efluentes al humedal (S5). Cifras de residuos en disputa (S6). Juntas y colectivos sin vía vinculante.'},
 {t:'Mes 1–6 · Decisión concreta',d:'El núcleo de orgánicos aprueba separación en origen en un pabellón piloto y pago por tonelada. Condiciones: suelo para la planta, permiso de la SDA, acuerdo con la gerencia.'},
 {t:'Mes 6–18 · Efectos',d:'Coteros y recicladores asumen trabajo nuevo; el fondo recibe aportes; las huertas reciben compost; la guardianía empieza a medir. Se vuelve posible discutir un segundo pabellón.'},
 {t:'Mes 18 · Perturbación',d:'La inversión local que apoyaba la planta se retrasa en contratación y crece la carga de unas pocas personas.'},
 {t:'Trayectorias',d:'Con rotación y fondo propio, la planta sigue a menor ritmo y la participación se recupera. Sin rotación ni fondo, el desgaste vacía el núcleo y la gerencia retoma la decisión.'}
];

/* ---------- 5 · Contradicciones ---------- */
C3.TENSIONES = [
 {a:'Decisión colectiva',b:'Agenda técnica',q:'¿Quién prepara las opciones?',k:'Las alternativas sobre la planta y el agua las preparan técnicos de la SDA, la EAAB y la central; quien trabaja solo elige entre lo que le presentan.'},
 {a:'Autonomía',b:'Dependencia externa',q:'¿Quién condiciona la ejecución?',k:'El suelo de la central es de Corabastos, el permiso es de la SDA y el presupuesto local lo contrata la Alcaldía.'},
 {a:'Continuidad',b:'Desgaste del trabajo',q:'¿Quién sostiene tareas y cuidados?',k:'Separar, operar, medir y deliberar recae sobre coteros, recicladores y colectivos que ya trabajan jornadas largas.'},
 {a:'Beneficios para unos',b:'Costos para otros',q:'¿Quién asume los costos y puede discrepar?',k:'El humedal y la ciudad ganan; el costo de separar puede caer en los puestos pequeños y los recicladores independientes.'}
];
C3.CONTRA = {
 t:'La circularidad puede desplazar su costo a quien menos decide',
 produce:'Pagar por tonelada premia a quien separa mucho: grandes bodegas y organizaciones formales. Los recicladores independientes pierden el material que hoy recuperan gratis y los puestos pequeños pagan una separación que no pueden costear.',
 reproducen:'Grandes comerciantes y organizaciones formales que encabezan el núcleo; la gerencia si traslada la obligación sin recursos.',
 senales:['Caída del ingreso de recicladores independientes','Puestos pequeños sancionados o sin separar','Mismas tres organizaciones en todas las vocerías','Material que reaparece en la calle o el canal'],
 cambios:[{tp:'Regla',d:'Cuota en el núcleo para recicladores independientes y puestos pequeños, con voz antes de fijar tarifas.'},{tp:'Recurso',d:'Tarifa progresiva: paga más quien genera más; el fondo subsidia la separación de los puestos pequeños.'},{tp:'Relación',d:'Los recicladores independientes entran como proveedores registrados de la planta, no como competencia.'}],
 aceptar:'Grandes comerciantes (pagan más), gerencia (cede espacio), UAESP (reconoce el registro). Lo disputarían quienes hoy controlan el material.',
 evidencia:'Se supera si en 12 meses suben a la vez las toneladas aprovechadas y el ingreso de recicladores independientes; si sube lo primero y baja lo segundo, el costo solo se desplazó.'
};
C3.ESCENARIOS = [
 {t:'Continuidad',sup:'La Alcaldía acepta cooperar, el fondo cubre al menos la mitad de la operación y la rotación funciona.',res:'La organización conserva su capacidad de decidir y ejecutar aunque cambien las personas.',lim:'Supone que Corabastos sigue cediendo el suelo; no es un resultado demostrado.'},
 {t:'Transformación ante una dificultad',sup:'La asamblea de Corabastos retira el espacio de la planta.',res:'El núcleo traslada la planta a suelo de huertas o del espacio público y cambia la regla: los orgánicos se compostan en red barrial.',lim:'Exige suelo y permisos nuevos; podría reducir el volumen tratado.'}
];
C3.AUTO = 'Las interacciones repetidas en la planta y en las huertas pueden producir acuerdos que no dependen de una orden única: horarios de entrega, reparto de turnos y calidad del compost se ajustan entre quienes trabajan. Quién cambia las reglas: el núcleo, con actas y datos de la guardianía. Límite: la autoorganización no alcanza para cambiar el suelo, el permiso ni el presupuesto, que siguen en manos de entidades externas.';
C3.NOHUMANO = 'El humedal no habla: lo representan los colectivos que ya lo custodian y el monitoreo técnico del Jardín Botánico, con datos públicos de agua y aves. Su mecanismo es la llave ecológica: puede detener una regla, pero debe justificarla con mediciones.';

/* ---------- 6 · Síntesis territorial ---------- */
C3.EFECTOS = [
 {m:'hid',e:'Menos carga orgánica hacia La Vaca y un núcleo de agua con voz en el calendario de obras de la EAAB.'},
 {m:'cir',e:'Los orgánicos de la central vuelven como compost a las 811 huertas registradas en Kennedy (S4).'},
 {m:'reg',e:'La guardianía convierte la custodia que ya hacen los colectivos en un mecanismo de decisión.'},
 {m:'com',e:'Comerciantes y coteros pasan de recibir reglas a negociarlas; el fondo paga trabajo que hoy es gratuito.'},
 {m:'lim',e:'La llave ecológica fija un límite: ninguna regla puede aumentar la carga sobre el humedal.'},
 {m:'bio',e:'Las aves y la vida del humedal tienen representantes con datos y con capacidad de objetar.'},
 {m:'eco',e:'Las decisiones sobre alimento, residuos y agua se leen como un mismo ciclo.'}
];
C3.PENDIENTE = ['Cuántas toneladas de orgánicos genera hoy Corabastos (las fuentes difieren, S6)','Calidad del agua de La Vaca antes y después: no hay serie pública consultada','Si la Alcaldía Local aceptaría cooperar con una mesa que no controla','Suelo disponible para la planta y su permiso ambiental','Cuántos recicladores independientes trabajan en el entorno de la central'];
