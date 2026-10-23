(async function(){
const $=s=>document.querySelector(s);
const esc=s=>String(s??'').replace(/[&<>"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[m]));
const OCH='#F2B53A',RED='#E0623F',INK='#F2EFE8',SOFT='#B8B3A8',MUTE='#77736b',GRN='#4FB98C';
const SPC={cor:'#DE9F50',log:'#4EAECF',con:'#DE7766',res:'#8EBF4C',gob:'#9382E0',edu:'#CF7ABB',sal:'#4EBF94',mov:'#BFB080'};
const CONV={com:'#F5A642',lab:'#4CB6E8',ser:'#52CE92',rec:'#B8D94B',gov:'#929CE8',par:'#DF78DA',esp:'#827D76'};
const CONVD={gov:'8 5',par:'1 5',esp:'1 7'};
const tip=$('#tip');const showTip=(h,e)=>{tip.innerHTML=h;tip.style.display='block';tip.style.left=Math.min(e.clientX+14,innerWidth-290)+'px';tip.style.top=(e.clientY+14)+'px'};const hideTip=()=>tip.style.display='none';
const reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;

const [RED_DATA,LOGOS,VEN]=await Promise.all(['assets/red_kennedy.json','assets/logos_actores.json','assets/vensim_red.json'].map(u=>fetch(u).then(r=>r.json())));
const byId=new Map(RED_DATA.nodes.map(n=>[n.id,n]));
const ACT=id=>byId.get(id)||R3.PROP[id]||{id,short:id,name:id,cat:'pub',sph:'gob',lv:2};
function iconId(n){const nm=(n.name||'').toLowerCase();if(n.cat==='obj')return'i-obj';if(n.cat==='per')return'i-per';if(n.cat==='hog')return'i-hog';if(n.cat==='org')return'i-org';
 if(/comite|asamblea|consejo|cal|copaco|núcleo|mesa|guardian/.test(nm)||n.cat==='ins')return'i-ins';if(/aula|colegio|educaci|escuela|universidad|inem/.test(nm))return'i-edu';
 if(/salud|hospital|medic/.test(nm)&&!/corabastos/.test(nm))return'i-sal';if(n.cat==='emp')return'i-emp';return'i-pub'}
let clipN=0;
function actor(g,id,r,o={}){const a=ACT(id);const lg=LOGOS[id];
 g.append('circle').attr('r',r+5).attr('fill',SPC[a.sph]).attr('opacity',o.glow?.22:0).attr('class','aglow');
 g.append('circle').attr('r',r-1).attr('fill',a.id==='A01'?'#0e3820':lg?'#fff':d3.interpolateRgb('#11141c',SPC[a.sph])(a.lv===1?.32:a.lv===4?.4:.2));
 if(lg){const cid='cl'+(clipN++);g.append('clipPath').attr('id',cid).append('circle').attr('r',r-2.5);g.append('image').attr('href',lg).attr('x',-(r-3)).attr('y',-(r-3)).attr('width',(r-3)*2).attr('height',(r-3)*2).attr('clip-path',`url(#${cid})`).attr('preserveAspectRatio','xMidYMid meet')}
 else g.append('use').attr('href','#'+iconId(a)).attr('x',-r*.55).attr('y',-r*.55).attr('width',r*1.1).attr('height',r*1.1).style('color','#fff');
 g.append('circle').attr('r',r).attr('fill','none').attr('stroke',SPC[a.sph]).attr('stroke-width',a.lv===1?3:a.lv===2?2.3:1.7).attr('stroke-dasharray',a.prop?'5 3':null);
 if(o.label!==false){const t=g.append('text').attr('class','lbl').attr('text-anchor','middle').attr('y',r+(o.fs||12)+4).attr('font-size',o.fs||12).attr('font-weight',500).attr('stroke-width',3);wrap(t,a.short||a.name,o.wrap||16,(o.fs||12)+2)}
 return g}
function wrap(t,txt,max,lh){const w=String(txt).split(' ');const L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>max&&c){L.push(c);c=x}else c=(c+' '+x).trim()});if(c)L.push(c);L.slice(0,3).forEach((l,i)=>t.append('tspan').attr('x',t.attr('x')||0).attr('dy',i?lh:0).text(l))}
const icon=(g,id,x,y,s,c)=>g.append('use').attr('href','#'+id).attr('x',x-s/2).attr('y',y-s/2).attr('width',s).attr('height',s).style('color',c);
const txt=(g,x,y,s,o={})=>{const t=g.append('text').attr('x',x).attr('y',y).attr('fill',o.c||INK).attr('font-size',o.fs||14).attr('font-weight',o.fw||500).attr('text-anchor',o.a||'start');if(o.mono)t.attr('font-family','JetBrains Mono');if(o.wrap)wrap(t,s,o.wrap,(o.fs||14)*1.3);else t.text(s);return t};
const mk=(defs,id,c,size=8)=>defs.append('marker').attr('id',id).attr('viewBox','0 0 10 10').attr('refX',9).attr('refY',5).attr('markerWidth',size).attr('markerHeight',size).attr('orient','auto').attr('markerUnits','userSpaceOnUse').append('path').attr('d','M0 1L9 5L0 9z').attr('fill',c);

/* ================= métricas de influencia ================= */
const IE=R3.EDGES.map((e,i)=>({...e,i}));
const INODES=Object.keys(R3.POS);
const COLL=new Set(['MESA','NRES','NAGU','GUAR','VOC','FON','A70']);const isC=id=>COLL.has(id)||['per','org','hog'].includes(ACT(id).cat)&&id!=='ALCC';
const inS=(x,st)=>x.en==='ambos'||x.en===st;
const nodeIn=(id,st)=>st==='prop'||!R3.PROP[id];
function met(st){const ed=IE.filter(e=>inS(e,st)&&nodeIn(e.s,st)&&nodeIn(e.t,st));const ef=ed.filter(e=>e.k==='efectiva'),ky=ed.filter(e=>e.key);
 const voice=id=>ed.some(e=>e.s===id&&(e.k==='efectiva'||e.k==='formal'||(e.k==='flujo'&&e.f==='info'&&ACT(e.t).cat==='ins')));
 const repr=id=>ed.some(e=>e.t===id&&e.k==='coop'&&ACT(e.s).cat==='ins');
 const sv=[...new Set(ed.filter(e=>e.k==='conflicto').map(e=>e.t))].filter(id=>!voice(id)&&!repr(id));
 return{ef:Math.round(ef.filter(e=>isC(e.s)).length/ef.length*100),ky:Math.round(ky.filter(e=>isC(e.s)).length/ky.length*100),sv,ed}}
const MH=met('hoy'),MP=met('prop');

/* ================= vistas reutilizables ================= */
function size(el){const r=el.getBoundingClientRect();return{W:Math.max(320,r.width),H:Math.max(300,r.height)}}
let CUR_CTX=null;
function svgIn(el){const {W,H}=size(el);const s=d3.select(el).append('svg').attr('class','full').attr('viewBox',`0 0 ${W} ${H}`);if(CUR_CTX&&!CUR_CTX.svg)CUR_CTX.svg=s;return{svg:s,W,H,P:W<H}}
const anchor=(id,x,y,r)=>{if(CUR_CTX)CUR_CTX.anchors[id]=[x,y,r||12]};

// red de influencia (hoy / propuesta) con la representación de la Red libre
const KS={formal:{n:'Atribución formal',c:'#8f8a82',d:'6 5',w:1.4},efectiva:{n:'Influencia efectiva',c:RED,w:3.4},coop:{n:'Cooperación',c:INK,w:1.5},conflicto:{n:'Conflicto y costos',c:'#F0705A',d:'1.5 4',w:2},flujo:{n:'Flujo',c:OCH,d:'7 5',w:1.4}};
const FC={info:'#4CB6E8',rec:'#F5A642',trab:'#52CE92'};
function influence(ctx,st){
 const {svg,W,H,P}=svgIn(ctx.el);const pad=40;
 const place=id=>{const [x,y]=R3.POS[id];return P?[pad+(y-55)/510*(W-2*pad),pad+(x-80)/830*(H-2*pad-10)]:[pad+(x-80)/830*(W-2*pad-20)+10,pad+(y-55)/510*(H-2*pad-20)+10]};
 const R=Math.max(14,Math.min(22,Math.min(W,H)/34));
 const nodes=INODES.filter(id=>nodeIn(id,st)).map(id=>{const p=place(id);return{id,x:p[0],y:p[1]}});const NB=new Map(nodes.map(n=>[n.id,n]));
 const edges=IE.filter(e=>inS(e,st)&&NB.has(e.s)&&NB.has(e.t));
 const df=svg.append('defs');Object.entries(KS).forEach(([k,v])=>mk(df,'k-'+k,v.c,9));Object.entries(FC).forEach(([k,c])=>mk(df,'f-'+k,c,9));
 const gE=svg.append('g'),gK=svg.append('g'),gN=svg.append('g');
 edges.forEach(e=>{const s=NB.get(e.s),t=NB.get(e.t),dx=t.x-s.x,dy=t.y-s.y;const back=edges.some(o=>o.s===e.t&&o.t===e.s);const k=back?.18:.1;const mx=(s.x+t.x)/2-dy*k,my=(s.y+t.y)/2+dx*k;
  const a=Math.atan2(my-s.y,mx-s.x),b=Math.atan2(t.y-my,t.x-mx);e._mid=[.25*s.x+.5*mx+.25*t.x,.25*s.y+.5*my+.25*t.y];
  e._d=`M${s.x+Math.cos(a)*(R+2)},${s.y+Math.sin(a)*(R+2)}Q${mx},${my} ${t.x-Math.cos(b)*(R+5)},${t.y-Math.sin(b)*(R+5)}`});
 const es=gE.selectAll('path').data(edges).join('path').attr('d',e=>e._d).attr('fill','none').attr('stroke',e=>e.k==='flujo'?FC[e.f]:KS[e.k].c)
  .attr('stroke-width',e=>KS[e.k].w*(e.k==='efectiva'?.6+e.w*.2:.7+e.w*.15)).attr('stroke-dasharray',e=>KS[e.k].d).attr('stroke-linecap','round')
  .attr('marker-end',e=>`url(#${e.k==='flujo'?'f-'+e.f:'k-'+e.k})`).classed('flowing',e=>e.k==='flujo')
  .on('mousemove',(ev,e)=>showTip(`<b>${ACT(e.s).short} → ${ACT(e.t).short}</b><br>${KS[e.k].n} · ${e.st}<br>${esc(e.m)}`,ev)).on('mouseleave',hideTip);
 const ks=gK.selectAll('g').data(edges.filter(e=>e.key)).join('g').attr('transform',e=>`translate(${e._mid})`);ks.append('circle').attr('r',9).attr('fill','#141518').attr('stroke',RED);ks.each(function(){icon(d3.select(this),'i-key',0,0,13,RED)});
 nodes.forEach(n=>anchor(n.id,n.x,n.y,R));
 const ns=gN.selectAll('g').data(nodes).join('g').attr('class','node').attr('transform',n=>`translate(${n.x},${n.y})`).each(function(n){actor(d3.select(this),n.id,R,{fs:P?10:11,wrap:P?12:18})})
  .on('mousemove',(ev,n)=>{const a=ACT(n.id);showTip(`<b>${esc(a.name)}</b><br>${esc(a.fun||'')}`,ev)}).on('mouseleave',hideTip);
 ctx.legend([...['formal','efectiva','coop','conflicto'].map(k=>[KS[k].c,KS[k].d,KS[k].n]),[OCH,'7 5','Flujo de recursos, información o trabajo'],['key',null,'Puede detener el flujo'],['prop',null,'Actor propuesto']]);
 return {focus(fn){if(!fn){ns.attr('opacity',1);es.attr('opacity',1);ks.attr('opacity',1);return}
   const hiE=new Set(edges.filter(fn).map(e=>e.i));const hiN=new Set();edges.filter(fn).forEach(e=>{hiN.add(e.s);hiN.add(e.t)});
   es.transition().duration(500).attr('opacity',e=>hiE.has(e.i)?1:.06);ks.transition().duration(500).attr('opacity',e=>hiE.has(e.i)?1:.06);ns.transition().duration(500).attr('opacity',n=>hiN.has(n.id)?1:.15)}};
}

// trayecto de decisión
function trayecto(ctx,st){
 const {svg,W,H,P}=svgIn(ctx.el);const ST=[['i-agenda','Agenda'],['i-delib','Deliberación'],['i-mazo','Resolución'],['i-campana','Ejecución'],['i-lupa','Rectificación']];
 const pos=i=>P?{x:46,y:50+i*(H-90)/4}:{x:W*.1+i*W*.2,y:H*.3};const r=P?26:Math.min(44,W/26);
 svg.append('path').attr('id','trk').attr('d',P?`M46,${pos(0).y}V${pos(4).y}`:`M${pos(0).x},${pos(0).y}H${pos(4).x}`).attr('stroke','#3a3c42').attr('stroke-width',2);
 if(st==='prop'){svg.append('path').attr('d',P?`M${46-r},${pos(4).y} C${4},${pos(4).y} ${4},${pos(0).y} ${46-r},${pos(0).y}`:`M${pos(4).x},${pos(4).y-r-4} C${pos(4).x},${pos(4).y-r-70} ${pos(0).x},${pos(0).y-r-70} ${pos(0).x},${pos(0).y-r-4}`).attr('fill','none').attr('stroke',RED).attr('stroke-width',1.6).attr('stroke-dasharray','6 6').attr('class','flowing');
  if(!P)txt(svg,W/2,pos(0).y-r-60,'rectificar reabre el ciclo',{a:'middle',c:RED,fs:13})}
 ST.forEach(([ic,n],i)=>{const p=pos(i);anchor('st'+i,p.x,p.y,r);const g=svg.append('g').attr('transform',`translate(${p.x},${p.y})`);
  g.append('circle').attr('r',r).attr('fill',RED);icon(g,ic,0,0,r*1.1,'#fff');
  const tx=P?r+14:0,ty=P?-8:r+24,an=P?'start':'middle';
  txt(g,tx,ty,n,{a:an,fw:700,fs:P?15:17});txt(g,tx,ty+(P?17:20),R3.REG[st][i],{a:an,c:st==='prop'?OCH:'#9A958C',fs:13});txt(g,tx,ty+(P?32:38),'Escala: '+R3.ESC[st][i],{a:an,c:MUTE,fs:11.5,mono:1});
  const who=R3.WHO[st][i];const rr=P?15:Math.min(20,W/60);
  who.forEach((id,j)=>{const wx=P?tx+14+j*34:(j-(who.length-1)/2)*(rr*2+38),wy=P?ty+52:ty+72;const w=g.append('g').attr('transform',`translate(${wx},${wy})`).attr('class','node');actor(w,id,P?13:rr,{fs:10,wrap:12,label:!P})})});
 if(st==='hoy'){const p=pos(4);txt(svg,P?p.x+r+14:p.x,P?p.y+130:p.y-r-20,'Los afectados no pueden corregir',{a:P?'start':'middle',c:RED,fs:13})}
 const tok=svg.append('circle').attr('r',8).attr('fill',OCH).attr('stroke','#141518').attr('stroke-width',2);
 const trk=svg.select('#trk').node(),L=trk.getTotalLength();
 const t=d3.timer(el=>{const u=(el%6500)/6500;const pt=trk.getPointAtLength(L*Math.min(1,u*1.15));tok.attr('cx',pt.x).attr('cy',pt.y).attr('opacity',u>.92?0:1)});ctx.onExit(()=>t.stop());
}

// diagrama Vensim
function vensim(ctx){
 ctx.el.classList.add('vensim');
 const {svg,W,H}=svgIn(ctx.el);const V=new Map(VEN.vars.map(v=>[v.id,v]));const VA=new Map(VEN.valves.map(v=>[v.id,v]));const CL=new Map(VEN.clouds.map(c=>[c.id,c]));
 const allp=[...VEN.vars,...VEN.valves,...VEN.clouds];const xs=allp.map(v=>v.x),ys=allp.map(v=>v.y);const B=[d3.min(xs)-200,d3.min(ys)-120,d3.max(xs)-d3.min(xs)+400,d3.max(ys)-d3.min(ys)+380];
 svg.attr('viewBox',B.join(' ')).attr('preserveAspectRatio','xMidYMid meet');
 const df=svg.append('defs');
 df.append('marker').attr('id','va').attr('viewBox','0 0 10 10').attr('refX',9).attr('refY',5).attr('markerWidth',22).attr('markerHeight',22).attr('orient','auto').attr('markerUnits','userSpaceOnUse').append('path').attr('d','M0 1L9 5L0 9z').attr('fill','#1d3fd0');
 df.append('marker').attr('id','vp').attr('viewBox','0 0 10 10').attr('refX',8).attr('refY',5).attr('markerWidth',34).attr('markerHeight',34).attr('orient','auto').attr('markerUnits','userSpaceOnUse').append('path').attr('d','M0 0L10 5L0 10z').attr('fill','#fff').attr('stroke','#111').attr('stroke-width',1);
 const pt=id=>V.get(id)||VA.get(id)||CL.get(id);VEN.vars.forEach(v=>anchor(v.id,v.x,v.y,Math.max(v.w,v.h)));
 const half=id=>{const v=V.get(id);if(v)return v.k==='stock'?[v.w,v.h]:[v.w*.9,v.h*.75];if(VA.get(id))return[14,14];return[30,20]};
 const inside=(p,id)=>{const o=pt(id),h=half(id);return Math.abs(p[0]-o.x)<h[0]+6&&Math.abs(p[1]-o.y)<h[1]+6};
 function arcPts(a,b,c){const ax=a.x,ay=a.y,bx=c[0],by=c[1],cx=b.x,cy=b.y;const d=2*(ax*(by-cy)+bx*(cy-ay)+cx*(ay-by));
  if(Math.abs(d)<1e-3)return d3.range(41).map(i=>[ax+(cx-ax)*i/40,ay+(cy-ay)*i/40]);
  const ux=((ax*ax+ay*ay)*(by-cy)+(bx*bx+by*by)*(cy-ay)+(cx*cx+cy*cy)*(ay-by))/d,uy=((ax*ax+ay*ay)*(cx-bx)+(bx*bx+by*by)*(ax-cx)+(cx*cx+cy*cy)*(bx-ax))/d;
  const r=Math.hypot(ax-ux,ay-uy);let a0=Math.atan2(ay-uy,ax-ux),a1=Math.atan2(by-uy,bx-ux),a2=Math.atan2(cy-uy,cx-ux);
  const norm=x=>(x+4*Math.PI)%(2*Math.PI);let s1=norm(a1-a0),s2=norm(a2-a0);if(s1>s2)s2=s2-2*Math.PI;return d3.range(61).map(i=>{const t=a0+s2*i/60;return[ux+r*Math.cos(t),uy+r*Math.sin(t)]})}
 const gP=svg.append('g'),gI=svg.append('g'),gV=svg.append('g');
 // tuberías de flujo
 VEN.pipes.forEach(p=>{const v=VA.get(p.v),o=pt(p.o);if(!v||!o)return;const pts=[[v.x,v.y],...p.pts.map(q=>[q[0],q[1]]).slice(0,-1),[o.x,o.y]];
  let end=pts[pts.length-1];const h=half(p.o);const prev=pts[pts.length-2];const dx=end[0]-prev[0],dy=end[1]-prev[1];
  if(Math.abs(dx)>Math.abs(dy))end=[end[0]-Math.sign(dx)*(h[0]+2),end[1]];else end=[end[0],end[1]-Math.sign(dy)*(h[1]+2)];pts[pts.length-1]=end;
  const d=d3.line()(pts);gP.append('path').attr('d',d).attr('fill','none').attr('stroke','#111').attr('stroke-width',11).attr('data-v',p.v);
  gP.append('path').attr('d',d).attr('fill','none').attr('stroke','#FBFAF6').attr('stroke-width',6.5).attr('marker-end',p.head?'url(#vp)':null);});
 // nubes y válvulas
 VEN.clouds.forEach(c=>gP.append('path').attr('transform',`translate(${c.x},${c.y}) scale(1.6)`).attr('d','M-14 6c-6 0-8-8-2-10-1-7 8-9 11-4 3-5 12-3 11 3 6 1 6 11-1 11z').attr('fill','#fff').attr('stroke','#111').attr('stroke-width',1.4));
 VEN.valves.forEach(v=>{const g=gP.append('g').attr('transform',`translate(${v.x},${v.y})`);g.append('path').attr('d','M-12 -10L12 10V-10L-12 10z').attr('fill','#fff').attr('stroke','#111').attr('stroke-width',2);g.append('path').attr('d','M0 0V-16').attr('stroke','#111').attr('stroke-width',2);g.append('circle').attr('cy',-18).attr('r',3).attr('fill','#111')});
 // flechas de información
 const links=VEN.info.map((l,i)=>{const a=pt(l.f),b=pt(l.t);if(!a||!b)return null;const c=l.pts[0]||[(a.x+b.x)/2,(a.y+b.y)/2];let A=arcPts(a,b,c);const len=d3.sum(A.slice(1),(p,j)=>Math.hypot(p[0]-A[j][0],p[1]-A[j][1])),ch=Math.hypot(b.x-a.x,b.y-a.y);
  if(len>ch*1.9+200){const cx=2*c[0]-(a.x+b.x)/2,cy=2*c[1]-(a.y+b.y)/2;A=d3.range(41).map(k=>{const t=k/40;return[(1-t)**2*a.x+2*(1-t)*t*cx+t*t*b.x,(1-t)**2*a.y+2*(1-t)*t*cy+t*t*b.y]})}
  let P=A.filter(p=>!inside(p,l.f)&&!inside(p,l.t));if(P.length<2)P=[[a.x,a.y],[b.x,b.y]];return{...l,i,P}}).filter(Boolean);
 const ls=gI.selectAll('g').data(links).join('g');
 ls.append('path').attr('d',l=>d3.line().curve(d3.curveBasis)(l.P)).attr('fill','none').attr('stroke','#1d3fd0').attr('stroke-width',3).attr('marker-end','url(#va)');
 ls.append('text').attr('x',l=>l.P[Math.max(0,l.P.length-6)][0]+10).attr('y',l=>l.P[Math.max(0,l.P.length-6)][1]-10).attr('fill','#1d3fd0').attr('font-size',30).attr('font-weight',700).attr('font-family','Arial').text(l=>l.p==='-'?'−':l.p==='+'?'+':'');
 // variables
 const vs=gV.selectAll('g').data(VEN.vars).join('g').attr('transform',v=>`translate(${v.x},${v.y})`).style('cursor','pointer');
 vs.filter(v=>v.k==='stock').append('rect').attr('x',v=>-v.w).attr('y',v=>-v.h).attr('width',v=>v.w*2).attr('height',v=>v.h*2).attr('fill','#fff').attr('stroke','#111').attr('stroke-width',2.4);
 vs.append('text').attr('text-anchor','middle').attr('font-family','Arial').attr('fill','#111').attr('font-size',v=>v.k==='stock'?20:18).attr('font-weight',v=>v.k==='stock'?700:400)
  .attr('y',v=>v.k==='rate'?24:0).each(function(v){const t=d3.select(this);const max=Math.max(10,Math.round((v.w*2)/(v.k==='stock'?11:9.5)));const w=v.n.split(' ');const L=[];let c='';w.forEach(x=>{if((c+' '+x).trim().length>max&&c){L.push(c);c=x}else c=(c+' '+x).trim()});if(c)L.push(c);
   const lh=v.k==='stock'?22:20;L.forEach((l,i)=>t.append('tspan').attr('x',0).attr('dy',i?lh:-(L.length-1)*lh/2+6).text(l))});
 vs.on('mouseenter',(e,v)=>{const ids=new Set([v.id,v.valve]);ls.attr('opacity',l=>ids.has(l.f)||ids.has(l.t)||l.tv===v.id?1:.1);vs.attr('opacity',x=>{if(x.id===v.id)return 1;return links.some(l=>(ids.has(l.f)&&(l.tv===x.id||l.t===x.valve))||((l.tv===v.id||ids.has(l.t))&&l.f===x.id))?1:.25})})
  .on('mouseleave',()=>{ls.attr('opacity',1);vs.attr('opacity',1)});
 ctx.legend([['stock',null,'Nivel: actor que acumula (caja)'],['valve',null,'Flujo: válvula'],['cloud',null,'Fuente o sumidero'],['#1d3fd0',null,'Influencia (+ / −)']],true);
 return {zoom(ids,pad=140){let bb=B;if(ids){const vv=ids.map(id=>V.get(id)).filter(Boolean);const x0=d3.min(vv,v=>v.x-v.w)-pad,x1=d3.max(vv,v=>v.x+v.w)+pad,y0=d3.min(vv,v=>v.y-v.h)-pad,y1=d3.max(vv,v=>v.y+v.h)+pad;bb=[x0,y0,x1-x0,y1-y0]}
   const cur=svg.attr('viewBox').split(' ').map(Number);svg.transition().duration(reduce?0:1100).ease(d3.easeCubicInOut).attrTween('viewBox',()=>{const i=d3.interpolate(cur,bb);return t=>i(t).join(' ')});
   vs.transition().duration(600).attr('opacity',v=>!ids||ids.includes(v.id)?1:.25)}};
}

// bucles del modelo propuesto, con el mismo estilo Vensim
function bucles(ctx){
 ctx.el.classList.add('vensim');const {svg,W,H,P}=svgIn(ctx.el);
 const MP={CAR:[20,20],ROT:[280,20],PAR:[20,200],DES:[280,200],CON:[20,380],TRB:[280,380],ACU:[20,560],APR:[280,560],DEP:[20,740],HUM:[280,740],ING:[20,920],AGE:[280,920]};
 const VARS=C3.VARS.map(v=>P?{...v,x:MP[v.id][0],y:MP[v.id][1]}:{...v});const VB=new Map(VARS.map(v=>[v.id,v]));const VW=P?220:180,VH=P?56:48;
 svg.attr('viewBox',P?'0 0 520 1000':'0 -10 1000 650');
 const df=svg.append('defs');mk(df,'ba','#1d3fd0',10);mk(df,'bh',RED,12);
 const gl=svg.append('g'),gd=svg.append('g'),gv=svg.append('g'),gt=svg.append('g');
 const box=(v,tx,ty)=>{const cx=v.x+VW/2,cy=v.y+VH/2,dx=tx-cx,dy=ty-cy;const s=Math.min((VW/2+4)/Math.abs(dx||1e-6),(VH/2+4)/Math.abs(dy||1e-6));return[cx+dx*s,cy+dy*s]};
 const L=C3.LINKS.map((l,i)=>{const a=VB.get(l.s),b=VB.get(l.t);const ax=a.x+VW/2,ay=a.y+VH/2,bx=b.x+VW/2,by=b.y+VH/2,dx=bx-ax,dy=by-ay;const back=C3.LINKS.some(o=>o.s===l.t&&o.t===l.s);const k=back?.22:.16;
  const mx=(ax+bx)/2-dy*k,my=(ay+by)/2+dx*k,p0=box(a,mx,my),p1=box(b,mx,my);const q=t=>[(1-t)**2*p0[0]+2*(1-t)*t*mx+t*t*p1[0],(1-t)**2*p0[1]+2*(1-t)*t*my+t*t*p1[1]];
  return{...l,i,d:`M${p0}Q${mx},${my} ${p1}`,sp:q(.8),mp:q(.5)}});
 const lp=gl.selectAll('path').data(L).join('path').attr('id',l=>'bl'+l.i).attr('d',l=>l.d).attr('fill','none').attr('stroke','#1d3fd0').attr('stroke-width',1.8).attr('marker-end','url(#ba)')
  .on('mousemove',(e,l)=>{const who=(R3.ACTORES_CAUSAL[l.s+'>'+l.t]||[]).map(id=>ACT(id).short).join(', ');showTip(`<b>${VB.get(l.s).n} → ${VB.get(l.t).n}</b><br>${esc(l.m)}${who?'<br>Actores: '+who:''}`,e)}).on('mouseleave',hideTip);
 gt.selectAll('text').data(L).join('text').attr('x',l=>l.sp[0]+7).attr('y',l=>l.sp[1]-6).attr('fill','#1d3fd0').attr('font-family','Arial').attr('font-weight',700).attr('font-size',P?20:16).text(l=>l.sg==='+'?'+':'−');
 gt.selectAll('g.dl').data(L.filter(l=>l.dl)).join('g').attr('transform',l=>{const a=VB.get(l.s),b=VB.get(l.t);return`translate(${l.mp}) rotate(${Math.atan2(b.y-a.y,b.x-a.x)*180/Math.PI+90})`}).html('<path d="M-9 -4H9M-9 4H9" stroke="#111" stroke-width="2.4"/>');
 const vg=gv.selectAll('g').data(VARS).join('g').attr('transform',v=>`translate(${v.x},${v.y})`);
 vg.append('text').attr('x',VW/2).attr('y',VH/2+5).attr('text-anchor','middle').attr('font-family','Arial').attr('font-size',P?17:14).attr('fill','#111').text(v=>v.n);
 const offs=P?{R1:[70,60],B1:[0,-30],B2:[0,30],R2:[0,60],B3:[0,-50]}:{R1:[0,0],B1:[10,-40],B2:[-30,0],R2:[-40,70],B3:[40,40]};
 const lg=gt.append('g');C3.LOOPS.forEach(lo=>{const vs=[...new Set(lo.path)].map(id=>VB.get(id));const o=offs[lo.id];const g=lg.append('g').attr('transform',`translate(${d3.mean(vs,v=>v.x+VW/2)+o[0]},${d3.mean(vs,v=>v.y+VH/2)+o[1]})`);
  g.append('path').attr('d','M-16 -6 A17 17 0 1 1 -6 16').attr('fill','none').attr('stroke','#111').attr('stroke-width',1.6).attr('marker-end','url(#ba)');g.append('text').attr('text-anchor','middle').attr('y',6).attr('font-family','Arial').attr('font-weight',700).attr('font-size',15).attr('fill','#111').text(lo.id)});
 return{loop(id){gd.selectAll('*').remove();if(!id){lp.attr('opacity',1).attr('stroke','#1d3fd0').attr('stroke-width',1.8).attr('marker-end','url(#ba)');vg.attr('opacity',1);return}
   const lo=C3.LOOPS.find(l=>l.id===id);const pr=new Set();for(let i=0;i<lo.path.length-1;i++)pr.add(lo.path[i]+'>'+lo.path[i+1]);
   lp.attr('opacity',l=>pr.has(l.s+'>'+l.t)?1:.12).attr('stroke',l=>pr.has(l.s+'>'+l.t)?RED:'#1d3fd0').attr('stroke-width',l=>pr.has(l.s+'>'+l.t)?3:1.8).attr('marker-end',l=>pr.has(l.s+'>'+l.t)?'url(#bh)':'url(#ba)');
   vg.attr('opacity',v=>lo.path.includes(v.id)?1:.3);
   L.filter(l=>pr.has(l.s+'>'+l.t)).forEach((l,j)=>{for(let k=0;k<2;k++){const c=gd.append('circle').attr('r',P?6:5).attr('fill',RED);c.append('animateMotion').attr('dur','2s').attr('repeatCount','indefinite').attr('begin',(k+j*.15)+'s').append('mpath').attr('href','#bl'+l.i)}});
   return lo}};
}

/* ================= diapositivas ================= */
const B=window.BLOQUES;
const ROM=['I','II','III','IV','V','VI','VII','VIII','IX','X'];
const VZ={abasto:['1','2','3','4','5','6','7','8','19','20','21','22','23','24','25','44','50','60','67','77','78','84','168'],residuos:['9','10','11','26','27','91','94','95','112','113','114']};

/* ---------- red completa: libre, clústeres, niveles, flujo ---------- */
function redOrg(ctx){
 const {svg,W,H,P}=svgIn(ctx.el);const N=RED_DATA.nodes.map(n=>({...n})),NB=new Map(N.map(n=>[n.id,n]));
 const Lk=RED_DATA.links.filter(l=>NB.has(l.s)&&NB.has(l.t)).map(l=>({...l,source:l.s,target:l.t}));
 const RING=['log','res','gob','sal','edu','mov','con'];const cen={cor:[W/2,H/2]};RING.forEach((k,i)=>{const a=-Math.PI/2+(i+.5)*2*Math.PI/7;cen[k]=[W/2+Math.cos(a)*W*(P?.28:.33),H/2+Math.sin(a)*H*(P?.36:.34)]});
 const r=n=>({1:P?11:15,2:P?8:11,3:P?6.5:8.5,4:P?6:8})[n.lv]||8;
 const sim=d3.forceSimulation(N).force('l',d3.forceLink(Lk).id(d=>d.id).distance(40).strength(.05)).force('q',d3.forceManyBody().strength(-60)).force('x',d3.forceX(n=>cen[n.sph][0]).strength(.15)).force('y',d3.forceY(n=>cen[n.sph][1]).strength(.15)).force('c',d3.forceCollide(n=>r(n)+4)).stop();
 for(let i=0;i<300;i++)sim.tick();
 N.forEach(n=>{n.cx=n.x;n.cy=n.y});
 // posiciones por niveles
 const LVN={1:'Deciden',2:'Coordinan y gestionan',3:'Ejecutan',4:'Participan y reciben'};const ORDER=['cor','log','con','res','gob','edu','sal','mov'];
 const x0=P?18:W*.17,x1=W-(P?18:30);
 [1,2,3,4].forEach(l=>{const g=N.filter(n=>n.lv===l).sort((a,b)=>ORDER.indexOf(a.sph)-ORDER.indexOf(b.sph));const rows=P&&g.length>12?2:1;const per=Math.ceil(g.length/rows);
  g.forEach((n,i)=>{const row=Math.floor(i/per),j=i%per;n.lx=x0+(j+.5)*(x1-x0)/per;n.ly=H*(.13+(l-1)*.235)+(rows>1?(row-.5)*22:0)})});
 const gH=svg.append('g'),gB=svg.append('g'),gE=svg.append('g'),gN=svg.append('g'),gT=svg.append('g');
 const es=gE.selectAll('line').data(Lk).join('line').attr('stroke',l=>CONV[l.c]||'#555').attr('stroke-width',1).attr('opacity',.5);
 const ns=gN.selectAll('g').data(N).join('g').attr('class','node').each(function(n){actor(d3.select(this),n.id,r(n),{label:false})})
  .on('mousemove',(e,n)=>showTip(`<b>${esc(n.name)}</b><br>${esc(n.fun||'')}`,e)).on('mouseleave',hideTip);
 function place(k){N.forEach(n=>{n.x=k==='levels'||k==='flow'?n.lx:n.cx;n.y=k==='levels'||k==='flow'?n.ly:n.cy;anchor(n.id,n.x,n.y,r(n))})}
 function draw(dur){ns.transition('pos').duration(dur).attr('transform',n=>`translate(${n.x},${n.y})`);
  es.transition('pos').duration(dur).attr('x1',l=>l.source.x).attr('y1',l=>l.source.y).attr('x2',l=>l.target.x).attr('y2',l=>l.target.y)}
 const hull=d3.line().curve(d3.curveCatmullRomClosed.alpha(.8));
 const CN={cor:'Corabastos y comercio mayorista',log:'Logística y carga',con:'Comercio barrial',res:'Residuos y reciclaje',gob:'Gobierno local',edu:'Educación',sal:'Salud',mov:'Transporte público'};
 place('full');draw(0);ns.style('opacity',0).transition('op').delay(n=>reduce?0:Math.hypot(n.x-W/2,n.y-H/2)*1.2).duration(500).style('opacity',1);
 return{mode(k){gH.selectAll('*').remove();gB.selectAll('*').remove();gT.selectAll('*').remove();place(k);draw(reduce?0:1100);
  ns.select('text').remove();
  if(k==='clusters'){Object.keys(CN).forEach((sp,i)=>{const pts=[];N.filter(n=>n.sph===sp).forEach(n=>{for(let a=0;a<10;a++)pts.push([n.cx+Math.cos(a/10*6.28)*(r(n)+14),n.cy+Math.sin(a/10*6.28)*(r(n)+14)])});const h=d3.polygonHull(pts);if(!h)return;
    gH.append('path').attr('d',hull(h)).attr('fill',SPC[sp]).attr('fill-opacity',.1).attr('stroke',SPC[sp]).attr('stroke-opacity',.5).style('opacity',0).transition().delay(reduce?0:300+i*120).style('opacity',1);
    const c=d3.polygonCentroid(h),top=d3.min(h,p=>p[1]);const n=N.filter(x=>x.sph===sp).length;
    const t=txt(gT,c[0],top-8,`${CN[sp]} · ${n}`,{a:'middle',fw:700,fs:P?10.5:12.5,c:SPC[sp]});t.style('opacity',0).transition().delay(reduce?0:400+i*120).style('opacity',1)})}
  if(k==='levels'||k==='flow'){[1,2,3,4].forEach(l=>{const y=H*(.13+(l-1)*.235);gB.append('line').attr('x1',8).attr('x2',W-8).attr('y1',y+H*.1).attr('y2',y+H*.1).attr('stroke','#2a2c31').attr('stroke-dasharray','2 6');
    const n=N.filter(x=>x.lv===l).length;const t=txt(gT,P?10:18,P?y-H*.075:y+4,`${LVN[l]} · ${n}`,{fw:700,fs:P?11.5:14,c:l===1?'#9382E0':l===2?OCH:l===3?'#4FB98C':SOFT});t.style('opacity',0).transition().delay(reduce?0:600+l*150).style('opacity',1)})}
  if(k==='flow'){es.transition('col').duration(600).attr('stroke',l=>l.source.lv<l.target.lv?OCH:l.source.lv>l.target.lv?'#4FB98C':'#3a3c42').attr('opacity',l=>l.source.lv===l.target.lv?.08:.75).attr('stroke-width',l=>l.source.lv>l.target.lv&&l.c==='par'?2.2:1.1);
   if(!P){txt(gT,W-20,H-38,'Bajan 102 · gobierno, control y servicios',{a:'end',c:OCH,fs:13,fw:600});txt(gT,W-20,H-18,'Suben 77 · sobre todo solicitudes y participación',{a:'end',c:'#4FB98C',fs:13,fw:600})}}
  else es.transition('col').duration(600).attr('stroke',l=>CONV[l.c]||'#555').attr('opacity',k==='levels'?.18:.5).attr('stroke-width',1);
 }};
}

/* ---------- bandas de niveles propuestos (núcleo, local, distrital) ---------- */
const BANDS=[{k:'dis',n:'Distrital',ids:['A32','A33','N06','A02']},{k:'loc',n:'Local',ids:['MESA','A34','N01','AMB03','FDL']},{k:'nuc',n:'Núcleo por asunto',ids:['NRES','VOC','A35']},{k:'cot',n:'Cotidiano',ids:['A27','A25','A26','A57','A23','A24','A28','RES01']}];
function bands(ctx){
 const {svg,W,H,P}=svgIn(ctx.el);const df=svg.append('defs');mk(df,'ba-o',OCH,10);mk(df,'ba-g','#4FB98C',10);
 const R=P?15:Math.min(24,W/48);const pos={};const x0=P?14:W*.17,x1=W-(P?14:24);
 const gB=svg.append('g'),gA=svg.append('g'),gN=svg.append('g'),gX=svg.append('g');
 const bg=BANDS.map((b,i)=>{const y=H*(.14+i*.24);const g=gB.append('g').style('opacity',0);
  g.append('rect').attr('x',6).attr('y',y-H*.1).attr('width',W-12).attr('height',H*.2).attr('rx',10).attr('fill','#17191d').attr('stroke','#25272c');
  txt(g,P?14:20,P?y-H*.1+15:y+5,b.n,{fw:700,fs:P?12:15,c:OCH});
  b.ids.forEach((id,j)=>{const x=x0+(j+.5)*(x1-x0)/b.ids.length;pos[id]=[x,y+(P?6:0)];anchor(id,x,y+(P?6:0),R)});return{g,y}});
 const ng={};BANDS.forEach((b,i)=>b.ids.forEach(id=>{const g=gN.append('g').attr('class','node').attr('transform',`translate(${pos[id]})`).style('opacity',0);actor(g,id,R,{fs:P?9.5:11,wrap:P?11:16});ng[id]={g,band:i}}));
 return{pos,R,
  show(n){bg.forEach((b,i)=>b.g.transition().duration(500).style('opacity',i<n?1:0));Object.values(ng).forEach(o=>o.g.transition().duration(500).style('opacity',o.band<n?1:0))},
  showBands(list){bg.forEach((b,i)=>b.g.transition().duration(500).style('opacity',list.includes(i)?1:0));Object.values(ng).forEach(o=>o.g.transition().duration(500).style('opacity',list.includes(o.band)?1:0))},
  focus(ids){Object.entries(ng).forEach(([id,o])=>o.g.transition().duration(500).style('opacity',!ids||ids.includes(id)?1:.18))},
  arrows(list,col){gA.selectAll('*').remove();(list||[]).forEach(([a,b],i)=>{const A=pos[a]||a,Bp=pos[b]||b;if(!A||!Bp)return;const dx=Bp[0]-A[0],dy=Bp[1]-A[1],d=Math.hypot(dx,dy)||1;const k=.18;
   const mx=(A[0]+Bp[0])/2-dy*k,my=(A[1]+Bp[1])/2+dx*k;const ua=Math.atan2(my-A[1],mx-A[0]),ub=Math.atan2(Bp[1]-my,Bp[0]-mx);
   gA.append('path').attr('d',`M${A[0]+Math.cos(ua)*(R+3)},${A[1]+Math.sin(ua)*(R+3)}Q${mx},${my} ${Bp[0]-Math.cos(ub)*(R+5)},${Bp[1]-Math.sin(ub)*(R+5)}`).attr('fill','none').attr('stroke',col||OCH).attr('stroke-width',2.2)
    .attr('stroke-dasharray','7 5').attr('class','flowing').attr('marker-end',`url(#${col==='#4FB98C'?'ba-g':'ba-o'})`).style('opacity',0).transition().delay(reduce?0:i*120).duration(400).style('opacity',1)})},
  extra:gX,P,W,H};
}

/* ---------- vistas simples ---------- */
function cards(ctx,data,cols){const el=d3.select(ctx.el).append('div').attr('class','cards').style('grid-template-columns',`repeat(${size(ctx.el).W<700?1:cols},1fr)`);
 return el.selectAll('div').data(data).join('div').attr('class','card').html(d=>`${d[0]?`<svg width="40" height="40" style="color:${d[3]||OCH}"><use href="#${d[0]}" width="40" height="40"/></svg>`:''}<h3>${d[1]}</h3><p>${d[2]||''}</p>`)}
function statement(ctx,parts){const el=d3.select(ctx.el).append('div').attr('class','cards').style('grid-template-columns','1fr').style('padding','6% 9%');
 return el.selectAll('div').data(parts).join('div').attr('class','card').style('background','none').style('border','0').style('border-left','4px solid '+OCH).style('border-radius','0').html(p=>`<p style="font-size:clamp(18px,2.4vw,30px);line-height:1.35;color:#F2EFE8;font-weight:500">${p}</p>`)}

/* ---------- macromodelo político al estilo del sitio de macromodelos ---------- */
const MACRO_CARDS=[
 {k:'het',n:'Heterarquía',num:'01',c:'#7FC4EC',ic:'i-org',d:'La influencia varía según el asunto, la función, los recursos y el conocimiento de cada actor.'},
 {k:'pol',n:'Gobernanza policéntrica',num:'02',c:'#B3A6EE',ic:'i-grupo',d:'Varios centros de decisión autónomos que se coordinan cuando sus actividades se cruzan.'},
 {k:'pro',n:'Propósito',num:'03',c:'#F2C76A',ic:'i-check',d:'Que quienes ejecutan y quienes reciben las consecuencias tengan capacidad real de incidir.'},
 {k:'niv',n:'Niveles de coordinación',num:'04',c:'#EE9A7E',ic:'i-ins',d:'Cotidiano, núcleo por asunto, local y distrital. No son escalones de mando.'},
 {k:'cog',n:'Cogestión',num:'05',c:'#A9D47A',ic:'i-doc',d:'Organizaciones e instituciones comparten la decisión y la ejecución con un acuerdo escrito.'},
 {k:'coa',n:'Coaprendizaje',num:'06',c:'#E89BD2',ic:'i-ciclo',d:'Saber técnico y saber práctico revisan juntos y ajustan las reglas.'}];
// paso del guion -> [tarjeta activa, chips de la tarjeta, estado del mapa]
const MACRO_STEPS=[
 ['het',['Hoy: un solo centro'],'hub'],
 ['het',['Residuos: recicladores','Agua: colectivos'],'multi'],
 ['pol',['Información','Responsabilidades','Desacuerdos','Revisión'],'centros'],
 ['pol',['Mandato con límites','Revocable'],'centros2'],
 ['pro',['Residuos aprovechables'],'proposito'],
 ['niv',[],'kennedy'],
 ['niv',['Cotidiano'],'cotidiano'],
 ['niv',['Cotidiano','Núcleo por asunto'],'nucleo'],
 ['niv',['Cotidiano','Núcleo por asunto','Local'],'local'],
 ['niv',['Cotidiano','Núcleo por asunto','Local','Distrital'],'distrital'],
 ['niv',['Cotidiano','Núcleo por asunto','Local','Distrital','Mandatos entre niveles'],'anillos'],
 ['cog',['Competencia legal','Recursos','Conocimiento','Trabajo'],'cogestion'],
 ['coa',['Registrar','Revisar','Discutir errores','Ajustar reglas'],'coaprendizaje']];
function macroView(ctx){
 const el=ctx.el;const P=size(el).W<760;el.style.background='#08090b';
 const mapDiv=d3.select(el).append('div').attr('id','mapC').style('position','absolute').style('inset',P?'0 0 52% 0':'0');
 const fade=d3.select(el).append('div').style('position','absolute').style('pointer-events','none').style('inset',P?'auto 0 0 0':'0 auto 0 0').style('width',P?'100%':'46%').style('height',P?'52%':'100%')
  .style('background',P?'#08090b':'linear-gradient(90deg,rgba(8,9,11,.96) 55%,rgba(8,9,11,0))');
 const stack=d3.select(el).append('div').attr('class','mstack').style('position','absolute').style('left',P?'10px':'22px').style('right',P?'10px':'auto').style('top',P?'50%':'22px').style('bottom',P?'8px':'auto')
  .style('width',P?'auto':'min(390px,36%)').style('display','flex').style('flex-direction','column').style('gap','8px').style('overflow-y',P?'auto':'visible');
 const tag=d3.select(el).append('div').style('display',P?'none':null).style('position','absolute').style('left',P?'10px':'22px').style('top',P?'8px':'auto').style('bottom',P?'auto':'60px').style('font','600 11px JetBrains Mono').style('letter-spacing','.12em').style('color','#B8B3A8');
 const legend=d3.select(el).append('div').attr('class','leg').style('top','auto').style('bottom','58px').style('display',P?'none':'grid');
 let map=null,ready=false,PT=null,K=null,markers=[];const queue=[];
 map=new maplibregl.Map({container:mapDiv.node(),style:'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',center:[-74.152,4.628],zoom:P?11.6:12.4,attributionControl:{compact:true},interactive:false});
 ctx.onExit(()=>{try{map.remove()}catch(e){}});
 const FC=f=>({type:'FeatureCollection',features:f});
 map.on('load',()=>Promise.all(['assets/territorio_kennedy.geojson','assets/territorio_puntos.geojson'].map(u=>fetch(u).then(r=>r.json()))).then(([k,p])=>{K=k;PT=p.features;
  map.addSource('k',{type:'geojson',data:K});map.addLayer({id:'k-glow',type:'line',source:'k',paint:{'line-color':'#7FC4EC','line-width':8,'line-blur':6,'line-opacity':0}});
  map.addLayer({id:'k',type:'line',source:'k',paint:{'line-color':'#F2EFE8','line-width':1.2,'line-opacity':.55}});
  ['rings','lines','pts'].forEach(s=>map.addSource(s,{type:'geojson',data:FC([])}));
  map.addLayer({id:'rings',type:'line',source:'rings',paint:{'line-color':['get','c'],'line-width':1.6,'line-dasharray':[2,2],'line-opacity':.8}});
  map.addLayer({id:'lines',type:'line',source:'lines',paint:{'line-color':['get','c'],'line-width':['coalesce',['get','w'],1.2],'line-opacity':['coalesce',['get','o'],.7]}});
  map.addLayer({id:'pts',type:'circle',source:'pts',paint:{'circle-radius':['coalesce',['get','r'],3],'circle-color':['get','c'],'circle-opacity':.9,'circle-stroke-color':'#08090b','circle-stroke-width':['case',['>',['coalesce',['get','r'],3],6],2,0]}});
  ready=true;queue.splice(0).forEach(f=>f())}));
 const pts=c=>PT.filter(f=>f.properties.c===c);const g1=c=>PT.find(f=>f.properties.c===c)?.geometry.coordinates;
 const near=(o,arr,n)=>[...arr].sort((a,b)=>Math.hypot(a.geometry.coordinates[0]-o[0],a.geometry.coordinates[1]-o[1])-Math.hypot(b.geometry.coordinates[0]-o[0],b.geometry.coordinates[1]-o[1])).slice(0,n);
 const line=(a,b,c,w,o)=>({type:'Feature',geometry:{type:'LineString',coordinates:[a,b]},properties:{c,w,o}});
 const pt=(xy,c,r)=>({type:'Feature',geometry:{type:'Point',coordinates:xy},properties:{c,r}});
 const circle=(o,km,c)=>{const pts=d3.range(65).map(i=>{const a=i/64*2*Math.PI;return[o[0]+Math.cos(a)*km/111/Math.cos(o[1]*Math.PI/180),o[1]+Math.sin(a)*km/111]});return{type:'Feature',geometry:{type:'LineString',coordinates:pts},properties:{c}}};
 const label=(xy,t,c,dy=-16)=>{const e=document.createElement('div');e.style.cssText=`font:600 11px JetBrains Mono;letter-spacing:.08em;color:${c};text-shadow:0 1px 6px #000;white-space:nowrap;text-transform:uppercase`;e.textContent=t;markers.push(new maplibregl.Marker({element:e,offset:[0,dy]}).setLngLat(xy).addTo(map))};
 function mapState(s){if(!ready){queue.push(()=>mapState(s));return}
  markers.forEach(m=>m.remove());markers=[];const ALC=g1('alcaldia'),COR=[-74.1590,4.6295],VACA=[-74.16198,4.62870],PLZ=g1('plaza')||[-74.147,4.62];
  const jac=pts('jac'),hue=pts('huerta');let L=[],Pp=[],Rg=[],cam={center:[-74.152,4.628],zoom:P?11.6:12.4,pitch:0},glow=0;
  if(s==='hub'){jac.forEach(f=>L.push(line(ALC,f.geometry.coordinates,'#9A958C',.6,.35)));Pp=[...jac.map(f=>pt(f.geometry.coordinates,'#B3A6EE',2.5)),pt(ALC,'#F2EFE8',9)];label(ALC,'Alcaldía Local','#F2EFE8')}
  if(s==='multi'){near(COR,hue,30).forEach(f=>L.push(line(COR,f.geometry.coordinates,'#A9D47A',.9,.6)));near(VACA,jac,22).forEach(f=>L.push(line(VACA,f.geometry.coordinates,'#7FC4EC',.9,.6)));near(ALC,jac,12).forEach(f=>L.push(line(ALC,f.geometry.coordinates,'#9A958C',.6,.35)));
   Pp=[...jac.map(f=>pt(f.geometry.coordinates,'#B3A6EE',2)),...hue.map(f=>pt(f.geometry.coordinates,'#A9D47A',1.6)),pt(COR,'#A9D47A',9),pt(VACA,'#7FC4EC',9),pt(ALC,'#F2EFE8',6)];label(COR,'Residuos','#A9D47A');label(VACA,'Agua','#7FC4EC',22)}
  if(s==='centros'||s==='centros2'){const C=[[COR,'#A9D47A','Núcleo residuos'],[VACA,'#7FC4EC','Núcleo agua'],[PLZ,'#F2C76A','Núcleo abastecimiento'],[ALC,'#B3A6EE','Entidades']];
   C.forEach((a,i)=>C.forEach((b,j)=>{if(j>i)L.push(line(a[0],b[0],'#F2B53A',s==='centros2'?2.4:1.4,.8))}));C.forEach(c=>{Pp.push(pt(c[0],c[1],10));label(c[0],c[2],c[1],c[0]===VACA?24:-18)});cam={center:[-74.152,4.627],zoom:P?12:13,pitch:0}}
  if(s==='proposito'){near(COR,hue,40).forEach(f=>L.push(line(COR,f.geometry.coordinates,'#F2C76A',.8,.5)));Pp=[...hue.map(f=>pt(f.geometry.coordinates,'#A9D47A',2)),pt(COR,'#F2C76A',10)];label(COR,'Residuos aprovechables','#F2C76A');cam={center:COR,zoom:P?13.2:14,pitch:0}}
  if(s==='kennedy'){glow=.5;Pp=jac.map(f=>pt(f.geometry.coordinates,'#B3A6EE',2.2))}
  if(s==='cotidiano'){cam={center:[-74.1575,4.6355],zoom:P?15.6:16.4,pitch:45};Pp=[pt([-74.1575,4.6355],'#EE9A7E',9)];label([-74.1575,4.6355],'Calle · bodega · ruta','#EE9A7E')}
  if(s==='nucleo'){cam={center:COR,zoom:P?13.6:14.4,pitch:30};Rg=[circle(COR,.9,'#EE9A7E')];Pp=[pt(COR,'#EE9A7E',10)];label(COR,'Núcleo de residuos','#EE9A7E')}
  if(s==='local'){glow=.9;Pp=[pt(ALC,'#F2EFE8',9)];label(ALC,'Mesa de coordinación','#F2EFE8')}
  if(s==='distrital'){cam={center:[-74.10,4.65],zoom:P?10.2:10.9,pitch:0};glow=.9;Pp=[pt([-74.0721,4.711],'#F2EFE8',8)];label([-74.0721,4.711],'Entidades distritales','#F2EFE8')}
  if(s==='anillos'){cam={center:COR,zoom:P?10.8:11.6,pitch:0};Rg=[circle(COR,.35,'#EE9A7E'),circle(COR,1.3,'#F2C76A'),circle(COR,4.6,'#B3A6EE'),circle(COR,11,'#7FC4EC')];Pp=[pt(COR,'#EE9A7E',7)];
   [[.35,'Cotidiano','#EE9A7E'],[1.3,'Núcleo','#F2C76A'],[4.6,'Local','#B3A6EE'],[11,'Distrital','#7FC4EC']].forEach(([km,t,c])=>label([COR[0],COR[1]+km/111],t,c,-8))}
  if(s==='cogestion'){const J=near(ALC,jac,6);J.forEach(f=>L.push(line(ALC,f.geometry.coordinates,'#A9D47A',1.6,.8)));L.push(line(ALC,COR,'#A9D47A',2.4,.9));Pp=[...J.map(f=>pt(f.geometry.coordinates,'#A9D47A',5)),pt(ALC,'#B3A6EE',9),pt(COR,'#F2C76A',9)];label(ALC,'Instituciones','#B3A6EE');label(COR,'Organizaciones','#F2C76A',22);cam={center:[-74.152,4.627],zoom:P?12.4:13.2,pitch:0}}
  if(s==='coaprendizaje'){Pp=[...jac.map(f=>pt(f.geometry.coordinates,'#E89BD2',3)),...hue.map(f=>pt(f.geometry.coordinates,'#A9D47A',1.5)),pt(ALC,'#B3A6EE',8)];label(ALC,'Saber técnico','#B3A6EE');label([-74.175,4.64],'Saber práctico','#E89BD2',0)}
  map.getSource('lines').setData(FC(L));map.getSource('pts').setData(FC(Pp));map.getSource('rings').setData(FC(Rg));map.setPaintProperty('k-glow','line-opacity',glow);
  map.flyTo({...cam,bearing:0,duration:reduce?0:1800,essential:true,padding:P?{top:10,bottom:10,left:10,right:10}:{left:Math.round(size(el).W*.36),top:20,bottom:20,right:20}});
  legend.html(s==='hub'?'<span>Una sola relación de mando</span>':s==='multi'?'<span style="color:#A9D47A">Residuos</span><span style="color:#7FC4EC">Agua</span><span style="color:#9A958C">Entidades</span>':'')}
 function render(i){const [k,chips,state]=MACRO_STEPS[i];const ai=MACRO_CARDS.findIndex(c=>c.k===k);
  const data=P?[MACRO_CARDS[ai]]:MACRO_CARDS.slice(0,ai+1);
  const cs=stack.selectAll('div.mc').data(data,d=>d.k).join(en=>{const d=en.append('div').attr('class','mc').style('opacity',0).style('transform','translateY(14px)');d.transition().duration(500).style('opacity',1).style('transform','none');return d});
  cs.each(function(c,j){const on=c.k===k;const e=d3.select(this);
   e.style('border-radius','14px').style('padding',on?'14px 16px':'8px 12px').style('background',on?c.c:'rgba(255,255,255,.06)').style('color',on?'#101113':'#B8B3A8').style('border',on?'0':'1px solid #25272c').style('transition','all .5s')
    .html(`<div style="display:flex;gap:12px;align-items:${on?'flex-start':'center'}"><div style="flex:none;width:${on?44:26}px;height:${on?44:26}px;border-radius:10px;border:1.5px solid ${on?'rgba(16,17,19,.6)':'#3a3c42'};display:grid;place-items:center;color:${on?'#101113':c.c}"><svg width="${on?24:15}" height="${on?24:15}"><use href="#${c.ic}" width="${on?24:15}" height="${on?24:15}"/></svg></div>
     <div style="min-width:0"><div style="font:600 10px JetBrains Mono;letter-spacing:.14em;opacity:.7">MACROMODELO POLÍTICO ${c.num}</div><div style="font-weight:700;font-size:${on?19:14}px;letter-spacing:-.01em;margin-top:2px">${c.n}</div>
     ${on?`<div style="font-size:13.5px;line-height:1.4;margin-top:6px">${c.d}</div><div style="display:flex;flex-wrap:wrap;gap:6px;margin-top:10px">${chips.map((t,m)=>`<span style="font:600 10.5px JetBrains Mono;letter-spacing:.06em;text-transform:uppercase;border:1.3px solid rgba(16,17,19,.55);border-radius:6px;padding:3px 7px;animation:rise .45s ${m*.12}s both">${t}</span>`).join('')}</div>`:''}</div></div>`)});
  stack.selectAll('div.arrow').remove();
  tag.text(`${String(i+1).padStart(2,'0')} · ${MACRO_CARDS[ai].n.toUpperCase()}`);
  mapState(state)}
 return render;
}

const SL=[
 /* I · Apertura */
 {b:0,key:'apertura',src:'Red de actores del grupo: 95 actores y 254 relaciones',draw(ctx){const v=redOrg(ctx);return()=>{}}},
 /* II · Situación actual */
 {b:1,key:'situacion',to:3,slow:1300,src:'Modelo Vensim del grupo: Red_interacciones_actores.mdl',draw(ctx){const v=vensim(ctx);return sub=>v.zoom(sub===0?VZ.abasto:sub===1?VZ.residuos:null)}},
 {b:1,key:'situacion',from:3,src:'Guía Corte III · condiciones materiales',draw(ctx){const cs=cards(ctx,[['i-casa','Suelo','¿Quién lo tiene?'],['i-moneda','Dinero','¿Quién lo asigna?'],['i-grupo','Trabajo','¿Quién lo pone?'],['i-doc','Información','¿Quién la conoce?'],['i-reloj','Tiempo','¿Quién lo dedica?']],5);cs.classed('off',true).transition().delay((d,i)=>reduce?0:i*180).on('start',function(){d3.select(this).classed('off',false)})}},
 /* III · Organización actual */
 {b:2,key:'organizacion',src:'Red de actores del grupo · clústeres y niveles de decisión',draw(ctx){const v=redOrg(ctx);return sub=>v.mode(['full','clusters','levels','flow'][sub])}},
 /* IV · Macromodelo político */
 {b:3,keys:['hetero','poli','proposito','niveles','cogestion','coaprendizaje'],src:'Macromodelos del grupo · Crumley (1995) · Ostrom (2010) · capas IDECA',draw(ctx){return macroView(ctx)}},
 /* V · Red de actores */
 {b:4,key:'red1',src:'Relaciones documentadas: S2, S3, S5 · el resto son hipótesis por verificar',draw(ctx){const v=influence(ctx,'hoy');const chain=new Set(['A06','A13','LOG01','A10','A01','A66','A70','A04']);
   return sub=>v.focus(sub===0?e=>chain.has(e.s)&&chain.has(e.t):e=>['A02','A04','A70'].includes(e.s)||['A02','A04','A70'].includes(e.t))}},
 {b:4,key:'red2',src:'Decisiones de diseño del grupo marcadas como propuesta',draw(ctx){const v=influence(ctx,'prop');return sub=>v.focus(sub===0?e=>R3.PROP[e.s]||R3.PROP[e.t]:null)}},
 /* VI · Trayecto de decisión */
 {b:5,key:'trayecto',src:'Guía Corte III, 4.1',draw(ctx){trayecto(ctx,'prop')}},
 {b:5,key:'orden',src:'Decisión de diseño del grupo · actores de la red de Kennedy',draw(ctx){
   const v=bands(ctx);v.show(4);const {W,H,P}=v;
   const STEPS=[{a:['A27','A28'],ar:[]},{a:['A27','A25','NRES'],ar:[['A27','NRES'],['A25','NRES']]},{a:['NRES','A25'],ar:[]},
    {a:['NRES','A27','A25','A57','A28','A23','A24','A32'],ar:[['A57','NRES'],['A28','NRES'],['A23','NRES'],['A24','NRES'],['A32','NRES']]},
    {a:['NRES','A23','A28','A35'],ar:[['A23','NRES'],['A28','NRES'],['A35','NRES']]},
    {a:['NRES','VOC','A32','A34'],ar:[['NRES','VOC'],['VOC','A32'],['VOC','A34']]},
    {a:['A25','A28','A34','FDL'],ar:[['A25','A34'],['A28','A34'],['FDL','A34']]},
    {a:['A23','A24','A27','A26','A57','A28','RES01'],ar:[['A24','A27'],['A23','A26'],['A27','A57'],['A26','A57'],['A28','RES01']]},
    {a:['A25','VOC','MESA','A32'],ar:[['A25','VOC'],['VOC','MESA'],['A32','A25']]},
    {a:['NRES','A25','A27','A28','A23','VOC'],ar:[['NRES','A27']]},
    {a:['A34','A32','A02','A27','A26','A28'],ar:[]}];
   const strip=v.extra.append('g');const n=9,sw=P?(W-28)/n:Math.min(64,(W*.6)/n),sx=P?14:W/2-sw*n/2;
   const chips=d3.range(n).map(i=>{const g=strip.append('g').attr('transform',`translate(${sx+i*sw+sw/2},${H-16})`);g.append('circle').attr('r',P?10:12).attr('fill','#141518').attr('stroke','#3a3c42');const t=txt(g,0,4,String(i+1),{a:'middle',fs:11,fw:700,c:MUTE});return{g,t}});
   return sub=>{const S=STEPS[sub];v.focus(S.a);v.arrows(S.ar,sub===7?'#4FB98C':OCH);
    chips.forEach((c,i)=>{const on=i===sub-1,done=i<sub-1&&sub<10;c.g.select('circle').attr('fill',on?OCH:done?'#3a3c42':'#141518').attr('stroke',on?OCH:'#3a3c42');c.t.attr('fill',on?'#141518':done?INK:MUTE)});
    strip.style('opacity',sub>=1&&sub<=9?1:.4)}}},
 /* VII · Modelo dinámico */
 {b:6,key:'vensim',slow:1300,src:'Modelo Vensim del grupo: Red_interacciones_actores.mdl',draw(ctx){const v=vensim(ctx);return sub=>v.zoom(sub?VZ.residuos:null)}},
 {b:6,key:'bucles',src:'Hipótesis del grupo',draw(ctx){const v=bucles(ctx);const ids=[null,'R1','B1','B2'];return sub=>{v.loop(ids[sub])}}},
 {b:6,key:'prueba',src:'Supuestos del grupo; ilustrativo, no predice',draw(ctx){
   
   const {svg,W,H,P}=svgIn(ctx.el);const T=[{t:'Estado inicial',d:'La red actual: entregas que dependen de pocos contactos.'},{t:'Decisión',d:'Mejorar la coordinación de las entregas de materiales.'},{t:'Dificultad',d:'Cambia el horario de un comprador o se interrumpe un punto de recepción.'}];const tg=svg.append('g');const th=P?H*.34:H*.3;
   T.forEach((t,i)=>{const x=P?14:W*(.04+i*.32),y=P?14+i*th/3:20,w=P?W-28:W*.29;const g=tg.append('g').attr('transform',`translate(${x},${y})`).style('opacity',0);g.transition().delay(reduce?0:i*200).style('opacity',1);
    g.append('rect').attr('width',w).attr('height',P?th/3-6:th-10).attr('rx',8).attr('fill','#17191d').attr('stroke',i===2?RED:'#25272c');txt(g,10,18,t.t,{c:i===2?RED:OCH,fs:P?11:12,fw:600,mono:1});if(!P)txt(g,10,38,t.d.split('.')[0]+'.',{c:SOFT,fs:12,wrap:Math.floor(w/6.4)})});
   function sim(sc){let Pp=.35,C=.3,D=0,O=.05,F=0,Hh=1;const out=[];for(let m=0;m<=36;m++){if(sc==='hoy'){out.push({m,P:.15,H:1});continue}
    const ext=m>=18?2.2:1,Td=.2+.9*O,rot=sc==='rot'?Math.min(1,D*2.5):0,CAR=Td/Math.max(Pp,.05)*(1-.7*rot);D=Math.max(0,Math.min(1,D+.08*(CAR-1)-(CAR<1?.05*D:0)));
    const DEP=sc==='rot'?1-F:1,cum=Math.min(1,Pp/Td),ACU=Math.max(0,Math.min(1,.25+.65*cum-.18*DEP*ext));C+=.12*(ACU-C);Pp=Math.max(.03,Math.min(1,Pp+.1*(C-Pp)-.07*D+.03*rot));O+=.08*(cum*.85*(m>=1)-O);if(sc==='rot')F+=.05*(O-F);Hh+=.12*((1-.8*O)-Hh);out.push({m,P:Pp,H:Hh})}return out}
   const S=[['hoy','Hoy sin cambios','#77736b'],['rot','Información compartida y tareas repartidas',OCH],['sin','Todo depende de un solo contacto',RED]].map(s=>({k:s[0],n:s[1],c:s[2],d:sim(s[0])}));
   const cg=svg.append('g').style('opacity',0);const cy=P?th+30:th+30,ch=H-cy-30;
   [['P','Participación efectiva'],['H','Carga sobre La Vaca (1 = hoy)']].forEach(([k,n],i)=>{const x0=P?40:W*(.06+i*.48),w=P?W-60:W*.42,y0=P?cy+i*(ch/2+10):cy,h=P?ch/2-20:ch;
    const x=d3.scaleLinear([0,36],[x0,x0+w]),y=d3.scaleLinear([0,1.05],[y0+h,y0+16]);txt(cg,x0,y0+6,n,{fw:700,fs:14});
    cg.append('g').attr('transform',`translate(0,${y0+h})`).call(d3.axisBottom(x).ticks(6).tickFormat(d=>'m'+d)).call(a=>a.selectAll('text').attr('fill',MUTE)).call(a=>a.selectAll('line,path').attr('stroke','#33363c'));
    cg.append('line').attr('x1',x(18)).attr('x2',x(18)).attr('y1',y0+16).attr('y2',y0+h).attr('stroke',RED).attr('stroke-dasharray','3 4');
    S.forEach(s=>{const p=cg.append('path').attr('fill','none').attr('stroke',s.c).attr('stroke-width',2.4).attr('d',d3.line().x(d=>x(d.m)).y(d=>y(d[k]))(s.d)).attr('class','simline')})});
   S.forEach((s,i)=>txt(cg,P?14+i*0:W*.5+i*W*.16,P?cy-8+i*0:cy-8,s.n,{c:s.c,fs:12,fw:600}));
   return sub=>{if(sub===1){cg.transition().style('opacity',1);cg.selectAll('.simline').each(function(){const L=this.getTotalLength();d3.select(this).attr('stroke-dasharray',L).attr('stroke-dashoffset',L).transition().duration(reduce?0:2000).attr('stroke-dashoffset',0)})}}}},
 /* VIII · Contradicciones */
 {b:7,key:'tensiones',src:'Guía Corte III, 6.1',draw(ctx){
   const {svg,W,H,P}=svgIn(ctx.el);const T=[['Decisión distribuida','Influencia informal','i-grupo','i-key'],['Autonomía','Dependencia material','i-casa','i-cadena'],['Trabajo repartido','Trabajo concentrado','i-ciclo','i-reloj'],['Beneficios','Costos','i-moneda','i-alerta']];
   const bx=W/2,bl=Math.min(W*(P?.3:.3),260);
   const bs=T.map((t,i)=>{const y=H*(.15+i*.23);const g=svg.append('g').attr('transform',`translate(${bx},${y})`).style('opacity',0);g.append('path').attr('d','M0 6L-12 30H12z').attr('fill','#3a3c42');
    const b=g.append('g');b.append('line').attr('x1',-bl).attr('x2',bl).attr('stroke',RED).attr('stroke-width',3);
    [[-bl,t[2],t[0],'#4FB98C'],[bl,t[3],t[1],RED]].forEach(([x,ic,n,c])=>{const e=b.append('g').attr('transform',`translate(${x},0)`);e.append('circle').attr('r',P?18:24).attr('fill','#141518').attr('stroke',c).attr('stroke-width',2);icon(e,ic,0,0,P?18:24,c);txt(e,0,(P?18:24)+16,n,{a:'middle',fw:700,fs:P?11.5:13})});return{g,b}});
   return sub=>bs.forEach((o,i)=>{if(i<=sub){o.g.transition().duration(400).style('opacity',1);o.b.transition().delay(300).duration(reduce?0:1200).ease(d3.easeElasticOut.amplitude(1).period(.5)).attr('transform','rotate(7)')}})}},
 {b:7,key:'contradiccion',src:'Hipótesis del grupo',draw(ctx){
   const {svg,W,H,P}=svgIn(ctx.el);const c={x:P?W/2:W*.3,y:H*.5};const k=svg.append('g').attr('transform',`translate(${c.x},${c.y})`);k.append('circle').attr('r',40).attr('fill',RED);icon(k,'i-rayo',0,0,40,'#141518');txt(k,0,62,'Pago por material recuperado',{a:'middle',c:RED,fw:700,fs:14});
   const tx=P?W*.8:W*.7,dy=H*.27;
   svg.append('path').attr('id','pT').attr('d',`M${c.x+40},${c.y-10}Q${(c.x+tx)/2},${c.y-dy} ${tx-30},${c.y-dy}`).attr('fill','none').attr('stroke',OCH).attr('stroke-width',2.4);
   svg.append('path').attr('id','pD').attr('d',`M${c.x+40},${c.y+10}Q${(c.x+tx)/2},${c.y+dy} ${tx-30},${c.y+dy}`).attr('fill','none').attr('stroke','#77736b').attr('stroke-width',2).attr('stroke-dasharray','6 6');
   const T=svg.append('g').attr('transform',`translate(${tx},${c.y-dy})`);T.append('circle').attr('r',24).attr('fill',OCH);icon(T,'i-check',0,0,24,'#141518');txt(T,0,44,'Se transforma',{a:'middle',fw:700,fs:15});txt(T,0,62,'reglas que incluyen a los independientes',{a:'middle',c:SOFT,fs:12});
   const D=svg.append('g').attr('class','node').attr('transform',`translate(${tx},${c.y+dy})`);actor(D,'A27',24,{label:false});txt(D,0,44,'Se desplaza',{a:'middle',fw:700,fs:15});txt(D,0,62,'quedan por fuera los independientes',{a:'middle',c:SOFT,fs:12});
   anchor('A27',tx,c.y+dy,24);
   ['pD','pT'].forEach((id,s)=>{for(let i=0;i<3;i++){const cc=svg.append('circle').attr('r',5).attr('fill',s?OCH:'#9A958C');cc.append('animateMotion').attr('dur','2s').attr('repeatCount','indefinite').attr('begin',(i*.66+s*.33)+'s').append('mpath').attr('href','#'+id)}})}},
 /* IX · Transición */
 {b:8,key:'transicion',src:'Decisión de diseño del grupo; meses propuestos',draw(ctx){
   const {svg,W,H,P}=svgIn(ctx.el);const S=[['Diagnóstico','meses 1–2',['A25','A57','A23','A28']],['Convocatoria','mes 3',['A35','AMB03']],['Piloto','meses 4–9',['NRES','A32','A34']],['Financiación','presupuesto participativo',['A35','A34','FDL']],['Revisión','mes 9',['NRES']]];
   const pos=i=>P?{x:40,y:40+i*(H-70)/4.3}:{x:W*(.1+i*.2),y:H*.3};const r=P?16:Math.min(22,W/50);
   svg.append('path').attr('d',P?`M40,${pos(0).y}V${pos(4).y}`:`M${pos(0).x},${pos(0).y}H${pos(4).x}`).attr('stroke',RED).attr('stroke-width',2).attr('stroke-dasharray','6 5');
   const gs=S.map(([n,m,ids],i)=>{const p=pos(i);const g=svg.append('g').attr('transform',`translate(${p.x},${p.y})`).style('opacity',.15);g.append('circle').attr('r',P?18:24).attr('fill','#141518').attr('stroke',RED).attr('stroke-width',2.4);txt(g,0,6,String(i+1),{a:'middle',fw:700,fs:15,c:RED});
    const tx=P?32:0,an=P?'start':'middle';txt(g,tx,P?-4:44,n,{a:an,fw:700,fs:P?14:16});txt(g,tx,P?12:62,m,{a:an,c:OCH,fs:12,mono:1});
    ids.forEach((id,j)=>{const wx=P?tx+16+j*40:(j-(ids.length-1)/2)*(r*2+14),wy=P?44:110;anchor(id,p.x+wx,p.y+wy,r);actor(g.append('g').attr('class','node').attr('transform',`translate(${wx},${wy})`),id,P?14:r,{label:!P,fs:10,wrap:12})});return g});
   return sub=>gs.forEach((g,i)=>g.transition().duration(500).style('opacity',sub===0?.6:i<sub?(i===sub-1?1:.55):.15))}},
 /* X · Síntesis y cierre */
 {b:9,key:'sintesis',src:'Capas IDECA: juntas de acción comunal (IDPAC), huertas (Jardín Botánico) · mapa base © OpenStreetMap, CARTO',draw(ctx){
   d3.select(ctx.el).append('div').attr('id','mapC');
   const map=new maplibregl.Map({container:'mapC',style:'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',center:[-74.155,4.630],zoom:size(ctx.el).W<700?11.9:12.9,attributionControl:{compact:false}});map.scrollZoom.disable();ctx.onExit(()=>map.remove());
   map.on('load',()=>Promise.all(['assets/territorio_kennedy.geojson','assets/territorio_puntos.geojson'].map(u=>fetch(u).then(r=>r.json()))).then(([K,Pt])=>{
    map.addSource('k',{type:'geojson',data:K});map.addLayer({id:'k',type:'line',source:'k',paint:{'line-color':'#F2EFE8','line-opacity':.6,'line-width':1.2}});
    map.addSource('p',{type:'geojson',data:{type:'FeatureCollection',features:Pt.features.filter(f=>['huerta','jac'].includes(f.properties.c))}});
    map.addLayer({id:'p',type:'circle',source:'p',paint:{'circle-radius':['case',['==',['get','c'],'jac'],4.5,2.5],'circle-color':['case',['==',['get','c'],'jac'],'#9382E0','#8EBF4C'],'circle-opacity':.9}});
    const cora=[-74.1590,4.6295];const e=document.createElement('div');e.style.cssText='font:600 12.5px Instrument Sans;color:#DE9F50;text-shadow:0 1px 6px #000';e.textContent='Corabastos';new maplibregl.Marker({element:e,offset:[0,-14]}).setLngLat(cora).addTo(map);
    map.addSource('c',{type:'geojson',data:{type:'Feature',geometry:{type:'Point',coordinates:cora}}});map.addLayer({id:'c',type:'circle',source:'c',paint:{'circle-radius':8,'circle-color':'#DE9F50','circle-stroke-width':2,'circle-stroke-color':'#111'}})}));
   ctx.legend([['#9382E0',null,'Juntas de acción comunal (188)'],['#8EBF4C',null,'Huertas (811)'],['#DE9F50',null,'Corabastos']])}},
 {b:9,key:'piezas',src:'Guía Corte III, 7',draw(ctx){
   const {svg,W,H,P}=svgIn(ctx.el);const PZ=[['i-doc','Ficha del macromodelo'],['i-grupo','Red de actores'],['i-mazo','Trayecto de decisión'],['i-ciclo','Modelo dinámico-causal'],['i-casa','Síntesis territorial'],['i-lupa','Fuentes y supuestos']];
   const c={x:W/2,y:H/2},R0=Math.min(W*(P?.36:.3),H*.36);const pts=PZ.map((_,i)=>{const a=-Math.PI/2+i*Math.PI/3;return[c.x+Math.cos(a)*R0*(P?1:1.3),c.y+Math.sin(a)*R0]});
   const gl=svg.append('g').style('opacity',0);for(let i=0;i<6;i++)for(let j=i+1;j<6;j++)gl.append('path').attr('d',`M${pts[i]}L${pts[j]}`).attr('stroke',OCH).attr('stroke-opacity',.35).attr('stroke-dasharray','4 6').attr('class','flowing');
   PZ.forEach(([ic,n],i)=>{const g=svg.append('g').attr('transform',`translate(${pts[i]})`).style('opacity',0);g.transition().delay(reduce?0:i*160).style('opacity',1);g.append('circle').attr('r',P?24:32).attr('fill','#141518').attr('stroke',OCH).attr('stroke-width',2.2);icon(g,ic,0,0,P?22:28,OCH);txt(g,0,(P?24:32)+18,n,{a:'middle',fw:700,fs:P?11.5:14})});
   const ct=txt(svg,c.x,c.y+6,'coherencia',{a:'middle',c:OCH,fs:P?14:17,fw:600});ct.style('opacity',0);
   return sub=>{gl.transition().duration(600).style('opacity',sub?1:0);ct.transition().style('opacity',sub?1:0)}}},
 {b:9,key:'cierre',src:'Corte III · Kennedy',draw(ctx){const cs=statement(ctx,['La <span style="color:#F2B53A">heterarquía</span> distribuye la influencia; la <span style="color:#4EAECF">gobernanza policéntrica</span> coordina los centros; las <span style="color:#8EBF4C">reglas de mandato, seguimiento y rectificación</span> las hacen revisables.','¿Quién decide, qué recursos circulan y <span style="color:#F2B53A">quién puede corregir lo que no funciona</span>?']);
   return sub=>cs.style('opacity',(d,i)=>i<=sub?1:.15)}}
];


/* ================= motor de la presentación ================= */
SL.forEach(S=>{S.g=S.keys?S.keys.flatMap(k=>window.GUION[k]):window.GUION[S.key].slice(S.from||0,S.to);S.subs=S.g.length});
const OFF=[];let tot=0;SL.forEach(S=>{OFF.push(tot);tot+=S.subs});
const stage=$('#stage'),below=$('#below');let cur=-1,sub=0,upd=null,exits=[],ctxNow=null,tagT=[];
$('#blocks').innerHTML=B.map((n,i)=>`<button data-b="${i}">${ROM[i]}<span class="nm"> ${n}</span></button>`).join('');
document.querySelectorAll('#blocks button').forEach(b=>b.onclick=e=>{e.stopPropagation();go(SL.findIndex(s=>s.b===+b.dataset.b))});
let ph='';SL.forEach((S,i)=>S.g.forEach((g,j)=>{ph+=`<span class="${OFF[i]+j&&j===0&&SL[i-1].b!==S.b?'gap':''}" data-i="${i}" data-j="${j}" title="${OFF[i]+j+1}"></span>`}));$('#prog').innerHTML=ph;
document.querySelectorAll('#prog span').forEach(s=>s.onclick=()=>go(+s.dataset.i,+s.dataset.j));
const mobile=()=>matchMedia('(max-width:760px)').matches;
function drawTags(){tagT.forEach(clearTimeout);tagT=[];const c=ctxNow;if(!c||!c.svg)return;c.svg.selectAll('g.tags').remove();const tags=SL[cur].g[sub].tags||[];if(!tags.length)return;
 tagT.push(setTimeout(()=>{const svg=c.svg;const vb=svg.attr('viewBox').split(' ').map(Number);const px=svg.node().getBoundingClientRect().width||1;const k=vb[2]/px*(svg.attr('preserveAspectRatio')==='xMidYMid meet'?Math.max(1,(vb[3]/vb[2])/(svg.node().getBoundingClientRect().height/px)):1);
  const L=svg.append('g').attr('class','tags');const light=c.el.classList.contains('vensim');const placed=[];
  tags.forEach(([id,t1,t2,col],i)=>{const a=c.anchors[id];if(!a)return;const [x,y,r]=a;const right=x<vb[0]+vb[2]*.62;const bw=Math.max(t1.length*7.6,t2.length*6.6)*k+22*k,bh=42*k;
   const cands=[[x+r+40*k,y-r-30*k-bh/2],[x-r-40*k-bw,y-r-30*k-bh/2],[x+r+40*k,y+r+18*k],[x-r-40*k-bw,y+r+18*k],[x-bw/2,y-r-60*k-bh],[x-bw/2,y+r+40*k]];
   const clamp=([cx,cy])=>[Math.max(vb[0]+6*k,Math.min(vb[0]+vb[2]-bw-6*k,cx)),Math.max(vb[1]+6*k,Math.min(vb[1]+vb[3]-bh-6*k,cy))];
   const hit=([cx,cy])=>Object.entries(c.anchors).some(([aid,[ax,ay,ar]])=>aid!==id&&ax+ar>cx-4*k&&ax-ar<cx+bw+4*k&&ay+ar+28*k>cy&&ay-ar<cy+bh)||placed.some(p=>p[0]<cx+bw&&p[0]+p[2]>cx&&p[1]<cy+bh&&p[1]+p[3]>cy);
   let [bx,by]=clamp((right?cands:[cands[1],cands[0],cands[3],cands[2],cands[4],cands[5]]).map(clamp).find(q=>!hit(q))||cands[right?0:1]);placed.push([bx,by,bw,bh]);
   const g=L.append('g').style('opacity',0);g.transition().delay(i*450).duration(500).style('opacity',1);
   g.append('circle').attr('cx',x).attr('cy',y).attr('r',r+7*k).attr('fill','none').attr('stroke',col).attr('stroke-width',2.4*k).append('animate').attr('attributeName','r').attr('values',`${r+5*k};${r+12*k};${r+5*k}`).attr('dur','1.8s').attr('repeatCount','indefinite');
   const ex=bx+bw/2<x?bx+bw:bx,ey=by+bh/2;g.append('path').attr('d',`M${x+(right?1:-1)*(r+7*k)},${y}L${ex},${ey}`).attr('stroke',col).attr('stroke-width',1.8*k).attr('fill','none');
   g.append('rect').attr('x',bx).attr('y',by).attr('width',bw).attr('height',bh).attr('rx',4*k).attr('fill',light?'#ffffff':'#101113').attr('stroke',col).attr('stroke-width',2*k);
   g.append('text').attr('x',bx+11*k).attr('y',by+17*k).attr('font-size',13*k).attr('font-weight',700).attr('fill',light?'#111':'#F2EFE8').attr('font-family','Instrument Sans').text(t1);
   g.append('text').attr('x',bx+11*k).attr('y',by+33*k).attr('font-size',11.5*k).attr('fill',light?'#444':'#B8B3A8').attr('font-family','Instrument Sans').text(t2)})},SL[cur].slow||450))}
function header(){const S=SL[cur],g=S.g[sub];const n=OFF[cur]+sub+1;
 $('#kicker').textContent=`${String(n).padStart(2,'0')} — Bloque ${ROM[S.b]} · ${B[S.b]}`;
 ['title','sub'].forEach(id=>{const e=$('#'+id);e.classList.remove('rise');void e.offsetWidth;e.classList.add('rise')});$('#title').textContent=g.t;$('#sub').textContent=g.s||'';
 $('#guionTxt').textContent=g.n||'';$('#count').textContent=`${window.TIMES[S.b]}`;$('#pbar').style.width=(n/tot*100)+'%';
 document.querySelectorAll('#prog span').forEach(p=>{const q=OFF[+p.dataset.i]+ +p.dataset.j;p.classList.toggle('on',q===n-1);p.classList.toggle('done',q<n-1)});
 const h=stage.querySelector('.hint');if(h)h.innerHTML=(S.subs>1?Array.from({length:S.subs},(_,j)=>`<i class="${j<=sub?'on':''}"></i>`).join(''):'')+(n===tot?'Fin':'Clic para continuar');
 $('#next').textContent=n===tot?'Fin':'Siguiente';history.replaceState(null,'','#'+n);}
function go(i,s=0){i=Math.max(0,Math.min(SL.length-1,i));exits.forEach(f=>f());exits=[];hideTip();tagT.forEach(clearTimeout);cur=i;sub=s;const S=SL[i];
 stage.innerHTML='';below.innerHTML='';const el=document.createElement('div');el.className='slide';stage.appendChild(el);$('#src').textContent='Fuentes · '+S.src;
 document.querySelectorAll('#blocks button').forEach(b=>{const on=+b.dataset.b===S.b;b.classList.toggle('on',on);b.querySelector('.nm').style.display=on?'':'none'});
 const ctx={el,anchors:{},svg:null,onExit:f=>exits.push(f),setSub:()=>{},caption:()=>{},
  legend(items,light){const d=document.createElement('div');d.className='leg'+(light?' light':'');
   d.innerHTML=items.map(([c,dash,n])=>{let sw;if(c==='key')sw=`<svg width="22" height="16"><circle cx="11" cy="8" r="7" fill="none" stroke="${RED}"/><use href="#i-key" x="5" y="2" width="12" height="12" style="color:${RED}"/></svg>`;
    else if(c==='prop')sw=`<svg width="22" height="16"><circle cx="11" cy="8" r="6.5" fill="none" stroke="#B8B3A8" stroke-dasharray="3 2"/></svg>`;
    else if(c==='stock')sw=`<svg width="22" height="16"><rect x="2" y="2" width="18" height="12" fill="#fff" stroke="#111" stroke-width="1.6"/></svg>`;
    else if(c==='valve')sw=`<svg width="22" height="16"><path d="M0 8H22" stroke="#111" stroke-width="5"/><path d="M0 8H22" stroke="#fff" stroke-width="2.5"/><path d="M5 3L17 13V3L5 13z" fill="#fff" stroke="#111"/></svg>`;
    else if(c==='cloud')sw=`<svg width="22" height="16"><path d="M4 12c-3 0-4-4-1-5 0-4 4-5 6-2 2-3 7-2 6 2 3 0 3 5 0 5z" fill="#fff" stroke="#111"/></svg>`;
    else sw=`<svg width="26" height="10"><path d="M1 5H25" stroke="${c}" stroke-width="2.4" ${dash?`stroke-dasharray="${dash}"`:''} stroke-linecap="round"/></svg>`;return`<span>${sw}${n}</span>`}).join('');(mobile()?below:el).appendChild(d)}};
 CUR_CTX=ctx;ctxNow=ctx;upd=S.draw(ctx)||null;const hint=document.createElement('div');hint.className='hint';el.appendChild(hint);
 if(upd)upd(sub);CUR_CTX=null;header();drawTags();}
function next(){const S=SL[cur];if(sub<S.subs-1){sub++;CUR_CTX=ctxNow;upd&&upd(sub);CUR_CTX=null;header();drawTags()}else if(cur<SL.length-1)go(cur+1)}
function prev(){if(sub>0){sub--;CUR_CTX=ctxNow;upd&&upd(sub);CUR_CTX=null;header();drawTags()}else if(cur>0)go(cur-1,SL[cur-1].subs-1)}
$('#next').onclick=e=>{e.stopPropagation();next()};$('#prev').onclick=e=>{e.stopPropagation();prev()};
$('#gbtn').onclick=e=>{e.stopPropagation();document.body.classList.toggle('show-guion');$('#gbtn').setAttribute('aria-pressed',document.body.classList.contains('show-guion'))};
const SOLO=new URLSearchParams(location.search).has('solo');if(SOLO)document.body.classList.add('solo');
addEventListener('message',e=>{const d=e.data||{};if(!d.guia)return;const si=SL.findIndex(S=>S.key===d.key||(S.keys&&S.keys.includes(d.key)));if(si<0)return;let off=0;if(SL[si].keys){for(const k of SL[si].keys){if(k===d.key)break;off+=window.GUION[k].length}}const t=off+(d.sub||0);if(si===cur){sub=t;CUR_CTX=ctxNow;upd&&upd(sub);CUR_CTX=null;header();drawTags()}else go(si,t)});
stage.addEventListener('click',e=>{if(SOLO)return;if(e.target.closest('.chip,a,button,.maplibregl-ctrl'))return;if(e.target.closest('#mapC')&&SL[cur].key==='sintesis')return;const r=stage.getBoundingClientRect();if(e.clientX-r.left<r.width*.12)prev();else next()});
addEventListener('keydown',e=>{if(['ArrowRight',' ','PageDown'].includes(e.key)){e.preventDefault();next()}else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();prev()}
 else if(e.key==='f'||e.key==='F'){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.()}else if(e.key==='n'||e.key==='N'){$('#gbtn').click()}});
let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>go(cur,sub),250)});
const h0=(parseInt(location.hash.slice(1))||1)-1;let si=0;while(si<SL.length-1&&OFF[si+1]<=h0)si++;go(si,Math.min(h0-OFF[si],SL[si].subs-1));
window.__pres={SL,go,OFF,tot,get cur(){return cur}};
})();
