(async function(){
const G=await fetch('assets/corabastos_geom.json').then(r=>r.json());
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const svg=d3.select('#st');
const C={truck:'#C8322B',buy:'#B9771E',cargo:'#7A5C2E',res:'#6B4F2A',hum:'#3E8FB0',org:'#2E8B57',bio:'#6A4FB3',fauna:'#2F6F8F',acopio:'#B9771E'};

/* ---------- axonometría: planta de ocupación del PRM girada y levantada en volumen ---------- */
const K=G.K;
const cx=800,cy=440,ROT=-18*Math.PI/180,FLAT=.56;
const raw=([x,y])=>{const X=(x-cx)*K,Y=(y-cy)*K;return[X*Math.cos(ROT)-Y*Math.sin(ROT),(X*Math.sin(ROT)+Y*Math.cos(ROT))*FLAT]};
const ext=[...G.cen,...G.hum].map(raw);const bx=d3.extent(ext,p=>p[0]),by=d3.extent(ext,p=>p[1]);
const SC=Math.min(1150/(bx[1]-bx[0]),620/(by[1]-by[0]));const OXX=638-SC*(bx[0]+bx[1])/2,OYY=440-SC*(by[0]+by[1])/2;const HZ=2.2*SC;
const P=(pt,z=0)=>{const r=raw(pt);return[OXX+r[0]*SC,OYY+r[1]*SC-z*HZ]};
const f1=v=>v.toFixed(1);
const pth=(a,z=0)=>'M'+a.map(p=>P(p,z).map(f1).join(',')).join('L')+'Z';
const line=(a,z=0)=>'M'+a.map(p=>P(p,z).map(f1).join(',')).join('L');

const defs=svg.append('defs');
const mk=(id,c)=>defs.append('marker').attr('id',id).attr('viewBox','0 0 10 10').attr('refX',8).attr('refY',5).attr('markerWidth',8).attr('markerHeight',8).attr('orient','auto').append('path').attr('d','M0 0L10 5L0 10z').attr('fill',c);
Object.entries(C).forEach(([k,c])=>mk('m-'+k,c));
const glow=defs.append('filter').attr('id','glow').attr('x','-20%').attr('y','-20%').attr('width','140%').attr('height','140%');glow.append('feGaussianBlur').attr('stdDeviation',3);
const hg=defs.append('linearGradient').attr('id','humg').attr('x1',0).attr('x2',1).attr('y1',0).attr('y2',1);hg.append('stop').attr('offset','0').attr('stop-color','#8FC3D6');hg.append('stop').attr('offset','1').attr('stop-color','#A6D19C');

const gGround=svg.append('g'),gHum=svg.append('g'),gB=svg.append('g'),g1=svg.append('g'),g2=svg.append('g'),gLab=svg.append('g');

/* suelo, vías y entorno */
const ROADS=[{n:'Diagonal 38 Sur',a:[[640,112],[830,148],[1000,180],[1180,225],[1240,240]]},{n:'Av. Agoberto Mejía',a:[[1215,300],[1205,420],[1150,505],[1050,590],[960,690],[905,770]]},{n:'Carrera 82',a:[[352,392],[660,118]]},{n:'Av. Las Américas',a:[[1200,250],[1262,330]]}];
ROADS.forEach(r=>gGround.append('path').attr('d',line(r.a)).attr('fill','none').attr('stroke','#DCD7CC').attr('stroke-width',14).attr('stroke-linecap','round'));
gGround.append('path').attr('d',pth(G.cen)).attr('fill','#F7F5F0').attr('stroke','#222').attr('stroke-width',1.6).attr('stroke-dasharray','6 5');
[[[520,326],[1005,326]],[[505,380],[1005,402]],[[600,330],[585,700]],[[800,180],[790,710]],[[1005,300],[995,660]]].forEach(a=>gGround.append('path').attr('d',line(a)).attr('stroke','#E6E2D8').attr('stroke-width',4).attr('fill','none'));
gHum.append('path').attr('d',pth(G.hum)).attr('fill','#9CCBDB').attr('fill-opacity',.85).attr('stroke',C.hum).attr('stroke-width',1.4);
const regP=gHum.append('path').attr('d',pth(G.reg)).attr('fill','url(#humg)').attr('opacity',0).attr('stroke',C.hum).attr('stroke-width',1.2);

/* ---------- naves extruidas, pintadas de atrás hacia adelante ---------- */
function faces(b,h){const ps=b.p.map(p=>P(p));let s=0;for(let i=0;i<ps.length;i++){const a=ps[i],c=ps[(i+1)%ps.length];s+=a[0]*c[1]-c[0]*a[1]}
 const out=[];for(let i=0;i<ps.length;i++){const a=b.p[i],c=b.p[(i+1)%b.p.length],pa=ps[i],pc=ps[(i+1)%ps.length];const dx=pc[0]-pa[0],dy=pc[1]-pa[1];const n=s>0?[-dy,dx]:[dy,-dx];
  if(n[1]>0)out.push({d:`M${P(a,0)}L${P(c,0)}L${P(c,h)}L${P(a,h)}Z`,k:n[0]>0?'r':'l',y:(pa[1]+pc[1])/2})}
 return out}
const BL=G.b.map((b,i)=>({...b,i,depth:P(d3.polygonCentroid(b.p))[1]})).sort((a,b)=>a.depth-b.depth);
const bG=gB.selectAll('g.b').data(BL).join('g').attr('class','b');
function drawB(sel,hf){sel.each(function(b){const g=d3.select(this);g.selectAll('*').remove();const h=b.h*hf(b);if(h<=0.05)return;
  faces(b,h).sort((a,c)=>a.y-c.y).forEach(f=>g.append('path').attr('d',f.d).attr('fill',f.k==='r'?'#A39E93':'#C3BEB3').attr('stroke','#5b574f').attr('stroke-width',.5));
  g.append('path').attr('d',pth(b.p,h)).attr('fill',b.h>=12?'#E8E4DA':'#DAD6CB').attr('stroke','#4b4740').attr('stroke-width',.7);
  if(b.h>=9&&b.p.length===4){const [a,c,,d]=b.p;const n=Math.max(2,Math.round(Math.hypot(c[0]-a[0],c[1]-a[1])/12));
   for(let k=1;k<n;k++){const t=k/n;g.append('path').attr('d',`M${P([a[0]+(c[0]-a[0])*t,a[1]+(c[1]-a[1])*t],h)}L${P([d[0]+(c[0]-a[0])*t,d[1]+(c[1]-a[1])*t],h)}`).attr('stroke','#B9B4A9').attr('stroke-width',.6)}}})}
drawB(bG,()=>1);
const lab=(g,xy,t,o={})=>{const tt=g.append('text').attr('x',xy[0]).attr('y',xy[1]).attr('text-anchor',o.a||'middle').attr('font-size',o.fs||15).attr('font-weight',o.fw||700).attr('fill',o.c||'#141414').attr('paint-order','stroke').attr('stroke','#F4F2EC').attr('stroke-width',4).attr('stroke-linejoin','round');
 String(t).split('\n').forEach((l,i)=>tt.append('tspan').attr('x',xy[0]).attr('dy',i?(o.fs||15)*1.2:0).text(l));return tt};
lab(gLab,P([710,215],34),'Gran Bodega',{fs:15,c:'#333'});lab(gLab,P([620,292],30),'Bodega Reina',{fs:14,c:'#333'});
lab(gLab,P([905,350]),'Parqueadero Martillo',{fs:12.5,c:'#6a665d',fw:600});
lab(gLab,P([380,575]),'Humedal La Vaca',{fs:16,c:'#1f5f7a'});
ROADS.forEach(r=>{const m=r.a[Math.floor(r.a.length/2)];const p=P(m);lab(gLab,[p[0],p[1]-12],r.n,{fs:12.5,c:'#7a766c',fw:600})});
Object.entries(G.gates).forEach(([k,v])=>{const p=P(v);gLab.append('circle').attr('cx',p[0]).attr('cy',p[1]).attr('r',9).attr('fill','#fff').attr('stroke','#C8322B').attr('stroke-width',1.4);gLab.append('text').attr('x',p[0]).attr('y',p[1]+3.5).attr('text-anchor','middle').attr('font-size',9.5).attr('font-weight',700).attr('fill','#C8322B').text(k)});

/* ---------- flujos animados ---------- */
const curve=a=>d3.line().curve(d3.curveCatmullRom.alpha(.5))(a.map(p=>P(p,1)));
function flow(g,a,col,key,w=2.6,dash='8 7',dur=1400){const p=g.append('path').attr('d',curve(a)).attr('fill','none').attr('stroke',col).attr('stroke-width',w).attr('stroke-linecap','round').attr('stroke-dasharray',dash).attr('marker-end',`url(#m-${key})`).attr('data-k',key);
 if(!reduce)(function loop(){p.attr('stroke-dashoffset',0).transition().duration(dur).ease(d3.easeLinear).attr('stroke-dashoffset',-30).on('end',loop)})();return p}
function mover(g,a,col,key,r=5,dur=5200,n=2){const id='mp'+Math.random().toString(36).slice(2);g.append('path').attr('id',id).attr('d',curve(a)).attr('fill','none');
 for(let i=0;i<n;i++){const c=g.append('rect').attr('x',-r).attr('y',-r*.6).attr('width',r*2).attr('height',r*1.2).attr('rx',2).attr('fill',col).attr('data-k',key);
  if(!reduce)c.append('animateMotion').attr('dur',dur+'ms').attr('repeatCount','indefinite').attr('begin',(i*dur/n)+'ms').attr('rotate','auto').append('mpath').attr('href','#'+id)}}
function pulse(g,xy,col,key,r=5){const p=P(xy,10);const c=g.append('circle').attr('cx',p[0]).attr('cy',p[1]).attr('r',r).attr('fill',col).attr('data-k',key).attr('opacity',.9);
 if(!reduce)c.append('animate').attr('attributeName','r').attr('values',`${r*.6};${r*1.5};${r*.6}`).attr('dur',(1.6+Math.random()*.8)+'s').attr('repeatCount','indefinite');return c}

/* ================= LÁMINA 1 · HOY ================= */
[[[530,327],[1000,327]],[[520,381],[1000,401]]].forEach(a=>g1.append('path').attr('d',line(a,12)).attr('stroke',C.truck).attr('stroke-width',9).attr('opacity',.35).attr('filter','url(#glow)').attr('data-k','cong'));
const T=[[[1262,293],[1195,293],[1050,300],[905,327],[720,327]],[[1180,560],[1132,532],[1005,520],[900,500],[800,462]],[[960,800],[930,742],[860,712],[790,700],[690,650]],[[838,90],[838,151],[815,230],[812,300]]];
T.forEach(a=>{flow(g1,a,C.truck,'truck',2.4);mover(g1,a,C.truck,'truck',6,6000,2)});
[[[700,560],[790,700],[880,740],[920,800]],[[900,480],[1005,560],[1100,600],[1180,640]]].forEach(a=>{flow(g1,a,C.buy,'buy',2.2,'4 6');mover(g1,a,C.buy,'buy',4.5,5000,3)});
G.b.filter(b=>b.h>=9&&b.h<12).forEach(b=>pulse(g1,d3.polygonCentroid(b.p),C.cargo,'cargo',4.5));
[[560,600],[525,525],[488,470],[600,690]].forEach(xy=>{pulse(g1,xy,C.res,'res',7);flow(g1,[xy,[xy[0]-40,xy[1]+8],[xy[0]-75,xy[1]+20]],C.res,'res',2.6,'5 5',1200)});
{const p=P([1000,300],20);lab(g1,[p[0]+20,p[1]-30],'Congestión en los ejes de\nGran Bodega y Bodega Reina',{c:C.truck,fs:15,a:'start'})}
{const p=P([1180,600]);lab(g1,[p[0]+10,p[1]],'Camiones de carga por\nlas puertas P1 a P5',{c:C.truck,fs:15,a:'start'})}
{const p=P([430,660]);lab(g1,[p[0]-20,p[1]+30],'Residuos y vertimientos\nhacia el humedal',{c:C.res,fs:15})}

/* ================= LÁMINA 2 · PROPUESTA ================= */
const PJ=[{xy:[640,543],c:C.org,k:'org',h:5},{xy:[905,372],c:C.bio,k:'bio',h:10},{xy:[1000,640],c:C.acopio,k:'acopio',h:6},{xy:[470,480],c:C.org,k:'org',h:0},{xy:[540,640],c:C.fauna,k:'fauna',h:0}];
const BIRD='M-9 1c3-6 9-8 14-5l4-3-1 5c2 3 0 7-4 8l-10 1c-2 0-4-2-3-6z';
[[430,420],[480,540],[560,600],[620,670],[520,450],[440,470],[720,690]].forEach((xy,i)=>{const p=P(xy,4);const b=g2.append('path').attr('d',BIRD).attr('fill',C.fauna).attr('transform',`translate(${p})`).attr('data-k','fauna');
 if(!reduce)b.append('animateTransform').attr('attributeName','transform').attr('type','translate').attr('values',`${p[0]},${p[1]};${p[0]+6},${p[1]-5};${p[0]},${p[1]}`).attr('dur',(2+i*.3)+'s').attr('repeatCount','indefinite')});
flow(g2,[[300,420],[360,440],[420,460]],C.fauna,'fauna',2,'3 6');flow(g2,[[330,640],[420,620],[500,610]],C.fauna,'fauna',2,'3 6');
flow(g2,[[700,515],[680,530],[652,540]],C.org,'org',2.6);flow(g2,[[760,570],[700,560],[655,548]],C.org,'org',2.6);flow(g2,[[628,545],[560,520],[485,485]],C.org,'org',2.6);
mover(g2,[[760,570],[700,560],[655,548]],C.org,'org',4.5,3600,2);
flow(g2,[[880,430],[895,400],[903,380]],C.bio,'bio',2.6);flow(g2,[[910,385],[960,520],[995,630]],C.bio,'bio',2.6);mover(g2,[[910,385],[960,520],[995,630]],C.bio,'bio',4.5,4800,2);
flow(g2,[[1005,650],[1060,720],[1100,800]],C.acopio,'acopio',2.6,'4 6');flow(g2,[[995,655],[940,760],[900,820]],C.acopio,'acopio',2.6,'4 6');
[T[0],T[1]].forEach(a=>{flow(g2,a,C.truck,'truck',1.5);mover(g2,a,C.truck,'truck',5,7000,1)});
PJ.forEach(p=>{const [x,y]=p.xy;const s=14;const base=[[x-s,y-s*.6],[x+s,y-s*.6],[x+s,y+s*.6],[x-s,y+s*.6]];const g=g2.append('g').attr('data-k',p.k);
 if(p.h>0){faces({p:base},p.h).forEach(f=>g.append('path').attr('d',f.d).attr('fill',p.c).attr('opacity',f.k==='r'?.75:.6));g.append('path').attr('d',pth(base,p.h)).attr('fill',p.c).attr('stroke','#fff').attr('stroke-width',1)}
 else{const q=P(p.xy);g.append('circle').attr('cx',q[0]).attr('cy',q[1]).attr('r',11).attr('fill','#fff').attr('stroke',p.c).attr('stroke-width',3);g.append('circle').attr('cx',q[0]).attr('cy',q[1]).attr('r',4.5).attr('fill',p.c)}});
[[[640,543],'Compostaje\ny semillero',[0,-34]],[[905,372],'Distrito agro-\nbiotecnológico',[0,-52]],[[1000,640],'Punto de acopio\ny circuito corto',[78,-6]],[[470,480],'Huerta y restauración\nde la ronda',[-20,-30]],[[540,640],'Aula y sendero\nde custodios',[-10,34]]].forEach(([xy,t,o])=>{const p=P(xy);lab(g2,[p[0]+o[0],p[1]+o[1]],t,{fs:15})});
{const p=P([450,600]);lab(g2,[p[0]-40,p[1]+40],'≈20 % liberado\npara el humedal',{c:'#1f5f7a',fs:18})}

/* ---------- panel ---------- */
const nOut=G.b.filter(b=>b.out).length,nNaves=G.b.filter(b=>b.out&&b.h>=9).length,pct=(G.frac*100).toFixed(1).replace('.',','),ha=(42*G.frac).toFixed(1).replace('.',','),haC=(42*(1-G.frac)).toFixed(1).replace('.',',');
const DY=[
 [{k:'truck',c:C.truck,t:'Camiones de carga',d:'Entran por las puertas sobre la Diagonal 38 Sur, las Américas y la Agoberto Mejía hacia las bodegas.'},
  {k:'cong',c:C.truck,t:'Congestión',d:'Los ejes de Gran Bodega y Bodega Reina concentran el tráfico de carga (diagnóstico del PRM).'},
  {k:'cargo',c:C.cargo,t:'Cargue y descargue',d:'Coteros y comerciantes mueven la mercancía en cada nave.'},
  {k:'buy',c:C.buy,t:'Compradores',d:'Tenderos y restaurantes salen hacia los barrios con lo que compran.'},
  {k:'res',c:C.res,t:'Residuos y vertimientos',d:'El mal manejo de residuos sólidos y vertimientos presiona el humedal La Vaca, que ha perdido área.'}],
 [{k:'fauna',c:C.fauna,t:'El humedal se reactiva',d:`Corabastos cede el ${pct} % de su área del lado del humedal. El borde sigue las calles internas: salen ${nNaves} naves completas y ${nOut-nNaves} construcciones menores; ninguna queda partida.`},
  {k:'org',c:C.org,t:'Orgánicos que vuelven a la tierra',d:'Los orgánicos de las bodegas van a la estación de compostaje; el abono alimenta las huertas de la ronda.'},
  {k:'bio',c:C.bio,t:'Proteína de hongos',d:'El distrito agro-biotecnológico, en el parqueadero Martillo, cultiva hongos con sustratos de las bodegas y los lleva al punto de acopio.'},
  {k:'acopio',c:C.acopio,t:'Circuito corto',d:'Del punto de acopio salen alimentos hacia comedores y tiendas de barrio.'},
  {k:'truck',c:C.truck,t:'Menos carga concentrada',d:'Con menos área y un abastecimiento más diverso, baja la carga que entra a la central.'}]];
const SIDE=[
 {h:'La dinámica actual',p:'Axonometría construida con la planta de ocupación actual del Plan de Regularización y Manejo de Corabastos: cada nave está levantada en volumen y sobre ella se ven los flujos que hacen funcionar la central y la presión sobre el humedal La Vaca.',kpi:[['42 ha','área de la central'],['266,8 ha','área de influencia'],['126.600 m²','ocupación actual'],['207.752','personas por semana']]},
 {h:'Corabastos cede el 20 % al humedal',p:'La central se reduce del lado del humedal para que se reactive y vuelva a crecer. El corte va por las calles internas, así que salen naves enteras. En el borde nuevo aparecen proyectos con dinámicas distintas a la carga y la descarga.',kpi:[[haC+' ha','central propuesta'],[ha+' ha','vuelven al humedal'],[pct+' %','de las 42 ha'],[String(nNaves),'naves completas que salen']]}];
let cur=0,sel=null;
function side(){const s=SIDE[cur];document.getElementById('side').innerHTML=`<h2>${s.h}</h2><p>${s.p}</p><div class="kpi">${s.kpi.map(([b,t])=>`<div><b>${b}</b><span>${t}</span></div>`).join('')}</div>`+
 DY[cur].map(d=>`<button class="dyn${sel===d.k?' on':''}" data-k="${d.k}"><span class="sw" style="background:${d.c}"></span><span><b>${d.t}</b><span>${d.d}</span></span></button>`).join('')+
 `<div class="src">Volúmenes levantados a partir de la planta «Ocupación actual» del documento «Diagnóstico y propuesta para la formulación del PRM» de Corabastos (2019); alturas aproximadas. Cifras del mismo documento. El recorte (${pct} % medido sobre el contorno de la planta) y la ubicación de los proyectos son propuesta del grupo.</div>`;
 document.querySelectorAll('.dyn').forEach(b=>b.onclick=()=>{sel=sel===b.dataset.k?null:b.dataset.k;hl();side()})}
function hl(){const g=cur?g2:g1;g.selectAll('[data-k]').attr('opacity',function(){const k=this.getAttribute('data-k');return !sel||k===sel?null:.12})}
let timer=null;
function go(i){cur=i;sel=null;d3.selectAll('.nav button').attr('aria-pressed',function(){return +this.dataset.s===i});
 document.getElementById('kick').textContent=`Corabastos · ${i+1} de 2`;document.getElementById('ttl').textContent=i?'Propuesta: Corabastos cede el 20 % al humedal':'Cómo funciona hoy la central';
 g1.interrupt().transition().duration(reduce?0:600).style('opacity',i?0:1);g2.interrupt().transition().duration(reduce?0:600).style('opacity',i?1:0);
 const to=i?0:1,outSel=bG.filter(b=>b.out);if(timer)timer.stop();
 if(reduce)drawB(outSel,()=>to);else{const from=outSel.datum()?(outSel.node().childNodes.length?1:0):to;const dur=1600;timer=d3.timer(el=>{const t=Math.min(1,el/dur),e=d3.easeCubicInOut(t);drawB(outSel,()=>from+(to-from)*e);if(t>=1){timer.stop();timer=null}})}
 regP.interrupt().transition().delay(i?500:0).duration(reduce?0:1400).attr('opacity',i?.95:0);
 g1.selectAll('[data-k]').attr('opacity',null);g2.selectAll('[data-k]').attr('opacity',null);side()}
d3.selectAll('.nav button').on('click',function(){go(+this.dataset.s)});
addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(0)});
if(/solo/.test(location.search))document.body.classList.add('solo');
addEventListener('message',e=>{if(e.data&&e.data.coraSlide!==undefined)go(+e.data.coraSlide)});
g2.style('opacity',0);go(location.hash==='#2'?1:0);
setTimeout(()=>{const m=document.querySelector('main');if(m.scrollWidth>m.clientWidth)m.scrollLeft=(m.scrollWidth-m.clientWidth)*.25},200);
})();
