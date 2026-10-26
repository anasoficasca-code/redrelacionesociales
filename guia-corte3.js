// Guion del Corte III recorrido sobre la red principal (Red libre, Clústeres, Anillos y Territorio 3D).
(function(){
const BL=[['Problemática territorial',''],['Pregunta y conceptos',''],['Heterarquía y gobernanza policéntrica',''],['Red de interacciones sociales',''],['Soberanía alimentaria',''],['Toma de decisiones',''],['Modelo dinámico-causal',''],['Autonomía y dependencia',''],['Conclusión','']];
const ABAST=['A06','A07','A08','A09','A10','A11','LOG01','A13','A14','A15','A16','A17','A18','A20','A01'];
const RESID=['A23','A24','A26','A27','A56','A25','A57','A28','A29','A31','RES01','A32'];
const S=[
 {b:0,v:'free',t:'La red de actores de Kennedy',s:'',n:''},
 // 1 · Problemática territorial
 {b:0,v:'free',nodes:['A01'],incident:true,t:'La hiperconcentración del mercado mayorista',s:'Corabastos como problema central de este corte.',n:'Buenas tardes. En las entregas anteriores identificamos que la localidad de Kennedy funciona como un sistema complejo en el que las dinámicas comerciales, logísticas y ambientales generan fragmentación territorial. Para este tercer corte, concentramos nuestra propuesta en un problema central: la hiperconcentración del mercado mayorista en Corabastos.'},
 {b:0,ov:['mapa',3],t:'Una misma estructura territorial',s:'Flujo comercial, carga, poder de decisión y costos ambientales sobre los humedales.',n:'Esta concentración se expresa en cuatro dimensiones: el flujo comercial de alimentos, los desplazamientos de carga, el poder de decisión y los costos ambientales asociados a la actividad. Como consecuencia, se presentan congestión vial, contaminación atmosférica, acumulación de residuos y presión sobre la estructura ecológica principal, especialmente sobre los humedales El Burro, Techo y La Vaca. Por eso, no abordamos estas consecuencias como problemas aislados, sino como manifestaciones de una misma estructura territorial.'},
 // 2 · Pregunta y conceptos
 {b:1,v:'free',nodes:['A15','A17','A13','A10','A37','A26','A27','A08','A06'],t:'La pregunta que orienta el modelo',s:'Coordinar colectivamente una parte de los flujos, sin que Corabastos ni las instituciones desaparezcan.',n:'La pregunta que orienta nuestro modelo es: ¿cómo pueden quienes participan en el abastecimiento y soportan sus impactos coordinar colectivamente una parte de estos flujos, sin suponer que Corabastos o las instituciones deben desaparecer?'},
 {b:1,ov:['cv_macros',0],t:'Diez macromodelos, seis en foco',s:'Reorganizar flujos, fortalecer la autonomía local y poner límites ambientales.',n:'Nuestra propuesta reúne diez macromodelos, pero se concentra en aquellos que actúan directamente sobre esta problemática: comercio ecológico y autonomía territorial, circularidad, enfoque hidrocéntrico, límites ecológicos, organización comunitaria y gobernanza heterárquica. Estos enfoques buscan reorganizar los flujos de alimentos y residuos, fortalecer la autonomía local y establecer límites ambientales a las actividades económicas.'},
 {b:1,ov:['cv_tres',0],t:'Gobierno, gobernanza y autogobierno',s:'Autogobierno sobre flujos concretos que coexiste con las instituciones.',n:'Para comprender la propuesta, debemos distinguir tres conceptos. El gobierno corresponde a las autoridades con competencias legales, como la Alcaldía, la UAESP y la Secretaría Distrital de Ambiente. La gobernanza consiste en la coordinación entre actores públicos y no estatales. El autogobierno ocurre cuando quienes comparten un recurso establecen sus propias reglas para gestionarlo. Nuestro planteamiento propone un autogobierno sobre flujos concretos que coexiste con las instituciones existentes y necesita su reconocimiento.'},
 // 3 · Heterarquía y gobernanza policéntrica
 {b:2,ov:['heterarquia2',0],t:'Heterarquía',s:'El liderazgo cambia según el asunto (Carole Crumley).',n:'Aquí aparecen dos conceptos fundamentales. El primero es la heterarquía, desarrollada por Carole Crumley. A diferencia de una estructura estrictamente jerárquica, en la que la autoridad se concentra en una cúspide, la heterarquía permite que el liderazgo cambie según el asunto. En la gestión de residuos encabezan quienes los recuperan y procesan; en los horarios de carga participan transportadores, coteros y vecinos; y en el cuidado del humedal tienen un papel central quienes lo custodian.'},
 {b:2,ov:['cv_comunes',0],t:'Gobernanza policéntrica',s:'Centros de decisión autónomos coordinados con reglas compartidas (Elinor Ostrom).',n:'El segundo concepto es la gobernanza policéntrica, desarrollada por Elinor Ostrom. Esta plantea que diferentes centros de decisión pueden actuar de manera autónoma y coordinarse mediante reglas compartidas. Aplicamos sus principios a los recursos comunes alrededor de Corabastos, como los horarios de cargue, los residuos orgánicos, la información de precios y los recursos destinados al abastecimiento. Así, la propuesta no busca sustituir las competencias institucionales, sino distribuir la capacidad de decisión y establecer mecanismos de coordinación entre los actores del territorio.'},
 // 4 · Red de interacciones sociales
 {b:3,v:'free',nodes:['A34','A32','A33','A35','AMB04','A06','A25','A27','A08'],t:'La red de interacciones sociales',s:'Entidades, organizaciones, comerciantes, recicladores, productores y cuidado ambiental.',n:'Esta propuesta se materializa en nuestra Red de Interacciones Sociales, que articula entidades públicas, organizaciones comunitarias, comerciantes, recicladores, productores y actores vinculados al cuidado ambiental.'},
 {b:3,ov:['jerarquia',0],t:'Quien ejecuta no siempre decide',s:'Quienes soportan las consecuencias no siempre pueden modificar las decisiones.',n:'La red permite identificar una desigualdad importante: quienes ejecutan las actividades y soportan sus consecuencias no siempre tienen capacidad para modificar las decisiones que afectan su territorio.'},
 {b:3,v:'free',nodes:['A25','A26','A27','A56','A57','A23','A06'],t:'Recicladores organizados como cogestores',s:'Cogestores remunerados del metabolismo circular.',n:'Por eso, proponemos incorporar a los recicladores organizados como cogestores remunerados del metabolismo circular. Su participación se relaciona con el manejo de los residuos orgánicos y aprovechables que genera la actividad comercial. Los recicladores no son el objetivo del modelo ni se busca mantener la precariedad de su oficio; son actores que ya intervienen en uno de los flujos que pretendemos reorganizar. Aunque exista soberanía alimentaria, seguirá habiendo residuos que recuperar.'},
 {b:3,ov:['escena',2],t:'El metabolismo circular',s:'Los residuos orgánicos vuelven como alimento.',n:''},
 {b:3,v:'free',nodes:['A07','A13','A10','A15','A17','A08','A37','COM_HUE','INF03','C01'],t:'Más actores en la propuesta',s:'Mayoristas pequeños, coteros, transportadores, tenderos, restaurantes, productores y vecinos.',n:'Al mismo tiempo, la propuesta incorpora a comerciantes mayoristas pequeños, coteros, transportadores, tenderos, restaurantes, productores y comunidades vecinas.'},
 {b:3,ov:['propuesta',0],t:'Huertas, colegios y comedores',s:'Circuitos cortos de comercialización en Kennedy.',n:'También reconoce la importancia de las huertas comunitarias y escolares, como Tingua Azul y la huerta del Hospital Pediátrico Tintal, que pueden conectarse con tiendas de barrio, colegios y comedores populares mediante circuitos cortos de comercialización.'},
 // 5 · Soberanía alimentaria
 {b:4,ov:['propuesta',1],t:'Seguridad y soberanía alimentaria',s:'Decidir cómo se producen y distribuyen los alimentos.',n:'En este punto debemos distinguir la seguridad alimentaria de la soberanía alimentaria. La seguridad alimentaria se refiere al acceso a alimentos suficientes, inocuos y nutritivos. La soberanía alimentaria, en cambio, se relaciona con la capacidad de decidir cómo se producen y distribuyen. Nuestra propuesta trabaja sobre esta segunda dimensión, buscando que una parte del abastecimiento local dependa de circuitos organizados por sus propios participantes y no exclusivamente de un único centro comercial.'},
 {b:4,v:'free',nodes:['A01','COM_HUE','A15','A17','INF03','A08'],t:'Reducir la dependencia, no eliminar la central',s:'Compras organizadas, acuerdos entre productores y consumidores, e información de precios.',n:'Sin embargo, reconocemos una limitación: las huertas locales no pueden reemplazar el volumen ni la variedad de productos que mueve Corabastos. Por eso, no planteamos eliminar la central, sino reducir progresivamente la dependencia de un único nodo mediante compras locales organizadas, acuerdos entre productores y consumidores, y una mayor disponibilidad de información sobre precios y volúmenes.'},
 {b:4,ov:['escena',0],t:'Hoy: todo pasa por un solo nodo',s:'Camiones, residuos y decisiones convergen en Corabastos.',n:''},
 {b:4,ov:['escena',1],t:'Con la propuesta: circuitos cortos',s:'Las huertas se conectan con tiendas, colegios y comedores; Corabastos sigue.',n:''},
 // 6 · Toma de decisiones
 {b:5,ov:['cv_etapas',0],t:'Cinco etapas para decidir',s:'Agenda, deliberación, resolución, ejecución y seguimiento.',n:'Para llevarlo a la práctica, proponemos un proceso de toma de decisiones en cinco etapas. Primero, los actores identifican un problema y lo incorporan a la agenda local. Segundo, participan en mesas de deliberación donde presentan sus necesidades, datos e intereses. Tercero, establecen una resolución mediante reglas previamente acordadas. Cuarto, asignan recursos y ejecutan las acciones. Finalmente, hacen seguimiento a los resultados y corrigen lo que no funciona.'},
 {b:5,ov:['propuesta',2],t:'Un Fondo Común de Abastecimiento',s:'Administración rotativa, informes públicos y vocerías revocables.',n:'Un ejemplo concreto sería constituir un Fondo Común de Abastecimiento. Los tenderos, comedores y huertas presentarían la propuesta; los productores, transportadores, comerciantes y demás participantes discutirían sus condiciones; y el núcleo de abastecimiento definiría los aportes, las compras y las reglas de decisión. El fondo tendría administración rotativa, informes públicos y mecanismos para revocar vocerías.'},
 {b:5,v:'free',nodes:['A35','N01','FDL','A34'],t:'Articulado con lo que ya existe',s:'Juntas de Acción Comunal, JAL y presupuestos participativos.',n:'Este fondo es una propuesta, no una estructura que ya exista. Su implementación tendría que articularse con espacios institucionales existentes, como las Juntas de Acción Comunal, la Junta Administradora Local y los presupuestos participativos, mediante acuerdos con las autoridades competentes.'},
 {b:5,ov:['fondoanim',0],t:'Fondo Común: quién presenta',s:'Tenderos, comedores y huertas llevan la propuesta.',n:''},
 {b:5,ov:['fondoanim',1],t:'Fondo Común: quién discute',s:'Productores, transportadores, comerciantes y vecinos.',n:''},
 {b:5,ov:['fondoanim',2],t:'Fondo Común: quién define',s:'El núcleo de abastecimiento fija aportes, compras y reglas.',n:''},
 {b:5,ov:['fondoanim',3],t:'Fondo Común: cómo se controla',s:'Rotación, informes públicos y vocerías revocables.',n:''},
 // 7 · Modelo dinámico-causal
 {b:6,ov:['vensim2',0],t:'El modelo dinámico-causal',s:'Participación, cumplimiento, confianza y capacidad de gestión.',n:'Para comprender cómo se mantendría esta organización en el tiempo, utilizamos un modelo dinámico-causal que permite analizar las relaciones de retroalimentación entre participación, cumplimiento, confianza y capacidad de gestión.'},
 {b:6,ov:['vensim2',5],t:'Un bucle de refuerzo',s:'Más participación, cumplimiento, confianza y capacidad de compra colectiva.',n:'El primer bucle es de refuerzo. Cuando aumenta la participación, mejora el cumplimiento de los acuerdos, crece la confianza y se fortalece la capacidad de compra colectiva. Esto puede atraer nuevos participantes y aumentar los recursos disponibles, reforzando el funcionamiento del sistema.'},
 {b:6,ov:['vensim2',2],t:'La sobrecarga del trabajo comunitario',s:'Rotación de vocerías, remuneración del tiempo y monitoreo compartido.',n:'Sin embargo, identificamos una contradicción interna: la sobrecarga del trabajo comunitario. Si la gestión recae siempre sobre las mismas personas, aumenta el desgaste, disminuye la participación y se debilita el cumplimiento de los acuerdos. Para corregirlo, proponemos la rotación de vocerías, la remuneración del tiempo dedicado a la gestión y el monitoreo compartido.'},
 // 8 · Autonomía y dependencia
 {b:7,v:'free',nodes:['A01','A15','A17','INF03','COM_HUE','A06','A08'],t:'Autonomía y dependencia',s:'Los circuitos cortos siguen necesitando a Corabastos.',n:'También existe una tensión de fondo entre autonomía y dependencia. Los circuitos cortos siguen necesitando a Corabastos para acceder a productos que las huertas locales no producen. Además, la central podría responder reduciendo sus precios, lo que disminuiría el incentivo para comprar localmente. Por eso, la autonomía no puede darse por garantizada: debe evaluarse mediante el comportamiento real de las compras y la capacidad de mantener los circuitos locales incluso cuando cambian las condiciones del mercado.'},
 {b:7,ov:['propuesta',4],t:'Cómo medir los resultados',s:'Concentración, condiciones ambientales y organizativas.',n:'Para medir los resultados, proponemos indicadores como el porcentaje de abastecimiento local realizado mediante circuitos cortos, la dependencia de Corabastos, los viajes de carga en los horarios de mayor congestión, la disponibilidad de información sobre precios y las toneladas de residuos orgánicos aprovechadas. Estos indicadores permitirían evaluar si disminuye la concentración y si mejoran las condiciones ambientales y organizativas del territorio.'},
 // 9 · Conclusión
 {b:8,ov:['propuesta',3],t:'Tres flujos fundamentales',s:'Horarios de carga, residuos orgánicos y compras de alimentos.',n:'En conclusión, nuestra propuesta no pretende eliminar a Corabastos ni resolver por completo la fragmentación de Kennedy. Busca reducir la dependencia de un único centro en una parte del abastecimiento local y permitir que quienes viven y trabajan en el territorio participen en las decisiones sobre tres flujos fundamentales: los horarios de carga, los residuos orgánicos y las compras de alimentos.'},
 {b:8,v:'clusters',t:'Reorganizar las relaciones territoriales',s:'Hacia un metabolismo urbano compatible con los límites ecológicos.',n:'La transformación depende de que la organización comunitaria no sea solamente consultiva, sino que tenga reglas claras, recursos, capacidad de decisión y mecanismos de seguimiento. De esta manera, la gobernanza se convierte en una herramienta para reorganizar las relaciones territoriales, fortalecer la autonomía colectiva y avanzar hacia un metabolismo urbano más compatible con los límites ecológicos. Muchas gracias.'}
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
 document.getElementById('gK').textContent=[ROMAN[st.b],BL[st.b][0],BL[st.b][1]].filter(Boolean).join(' · ');
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
  <div style="font:600 10.5px 'JetBrains Mono',monospace;letter-spacing:.08em;color:#F2B53A;text-transform:uppercase">${esc2([BL[st.b][0],BL[st.b][1]].filter(Boolean).join(' · '))}</div>
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
