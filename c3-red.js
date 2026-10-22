// Capa del Corte III sobre la red principal (mismos IDs y nombres que la Red libre).
window.R3 = {};

// Actores propuestos (no existen hoy; solo aparecen en la propuesta heterárquica)
R3.PROP = {
 MESA:{id:'MESA',short:'Mesa Ecosocial',name:'Mesa Ecosocial de Kennedy',cat:'ins',sph:'gob',lv:2,prop:1,fun:'Ordena la agenda pública y asigna cada asunto al núcleo que lo encabeza. No decide por los núcleos.'},
 NRES:{id:'NRES',short:'Núcleo de orgánicos',name:'Núcleo de orgánicos y circularidad',cat:'ins',sph:'res',lv:1,prop:1,fun:'Decide reglas de separación, destino de los orgánicos y reparto del fondo. Encabeza cuando el asunto es residuos.'},
 NAGU:{id:'NAGU',short:'Núcleo de agua',name:'Núcleo de agua y humedal',cat:'ins',sph:'res',lv:1,prop:1,fun:'Decide sobre el agua de La Vaca y discute el calendario de obras. Encabeza cuando el asunto es agua.'},
 VOC:{id:'VOC',short:'Vocerías revocables',name:'Vocerías rotativas y revocables',cat:'per',sph:'gob',lv:2,prop:1,fun:'Llevan lo decidido a las entidades. No deciden; su núcleo puede retirarlas.'},
 GUAR:{id:'GUAR',short:'Guardianía de La Vaca',name:'Guardianía del Humedal La Vaca',cat:'ins',sph:'res',lv:1,prop:1,fun:'Representa al humedal con mediciones. Tiene la llave ecológica: puede detener una regla que aumente la carga.'},
 FON:{id:'FON',short:'Fondo común',name:'Fondo común de circularidad',cat:'org',sph:'res',lv:2,prop:1,fun:'Recibe aportes por tonelada, venta de compost e inversión local; paga el trabajo de separar y transformar.'},
 PLA:{id:'PLA',short:'Planta de compost',name:'Planta de compostaje y biogás',cat:'obj',sph:'res',lv:3,prop:1,fun:'Objeto técnico propuesto: la operan organizaciones de recicladores y la regula la Secretaría de Ambiente.'}
};

// k: formal | efectiva | coop | conflicto | flujo (f: info | rec | trab) · key: puede detener el flujo
// st: normativa | observada | propuesta · ev: doc | hip | prop · en: hoy | prop | ambos
R3.EDGES = [
 {s:'ALCC',t:'A34',k:'formal',w:3,st:'normativa',ev:'doc',en:'ambos',m:'Quien ocupa el cargo dirige la entidad y firma.'},
 {s:'FDL',t:'A34',k:'flujo',f:'rec',w:3,st:'normativa',ev:'doc',src:'S1',en:'ambos',m:'El fondo paga lo que la Alcaldía contrata.'},
 {s:'A34',t:'FDL',k:'efectiva',w:3,key:1,st:'observada',ev:'hip',en:'hoy',m:'La Alcaldía formula y contrata: puede retrasar o reorientar lo votado.'},
 {s:'A35',t:'FDL',k:'formal',w:2,st:'normativa',ev:'doc',src:'S1',en:'hoy',m:'Las juntas votan la mitad de la inversión local, sin controlar el contrato.'},
 {s:'N01',t:'A34',k:'formal',w:2,st:'normativa',ev:'doc',en:'ambos',m:'Control político y aprobación del presupuesto.'},
 {s:'A02',t:'A01',k:'efectiva',w:3,key:1,st:'normativa',ev:'doc',src:'S2',en:'ambos',m:'La asamblea decide sobre la sociedad, fuera de Kennedy.'},
 {s:'A04',t:'A01',k:'formal',w:3,st:'normativa',ev:'doc',src:'S2',en:'ambos',m:'La gerencia administra el recinto.'},
 {s:'A04',t:'A06',k:'efectiva',w:2,st:'observada',ev:'hip',en:'ambos',m:'Asigna bodegas y fija reglas de operación.'},
 {s:'A70',t:'A04',k:'flujo',f:'info',w:2,st:'observada',ev:'hip',en:'ambos',m:'El comité lleva solicitudes de los comerciantes.'},
 {s:'A06',t:'A13',k:'flujo',f:'trab',w:3,st:'observada',ev:'hip',en:'ambos',m:'Contratan cargue y limpieza por jornal.'},
 {s:'A10',t:'LOG01',k:'flujo',f:'trab',w:3,st:'observada',ev:'doc',src:'S5',en:'ambos',m:'Las transportadoras operan los camiones.'},
 {s:'A66',t:'LOG01',k:'formal',w:2,key:1,st:'normativa',ev:'doc',en:'ambos',m:'Movilidad autoriza horarios y rutas: puede detener la circulación.'},
 {s:'LOG01',t:'A01',k:'flujo',f:'rec',w:3,st:'observada',ev:'doc',src:'S5',en:'ambos',m:'Más de 12.000 t/día de alimentos entran por la Av. Ciudad de Cali.'},
 {s:'A01',t:'A37',k:'conflicto',w:3,st:'observada',ev:'doc',src:'S5',en:'hoy',m:'Efluentes con carga orgánica hacia La Vaca; olores y vectores para los vecinos.'},
 {s:'A01',t:'A37',k:'conflicto',w:1,st:'propuesta',ev:'prop',en:'prop',m:'Carga residual que la guardianía vigila.'},
 {s:'N06',t:'AMB01',k:'efectiva',w:3,key:1,st:'normativa',ev:'doc',src:'S5',en:'ambos',m:'El Acueducto opera la red y el humedal: fija el calendario de obras.'},
 {s:'A33',t:'A01',k:'formal',w:2,key:1,st:'normativa',ev:'doc',en:'ambos',m:'Control de vertimientos: atribución formal cuyo uso efectivo está por verificar.'},
 {s:'A32',t:'A28',k:'formal',w:3,st:'normativa',ev:'doc',src:'S3',en:'ambos',m:'Supervisa el contrato de aseo.'},
 {s:'A28',t:'RES01',k:'flujo',f:'trab',w:3,st:'normativa',ev:'doc',src:'S3',en:'ambos',m:'Opera los camiones recolectores.'},
 {s:'RES01',t:'A01',k:'flujo',f:'rec',w:3,st:'observada',ev:'hip',en:'hoy',m:'Recogen residuos mezclados y los llevan al relleno.'},
 {s:'A06',t:'A27',k:'flujo',f:'rec',w:2,st:'observada',ev:'hip',en:'ambos',m:'Material que recuperan recicladores sin pago por el servicio.'},
 {s:'A27',t:'A25',k:'coop',w:2,st:'observada',ev:'hip',en:'ambos',m:'Parte de los recicladores se asocia.'},
 {s:'ALCC',t:'A55',k:'conflicto',w:2,st:'observada',ev:'doc',src:'S9',en:'hoy',m:'Operativos de espacio público en María Paz (2025).'},
 {s:'ALCC',t:'A56',k:'conflicto',w:2,st:'observada',ev:'doc',src:'S9',en:'hoy',m:'Operativos sobre bodegas y recuperación en la calle.'},
 {s:'AMB04',t:'A33',k:'conflicto',w:2,st:'observada',ev:'doc',src:'S5',en:'hoy',m:'Acciones populares y tutelas para proteger los humedales.'},
 {s:'AMB04',t:'N06',k:'conflicto',w:2,st:'observada',ev:'doc',src:'S5',en:'hoy',m:'Disputa sobre obras y manejo hidráulico.'},
 {s:'AMB04',t:'AMB01',k:'coop',w:3,st:'observada',ev:'doc',src:'S5',en:'ambos',m:'Custodia: siembra, monitoreo de aves y defensa del humedal.'},
 {s:'A37',t:'A34',k:'flujo',f:'info',w:1,st:'observada',ev:'hip',en:'hoy',m:'Quejas sin efecto vinculante.'},
 // propuesta
 {s:'A35',t:'MESA',k:'flujo',f:'info',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Pueden poner asuntos en la agenda.'},
 {s:'AMB04',t:'MESA',k:'flujo',f:'info',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Pueden poner asuntos en la agenda.'},
 {s:'A25',t:'MESA',k:'flujo',f:'info',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Pueden poner asuntos en la agenda.'},
 {s:'A70',t:'MESA',k:'flujo',f:'info',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Pueden poner asuntos en la agenda.'},
 {s:'A55',t:'MESA',k:'flujo',f:'info',w:1,st:'propuesta',ev:'prop',en:'prop',m:'Los vendedores llevan su caso antes de un operativo.'},
 {s:'A37',t:'NAGU',k:'flujo',f:'info',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Los vecinos reportan y deliberan sobre el agua.'},
 {s:'MESA',t:'NRES',k:'formal',w:2,st:'propuesta',ev:'prop',en:'prop',m:'La mesa asigna el asunto al núcleo que lo encabeza.'},
 {s:'MESA',t:'NAGU',k:'formal',w:2,st:'propuesta',ev:'prop',en:'prop',m:'La mesa asigna el asunto al núcleo que lo encabeza.'},
 {s:'A25',t:'NRES',k:'efectiva',w:3,st:'propuesta',ev:'prop',en:'prop',m:'En residuos encabezan quienes hacen el trabajo.'},
 {s:'A27',t:'NRES',k:'flujo',f:'info',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Cuota para recicladores independientes.'},
 {s:'A06',t:'NRES',k:'coop',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Los comerciantes negocian reglas de separación.'},
 {s:'AMB04',t:'NAGU',k:'efectiva',w:3,st:'propuesta',ev:'prop',en:'prop',m:'En agua encabezan quienes custodian y miden.'},
 {s:'NRES',t:'VOC',k:'formal',w:2,key:1,st:'propuesta',ev:'prop',en:'prop',m:'El núcleo da y puede revocar el mandato.'},
 {s:'NAGU',t:'VOC',k:'formal',w:2,key:1,st:'propuesta',ev:'prop',en:'prop',m:'El núcleo da y puede revocar el mandato.'},
 {s:'VOC',t:'FDL',k:'efectiva',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Las vocerías siguen cada proyecto votado hasta el pago.'},
 {s:'A34',t:'MESA',k:'coop',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Cooperación que la Alcaldía tendría que aceptar: no está garantizada.'},
 {s:'AMB04',t:'GUAR',k:'coop',w:3,st:'propuesta',ev:'prop',en:'prop',m:'Los colectivos forman la guardianía.'},
 {s:'AMB01',t:'GUAR',k:'flujo',f:'info',w:2,st:'propuesta',ev:'prop',en:'prop',m:'El aula ambiental aporta monitoreo.'},
 {s:'GUAR',t:'NRES',k:'efectiva',w:2,key:1,st:'propuesta',ev:'prop',en:'prop',m:'Llave ecológica: puede detener una regla que aumente la carga sobre La Vaca.'},
 {s:'N06',t:'NAGU',k:'coop',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Comparte datos y calendario de obras.'},
 {s:'A01',t:'PLA',k:'flujo',f:'rec',w:3,st:'propuesta',ev:'prop',en:'prop',m:'Orgánicos separados en origen.'},
 {s:'A25',t:'PLA',k:'flujo',f:'trab',w:3,st:'propuesta',ev:'prop',en:'prop',m:'Operan la planta.'},
 {s:'A13',t:'PLA',k:'flujo',f:'trab',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Separan y llevan el material.'},
 {s:'A33',t:'PLA',k:'formal',w:2,key:1,st:'normativa',ev:'doc',en:'prop',m:'El permiso ambiental puede detener la planta.'},
 {s:'PLA',t:'COM_HUE',k:'flujo',f:'rec',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Compost para las huertas.'},
 {s:'A06',t:'FON',k:'flujo',f:'rec',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Aporte por tonelada: paga más quien genera más.'},
 {s:'FDL',t:'FON',k:'flujo',f:'rec',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Parte de la inversión votada; depende de la Alcaldía.'},
 {s:'FON',t:'A25',k:'flujo',f:'rec',w:3,st:'propuesta',ev:'prop',en:'prop',m:'Pago por el trabajo de aprovechamiento.'},
 {s:'FON',t:'A13',k:'flujo',f:'rec',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Pago por separación en origen.'},
 {s:'FON',t:'A27',k:'flujo',f:'rec',w:2,st:'propuesta',ev:'prop',en:'prop',m:'Pago a independientes registrados.'},
 {s:'A02',t:'NRES',k:'conflicto',w:2,st:'propuesta',ev:'prop',en:'prop',m:'La asamblea puede negarse a financiar el tratamiento: tensión visible.'}
];

// posiciones en la vista de influencia (escritorio 1000 × 640)
R3.POS = {A66:[80,55],N01:[300,55],ALCC:[430,55],FDL:[590,55],A32:[740,55],A33:[910,55],
 A10:[80,150],A34:[430,150],VOC:[590,150],A28:[740,150],N06:[910,150],
 LOG01:[80,250],A04:[230,250],A35:[370,250],MESA:[520,250],RES01:[740,250],AMB01:[910,250],
 A02:[80,350],A01:[230,350],NRES:[400,350],NAGU:[600,350],GUAR:[760,350],A55:[910,350],
 A70:[100,455],A06:[250,455],FON:[400,455],PLA:[540,455],AMB04:[700,455],A37:[910,455],
 A13:[160,565],A27:[330,565],A25:[470,565],COM_HUE:[620,565],A56:[770,565]};

// quién actúa en cada etapa de la decisión (IDs de la red)
R3.WHO = {
 hoy:[['A33','N06'],['A33','A04'],['A02','A04'],['A28','A13','A27'],['A33']],
 prop:[['A35','AMB04','A25','A70'],['NRES','GUAR'],['NRES','GUAR'],['A25','A13','PLA'],['GUAR','NRES']]
};
R3.REG = {hoy:['Competencia de una entidad','Concepto técnico','Mayoría accionaria','Contrato del operador','Sanción o nada'],prop:['Basta un acta','Quién trabaja y quién paga','Consentimiento y llave ecológica','Pago por tonelada','Revocación por mayoría']};
R3.ESC = {hoy:['Ciudad','Ciudad','Nación y Distrito','Ciudad','Ciudad'],prop:['Localidad','Central y barrios','Localidad','Central y barrios','Localidad']};
R3.DECIDE = {
 hoy:{d:['A02','A04','A33'],e:['A13','A27','A28'],m:'traslada trabajo y costos',x:'Decide fuera de Kennedy'},
 prop:{d:['NRES','GUAR'],e:['A25','A13','PLA'],m:'quien ejecuta delibera antes',x:'Siguen afuera: suelo, permiso, contrato'}
};

// quién mueve cada flecha del modelo causal (IDs de la red)
R3.ACTORES_CAUSAL = {
 'PAR>TRB':['A25','A13','AMB04'],'TRB>ACU':['NRES'],'ACU>CON':['A35','A37'],'CON>PAR':['A27','A06'],'TRB>CAR':['A25','A13'],'CAR>DES':['A25'],
 'DES>PAR':['A27'],'ROT>CAR':['VOC'],'DES>ROT':['NRES'],'TRB>APR':['A25','PLA'],'APR>HUM':['AMB01'],'APR>ING':['FON','A06'],'ING>DEP':['FON'],
 'DEP>ACU':['A34','FDL'],'HUM>CON':['GUAR'],'AGE>PAR':['A33','N06'],'ROT>AGE':['VOC'],'APR>AGE':['PLA']
};

// heterarquía: quién encabeza según el asunto (IDs de la red)
R3.RANK = {
 hoy:{n:'Hoy',c:'#9A958C',o:['A33','A34','A04','A06','A35','AMB04','A25','COM_HUE','A13','GUAR'],t:'Un solo orden para cualquier asunto: entidades arriba, quien trabaja abajo.'},
 agua:{n:'Agua',c:'#4EAECF',o:['GUAR','AMB04','A35','A33','A34','COM_HUE','A25','A06','A04','A13'],t:'En agua encabezan quienes custodian y miden el humedal.'},
 org:{n:'Orgánicos',c:'#8EBF4C',o:['A25','A13','A06','COM_HUE','GUAR','A04','A34','A35','A33','AMB04'],t:'En orgánicos encabezan quienes separan, cargan y transforman.'},
 abasto:{n:'Abastecimiento',c:'#DE9F50',o:['A06','A13','A04','COM_HUE','A25','A35','A34','A33','AMB04','GUAR'],t:'En abastecimiento encabezan comerciantes y coteros.'},
 cuidado:{n:'Cuidado',c:'#CF7ABB',o:['A35','COM_HUE','AMB04','A25','A13','A34','A33','A06','A04','GUAR'],t:'En cuidado encabezan juntas, huertas y comedores.'}
};

R3.PRINCIPIOS = [
 {ic:'i-ciclo',t:'Rango por asunto',d:'Encabeza quien sostiene esa materia, no quien tiene el cargo.'},
 {ic:'i-key',t:'Mandato revocable',d:'Las vocerías llevan decisiones; su núcleo puede retirarlas.'},
 {ic:'i-gota',t:'Escala ecológica',d:'La escala la define el ciclo: la cuenca, la cadena del alimento.'},
 {ic:'i-moneda',t:'Quien decide carga',d:'Quien aprueba una tarea aporta trabajo o recursos.'},
 {ic:'i-hoja',t:'Voz de lo no humano',d:'La guardianía puede detener una regla, con mediciones.'}
];
R3.OBJETIVOS = [
 {t:'Agenda abierta',i:'Asuntos puestos por juntas, colectivos, recicladores o comerciantes',hoy:'sin registro',meta:'más de la mitad'},
 {t:'Presupuesto trazable',i:'Proyectos votados que se pagan como se votaron',hoy:'50 % se vota (S1)',meta:'seguimiento de cada uno'},
 {t:'Menos carga en La Vaca',i:'Toneladas de orgánicos desviadas del humedal y del relleno',hoy:'cifras en disputa (S6)',meta:'medición mensual'},
 {t:'Rotación real',i:'Vocerías renovadas o revocadas por periodo',hoy:'no existe',meta:'rotan cada dos periodos'},
 {t:'Trabajo repartido',i:'Horas de trabajo colectivo por persona',hoy:'sin registro',meta:'nadie sobre el doble del promedio'}
];
R3.TRANS = {
 impulsan:['AMB04','A25','A35','COM_HUE'],resisten:['A02','A04','A34'],
 disputa:['Orgánicos','Suelo para la planta','Presupuesto local','Datos de vertimientos'],
 inicio:'Presupuestos participativos 2025–2028 y la actuación Chucua La Vaca ponen el humedal y los residuos de la central en la misma agenda.',
 pasos:[['Acuerdo','Una sola propuesta de juntas, colectivos y recicladores'],['Conflicto','¿Quién paga separar y transportar?'],['Aprendizaje','Piloto de compostaje con huertas'],['Decisión','El núcleo aprueba reglas y reparto']]
};
R3.REFERENTES = {
 filas:['Cómo deciden','Con qué recursos','Qué los sostuvo','Qué condición no tiene Kennedy'],
 cols:[
  {n:'Christiania',sub:'Copenhague · 1971',c:['Autogobierno asambleario','Fondo común (Fælleskasse)','Fundación que compró el suelo al Estado en 2012','Suelo propio: aquí el suelo de la central es de Corabastos']},
  {n:'Findhorn',sub:'Moray, Escocia · 1962',c:['Fundación educativa y fideicomiso de la ecoaldea','Donaciones, cursos y ecotecnologías','Ingresos por formación; crisis y reestructuración en 2023','Escala pequeña y aislada: aquí hay 188 juntas y una central de escala regional']},
  {n:'Kennedy (propuesta)',sub:'Heterarquía ecosocial',c:['Núcleos por asunto y mandato revocable','Fondo común de circularidad y presupuestos participativos','Por demostrar: depende de la Alcaldía y de Corabastos','—']}
 ],
 fuente:'Comparativa Christiania – Findhorn del grupo (S10). Lección: ningún mecanismo funcionó solo por voluntad; ambos dependieron de propiedad del suelo y de ingresos propios.'
};
R3.ESCENARIOS = [
 {t:'Continuidad',sup:'La Alcaldía coopera y el fondo cubre la mitad de la operación.',res:'La organización sigue aunque cambien las personas.'},
 {t:'Transformación',sup:'La asamblea de Corabastos retira el espacio de la planta.',res:'El núcleo lleva el compostaje a las huertas barriales y cambia la regla.'}
];
