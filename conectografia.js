(async function(){
const [D,K,U]=await Promise.all(['assets/conectografia.json','assets/territorio_kennedy.geojson','assets/territorio_upl.geojson'].map(u=>fetch(u).then(r=>r.json())));
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const P=matchMedia('(max-width:760px)').matches;
const RED='#C8322B',BLUE='#2F4FA8',GREEN='#2E8B57',OCH='#B9771E',INK='#141414',SOFT='#55524B';

/* ---------- proyección isométrica ---------- */
const kgeom=K.features?K.features[0].geometry:K.geometry;
const [[x0,y0],[x1,y1]]=d3.geoBounds({type:'Feature',geometry:kgeom});
const lon0=(x0+x1)/2,lat0=(y0+y1)/2,mx=111320*Math.cos(lat0*Math.PI/180),my=110540;
const pl=([lon,lat])=>[(lon-lon0)*mx,(lat0-lat)*my];
const half=Math.max((x1-x0)*mx,(y1-y0)*my)/2*1.06;
const S=280/half,C30=Math.cos(Math.PI/6),S30=.5;
const OX=600,BASE=1560,STEP=330;
const iso=(ll,z=0)=>{const [x,y]=pl(ll);return[OX+(x-y)*C30*S,BASE+(x+y)*S30*S-z]};
const isoP=(x,y,z=0)=>[OX+(x-y)*C30*S,BASE+(x+y)*S30*S-z];
const LAY=[{k:'base',n:'Plano de Kennedy',z:0},{k:'cora',n:'Corabastos y humedal',z:STEP},{k:'esp',n:'Especies',z:STEP*2},{k:'proy',n:'Proyectos',z:STEP*3},{k:'act',n:'Actores humanos',z:STEP*4}];
const Z=Object.fromEntries(LAY.map(l=>[l.k,l.z]));

const svg=d3.select('#cg').attr('viewBox','0 0 1200 1900');
document.body.insertAdjacentHTML('beforeend','');
const root=svg.append('g');
const zoom=d3.zoom().scaleExtent([.5,6]).on('zoom',e=>root.attr('transform',e.transform));svg.call(zoom);
const defs=svg.append('defs');
const gPlanes=root.append('g'),gDrop=root.append('g'),gLinks=root.append('g'),gItems=root.append('g'),gLab=root.append('g');

/* ---------- planos con retícula ---------- */
const corner=(sx,sy,z)=>isoP(sx*half,sy*half,z);
LAY.forEach((L,i)=>{const g=gPlanes.append('g').attr('class','plane').attr('data-k',L.k).style('opacity',0);
 g.transition().delay(reduce?0:i*260).duration(600).style('opacity',1);
 const pts=[corner(-1,-1,L.z),corner(1,-1,L.z),corner(1,1,L.z),corner(-1,1,L.z)];
 g.append('path').attr('d','M'+pts.join('L')+'Z').attr('fill',i===0?'#ECE9E1':'rgba(255,255,255,.5)').attr('stroke','#B9B4A8').attr('stroke-width',1.1);
 const n=8;for(let j=1;j<n;j++){const t=-1+2*j/n;g.append('path').attr('d',`M${corner(t,-1,L.z)}L${corner(t,1,L.z)}M${corner(-1,t,L.z)}L${corner(1,t,L.z)}`).attr('stroke','#CFCAC0').attr('stroke-width',.7)}
 const lp=corner(1,-1,L.z);g.append('text').attr('class','lyr').attr('x',lp[0]+18).attr('y',lp[1]+5).text(L.n);
 if(i>0){const a=corner(1,-1,0),b=corner(1,-1,L.z),c=corner(-1,-1,L.z),d=corner(-1,-1,0),e2=corner(1,1,L.z),f=corner(1,1,0);
  [[a,b],[d,c],[f,e2]].forEach(([p,q])=>g.append('path').attr('d',`M${p}L${q}`).attr('stroke','#C9C4B8').attr('stroke-dasharray','4 6').attr('stroke-width',.8))}
});

/* ---------- capa base: plano de Kennedy ---------- */
const isoPath=z=>d3.geoPath(d3.geoTransform({point:function(lon,lat){const p=iso([lon,lat],z);this.stream.point(p[0],p[1])}}));
const base=gItems.append('g');
base.append('path').datum({type:'Feature',geometry:kgeom}).attr('d',isoPath(0)).attr('fill','#D9D4C8').attr('stroke','#6f6a5f').attr('stroke-width',1.6);
base.selectAll('path.upl').data(U.features||[]).join('path').attr('class','upl').attr('d',isoPath(0)).attr('fill','none').attr('stroke','#9C968A').attr('stroke-width',.7);
base.selectAll('circle.h').data(D.huertas).join('circle').attr('class','h').attr('cx',d=>iso(d)[0]).attr('cy',d=>iso(d)[1]).attr('r',.9).attr('fill','#7c9a6a').attr('opacity',.55);
Object.entries(D.hum).forEach(([n,c])=>{const p=iso(c);base.append('ellipse').attr('cx',p[0]).attr('cy',p[1]).attr('rx',12).attr('ry',6).attr('fill','#9CC3D5').attr('stroke','#2F6F8F').attr('stroke-width',1)});
base.append('text').attr('class','small').attr('x',corner(-1,1,0)[0]).attr('y',corner(-1,1,0)[1]+34).attr('text-anchor','middle').text('Límite de Kennedy, UPL, huertas registradas (IDECA) y humedales');

/* ---------- capa Corabastos y humedal ---------- */
const cora=gItems.append('g');
const box=(ll,w,d,h,z,col)=>{const [x,y]=pl(ll);const P4=[[x-w/2,y-d/2],[x+w/2,y-d/2],[x+w/2,y+d/2],[x-w/2,y+d/2]];const top=P4.map(([a,b])=>isoP(a,b,z+h)),bot=P4.map(([a,b])=>isoP(a,b,z));
 return{top:'M'+top.join('L')+'Z',r:`M${bot[1]}L${bot[2]}L${top[2]}L${top[1]}Z`,l:`M${bot[2]}L${bot[3]}L${top[3]}L${top[2]}Z`}};
const humG=cora.append('g');const coraG=cora.append('g');const coraT=coraG.append('path'),coraR=coraG.append('path'),coraL=coraG.append('path');
const vaca=D.hum['Humedal La Vaca'];
const humPoly=r=>{const [cx,cy]=pl(vaca);return'M'+d3.range(48).map(i=>{const a=i/48*2*Math.PI,k=1+.18*Math.sin(a*3)+.1*Math.cos(a*5);return isoP(cx+Math.cos(a)*r*k,cy+Math.sin(a)*r*k*.8,Z.cora)}).join('L')+'Z'};
const humP=humG.append('path').attr('fill','#9CC3D5').attr('fill-opacity',.75).attr('stroke','#2F6F8F').attr('stroke-width',1.4);
const humRing=humG.append('path').attr('fill','none').attr('stroke',GREEN).attr('stroke-width',1.6).attr('stroke-dasharray','5 5');
const coraLab=cora.append('text').attr('class','lbl'),humLab=cora.append('text').attr('class','lbl').attr('fill','#1f5f7a');
const gauge=cora.append('g');
const cp=iso(D.proj.E1,Z.cora);
function scenario(s){const prop=s==='prop';const w=prop?800:1400,d=prop?650:1100,h=prop?45:90;const b=box(D.proj.E1,w,d,h,Z.cora);
 const t=d3.transition().duration(reduce?0:1400).ease(d3.easeCubicInOut);
 coraG.attr('opacity',.92);coraT.attr('fill','#E9B66B').attr('stroke','#8a5a1a');coraR.attr('fill','#C98F3E');coraL.attr('fill','#A8742C');coraT.transition(t).attr('d',b.top);coraR.transition(t).attr('d',b.r);coraL.transition(t).attr('d',b.l);
 humP.transition(t).attr('d',humPoly(prop?1300:600));humRing.transition(t).attr('d',humPoly(prop?1550:700)).style('opacity',prop?1:0);
 const c=iso(D.proj.E1,Z.cora+h+10);coraLab.transition(t).attr('x',c[0]+60).attr('y',c[1]-34).text(prop?'Corabastos reduce su peso':'Corabastos hoy');
 const hv=iso(vaca,Z.cora);humLab.transition(t).attr('x',hv[0]-250).attr('y',hv[1]+(prop?70:40)).text(prop?'Humedal La Vaca se recupera':'Humedal La Vaca bajo presión');
 gauge.selectAll('*').remove();const gx=corner(-1,1,Z.cora)[0]-10,gy=corner(-1,1,Z.cora)[1]-150;
 gauge.append('text').attr('class','lbl').attr('x',gx-210).attr('y',gy).text('Dependencia del abastecimiento');
 gauge.append('rect').attr('x',gx-210).attr('y',gy+12).attr('width',210).attr('height',14).attr('rx',7).attr('fill','#E2DED4');
 gauge.append('rect').attr('x',gx-210).attr('y',gy+12).attr('height',14).attr('rx',7).attr('fill','#C98F3E').attr('width',prop?210:210).transition(t).attr('width',prop?150:210);
 gauge.append('text').attr('class','small').attr('x',gx-210).attr('y',gy+46).text(prop?'Propuesta: parte del abastecimiento pasa a circuitos locales':'Hoy: casi todo depende de la central');
 gauge.append('text').attr('class','small').attr('x',gx-210).attr('y',gy+64).attr('fill','#8A867C').text('Proporción ilustrativa; la meta se fija con datos');
 d3.selectAll('#ctr [data-s]').attr('aria-pressed',function(){return this.dataset.s===s});
 projG.transition(t).style('opacity',prop?1:.15);actG.transition(t).style('opacity',prop?1:.25);linkSel.transition(t).style('opacity',prop?null:.08);
 note(prop)}

/* ---------- capa de proyectos ---------- */
const PJ=[
 {e:'E1',n:'Corabastos',ic:'i-fabrica',c:'#8a5a1a',ll:D.proj.E1,ctx:1},
 {e:'E12',n:'Distrito agro-biotecnológico',ic:'i-fabrica',c:'#2F4FA8',ll:D.proj.E12},
 {e:'E7',n:'Punto de acopio, venta y tablero',ic:'i-casa',c:'#B9771E',ll:D.proj.E7},
 {e:'E14',n:'Aprendizaje y deliberación',ic:'i-delib',c:'#7a52b3',ll:[D.proj.E7[0]+.0075,D.proj.E7[1]-.0045]},
 {e:'E10',n:'Compostaje y semillero',ic:'i-ciclo',c:GREEN,ll:D.proj.E10},
 {e:'E2',n:'Huerta en vivienda informal',ic:'i-hoja',c:GREEN,ll:D.proj.E2},
 {e:'E3',n:'Huerta en vivienda en altura',ic:'i-hoja',c:GREEN,ll:D.proj.E3},
 {e:'E4',n:'Huerta en lote baldío',ic:'i-hoja',c:GREEN,ll:D.proj.E4},
 {e:'E5',n:'Huerta en la ronda del humedal',ic:'i-gota',c:'#2F6F8F',ll:D.proj.E5},
 {e:'E9',n:'Tiendas y puntos de separación',ic:'i-moneda',c:'#B9771E',ll:D.proj.E9},
 {e:'E6',n:'Comedores comunitarios',ic:'i-hog',c:'#a2427a',ll:D.comedores[0],multi:D.comedores},
 {e:'E15',n:'Huertas escolares',ic:'i-edu',c:'#a2427a',ll:D.proj.E15,multi:D.colegios}];
const EMAP={E8:'E7',E16:'E7',E11:'E9',E13:'E12'};
const pjBy=Object.fromEntries(PJ.map(p=>[p.e,p]));
const projG=gItems.append('g');
PJ.forEach(p=>{p.xy=iso(p.ll,Z.proy);
 if(p.multi)projG.append('g').selectAll('circle').data(p.multi).join('circle').attr('cx',d=>iso(d,Z.proy)[0]).attr('cy',d=>iso(d,Z.proy)[1]).attr('r',p.e==='E15'?2.6:4.5).attr('fill',p.c).attr('opacity',.6);
 const g=projG.append('g').attr('transform',`translate(${p.xy})`).attr('class','pj').attr('data-e',p.e);
 g.append('ellipse').attr('rx',22).attr('ry',11).attr('fill',p.c).attr('opacity',.18);
 g.append('circle').attr('r',15).attr('cy',-14).attr('fill','#fff').attr('stroke',p.c).attr('stroke-width',2.2).attr('stroke-dasharray',p.ctx?'4 3':null);
 g.append('use').attr('href','#'+p.ic).attr('x',-9).attr('y',-23).attr('width',18).attr('height',18).style('color',p.c);
 // caída al plano base
 const b=iso(p.ll,0);gDrop.append('path').attr('d',`M${p.xy}L${b}`).attr('stroke','#B5AFA2').attr('stroke-width',.8).attr('stroke-dasharray','2 4');
});
// etiquetas de proyectos sin superposición
(function(){const placed=PJ.map(p=>[p.xy[0]-17,p.xy[1]-31,p.xy[0]+17,p.xy[1]+3]);PJ.slice().sort((a,b)=>a.xy[1]-b.xy[1]).forEach(p=>{const w=p.n.length*8.1,h=18;const C=[[22,-8,'start'],[-22,-8,'end'],[0,-40,'middle'],[0,24,'middle'],[22,14,'start'],[-22,14,'end'],[22,-30,'start'],[-22,-30,'end']];
 for(const [dx,dy,a] of C){const x=a==='start'?p.xy[0]+dx:a==='end'?p.xy[0]+dx-w:p.xy[0]-w/2,y=p.xy[1]+dy-14;if(!placed.some(q=>x<q[2]&&x+w>q[0]&&y<q[3]&&y+h>q[1])){placed.push([x,y,x+w,y+h]);
  projG.append('text').attr('class','lbl').attr('x',p.xy[0]+dx).attr('y',p.xy[1]+dy).attr('text-anchor',a).attr('fill',p.c).text(p.n);return}}})})();
/* ---------- capa de especies ---------- */
const GLY={ave:'M-9 1c3-6 9-8 14-5l4-3-1 5c2 3 0 7-4 8l-10 1c-2 0-4-2-3-6z',anfibio:'M-8 3c0-6 4-9 8-9s8 3 8 9c0 3-3 4-8 4s-8-1-8-4zM-9 6l-4 3M9 6l4 3',insecto:'M0-8a3 3 0 1 1 0 .1M-1-4h2v12h-2zM-1-2c-6-5-11-2-9 2 1 3 6 2 9-1M1-2c6-5 11-2 9 2-1 3-6 2-9-1',lombriz:'M-11 2c3-5 6 3 9-1s6 3 9-1 5 1 5 1',hongo:'M-10 0c0-7 20-7 20 0zM-3 0v8h6V0',micro:'M0-7a7 7 0 1 1 0 14a7 7 0 1 1 0-14M-3-2a1.5 1.5 0 1 1 0 .1M3 2a1.5 1.5 0 1 1 0 .1'};
const espG=gItems.append('g');
const SPI=[
 {at:'Humedal La Vaca',ll:D.hum['Humedal La Vaca'],kinds:['ave','ave','anfibio'],n:`Humedal La Vaca · ${D.spp['La Vaca'].length} especies registradas`,list:D.spp['La Vaca'].slice(0,3)},
 {at:'Humedal El Burro',ll:D.hum['Humedal El Burro'],kinds:['ave','ave'],n:`Humedal El Burro · ${D.spp['El Burro'].length} especies registradas`,list:D.spp['El Burro'].slice(0,3)},
 {at:'Humedal de Techo',ll:D.hum['Humedal de Techo'],kinds:['ave'],n:`Humedal de Techo · ${D.spp['Techo'].length} especies registradas`,list:D.spp['Techo'].slice(0,2)},
 {at:'E2',ll:D.proj.E2,kinds:['insecto','lombriz','ave'],n:'Polinizadores, lombrices y aves pequeñas'},
 {at:'E4',ll:D.proj.E4,kinds:['insecto','lombriz'],n:'Suelo, vegetación y fauna del lote'},
 {at:'E5',ll:D.proj.E5,kinds:['ave','anfibio'],n:'Aves y anfibios de la ronda'},
 {at:'E10',ll:D.proj.E10,kinds:['lombriz','micro'],n:'Lombrices y microorganismos'},
 {at:'E12',ll:D.proj.E12,kinds:['hongo','micro'],n:'Hongos y su microbiota'},
 {at:'E3',ll:D.proj.E3,kinds:['insecto','micro'],n:'Polinizadores y microbiota del sustrato'}];
SPI.forEach(s=>{s.xy=iso(s.ll,Z.esp);const g=espG.append('g').attr('transform',`translate(${s.xy})`);
 s.kinds.forEach((k,i)=>{const gx=(i-(s.kinds.length-1)/2)*24;const c=k==='ave'||k==='anfibio'?'#2F6F8F':k==='hongo'||k==='micro'?'#7a52b3':GREEN;
  g.append('circle').attr('cx',gx).attr('cy',-12).attr('r',11).attr('fill','#fff').attr('stroke',c).attr('stroke-width',1.6);
  g.append('path').attr('d',GLY[k]).attr('transform',`translate(${gx},-12) scale(.75)`).attr('fill',k==='lombriz'?'none':c).attr('stroke',c).attr('stroke-width',k==='lombriz'?2.2:1).attr('stroke-linecap','round')});
 const b=iso(s.ll,0);gDrop.append('path').attr('d',`M${s.xy}L${b}`).attr('stroke','#9ab7c6').attr('stroke-width',.8).attr('stroke-dasharray','2 4');});
(function(){const placed=SPI.map(s=>{const n=s.kinds.length;return[s.xy[0]-n*12-4,s.xy[1]-25,s.xy[0]+n*12+4,s.xy[1]+1]});SPI.slice().sort((a,b)=>a.xy[1]-b.xy[1]).forEach(s=>{const lines=[s.n,...(s.list||[]).map(x=>'· '+x)];const w=Math.max(...lines.map(l=>l.length))*7.6,h=lines.length*17;const o=s.kinds.length*12+10;
 const C=[[o,-8,'start'],[-o,-8,'end'],[0,16,'middle'],[0,-40-h,'middle'],[o,14,'start'],[-o,14,'end'],[o,40,'start'],[-o,40,'end'],[o+60,-50,'start'],[-o-60,-50,'end'],[o+80,60,'start'],[-o-80,60,'end'],[-o-170,-80,'end'],[o+170,-90,'start'],[-o-200,90,'end']];
 for(const [dx,dy,a] of C){const x=a==='start'?s.xy[0]+dx:a==='end'?s.xy[0]+dx-w:s.xy[0]-w/2,y=s.xy[1]+dy-14;if(!placed.some(q=>x<q[2]&&x+w>q[0]&&y<q[3]&&y+h>q[1])){placed.push([x,y,x+w,y+h]);
  const t=espG.append('text').attr('x',s.xy[0]+dx).attr('y',s.xy[1]+dy).attr('text-anchor',a);
  lines.forEach((l,i)=>t.append('tspan').attr('x',s.xy[0]+dx).attr('dy',i?16:0).attr('class',i?'small':'lbl').attr('fill',i?SOFT:'#1f5f7a').text(l));if(Math.abs(dx)>o||Math.abs(dy)>30)espG.append('path').attr('d',`M${s.xy[0]},${s.xy[1]-12}L${a==='start'?x-4:a==='end'?x+w+4:s.xy[0]},${y+8}`).attr('stroke','#1f5f7a').attr('stroke-width',.7).attr('opacity',.6);return}}})})();
/* ---------- capa de actores (desde la matriz del grupo) ---------- */
const AG=[
 {n:'Hortelanos',k:['hortelano'],ic:'i-per',e:['E2','E3','E4','E7','E10','E14','E15']},
 {n:'Hogares',k:['hogares'],ic:'i-hog',e:['E2','E6','E9','E10','E12']},
 {n:'Vendedores barriales',k:['vendedores'],ic:'i-per',e:['E7','E14']},
 {n:'Tenderos',k:['tenderos'],ic:'i-moneda',e:['E1','E7','E9','E12','E14']},
 {n:'Cocineras de comedores',k:['cocineras'],ic:'i-hog',e:['E6','E12']},
 {n:'Estudiantes y docentes',k:['estudiantes','colegios'],ic:'i-edu',e:['E6','E15']},
 {n:'Juntas de Acción Comunal',k:['JAC'],ic:'i-grupo',e:['E2','E4','E10','E14']},
 {n:'Copropietarios',k:['copropietarios'],ic:'i-hog',e:['E3']},
 {n:'Custodios del humedal',k:['custodios'],ic:'i-grupo',e:['E5']},
 {n:'Técnicos y cooperativa',k:['técnicos'],ic:'i-per',e:['E12']},
 {n:'Comerciantes mayoristas',k:['mayoristas'],ic:'i-moneda',e:['E1','E12']},
 {n:'Transportadoras y coteros',k:['coteros','transportadoras'],ic:'i-obj',e:['E1']},
 {n:'Operadora de aseo y UAESP',k:['UAESP'],ic:'i-pub',e:['E10','E9']},
 {n:'Secretaría de Ambiente',k:['Secretaría de Ambiente'],ic:'i-pub',e:['E5','E9']},
 {n:'Alcaldía Local',k:['Alcaldía'],ic:'i-pub',e:['E4','E14']}];
const actG=gItems.append('g');
// posición: centro de sus proyectos en la capa superior, separados para no encimarse
AG.forEach(a=>{const ps=a.e.map(e=>pjBy[EMAP[e]||e]).filter(Boolean);a.ps=ps;const m=[d3.mean(ps,p=>p.ll[0]),d3.mean(ps,p=>p.ll[1])];a.xy=iso(m,Z.act)});
const sim=d3.forceSimulation(AG).force('x',d3.forceX(a=>a.xy[0]).strength(.3)).force('y',d3.forceY(a=>a.xy[1]).strength(.3)).force('c',d3.forceCollide(46)).stop();AG.forEach(a=>{a.x=a.xy[0];a.y=a.xy[1]});for(let i=0;i<200;i++)sim.tick();
const linkSel=gLinks.selectAll('path').data(AG.flatMap(a=>a.ps.map(p=>({a,p})))).join('path').attr('fill','none').attr('stroke',RED).attr('stroke-width',1.1).attr('stroke-dasharray','5 4').attr('opacity',.75)
 .attr('d',({a,p})=>{const t=[p.xy[0],p.xy[1]-30];return`M${a.x},${a.y+8}C${a.x},${a.y+120} ${t[0]},${t[1]-110} ${t[0]},${t[1]}`});
// proyectos con sus especies (azul)
const PS=[['E2','E2'],['E4','E4'],['E5','E5'],['E5','Humedal La Vaca'],['E10','E10'],['E12','E12'],['E3','E3'],['E1','Humedal La Vaca']];
const spBy=Object.fromEntries(SPI.map(s=>[s.at,s]));
gLinks.selectAll('path.b').data(PS).join('path').attr('class','b').attr('fill','none').attr('stroke',d=>d[0]==='E1'?OCH:BLUE).attr('stroke-width',1.1).attr('stroke-dasharray','4 4').attr('opacity',.8)
 .attr('d',([e,s])=>{const p=pjBy[e].xy,q=spBy[s].xy;return`M${p[0]},${p[1]+8}C${p[0]},${p[1]+120} ${q[0]},${q[1]-140} ${q[0]},${q[1]-24}`});
// especies del humedal con la capa de recuperación (verde)
['Humedal La Vaca','Humedal El Burro','Humedal de Techo'].forEach(h=>{const p=spBy[h].xy,q=iso(D.hum[h],Z.cora);gLinks.append('path').attr('fill','none').attr('stroke',GREEN).attr('stroke-width',1.3).attr('stroke-dasharray','4 4').attr('d',`M${p}L${q}`)});
// figuras de actores
AG.forEach(a=>{const g=actG.append('g').attr('class','ag').attr('transform',`translate(${a.x},${a.y})`).style('cursor','pointer');
 const n=Math.min(5,2+a.ps.length);for(let i=0;i<n;i++){const ang=i/n*2*Math.PI,r=n>1?13:0;g.append('use').attr('href','#'+a.ic).attr('x',Math.cos(ang)*r-9).attr('y',Math.sin(ang)*r*.55-26).attr('width',18).attr('height',18).style('color',INK)}
 g.append('ellipse').attr('rx',24).attr('ry',8).attr('fill','#141414').attr('opacity',.1);
 g.on('mouseenter',()=>focusA(a)).on('mouseleave',()=>focusA(null)).on('click',()=>focusA(a,true))});
// etiquetas de actores en dos columnas fuera del plano, con línea guía
(function(){const top=corner(0,-1,Z.act)[1],L=AG.filter(a=>a.x<OX).sort((p,q)=>p.y-q.y),R=AG.filter(a=>a.x>=OX).sort((p,q)=>p.y-q.y);
 const cy=corner(1,-1,Z.act)[1];const col=(arr,side)=>{const x=side<0?OX-540:OX+540;const y0=Math.min(...arr.map(a=>a.y))-60,dy=Math.max(26,(Math.max(...arr.map(a=>a.y))-y0+40)/Math.max(1,arr.length-1));let shift=0;
  arr.forEach((a,i)=>{let y=y0+i*dy+shift;if(side>0&&Math.abs(y-cy)<36){shift+=72-Math.abs(y-cy);y=y0+i*dy+shift}gLab.append('path').attr('d',`M${a.x+side*20},${a.y-14}L${x-side*8},${y-5}`).attr('stroke','#141414').attr('stroke-width',.7).attr('opacity',.5).attr('class','al').datum(a);
   gLab.append('text').attr('class','lbl ag-l').datum(a).attr('x',x).attr('y',y).attr('text-anchor',side<0?'end':'start').attr('font-size',15).text(a.n.toUpperCase()).style('letter-spacing','.04em').style('cursor','pointer')
    .on('mouseenter',()=>focusA(a)).on('mouseleave',()=>focusA(null))})};
 col(L,-1);col(R,1)})();
function focusA(a){linkSel.attr('opacity',d=>!a?.75:(d.a===a?1:.06)).attr('stroke-width',d=>a&&d.a===a?2:1.1);
 actG.selectAll('g.ag').attr('opacity',function(){return !a||d3.select(this).datum()===a?1:.25});
 gLab.selectAll('text.ag-l').attr('fill',d=>a&&d===a?RED:INK);projG.selectAll('g.pj').attr('opacity',function(){const e=this.dataset.e;return !a||a.ps.some(p=>p.e===e)?1:.25})}
AG.forEach((a,i)=>{actG.selectAll('g.ag').filter((d,j)=>j===i).datum(a)});

/* ---------- textos y escenarios ---------- */
const lp=corner(-1,-1,Z.act);
function note(prop){document.getElementById('note').innerHTML=prop?`<b>Cómo leer la conectografía.</b> Arriba, los actores humanos de la matriz del grupo; las líneas rojas los llevan a los proyectos donde trabajan. Las líneas azules unen cada proyecto con las especies que necesita o cuida. Abajo, Corabastos reduce su peso en el abastecimiento y el humedal La Vaca gana espacio para recuperarse. Las ubicaciones de los proyectos son propuestas por validar; comedores y colegios son reales (IDECA).`
 :`<b>Hoy.</b> El abastecimiento depende casi por completo de Corabastos y el humedal La Vaca soporta la presión de su actividad. Los proyectos de la propuesta todavía no existen.`}
d3.selectAll('#ctr [data-s]').on('click',function(){scenario(this.dataset.s)});
// entrada animada
[gDrop,gLinks,gItems,gLab].forEach((g,i)=>g.style('opacity',0).transition().delay(reduce?0:1300+i*250).duration(700).style('opacity',1));
linkSel.attr('stroke-dashoffset',0);
scenario('hoy');setTimeout(()=>scenario('prop'),reduce?0:2600);
// encuadre inicial
const fit=()=>{const b0=root.node().getBBox();svg.attr('viewBox',`${b0.x-20} ${b0.y-20} ${b0.width+40} ${b0.height+40}`).attr('width',null).attr('height',null).style('width','100%').style('height','auto');root.attr('transform',null)};
svg.on('.zoom',null);fit();

})();
setTimeout(()=>{const m=document.querySelector('main');if(m.scrollWidth>m.clientWidth)m.scrollLeft=(m.scrollWidth-m.clientWidth)/2},300);
