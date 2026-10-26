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

/* ---------- jerarquía y heterarquía explicadas ---------- */
function jerarquiaView(ctx){
 const {svg,W,H,P}=svgIn(ctx.el);
 const L=[{n:'Deciden',k:20,d:'reglas, prioridades y recursos',c:'#9382E0',ids:['A34','N01','A32','A33','A65','A02']},
  {n:'Coordinan y gestionan',k:31,d:'organizan y administran',c:'#F2B53A',ids:['A04','A28','A35','C01','A25','AMB01']},
  {n:'Ejecutan',k:36,d:'hacen el trabajo cotidiano',c:'#4FB98C',ids:['A13','A27','A11','A43','A15','AMB04']},
  {n:'Participan y reciben',k:8,d:'reciben las consecuencias',c:'#B8B3A8',ids:['A20','A52','A53','A58']}];
 const top=P?20:24,bh=(H-top-(P?20:24))/4,x0=P?10:W*.02,lw=P?W-20:W*.22,ax=P?W-24:W*.885,nx0=P?18:W*.3,nx1=P?W-56:W*.8;
 const R=Math.max(16,Math.min(P?20:30,bh*.24));
 const df=svg.append('defs');mk(df,'jdn',OCH,16);mk(df,'jup','#4FB98C',12);
 L.forEach((l,i)=>{const y=top+i*bh,g=svg.append('g').style('opacity',0);g.transition().delay(reduce?0:i*450).duration(500).style('opacity',1);
  const w=W*(P?1:.92)-(P?0:i*0)-(P?20:0);
  g.append('rect').attr('x',x0).attr('y',y+4).attr('width',(P?W-20:W*.81)).attr('height',bh-8).attr('rx',12).attr('fill',l.c).attr('fill-opacity',.08).attr('stroke',l.c).attr('stroke-opacity',.45);
  if(P){txt(g,x0+12,y+24,`${l.n} · ${l.k}`,{fw:700,fs:15,c:l.c});txt(g,x0+12,y+42,l.d,{fs:12,c:SOFT})}
  else{txt(g,x0+18,y+bh/2-6,l.n,{fw:700,fs:Math.min(24,bh*.2),c:l.c});txt(g,x0+18,y+bh/2+18,`${l.k} actores · ${l.d}`,{fs:Math.min(15,bh*.13),c:SOFT})}
  (P?l.ids.slice(0,4):l.ids).forEach((id,j)=>{const nx=nx0+(j+.5)*(nx1-nx0)/(P?4:6),ny=P?y+bh*.62:y+bh/2-8;const a=g.append('g').attr('class','node').attr('transform',`translate(${nx},${ny})`);actor(a,id,R,{fs:P?10.5:Math.min(13,bh*.11),wrap:P?11:12})})});
 if(!P){const gA=svg.append('g').style('opacity',0);gA.transition().delay(reduce?0:2000).duration(600).style('opacity',1);
  const y0=top+bh*.5,y1=top+bh*3.5;
  gA.append('path').attr('d',`M${ax},${y0}V${y1}`).attr('stroke',OCH).attr('stroke-width',9).attr('marker-end','url(#jdn)').attr('stroke-dasharray','14 8').attr('class','flowing');
  gA.append('path').attr('d',`M${ax+40},${y1}V${y0}`).attr('stroke','#4FB98C').attr('stroke-width',3).attr('marker-end','url(#jup)').attr('stroke-dasharray','6 8').attr('class','flowing');
  txt(gA,ax+20,y0-bh*.36,'102 bajan',{a:'middle',fw:700,fs:15,c:OCH});txt(gA,ax+20,y0-bh*.36+17,'reglas y control',{a:'middle',fs:12,c:SOFT});
  txt(gA,ax+20,y1+bh*.2,'77 suben',{a:'middle',fw:700,fs:15,c:'#4FB98C'});txt(gA,ax+20,y1+bh*.2+17,'solicitudes',{a:'middle',fs:12,c:SOFT})}
}
function heterarquiaView(ctx){
 const {svg,W,H,P}=svgIn(ctx.el);
 const A=['A34','A32','A04','A06','A10','A25','A13','AMB04','A37'];
 const HOY=['A34','A32','A04','A06','A10','A25','A13','AMB04','A37'];
 const AS=[{n:'Gestión de residuos',c:'#8EBF4C',o:['A25','A13','A06','A32','A34','A04','A10','AMB04','A37']},
  {n:'Horarios de carga',c:'#DE9F50',o:['A10','A13','A37','A06','A04','A34','A32','A25','AMB04']},
  {n:'Cuidado del humedal',c:'#4EAECF',o:['AMB04','A37','A32','A34','A25','A13','A10','A06','A04']}];
 const top=P?84:96,rh=(H-top-(P?16:24))/A.length,lx=P?30:W*.26,rx=P?W*.42:W*.66,R=Math.max(12,Math.min(P?14:20,rh*.36));
 const yy=i=>top+i*rh+rh/2;
 txt(svg,P?12:lx,P?24:38,P?'Hoy: un solo orden':'Hoy: jerarquía',{a:P?'start':'middle',fw:700,fs:P?13:22,c:'#9382E0'});if(!P)txt(svg,lx,62,'un solo orden para todo',{a:'middle',fs:14,c:SOFT});
 const tR=txt(svg,P?12:rx,P?48:38,'',{a:P?'start':'middle',fw:700,fs:P?14:22});const sR=txt(svg,P?12:rx,P?66:62,'',{a:P?'start':'middle',fs:P?11.5:14,c:SOFT});
 if(!P)svg.append('text').attr('x',W*.06).attr('y',yy(0)+5).attr('fill',MUTE).attr('font-size',P?10:12).attr('font-family','JetBrains Mono').text('ARRIBA');
 if(!P)svg.append('text').attr('x',W*.06).attr('y',yy(A.length-1)+5).attr('fill',MUTE).attr('font-size',P?10:12).attr('font-family','JetBrains Mono').text('ABAJO');
 const gl=svg.append('g'),gn=svg.append('g');
 const lines=A.map(id=>gl.append('path').attr('fill','none').attr('stroke-width',2.2).attr('stroke-opacity',.55));
 A.forEach(id=>{const g=gn.append('g').attr('class','node').attr('transform',`translate(${lx},${yy(HOY.indexOf(id))})`);actor(g,id,R,{label:false});
  if(!P)txt(g,-R-10,5,ACT(id).short,{a:'end',fs:14,c:INK})});
 const right=A.map(id=>{const g=gn.append('g').attr('class','node');actor(g,id,R,{label:false});const t=txt(g,R+10,5,ACT(id).short,{fs:P?10.5:14,c:INK});const tag=txt(g,R+10,-R+2,'',{fs:P?9.5:11.5,fw:700,mono:1});return{g,t,tag}});
 const lead=gn.insert('rect',':first-child').attr('rx',10).attr('fill-opacity',.14);
 let k=0,first=true;
 function set(i){const s=AS[i];tR.text(`Heterarquía: ${s.n}`).attr('fill',s.c);sR.text('encabeza quien conoce y hace la actividad');
  const d=reduce||first?0:1100;first=false;
  lead.transition().duration(d).attr('x',rx-R-10).attr('y',yy(0)-rh/2+3).attr('width',(P?W-rx-4:W*.3)+R).attr('height',rh-6).attr('fill',s.c);
  A.forEach((id,j)=>{const ri=s.o.indexOf(id),li=HOY.indexOf(id);const o=right[j];
   o.g.transition().duration(d).ease(d3.easeCubicInOut).attr('transform',`translate(${rx},${yy(ri)})`);
   o.tag.text(ri===0?'ENCABEZA':'').attr('fill',s.c);o.t.attr('font-weight',ri===0?700:500);
   const up=ri<li,c=ri===0?s.c:up?'#4FB98C':ri>li?'#77736b':'#3a3c42';
   lines[j].transition().duration(d).attr('d',`M${lx+R+4},${yy(li)} C${(lx+rx)/2},${yy(li)} ${(lx+rx)/2},${yy(ri)} ${rx-R-4},${yy(ri)}`).attr('stroke',c).attr('stroke-width',ri===0?4:2.2).attr('stroke-opacity',ri===0?1:.5)})}
 set(0);const iv=setInterval(()=>{k=(k+1)%AS.length;set(k)},4200);ctx.onExit(()=>clearInterval(iv));
 return sub=>{k=sub%AS.length;set(k)}
}

/* ---------- cuatro ámbitos de coordinación (no escalones) ---------- */
function ambitosView(ctx){
 const {svg,W,H,P}=svgIn(ctx.el);const df=svg.append('defs');mk(df,'am-a',OCH,10);
 const C=[['Coordinación cotidiana','trabajadores, comerciantes, recicladores, docentes y operadores',['A13','A06','A27','A43','A28'],'#4FB98C'],
  ['Espacios por asunto','educación ambiental · abastecimiento · residuos',['AMB02','AMB04','A70','A25','A57'],'#F2B53A'],
  ['Coordinación local','juntas, ASOJUNTAS, Comisión Ambiental Local, Alcaldía y JAL',['A35','PJ02','AMB03','A34','N01'],'#9382E0'],
  ['Competencias legales','entidades distritales y órganos de Corabastos',['A32','A33','A65','A02','A03'],'#4EAECF']];
 txt(svg,W/2,P?22:30,'Cuatro ámbitos conectados, no escalones de mando',{a:'middle',fw:700,fs:P?14:20});
 const top=P?40:58,gap=P?10:18,n=4;
 const cw=P?W-24:(W-40-gap*3)/4,ch=P?(H-top-14-gap*3)/4:H-top-24;
 C.forEach(([t,s,ids,col],i)=>{const x=P?12:20+i*(cw+gap),y=P?top+i*(ch+gap):top;const g=svg.append('g').attr('transform',`translate(${x},${y})`).style('opacity',0);
  g.transition().delay(reduce?0:i*350).duration(500).style('opacity',1);
  g.append('rect').attr('width',cw).attr('height',ch).attr('rx',12).attr('fill','#16181c').attr('stroke',col).attr('stroke-opacity',.6);
  txt(g,14,P?20:30,`${i+1}. ${t}`,{fw:700,fs:P?13:17,c:col});if(!P)txt(g,14,52,s,{fs:12.5,c:SOFT,wrap:Math.floor(cw/7)});
  const r=P?13:Math.min(22,cw/9);
  ids.forEach((id,j)=>{let ax,ay;if(P){ax=20+j*((cw-30)/ids.length)+r;ay=ch*.62}else{ax=24+r;ay=104+j*((ch-120)/ids.length)+r}
   const ng=g.append('g').attr('class','node').attr('transform',`translate(${ax},${ay})`);actor(ng,id,r,{label:false});
   if(P){if(j<5){const tt=txt(ng,0,r+12,'',{a:'middle',fs:9,c:INK});wrap(tt,ACT(id).short,11,10)}}else{const tt=txt(ng,r+10,-2,'',{fs:12.5,c:INK});wrap(tt,ACT(id).short,Math.max(14,Math.floor((cw-2*r-50)/6.6)),14)}});
  if(i<3){const ag=svg.append('g').style('opacity',0);ag.transition().delay(reduce?0:i*350+400).style('opacity',1);
   if(P){const yy=y+ch+gap/2;ag.append('path').attr('d',`M${W/2-14},${yy-4}V${yy+4}`).attr('stroke',OCH).attr('stroke-width',2);}
   else{const xx=x+cw+gap/2,yy=top+ch/2;ag.append('path').attr('d',`M${xx},${yy-60}V${yy+60}`).attr('stroke',OCH).attr('stroke-width',2).attr('stroke-dasharray','5 5').attr('class','flowing');
    ag.append('circle').attr('cx',xx).attr('cy',yy).attr('r',11).attr('fill','#16181c').attr('stroke',OCH);ag.append('path').attr('d',`M${xx-5},${yy}H${xx+5}M${xx-2},${yy-3}L${xx-5},${yy}L${xx-2},${yy+3}M${xx+2},${yy-3}L${xx+5},${yy}L${xx+2},${yy+3}`).attr('stroke',OCH).attr('fill','none').attr('stroke-width',1.6)}}});
 if(!P)txt(svg,W/2,H-6,'Entre ámbitos circulan información y acuerdos en los dos sentidos',{a:'middle',fs:13,c:OCH});
}
/* ---------- mandato, cogestión y coaprendizaje ---------- */
function mandatoView(ctx){
 const {svg,W,H,P}=svgIn(ctx.el);const df=svg.append('defs');mk(df,'md-o',OCH,11);mk(df,'md-g','#4FB98C',11);
 const R=P?26:Math.min(40,W/30);const y0=P?H*.2:H*.3;
 const pts=P?[[W*.16,y0],[W*.5,y0],[W*.84,y0]]:[[W*.18,y0],[W*.5,y0],[W*.82,y0]];
 const L=[['A25','La organización','decide el encargo'],['A36','Quien la representa','lleva el mandato'],['AMB03','Espacio de coordinación','donde se acuerda con otros']];
 L.forEach(([id,t,s],i)=>{const g=svg.append('g').attr('class','node').attr('transform',`translate(${pts[i]})`);actor(g,id,R,{label:false});
  if(P){const t1=txt(g,0,R+16,'',{a:'middle',fw:700,fs:11});wrap(t1,t,12,13);const t2=txt(g,0,R+44,'',{a:'middle',fs:9.5,c:SOFT});wrap(t2,s,14,11)}else{txt(g,0,R+22,t,{a:'middle',fw:700,fs:16});txt(g,0,R+42,s,{a:'middle',fs:13,c:SOFT})}});
 const arc=(a,b,up,col,id)=>{const mx=(a[0]+b[0])/2,my=a[1]+(up?-1:1)*(up?(P?40:70):(P?150:270));svg.append('path').attr('id',id).attr('d',`M${a[0]+(b[0]>a[0]?R+6:-R-6)},${a[1]+(up?-8:8)}Q${mx},${my} ${b[0]+(b[0]>a[0]?-R-8:R+8)},${b[1]+(up?-8:8)}`).attr('fill','none').attr('stroke',col).attr('stroke-width',2.4).attr('stroke-dasharray','7 5').attr('class','flowing').attr('marker-end',`url(#${col===OCH?'md-o':'md-g'})`);return[mx,my]};
 const m1=arc(pts[0],pts[1],true,OCH,'md1'),m2=arc(pts[1],pts[2],true,OCH,'md2'),m3=arc(pts[2],pts[0],false,'#4FB98C','md3');
 txt(svg,m1[0],m1[1]-6,'mandato con límites',{a:'middle',fs:P?10.5:14,fw:600,c:OCH});txt(svg,m2[0],m2[1]-6,'acuerda con otros',{a:'middle',fs:P?10.5:14,fw:600,c:OCH});
 txt(svg,(pts[0][0]+pts[2][0])/2,pts[0][1]+(P?98:158),'informa lo acordado y consulta si el asunto excede el mandato',{a:'middle',fs:P?10.5:14,fw:600,c:'#4FB98C',wrap:P?44:80});
 const cy=P?H*.62:H*.72,cw=P?W-24:W*.36;
 [['i-grupo','Cogestión','Comparte tareas sin borrar responsabilidades: cada uno sabe qué le toca.'],['i-ciclo','Coaprendizaje','Revisar resultados y ajustar las reglas cuando algo no funciona.']].forEach(([ic,t,s],i)=>{
  const x=P?12:(i?W*.54:W*.1),y=P?cy+i*(H*.17):cy;const g=svg.append('g').attr('transform',`translate(${x},${y})`).style('opacity',0);g.transition().delay(reduce?0:700+i*300).style('opacity',1);
  g.append('rect').attr('width',cw).attr('height',P?H*.15:H*.2).attr('rx',12).attr('fill','#16181c').attr('stroke','#2b2d33');icon(g,ic,P?26:34,P?26:36,P?22:28,OCH);
  txt(g,P?50:66,P?24:34,t,{fw:700,fs:P?13:17});txt(g,P?50:66,P?42:58,s,{fs:P?11:13.5,c:SOFT,wrap:P?40:Math.floor(cw/7.5)})});
}

/* ---------- varios centros de decisión (con íconos) ---------- */
function policentroView(ctx){
 const {svg,W,H,P}=svgIn(ctx.el);
 const C=[['i-grupo','Una organización','resuelve sus asuntos internos',['A25','A26','A27'],'#4FB98C'],
  ['i-edu','Colegios y procesos ambientales','coordinan una actividad educativa',['C01','AMB02','AMB04'],'#F2B53A'],
  ['i-mazo','Entidades y órganos de Corabastos','conservan sus decisiones legales',['A32','A33','A02','A03'],'#4EAECF']];
 txt(svg,W/2,P?22:34,'Varios centros de decisión, cada uno con responsabilidades propias',{a:'middle',fw:700,fs:P?13:19,wrap:P?40:90});
 const top=P?44:62,gap=P?10:22,cw=P?W-24:(W-48-gap*2)/3,ch=P?(H*.58-top)/3-gap*.6:H*.48;
 const cards=C.map(([ic,t,v,ids,col],i)=>{const x=P?12:24+i*(cw+gap),y=P?top+i*(ch+gap*.6):top;const g=svg.append('g').attr('transform',`translate(${x},${y})`).style('opacity',0);
  g.transition().delay(reduce?0:i*350).duration(500).style('opacity',1);
  g.append('rect').attr('width',cw).attr('height',ch).attr('rx',14).attr('fill','#16181c').attr('stroke',col).attr('stroke-width',1.6);
  const ir=P?20:34,ix=P?16+ir:cw/2,iy=P?ch/2:24+ir;
  g.append('circle').attr('cx',ix).attr('cy',iy).attr('r',ir).attr('fill',col);icon(g,ic,ix,iy,ir*1.15,'#111');
  const tx=P?ix+ir+12:cw/2,an=P?'start':'middle';
  const t1=txt(g,tx,P?20:iy+ir+30,'',{a:an,fw:700,fs:P?13:17,c:col});wrap(t1,t,P?28:30,P?15:20);
  const vy=P?(t.length>28?52:38):iy+ir+(t.length>30?74:54);
  const vg=g.append('g').attr('transform',`translate(${P?tx:cw/2},${vy})`);
  icon(vg,'i-check',P?7:-(v.length*3.6)-10,-5,P?13:16,col);txt(vg,P?20:6,0,v,{a:P?'start':'middle',fs:P?11.5:14,c:INK});
  const r=P?11:Math.min(26,cw/(ids.length*3.2)),ay=P?ch-18:vy+(ch-vy)*.45;
  ids.forEach((id,j)=>{const ax=P?tx+10+j*(r*2+40):cw/2+(j-(ids.length-1)/2)*(cw/(ids.length+.3));const ng=g.append('g').attr('class','node').attr('transform',`translate(${ax},${ay})`);actor(ng,id,r,{label:false});
   if(!P){const tt=txt(ng,0,r+17,'',{a:'middle',fs:12.5,c:INK});wrap(tt,ACT(id).short,13,14)}});
  return{x,y,g}});
 // coordinación cuando una decisión afecta a varios
 const by=P?H*.64:top+ch+(H-top-ch)*.32,bh=P?H*.32:(H-top-ch)*.6,bx=P?12:W*.16,bw=P?W-24:W*.68;
 const links=svg.insert('g','g');
 const bot=svg.append('g').style('opacity',0);
 cards.forEach((c,i)=>{const sx=P?W-30:c.x+cw/2,sy=P?c.y+ch/2:c.y+ch;const ex=P?W-30:bx+bw*(i+.5)/3,ey=by;
  links.append('path').attr('d',P?`M${W-12},${c.y+ch/2}H${W-6}V${by+12}`:`M${sx},${sy}C${sx},${sy+40} ${ex},${ey-40} ${ex},${ey}`).attr('fill','none').attr('stroke',OCH).attr('stroke-width',2).attr('stroke-dasharray','6 6').attr('class','flowing').attr('opacity',0)});
 bot.append('rect').attr('x',bx).attr('y',by).attr('width',bw).attr('height',bh).attr('rx',14).attr('fill','#1d1a12').attr('stroke',OCH).attr('stroke-width',1.6);
 txt(bot,bx+bw/2,by+(P?22:30),'Si una decisión afecta a varios actores',{a:'middle',fw:700,fs:P?13:17,c:OCH});
 const R=[['i-doc','Compartir información'],['i-check','Acordar responsabilidades'],['i-lupa','Revisar resultados']];
 R.forEach(([ic,t],i)=>{const cx=bx+bw*(i+.5)/3,cy=by+bh*(P?.55:.56);const g=bot.append('g').attr('transform',`translate(${cx},${cy})`);
  g.append('circle').attr('r',P?18:26).attr('fill','#141518').attr('stroke',OCH).attr('stroke-width',1.6);icon(g,ic,0,0,P?18:26,OCH);
  const tt=txt(g,0,(P?18:26)+(P?15:22),'',{a:'middle',fw:600,fs:P?11:14});wrap(tt,t,P?12:22,P?13:17);
  if(i<2)bot.append('path').attr('d',`M${cx+(P?24:34)},${cy}H${bx+bw*(i+1.5)/3-(P?24:34)}`).attr('stroke',OCH).attr('stroke-width',1.6).attr('marker-end',null).attr('stroke-dasharray','4 4')});
 return sub=>{bot.transition().duration(500).style('opacity',sub?1:0);links.selectAll('path').transition().duration(500).attr('opacity',sub?.85:0)};
}
/* ---------- modelo dinámico-causal fiel al guion (estilo Vensim) ---------- */
function causal2View(ctx){
 ctx.el.classList.add('vensim');const {svg,W,H,P}=svgIn(ctx.el);
 const BL='#1d3fd0',HL='#E0623F',TX='#111',FS=P?22:17;
 const V=P?{INF:[120,90],COO:[390,190],ACU:[390,360],CON:[390,530],PAR:[120,420],CAR:[120,690],RET:[390,720],DIS:[120,880]}
          :{INF:[150,110],COO:[460,70],ACU:[760,150],CON:[700,330],PAR:[330,330],CAR:[420,500],RET:[790,500],DIS:[120,520]};
 const N={INF:'Acceso a la información',COO:'Coordinación de tareas',ACU:'Acuerdos cumplidos',CON:'Confianza basada en resultados',PAR:'Participación',CAR:'Carga de trabajo de las mismas personas',RET:'Retraso de las tareas',DIS:'Distribución de tareas (repartir y rotar)'};
 const VB0=P?[0,20,520,950]:[0,20,1000,580],VB1=P?[-10,900,540,330]:[40,570,920,250];
 svg.attr('viewBox',VB0.join(' ')).attr('preserveAspectRatio','xMidYMid meet');
 const df=svg.append('defs');['b','h','g'].forEach((k,i)=>df.append('marker').attr('id','c2'+k).attr('viewBox','0 0 10 10').attr('refX',9).attr('refY',5).attr('markerWidth',P?14:11).attr('markerHeight',P?14:11).attr('orient','auto').attr('markerUnits','userSpaceOnUse').append('path').attr('d','M0 1L9 5L0 9z').attr('fill',[BL,HL,'#8a8f99'][i]));
 const gl=svg.append('g'),gd=svg.append('g'),gv=svg.append('g'),gx=svg.append('g'),gs=svg.append('g');
 const box={};const vs={};
 Object.entries(V).forEach(([k,[x,y]])=>{const g=gv.append('g').attr('transform',`translate(${x},${y})`);const t=g.append('text').attr('text-anchor','middle').attr('font-family','Arial').attr('font-size',FS).attr('fill',TX);
  const words=N[k].split(' ');const L=[];let c='';words.forEach(w=>{if((c+' '+w).trim().length>(P?16:20)&&c){L.push(c);c=w}else c=(c+' '+w).trim()});if(c)L.push(c);
  L.forEach((l,i)=>t.append('tspan').attr('x',0).attr('dy',i?FS*1.15:-(L.length-1)*FS*.57+FS*.35).text(l));
  const bw=Math.max(...L.map(l=>l.length))*FS*.52+14,bh=L.length*FS*1.15+10;box[k]=[x,y,bw/2,bh/2];vs[k]=g});
 const edge=(a,b,sg,id,bend)=>{const [ax,ay,aw,ah]=box[a],[bx,by,bw,bh]=box[b];const dx=bx-ax,dy=by-ay;const mx=(ax+bx)/2-dy*(bend||.18),my=(ay+by)/2+dx*(bend||.18);
  const clip=(x,y,w,h,tx,ty)=>{const ddx=tx-x,ddy=ty-y;const s=Math.min((w+4)/Math.abs(ddx||1e-6),(h+4)/Math.abs(ddy||1e-6));return[x+ddx*s,y+ddy*s]};
  const p0=clip(ax,ay,aw,ah,mx,my),p1=clip(bx,by,bw,bh,mx,my);const q=t=>[(1-t)**2*p0[0]+2*(1-t)*t*mx+t*t*p1[0],(1-t)**2*p0[1]+2*(1-t)*t*my+t*t*p1[1]];
  const path=gl.append('path').attr('id',id).attr('d',`M${p0}Q${mx},${my} ${p1}`).attr('fill','none').attr('stroke',BL).attr('stroke-width',P?2.6:2).attr('marker-end','url(#c2b)').style('opacity',0);
  const sp=q(.82);const sgn=gx.append('text').attr('x',sp[0]+8).attr('y',sp[1]-8).attr('font-family','Arial').attr('font-weight',700).attr('font-size',FS+4).attr('fill',BL).text(sg).style('opacity',0);
  return{path,sgn,id}};
 const E={
  r1:[edge('INF','COO','+','e1'),edge('COO','ACU','+','e2'),edge('ACU','CON','+','e3'),edge('CON','PAR','+','e4'),edge('PAR','INF','+','e5')],
  r2:[edge('CAR','RET','+','e6',-.15),edge('RET','ACU','−','e7'),edge('PAR','CAR','−','e8',.2)],
  dis:[edge('DIS','CAR','−','e9',-.2)]};
 const loopMark=(id,x,y,lab,col)=>{const g=gx.append('g').attr('transform',`translate(${x},${y})`).style('opacity',0);g.append('path').attr('d','M-18 -6 A19 19 0 1 1 -6 18').attr('fill','none').attr('stroke',col).attr('stroke-width',2);g.append('text').attr('text-anchor','middle').attr('y',6).attr('font-family','Arial').attr('font-weight',700).attr('font-size',P?20:16).attr('fill',col).text(id);
  const t=g.append('text').attr('text-anchor','middle').attr('y',P?44:40).attr('font-family','Arial').attr('font-size',P?16:13).attr('fill',col).text(lab);return g};
 const L1=P?loopMark('R1',255,300,'fortalece',BL):loopMark('R1',470,230,'fortalece',BL);
 const L2=P?loopMark('R2',255,620,'debilita',HL):loopMark('R2',600,420,'debilita',HL);
 // existencias: material aprovechable sin recuperar
 const sy=P?1100:720,sx=P?260:500;
 const st=gs.append('g').style('opacity',0);
 st.append('rect').attr('x',sx-(P?120:150)).attr('y',sy-40).attr('width',P?240:300).attr('height',80).attr('fill','#fff').attr('stroke',TX).attr('stroke-width',2.4);
 const stt=st.append('text').attr('text-anchor','middle').attr('font-family','Arial').attr('font-weight',700).attr('font-size',FS).attr('fill',TX);
 [['Material aprovechable'],['sin recuperar']].forEach((l,i)=>stt.append('tspan').attr('x',sx).attr('y',sy-6+i*FS*1.2).text(l[0]));
 const pipe=(x1,x2,lab,ly)=>{st.append('path').attr('d',`M${x1},${sy}H${x2}`).attr('stroke',TX).attr('stroke-width',11);st.append('path').attr('d',`M${x1},${sy}H${x2}`).attr('stroke','#FBFAF6').attr('stroke-width',6.5);
  const vx=(x1+x2)/2;st.append('path').attr('d',`M${vx-12} ${sy-10}L${vx+12} ${sy+10}V${sy-10}L${vx-12} ${sy+10}z`).attr('fill','#fff').attr('stroke',TX).attr('stroke-width',2);
  const t=st.append('text').attr('text-anchor','middle').attr('font-family','Arial').attr('font-size',FS-2).attr('fill',TX);lab.forEach((l,i)=>t.append('tspan').attr('x',vx).attr('y',sy+34+i*FS).text(l));return vx};
 const lx0=P?20:110,rx1=P?500:890;const cloud=x=>st.append('path').attr('transform',`translate(${x},${sy}) scale(1.6)`).attr('d','M-14 6c-6 0-8-8-2-10-1-7 8-9 11-4 3-5 12-3 11 3 6 1 6 11-1 11z').attr('fill','#fff').attr('stroke',TX).attr('stroke-width',1.4);
 cloud(lx0);cloud(rx1);
 const vin=pipe(lx0+22,sx-(P?120:150),['no se separa','ni se recoge'],sy+30);const vout=pipe(sx+(P?120:150),rx1-22,['se recupera','y se entrega'],sy+30);
 st.append('path').attr('d',`M${sx+(P?110:140)},${sy}L${sx+(P?124:154)},${sy}`).attr('marker-end','url(#c2b)');
 const coord=st.append('g').attr('transform',`translate(${vout},${sy-(P?130:120)})`);const ct=coord.append('text').attr('text-anchor','middle').attr('font-family','Arial').attr('font-size',FS-1).attr('fill',TX);
 (P?['Coordinación entre hogares,','comercios, recicladores','y operadores']:['Coordinación entre hogares, comercios,','recicladores y operadores']).forEach((l,i)=>ct.append('tspan').attr('x',P?14:0).attr('dy',i?FS:0).text(l));if(P)ct.attr('text-anchor','end');
 st.append('path').attr('d',`M${vout},${sy-(P?130:120)+FS*(P?2.2:1.4)}V${sy-16}`).attr('stroke',BL).attr('stroke-width',2).attr('marker-end','url(#c2b)');st.append('text').attr('x',vout+8).attr('y',sy-26).attr('font-family','Arial').attr('font-weight',700).attr('font-size',FS+4).attr('fill',BL).text('+');
 st.append('text').attr('x',sx).attr('y',sy+(P?100:96)).attr('text-anchor','middle').attr('font-family','Arial').attr('font-size',FS-2).attr('fill','#b3261e').text('Hipótesis: requiere datos');
 function show(list,hl){const on=new Set(list.flatMap(k=>E[k]));Object.values(E).flat().forEach(e=>{const vis=on.has(e);e.path.transition().duration(500).style('opacity',vis?(hl&&!hl.includes(e)?.25:1):0).attr('stroke',hl&&hl.includes(e)?HL:BL).attr('marker-end',hl&&hl.includes(e)?'url(#c2h)':'url(#c2b)');e.sgn.transition().duration(500).style('opacity',vis?1:0)})}
 function dots(es){gd.selectAll('*').remove();es.forEach((e,j)=>{for(let k=0;k<2;k++){const c=gd.append('circle').attr('r',P?6:5).attr('fill',HL);c.append('animateMotion').attr('dur','1.8s').attr('repeatCount','indefinite').attr('begin',(k*.9+j*.12)+'s').append('mpath').attr('href','#'+e.id)}})}
 function vars(keys,dim){Object.entries(vs).forEach(([k,g])=>g.transition().duration(500).style('opacity',keys.includes(k)?1:(dim?.25:0)))}
 const zoom=vb=>{const cur=svg.attr('viewBox').split(' ').map(Number);svg.transition().duration(reduce?0:900).attrTween('viewBox',()=>{const i=d3.interpolate(cur,vb);return t=>i(t).join(' ')})};
 return sub=>{
  const r1v=['INF','COO','ACU','CON','PAR'],r2v=['CAR','RET','ACU','CON','PAR'];
  st.transition().style('opacity',sub===4?1:0);zoom(sub===4?VB1:VB0);
  if(sub===0){vars(['INF','ACU','PAR','DIS','CON'],false);show([]);dots([]);L1.style('opacity',0);L2.style('opacity',0)}
  if(sub===1){vars(r1v,false);show(['r1'],E.r1);dots(E.r1);L1.transition().style('opacity',1);L2.style('opacity',0)}
  if(sub===2){vars([...new Set([...r1v,...r2v])],false);show(['r1','r2'],[...E.r2,E.r1[2],E.r1[3]]);dots([...E.r2,E.r1[2],E.r1[3]]);L1.transition().style('opacity',.3);L2.transition().style('opacity',1)}
  if(sub===3){vars([...new Set([...r1v,...r2v,'DIS'])],false);show(['r1','r2','dis'],E.dis);dots(E.dis);L1.transition().style('opacity',.3);L2.transition().style('opacity',.6)}
  if(sub===4){vars(Object.keys(V),true);show(['r1','r2','dis']);gl.selectAll('path').transition().style('opacity',.15);gx.selectAll('text').transition().style('opacity',.15);dots([]);L1.style('opacity',.15);L2.style('opacity',.15)}
 }}

/* ---------- plano de Kennedy: dónde están las comunidades ---------- */
const MAPA_MODOS=[
 {k:'jac',t:'Juntas de acción comunal',cats:{jac:['#9382E0',4.5]},mark:[['alcaldia','Alcaldía Local','#F2EFE8']],leg:[['#9382E0','188 juntas de acción comunal'],['#F2EFE8','Alcaldía Local']]},
 {k:'huertas',t:'Huertas urbanas y comunitarias',cats:{huerta:['#8EBF4C',3]},mark:[],leg:[['#8EBF4C','811 huertas registradas']]},
 {k:'colegios',t:'Colegios oficiales para la red de huertas escolares',cats:{huerta:['#8EBF4C',2,.35],colegio:['#F2B53A',6.5]},mark:[],leg:[['#F2B53A','79 colegios oficiales'],['#8EBF4C','huertas existentes']]},
 {k:'presion',t:'Corabastos y los humedales bajo presión',cats:{},mark:[['corabastos','Corabastos','#DE9F50'],['hum','','#4EAECF']],leg:[['#DE9F50','Corabastos: flujo comercial y de carga'],['#4EAECF','Humedales El Burro, Techo y La Vaca']]},
 {k:'circuitos',t:'Huertas, colegios y comedores para circuitos cortos',cats:{huerta:['#8EBF4C',2.6,.8],colegio:['#F2B53A',5.5],comedor:['#CF7ABB',7]},mark:[],leg:[['#8EBF4C','811 huertas'],['#F2B53A','79 colegios oficiales'],['#CF7ABB','11 comedores comunitarios']]},
 {k:'abasto',t:'Corabastos y plazas de mercado',cats:{plaza:['#DE9F50',8]},mark:[['corabastos','Corabastos','#DE9F50'],['plaza','','#DE9F50']],leg:[['#DE9F50','Corabastos y plazas de mercado']]}];
function mapaView(ctx){
 const el=ctx.el;const P=size(el).W<760;d3.select(el).append('div').attr('id','mapC');
 const map=new maplibregl.Map({container:'mapC',style:'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',center:[-74.155,4.632],zoom:P?11.6:12.4,attributionControl:{compact:true},interactive:false});
 ctx.onExit(()=>{try{map.remove()}catch(e){}});
 const leg=d3.select(el).append('div').style('position','absolute').style('left','14px').style(P?'bottom':'top','14px').style('background','rgba(13,14,16,.92)').style('border','1px solid #2b2d33').style('border-radius','12px').style('padding',P?'10px 12px':'14px 16px').style('max-width',P?'70%':'340px').style('pointer-events','none');
 let PT=null,K=null,ready=false,pend=null,markers=[],BB=null,CEN=null,alive=true,raf1=0,raf2=0;
 ctx.onExit(()=>{alive=false;cancelAnimationFrame(raf1);cancelAnimationFrame(raf2)});
 map.on('load',()=>Promise.all(['assets/territorio_kennedy.geojson','assets/territorio_puntos.geojson'].map(u=>fetch(u).then(r=>r.json()))).then(([k,p])=>{K=k;PT=p.features;
  map.addSource('k',{type:'geojson',data:K});map.addLayer({id:'k-fill',type:'fill',source:'k',paint:{'fill-color':'#F2EFE8','fill-opacity':.04}});map.addLayer({id:'k',type:'line',source:'k',paint:{'line-color':'#F2EFE8','line-width':1.6,'line-opacity':.7}});
  map.addSource('p',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
  map.addSource('h',{type:'geojson',data:{type:'FeatureCollection',features:[]}});
  map.addLayer({id:'h',type:'circle',source:'h',paint:{'circle-radius':14,'circle-color':['get','col'],'circle-opacity':.25,'circle-blur':.4}});
  map.addLayer({id:'p',type:'circle',source:'p',paint:{'circle-radius':['get','r'],'circle-color':['get','col'],'circle-opacity':['get','o'],'circle-stroke-color':'#0d0e10','circle-stroke-width':['case',['>',['get','r'],5],1.5,0]}});
  const b=d3.geoBounds(K);BB=[[b[0][0],b[0][1]],[b[1][0],b[1][1]]];CEN=d3.geoCentroid(K);map.fitBounds(BB,{padding:P?20:{top:40,bottom:40,left:380,right:40},duration:0});
  let t0=performance.now();const pulse=()=>{if(!alive)return;const k=(Math.sin((performance.now()-t0)/420)+1)/2;try{map.setPaintProperty('h','circle-radius',12+k*14);map.setPaintProperty('h','circle-opacity',.35-k*.25)}catch(e){}raf2=requestAnimationFrame(pulse)};pulse();
  ready=true;if(pend!==null)set(pend)}));
 function set(i){if(!ready){pend=i;return}const M=MAPA_MODOS[i];markers.forEach(m=>m.remove());markers=[];
  const dist=f=>Math.hypot(f.geometry.coordinates[0]-CEN[0],f.geometry.coordinates[1]-CEN[1]);const catOf=f=>(f.properties.c==='sdis'&&/^Comedor/.test(f.properties.n||''))?'comedor':f.properties.c;const sel=PT.filter(f=>M.cats[catOf(f)]);const dm=Math.max(...sel.map(dist),1e-6);
  const feats=sel.map(f=>{const [col,r,o]=M.cats[catOf(f)];return{type:'Feature',geometry:f.geometry,properties:{col,r,o:o||.95,n:f.properties.n,d:dist(f)/dm*.92}}});const halos=[];
  M.mark.forEach(([c,n,col])=>PT.filter(f=>f.properties.c===c).forEach(f=>{feats.push({type:'Feature',geometry:f.geometry,properties:{col,r:9,o:1,d:0}});halos.push({type:'Feature',geometry:f.geometry,properties:{col}});
   const e=document.createElement('div');e.style.cssText=`font:600 13px Instrument Sans,sans-serif;color:${col};text-shadow:0 1px 6px #000,0 0 3px #000;white-space:nowrap`;e.textContent=n||f.properties.n;markers.push(new maplibregl.Marker({element:e,offset:[0,c==='hum'?20:-18]}).setLngLat(f.geometry.coordinates).addTo(map))}));
  map.getSource('p').setData({type:'FeatureCollection',features:feats});map.getSource('h').setData({type:'FeatureCollection',features:halos});
  markers.forEach(m=>{m.getElement().style.opacity=0;m.getElement().style.transition='opacity .6s .9s'});requestAnimationFrame(()=>markers.forEach(m=>m.getElement().style.opacity=1));
  map.jumpTo({center:CEN,zoom:map.getZoom()-0.8,pitch:0,bearing:-8});map.fitBounds(BB,{padding:P?20:{top:40,bottom:40,left:380,right:40},duration:reduce?0:2200,pitch:P?20:32,bearing:0,essential:true});
  cancelAnimationFrame(raf1);const st=performance.now(),dur=reduce?1:1800;
  const grow=()=>{if(!alive)return;const rv=Math.min(1.1,(performance.now()-st)/dur*1.1);
   try{map.setPaintProperty('p','circle-radius',['*',['get','r'],['interpolate',['linear'],['-',rv,['get','d']],0,0,0.05,1.6,0.12,1]]);
    map.setPaintProperty('p','circle-opacity',['*',['get','o'],['interpolate',['linear'],['-',rv,['get','d']],0,0,0.05,1]])}catch(e){}
   if(rv<1.1)raf1=requestAnimationFrame(grow)};grow();
  leg.html(`<div style="font:600 11px JetBrains Mono,monospace;letter-spacing:.08em;color:#F2B53A;text-transform:uppercase">Plano de Kennedy</div><div style="font:700 ${P?15:19}px Instrument Sans,sans-serif;color:#fff;margin:4px 0 8px">${M.t}</div>`+M.leg.map(([c,t])=>`<div style="display:flex;align-items:center;gap:8px;font:500 ${P?12:14}px Instrument Sans,sans-serif;color:#cfd3dc;margin-top:4px"><span style="width:11px;height:11px;border-radius:50%;background:${c};display:inline-block"></span>${t}</div>`).join('')+`<div style="font:400 11px JetBrains Mono,monospace;color:#77736b;margin-top:8px">Fuente: IDECA · Datos Abiertos Bogotá</div>`)}
 return sub=>set(sub);
}

/* ---------- vista genérica de tarjetas con íconos y actores ---------- */
function cardsView(ctx,cfg){
 const {svg,W,H,P}=svgIn(ctx.el);const df=svg.append('defs');mk(df,'cv-a',OCH,11);
 const items=cfg.items,n=items.length;const cols=P?(cfg.pcols||1):(cfg.cols||n);const rows=Math.ceil(n/cols);
 const top=cfg.title?(P?46:66):16,bot=cfg.footer?(P?54:66):16,gap=P?10:(cfg.arrows?44:18);
 if(cfg.title){const t=txt(svg,W/2,P?22:34,'',{a:'middle',fw:700,fs:P?14:20});wrap(t,cfg.title,P?44:110,P?16:24)}
 const cw=(W-24-gap*(cols-1))/cols;let ch=(H-top-bot-(rows-1)*(P?10:18))/rows;const avail=H-top-bot;const chMax=cfg.maxh||(P?240:340);let top2=top;if(ch>chMax){ch=chMax;top2=top+(avail-(rows*ch+(rows-1)*(P?10:18)))/2}
 const G=items.map((it,i)=>{const c=i%cols,r=Math.floor(i/cols);const x=12+c*(cw+gap),y=top2+r*(ch+(P?10:18));
  const g=svg.append('g').attr('transform',`translate(${x},${y})`).style('opacity',0);
  const col=it.col||OCH,dim=it.dim;
  g.transition().delay(reduce?0:(cfg.stagger??280)*i).duration(500).style('opacity',dim?.32:1);
  g.append('rect').attr('width',cw).attr('height',ch).attr('rx',14).attr('fill',it.hl?'#1d1a12':'#16181c').attr('stroke',col).attr('stroke-width',it.hl?2.4:1.4).attr('stroke-opacity',dim?.4:.9);
  const small=P||ch<150;const ir=small?18:Math.min(30,ch*.14);
  const ix=small?14+ir:cw/2,iy=small?Math.min(ch/2,14+ir):18+ir;
  g.append('circle').attr('cx',ix).attr('cy',iy).attr('r',ir).attr('fill',col);icon(g,it.ic,ix,iy,ir*1.15,'#111');
  const tx=small?ix+ir+12:cw/2,an=small?'start':'middle',tw=small?Math.floor((cw-tx-10)/7.2):Math.floor(cw/8.6);
  const t1=txt(g,tx,small?(iy-ir+14):iy+ir+28,'',{a:an,fw:700,fs:small?14:17,c:col});wrap(t1,it.t,tw,small?16:20);
  const tl=Math.ceil(it.t.length/tw);let yy=small?(iy-ir+14)+tl*16+4:iy+ir+28+tl*20+4;
  if(it.d){const t2=txt(g,tx,yy,'',{a:an,fs:small?12:14,c:SOFT});wrap(t2,it.d,small?Math.floor((cw-tx-10)/6.4):Math.floor(cw/7.4),small?15:18);yy+=Math.ceil(it.d.length/(small?Math.floor((cw-tx-10)/6.4):Math.floor(cw/7.4)))*(small?15:18)+6}
  if(it.ids&&it.ids.length){const ar=small?12:Math.min(20,cw/(it.ids.length*3.4));const ay=small?Math.max(yy+ar+4,ch-ar-14):Math.min(ch-ar-34,yy+ar+18+(ch-yy-ar*2-52)*.35);
   it.ids.forEach((id,j)=>{const ax=small?tx+ar+j*(ar*2+10):cw/2+(j-(it.ids.length-1)/2)*(cw/(it.ids.length+.4));const ng=g.append('g').attr('class','node').attr('transform',`translate(${ax},${ay})`);actor(ng,id,ar,{label:false});
    if(!small){const tt=txt(ng,0,ar+15,'',{a:'middle',fs:11.5,c:INK});wrap(tt,ACT(id).short,13,13)}})}
  return{x,y,g}});
 if(cfg.arrows&&!P)G.slice(0,-1).forEach((g,i)=>{if(i%cols===cols-1)return;const x1=g.x+cw+4,x2=g.x+cw+gap-6,y=g.y+ch/2;svg.append('path').attr('d',`M${x1},${y}H${x2}`).attr('stroke',OCH).attr('stroke-width',2.2).attr('stroke-dasharray','6 5').attr('class','flowing').attr('marker-end','url(#cv-a)').style('opacity',0).transition().delay(reduce?0:280*(i+1)).style('opacity',1)});
 if(cfg.loop&&!P){const a=G[0],b=G[G.length-1];svg.append('path').attr('d',`M${b.x+cw/2},${b.y+ch+6}C${b.x+cw/2},${H-bot+40} ${a.x+cw/2},${H-bot+40} ${a.x+cw/2},${a.y+ch+8}`).attr('fill','none').attr('stroke',RED).attr('stroke-width',2).attr('stroke-dasharray','6 6').attr('class','flowing').attr('marker-end','url(#cv-a)')}
 if(cfg.footer){const ft=txt(svg,W/2,H-(P?30:28),'',{a:'middle',fw:600,fs:P?12.5:15,c:OCH});wrap(ft,cfg.footer,P?46:120,P?15:19)}
}
/* ===== Propuesta sobre el plano de Kennedy: cómo se vería ===== */
const PROP_COR=[-74.1590,4.6295],PROP_VACA=[-74.16198,4.6287],PROP_BURRO=[-74.14958,4.64142],PROP_TECHO=[-74.14165,4.64518],PROP_ALC=[-74.157422,4.619505];
const PROP_MODOS=[
 {t:'Circuitos cortos entre huertas, colegios y comedores',s:'Propuesta: conexiones locales que no pasan por la central',leg:[['#8EBF4C','Huertas (muestra)'],['#F2B53A','Colegios oficiales con huerta escolar'],['#CF7ABB','Comedores comunitarios'],['#DE9F50','Corabastos'],['#B6E27A','Circuito corto propuesto']]},
 {t:'Una parte del abasto es local; el resto sigue en la central',s:'Se reduce la dependencia de un único nodo, no se elimina',leg:[['#B6E27A','Circuito corto local (propuesta)'],['#DE9F50','Abasto que sigue llegando desde Corabastos'],['#CF7ABB','Comedores comunitarios'],['#F2B53A','Colegios oficiales']]},
 {t:'Núcleos de autogobierno sobre tres flujos',s:'Reconocidos por la Alcaldía Local, las JAC y la JAL',leg:[['#DE9F50','Núcleo de abastecimiento y horarios de carga'],['#8EBF4C','Núcleo de residuos orgánicos'],['#4EAECF','Núcleo del agua y los humedales'],['#9382E0','Juntas de acción comunal (188)'],['#F2EFE8','Reconocimiento institucional (Alcaldía Local)']]},
 {t:'Tres flujos que se reorganizan en Kennedy',s:'Horarios de carga · residuos orgánicos · compras de alimentos',leg:[['#E0623F','1 · Horarios de carga alrededor de Corabastos'],['#F2B53A','2 · Residuos orgánicos aprovechados (compost a huertas)'],['#B6E27A','3 · Compras locales organizadas'],['#4EAECF','Humedales con menos presión']]},
 {t:'Cómo sabríamos si funciona',s:'Indicadores ubicados donde ocurre cada flujo',leg:[['#B6E27A','% de abastecimiento local por circuitos cortos'],['#DE9F50','Dependencia de Corabastos'],['#E0623F','Viajes de carga en horas de congestión'],['#F2B53A','Toneladas de orgánicos aprovechadas'],['#8DB3D9','Información de precios y volúmenes']]}];
function propuestaView(ctx){
 const el=ctx.el;const P=size(el).W<760;d3.select(el).append('div').attr('id','mapC');
 const map=new maplibregl.Map({container:'mapC',style:'https://basemaps.cartocdn.com/gl/dark-matter-gl-style/style.json',center:[-74.155,4.632],zoom:P?11.6:12.4,attributionControl:{compact:true},interactive:false});
 let alive=true,raf=0,ready=false,pend=null,markers=[],DOTS=[],DATA=null,BB=null,CEN=null;
 ctx.onExit(()=>{alive=false;cancelAnimationFrame(raf);try{map.remove()}catch(e){}});
 const leg=d3.select(el).append('div').style('position','absolute').style('left','14px').style(P?'bottom':'top','14px').style('background','rgba(13,14,16,.92)').style('border','1px solid #2b2d33').style('border-radius','12px').style('padding',P?'10px 12px':'14px 16px').style('max-width',P?'70%':'360px').style('pointer-events','none');
 const FCo=f=>({type:'FeatureCollection',features:f});
 const dist=(a,b)=>Math.hypot((a[0]-b[0])*Math.cos(4.63*Math.PI/180),a[1]-b[1]);
 const near=(o,arr,n)=>[...arr].sort((a,b)=>dist(o,a.geometry.coordinates)-dist(o,b.geometry.coordinates)).slice(0,n);
 const arc=(a,b,bend=.22)=>{const mx=(a[0]+b[0])/2,my=(a[1]+b[1])/2,dx=b[0]-a[0],dy=b[1]-a[1];const c=[mx-dy*bend,my+dx*bend];return Array.from({length:29},(_,i)=>{const t=i/28;return[(1-t)**2*a[0]+2*(1-t)*t*c[0]+t*t*b[0],(1-t)**2*a[1]+2*(1-t)*t*c[1]+t*t*b[1]]})};
 const circle=(c,rm)=>{const k=Math.cos(c[1]*Math.PI/180);return Array.from({length:65},(_,i)=>{const a=i/64*Math.PI*2;return[c[0]+Math.cos(a)*rm/111320/k,c[1]+Math.sin(a)*rm/111320]})};
 map.on('load',()=>Promise.all(['assets/territorio_kennedy.geojson','assets/territorio_puntos.geojson'].map(u=>fetch(u).then(r=>r.json()))).then(([K,pt])=>{
  const PT=pt.features,by=c=>PT.filter(f=>f.properties.c===c);
  const comedores=PT.filter(f=>f.properties.c==='sdis'&&/^Comedor/.test(f.properties.n||'')),colegios=by('colegio'),huertas=by('huerta'),jac=by('jac');
  /* muestra de huertas repartida por el territorio (una por celda) */
  const cell=new Map();huertas.forEach(f=>{const [x,y]=f.geometry.coordinates;const k=Math.round(x/.006)+'_'+Math.round(y/.006);if(!cell.has(k))cell.set(k,f)});const hs=[...cell.values()];
  const cs=colegios.filter((_,i)=>i%2===0);
  const circ=[];comedores.forEach(c=>near(c.geometry.coordinates,hs,4).forEach(h=>circ.push([h.geometry.coordinates,c.geometry.coordinates])));
  cs.forEach(c=>near(c.geometry.coordinates,hs,2).forEach(h=>circ.push([h.geometry.coordinates,c.geometry.coordinates])));
  DATA={K,jac,comedores,colegios:cs,hs,circ};
  map.addSource('k',{type:'geojson',data:K});map.addLayer({id:'k-fill',type:'fill',source:'k',paint:{'fill-color':'#F2EFE8','fill-opacity':.04}});map.addLayer({id:'k',type:'line',source:'k',paint:{'line-color':'#F2EFE8','line-width':1.6,'line-opacity':.7}});
  ['z','arcs','h','p','dots'].forEach(s=>map.addSource(s,{type:'geojson',data:FCo([])}));
  map.addLayer({id:'z-fill',type:'fill',source:'z',paint:{'fill-color':['get','col'],'fill-opacity':.13}});
  map.addLayer({id:'z-line',type:'line',source:'z',paint:{'line-color':['get','col'],'line-width':2,'line-dasharray':[3,2],'line-opacity':.9}});
  map.addLayer({id:'arcs',type:'line',source:'arcs',paint:{'line-color':['get','col'],'line-width':['get','w'],'line-opacity':['get','o'],'line-dasharray':[2,1.4]}});
  map.addLayer({id:'h',type:'circle',source:'h',paint:{'circle-radius':16,'circle-color':['get','col'],'circle-opacity':.25,'circle-blur':.4}});
  map.addLayer({id:'p',type:'circle',source:'p',paint:{'circle-radius':['get','r'],'circle-color':['get','col'],'circle-opacity':['get','o'],'circle-stroke-color':'#0d0e10','circle-stroke-width':['case',['>',['get','r'],5],1.5,0]}});
  map.addLayer({id:'dots',type:'circle',source:'dots',paint:{'circle-radius':3,'circle-color':['get','col'],'circle-stroke-width':1,'circle-stroke-color':'#0d0e10'}});
  const b=d3.geoBounds(K);BB=[[b[0][0],b[0][1]],[b[1][0],b[1][1]]];CEN=d3.geoCentroid(K);map.fitBounds(BB,{padding:P?20:{top:40,bottom:40,left:400,right:40},duration:0});
  const t0=performance.now();const tick=()=>{if(!alive)return;const t=(performance.now()-t0)/1000,k=(Math.sin(t*2.4)+1)/2;
   try{map.setPaintProperty('h','circle-radius',12+k*16);map.setPaintProperty('h','circle-opacity',.4-k*.28);
    if(DOTS.length)map.getSource('dots').setData(FCo(DOTS.map((d,i)=>{const u=reduce?.5:((t*.22+d.ph)%1),j=Math.min(27,Math.floor(u*28));return{type:'Feature',geometry:{type:'Point',coordinates:d.line[j]},properties:{col:d.col}}})))}catch(e){}
   raf=requestAnimationFrame(tick)};tick();
  ready=true;if(pend!==null)set(pend)}));
 function set(i){if(!ready){pend=i;return}const M=PROP_MODOS[i],D=DATA;markers.forEach(m=>m.remove());markers=[];
  const pts=[],arcs=[],zones=[],halos=[],marks=[];DOTS=[];
  const dot=(c,r,col,o=.95)=>pts.push({type:'Feature',geometry:{type:'Point',coordinates:c},properties:{col,r,o}});
  const link=(a,b,col,w=1.6,o=.75,bend=.22,flow=true)=>{const line=arc(a,b,bend);arcs.push({type:'Feature',geometry:{type:'LineString',coordinates:line},properties:{col,w,o}});if(flow)DOTS.push({line,col,ph:Math.random()})};
  const mark=(c,txt,col,dy=-18)=>marks.push([c,txt,col,dy]);
  const hal=(c,col)=>halos.push({type:'Feature',geometry:{type:'Point',coordinates:c},properties:{col}});
  const base=()=>{D.hs.forEach(f=>dot(f.geometry.coordinates,2.6,'#8EBF4C',.8));D.colegios.forEach(f=>dot(f.geometry.coordinates,5.5,'#F2B53A'));D.comedores.forEach(f=>dot(f.geometry.coordinates,7,'#CF7ABB'))};
  const cora=()=>{dot(PROP_COR,9,'#DE9F50',1);hal(PROP_COR,'#DE9F50');mark(PROP_COR,'Corabastos','#DE9F50',-20)};
  const tinZone=[-74.158,4.648];
  if(i===0){base();D.circ.forEach(([a,b])=>link(a,b,'#B6E27A',2.2,.9));cora();mark(tinZone,'Huertas del Tintal','#B6E27A',-10);D.comedores.slice(0,1).forEach(c=>mark(c.geometry.coordinates,'Comedores','#CF7ABB',16))}
  else if(i===1){base();D.circ.forEach(([a,b])=>link(a,b,'#B6E27A',1.5,.6,.22,false));D.circ.forEach(([a,b])=>DOTS.push({line:arc(a,b,.22),col:'#B6E27A',ph:Math.random()}));
   D.comedores.forEach(c=>link(PROP_COR,c.geometry.coordinates,'#DE9F50',2.2,.7,-.18));D.colegios.slice(0,12).forEach(c=>link(PROP_COR,c.geometry.coordinates,'#DE9F50',1.4,.4,-.18,false));cora()}
  else if(i===2){D.jac.forEach(f=>dot(f.geometry.coordinates,3.6,'#9382E0',.85));D.comedores.forEach(f=>dot(f.geometry.coordinates,3,'#CF7ABB',.6));
   const hum=[PROP_BURRO[0]*.5+PROP_TECHO[0]*.5,PROP_BURRO[1]*.5+PROP_TECHO[1]*.5];
   const Z=[[[-74.1545,4.6335],'#DE9F50','Núcleo de abastecimiento',900],[[-74.1725,4.6245],'#8EBF4C','Núcleo de residuos orgánicos',950],[hum,'#4EAECF','Núcleo del agua',1300]];
   Z.forEach(([c,col,n,r])=>{zones.push({type:'Feature',geometry:{type:'Polygon',coordinates:[circle(c,r)]},properties:{col}});mark(c,n+' (propuesto)',col,-6);link(c,PROP_ALC,'#F2EFE8',1.6,.8,.15,true);dot(c,6,col,1)});
   dot(PROP_ALC,9,'#F2EFE8',1);hal(PROP_ALC,'#F2EFE8');mark(PROP_ALC,'Alcaldía Local · JAL','#F2EFE8',20);dot(PROP_COR,0,'#DE9F50',0)}
  else if(i===3){D.hs.forEach(f=>dot(f.geometry.coordinates,2.4,'#8EBF4C',.7));D.comedores.forEach(f=>dot(f.geometry.coordinates,6,'#CF7ABB'));
   D.circ.forEach(([a,b])=>link(a,b,'#B6E27A',1.3,.55));
   [[-74.1465,4.6265],[-74.1735,4.6225],[-74.1555,4.6055],[-74.1405,4.6335]].forEach(c=>link(PROP_COR,c,'#E0623F',2.4,.8,.25));
   near(PROP_COR,D.hs,9).forEach(h=>link(PROP_COR,h.geometry.coordinates,'#F2B53A',2.4,.85,-.2));
   link(PROP_COR,PROP_VACA,'#E0623F',1.2,.4,.1,false);dot(PROP_VACA,7,'#4EAECF',1);hal(PROP_VACA,'#4EAECF');[PROP_BURRO,PROP_TECHO].forEach(c=>{dot(c,7,'#4EAECF',1);hal(c,'#4EAECF')});
   mark(PROP_VACA,'La Vaca','#4EAECF',20);mark(PROP_BURRO,'El Burro','#4EAECF',20);mark(PROP_TECHO,'Techo','#4EAECF',20);
   dot(PROP_COR,9,'#DE9F50',1);hal(PROP_COR,'#DE9F50');mark(PROP_COR,'Corabastos','#DE9F50');mark([-74.1465,4.6265],'1 · Carga en otros horarios','#E0623F',-8);mark([-74.1625,4.6395],'2 · Orgánicos → compost → huertas','#F2B53A',-8);mark([-74.1735,4.6335],'3 · Compras locales','#B6E27A',-10)}
  else{D.hs.forEach(f=>dot(f.geometry.coordinates,2.2,'#8EBF4C',.55));D.comedores.forEach(f=>dot(f.geometry.coordinates,5,'#CF7ABB',.8));D.circ.forEach(([a,b])=>link(a,b,'#B6E27A',1.2,.4,.22,false));
   dot(PROP_COR,9,'#DE9F50',1);hal(PROP_COR,'#DE9F50');[PROP_VACA,PROP_BURRO,PROP_TECHO].forEach(c=>dot(c,6,'#4EAECF',1));
   mark(tinZone,'% abastecimiento local','#B6E27A',-10);mark(PROP_COR,'Dependencia de Corabastos','#DE9F50',-22);mark([-74.1465,4.6265],'Viajes de carga en hora pico','#E0623F',-8);mark([PROP_VACA[0]-.002,PROP_VACA[1]-.0125],'Toneladas de orgánicos aprovechadas','#F2B53A',0);mark([-74.1603,4.6194],'Información de precios','#8DB3D9',18)}
  map.getSource('z').setData(FCo(zones));map.getSource('arcs').setData(FCo(arcs));map.getSource('p').setData(FCo(pts));map.getSource('h').setData(FCo(halos));
  marks.forEach(([c,txt,col,dy])=>{const e=document.createElement('div');e.style.cssText=`font:700 ${P?11:13}px Instrument Sans,sans-serif;color:${col};text-shadow:0 1px 6px #000,0 0 3px #000,0 0 8px #000;white-space:nowrap;opacity:0;transition:opacity .6s .5s`;e.textContent=txt;markers.push(new maplibregl.Marker({element:e,offset:[0,dy]}).setLngLat(c).addTo(map))});
  requestAnimationFrame(()=>markers.forEach(m=>m.getElement().style.opacity=1));
  map.jumpTo({center:CEN,zoom:map.getZoom()-0.6,pitch:0,bearing:-6});map.fitBounds(BB,{padding:P?20:{top:40,bottom:40,left:400,right:40},duration:reduce?0:1800,pitch:P?20:28,bearing:0,essential:true});
  leg.html(`<div style="font:600 11px JetBrains Mono,monospace;letter-spacing:.08em;color:#F2B53A;text-transform:uppercase">Propuesta sobre el plano de Kennedy</div><div style="font:700 ${P?15:19}px Instrument Sans,sans-serif;color:#fff;margin:4px 0 2px">${M.t}</div><div style="font:400 ${P?11:12.5}px Instrument Sans,sans-serif;color:#9a958c;margin-bottom:8px">${M.s}</div>`+M.leg.map(([c,t])=>`<div style="display:flex;align-items:center;gap:8px;font:500 ${P?12:13.5}px Instrument Sans,sans-serif;color:#cfd3dc;margin-top:4px"><span style="width:11px;height:11px;border-radius:50%;background:${c};display:inline-block;flex:none"></span>${t}</div>`).join('')+`<div style="font:400 11px JetBrains Mono,monospace;color:#77736b;margin-top:8px">Ilustración de la propuesta, no una obra existente · datos: IDECA</div>`)}
 return sub=>set(sub);
}

/* ===== Escena animada: Corabastos hoy / red con circuitos cortos / metabolismo circular ===== */
const ESC_SYM=`<symbol id="e-central" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 21V9l9-5 9 5v12M2 21h20M7 21v-7h10v7M7 17.5h10M12 14v7"/></symbol>
<symbol id="e-tienda" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3 9.5 4.6 4h14.8L21 9.5M3 9.5a3 3 0 0 0 6 0 3 3 0 0 0 6 0 3 3 0 0 0 6 0M5 12.5V20h14v-7.5M10 20v-4.5h4V20"/></symbol>
<symbol id="e-comedor" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 12h17a8.5 8.5 0 0 1-17 0zM9 3.5c-1.2 1.6 1.2 2.4 0 4.2M14 3.5c-1.2 1.6 1.2 2.4 0 4.2M8 21h8"/></symbol>
<symbol id="e-colegio" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 21h19M4.5 21V10.5L12 5.5l7.5 5V21M10 21v-5.5h4V21M12 5.5V2.5h3"/></symbol>
<symbol id="e-huerta" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 20.5V11M12 12.5C12 8 9 5.5 4.5 5.5 4.5 10 7.5 12.5 12 12.5zM12 15c0-3.5 2.4-5.8 7-5.8 0 3.6-2.6 5.8-7 5.8zM3.5 20.5h17"/></symbol>
<symbol id="e-camion" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2 6.5h11.5V17M13.5 10h4l3.5 3.8V17M2 17h2.2M8.8 17h6M19.8 17H21"/><circle cx="6.5" cy="17.5" r="2.2"/><circle cx="17.5" cy="17.5" r="2.2"/></symbol>
<symbol id="e-humedal" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 17.5c2.2-2.2 4.2-2.2 6.5 0s4.3 2.2 6.5 0 4.2-2.2 6.5 0M2.5 21.5c2.2-2.2 4.2-2.2 6.5 0s4.3 2.2 6.5 0 4.2-2.2 6.5 0M8 14V5.5M8 9 5.8 6.8M16 14V3.5M16 8l2.2-2.2"/></symbol>
<symbol id="e-recicla" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M19.5 9A8 8 0 0 0 5 7M4.5 15A8 8 0 0 0 19 17M19.5 3.5V9H14M4.5 20.5V15H10"/></symbol>
<symbol id="e-compost" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M4 9h16l-1.6 11.5H5.6zM3 9h18M9 9V5.5h6V9M9.5 13.5c1.5 0 2.5 1 2.5 2.5M14.5 13.5c-1.5 0-2.5 1-2.5 2.5"/></symbol>
<symbol id="e-gota" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 3c-3.6 4.8-6 7.8-6 11a6 6 0 0 0 12 0c0-3.2-2.4-6.2-6-11z"/></symbol>`;
const ESC_T=[
 {badge:'HOY',head:'Todo el abasto pasa por un solo nodo',col:'#E0623F',chips:[['#E0623F','Congestión de carga'],['#E0623F','Residuos hacia el humedal'],['#E0623F','Un único centro de decisión']]},
 {badge:'CON LA PROPUESTA',head:'Una parte del abasto circula por circuitos cortos',col:'#8EBF4C',chips:[['#B6E27A','Circuitos cortos huerta → consumo'],['#B6E27A','Menos viajes de carga en hora pico'],['#DE9F50','Corabastos sigue en el abasto']]},
 {badge:'METABOLISMO CIRCULAR',head:'Los residuos orgánicos vuelven como alimento',col:'#4EAECF',chips:[['#F2B53A','Recicladores recuperan los orgánicos'],['#B6E27A','El compost vuelve a las huertas'],['#4EAECF','Menos carga sobre el humedal']]}];
function escenaView(ctx){
 const el=ctx.el;const svg=d3.select(el).append('svg').attr('class','full').attr('viewBox','0 0 1200 740').attr('preserveAspectRatio','xMidYMid meet');
 svg.append('defs').html(ESC_SYM);
 const FONT='Instrument Sans,sans-serif',CX=600,CY=330,GRN2='#8EBF4C',LG='#B6E27A',AMB='#F2B53A',TEAL='#4EAECF',ORG='#DE9F50',RD='#E0623F',PK='#CF7ABB';
 const ell=(a,rx,ry)=>[CX+rx*Math.cos(a*Math.PI/180),CY+ry*Math.sin(a*Math.PI/180)];
 const gLines=svg.append('g'),gMov=svg.append('g'),gNodes=svg.append('g'),gTop=svg.append('g');
 const fade=(sel,on,d=500,delay=0)=>sel.transition().delay(delay).duration(reduce?0:d).style('opacity',on?1:0);
 const items=[];const reg=(sel,st)=>{items.push({sel,st});return sel};
 const node=(p,id,col,r,label,st,opt={})=>{const g=gNodes.append('g').attr('transform',`translate(${p[0]},${p[1]})`);const inner=g.append('g');
  inner.append('circle').attr('r',r).attr('fill','#15171a').attr('stroke',col).attr('stroke-width',opt.sw||2.6);
  inner.append('use').attr('href','#'+id).attr('x',-r*.58).attr('y',-r*.58).attr('width',r*1.16).attr('height',r*1.16).style('color',opt.ic||'#F2EFE8');
  if(label)g.append('text').attr('y',r+17).attr('text-anchor','middle').attr('font-size',opt.fs||12.5).attr('font-weight',600).attr('fill',col).attr('font-family',FONT).text(label);
  reg(g,st);g.__inner=inner;g.__p=p;return g};
 const pt=(a,b,c,t)=>{const u=1-t;return[u*u*a[0]+2*u*t*c[0]+t*t*b[0],u*u*a[1]+2*u*t*c[1]+t*t*b[1]]};
 const ctrl=(a,b,k)=>[(a[0]+b[0])/2-(b[1]-a[1])*k,(a[1]+b[1])/2+(b[0]-a[0])*k];
 const path=(a,b,k)=>{const c=ctrl(a,b,k);return`M${a[0]},${a[1]}Q${c[0]},${c[1]} ${b[0]},${b[1]}`};
 /* posiciones */
 const cons=[0,1,2,3,4,5,6,7].map(k=>({a:22.5+45*k,p:ell(22.5+45*k,440,210),t:['tienda','comedor','colegio'][k%3],k}));
 const hue=[0,1,2,3,4,5,6,7].map(k=>({a:45*k,p:ell(45*k,455,226),k}));
 const HUM=[110,585],REC=[300,628],COM=[600,642];
 const COR=[CX,CY];
 /* caminos de camiones */
 const roads=cons.map((c,i)=>{const l=gLines.append('path').attr('d',path(COR,c.p,0)).attr('fill','none').attr('stroke',RD).attr('stroke-width',5).attr('stroke-linecap','round').attr('opacity',.38);return{l,i}});
 const roadsTop=cons.map((c,i)=>gLines.append('path').attr('d',path(COR,c.p,0)).attr('fill','none').attr('stroke','#0d0e10').attr('stroke-width',1.4).attr('stroke-dasharray','9 11').attr('class','flowing'));
 /* vínculos huerta → consumo */
 const links=[];hue.forEach(h=>[ (h.k+7)%8, h.k ].forEach(ci=>{const c=cons[ci];const d=path(h.p,c.p,.12);const l=gLines.append('path').attr('d',d).attr('fill','none').attr('stroke',LG).attr('stroke-width',2.6).attr('stroke-dasharray','5 6').attr('class','flowing').style('opacity',0);reg(l,[0,1,.25]);links.push({a:h.p,b:c.p,c:ctrl(h.p,c.p,.12)})}));
 /* ciclo de residuos */
 const loopPaths=[[COR,REC,.12],[REC,COM,.1],[COM,hue[2].p,.1]];loopPaths.forEach(([a,b,k])=>reg(gLines.append('path').attr('d',path(a,b,k)).attr('fill','none').attr('stroke',AMB).attr('stroke-width',2.8).attr('stroke-dasharray','6 6').attr('class','flowing'),[0,0,1]).style('opacity',0));
 reg(gLines.append('path').attr('d',path(COR,HUM,.12)).attr('fill','none').attr('stroke',AMB).attr('stroke-width',2.4).attr('stroke-dasharray','3 7').attr('opacity',.55),[1,.45,0]).style('opacity',1);
 /* nodos */
 const hum=node(HUM,'e-humedal',ORG,32,'Humedal La Vaca',[1,1,1],{ic:ORG});
 cons.forEach(c=>node(c.p,'e-'+c.t,c.t==='colegio'?AMB:PK,25,{tienda:'Tienda',comedor:'Comedor',colegio:'Colegio'}[c.t],[1,1,1]));
 const hs=hue.map(h=>node(h.p,'e-huerta',GRN2,25,'Huerta',[0,1,1],{ic:LG}));
 node(REC,'e-recicla',AMB,27,'Recicladores',[0,0,1],{ic:AMB});node(COM,'e-compost',RD,27,'Compostaje',[0,0,1],{ic:'#F09A84'});
 /* Corabastos */
 const ring=gNodes.append('circle').attr('cx',CX).attr('cy',CY).attr('r',70).attr('fill','none').attr('stroke',RD).attr('stroke-width',4);
 const cor=gNodes.append('g').attr('transform',`translate(${CX},${CY})`);cor.append('circle').attr('r',54).attr('fill','#2a1d0c').attr('stroke',ORG).attr('stroke-width',5);
 cor.append('use').attr('href','#e-central').attr('x',-27).attr('y',-34).attr('width',54).attr('height',54).style('color','#F2EFE8');cor.append('text').attr('y',108).attr('text-anchor','middle').attr('font-size',15).attr('font-weight',700).attr('fill','#F2EFE8').attr('font-family',FONT).attr('stroke','#111315').attr('stroke-width',4).attr('paint-order','stroke').text('Corabastos');
 /* móviles */
 const movers=[];
 const mk=(kind,a,b,k,speed,phase,st)=>{const g=gMov.append('g').style('opacity',0);
  if(kind==='camion'){g.append('circle').attr('r',15).attr('fill','#15171a').attr('stroke',RD).attr('stroke-width',2);g.append('use').attr('href','#e-camion').attr('x',-10).attr('y',-10).attr('width',20).attr('height',20).style('color','#F2EFE8')}
  else if(kind==='bolsa'){g.append('rect').attr('x',-6).attr('y',-6).attr('width',12).attr('height',12).attr('rx',3).attr('fill',AMB).attr('stroke','#0d0e10')}
  else{g.append('circle').attr('r',5).attr('fill',LG).attr('stroke','#0d0e10')}
  movers.push({g,a,b,c:ctrl(a,b,k),speed,phase,st,on:0})};
 cons.forEach((c,i)=>{mk('camion',COR,c.p,0,.09,i*.13,[1,i%2===0?1:0,0])});
 [0,.25,.5,.75].forEach(f=>mk('bolsa',COR,HUM,.12,.1,f,[1,f<.5?1:0,0]));
 links.forEach((l,i)=>{[0,.5].forEach(f=>{mk('caja',l.a,l.b,.12,.18,(i*.17+f)%1,[0,1,0])})});
 [[COR,REC,.12],[REC,COM,.1],[COM,hue[2].p,.1]].forEach(([a,b,k],j)=>[0,.5].forEach(f=>mk(j===2?'caja':'bolsa',a,b,k,.16,f,[0,0,1])));
 /* texto superior e indicadores */
 const badge=gTop.append('g');const bd=badge.append('rect').attr('rx',14).attr('height',28).attr('y',14);const bt=badge.append('text').attr('y',33).attr('font-size',13).attr('font-weight',700).attr('letter-spacing','.1em').attr('font-family',FONT).attr('fill','#0d0e10');
 const head=gTop.append('text').attr('x',CX).attr('y',60).attr('text-anchor','middle').attr('font-size',23).attr('font-weight',700).attr('fill','#fff').attr('font-family',FONT).style('display','none');
 const chipsG=gTop.append('g');
 function setChips(T){chipsG.selectAll('*').remove();const W=[320,330,320],gap=14;const tot=W.reduce((a,b)=>a+b)+gap*2;let x=CX-tot/2;
  T.chips.forEach(([c,t],i)=>{const g=chipsG.append('g').attr('transform',`translate(${x},698)`).style('opacity',0);g.append('rect').attr('width',W[i]).attr('height',30).attr('rx',15).attr('fill','#15171a').attr('stroke',c).attr('stroke-width',1.6);g.append('circle').attr('cx',16).attr('cy',15).attr('r',5).attr('fill',c);g.append('text').attr('x',30).attr('y',20).attr('font-size',13).attr('font-weight',600).attr('fill','#E7E3DA').attr('font-family',FONT).text(t);g.transition().delay(reduce?0:300+i*180).duration(400).style('opacity',1);x+=W[i]+gap})}
 /* reloj */
 let alive=true,raf,S=0,t0=performance.now();ctx.onExit(()=>{alive=false;cancelAnimationFrame(raf)});
 const tick=now=>{if(!alive)return;const t=(now-t0)/1000;
  movers.forEach(m=>{if(!m.on)return;const u=reduce?.5:((t*m.speed+m.phase)%1);const p=pt(m.a,m.b,m.c,u);m.g.attr('transform',`translate(${p[0]},${p[1]})`)});
  const k=(Math.sin(t*(S===0?4:1.6))+1)/2;ring.attr('r',(S===0?66:62)+k*(S===0?16:7)).attr('stroke',S===0?RD:ORG).attr('stroke-opacity',(S===0?.75:.5)-k*.4);
  raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);
 return sub=>{S=sub;const T=ESC_T[sub];
  items.forEach(({sel,st})=>{const o=st[sub];sel.transition().duration(reduce?0:600).delay(sub===1&&st[1]===1&&st[0]===0?200+Math.random()*500:0).style('opacity',o)});
  hs.forEach((g,i)=>{g.__inner.transition().duration(reduce?0:500).delay(sub>=1?250+i*110:0).attr('transform',`scale(${sub>=1?1:.2})`)});
  movers.forEach(m=>{const on=m.st[sub];m.on=on;m.g.transition().duration(reduce?0:500).style('opacity',on?1:0)});
  roads.forEach(({l,i})=>{const keep=sub===0||i%2===0;l.transition().duration(500).attr('opacity',sub===0?.4:keep?.22:.06).attr('stroke-width',sub===0?6:keep?4:2)});
  hum.__inner.select('circle').transition().duration(700).attr('stroke',sub===2?TEAL:sub===1?'#D8A24A':RD);hum.__inner.select('use').transition().duration(700).style('color',sub===2?TEAL:ORG);
  
  bd.attr('fill',T.col);bt.text(T.badge);const w=bt.node().getComputedTextLength?bt.node().getComputedTextLength():160;bt.attr('x',14);bd.attr('width',w+28);badge.attr('transform',`translate(${CX-(w+28)/2},-2)`);
  head.style('display',null).text(T.head);setChips(T)}}

/* ===== Escena animada: Fondo Común de Abastecimiento ===== */
const FON_T=[
 {badge:'1 · PRESENTAN',head:'Tenderos, comedores y huertas presentan la propuesta',col:'#CF7ABB'},
 {badge:'2 · DISCUTEN',head:'Productores, transportadores, comerciantes y vecinos discuten las condiciones',col:'#8EBF4C'},
 {badge:'3 · DEFINEN',head:'El núcleo de abastecimiento define aportes, compras y reglas',col:'#F2B53A'},
 {badge:'4 · CONTROLAN',head:'Administración rotativa, informes públicos y vocerías revocables',col:'#4EAECF'}];
function fondoView(ctx){
 const el=ctx.el;const svg=d3.select(el).append('svg').attr('class','full').attr('viewBox','0 0 1200 740').attr('preserveAspectRatio','xMidYMid meet');
 svg.append('defs').html(ESC_SYM);
 const FONT='Instrument Sans,sans-serif',CX=600,CY=345,PK='#CF7ABB',GN='#8EBF4C',AM='#F2B53A',TL='#4EAECF',PU='#9382E0',RD='#E0623F',OR='#DE9F50';
 const gL=svg.append('g'),gM=svg.append('g'),gN=svg.append('g'),gT=svg.append('g');
 const items=[];const reg=(s,f)=>{items.push({s,f});return s};
 const ctrl=(a,b,k)=>[(a[0]+b[0])/2-(b[1]-a[1])*k,(a[1]+b[1])/2+(b[0]-a[0])*k];
 const pt=(a,b,c,t)=>{const u=1-t;return[u*u*a[0]+2*u*t*c[0]+t*t*b[0],u*u*a[1]+2*u*t*c[1]+t*t*b[1]]};
 const node=(p,id,col,r,label,f,sym)=>{const g=gN.append('g').attr('transform',`translate(${p[0]},${p[1]})`);g.append('circle').attr('r',r).attr('fill','#15171a').attr('stroke',col).attr('stroke-width',2.8);
  g.append('use').attr('href',id).attr('x',-r*.58).attr('y',-r*.58).attr('width',r*1.16).attr('height',r*1.16).style('color','#F2EFE8');
  g.append('text').attr('y',r+19).attr('text-anchor','middle').attr('font-size',14).attr('font-weight',700).attr('fill','#fff').attr('font-family',FONT).text(label);reg(g,f);return g};
 const pill=(x,y,w,txt,col,f)=>{const g=gN.append('g').attr('transform',`translate(${x},${y})`);g.append('rect').attr('x',-w/2).attr('y',-19).attr('width',w).attr('height',38).attr('rx',19).attr('fill','#15171a').attr('stroke',col).attr('stroke-width',2);g.append('text').attr('text-anchor','middle').attr('y',5).attr('font-size',14).attr('font-weight',600).attr('fill','#F2EFE8').attr('font-family',FONT).text(txt);reg(g,f);return g};
 const HUB=[CX,CY];
 const L=[[170,220,'#e-tienda','Tenderos',PK],[170,370,'#e-comedor','Comedores',PK],[170,520,'#e-huerta','Huertas',GN]];
 const Rg=[[1030,190,'#e-huerta','Productores',GN],[1030,310,'#e-camion','Transportadores',RD],[1030,430,'#e-central','Comerciantes',OR],[1030,550,'#i-hog','Vecinos',PU]];
 const movers=[];
 const flow=(a,b,col,st,k,n=2,sym)=>{const c=ctrl(a,b,k);gL.append('path').attr('d',`M${a[0]},${a[1]}Q${c[0]},${c[1]} ${b[0]},${b[1]}`).attr('fill','none').attr('stroke',col).attr('stroke-width',2.6).attr('stroke-dasharray','6 6').attr('class','flowing').style('opacity',0).datum(st).each(function(){reg(d3.select(this),st)});
  for(let i=0;i<n;i++){const g=gM.append('g').style('opacity',0);g.append('circle').attr('r',11).attr('fill','#15171a').attr('stroke',col).attr('stroke-width',2);g.append('use').attr('href',sym).attr('x',-7).attr('y',-7).attr('width',14).attr('height',14).style('color',col);movers.push({g,a,b,c,ph:i/n,st,sp:.2})}};
 L.forEach(([x,y,id,l,c])=>{flow([x+34,y],[CX-110,CY+(y-CY)*.2],c,[1,0,0,0],.06,2,'#i-doc')});
 Rg.forEach(([x,y,id,l,c])=>{flow([x-32,y],[CX+110,CY+(y-CY)*.2],c,[0,1,0,0],-.06,1,'#i-grupo')});
 L.forEach(([x,y,id,l,c])=>node([x,y],id,c,32,l,[1,.6,.4,.4]));Rg.forEach(([x,y,id,l,c])=>node([x,y],id,c,28,l,[.5,1,.5,.4]));
 /* hub */
 const ring=gN.append('circle').attr('cx',CX).attr('cy',CY).attr('r',100).attr('fill','none').attr('stroke',AM).attr('stroke-width',3);
 const hub=gN.append('g').attr('transform',`translate(${CX},${CY})`);hub.append('circle').attr('r',92).attr('fill','#2a210a').attr('stroke',AM).attr('stroke-width',5);
 hub.append('use').attr('href','#i-moneda').attr('x',-26).attr('y',-52).attr('width',52).attr('height',52).style('color',AM);
 [['Fondo Común',16],['de Abastecimiento',14]].forEach(([t,fs],i)=>hub.append('text').attr('y',22+i*20).attr('text-anchor','middle').attr('font-size',fs).attr('font-weight',700).attr('fill','#fff').attr('font-family',FONT).text(t));
 /* núcleo, controles, institucional */
 const nuc=pill(CX,610,520,'Núcleo de abastecimiento: define aportes, compras y reglas',AM,[0,0,1,1]);
 const nl=gL.append('path').attr('d',`M${CX},591L${CX},${CY+96}`).attr('stroke',AM).attr('stroke-width',3).attr('stroke-dasharray','6 6').attr('class','flowing');reg(nl,[0,0,1,1]);nl.style('opacity',0);
 ['Administración rotativa','Informes públicos','Vocerías revocables'].forEach((t,i)=>pill(CX-310+i*310,690,260,t,TL,[0,0,0,1]));
 const jac=pill(CX,118,640,'Se articula con: Juntas de Acción Comunal · JAL · presupuestos participativos',PU,[.4,.4,.6,1]);
 const jl=gL.append('path').attr('d',`M${CX},138L${CX},${CY-100}`).attr('stroke',PU).attr('stroke-width',2.2).attr('stroke-dasharray','4 6').attr('class','flowing');reg(jl,[.3,.3,.6,1]);jl.style('opacity',.3);
 gT.append('text').attr('x',CX).attr('y',92).attr('text-anchor','middle').attr('font-size',11.5).attr('font-weight',700).attr('letter-spacing','.08em').attr('fill','#8C877E').attr('font-family',FONT).text('ES UNA PROPUESTA: SE IMPLEMENTA CON ACUERDOS CON LAS AUTORIDADES COMPETENTES');
 const badge=gT.append('g'),bd=badge.append('rect').attr('rx',14).attr('height',28),bt=badge.append('text').attr('y',19).attr('x',14).attr('font-size',13).attr('font-weight',700).attr('letter-spacing','.1em').attr('font-family',FONT).attr('fill','#0d0e10');
 const head=gT.append('text').attr('x',CX).attr('y',58).attr('text-anchor','middle').attr('font-size',21).attr('font-weight',700).attr('fill','#fff').attr('font-family',FONT);
 let alive=true,raf,S=0,t0=performance.now();ctx.onExit(()=>{alive=false;cancelAnimationFrame(raf)});
 const tick=now=>{if(!alive)return;const t=(now-t0)/1000;
  movers.forEach(m=>{if(!m.st[S])return;const u=reduce?.5:((t*m.sp+m.ph)%1),p=pt(m.a,m.b,m.c,u);m.g.attr('transform',`translate(${p[0]},${p[1]})`)});
  const k=(Math.sin(t*(S===2?4:1.6))+1)/2;ring.attr('r',98+k*(S===2?18:8)).attr('stroke-opacity',.7-k*.5);raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);
 return sub=>{S=sub;const T=FON_T[sub];items.forEach(({s,f})=>s.transition().duration(reduce?0:500).style('opacity',f[sub]));
  movers.forEach(m=>m.g.transition().duration(reduce?0:400).style('opacity',m.st[sub]?1:0));
  bd.attr('fill',T.col);bt.text(T.badge);const w=(bt.node().getComputedTextLength?bt.node().getComputedTextLength():120)+28;bd.attr('width',w).attr('y',0);bt.attr('y',19);badge.attr('transform',`translate(${CX-w/2},8)`);head.text(T.head)}}

/* ===== Comparación de dos redes: centralizada (hoy) vs distribuida (propuesta) ===== */
function redesView(ctx){
 const el=ctx.el;const svg=d3.select(el).append('svg').attr('class','full').attr('viewBox','0 0 1200 740').attr('preserveAspectRatio','xMidYMid meet');
 svg.append('defs').html(ESC_SYM);
 const FONT='Instrument Sans,sans-serif',RD='#E0623F',GN='#8EBF4C',LG='#B6E27A',OR='#DE9F50',PK='#CF7ABB',AM='#F2B53A';
 const COL={tienda:PK,comedor:PK,colegio:AM,huerta:GN};
  /* mismos 20 actores en las dos redes; cambia solo cómo se conectan */
  const NT=['huerta','tienda','huerta','comedor','colegio'];
  const base=Array.from({length:20},(_,i)=>({id:i,t:NT[i%5]}));
  const nodesL=base.map((n,i)=>{const r=118+Math.sqrt((i+.5)/20)*128,a=i*137.508*Math.PI/180;return{...n,x:Math.cos(a)*r*1.03,y:Math.sin(a)*r*.8}});
  /* derecha: malla sin centro (cada actor con 3-4 vecinos), Corabastos es un nodo más */
  const allR=Array.from({length:21},(_,i)=>{const r=Math.sqrt((i+.5)/21)*235,a=(i*137.508+40)*Math.PI/180;return{id:i,t:'x',x:Math.cos(a)*r*1.12,y:Math.sin(a)*r*.95}});
  const CORR=allR[13];{let k=0;allR.forEach(n=>{if(n!==CORR){n.t=NT[k%5];k++}else n.t='cor'})}
  const nodesR=allR.filter(n=>n!==CORR);
  const lk=[];{const del=d3.Delaunay.from(allR,n=>n.x,n=>n.y),T=del.triangles,seen=new Set(),E=[];
   for(let i=0;i<T.length;i+=3)[[0,1],[1,2],[2,0]].forEach(([u,v])=>{const a=Math.min(T[i+u],T[i+v]),b=Math.max(T[i+u],T[i+v]),k=a+'_'+b;if(!seen.has(k)){seen.add(k);E.push([a,b,Math.hypot(allR[a].x-allR[b].x,allR[a].y-allR[b].y)])}});
   const med=E.map(e=>e[2]).sort((x,y)=>x-y)[Math.floor(E.length/2)];const deg=allR.map(()=>0);E.forEach(e=>{deg[e[0]]++;deg[e[1]]++});
   E.sort((x,y)=>y[2]-x[2]).forEach(e=>{if((e[2]>med*1.7||(deg[e[0]]>3&&deg[e[1]]>3))&&deg[e[0]]>2&&deg[e[1]]>2){deg[e[0]]--;deg[e[1]]--;e.dead=1}});
   E.filter(e=>!e.dead).forEach(([a,b])=>lk.push({source:allR[a],target:allR[b],kind:(allR[a]===CORR||allR[b]===CORR)?'c':'l'}))}
  {const sim=d3.forceSimulation(allR).force('link',d3.forceLink(lk).distance(88).strength(.5)).force('charge',d3.forceManyBody().strength(-300)).force('x',d3.forceX(0).strength(.06)).force('y',d3.forceY(0).strength(.07)).force('col',d3.forceCollide(34)).stop();
   for(let i=0;i<400;i++)sim.tick();allR.forEach(n=>{n.x=Math.max(-262,Math.min(262,n.x));n.y=Math.max(-232,Math.min(232,n.y))})}
  const consL=nodesL.filter(n=>n.t!=='huerta');
  const PANEL=[[300,405],[900,405]];
  const gP=PANEL.map(([x,y])=>svg.append('g').attr('transform',`translate(${x},${y})`));
  const L=gP[0],R=gP[1];
  const sty=(p,col,w,op,dash)=>p.attr('stroke',col).attr('stroke-width',w).attr('stroke-opacity',op).attr('fill','none').attr('stroke-linecap','round').attr('stroke-dasharray',dash||null);
  const line=(g,a,b,col,w,op,dash)=>sty(g.append('line').attr('x1',a.x).attr('y1',a.y).attr('x2',b.x).attr('y2',b.y),col,w,op,dash);
  const COR={x:0,y:0};
  const spokes=consL.map(n=>line(L.insert('g',':first-child'),COR,n,RD,2.4,.55));
  const rl=[],rb=[],rc=[];lk.forEach(l=>{const g=R.insert('g',':first-child');(l.kind==='c'?rc:rl).push(l.kind==='c'?line(g,l.source,l.target,OR,3,.9):line(g,l.source,l.target,LG,2.2,.8))});
  const drawN=(g,arr)=>arr.map(n=>{const k=g.append('g').attr('transform',`translate(${n.x},${n.y})`);const r=n.t==='huerta'?18:16;
   k.append('circle').attr('r',r).attr('fill','#15171a').attr('stroke',COL[n.t]).attr('stroke-width',2.4);
   k.append('use').attr('href','#e-'+n.t).attr('x',-r*.6).attr('y',-r*.6).attr('width',r*1.2).attr('height',r*1.2).style('color',n.t==='huerta'?LG:'#F2EFE8');return k});
  const nl=drawN(L,nodesL),nr=drawN(R,nodesR);nl.forEach((k,i)=>{if(nodesL[i].t==='huerta')k.attr('opacity',.55)});
  const hubs=PANEL.map((_,i)=>{const g=gP[i].append('g');if(i)g.attr('transform',`translate(${CORR.x},${CORR.y})`);g.append('circle').attr('r',i?24:46).attr('fill','#2a1d0c').attr('stroke',OR).attr('stroke-width',i?3:5);
   const s=i?22:40;g.append('use').attr('href','#e-central').attr('x',-s/2).attr('y',-s/2-(i?0:6)).attr('width',s).attr('height',s).style('color','#F2EFE8');
   g.append('text').attr('y',i?-32:62).attr('text-anchor','middle').attr('font-size',i?13:14).attr('font-weight',700).attr('fill','#F2EFE8').attr('font-family',FONT).attr('stroke','#111315').attr('stroke-width',4).attr('paint-order','stroke').text('Corabastos');return g});
  const ringL=L.insert('circle',':first-child').attr('r',60).attr('fill','none').attr('stroke',RD).attr('stroke-width',3);
  const P=[];const mover=(g,a,b,col,sp,ph,showOn)=>{const c=g.append('circle').attr('r',4.5).attr('fill',col).attr('stroke','#0d0e10');P.push({c,a,b,sp,ph,showOn});return c};
  consL.forEach((n,i)=>{const d=Math.hypot(n.x,n.y),o={x:n.x/d*48,y:n.y/d*48};[0,.5].forEach(f=>mover(L,o,n,RD,.16,(i*.09+f)%1,0))});
  lk.forEach((l,i)=>{const col=l.kind==='c'?OR:LG;[0,.5].forEach(f=>mover(R,l.source,l.target,col,.18,(i*.137+f)%1,1))});
 /* títulos */
 const head=(g,x,txt,col)=>{const w=txt.length*9.2+32;const b=svg.append('g').attr('transform',`translate(${x-w/2},58)`);b.append('rect').attr('width',w).attr('height',32).attr('rx',16).attr('fill',col);b.append('text').attr('x',w/2).attr('y',21).attr('text-anchor','middle').attr('font-size',13.5).attr('font-weight',700).attr('letter-spacing','.08em').attr('fill','#0d0e10').attr('font-family',FONT).text(txt);return b};
 const hL=head(L,300,'HOY · RED CENTRALIZADA',RD),hR=head(R,900,'PROPUESTA · RED DISTRIBUIDA',GN);
 const cap=(x,l1,l2,col)=>{const g=svg.append('g');[[l1,16,700,'#fff'],[l2,13,500,'#9a958c']].forEach(([t,fs,fw,c],i)=>g.append('text').attr('x',x).attr('y',655+i*22).attr('text-anchor','middle').attr('font-size',fs).attr('font-weight',fw).attr('fill',c).attr('font-family',FONT).text(t));return g};
 const cL=cap(300,'Todo converge en un solo nodo','Camiones, residuos y decisiones pasan por Corabastos'),cR=cap(900,'Una red sin centro: cada actor con varios vecinos','Corabastos es un nodo más del circuito; ningún actor concentra las conexiones');
 svg.append('path').attr('d','M600,110V620').attr('stroke','#2b2d33').attr('stroke-width',2).attr('stroke-dasharray','6 6');
 /* leyenda */
 const lg=svg.append('g').attr('transform','translate(0,712)');[['tienda','Tienda',PK],['comedor','Comedor',PK],['colegio','Colegio',AM],['huerta','Huerta',GN]].forEach(([id,t,c],i)=>{const x=420+i*120;lg.append('use').attr('href','#e-'+id).attr('x',x).attr('y',-10).attr('width',20).attr('height',20).style('color',c);lg.append('text').attr('x',x+26).attr('y',5).attr('font-size',13).attr('font-weight',600).attr('fill','#B8B3A8').attr('font-family',FONT).text(t)});
 let alive=true,raf,S=0,t0=performance.now();ctx.onExit(()=>{alive=false;cancelAnimationFrame(raf)});
 const tick=now=>{if(!alive)return;const t=(now-t0)/1000;
  P.forEach(p=>{const on=p.showOn===0?true:S>=1;if(!on)return;const u=reduce?.5:((t*p.sp+p.ph)%1);p.c.attr('cx',p.a.x+(p.b.x-p.a.x)*u).attr('cy',p.a.y+(p.b.y-p.a.y)*u)});
  const k=(Math.sin(t*3.2)+1)/2;ringL.attr('r',56+k*16).attr('stroke-opacity',.7-k*.5);raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);
 const T=(s,o,d=600,delay=0)=>s.transition().delay(reduce?0:delay).duration(reduce?0:d).style('opacity',o);
 return sub=>{S=sub;const on=sub>=1;
  T(R,on?1:.28,500);T(R.selectAll('line'),on?1:0,600);
  rl.forEach((l,i)=>T(l,on?1:0,500,on?500+i*40:0));rb.forEach((l,i)=>T(l,on?1:0,600,on?1100+i*150:0));rc.forEach(l=>T(l,on?1:0,500,on?1500:0));
  nr.forEach((k,i)=>{k.transition().delay(reduce?0:(on?150+i*40:0)).duration(reduce?0:450).style('opacity',on?1:.9)});
  P.forEach(p=>p.c.transition().duration(300).style('opacity',(p.showOn===0||on)?1:0));
  T(L,on?.4:1,600);T(hL,on?.45:1,400);T(cL,on?.45:1,400);T(hR,on?1:.35,500);T(cR,on?1:.0,600,on?800:0);T(hubs[1],1,10);
  ringL.attr('display',on?'none':null)}}

/* ===== Escena animada: seguridad vs soberanía alimentaria y reducción de la dependencia ===== */
const SOB_SYM=`<symbol id="s-check" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></symbol>
<symbol id="s-info" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M4 20V11M10 20V4M16 20v-7M22 20H2"/></symbol>
<symbol id="s-decide" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 14h17v6.5h-17zM7.5 14 6 9.5h12L16.5 14M12 3.5v6M9 6.5l3 3 3-3"/></symbol>
<symbol id="s-hogar" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 11 12 3.5 21 11M5.5 9.5V20.5h13V9.5M10 20.5v-5h4v5"/></symbol>
<symbol id="s-grupo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="8.5" cy="8" r="3"/><circle cx="16.5" cy="9" r="2.4"/><path d="M2.5 20c0-3.5 2.7-6 6-6s6 2.5 6 6M15 14.3c.5-.2 1-.3 1.5-.3 2.8 0 5 2 5 5"/></symbol>
<symbol id="s-precio" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 12.5V4h8.5l9 9-8.5 8.5zM7.5 8.5h.01"/></symbol>`;
const SOB_T=[
 {badge:'SEGURIDAD ALIMENTARIA',col:'#4EAECF',head:'Acceso a alimentos suficientes, inocuos y nutritivos'},
 {badge:'SOBERANÍA ALIMENTARIA',col:'#8EBF4C',head:'Capacidad de decidir cómo se producen y se distribuyen'},
 {badge:'EL CAMINO',col:'#F2B53A',head:'Reducir la dependencia de un único nodo, sin eliminar la central'}];
function soberaniaView(ctx){
 const el=ctx.el;const svg=d3.select(el).append('svg').attr('class','full').attr('viewBox','0 0 1200 740').attr('preserveAspectRatio','xMidYMid meet');
 svg.append('defs').html(ESC_SYM+SOB_SYM);
 const FONT='Instrument Sans,sans-serif',OR='#DE9F50',GN='#8EBF4C',LG='#B6E27A',PK='#CF7ABB',AM='#F2B53A',TL='#4EAECF',RD='#E0623F',PU='#9382E0';
 const G=[0,1,2].map(()=>svg.append('g').style('opacity',0));const gHead=svg.append('g');
 const P=[];const mover=(g,a,b,col,sp,ph,sub,k=0)=>{const c=g.append('circle').attr('r',5).attr('fill',col).attr('stroke','#0d0e10');P.push({c,a,b,sp,ph,sub,k})};
 const ctrl=(a,b,k)=>[(a[0]+b[0])/2-(b[1]-a[1])*k,(a[1]+b[1])/2+(b[0]-a[0])*k];
 const link=(g,a,b,col,w=2.4,op=.8,dash=null,k=0)=>{const c=ctrl(a,b,k);return g.insert('path',':first-child').attr('d',`M${a[0]},${a[1]}Q${c[0]},${c[1]} ${b[0]},${b[1]}`).attr('fill','none').attr('stroke',col).attr('stroke-width',w).attr('stroke-opacity',op).attr('stroke-dasharray',dash).attr('stroke-linecap','round')};
 const node=(g,p,id,col,r,label,o={})=>{const n=g.append('g').attr('transform',`translate(${p[0]},${p[1]})`);n.append('circle').attr('r',r).attr('fill',o.fill||'#15171a').attr('stroke',col).attr('stroke-width',o.sw||2.6);
  n.append('use').attr('href',id).attr('x',-r*.58).attr('y',-r*.58).attr('width',r*1.16).attr('height',r*1.16).style('color',o.ic||'#F2EFE8');
  if(label)n.append('text').attr('y',r+(o.dy||18)).attr('text-anchor','middle').attr('font-size',o.fs||13).attr('font-weight',600).attr('fill',o.tc||col).attr('font-family',FONT).text(label);return n};
 const pill=(g,x,y,w,txt,col,icon,fs=14)=>{const n=g.append('g').attr('transform',`translate(${x},${y})`);n.append('rect').attr('x',-w/2).attr('y',-21).attr('width',w).attr('height',42).attr('rx',21).attr('fill','#15171a').attr('stroke',col).attr('stroke-width',2);
  let tx=0,anchor='middle';if(icon){n.append('use').attr('href',icon).attr('x',-w/2+14).attr('y',-11).attr('width',22).attr('height',22).style('color',col);tx=-w/2+46;anchor='start'}
  n.append('text').attr('x',tx).attr('y',5).attr('text-anchor',anchor).attr('font-size',fs).attr('font-weight',600).attr('fill','#F2EFE8').attr('font-family',FONT).text(txt);return n};
 /* ---- sub 0: seguridad ---- */
 {const g=G[0];const Y=360,X=[170,430,720,1010];
  const ch=[[X[0],Y],[X[1],Y],[X[2],Y],[X[3],Y]];
  for(let i=0;i<3;i++){link(g,ch[i],ch[i+1],TL,3,.7,'7 7');[0,.5].forEach(f=>mover(g,ch[i],ch[i+1],TL,.16,(i*.3+f)%1,0))}
  node(g,ch[0],'#e-huerta',GN,34,'Productores',{ic:LG});node(g,ch[1],'#e-central',OR,46,'Corabastos');node(g,ch[2],'#e-tienda',PK,34,'Tienda de barrio');node(g,ch[3],'#s-hogar',TL,38,'Hogar');
  const ck=g.append('g').attr('transform',`translate(${X[3]},235)`);ck.append('circle').attr('r',26).attr('fill','#10281f').attr('stroke',GN).attr('stroke-width',3);ck.append('use').attr('href','#s-check').attr('x',-14).attr('y',-14).attr('width',28).attr('height',28).style('color',LG);
  g.append('text').attr('x',X[3]).attr('y',285).attr('text-anchor','middle').attr('font-size',13).attr('font-weight',700).attr('fill',LG).attr('font-family',FONT).text('Hay acceso');
  const dc=g.append('g').attr('transform',`translate(${X[1]},235)`);dc.append('circle').attr('r',26).attr('fill','#2a210a').attr('stroke',AM).attr('stroke-width',3);dc.append('use').attr('href','#s-decide').attr('x',-14).attr('y',-14).attr('width',28).attr('height',28).style('color',AM);
  g.append('text').attr('x',X[1]).attr('y',285).attr('text-anchor','middle').attr('font-size',13).attr('font-weight',700).attr('fill',AM).attr('font-family',FONT).text('Un solo nodo decide');
  pill(g,360,560,560,'Responde: ¿llega alimento suficiente, inocuo y nutritivo?',TL,'#s-check');
  pill(g,840,630,620,'No responde: ¿quién decide cómo se produce y se distribuye?',RD,null);
  g.append('text').attr('x',840-300+22).attr('y',636).attr('font-size',20).attr('font-weight',800).attr('fill',RD).attr('font-family',FONT).text('?');}
 /* ---- sub 1: soberanía ---- */
 {const g=G[1];const N={H1:[250,330],H2:[520,250],H3:[400,490],T1:[390,350],C1:[690,370],K1:[560,470],T2:[800,250],M2:[760,500],G1:[230,490],G2:[900,400],COR:[1020,290]};
  const E=[['H1','T1'],['H1','G1'],['H1','H3'],['H2','T1'],['H2','T2'],['H2','C1'],['H3','T1'],['H3','K1'],['H3','G1'],['C1','K1'],['C1','T2'],['C1','M2'],['K1','M2'],['T2','COR'],['M2','G2'],['G2','COR'],['T2','G2']];
  E.forEach(([a,b],i)=>{const hot=a==='COR'||b==='COR';link(g,N[a],N[b],hot?OR:LG,2.4,.75,hot?'5 5':null);[0,.5].forEach(f=>mover(g,N[a],N[b],hot?OR:LG,.16,(i*.11+f)%1,1))});
  [['H1','#e-huerta',GN,'Huerta'],['H2','#e-huerta',GN,'Huerta'],['H3','#e-huerta',GN,'Huerta'],['T1','#e-tienda',PK,'Tienda'],['T2','#e-tienda',PK,'Tienda'],['C1','#e-comedor',PK,'Comedor'],['M2','#e-comedor',PK,'Comedor'],['K1','#e-colegio',AM,'Colegio'],['G1','#s-hogar',TL,'Hogar'],['G2','#s-hogar',TL,'Hogar']].forEach(([k,id,c,l])=>node(g,N[k],id,c,25,l,{ic:id==='#e-huerta'?LG:'#F2EFE8',fs:12}));
  node(g,N.COR,'#e-central',OR,32,'Corabastos: parte del circuito',{fs:12.5});
  const D=[[300,150,'#e-huerta',GN,'Qué se produce'],[600,150,'#e-camion',RD,'Cómo se distribuye'],[900,150,'#s-precio',AM,'Con qué condiciones e información']];
  D.forEach(([x,y,id,c,t],i)=>{const b=g.append('g').attr('transform',`translate(${x},${y})`);b.append('circle').attr('r',27).attr('fill','#15171a').attr('stroke',c).attr('stroke-width',3);b.append('use').attr('href',id).attr('x',-15).attr('y',-15).attr('width',30).attr('height',30).style('color',c);b.append('text').attr('y',50).attr('text-anchor','middle').attr('font-size',14).attr('font-weight',700).attr('fill','#fff').attr('font-family',FONT).text(t);
   link(g,[x,y+66],[[N.H1,N.H2,N.C1][i][0],[N.H1,N.H2,N.C1][i][1]-28],c,2,.6,'4 5',0)});
  pill(g,600,620,760,'Autogobierno sobre flujos concretos, junto a las instituciones',GN,'#s-grupo');
  g.__rip=N.H2}
 /* ---- sub 2: dependencia ---- */
 {const g=G[2];const X0=170,W=860;
  const bar=(y,label,icon,col)=>{g.append('text').attr('x',X0).attr('y',y-18).attr('font-size',15).attr('font-weight',700).attr('fill','#fff').attr('font-family',FONT).text(label);g.append('rect').attr('x',X0).attr('y',y).attr('width',W).attr('height',54).attr('rx',12).attr('fill','#1b1d21').attr('stroke','#2b2d33')};
  bar(210,'Hoy: el abasto local depende de un único nodo');
  g.append('rect').attr('x',X0).attr('y',210).attr('width',W).attr('height',54).attr('rx',12).attr('fill',OR).attr('fill-opacity',.85);
  g.append('use').attr('href','#e-central').attr('x',X0+16).attr('y',222).attr('width',30).attr('height',30).style('color','#2a1d0c');g.append('text').attr('x',X0+56).attr('y',244).attr('font-size',15).attr('font-weight',700).attr('fill','#2a1d0c').attr('font-family',FONT).text('Corabastos');
  bar(350,'Con la propuesta: una parte por circuitos cortos, el resto sigue');
  const wl=W*.5;
  const orange=g.append('rect').attr('x',X0+wl).attr('y',350).attr('width',W-wl).attr('height',54).attr('fill',OR).attr('fill-opacity',.85);
  const green=g.append('rect').attr('class','sob-green').attr('x',X0).attr('y',350).attr('width',wl).attr('height',54).attr('rx',12).attr('fill',GN);
  g.append('use').attr('href','#e-huerta').attr('x',X0+14).attr('y',362).attr('width',30).attr('height',30).style('color','#10200a');g.append('text').attr('x',X0+52).attr('y',384).attr('font-size',14).attr('font-weight',700).attr('fill','#10200a').attr('font-family',FONT).text('Circuitos cortos');
  g.append('use').attr('href','#e-central').attr('x',X0+wl+16).attr('y',362).attr('width',30).attr('height',30).style('color','#2a1d0c');g.append('text').attr('x',X0+wl+56).attr('y',384).attr('font-size',15).attr('font-weight',700).attr('fill','#2a1d0c').attr('font-family',FONT).text('Corabastos sigue siendo parte del abasto');
  g.append('text').attr('x',X0+W).attr('y',432).attr('text-anchor','end').attr('font-size',11.5).attr('fill','#77736b').attr('font-family',FONT).text('Ilustrativo: la proporción no es una meta ni un dato');
  const M=[[300,'#e-tienda',PK,'Compras locales organizadas'],[600,'#s-grupo',GN,'Acuerdos entre productores y consumidores'],[900,'#s-info',TL,'Información de precios y volúmenes']];
  M.forEach(([x,id,c,t],i)=>{const a=[x,560];const b=[X0+wl/2+i*(wl/4)-wl/4,410];link(g,[x,530],b,c,2.4,.8,'6 6',i===1?0:(i===0?-.06:.08));mover(g,[x,530],b,c,.2,i*.3,2);mover(g,[x,530],b,c,.2,i*.3+.5,2);
   const n=g.append('g').attr('transform',`translate(${x},${560})`);n.append('circle').attr('r',30).attr('fill','#15171a').attr('stroke',c).attr('stroke-width',3);n.append('use').attr('href',id).attr('x',-17).attr('y',-17).attr('width',34).attr('height',34).style('color',c);n.append('text').attr('y',54).attr('text-anchor','middle').attr('font-size',13.5).attr('font-weight',700).attr('fill','#fff').attr('font-family',FONT).text(t)});
  pill(g,600,690,900,'Las huertas no reemplazan el volumen ni la variedad de Corabastos',OR,'#e-central',14)}
 /* encabezado */
 const bd=gHead.append('rect').attr('rx',14).attr('height',28).attr('y',12),bt=gHead.append('text').attr('y',31).attr('font-size',13).attr('font-weight',700).attr('letter-spacing','.1em').attr('fill','#0d0e10').attr('font-family',FONT);
 const head=gHead.append('text').attr('x',600).attr('y',68).attr('text-anchor','middle').attr('font-size',22).attr('font-weight',700).attr('fill','#fff').attr('font-family',FONT);
 let alive=true,raf,S=0,t0=performance.now();ctx.onExit(()=>{alive=false;cancelAnimationFrame(raf)});
 const ripples=[0,1,2].map(i=>G[1].append('circle').attr('fill','none').attr('stroke',GN).attr('stroke-width',2.5));
 const tick=now=>{if(!alive)return;const t=(now-t0)/1000;
  P.forEach(p=>{if(p.sub!==S)return;const u=reduce?.5:((t*p.sp+p.ph)%1);p.c.attr('cx',p.a[0]+(p.b[0]-p.a[0])*u).attr('cy',p.a[1]+(p.b[1]-p.a[1])*u)});
  if(S===1){const c=G[1].__rip;ripples.forEach((r,i)=>{const u=((t*.45+i/3)%1);r.attr('cx',c[0]).attr('cy',c[1]).attr('r',26+u*190).attr('stroke-opacity',(1-u)*.5)})}
  raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick);
 return sub=>{S=sub;const T=SOB_T[sub];G.forEach((g,i)=>g.transition().duration(reduce?0:500).delay(i===sub&&!reduce?250:0).style('opacity',i===sub?1:0));
  P.forEach(p=>p.c.style('opacity',p.sub===sub?1:0));ripples.forEach(r=>r.style('display',sub===1?null:'none'));
  bd.attr('fill',T.col);bt.text(T.badge).attr('x',14);const w=(bt.node().getComputedTextLength?bt.node().getComputedTextLength():200)+28;bd.attr('width',w);bt.attr('x',14);gHead.select('rect').attr('x',600-w/2);bt.attr('x',600-w/2+14);head.text(T.head);
  if(sub===2){const gr=G[2].select('.sob-green');gr.attr('width',0).transition().delay(reduce?0:600).duration(reduce?0:1400).attr("width",860*.5)}}}

/* ===== Escenas con iconos: conceptos, etapas de decisión y recursos comunes ===== */
const CON_SYM=`<symbol id="c-persona" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="8" r="4"/><path d="M4.5 21c0-4 3.4-6.5 7.5-6.5s7.5 2.5 7.5 6.5"/></symbol>
<symbol id="c-mega" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3 10v4h3.5L14 18.5v-13L6.5 10zM17.5 9a4 4 0 0 1 0 6"/></symbol>
<symbol id="c-charla" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M3.5 4.5h12v8.5H9l-4 3.5V13H3.5zM18 9h2.5v8.5h-1v3l-3-3H11"/></symbol>
<symbol id="c-mazo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M13 3.5l4.5 4.5-5 5L8 8.5zM10.5 11 4 17.5M3.5 21h10"/></symbol>
<symbol id="c-lupa" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="10.5" cy="10.5" r="6.5"/><path d="M15.5 15.5 21 21"/></symbol>
<symbol id="c-reloj" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h12M6 21h12M7.5 3v3.5l4.5 5.5-4.5 5.5V21M16.5 3v3.5L12 12l4.5 5.5V21"/></symbol>
<symbol id="c-doc" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 3h8l4 4v14H6zM14 3v4h4M9 12h6M9 16h6"/></symbol>
<symbol id="c-templo" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M2.5 10 12 3.5 21.5 10zM3.5 21h17M5.5 10.5V18M10 10.5V18M14 10.5V18M18.5 10.5V18"/></symbol>
<symbol id="c-monedas" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><ellipse cx="12" cy="6.5" rx="8" ry="3"/><path d="M4 6.5v11c0 1.7 3.6 3 8 3s8-1.3 8-3v-11M4 12c0 1.7 3.6 3 8 3s8-1.3 8-3"/></symbol>`;
/* utilidades comunes de las tres escenas */
function conceptKit(ctx,vh){
 const el=ctx.el;const svg=d3.select(el).append('svg').attr('class','full').attr('viewBox',`0 0 1200 ${vh||740}`).attr('preserveAspectRatio','xMidYMid meet');
 svg.append('defs').html(ESC_SYM+SOB_SYM+CON_SYM);
 const FONT='Instrument Sans,sans-serif';const P=[];
 const kit={svg,FONT,P,timers:[]};
 kit.ctrl=(a,b,k)=>[(a[0]+b[0])/2-(b[1]-a[1])*k,(a[1]+b[1])/2+(b[0]-a[0])*k];
 kit.link=(g,a,b,col,w=2.4,op=.8,dash=null)=>g.insert('line',':first-child').attr('x1',a[0]).attr('y1',a[1]).attr('x2',b[0]).attr('y2',b[1]).attr('stroke',col).attr('stroke-width',w).attr('stroke-opacity',op).attr('stroke-dasharray',dash).attr('stroke-linecap','round');
 kit.dot=(g,a,b,col,sp,ph)=>{const c=g.append('circle').attr('r',4.6).attr('fill',col).attr('stroke','#0d0e10');P.push({c,a,b,sp,ph})};
 kit.node=(g,p,id,col,r,label,o={})=>{const n=g.append('g').attr('transform',`translate(${p[0]},${p[1]})`);n.append('circle').attr('r',r).attr('fill',o.fill||'#15171a').attr('stroke',col).attr('stroke-width',o.sw||2.6).attr('stroke-dasharray',o.dash||null);
  n.append('use').attr('href',id).attr('x',-r*.58).attr('y',-r*.58).attr('width',r*1.16).attr('height',r*1.16).style('color',o.ic||'#F2EFE8');
  if(label){String(label).split('|').forEach((l,i)=>n.append('text').attr('y',r+17+i*15).attr('text-anchor','middle').attr('font-size',o.fs||12.5).attr('font-weight',600).attr('fill',o.tc||'#E7E3DA').attr('font-family',FONT).attr('stroke','#131518').attr('stroke-width',4).attr('paint-order','stroke').text(l))}return n};
 kit.text=(g,x,y,t,o={})=>g.append('text').attr('x',x).attr('y',y).attr('text-anchor',o.a||'middle').attr('font-size',o.fs||14).attr('font-weight',o.fw||600).attr('fill',o.c||'#E7E3DA').attr('font-family',FONT).attr('letter-spacing',o.ls||null).text(t);
 kit.badge=(g,x,y,t,col)=>{const w=t.length*9+30;const b=g.append('g').attr('transform',`translate(${x-w/2},${y})`);b.append('rect').attr('width',w).attr('height',30).attr('rx',15).attr('fill',col);b.append('text').attr('x',w/2).attr('y',20).attr('text-anchor','middle').attr('font-size',13).attr('font-weight',700).attr('letter-spacing','.1em').attr('fill','#0d0e10').attr('font-family',FONT).text(t);return b};
 kit.pill=(g,x,y,w,t,col)=>{const n=g.append('g').attr('transform',`translate(${x},${y})`);n.append('rect').attr('x',-w/2).attr('y',-20).attr('width',w).attr('height',40).attr('rx',20).attr('fill','#15171a').attr('stroke',col).attr('stroke-width',2);n.append('text').attr('y',5).attr('text-anchor','middle').attr('font-size',13.5).attr('font-weight',600).attr('fill','#F2EFE8').attr('font-family',FONT).text(t);return n};
 kit.show=(g,d)=>kit.timers.push(setTimeout(()=>g.transition().duration(reduce?0:600).style('opacity',1),reduce?0:d));
 kit.run=(extra)=>{let alive=true,raf,t0=performance.now();ctx.onExit(()=>{alive=false;cancelAnimationFrame(raf);kit.timers.forEach(clearTimeout)});
  const tick=now=>{if(!alive)return;const t=(now-t0)/1000;P.forEach(p=>{const u=reduce?.5:((t*p.sp+p.ph)%1);p.c.attr('cx',p.a[0]+(p.b[0]-p.a[0])*u).attr('cy',p.a[1]+(p.b[1]-p.a[1])*u)});if(extra)extra(t);raf=requestAnimationFrame(tick)};raf=requestAnimationFrame(tick)};
 return kit}
/* ---- Gobierno / gobernanza / autogobierno ---- */
function conceptosView(ctx){
 const K=conceptKit(ctx),{svg}=K,BL='#4EAECF',PU='#9382E0',AM='#F2B53A',GN='#8EBF4C',PK='#CF7ABB',OR='#DE9F50';
 const cols=[200,600,1000].map(x=>svg.append('g').style('opacity',0));
 const [g1,g2,g3]=cols;const bg=svg.append('g').style('opacity',0);
 /* gobierno: autoridad arriba, decisiones hacia abajo */
 K.badge(g1,200,70,'GOBIERNO',BL);
 const top=[200,215];K.node(g1,top,'#c-templo',BL,40,'Alcaldía · UAESP|Secretaría de Ambiente',{tc:BL});
 [90,200,310].forEach((x,i)=>{const b=[x,440];K.link(g1,[200,258+22],[x,b[1]-34],BL,2.4,.75);K.dot(g1,[200,300],[x,b[1]-34],BL,.2,i*.3);K.dot(g1,[200,300],[x,b[1]-34],BL,.2,i*.3+.5);K.node(g1,b,'#c-persona','#8C877E',26,['Actor','Actor','Actor'][i],{tc:'#9a958c'})});
 K.text(g1,200,570,'Autoridades con competencias legales',{fs:15,fw:700,c:'#fff'});K.text(g1,200,592,'La decisión baja desde la autoridad',{fs:13,fw:500,c:'#9a958c'});
 /* gobernanza: público y no estatal en malla */
 K.badge(g2,600,70,'GOBERNANZA',PU);
 const N2={a:[600,215],b:[455,400],c:[745,400],d:[600,470]};
 const E2=[['a','b'],['a','c'],['b','c'],['b','d'],['c','d'],['a','d']];
 E2.forEach(([p,q],i)=>{K.link(g2,N2[p],N2[q],PU,2.4,.75);K.dot(g2,N2[p],N2[q],PU,.2,i*.17);K.dot(g2,N2[q],N2[p],PU,.2,i*.17+.3)});
 K.node(g2,N2.a,'#c-templo',PU,34,'Entidad pública',{tc:PU});K.node(g2,N2.b,'#s-grupo',GN,30,'Juntas de|Acción Comunal',{tc:GN});K.node(g2,N2.c,'#e-recicla',AM,30,'Organizaciones|de recicladores',{tc:AM});K.node(g2,N2.d,'#e-tienda',PK,26,'Tenderos',{tc:PK});
 K.text(g2,600,570,'Coordinación entre actores públicos y no estatales',{fs:15,fw:700,c:'#fff'});K.text(g2,600,592,'Se decide en conjunto, en ambos sentidos',{fs:13,fw:500,c:'#9a958c'});
 /* autogobierno: pares alrededor de un recurso compartido */
 K.badge(g3,1000,70,'AUTOGOBIERNO',AM);
 const C3=[1000,340],ang=[-90,30,150];const peers=[['#e-recicla',GN,'Recicladores'],['#c-persona',BL,'Coteros'],['#e-tienda',PK,'Tenderos']];
 const pp=ang.map(a=>[C3[0]+Math.cos(a*Math.PI/180)*135,C3[1]+Math.sin(a*Math.PI/180)*135]);
 [[0,1],[1,2],[2,0]].forEach(([i,j],k)=>{K.link(g3,pp[i],pp[j],AM,2,.5,'5 5');K.dot(g3,pp[i],pp[j],AM,.18,k*.3)});
 pp.forEach((p,i)=>{K.link(g3,C3,p,AM,2.4,.8);K.dot(g3,p,C3,peers[i][1],.2,i*.25);K.node(g3,p,peers[i][0],peers[i][1],27,peers[i][2],{tc:peers[i][1]})});
 K.node(g3,C3,'#c-doc',AM,34,null,{fill:'#2a210a',ic:AM,sw:3});K.text(g3,C3[0],C3[1]+52,'Reglas propias',{fs:12,fw:700,c:AM});
 K.text(g3,1000,570,'Quienes comparten un recurso fijan sus reglas',{fs:15,fw:700,c:'#fff'});K.text(g3,1000,592,'Sobre flujos concretos, no sobre todo',{fs:13,fw:500,c:'#9a958c'});
 /* reconocimiento institucional */
 const inst=[1135,150];K.node(bg,inst,'#c-templo',BL,24,'Reconocimiento|institucional',{tc:BL,fs:11.5});K.link(bg,[1120,172],[1030,236],BL,2.2,.9,'5 5');
 K.pill(bg,600,672,1000,'Autogobierno sobre flujos concretos: coexiste con las instituciones y necesita su reconocimiento',AM);
 K.show(g1,200);K.show(g2,2600);K.show(g3,5000);K.show(bg,7600);K.run();return()=>{}}
/* ---- Cinco etapas para decidir ---- */
function etapasView(ctx){
 const K=conceptKit(ctx),{svg}=K,RD='#E0623F',AM='#F2B53A',GN='#8EBF4C',BL='#4EAECF',PK='#CF7ABB',OR='#DE9F50';
 K.badge(svg,600,22,'CINCO ETAPAS PARA TOMAR UNA DECISIÓN',RD);
 const X=[140,370,600,830,1060],Y=190,S=[
  ['Agenda','Se identifica un problema|y entra a la agenda local','#c-mega'],['Deliberación','Mesas donde cada actor presenta|necesidades, datos e intereses','#c-charla'],['Resolución','Reglas acordadas|previamente','#c-mazo'],['Ejecución','Se asignan recursos|y se actúa','#c-monedas'],['Seguimiento','Se revisan resultados|y se corrige','#c-lupa']];
 const d=`M${X[0]},${Y}L${X[4]},${Y}L1130,${Y}Q1160,${Y} 1160,${Y+30}L1160,570Q1160,600 1130,600L70,600Q40,600 40,570L40,${Y+30}Q40,${Y} 70,${Y}Z`;
 const path=svg.append('path').attr('d',d).attr('fill','none').attr('stroke','#2b2d33').attr('stroke-width',3).attr('stroke-dasharray','8 8');
 const L=path.node().getTotalLength();
 /* mini-escenas bajo cada etapa */
 const mini=(i,g)=>{const x=X[i],y=330;
  if(i===0){K.node(g,[x-45,y],'#e-tienda',PK,24,'Tendero',{fs:11.5});K.node(g,[x+45,y],'#c-doc',AM,24,'Agenda local',{fs:11.5});K.link(g,[x-20,y],[x+20,y],AM,2.2,.8,'4 4');K.dot(g,[x-20,y],[x+20,y],RD,.3,.0)}
  if(i===1){[[x-55,y+10],[x,y-24],[x+55,y+10]].forEach(([a,b],k)=>K.node(g,[a,b],'#c-persona',[GN,BL,PK][k],19,null));K.node(g,[x,y+20],'#c-charla',AM,17,null,{ic:AM});[[x-55,y+10],[x,y-24],[x+55,y+10]].forEach((a,k)=>K.link(g,a,[x,y+20],'#8C877E',1.4,.7,'3 4'))}
  if(i===2){K.node(g,[x-45,y],'#c-mazo',AM,25,null,{ic:AM});K.node(g,[x+45,y],'#c-doc',GN,25,'Reglas',{fs:11.5,ic:GN});K.link(g,[x-20,y],[x+20,y],GN,2.2,.8);K.dot(g,[x-20,y],[x+20,y],GN,.3,.2)}
  if(i===3){K.node(g,[x-45,y],'#c-monedas',AM,25,null,{ic:AM});K.node(g,[x+45,y],'#e-camion',RD,25,null);K.link(g,[x-20,y],[x+20,y],AM,2.2,.8);K.dot(g,[x-20,y],[x+20,y],AM,.3,.4)}
  if(i===4){K.node(g,[x-45,y],'#c-lupa',BL,25,null,{ic:BL});K.node(g,[x+45,y],'#s-info',GN,25,null,{ic:GN});K.link(g,[x-20,y],[x+20,y],BL,2.2,.8);K.dot(g,[x-20,y],[x+20,y],BL,.3,.6)}};
 const nodes=S.map(([t,c,ic],i)=>{const g=svg.append('g').attr('transform',`translate(${X[i]},${Y})`);const ring=g.append('circle').attr('r',46).attr('fill','none').attr('stroke',RD).attr('stroke-width',3).style('opacity',0);
  const inner=g.append('g');inner.append('circle').attr('r',38).attr('fill','#15171a').attr('stroke',RD).attr('stroke-width',3);inner.append('use').attr('href',ic).attr('x',-19).attr('y',-19).attr('width',38).attr('height',38).style('color','#F2EFE8');
  g.append('text').attr('y',-58).attr('text-anchor','middle').attr('font-size',13).attr('font-weight',700).attr('fill',RD).attr('font-family',K.FONT).text(String(i+1));
  const lab=svg.append('g');K.text(lab,X[i],Y+70,t,{fs:16,fw:700,c:'#fff'});mini(i,svg.append('g'));c.split('|').forEach((l,k)=>K.text(svg,X[i],400+k*17,l,{fs:12.5,fw:500,c:'#B8B3A8'}));return{inner,ring}});
 K.text(svg,600,652,'Corregir reabre el ciclo',{fs:16,fw:700,c:AM});K.node(svg,[600,600],'#e-recicla',AM,22,null,{ic:AM});
 const token=svg.append('g');token.append('circle').attr('r',13).attr('fill',AM).attr('stroke','#0d0e10').attr('stroke-width',2);token.append('use').attr('href','#c-doc').attr('x',-8).attr('y',-8).attr('width',16).attr('height',16).style('color','#0d0e10');
 K.run(t=>{const len=(reduce?.3:((t*.07)%1))*L;const p=path.node().getPointAtLength(len);token.attr('transform',`translate(${p.x},${p.y})`);
  const seg=(X[4]-X[0])/4,act=len<=X[4]-X[0]+8?Math.min(4,Math.round(len/seg)):4;nodes.forEach((n,i)=>{const on=i===act;n.ring.style('opacity',on?1:0).attr('r',46+(on?Math.sin(t*5)*4:0));n.inner.attr('transform',`scale(${on?1.1:1})`)})});
 return()=>{}}
/* ---- Recursos comunes alrededor de Corabastos ---- */
function comunesView(ctx){
 const K=conceptKit(ctx,760),{svg}=K,AM='#F2B53A',GN='#8EBF4C',BL='#4EAECF',OR='#DE9F50',PK='#CF7ABB',RD='#E0623F';
 K.text(svg,600,34,'Recursos comunes alrededor de Corabastos, coordinados con reglas compartidas',{fs:19,fw:700,c:'#fff'});
 const R=[
  {c:[340,225],col:OR,id:'#c-reloj',t:'Horarios de cargue',a:[['#e-camion','Empresas|transportadoras'],['#c-persona','Coteros'],['#s-hogar','Vecinos|y líderes']]},
  {c:[860,225],col:GN,id:'#e-recicla',t:'Residuos orgánicos',a:[['#s-grupo','Organizaciones|de recicladores'],['#c-persona','Recicladores|asociados'],['#c-persona','Recicladores|independientes']]},
  {c:[340,545],col:BL,id:'#s-info',t:'Información de precios',a:[['#e-central','Mayoristas de|frutas y hortalizas'],['#e-tienda','Tenderos'],['#e-huerta','Productores|agrícolas']]},
  {c:[860,545],col:AM,id:'#c-monedas',t:'Recursos para el abastecimiento',a:[['#e-tienda','Tenderos'],['#e-comedor','Comedores|comunitarios'],['#e-huerta','Huertas|comunitarias']]}];
 R.forEach((r,k)=>{const g=svg.append('g').style('opacity',0);const [cx,cy]=r.c;
  K.text(g,cx,cy-118,r.t,{fs:17,fw:700,c:r.col});
  const pts=[-150,-30,90].map(a=>[cx+Math.cos(a*Math.PI/180)*104,cy+Math.sin(a*Math.PI/180)*86+8]);
  [[0,1],[1,2],[2,0]].forEach(([i,j],m)=>{K.link(g,pts[i],pts[j],r.col,1.8,.45,'4 5');K.dot(g,pts[i],pts[j],r.col,.16,m*.3+k*.1)});
  pts.forEach((p,i)=>{K.link(g,[cx,cy+8],p,r.col,2.2,.8);K.dot(g,p,[cx,cy+8],r.col,.2,i*.25+k*.07);K.dot(g,[cx,cy+8],p,'#F2EFE8',.2,i*.25+.5+k*.07)});
  pts.forEach((p,i)=>K.node(g,p,r.a[i][0],r.col,23,r.a[i][1],{tc:'#E7E3DA',fs:11.5}));
  K.node(g,[cx,cy+8],r.id,r.col,32,null,{fill:'#1b1d21',ic:r.col,sw:3.2});
  K.show(g,300+k*1400)});
 const f=svg.append('g').style('opacity',0);K.pill(f,600,728,980,'No sustituye las competencias institucionales: distribuye la capacidad de decisión y coordina a los actores',AM);K.show(f,6200);
 K.run();return()=>{}}

/* ===== Ilustración animada: la propuesta de las huertas en el barrio ===== */
function barrioView(ctx){
 const K=conceptKit(ctx,740),{svg}=K,FONT=K.FONT;
 const GN='#8EBF4C',LG='#B6E27A',OR='#DE9F50',AM='#F2B53A',PK='#CF7ABB',BL='#4EAECF',PU='#9382E0',RD='#E0623F',SOIL='#5b4630';
 svg.append('style').text(`.sway{transform-box:fill-box;transform-origin:50% 100%;animation:swy 3.2s ease-in-out infinite}@keyframes swy{0%,100%{transform:rotate(-5deg)}50%{transform:rotate(5deg)}}.steam{animation:stm 2.6s ease-in infinite}@keyframes stm{0%{transform:translateY(0);opacity:.0}25%{opacity:.7}100%{transform:translateY(-22px);opacity:0}}@media (prefers-reduced-motion:reduce){.sway,.steam{animation:none}}`);
 const R=(g,x,y,w,h,fill,o={})=>g.append('rect').attr('x',x).attr('y',y).attr('width',w).attr('height',h).attr('rx',o.rx||0).attr('fill',fill).attr('stroke',o.s||null).attr('stroke-width',o.sw||0).attr('opacity',o.op||1);
 /* suelo */
 const ground=svg.append('g').style('opacity',0);
 R(ground,20,92,1160,628,'#121612',{rx:30,s:'#232b23',sw:2});
 for(let x=60;x<1160;x+=70)ground.append('line').attr('x1',x).attr('y1',100).attr('x2',x).attr('y2',712).attr('stroke','#1a201a').attr('stroke-width',1);
 for(let y=130;y<712;y+=70)ground.append('line').attr('x1',30).attr('y1',y).attr('x2',1170).attr('y2',y).attr('stroke','#1a201a').attr('stroke-width',1);
 /* caminos */
 const PATHS={
  p1:'M340,235Q392,205 426,214',p2:'M240,296Q250,410 424,420',p3:'M514,214Q580,215 634,246',p4:'M516,420Q565,415 614,416',
  p6:'M508,452Q480,540 368,545',p7:'M1070,512Q1098,490 1108,462',
  c1:'M830,196Q660,150 512,206',c2:'M880,246Q700,320 516,410',
  r1:'M905,246Q850,290 842,330',r2:'M842,392Q840,460 856,512',r3:'M892,548Q925,552 936,556'};
 const gPath=svg.append('g');const pathEl={};
 Object.entries(PATHS).forEach(([k,d])=>{const g=gPath.append('g').style('opacity',0);
  g.append('path').attr('d',d).attr('fill','none').attr('stroke','#252b25').attr('stroke-width',k[0]==='c'?9:16).attr('stroke-linecap','round');
  const top=g.append('path').attr('d',d).attr('fill','none').attr('stroke',k[0]==='c'?OR:k[0]==='r'?AM:LG).attr('stroke-width',2.2).attr('stroke-opacity',.75).attr('stroke-dasharray','7 9').attr('class','flowing').attr('stroke-linecap','round');
  pathEl[k]={g,node:top.node()}});
 /* dibujos */
 const place=(x,y,delay,fn)=>{const g=svg.append('g').attr('transform',`translate(${x},${y}) scale(0)`);fn(g);K.timers.push(setTimeout(()=>g.transition().duration(reduce?0:700).ease(d3.easeBackOut.overshoot?d3.easeBackOut.overshoot(1.6):d3.easeBackOut).attr('transform',`translate(${x},${y}) scale(1)`),reduce?0:delay));return g};
 const sprout=(g,x,y,d)=>{const s=g.append('g').attr('transform',`translate(${x},${y})`);const p=s.append('g').attr('class','sway').style('animation-delay',`${d}s`);
  p.append('path').attr('d','M0,0V-15M0,-6C-9,-6 -11,-15 -11,-15 -2,-15 0,-9 0,-6M0,-10C9,-10 11,-19 11,-19 2,-19 0,-13 0,-10').attr('fill','none').attr('stroke',LG).attr('stroke-width',2.5).attr('stroke-linecap','round').attr('stroke-linejoin','round')};
 const garden=(w,h,tag)=>g=>{R(g,-w/2,-h/2,w,h,SOIL,{rx:10,s:'#2e2214',sw:3});R(g,-w/2+6,-h/2+6,w-12,h-12,'#6b5338',{rx:6,op:.5});
  const cols=Math.floor((w-24)/38),rows=Math.floor((h-18)/34);for(let i=0;i<cols;i++)for(let j=0;j<rows;j++)sprout(g,-w/2+24+i*((w-48)/Math.max(1,cols-1)),-h/2+30+j*((h-44)/Math.max(1,rows-1)),(i*.35+j*.5)%3)};
 const house=(g,w,h,body,roof,o={})=>{R(g,-w/2,-h/2,w,h,body,{rx:4,s:'#0d0e10',sw:2});g.append('path').attr('d',`M${-w/2-8},${-h/2}L0,${-h/2-h*.5}L${w/2+8},${-h/2}Z`).attr('fill',roof).attr('stroke','#0d0e10').attr('stroke-width',2);
  R(g,-7,h/2-22,14,22,'#0d0e10',{rx:2,op:.55});R(g,-w/2+9,-h/2+10,14,14,'#0d0e10',{rx:2,op:.35});R(g,w/2-23,-h/2+10,14,14,'#0d0e10',{rx:2,op:.35})};
 const tienda=g=>{house(g,92,64,'#3a2a36',PK);for(let i=0;i<6;i++)R(g,-46+i*15.3,-20,15.3,14,i%2?'#F2EFE8':PK,{s:'#0d0e10',sw:1.2});g.append('use').attr('href','#e-tienda').attr('x',-12).attr('y',-6).attr('width',24).attr('height',24).style('color','#F2EFE8')};
 const comedor=g=>{house(g,96,66,'#3a2320',RD);R(g,22,-62,12,26,'#2a1a18',{s:'#0d0e10',sw:1.5});[0,1,2].forEach(i=>g.append('circle').attr('class','steam').attr('cx',28+i*3).attr('cy',-66).attr('r',5).attr('fill','#F2EFE8').attr('opacity',0).style('animation-delay',`${i*.8}s`));g.append('use').attr('href','#e-comedor').attr('x',-12).attr('y',-8).attr('width',24).attr('height',24).style('color','#F2EFE8')};
 const colegio=g=>{R(g,-65,-36,130,76,'#3a3220',{rx:4,s:'#0d0e10',sw:2});R(g,-18,-60,36,28,'#4a3f26',{s:'#0d0e10',sw:2});g.append('path').attr('d','M-26,-60L0,-80L26,-60Z').attr('fill',AM).attr('stroke','#0d0e10').attr('stroke-width',2);
  g.append('line').attr('x1',0).attr('y1',-80).attr('x2',0).attr('y2',-98).attr('stroke','#B8B3A8').attr('stroke-width',2);g.append('path').attr('d','M0,-98L18,-93L0,-88Z').attr('fill',RD);
  [-45,-15,15,45].forEach(x=>R(g,x-7,-22,14,16,'#0d0e10',{rx:2,op:.35}));R(g,-9,18,18,22,'#0d0e10',{rx:2,op:.55})};
 const hogar=(col)=>g=>{house(g,70,52,'#1f2a33',col);g.append('use').attr('href','#s-hogar').attr('x',-10).attr('y',-4).attr('width',20).attr('height',20).style('color','#F2EFE8')};
 const bodega=g=>{R(g,-120,-48,240,96,'#2a1d0c',{rx:6,s:'#0d0e10',sw:2});g.append('path').attr('d','M-128,-48L-100,-72H100L128,-48Z').attr('fill',OR).attr('stroke','#0d0e10').attr('stroke-width',2);
  for(let i=-3;i<=3;i++)g.append('line').attr('x1',i*30).attr('y1',-72).attr('x2',i*30).attr('y2',-50).attr('stroke','#0d0e10').attr('stroke-opacity',.35);
  [-80,-20,40,95].forEach(x=>R(g,x-14,6,28,42,'#0d0e10',{rx:2,op:.6}));g.append('use').attr('href','#e-central').attr('x',-18).attr('y',-44).attr('width',36).attr('height',36).style('color','#F2EFE8');
  [[-70,62],[10,62]].forEach(([x,y])=>{g.append('circle').attr('cx',x).attr('cy',y).attr('r',14).attr('fill','#15171a').attr('stroke',RD).attr('stroke-width',2);g.append('use').attr('href','#e-camion').attr('x',x-9).attr('y',y-9).attr('width',18).attr('height',18).style('color','#F2EFE8')})};
 const pond=g=>{g.append('ellipse').attr('rx',118).attr('ry',54).attr('fill','#0f2a35').attr('stroke','#1c4a5c').attr('stroke-width',4);g.append('ellipse').attr('rx',92).attr('ry',38).attr('fill','#13384a');
  g.append('ellipse').attr('class','pond-r').attr('rx',30).attr('ry',12).attr('fill','none').attr('stroke',BL).attr('stroke-width',2).attr('stroke-opacity',.6);
  [[-90,-30],[-70,-40],[84,-26],[100,-12]].forEach(([x,y])=>{g.append('path').attr('d',`M${x},${y+22}V${y}M${x+7},${y+22}V${y+6}`).attr('stroke','#5f9a4a').attr('stroke-width',3).attr('stroke-linecap','round')});
  [[-20,6],[28,16]].forEach(([x,y])=>{g.append('ellipse').attr('cx',x).attr('cy',y).attr('rx',9).attr('ry',6).attr('fill','#F2EFE8');g.append('circle').attr('cx',x+8).attr('cy',y-5).attr('r',4).attr('fill','#F2EFE8');g.append('path').attr('d',`M${x+11},${y-5}l6,2l-6,1z`).attr('fill',AM)})};
 const recic=g=>{g.append('circle').attr('r',30).attr('fill','#15171a').attr('stroke',AM).attr('stroke-width',3);g.append('use').attr('href','#e-recicla').attr('x',-17).attr('y',-17).attr('width',34).attr('height',34).style('color',AM)};
 const compost=g=>{g.append('path').attr('d','M-26,-20H26L20,26H-20Z').attr('fill','#3a2a1c').attr('stroke','#0d0e10').attr('stroke-width',2);R(g,-30,-28,60,10,'#4a3624',{rx:3,s:'#0d0e10',sw:2});g.append('use').attr('href','#e-compost').attr('x',-14).attr('y',-14).attr('width',28).attr('height',28).style('color',AM)};
 const tag=(x,y,t,col,ic,delay)=>{const w=t.length*6.9+(ic?44:26);const g=svg.append('g').attr('transform',`translate(${x},${y})`).style('opacity',0);g.append('rect').attr('x',-w/2).attr('y',-14).attr('width',w).attr('height',28).attr('rx',14).attr('fill','#101310').attr('stroke',col).attr('stroke-width',1.8);
  if(ic)g.append('use').attr('href',ic).attr('x',-w/2+8).attr('y',-9).attr('width',18).attr('height',18).style('color',col);g.append('text').attr('x',ic?-w/2+32:0).attr('y',4.5).attr('text-anchor',ic?'start':'middle').attr('font-size',12.5).attr('font-weight',700).attr('fill','#F2EFE8').attr('font-family',FONT).text(t);K.show(g,delay);return g};
 
 K.show(ground,0);
 /* lugares */
 place(170,598,400,pond);place(950,175,500,bodega);
 place(240,235,1100,garden(200,120));place(700,425,1350,garden(170,96));place(1030,560,1600,garden(170,100));
 place(470,215,2300,tienda);place(470,420,2500,comedor);place(700,262,2700,colegio);place(330,545,2900,hogar(BL));place(1110,425,3100,hogar(PU));
 place(842,360,6400,recic);place(870,550,6700,compost);
 /* etiquetas */
 tag(170,668,'Humedal La Vaca · menos carga',BL,'#e-humedal',900);tag(1085,282,'Corabastos: un nodo más',OR,'#e-central',1000);
 tag(240,318,'Huerta comunitaria',GN,'#e-huerta',1900);tag(700,486,'Huerta escolar',GN,'#e-huerta',2100);tag(1030,622,'Huerta con compost',GN,'#e-huerta',2300);
 tag(470,258,'Tienda de barrio',PK,null,3000);tag(405,470,'Comedor comunitario',RD,null,3200);tag(700,338,'Colegio',AM,null,3400);
 tag(960,360,'Recicladores organizados',AM,null,7000);tag(870,590,'Compostaje',AM,null,7200);
 /* caminos y móviles */
 const show=(k,d)=>K.timers.push(setTimeout(()=>pathEl[k].g.transition().duration(reduce?0:600).style('opacity',1),reduce?0:d));
 ['p1','p2','p3','p4','p6','p7'].forEach((k,i)=>show(k,3900+i*250));['c1','c2'].forEach((k,i)=>show(k,5800+i*300));['r1','r2','r3'].forEach((k,i)=>show(k,6200+i*350));
 const M=[];const mover=(k,kind,sp,ph,start)=>{const g=svg.append('g').style('opacity',0);
  if(kind==='camion'){g.append('circle').attr('r',11).attr('fill','#15171a').attr('stroke',OR).attr('stroke-width',2);g.append('use').attr('href','#e-camion').attr('x',-7).attr('y',-7).attr('width',14).attr('height',14).style('color','#F2EFE8')}
  else if(kind==='bolsa'){R(g,-6,-6,12,12,AM,{rx:3,s:'#0d0e10',sw:1.5})}
  else{R(g,-6,-5,12,10,LG,{rx:2,s:'#0d0e10',sw:1.5});g.append('path').attr('d','M-6,-5L0,-10L6,-5').attr('fill','none').attr('stroke',GN).attr('stroke-width',2)}
  const n=pathEl[k].node;M.push({g,n,L:n.getTotalLength(),sp,ph,on:0});K.timers.push(setTimeout(()=>{const m=M.find(x=>x.g===g);m.on=1;g.transition().duration(400).style('opacity',1)},reduce?0:start))};
 ['p1','p2','p3','p4','p6','p7'].forEach((k,i)=>[0,.5].forEach(f=>mover(k,'caja',.16,(i*.13+f)%1,4300+i*250)));
 ['c1','c2'].forEach((k,i)=>mover(k,'camion',.09,i*.4,6200));['r1','r2','r3'].forEach((k,i)=>[0,.5].forEach(f=>mover(k,'bolsa',.18,(i*.2+f)%1,6700+i*350)));
 /* pie */
 const f=svg.append('g').style('opacity',0);[[LG,'Circuitos cortos entre huertas, tiendas, comedores y colegios',20],[OR,'Corabastos sigue: pocas rutas de carga',470],[AM,'Residuos orgánicos que vuelven como compost',800]].forEach(([c,t,x],i)=>{});
 const chips=[[LG,'Circuitos cortos entre huertas, tiendas, comedores y colegios'],[OR,'Corabastos sigue, con menos viajes'],[AM,'Los residuos vuelven como compost']];let cx=70;
 chips.forEach(([c,t])=>{const w=t.length*7.1+44;const g=f.append('g').attr('transform',`translate(${cx},724)`);g.append('rect').attr('width',w).attr('height',28).attr('rx',14).attr('y',-14).attr('fill','#101310').attr('stroke',c).attr('stroke-width',1.8);g.append('circle').attr('cx',16).attr('r',5).attr('fill',c);g.append('text').attr('x',30).attr('y',4.5).attr('font-size',12.5).attr('font-weight',600).attr('fill','#E7E3DA').attr('font-family',FONT).text(t);cx+=w+16});
 K.show(f,8000);
 K.run(t=>{M.forEach(m=>{if(!m.on)return;const u=reduce?.5:((t*m.sp+m.ph)%1);const p=m.n.getPointAtLength(u*m.L);m.g.attr('transform',`translate(${p.x},${p.y})`)});
  const k=(t*.5)%1;svg.selectAll('.pond-r').attr('rx',30+k*70).attr('ry',12+k*26).attr('stroke-opacity',.6*(1-k))});
 return()=>{}}

/* ===== Escena única: soberanía alimentaria explicada paso a paso ===== */
function soberaniaFullView(ctx){
 const K=conceptKit(ctx,740),{svg,FONT}=K;
 const GN='#8EBF4C',LG='#B6E27A',OR='#DE9F50',AM='#F2B53A',PK='#CF7ABB',BL='#4EAECF',RD='#E0623F',PU='#9382E0';
 svg.append('style').text('@keyframes glw{0%,100%{stroke-opacity:.35}50%{stroke-opacity:1}}.glow{animation:glw 2s ease-in-out infinite}@media (prefers-reduced-motion:reduce){.glow{animation:none}}');
 const gHead=svg.append('g').style('opacity',0),gCards=svg.append('g').style('opacity',0),gRing=svg.append('g').style('opacity',0),gTop=svg.append('g').style('opacity',0),gBars=svg.append('g').style('opacity',0);
 K.badge(gHead,600,12,'SOBERANÍA ALIMENTARIA',GN);
 /* tarjetas: seguridad vs soberanía */
 const card=(x,col,icon,title,l1,l2,q,glow)=>{const g=gCards.append('g').attr('transform',`translate(${x},58)`);
  g.append('rect').attr('width',540).attr('height',140).attr('rx',18).attr('fill','#15171a').attr('stroke',col).attr('stroke-width',glow?3:2).attr('class',glow?'glow':null);
  g.append('circle').attr('cx',70).attr('cy',70).attr('r',36).attr('fill','#101310').attr('stroke',col).attr('stroke-width',3);g.append('use').attr('href',icon).attr('x',50).attr('y',50).attr('width',40).attr('height',40).style('color','#F2EFE8');
  K.text(g,130,52,title,{a:'start',fs:21,fw:700,c:col});K.text(g,130,80,l1,{a:'start',fs:14.5,fw:500,c:'#D9D5CB'});K.text(g,130,100,l2,{a:'start',fs:14.5,fw:500,c:'#D9D5CB'});
  const w=q.length*7.4+30;g.append('rect').attr('x',130).attr('y',110).attr('width',w).attr('height',22).attr('rx',11).attr('fill',col).attr('fill-opacity',.18).attr('stroke',col);K.text(g,130+w/2,125,q,{fs:12.5,fw:700,c:col})};
 card(40,BL,'#e-comedor','Seguridad alimentaria','Acceso a alimentos suficientes,','inocuos y nutritivos','¿Llega el alimento?');
 card(620,GN,'#s-decide','Soberanía alimentaria','Capacidad de decidir cómo se producen','y se distribuyen los alimentos','¿Quién decide?  ← lo que trabaja la propuesta',true);
 /* red local de pares */
 const C=[330,398],rx=215,ry=128;const A=[['#e-huerta',GN,'Productores'],['#e-recicla',AM,'Recicladores'],['#e-camion',RD,'Transportadores'],['#e-comedor',PK,'Comedores'],['#s-hogar',BL,'Hogares'],['#e-colegio',AM,'Colegios'],['#e-tienda',PK,'Tenderos'],['#e-central',OR,'Corabastos']];
 const P=A.map((_,i)=>{const a=(-90+i*45)*Math.PI/180;return[C[0]+Math.cos(a)*rx,C[1]+Math.sin(a)*ry]});
 const E=[];for(let i=0;i<8;i++)E.push([i,(i+1)%8]);[[0,2],[2,4],[4,6],[6,0],[1,3],[3,5],[5,7]].forEach(e=>E.push(e));
 const L=E.map(([i,j])=>{const l=gRing.append('line').attr('x1',P[i][0]).attr('y1',P[i][1]).attr('x2',P[j][0]).attr('y2',P[j][1]).attr('stroke','#8C877E').attr('stroke-width',1.8).attr('stroke-opacity',.35);K.dot(gRing,P[i],P[j],'#8C877E',.14,Math.random());return{l,i,j}});
 K.text(gRing,C[0],C[1]-4,'Red local de pares',{fs:15,fw:700,c:'#fff'});K.text(gRing,C[0],C[1]+16,'nadie decide solo',{fs:12.5,fw:500,c:'#9a958c'});
 const N=A.map(([ic,col,lab],i)=>{const g=gRing.append('g').attr('transform',`translate(${P[i][0]},${P[i][1]})`);const r=i===7?22:27;const ring=g.append('circle').attr('r',r+8).attr('fill','none').attr('stroke',col).attr('stroke-width',3).style('opacity',0);
  const inner=g.append('g');inner.append('circle').attr('r',r).attr('fill','#15171a').attr('stroke',col).attr('stroke-width',2.6);inner.append('use').attr('href',ic).attr('x',-r*.58).attr('y',-r*.58).attr('width',r*1.16).attr('height',r*1.16).style('color','#F2EFE8');
  g.append('text').attr('y',r+17).attr('text-anchor','middle').attr('font-size',12.5).attr('font-weight',600).attr('fill','#E7E3DA').attr('font-family',FONT).attr('stroke','#111315').attr('stroke-width',4).attr('paint-order','stroke').text(lab);return{g,inner,ring,col}});
 /* temas que se deciden y quién lidera cada uno */
 const T=[['Qué se produce','#e-huerta',GN,[0],'Lideran los productores'],['Cómo se distribuye','#e-camion',RD,[2],'Lideran los transportadores'],['Precios e información','#s-precio',AM,[6],'Lideran los tenderos'],['Qué se compra en conjunto','#c-monedas',PK,[3,5],'Lideran comedores y colegios']];
 K.text(gTop,970,250,'LO QUE SE DECIDE, Y QUIÉN LIDERA CADA TEMA',{fs:11.5,fw:700,c:'#8C877E',ls:'.08em'});
 const rows=T.map(([t,ic,col,lead,sub],i)=>{const g=gTop.append('g').attr('transform',`translate(760,${272+i*72})`);const bx=g.append('rect').attr('width',400).attr('height',60).attr('rx',14).attr('fill','#15171a').attr('stroke','#2b2d33').attr('stroke-width',2);
  g.append('circle').attr('cx',34).attr('cy',30).attr('r',22).attr('fill','#101310').attr('stroke',col).attr('stroke-width',2.4);g.append('use').attr('href',ic).attr('x',20).attr('y',16).attr('width',28).attr('height',28).style('color',col);
  K.text(g,70,26,t,{a:'start',fs:15.5,fw:700,c:'#fff'});K.text(g,70,46,sub,{a:'start',fs:12.5,fw:500,c:'#9a958c'});return{bx,col,lead}});
 /* barras: dependencia */
 const bar=(y,label)=>{K.text(gBars,40,y-8,label,{a:'start',fs:13.5,fw:700,c:'#fff'});gBars.append('rect').attr('x',40).attr('y',y).attr('width',1120).attr('height',26).attr('rx',8).attr('fill','#1b1d21').attr('stroke','#2b2d33')};
 bar(612,'Hoy: el abasto local depende de un único nodo');gBars.append('rect').attr('x',40).attr('y',612).attr('width',1120).attr('height',26).attr('rx',8).attr('fill',OR).attr('fill-opacity',.85);K.text(gBars,56,630,'Corabastos',{a:'start',fs:12.5,fw:700,c:'#2a1d0c'});
 bar(668,'Con la propuesta: una parte por circuitos cortos y el resto sigue en Corabastos');
 gBars.append('rect').attr('x',600).attr('y',668).attr('width',560).attr('height',26).attr('fill',OR).attr('fill-opacity',.85);K.text(gBars,616,686,'Corabastos sigue siendo parte del abasto',{a:'start',fs:12.5,fw:700,c:'#2a1d0c'});
 const gr=gBars.append('rect').attr('class','sob2-g').attr('x',40).attr('y',668).attr('width',0).attr('height',26).attr('rx',8).attr('fill',GN);
 K.text(gBars,56,686,'Circuitos cortos',{a:'start',fs:12.5,fw:700,c:'#10200a'}).attr('class','sob2-t').style('opacity',0);
 K.text(gBars,600,722,'Ilustrativo: la proporción no es una meta ni un dato · Las huertas no reemplazan el volumen ni la variedad de Corabastos',{fs:12,fw:500,c:'#77736b'});
 K.show(gHead,100);K.show(gCards,500);K.show(gRing,3200);K.show(gTop,4600);K.show(gBars,9000);
 K.timers.push(setTimeout(()=>{gr.transition().duration(reduce?0:1500).attr('width',560);svg.select('.sob2-t').transition().delay(900).style('opacity',1)},reduce?0:9600));
 let t0=null;K.timers.push(setTimeout(()=>{t0=performance.now()},reduce?0:5200));
 K.run(t=>{if(t0===null)return;const s=(performance.now()-t0)/1000,idx=Math.floor(s/2.8)%4,r=rows[idx],k=(s%2.8)/2.8;
  rows.forEach((w,i)=>w.bx.attr('stroke',i===idx?w.col:'#2b2d33').attr('stroke-width',i===idx?3:2).attr('fill',i===idx?'#1c211a':'#15171a'));
  N.forEach((n,i)=>{const on=r.lead.includes(i);n.ring.style('opacity',on?1:0).attr('r',(i===7?22:27)+8+(on?Math.sin(s*5)*3:0)).attr('stroke',r.col);n.inner.attr('transform',`scale(${on?1.18:1})`)});
  L.forEach(({l,i,j})=>{const on=r.lead.includes(i)||r.lead.includes(j);l.attr('stroke',on?r.col:'#8C877E').attr('stroke-width',on?3:1.8).attr('stroke-opacity',on?.95:.3)})});
 return()=>{}}

/* ===== Axonometría de Kennedy con datos reales (edificios, manzanas, árboles, parques, agua y vías) ===== */
function axoView(ctx){
 const K=conceptKit(ctx,740),{svg,FONT}=K;
 const BLUE='#2a35ff',GN='#8EBF4C',LG='#B6E27A',OR='#DE9F50',AM='#F2B53A',PK='#CF7ABB',BL='#4EAECF',PU='#9382E0';
 svg.append('style').text('@keyframes axp{0%,100%{opacity:.5}50%{opacity:.85}}.axp{animation:axp 2.6s ease-in-out infinite}@media (prefers-reduced-motion:reduce){.axp{animation:none}}');
 const gImg=svg.append('g'),gZ=svg.append('g'),gP=svg.append('g'),gRoute=svg.append('g'),gCall=svg.append('g');
 /* panel izquierdo, como la referencia */
 const gL=svg.append('g').style('opacity',0);
 gL.append('rect').attr('x',20).attr('y',300).attr('width',230).attr('height',34).attr('fill',BLUE);K.text(gL,238,323,'propuesta',{a:'end',fs:19,fw:600,c:'#fff'});
 [[['en esta red, ',0],['las huertas',1],[' no son',0]],[['solo cultivos: son ',0],['nodos de',1]],[['abastecimiento',1],[' que conectan',0]],[['tiendas, comedores y',0]],[['colegios y reducen la',0]],[['dependencia',1],[' de un solo centro.',0]]].forEach((ln,i)=>{const t=gL.append('text').attr('x',22).attr('y',362+i*20).attr('font-size',14.5).attr('fill','#E7E3DA').attr('font-family',FONT);ln.forEach(([s,b])=>t.append('tspan').attr('font-weight',b?800:500).attr('fill',b?'#fff':'#C9C5BB').text(s))});
 K.timers.push(setTimeout(()=>gL.transition().duration(600).style('opacity',1),200));
 const load=gImg.append('text').attr('x',730).attr('y',420).attr('text-anchor','middle').attr('font-size',15).attr('fill','#8C877E').attr('font-family',FONT).text('Cargando la cartografía 3D de Kennedy…');
 const J=u=>fetch(u).then(r=>r.json()),Bf=u=>fetch(u).then(r=>r.arrayBuffer());
 Promise.all([J('assets/territorio_kennedy.geojson'),J('assets/territorio_puntos.geojson'),J('assets/k3d/meta.json'),Bf('assets/k3d/bld.bin'),J('assets/k3d/manz.json'),Bf('assets/k3d/trees.bin'),J('assets/k3d/parques.json'),J('assets/k3d/agua.json'),J('assets/k3d/vias.json')]).then(([Kg,Pg,M,bld,manz,trees,parq,agua,vias])=>{
  const ring=Kg.features[0].geometry.coordinates[0];const {tx:TX,ty:TY,lon0:LON0,lat0:LAT0,kx:KX,ky:KY}=M;
  const AZ=38*Math.PI/180,ca=Math.cos(AZ),sa=Math.sin(AZ);
  const toG=(E,N)=>{const mx=E,my=-N;return[mx*ca-my*sa,mx*sa+my*ca]};
  const G=(lon,lat)=>toG((lon-LON0)*KX,(lat-LAT0)*KY),GR=(x,y)=>toG(x+TX,y+TY);
  const raw=(gx,gy,z)=>[(gx-gy)*.866,(gx+gy)*.6-z*1.5];
  const ringG=ring.map(([a,b])=>G(a,b));const rs=ringG.map(([x,y])=>raw(x,y,0));
  const minX=Math.min(...rs.map(p=>p[0])),maxX=Math.max(...rs.map(p=>p[0])),minY=Math.min(...rs.map(p=>p[1])),maxY=Math.max(...rs.map(p=>p[1]));
  const AX0=275,AX1=1185,AY0=175,AY1=705,S=Math.min((AX1-AX0)/(maxX-minX),(AY1-AY0)/(maxY-minY)),OX=AX0-minX*S+((AX1-AX0)-(maxX-minX)*S)/2,OY=AY0-minY*S+((AY1-AY0)-(maxY-minY)*S)/2;
  const PJ=(gx,gy,z=0)=>{const r=raw(gx,gy,z);return[OX+r[0]*S,OY+r[1]*S]};
  const PL=(lon,lat,z=0)=>{const g=G(lon,lat);return PJ(g[0],g[1],z)};
  const PR=(x,y,z=0)=>{const g=GR(x,y);return PJ(g[0],g[1],z)};
  /* ---- lienzo (2x) ---- */
  const SC=2,cv=document.createElement('canvas');cv.width=1200*SC;cv.height=740*SC;const c=cv.getContext('2d');c.scale(SC,SC);c.lineJoin='round';
  const path=(pts)=>{c.beginPath();pts.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.closePath()};
  const flat=(a,fn)=>{const o=[];for(let i=0;i<a.length;i+=2)o.push(fn(a[i],a[i+1]));return o};
  /* losa con espesor */
  const slab=ringG.map(([x,y])=>PJ(x,y,0)),slab2=ringG.map(([x,y])=>PJ(x,y,-22));
  path(slab2);c.fillStyle='#070707';c.fill();for(let i=0;i<ringG.length;i++){const j=(i+1)%ringG.length;path([slab[i],slab[j],slab2[j],slab2[i]]);c.fillStyle='#131313';c.fill()}
  path(slab);c.fillStyle='#1d1d1d';c.fill();
  /* manzanas */
  c.save();path(slab);c.clip();
  c.fillStyle='#2b2b2b';manz.forEach(m=>{path(flat(m,(x,y)=>PR(x,y)));c.fill()});
  /* parques */
  c.fillStyle='#244d2c';parq.forEach(p=>{path(flat(p.p,(x,y)=>PR(x,y)));c.fill()});
  /* vías */
  c.lineCap='round';[['l','#333',.6],['m','#4b4b4b',1.1],['M','#6a6a6a',1.8]].forEach(([k,col,w])=>{c.strokeStyle=col;c.lineWidth=w;vias.forEach(v=>{const kk=v[0]==='m'?'m':v[0]==='M'||v[0]==='j'?'M':'l';if(kk!==k)return;const q=flat(v[1],(x,y)=>PR(x,y));c.beginPath();q.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.stroke()})});
  /* agua */
  agua.forEach(w=>{if(w.t==='Canal'||w.t==='Quebrada')return;path(flat(w.p,(x,y)=>PR(x,y)));c.fillStyle='#1f6fb5';c.fill();c.strokeStyle='#8fcbff';c.lineWidth=1.2;c.stroke()});
  agua.forEach(w=>{if(w.t!=='Canal'&&w.t!=='Quebrada')return;const q=flat(w.p,(x,y)=>PR(x,y));c.beginPath();q.forEach((p,i)=>i?c.lineTo(p[0],p[1]):c.moveTo(p[0],p[1]));c.strokeStyle='#3b8fd9';c.lineWidth=1.6;c.stroke()});
  /* árboles */
  const tv=new DataView(trees);const nt=tv.byteLength/5;c.fillStyle='#4f9a45';for(let i=0;i<nt;i++){const x=tv.getUint16(i*5,true)-1000,y=tv.getUint16(i*5+2,true)-1000,h=tv.getUint8(i*5+4)/4;const p=PR(x,y,Math.min(h,14));c.beginPath();c.arc(p[0],p[1],1.15,0,6.3);c.fill()}
  c.restore();
  /* edificios reales con altura */
  const bv=new DataView(bld);let o=0;const B=[];while(o<bv.byteLength){const h=bv.getUint8(o)/2,n=bv.getUint8(o+1);o+=2;const pts=[];let sx=0,sy=0;for(let i=0;i<n;i++){const x=bv.getUint16(o,true),y=bv.getUint16(o+2,true);o+=4;pts.push([x,y]);sx+=x;sy+=y}const gg=GR(sx/n,sy/n);B.push({h,pts,gx:gg[0],gy:gg[1]})}
  B.sort((a,b)=>(a.gx+a.gy)-(b.gx+b.gy));
  const corG=G(-74.159,4.6295);const inCor=b=>Math.abs(b.gx-corG[0])<560&&Math.abs(b.gy-corG[1])<400;
  B.forEach(b=>{const cor=inCor(b);const hh=Math.min(b.h,120);const g=b.pts.map(([x,y])=>GR(x,y));let ar=0;for(let i=0;i<g.length;i++){const j=(i+1)%g.length;ar+=g[i][0]*g[j][1]-g[j][0]*g[i][1]}const sg=ar>0?1:-1;
   const v=Math.min(215,112+Math.min(hh,36)*2.6+(b.gx*7+b.gy*13)%12);const base=cor?[232,168,96]:[v,v,v];
   for(let i=0;i<g.length;i++){const j=(i+1)%g.length;const dx=g[j][0]-g[i][0],dy=g[j][1]-g[i][1];const nx=dy*sg,ny=-dx*sg;if(nx+ny<=0)continue;const L=Math.hypot(nx,ny)||1;const sh=.5+.34*(nx/L>ny/L?.55:1)*(.6+.4*Math.abs(nx-ny)/L);
    path([PJ(g[i][0],g[i][1],0),PJ(g[j][0],g[j][1],0),PJ(g[j][0],g[j][1],hh),PJ(g[i][0],g[i][1],hh)]);c.fillStyle=`rgb(${base[0]*sh|0},${base[1]*sh|0},${base[2]*sh|0})`;c.fill()}
   path(g.map(p=>PJ(p[0],p[1],hh)));c.fillStyle=`rgb(${base[0]|0},${base[1]|0},${base[2]|0})`;c.fill()});
  cv.toBlob(bl=>{const url=URL.createObjectURL(bl);load.remove();ctx.onExit(()=>URL.revokeObjectURL(url));
   gImg.append('image').attr('href',url).attr('x',0).attr('y',0).attr('width',1200).attr('height',740).style('opacity',0).transition().duration(reduce?0:900).style('opacity',1)});
  /* ---- capa vectorial animada: piezas de la propuesta ---- */
  const by=k=>Pg.features.filter(f=>f.properties.c===k).map(f=>f.geometry.coordinates);
  const hue=by('huerta'),jac=by('jac');const com=Pg.features.filter(f=>f.properties.c==='sdis'&&/^Comedor/.test(f.properties.n||'')).map(f=>f.geometry.coordinates);
  const gM=gP.style('opacity',0);
  jac.forEach(p0=>{const p=PL(p0[0],p0[1],3);gM.append('circle').attr('cx',p[0]).attr('cy',p[1]).attr('r',2.4).attr('fill',PU).attr('stroke','#111').attr('stroke-width',.6)});
  const cell=new Set();hue.forEach(p0=>{const k=Math.round(p0[0]/.0065)+'_'+Math.round(p0[1]/.0065);if(cell.has(k))return;cell.add(k);const p=PL(p0[0],p0[1],4);gM.append('path').attr('d',`M${p[0]},${p[1]}v-8m0,3.5c-4.5,0 -5.5,-5.5 -5.5,-5.5 4.5,0 5.5,3 5.5,5.5m0,-3c4.5,0 5.5,-6 5.5,-6 -4.5,0 -5.5,3.5 -5.5,6`).attr('fill','none').attr('stroke','#C9F27F').attr('stroke-width',1.8).attr('stroke-linecap','round')});
  com.forEach(p0=>{const p=PL(p0[0],p0[1],5);gM.append('circle').attr('cx',p[0]).attr('cy',p[1]).attr('r',3.8).attr('fill',PK).attr('stroke','#111').attr('stroke-width',1)});
  K.timers.push(setTimeout(()=>gM.transition().duration(700).style('opacity',1),reduce?0:1600));
  /* humedales reales: ondas animadas */
  const cen=n=>{const a=agua.filter(w=>w.n===n),q=[];a.forEach(w=>{for(let i=0;i<w.p.length;i+=2)q.push([w.p[i],w.p[i+1]])});return[d3.mean(q,p=>p[0]),d3.mean(q,p=>p[1])]};
  const HUMS=['Humedal La Vaca','Humedal El Burro','Humedal de Techo'].map(n=>({n,c:GR(...cen(n))}));
  const ellipse=(cx,cy,a,b,z,n=40)=>Array.from({length:n},(_,i)=>{const t=i/n*Math.PI*2;return PJ(cx+Math.cos(t)*a,cy+Math.sin(t)*b,z)});
  const pstr=pts=>pts.map(p=>p[0].toFixed(1)+','+p[1].toFixed(1)).join(' ');
  const hw=HUMS.map(h=>({g:h.c,rp:gP.append('polygon').attr('fill','none').attr('stroke','#bfe2ff').attr('stroke-width',1.4)}));
  /* zonas azules translúcidas */
  const hN=hue.filter(p=>p[1]>4.64),hc=[d3.mean(hN,p=>p[0]),d3.mean(hN,p=>p[1])];
  const Z=[{c:G(hc[0],hc[1]),a:1250,b:800,h:110},{c:G(-74.1535,4.6275),a:900,b:620,h:110},{c:G(-74.1735,4.6245),a:800,b:560,h:110}];
  Z.forEach(z=>{const n=36,bot=Array.from({length:n},(_,i)=>{const t=i/n*Math.PI*2;return[z.c[0]+Math.cos(t)*z.a,z.c[1]+Math.sin(t)*z.b]});const g=gZ.append('g').style('opacity',0);
   bot.map((p,i)=>i).sort((i,j)=>(bot[i][0]+bot[i][1])-(bot[j][0]+bot[j][1])).forEach(i=>{const j=(i+1)%n;g.append('polygon').attr('points',pstr([PJ(bot[i][0],bot[i][1],0),PJ(bot[j][0],bot[j][1],0),PJ(bot[j][0],bot[j][1],z.h),PJ(bot[i][0],bot[i][1],z.h)])).attr('fill',BLUE).attr('fill-opacity',.42)});
   g.append('polygon').attr('points',pstr(bot.map(p=>PJ(p[0],p[1],z.h)))).attr('fill',BLUE).attr('fill-opacity',.5).attr('stroke','#aab0ff').attr('stroke-width',1.5).attr('class','axp');z.g=g;z.top=PJ(z.c[0],z.c[1],z.h)});
  /* ruta del circuito */
  const cg=G(-74.159,4.6295);const rpts=[Z[0].c,Z[1].c,cg,Z[2].c].map(q=>PJ(q[0],q[1],5)),rd='M'+rpts.map(p=>p.join(',')).join('L');
  gRoute.append('path').attr('d',rd).attr('fill','none').attr('stroke','#fff').attr('stroke-width',3.2).attr('stroke-dasharray','3 8').attr('stroke-linecap','round').attr('class','flowing').style('opacity',0).transition().delay(reduce?0:10200).duration(600).style('opacity',1);
  const rpath=gRoute.append('path').attr('d',rd).attr('fill','none').attr('stroke','none').node(),RL=rpath.getTotalLength();
  const dots=[0,.33,.66].map(()=>gRoute.append('rect').attr('width',10).attr('height',8).attr('rx',2).attr('fill',LG).attr('stroke','#0d0e10').attr('x',-5).attr('y',-4).style('opacity',0));
  K.timers.push(setTimeout(()=>dots.forEach(d=>d.transition().duration(400).style('opacity',1)),reduce?0:10500));
  /* llamadas con ícono */
  const call=(anchor,card,ic,col,title,sub,delay)=>{const g=gCall.append('g').style('opacity',0);const w=Math.max(title.length*7.8,(sub||'').length*6.3)+26;const up=card[1]<anchor[1];const ey=up?card[1]+52+(sub?24:12):card[1]-34;
   g.append('line').attr('x1',anchor[0]).attr('y1',anchor[1]).attr('x2',card[0]).attr('y2',ey).attr('stroke','#fff').attr('stroke-width',1.6);g.append('circle').attr('cx',anchor[0]).attr('cy',anchor[1]).attr('r',5).attr('fill','#fff').attr('stroke',BLUE).attr('stroke-width',2);
   const cd=g.append('g').attr('transform',`translate(${card[0]},${card[1]})`);cd.append('rect').attr('x',-34).attr('y',-34).attr('width',68).attr('height',68).attr('rx',16).attr('fill','#F4F2EC').attr('stroke',col).attr('stroke-width',3);
   cd.append('use').attr('href',ic).attr('x',-22).attr('y',-22).attr('width',44).attr('height',44).style('color',col==='#F2B53A'?'#B27D00':col);
   const t=cd.append('g').attr('transform','translate(0,52)');t.append('rect').attr('x',-w/2).attr('y',-14).attr('width',w).attr('height',sub?38:24).attr('rx',10).attr('fill','#0d0e10').attr('fill-opacity',.88).attr('stroke','#444');
   K.text(t,0,2,title,{fs:13,fw:700,c:'#fff'});if(sub)K.text(t,0,19,sub,{fs:11,fw:500,c:'#B8B3A8'});K.show(g,delay);return g};
  Z.forEach((z,i)=>K.timers.push(setTimeout(()=>z.g.transition().duration(reduce?0:900).style('opacity',1),reduce?0:3000+i*500)));
  const corTop=PJ(cg[0],cg[1],40),humP=PJ(HUMS[1].c[0],HUMS[1].c[1],0);
  call(Z[2].top,[395,98],'#e-recicla',AM,'Recicladores y compost','residuos que vuelven',6200);
  call(Z[1].top,[575,98],'#e-tienda',PK,'Circuitos cortos','tiendas, comedores, colegios',5100);
  call(corTop,[765,98],'#e-central',OR,'Corabastos','un nodo más del circuito',7300);
  call(humP,[950,98],'#e-humedal',BL,'Humedales','con menos carga',8400);
  call(Z[0].top,[1115,98],'#e-huerta',GN,'Huertas comunitarias','nodos de abastecimiento',4000);
  const jp=PL(-74.1405,4.6125,5);call(jp,[jp[0]+95,jp[1]+20],'#s-grupo',PU,'Juntas de Acción Comunal','mesas locales',9300);
  K.run(t=>{dots.forEach((d,i)=>{const u=reduce?.5:((t*.06+i/3)%1);const p=rpath.getPointAtLength(u*RL);d.attr('transform',`translate(${p.x},${p.y})`)});
   hw.forEach(({rp,g},i)=>{const k=((t*.4+i*.33)%1);rp.attr('points',pstr(ellipse(g[0],g[1],260+k*340,180+k*230,1))).attr('stroke-opacity',.9*(1-k))})});
 });
 return()=>{}}

const CV={
 macros:{title:'Diez macromodelos; seis actúan directamente sobre esta problemática',cols:5,pcols:2,stagger:120,maxh:210,items:[
  {ic:'i-moneda',t:'Comercio ecológico y autonomía territorial',col:'#DE9F50',hl:1},{ic:'i-ciclo',t:'Circularidad',col:'#8EBF4C',hl:1},{ic:'i-gota',t:'Hidrocéntrico',col:'#4EAECF',hl:1},{ic:'i-alerta',t:'Límites ecológicos',col:'#E0623F',hl:1},{ic:'i-grupo',t:'Organización comunitaria',col:'#F2B53A',hl:1},
  {ic:'i-org',t:'Gobernanza heterárquica',col:'#9382E0',hl:1},{ic:'i-hoja',t:'Ecocéntrico',col:'#B8B3A8',dim:1},{ic:'i-hoja',t:'Regenerativo',col:'#B8B3A8',dim:1},{ic:'i-hoja',t:'Biocéntrico',col:'#B8B3A8',dim:1},{ic:'i-hog',t:'Redes de cuidado',col:'#B8B3A8',dim:1}]},
 tres:{title:'Tres conceptos distintos',cols:3,items:[
  {ic:'i-pub',t:'Gobierno',d:'Autoridades con competencias legales.',ids:['A34','A32','A33'],col:'#4EAECF'},
  {ic:'i-delib',t:'Gobernanza',d:'Coordinación entre actores públicos y no estatales.',ids:['A34','A35','A25'],col:'#9382E0'},
  {ic:'i-grupo',t:'Autogobierno',d:'Quienes comparten un recurso establecen sus propias reglas.',ids:['A25','A13','A15'],col:'#F2B53A',hl:1}],
  footer:'Proponemos autogobierno sobre flujos concretos, que coexiste con las instituciones y necesita su reconocimiento.'},
 comunes:{title:'Recursos comunes alrededor de Corabastos, coordinados con reglas compartidas',cols:4,pcols:1,items:[
  {ic:'i-reloj',t:'Horarios de cargue',ids:['A10','A13','A37'],col:'#DE9F50'},{ic:'i-ciclo',t:'Residuos orgánicos',ids:['A25','A26','A27'],col:'#8EBF4C'},
  {ic:'i-doc',t:'Información de precios',ids:['A06','A15','A08'],col:'#4EAECF'},{ic:'i-moneda',t:'Recursos para el abastecimiento',ids:['A15','INF03','COM_HUE'],col:'#F2B53A'}],
  footer:'No sustituye las competencias institucionales: distribuye la capacidad de decisión y coordina a los actores.'},
 soberania:{title:'Seguridad alimentaria y soberanía alimentaria',cols:2,items:[
  {ic:'i-check',t:'Seguridad alimentaria',d:'Acceso a alimentos suficientes, inocuos y nutritivos.',col:'#B8B3A8',dim:1},
  {ic:'i-mazo',t:'Soberanía alimentaria',d:'Capacidad de decidir cómo se producen y distribuyen los alimentos.',ids:['A08','A15','INF03','COM_HUE'],col:'#8EBF4C',hl:1}],
  footer:'Nuestra propuesta trabaja sobre la soberanía: circuitos organizados por sus propios participantes.'},
 etapas:{title:'Cinco etapas para tomar una decisión',cols:5,pcols:1,arrows:true,loop:true,stagger:350,items:[
  {ic:'i-agenda',t:'1. Agenda',d:'Se identifica un problema y entra a la agenda local.',col:'#E0623F'},{ic:'i-delib',t:'2. Deliberación',d:'Mesas donde cada actor presenta necesidades, datos e intereses.',col:'#E0623F'},
  {ic:'i-mazo',t:'3. Resolución',d:'Reglas acordadas previamente.',col:'#E0623F'},{ic:'i-campana',t:'4. Ejecución',d:'Se asignan recursos y se actúa.',col:'#E0623F'},{ic:'i-lupa',t:'5. Seguimiento',d:'Se revisan resultados y se corrige.',col:'#E0623F'}],
  footer:'Corregir reabre el ciclo.'},
 fondo:{title:'Ejemplo: Fondo Común de Abastecimiento (propuesta)',cols:4,pcols:1,arrows:true,stagger:400,items:[
  {ic:'i-agenda',t:'Proponen',d:'Tenderos, comedores y huertas.',ids:['A15','INF03','COM_HUE'],col:'#F2B53A'},
  {ic:'i-delib',t:'Discuten las condiciones',d:'Productores, transportadores y comerciantes.',ids:['A08','A10','A06'],col:'#DE9F50'},
  {ic:'i-mazo',t:'Núcleo de abastecimiento',d:'Define aportes, compras y reglas de decisión.',col:'#9382E0'},
  {ic:'i-moneda',t:'Fondo común',d:'Administración rotativa, informes públicos y vocerías revocables.',col:'#8EBF4C',hl:1}]},
 indicadores:{title:'Indicadores para medir los resultados',cols:5,pcols:1,stagger:220,items:[
  {ic:'i-casa',t:'Abastecimiento local por circuitos cortos',d:'porcentaje',col:'#8EBF4C'},{ic:'i-cadena',t:'Dependencia de Corabastos',d:'proporción de compras',col:'#DE9F50'},
  {ic:'i-obj',t:'Viajes de carga en horas de congestión',d:'número de viajes',col:'#E0623F'},{ic:'i-doc',t:'Información disponible sobre precios',d:'acceso y frecuencia',col:'#4EAECF'},
  {ic:'i-ciclo',t:'Residuos orgánicos aprovechados',d:'toneladas',col:'#8EBF4C'}]},
 flujos:{title:'Tres flujos en los que quienes viven y trabajan en el territorio participan',cols:3,items:[
  {ic:'i-reloj',t:'Horarios de carga',ids:['A10','A13','A37'],col:'#DE9F50'},{ic:'i-ciclo',t:'Residuos orgánicos',ids:['A25','A26','A23'],col:'#8EBF4C'},{ic:'i-moneda',t:'Compras de alimentos',ids:['A15','INF03','COM_HUE'],col:'#F2B53A'}],
  footer:'Reglas claras, recursos, capacidad de decisión y seguimiento.'}
};

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
   return sub=>cs.style('opacity',(d,i)=>i<=sub?1:.15)}},
 {b:3,key:'jerarquia',src:'Red de actores del grupo',draw(ctx){jerarquiaView(ctx)}},
 {b:3,key:'heterarquia2',src:'Red de actores del grupo',draw(ctx){return heterarquiaView(ctx)}},
 {b:3,key:'cv_macros',src:'Guion del grupo',draw(ctx){cardsView(ctx,CV.macros)}},
 {b:3,key:'cv_tres',src:'Guion del grupo',draw(ctx){cardsView(ctx,CV.tres)}},
 {b:3,key:'cv_comunes',src:'Guion del grupo',draw(ctx){cardsView(ctx,CV.comunes)}},
 {b:3,key:'cv_soberania',src:'Guion del grupo',draw(ctx){cardsView(ctx,CV.soberania)}},
 {b:3,key:'cv_etapas',src:'Guion del grupo',draw(ctx){cardsView(ctx,CV.etapas)}},
 {b:3,key:'cv_fondo',src:'Guion del grupo',draw(ctx){cardsView(ctx,CV.fondo)}},
 {b:3,key:'cv_indicadores',src:'Guion del grupo',draw(ctx){cardsView(ctx,CV.indicadores)}},
 {b:3,key:'cv_flujos',src:'Guion del grupo',draw(ctx){cardsView(ctx,CV.flujos)}},
 {b:3,key:'mapa',src:'IDECA · Datos Abiertos Bogotá',draw(ctx){return mapaView(ctx)}},
 {b:3,key:'propuesta',src:'Propuesta del grupo sobre capas IDECA · Datos Abiertos Bogotá · ilustrativo',draw(ctx){return propuestaView(ctx)}},
 {b:3,key:'escena',src:'Ilustración animada de la propuesta del grupo · no representa obras existentes',draw(ctx){return escenaView(ctx)}},
 {b:3,key:'axo',src:'Edificios, manzanas, arbolado, parques, agua y vías de Kennedy (IDECA / OpenStreetMap) · zonas de la propuesta ilustrativas',draw(ctx){return axoView(ctx)}},
 {b:3,key:'soberania2',src:'Guion del grupo · ilustrativo: la proporción no es una meta ni un dato',draw(ctx){return soberaniaFullView(ctx)}},
 {b:3,key:'barrio',src:'Ilustración de la propuesta del grupo · no representa obras existentes',draw(ctx){return barrioView(ctx)}},
 {b:3,key:'conceptos',src:'Guion del grupo · gobierno, gobernanza y autogobierno',draw(ctx){return conceptosView(ctx)}},
 {b:3,key:'etapas',src:'Guion del grupo · cinco etapas de decisión',draw(ctx){return etapasView(ctx)}},
 {b:3,key:'comunes',src:'Guion del grupo · recursos comunes (Ostrom)',draw(ctx){return comunesView(ctx)}},
 {b:3,key:'soberania',src:'Guion del grupo · ilustrativo: la proporción no es una meta ni un dato',draw(ctx){return soberaniaView(ctx)}},
 {b:3,key:'redes',src:'Ilustración animada de la propuesta del grupo · no representa obras existentes',draw(ctx){return redesView(ctx)}},
 {b:3,key:'fondoanim',src:'Ilustración animada de la propuesta del grupo · es una propuesta, no una estructura existente',draw(ctx){return fondoView(ctx)}},
 {b:3,key:'vensim2',slow:1300,src:'Modelo Vensim del grupo',draw(ctx){const v=vensim(ctx);const Z=[null,['12','28','29','125'],['28','29','125'],['12','28','29','125'],['9','10','11','26','27','91','94','95','112','113','114'],['1','2','3','5','6','7','50','168']];return sub=>v.zoom(Z[sub])}},
 {b:3,key:'causal2',src:'Guion del grupo · hipótesis por verificar',draw(ctx){return causal2View(ctx)}},
 {b:3,key:'policentro',src:'Guion del grupo',draw(ctx){return policentroView(ctx)}},
 {b:3,key:'ambitos',src:'Guion del grupo',draw(ctx){ambitosView(ctx)}},
 {b:3,key:'mandato',src:'Guion del grupo',draw(ctx){mandatoView(ctx)}}
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
