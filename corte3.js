(function(){
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const EVL={doc:'documentada',hip:'hipótesis',prop:'propuesta'};
const tagEv=e=>`<span class="tag t-${e}">${EVL[e]}</span>`;
const srcLink=s=>s?` <a href="#m7" title="${esc(C3.SRC[s].t)}">${s}</a>`:'';
const mobile=()=>window.matchMedia('(max-width:640px)').matches;
const tip=$('#tip');
function showTip(html,e){tip.innerHTML=html;tip.style.display='block';const x=Math.min(e.clientX+14,window.innerWidth-320);tip.style.left=x+'px';tip.style.top=(e.clientY+14)+'px'}
function hideTip(){tip.style.display='none'}

/* ================= 1 · FICHA ================= */
const ic=(id,c,s)=>`<use href="#i-${id}" width="${s}" height="${s}" style="color:${c}"/>`;
const svgG=(x,y,id,c,s=40)=>`<g transform="translate(${x-s/2},${y-s/2})">${ic(id,c,s)}</g>`;
$('#modsDecision').innerHTML=[
 {t:'Representación',d:'El colectivo elige; el delegado decide, sin control de vuelta.',svg:`
  ${svgG(50,70,'colectivo','#8C877E',54)}<path d="M85 70h30" stroke="#F1ECE2" stroke-width="2" marker-end="url(#ah)"/>
  ${svgG(140,70,'regulador','#F1ECE2',34)}<path d="M162 70h30" stroke="#F1ECE2" stroke-width="2" marker-end="url(#ah)"/>
  ${svgG(220,70,'persona','#D2553A',48)}<path d="M250 70h26" stroke="#F1ECE2" stroke-width="2" marker-end="url(#ah)"/>
  ${svgG(300,70,'instancia','#D2553A',40)}
  <path d="M60 110 Q140 150 220 110" fill="none" stroke="#8C877E" stroke-dasharray="4 4"/><path d="M132 124l14 14M146 124l-14 14" stroke="#D2553A" stroke-width="2.5"/>`},
 {t:'Mandato revocable',d:'El colectivo decide; el delegado ejecuta, rinde cuentas y es revocable.',svg:`
  ${svgG(70,40,'instancia','#E3A549',30)}${svgG(70,82,'colectivo','#E3A549',58)}
  <path d="M110 76h120" stroke="#F1ECE2" stroke-width="2" marker-end="url(#ah)"/><path d="M230 96H112" stroke="#F1ECE2" stroke-width="2" stroke-dasharray="6 5" marker-end="url(#ah)"/>
  ${svgG(262,82,'persona','#8C877E',50)}${svgG(316,92,'operador','#8C877E',34)}`},
 {t:'Heterarquía',d:'El orden cambia con el asunto; cada núcleo encabeza su materia y entrega mandatos revocables.',svg:`
  <circle cx="175" cy="78" r="58" fill="none" stroke="#3a3f45" stroke-dasharray="3 5"/>
  ${svgG(175,22,'colectivo','#6ea8d6',36)}${svgG(231,78,'colectivo','#e6956a',36)}${svgG(175,134,'colectivo','#cdae67',36)}${svgG(119,78,'colectivo','#7fbf8e',36)}
  <path d="M195 30 Q228 40 230 58" fill="none" stroke="#D2553A" stroke-width="2" marker-end="url(#ah2)"/><path d="M228 98 Q222 124 196 132" fill="none" stroke="#D2553A" stroke-width="2" marker-end="url(#ah2)"/>
  <path d="M156 132 Q126 124 120 98" fill="none" stroke="#D2553A" stroke-width="2" marker-end="url(#ah2)"/><path d="M121 58 Q126 34 155 28" fill="none" stroke="#D2553A" stroke-width="2" marker-end="url(#ah2)"/>
  ${svgG(175,78,'nohumano','#F1ECE2',26)}`}
].map((m,i)=>`<div class="card"><svg viewBox="0 0 350 160"><defs><marker id="ah" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1L9 5L0 9z" fill="#F1ECE2"/></marker><marker id="ah2" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1L9 5L0 9z" fill="#D2553A"/></marker></defs>${m.svg}</svg><h4 style="margin-top:12px${i===2?';color:var(--ochre)':''}">${m.t}</h4><p>${m.d}</p></div>`).join('');

const RA={ent:'Entidades distritales (SDA, EAAB, UAESP)',ALC:'Alcaldía Local',GER:'Gerencia de Corabastos',COMR:'Comerciantes',COT:'Coteros',ORGR:'Recicladores organizados',COLA:'Colectivos ambientales',GUAR:'Guardianía de La Vaca',JAC:'Juntas de Acción Comunal',HUE:'Huertas y comedores'};
const RANK={
 hoy:{n:'Hoy: un solo orden',o:['ent','ALC','GER','COMR','JAC','COLA','ORGR','HUE','COT','GUAR'],t:'Hoy el orden es el mismo para cualquier asunto: entidades y Alcaldía arriba, quienes trabajan abajo. La guardianía del humedal no existe. Es una homoarquía: un solo modo de ordenar.'},
 agua:{n:'Agua y humedal',o:['GUAR','COLA','JAC','ent','ALC','HUE','ORGR','COMR','GER','COT'],t:'En agua encabezan quienes custodian y miden el humedal. Las entidades siguen ejecutando obras, pero con calendario discutido en el núcleo de agua.'},
 org:{n:'Orgánicos',o:['ORGR','COT','COMR','HUE','GUAR','GER','ALC','JAC','ent','COLA'],t:'En residuos encabezan quienes separan, cargan y transforman el material. La guardianía conserva la llave ecológica aunque no encabece.'},
 abasto:{n:'Abastecimiento',o:['COMR','COT','GER','HUE','ORGR','JAC','ALC','ent','COLA','GUAR'],t:'En abastecimiento encabezan comerciantes y coteros junto a la gerencia: la central no se decide solo desde la asamblea de accionistas.'},
 cuidado:{n:'Cuidado',o:['JAC','HUE','COLA','ORGR','COT','ALC','ent','COMR','GER','GUAR'],t:'En cuidado encabezan juntas, huertas y comedores, que sostienen la alimentación y el barrio.'}
};
const rankEl=$('#rank'),items={};
Object.entries(RA).forEach(([k,n])=>{const d=document.createElement('div');d.className='ri';d.setAttribute('role','listitem');d.innerHTML=`<span class="pos"></span><span>${n}</span><span class="bar"></span>`;rankEl.appendChild(d);items[k]=d});
function setRank(key){
 const R=RANK[key];const step=mobile()?50:50;
 R.o.forEach((k,i)=>{const it=items[k];it.style.transform=`translateY(${12+i*step}px)`;it.querySelector('.pos').textContent=i+1;
  const absent=key==='hoy'&&k==='GUAR';it.classList.toggle('lead',i<2&&!absent);it.style.opacity=absent?.35:1;
  it.querySelector('.bar').style.width=absent?'0px':Math.max(8,90-i*9)+'px'});
 $('#rankText').textContent=R.t;
 document.querySelectorAll('#rankChips .chip').forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===key));
}
$('#rankChips').innerHTML=Object.entries(RANK).map(([k,v])=>`<button class="chip" data-k="${k}">${v.n}</button>`).join('');
document.querySelectorAll('#rankChips .chip').forEach(b=>b.onclick=()=>setRank(b.dataset.k));
setRank('hoy');setTimeout(()=>setRank('agua'),1600);

$('#ecoCards').innerHTML=C3.ECO.map(m=>`<div class="card"><span class="k" style="color:${m.c}">${m.n}</span><p>${m.rango}</p></div>`).join('');
$('#principios').innerHTML=C3.PRINCIPIOS.map((p,i)=>`<div class="card"><span class="k">${i+1}</span><h4>${p.t}</h4><p>${p.d}</p></div>`).join('');
$('#reparto').innerHTML=C3.REPARTO.map(r=>`<div class="card"><span class="k">${r.q}</span><p>${r.a}</p></div>`).join('');
$('#objetivos tbody').innerHTML=C3.OBJETIVOS.map(o=>`<tr><td><b>${o.o}</b></td><td>${o.i}</td><td>${o.hoy}</td><td>${o.meta}</td></tr>`).join('');
const T=C3.TRANSICION;
$('#trans').innerHTML=`
 <div class="card"><span class="k">Hoy · diagnóstico</span><p>${T.hoy}</p><h4 style="margin-top:16px">Debe dejar de reproducirse</h4><ul class="plain">${T.dejar.map(x=>`<li>${x}</li>`).join('')}</ul></div>
 <div class="card"><span class="k">Transición</span><p style="margin-bottom:14px">${T.inicio}</p><div class="flow">${T.secuencia.map((s,i)=>`<div class="st"><i>${i+1}</i><div><b>${s.t}</b><span>${s.d}</span></div></div>`).join('')}</div>
  <div class="grid g3" style="margin-top:18px;gap:12px"><div><h4 style="color:var(--red)">Impulsan</h4><ul class="plain">${T.impulsan.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><h4>Recursos en disputa</h4><ul class="plain">${T.disputa.map(x=>`<li>${x}</li>`).join('')}</ul></div><div><h4 style="color:var(--mute)">Resisten</h4><ul class="plain">${T.resisten.map(x=>`<li>${x}</li>`).join('')}</ul></div></div></div>
 <div class="card" style="background:#1a1512;border-color:#3a2a20"><span class="k">Organización propuesta</span><h4 style="margin-top:4px">Debe construirse</h4><ul class="plain">${T.construir.map(x=>`<li>${x}</li>`).join('')}</ul></div>`;
$('#mecanismos tbody').innerHTML=C3.MECANISMOS.map(m=>`<tr><td><b>${m.m}</b></td><td>${m.origen}</td></tr>`).join('');

/* ================= 2 · RED ================= */
const SH={ALC:'Alcaldía Local',ALCC:'Alcalde(sa) local',FDL:'Fondo Desarrollo Local',JAL:'JAL',SDA:'Sec. Ambiente',EAAB:'Acueducto',UAESP:'UAESP',CLI:'Ciudad Limpia',COMP:'Compactadores',COR:'Corabastos S.A.',ASA:'Asamblea accionistas',GER:'Gerencia Corabastos',COMR:'Comerciantes',COMI:'Comité comerciantes',COT:'Coteros',TRA:'Transportadoras',CAMC:'Camiones de carga',SDM:'Sec. Movilidad',RED:'Alcantarillado',HUM:'Humedal La Vaca',VEC:'Vecinos La Vaca',REC:'Recicladores',ORGR:'Org. recicladores',JAC:'Juntas (188)',COLA:'Colectivos ambientales',HUE:'Huertas (811)',JBB:'Jardín Botánico',MESA:'Mesa Ecosocial',NRES:'Núcleo orgánicos',NAGU:'Núcleo agua',VOC:'Vocerías revocables',GUAR:'Guardianía',FON:'Fondo común',PLA:'Planta de compost'};
const POS={SDM:[80,55],JAL:[300,55],ALCC:[430,55],FDL:[590,55],UAESP:[740,55],SDA:[910,55],
 TRA:[80,150],ALC:[430,150],VOC:[590,150],CLI:[740,150],EAAB:[910,150],
 CAMC:[80,250],GER:[230,250],JAC:[370,250],MESA:[520,250],COMP:[740,250],RED:[910,250],
 ASA:[80,350],COR:[230,350],NRES:[400,350],NAGU:[600,350],GUAR:[760,350],HUM:[910,350],
 COMI:[100,455],COMR:[250,455],FON:[400,455],PLA:[540,455],COLA:[700,455],VEC:[910,455],
 COT:[160,565],REC:[330,565],ORGR:[470,565],HUE:[620,565],JBB:[770,565]};
const TPC={persona:'#C9C2B6',cargo:'#E3A549',entidad:'#F1ECE2',colectivo:'#8FC59A',objeto:'#8DB3D9',operador:'#B9A3E8',regulador:'#E8C27A',nohumano:'#6ea8d6',instancia:'#D2553A'};
const TPN={persona:'Personas',cargo:'Cargo',entidad:'Entidad',colectivo:'Colectivo u organización',objeto:'Objeto técnico',operador:'Operador',regulador:'Regulador',nohumano:'Ecosistema (no humano)',instancia:'Instancia de decisión'};
const KS={formal:{n:'Atribución formal',c:'#9A958C',d:'6 5',w:1.4},efectiva:{n:'Influencia efectiva',c:'#D2553A',d:null,w:3.4},coop:{n:'Cooperación',c:'#F1ECE2',d:null,w:1.5},conflicto:{n:'Conflicto y costos',c:'#E0644A',d:'1.5 4',w:2},
 flujo:{n:'Flujo',c:'#E3A549',d:null,w:1.4}};
const FC={info:'#8DB3D9',rec:'#E3A549',trab:'#8FC59A'};const FN={info:'información',rec:'recursos',trab:'trabajo'};
const edgeColor=e=>e.k==='flujo'?FC[e.f]:KS[e.k].c;
const MOB=mobile();
const place=id=>{const [x,y]=POS[id];return MOB?[75+(y-55)/510*490,55+(x-80)/830*860]:[x,y]};
const N=C3.NODES.map(n=>{const p=place(n.id);return {...n,x:p[0],y:p[1]}});const NB=new Map(N.map(n=>[n.id,n]));
const E=C3.EDGES.map((e,i)=>({...e,i}));
const net=d3.select('#net').attr('viewBox',MOB?'0 0 640 1000':'0 0 1000 640').attr('preserveAspectRatio','xMidYMid meet');
const nd=net.append('defs');
const mk=(id,c)=>nd.append('marker').attr('id',id).attr('viewBox','0 0 10 10').attr('refX',9).attr('refY',5).attr('markerWidth',6).attr('markerHeight',6).attr('orient','auto').attr('markerUnits','userSpaceOnUse').call(m=>m.append('path').attr('d','M0 1L9 5L0 9z').attr('fill',c));
['formal','efectiva','coop','conflicto'].forEach(k=>mk('m-'+k,KS[k].c));Object.entries(FC).forEach(([k,c])=>mk('m-f'+k,c));
nd.selectAll('marker').attr('markerWidth',9).attr('markerHeight',9);
const gE=net.append('g'),gK=net.append('g'),gN=net.append('g');
let ns={state:'hoy',kind:'all',sel:null};
const R=MOB?24:19;
function ePath(e){const s=NB.get(e.s),t=NB.get(e.t);const dx=t.x-s.x,dy=t.y-s.y,d=Math.hypot(dx,dy)||1;
 const back=E.some(o=>o.s===e.t&&o.t===e.s&&o.en!==(e.en==='hoy'?'prop':e.en==='prop'?'hoy':'x'));
 const k=back?.18:.1;const mx=(s.x+t.x)/2-dy*k,my=(s.y+t.y)/2+dx*k;
 const a=Math.atan2(my-s.y,mx-s.x),b=Math.atan2(t.y-my,t.x-mx);
 e.mid=[.25*s.x+.5*mx+.25*t.x,.25*s.y+.5*my+.25*t.y];
 return `M${s.x+Math.cos(a)*(R+2)},${s.y+Math.sin(a)*(R+2)}Q${mx},${my} ${t.x-Math.cos(b)*(R+4)},${t.y-Math.sin(b)*(R+4)}`}
const inState=x=>x.en==='ambos'||x.en===ns.state;
function drawNet(){
 const nodes=N.filter(inState),ids=new Set(nodes.map(n=>n.id));
 const edges=E.filter(e=>inState(e)&&ids.has(e.s)&&ids.has(e.t)&&(ns.kind==='all'||e.k===ns.kind));
 const es=gE.selectAll('path').data(edges,e=>e.i).join(
   en=>en.append('path').attr('class','edge').attr('opacity',0).call(p=>p.transition().duration(500).attr('opacity',1)),
   up=>up,ex=>ex.transition().duration(300).attr('opacity',0).remove());
 es.attr('d',ePath).attr('stroke',edgeColor).attr('stroke-width',e=>(e.k==='flujo'?KS.flujo.w:KS[e.k].w)*(e.k==='efectiva'?(0.6+e.w*.2):(0.7+e.w*.15)))
   .attr('stroke-dasharray',e=>KS[e.k].d).attr('stroke-linecap','round').attr('marker-end',e=>`url(#m-${e.k==='flujo'?'f'+e.f:e.k})`)
   .on('mousemove',(ev,e)=>showTip(`<b>${esc(SH[e.s])} → ${esc(SH[e.t])}</b><br>${KS[e.k].n}${e.k==='flujo'?' de '+FN[e.f]:''} · ${e.st} · intensidad ${e.w}<br>${tagEv(e.ev)}${esc(e.m)}${e.src?' ('+e.src+')':''}${e.key?'<br><b>Puede detener el flujo</b>':''}`,ev)).on('mouseleave',hideTip);
 const ks=gK.selectAll('g').data(edges.filter(e=>e.key),e=>e.i).join(en=>{const g=en.append('g').attr('class','keyi');g.append('circle').attr('r',10).attr('fill','#0d0f11').attr('stroke','#D2553A').attr('stroke-width',1.4);g.append('use').attr('href','#i-key').attr('x',-7).attr('y',-7).attr('width',14).attr('height',14).style('color','#D2553A');return g},up=>up,ex=>ex.remove());
 ks.attr('transform',e=>`translate(${e.mid[0]},${e.mid[1]})`);
 const ndSel=gN.selectAll('g.node').data(nodes,n=>n.id).join(en=>{const g=en.append('g').attr('class','node').attr('tabindex',0).attr('role','button').attr('aria-label',n=>n.n).attr('opacity',0);
   g.append('circle').attr('class','ring').attr('r',R);g.append('use').attr('class','ico');g.append('text').attr('text-anchor','middle').attr('y',R+(MOB?18:14));
   g.transition().duration(500).attr('opacity',1);return g},up=>up,ex=>ex.transition().duration(300).attr('opacity',0).remove());
 ndSel.attr('transform',n=>`translate(${n.x},${n.y})`);
 ndSel.select('.ring').attr('fill','#15181b').attr('stroke',n=>TPC[n.tp]).attr('stroke-width',1.8).attr('stroke-dasharray',n=>n.en==='prop'?'4 3':null);
 ndSel.select('.ico').attr('href',n=>'#i-'+n.tp).attr('x',MOB?-13:-10).attr('y',MOB?-13:-10).attr('width',MOB?26:20).attr('height',MOB?26:20).style('color',n=>TPC[n.tp]);
 ndSel.select('text').each(function(n){const t=d3.select(this);t.selectAll('*').remove();
   if(!MOB){t.text(SH[n.id]);return}
   const w=SH[n.id].split(' ');const mid=Math.ceil(w.length/2);[w.slice(0,mid).join(' '),w.slice(mid).join(' ')].filter(Boolean).forEach((l,i)=>t.append('tspan').attr('x',0).attr('dy',i?17:0).text(l))});
 ndSel.on('click',(ev,n)=>{ns.sel=n;sideNode(n);focusNode(n)}).on('keydown',(ev,n)=>{if(ev.key==='Enter'){ns.sel=n;sideNode(n);focusNode(n)}})
   .on('mouseenter',(ev,n)=>{if(!ns.sel)focusNode(n)}).on('mouseleave',()=>{if(!ns.sel)focusNode(null)});
 if(ns.sel&&!ids.has(ns.sel.id)){ns.sel=null;sideDefault()}
 if(ns.sel)focusNode(ns.sel);else focusNode(null);
}
function focusNode(n){
 net.classed('dim',!!n);if(!n){gN.selectAll('g.node').classed('on',false);gE.selectAll('path').classed('on',false);gK.selectAll('g').classed('on',false);return}
 const nb=new Set([n.id]);gE.selectAll('path').each(e=>{if(e.s===n.id)nb.add(e.t);if(e.t===n.id)nb.add(e.s)});
 gN.selectAll('g.node').classed('on',d=>nb.has(d.id));gE.selectAll('path').classed('on',e=>e.s===n.id||e.t===n.id);gK.selectAll('g').classed('on',e=>e.s===n.id||e.t===n.id);
}
net.on('click',ev=>{if(ev.target.tagName==='svg'){ns.sel=null;focusNode(null);sideDefault()}});
function sideDefault(){
 $('#netside').innerHTML=`<span class="k">${ns.state==='hoy'?'Hoy · diagnóstico':'Propuesta heterárquica'}</span><h4>${ns.state==='hoy'?'Una escalera con afectados sin voz':'Núcleos por asunto con mandatos revocables'}</h4>
 <p style="font-size:14.5px;color:var(--soft)">${ns.state==='hoy'?'Las llaves que pueden detener los flujos están en entidades y en la asamblea de Corabastos. El humedal, los vecinos y los recicladores reciben conflictos y costos sin un canal vinculante.':'Aparecen la mesa, los núcleos, las vocerías, la guardianía, el fondo y la planta (borde punteado). Algunas llaves siguen fuera: permiso de la SDA, suelo de Corabastos, contratación de la Alcaldía.'}</p>
 <p style="font-size:13.5px;color:var(--mute);margin-top:14px">Toca un actor para ver su ficha: ámbito, intereses, recursos, trabajo, decisiones y a quién afecta. Pasa sobre una línea para ver su mecanismo y su origen.</p>`;
}
function sideNode(n){
 const rel=E.filter(e=>inState(e)&&(e.s===n.id||e.t===n.id));
 $('#netside').innerHTML=`<span class="k" style="color:${TPC[n.tp]}">${TPN[n.tp]}${n.en==='prop'?' · propuesto':''}</span><h4>${esc(n.n)}</h4>
 <dl class="facts"><dt>Ámbito</dt><dd>${esc(n.am)}</dd><dt>Intereses</dt><dd>${esc(n.int)}</dd><dt>Recursos</dt><dd>${esc(n.rec)}</dd><dt>Trabajo</dt><dd>${esc(n.tr)}</dd><dt>Decisiones</dt><dd>${esc(n.dec)}</dd><dt>Afecta a</dt><dd>${esc(n.af)}</dd></dl>
 ${n.div?`<p style="font-size:13.5px;color:var(--ochre);margin:12px 0 0">${esc(n.div)}</p>`:''}
 <h4 style="margin-top:16px;font-size:14px">${rel.length} relaciones</h4>
 <ul class="plain">${rel.map(e=>`<li><b style="color:${edgeColor(e)};font-family:var(--sans)">${e.s===n.id?'→ '+SH[e.t]:'← '+SH[e.s]}</b> · ${KS[e.k].n}${e.k==='flujo'?' de '+FN[e.f]:''}${e.key?' · puede detener':''}<br>${tagEv(e.ev)}${esc(e.m)}${srcLink(e.src)}</li>`).join('')}</ul>`;
}
document.querySelectorAll('#stateChips .chip').forEach(b=>b.onclick=()=>{ns.state=b.dataset.s;document.querySelectorAll('#stateChips .chip').forEach(x=>x.setAttribute('aria-pressed',x===b));drawNet();if(!ns.sel)sideDefault()});
$('#kindChips').innerHTML=[['all','Todas'],...Object.entries(KS).map(([k,v])=>[k,k==='flujo'?'Flujos':v.n])].map(([k,n])=>`<button class="chip" data-k="${k}" aria-pressed="${k==='all'}">${n}</button>`).join('');
document.querySelectorAll('#kindChips .chip').forEach(b=>b.onclick=()=>{ns.kind=b.dataset.k;document.querySelectorAll('#kindChips .chip').forEach(x=>x.setAttribute('aria-pressed',x===b));drawNet()});
const lineSw=(c,d,w,m)=>`<svg width="44" height="12"><path d="M2 6H34" stroke="${c}" stroke-width="${w}" ${d?`stroke-dasharray="${d}"`:''} stroke-linecap="round"/><path d="M34 1.5L42 6L34 10.5z" fill="${c}"/></svg>`;
$('#netLegend').innerHTML=[...Object.entries(KS).filter(([k])=>k!=='flujo').map(([k,v])=>`<div>${lineSw(v.c,v.d,v.w)}${v.n}</div>`),...Object.entries(FC).map(([k,c])=>`<div>${lineSw(c,null,1.6)}Flujo de ${FN[k]}</div>`),
 `<div><svg width="44" height="22"><circle cx="22" cy="11" r="9" fill="#0d0f11" stroke="#D2553A"/><use href="#i-key" x="15" y="4" width="14" height="14" style="color:#D2553A"/></svg>Puede detener el flujo</div>`,
 ...Object.entries(TPN).map(([k,v])=>`<div><svg width="44" height="26"><circle cx="22" cy="13" r="11" fill="#15181b" stroke="${TPC[k]}" stroke-width="1.6"/><use href="#i-${k}" x="15" y="6" width="14" height="14" style="color:${TPC[k]}"/></svg>${v}</div>`),
 `<div><svg width="44" height="26"><circle cx="22" cy="13" r="11" fill="none" stroke="#C9C2B6" stroke-dasharray="4 3"/></svg>Actor propuesto</div>`,
 `<div style="grid-column:span 2">Grosor: intensidad 1 ocasional, 2 periódica, 3 continua o estructural.</div>`].join('');

// métricas
const COLL=new Set(['MESA','NRES','NAGU','GUAR','VOC','FON','COMI']);
const isColl=id=>COLL.has(id)||['colectivo','persona'].includes(NB.get(id).tp);
const INST=new Set(['instancia','entidad','cargo']);
function metrics(state){
 const nodes=N.filter(n=>n.en==='ambos'||n.en===state),ids=new Set(nodes.map(n=>n.id));
 const edges=E.filter(e=>(e.en==='ambos'||e.en===state)&&ids.has(e.s)&&ids.has(e.t));
 const ef=edges.filter(e=>e.k==='efectiva');const efC=ef.filter(e=>isColl(e.s)).length;
 const keys=edges.filter(e=>e.key);const kC=keys.filter(e=>isColl(e.s)).length;
 const voice=id=>edges.some(e=>e.s===id&&(e.k==='efectiva'||e.k==='formal'||(e.k==='flujo'&&e.f==='info'&&NB.get(e.t).tp==='instancia')));
 const repr=id=>edges.some(e=>e.t===id&&e.k==='coop'&&NB.get(e.s).tp==='instancia');
 const sinVoz=[...new Set(edges.filter(e=>e.k==='conflicto').map(e=>e.t))].filter(id=>!voice(id)&&!repr(id));
 // intermediación (no dirigida)
 const adj=new Map(nodes.map(n=>[n.id,new Set()]));edges.forEach(e=>{adj.get(e.s).add(e.t);adj.get(e.t).add(e.s)});
 const V=[...adj.keys()],CB=new Map(V.map(v=>[v,0]));
 V.forEach(s=>{const S=[],P=new Map(V.map(v=>[v,[]])),sg=new Map(V.map(v=>[v,0])),d=new Map(V.map(v=>[v,-1]));sg.set(s,1);d.set(s,0);const Q=[s];
  while(Q.length){const v=Q.shift();S.push(v);adj.get(v).forEach(w=>{if(d.get(w)<0){Q.push(w);d.set(w,d.get(v)+1)}if(d.get(w)===d.get(v)+1){sg.set(w,sg.get(w)+sg.get(v));P.get(w).push(v)}})}
  const de=new Map(V.map(v=>[v,0]));while(S.length){const w=S.pop();P.get(w).forEach(v=>de.set(v,de.get(v)+sg.get(v)/sg.get(w)*(1+de.get(w))));if(w!==s)CB.set(w,CB.get(w)+de.get(w))}});
 const nn=V.length;V.forEach(v=>CB.set(v,CB.get(v)/((nn-1)*(nn-2))));
 const top=[...CB].sort((a,b)=>b[1]-a[1]).slice(0,3);
 return {n:nodes.length,e:edges.length,ef:ef.length,efC,keys:keys.length,kC,sinVoz,top,keyHold:[...new Set(keys.filter(e=>!isColl(e.s)).map(e=>SH[e.s]))]};
}
const MH=metrics('hoy'),MP=metrics('prop');
const pc=(a,b)=>b?Math.round(a/b*100)+' %':'—';
$('#metricExplain').innerHTML='Un nodo es un actor que interviene en el flujo de alimentos, residuos o agua alrededor de Corabastos y La Vaca; una línea es una relación con tipo y dirección. Influencia efectiva: quién mueve de hecho una decisión. Llave: quien puede detener un flujo. Afectado sin voz: quien recibe conflicto o costos sin una relación que llegue a una instancia de decisión ni un representante. Intermediación: cuántos caminos cortos entre actores pasan por uno; mide qué actor hace de puente, no cuánto poder tiene.';
$('#metrics').innerHTML=`<span class="h">Medida</span><span class="h">Hoy</span><span class="h">Propuesta</span>
 <span>Actores · relaciones</span><b>${MH.n} · ${MH.e}</b><b>${MP.n} · ${MP.e}</b>
 <span>Influencia efectiva en manos colectivas</span><b>${pc(MH.efC,MH.ef)}</b><b>${pc(MP.efC,MP.ef)}</b>
 <span>Llaves en manos colectivas</span><b>${pc(MH.kC,MH.keys)}</b><b>${pc(MP.kC,MP.keys)}</b>
 <span>Afectados sin voz</span><b>${MH.sinVoz.length}</b><b>${MP.sinVoz.length}</b>
 <span>Mayor puente</span><b>${SH[MH.top[0][0]]}</b><b>${SH[MP.top[0][0]]}</b>`;
$('#readings').innerHTML=`
 <div class="card"><span class="k">Concentración</span><p>Hoy ${pc(MH.ef-MH.efC,MH.ef)} de la influencia efectiva la ejercen entidades, cargos o la asamblea de Corabastos. En la propuesta baja a ${pc(MP.ef-MP.efC,MP.ef)}, pero las llaves externas no desaparecen: ${MP.keyHold.join(', ')}.</p></div>
 <div class="card"><span class="k">Puentes</span><p>Hoy el mayor puente es ${SH[MH.top[0][0]]}, seguido de ${SH[MH.top[1][0]]}. En la propuesta pasan a ser ${SH[MP.top[0][0]]} y ${SH[MP.top[1][0]]}: si ese núcleo falla, la red vuelve a depender de las entidades.</p></div>
 <div class="card"><span class="k">Exclusiones</span><p>Hoy hay ${MH.sinVoz.length} afectados sin voz: ${MH.sinVoz.map(i=>SH[i]).join(', ')}. En la propuesta todos tienen un canal o un representante, pero eso es una hipótesis: depende de que la mesa funcione y la Alcaldía coopere.</p></div>`;
drawNet();sideDefault();

/* ================= 3 · TRAYECTO ================= */
$('#decQ').textContent=C3.DECISION;
const STI={agenda:'<path d="M4 10v4h3l6 4V6L7 10z" fill="#fff"/><path d="M16 9a4 4 0 0 1 0 6" stroke="#fff" stroke-width="2" fill="none"/>',delib:'<path d="M3 5h12v8H8l-4 3v-3H3z" fill="#fff"/><path d="M17 9h4v8h-1v3l-3-3h-5v-2" fill="#fff"/>',resol:'',ejec:'',rect:'<circle cx="10" cy="10" r="6" stroke="#fff" stroke-width="2.6" fill="none"/><path d="M14.5 14.5 20 20" stroke="#fff" stroke-width="2.8" stroke-linecap="round"/>'};
let ds={step:'agenda',state:'prop'};
$('#steps').innerHTML=C3.STEPS.map(s=>`<button class="step" data-k="${s.k}" aria-pressed="${s.k===ds.step}"><span class="ic"><svg width="34" height="34" viewBox="0 0 24 24">${s.k==='resol'?'<use href="#i-instancia" width="24" height="24" style="color:#fff"/>':s.k==='ejec'?'<use href="#i-operador" width="24" height="24" style="color:#fff"/>':STI[s.k]}</svg></span><span><b>${s.n}</b><span>${s.q}</span></span></button>`).join('');
const KV=[['quien','Quién'],['ent','Entradas'],['sal','Salidas'],['regla','Regla'],['esc','Escala'],['disp','Disputa']];
function drawStep(){
 const s=C3.STEPS.find(x=>x.k===ds.step);
 $('#stepCmp').innerHTML=['hoy','prop'].map(st=>`<div class="card" style="${st===ds.state?'border-color:#5a3a30':''}"><h4><span class="tag ${st==='hoy'?'t-hip':'t-prop'}">${st==='hoy'?'Hoy':'Propuesta'}</span>${s.n}</h4><dl class="kv">${KV.map(([k,n])=>`<dt>${n}</dt><dd>${esc(s[st][k])}</dd>`).join('')}</dl></div>`).join('');
 document.querySelectorAll('.step').forEach(b=>b.setAttribute('aria-pressed',b.dataset.k===ds.step));
 drawScale(s);
}
document.querySelectorAll('.step').forEach(b=>b.onclick=()=>{ds.step=b.dataset.k;drawStep()});
document.querySelectorAll('#decState .chip').forEach(b=>b.onclick=()=>{ds.state=b.dataset.s;document.querySelectorAll('#decState .chip').forEach(x=>x.setAttribute('aria-pressed',x===b));drawDecide();drawStep()});
function drawDecide(){
 const H=ds.state==='hoy';
 const dec=H?['Asamblea de accionistas','Gerencia de Corabastos','SDA (permiso)']:['Núcleo de orgánicos (incluye a quien trabaja)','Guardianía (llave ecológica)'];
 const eje=H?['Coteros','Recicladores sin pago','Ciudad Limpia']:['Organizaciones de recicladores','Coteros con pago','Planta de compost'];
 const ext=H?'Asamblea fuera de Kennedy: decide inversión y uso del suelo':'Siguen fuera: suelo de Corabastos, permiso SDA, contrato de la Alcaldía';
 $('#decideSvg').innerHTML=`<rect x="0" y="0" width="620" height="120" rx="10" fill="#22272c"/><rect x="0" y="120" width="620" height="130" rx="10" fill="#181b1e"/>
 <text x="18" y="38" font-family="Instrument Sans" font-weight="600" font-size="17" fill="#E3A549">Decide</text><text x="18" y="160" font-family="Instrument Sans" font-weight="600" font-size="17" fill="#E3A549">Ejecuta</text>
 ${dec.map((d,i)=>`<text x="110" y="${36+i*24}" font-family="Instrument Sans" font-size="14" fill="#F1ECE2">${d}</text>`).join('')}
 ${eje.map((d,i)=>`<text x="110" y="${158+i*24}" font-family="Instrument Sans" font-size="14" fill="#F1ECE2">${d}</text>`).join('')}
 <path d="M90 95 V140" stroke="#F1ECE2" stroke-width="2" marker-end="url(#ahd)"/><text x="98" y="112" font-family="Instrument Sans" font-size="12" fill="#C9C2B6">${H?'traslada trabajo, cuidado y mantenimiento':'quien ejecuta delibera antes de aprobar'}</text>
 <g transform="translate(470,22)"><use href="#i-entidad" width="30" height="30" style="color:#E3A549"/></g>
 <foreignObject x="430" y="56" width="180" height="70"><div xmlns="http://www.w3.org/1999/xhtml" style="font:400 12.5px/1.35 Instrument Sans;color:#C9C2B6">${ext}</div></foreignObject>
 <path d="M520 128 V205 H${H?330:360}" stroke="#E3A549" stroke-width="2.4" fill="none" marker-end="url(#ahd2)"/><text x="${H?400:420}" y="228" font-family="Instrument Sans" font-size="12.5" fill="#E3A549">controla la ejecución</text>
 <defs><marker id="ahd" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1L9 5L0 9z" fill="#F1ECE2"/></marker><marker id="ahd2" viewBox="0 0 10 10" refX="8" refY="5" markerWidth="7" markerHeight="7" orient="auto"><path d="M0 1L9 5L0 9z" fill="#E3A549"/></marker></defs>`;
}
const SC=[['Región y Nación',112],['Ciudad',92],['Localidad',70],['Barrio y central',46],['Hogar y calle',22]];
const SCMAP={'Nación y Distrito':0,'Ciudad':1,'Localidad':2,'Localidad y central':2,'Central y barrios':3,'Cuenca local':3};
function drawScale(s){
 const hi=SCMAP[s.hoy.esc]??1,pi=SCMAP[s.prop.esc]??2;
 $('#scaleSvg').innerHTML=SC.map(([n,r],i)=>`<circle cx="125" cy="125" r="${r}" fill="none" stroke="#D2553A" stroke-opacity="${.35+i*.12}" stroke-width="1.4"/><path d="M125 ${125-r} H232" stroke="#4b5056"/><text x="236" y="${129-r}" font-family="Instrument Sans" font-size="12" fill="#C9C2B6">${n}</text>`).join('')+
 `<circle cx="125" cy="125" r="5" fill="#D2553A"/>
 <circle cx="${125-SC[hi][1]*.7}" cy="${125+SC[hi][1]*.7}" r="8" fill="#8C877E"/><text x="${125-SC[hi][1]*.7+12}" y="${125+SC[hi][1]*.7+4}" font-family="Instrument Sans" font-size="12" fill="#8C877E">hoy</text>
 <circle cx="${125+SC[pi][1]*.7}" cy="${125+SC[pi][1]*.7}" r="8" fill="#E3A549"/><text x="${125+SC[pi][1]*.7-10}" y="${125+SC[pi][1]*.7+22}" font-family="Instrument Sans" font-size="12" fill="#E3A549">propuesta</text>`;
}
drawDecide();drawStep();

/* ================= 4 · MODELO CAUSAL ================= */
const MPOS={CAR:[20,20],ROT:[280,20],PAR:[20,200],DES:[280,200],CON:[20,380],TRB:[280,380],ACU:[20,560],APR:[280,560],DEP:[20,740],HUM:[280,740],ING:[20,920],AGE:[280,920]};
if(MOB){C3.VARS.forEach(v=>{v.x=MPOS[v.id][0];v.y=MPOS[v.id][1]})}
const cld=d3.select('#cld');if(MOB)cld.attr('viewBox','0 0 520 1000');const VB=new Map(C3.VARS.map(v=>[v.id,v]));
const VW=MOB?220:180,VH=MOB?56:48;
const cd=cld.append('defs');
cd.append('marker').attr('id','cm').attr('viewBox','0 0 10 10').attr('refX',9).attr('refY',5).attr('markerWidth',8).attr('markerHeight',8).attr('orient','auto').append('path').attr('d','M0 1L9 5L0 9z').attr('fill','#C9573E');
cd.append('marker').attr('id','cmh').attr('viewBox','0 0 10 10').attr('refX',9).attr('refY',5).attr('markerWidth',8).attr('markerHeight',8).attr('orient','auto').append('path').attr('d','M0 1L9 5L0 9z').attr('fill','#F1ECE2');
const gl=cld.append('g'),gv=cld.append('g'),glab=cld.append('g');
function boxPt(v,tx,ty){const cx=v.x+VW/2,cy=v.y+VH/2,dx=tx-cx,dy=ty-cy;const s=Math.min((VW/2+4)/Math.abs(dx||1e-6),(VH/2+4)/Math.abs(dy||1e-6));return[cx+dx*s,cy+dy*s]}
const L=C3.LINKS.map((l,i)=>{const a=VB.get(l.s),b=VB.get(l.t);const ax=a.x+VW/2,ay=a.y+VH/2,bx=b.x+VW/2,by=b.y+VH/2;
 const dx=bx-ax,dy=by-ay,d=Math.hypot(dx,dy);const back=C3.LINKS.some(o=>o.s===l.t&&o.t===l.s);const k=back?.22:.16;
 const mx=(ax+bx)/2-dy*k,my=(ay+by)/2+dx*k;const p0=boxPt(a,mx,my),p1=boxPt(b,mx,my);
 const q=t=>[(1-t)*(1-t)*p0[0]+2*(1-t)*t*mx+t*t*p1[0],(1-t)*(1-t)*p0[1]+2*(1-t)*t*my+t*t*p1[1]];
 return {...l,i,d:`M${p0[0]},${p0[1]}Q${mx},${my} ${p1[0]},${p1[1]}`,sp:q(.8),mp:q(.5)}});
gl.selectAll('path').data(L).join('path').attr('class','lk').attr('d',l=>l.d).attr('marker-end','url(#cm)').attr('stroke-width',2)
 .style('cursor','pointer').on('click',(e,l)=>sideLink(l)).on('mousemove',(e,l)=>showTip(`<b>${VB.get(l.s).n} ${l.sg==='+'?'→ (+)':'→ (−)'} ${VB.get(l.t).n}</b><br>${tagEv(l.ev)}${esc(l.m)}${l.dl?'<br>Con retardo':''}`,e)).on('mouseleave',hideTip);
gl.selectAll('path.hit').data(L).join('path').attr('class','hit').attr('d',l=>l.d).attr('stroke','transparent').attr('stroke-width',14).attr('fill','none').style('cursor','pointer')
 .on('click',(e,l)=>sideLink(l)).on('mousemove',(e,l)=>showTip(`<b>${VB.get(l.s).n} ${l.sg==='+'?'→ (+)':'→ (−)'} ${VB.get(l.t).n}</b><br>${tagEv(l.ev)}${esc(l.m)}${l.dl?'<br>Con retardo':''}`,e)).on('mouseleave',hideTip);
glab.selectAll('text.sg').data(L).join('text').attr('class','sg').attr('x',l=>l.sp[0]+8).attr('y',l=>l.sp[1]-6).text(l=>l.sg==='+'?'+':'−');
glab.selectAll('g.dl').data(L.filter(l=>l.dl)).join('g').attr('class','dl').attr('transform',l=>{const a=VB.get(l.s),b=VB.get(l.t);const ang=Math.atan2((b.y-a.y),(b.x-a.x))*180/Math.PI;return `translate(${l.mp[0]},${l.mp[1]}) rotate(${ang+90})`})
 .html('<path d="M-9 -4H9M-9 4H9" stroke="#F1ECE2" stroke-width="2.4"/>');
const gvs=gv.selectAll('g').data(C3.VARS).join('g').attr('class','var').attr('transform',v=>`translate(${v.x},${v.y})`).on('click',(e,v)=>sideVar(v));
gvs.append('rect').attr('width',VW).attr('height',VH).attr('rx',10);
gvs.append('text').attr('x',VW/2).attr('y',VH/2+4.5).attr('text-anchor','middle').text(v=>v.n);
// etiquetas de bucles
C3.LOOPS.forEach(lp=>{const vs=[...new Set(lp.path)].map(id=>VB.get(id));const cx=d3.mean(vs,v=>v.x+VW/2),cy=d3.mean(vs,v=>v.y+VH/2);
 const off=MOB?({R1:[70,60],B1:[0,-30],B2:[0,30],R2:[0,60],B3:[0,-50]}[lp.id]||[0,0]):({R1:[0,0],B1:[10,-40],B2:[-30,0],R2:[-40,70],B3:[40,40]}[lp.id]||[0,0]);
 const g=glab.append('g').attr('class','loopl').attr('transform',`translate(${cx+off[0]},${cy+off[1]})`).style('cursor','pointer').on('click',()=>hlLoop(lp.id));
 g.append('circle').attr('r',21).attr('fill','#0d0f11').attr('stroke',lp.tp==='R'?'#D2553A':'#E3A549').attr('stroke-width',1.6);
 g.append('text').attr('text-anchor','middle').attr('y',5).attr('font-family','Instrument Sans').attr('font-weight',700).attr('font-size',14).attr('fill',lp.tp==='R'?'#D2553A':'#E3A549').text(lp.id);});
function hlLoop(id){const lp=C3.LOOPS.find(l=>l.id===id);const pairs=new Set();for(let i=0;i<lp.path.length-1;i++)pairs.add(lp.path[i]+'>'+lp.path[i+1]);
 cld.classed('dimmed',true);gl.selectAll('path.lk').classed('hl',l=>pairs.has(l.s+'>'+l.t)).attr('marker-end',l=>pairs.has(l.s+'>'+l.t)?'url(#cmh)':'url(#cm)');gvs.classed('hl',v=>lp.path.includes(v.id));
 document.querySelectorAll('#loopChips .chip').forEach(b=>b.setAttribute('aria-pressed',b.dataset.l===id));
 const neg=[...pairs].filter(p=>C3.LINKS.find(l=>l.s+'>'+l.t===p).sg==='-').length;
 $('#cldside').innerHTML=`<span class="k" style="color:${lp.tp==='R'?'#D2553A':'#E3A549'}">${lp.tp==='R'?'Bucle de refuerzo':'Bucle de equilibrio'} · ${lp.id}</span><h4>${lp.n}</h4><p style="font-size:14.5px;color:var(--soft)">${lp.d}</p><p style="font:400 13px var(--sans);color:var(--mute);margin-top:10px">Recorrido: ${lp.path.map(i=>VB.get(i).n).join(' → ')}. Tiene ${neg} relaciones negativas: ${neg%2?'número impar, por eso equilibra':'número par, por eso refuerza'}.</p>`;}
function clearCld(){cld.classed('dimmed',false);gl.selectAll('path.lk').classed('hl',false).attr('marker-end','url(#cm)');gvs.classed('hl',false)}
function sideVar(v){clearCld();const ins=C3.LINKS.filter(l=>l.t===v.id),outs=C3.LINKS.filter(l=>l.s===v.id);
 $('#cldside').innerHTML=`<span class="k">Variable</span><h4>${v.n}</h4><p style="font-size:14.5px;color:var(--soft)">${v.d}</p><h4 style="margin-top:14px;font-size:14px">La cambian</h4><ul class="plain">${ins.map(l=>`<li>${l.sg} ${VB.get(l.s).n}: ${tagEv(l.ev)}${esc(l.m)}</li>`).join('')||'<li>Ninguna en el modelo</li>'}</ul><h4 style="margin-top:12px;font-size:14px">Cambia a</h4><ul class="plain">${outs.map(l=>`<li>${l.sg} ${VB.get(l.t).n}: ${esc(l.m)}</li>`).join('')}</ul>`}
function sideLink(l){clearCld();$('#cldside').innerHTML=`<span class="k">Relación causal ${l.sg==='+'?'positiva':'negativa'}${l.dl?' con retardo':''}</span><h4>${VB.get(l.s).n} → ${VB.get(l.t).n}</h4><p style="font-size:14.5px;color:var(--soft)">${tagEv(l.ev)}${esc(l.m)}</p>`}
$('#cldside').innerHTML=`<span class="k">Clave</span><p style="font-size:14.5px;color:var(--soft)">+ las dos variables se mueven en el mismo sentido · − en sentido opuesto · ‖ retardo. Toca una variable, una flecha o un bucle. Cada flecha dice qué acción de qué actor la produce y si es documentada, hipótesis o propuesta.</p><p style="font-size:14px;color:var(--soft)">Hay ${C3.LINKS.filter(l=>l.ev==='hip').length} relaciones hipotéticas y ${C3.LINKS.filter(l=>l.ev==='prop').length} reglas propuestas; ninguna está documentada todavía con datos de Kennedy.</p>`;
$('#loopChips').innerHTML=C3.LOOPS.map(l=>`<button class="chip" data-l="${l.id}" aria-pressed="false">${l.id} · ${l.n}</button>`).join('')+'<button class="chip" data-l="" aria-pressed="false">Ver todo</button>';
document.querySelectorAll('#loopChips .chip').forEach(b=>b.onclick=()=>{if(b.dataset.l)hlLoop(b.dataset.l);else{clearCld();document.querySelectorAll('#loopChips .chip').forEach(x=>x.setAttribute('aria-pressed',false))}});
$('#timeline').innerHTML=C3.TIEMPO.map(t=>`<div class="card"><b>${t.t}</b><p>${t.d}</p></div>`).join('');

// simulación ilustrativa (36 meses)
function simulate(sc){
 let P=.15,C=.2,D=0,O=.05,F=0,H=1;const out=[];
 for(let m=0;m<=36;m++){
  if(sc==='hoy'){out.push({m,P:.15,H:1});continue}
  const ext=m>=18?2.2:1;                            // perturbación: retraso de la inversión externa
  const Tdem=.3+.5*O;                                // tareas crecen con el aprovechamiento
  const TRB=P;                                       // horas disponibles ∝ participación
  const rot=sc==='rot'?Math.min(1,D*2):0;            // regla de rotación
  const CAR=Tdem/Math.max(P,.05)*(1-.45*rot);
  D=Math.max(0,Math.min(1,D+.07*(CAR-1.1)-(CAR<1.1?.03*D:0)));
  const DEP=sc==='rot'?1-F:1;
  const cumpl=Math.min(1,TRB/Tdem);
  const ACU=Math.max(0,Math.min(1,.25+.65*cumpl-.18*DEP*ext));
  C+=.12*(ACU-C);
  P=Math.max(.03,Math.min(1,P+.1*(C-P)-.07*D));
  O+=.08*(Math.min(1,cumpl)*.85*(m>=1?1:0)-O);
  if(sc==='rot')F+=.05*(O-F);
  H+=.12*((1-.8*O)-H);
  out.push({m,P,H});
 }return out}
const SIMS=[{k:'hoy',n:'Hoy sin cambios',c:'#8C877E'},{k:'rot',n:'Heterarquía con rotación y fondo propio',c:'#E3A549'},{k:'sin',n:'Heterarquía sin rotación ni fondo',c:'#D2553A'}].map(s=>({...s,d:simulate(s.k)}));
function chart(key,title,yl){
 const w=560,h=260,m={l:44,r:16,t:30,b:36};const x=d3.scaleLinear([0,36],[m.l,w-m.r]),y=d3.scaleLinear([0,1.05],[h-m.b,m.t]);
 const svg=d3.create('svg').attr('viewBox',`0 0 ${w} ${h}`);
 svg.append('text').attr('x',m.l).attr('y',18).attr('font-family','Instrument Sans').attr('font-weight',600).attr('font-size',14).attr('fill','#F1ECE2').text(title);
 svg.append('g').attr('class','axis').attr('transform',`translate(0,${h-m.b})`).call(d3.axisBottom(x).ticks(6).tickFormat(d=>'mes '+d));
 svg.append('g').attr('class','axis').attr('transform',`translate(${m.l},0)`).call(d3.axisLeft(y).ticks(4));
 svg.append('line').attr('x1',x(18)).attr('x2',x(18)).attr('y1',m.t).attr('y2',h-m.b).attr('stroke','#D2553A').attr('stroke-dasharray','3 4');
 svg.append('text').attr('x',x(18)+6).attr('y',m.t+12).attr('font-family','Instrument Sans').attr('font-size',11.5).attr('fill','#D2553A').text('perturbación');
 SIMS.forEach(s=>{const p=svg.append('path').attr('fill','none').attr('stroke',s.c).attr('stroke-width',2.4).attr('d',d3.line().x(d=>x(d.m)).y(d=>y(d[key]))(s.d));
  const L=p.node().getTotalLength?0:0;});
 svg.append('text').attr('x',m.l).attr('y',h-6).attr('font-family','Instrument Sans').attr('font-size',11).attr('fill','#8C877E').text(yl);
 return svg.node();
}
const simEl=$('#sim');simEl.append(chart('P','Participación efectiva','0 = nadie sostiene trabajo · 1 = participación plena'));simEl.append(chart('H','Carga orgánica sobre La Vaca','índice: 1 = carga de hoy'));
// animación de dibujo
simEl.querySelectorAll('path[stroke-width="2.4"]').forEach(p=>{const L=p.getTotalLength();p.style.strokeDasharray=L;p.style.strokeDashoffset=L;});
new IntersectionObserver((en,ob)=>{en.forEach(e=>{if(e.isIntersecting){simEl.querySelectorAll('path[stroke-width="2.4"]').forEach(p=>{p.style.transition='stroke-dashoffset 2.2s ease';p.style.strokeDashoffset=0});ob.disconnect()}})},{threshold:.3}).observe(simEl);
$('#simNote').innerHTML=SIMS.map(s=>`<span style="color:${s.c};font-weight:600">${s.n}</span>`).join(' · ')+'. Reglas usadas: la participación sigue a la confianza con retardo y la reduce el desgaste; el desgaste crece cuando la carga por persona supera un umbral; la rotación reparte la carga; el fondo propio reduce la dependencia; en el mes 18 se retrasa la inversión externa. Son supuestos del grupo, no datos.';

/* ================= 5 · CONTRADICCIONES ================= */
$('#tens').innerHTML=C3.TENSIONES.map(t=>`<div class="card"><div class="ten"><span class="ab">${t.a}</span><span class="mid"><span>${t.q}</span></span><span class="ab">${t.b}</span><p>${t.k}</p></div></div>`).join('');
const CT=C3.CONTRA;
$('#contra').innerHTML=`<div class="grid g2"><div class="card" style="border-color:#5a3a30"><span class="k" style="color:var(--red)">Contradicción</span><h3>${CT.t}</h3><p><b style="color:var(--ink);font-family:var(--sans)">Cómo se produce.</b> ${CT.produce}</p><p style="margin-top:10px"><b style="color:var(--ink);font-family:var(--sans)">Quién la reproduce.</b> ${CT.reproducen}</p><h4 style="margin-top:14px">Señales para reconocerla</h4><ul class="plain">${CT.senales.map(s=>`<li>${s}</li>`).join('')}</ul></div>
 <div class="card"><span class="k">Transformación</span>${CT.cambios.map(c=>`<h4 style="margin-top:10px">${c.tp}</h4><p>${c.d}</p>`).join('')}<h4 style="margin-top:14px">Quién tendría que aceptarla</h4><p>${CT.aceptar}</p><h4 style="margin-top:14px">Cómo saber si se transformó o solo se desplazó</h4><p>${CT.evidencia}</p></div></div>`;
$('#escen').innerHTML=C3.ESCENARIOS.map(e=>`<div class="card"><span class="k">${e.t}</span><dl class="kv"><dt>Supuesto</dt><dd>${e.sup}</dd><dt>Qué pasaría</dt><dd>${e.res}</dd><dt>Límite</dt><dd>${e.lim}</dd></dl></div>`).join('');
$('#auto').textContent=C3.AUTO;$('#nohum').textContent=C3.NOHUMANO;

/* ================= 6 · SÍNTESIS ================= */
const ECOC=Object.fromEntries(C3.ECO.map(m=>[m.id,m]));
$('#efectos').innerHTML=C3.EFECTOS.map(e=>`<div class="card"><span class="k" style="color:${ECOC[e.m].c}">${ECOC[e.m].n}</span><p>${e.e}</p></div>`).join('');
$('#pend').innerHTML=C3.PENDIENTE.map(p=>`<li>${p}</li>`).join('');
try{
 const map=new maplibregl.Map({container:'map',style:'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',center:[-74.1570,4.6300],zoom:mobile()?12.6:13.4,pitch:0,attributionControl:{compact:false}});
 map.scrollZoom.disable();
 if(!mobile())map.addControl(new maplibregl.NavigationControl({showCompass:false}),'bottom-right');
 map.on('load',()=>Promise.all(['assets/territorio_kennedy.geojson','assets/territorio_puntos.geojson'].map(u=>fetch(u).then(r=>r.json()))).then(([K,P])=>{
  map.addSource('k',{type:'geojson',data:K});map.addLayer({id:'k',type:'line',source:'k',paint:{'line-color':'#F1ECE2','line-opacity':.6,'line-width':1.2}});
  const cora=[-74.1590,4.6295],vaca=[-74.16198,4.62870];
  const hu=P.features.filter(f=>f.properties.c==='huerta');
  const dist=f=>Math.hypot(f.geometry.coordinates[0]-cora[0],f.geometry.coordinates[1]-cora[1]);
  const near=[...hu].sort((a,b)=>dist(a)-dist(b)).slice(0,30);
  map.addSource('flows',{type:'geojson',data:{type:'FeatureCollection',features:near.map(f=>({type:'Feature',geometry:{type:'LineString',coordinates:[cora,f.geometry.coordinates]}}))}});
  map.addLayer({id:'flows',type:'line',source:'flows',paint:{'line-color':'#E3A549','line-width':1.2,'line-opacity':.7,'line-dasharray':[2,2]}});
  map.addSource('pts',{type:'geojson',data:{type:'FeatureCollection',features:P.features.filter(f=>f.properties.c==='huerta'||/^Comedor/.test(f.properties.n))}});
  map.addLayer({id:'pts',type:'circle',source:'pts',paint:{'circle-radius':['case',['==',['get','c'],'huerta'],2.6,5],'circle-color':['case',['==',['get','c'],'huerta'],'#8FC59A','#F09A84'],'circle-opacity':.9,'circle-stroke-width':['case',['==',['get','c'],'huerta'],0,1],'circle-stroke-color':'#111'}});
  map.addSource('hit',{type:'geojson',data:{type:'FeatureCollection',features:[{type:'Feature',geometry:{type:'Point',coordinates:cora},properties:{n:'Corabastos',c:'#E3A549'}},{type:'Feature',geometry:{type:'Point',coordinates:vaca},properties:{n:'Humedal La Vaca',c:'#6ea8d6'}}]}});
  map.addLayer({id:'hit-glow',type:'circle',source:'hit',paint:{'circle-radius':22,'circle-color':['get','c'],'circle-opacity':.18}});
  map.addLayer({id:'hit',type:'circle',source:'hit',paint:{'circle-radius':8,'circle-color':['get','c'],'circle-stroke-width':2,'circle-stroke-color':'#111'}});
  [[cora,'Corabastos','#E3A549',[0,-16]],[vaca,'Humedal La Vaca','#6ea8d6',[0,22]]].forEach(([ll,n,c,o])=>{const el=document.createElement('div');el.style.cssText=`font:600 12.5px Instrument Sans;color:${c};text-shadow:0 1px 6px #000;white-space:nowrap`;el.textContent=n;new maplibregl.Marker({element:el,offset:o}).setLngLat(ll).addTo(map)});
  const pop=new maplibregl.Popup({closeButton:false,closeOnClick:false});
  map.on('mousemove','pts',e=>{const p=e.features[0].properties;map.getCanvas().style.cursor='pointer';pop.setLngLat(e.lngLat).setHTML(`<div style="font:500 12.5px Instrument Sans;color:#111">${p.n}<br><span style="color:#555">${p.a||''}</span></div>`).addTo(map)});
  map.on('mouseleave','pts',()=>{map.getCanvas().style.cursor='';pop.remove()});
 }));
}catch(e){$('#map').textContent='No se pudo cargar el mapa.'}

/* ================= 7 · FUENTES ================= */
$('#fuentes tbody').innerHTML=Object.entries(C3.SRC).map(([k,s])=>`<tr><td><b>${k}</b></td><td>${s.tipo}</td><td>${esc(s.t)}</td><td>${s.u?`<a href="${s.u}" target="_blank" rel="noopener">Abrir</a>`:'Archivo del grupo'}</td></tr>`).join('');
const cnt=(arr,ev)=>arr.filter(x=>x.ev===ev).length;
$('#conteos').innerHTML=[['doc','Relaciones documentadas','Tienen fuente en la tabla.'],['hip','Hipótesis','Se deben verificar en campo o con datos antes de presentarlas como hechos.'],['prop','Decisiones de diseño','Lo que el grupo propone construir; no es evidencia de que funcione.']]
 .map(([k,n,d])=>`<div class="card"><span class="k">${n}</span><h3 style="font-size:34px;margin:0">${cnt(C3.EDGES,k)+cnt(C3.LINKS,k)}</h3><p>${d} Red: ${cnt(C3.EDGES,k)} · modelo causal: ${cnt(C3.LINKS,k)}.</p></div>`).join('');

/* navegación activa */
const links=[...document.querySelectorAll('#nav a')];
const obs=new IntersectionObserver(en=>{en.forEach(e=>{if(e.isIntersecting)links.forEach(a=>a.classList.toggle('on',a.getAttribute('href')==='#'+e.target.id))})},{rootMargin:'-45% 0px -50% 0px'});
document.querySelectorAll('section.mod').forEach(s=>obs.observe(s));
})();
