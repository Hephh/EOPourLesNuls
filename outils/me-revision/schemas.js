/* Schémas SVG façon planche d'atlas. Couleurs = variables CSS (clair / sombre). */
(function(){
'use strict';
const R=Math.PI/180,f=n=>Math.round(n*10)/10;
const P=(cx,cy,rx,ry,a)=>[f(cx+rx*Math.cos(a*R)),f(cy+ry*Math.sin(a*R))];
const arc=(cx,cy,rx,ry,a0,a1,c)=>{const[x0,y0]=P(cx,cy,rx,ry,a0),[x1,y1]=P(cx,cy,rx,ry,a1),d=a1-a0;return `<path class="${c||'ar'}" d="M${x0} ${y0}A${rx} ${ry} 0 ${Math.abs(d)>180?1:0} ${d>0?1:0} ${x1} ${y1}"/>`};
const svg=(w,h,label,body)=>`<svg class="sch" viewBox="0 0 ${w} ${h}" role="img" aria-label="${label}">${body}</svg>`;
const cl=d=>`<path class="clo" d="${d}"/><path class="cl" d="${d}"/>`;
const lg=d=>`<path class="lgo" d="${d}"/><path class="lg" d="${d}"/>`;
const tx=(x,y,lines,a,c)=>`<text class="lb${c?' '+c:''}" x="${x}" y="${y}" text-anchor="${a||'start'}">${[].concat(lines).map((s,i)=>`<tspan x="${x}" dy="${i?14.5:0}">${s}</tspan>`).join('')}</text>`;
/* légende avec trait : cible (x,y) -> (ex,ey) ; s='l' texte à gauche */
const L=(x,y,ex,ey,t,s,c)=>{const l=s==='l';return `<path class="ld" d="M${x} ${y}L${ex} ${ey}"/><circle class="dt" cx="${x}" cy="${y}" r="1.8"/>`+tx(l?ex-4:ex+4,ey+4,t,l?'end':'start',c)};
const AX=(x,y)=>`<circle class="axc" cx="${x}" cy="${y}" r="6"/><circle class="dt" cx="${x}" cy="${y}" r="2"/>`;
const CAP=(x,y,a,b)=>`<text class="cap" x="${x}" y="${y}" text-anchor="middle">${a}</text>`+(b?tx(x,y+15,b,'middle','m'):'');
const zz=(x0,x1,y0,n,step,off)=>{let s='';for(let i=0;i<=n;i++)s+=`L${(i%2?x1:x0)+off} ${f(y0+i*step)}`;return s};

const S={};

S.classif=()=>svg(330,170,'Les trois grandes familles d\'articulations',
 `<rect class="fi" x="44" y="30" width="22" height="66"/>`+
 `<path class="bo" d="M12 30${zz(48,60,30,6,11,-2)}L12 96Z"/><path class="bo" d="M98 30${zz(48,60,30,6,11,2)}L98 96Z"/>`+
 `<path class="bo" d="M124 30H152V96H124Z"/><path class="bo" d="M178 30H206V96H178Z"/>`+
 `<rect class="ca" x="152" y="34" width="4" height="58"/><rect class="ca" x="174" y="34" width="4" height="58"/><rect class="fc" x="156" y="28" width="18" height="70" rx="2"/>`+
 `<path class="sy" d="M247 46C233 56 233 92 245 102H305C317 92 317 56 303 46Z"/>`+
 `<path class="bo" d="M240 78C250 88 262 92 275 92C288 92 300 88 310 78L312 82C314 96 306 104 296 106V112H254V106C244 104 236 96 238 82Z"/>`+
 cl('M244 82C253 89 263 91 275 91C287 91 297 89 306 82')+
 `<path class="bo" d="M261 14H289V36C301 42 307 54 305 64C303 74 291 79 275 79C259 79 247 74 245 64C243 54 249 42 261 36Z"/>`+
 cl('M248 69C254 77 264 80 275 80C286 80 296 77 302 69')+
 `<path class="cp" d="M248 44C232 56 232 92 244 104"/><path class="cp" d="M302 44C318 56 318 92 306 104"/>`+
 CAP(55,128,'Synarthrose',['fibreuse','immobile'])+CAP(165,128,'Amphiarthrose',['cartilagineuse','peu mobile'])+CAP(275,128,'Diarthrose',['synoviale','mobile']));

S.synoviale=()=>svg(330,214,'Structure d\'une diarthrose',
 `<path class="sy" d="M57 60C24 80 22 126 40 152L180 152C198 126 196 80 163 60Z"/>`+
 `<path class="bo" d="M30 100C44 118 72 132 110 132C148 132 176 118 190 100C196 116 190 140 178 158L174 214L46 214L42 158C30 140 24 116 30 100Z"/>`+
 `<path class="bo" d="M78 0H142V38C142 52 172 58 176 78C179 96 158 108 110 108C62 108 41 96 44 78C48 58 78 52 78 38Z"/>`+
 cl('M50 92C60 104 82 110 110 110C138 110 160 104 170 92')+cl('M40 110C54 122 78 129 110 129C142 129 166 122 180 110')+
 `<path class="mb" d="M60 66C32 84 30 124 44 148"/><path class="mb" d="M160 66C188 84 190 124 176 148"/>`+
 `<path class="cp" d="M57 60C24 80 22 126 40 152"/><path class="cp" d="M163 60C196 80 198 126 180 152"/>`+
 lg('M150 44C214 72 216 140 177 178')+
 L(132,24,226,24,'os')+L(193,76,226,52,'ligament')+L(152,106,226,80,'cartilage articulaire')+L(110,120,226,108,'cavité (synovie)')+L(184,114,226,136,'membrane synoviale')+L(189,129,226,164,'capsule'));

S.arthrodie=()=>svg(330,176,'Arthrodie : surfaces planes qui glissent',
 `<path class="sy" d="M30 58C12 68 14 104 40 114L184 114C204 104 202 68 174 58Z"/>`+
 `<path class="bo" d="M30 72V38C30 22 46 14 68 16C90 18 102 10 124 10C152 10 174 18 174 40V72Z"/>`+
 `<rect class="ca" x="30" y="72" width="144" height="6"/><rect class="ca" x="40" y="86" width="144" height="6"/>`+
 `<path class="bo" d="M40 92H184V126C184 146 166 156 142 154C120 152 108 160 86 158C60 156 40 148 40 130Z"/>`+
 `<path class="cp" d="M30 58C12 68 14 104 40 114"/><path class="cp" d="M174 58C200 68 202 104 184 114"/>`+
 `<path class="ar" d="M126 44H72"/><path class="ar" d="M84 124H138"/>`+
 L(160,75,216,46,'surfaces planes')+L(178,89,216,80,'cartilage')+L(196,93,216,112,'capsule')+L(138,124,216,146,'glissement','r','r'));

S.trochoide=()=>svg(330,184,'Trochoïde : un pivot tourne dans un anneau',
 `<circle class="sy" cx="112" cy="92" r="50"/>`+
 `<path class="bo" d="M14 46H76Q50 92 76 138H14Z"/>`+cl('M74 54Q51 92 74 130')+
 lg('M77.5 47.9A56 56 0 1 1 77.5 136.1')+
 `<circle class="bo" cx="112" cy="92" r="40"/><circle class="clo" cx="112" cy="92" r="40"/><circle class="cl" cx="112" cy="92" r="40"/>`+
 arc(112,92,24,24,-70,200)+AX(112,92)+
 L(158,60,200,40,'ligament annulaire')+L(136,110,200,126,'pivot (tête radiale)')+L(112,68,200,84,'rotation','r','r')+tx(44,160,'ulna','middle','m'));

S.trochleenne=()=>svg(330,196,'Trochléenne : une poulie sur une crête',
 `<path class="ax" d="M22 82H226"/>`+
 `<path class="bo" d="M92 0H148V36C156 46 178 52 182 66C186 88 176 106 160 106C146 106 138 96 120 96C102 96 94 106 80 106C64 106 54 88 58 66C62 52 84 46 92 36Z"/>`+
 cl('M61 84C65 100 71 107 80 107C94 107 102 97 120 97C138 97 146 107 160 107C169 107 175 100 179 84')+
 `<path class="bo" d="M64 126C70 121 76 120 82 120C96 120 104 112 120 112C136 112 144 120 158 120C164 120 170 121 176 126C178 138 170 148 156 154L152 196H88L84 154C70 148 62 138 64 126Z"/>`+
 cl('M67 123C73 119 77 119 82 119C96 119 104 111 120 111C136 111 144 119 158 119C163 119 167 119 173 123')+
 arc(236,82,7,18,-50,250)+
 L(170,60,250,26,'trochlée (poulie)')+L(120,94,250,118,'gorge')+L(120,113,250,146,'crête')+tx(250,72,['flexion-','extension'],'start','r'));

S.condylienne=()=>svg(330,212,'Condylienne : convexe dans les deux sens',
 `<path class="bo" d="M28 94C42 112 62 118 82 118C102 118 122 112 136 94L140 98C142 122 130 136 114 142L112 172H52L50 142C34 136 22 122 24 98Z"/>`+cl('M32 99C46 113 64 116 82 116C100 116 118 113 132 99')+
 `<path class="bo" d="M60 0H104V40C104 50 128 56 130 76C132 96 106 104 82 104C58 104 32 96 34 76C36 56 60 50 60 40Z"/>`+cl('M38 88C46 100 64 105 82 105C100 105 118 100 126 88')+
 arc(82,104,64,64,-130,-50,'ar2')+
 `<path class="bo" d="M206 92C216 110 230 118 246 118C262 118 276 110 286 92L290 96C292 120 282 134 268 140L266 172H226L224 140C210 134 200 120 202 96Z"/>`+cl('M209 98C219 112 232 116 246 116C260 116 273 112 283 98')+
 `<path class="bo" d="M228 0H264V44C264 54 280 60 280 78C280 96 264 104 246 104C228 104 212 96 212 78C212 60 228 54 228 44Z"/>`+cl('M215 90C221 100 233 105 246 105C259 105 271 100 277 90')+
 arc(246,104,60,60,-130,-50,'ar2')+
 CAP(82,190,'De face','convexe sur concave')+CAP(246,190,'De profil','convexe sur concave'));

S.selle=()=>svg(330,212,'En selle : concave dans un sens, convexe dans l\'autre',
 `<path class="bo" d="M28 94C42 112 62 118 82 118C102 118 122 112 136 94L140 98C142 122 130 136 114 142L112 172H52L50 142C34 136 22 122 24 98Z"/>`+cl('M32 99C46 113 64 116 82 116C100 116 118 113 132 99')+
 `<path class="bo" d="M60 0H104V40C104 50 128 56 130 76C132 96 106 104 82 104C58 104 32 96 34 76C36 56 60 50 60 40Z"/>`+cl('M38 88C46 100 64 105 82 105C100 105 118 100 126 88')+
 arc(82,104,64,64,-130,-50,'ar2')+
 `<path class="bo" d="M210 114C220 106 232 102 246 102C260 102 272 106 282 114C286 130 278 142 264 148L262 172H230L228 148C214 142 206 130 210 114Z"/>`+cl('M213 112C223 105 233 103 246 103C259 103 269 105 279 112')+
 `<path class="bo" d="M228 0H264V40C264 54 286 60 288 82V100C274 92 260 88 246 88C232 88 218 92 204 100V82C206 60 228 54 228 40Z"/>`+cl('M208 98C220 92 232 90 246 90C260 90 272 92 284 98')+
 arc(246,100,62,62,-130,-50,'ar2')+
 CAP(82,190,'De face','convexe sur concave')+CAP(246,190,'De profil','concave sur convexe'));

S.spheroide=()=>svg(330,204,'Sphéroïde : une boule dans une cavité, 3 axes',
 `<path class="sy" d="M62.8 96.3A46 46 0 1 0 149.2 96.3Z"/>`+
 `<path class="bo" d="M62.8 96.3A46 46 0 1 0 149.2 96.3L162 92C184 96 202 110 202 132V204H10V132C10 110 28 96 50 92Z"/>`+cl('M65.6 97.3A43 43 0 1 0 146.4 97.3')+
 `<path class="bo" d="M92 0H120V76A38 38 0 1 1 92 76Z"/>`+cl('M142.7 102.2A38 38 0 1 1 69.3 102.2')+
 `<path class="ax" d="M106 4V198"/><path class="ax" d="M14 112H200"/>`+AX(106,112)+
 arc(106,30,26,8,15,165)+arc(206,112,7,18,-50,250)+arc(106,112,60,60,-152,-108,'ar2')+
 L(125,79,222,56,'tête sphérique')+L(147,127,222,132,'cavité creuse')+L(125,145,222,168,'cartilage')+tx(222,26,'3 axes','start','r'));







S.syndesmose=()=>svg(330,216,'Syndesmose : deux os reliés à distance',
 `<path class="sy" d="M97 22H149V160H100Z" style="fill:var(--fib-bg)"/>`+
 [0,1,2,3,4,5,6,7].map(i=>`<path class="fbl" d="M98 ${26+i*15}L148 ${40+i*15}"/>`).join('')+
 `<path class="bo" d="M24 16H96L100 132C104 162 100 186 92 216H32C26 186 22 162 26 132Z"/><path class="bo" d="M150 16H176L180 142C184 174 180 194 172 216H150C144 194 142 174 146 142Z"/>`+
 `<path class="li" d="M98 160L148 174L146 184L96 170Z"/><path class="li" d="M95 180L146 192L144 202L93 190Z"/>`+
 tx(60,11,'tibia','middle','m')+tx(163,11,'fibula','middle','m')+L(124,70,222,56,['membrane','interosseuse'])+L(124,174,222,170,'ligaments'));



S.syssarcose=()=>svg(330,190,'Syssarcose : deux os séparés par des muscles',
 `<path class="mu" d="M44 76C82 58 138 58 176 76L198 140C156 106 64 106 22 140Z"/>`+
 [0,1,2,3,4].map(i=>`<path class="mul" d="M${58+i*26} ${70-Math.abs(2-i)*3}L${44+i*32} ${124-Math.abs(2-i)*6}"/>`).join('')+
 `<path class="bo" d="M14 150C60 104 160 104 206 150L206 164C160 120 60 120 14 164Z"/>`+
 `<path class="bo" d="M40 64C80 44 140 44 180 64L176 76C138 58 82 58 44 76Z"/>`+
 `<path class="ar2" d="M62 34C92 22 128 22 158 34"/>`+
 L(150,54,222,40,'scapula')+L(150,92,222,92,['muscles','(pas de contact os-os)'])+L(176,140,222,150,'thorax (côte)'));




S.congruence=()=>svg(330,196,'Concordance et congruence',
 `<path class="bo" d="M20 92C40 102 60 106 82 106C104 106 124 102 144 92V150H20Z"/>`+
 `<path class="bo" d="M60 0H104V48C114 54 118 68 114 80C108 94 96 100 82 100C68 100 56 94 50 80C46 68 50 54 60 48Z"/><circle class="hl" cx="82" cy="103" r="3.2"/>`+
 `<path class="bo" d="M184 80H208C212 94 230 106 246 106C262 106 280 94 284 80H308V150H184Z"/>`+
 `<path class="bo" d="M224 0H268V48C278 54 282 68 278 80C272 94 260 100 246 100C232 100 220 94 214 80C210 68 214 54 224 48Z"/>`+
 CAP(82,172,'Concordantes','rayons différents')+CAP(246,172,'Congruentes','même rayon'));

S.ddl=()=>svg(330,170,'Degrés de liberté : 1, 2 ou 3 axes',
 [55,165,275].map((x,i)=>`<circle class="bo" cx="${x}" cy="66" r="28"/><path class="ax" d="M${x-46} 66H${x+40}"/>`+arc(x+44,66,5,13,-50,250)+(i>0?`<path class="ax" d="M${x} 22V110"/>`+arc(x,22,13,5,20,320):'')+(i>1?AX(x,66)+arc(x,66,17,17,-40,200):'')).join('')+
 CAP(55,136,'1 axe',['trochléenne','trochoïde'])+CAP(165,136,'2 axes',['condylienne','en selle'])+CAP(275,136,'3 axes','sphéroïde'));

S.plans=()=>svg(330,300,'Les trois plans du corps',
 `<rect class="pl" x="14" y="10" width="192" height="282" rx="4"/>`+
 `<path class="sk" d="M88 166H108L106 280C106 285 102 288 98 288C94 288 90 285 90 280Z"/><path class="sk" d="M112 166H132L130 280C130 285 126 288 122 288C118 288 114 285 114 280Z"/>`+
 `<path class="sk" d="M70 72C62 74 58 82 58 90L54 160C54 166 58 168 62 168C66 168 68 166 68 160L72 96Z"/><path class="sk" d="M150 72C158 74 162 82 162 90L166 160C166 166 162 168 158 168C154 168 152 166 152 160L148 96Z"/>`+
 `<path class="sk" d="M84 64H136C146 64 150 72 150 82L146 150C146 160 140 168 132 168H88C80 168 74 160 74 150L70 82C70 72 74 64 84 64Z"/><rect class="sk" x="102" y="52" width="16" height="14"/><circle class="sk" cx="110" cy="40" r="16"/>`+
 `<path class="pll" d="M110 2V298"/><path class="pll" d="M6 148H214"/>`+
 L(196,30,222,30,['plan frontal','(avant / arrière)'])+L(200,148,222,140,['plan transversal','(haut / bas)'])+L(110,236,222,238,['plan sagittal','(droite / gauche)']));

S.flexion=()=>svg(330,210,'Flexion et extension du coude',
 `<rect class="gh" x="66" y="104" width="26" height="96" rx="13"/>`+
 `<rect class="sk" x="64" y="8" width="30" height="114" rx="15"/>`+
 `<rect class="sk" x="79" y="99" width="104" height="26" rx="13" transform="rotate(-50 79 112)"/>`+
 arc(79,112,64,64,84,-36,'ar2')+
 L(131,74,200,58,'flexion','r','r b')+tx(204,76,'l\'angle se ferme','start','m')+L(128,153,200,160,'extension','r','r b')+tx(204,178,'l\'angle s\'ouvre','start','m'));

S.abduction=()=>svg(330,226,'Abduction et adduction de l\'épaule',
 `<path class="ax" d="M180 6V220"/>`+
 `<path class="sk" d="M160 160H178V222H162Z"/><path class="sk" d="M182 160H200V222H184Z"/>`+
 `<path class="sk" d="M216 66C224 68 228 74 228 82L232 150C232 156 228 158 224 158C220 158 218 156 218 150L214 90Z"/>`+
 `<path class="gh" d="M144 66C136 68 132 74 132 82L128 150C128 156 132 158 136 158C140 158 142 156 142 150L146 90Z"/>`+
 `<path class="sk" d="M156 58H204C212 58 216 64 216 72L212 150C212 158 206 164 198 164H162C154 164 148 158 148 150L144 72C144 64 148 58 156 58Z"/><circle class="sk" cx="180" cy="34" r="16"/>`+
 `<rect class="sk" x="40" y="56" width="110" height="24" rx="12"/>`+
 arc(146,68,76,76,98,166,'ar2')+
 tx(66,150,'abduction','middle','r b')+tx(66,165,'s\'éloigne de l\'axe','middle','m')+tx(238,30,'axe du corps','start','m'));

S.rotation=()=>svg(330,214,'Rotations médiale et latérale (vue de dessus)',
 `<rect class="gh" x="92" y="70" width="24" height="100" rx="12" transform="rotate(38 104 70)"/><rect class="gh" x="92" y="70" width="24" height="100" rx="12" transform="rotate(-38 104 70)"/>`+
 `<ellipse class="sk" cx="180" cy="50" rx="74" ry="26"/><circle class="sk" cx="180" cy="46" r="18"/>`+
 `<rect class="sk" x="92" y="70" width="24" height="100" rx="12"/><circle class="sk" cx="104" cy="70" r="12"/>`+
 arc(104,70,112,112,94,124)+arc(104,70,112,112,86,56)+
 tx(36,196,['rotation latérale','(vers l\'extérieur)'],'middle','r')+tx(200,176,['rotation médiale','(vers l\'intérieur)'],'start','r')+tx(258,30,'vue de dessus','middle','m'));

S.circumduction=()=>svg(330,230,'Circumduction : le segment décrit un cône',
 `<path class="gh" d="M110 30L40 180"/><path class="gh" d="M110 30L180 180"/><ellipse class="gh" cx="110" cy="180" rx="70" ry="22"/>`+
 `<rect class="sk" x="110" y="18" width="176" height="24" rx="12" transform="rotate(80 110 30)"/><circle class="sk" cx="110" cy="30" r="14"/>`+
 arc(110,180,70,22,25,320)+
 tx(204,96,['circumduction'],'start','r b')+tx(204,112,['combine 2 axes :','le bras dessine','un cône'],'start','m'));

S.pronosup=()=>svg(330,262,'Supination et pronation de l\'avant-bras',
 `<rect class="sk" x="50" y="24" width="60" height="160" rx="26"/><rect class="bo" x="60" y="34" width="12" height="144" rx="5"/><rect class="bo" x="88" y="34" width="10" height="144" rx="5"/>`+
 `<rect class="sk" x="36" y="182" width="14" height="34" rx="7" transform="rotate(22 43 199)"/><path class="sk" d="M52 186H108V218C108 230 98 240 80 240C62 240 52 230 52 218Z"/>`+
 `<rect class="sk" x="216" y="24" width="60" height="160" rx="26"/><rect class="bo" x="254" y="34" width="10" height="144" rx="5"/><rect class="bo" x="232" y="32" width="138" height="12" rx="6" transform="rotate(79.2 232 38)"/>`+
 `<rect class="sk" x="276" y="182" width="14" height="34" rx="7" transform="rotate(-22 283 199)"/><path class="sk" d="M218 186H274V218C274 230 264 240 246 240C228 240 218 230 218 218Z"/>`+
 L(66,80,40,66,'radius','l')+L(93,80,124,66,'ulna')+L(240,80,206,66,'radius','l')+L(259,80,292,66,'ulna')+ CAP(80,256,'Supination')+CAP(246,256,'Pronation'));

/* ---------- schémas propres au cours ME ---------- */
const rot=(x,y,cx,cy,d)=>{const a=d*R,c=Math.cos(a),s=Math.sin(a);return[f(cx+(x-cx)*c-(y-cy)*s),f(cy+(x-cx)*s+(y-cy)*c)]};
const wavy=(x1,y1,x2,y2,amp,n)=>{const dx=x2-x1,dy=y2-y1,l=Math.hypot(dx,dy),nx=-dy/l,ny=dx/l;let d=`M${x1} ${y1}`;for(let i=1;i<=n;i++){const t0=(i-.5)/n,t1=i/n,s=i%2?1:-1;d+=`Q${f(x1+dx*t0+nx*amp*s)} ${f(y1+dy*t0+ny*amp*s)} ${f(x1+dx*t1)} ${f(y1+dy*t1)}`}return d};
const rib=d=>`<path class="ribo" d="${d}"/><path class="rib" d="${d}"/>`;
const NUM=(x,y,n)=>`<circle class="num" cx="${x}" cy="${y}" r="9"/><text class="numt" x="${x}" y="${y+4}" text-anchor="middle">${n}</text>`;

function elbow(x0,mode){
  const abd=mode==='abd',pv=abd?[64,114]:[98,112],d=abd?9:-9;
  const R1=rot(46,152,pv[0],pv[1],d),R2=rot(112,152,pv[0],pv[1],d);
  const lle=abd?`<path class="lgs" d="${wavy(30,92,R1[0],R1[1],4,4)}"/>`:`<path class="lgt" d="M30 92L${R1[0]} ${R1[1]}"/>`;
  const lli=abd?`<path class="lgt" d="M128 92L${R2[0]} ${R2[1]}"/>`:`<path class="lgs" d="${wavy(128,92,R2[0],R2[1],4,4)}"/>`;
  const pin=abd?[60,113]:[100,111],op=abd?[104,118]:[60,119];
  return `<g transform="translate(${x0} 0)">`+
  `<g transform="rotate(${d} ${pv[0]} ${pv[1]})"><path class="bo" d="M46 118C52 114 68 114 74 118V126C70 128 68 130 66 134L64 206H48L46 134C42 130 44 122 46 118Z"/><path class="bo" d="M80 114C86 118 94 118 100 114C104 112 110 112 114 116C118 122 116 132 110 140L104 206H84L80 142C78 132 78 122 80 114Z"/></g>`+
  `<path class="bo" d="M60 0H96V54C96 64 112 70 126 78C132 82 132 90 126 94C120 98 114 100 110 104C106 110 100 110 96 106C92 110 86 110 82 106L76 104C72 110 64 112 58 110C50 108 46 102 44 98C38 96 30 94 28 88C26 82 32 76 38 72C50 64 60 62 60 54Z"/>`+
  lle+lli+`<circle class="hl" cx="${pin[0]}" cy="${pin[1]}" r="3.6"/><path class="ar2" style="stroke-width:1.8" d="M${op[0]} ${op[1]-9}V${op[1]+7}"/>`+
  tx(8,14,'latéral','start','m')+tx(150,14,'médial','end','m')+tx(18,124,'LLE','middle','b')+tx(140,124,'LLI','middle','b')+
  `<text class="cap" x="79" y="230" text-anchor="middle">${abd?'Abduction':'Adduction'}</text>`+tx(79,245,[abd?'valgus augmenté':'valgus diminué',abd?'pincé dehors, ouvert dedans':'pincé dedans, ouvert dehors',abd?'LLI tendu, LLE détendu':'LLE tendu, LLI détendu'],'middle','m')+`</g>`;
}
S.coude_abd_add=()=>svg(336,284,'Dysfonctions d\'abduction et d\'adduction du coude',elbow(0,'abd')+elbow(176,'add'));

S.pronation_douloureuse=()=>svg(330,250,'Pronation douloureuse de l\'enfant',
 `<path class="bo" d="M52 0H112V40C112 62 100 76 82 78C64 76 52 62 52 40Z"/>`+cl('M58 58C64 72 74 78 82 78C90 78 100 72 106 58')+
 `<path class="bo" d="M62 88C72 84 92 84 102 88V106C102 110 98 112 94 114L92 204H72L70 114C66 112 62 110 62 106Z"/>`+cl('M64 88C74 85 90 85 100 88')+
 `<rect class="li" x="56" y="94" width="52" height="13" rx="6"/>`+
 `<path class="bo" d="M216 0H276V40C276 62 264 76 246 78C228 76 216 62 216 40Z"/>`+cl('M222 58C228 72 238 78 246 78C254 78 264 72 270 58')+
 `<path class="bo" d="M226 104C236 100 256 100 266 104V122C266 126 262 128 258 130L256 214H236L234 130C230 128 226 126 226 122Z"/>`+cl('M228 104C238 101 254 101 264 104')+
 `<rect class="li" x="220" y="84" width="52" height="13" rx="6"/>`+
 `<path class="ar" d="M292 150V196"/>`+arc(246,186,18,6,20,320)+
 L(108,100,128,128,'ligament','r')+tx(132,146,'annulaire','start')+L(266,90,292,66,'interposé','r','r')+tx(296,214,'traction','middle','r b')+
 CAP(82,226,'Coude normal','autour de la tête')+CAP(246,226,'Pronation douloureuse','entre capitulum et tête'));

S.epaule_complexe=()=>svg(330,250,'Le complexe articulaire de l\'épaule',
 `<path class="bo" style="opacity:.6" d="M160 62L222 58L238 72L236 102L202 206L192 202L154 74Z"/>`+
 [0,1,2].map(i=>rib(`M64 ${88+i*40}C120 ${72+i*40} 188 ${80+i*42} 232 ${120+i*44}`)).join('')+
 `<path class="bo" d="M236 104H266L262 246H244Z"/><circle class="bo" cx="251" cy="90" r="24"/>`+cl('M232 78A24 24 0 0 0 233 104')+
 `<path class="bo" d="M212 40C232 32 256 36 270 50L264 60C252 52 234 50 216 54Z"/>`+
 `<path class="bo" d="M60 44C92 36 118 56 150 48C176 42 198 32 220 36L222 48C200 46 180 56 152 62C120 70 92 52 62 58Z"/>`+
 `<path class="bo" d="M28 44C28 38 32 36 36 36H60C64 36 68 38 68 44V60L64 66V222C64 228 60 230 54 230H40C34 230 32 228 32 222V66L28 60Z"/>`+
 NUM(74,38,1)+NUM(212,24,2)+NUM(222,92,3)+NUM(188,150,4));

S.clavicule=()=>svg(330,196,'Dysfonctions de la clavicule : présternale et suprasternale',
 `<rect class="bo" x="22" y="64" width="44" height="30" rx="6"/>`+
 `<path class="gh" d="M66 76L154 60L156 72L68 88Z"/><path class="bo" d="M66 92L154 62L158 74L70 104Z"/>`+
 `<path class="ar" d="M72 76V112"/>`+tx(80,128,'vers l\'avant','start','r b')+tx(44,56,'sternum','middle','m')+tx(96,22,'vue de dessus','middle','m')+
 `<path class="bo" d="M190 64C190 60 194 58 198 58H206C206 64 214 66 218 66C222 66 230 64 230 58H238C242 58 246 60 246 64V150C246 156 242 158 238 158H198C194 158 190 156 190 150Z"/>`+
 `<path class="gh" d="M246 64L318 60L318 72L246 76Z"/><path class="bo" d="M244 48C268 52 292 64 318 72L316 84C290 76 266 66 244 60Z"/>`+
 `<path class="ar" d="M234 74V40"/><path class="ar" d="M306 96V118"/>`+tx(226,36,'vers le haut','end','r b')+tx(296,134,'épaule basse','middle','m')+tx(318,22,'vue de face','end','m')+
 CAP(84,170,'Présternale','extrémité médiale en avant')+CAP(254,170,'Suprasternale','extrémité médiale en haut'));

function vert(cx,cy,deg,sp,cls){return `<g transform="rotate(${deg} ${cx} ${cy})"><rect class="${cls||'bo'}" x="${cx-32}" y="${cy-10}" width="64" height="20" rx="8"/><rect class="bo" x="${cx+sp-4}" y="${cy+6}" width="8" height="12" rx="3"/></g>`}
S.fryette=()=>svg(330,252,'Lois de Fryette : NSR (type 1) et FRS (type 2)',
 [0,1,2,3,4].map(i=>vert(84+[0,9,13,9,0][i],36+i*32,[-12,-6,0,6,12][i],-9)).join('')+
 vert(246,52,0,0)+vert(246,96,-12,9,'bo hlo')+vert(246,140,0,0)+
 tx(18,18,'G','middle','b')+tx(150,18,'D','middle','b')+tx(182,18,'G','middle','b')+tx(312,18,'D','middle','b')+
 tx(84,202,['side G, rotation D','= côtés opposés'],'middle','r')+tx(246,188,['side G + rotation G','= même côté'],'middle','r')+
 CAP(84,236,'NSR gauche','1re loi, plurisegmentaire')+CAP(246,236,'FRS gauche','2e loi, unisegmentaire'));

function facet(x0,mode){
  const frs=mode==='frs',t=frs?`rotate(-7 ${x0+122} 96)`:`rotate(6 ${x0+38} 96)`;
  return `<path class="bo" d="M${x0+20} 130H${x0+140}V162H${x0+20}Z"/><rect class="bo" x="${x0+28}" y="100" width="22" height="30" rx="3"/><rect class="bo" x="${x0+110}" y="100" width="22" height="30" rx="3"/>`+
  `<g transform="${t}"><path class="bo" d="M${x0+20} 28H${x0+140}V64H${x0+20}Z"/><rect class="bo" x="${x0+28}" y="64" width="22" height="32" rx="3"/><rect class="bo" x="${x0+110}" y="64" width="22" height="32" rx="3"/></g>`+
  (frs?`<path class="ar2" d="M${x0+14} 86V112"/>`+tx(x0+40,186,'divergence max à G','middle','r'):`<path class="ar" d="M${x0+150} 74V94"/><path class="ar" d="M${x0+150} 124V104"/>`+tx(x0+120,186,'convergence max à D','middle','r'))+
  tx(x0+10,18,'G','start','b')+tx(x0+150,18,'D','end','b');
}
S.facettes=()=>svg(330,226,'Facettes : FRS et ERS',facet(0,'frs')+facet(168,'ers')+CAP(80,210,'FRS droite')+CAP(248,210,'ERS droite'));

S.ufs_ufm=()=>{const lv=['C0','C1','C2','C3','C4','C5','C6','C7'].concat([...Array(12)].map((_,i)=>'T'+(i+1)),['L1','L2','L3']),Y=i=>24+i*13.2,ix=n=>lv.indexOf(n);
 const box=(n,i)=>{const w=n==='C0'?54:n[0]==='C'?34:n[0]==='T'?42:52,y=Y(i);return n==='C0'?`<path class="bo" d="M${168-27} ${y+5}C${168-27} ${y-8} ${168+27} ${y-8} ${168+27} ${y+5}Z"/>`:`<rect class="${n==='T6'?'bo hlo':'bo'}" x="${168-w/2}" y="${y-4.5}" width="${w}" height="9.5" rx="3"/>`};
 const brl=(x,a,b,lab)=>{const y1=Y(ix(a))-4,y2=Y(ix(b))+4;return `<path class="ld" d="M${x+5} ${y1}H${x}V${y2}H${x+5}"/>`+tx(x-4,y2+2,lab,'end','m')};
 const brr=(x,a,b,lab,top)=>{const y1=Y(ix(a))-4,y2=Y(ix(b))+4;return `<path class="axs" d="M${x-5} ${y1}H${x}V${y2}H${x-5}"/>`+tx(x,top?y1-6:y2+15,lab,'middle','b')};
 const k=(n,lab,n2)=>{const y=n2?(Y(ix(n))+Y(ix(n2)))/2:Y(ix(n));return (n2?`<path class="ld" d="M214 ${Y(ix(n))-4}V${Y(ix(n2))+4}"/>`:'')+`<path class="ld" d="M${n2?214:210} ${y}H220"/>`+tx(223,y+4,lab)};
 return svg(340,346,'UFS, UFM et vertèbres clés du rachis thoracique',lv.map(box).join('')+
  brl(112,'C0','C2','sup')+brl(92,'C0','T2','moy.')+brl(72,'C0','T6','inf')+brr(198,'C0','T6','UFS',1)+brr(206,'T6','L3','UFM')+
  lv.map((n,i)=>tx(140-(n[0]==='T'?0:n[0]==='L'?5:-4)-(n==='C0'?8:0),Y(i)+4,n,'end','m')).join('')+
  k('T1','T1 charnière')+k('T4','T4 carène')+k('T5','T5 estomac')+k('T6','T6 apex')+k('T7','T7–T9 ceintures','T9')+k('T11','T11–T12 mobiles','T12'));};

S.cotes_axes=()=>svg(330,236,'Axes du bras de pompe et de l\'anse de seau',
 rib('M146 170C126 162 96 162 72 152C46 140 30 110 36 80C42 52 72 34 104 30L128 28')+rib('M184 170C204 162 234 162 258 152C284 140 300 110 294 80C288 52 258 34 226 30L202 28')+
 cl('M128 28L150 24')+cl('M202 28L180 24')+`<rect class="bo" x="150" y="10" width="30" height="26" rx="5"/>`+
 `<path class="bo" d="M147 166L116 156L114 168L146 180Z"/><path class="bo" d="M183 166L214 156L216 168L184 180Z"/><path class="bo" d="M159 196H171L168 228H162Z"/><circle class="bo" cx="165" cy="176" r="24"/>`+
 `<path class="axb" d="M178 182L34 136"/><path class="axr" d="M186 196L180 4"/>`+
 `<circle class="dt" cx="146" cy="170" r="3"/><circle class="dt" cx="116" cy="161" r="3"/><circle class="dt" cx="184" cy="170" r="3"/><circle class="dt" cx="180" cy="25" r="3"/>`+
 tx(62,98,['axe du','bras de pompe','(côtes hautes)'],'start','p')+tx(192,98,['axe de','l\'anse de seau','(côtes basses)'],'start','r')+tx(165,220,'vue de dessus, arrière en bas','middle','m'));

S.cote_pl=()=>svg(330,236,'T5 en FRS gauche : K5 gauche en PL, K5 droite en ASI',
 `<path class="gh" d="M146 160C126 162 96 164 72 156C46 144 30 112 36 80C42 52 72 34 104 30L128 28"/>`+
 `<g transform="rotate(-7 146 160)">`+rib('M146 160C126 162 96 164 72 156C46 144 30 112 36 80C42 52 72 34 104 30L128 28')+`</g>`+
 rib('M184 160C204 156 234 152 260 142C290 128 306 104 300 76C294 50 262 34 228 30L202 28')+
 cl('M128 26L150 24')+cl('M202 28L180 24')+`<rect class="bo" x="150" y="10" width="30" height="26" rx="5"/>`+
 `<g transform="rotate(-16 165 166)"><path class="bo" d="M147 158L116 150L114 162L146 172Z"/><path class="bo" d="M183 158L214 150L216 162L184 172Z"/><path class="bo" d="M159 186H171L168 218H162Z"/><circle class="bo" cx="165" cy="166" r="24"/></g>`+
 arc(165,166,34,34,-62,-122)+`<path class="ar" d="M70 162L52 182"/><path class="ar" d="M296 108H316"/>`+
 tx(24,206,['K5 G en PL','angle en arrière-dehors'],'start','r')+tx(318,138,['K5 D','en ASI'],'end','r')+tx(165,124,'T5 rotation G','middle','b')+tx(165,232,'vue de dessus, arrière en bas','middle','m'));

S.defs=`<svg width="0" height="0" style="position:absolute" aria-hidden="true" focusable="false"><defs>
<linearGradient id="gBone" x1="0" y1="0" x2="1" y2="1"><stop offset="0" style="stop-color:var(--bone)"/><stop offset="1" style="stop-color:var(--bone2)"/></linearGradient>
<pattern id="pFib" width="6" height="6" patternUnits="userSpaceOnUse" patternTransform="rotate(45)"><rect width="6" height="6" style="fill:var(--fib-bg)"/><path d="M0 0V6" style="stroke:var(--fib);stroke-width:1.6"/></pattern>
<pattern id="pFc" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="8" height="8" style="fill:var(--fc-bg)"/><path d="M0 4H8" style="stroke:var(--fc);stroke-width:1"/><circle cx="4" cy="1.6" r="1" style="fill:var(--fc)"/></pattern>
<marker id="ah" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="4.2" markerHeight="4.2" orient="auto-start-reverse"><path d="M0 0L10 5L0 10Z" style="fill:var(--red)"/></marker>
</defs></svg>`;

window.SCH=S;
})();
