(function(){
const V=(new URLSearchParams(location.search).get('v'))||'het';
const MOB=window.matchMedia('(max-width:760px)').matches;
document.getElementById('v-'+V)?.classList.add('on');
const tip=document.getElementById('tip');
const showTip=(h,e)=>{tip.innerHTML=h;tip.style.display='block';tip.style.left=Math.min(e.clientX+14,innerWidth-270)+'px';tip.style.top=(e.clientY+14)+'px'};
const hideTip=()=>tip.style.display='none';
const esc=s=>String(s??'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const RED='#D2553A',OCH='#E3A549',INK='#F3F0EA',MUTE='#7E7A73';
const icon=(g,id,x,y,s,c)=>g.append('use').attr('href','#i-'+id).attr('x',x-s/2).attr('y',y-s/2).attr('width',s).attr('height',s).style('color',c);
const lines=(t,txt,lh)=>{const w=txt.split(' ');const m=Math.ceil(w.length/2);[w.slice(0,m).join(' '),w.slice(m).join(' ')].filter(Boolean).forEach((l,i)=>t.append('tspan').attr('x',t.attr('x')).attr('dy',i?lh:0).text(l))};
const setPressed=(sel,b)=>document.querySelectorAll(sel).forEach(x=>x.setAttribute('aria-pressed',x===b));

/* ================= HETERARQUÍA ================= */
if(V==='het'){
 const A=[['ent','Entidades distritales','entidad'],['ALC','Alcaldía Local','entidad'],['GER','Gerencia Corabastos','cargo'],['COMR','Comerciantes','colectivo'],['COT','Coteros','persona'],['ORGR','Recicladores organizados','colectivo'],['COLA','Colectivos ambientales','colectivo'],['GUAR','Guardianía del humedal','instancia'],['JAC','Juntas de Acción Comunal','colectivo'],['HUE','Huertas y comedores','colectivo']];
 const K={
  hoy:{n:'Hoy',c:'#9A958C',o:['ent','ALC','GER','COMR','JAC','COLA','ORGR','HUE','COT','GUAR'],t:'Hoy hay un solo orden para cualquier asunto: entidades arriba, quien trabaja abajo.'},
  agua:{n:'Agua',c:'#6ea8d6',o:['GUAR','COLA','JAC','ent','ALC','HUE','ORGR','COMR','GER','COT'],t:'En agua encabezan quienes custodian y miden el humedal.'},
  org:{n:'Orgánicos',c:'#e6956a',o:['ORGR','COT','COMR','HUE','GUAR','GER','ALC','JAC','ent','COLA'],t:'En orgánicos encabezan quienes separan, cargan y transforman.'},
  abasto:{n:'Abastecimiento',c:'#cdae67',o:['COMR','COT','GER','HUE','ORGR','JAC','ALC','ent','COLA','GUAR'],t:'En abastecimiento encabezan comerciantes y coteros.'},
  cuidado:{n:'Cuidado',c:'#7fbf8e',o:['JAC','HUE','COLA','ORGR','COT','ALC','ent','COMR','GER','GUAR'],t:'En cuidado encabezan juntas, huertas y comedores.'}
 };
 const W=MOB?400:1000,H=MOB?600:500;
 const svg=d3.select('#hetSvg').attr('viewBox',`0 0 ${W} ${H}`).attr('preserveAspectRatio','xMidYMid meet');
 const gl=svg.append('g'),gn=svg.append('g');
 const slot=(i,mode)=>{
  if(mode==='hoy') return MOB?{x:40+i*18,y:36+i*54,r:22-i*.8}:{x:80+i*93,y:70+i*38,r:40-i*2};
  if(MOB){if(i===0)return{x:200,y:80,r:44};if(i<3)return{x:i===1?110:290,y:200,r:32};const j=i-3;return j<4?{x:58+j*95,y:330,r:24}:{x:105+(j-4)*95,y:460,r:24}}
  if(i===0)return{x:500,y:110,r:62};if(i<3)return{x:i===1?320:680,y:200,r:44};const j=i-3;return{x:110+j*130,y:340,r:30};
 };
 const nodes=gn.selectAll('g').data(A).join('g');
 nodes.append('circle').attr('class','glow').attr('fill','none').attr('stroke-width',10).attr('stroke-opacity',.18);
 nodes.append('circle').attr('class','ring').attr('fill','#121624').attr('stroke-width',2);
 nodes.append('use').attr('class','ic').attr('href',d=>'#i-'+d[2]);
 nodes.append('text').attr('class','lbl').attr('text-anchor','middle').attr('font-size',MOB?11.5:13).attr('stroke-width',3).attr('x',0).each(function(d){lines(d3.select(this),d[1],MOB?13:15)});
 const pos=d3.select(gn.node()).append('g');
 let cur=null,auto=true;
 function set(k){cur=k;const R=K[k];
  document.getElementById('hetP').textContent=R.t;
  nodes.transition('pos').duration(900).ease(d3.easeCubicInOut).attr('transform',d=>{const s=slot(R.o.indexOf(d[0]),k);return `translate(${s.x},${s.y})`});
  nodes.each(function(d){const i=R.o.indexOf(d[0]),s=slot(i,k),g=d3.select(this),absent=k==='hoy'&&d[0]==='GUAR',lead=k!=='hoy'&&i<3;
   g.transition('op').duration(900).style('opacity',absent?.28:1);
   g.select('.ring').transition().duration(900).attr('r',s.r).attr('stroke',lead?R.c:(k==='hoy'&&i<3?'#C9C2B6':'#3b4258'));
   g.select('.glow').transition().duration(900).attr('r',s.r+6).attr('stroke',lead?R.c:'none');
   g.select('.ic').transition().duration(900).attr('x',-s.r*.5).attr('y',-s.r*.5).attr('width',s.r).attr('height',s.r).style('color',lead?R.c:(k==='hoy'&&i<3?INK:'#8f8a82'));
   const side=MOB&&k==='hoy';const tx=g.select('text');tx.attr('text-anchor',side?'start':'middle');tx.transition().duration(900).attr('y',side?-2:s.r+16);tx.selectAll('tspan').transition().duration(900).attr('x',side?s.r+10:0)});
  gl.selectAll('*').remove();
  if(k==='hoy'){const pts=A.map((_,i)=>slot(i,'hoy'));gl.append('path').attr('d',d3.line()(pts.map(p=>[p.x,p.y]))).attr('fill','none').attr('stroke','#3b4258').attr('stroke-dasharray','4 6');
   if(!MOB)gl.append('text').attr('x',80).attr('y',H-20).attr('fill',MUTE).attr('font-size',13).text('Homoarquía: el rango no cambia con el asunto');}
  else{const c=MOB?{x:200,y:80}:{x:500,y:110};
   gl.append('circle').attr('cx',c.x).attr('cy',c.y).attr('r',MOB?66:92).attr('fill','none').attr('stroke',R.c).attr('stroke-opacity',.35).attr('stroke-dasharray','3 7').attr('class','flowing');
   if(!MOB)gl.append('text').attr('x',80).attr('y',H-20).attr('fill',R.c).attr('font-size',13).text('Heterarquía: encabeza quien sostiene esa materia; el resto queda al mismo nivel');}
  setPressed('#hetChips .chip',document.querySelector(`#hetChips .chip[data-k="${k}"]`));
 }
 document.getElementById('hetChips').innerHTML=Object.entries(K).map(([k,v])=>`<button class="chip" data-k="${k}" style="--c:${v.c}"><i></i>${v.n}</button>`).join('');
 document.querySelectorAll('#hetChips .chip').forEach(b=>b.onclick=()=>{auto=false;set(b.dataset.k)});
 nodes.attr('transform',d=>{const s=slot(K.hoy.o.indexOf(d[0]),'hoy');return `translate(${s.x},${s.y})`});
 set('hoy');
 const seq=Object.keys(K);let si=0;
 if(!matchMedia('(prefers-reduced-motion:reduce)').matches) setInterval(()=>{if(!auto)return;si=(si+1)%seq.length;set(seq[si])},3600);
}

/* ================= INFLUENCIA ================= */
if(V==='inf'){
 const SH={ALC:'Alcaldía Local',ALCC:'Alcalde(sa) local',FDL:'Fondo Desarrollo Local',JAL:'JAL',SDA:'Sec. Ambiente',EAAB:'Acueducto',UAESP:'UAESP',CLI:'Ciudad Limpia',COMP:'Compactadores',COR:'Corabastos S.A.',ASA:'Asamblea accionistas',GER:'Gerencia Corabastos',COMR:'Comerciantes',COMI:'Comité comerciantes',COT:'Coteros',TRA:'Transportadoras',CAMC:'Camiones de carga',SDM:'Sec. Movilidad',RED:'Alcantarillado',HUM:'Humedal La Vaca',VEC:'Vecinos La Vaca',REC:'Recicladores',ORGR:'Org. recicladores',JAC:'Juntas (188)',COLA:'Colectivos ambientales',HUE:'Huertas (811)',JBB:'Jardín Botánico',MESA:'Mesa Ecosocial',NRES:'Núcleo orgánicos',NAGU:'Núcleo agua',VOC:'Vocerías revocables',GUAR:'Guardianía',FON:'Fondo común',PLA:'Planta de compost'};
 const POS={SDM:[80,55],JAL:[300,55],ALCC:[430,55],FDL:[590,55],UAESP:[740,55],SDA:[910,55],TRA:[80,150],ALC:[430,150],VOC:[590,150],CLI:[740,150],EAAB:[910,150],CAMC:[80,250],GER:[230,250],JAC:[370,250],MESA:[520,250],COMP:[740,250],RED:[910,250],ASA:[80,350],COR:[230,350],NRES:[400,350],NAGU:[600,350],GUAR:[760,350],HUM:[910,350],COMI:[100,455],COMR:[250,455],FON:[400,455],PLA:[540,455],COLA:[700,455],VEC:[910,455],COT:[160,565],REC:[330,565],ORGR:[470,565],HUE:[620,565],JBB:[770,565]};
 const TPC={persona:'#C9C2B6',cargo:'#E3A549',entidad:'#F1ECE2',colectivo:'#8FC59A',objeto:'#8DB3D9',operador:'#B9A3E8',regulador:'#E8C27A',nohumano:'#6ea8d6',instancia:'#D2553A'};
 const KS={formal:{n:'Atribución formal',c:'#8f8a82',d:'6 5',w:1.4},efectiva:{n:'Influencia efectiva',c:RED,d:null,w:3.4},coop:{n:'Cooperación',c:INK,d:null,w:1.5},conflicto:{n:'Conflicto y costos',c:'#E0644A',d:'1.5 4',w:2},flujo:{n:'Flujo',c:OCH,d:null,w:1.4}};
 const FC={info:'#8DB3D9',rec:OCH,trab:'#8FC59A'};const FN={info:'información',rec:'recursos',trab:'trabajo'};
 const col=e=>e.k==='flujo'?FC[e.f]:KS[e.k].c;
 const place=id=>{const [x,y]=POS[id];return MOB?[75+(y-55)/510*490,55+(x-80)/830*860]:[x,y]};
 const N=C3.NODES.map(n=>{const p=place(n.id);return {...n,x:p[0],y:p[1]}});const NB=new Map(N.map(n=>[n.id,n]));
 const E=C3.EDGES.map((e,i)=>({...e,i}));const R=MOB?24:19;
 const svg=d3.select('#infSvg').attr('viewBox',MOB?'0 0 640 1000':'0 0 1000 640').attr('preserveAspectRatio','xMidYMid meet');
 const df=svg.append('defs');
 const mk=(id,c)=>df.append('marker').attr('id',id).attr('viewBox','0 0 10 10').attr('refX',9).attr('refY',5).attr('markerWidth',9).attr('markerHeight',9).attr('orient','auto').attr('markerUnits','userSpaceOnUse').append('path').attr('d','M0 1L9 5L0 9z').attr('fill',c);
 Object.entries(KS).forEach(([k,v])=>mk('m-'+k,v.c));Object.entries(FC).forEach(([k,c])=>mk('m-f'+k,c));
 const gE=svg.append('g'),gK=svg.append('g'),gN=svg.append('g');
 let state='hoy',sel=null;
 const inS=x=>x.en==='ambos'||x.en===state;
 function ePath(e){const s=NB.get(e.s),t=NB.get(e.t),dx=t.x-s.x,dy=t.y-s.y;const back=E.some(o=>o.s===e.t&&o.t===e.s);const k=back?.18:.1;
  const mx=(s.x+t.x)/2-dy*k,my=(s.y+t.y)/2+dx*k;const a=Math.atan2(my-s.y,mx-s.x),b=Math.atan2(t.y-my,t.x-mx);e.mid=[.25*s.x+.5*mx+.25*t.x,.25*s.y+.5*my+.25*t.y];
  return `M${s.x+Math.cos(a)*(R+2)},${s.y+Math.sin(a)*(R+2)}Q${mx},${my} ${t.x-Math.cos(b)*(R+4)},${t.y-Math.sin(b)*(R+4)}`}
 function draw(){
  const nodes=N.filter(inS),ids=new Set(nodes.map(n=>n.id));const edges=E.filter(e=>inS(e)&&ids.has(e.s)&&ids.has(e.t));
  gE.selectAll('path').data(edges,e=>e.i).join(en=>en.append('path').attr('class','edge').attr('fill','none').attr('opacity',0).call(p=>p.transition().duration(700).attr('opacity',1)),u=>u,ex=>ex.transition().duration(400).attr('opacity',0).remove())
   .attr('d',ePath).attr('stroke',col).attr('stroke-width',e=>KS[e.k].w*(e.k==='efectiva'?.6+e.w*.2:.7+e.w*.15)).attr('stroke-dasharray',e=>KS[e.k].d).attr('stroke-linecap','round').attr('marker-end',e=>`url(#m-${e.k==='flujo'?'f'+e.f:e.k})`)
   .classed('flowing',e=>e.k==='flujo').attr('stroke-dasharray',e=>e.k==='flujo'?'7 5':KS[e.k].d)
   .on('mousemove',(ev,e)=>showTip(`<b>${SH[e.s]} → ${SH[e.t]}</b><br>${KS[e.k].n}${e.k==='flujo'?' de '+FN[e.f]:''}<br>${esc(e.m)}`,ev)).on('mouseleave',hideTip);
  gK.selectAll('g').data(edges.filter(e=>e.key),e=>e.i).join(en=>{const g=en.append('g').attr('class','keyi');g.append('circle').attr('r',10).attr('fill','#0b0d14').attr('stroke',RED);g.append('use').attr('href','#i-key').attr('x',-7).attr('y',-7).attr('width',14).attr('height',14).style('color',RED);return g},u=>u,ex=>ex.remove()).attr('transform',e=>`translate(${e.mid[0]},${e.mid[1]})`);
  const ng=gN.selectAll('g.node').data(nodes,n=>n.id).join(en=>{const g=en.append('g').attr('class','node').attr('tabindex',0).attr('opacity',0);g.append('circle').attr('r',R);g.append('use');g.append('text').attr('text-anchor','middle').attr('y',R+(MOB?18:14)).attr('font-size',MOB?15:11).attr('stroke-width',3.5);g.transition().duration(700).attr('opacity',1);return g},u=>u,ex=>ex.transition().duration(400).attr('opacity',0).remove());
  ng.attr('transform',n=>`translate(${n.x},${n.y})`);
  ng.select('circle').attr('fill','#121624').attr('stroke',n=>TPC[n.tp]).attr('stroke-width',1.8).attr('stroke-dasharray',n=>n.en==='prop'?'4 3':null);
  ng.select('use').attr('href',n=>'#i-'+n.tp).attr('x',-R*.52).attr('y',-R*.52).attr('width',R*1.04).attr('height',R*1.04).style('color',n=>TPC[n.tp]);
  ng.select('text').each(function(n){const t=d3.select(this).attr('x',0);t.selectAll('*').remove();if(MOB)lines(t,SH[n.id],17);else t.text(SH[n.id])});
  ng.on('click',(ev,n)=>{sel=n;focus(n);card(n)}).on('mouseenter',(ev,n)=>{if(!sel)focus(n)}).on('mouseleave',()=>{if(!sel)focus(null)});
  if(sel&&!ids.has(sel.id)){sel=null;card(null)}focus(sel);
 }
 function focus(n){svg.classed('dim',!!n);if(!n)return;const nb=new Set([n.id]);gE.selectAll('path').each(e=>{if(e.s===n.id)nb.add(e.t);if(e.t===n.id)nb.add(e.s)});
  gN.selectAll('g.node').classed('on',d=>nb.has(d.id));gE.selectAll('path').classed('on',e=>e.s===n.id||e.t===n.id);gK.selectAll('g').classed('on',e=>e.s===n.id||e.t===n.id)}
 const cardEl=document.getElementById('infCard');
 function card(n){if(!n){cardEl.style.display='none';return}cardEl.style.display='block';cardEl.innerHTML=`<b>${esc(n.n)}</b>Decide: ${esc(n.dec)}<br>Controla: ${esc(n.rec)}`}
 svg.on('click',ev=>{if(ev.target.tagName==='svg'){sel=null;focus(null);card(null)}});
 // métricas
 const COLL=new Set(['MESA','NRES','NAGU','GUAR','VOC','FON','COMI']);const isC=id=>COLL.has(id)||['colectivo','persona'].includes(NB.get(id).tp);
 function met(st){const ids=new Set(N.filter(n=>n.en==='ambos'||n.en===st).map(n=>n.id));const ed=E.filter(e=>(e.en==='ambos'||e.en===st)&&ids.has(e.s)&&ids.has(e.t));
  const ef=ed.filter(e=>e.k==='efectiva'),ky=ed.filter(e=>e.key);
  const voice=id=>ed.some(e=>e.s===id&&(e.k==='efectiva'||e.k==='formal'||(e.k==='flujo'&&e.f==='info'&&NB.get(e.t).tp==='instancia')));
  const repr=id=>ed.some(e=>e.t===id&&e.k==='coop'&&NB.get(e.s).tp==='instancia');
  return {ef:Math.round(ef.filter(e=>isC(e.s)).length/ef.length*100),ky:Math.round(ky.filter(e=>isC(e.s)).length/ky.length*100),sv:[...new Set(ed.filter(e=>e.k==='conflicto').map(e=>e.t))].filter(id=>!voice(id)&&!repr(id)).length}}
 const M={hoy:met('hoy'),prop:met('prop')};
 const num=(id,to,suf)=>{const el=document.getElementById(id);const from=parseFloat(el.textContent)||0;d3.select(el).transition().duration(900).tween('t',()=>{const i=d3.interpolateNumber(from,to);return t=>el.textContent=Math.round(i(t))+suf})};
 function setState(s){state=s;draw();num('nEf',M[s].ef,'%');num('nKey',M[s].ky,'%');num('nSv',M[s].sv,'')}
 document.querySelectorAll('#v-inf .foot .chip').forEach(b=>b.onclick=()=>{setPressed('#v-inf .foot .chip',b);setState(b.dataset.s)});
 const sw=(c,d,w)=>`<svg width="30" height="10"><path d="M1 5H29" stroke="${c}" stroke-width="${w}" ${d?`stroke-dasharray="${d}"`:''} stroke-linecap="round"/></svg>`;
 document.getElementById('infLg').innerHTML=[...['formal','efectiva','coop','conflicto'].map(k=>`<span>${sw(KS[k].c,KS[k].d,Math.min(3,KS[k].w))}${KS[k].n}</span>`),`<span>${sw(OCH,'7 5',1.6)}Flujos</span>`,`<span><svg width="18" height="18"><circle cx="9" cy="9" r="8" fill="none" stroke="${RED}"/><use href="#i-key" x="3" y="3" width="12" height="12" style="color:${RED}"/></svg>Puede detener</span>`,`<span><svg width="18" height="18"><circle cx="9" cy="9" r="7.5" fill="none" stroke="#C9C2B6" stroke-dasharray="3 2"/></svg>Propuesto</span>`].join('');
 setState('hoy');
}

/* ================= DECISIÓN ================= */
if(V==='dec'){
 const ST=[['agenda','Agenda'],['delib','Deliberación'],['instancia','Resolución'],['operador','Ejecución'],['lupa','Rectificación']];
 const WHO={hoy:[[['entidad','Entidades']],[['regulador','Técnicos']],[['instancia','Asamblea de accionistas']],[['operador','Ciudad Limpia'],['persona','Coteros'],['persona','Recicladores']],[['entidad','Solo entidades']]],
  prop:[[['colectivo','Juntas'],['colectivo','Colectivos'],['colectivo','Recicladores']],[['instancia','Núcleo orgánicos'],['nohumano','Guardianía']],[['instancia','Núcleo'],['key','Llave ecológica']],[['colectivo','Org. recicladores'],['persona','Coteros'],['objeto','Planta']],[['nohumano','Guardianía mide'],['colectivo','Un tercio revisa']]]};
 const REG={hoy:['Competencia de una entidad','Concepto técnico','Mayoría accionaria','Contrato del operador','Sanción o nada'],prop:['Basta un acta','Quién trabaja y quién paga','Consentimiento','Pago por tonelada','Revocación por mayoría']};
 const ESC={hoy:['Ciudad','Ciudad','Nación','Ciudad','Ciudad'],prop:['Localidad','Central y barrios','Localidad','Central y barrios','Localidad']};
 const W=MOB?400:1000,H=MOB?1000:520;
 const svg=d3.select('#decSvg').attr('viewBox',`0 0 ${W} ${H}`).attr('preserveAspectRatio','xMidYMid meet');
 const P=i=>MOB?{x:52,y:50+i*150}:{x:110+i*195,y:110};
 const g=svg.append('g');let state='prop',timer=null;
 const cardEl=document.getElementById('decCard');
 function draw(){
  g.selectAll('*').remove();const S=state;
  const path=MOB?`M${P(0).x},${P(0).y}V${P(4).y}`:`M${P(0).x},${P(0).y}H${P(4).x}`;
  g.append('path').attr('id','trk').attr('d',path).attr('stroke','#3b4258').attr('stroke-width',2);
  if(S==='prop'){const ret=MOB?`M${P(4).x-30},${P(4).y} C${P(4).x-48},${P(4).y} ${P(0).x-48},${P(0).y} ${P(0).x-30},${P(0).y}`:`M${P(4).x},${P(4).y+50} C${P(4).x},${P(4).y+76} ${P(0).x},${P(0).y+76} ${P(0).x},${P(0).y+50}`;
   g.append('path').attr('id','ret').attr('d',MOB?`M${P(4).x-2},${P(4).y+46} C${P(4).x-50},${P(4).y+80} ${P(0).x-50},${P(0).y-60} ${P(0).x-2},${P(0).y-46}`:`M${P(4).x},${P(4).y-48} C${P(4).x},${P(4).y-88} ${P(0).x},${P(0).y-88} ${P(0).x},${P(0).y-48}`).attr('fill','none').attr('stroke',RED).attr('stroke-width',1.6).attr('stroke-dasharray','6 6').attr('class','flowing');
   if(!MOB)g.append('text').attr('x',W/2).attr('y',P(0).y-96).attr('text-anchor','middle').attr('fill',RED).attr('font-size',13).text('rectificar reabre el ciclo');}
  ST.forEach(([ic,n],i)=>{const p=P(i);const sg=g.append('g').attr('transform',`translate(${p.x},${p.y})`).style('cursor','pointer').on('click',()=>info(i));
   sg.append('circle').attr('r',MOB?30:44).attr('fill',RED);icon(sg,ic,0,0,MOB?28:38,'#fff');
   const t=sg.append('text').attr('x',MOB?44:0).attr('y',MOB?-6:68).attr('text-anchor',MOB?'start':'middle').attr('fill',INK).attr('font-weight',600).attr('font-size',MOB?15:16).text(n);
   sg.append('text').attr('x',MOB?44:0).attr('y',MOB?14:88).attr('text-anchor',MOB?'start':'middle').attr('fill',S==='prop'?OCH:'#9A958C').attr('font-size',12.5).text(REG[S][i]);
   sg.append('text').attr('x',MOB?44:0).attr('y',MOB?31:105).attr('text-anchor',MOB?'start':'middle').attr('fill',MUTE).attr('font-size',11.5).text('Escala: '+ESC[S][i]);
   WHO[S][i].forEach(([wic,wn],j)=>{const n=WHO[S][i].length;const wx=MOB?44+j*(n>2?82:110)+18:(j-(n-1)/2)*62,wy=MOB?72:150;
    const w=sg.append('g').attr('transform',`translate(${wx},${wy})`);w.append('circle').attr('r',17).attr('fill','#121624').attr('stroke',wic==='key'?RED:'#3b4258');icon(w,wic,0,0,18,wic==='key'?RED:S==='prop'?'#8FC59A':'#C9C2B6');
    const tt=w.append('text').attr('x',0).attr('y',30).attr('text-anchor','middle').attr('font-size',11).attr('fill',INK);lines(tt,wn,12)});
  });
  if(S==='hoy'){const p=P(4);const x=g.append('g').attr('transform',`translate(${p.x+(MOB?-40:0)},${p.y+(MOB?0:-62)})`);x.append('path').attr('d','M-7 -7L7 7M7 -7L-7 7').attr('stroke',RED).attr('stroke-width',3);
   g.append('text').attr('x',MOB?P(4).x-16:p.x).attr('y',MOB?P(4).y+100:p.y-78).attr('text-anchor',MOB?'start':'middle').attr('fill',RED).attr('font-size',12.5).text('Los afectados no pueden corregir');}
  // banda decide / ejecuta
  const by=MOB?800:310,bw=MOB?W-24:W-40,bx=MOB?12:20;
  const D=S==='hoy'?{d:[['instancia','Asamblea'],['cargo','Gerencia'],['regulador','SDA']],e:[['persona','Coteros'],['persona','Recicladores'],['operador','Ciudad Limpia']],m:'traslada trabajo y costos',x:'Decide fuera de Kennedy'}
   :{d:[['instancia','Núcleo con quien trabaja'],['nohumano','Guardianía']],e:[['colectivo','Org. recicladores'],['persona','Coteros con pago'],['objeto','Planta']],m:'quien ejecuta delibera antes',x:'Siguen afuera: suelo, permiso, contrato'};
  const band=g.append('g').attr('transform',`translate(${bx},${by})`);
  band.append('rect').attr('width',bw).attr('height',MOB?170:190).attr('rx',12).attr('fill','#121624').attr('stroke','#232736');
  band.append('text').attr('x',16).attr('y',34).attr('fill',OCH).attr('font-weight',600).attr('font-size',15).text('Decide');
  band.append('text').attr('x',16).attr('y',MOB?124:140).attr('fill',OCH).attr('font-weight',600).attr('font-size',15).text('Ejecuta');
  const row=(arr,y)=>arr.forEach(([ic,n],j)=>{const x=(MOB?110:130)+j*(MOB?95:230);const r=band.append('g').attr('transform',`translate(${x},${y})`);r.append('circle').attr('r',16).attr('fill','#0b0d14').attr('stroke','#3b4258');icon(r,ic,0,0,18,INK);
   const tt=r.append('text').attr('x',MOB?0:26).attr('y',MOB?30:5).attr('text-anchor',MOB?'middle':'start').attr('font-size',MOB?10.5:13).attr('fill',INK);if(MOB)lines(tt,n,11);else tt.text(n)});
  row(D.d,MOB?32:30);row(D.e,MOB?118:136);
  band.append('path').attr('d',`M${MOB?60:62},48V${MOB?98:112}`).attr('stroke',S==='hoy'?RED:'#8FC59A').attr('stroke-width',2.2).attr('class','flowing').attr('stroke-dasharray','5 4');
  band.append('text').attr('x',MOB?70:74).attr('y',MOB?78:84).attr('font-size',12).attr('fill',S==='hoy'?RED:'#8FC59A').text(D.m);
  if(!MOB){const ex=band.append('g').attr('transform',`translate(${bw-230},28)`);icon(ex,'entidad',12,6,26,OCH);const xt=ex.append('text').attr('x',34).attr('y',4).attr('font-size',12.5).attr('fill',OCH);lines(xt,D.x,15);
   ex.append('path').attr('d',`M12 26V118H-60`).attr('fill','none').attr('stroke',OCH).attr('stroke-width',2).attr('stroke-dasharray','5 4').attr('class','flowing');}
  // ficha que recorre
  const tok=g.append('circle').attr('r',9).attr('fill',OCH).attr('stroke','#0b0d14').attr('stroke-width',2);
  const trk=document.getElementById('trk'),L=trk.getTotalLength();
  if(timer)timer.stop();const dur=6500;
  timer=d3.timer(el=>{const t=(el%dur)/dur;const pt=trk.getPointAtLength(L*Math.min(1,t*1.15));tok.attr('cx',pt.x).attr('cy',pt.y).attr('opacity',t>.92?0:1)});
 }
 function info(i){const s=C3.STEPS[i];cardEl.style.display='block';cardEl.innerHTML=`<b>${s.n} · ${state==='hoy'?'hoy':'propuesta'}</b>${esc(s[state].quien)}<br><span style="color:${RED}">Disputa: ${esc(s[state].disp)}</span>`}
 document.querySelectorAll('#v-dec .chip').forEach(b=>b.onclick=()=>{setPressed('#v-dec .chip',b);state=b.dataset.s;cardEl.style.display='none';draw()});
 draw();
}

/* ================= MODELO CAUSAL ================= */
if(V==='cau'){
 const MP={CAR:[20,20],ROT:[280,20],PAR:[20,200],DES:[280,200],CON:[20,380],TRB:[280,380],ACU:[20,560],APR:[280,560],DEP:[20,740],HUM:[280,740],ING:[20,920],AGE:[280,920]};
 const VARS=C3.VARS.map(v=>MOB?{...v,x:MP[v.id][0],y:MP[v.id][1]}:{...v});const VB=new Map(VARS.map(v=>[v.id,v]));
 const VW=MOB?220:180,VH=MOB?56:48;
 const svg=d3.select('#cauSvg').attr('viewBox',MOB?'0 0 520 1000':'0 0 1000 640').attr('preserveAspectRatio','xMidYMid meet');
 const df=svg.append('defs');['cm',RED,'cmh',INK].reduce((a,_,i,arr)=>{if(i%2===0)df.append('marker').attr('id',arr[i]).attr('viewBox','0 0 10 10').attr('refX',9).attr('refY',5).attr('markerWidth',8).attr('markerHeight',8).attr('orient','auto').append('path').attr('d','M0 1L9 5L0 9z').attr('fill',arr[i+1]);return a},0);
 const gl=svg.append('g'),gd=svg.append('g'),gv=svg.append('g'),gt=svg.append('g');
 const box=(v,tx,ty)=>{const cx=v.x+VW/2,cy=v.y+VH/2,dx=tx-cx,dy=ty-cy;const s=Math.min((VW/2+4)/Math.abs(dx||1e-6),(VH/2+4)/Math.abs(dy||1e-6));return[cx+dx*s,cy+dy*s]};
 const L=C3.LINKS.map((l,i)=>{const a=VB.get(l.s),b=VB.get(l.t);const ax=a.x+VW/2,ay=a.y+VH/2,bx=b.x+VW/2,by=b.y+VH/2,dx=bx-ax,dy=by-ay;const back=C3.LINKS.some(o=>o.s===l.t&&o.t===l.s);const k=back?.22:.16;
  const mx=(ax+bx)/2-dy*k,my=(ay+by)/2+dx*k,p0=box(a,mx,my),p1=box(b,mx,my);const q=t=>[(1-t)**2*p0[0]+2*(1-t)*t*mx+t*t*p1[0],(1-t)**2*p0[1]+2*(1-t)*t*my+t*t*p1[1]];
  return {...l,i,d:`M${p0[0]},${p0[1]}Q${mx},${my} ${p1[0]},${p1[1]}`,sp:q(.8),mp:q(.5)}});
 gl.selectAll('path').data(L).join('path').attr('id',l=>'lk'+l.i).attr('d',l=>l.d).attr('fill','none').attr('stroke',RED).attr('stroke-width',1.8).attr('marker-end','url(#cm)').attr('class','lk');
 gl.selectAll('path.hit').data(L).join('path').attr('d',l=>l.d).attr('fill','none').attr('stroke','transparent').attr('stroke-width',14).style('cursor','pointer')
  .on('mousemove',(e,l)=>showTip(`<b>${VB.get(l.s).n} → ${VB.get(l.t).n} (${l.sg==='+'?'+':'−'})</b><br>${esc(l.m)}`,e)).on('mouseleave',hideTip)
  .on('click',(e,l)=>card(`<b>${VB.get(l.s).n} → ${VB.get(l.t).n}</b>${esc(l.m)}`));
 gt.selectAll('text').data(L).join('text').attr('x',l=>l.sp[0]+8).attr('y',l=>l.sp[1]-6).attr('fill',OCH).attr('font-weight',700).attr('font-size',MOB?20:16).text(l=>l.sg==='+'?'+':'−');
 gt.selectAll('g.dl').data(L.filter(l=>l.dl)).join('g').attr('transform',l=>{const a=VB.get(l.s),b=VB.get(l.t);return `translate(${l.mp[0]},${l.mp[1]}) rotate(${Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI+90})`}).html(`<path d="M-9 -4H9M-9 4H9" stroke="${INK}" stroke-width="2.4"/>`);
 const vg=gv.selectAll('g').data(VARS).join('g').attr('transform',v=>`translate(${v.x},${v.y})`).style('cursor','pointer').on('click',(e,v)=>card(`<b>${v.n}</b>${esc(v.d)}`));
 vg.append('rect').attr('width',VW).attr('height',VH).attr('rx',10).attr('fill','#161a28').attr('stroke','#2f3550');
 vg.append('text').attr('x',VW/2).attr('y',VH/2+5).attr('text-anchor','middle').attr('font-size',MOB?16:13).attr('font-weight',500).attr('fill',INK).text(v=>v.n);
 const offs=MOB?{R1:[70,60],B1:[0,-30],B2:[0,30],R2:[0,60],B3:[0,-50]}:{R1:[0,0],B1:[10,-40],B2:[-30,0],R2:[-40,70],B3:[40,40]};
 const lg=gt.append('g');
 C3.LOOPS.forEach(lp=>{const vs=[...new Set(lp.path)].map(id=>VB.get(id));const o=offs[lp.id]||[0,0];const c=lp.tp==='R'?RED:OCH;
  const g=lg.append('g').attr('transform',`translate(${d3.mean(vs,v=>v.x+VW/2)+o[0]},${d3.mean(vs,v=>v.y+VH/2)+o[1]})`).style('cursor','pointer').on('click',()=>hl(lp.id));
  g.append('circle').attr('r',22).attr('fill','#0b0d14').attr('stroke',c).attr('stroke-width',1.8);g.append('text').attr('text-anchor','middle').attr('y',5).attr('fill',c).attr('font-weight',700).attr('font-size',14).text(lp.id)});
 const cardEl=document.getElementById('cauCard');const card=h=>{cardEl.style.display='block';cardEl.innerHTML=h};
 function hl(id){const lp=C3.LOOPS.find(l=>l.id===id);const pairs=new Set();for(let i=0;i<lp.path.length-1;i++)pairs.add(lp.path[i]+'>'+lp.path[i+1]);
  gl.selectAll('path.lk').attr('opacity',l=>pairs.has(l.s+'>'+l.t)?1:.15).attr('stroke',l=>pairs.has(l.s+'>'+l.t)?INK:RED).attr('stroke-width',l=>pairs.has(l.s+'>'+l.t)?2.6:1.8).attr('marker-end',l=>pairs.has(l.s+'>'+l.t)?'url(#cmh)':'url(#cm)');
  vg.attr('opacity',v=>lp.path.includes(v.id)?1:.35);
  gd.selectAll('*').remove();
  L.filter(l=>pairs.has(l.s+'>'+l.t)).forEach((l,j)=>{for(let k=0;k<2;k++){const c=gd.append('circle').attr('r',MOB?5:4).attr('fill',lp.tp==='R'?RED:OCH);c.append('animateMotion').attr('dur','2s').attr('repeatCount','indefinite').attr('begin',(k+j*.15)+'s').append('mpath').attr('href','#lk'+l.i)}});
  document.getElementById('cauP').textContent=lp.d;
  setPressed('#cauChips .chip',document.querySelector(`#cauChips .chip[data-l="${id}"]`));cardEl.style.display='none';
 }
 document.getElementById('cauChips').innerHTML=C3.LOOPS.map(l=>`<button class="chip" data-l="${l.id}" style="--c:${l.tp==='R'?RED:OCH}"><i></i>${l.id} · ${l.n}</button>`).join('');
 document.querySelectorAll('#cauChips .chip').forEach(b=>b.onclick=()=>hl(b.dataset.l));
 hl('R1');
}

/* ================= CONTRADICCIONES ================= */
if(V==='con'){
 const T=C3.TENSIONES;const IC=[['colectivo','regulador'],['casa','cadena'],['ciclo','reloj'],['moneda','alerta']];
 const TILT={hoy:[7,6,7,8],prop:[-1.5,2,-1,1]};
 const W=MOB?400:1000,H=MOB?900:500;
 const svg=d3.select('#conSvg').attr('viewBox',`0 0 ${W} ${H}`).attr('preserveAspectRatio','xMidYMid meet');
 let state='hoy';
 const bx=MOB?200:300,bl=MOB?150:210;
 const beams=T.map((t,i)=>{const y=MOB?70+i*118:80+i*105;const g=svg.append('g').attr('transform',`translate(${bx},${y})`);
  g.append('text').attr('y',-30).attr('text-anchor','middle').attr('font-size',MOB?12:13).attr('fill',MUTE).text(t.q);
  g.append('path').attr('d','M0 6L-12 30H12z').attr('fill','#3b4258');
  const b=g.append('g');b.append('line').attr('x1',-bl).attr('x2',bl).attr('stroke',RED).attr('stroke-width',3);
  [[-bl,IC[i][0],t.a],[bl,IC[i][1],t.b]].forEach(([x,ic,n],k)=>{const e=b.append('g').attr('transform',`translate(${x},0)`);e.append('circle').attr('r',MOB?22:26).attr('fill','#121624').attr('stroke',k?'#3b4258':'#8FC59A').attr('stroke-width',1.8);icon(e,ic,0,0,MOB?22:26,k?'#C9C2B6':'#8FC59A');
   e.append('text').attr('y',MOB?40:46).attr('text-anchor','middle').attr('font-size',MOB?11.5:13).attr('font-weight',600).attr('fill',INK).text(n)});
  return b});
 // contradicción
 const cx=MOB?200:700,cy=MOB?580:150;
 const G=svg.append('g').attr('transform',`translate(${cx},${cy})`);
 const node=(x,y,ic,c,r,label,sub)=>{const g=G.append('g').attr('transform',`translate(${x},${y})`);g.append('circle').attr('r',r).attr('fill',c==='bg'?'#121624':c);icon(g,ic,0,0,r*1.05,c==='bg'?'#C9C2B6':'#0b0d14');
  if(label)g.append('text').attr('y',r+20).attr('text-anchor','middle').attr('font-weight',600).attr('font-size',14).attr('fill',INK).text(label);
  if(sub){const t=g.append('text').attr('x',0).attr('y',r+38).attr('text-anchor','middle').attr('font-size',12).attr('fill',MUTE);lines(t,sub,14)}return g};
 node(0,-70,'fabrica','bg',26,'Intereses externos');
 G.append('path').attr('d','M0 -40V30').attr('stroke',INK).attr('stroke-width',2);
 node(0,70,'rayo',RED,40,'');
 G.append('text').attr('y',132).attr('text-anchor','middle').attr('fill',RED).attr('font-weight',600).attr('font-size',14).text('Pago por tonelada');
 const pT=G.append('path').attr('id','pT').attr('d',MOB?'M30 50 Q90 20 130 60':'M30 50 Q110 0 150 30').attr('fill','none').attr('stroke',RED).attr('stroke-width',2.4);
 const pD=G.append('path').attr('id','pD').attr('d',MOB?'M-30 50 Q-90 20 -130 60':'M30 92 Q110 150 150 190').attr('fill','none').attr('stroke','#7E7A73').attr('stroke-width',2).attr('stroke-dasharray','6 6');
 node(MOB?150:178,MOB?72:30,'check',OCH,24,'Se transforma',MOB?'cuota y tarifa progresiva':'cuota para independientes y tarifa progresiva');
 node(MOB?-150:178,MOB?72:200,'colectivo','bg',24,'Se desplaza',MOB?'pierden los independientes':'el costo cae en recicladores independientes');
 const dots=G.append('g');
 function setState(s){state=s;beams.forEach((b,i)=>b.transition().duration(1200).ease(d3.easeElasticOut.amplitude(1).period(.5)).attr('transform',`rotate(${TILT[s][i]})`));
  dots.selectAll('*').remove();const id=s==='hoy'?'pD':'pT';const col=s==='hoy'?'#9A958C':OCH;
  for(let k=0;k<3;k++){const c=dots.append('circle').attr('r',5).attr('fill',col);c.append('animateMotion').attr('dur','1.8s').attr('repeatCount','indefinite').attr('begin',(k*.6)+'s').append('mpath').attr('href','#'+id)}
  pT.attr('opacity',s==='prop'?1:.3);pD.attr('opacity',s==='hoy'?1:.3);
  document.getElementById('conP').textContent=s==='hoy'?'Hoy la balanza se inclina hacia el problema y el costo se desplaza a quien menos decide.':'Con cuota, tarifa progresiva y rotación, las tensiones se equilibran y el costo se transforma.';}
 document.querySelectorAll('#v-con .chip').forEach(b=>b.onclick=()=>{setPressed('#v-con .chip',b);setState(b.dataset.s)});
 setState('hoy');
}
})();
