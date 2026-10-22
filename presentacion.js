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
const B=['Macromodelo político','Red de interacciones','Trayecto de decisión','Modelo dinámico','Contradicciones','Síntesis territorial','Fuentes y supuestos'];
const ROM=['I','II','III','IV','V','VI','VII'];
const SUBSYS=[
 {n:'Todo el modelo',ids:null,t:'El modelo en Vensim: cajas son niveles (actores que acumulan), válvulas son flujos y flechas azules son influencias con signo.'},
 {n:'Abastecimiento y Corabastos',ids:['1','2','3','4','5','6','7','8','19','20','21','22','23','24','25','44','50','60','67','77','78','84','168'],t:'Corabastos, mayoristas, camiones y compradores: el flujo de alimentos desde productores hasta hogares.'},
 {n:'Residuos y reciclaje',ids:['9','10','11','26','27','91','94','95','112','113','114'],t:'Comercios y hogares generan; recicladores, operador de aseo, UAESP y Ambiente reducen el nivel (signo −).'},
 {n:'Educación',ids:['13','30','31','32','33','153','158'],t:'Ingreso y egreso de estudiantes; rectores, docentes y familias sostienen a los colegios.'},
 {n:'Salud',ids:['14','34','179','184'],t:'La demanda de atención primaria entra a la Subred y la atienden médicos y personal de salud.'},
 {n:'Transporte público',ids:['15','35','132','137','144'],t:'TransMilenio y operadores ponen buses; los usuarios los ocupan (signo −).'},
 {n:'Gobierno local',ids:['12','28','29','125'],t:'Residentes, juntas y presidentes de JAC llevan solicitudes a la Alcaldía Local.'}
];
const SL=[
 {b:0,t:'Quién encabeza cambia con el asunto',s:'Heterarquía: los actores no tienen un rango fijo; se ordenan según la materia.',src:'Crumley (1995), S7 · Ostrom (2010), S8 · actores: Red libre de Kennedy',subs:5,draw(ctx){
   const {svg,W,H,P}=svgIn(ctx.el);const keys=Object.keys(R3.RANK);const A=R3.RANK.hoy.o;
   const slot=(i,m)=>{if(m==='hoy')return P?{x:40+i*(W-200)/9,y:40+i*(H-80)/9.5,r:22-i*.7}:{x:W*.06+i*W*.095,y:H*.12+i*H*.075,r:Math.min(40,W/30)-i*1.5};
    if(P){if(i===0)return{x:W/2,y:H*.14,r:42};if(i<3)return{x:i===1?W*.27:W*.73,y:H*.38,r:30};const j=i-3;return j<4?{x:W*(.14+j*.24),y:H*.62,r:22}:{x:W*(.26+(j-4)*.24),y:H*.84,r:22}}
    if(i===0)return{x:W/2,y:H*.2,r:Math.min(58,W/20)};if(i<3)return{x:i===1?W*.32:W*.68,y:H*.4,r:Math.min(42,W/28)};const j=i-3;return{x:W*(.1+j*.133),y:H*.7,r:Math.min(30,W/38)}};
   const gL=svg.append('g');const ns=svg.append('g').selectAll('g').data(A).join('g').attr('class','node');
   ns.each(function(id){const g=d3.select(this);g.append('g').attr('class','body')});
   const cap=txt(svg,P?14:W*.06,H-16,'',{c:SOFT,fs:13});
   function set(k){const R=R3.RANK[k];cap.text('');
    ns.each(function(id){const i=R.o.indexOf(id),s=slot(i,k),g=d3.select(this);anchor(id,s.x,s.y,s.r);const b=g.select('.body');b.selectAll('*').remove();actor(b,id,s.r,{fs:P?11:12.5,glow:k!=='hoy'&&i<3,wrap:P?13:16});
     if(k==='hoy'&&P)b.select('text').attr('text-anchor','start').attr('y',4).selectAll('tspan').attr('x',s.r+8);
     g.transition('p').duration(reduce?0:900).ease(d3.easeCubicInOut).attr('transform',`translate(${s.x},${s.y})`).style('opacity',k==='hoy'&&id==='GUAR'?.3:1)});
    gL.selectAll('*').remove();if(k==='hoy'){gL.append('path').attr('d',d3.line()(A.map((_,i)=>{const s=slot(i,'hoy');return[s.x,s.y]}))).attr('fill','none').attr('stroke','#3a3c42').attr('stroke-dasharray','4 6')}
    else{const s=slot(0,k);gL.append('circle').attr('cx',s.x).attr('cy',s.y).attr('r',s.r+34).attr('fill','none').attr('stroke',R.c).attr('stroke-opacity',.5).attr('stroke-dasharray','3 7').attr('class','flowing')}}
   ns.attr('transform',(id,i)=>{const s=slot(i,'hoy');return`translate(${s.x},${s.y})`});
   return sub=>set(keys[sub]);}},
 {b:0,t:'De los macromodelos ecológicos al político',s:'Los siete macromodelos dicen qué cuidar; la heterarquía dice quién decide sobre cada cosa.',src:'Macromodelos ecológicos del grupo (macromodelos-kennedy)',subs:1,draw(ctx){
   const {svg,W,H,P}=svgIn(ctx.el);const S={eco:'Marco general',hid:'Agua: custodios primero',reg:'Restaurar antes que compensar',com:'Abasto: comerciantes y coteros',cir:'Residuos: quien separa',lim:'Llave ecológica',bio:'Voz de otras vidas'};
   const c={x:W/2,y:P?H*.5:H*.62};const rr=P?Math.min(W,H)*.38:Math.min(W*.4,H*.46);
   const cg=svg.append('g').attr('transform',`translate(${c.x},${c.y})`).style('opacity',0);const lines=[];cg.append('circle').attr('r',P?44:58).attr('fill','#1d1a12').attr('stroke',OCH).attr('stroke-width',2.5);
   txt(cg,0,-4,'Heterarquía',{a:'middle',fw:700,fs:P?14:17});txt(cg,0,16,'macromodelo político',{a:'middle',c:SOFT,fs:11});
   C3.ECO.forEach((m,i)=>{const a=P?(-Math.PI/2+i*2*Math.PI/7):(Math.PI+(i+.5)*Math.PI/7);const x=c.x+Math.cos(a)*rr,y=c.y+Math.sin(a)*rr*(P?1:.95);
    const ln=svg.insert('path','g').attr('d',`M${x},${y}L${c.x},${c.y}`).attr('stroke',m.c).attr('stroke-width',1.6).attr('stroke-dasharray','5 5').attr('class','flowing').attr('opacity',0);lines.push(ln);
    const g=svg.append('g').attr('transform',`translate(${x},${y})`).style('opacity',0);g.transition().delay(reduce?0:i*160).duration(500).style('opacity',1);
    g.append('circle').attr('r',P?20:26).attr('fill','#141518').attr('stroke',m.c).attr('stroke-width',2.4);icon(g,['i-hoja','i-gota','i-ciclo','i-moneda','i-ciclo','i-alerta','i-hoja'][i],0,0,P?18:22,m.c);
    txt(g,0,(P?20:26)+16,m.n,{a:'middle',fw:700,fs:P?11.5:13.5});txt(g,0,(P?20:26)+31,S[m.id],{a:'middle',c:SOFT,fs:P?10.5:12})});
   return sub=>{cg.transition().duration(600).style('opacity',sub?1:0);lines.forEach((l,i)=>l.transition().delay(sub?i*120:0).duration(500).attr('opacity',sub?.7:0))}}},
 {b:0,t:'Cinco principios',s:'Cada principio responde a una pregunta de la guía: quién decide, quién ejecuta y quién puede corregir.',src:'Decisiones de diseño del grupo · referentes S7, S8, S10',subs:5,draw(ctx){
   const el=d3.select(ctx.el).append('div').attr('class','cards').style('grid-template-columns',`repeat(${size(ctx.el).W<700?1:5},1fr)`);
   const cs=el.selectAll('div').data(R3.PRINCIPIOS).join('div').attr('class','card off').html((p,i)=>`<svg width="40" height="40" style="color:${OCH}"><use href="#${p.ic}" width="40" height="40"/></svg><div class="n">0${i+1}</div><h3>${p.t}</h3><p>${p.d}</p>`);
   return sub=>cs.classed('off',(p,i)=>i>sub)}},
 {b:0,t:'Qué es colectivo y qué se delega',s:'Delegar no es controlar: la delegación tiene límites y se puede retirar.',src:'Decisiones de diseño del grupo',subs:4,draw(ctx){
   const D=[['i-grupo','Colectivo','Presupuesto participativo, reglas de separación y uso del entorno del humedal.'],['i-doc','Se delega','Operar la planta, medir el agua y contratar, con mandato escrito y plazo.'],['i-alerta','Límites','Máximo dos periodos; nada de presupuesto sin acta; la llave ecológica no se delega.'],['i-key','Revocación','Un tercio del núcleo pide revisión; la mayoría retira el mandato.']];
   const el=d3.select(ctx.el).append('div').attr('class','cards').style('grid-template-columns',`repeat(${size(ctx.el).W<700?1:4},1fr)`);
   const cs=el.selectAll('div').data(D).join('div').attr('class','card off').html(d=>`<svg width="40" height="40" style="color:${OCH}"><use href="#${d[0]}" width="40" height="40"/></svg><h3>${d[1]}</h3><p>${d[2]}</p>`);return sub=>cs.classed('off',(d,i)=>i>sub)}},
 {b:0,t:'Objetivos que se pueden verificar',s:'«Habrá participación» no basta: cada objetivo dice cómo se comprueba.',src:'Presupuestos participativos: S1 · cifras de residuos en disputa: S6',subs:5,draw(ctx){
   const {svg,W,H,P}=svgIn(ctx.el);const O=R3.OBJETIVOS;const top=P?20:30,rh=(H-top-20)/O.length;const x0=P?14:W*.04,xa=P?W*.12:W*.42,xb=P?W*.88:W*.9;
   if(!P){txt(svg,xa,top-6,'HOY',{a:'middle',c:MUTE,fs:11,mono:1});txt(svg,xb,top-6,'META',{a:'middle',c:OCH,fs:11,mono:1})}
   const rows=O.map((o,i)=>{const y=top+i*rh+rh/2;const g=svg.append('g').style('opacity',0);
    txt(g,x0,P?y-rh*.3:y-6,o.t,{fw:700,fs:P?15:17});txt(g,x0,P?y-rh*.3+18:y+14,o.i,{c:SOFT,fs:P?12:13,wrap:P?48:40});
    const ly=P?y+rh*.22:y;g.append('line').attr('x1',xa).attr('x2',xb).attr('y1',ly).attr('y2',ly).attr('stroke','#3a3c42').attr('stroke-width',2);
    g.append('circle').attr('cx',xa).attr('cy',ly).attr('r',7).attr('fill','#55575d');const m=g.append('circle').attr('cx',xa).attr('cy',ly).attr('r',9).attr('fill',OCH);
    txt(g,xa,ly+(P?22:24),o.hoy,{a:P?'start':'middle',c:MUTE,fs:12});txt(g,xb,ly+(P?22:24),o.meta,{a:'end',c:OCH,fs:12});return{g,m}});
   return sub=>rows.forEach((r,i)=>{if(i<=sub&&r.g.style('opacity')=='0'){r.g.transition().duration(400).style('opacity',1);r.m.transition().delay(300).duration(reduce?0:1100).attr('cx',xb)}})}},
 {b:0,t:'De la situación actual a la propuesta',s:'Quién impulsa, quién resiste, qué recursos se disputan y qué hecho inicia el cambio.',src:'Diagnóstico del grupo (S5) · presupuestos participativos (S1)',subs:3,draw(ctx){
   const {svg,W,H,P}=svgIn(ctx.el);const T=R3.TRANS;const r=P?20:Math.min(30,W/40);
   const g1=svg.append('g').style('opacity',0),g2=svg.append('g').style('opacity',0),g3=svg.append('g').style('opacity',0);
   const lx=P?W*.12:W*.2,rx=P?W*.88:W*.8,cy0=P?H*.08:H*.18;
   txt(g1,lx,cy0,'IMPULSAN',{a:'middle',c:GRN,fs:12,mono:1});txt(g1,rx,cy0,'RESISTEN',{a:'middle',c:RED,fs:12,mono:1});
   const ty0=P?H*.74:H*.72,sp=(ty0-cy0-90)/4;
   T.impulsan.forEach((id,i)=>{anchor(id,lx,cy0+36+i*sp,r);const g=g1.append('g').attr('class','node').attr('transform',`translate(${lx},${cy0+36+i*sp})`);actor(g,id,r,{label:false});if(!P)txt(g,-r-10,4,ACT(id).short,{a:'end',fs:12,c:SOFT})});
   T.resisten.forEach((id,i)=>{anchor(id,rx,cy0+36+i*sp*1.3,r);const g=g1.append('g').attr('class','node').attr('transform',`translate(${rx},${cy0+36+i*sp*1.3})`);actor(g,id,r,{label:false});if(!P)txt(g,r+10,4,ACT(id).short,{fs:12,c:SOFT})});
   txt(g2,W/2,cy0,'RECURSOS EN DISPUTA',{a:'middle',c:OCH,fs:12,mono:1});
   T.disputa.forEach((d,i)=>{const y=cy0+34+i*(P?44:(H*.72-cy0-100)/4);g2.append('rect').attr('x',W/2-(P?70:110)).attr('y',y-16).attr('width',P?140:220).attr('height',32).attr('rx',16).attr('fill','#1d1a12').attr('stroke',OCH);txt(g2,W/2,y+5,d,{a:'middle',fs:P?12:14,fw:600});
    g2.append('path').attr('d',`M${lx+r+8},${y}H${W/2-(P?74:114)}`).attr('stroke',GRN).attr('stroke-dasharray','5 5').attr('class','flowing').attr('marker-end',null);g2.append('path').attr('d',`M${rx-r-8},${y}H${W/2+(P?74:114)}`).attr('stroke',RED).attr('stroke-dasharray','5 5').attr('class','flowing')});
   const ty=P?H*.74:H*.72;const sx=i=>W*(.12+i*.25);
   g3.append('line').attr('x1',sx(0)).attr('x2',sx(3)).attr('y1',ty).attr('y2',ty).attr('stroke',RED).attr('stroke-dasharray','6 5');
   T.pasos.forEach(([n,d],i)=>{const g=g3.append('g').attr('transform',`translate(${sx(i)},${ty})`);g.append('circle').attr('r',P?14:18).attr('fill','#141518').attr('stroke',RED).attr('stroke-width',2);txt(g,0,5,String(i+1),{a:'middle',c:RED,fw:700,fs:13});txt(g,0,(P?14:18)+18,n,{a:'middle',fw:700,fs:P?12:14});if(!P)txt(g,0,(P?14:18)+36,d,{a:'middle',c:SOFT,fs:12,wrap:26})});
   txt(g3,W/2,H-14,T.inicio,{a:'middle',c:SOFT,fs:P?11:12.5,wrap:P?60:140});
   return sub=>[g1,g2,g3].forEach((g,i)=>{if(i<=sub)g.transition().duration(500).style('opacity',1)})}},
 {b:0,t:'Lo que enseñan los referentes',s:'Ningún mecanismo funcionó solo por voluntad: Christiania y Findhorn dependieron del suelo y de ingresos propios.',src:'Comparativa Christiania – Findhorn del grupo (S10)',subs:1,draw(ctx){
   const R=R3.REFERENTES;const el=d3.select(ctx.el).append('div').attr('class','cards').style('grid-template-columns',`repeat(${size(ctx.el).W<700?1:3},1fr)`).style('align-content','stretch');
   const cs=el.selectAll('div').data(R.cols).join('div').attr('class','card off').style('border-color',(c,i)=>i===2?'#5a4520':null).html((c,i)=>`<div class="n">${c.sub}</div><h3 style="${i===2?'color:'+OCH:''}">${c.n}</h3>${R.filas.map((f,j)=>c.c[j]==='—'?'':`<p style="margin-top:12px"><span class="mono" style="font-size:11px;color:#77736b;text-transform:uppercase">${f}</span><br>${c.c[j]}</p>`).join('')}`);return sub=>cs.classed('off',(c,i)=>i>sub)}},
 {b:1,t:'La red de actores de Kennedy',s:'Los mismos actores y colores de la Red libre: el Corte III trabaja sobre esta red.',src:'Red de actores del grupo · capas IDECA (S4)',subs:1,draw(ctx){
   const {svg,W,H,P}=svgIn(ctx.el);const N=RED_DATA.nodes.map(n=>({...n})),NB=new Map(N.map(n=>[n.id,n]));const Lk=RED_DATA.links.filter(l=>NB.has(l.s)&&NB.has(l.t)).map(l=>({...l,source:l.s,target:l.t}));
   const RING=['log','res','gob','sal','edu','mov','con'];const cen={cor:[W/2,H/2]};RING.forEach((k,i)=>{const a=-Math.PI/2+(i+.5)*2*Math.PI/7;cen[k]=[W/2+Math.cos(a)*W*(P?.28:.33),H/2+Math.sin(a)*H*(P?.36:.34)]});
   const r=n=>({1:P?12:16,2:P?9:12,3:P?7:9,4:P?6:8})[n.lv]||8;
   const sim=d3.forceSimulation(N).force('l',d3.forceLink(Lk).id(d=>d.id).distance(40).strength(.05)).force('q',d3.forceManyBody().strength(-60)).force('x',d3.forceX(n=>cen[n.sph][0]).strength(.15)).force('y',d3.forceY(n=>cen[n.sph][1]).strength(.15)).force('c',d3.forceCollide(n=>r(n)+4)).stop();
   for(let i=0;i<300;i++)sim.tick();
   N.forEach(n=>anchor(n.id,n.x,n.y,r(n)));
   svg.append('g').selectAll('path').data(Lk).join('path').attr('d',l=>`M${l.source.x},${l.source.y}L${l.target.x},${l.target.y}`).attr('stroke',l=>CONV[l.c]||'#555').attr('stroke-dasharray',l=>CONVD[l.c]).attr('stroke-width',1).attr('opacity',.55);
   const ns=svg.append('g').selectAll('g').data(N).join('g').attr('class','node').attr('transform',n=>`translate(${n.x},${n.y})`).each(function(n){actor(d3.select(this),n.id,r(n),{label:n.lv===1&&!P,fs:10,wrap:16})})
    .on('mousemove',(e,n)=>showTip(`<b>${esc(n.name)}</b><br>${esc(n.fun||'')}`,e)).on('mouseleave',hideTip);
   ns.style('opacity',0).transition().delay(n=>reduce?0:Math.hypot(n.x-W/2,n.y-H/2)*1.2).duration(500).style('opacity',1);
   ctx.legend(Object.entries({com:'Comercial y abastecimiento',lab:'Laboral y empleo',ser:'Prestación de un servicio',rec:'Reciclaje',gov:'Gobierno y control',par:'Participación y solicitudes'}).map(([k,n])=>[CONV[k],CONVD[k],n]))}},
 {b:1,t:'Hoy: la firma no es el poder',s:'Separamos la atribución formal de la influencia efectiva: quién mueve de verdad cada decisión.',src:'Relaciones documentadas: S1, S2, S3, S5, S9 · el resto son hipótesis por verificar',subs:3,draw(ctx){
   const v=influence(ctx,'hoy');const cap=['','Influencia efectiva y llaves: entidades y la asamblea de Corabastos controlan los flujos.',`Afectados sin voz: ${MH.sv.map(id=>ACT(id).short).join(', ')}.`];
   return sub=>{v.focus(sub===1?e=>e.k==='efectiva'||e.key:sub===2?e=>e.k==='conflicto':null)}}},
 {b:1,t:'Propuesta: núcleos por asunto',s:'Aparecen la mesa, los núcleos, las vocerías revocables, la guardianía, el fondo y la planta (borde punteado).',src:'Decisiones de diseño del grupo · permiso ambiental y suelo: competencias existentes',subs:3,draw(ctx){
   const v=influence(ctx,'prop');const cap=['','Quien trabaja encabeza: recicladores en orgánicos, colectivos en agua; las vocerías llevan mandatos revocables.','Llaves que siguen afuera: permiso de Ambiente, suelo de Corabastos, contratación de la Alcaldía.'];
   return sub=>{v.focus(sub===1?e=>R3.PROP[e.s]||R3.PROP[e.t]:sub===2?e=>e.key&&!isC(e.s):null)}}},
 {b:1,t:'Lectura crítica de la red',s:'Qué cambia en la distribución efectiva de la influencia entre hoy y la propuesta.',src:'Medidas calculadas sobre la capa de influencia; nodos = actores, líneas = relaciones con tipo y dirección',subs:1,draw(ctx){
   const {svg,W,H,P}=svgIn(ctx.el);const M=[['Influencia efectiva en manos colectivas',MH.ef,MP.ef,'%'],['Llaves en manos colectivas',MH.ky,MP.ky,'%'],['Afectados sin voz',MH.sv.length,MP.sv.length,'']];
   M.forEach((m,i)=>{const y=P?H*(.12+i*.3):H*.2+i*H*.25;const x0=P?16:W*.06,bw=P?W-32:W*.55,bx=P?16:W*.38;
    txt(svg,x0,y,m[0],{fw:700,fs:P?15:18});const max=m[3]?100:4;
    [['Hoy',m[1],'#77736b'],['Propuesta',m[2],OCH]].forEach(([n,v,c],j)=>{const yy=y+(P?18:-4)+j*28;txt(svg,bx-10+(P?50:0),yy+14,n,{a:'end',c:SOFT,fs:12,mono:1});
     const r=svg.append('rect').attr('x',bx+(P?60:0)).attr('y',yy).attr('height',18).attr('rx',4).attr('fill',c).attr('width',0);r.transition().delay(300+j*300).duration(reduce?0:900).attr('width',Math.max(4,v/max*(bw-(P?60:0)-60)));
     const t=txt(svg,bx+(P?60:0)+8,yy+14,'',{fw:700,fs:14,c});t.transition().delay(300+j*300).duration(reduce?0:900).attr('x',bx+(P?60:0)+Math.max(4,v/max*(bw-(P?60:0)-60))+8).tween('t',()=>{const ip=d3.interpolateNumber(0,v);return u=>t.text(Math.round(ip(u))+m[3])})})});
   txt(svg,P?16:W*.06,H-18,'La propuesta reduce la concentración, pero el permiso, el suelo y el contrato siguen en entidades externas.',{c:SOFT,fs:13,wrap:P?52:200})}},
 {b:2,t:'Hoy: decide quien no trabaja',s:'Orgánicos y efluentes de Corabastos que llegan al Humedal La Vaca.',src:'Estatutos de Corabastos (S2) · esquema de aseo (S3)',subs:1,draw(ctx){trayecto(ctx,'hoy')}},
 {b:2,t:'Propuesta: el trayecto completo',s:'Agenda, deliberación, resolución, ejecución y rectificación, con la regla de cada etapa.',src:'Decisiones de diseño del grupo',subs:1,draw(ctx){trayecto(ctx,'prop')}},
 {b:2,t:'Decidir no es hacer',s:'¿Quien decide traslada trabajo y costos a quien ejecuta?',src:'Guía Corte III, 4.2',subs:2,draw(ctx){
   const {svg,W,H,P}=svgIn(ctx.el);const r=P?18:Math.min(26,W/45);
   const panel=(st,x,w)=>{const D=R3.DECIDE[st];const g=svg.append('g').attr('transform',`translate(${x},20)`).style('opacity',0);const h=H-40;
    g.append('rect').attr('width',w).attr('height',h).attr('rx',12).attr('fill','#17191d').attr('stroke','#25272c');
    txt(g,16,26,st==='hoy'?'HOY':'PROPUESTA',{c:st==='hoy'?MUTE:OCH,fs:12,mono:1});txt(g,16,h*.2,'Decide',{c:OCH,fw:700,fs:16});txt(g,16,h*.68,'Ejecuta',{c:OCH,fw:700,fs:16});
    const row=(ids,y)=>ids.forEach((id,i)=>actor(g.append('g').attr('class','node').attr('transform',`translate(${w*(.3+i*.24)},${y})`),id,r,{fs:11,wrap:14}));
    row(D.d,h*.22);row(D.e,h*.7);
    g.append('path').attr('d',`M40,${h*.3}V${h*.58}`).attr('stroke',st==='hoy'?RED:GRN).attr('stroke-width',2.4).attr('stroke-dasharray','6 5').attr('class','flowing');
    txt(g,52,h*.45,D.m,{c:st==='hoy'?RED:GRN,fs:12.5,wrap:P?22:30});txt(g,w-14,h-14,D.x,{a:'end',c:OCH,fs:12});return g};
   const gh=panel('hoy',P?8:W*.04,P?W-16:W*.44),gp=panel('prop',P?8:W*.52,P?W-16:W*.44);
   return sub=>{if(P){gh.style('opacity',sub===0?1:0);gp.style('opacity',sub===1?1:0)}else{gh.transition().style('opacity',1);if(sub>0)gp.transition().style('opacity',1)}}}},
 {b:2,t:'Escalas de cada decisión',s:'Hoy casi todo se decide en la ciudad o la nación; la propuesta lo baja a la localidad y la central.',src:'Guía Corte III, 4.3',subs:1,draw(ctx){
   const {svg,W,H,P}=svgIn(ctx.el);const SC=['Región y Nación','Ciudad','Localidad','Barrio y central','Hogar y calle'];const c={x:P?W/2:W*.35,y:H/2},R=Math.min(W*(P?.42:.3),H*.44);
   SC.forEach((n,i)=>{const r=R*(1-i*.19);svg.append('circle').attr('cx',c.x).attr('cy',c.y).attr('r',r).attr('fill','none').attr('stroke',RED).attr('stroke-opacity',.35+i*.13);txt(svg,c.x+(P?0:r+10),c.y-r+(P?16:5),n,{a:P?'middle':'start',c:SOFT,fs:12})});
   const lvl={'Nación y Distrito':0,'Ciudad':1,'Localidad':2,'Central y barrios':3};['hoy','prop'].forEach((st,si)=>R3.ESC[st].forEach((e,i)=>{const k=lvl[e]??1;const r=R*(1-k*.19)-10;const a=-Math.PI*.9+i*.35+(si?Math.PI:0);
    const g=svg.append('g').attr('transform',`translate(${c.x+Math.cos(a)*r},${c.y+Math.sin(a)*r})`).style('opacity',0);g.transition().delay(reduce?0:300+si*800+i*120).style('opacity',1);g.append('circle').attr('r',13).attr('fill',si?OCH:'#55575d');txt(g,0,4,String(i+1),{a:'middle',fs:11,fw:700,c:'#111'})}));
   if(!P){txt(svg,W*.72,H*.4,'Etapas 1 a 5',{fw:700,fs:15});const l=svg.append('g').attr('transform',`translate(${W*.72},${H*.48})`);l.append('circle').attr('r',9).attr('fill','#55575d');txt(l,18,5,'Hoy',{c:SOFT,fs:13});l.append('circle').attr('cy',30).attr('r',9).attr('fill',OCH);txt(l,18,35,'Propuesta',{c:OCH,fs:13})}}},
 {b:3,t:'Modelo dinámico de las interacciones',s:SUBSYS[0].t,src:'Modelo Vensim del grupo: Red_interacciones_actores.mdl',subs:SUBSYS.length,draw(ctx){
   const v=vensim(ctx);return sub=>{v.zoom(SUBSYS[sub].ids)}}},
 {b:3,t:'Bucles de la organización propuesta',s:'Toca un bucle o avanza: R refuerza la organización, B la frena o la transforma.',src:'Hipótesis del grupo · mecanismos marcados como hipótesis o propuesta (corte3-data)',subs:6,draw(ctx){
   const v=bucles(ctx);const ids=[null,'R1','B1','B2','R2','B3'];return sub=>{v.loop(ids[sub])}}},
 {b:3,t:'Prueba en el tiempo',s:'Estado inicial, decisión, efectos, perturbación en el mes 18 y dos trayectorias. Ilustrativo, sin calibrar.',src:'Supuestos del grupo; no es una predicción',subs:2,draw(ctx){
   const {svg,W,H,P}=svgIn(ctx.el);const T=C3.TIEMPO;const tg=svg.append('g');const th=P?H*.34:H*.3;
   T.forEach((t,i)=>{const x=P?14:W*(.04+i*.19),y=P?14+i*th/5:20,w=P?W-28:W*.17;const g=tg.append('g').attr('transform',`translate(${x},${y})`).style('opacity',0);g.transition().delay(reduce?0:i*200).style('opacity',1);
    g.append('rect').attr('width',w).attr('height',P?th/5-6:th-10).attr('rx',8).attr('fill','#17191d').attr('stroke',i===3?RED:'#25272c');txt(g,10,18,t.t,{c:i===3?RED:OCH,fs:P?11:12,fw:600,mono:1});if(!P)txt(g,10,38,t.d.split('.')[0]+'.',{c:SOFT,fs:12,wrap:Math.floor(w/6.4)})});
   function sim(sc){let Pp=.35,C=.3,D=0,O=.05,F=0,Hh=1;const out=[];for(let m=0;m<=36;m++){if(sc==='hoy'){out.push({m,P:.15,H:1});continue}
    const ext=m>=18?2.2:1,Td=.2+.9*O,rot=sc==='rot'?Math.min(1,D*2.5):0,CAR=Td/Math.max(Pp,.05)*(1-.7*rot);D=Math.max(0,Math.min(1,D+.08*(CAR-1)-(CAR<1?.05*D:0)));
    const DEP=sc==='rot'?1-F:1,cum=Math.min(1,Pp/Td),ACU=Math.max(0,Math.min(1,.25+.65*cum-.18*DEP*ext));C+=.12*(ACU-C);Pp=Math.max(.03,Math.min(1,Pp+.1*(C-Pp)-.07*D+.03*rot));O+=.08*(cum*.85*(m>=1)-O);if(sc==='rot')F+=.05*(O-F);Hh+=.12*((1-.8*O)-Hh);out.push({m,P:Pp,H:Hh})}return out}
   const S=[['hoy','Hoy sin cambios','#77736b'],['rot','Con rotación y fondo propio',OCH],['sin','Sin rotación ni fondo',RED]].map(s=>({k:s[0],n:s[1],c:s[2],d:sim(s[0])}));
   const cg=svg.append('g').style('opacity',0);const cy=P?th+30:th+30,ch=H-cy-30;
   [['P','Participación efectiva'],['H','Carga sobre La Vaca (1 = hoy)']].forEach(([k,n],i)=>{const x0=P?40:W*(.06+i*.48),w=P?W-60:W*.42,y0=P?cy+i*(ch/2+10):cy,h=P?ch/2-20:ch;
    const x=d3.scaleLinear([0,36],[x0,x0+w]),y=d3.scaleLinear([0,1.05],[y0+h,y0+16]);txt(cg,x0,y0+6,n,{fw:700,fs:14});
    cg.append('g').attr('transform',`translate(0,${y0+h})`).call(d3.axisBottom(x).ticks(6).tickFormat(d=>'m'+d)).call(a=>a.selectAll('text').attr('fill',MUTE)).call(a=>a.selectAll('line,path').attr('stroke','#33363c'));
    cg.append('line').attr('x1',x(18)).attr('x2',x(18)).attr('y1',y0+16).attr('y2',y0+h).attr('stroke',RED).attr('stroke-dasharray','3 4');
    S.forEach(s=>{const p=cg.append('path').attr('fill','none').attr('stroke',s.c).attr('stroke-width',2.4).attr('d',d3.line().x(d=>x(d.m)).y(d=>y(d[k]))(s.d)).attr('class','simline')})});
   S.forEach((s,i)=>txt(cg,P?14+i*0:W*.5+i*W*.16,P?cy-8+i*0:cy-8,s.n,{c:s.c,fs:12,fw:600}));
   return sub=>{if(sub===1){cg.transition().style('opacity',1);cg.selectAll('.simline').each(function(){const L=this.getTotalLength();d3.select(this).attr('stroke-dasharray',L).attr('stroke-dashoffset',L).transition().duration(reduce?0:2000).attr('stroke-dashoffset',0)})}}}},
 {b:4,t:'Cuatro tensiones',s:'La balanza muestra hacia dónde se inclina hoy y hacia dónde con la propuesta.',src:'Guía Corte III, 6.1',subs:2,draw(ctx){
   const {svg,W,H,P}=svgIn(ctx.el);const IC=[['A35','A33'],['A34','A02'],['A25','A13'],['A06','A27']];const TL={0:[7,6,7,8],1:[-1.5,2,-1,1]};
   const bx=W/2,bl=Math.min(W*(P?.3:.32),260);const bs=C3.TENSIONES.map((t,i)=>{const y=H*(.14+i*.23);const g=svg.append('g').attr('transform',`translate(${bx},${y})`);
    txt(g,0,-30,t.q,{a:'middle',c:MUTE,fs:P?11.5:13});g.append('path').attr('d','M0 6L-12 30H12z').attr('fill','#3a3c42');const b=g.append('g');b.append('line').attr('x1',-bl).attr('x2',bl).attr('stroke',RED).attr('stroke-width',3);
    [[-bl,IC[i][0],t.a],[bl,IC[i][1],t.b]].forEach(([x,id,n])=>{const e=b.append('g').attr('transform',`translate(${x},0)`).attr('class','node');actor(e,id,P?18:24,{label:false});txt(e,0,(P?18:24)+16,n,{a:'middle',fw:700,fs:P?11.5:13})});return b});
   return sub=>bs.forEach((b,i)=>b.transition().duration(reduce?0:1200).ease(d3.easeElasticOut.amplitude(1).period(.5)).attr('transform',`rotate(${TL[sub][i]})`))}},
 {b:4,t:'Una contradicción: el pago por tonelada',s:'Si se paga por tonelada, ¿el costo se transforma o se desplaza a los recicladores independientes?',src:'Decisiones de diseño del grupo · señales a verificar en campo',subs:2,draw(ctx){
   const {svg,W,H,P}=svgIn(ctx.el);const c={x:P?W/2:W*.32,y:H*.5};const g=svg.append('g');
   actor(g.append('g').attr('transform',`translate(${c.x},${c.y-H*.32})`),'A02',24,{fs:12});g.append('path').attr('d',`M${c.x},${c.y-H*.32+44}V${c.y-40}`).attr('stroke',INK).attr('stroke-width',2);
   const k=g.append('g').attr('transform',`translate(${c.x},${c.y})`);k.append('circle').attr('r',38).attr('fill',RED);icon(k,'i-rayo',0,0,40,'#141518');txt(k,0,58,'Pago por tonelada',{a:'middle',c:RED,fw:700,fs:14});
   const tx=P?W*.82:W*.68,dy=H*.26;const pT=svg.append('path').attr('id','pT').attr('d',`M${c.x+40},${c.y-10}Q${(c.x+tx)/2},${c.y-dy} ${tx-30},${c.y-dy}`).attr('fill','none').attr('stroke',OCH).attr('stroke-width',2.4);
   const pD=svg.append('path').attr('id','pD').attr('d',`M${c.x+40},${c.y+10}Q${(c.x+tx)/2},${c.y+dy} ${tx-30},${c.y+dy}`).attr('fill','none').attr('stroke','#77736b').attr('stroke-width',2).attr('stroke-dasharray','6 6');
   const T=svg.append('g').attr('transform',`translate(${tx},${c.y-dy})`);T.append('circle').attr('r',24).attr('fill',OCH);icon(T,'i-check',0,0,24,'#141518');txt(T,0,44,'Se transforma',{a:'middle',fw:700,fs:15});txt(T,0,62,'cuota y tarifa progresiva',{a:'middle',c:SOFT,fs:12});
   const Dd=svg.append('g').attr('transform',`translate(${tx},${c.y+dy})`).attr('class','node');actor(Dd,'A27',24,{label:false});txt(Dd,0,44,'Se desplaza',{a:'middle',fw:700,fs:15});txt(Dd,0,62,'pierden los independientes',{a:'middle',c:SOFT,fs:12});
   if(!P){const sg=svg.append('g').attr('transform',`translate(${W*.8},${H*.2})`);}
   const dots=svg.append('g');
   return sub=>{dots.selectAll('*').remove();const id=sub?'pT':'pD';for(let i=0;i<3;i++){const cc=dots.append('circle').attr('r',5).attr('fill',sub?OCH:'#9A958C');cc.append('animateMotion').attr('dur','1.8s').attr('repeatCount','indefinite').attr('begin',(i*.6)+'s').append('mpath').attr('href','#'+id)}
    pT.attr('opacity',sub?1:.25);pD.attr('opacity',sub?.25:1);(()=>{})(sub?'Señal de transformación: suben a la vez las toneladas aprovechadas y el ingreso de los independientes.':'Hoy: el costo de separar cae en puestos pequeños y recicladores independientes.')}}},
 {b:4,t:'Sostenibilidad en el tiempo',s:'Dos escenarios con supuestos explícitos, autoorganización y quién representa al humedal.',src:'Guía Corte III, 5.3 y 6.3 · supuestos del grupo',subs:4,draw(ctx){
   const D=[['i-ciclo','Continuidad',R3.ESCENARIOS[0].sup+' '+R3.ESCENARIOS[0].res],['i-rayo','Transformación',R3.ESCENARIOS[1].sup+' '+R3.ESCENARIOS[1].res],['i-grupo','Autoorganización','Turnos, entregas y calidad del compost se ajustan entre quienes trabajan. Límite: el suelo, el permiso y el presupuesto siguen afuera.'],['i-gota','Voz del humedal','Lo representan los colectivos y el aula ambiental con datos públicos; su mecanismo es la llave ecológica.']];
   const el=d3.select(ctx.el).append('div').attr('class','cards').style('grid-template-columns',`repeat(${size(ctx.el).W<700?1:4},1fr)`);
   const cs=el.selectAll('div').data(D).join('div').attr('class','card off').html(d=>`<svg width="40" height="40" style="color:${OCH}"><use href="#${d[0]}" width="40" height="40"/></svg><h3>${d[1]}</h3><p>${d[2]}</p>`);return sub=>cs.classed('off',(d,i)=>i>sub)}},
 {b:5,t:'El efecto sobre un problema',s:'Los orgánicos de Corabastos dejan de ir al humedal y vuelven como compost a las huertas registradas.',src:'Capas IDECA: huertas (Jardín Botánico), comedores (SDIS) · mapa base © OpenStreetMap, CARTO',subs:1,draw(ctx){
   d3.select(ctx.el).append('div').attr('id','mapC');
   const map=new maplibregl.Map({container:'mapC',style:'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',center:[-74.157,4.630],zoom:size(ctx.el).W<700?12.4:13.4,attributionControl:{compact:false}});map.scrollZoom.disable();ctx.onExit(()=>map.remove());
   map.on('load',()=>Promise.all(['assets/territorio_kennedy.geojson','assets/territorio_puntos.geojson'].map(u=>fetch(u).then(r=>r.json()))).then(([K,Pt])=>{
    map.addSource('k',{type:'geojson',data:K});map.addLayer({id:'k',type:'line',source:'k',paint:{'line-color':'#F2EFE8','line-opacity':.6,'line-width':1.2}});
    const cora=[-74.1590,4.6295],vaca=[-74.16198,4.62870];const hu=Pt.features.filter(f=>f.properties.c==='huerta');const dist=f=>Math.hypot(f.geometry.coordinates[0]-cora[0],f.geometry.coordinates[1]-cora[1]);
    const near=[...hu].sort((a,b)=>dist(a)-dist(b)).slice(0,30);
    map.addSource('fl',{type:'geojson',data:{type:'FeatureCollection',features:near.map(f=>({type:'Feature',geometry:{type:'LineString',coordinates:[cora,f.geometry.coordinates]}}))}});map.addLayer({id:'fl',type:'line',source:'fl',paint:{'line-color':OCH,'line-width':1.3,'line-opacity':.8,'line-dasharray':[2,2]}});
    map.addSource('p',{type:'geojson',data:{type:'FeatureCollection',features:Pt.features.filter(f=>f.properties.c==='huerta'||/^Comedor/.test(f.properties.n))}});
    map.addLayer({id:'p',type:'circle',source:'p',paint:{'circle-radius':['case',['==',['get','c'],'huerta'],2.6,5],'circle-color':['case',['==',['get','c'],'huerta'],'#8EBF4C','#DE7766']}});
    map.addSource('h',{type:'geojson',data:{type:'FeatureCollection',features:[{type:'Feature',geometry:{type:'Point',coordinates:cora},properties:{c:'#DE9F50'}},{type:'Feature',geometry:{type:'Point',coordinates:vaca},properties:{c:'#4EAECF'}}]}});
    map.addLayer({id:'hg',type:'circle',source:'h',paint:{'circle-radius':22,'circle-color':['get','c'],'circle-opacity':.2}});map.addLayer({id:'hh',type:'circle',source:'h',paint:{'circle-radius':8,'circle-color':['get','c'],'circle-stroke-width':2,'circle-stroke-color':'#111'}});
    [[cora,'Corabastos','#DE9F50',[0,-16]],[vaca,'Humedal La Vaca','#4EAECF',[0,22]]].forEach(([ll,n,c,o])=>{const e=document.createElement('div');e.style.cssText=`font:600 12.5px Instrument Sans;color:${c};text-shadow:0 1px 6px #000`;e.textContent=n;new maplibregl.Marker({element:e,offset:o}).setLngLat(ll).addTo(map)})}));
   ctx.legend([['#DE9F50',null,'Corabastos'],['#4EAECF',null,'Humedal La Vaca'],['#8EBF4C',null,'Huertas (811)'],['#DE7766',null,'Comedores (11)'],[OCH,'4 4','Compost propuesto']])}},
 {b:5,t:'Efecto en cada enfoque',s:'Lo que la organización propuesta cambiaría en los siete macromodelos ecológicos.',src:'Hipótesis del grupo; requieren medición',subs:1,draw(ctx){
   const E=Object.fromEntries(C3.ECO.map(m=>[m.id,m]));const el=d3.select(ctx.el).append('div').attr('class','cards').style('grid-template-columns',`repeat(${size(ctx.el).W<700?1:4},1fr)`);
   el.selectAll('div').data(C3.EFECTOS).join('div').attr('class','card').html(e=>`<div class="n" style="color:${E[e.m].c}">${E[e.m].n}</div><p style="margin-top:8px">${e.e}</p>`)}},
 {b:6,t:'Datos separados de hipótesis',s:'Cada relación lleva su marca: documentada con fuente, hipótesis por verificar o decisión de diseño.',src:'Registro completo con enlaces: corte3.html',subs:1,draw(ctx){
   const {svg,W,H,P}=svgIn(ctx.el);const all=[...R3.EDGES,...C3.LINKS];const n=k=>all.filter(x=>x.ev===k).length;
   [['doc','Documentadas',GRN],['hip','Hipótesis',OCH],['prop','Decisiones de diseño',RED]].forEach(([k,lab,c],i)=>{const x=P?W/2:W*(.17+i*.33),y=P?H*(.14+i*.15):H*.22;
    const t=txt(svg,x,y,'0',{a:'middle',fs:P?40:64,fw:700,c});t.transition().duration(reduce?0:1200).tween('t',()=>{const ip=d3.interpolateNumber(0,n(k));return u=>t.text(Math.round(ip(u)))});txt(svg,x,y+(P?22:30),lab,{a:'middle',c:SOFT,fs:14})});
   const S=Object.entries(C3.SRC);const y0=P?H*.6:H*.44,rh=(H-y0-10)/S.length;
   S.forEach(([k,s],i)=>{const y=y0+i*rh+rh*.6;txt(svg,P?14:W*.06,y,k,{c:OCH,fs:12,fw:600,mono:1});txt(svg,P?50:W*.1,y,s.tipo,{c:MUTE,fs:12,mono:1});if(!P)txt(svg,W*.3,y,s.t.length>120?s.t.slice(0,118)+'…':s.t,{c:SOFT,fs:12.5})})}},
 {b:6,t:'Lo que falta verificar',s:'Antes de presentar como hechos, el grupo debe comprobar esto.',src:'Guía Corte III, 7.1 y 8.1',subs:1,draw(ctx){
   const el=d3.select(ctx.el).append('div').attr('class','cards').style('grid-template-columns',`repeat(${size(ctx.el).W<700?1:3},1fr)`);
   el.selectAll('div').data([...C3.PENDIENTE,'Que el grupo adopte o cambie la Mesa, los núcleos, la guardianía y el fondo']).join('div').attr('class','card').html((p,i)=>`<div class="n">0${i+1}</div><p style="margin-top:8px;color:#F2EFE8;font-size:15px">${p}</p>`)}}
];

/* ================= motor de la presentación ================= */
SL.forEach((S,i)=>{S.g=window.GUION[i];S.subs=S.g.length});
const OFF=[];let tot=0;SL.forEach(S=>{OFF.push(tot);tot+=S.subs});
const stage=$('#stage'),below=$('#below');let cur=-1,sub=0,upd=null,exits=[],ctxNow=null,tagT=[];
$('#blocks').innerHTML=B.map((n,i)=>`<button data-b="${i}">${ROM[i]}<span class="nm"> ${n}</span></button>`).join('');
document.querySelectorAll('#blocks button').forEach(b=>b.onclick=e=>{e.stopPropagation();go(SL.findIndex(s=>s.b===+b.dataset.b))});
let ph='';SL.forEach((S,i)=>S.g.forEach((g,j)=>{ph+=`<span class="${OFF[i]+j&&j===0&&SL[i-1].b!==S.b?'gap':''}" data-i="${i}" data-j="${j}" title="${OFF[i]+j+1}"></span>`}));$('#prog').innerHTML=ph;
document.querySelectorAll('#prog span').forEach(s=>s.onclick=()=>go(+s.dataset.i,+s.dataset.j));
const mobile=()=>matchMedia('(max-width:760px)').matches;
function drawTags(){tagT.forEach(clearTimeout);tagT=[];const c=ctxNow;if(!c||!c.svg)return;c.svg.selectAll('g.tags').remove();const tags=SL[cur].g[sub].tags||[];if(!tags.length)return;
 const base=SL[cur].b===3&&cur===OFF.indexOf(OFF[cur])&&SL[cur].t.startsWith('Modelo')?1300:500;
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
   g.append('text').attr('x',bx+11*k).attr('y',by+33*k).attr('font-size',11.5*k).attr('fill',light?'#444':'#B8B3A8').attr('font-family','Instrument Sans').text(t2)})},SL[cur].t.startsWith('Modelo')?1300:(cur===0?1000:450)))}
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
stage.addEventListener('click',e=>{if(e.target.closest('.chip,a,button,.maplibregl-ctrl,#mapC'))return;const r=stage.getBoundingClientRect();if(e.clientX-r.left<r.width*.12)prev();else next()});
addEventListener('keydown',e=>{if(['ArrowRight',' ','PageDown'].includes(e.key)){e.preventDefault();next()}else if(['ArrowLeft','PageUp'].includes(e.key)){e.preventDefault();prev()}
 else if(e.key==='f'||e.key==='F'){document.fullscreenElement?document.exitFullscreen():document.documentElement.requestFullscreen?.()}else if(e.key==='n'||e.key==='N'){$('#gbtn').click()}});
let rt;addEventListener('resize',()=>{clearTimeout(rt);rt=setTimeout(()=>go(cur,sub),250)});
const h0=(parseInt(location.hash.slice(1))||1)-1;let si=0;while(si<SL.length-1&&OFF[si+1]<=h0)si++;go(si,Math.min(h0-OFF[si],SL[si].subs-1));
window.__pres={SL,go,OFF,tot,get cur(){return cur}};
})();
