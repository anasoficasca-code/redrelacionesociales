// Guion del Corte III recorrido sobre la red principal (Red libre, Clústeres, Anillos y Territorio 3D).
(function(){
const BL=[['Apertura','0:00–1:20'],['Cómo se conectan las relaciones sociales','1:20–2:30'],['Cómo se organizan y se relacionan los grupos sociales','2:30–6:55'],['La propuesta: heterarquía y gobernanza policéntrica','7:50–9:40'],['Cómo se tomaría una decisión','9:40–11:00'],['El modelo dinámico-causal','11:00–12:40'],['Tensiones y límites de la propuesta','12:40–13:40'],['Cierre','13:40–15:00']];
const ABAST=['A06','A07','A08','A09','A10','A11','LOG01','A13','A14','A15','A16','A17','A18','A20','A01'];
const RESID=['A23','A24','A26','A27','A56','A25','A57','A28','A29','A31','RES01','A32'];
const S=[
 // I · Apertura
 {b:0,v:'free',t:'La red de actores de Kennedy',s:'',n:''},
 {b:0,v:'free',nodes:['A06','A13','A11','LOG01','A15'],t:'Una actividad cotidiana conecta a muchos actores',s:'La llegada de alimentos a una tienda.',n:'En Kennedy, una actividad cotidiana puede conectar a muchos actores. La llegada de alimentos a una tienda relaciona a comerciantes mayoristas, coteros, transportadores y tenderos.'},
 {b:0,v:'free',nodes:['AMB04','C01','AMB03','A33','AMB01','AMB02'],t:'Una jornada ambiental',s:'Colectivos, colegios, la Comisión Ambiental Local y entidades públicas.',n:'Una jornada ambiental puede vincular colectivos comunitarios, colegios, la Comisión Ambiental Local y entidades públicas.'},
 {b:0,v:'free',nodes:['A35','A36','A37','A34','N01'],t:'Una solicitud barrial',s:'Una junta de acción comunal y las instancias que deben responderla.',n:'Y una solicitud barrial conecta a una junta de acción comunal con las instancias que deben responderla.'},
 {b:0,v:'free',t:'¿Cómo coordinar sin un único centro de decisión?',s:'Productos, dinero, información, trabajo y solicitudes.',n:'Por estas relaciones circulan productos, dinero, información, trabajo y solicitudes. Los actores cumplen funciones distintas y no tienen la misma capacidad para influir en las decisiones. De ahí surge la pregunta que guía el proyecto: ¿cómo podemos coordinar las decisiones, los recursos y el trabajo del territorio sin que toda la capacidad de influir dependa de un único centro de decisión?'},
 {b:0,v:'clusters',t:'Leer las relaciones y proponer',s:'Una organización heterárquica y distribuida, con varios centros de decisión.',n:'Para responder, primero leemos las relaciones actuales y después proponemos una organización heterárquica y distribuida, coordinada mediante varios centros de decisión.'},
 // II · Cómo se conectan las relaciones sociales
 {b:1,v:'free',nodes:['A06','A10','A11','LOG01','A13','A15','A17'],t:'El abastecimiento de alimentos',s:'Productos y dinero, pero también acuerdos sobre horarios, entregas y trabajo.',n:'En Kennedy, las actividades cotidianas dependen de relaciones que conectan distintos sectores del territorio. El abastecimiento de alimentos, por ejemplo, vincula a los comerciantes mayoristas con los transportadores, los trabajadores de cargue y descargue, las tiendas y los restaurantes. En este recorrido no solo circulan productos y dinero; también se necesitan acuerdos sobre horarios, entregas y condiciones de trabajo.'},
 {b:1,v:'free',nodes:['A23','A24','A26','A27','A56','A57'],t:'Los residuos',s:'Se generan, se recuperan y vuelven a circular.',n:'Algo similar ocurre con los residuos: los hogares y los comercios los generan, los recicladores recuperan parte de los materiales y las bodegas y los compradores permiten que vuelvan a circular.'},
 {b:1,v:'free',nodes:['AMB04','COM_HUE','A37','A35','AMB02'],t:'Organizaciones comunitarias y procesos ambientales',s:'Actividades compartidas y acuerdos entre vecinos.',n:'Al mismo tiempo, las organizaciones comunitarias y los procesos ambientales generan otras formas de relación mediante actividades compartidas y acuerdos entre vecinos.'},
 {b:1,v:'clusters',t:'Dinámicas que se relacionan entre sí',s:'Qué dependencias generan y cómo se coordinan.',n:'Estas dinámicas se relacionan entre sí. Las decisiones sobre transporte, comercio o recolección pueden cambiar las condiciones de trabajo de otros actores. Por eso, para entender cómo se organiza Kennedy, es necesario observar cómo surgen estas relaciones, qué dependencias generan y cómo se coordinan las actividades que sostienen la vida cotidiana.'},
 // III · Cómo se organizan y se relacionan los grupos sociales
 {b:2,v:'free',nodes:['A34','N01','N02','A35','A37'],t:'Instituciones y organizaciones comunales',s:'Funciones diferentes en un mismo proceso.',n:'Una parte de estas relaciones se desarrolla a través de las instituciones y las organizaciones comunales. La Alcaldía Local, la Junta Administradora Local, el IDPAC y las juntas de acción comunal tienen funciones diferentes, pero pueden intervenir en un mismo proceso. Cuando una comunidad identifica una necesidad, sus integrantes pueden reunirse, discutir el problema y organizar una solicitud.'},
 {b:2,v:'free',nodes:['A37','A35','A36','A34','N01'],t:'De la necesidad a la decisión institucional',s:'Llevar la solicitud, evaluar la respuesta y hacer seguimiento.',n:'Las juntas y sus representantes pueden llevar esa necesidad a las instancias correspondientes, mientras que las entidades evalúan qué respuesta pueden ofrecer según sus competencias y recursos. La relación continúa cuando la comunidad hace seguimiento, exige respuestas o busca otras formas de resolver el problema. Así, la organización comunitaria no consiste solamente en representar a los vecinos, sino también en mantener una relación entre sus necesidades y las decisiones institucionales.'},
 {b:2,ov:['mapa',0],t:'Dónde están las juntas de acción comunal',s:'188 juntas en el plano de Kennedy.',n:''},
 {b:2,v:'free',nodes:['A37','AMB04','COM_HUE','COM_BIB','COM_ACU','INF03'],t:'Iniciativas que comienzan fuera de los procedimientos',s:'Los participantes acuerdan, se reparten tareas y sostienen una actividad común.',n:'Sin embargo, muchas iniciativas sociales comienzan fuera de esos procedimientos. Los vecinos, colectivos y organizaciones también se reúnen porque comparten una necesidad o quieren desarrollar una actividad en su entorno. En esos casos, la organización surge de los propios participantes: acuerdan cómo actuar, distribuyen responsabilidades y mantienen una actividad común. Algunos procesos permanecen autónomos; otros establecen vínculos con instituciones cuando necesitan acompañamiento, reconocimiento o recursos.'},
 {b:2,v:'free',nodes:['COM_HUE','A37','AMB01','AMB04'],t:'Las huertas comunitarias',s:'La comunidad sostiene la actividad; el acompañamiento externo la fortalece.',n:'Las huertas urbanas y comunitarias permiten entender esta forma de organización. En Kennedy existen iniciativas impulsadas por comunidades que, con distintos grados de apoyo externo, han logrado mantener actividades colectivas. Un ejemplo es la huerta comunitaria del Hospital Pediátrico Tintal, donde vecinas del sector participan en su mantenimiento y han recibido acompañamiento técnico del Jardín Botánico. Aquí se relacionan la iniciativa de la comunidad, el conocimiento técnico y el apoyo institucional, pero cada actor cumple una función diferente. La comunidad sostiene la actividad cotidiana, mientras que el acompañamiento externo puede contribuir a fortalecerla.'},
 {b:2,ov:['mapa',1],t:'Dónde están las huertas',s:'811 huertas urbanas y comunitarias registradas.',n:''},
 {b:2,v:'free',nodes:['AMB01','AMB02','AMB04','C01','A53','AMB03'],t:'La educación ambiental',s:'Relaciones que pueden surgir de la comunidad y luego conectarse.',n:'Algo parecido ocurre con procesos de educación ambiental, como los vinculados al Aula Ambiental Tingua Azul y a iniciativas comunitarias que trabajan con colegios y organizaciones locales. Estas experiencias pueden generar relaciones entre quienes promueven actividades educativas, las instituciones que facilitan su desarrollo y las comunidades que participan. A través de ellas circulan conocimientos y se construyen acuerdos sobre cómo actuar en el territorio. Lo importante es que estas relaciones no siempre parten de una instrucción institucional: también pueden surgir de una iniciativa comunitaria que posteriormente se conecta con otras organizaciones.'},
 {b:2,v:'free',nodes:['COM_HUE','AMB04','A37','AMB01','AMB02'],t:'Capacidad de organizarse',s:'Pero hacen falta recursos y acompañamiento para sostenerla.',n:'Estas experiencias muestran que la comunidad tiene capacidad de organizarse y desarrollar iniciativas propias, pero necesita recursos y acompañamiento para sostenerlas en el tiempo.'},
 {b:2,v:'free',nodes:['C01','A41','A43','A53','A42','COM_HUE'],t:'Una red de huertas escolares',s:'Estudiantes, docentes y comunidad en los colegios de Kennedy.',n:'Por eso, vamos a implementar una red de huertas escolares en Kennedy, aprovechando espacios disponibles dentro de los colegios. Cada huerta contará con la participación de estudiantes, docentes y comunidad, quienes se encargarán de organizar jornadas de siembra, compostaje, riego y mantenimiento.'},
 {b:2,ov:['mapa',2],t:'Dónde irían las huertas escolares',s:'Los 79 colegios oficiales de Kennedy.',n:''},
 {b:2,v:'free',nodes:['C01','A43','A53','AMB02','A24','A23','COM_HUE','A34'],t:'Acompañamiento, compost y seguimiento',s:'Responsables, cronogramas y mecanismos de seguimiento.',n:'Además, vamos a gestionar acompañamiento técnico con el Jardín Botánico de Bogotá y promover el aprovechamiento de residuos orgánicos para producir abono. Estableceremos responsables, cronogramas y mecanismos de seguimiento para que las huertas funcionen de manera continua y se conviertan en espacios de aprendizaje, producción de alimentos y organización comunitaria.'},
 {b:2,v:'free',nodes:['A06','A07','A13','A11','A10','A14','A04','A15','A17','LOG01'],t:'Corabastos y la distribución de alimentos',s:'No todos controlan los mismos recursos ni negocian en las mismas condiciones.',n:'Otra dinámica se desarrolla alrededor de Corabastos y la distribución de alimentos. La actividad comercial depende de una cadena de trabajo en la que intervienen comerciantes mayoristas, coteros, conductores, transportadores y compradores. Cada uno cumple una función necesaria para que los productos lleguen a las tiendas y los restaurantes. Los comerciantes dependen de que los productos lleguen a tiempo; los transportadores necesitan coordinar las entregas, y los trabajadores de cargue y descargue dependen de las condiciones en las que se organiza la operación. Aunque estas relaciones se apoyan en acuerdos comerciales y laborales, no todos los participantes controlan los mismos recursos ni pueden negociar en las mismas condiciones. Una modificación en los horarios o en la operación puede afectar a varios actores, incluso a quienes no participaron en la decisión que produjo el cambio.'},
 {b:2,ov:['mapa',3],t:'Dónde está el abastecimiento',s:'Corabastos y las plazas de mercado.',n:''},
 {b:2,v:'free',nodes:['A23','A27','A56','A57','A28','A31','RES01'],t:'Comercio y recuperación de residuos',s:'Cooperación, dependencia y también conflictos de intereses.',n:'También hay relaciones entre estas actividades económicas y la recuperación de residuos. Los establecimientos comerciales generan materiales que pueden ser aprovechados, mientras que los recicladores independientes los recolectan y los llevan a bodegas o compradores especializados. Su trabajo conecta la actividad comercial con la recuperación de materiales, pero depende de las condiciones de entrega, los recorridos y las posibilidades de comercialización. Al mismo tiempo, los operadores de aseo cumplen funciones relacionadas con la recolección de residuos. Cuando las actividades no se coordinan adecuadamente, pueden surgir dificultades entre quienes recuperan los materiales y quienes prestan el servicio de aseo. Esto muestra que una misma dinámica puede involucrar cooperación, dependencia y también conflictos de intereses.'},
 {b:2,ov:['jerarquia',0],t:'Participar no es lo mismo que poder modificar',s:'Competencias legales, coordinación, recursos y trabajo cotidiano.',n:'Al relacionar estas formas de organización, aparece una diferencia importante entre quienes participan en una actividad y quienes pueden modificar las condiciones en las que se realiza. Las instituciones conservan competencias legales y administrativas; algunas organizaciones canalizan necesidades y coordinan acciones; las empresas controlan recursos y operaciones, y muchos trabajadores sostienen el funcionamiento cotidiano. También existen iniciativas comunitarias que logran organizarse por cuenta propia, aunque pueden necesitar apoyo para continuar o ampliar su alcance.'},
 {b:2,v:'clusters',nodes:['A34','A35','COM_HUE','AMB04','A27','A13','A28','A04'],t:'De la situación actual a la propuesta',s:'Reconocer la capacidad de organización que ya existe.',n:'Por eso, la situación actual combina relaciones formales e informales, formas de coordinación institucional y procesos de autoorganización comunitaria. La dificultad aparece cuando quienes conocen un problema o sostienen una actividad no pueden intervenir suficientemente en las decisiones, o cuando los recursos y las responsabilidades quedan distribuidos de manera desigual. A partir de esta situación surge nuestra propuesta de una gobernanza heterárquica y policéntrica, que busca reconocer la capacidad de organización que ya existe y mejorar la coordinación entre los actores, sin hacer que todas las decisiones dependan de una misma instancia.'},
 // V · La propuesta
 {b:3,ov:['heterarquia2',0],t:'Heterarquía',s:'La capacidad de influir varía según el asunto.',n:'Proponemos una organización política heterárquica y distribuida. La capacidad de influir puede variar según el asunto, la función, el conocimiento y los recursos de cada actor, en lugar de quedar fijada siempre en la misma jerarquía. Esto no elimina las instituciones ni significa que todos decidan sobre todo. Busca que quienes conocen y realizan una actividad puedan influir en las decisiones relacionadas con ella.'},
 {b:3,ov:['policentro',0],t:'Gobernanza policéntrica',s:'Varios centros de decisión con responsabilidades propias.',n:'La gobernanza policéntrica complementa esa idea al coordinar varios centros de decisión con responsabilidades propias. Una organización puede resolver sus asuntos internos; colegios y procesos ambientales pueden coordinar una actividad educativa; y las decisiones legales de una entidad pública o de los órganos de Corabastos permanecen en esas instancias.'},
 {b:3,ov:['policentro',1],t:'Cuando una decisión afecta a varios',s:'Compartir información, acordar responsabilidades y revisar resultados.',n:'Si una decisión afecta a varios actores, deben compartir información, acordar responsabilidades y revisar resultados.'},
 {b:3,ov:['ambitos',0],t:'Cuatro ámbitos, no escalones de mando',s:'Cotidiano, por asunto, local y distrital.',n:'La propuesta conecta cuatro ámbitos, no escalones de mando. Primero, la coordinación cotidiana de trabajadores, comerciantes, recicladores, docentes y operadores. Segundo, espacios por asunto, como educación ambiental, abastecimiento o residuos. Tercero, la coordinación local entre juntas comunales, ASOJUNTAS, la Comisión Ambiental Local, la Alcaldía y la JAL, según corresponda. Cuarto, las entidades distritales y los órganos societarios que conservan sus competencias legales.'},
 {b:3,ov:['mandato',0],t:'Responsables, límites y seguimiento',s:'Mandato, cogestión y coaprendizaje.',n:'Para que funcione, cada acuerdo necesita responsables, límites y seguimiento. Quien representa a una organización informa lo acordado y consulta de nuevo si el asunto excede su mandato. La cogestión comparte tareas sin borrar responsabilidades; el coaprendizaje permite revisar resultados y ajustar reglas.'},
 // VI · Decisión
 {b:4,v:'free',nodes:['AMB02','AMB04','A23','A26','A27','A43','A28'],t:'Un caso: materiales mal separados',s:'Registrar el problema y reunir información.',n:'Imaginemos que un proceso comunitario de educación ambiental detecta que varios comercios mezclan los materiales aprovechables o no los entregan adecuadamente. Primero se registra el problema y se reúne información de comercios, recicladores, docentes y operadores de aseo.'},
 {b:4,v:'free',nodes:['A23','A26','A27','AMB02','A28','A31','A32','A33'],t:'Comparar alternativas',s:'Cada actor aporta lo que conoce; se consulta a las entidades.',n:'Después se comparan alternativas. Los comercios explican sus horarios; los recicladores aportan su conocimiento de materiales y recorridos; los equipos educativos proponen formas de comunicación; y los operadores aclaran cómo funciona la recolección. También se consulta a las entidades competentes.'},
 {b:4,v:'concentric',nodes:['A23','A26','A27','AMB02','A28','A32','A34','FDL'],t:'Acordar, ejecutar y revisar',s:'Responsables, recursos y plazos; si no funciona, se ajusta.',n:'Luego se define qué pueden acordar los participantes y qué requiere autorización o recursos institucionales. El acuerdo registra responsables, recursos y plazos. Después se revisa si mejoró la separación, si el material se entregó y si el trabajo quedó bien distribuido. Si no funciona, se ajusta. Así, las relaciones producen una decisión concreta y revisable.'},
 // VII · Modelo dinámico-causal
 {b:5,ov:['vensim2',0],t:'Del quién al por qué',s:'Información, acuerdos cumplidos, participación, tareas y confianza.',n:'La red muestra quién se relaciona con quién; el modelo dinámico-causal explica por qué esas relaciones se sostienen o cambian. Algunas variables son el acceso a la información, los acuerdos cumplidos, la participación, la distribución de tareas y la confianza basada en resultados.'},
 {b:5,ov:['vensim2',1],t:'Un ciclo que fortalece',s:'Siempre que produzca resultados verificables.',n:'Un ciclo puede fortalecer la organización: la información a tiempo facilita coordinar tareas; los acuerdos cumplidos generan confianza; y la confianza puede atraer participación y nueva información. Así se facilitan más acuerdos, siempre que produzcan resultados verificables.'},
 {b:5,ov:['vensim2',2],t:'Un ciclo que debilita',s:'La carga se concentra en quienes permanecen.',n:'También puede ocurrir lo contrario. Si las mismas personas convocan, hacen seguimiento y gestionan recursos, su carga aumenta. Se retrasan las tareas, baja el cumplimiento y disminuye la confianza. Algunas personas pueden retirarse y concentrar más trabajo en quienes permanecen.'},
 {b:5,ov:['vensim2',3],t:'Repartir y rotar',s:'Respuestas posibles que habría que evaluar.',n:'Repartir responsabilidades y rotar tareas son posibles respuestas que habría que evaluar.'},
 {b:5,ov:['vensim2',4],t:'Material aprovechable sin recuperar',s:'Una hipótesis que requiere datos.',n:'En residuos podemos observar la cantidad de material aprovechable que queda sin recuperar: aumenta cuando no se separa ni recoge y disminuye cuando se recupera y entrega. La coordinación entre hogares, comercios, recicladores y operadores puede influir en el resultado. Es una hipótesis que requiere datos.'},
 // VIII · Tensiones
 {b:6,v:'free',nodes:['A57','FDL','A32','A33','A10','INF02'],incident:true,t:'La influencia puede concentrarse',s:'Información, dinero, autorizaciones o medios para actuar.',n:'Una organización distribuida aún puede concentrar influencia. Un actor puede controlar información, dinero, autorizaciones o medios para actuar. También puede haber acuerdos sin recursos suficientes o tareas comunitarias que siempre recaen en las mismas personas.'},
 {b:6,v:'free',nodes:['A27','A56','A58','A55','A37'],incident:true,t:'Desacuerdos y afectados sin representación',s:'Que los costos no recaigan siempre en quienes menos pueden influir.',n:'Una organización tampoco tiene una sola posición: pueden existir desacuerdos internos y actores afectados sin representación. Se necesitan acuerdos claros, información accesible, recursos definidos y formas de revisar decisiones. No se trata de eliminar el conflicto, sino de evitar que sus costos recaigan siempre en quienes menos pueden influir.'},
 // IX · Cierre
 {b:7,v:'clusters',t:'Actividades que dependen unas de otras',s:'Gobierno, comunidad, ambiente, educación, salud, comercio, transporte y residuos.',n:'La red de Kennedy conecta gobierno local, organizaciones comunales, procesos ambientales y educativos, salud, comercio, abastecimiento, logística, transporte público y residuos. Sus actores cumplen funciones distintas, pero sus actividades dependen unas de otras.'},
 {b:7,v:'concentric',t:'Distribuir, coordinar y entender',s:'Heterarquía, gobernanza policéntrica y modelo dinámico-causal.',n:'La heterarquía distribuye la influencia; la gobernanza policéntrica coordina decisiones entre distintos ámbitos sin borrar responsabilidades. El modelo dinámico-causal ayuda a entender qué condiciones hacen que esta organización se sostenga o cambie.'},
 {b:7,v:'free',t:'Transformar las relaciones',s:'No es solo agregar nodos al diagrama.',n:'Transformar las relaciones sociales no es solo agregar nodos al diagrama. Es mejorar la circulación de información, reconocer el trabajo, repartir responsabilidades y revisar acuerdos. Así, la red permite entender cómo se organiza Kennedy y qué cambios harían posible una organización más distribuida.'}
];

const G={on:false,i:0};
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const esc2=s=>String(s??'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const css=document.createElement('style');css.textContent=`
#guiaDock{display:none;border-bottom:1px solid var(--line,#232736);padding:10px 20px 10px;gap:18px;align-items:center;background:linear-gradient(180deg,rgba(255,255,255,.02),transparent)}
body.guia-on #guiaDock{display:flex}
#guiaDock .gk{font:600 11px 'JetBrains Mono',ui-monospace,monospace;letter-spacing:.08em;color:#F2B53A;text-transform:uppercase}
#guiaDock h2{margin:3px 0 0;font:700 20px 'Instrument Sans',system-ui,sans-serif;letter-spacing:-.015em;color:#fff;animation:grise .5s both}
#guiaDock p{margin:2px 0 0;font:400 13px 'Instrument Sans',system-ui,sans-serif;color:#aab3c5;animation:grise .5s .1s both}
#guiaDock .gtxt{flex:1;min-width:0}
#guiaDock .gnav{display:flex;align-items:center;gap:8px;flex:none}
#guiaDock button{border:1px solid #2b3142;background:none;color:#cbd2df;border-radius:8px;padding:7px 12px;font:600 12.5px 'Instrument Sans',system-ui,sans-serif;cursor:pointer}
#guiaDock button.pri{background:#F3F0EA;color:#111;border-color:#F3F0EA}
#guiaDock .gc{font:500 12px 'JetBrains Mono',monospace;color:#8b93a6;min-width:52px;text-align:center}
#guiaProg{display:none;height:3px;background:#1b2030}#guiaProg i{display:block;height:100%;background:#F2B53A;width:0;transition:width .4s}
body.guia-on #guiaProg{display:block}
#guiaOverlay{position:absolute;inset:0;border:0;width:100%;height:100%;display:none;z-index:60;background:#0d0e10}
body.guia-on.guia-ov #guiaOverlay{display:block}
body.modo-corte3 #controlStrip{display:none!important}
#guiaDock p:empty{display:none}
@keyframes grise{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@media (max-width:760px){#guiaDock{flex-direction:column;align-items:stretch;padding:10px 12px;gap:10px}#guiaDock h2{font-size:17px}#guiaDock .gnav{justify-content:space-between;flex-wrap:wrap;row-gap:6px}}
@media (prefers-reduced-motion:reduce){#guiaDock h2,#guiaDock p{animation:none}}`;
document.head.appendChild(css);
const dock=document.createElement('div');dock.id='guiaDock';dock.innerHTML=`<div class="gtxt"><div class="gk" id="gK"></div><h2 id="gT"></h2><p id="gS"></p></div><div class="gnav"><button id="gPrev" title="Paso anterior (Flecha Izquierda)">Anterior</button><span class="gc" id="gC"></span><button class="pri" id="gNext" title="Siguiente paso (Flecha Derecha)">Siguiente</button><button id="gExit">Salir</button></div>`;
const prog=document.createElement('div');prog.id='guiaProg';prog.innerHTML='<i id="gBar"></i>';
const stageEl=document.getElementById('stage');stageEl.parentNode.insertBefore(dock,stageEl);stageEl.parentNode.insertBefore(prog,stageEl);
const ov=document.createElement('iframe');ov.id='guiaOverlay';ov.title='Diagramas del Corte III';stageEl.appendChild(ov);let ovReady=false,ovPend=null;
ov.addEventListener('load',()=>{ovReady=true;if(ovPend){ov.contentWindow.postMessage(ovPend,'*');ovPend=null}});
function showOverlay(o){document.body.classList.add('guia-ov');const msg={guia:1,key:o[0],sub:o[1]};
 if(!ov.src){ov.src='presentacion.html?solo=1';ovPend=msg}else if(ovReady)ov.contentWindow.postMessage(msg,'*');else ovPend=msg}
function hideOverlay(){document.body.classList.remove('guia-ov')}

function targets(view,ids){const pm=VIEW_POS[view]||VIEW_POS.free;return ids.map(id=>byId.get(id)).filter(Boolean).map(n=>({x:(pm[n.id]||n).x,y:(pm[n.id]||n).y,r:n.r+(ids.length<=12?75:25)}))}
function highlight(step, forceCloseZoom = false){
 gP.selectAll('*').remove();state.sel=null;state.selLink=null;
 if(!step.nodes||!step.nodes.length){
  window.__guiaActiveNodes = null;
  svg.classed('focus',false);nodeSel.classed('on',false);linkSel.classed('on',false).classed('sel-link',false);
  setTimeout(()=>{if(G.on&&S[G.i]===step){ fitTo(targets(step.v,nodes.map(n=>n.id)),800,1.15); queue(); }},60);
  return;
 }
 const set=new Set(step.nodes);
 const ls=links.filter(l=>step.incident?(set.has(l.s)||set.has(l.t)):(set.has(l.s)&&set.has(l.t)));
 const lit=new Set(step.nodes);if(step.incident)ls.forEach(l=>{lit.add(l.s);lit.add(l.t)});
 window.__guiaActiveNodes = lit;

 svg.classed('focus',true);
 nodeSel.classed('on',d=>lit.has(d.id)).classed('sel',d=>set.has(d.id)&&step.incident);
 linkSel.classed('on',l=>ls.includes(l)).classed('sel-link',l=>ls.includes(l));

 if(!reduce)ls.slice(0,40).forEach((l,j)=>{for(let q=0;q<2;q++){const c=gP.append('circle').attr('class','particle').attr('r',MODE==='d'?3.2:3.6).attr('fill',CONV[l.c].c);
  c.append('animateMotion').attr('dur','1.9s').attr('repeatCount','indefinite').attr('begin',(q*.8+j*.15)+'s').append('mpath').attr('href','#p'+l.i)}});

 setTimeout(()=>{
   if(G.on&&S[G.i]===step){
     // Si son pocos nodos clave (1-4) o se solicita zoom cercano: zoom de aproximación fuerte (3.4x)
     if (forceCloseZoom || step.nodes.length <= 4) {
       fitTo(targets(step.v, step.nodes), 750, 3.4);
     } else {
       fitTo(targets(step.v, [...lit]), 750, 2.6);
     }
     queue();
   }
 }, 60);
}
function go(i){i=Math.max(0,Math.min(S.length-1,i));G.i=i;const st=S[i];
 document.querySelectorAll('.left').forEach(e=>e.scrollLeft=0);
 document.getElementById('gK').textContent=`${ROMAN[st.b]} · ${BL[st.b][0]} · ${BL[st.b][1]}`;
 ['gT','gS'].forEach(id=>{const e=document.getElementById(id);e.style.animation='none';void e.offsetWidth;e.style.animation=''});
 document.getElementById('gT').textContent=st.t;document.getElementById('gS').textContent=st.s;
 document.getElementById('gC').textContent=`${i+1} / ${S.length}`;document.getElementById('gBar').style.width=((i+1)/S.length*100)+'%';
 document.getElementById('gNext').textContent=i===S.length-1?'Fin':'Siguiente';
 if(st.ov){showOverlay(st.ov)}else{hideOverlay();
  if(st.v==='map3d'){switchView('map3d')}else{switchView(st.v);setTimeout(()=>{if(G.on&&S[G.i]===st)highlight(st)},currentView===st.v?0:60)}}
 renderPanel();
}
const ROMAN=['I','II','III','IV','V','VI','VII','VIII','IX'];
function panelHTML(){const st=S[G.i];const ns=(st.nodes||[]).map(id=>byId.get(id)).filter(Boolean);
 return `<section class="sec" style="padding:16px 18px">
  <div style="font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:.08em;color:#F2B53A;text-transform:uppercase">${esc2(BL[st.b][0])} · ${BL[st.b][1]}</div>
  <div style="margin:8px 0 0;font-size:17px;font-weight:700;line-height:1.3;color:#fff">${esc2(st.t)}</div></section>
  ${ns.length?`<section class="sec" style="padding:12px 18px 24px"><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--mute);margin-bottom:10px">Actores en este momento (${ns.length})</div>
  <div style="display:flex;flex-direction:column;gap:6px">${ns.map(n=>{const hasLogo=!!REAL_LOGOS[n.id];const bg=n.id==='A01'?'#0e3820':(hasLogo?'#FFFFFF':'#141722');
   return `<button class="it" data-id="${n.id}" style="display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid var(--line);border-radius:8px;background:#0f1420;cursor:pointer;text-align:left">
    <span class="av" style="width:30px;height:30px;border-color:${SPC[n.sph]};border-width:1.8px;flex:none;background:${bg};padding:${hasLogo?'2px':'0'};box-sizing:border-box">${avatar(n,24)}</span>
    <span style="min-width:0"><span style="display:block;font-size:12.5px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc2(n.short)}</span><span style="font-size:11px;color:var(--soft)">${esc2(n.nat)}</span></span></button>`}).join('')}</div></section>`:''}`}
const _render=renderPanel;
renderPanel=function(){if(G.on){P.innerHTML=panelHTML();P.scrollTop=0;return}_render()};
function start(){if(!ov.src){ov.src='presentacion.html?solo=1'}G.on=true;document.body.classList.add('guia-on');state.activeTour=null;go(0);dispatchEvent(new Event('resize'))}
function stop(){G.on=false;window.__guiaActiveNodes=null;document.body.classList.remove('guia-on','guia-ov');gP.selectAll('*').remove();svg.classed('focus',false);nodeSel.classed('on',false).classed('sel',false);linkSel.classed('on',false).classed('sel-link',false);
 switchView('free');renderPanel();dispatchEvent(new Event('resize'));setTimeout(()=>fitAll(),100)}
document.getElementById('gPrev').onclick=()=>go(G.i-1);
document.getElementById('gNext').onclick=()=>{if(G.i<S.length-1)go(G.i+1)};
document.getElementById('gExit').onclick=stop;
addEventListener('keydown',e=>{if(!G.on||e.target.closest('input,select,textarea'))return;if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();if(G.i<S.length-1)go(G.i+1)}else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(G.i-1)}else if(e.key==='Escape')stop()});
const btn=document.getElementById('guiaBtn');if(btn)btn.addEventListener('click',()=>{setTimeout(start,0)});
window.__guia={start,stop,go,S,get i(){return G.i}};
if(location.hash==='#guion')setTimeout(start,400);
})();
