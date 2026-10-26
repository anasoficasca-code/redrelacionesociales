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
