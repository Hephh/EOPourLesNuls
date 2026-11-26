/* Schémas animés (SVG + SMIL), mêmes couleurs que les planches de schemas.js.
   data-still = seconde affichée quand l'animation est en pause (mouvements réduits). Chargé après schemas.js. */
(function(){
'use strict';
const S=window.SCH;
const svg=(w,h,label,still,body)=>`<svg class="sch anim" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}" data-still="${still}">${body}</svg>`;
const tx=(x,y,lines,a,c)=>`<text class="lb${c?' '+c:''}" x="${x}" y="${y}" text-anchor="${a||'start'}">${[].concat(lines).map((s,i)=>`<tspan x="${x}" dy="${i?14.5:0}">${s}</tspan>`).join('')}</text>`;
const L=(x,y,ex,ey,t,s,c)=>{const l=s==='l';return `<path class="ld" d="M${x} ${y}L${ex} ${ey}"/><circle class="dt" cx="${x}" cy="${y}" r="1.8"/>`+tx(l?ex-4:ex+4,ey+4,t,l?'end':'start',c)};
const cl=d=>`<path class="clo" d="${d}"/><path class="cl" d="${d}"/>`;
/* animation en boucle : valeurs + instants (0 à 1) ; spline = mouvement adouci, discrete = bascule nette */
const SPL='.42 0 .58 1';
const go=(attr,values,times,dur,mode)=>`<animate attributeName="${attr}" values="${values}" keyTimes="${times}" dur="${dur}" repeatCount="indefinite"${mode==='d'?' calcMode="discrete"':` calcMode="spline" keySplines="${Array(times.split(';').length-1).fill(SPL).join(';')}"`}/>`;
const goT=(type,values,times,dur)=>`<animateTransform attributeName="transform" type="${type}" values="${values}" keyTimes="${times}" dur="${dur}" repeatCount="indefinite" calcMode="spline" keySplines="${Array(times.split(';').length-1).fill(SPL).join(';')}"/>`;

/* ---------- Pronation et supination de l'avant-bras (bras droit vu de face) ---------- */
S.anim_pronosup=()=>{
 const D='6s',KT='0;.15;.45;.65;.95;1';
 const sup='M148 58L146 198',pro='M148 58L188 194',R=[sup,sup,pro,pro,sup,sup].join(';');
 const hand=`<rect class="sk" x="104" y="204" width="17" height="42" rx="8.5" transform="rotate(26 112 225)"/>`+
  `<path class="sk" d="M126 200H204V238C204 258 188 270 165 270C142 270 126 258 126 238Z"/>`;
 const palm=`<g>${go('opacity','1;0;1','0;.3;.8',D,'d')}<path class="ld" d="M138 226C152 233 178 233 194 224M140 244C156 249 176 249 190 242"/></g>`;
 const back=`<g opacity="0">${go('opacity','0;1;0','0;.3;.8',D,'d')}<path class="ld" d="M146 204V246M158 204V250M172 204V250M184 204V246"/></g>`;
 const lab=(vis,lines)=>`<g${vis?'':' opacity="0"'}>${go('opacity',vis?'1;0;1':'0;1;0','0;.3;.8',D,'d')}<text class="cap" x="236" y="200">${lines[0]}</text>${tx(236,218,lines.slice(1),'start','m')}</g>`;
 return svg(330,294,'Animation : l\'avant-bras passe de la supination (paume en avant, radius et ulna parallèles) à la pronation (paume en arrière, le radius croise l\'ulna), puis revient.',3.3,
  `<rect class="sk" x="118" y="34" width="94" height="172" rx="36"/>`+
  `<path class="bo" d="M140 0H190V22C190 30 204 34 206 42C208 50 200 56 192 56C184 56 178 52 165 52C152 52 146 56 138 56C130 56 122 50 124 42C126 34 140 30 140 22Z"/>`+
  `<rect class="bo" x="176" y="54" width="13" height="146" rx="5"/>`+
  `<path class="ribo" d="${sup}">${go('d',R,KT,D)}</path><path class="rib" d="${sup}">${go('d',R,KT,D)}</path>`+
  `<g transform="translate(165 0)"><g>${goT('scale','1 1;1 1;-1 1;-1 1;1 1;1 1',KT,D)}<g transform="translate(-165 0)">${hand}${palm}${back}</g></g></g>`+
  `<g>${go('opacity','1;0;1','0;.3;.8',D,'d')}${tx(165,284,'la paume se voit','middle','m')}</g><g opacity="0">${go('opacity','0;1;0','0;.3;.8',D,'d')}${tx(165,284,'le dos de la main se voit','middle','m')}</g>`+
  `<path class="ar2" d="M112 182C134 172 196 172 218 182"/>`+
  L(147,88,104,78,'radius','l')+L(184,96,226,86,'ulna')+tx(132,16,'humérus','end','m')+
  lab(true,['Supination','paume en avant','radius ∥ ulna'])+lab(false,['Pronation','paume en arrière','le radius croise','l\'ulna']));
};

/* ---------- Pronation douloureuse de l'enfant : le mécanisme en 4 temps ---------- */
S.anim_pd=()=>{
 const D='8s',KT='0;.18;.4;.58;.8;.92;1';
 const step=(n,on,title,detail)=>{
  const vals=n===0?'1;0;1':'0;1;0';
  const times=n===0?'0;.18;.92':n===1?'0;.18;.4':n===2?'0;.4;.58':'0;.58;.92';
  return `<g${on?'':' opacity="0"'}>${go('opacity',vals,times,D,'d')}<text class="cap" x="165" y="268" text-anchor="middle">${title}</text>${tx(165,285,detail,'middle','m')}</g>`};
 return svg(330,296,'Animation : coude en extension et pronation ; on tire sur la main, la tête radiale descend, le ligament annulaire glisse au-dessus d\'elle et reste coincé entre la tête radiale et le capitulum.',6.6,
  `<g transform="translate(62 4) scale(1.25)">`+
   `<path class="bo" d="M52 0H112V40C112 62 100 76 82 78C64 76 52 62 52 40Z"/>`+cl('M58 58C64 72 74 78 82 78C90 78 100 72 106 58')+
   L(56,30,26,20,'capitulum','l')+tx(22,34,'(humérus)','end','m')+
   `<g>${goT('translate','0 0;0 0;0 16;0 16;0 8;0 8;0 0',KT,D)}`+
    `<path class="bo" d="M62 88C72 84 92 84 102 88V106C102 110 98 112 94 114L92 172H72L70 114C66 112 62 110 62 106Z"/>`+cl('M64 88C74 85 90 85 100 88')+
    L(66,124,30,136,'tête radiale','l')+
    `<path class="ar" d="M64 154A19 6 0 1 0 101 154"/>`+tx(108,166,'pronation','start','r')+
   `</g>`+
   `<g>${goT('translate','0 0;0 0;0 0;0 -10;0 -10;0 -10;0 0',KT,D)}`+
    `<rect class="li" x="56" y="94" width="52" height="13" rx="6"/>`+
    `<g opacity="0">${go('opacity','0;1;0','0;.58;.92',D,'d')}<rect x="51" y="89" width="62" height="23" rx="11" style="fill:none;stroke:var(--red);stroke-width:2.2"/></g>`+
    L(108,100,130,84,['ligament','annulaire'])+
   `</g>`+
  `</g>`+
  `<g opacity="0">${go('opacity','0;1;0','0;.18;.58',D,'d')}<path class="ar" d="M112 196V240"/>${tx(104,222,'traction','end','r b')}</g>`+
  step(0,true,'1 · Extension + pronation','coude tendu, paume tournée vers le bas')+
  step(1,false,'2 · Traction','on tire sur la main : la tête radiale descend')+
  step(2,false,'3 · Le ligament glisse','l\'anneau passe au-dessus de la tête radiale')+
  step(3,false,'4 · Coincé','coude bloqué en extension et en pronation'));
};
})();
