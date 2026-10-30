(function(){
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const svg=d3.select('#st');
const C={truck:'#C8322B',buy:'#B9771E',cargo:'#7A5C2E',res:'#6B4F2A',hum:'#3E8FB0',org:'#2E8B57',bio:'#6A4FB3',fauna:'#2F6F8F',acopio:'#B9771E'};
// --- geometría trazada sobre la axonometría del PRM (coordenadas de la imagen) ---
const CENTRAL=[[85,296],[565,184],[850,282],[1100,350],[1185,380],[1192,420],[1180,470],[1130,515],[1060,545],[660,688],[470,648],[300,620],[268,608],[240,520],[195,450],[150,390],[110,320]];
const OESTE=[[311,243],[85,296],[110,320],[150,390],[195,450],[240,520],[268,608],[300,620],[452,645]]; // 20 % del área, lado del humedal
const HUMEDAL=[[38,302],[85,296],[110,320],[150,390],[195,450],[240,520],[268,608],[250,655],[205,645],[160,565],[115,480],[75,405],[42,345]];
const pts=a=>'M'+a.map(p=>p.join(',')).join('L')+'Z';
const defs=svg.append('defs');
const mk=(id,c)=>defs.append('marker').attr('id',id).attr('viewBox','0 0 10 10').attr('refX',8).attr('refY',5).attr('markerWidth',8).attr('markerHeight',8).attr('orient','auto').append('path').attr('d','M0 0L10 5L0 10z').attr('fill',c);
Object.entries(C).forEach(([k,c])=>mk('m-'+k,c));
const glow=defs.append('filter').attr('id','glow').attr('x','-20%').attr('y','-20%').attr('width','140%').attr('height','140%');glow.append('feGaussianBlur').attr('stdDeviation',4);
const hg=defs.append('linearGradient').attr('id','humg').attr('x1',0).attr('x2',1);hg.append('stop').attr('offset','0').attr('stop-color','#7FB8CF');hg.append('stop').attr('offset','1').attr('stop-color','#9CCB9A');
const clip=defs.append('clipPath').attr('id','grow');const clipR=clip.append('rect').attr('x',0).attr('y',0).attr('height',808).attr('width',0);

svg.append('image').attr('href','assets/corabastos_3d.jpg').attr('width',1276).attr('height',808);
const gBase=svg.append('g'),g1=svg.append('g'),g2=svg.append('g'),gLab=svg.append('g');
// humedal actual (en ambas láminas)
const humNow=gBase.append('path').attr('d',pts(HUMEDAL)).attr('fill','#8FC1D4').attr('fill-opacity',.55).attr('stroke',C.hum).attr('stroke-width',1.6);
gBase.append('path').attr('d',pts(CENTRAL)).attr('fill','none').attr('stroke','#222').attr('stroke-width',1.6).attr('stroke-dasharray','6 5');
const lab=(g,x,y,t,o={})=>{const tt=g.append('text').attr('x',x).attr('y',y).attr('text-anchor',o.a||'start').attr('font-size',o.fs||15).attr('font-weight',o.fw||700).attr('fill',o.c||'#141414').attr('paint-order','stroke').attr('stroke','#F4F2EC').attr('stroke-width',4).attr('stroke-linejoin','round');
 String(t).split('\n').forEach((l,i)=>tt.append('tspan').attr('x',x).attr('dy',i?(o.fs||15)*1.2:0).text(l));return tt};
lab(gBase,40,272,'Humedal La Vaca',{c:'#1f5f7a',fs:18});

/* ---------- flujos animados ---------- */
function flow(g,d,col,key,w=2.6,dash='8 7',dur=1400){const p=g.append('path').attr('d',d).attr('fill','none').attr('stroke',col).attr('stroke-width',w).attr('stroke-linecap','round').attr('stroke-dasharray',dash).attr('marker-end',`url(#m-${key})`).attr('data-k',key);
 if(!reduce)(function loop(){p.attr('stroke-dashoffset',0).transition().duration(dur).ease(d3.easeLinear).attr('stroke-dashoffset',-30).on('end',loop)})();return p}
function mover(g,d,col,key,r=6,dur=5200,n=2){const id='mp'+Math.random().toString(36).slice(2);g.append('path').attr('id',id).attr('d',d).attr('fill','none').attr('stroke','none');
 for(let i=0;i<n;i++){const c=g.append('rect').attr('x',-r).attr('y',-r*.6).attr('width',r*2).attr('height',r*1.2).attr('rx',2).attr('fill',col).attr('data-k',key);
  if(!reduce){c.append('animateMotion').attr('dur',dur+'ms').attr('repeatCount','indefinite').attr('begin',(i*dur/n)+'ms').attr('rotate','auto').append('mpath').attr('href','#'+id)}else c.attr('transform',`translate(${d.match(/M([\d.]+),([\d.]+)/).slice(1).join(',')})`)}}
function pulse(g,x,y,col,key,r=7){const c=g.append('circle').attr('cx',x).attr('cy',y).attr('r',r).attr('fill',col).attr('data-k',key).attr('opacity',.85);
 if(!reduce){const a=c.append('animate').attr('attributeName','r').attr('values',`${r*.6};${r*1.5};${r*.6}`).attr('dur',(1.6+Math.random()*.8)+'s').attr('repeatCount','indefinite')}return c}

/* ================= LÁMINA 1 · HOY ================= */
// congestión en los ejes de Gran Bodega y Bodega Reina (diagnóstico PRM)
[[[384,240],[704,312]],[[312,283],[662,360]],[[278,316],[636,399]]].forEach(([a,b])=>g1.append('path').attr('d',`M${a}L${b}`).attr('stroke',C.truck).attr('stroke-width',10).attr('opacity',.35).attr('filter','url(#glow)').attr('data-k','cong'));
// camiones de carga que entran
const T=['M1272,292 C1220,330 1195,370 1185,392 S1010,420 900,400 S770,345 740,330','M1262,470 C1150,520 1000,575 905,612 S800,520 760,470 S620,380 560,350','M610,800 C640,760 690,700 700,672 S640,560 600,520 S470,430 430,410','M420,118 C500,150 580,180 604,205 S640,250 650,290'];
T.forEach(d=>{flow(g1,d,C.truck,'truck',2.4);mover(g1,d,C.truck,'truck',7,6000,2)});
// compradores que salen con la mercancía hacia tiendas y restaurantes
['M560,560 C620,610 680,650 700,672 S640,760 560,800','M820,470 C870,540 890,590 905,612 S1000,720 1060,800'].forEach(d=>{flow(g1,d,C.buy,'buy',2.2,'4 6');mover(g1,d,C.buy,'buy',5,5000,3)});
// cargue y descargue con coteros en las bodegas
[[340,305],[470,330],[595,352],[300,345],[430,378],[560,402],[268,388],[400,420],[525,446],[240,425],[372,456],[495,490],[705,428],[825,470],[675,470],[795,510],[640,512],[760,552],[605,556],[725,592],[430,560],[565,612]].forEach(([x,y])=>pulse(g1,x,y,C.cargo,'cargo',5.5));
// residuos y vertimientos hacia el humedal
[[205,425],[232,478],[255,540],[288,598]].forEach(([x,y],i)=>{pulse(g1,x,y,C.res,'res',8);flow(g1,`M${x-8},${y}C${x-40},${y+6} ${x-60},${y+12} ${x-78},${y+22}`,C.res,'res',2.6,'5 5',1200)});
lab(g1,1010,600,'Camiones de carga\npor Agoberto Mejía\ny las Américas',{c:C.truck,fs:17});
lab(g1,24,700,'Residuos y vertimientos\nhacia el humedal',{c:C.res,fs:17,a:'start'});
lab(g1,700,170,'Congestión en Gran Bodega\ny Bodega Reina',{c:C.truck,fs:17});

/* ================= LÁMINA 2 · PROPUESTA ================= */
const west=g2.append('g');
west.append('path').attr('d',pts(OESTE)).attr('fill','#F4F2EC').attr('opacity',.86);
west.append('path').attr('d',pts(OESTE)).attr('fill','url(#humg)').attr('opacity',.85).attr('clip-path','url(#grow)');
west.append('path').attr('d',pts(OESTE)).attr('fill','none').attr('stroke',C.hum).attr('stroke-width',1.4);
g2.append('path').attr('d','M311,243L452,645').attr('stroke','#141414').attr('stroke-width',2.2).attr('stroke-dasharray','8 5');
// plantas y aves que regresan
const BIRD='M-9 1c3-6 9-8 14-5l4-3-1 5c2 3 0 7-4 8l-10 1c-2 0-4-2-3-6z';
[[150,330],[205,395],[175,470],[245,520],[300,480],[260,360],[95,360]].forEach(([x,y],i)=>{const b=g2.append('path').attr('d',BIRD).attr('fill',C.fauna).attr('transform',`translate(${x},${y}) scale(1.1)`).attr('data-k','fauna');
 if(!reduce)b.append('animateTransform').attr('attributeName','transform').attr('type','translate').attr('values',`${x},${y};${x+6},${y-5};${x},${y}`).attr('dur',(2+i*.3)+'s').attr('repeatCount','indefinite')});
['M10,240 C60,260 110,300 150,330','M20,470 C70,470 120,470 170,470'].forEach(d=>flow(g2,d,C.fauna,'fauna',2,'3 6'));
// proyectos que propician las nuevas dinámicas
const PJ=[{x:395,y:505,n:'Compostaje y semillero',c:C.org,k:'org'},{x:430,y:292,n:'Distrito agro-biotecnológico',c:C.bio,k:'bio'},{x:705,y:655,n:'Punto de acopio y circuito corto',c:C.acopio,k:'acopio'},{x:228,y:500,n:'Huerta y restauración de la ronda',c:C.org,k:'org'},{x:150,y:410,n:'Aula y sendero de custodios',c:C.fauna,k:'fauna'}];
// flujos nuevos
flow(g2,'M560,402 C520,440 460,470 410,497',C.org,'org',2.6);flow(g2,'M495,488 C470,495 440,500 410,503',C.org,'org',2.6);
flow(g2,'M382,512 C340,515 290,510 244,503',C.org,'org',2.6);
flow(g2,'M520,330 C490,318 465,305 446,298',C.bio,'bio',2.6);
flow(g2,'M440,306 C520,420 640,560 696,644',C.bio,'bio',2.6);
flow(g2,'M714,668 C700,720 660,770 610,800',C.acopio,'acopio',2.6,'4 6');flow(g2,'M720,664 C800,710 880,760 940,800',C.acopio,'acopio',2.6,'4 6');
mover(g2,'M560,402 C520,440 460,470 410,497',C.org,'org',5,4200,2);mover(g2,'M440,306 C520,420 640,560 696,644',C.bio,'bio',5,5200,2);
// menos camiones (dos rutas, más delgadas)
[T[0],T[1]].forEach(d=>{flow(g2,d,C.truck,'truck',1.6);mover(g2,d,C.truck,'truck',6,7000,1)});
PJ.forEach(p=>{const g=g2.append('g').attr('transform',`translate(${p.x},${p.y})`).attr('data-k',p.k);
 g.append('circle').attr('r',15).attr('fill','#fff').attr('stroke',p.c).attr('stroke-width',3);g.append('circle').attr('r',6).attr('fill',p.c)});
lab(g2,250,640,'8,4 ha liberadas\npara el humedal',{c:'#1f5f7a',fs:19});
lab(g2,30,200,'El humedal La Vaca\nrecupera el borde',{c:'#1f5f7a',fs:16,fw:600});
[[395,505,'Compostaje\ny semillero',22,-4,'start'],[430,292,'Distrito agro-\nbiotecnológico',-22,-30,'end'],[705,655,'Punto de acopio\ny circuito corto',24,4,'start'],[228,500,'Huerta y restauración\nde la ronda',-24,36,'start'],[150,410,'Aula y sendero\nde custodios',-22,-30,'start']].forEach(([x,y,t,dx,dy,a])=>lab(g2,x+dx,y+dy,t,{fs:17,c:'#141414',a}));

/* ---------- textos del panel ---------- */
const DY=[
 [{k:'truck',c:C.truck,t:'Camiones de carga',d:'Entran por la avenida Agoberto Mejía, las Américas y la Diagonal 38 Sur hacia las bodegas.'},
  {k:'cong',c:C.truck,t:'Congestión',d:'Los ejes de Gran Bodega y Bodega Reina concentran el tráfico de carga (diagnóstico del PRM).'},
  {k:'cargo',c:C.cargo,t:'Cargue y descargue',d:'Coteros y comerciantes mueven la mercancía en cada nave.'},
  {k:'buy',c:C.buy,t:'Compradores',d:'Tenderos y restaurantes salen hacia los barrios con lo que compran.'},
  {k:'res',c:C.res,t:'Residuos y vertimientos',d:'El mal manejo de residuos sólidos y vertimientos presiona el humedal La Vaca, que ha perdido área.'}],
 [{k:'fauna',c:C.fauna,t:'El humedal se reactiva',d:'Corabastos cede el 20 % de su área del lado del humedal; el borde se restaura y regresan aves y fauna.'},
  {k:'org',c:C.org,t:'Orgánicos que vuelven a la tierra',d:'Los orgánicos de las bodegas van a la estación de compostaje; el abono alimenta las huertas de la ronda.'},
  {k:'bio',c:C.bio,t:'Proteína de hongos',d:'El distrito agro-biotecnológico cultiva hongos con sustratos de las bodegas y los lleva al punto de acopio.'},
  {k:'acopio',c:C.acopio,t:'Circuito corto',d:'Del punto de acopio salen alimentos hacia comedores y tiendas de barrio.'},
  {k:'truck',c:C.truck,t:'Menos carga concentrada',d:'Al reducirse el área y diversificarse el abastecimiento, baja la carga que entra a la central.'}]];
const SIDE=[
 {h:'La dinámica actual',p:'Axonometría del Plan de Regularización y Manejo de Corabastos con los flujos que hoy la hacen funcionar y la presión que ejerce sobre el humedal La Vaca.',kpi:[['42 ha','área de la central'],['266,8 ha','área de influencia'],['126.600 m²','ocupación actual'],['207.752','personas por semana']]},
 {h:'Corabastos cede el 20 % al humedal',p:'La central se reduce un 20 % del lado del humedal para que se reactive y vuelva a crecer. En el borde nuevo se ubican proyectos que generan dinámicas distintas a la carga y la descarga.',kpi:[['33,6 ha','central propuesta'],['8,4 ha','vuelven al humedal'],['20 %','de las 42 ha'],['5','proyectos en el borde']]}];
let cur=0,sel=null;
function side(){const s=SIDE[cur];document.getElementById('side').innerHTML=`<h2>${s.h}</h2><p>${s.p}</p><div class="kpi">${s.kpi.map(([b,t])=>`<div><b>${b}</b><span>${t}</span></div>`).join('')}</div>`+
 DY[cur].map(d=>`<button class="dyn${sel===d.k?' on':''}" data-k="${d.k}"><span class="sw" style="background:${d.c}"></span><span><b>${d.t}</b><span>${d.d}</span></span></button>`).join('')+
 `<div class="src">Base: axonometría del documento «Diagnóstico y propuesta para la formulación del PRM» de Corabastos (2019), sin sus anotaciones. Cifras del mismo documento. El trazo del 20 % y la ubicación de los proyectos son propuesta del grupo.</div>`;
 document.querySelectorAll('.dyn').forEach(b=>b.onclick=()=>{sel=sel===b.dataset.k?null:b.dataset.k;hl();side()})}
function hl(){const g=cur?g2:g1;g.selectAll('[data-k]').attr('opacity',function(){const k=this.getAttribute('data-k');return !sel||k===sel?null:.12})}
function go(i){cur=i;sel=null;d3.selectAll('.nav button').attr('aria-pressed',function(){return +this.dataset.s===i});
 document.getElementById('kick').textContent=`Corabastos · ${i+1} de 2`;document.getElementById('ttl').textContent=i?'Propuesta: Corabastos cede el 20 % al humedal':'Cómo funciona hoy la central';
 g1.interrupt().transition().duration(reduce?0:600).style('opacity',i?0:1).style('pointer-events',i?'none':null);
 g2.interrupt().transition().duration(reduce?0:600).style('opacity',i?1:0);
 humNow.transition().duration(800).attr('fill-opacity',i?.75:.55);
 clipR.interrupt().attr('width',i?0:0);if(i)clipR.transition().delay(reduce?0:500).duration(reduce?0:2200).ease(d3.easeCubicInOut).attr('width',520);
 g1.selectAll('[data-k]').attr('opacity',null);g2.selectAll('[data-k]').attr('opacity',null);side()}
d3.selectAll('.nav button').on('click',function(){go(+this.dataset.s)});
addEventListener('keydown',e=>{if(e.key==='ArrowRight')go(1);if(e.key==='ArrowLeft')go(0)});
g2.style('opacity',0);go(location.hash==='#2'?1:0);
setTimeout(()=>{const m=document.querySelector('main');if(m.scrollWidth>m.clientWidth)m.scrollLeft=(m.scrollWidth-m.clientWidth)*.25},200);
})();
