/* Notions cliquables : les mots importants des QCM, des fiches et du lexique s'ouvrent en définition courte.
   1. quelques termes ajoutés au lexique ; 2. les mots qui renvoient à chaque terme ; 3. window.NOTIONS (liens automatiques).
   Chargé après content.js et avant app.js. */
(function(){
'use strict';
const C=window.CONTENT;

/* ---------- 1. termes ajoutés ou précisés ---------- */
C.terms.push(
 {id:'lig-collateraux',t:'Ligaments collatéraux du coude',syn:'LLI (médial) et LLE (latéral)',ch:'coude',d:'Les deux ligaments sur les côtés du coude : le collatéral médial (LLI, côté interne) et le collatéral latéral (LLE, côté externe). Ils tiennent le coude dans le plan frontal.',r:'Le ligament du côté qui s\'ouvre se tend : abduction → LLI tendu ; adduction → LLE tendu.',s:'coude_abd_add',see:['abd-coude','add-coude']},
 {id:'capitulum',t:'Capitulum',ch:'coude',d:'La petite boule arrondie au bout de l\'humérus, côté pouce : la tête du radius tourne contre elle.',r:'Capitulum = la petite tête de l\'humérus, pour le radius.',s:'pronation_douloureuse',see:['humero-radiale','pronation-douloureuse']},
 {id:'unisegmentaire',t:'Unisegmentaire ou plurisegmentaire',ch:'thorax',d:'Unisegmentaire : une seule vertèbre est en dysfonction. Plurisegmentaire : tout un groupe de vertèbres.',r:'Uni = une vertèbre (2e loi, souvent traumatique). Pluri = un groupe (1re loi, adaptative).',s:'fryette',see:['fryette-1','fryette-2']},
 {id:'inspi-expi',t:'Inspiration et expiration',ch:'thorax',d:'À l\'inspiration, le thorax s\'ouvre : les côtes montent et le rachis thoracique s\'étend. À l\'expiration, il se referme : les côtes descendent et le rachis se fléchit.',r:'Rachis en flexion = expiration. Rachis en extension = inspiration.',see:['flexion-bilat','extension-bilat','cote-inspi-expi']},
 {id:'art-costales',t:'Articulations de la côte',ch:'cotes',d:'Costo-corporéale : la tête de la côte contre le corps de la vertèbre. Costo-transversaire : le tubercule de la côte contre le processus transverse. Costo-chondrale : la côte et son cartilage. Chondro-sternale : le cartilage et le sternum.',r:'Les deux articulations du dos (costo-corporéale + costo-transversaire) forment l\'axe du bras de pompe.',s:'cotes_axes',see:['bras-de-pompe','anse-de-seau']},
 {id:'cote-reperes',t:'Arcs et angle de la côte',ch:'cotes',d:'Arc postérieur : la partie de la côte près du rachis. Angle postérieur : l\'endroit où elle se coude, dans le dos. Arc moyen : la partie sur le côté. Arc antérieur : la partie qui file vers le sternum.',r:'De l\'arrière vers l\'avant : arc postérieur, angle, arc moyen, arc antérieur.',s:'cote_pl',see:['cote-pl']},
 {id:'scalenes',t:'Scalènes',ch:'cotes',d:'Trois muscles du cou qui descendent des vertèbres cervicales aux premières côtes : l\'antérieur et le moyen sur K1, le postérieur sur K2.',r:'Le scalène moyen tient K1 en supériorité ; le postérieur, lui, va sur K2.',see:['k1-sup']},
 {id:'homolateral',t:'Homolatéral et controlatéral',ch:'bases',d:'Homolatéral : du même côté. Controlatéral : du côté opposé.',r:'Homo = le même. Contro = contre, en face.'},
 {id:'traction-compression',t:'Traction et compression',ch:'bases',d:'Traction : on tire dans l\'axe du membre, les surfaces articulaires s\'écartent. Compression : on pousse dans l\'axe, elles se rapprochent.',r:'Traction = tirer. Compression = tasser.'},
 {id:'interligne',t:'Interligne articulaire',ch:'bases',d:'L\'espace entre les deux os d\'une articulation. « Pincé » : les os se rapprochent de ce côté. « Ouvert » : ils s\'écartent.',r:'Le côté pincé est toujours en face du ligament tendu.',s:'coude_abd_add'},
 {id:'decoaptation',t:'Décoaptation',ch:'bases',d:'Les deux surfaces d\'une articulation s\'écartent : elles ne sont plus bien emboîtées.',r:'Coapter = emboîter. Décoapter = déboîter un peu.',see:['traction-compression']}
);
const T=Object.fromEntries(C.terms.map(t=>[t.id,t]));
Object.assign(T['primaire-secondaire'],{syn:'origine traumatique ou adaptative',
 d:'Primaire, ou d\'origine traumatique : la dysfonction vient directement d\'un choc, d\'une chute ou d\'un geste forcé. Secondaire, ou adaptative : elle s\'installe pour compenser un autre problème (tendinite, scoliose, autre dysfonction).',
 r:'Primaire = le Premier coup (un trauma). Secondaire = la Suite (une adaptation).'});
Object.assign(T['prono-supination'],{anim:'anim_pronosup'});
Object.assign(T['pronation-douloureuse'],{anim:'anim_pd',
 d:'Chez l\'enfant de 2 à 6 ans, on tire sur son bras tendu : la tête radiale descend et le ligament annulaire glisse au-dessus d\'elle. Il reste coincé entre le capitulum et la tête radiale : le coude est bloqué en extension et en pronation.'});

/* ---------- 2. les mots qui renvoient à chaque terme ----------
   Sigles en majuscules : reconnus tels quels. Autres mots : majuscule au début acceptée, pluriel et féminin aussi. */
const K={
 'humero-ulnaire':['huméro-ulnaire'],'humero-radiale':['huméro-radiale'],'radio-ulnaire-sup':['radio-ulnaire supérieure','radio-ulnaire proximale'],
 'ligament-annulaire':['ligament annulaire'],'valgus':['valgus'],
 'abd-coude':['abduction du coude','coude en abduction','coude en ABD'],'add-coude':['adduction du coude','coude en adduction','coude en ADD'],
 'ri-coude':['RI du coude','RI','rotation interne du coude','coude en rotation interne'],'re-coude':['RE du coude','RE','rotation externe du coude','coude en rotation externe'],
 'tr-post':['tête radiale en postériorité','tête radiale postérieure'],'tr-ant':['tête radiale en antériorité','tête radiale antérieure'],
 'pronation-douloureuse':['pronation douloureuse'],'epicondylite':['épicondylite','tennis elbow'],'epitrochleite':['épitrochléite'],'hygroma':['hygroma'],
 'nevralgie-ulnaire':['névralgie ulnaire'],'membrane-interosseuse':['membrane interosseuse'],
 'lig-collateraux':['ligament collatéral médial','ligament collatéral latéral','ligaments collatéraux','LLI','LLE'],'capitulum':['capitulum'],
 'scapulo-humerale':['scapulo-humérale'],'sh-anteriorite':['scapulo-humérale en antériorité'],'sh-superiorite':['scapulo-humérale en supériorité'],
 'acromio-claviculaire':['acromio-claviculaire'],'ac-rot-ant':['AC en rotation antérieure'],'ac-rot-post':['AC en rotation postérieure'],
 'cinetique-balistique':['cinétique','balistique'],'scc':['sterno-costo-claviculaire'],'clav-presternale':['présternale'],'clav-suprasternale':['suprasternale'],
 'sst':['scapulo-serrato-thoracique'],'coiffe':['coiffe des rotateurs'],'capsulite':['capsulite rétractile','capsulite'],'psh':['PSH','périarthrite scapulo-humérale'],
 'thoraco-brachial':['syndrome thoraco-brachial'],'parsonage-turner':['Parsonage-Turner'],'balancier':['balancier'],'acpa':['ACPA'],
 'radio-carpienne':['radio-carpienne'],'medio-carpienne':['médio-carpienne'],'condyle-carpien':['condyle carpien'],'glene-antebrachiale':['glène antébrachiale'],
 'ligament-triangulaire':['ligament triangulaire'],'amplitudes-poignet':['amplitude de flexion',"amplitude d'extension",'amplitudes du poignet'],'canal-carpien':['canal carpien'],'de-quervain':['De Quervain'],
 'finkelstein':['Finkelstein'],'kyste-synovial':['kyste synovial'],'pouteau-colles':['Pouteau-Colles'],'goyrand-smith':['Goyrand-Smith'],
 'polyarthrite':['polyarthrite rhumatoïde','polyarthrite'],'dupuytren':['Dupuytren'],'tmc':['trapézo-métacarpienne','TMC'],'opposition':['opposition du pouce','opposition'],
 'rhizarthrose':['rhizarthrose'],'mcp1':['MCP1'],
 'rc-abd':['abduction du poignet','poignet en ABD','radio-carpienne en ABD'],'rc-add':['adduction du poignet','poignet en ADD','radio-carpienne en ADD'],
 'rc-flexion':['flexion du poignet','poignet en flexion'],'rc-extension':['extension du poignet','poignet en extension'],'carpe-ant-post':['os du carpe'],
 'abreviations':['fléchisseur ulnaire du carpe','fléchisseur radial du carpe','extenseur ulnaire du carpe','FUC','FRC','EUC','ERC','LERC','CERC','FCS','FCP'],
 'ufs':['UFS'],'ufm':['UFM'],'chaines':['chaîne montante','chaîne descendante','chaînes montantes','chaînes descendantes'],
 't1':['T1'],'t4':['T4'],'t5':['T5'],'t6':['T6'],'t7-t9':['T7','T8','T9'],'t11-t12':['T11','T12'],'splanchniques':['nerfs splanchniques','splanchniques'],
 'cyphose':['cyphose'],'scoliose':['scoliose','angle de Cobb'],'scheuermann':['Scheuermann'],'vertebre-thoracique':['vertèbre thoracique'],
 'convergence-divergence':['convergence','divergence'],
 'fryette-1':['1ère loi de Fryette','1re loi de Fryette','1re loi','1ère loi','première loi'],'fryette-2':['2ème loi de Fryette','2e loi de Fryette','2e loi','2ème loi','deuxième loi'],
 'fryette-3':['3ème loi de Fryette','3e loi de Fryette','3e loi','3ème loi'],
 'nsr':['NSR'],'frs':['FRS'],'ers':['ERS'],'flexion-bilat':['flexion bilatérale'],'extension-bilat':['extension bilatérale'],
 'unisegmentaire':['plurisegmentaire','unisegmentaire'],'inspi-expi':['inspiration','expiration'],
 'bras-de-pompe':['bras de pompe','BP'],'anse-de-seau':['anse de seau','AS'],'cote-inspi-expi':['BPI','BPE','ASI','ASE'],'cote-pl':['côte en PL','PL'],
 'k1-sup':['K1 en supériorité','K1'],'art-costales':['costo-corporéale','costocorporéale','costo-transversaire','costotransversaire','chondro-sternale','chondrosternale','costo-chondrale','costochondrale','chondrocostale'],
 'cote-reperes':['angle postérieur','arc antérieur','arc moyen','arc postérieur'],'scalenes':['scalène'],
 'arthrodie':['arthrodie'],'trochleenne':['trochléenne','trochlée'],'trochoide':['trochoïde'],'condylienne':['condylienne'],'selle':['en selle','toroïde'],
 'spheroide':['sphéroïde','énarthrose'],'syssarcose':['syssarcose'],'synoviale':['articulation synoviale','diarthrose'],'congruence':['congruence'],'syndesmose':['syndesmose'],
 'primaire-secondaire':['origine traumatique','traumatique','primaire','secondaire','adaptative','adaptatif'],
 'muscle-fixateur':['maintenue/fixée','maintenu/fixée','fixateur','hypertonie'],
 'flexion-extension':['flexion','extension'],'abduction-adduction':['abduction','adduction','ABD','ADD'],
 'rotations':['rotation interne','rotation externe','rotation médiale','rotation latérale'],
 'prono-supination':['prono-supination','pronation','supination'],'circumduction':['circumduction'],
 'plans':['plan sagittal','plan frontal','plan transversal','plan horizontal'],'ddl':['degré de liberté','degrés de liberté'],
 'homolateral':['homolatéral','controlatéral'],'traction-compression':['traction','compression'],'interligne':['interligne'],
 'decoaptation':['décoaptation','décoapte']
};

/* ---------- 3. liens automatiques ---------- */
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const reEsc=s=>s.replace(/[.*+?^${}()|[\]\\\/]/g,'\\$&');
const abbr=p=>/^[A-Z0-9]{1,6}$/.test(p);
const PATS=[];
for(const id in K){if(!T[id])continue;for(const p of K[id])PATS.push({p,id})}
PATS.sort((a,b)=>b.p.length-a.p.length);
const RE=new RegExp('(?<![\\p{L}\\p{N}])(?:'+PATS.map(({p})=>{
 if(abbr(p))return '('+reEsc(p)+')';
 const f=p[0],lo=f.toLowerCase(),up=f.toUpperCase();
 let s=(lo!==up?'['+lo+up+']':reEsc(f))+reEsc(p.slice(1));
 if(/\p{Ll}$/u.test(p))s+='(?:es|e|s)?';
 return '('+s+')'}).join('|')+')(?![\\p{L}\\p{N}])','gu');

/* text : texte brut ; raw = déjà du HTML (on n'échappe pas). o.seen : ids déjà reliés ; o.skip : ids à ne pas relier. */
function wrap(text,o,raw){
 const E=raw?(s=>s):esc;let out='',last=0,m;RE.lastIndex=0;
 while((m=RE.exec(text))){let g=1;while(m[g]===undefined)g++;const id=PATS[g-1].id;
  if(o.seen.has(id)||(o.skip&&o.skip.has(id)))continue;
  o.seen.add(id);
  out+=E(text.slice(last,m.index))+'<button type="button" class="nt" data-act="term" data-id="'+id+'">'+E(m[0])+'</button>';
  last=m.index+m[0].length}
 return out+E(text.slice(last))}
const opts=o=>({seen:(o&&o.seen)||new Set(),skip:o&&o.skip?new Set([].concat(o.skip)):null});
const NOREL=/^(button|a|h1|h2|h3|h4|th|figcaption|summary|svg|text|title|select|option|textarea)$/i;

window.NOTIONS={
 /* texte brut → HTML échappé avec les notions cliquables (une seule fois chacune) */
 text(s,o){return wrap(String(s==null?'':s),opts(o),false)},
 /* HTML → même HTML, notions ajoutées hors des boutons, titres et légendes */
 html(h,o){o=opts(o);h=String(h||'');
  h.replace(/data-act="term" data-id="([^"]+)"/g,(m,id)=>{o.seen.add(id);return m});
  let depth=0;
  return h.split(/(<[^>]+>)/).map(part=>{
   if(part.charAt(0)==='<'){const m=part.match(/^<(\/?)([a-zA-Z0-9]+)/);
    if(m&&NOREL.test(m[2])&&!/\/>$/.test(part))depth+=m[1]?-1:1;if(depth<0)depth=0;return part}
   return depth?part:wrap(part,o,true)}).join('')},
 /* ids des notions présentes dans un texte, dans l'ordre */
 find(s){const ids=[];let m;RE.lastIndex=0;s=String(s||'');
  while((m=RE.exec(s))){let g=1;while(m[g]===undefined)g++;const id=PATS[g-1].id;if(!ids.includes(id))ids.push(id)}return ids}
};
})();
