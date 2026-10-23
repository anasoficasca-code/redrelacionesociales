// Guion del Corte III recorrido sobre la red principal (Red libre, Clústeres, Anillos y Territorio 3D).
(function(){
const BL=[['Apertura','0:00–1:00'],['Cómo se relacionan hoy los actores','1:00–2:45'],['Qué muestra la red actual','2:45–4:35'],['Macromodelo político','4:35–6:45'],['Cómo se tomaría una decisión','6:45–8:40'],['Modelo dinámico-causal','8:40–10:45'],['Contradicciones y límites','10:45–12:15'],['De la red actual a la propuesta','12:15–13:35'],['Síntesis territorial y cierre','13:35–15:00']];
const ABAST=['A06','A07','A08','A09','A10','A11','LOG01','A13','A14','A15','A16','A17','A18','A20','A01'];
const RESID=['A23','A24','A26','A27','A56','A25','A57','A28','A29','A31','RES01','A32'];
const S=[
 // I · Apertura
 {b:0,v:'free',t:'¿Cómo coordinar sin un único centro de decisión?',s:'La pregunta que orienta el trabajo.',n:'¿Cómo podemos coordinar las decisiones, los recursos y el trabajo del territorio sin que toda la capacidad de influir dependa de un único centro de decisión? Para responderla, miramos las relaciones sociales que sostienen dos dinámicas de Kennedy: el abastecimiento de alimentos y la gestión de residuos aprovechables.'},
 {b:0,v:'free',nodes:['A06','A10','A11','A13','A20','A24','A27','A25','A01','A28','A32','A34'],t:'Funciones distintas que dependen unas de otras',s:'Comerciantes, transportadores, trabajadores, hogares, recicladores, empresas e instituciones.',n:'En ellas participan comerciantes, transportadores, trabajadores, hogares, recicladores, empresas e instituciones. Sus funciones son distintas, pero sus acciones dependen unas de otras. Por eso, no basta con identificar quiénes están presentes; también tenemos que entender quién puede proponer cambios, quién controla los recursos para llevarlos a cabo y qué actores tienen menos posibilidades de influir.'},
 {b:0,v:'clusters',t:'Una organización heterárquica y distribuida',s:'Conectada mediante varios centros de decisión.',n:'Desde ese diagnóstico, proponemos una organización heterárquica y distribuida, conectada mediante varios centros de decisión.'},
 // II · Cómo se relacionan hoy
 {b:1,v:'free',nodes:ABAST,t:'El abastecimiento de alimentos',s:'Compras, ventas, transporte, cargue, descargue y distribución.',n:'En el abastecimiento de alimentos participan comerciantes mayoristas, compradores, coteros, conductores, propietarios de vehículos, tiendas y restaurantes. Los alimentos pasan entre ellos mediante compras, ventas, transporte, cargue, descargue y distribución. Cada actor realiza una parte del proceso y depende de otros para completar la cadena.'},
 {b:1,v:'free',nodes:RESID,t:'La gestión de residuos',s:'Materiales, dinero, horarios, información e instrucciones.',n:'En la gestión de residuos intervienen hogares y comercios que generan materiales, personas que los separan, recicladores independientes, asociaciones, compradores de material y operadores de aseo. También participan vehículos y equipos que hacen posible la recolección y el transporte. Entre estos actores hay diferentes relaciones: intercambio de materiales y dinero, coordinación de horarios, circulación de información, instrucciones y cumplimiento de las reglas del servicio.'},
 {b:1,v:'free',nodes:['A32','A28','RES01','A27','A57','A24'],t:'No todas las relaciones dan la misma influencia',s:'Autoridad legal, recursos y conocimiento de las rutas.',n:'Estas relaciones no tienen todas la misma naturaleza ni ofrecen la misma capacidad de influencia. Una institución puede tener autoridad legal; una empresa puede controlar recursos, equipos u horarios; y un reciclador puede conocer muy bien las rutas y los materiales, aunque no tenga la misma capacidad para modificar las condiciones del servicio. Por eso observamos no solo quién interactúa con quién, sino también qué recursos circulan, quién puede cambiar las condiciones y quién asume las consecuencias.'},
 // III · Qué muestra la red actual
 {b:2,v:'free',t:'95 actores y 254 relaciones',s:'Personas, cargos, instituciones, empresas, organizaciones y elementos materiales.',n:'La red que construimos reúne 95 actores y 254 relaciones. Los nodos representan personas, cargos, instituciones, empresas, organizaciones y elementos materiales que intervienen en estas actividades. Cada línea representa un vínculo concreto, como una compra, una entrega, una instrucción, una solicitud, una autorización o un intercambio de información.'},
 {b:2,v:'clusters',t:'Ocho grupos conectados entre sí',s:'103 de las 254 relaciones conectan grupos distintos.',n:'Organizamos los actores en ocho grupos. Residuos, reciclaje y gestión ambiental reúne 23 actores; educación y convivencia escolar, 14; Corabastos y comercio mayorista, 13; gobierno local y comités, 13; comercio barrial y consumo, 12; logística y transporte de carga, 8; transporte público, 7; y salud, 5. De las 254 relaciones, 103 conectan actores de grupos distintos. Esto muestra que las actividades no funcionan de forma aislada: el comercio depende del transporte y la gestión de residuos conecta a hogares, establecimientos, recicladores, compradores y operadores.'},
 {b:2,v:'concentric',t:'Los papeles en las decisiones actuales',s:'20 deciden · 31 coordinan · 36 trabajan · 8 participan o reciben.',n:'También clasificamos los papeles que aparecen en las decisiones actuales: 20 actores están relacionados con decisiones sobre reglas, recursos o prioridades; 31 con coordinación y gestión; 36 con el trabajo cotidiano; y 8 con grupos que participan o reciben los efectos de las decisiones. Esta clasificación es una lectura de nuestra red, no una característica fija de cada actor.'},
 {b:2,v:'concentric',nodes:['A34'],incident:true,t:'La Alcaldía Local: 21 conexiones',s:'102 relaciones bajan y 77 suben.',n:'La Alcaldía Local aparece con 21 conexiones. Además, en la lectura por niveles registramos 102 relaciones que bajan desde instancias de decisión y 77 que suben desde actores de otros niveles. Las relaciones que bajan incluyen instrucciones, control o prestación de servicios; entre las que suben aparecen solicitudes y formas de participación que no siempre cambian una decisión. Estos datos no miden por sí solos todo el poder, pero ayudan a señalar una cuestión: quienes realizan el trabajo o reciben los efectos de una decisión no necesariamente pueden modificarla.'},
 // IV · Macromodelo político
 {b:3,ov:['hetero',1],t:'Heterarquía',s:'El papel de cada actor cambia según el asunto.',n:'Para responder a esa situación proponemos una organización política heterárquica y distribuida. La heterarquía significa que la influencia no depende siempre de una sola jerarquía vertical. El papel de cada actor puede cambiar según el asunto, su conocimiento, su responsabilidad y los recursos que controla. Por ejemplo, en la recuperación de residuos, quienes realizan la recolección tienen conocimientos que deben tenerse en cuenta al organizar los horarios y las condiciones de entrega.'},
 {b:3,v:'concentric',nodes:['A32','A33','A34','A28','A25','A26','A27','A56'],t:'Las competencias formales no son la única forma de influir',s:'Los conocimientos y necesidades entran antes de resolver.',n:'Esto no significa que todos tengan que decidir sobre todo ni que las instituciones dejen de cumplir sus funciones legales. Significa que las competencias formales no deberían ser la única manera de influir en las decisiones. Cuando un asunto afecta a varios actores, sus conocimientos y necesidades deben entrar en la discusión antes de resolverlo.'},
 {b:3,ov:['niveles',5],t:'Gobernanza policéntrica',s:'Cotidiano, coordinación por temas, instancia local y competencias distritales.',n:'La gobernanza policéntrica complementa esta idea. Consiste en tener varios espacios de decisión con responsabilidades propias, conectados entre sí. En la organización que proponemos, las decisiones de la actividad cotidiana se tratan cerca de quienes la realizan; los asuntos compartidos se coordinan entre las organizaciones involucradas; los problemas que afectan a distintos sectores se llevan a una instancia local; y aquello que requiere presupuesto, autorización o competencias distritales se tramita con las entidades responsables.'},
 {b:3,ov:['poli',0],t:'Una dimensión territorial',s:'Ni todo en un solo lugar ni espacios aislados.',n:'Esta organización también tiene una dimensión territorial. No proponemos concentrar toda la coordinación en un solo lugar ni crear espacios aislados que no se comuniquen. Proponemos relacionar las decisiones cotidianas, la coordinación por temas, los acuerdos de escala local y las competencias distritales. Lo importante es que cada espacio tenga una función clara y que exista una forma de llevar información y acuerdos de un nivel al otro.'},
 {b:3,ov:['poli',1],t:'Mandatos con límites',s:'Informar, consultar y poder cambiar la representación.',n:'Por eso, los distintos espacios deben compartir información, acordar responsabilidades y reconocer cuándo necesitan coordinarse. Las decisiones que afectan a varios grupos deben discutirse con ellos; algunas tareas pueden delegarse, pero con límites claros. Quien representa a una organización informa lo acordado y consulta de nuevo si el asunto supera el mandato que recibió. Si no cumple con ese encargo, la organización debe tener una forma de revisar o cambiar la representación.'},
 // V · Decisión
 {b:4,v:'free',nodes:['A26','A27','A56','A23'],t:'Un ejemplo: horarios que no coinciden',s:'Material que no se recupera porque las entregas no coinciden con los recorridos.',n:'Veamos cómo funcionaría esa organización ante una dificultad relacionada con los residuos. Imaginemos que unos recicladores observan que parte del material aprovechable no se recupera porque los horarios de entrega de algunos comercios no coinciden con sus recorridos. Este es un ejemplo para explicar la propuesta; no afirmamos que suceda de la misma manera en toda Kennedy.'},
 {b:4,v:'free',nodes:['A26','A27','A25','A23','A57','A28','A32'],t:'Registrar y aportar información',s:'Recorridos, horarios, condiciones de entrega y reglas del servicio.',n:'Primero, quienes identifican el problema registran qué está pasando y lo llevan al espacio de coordinación sobre residuos. Después, recicladores, comercios, bodegas, compradores, operador de aseo y entidades relacionadas aportan la información que conocen: recorridos, horarios, condiciones de entrega y reglas del servicio.'},
 {b:4,v:'free',nodes:['A25','A23','A57','A28','A32','A34'],t:'Comparar, acordar, ejecutar y revisar',s:'Lo propio se acuerda; lo que requiere autorización se tramita.',n:'Con esa información se comparan alternativas. Los actores acuerdan lo que está dentro de sus responsabilidades y tramitan ante la entidad correspondiente lo que necesita autorización. Luego se define quién realiza cada tarea, qué recursos necesita y en qué plazo. Por último, se revisa si el acuerdo se cumplió, qué efecto tuvo y qué debe cambiarse.'},
 {b:4,v:'concentric',nodes:['A34','FDL','A32','A28','RES01','A26','A27'],t:'Decidir no es lo mismo que hacer',s:'Plantear, discutir, decidir, ejecutar y revisar.',n:'Este recorrido tiene cinco momentos: plantear el problema, discutir opciones, decidir, ejecutar y revisar. También permite ver que decidir no es lo mismo que hacer. Una organización puede acordar un cambio, pero necesitar equipos, dinero o una autorización que controla otro actor. Para que la decisión no se quede en el papel, deben estar claros los responsables, los recursos y la forma de comprobar los resultados.'},
 // VI · Modelo dinámico
 {b:5,ov:['vensim',0],t:'Del quién al por qué',s:'El modelo de Vensim: niveles, flujos e influencias con signo.',n:'La red muestra quién se relaciona con quién. El modelo dinámico-causal explica por qué esas relaciones pueden mantenerse o cambiar con el tiempo.'},
 {b:5,ov:['bucles',0],t:'Variables que cambian en el tiempo',s:'Participación, acuerdos, trabajo, carga, desgaste, confianza y material recuperado.',n:'Para analizarlo, consideramos variables como participación efectiva, acuerdos cumplidos, trabajo colectivo disponible, carga de trabajo por persona, desgaste, confianza basada en resultados y cantidad de material recuperado.'},
 {b:5,ov:['bucles',1],t:'Un ciclo que fortalece',s:'Signo positivo: mismo sentido. Refuerzo y equilibrio.',n:'Podemos plantear un ciclo que fortalece la organización. Cuando se comparte información y las tareas están claras, aumenta la posibilidad de cumplir los acuerdos. Si los acuerdos se cumplen, los actores pueden confiar más en la coordinación y participar de nuevo. Esa participación aporta información y capacidad de trabajo, lo que puede facilitar acuerdos posteriores. En el diagrama causal, un signo positivo indica que dos variables tienden a cambiar en el mismo sentido; uno negativo indica que cambian en sentidos opuestos. Un ciclo de refuerzo puede fortalecer una dinámica, mientras que uno de equilibrio puede limitarla o corregirla.'},
 {b:5,ov:['bucles',2],t:'Un ciclo que debilita',s:'Las mismas personas convocan, registran, coordinan y hacen seguimiento.',n:'También puede aparecer un ciclo que debilita la organización. Si las mismas personas convocan, registran, coordinan y hacen seguimiento, su carga de trabajo aumenta. El desgaste puede reducir su participación; quedan menos personas para realizar las tareas, se incumplen más acuerdos y disminuye la confianza. La organización puede terminar dependiendo de un grupo pequeño, aunque su intención inicial fuera distribuir las responsabilidades.'},
 {b:5,ov:['prueba',1],t:'Escenarios para analizar',s:'No son resultados demostrados.',n:'Para examinarlo, partimos de la red actual, planteamos como decisión mejorar la coordinación de las entregas de materiales y consideramos una dificultad posible, como el cambio de horario de un comprador o la interrupción temporal de un punto de recepción. Si hay información compartida y alternativas de coordinación, los actores podrían ajustar el acuerdo; si todo depende de un solo contacto y las tareas recaen en pocas personas, la recuperación podría disminuir y la participación debilitarse. Estos son escenarios para analizar, no resultados demostrados. Para contrastarlos necesitamos datos sobre acuerdos cumplidos, reparto de tareas y cantidad de material recuperado.'},
 // VII · Contradicciones
 {b:6,v:'free',nodes:['A57','A10','INF02','A14','A60'],incident:true,t:'Influencia sin cargo formal',s:'Quién puede facilitar, retrasar o detener una decisión.',n:'Una organización distribuida no elimina automáticamente las diferencias de poder. Un actor puede no tener un cargo formal y, aun así, influir mucho porque controla información, dinero, equipos o una conexión necesaria para ejecutar una tarea. Por eso debemos observar quién puede facilitar, retrasar o detener una decisión, y no mirar solamente los cargos.'},
 {b:6,v:'concentric',nodes:['FDL','A34','A33','A32','N06'],incident:true,t:'Dependencia de recursos externos',s:'Financiación, permisos o equipos que no se controlan.',n:'También existe dependencia de recursos externos. Las organizaciones pueden llegar a un acuerdo, pero necesitar financiación, permisos o equipos que no controlan.'},
 {b:6,v:'free',nodes:['A36','A35','A25','AMB04','A37'],incident:true,t:'El trabajo que recae en pocas personas',s:'Si no se reconoce ni se reparte, la organización pierde continuidad.',n:'Otra tensión aparece cuando las decisiones se comparten, pero la coordinación y el seguimiento siguen recayendo en pocas personas. Si ese trabajo no se reconoce ni se reparte, la organización pierde continuidad.'},
 {b:6,v:'free',nodes:['A27','A56','A58','A55','A37'],incident:true,t:'Quién recibe los costos',s:'Incluir a quienes reciben las consecuencias.',n:'Por último, una decisión puede beneficiar a unos actores y trasladar costos a otros. Por eso es necesario incluir a quienes reciben sus consecuencias, aunque no formen parte de la instancia que decide. La propuesta debe hacer visibles estas tensiones y ofrecer formas de expresar desacuerdos, revisar los acuerdos y corregir los efectos que no eran esperados.'},
 // VIII · Transición
 {b:7,v:'clusters',nodes:['A27','A26','A25','A23','A57','A28','A32','A34'],t:'Reconocer lo que ya existe',s:'Contrastar la red con quienes la viven.',n:'La transformación empezaría por reconocer las formas de organización que ya existen. Antes de crear nuevas instancias, habría que contrastar la red con recicladores, asociaciones, comercios, bodegas, operadores y entidades: cómo circula la información, cómo se hacen las entregas y dónde surgen dificultades.'},
 {b:7,v:'free',nodes:['A27','A26','A25','A23','A57','A28','A32','A34'],t:'Reglas claras',s:'Registrar, informar, resolver, tramitar y comprobar.',n:'A partir de esa revisión, los actores podrían acordar reglas claras: cómo se registra un problema, quién debe conocerlo, qué puede resolver cada organización, qué asunto debe tramitarse ante una entidad y cómo se comprueba el resultado. Las vocerías y las tareas de coordinación tendrían encargos definidos y la obligación de informar.'},
 {b:7,v:'free',t:'El cambio necesita tiempo',s:'Distribuir tareas, incorporar a los afectados y corregir las reglas.',n:'El cambio necesita tiempo, información, recursos y claridad sobre las competencias. También puede encontrar desacuerdos e intereses distintos. Por eso la organización no se sostiene solo por declararla deseable: tiene que demostrar que distribuye las tareas, incorpora a los actores afectados y puede modificar sus reglas cuando los resultados muestran que algo no está funcionando.'},
 // IX · Síntesis y cierre
 {b:8,v:'map3d',t:'La dimensión territorial',s:'Abastecer, transportar, comerciar, separar, recuperar y gestionar residuos.',n:'En términos territoriales, la propuesta busca coordinar mejor a quienes abastecen, transportan, comercian, separan, recuperan y gestionan residuos. La circulación y el aprovechamiento de materiales no dependen solo de la infraestructura o de que exista un servicio; también dependen de las relaciones entre los actores, de los horarios, de los recursos y de la posibilidad de ajustar las decisiones.'},
 {b:8,v:'concentric',t:'Tres piezas, una explicación',s:'La red describe; el recorrido organiza; el modelo examina en el tiempo.',n:'El macromodelo heterárquico y distribuido propone que la influencia no dependa siempre de las mismas posiciones. La gobernanza policéntrica conecta distintos espacios de decisión y mantiene claras las responsabilidades. La red describe las relaciones actuales; el recorrido de una decisión explica cómo se organiza la actuación; y el modelo dinámico-causal permite examinar qué puede fortalecer o debilitar el sistema con el tiempo.'},
 {b:8,v:'clusters',t:'Hacer visibles las dependencias',s:'Contrastar los supuestos con datos del territorio.',n:'No afirmamos que los conflictos vayan a desaparecer ni que todos los actores vayan a tener el mismo poder. Proponemos hacer visibles las dependencias, reconocer los conocimientos y trabajos que sostienen las actividades, y establecer formas claras de decidir, ejecutar, revisar y corregir. Para valorar los efectos tendremos que contrastar los supuestos con datos del territorio y distinguir las relaciones documentadas de las que todavía son propuestas.'},
 {b:8,v:'free',nodes:[...ABAST,...RESID],t:'Varios espacios conectados',s:'Que el conocimiento de quien hace el trabajo influya en las decisiones.',n:'Volviendo a la pregunta inicial, coordinar las decisiones, los recursos y el trabajo sin depender de un único centro requiere varios espacios conectados, responsabilidades claras y mecanismos para revisar los acuerdos. En Kennedy, esto significa relacionar mejor a quienes abastecen, transportan, comercian, separan, recuperan y gestionan los residuos, y lograr que el conocimiento de quienes realizan el trabajo pueda influir en las decisiones que afectan sus actividades. No buscamos que todos decidan sobre todo, sino que cada actor pertinente pueda aportar, que se sepa quién responde por cada tarea y que las decisiones puedan corregirse cuando los resultados lo exijan. Esa es la organización política heterárquica y distribuida que proponemos explorar.'}
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
#guiaDock button.zoom-btn{background:linear-gradient(135deg,#0284c7,#2563eb);color:#fff;border-color:#38bdf8;font-weight:700;box-shadow:0 0 10px rgba(56,189,248,0.35)}
#guiaDock button.zoom-btn:hover{filter:brightness(1.15)}
#guiaDock button.pan-btn{background:rgba(255,255,255,0.06);color:#94a3b8}
#guiaDock .gc{font:500 12px 'JetBrains Mono',monospace;color:#8b93a6;min-width:52px;text-align:center}
#guiaProg{display:none;height:3px;background:#1b2030}#guiaProg i{display:block;height:100%;background:#F2B53A;width:0;transition:width .4s}
body.guia-on #guiaProg{display:block}
#guiaOverlay{position:absolute;inset:0;border:0;width:100%;height:100%;display:none;z-index:60;background:#0d0e10}
body.guia-on.guia-ov #guiaOverlay{display:block}
@keyframes grise{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}
@media (max-width:760px){#guiaDock{flex-direction:column;align-items:stretch;padding:10px 12px;gap:10px}#guiaDock h2{font-size:17px}#guiaDock .gnav{justify-content:space-between}}
@media (prefers-reduced-motion:reduce){#guiaDock h2,#guiaDock p{animation:none}}`;
document.head.appendChild(css);
const dock=document.createElement('div');dock.id='guiaDock';dock.innerHTML=`<div class="gtxt"><div class="gk" id="gK"></div><h2 id="gT"></h2><p id="gS"></p></div><div class="gnav"><button id="gPrev" title="Paso anterior (Flecha Izquierda)">Anterior</button><span class="gc" id="gC"></span><button class="pri" id="gNext" title="Siguiente paso (Flecha Derecha)">Siguiente</button><button id="gZoom" class="zoom-btn" title="Hacer zoom cercano (3.4x) al actor actual">Zoom 3.4x</button><button id="gPan" class="pan-btn" title="Ver panorama general">Panorama</button><button id="gExit">Salir</button></div>`;
const prog=document.createElement('div');prog.id='guiaProg';prog.innerHTML='<i id="gBar"></i>';
const stageEl=document.getElementById('stage');stageEl.parentNode.insertBefore(dock,stageEl);stageEl.parentNode.insertBefore(prog,stageEl);
const ov=document.createElement('iframe');ov.id='guiaOverlay';ov.title='Diagramas del Corte III';stageEl.appendChild(ov);let ovReady=false,ovPend=null;
ov.addEventListener('load',()=>{ovReady=true;if(ovPend){ov.contentWindow.postMessage(ovPend,'*');ovPend=null}});
function showOverlay(o){document.body.classList.add('guia-ov');const msg={guia:1,key:o[0],sub:o[1]};
 if(!ov.src){ov.src='presentacion.html?solo=1';ovPend=msg}else if(ovReady)ov.contentWindow.postMessage(msg,'*');else ovPend=msg}
function hideOverlay(){document.body.classList.remove('guia-ov')}

function targets(view,ids){const pm=VIEW_POS[view]||VIEW_POS.free;return ids.map(id=>byId.get(id)).filter(Boolean).map(n=>({x:(pm[n.id]||n).x,y:(pm[n.id]||n).y,r:n.r}))}
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
  <div style="font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:.08em;color:#F2B53A;text-transform:uppercase">Guion · ${BL[st.b][1]}</div>
  <p style="margin:10px 0 0;font-size:14px;line-height:1.6;color:#e6e9f0">${esc2(st.n)}</p></section>
  ${ns.length?`<section class="sec" style="padding:12px 18px 24px"><div style="font-size:11px;font-weight:700;text-transform:uppercase;letter-spacing:.06em;color:var(--mute);margin-bottom:10px">Actores en este momento (${ns.length})</div>
  <div style="display:flex;flex-direction:column;gap:6px">${ns.map(n=>{const hasLogo=!!REAL_LOGOS[n.id];const bg=n.id==='A01'?'#0e3820':(hasLogo?'#FFFFFF':'#141722');
   return `<button class="it" data-id="${n.id}" style="display:flex;align-items:center;gap:10px;padding:8px 10px;border:1px solid var(--line);border-radius:8px;background:#0f1420;cursor:pointer;text-align:left">
    <span class="av" style="width:30px;height:30px;border-color:${SPC[n.sph]};border-width:1.8px;flex:none;background:${bg};padding:${hasLogo?'2px':'0'};box-sizing:border-box">${avatar(n,24)}</span>
    <span style="min-width:0"><span style="display:block;font-size:12.5px;font-weight:700;color:#fff;white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${esc2(n.short)}</span><span style="font-size:11px;color:var(--soft)">${esc2(n.nat)}</span></span></button>`}).join('')}</div></section>`:''}`}
const _render=renderPanel;
renderPanel=function(){if(G.on){P.innerHTML=panelHTML();P.scrollTop=0;return}_render()};
function start(){G.on=true;document.body.classList.add('guia-on');state.activeTour=null;go(0);dispatchEvent(new Event('resize'))}
function stop(){G.on=false;window.__guiaActiveNodes=null;document.body.classList.remove('guia-on','guia-ov');gP.selectAll('*').remove();svg.classed('focus',false);nodeSel.classed('on',false).classed('sel',false);linkSel.classed('on',false).classed('sel-link',false);
 switchView('free');renderPanel();dispatchEvent(new Event('resize'));setTimeout(()=>fitAll(),100)}
document.getElementById('gPrev').onclick=()=>go(G.i-1);
document.getElementById('gNext').onclick=()=>{if(G.i<S.length-1)go(G.i+1)};
document.getElementById('gExit').onclick=stop;
const btnGZ=document.getElementById('gZoom');if(btnGZ)btnGZ.onclick=()=>{if(S[G.i])highlight(S[G.i],true);};
const btnGP=document.getElementById('gPan');if(btnGP)btnGP.onclick=()=>{if(S[G.i]){const st=S[G.i];fitTo(targets(st.v,st.nodes||nodes.map(n=>n.id)),750,1.3);}};
addEventListener('keydown',e=>{if(!G.on||e.target.closest('input,select,textarea'))return;if(['ArrowRight','PageDown',' '].includes(e.key)){e.preventDefault();if(G.i<S.length-1)go(G.i+1)}else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();go(G.i-1)}else if(e.key==='Escape')stop()});
const btn=document.getElementById('guiaBtn');if(btn)btn.addEventListener('click',()=>{setTimeout(start,0)});
window.__guia={start,stop,go,S,get i(){return G.i}};
if(location.hash==='#guion')setTimeout(start,400);
})();
