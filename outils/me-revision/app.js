/* Révision M.E. (P2, M. Boucherat) : parcours, fiche en blocs, cartes, QCM, lexique.
   Catégories à cocher en haut de chaque onglet : tout l'outil n'affiche que ce qui est choisi.
   Progression détaillée gardée sur l'appareil (localStorage « me-revision ») ;
   le score des séries et l'activité du jour passent par ../compte.js (window.Compte). */
(function(){
'use strict';
const C=window.CONTENT,S=window.SCH;
const ID='me-revision';
const $=(s,r=document)=>r.querySelector(s);
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const now=()=>Date.now();
const fr=n=>(Math.round(n*10)/10).toLocaleString('fr-FR');
const CH=Object.fromEntries(C.chapters.map(c=>[c.id,c]));
const ALL=C.chapters.map(c=>c.id);
const TERM=Object.fromEntries(C.terms.map(t=>[t.id,t]));
const QS=C.qcm,QID=Object.fromEntries(QS.map(q=>[q.id,q]));
const chName=id=>(CH[id]&&(CH[id].short||CH[id].name))||id;
const L5='ABCDEFGH';
const R=window.Reglages;

/* ---------- icônes ---------- */
const I={
book:'<path d="M4 4.5A1.5 1.5 0 0 1 5.5 3H20v15H5.5A1.5 1.5 0 0 0 4 19.5z"/><path d="M4 19.5A1.5 1.5 0 0 0 5.5 21H20v-3"/><path d="M8 7h8M8 11h6"/>',
cards:'<rect x="3" y="7" width="13" height="14" rx="2"/><path d="M7 3h12a2 2 0 0 1 2 2v12"/>',
qcm:'<rect x="3" y="3.5" width="7" height="7" rx="1.5"/><rect x="3" y="13.5" width="7" height="7" rx="1.5"/><path d="M13.5 7h7.5M13.5 17h7.5M4.8 7l1.5 1.5 2.4-3"/>',
abc:'<path d="M4 18 8 6l4 12M5.4 14h5.2"/><path d="M15 6v12h3.5a3 3 0 0 0 0-6H15m0 0h3a3 3 0 0 0 0-6h-3"/>',
route:'<circle cx="6" cy="19" r="2.5"/><circle cx="18" cy="5" r="2.5"/><path d="M8.5 19H16a3.5 3.5 0 0 0 0-7H8a3.5 3.5 0 0 1 0-7h7.5"/>',
grid:'<rect x="3.5" y="3.5" width="7" height="7" rx="2"/><rect x="13.5" y="3.5" width="7" height="7" rx="2"/><rect x="3.5" y="13.5" width="7" height="7" rx="2"/><rect x="13.5" y="13.5" width="7" height="7" rx="2"/>',
sliders:'<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>',
search:'<circle cx="11" cy="11" r="7"/><path d="m20 20-4-4"/>',
x:'<path d="M6 6l12 12M18 6 6 18"/>',
play:'<path d="M7 4.5v15l12-7.5z"/>',
pause:'<path d="M8 5v14M16 5v14"/>',
redo:'<path d="M20 11a8 8 0 1 0-2.3 5.7"/><path d="M20 4v7h-7"/>',
bulb:'<path d="M9 18h6M10 21h4M12 3a6 6 0 0 0-3.5 10.9c.8.6 1.5 1.6 1.5 2.6V17h4v-.5c0-1 .7-2 1.5-2.6A6 6 0 0 0 12 3z"/>',
stamp:'<path d="M6 21h12M8 17h8v-3c0-2-2.5-3-2.5-5.5a1.5 1.5 0 1 0-3 0C10.5 11 8 12 8 14z"/>',
loop:'<path d="M17 2l3 3-3 3"/><path d="M4 11V9a4 4 0 0 1 4-4h12M7 22l-3-3 3-3"/><path d="M20 13v2a4 4 0 0 1-4 4H4"/>',
spark:'<path d="M12 3v5M12 16v5M3 12h5M16 12h5M6 6l3 3M15 15l3 3M6 18l3-3M15 9l3-3"/>',
check:'<path d="M5 12.5 9.5 17 19 7"/>',
left:'<path d="M15 5l-7 7 7 7"/>',
right:'<path d="M9 5l7 7-7 7"/>',
clock:'<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
half:'<circle cx="12" cy="12" r="9"/><path d="M12 3v18" /><path d="M12 3a9 9 0 0 1 0 18z" fill="currentColor"/>',
heart:'<path d="M12 20.5s-7.5-4.6-9.3-9.2C1.4 7.9 3.6 4.5 7 4.5c2 0 3.3 1.1 5 3 1.7-1.9 3-3 5-3 3.4 0 5.6 3.4 4.3 6.8-1.8 4.6-9.3 9.2-9.3 9.2z"/>'
};
const ic=(n,c)=>`<svg${c?` class="${c}"`:''} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${I[n]||''}</svg>`;

/* ---------- état (sur l'appareil) ---------- */
const KEY='me-revision';
const corrSite=()=>{try{return R&&R.lire().correction==='fin'?'end':'each'}catch(e){return 'each'}};
const DEF={v:1,q:{},t:{},b:{},prefs:{topics:[],src:'mix',n:20,order:'smart',corr:corrSite(),bareme:'evalbox',cc:''}};
const clone=o=>JSON.parse(JSON.stringify(o));
function load(){try{const s=JSON.parse(localStorage.getItem(KEY)||'null');if(s&&s.v===1){const d=clone(DEF);return Object.assign(d,s,{prefs:Object.assign(d.prefs,s.prefs||{})});}}catch(e){}return clone(DEF)}
let P=load();
function save(){try{localStorage.setItem(KEY,JSON.stringify(P))}catch(e){}}

/* ---------- catégories sélectionnées ---------- */
const custom=()=>P.prefs.topics.filter(id=>CH[id]).length>0;
const sel=()=>custom()?ALL.filter(id=>P.prefs.topics.includes(id)):ALL.slice();
function toggleTopic(id){let t=P.prefs.topics.filter(x=>CH[x]);const i=t.indexOf(id);if(i>=0)t.splice(i,1);else t.push(id);if(t.length===ALL.length)t=[];P.prefs.topics=t;save();if(LEX.term&&TERM[LEX.term]&&!sel().includes(TERM[LEX.term].ch))LEX.term=null;CARD=null;render()}
const inSel=(q,s)=>s.includes(q.ch)||(q.ch2&&s.includes(q.ch2));
const srcOk=(q,src)=>src==='an'?q.src==='an':src==='cl'?q.src!=='an':true;
const pool=(src,s)=>QS.filter(q=>inSel(q,s||sel())&&srcOk(q,src));
const termsSel=()=>C.terms.filter(t=>sel().includes(t.ch));
const known=id=>P.t[id]&&P.t[id][0]>=2,toReview=id=>P.t[id]&&P.t[id][0]<=1;
const wrongIds=s=>QS.filter(q=>inSel(q,s||sel())&&P.q[q.id]&&P.q[q.id][0]<=1).map(q=>q.id);
function topicLabel(){return custom()?sel().map(chName).join(', '):'toutes les catégories'}
function counts(ch){const qs=QS.filter(q=>q.ch===ch||q.ch2===ch);return{an:qs.filter(q=>q.src==='an').length,q:qs.length,t:C.terms.filter(t=>t.ch===ch).length}}
function bubbles(small){const isC=custom();
 return `<div class="bubbles${small?' sm':''}" role="group" aria-label="Catégories à réviser"><button class="bub" data-act="alltopics" aria-pressed="${!isC}"><span class="ring${!isC?' on':''}"><span class="face">${ic('grid','ico')}</span></span><span class="bl">Tout</span><span class="bn">${QS.length} QCM</span></button>${C.chapters.map(c=>{const on=!isC||P.prefs.topics.includes(c.id);return `<button class="bub" data-act="topic" data-id="${c.id}" aria-pressed="${isC&&on}"><span class="ring${on?' on':''}"><span class="face">${thumb(c.fig)}</span></span><span class="bl">${esc(c.short||c.name)}</span><span class="bn">${counts(c.id).q} QCM</span></button>`}).join('')}</div>`}

/* ---------- fiches découpées en blocs ---------- */
const BL={};
ALL.forEach(ch=>{const raw=C.fiches[ch]||'';const parts=raw.split(/(?=<h3>)/);let intro='';const blocs=[];
 parts.forEach(p=>{const m=p.match(/^<h3>([\s\S]*?)<\/h3>([\s\S]*)$/);if(m)blocs.push({id:ch+'-'+blocs.length,ch,title:m[1],html:m[2]});else intro+=p});
 BL[ch]={intro,blocs}});
const blocsOf=s=>(s||sel()).flatMap(ch=>BL[ch].blocs);
const bDone=id=>P.b[id]&&P.b[id][0]===1;
function traps(s){const out=[];(s||sel()).forEach(ch=>{const re=/<div class="box pie">([\s\S]*?)<\/div>/g;let m;while((m=re.exec(C.fiches[ch]||'')))out.push({ch,html:m[1]})});return out}

/* ---------- figures (schémas redessinés en SVG) ---------- */
const figCache={};
function fig(key){if(!key||key.startsWith('img:'))return'';if(!figCache[key]){const f=S[key];figCache[key]=f?f():''}return figCache[key]}
const thumb=fig;
const linkify=s=>s.replace(/\[\[([a-z0-9-]+)(?:\|([^\]]+))?\]\]/g,(m,id,txt)=>TERM[id]?`<button class="tl" data-act="term" data-id="${id}">${txt||esc(TERM[id].t)}</button>`:(txt||id));
function proc(h){h=linkify(h||'');
 h=h.replace(/<figure data-fig="([^"]+)" data-cap="([^"]*)"><\/figure>/g,(m,k,cap)=>`<figure>${fig(k)}<figcaption>${cap}</figcaption></figure>`);
 return h.replace('<div data-widget="amplitudes"></div>',ampWidget())}
function ampWidget(){const rows=[['Flexion',50,35],['Extension',35,50],['Abduction',10,5],['Adduction',30,15]];
 return `<div class="amp" role="img" aria-label="Répartition des amplitudes entre radio-carpienne et médio-carpienne">${rows.map(([n,a,b])=>`<div class="amp-r"><b>${n} <span>${a+b}°</span></b><div class="amp-b"><i class="rc" style="width:${a/85*100}%">${a}°</i><i class="mc" style="width:${b/85*100}%">${b}°</i></div></div>`).join('')}<p class="amp-l"><span><i class="rc"></i>radio-carpienne</span><span><i class="mc"></i>médio-carpienne</span></p></div>`}

/* ---------- notions cliquables, animations ---------- */
const NT=window.NOTIONS;
const nt=(s,o)=>NT?NT.text(s,o):esc(s);
const ntH=(h,o)=>NT?NT.html(h,o):h;
const ANT=QS.filter(q=>q.src==='an').length;
function setAnimBtn(b,paused){b.innerHTML=ic(paused?'play':'pause')+'<span>'+(paused?'Lecture':'Pause')+'</span>';b.setAttribute('aria-label',paused?'Lancer l\'animation':'Mettre l\'animation en pause')}
function animBlock(k){return `<figure class="anim-w">${S[k]()}<button type="button" class="animbtn" data-act="anim" aria-label="Mettre l'animation en pause">${ic('pause')}<span>Pause</span></button></figure>`}
function initAnims(root){if(!matchMedia('(prefers-reduced-motion: reduce)').matches)return;(root||document).querySelectorAll('.anim-w svg').forEach(v=>{try{v.pauseAnimations();v.setCurrentTime(+v.dataset.still||0)}catch(e){}const b=v.parentNode.querySelector('.animbtn');if(b)setAnimBtn(b,true)})}
function figFor(t){if(!t)return'';if(t.anim&&S[t.anim])return animBlock(t.anim);return t.s?fig(t.s):''}
function qNotions(q){const ok=q.o.filter(o=>o[1]).map(o=>o[0]).join(' · ');const ids=[...(q.t||[]),...(NT?NT.find(q.q):[]),...(NT?NT.find(ok):[])];return ids.filter((id,i)=>TERM[id]&&ids.indexOf(id)===i)}
function corrFig(q){let h='';if(q.fig&&S[q.fig])h=q.fig.startsWith('anim')?animBlock(q.fig):fig(q.fig);
 else{const t=qNotions(q).map(id=>TERM[id]).find(t=>(t.anim&&S[t.anim])||(t.s&&!t.s.startsWith('img:')&&S[t.s]));h=t?figFor(t):''}
 return h?`<div class="enimg"><h4>${ic('spark')}La bonne réponse en image</h4>${h}</div>`:''}
function notionsBox(q){const ids=qNotions(q).slice(0,4);if(!ids.length)return'';const seen=new Set(ids);
 return `<div class="notions"><h4>${ic('bulb')}Les notions de la question</h4><ul>${ids.map(id=>{const t=TERM[id],o={seen,skip:[id]};return `<li><button class="nname" data-act="term" data-id="${id}">${esc(t.t)}</button><p>${nt(t.d,o)}</p>${t.r?`<p class="mem">${nt(t.r,o)}</p>`:''}</li>`}).join('')}</ul></div>`}

/* ---------- stats ---------- */
function mastery(ch){const qs=QS.filter(q=>q.ch===ch);if(!qs.length)return 0;let s=0;qs.forEach(q=>{const r=P.q[q.id];if(r)s+=Math.min(r[0],4)/4});return Math.round(100*s/qs.length)}
function countdown(){if(!P.prefs.cc)return null;const d=new Date(P.prefs.cc+'T08:00:00');if(isNaN(d))return null;return Math.ceil((d-new Date())/864e5)}
function steps(){
 const s=sel(),bs=blocsOf(s),bd=bs.filter(b=>bDone(b.id)).length,ts=termsSel(),kn=ts.filter(t=>known(t.id)).length,rv=ts.filter(t=>toReview(t.id)).length;
 const p=pool('mix',s),seen=p.filter(q=>P.q[q.id]).length,wr=wrongIds(s).length,nq=Math.min(P.prefs.n||p.length,pool(P.prefs.src,s).length);
 return [
  {t:'Comprendre',s:`la fiche en ${bs.length} blocs, avec schémas · ${bd} compris`,min:Math.max(5,Math.round(bs.length*1.2)),pct:bs.length?bd/bs.length:1,done:bs.length>0&&bd===bs.length,a:'go',v:'fiche'},
  {t:'Retenir',s:`${ts.length} cartes, une par une · ${kn} connues`,min:Math.max(3,Math.round(ts.length*.25)),pct:ts.length?kn/ts.length:1,done:ts.length>0&&kn>=ts.length*.8,a:'cards'},
  {t:'Tester',s:`${nq} QCM tirés au sort · ${seen} / ${p.length} déjà faits`,min:Math.max(3,Math.round(nq*.5)),pct:p.length?Math.min(1,seen/(p.length*.5)):1,done:p.length>0&&seen>=p.length*.5,a:'launch'},
  {t:'Demain matin',s:wr||rv?`seulement ce que tu as raté : ${wr} QCM, ${rv} cartes`:'seulement ce que tu auras raté',min:5,pct:seen>0&&!wr&&!rv?1:0,done:seen>0&&!wr&&!rv,a:'tomorrow'}]}

/* ---------- routes ---------- */
const TABS=[['parcours','Parcours','route'],['fiche','Fiche','book'],['cartes','Cartes','cards'],['qcm','QCM','qcm'],['lexique','Lexique','abc']];
const TITLES={parcours:'Révision M.E.',fiche:'La fiche',cartes:'Cartes',qcm:'QCM',lexique:'Lexique'};
let sub='parcours';
function route(){if(document.getElementById('sheet'))closeSheet();const h=(location.hash||'').slice(1);sub=TABS.some(t=>t[0]===h)?h:'parcours';render();window.scrollTo(0,0)}
function go(v){if(location.hash!=='#'+v)location.hash=v;else{render();window.scrollTo(0,0)}}
function render(){
 const m=$('#view');if(!m)return;
 m.innerHTML=sub==='fiche'?vFiche():sub==='lexique'?vLexique():sub==='cartes'?vCartes():sub==='qcm'?vQcm():vHub();
 $('#title').textContent=sub==='qcm'&&Q?(Q.fin?'Résultat':Q.title):TITLES[sub];
 document.querySelectorAll('.mtabs a').forEach(a=>a.setAttribute('aria-current',a.getAttribute('href')==='#'+sub?'page':'false'));
 if(sub==='qcm'&&Q&&!Q.fin&&Q.corr==='end')tick();
 labelTables(m);
 initAnims(m);
}
function labelTables(r){r.querySelectorAll('table.stack').forEach(t=>{const h=[...t.querySelectorAll('thead th')].map(th=>th.textContent);t.querySelectorAll('tbody tr').forEach(tr=>{let i=0;[...tr.children].forEach(td=>{td.setAttribute('data-l',h[i]||'');i+=td.colSpan||1})})})}

/* parcours */
function vHub(){
 const s=sel(),st=steps(),next=st.findIndex(x=>!x.done),cd=countdown();
 const bAll=blocsOf(ALL).filter(b=>bDone(b.id)).length,kAll=C.terms.filter(t=>known(t.id)).length,qOk=QS.filter(q=>P.q[q.id]&&P.q[q.id][2]>0).length;
 const story=st.map(x=>`<span><i style="width:${Math.round(x.pct*100)}%"></i></span>`).join('');
 const rows=st.map((x,i)=>`<li class="${x.done?'done':''}${i===next?' cur':''}"><button data-act="${x.a}"${x.v?` data-v="${x.v}"`:''}><span class="t">${x.min}<small>&nbsp;min</small></span><span class="w"><b>${x.t}</b><span>${x.s}</span></span><span class="ck2">${ic('check')}</span></button></li>`).join('');
 const cta=next<0?`<button class="mb ig wide" data-act="launch">${ic('play')}Tout est fait : une série de plus</button>`:`<button class="mb ig wide" data-act="${st[next].a}"${st[next].v?` data-v="${st[next].v}"`:''}>${ic('play')}${next===0?'Commencer':'Continuer'} : ${st[next].t.toLowerCase()}</button>`;
 const ess=s.map(ch=>(C.ess[ch]||[]).length?(s.length>1?`<li class="eh">${esc(chName(ch))}</li>`:'')+C.ess[ch].map(x=>`<li>${ntH(x)}</li>`).join(''):'').join('');
 const tr=traps(s);
 const prog=s.map(id=>{const m=mastery(id);return `<button class="prog-r" data-act="qcm-ch" data-id="${id}"><b>${esc(chName(id))}</b><span>${m} %</span><span class="meter"><i style="width:${m}%"></i></span></button>`}).join('');
 return `<section class="prof"><span class="ring on"><span class="face"><b>M.E.</b></span></span>
 <div class="pstats"><div><b>${bAll}</b><span>blocs compris</span></div><div><b>${kAll}</b><span>termes connus</span></div><div><b>${qOk}</b><span>QCM réussis</span></div></div>
 <div class="bio"><h2>Modèles explicatifs</h2><p>M. Boucherat · P2 · ${esc(C.meta.sub)}${cd!==null?` · <span class="cd">${cd>0?`<b>J-${cd}</b> avant le CC`:cd===0?'<b>Jour J</b>':'CC passé'}</span>`:` · <button class="tl" data-act="settings">ajoute la date de ton CC</button>`}</p></div></section>
 <section aria-label="Catégories"><div class="sec-h"><h3>Ce que je révise</h3></div>${bubbles(false)}<p class="selnote">${custom()?`Tu révises seulement : <b>${esc(topicLabel())}</b>. <button class="tl" data-act="alltopics">Tout réviser</button>`:'Touche une catégorie pour ne réviser qu\'elle, puis ajoutes-en d\'autres.'}</p></section>
 <div class="hub" style="margin-top:22px">
 <section class="card"><div class="sec-h"><h3>Ton parcours</h3><p>${st.reduce((a,x)=>a+(x.done?0:x.min),0)} min restantes</p></div><div class="storybar" aria-hidden="true">${story}</div><ol class="sched">${rows}</ol>${cta}</section>
 <section class="card"><div class="sec-h"><h3>Si tu n'as que 2 minutes</h3></div><ul class="ess">${ess}</ul></section>
 ${tr.length?`<section class="card"><div class="sec-h"><h3>Pièges des annales</h3><p>${tr.length}</p></div><div class="traps">${tr.map(t=>`<div class="trap"><p class="tg">${esc(chName(t.ch))}</p>${ntH(linkify(t.html))}</div>`).join('')}</div></section>`:''}
 <section class="card quick"><div class="sec-h"><h3>Entraînement rapide</h3></div><div class="seg" role="group" aria-label="Type de questions">${segSrc(pool('an').length,pool('mix').length,pool('cl').length)}</div>
 <button class="mb wide" data-act="launch"${!pool(P.prefs.src).length?' disabled':''}>${ic('play')}Lancer ${Math.min(P.prefs.n||999,pool(P.prefs.src).length)} QCM</button>
 <h3 style="font-size:1rem;margin-top:8px">Maîtrise par catégorie</h3><div class="prog">${prog}</div></section>
 <section class="card full legend-p">${legendInner()}</section></div>`}
function segSrc(a,m,c){return [['an','Annales',a],['mix','Annales + Claude',m],['cl','Claude',c]].map(([v,l,n])=>`<button data-act="src" data-v="${v}" aria-pressed="${P.prefs.src===v}">${l}<small>${v==='an'&&custom()?n+' sur '+ANT:n+' QCM'}</small></button>`).join('')}
function legendInner(){return `<div class="sec-h"><h3>D'où viennent les questions</h3></div><div class="legend"><p>${stampAn('Annale')}La question exacte d'un sujet tombé, avec le corrigé officiel. ${esc(C.meta.exam)}.</p><p>${stampVa()}Une annale modifiée par Claude (côté, mouvement ou vrai-faux inversés). Ce n'est pas une vraie annale.</p><p>${stampCl()}Une question écrite par Claude à partir des cours.</p></div>`}
const stampAn=t=>`<span class="stamp an">${ic('stamp')}${esc(t)}</span>`,stampVa=()=>`<span class="stamp va">${ic('loop')}Variante d'annale</span>`,stampCl=()=>`<span class="stamp cl">${ic('spark')}Claude</span>`;
function stamps(q){return q.src==='an'?stampAn('Annale · '+q.ref):q.src==='va'?stampVa():stampCl()}

/* fiche en blocs */
function vFiche(){
 const s=sel(),bs=blocsOf(s),bd=bs.filter(b=>bDone(b.id)).length;
 const jump=bs.map(b=>`<button data-act="jump" data-id="${b.id}" class="${bDone(b.id)?'on':''}">${s.length>1?esc(chName(b.ch))+' · ':''}${b.title.replace(/<[^>]+>/g,'')}</button>`).join('');
 const secs=s.map(ch=>{const c=CH[ch],B=BL[ch];return `<section class="chsec" id="c-${ch}"><div class="ch-h"><span class="ring on"><span class="face">${thumb(c.fig)}</span></span><h2>${esc(c.name)}</h2></div><p class="src">Source : ${esc(c.src)}</p>${ntH(proc(B.intro))}
  ${B.blocs.map(b=>`<article class="bloc" id="b-${b.id}"><h3>${b.title}</h3>${ntH(proc(b.html))}<button class="okh" data-act="bloc" data-id="${b.id}" aria-pressed="${bDone(b.id)}">${ic('heart')}<span>${bDone(b.id)?'Compris':'J\'ai compris'}</span></button></article>`).join('')}
  <div class="fiche-end"><button class="mb" data-act="qcm-ch" data-id="${ch}">${ic('qcm')}QCM : ${esc(chName(ch))}</button><button class="mb alt" data-act="lex-ch" data-id="${ch}">${ic('abc')}Lexique du chapitre</button></div></section>`}).join('');
 return `${bubbles(true)}<div class="fiche"><div class="fhead" style="margin-top:12px"><h2>La fiche</h2><p><span id="fcount">${bd} / ${bs.length}</span> blocs compris</p></div><div class="meter fmeter"><i id="fbar" style="width:${bs.length?bd/bs.length*100:0}%"></i></div>
 <nav class="bjump" aria-label="Blocs de la fiche">${jump}</nav>${secs}</div>`}

/* lexique */
const LEX={q:'',f:'all',term:null};
const norm=s=>s.toLowerCase().normalize('NFD').replace(/\p{M}/gu,'');
function lexList(){
 const q=norm(LEX.q.trim()),s=sel();
 let ts=C.terms.filter(t=>s.includes(t.ch));
 if(LEX.f==='rev')ts=ts.filter(t=>toReview(t.id));else if(LEX.f==='new')ts=ts.filter(t=>!P.t[t.id]);
 if(q)ts=ts.filter(t=>norm(t.t+' '+(t.syn||'')+' '+t.d).includes(q));
 if(!ts.length)return `<div class="empty">${ic('search')}<p>${LEX.q?'Aucun terme ne correspond.':LEX.f==='rev'?'Aucun terme à revoir.':'Tous les termes ont déjà été vus.'}</p></div>`;
 return s.map(ch=>{const g=ts.filter(t=>t.ch===ch);if(!g.length)return'';return `<p class="tgroup" id="g-${ch}">${esc(CH[ch].name)}</p>`+g.map(t=>`<button class="trow" data-act="term" data-id="${t.id}" aria-current="${LEX.term===t.id}"><span class="th">${t.s?thumb(t.s):`<span class="ini">${esc(t.t.charAt(0))}</span>`}</span><span><b>${esc(t.t)}</b><span>${esc(t.d)}</span></span><i class="dot${known(t.id)?' k':toReview(t.id)?' r':''}" title="${known(t.id)?'connu':toReview(t.id)?'à revoir':'pas encore vu'}"></i></button>`).join('')}).join('')}
function vLexique(){
 const ts=termsSel(),nr=ts.filter(t=>toReview(t.id)).length,nn=ts.filter(t=>!P.t[t.id]).length;
 if(LEX.term&&(!TERM[LEX.term]||!sel().includes(TERM[LEX.term].ch)))LEX.term=null;
 return `<div class="lex-tools">${bubbles(true)}<input type="search" id="lexq" placeholder="Chercher un terme, ex. arthrodie" value="${esc(LEX.q)}" aria-label="Chercher un terme">
 <div class="row"><div class="chips">${[['all','Tous',ts.length],['rev','À revoir',nr],['new','Jamais vus',nn]].map(([f,l,n])=>`<button class="chip" data-act="lexf" data-f="${f}" aria-pressed="${LEX.f===f}">${l} <span class="n">${n}</span></button>`).join('')}</div><button class="mb" data-act="cards">${ic('cards')}Réviser en cartes</button></div></div>
 <div class="lex"><div class="terms" id="terms">${lexList()}</div><div class="detail" id="detail">${LEX.term?termCard(TERM[LEX.term]):`<div class="empty">${ic('book')}<p>Choisis un terme pour voir sa définition et son schéma.</p></div>`}</div></div>`}
function termCard(t){
 const o={seen:new Set(),skip:[t.id]};const see=(t.see||[]).filter(id=>TERM[id]);const qs=QS.filter(q=>(q.t||[]).includes(t.id));
 return `<div class="tc">${HIST.length?`<button class="tback" data-act="tback">${ic('left')}${esc(TERM[HIST[HIST.length-1]].t)}</button>`:''}<h2>${esc(t.t)}</h2>${t.syn?`<p class="syn">${esc(t.syn)}</p>`:''}<p class="chap">${esc(CH[t.ch].name)}</p>
 ${figFor(t)?`<div class="bigfig">${figFor(t)}</div>`:''}<p class="def">${nt(t.d,o)}</p>
 ${t.r?`<div class="box ret"><h4>${ic('bulb')}Pour retenir</h4><p>${nt(t.r,o)}</p></div>`:''}
 ${t.ex?`<h4>${t.ch==='bases'?'Exemples':t.ch==='cotes'?'D\'après les annales':'Ce que dit le cours'}</h4><p>${nt(t.ex,o)}</p>`:''}
 ${see.length?`<h4>Voir aussi</h4><div class="chips">${see.map(id=>`<button class="chip" data-act="term" data-id="${id}">${esc(TERM[id].t)}</button>`).join('')}</div>`:''}
 ${qs.length?`<button class="mb line wide" style="margin-top:16px" data-act="qterm" data-id="${t.id}">${ic('qcm')}${qs.length} QCM sur ce terme</button>`:''}
 <div class="acts"><button class="mb nob" data-act="tagain" data-id="${t.id}">À revoir</button><button class="mb okb" data-act="tknow" data-id="${t.id}">Je connais</button></div></div>`}
function markTerm(id,ok){const r=P.t[id]||[0,0];P.t[id]=[ok?Math.max(2,Math.min(5,r[0]+1)):1,now()];save()}

/* cartes */
let CARD=null;
function buildDeck(f){let ts=termsSel();if(f==='rev')ts=ts.filter(t=>toReview(t.id));else if(f==='new')ts=ts.filter(t=>!P.t[t.id]);const d=ts.map(t=>t.id);for(let i=d.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[d[i],d[j]]=[d[j],d[i]]}CARD={f,deck:d,i:0,flip:false,ok:0,ko:0}}
function vCartes(){
 if(!CARD)buildDeck('all');
 const top=`${bubbles(true)}<div class="fl-top"><div class="seg" role="group" aria-label="Paquet">${[['all','Tous'],['rev','À revoir'],['new','Nouveaux']].map(([f,l])=>`<button data-act="deck" data-f="${f}" aria-pressed="${CARD.f===f}">${l}</button>`).join('')}</div><span class="n">${Math.min(CARD.i+1,CARD.deck.length)} / ${CARD.deck.length}</span></div>`;
 if(!CARD.deck.length)return `<div class="flash">${top}<div class="empty">${ic('cards')}<p>Ce paquet est vide pour ${esc(topicLabel())}.</p></div></div>`;
 if(CARD.i>=CARD.deck.length)return `<div class="flash">${top}<div class="card fl-end"><h2>Paquet terminé</h2><p class="tally"><span><i style="background:var(--ok)"></i>${CARD.ok} je savais</span><span><i style="background:var(--red)"></i>${CARD.ko} à revoir</span></p><div class="row"><button class="mb" data-act="deck" data-f="rev"${CARD.ko?'':' disabled'}>${ic('redo')}Revoir les ${CARD.ko} à revoir</button><button class="mb alt" data-act="deck" data-f="all">Tout le paquet</button></div></div></div>`;
 const t=TERM[CARD.deck[CARD.i]];
 return `<div class="flash">${top}
 <div class="fl-card${CARD.flip?' flip':''}" role="button" tabindex="0" data-act="flip" aria-label="Retourner la carte"><div class="fl-in">
 <div class="fl-f"><span class="fl-ch">${esc(CH[t.ch].short||CH[t.ch].name)}</span><h2>${esc(t.t)}</h2><span class="tap">Touche pour voir la définition</span></div>
 <div class="fl-b"><h3>${esc(t.t)}</h3>${figFor(t)?`<div class="bigfig">${figFor(t)}</div>`:''}<p class="def">${nt(t.d,{skip:[t.id]})}</p>${t.r?`<div class="box ret"><h4>${ic('bulb')}Pour retenir</h4><p>${nt(t.r,{skip:[t.id]})}</p></div>`:''}</div>
 </div></div>
 <div class="fl-acts"><button class="mb nob" data-act="again">À revoir</button><button class="mb okb" data-act="know">Je savais</button></div></div>`}

/* QCM */
let Q=null,QS_TIMER=0;
const SET={n:[[10,'10'],[20,'20'],[40,'40'],[0,'Toutes']],order:[['smart','Intelligent'],['random','Aléatoire'],['course','Du cours']],corr:[['each','Après chaque question'],['end','À la fin (examen)']]};
function vQcm(){if(Q)return Q.fin?(Q.rev!=null?vQuestion(true):vResults()):vQuestion(false);return vSetup()}
function vSetup(){
 const p=pool(P.prefs.src),n=P.prefs.n?Math.min(P.prefs.n,p.length):p.length,wr=wrongIds().length,an=pool('an').length;
 const seg=(k)=>SET[k].map(([v,l])=>`<button data-act="set" data-k="${k}" data-v="${v}" aria-pressed="${String(P.prefs[k])===String(v)}">${l}</button>`).join('');
 return `<div class="qset"><h2>S'entraîner</h2><p class="intro">Comme au CC : sélectionne la ou les bonnes réponses, et ne te fie pas aux pluriels de l'énoncé.</p>
 <div class="field"><span class="lab">Catégories</span>${bubbles(true)}</div>
 <div class="field"><span class="lab">Questions</span><div class="seg" role="group">${segSrc(pool('an').length,pool('mix').length,pool('cl').length)}</div></div>
 <div class="field"><span class="lab">Nombre</span><div class="seg" role="group">${seg('n')}</div></div>
 <div class="field"><span class="lab">Ordre</span><div class="seg" role="group">${seg('order')}</div><small class="muted">Intelligent : tes erreurs d'abord, puis les questions jamais vues, puis celles à revoir.</small></div>
 <div class="field"><span class="lab">Correction</span><div class="seg" role="group">${seg('corr')}</div></div>
 <div class="qquick"><button class="qq" data-act="wrong"${wr?'':' disabled'}><span class="ic">${ic('redo')}</span><span><b>Refaire mes erreurs</b><span>${wr} question${wr>1?'s':''}</span></span></button>
 ${custom()?`<button class="qq" data-act="quick" data-v="an"${an?'':' disabled'}><span class="ic">${ic('stamp')}</span><span><b>Annales de tes catégories</b><span>${an} sur ${ANT} : celles qui parlent de ${esc(topicLabel())}</span></span></button><button class="qq" data-act="quickall"><span class="ic">${ic('stamp')}</span><span><b>Les ${ANT} annales</b><span>tout le sujet du CC, toutes catégories</span></span></button>`:`<button class="qq" data-act="quick" data-v="an"><span class="ic">${ic('stamp')}</span><span><b>Les ${ANT} annales</b><span>les 15 questions des sujets A et B (les mêmes, dans un autre ordre)</span></span></button>`}</div>
 <div class="launch"><p>${n} question${n>1?'s':''} : ${P.prefs.src==='an'?'annales':P.prefs.src==='cl'?'Claude (variantes et inédites)':'annales et Claude'}, ${esc(topicLabel())}</p><button class="mb ig wide" data-act="launch"${n?'':' disabled'}>${ic('play')}Lancer</button></div>
 <section class="card legend-p">${legendInner()}</section></div>`}
function shuffle(a){for(let i=a.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[a[i],a[j]]=[a[j],a[i]]}return a}
function orderIds(list,order){
 if(order==='random')return shuffle(list.map(q=>q.id));
 if(order==='course')return list.slice().sort((a,b)=>ALL.indexOf(a.ch)-ALL.indexOf(b.ch)||('an va cl'.indexOf(a.src)-'an va cl'.indexOf(b.src))||a.id.localeCompare(b.id)).map(q=>q.id);
 const t=now(),iv=[0,0,1,3,7,21];
 return list.map(q=>{const r=P.q[q.id];let p;if(!r)p=1+(q.src==='an'?0:.4);else if(r[0]<=1)p=0;else{const due=r[3]+iv[Math.min(r[0],5)]*864e5;p=due<=t?2:3+(due-t)/864e5}return[p+Math.random()*.3,q.id]}).sort((a,b)=>a[0]-b[0]).map(x=>x[1])}
function startQuiz(ids,title,corr){if(!ids.length){toast('Aucune question pour cette sélection');return}Q={ids,i:0,ans:{},val:{},t0:now(),corr:corr||P.prefs.corr,title:title||'Entraînement',fin:false,rev:null};go('qcm')}
function launch(src){const p=pool(src);let ids=orderIds(p,P.prefs.order);if(P.prefs.n)ids=ids.slice(0,P.prefs.n);startQuiz(ids,src==='an'?'Annales':src==='cl'?'QCM Claude':'Annales + Claude')}
function scoreQ(q,s){const set=new Set(s||[]);let good=0,bad=0,nOk=0;q.o.forEach((o,i)=>{if(o[1])nOk++;if(set.has(i)){if(o[1])good++;else bad++}});const perfect=good===nOk&&bad===0;
 if(P.prefs.bareme==='tor')return{pts:perfect?1:0,max:1,perfect,good,bad,nOk};return{pts:good-.5*bad,max:nOk,perfect,good,bad,nOk}}
function record(q,res){const r=P.q[q.id]||[0,0,0,0,0];P.q[q.id]=[res.perfect?Math.max(2,Math.min(5,r[0]+1)):1,r[1]+1,r[2]+(res.perfect?1:0),now(),res.perfect?1:0];save()}
function vibrer(ok){try{if(R&&R.lire().vibrations!==false&&navigator.vibrate)navigator.vibrate(ok?30:[60,40,60])}catch(e){}}
function verdict(res){const v=res.perfect?1:res.pts>0?2:3;return `<div class="verdict v${v}">${ic(v===1?'check':v===2?'half':'x')}${v===1?'Tout juste':v===2?'Partiellement juste':'Faux'}<span>${res.pts>0&&P.prefs.bareme!=='tor'?'+':''}${fr(res.pts)} / ${fr(res.max)} pt${res.max>1?'s':''}</span></div>`}
function vQuestion(review){
 const id=review?Q.ids[Q.rev]:Q.ids[Q.i],q=QID[id],chosen=Q.ans[id]||[],done=review||!!Q.val[id],vf=q.o.length===2;
 const res=done?scoreQ(q,chosen):null;
 const opts=q.o.map((o,i)=>{const on=chosen.includes(i);let cls='',tag='';if(done){if(o[1]&&on){cls='good';tag='Juste'}else if(o[1]){cls='miss';tag='Oubliée'}else if(on){cls='bad';tag='Fausse'}}
  return `<li><button class="opt ${cls}" data-act="opt" data-i="${i}" aria-pressed="${on}"${done?' tabindex="-1"':''}><span class="bx">${L5[i]}</span><span class="tx">${esc(o[0])}${tag?`<span class="tag">${tag}</span>`:''}</span><span class="why">${esc(o[2]||'')}</span></button></li>`}).join('');
 const n=Q.ids.length,pos=review?Q.rev:Q.i;
 const orig=done&&q.src==='va'&&QID[q.of]?`<details class="orig"><summary>Voir l'annale d'origine</summary><p>${esc(QID[q.of].q)}</p><ol type="A">${QID[q.of].o.map(o=>`<li class="${o[1]?'c':''}">${esc(o[0])}${o[1]?' (juste)':''}</li>`).join('')}</ol><p class="muted">${esc(QID[q.of].ref)}</p></details>`:'';
 const expl=done?`${verdict(res)}${q.ex?`<div class="expl"><h4>Explication</h4><p>${nt(q.ex)}</p></div>`:''}${corrFig(q)}${notionsBox(q)}${orig}`:'';
 const tm=!review&&Q.corr==='end'?`<span class="tm" id="tm">${ic('clock')}<span>00:00</span></span>`:'';
 let foot;
 if(review)foot=`<button class="mb alt" data-act="rprev"${pos?'':' disabled'}>${ic('left')}Précédente</button><button class="mb alt" data-act="rback">Résultats</button><button class="mb alt" data-act="rnext"${pos<n-1?'':' disabled'}>Suivante${ic('right')}</button>`;
 else if(Q.corr==='end')foot=`<button class="mb" data-act="next">${pos<n-1?'Question suivante':'Terminer et corriger'}${ic('right')}</button>`;
 else foot=done?`<button class="mb" data-act="next">${pos<n-1?'Question suivante':'Voir mon résultat'}${ic('right')}</button>`:`<button class="mb" data-act="validate"${chosen.length?'':' disabled'}>Valider</button>`;
 return `<div class="quiz"><div class="qbar"><button class="ib" data-act="${review?'rback':'quit'}" aria-label="${review?'Retour aux résultats':'Quitter la série'}">${ic(review?'left':'x')}</button><span class="meter"><i style="width:${(pos+(done?1:0))/n*100}%"></i></span><span class="n">${pos+1} / ${n}</span>${tm}</div>
 <div class="qhead"><div class="stamps">${stamps(q)}</div><span class="stamp ch">${esc(chName(q.ch))}${q.ch2?' · '+esc(chName(q.ch2)):''}</span></div>
 <p class="qstem">${nt(q.q)}</p><p class="qtype">${vf?'Vrai ou faux':'Une ou plusieurs réponses justes'}</p>
 <ul class="opts${done?' done':''}">${opts}</ul>${expl}<div class="qfoot">${foot}</div></div>`}
function vResults(){
 let pts=0,max=0,ok=0,part=0,ko=0;const by={};
 Q.ids.forEach(id=>{const q=QID[id],r=scoreQ(q,Q.ans[id]);pts+=r.pts;max+=r.max;if(r.perfect)ok++;else if(r.pts>0)part++;else ko++;const b=by[q.ch]||(by[q.ch]={p:0,m:0});b.p+=r.pts;b.m+=r.max});
 const note=max?Math.max(0,pts)/max*20:0,wr=Q.ids.filter(id=>!scoreQ(QID[id],Q.ans[id]).perfect);
 const mins=Math.round((Q.t1-Q.t0)/60000);
 return `<div class="res"><h2>${esc(Q.title)}</h2><div class="score"><b>${fr(note)}</b><span>/ 20</span></div>
 <p class="tally"><span><i style="background:var(--ok)"></i>${ok} tout juste</span><span><i style="background:var(--yel)"></i>${part} partielle${part>1?'s':''}</span><span><i style="background:var(--red)"></i>${ko} fausse${ko>1?'s':''}</span><span class="muted">${fr(Math.max(0,pts))} / ${fr(max)} points · ${mins} min</span></p>
 <div class="row"><button class="mb" data-act="redo"${wr.length?'':' disabled'}>${ic('redo')}Refaire les ${wr.length} erreur${wr.length>1?'s':''}</button><button class="mb alt" data-act="newset">Nouvelle série</button></div>
 <h3 style="margin-top:24px">Par catégorie</h3><div class="prog" style="margin-top:10px">${Object.keys(by).map(ch=>{const b=by[ch],m=b.m?Math.round(100*Math.max(0,b.p)/b.m):0;return `<div class="prog-r"><b>${esc(chName(ch))}</b><span>${fr(Math.max(0,b.p))} / ${fr(b.m)}</span><span class="meter"><i style="width:${m}%"></i></span></div>`}).join('')}</div>
 <h3 style="margin-top:24px">Revoir les questions</h3><div class="rlist">${Q.ids.map((id,i)=>{const q=QID[id],r=scoreQ(q,Q.ans[id]),v=r.perfect?'check':r.pts>0?'half':'x';return `<button class="ritem" data-act="review" data-i="${i}"><span style="color:var(--${r.perfect?'ok':r.pts>0?'yel':'red'})">${ic(v)}</span><span>${esc(q.q)}</span><span class="p">${fr(r.pts)} / ${fr(r.max)}</span></button>`}).join('')}</div></div>`}
function tick(){clearInterval(QS_TIMER);const upd=()=>{const el=$('#tm span');if(!el||!Q||Q.fin){clearInterval(QS_TIMER);return}const s=Math.floor((now()-Q.t0)/1000);el.textContent=String(Math.floor(s/60)).padStart(2,'0')+':'+String(s%60).padStart(2,'0')};upd();QS_TIMER=setInterval(upd,1000)}
function finishQuiz(){Q.fin=true;Q.t1=now();if(Q.corr==='end')Q.ids.forEach(id=>record(QID[id],scoreQ(QID[id],Q.ans[id])));Q.rev=null;render();window.scrollTo(0,0);
 /* site : objectif du jour, série 🔥 et meilleur score (bonnes réponses / questions) */
 const ok=Q.ids.filter(id=>scoreQ(QID[id],Q.ans[id]).perfect).length,Cpt=window.Compte;
 if(Cpt){try{Cpt.noterActivite();Cpt.enregistrerScore(ID,ok,Q.ids.length)}catch(e){}}}

/* ---------- feuille, réglages, toast ---------- */
function openSheet(html){const s=$('#sheet');s.innerHTML=`<div class="grab"></div><div class="sh-top"><button class="ib" data-act="close" aria-label="Fermer">${ic('x')}</button></div>${html}`;s.classList.add('on');$('#scrim').classList.add('on');s.scrollTop=0;s.focus();initAnims(s)}
function closeSheet(){$('#sheet').classList.remove('on');$('#scrim').classList.remove('on');HIST=[];CUR=null}
let resetArm=false;
function settingsHtml(){const seg=(k,opts)=>`<div class="seg" role="group">${opts.map(([v,l])=>`<button data-act="pref" data-k="${k}" data-v="${v}" aria-pressed="${P.prefs[k]===v}">${l}</button>`).join('')}</div>`;
 return `<h2 style="font-size:1.6rem;margin-bottom:16px">Réglages de M.E.</h2>
 <div class="field"><label for="cc">Date du CC de M.E.</label><input type="date" id="cc" value="${esc(P.prefs.cc)}"></div>
 <div class="field"><span class="lab">Barème</span>${seg('bareme',[['evalbox','Comme ton sujet'],['tor','Tout ou rien']])}<small class="muted">Ton sujet : +1 par bonne réponse cochée, −0,5 par mauvaise.</small></div>
 <p class="muted">Thème, taille du texte et vibrations : dans les Réglages du site. Ta progression dans cet outil (blocs, cartes, QCM) est gardée sur cet appareil ; ton meilleur score et tes jours d'activité suivent ton compte.</p>
 <button class="mb nob wide" data-act="reset">${resetArm?'Confirmer : tout effacer':'Effacer ma progression dans M.E.'}</button>`}
let toastT=0;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(toastT);toastT=setTimeout(()=>t.classList.remove('on'),2200)}

/* ---------- interactions ---------- */
let HIST=[],CUR=null;
function openTerm(id,back){if(!TERM[id])return;const sh=$('#sheet').classList.contains('on');if(!sh){HIST=[];CUR=null}if(!sh&&sub==='lexique'&&matchMedia('(min-width:1000px)').matches){LEX.term=id;const d=$('#detail');if(d){d.innerHTML=termCard(TERM[id]);d.scrollTop=0}document.querySelectorAll('.trow').forEach(b=>b.setAttribute('aria-current',b.dataset.id===id))}else{if(!back&&sh&&CUR&&CUR!==id)HIST.push(CUR);CUR=id;openSheet(termCard(TERM[id]))}}
function toggleBloc(btn,id){const on=!bDone(id);P.b[id]=[on?1:0,now()];save();btn.setAttribute('aria-pressed',on);btn.lastChild.textContent=on?'Compris':'J\'ai compris';
 const j=document.querySelector(`.bjump [data-id="${id}"]`);if(j)j.classList.toggle('on',on);
 const bs=blocsOf(),bd=bs.filter(b=>bDone(b.id)).length;const c=$('#fcount');if(c)c.textContent=bd+' / '+bs.length;const f=$('#fbar');if(f)f.style.width=(bs.length?bd/bs.length*100:0)+'%';
 if(on){const art=btn.closest('.bloc'),nx=art&&art.nextElementSibling;if(nx&&nx.classList.contains('bloc'))setTimeout(()=>nx.scrollIntoView({behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'auto':'smooth',block:'start'}),250);if(bd===bs.length)toast('Fiche comprise en entier')}}
document.addEventListener('click',e=>{
 const b=e.target.closest('[data-act]');if(!b||b.disabled)return;const a=b.dataset.act,id=b.dataset.id;
 switch(a){
 case'topic':toggleTopic(id);break;
 case'alltopics':P.prefs.topics=[];save();CARD=null;render();break;
 case'go':go(b.dataset.v);break;
 case'jump':{const el=document.getElementById('b-'+id);if(el)el.scrollIntoView({block:'start'});break}
 case'bloc':toggleBloc(b,id);break;
 case'term':openTerm(id);break;
 case'lex-ch':LEX.f='all';LEX.q='';go('lexique');setTimeout(()=>{const g=document.getElementById('g-'+id);if(g)g.scrollIntoView({block:'start'})},60);break;
 case'qcm-ch':startQuiz(orderIds(pool(P.prefs.src,[id]),P.prefs.order).slice(0,P.prefs.n||999),chName(id));break;
 case'lexf':LEX.f=b.dataset.f;render();break;
 case'cards':buildDeck(sub==='lexique'?LEX.f:'all');go('cartes');break;
 case'deck':buildDeck(b.dataset.f);render();break;
 case'flip':CARD.flip=!CARD.flip;b.classList.toggle('flip',CARD.flip);break;
 case'know':case'again':{const t=CARD.deck[CARD.i];markTerm(t,a==='know');a==='know'?CARD.ok++:CARD.ko++;CARD.i++;CARD.flip=false;render();break}
 case'tknow':case'tagain':markTerm(id,a==='tknow');toast(a==='tknow'?'Noté : connu':'Noté : à revoir');if($('#terms'))$('#terms').innerHTML=lexList();if($('#sheet').classList.contains('on'))closeSheet();break;
 case'qterm':closeSheet();startQuiz(QS.filter(q=>(q.t||[]).includes(id)).map(q=>q.id),TERM[id].t);break;
 case'src':P.prefs.src=b.dataset.v;save();render();break;
 case'set':{const k=b.dataset.k,v=b.dataset.v;P.prefs[k]=k==='n'?+v:v;save();render();break}
 case'launch':launch(P.prefs.src);break;
 case'tomorrow':{const w=wrongIds();if(w.length)startQuiz(shuffle(w),'Mes erreurs');else if(termsSel().some(t=>toReview(t.id))){buildDeck('rev');go('cartes')}else toast('Rien à revoir pour l\'instant : fais d\'abord les QCM');break}
 case'quick':{const src=b.dataset.v;const p=pool(src);startQuiz(src==='an'?orderIds(p,'course'):orderIds(p,P.prefs.order).slice(0,P.prefs.n||999),src==='an'?(custom()?'Annales · '+topicLabel():'Annales'):'QCM Claude');break}
 case'quickall':startQuiz(orderIds(QS.filter(q=>q.src==='an'),'course'),'Les '+ANT+' annales');break;
 case'wrong':startQuiz(shuffle(wrongIds()),'Mes erreurs');break;
 case'opt':{if(!Q||Q.fin)break;const qid=Q.ids[Q.i];if(Q.val[qid])break;const q=QID[qid];let s=(Q.ans[qid]||[]).slice();const i=+b.dataset.i;
  if(q.o.length===2)s=s.includes(i)?[]:[i];else s=s.includes(i)?s.filter(x=>x!==i):s.concat(i);Q.ans[qid]=s;
  if(Q.corr==='end'){render()}else{document.querySelectorAll('.opt').forEach((el,k)=>el.setAttribute('aria-pressed',s.includes(k)));const v=document.querySelector('[data-act=validate]');if(v)v.disabled=!s.length}break}
 case'validate':{const qid=Q.ids[Q.i],res=scoreQ(QID[qid],Q.ans[qid]);Q.val[qid]=true;record(QID[qid],res);vibrer(res.perfect);render();break}
 case'next':if(Q.i<Q.ids.length-1){Q.i++;render();window.scrollTo(0,0)}else finishQuiz();break;
 case'quit':Q=null;clearInterval(QS_TIMER);render();break;
 case'review':Q.rev=+b.dataset.i;render();window.scrollTo(0,0);break;
 case'rprev':Q.rev--;render();break;case'rnext':Q.rev++;render();break;
 case'rback':Q.rev=null;render();break;
 case'redo':{const w=Q.ids.filter(x=>!scoreQ(QID[x],Q.ans[x]).perfect);startQuiz(shuffle(w),'Mes erreurs');break}
 case'newset':Q=null;render();break;
 case'anim':{const v=b.closest('.anim-w').querySelector('svg'),p=v.animationsPaused();if(p)v.unpauseAnimations();else v.pauseAnimations();setAnimBtn(b,!p);break}
 case'tback':{const prev=HIST.pop();CUR=null;openTerm(prev,true);break}
 case'settings':resetArm=false;openSheet(settingsHtml());break;
 case'close':closeSheet();break;
 case'pref':{P.prefs[b.dataset.k]=b.dataset.v;save();openSheet(settingsHtml());render();break}
 case'reset':if(!resetArm){resetArm=true;openSheet(settingsHtml())}else{const prefs=P.prefs;P=clone(DEF);P.prefs=prefs;save();resetArm=false;closeSheet();Q=null;CARD=null;render();toast('Progression effacée')}break;
 }
});
document.addEventListener('input',e=>{if(e.target.id==='lexq'){LEX.q=e.target.value;$('#terms').innerHTML=lexList()}});
document.addEventListener('change',e=>{if(e.target.id==='cc'){P.prefs.cc=e.target.value;save();if(sub==='parcours')render()}});
document.addEventListener('keydown',e=>{
 if(e.key==='Escape'&&$('#sheet').classList.contains('on')){closeSheet();return}
 if(sub==='cartes'&&CARD&&CARD.i<CARD.deck.length&&!e.target.closest('input')){if(e.key===' '||e.key==='Enter'){e.preventDefault();const c=$('.fl-card');if(c)c.click()}else if(e.key==='ArrowRight'){const k=$('[data-act=know]');if(k)k.click()}else if(e.key==='ArrowLeft'){const k=$('[data-act=again]');if(k)k.click()}}
});
$('#scrim').addEventListener('click',closeSheet);

/* ---------- démarrage ---------- */
$('#defs').innerHTML=S.defs;
$('#mtabs').innerHTML=TABS.map(([h,l,i])=>`<a href="#${h}">${ic(i)}<span>${l}</span></a>`).join('');
route();
window.addEventListener('hashchange',route);
})();
