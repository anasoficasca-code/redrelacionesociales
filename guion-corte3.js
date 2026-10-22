// Guion de la exposición del Corte III (15 minutos). Un objeto por clic.
// t: título · s: bajada · n: guion · tags: [ancla, título, texto, color]
window.TIMES = ['00:00–03:00','03:00–06:00','06:00–08:30','08:30–11:30','11:30–13:00','13:00–14:15','14:15–15:00'];
const O='#F2B53A',R='#E0623F',G='#4FB98C',B='#4EAECF';
window.GUION = [
/* 1 · quién encabeza */ [
 {t:'Hoy decide siempre el mismo',s:'Un solo orden para cualquier asunto: entidades arriba, quien trabaja abajo.',n:'Empecemos por cómo se decide hoy en Kennedy. Si ordenamos a los actores por su capacidad real de decidir, el orden es el mismo sin importar el asunto: arriba las entidades distritales y la Alcaldía Local; abajo quienes hacen el trabajo, como coteros y recicladores. Eso es una homoarquía: un solo modo de ordenar.',
  tags:[['A33','Arriba','entidades distritales',R],['A13','Abajo','quien hace el trabajo',MUTE()],['GUAR','No existe hoy','nadie representa al humedal',MUTE()]]},
 {t:'En agua encabezan quienes cuidan el humedal',s:'Heterarquía: el rango cambia según la materia.',n:'Nuestra propuesta política es la heterarquía, un concepto de Carole Crumley: los elementos no tienen un rango fijo, se ordenan distinto según lo que el sistema necesita. Cuando el asunto es el agua de La Vaca, encabezan la guardianía y los colectivos ambientales que ya la cuidan y la miden.',
  tags:[['GUAR','Encabeza en agua','guardianía de La Vaca',B]]},
 {t:'En orgánicos encabezan quienes separan',s:'El mismo territorio, otro orden.',n:'Si el asunto son los residuos orgánicos de Corabastos, el orden cambia: encabezan las organizaciones de recicladores y los coteros, porque son quienes separan, cargan y transforman el material.',
  tags:[['A25','Encabeza en orgánicos','organizaciones de recicladores','#8EBF4C']]},
 {t:'En abastecimiento, comerciantes y coteros',s:'La central no se decide solo desde la asamblea de accionistas.',n:'En abastecimiento la voz principal es la de los comerciantes y los coteros, no solo la de la asamblea de accionistas, que hoy decide desde fuera de la localidad.',
  tags:[['A06','Encabeza en abastecimiento','comerciantes mayoristas','#DE9F50']]},
 {t:'En cuidado, juntas, huertas y comedores',s:'Hay rangos, pero dependen del asunto.',n:'Y en cuidado encabezan las juntas de acción comunal, las huertas y los comedores. Ojo: heterarquía no es igualitarismo. Hay rangos, pero dependen del asunto, y quien encabeza queda sujeto a mandato y revocación.',
  tags:[['A35','Encabeza en cuidado','juntas de acción comunal','#CF7ABB']]}],
/* 2 · ecológicos → político */ [
 {t:'Los macromodelos ecológicos dicen qué cuidar',s:'Siete macromodelos construidos en los cortes anteriores.',n:'En los cortes anteriores construimos siete macromodelos ecológicos: ecocéntrico, hidrocéntrico, regenerativo, comercio ecológico, circularidad, límites ecológicos y biocéntrico. Ellos dicen qué debe cuidarse en Kennedy, pero no quién decide.'},
 {t:'La heterarquía dice quién decide sobre cada cosa',s:'Cada macromodelo ecológico define quién encabeza en su materia.',n:'La heterarquía los articula. Cada macromodelo ecológico se vuelve un criterio de rango: el hidrocéntrico pone primero a quienes custodian el agua; el de circularidad, a quienes separan; y el de límites ecológicos crea una llave que puede detener una decisión que aumente la carga sobre el humedal.'}],
/* 3 · principios */ [
 {t:'Principio 1: rango por asunto',s:'Encabeza quien sostiene esa materia, no quien tiene el cargo.',n:'Primer principio: el rango lo da el asunto, no el cargo. Nadie ocupa siempre la cima.'},
 {t:'Principio 2: mandato revocable',s:'Las vocerías llevan decisiones; su núcleo puede retirarlas.',n:'Segundo: mandato revocable. Distinguimos representación de mandato. En la representación, el colectivo elige y el delegado decide sin control de vuelta. Aquí el colectivo decide, la vocería ejecuta, rinde cuentas y puede ser revocada.'},
 {t:'Principio 3: escala ecológica',s:'La escala la define el ciclo, no solo el límite administrativo.',n:'Tercero: escala ecológica. Una decisión sobre el agua se toma a la escala de la cuenca, y una sobre el alimento a la escala de la cadena que va de la central al hogar.'},
 {t:'Principio 4: quien decide carga',s:'Quien aprueba una tarea aporta trabajo o recursos.',n:'Cuarto: quien decide carga. Quien aprueba una tarea aporta trabajo o recursos para cumplirla, y quien la ejecuta tiene voz antes de que se apruebe.'},
 {t:'Principio 5: voz de lo no humano',s:'La guardianía puede detener una regla, con mediciones.',n:'Quinto: voz de lo no humano. El humedal no habla; lo representan personas identificables, los colectivos y el aula ambiental, con datos públicos. Su mecanismo es la llave ecológica.'}],
/* 4 · reparto */ [
 {t:'Qué es colectivo',s:'Lo que afecta a todos se decide entre todos.',n:'¿Qué es colectivo? Las prioridades del presupuesto participativo, las reglas de separación de orgánicos y el uso del entorno del humedal.'},
 {t:'Qué se delega',s:'Lo técnico se delega con mandato escrito y plazo.',n:'Se delega la ejecución técnica: operar la planta, medir el agua y contratar. Siempre con mandato escrito y con plazo.'},
 {t:'Los límites de la delegación',s:'Delegar no es controlar.',n:'Y la delegación tiene límites: nadie con vocería más de dos periodos seguidos, ningún presupuesto sin acta del núcleo, y la llave ecológica no se delega.'},
 {t:'Cómo se revoca',s:'Un tercio pide revisión; la mayoría retira.',n:'Si un tercio del núcleo pide revisión, el asunto vuelve a la agenda, y la mayoría puede retirar el mandato. Rectificar reabre el ciclo.'}],
/* 5 · objetivos */ [
 {t:'Objetivo 1: agenda abierta',s:'«Habrá participación» no basta.',n:'Los objetivos tienen que poder verificarse. No basta con decir que habrá participación. Primer objetivo: que más de la mitad de los asuntos entren a la agenda por propuesta de juntas, colectivos, recicladores o comerciantes, con acta pública.'},
 {t:'Objetivo 2: presupuesto trazable',s:'El 50 % de la inversión local ya se vota.',n:'Segundo: presupuesto trazable. En Bogotá la mitad de la inversión local ya se decide en presupuestos participativos; el objetivo es seguir cada proyecto votado hasta que se paga.'},
 {t:'Objetivo 3: menos carga sobre La Vaca',s:'Las cifras de residuos de Corabastos no coinciden entre fuentes.',n:'Tercero: menos carga orgánica sobre La Vaca. Las cifras de residuos de Corabastos no coinciden entre fuentes, de 50 a 350 toneladas diarias, así que la primera tarea es medir.'},
 {t:'Objetivo 4: rotación real',s:'Todo mandato rota cada dos periodos.',n:'Cuarto: rotación real de las vocerías, medida por mandatos renovados o revocados.'},
 {t:'Objetivo 5: trabajo repartido',s:'Nadie por encima del doble del promedio.',n:'Y quinto: que el trabajo, incluido el cuidado y el mantenimiento, se reparta. Ninguna persona por encima del doble del promedio de horas.'}],
/* 6 · transición */ [
 {t:'Quién impulsa y quién resiste',s:'Actores de la red con intereses opuestos frente al cambio.',n:'La organización no se constituye por declararla. Impulsarían el cambio los colectivos ambientales, las organizaciones de recicladores, las juntas y las huertas. Podrían resistir la asamblea de accionistas, la gerencia de Corabastos y la Alcaldía, que hoy concentran la decisión.',
  tags:[['A02','Resiste','decide fuera de Kennedy',R],['AMB04','Impulsa','ya custodia el humedal',G]]},
 {t:'Recursos en disputa',s:'Orgánicos, suelo, presupuesto e información.',n:'Lo que está en disputa es material: los orgánicos, que tienen valor; el suelo para la planta; el presupuesto local; y los datos de vertimientos.'},
 {t:'El hecho que inicia el cambio',s:'Acuerdo, conflicto, aprendizaje y decisión.',n:'El hecho que puede iniciar el cambio es el ciclo de presupuestos participativos 2025 a 2028, junto con la actuación Chucua La Vaca del POT. A partir de ahí: un acuerdo entre organizaciones, un conflicto sobre quién paga, un aprendizaje con un piloto de compostaje y una decisión del núcleo.'}],
/* 7 · referentes */ [
 {t:'Christiania: suelo propio y fondo común',s:'Copenhague, desde 1971.',n:'Volvemos a los referentes. Christiania decide en asamblea y se sostiene con un fondo común, pero lo que la hizo durar fue comprar el suelo al Estado en 2012 mediante una fundación.'},
 {t:'Findhorn: ingresos propios y una crisis',s:'Moray, Escocia, desde 1962.',n:'Findhorn se sostuvo con una fundación educativa, cursos y ecotecnologías, y aun así entró en crisis y se reestructuró en 2023.'},
 {t:'Kennedy: lo que falta demostrar',s:'Ningún mecanismo funcionó solo por voluntad.',n:'La lección para Kennedy: ningún mecanismo funcionó solo por voluntad. Ambos dependieron del suelo y de ingresos propios. Aquí el suelo de la central es de Corabastos, así que nuestra propuesta todavía tiene que demostrar de dónde saca esas condiciones.'}],
/* 8 · red completa */ [
 {t:'La red de actores de Kennedy',s:'Personas, cargos, entidades, organizaciones e instrumentos.',n:'Ahora la red de interacciones. Es la misma red de nuestro diagnóstico: personas, cargos, entidades, organizaciones e instrumentos como los camiones, cada uno con su color de clúster y sus relaciones comerciales, laborales, de servicio, de reciclaje, de gobierno y de participación.',
  tags:[['A01','Corabastos','centro del abastecimiento',O],['A34','Alcaldía Local','contrata la inversión local',O]]}],
/* 9 · influencia hoy */ [
 {t:'La firma no es el poder',s:'Separamos la atribución formal de la influencia efectiva.',n:'Sobre esa red separamos dos cosas: la atribución formal, en gris punteado, y la influencia efectiva, en rojo grueso. La firma no es el poder.'},
 {t:'Quién puede detener los flujos',s:'Las llaves están en entidades y en la asamblea de Corabastos.',n:'Las llaves marcan quién puede detener un flujo. Hoy todas están en entidades o en la asamblea de Corabastos: la Alcaldía puede retrasar lo votado, el Acueducto fija el calendario de obras y la asamblea decide sobre la central desde fuera.',
  tags:[['A02','Llave','decide sobre la central',R],['A34','Llave','formula y contrata',R],['N06','Llave','calendario de obras',R]]},
 {t:'Afectados sin voz',s:'Reciben conflictos y costos sin un canal vinculante.',n:'Y aparecen los afectados sin voz: los vecinos de La Vaca, que reciben efluentes y olores; y los vendedores ambulantes y recicladores de calle, sobre quienes caen los operativos. Ninguno tiene una relación que llegue a una instancia de decisión.',
  tags:[['A37','Sin voz','efluentes y olores',R],['A55','Sin voz','operativos de espacio público',R]]}],
/* 10 · propuesta */ [
 {t:'La propuesta en la misma red',s:'Los actores nuevos aparecen con borde punteado.',n:'Esta es la propuesta sobre la misma red. Los actores nuevos tienen borde punteado: la Mesa Ecosocial, los núcleos de orgánicos y de agua, las vocerías revocables, la guardianía, el fondo común y la planta de compostaje.',
  tags:[['MESA','Mesa Ecosocial','ordena la agenda, no decide',O]]},
 {t:'Quien trabaja encabeza',s:'Recicladores en orgánicos, colectivos en agua.',n:'En el núcleo de orgánicos la influencia efectiva la tienen las organizaciones de recicladores; en el de agua, los colectivos ambientales. Las vocerías solo llevan mandatos y el núcleo puede revocarlos.',
  tags:[['NRES','Núcleo de orgánicos','encabezan los recicladores','#8EBF4C'],['VOC','Vocerías','mandato revocable',O]]},
 {t:'Las llaves que siguen afuera',s:'Permiso, suelo y contrato no dependen de la mesa.',n:'Pero hay que decirlo: algunas llaves siguen afuera. El permiso ambiental de la Secretaría de Ambiente, el suelo de Corabastos y la contratación de la Alcaldía. La propuesta depende de que esos actores acepten, y eso no está garantizado.',
  tags:[['A33','Llave externa','permiso ambiental',R],['A02','Llave externa','suelo de la central',R]]}],
/* 11 · lectura crítica */ [
 {t:'Lo que cambia en la red',s:'Influencia colectiva, llaves y afectados sin voz.',n:'Si medimos: la influencia efectiva en manos colectivas pasa de 0 a 57 por ciento; las llaves en manos colectivas, de 0 a 38; y los afectados sin voz, de 3 a 0. Pero el tamaño de un nodo no es una explicación política: lo que importa es quién controla el suelo, el dinero y el permiso.'}],
/* 12 · trayecto hoy */ [
 {t:'Hoy: decide quien no trabaja',s:'Orgánicos y efluentes de Corabastos que llegan a La Vaca.',n:'Seguimos una decisión concreta: qué hacer con los orgánicos y efluentes de Corabastos que llegan a La Vaca. Hoy la agenda la ponen las entidades, la deliberación la hacen técnicos, resuelve la asamblea de accionistas por mayoría accionaria, ejecutan Ciudad Limpia, coteros y recicladores, y los afectados no pueden corregir.',
  tags:[['st2','Resolución','fuera de Kennedy',R],['st4','Rectificación','solo sanciones',R]]}],
/* 13 · trayecto propuesta */ [
 {t:'Propuesta: el trayecto completo',s:'Cada etapa con su regla.',n:'En la propuesta, cualquier junta, colectivo u organización pone el tema en agenda con un acta. Delibera el núcleo de orgánicos con la guardianía; resuelve por consentimiento, con la llave ecológica; ejecutan los recicladores con pago por tonelada; y la guardianía mide para que un tercio pueda pedir revisión. Rectificar reabre el ciclo.',
  tags:[['st0','Agenda','basta un acta',O],['st2','Resolución','consentimiento',O]]}],
/* 14 · decidir no es hacer */ [
 {t:'Hoy: quien decide traslada el trabajo',s:'Decide la asamblea; ejecutan coteros y recicladores.',n:'La guía pregunta si quien decide traslada costos a quien ejecuta. Hoy sí: decide la asamblea y la gerencia, y el trabajo lo hacen coteros y recicladores sin participar.'},
 {t:'Propuesta: quien ejecuta delibera',s:'Pero el suelo, el permiso y el contrato siguen afuera.',n:'En la propuesta, quien ejecuta está dentro del núcleo que decide. Aun así, la entidad externa sigue controlando el suelo, el permiso y el contrato: ahí está la dependencia que la propuesta no resuelve sola.'}],
/* 15 · escalas */ [
 {t:'Las escalas de la decisión',s:'De la nación y la ciudad a la localidad y la central.',n:'En escalas: hoy casi todo se decide en la ciudad o en la nación. La propuesta baja las etapas a la localidad y a la central, pero conecta con la ciudad mediante las vocerías.'}],
/* 16 · Vensim */ [
 {t:'Nuestro modelo dinámico en Vensim',s:'Cajas son niveles, válvulas son flujos y flechas azules son influencias con signo.',n:'Pasamos al modelo dinámico. Este es nuestro modelo en Vensim. Las cajas son niveles, actores que acumulan; las válvulas son flujos; y las flechas azules son influencias con signo positivo o negativo.'},
 {t:'Abastecimiento y Corabastos',s:'El flujo de alimentos de productores a hogares.',n:'El primer subsistema es el abastecimiento: los productores alimentan a los mayoristas, los camiones y los coteros mueven la carga, y los compradores de tiendas y restaurantes la llevan hacia los hogares.',tags:[['1','Corabastos S. A.','nivel central',R]]},
 {t:'Residuos y reciclaje',s:'Los recicladores y el operador reducen el nivel.',n:'En residuos, comercios y hogares generan, y recicladores, el operador de aseo, la UAESP y Ambiente reducen ese nivel: por eso sus flechas tienen signo negativo.',tags:[['9','Comercios que generan residuos','el nivel que baja',R]]},
 {t:'Educación',s:'Ingreso y egreso de estudiantes.',n:'En educación, el nivel son los colegios, con ingreso y egreso de estudiantes, sostenidos por rectores, docentes y familias.'},
 {t:'Salud',s:'Demanda de atención primaria.',n:'En salud, la demanda de atención primaria entra a la Subred y la atiende el personal de salud.'},
 {t:'Transporte público',s:'Operadores ponen buses; usuarios los ocupan.',n:'En transporte, TransMilenio y los operadores ponen buses y los usuarios los ocupan, con signo negativo sobre la capacidad disponible.'},
 {t:'Gobierno local',s:'Solicitudes que llegan a la Alcaldía.',n:'Y en gobierno local, residentes, juntas y presidentes de JAC llevan solicitudes a la Alcaldía. Es el único canal de participación del modelo actual, y no es vinculante.',tags:[['12','Alcaldía Local','recibe, no está obligada',R]]}],
/* 17 · bucles */ [
 {t:'Los bucles de la organización',s:'R reproduce la organización; B la frena o la transforma.',n:'El modelo de Vensim muestra influencias, pero la guía pide bucles. Estos son los bucles de la organización propuesta, con el mismo lenguaje.'},
 {t:'R1: la confianza que se reproduce',s:'Participación, trabajo, acuerdos cumplidos y confianza.',n:'R1 reproduce la organización: más participación da más trabajo colectivo, más acuerdos cumplidos y, con retardo, más confianza fundada, que atrae más participación.'},
 {t:'B1: el desgaste que frena',s:'Si el trabajo crece sin reparto, la gente se va.',n:'B1 lo frena: si el trabajo crece sin repartirse, sube la carga por persona y, con retardo, el desgaste saca gente de los núcleos.'},
 {t:'B2: la rotación que transforma',s:'Una regla que cambia la distribución del trabajo.',n:'B2 transforma la regla: cuando el desgaste se nota, se activa la rotación, que reparte la carga.'},
 {t:'R2: la circularidad que da autonomía',s:'Fondo propio, menos dependencia.',n:'R2 cambia la distribución de recursos: aprovechar orgánicos alimenta el fondo común, baja la dependencia del contrato externo y sostiene el cumplimiento de los acuerdos.'},
 {t:'B3: la técnica que concentra',s:'Una contradicción interna del propio éxito.',n:'Y B3 es una contradicción interna: operar una planta exige conocimiento técnico que tiende a concentrarse, y eso aleja a quienes trabajan. La rotación de quién prepara las opciones lo contrarresta.'}],
/* 18 · prueba en el tiempo */ [
 {t:'Estado inicial, decisión y perturbación',s:'Una secuencia situada en el diagnóstico.',n:'Para probar el modelo en el tiempo: en el mes cero, los orgánicos van mezclados al relleno y los efluentes al humedal. Entre el mes uno y el seis, el núcleo aprueba separar en un pabellón piloto. En el mes 18 llega una perturbación: se retrasa la inversión local.'},
 {t:'Dos trayectorias',s:'Ilustrativo: muestra la lógica de los bucles, no predice.',n:'Con rotación y fondo propio, la participación se sostiene y la carga sobre La Vaca sigue bajando. Sin rotación ni fondo, el desgaste vacía el núcleo y la carga vuelve a subir. Es una ilustración de los bucles, no una predicción.'}],
/* 19 · tensiones */ [
 {t:'Cuatro tensiones, hoy',s:'Hoy la balanza se inclina hacia el problema.',n:'Las contradicciones también se modelan. Cuatro tensiones: decisión colectiva frente a agenda técnica; autonomía frente a dependencia externa; continuidad frente a desgaste; beneficios para unos frente a costos para otros. Hoy todas se inclinan hacia el problema.'},
 {t:'Cuatro tensiones, con la propuesta',s:'Se equilibran, pero no desaparecen.',n:'Con la propuesta se equilibran, pero no desaparecen: el permiso, el suelo y el contrato siguen siendo externos.'}],
/* 20 · contradicción */ [
 {t:'Pagar por tonelada puede desplazar el costo',s:'El riesgo: que pierdan los recicladores independientes.',n:'Tomamos una contradicción de nuestro propio modelo: pagar por tonelada premia a quien separa mucho. Los recicladores independientes pueden perder el material que hoy recuperan, y los puestos pequeños pagar una separación que no pueden costear. El costo se desplaza.'},
 {t:'Transformarla, no desplazarla',s:'Cuota, tarifa progresiva y registro de independientes.',n:'Para transformarla: cuota en el núcleo para independientes y puestos pequeños, tarifa progresiva donde paga más quien genera más, y registro de independientes como proveedores. Sabremos que se transformó si suben a la vez las toneladas aprovechadas y el ingreso de los independientes.'}],
/* 21 · sostenibilidad */ [
 {t:'Escenario de continuidad',s:'Supuesto: la Alcaldía coopera y el fondo cubre la mitad.',n:'Sobre sostenibilidad, dos escenarios. Continuidad: si la Alcaldía coopera y el fondo cubre la mitad de la operación, la organización sigue aunque cambien las personas.'},
 {t:'Escenario de transformación',s:'Supuesto: Corabastos retira el espacio de la planta.',n:'Transformación: si la asamblea de Corabastos retira el espacio, el núcleo lleva el compostaje a las huertas barriales y cambia la regla.'},
 {t:'Autoorganización',s:'Acuerdos que no dependen de una orden única.',n:'Hay autoorganización en lo cotidiano: turnos, entregas y calidad del compost se ajustan entre quienes trabajan. Su límite es que el suelo, el permiso y el presupuesto siguen afuera.'},
 {t:'Quién representa al humedal',s:'Personas identificables, con datos públicos.',n:'Y el humedal lo representan los colectivos y el aula ambiental, con datos públicos, mediante la llave ecológica.'}],
/* 22 · mapa */ [
 {t:'El efecto sobre un problema',s:'Del humedal y el relleno a las huertas.',n:'Llevamos todo al territorio. El problema: los orgánicos y efluentes de Corabastos llegan a La Vaca. Si el núcleo funciona, ese material vuelve como compost a las huertas registradas por el Jardín Botánico; en el mapa, las treinta más cercanas a la central.'}],
/* 23 · efectos */ [
 {t:'Efecto en cada enfoque',s:'Lo que cambiaría en los siete macromodelos ecológicos.',n:'Y vuelve a los siete macromodelos: menos carga sobre el humedal, ciclo de orgánicos cerrado con las huertas, custodia convertida en decisión, trabajo pagado y un límite ecológico con capacidad de detener decisiones.'}],
/* 24 · fuentes */ [
 {t:'Datos separados de hipótesis',s:'Documentadas, hipótesis y decisiones de diseño.',n:'Separamos datos de hipótesis. Veinte relaciones están documentadas con fuente; el resto son hipótesis por verificar o decisiones de diseño del grupo, y así las presentamos.'}],
/* 25 · falta verificar */ [
 {t:'Lo que falta verificar',s:'Lo que haremos antes de afirmarlo como hecho.',n:'Para cerrar, lo que falta verificar: cuántas toneladas genera la central, la calidad del agua de La Vaca, si la Alcaldía cooperaría, el suelo y el permiso para la planta, y cuántos recicladores independientes trabajan en el entorno. La heterarquía es nuestra apuesta, y estas son las condiciones que tendría que demostrar.'}]
];
function MUTE(){return '#9A958C'}
