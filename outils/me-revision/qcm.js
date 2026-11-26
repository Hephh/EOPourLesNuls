/* QCM. src : 'an' = annale (texte et corrigé d'origine), 'va' = variante d'une annale (son inverse ou son complément : côté,
   mouvement ou cas opposé ; « of » = annale d'origine), 'cl' = entraînement, seulement pour les chapitres sans annale.
   o : [texte, 1 si juste, explication]. ref : place de la question dans les sujets A et B du 15/03/2022. */
window.CONTENT.qcm=[
/* ================= ANNALES (sujets ME P2 A et B, 15/03/2022) ================= */
{id:'a01',src:'an',ch:'coude',ref:'Sujet A Q1, sujet B Q10',q:"Dans la pronation douloureuse de l'enfant, le mécanisme dysfonctionnel est:",o:[
 ['Flexion-pronation-traction',0,'Le coude est en extension, pas en flexion.'],
 ['Extension-pronation-traction',1,'Mécanisme du cours : extension, pronation forcée, traction dans l\'axe.'],
 ['Extension-supination-compression',0,'Pronation (pas supination) et traction (pas compression).'],
 ['Extension-supination-traction',0,'C\'est une pronation forcée, pas une supination.'],
 ['Flexion- supination-traction',0,'Deux erreurs : flexion et supination.']],
 ex:"On tire l'enfant par la main, bras tendu : extension + pronation + traction. La tête radiale se décoapte et le ligament annulaire s'insinue entre capitulum et tête.",t:['pronation-douloureuse']},
{id:'a02',src:'an',ch:'coude',ref:'Sujet A Q2, sujet B Q9',q:"Dans la pronation douloureuse de l'enfant :",o:[
 ['le coude est bloqué en flexion',0,'Le corrigé retient l\'extension.'],
 ['le coude est bloqué en extension',1,'Juste au corrigé : c\'est la position du mécanisme.'],
 ['le coude est bloqué en pronation',1,'Juste : la pronation forcée fait passer la tubérosité bicipitale en arrière de l\'ulna.'],
 ['le coude est bloqué en supination',0,'C\'est la pronation qui est bloquée.'],
 ['aucune réponse n\'est correcte',0,'B et C sont justes.']],
 ex:"Le coude reste bloqué dans les positions du mécanisme : extension et pronation.",t:['pronation-douloureuse']},
{id:'a03',src:'an',ch:'coude',ref:'Sujet A Q3, sujet B Q6',q:"Dans la dysfonction d'abduction du coude :",o:[
 ['le ligament collatéral médial est mis en tension',1,'Le valgus augmente : le côté médial s\'ouvre, le LLI (collatéral médial) se tend.'],
 ['le ligament collatéral latéral est mis en tension',0,'Il est détendu : le côté latéral est pincé.'],
 ['l\'interligne articulaire médial est pincé',0,'C\'est l\'interligne latéral qui est pincé ; le médial s\'ouvre.'],
 ['le ligament annulaire est mis en tension',0,'Le cours ne décrit pas de tension du ligament annulaire dans l\'abduction.'],
 ['le mouvement de pronation est favorisé',1,'L\'abduction perturbe la supination, donc elle favorise la pronation.']],
 ex:"Abduction = valgus augmenté : pincé dehors, ouvert dedans, LLI tendu, LLE détendu. Primaire : chute sur le membre tendu. Secondaire : épicondylite.",t:['abd-coude','valgus']},
{id:'a04',src:'an',ch:'poignet',ch2:'coude',ref:'Sujet A Q4, sujet B Q2',q:"La dysfonction d'adduction du poignet est :",o:[
 ['généralement associée à une dysfonction d\'adduction du coude',0,'C\'est l\'inverse : poignet en ADD avec coude en ABD.'],
 ['généralement associée à une dysfonction d\'abduction du coude',1,'Coude en ABD → radius abaissé → poignet en ADD.'],
 ['maintenue/fixée par le muscle fléchisseur ulnaire du carpe',1,'Fixateurs de l\'ADD : FUC et EUC.'],
 ['maintenue/fixée par le muscle fléchisseur radial du carpe',0,'Le FRC est côté radial : il participe à l\'ABD (avec LERC et CERC).'],
 ['aucune réponse n\'est correcte',0,'B et C sont justes.']],
 ex:"Coude et poignet se croisent : coude ABD ↔ poignet ADD ; coude ADD ↔ poignet ABD.",t:['rc-add','abd-coude','abreviations']},
{id:'a05',src:'an',ch:'poignet',ref:'Sujet A Q5, sujet B Q15',q:"L'articulation radio-carpienne présente plus d'amplitude de flexion que l'articulation médio-carpienne:",o:[
 ['Vrai',1,'Flexion : 50° dans la radio-carpienne, 35° dans la médio-carpienne.'],
 ['Faux',0,'C\'est en extension que la médio-carpienne domine.']],
 ex:"Flexion et extension font environ 85° chacune ; seule la répartition change. En extension : 35° radio-carpienne, 50° médio-carpienne.",t:['amplitudes-poignet','radio-carpienne']},
{id:'a06',src:'an',ch:'thorax',ref:'Sujet A Q6, sujet B Q5',q:"La dysfonction d'un vertèbre thoracique en FRS Droite :",o:[
 ['est souvent adaptative',0,'La FRS est primaire traumatique (composante de flexion).'],
 ['induit une inclinaison gauche',0,'2e loi : side du même côté que la rotation, donc à droite.'],
 ['induit une rotation gauche',0,'FRS droite = rotation droite.'],
 ['est souvent plurisegmentaire',0,'La FRS est unisegmentaire.'],
 ['aucune réponse n\'est correcte',1,'Toutes les propositions sont fausses.']],
 ex:"FRS droite : flexion + rotation droite + side droit, une seule vertèbre, traumatique ; divergence facettaire maximale à gauche.",t:['frs','fryette-2']},
{id:'a07',src:'an',ch:'thorax',ref:'Sujet A Q7, sujet B Q3',q:"T6 en dysfonction de NSR Gauche :",o:[
 ['répond à la 2ème loi de Fryette',0,'La 2e loi concerne FRS et ERS.'],
 ['répond à la 1ère loi de Fryette',1,'NSR = 1re loi : side et rotation opposés.'],
 ['est souvent traumatique',0,'La NSR est secondaire adaptative (scoliose).'],
 ['induit une rotation gauche',0,'NSR gauche = side gauche, rotation droite.'],
 ['aucune réponse n\'est correcte',0,'B est juste.']],
 ex:"NSR : neutre, plurisegmentaire, adaptative ; fixée par le multifide du côté du side.",t:['nsr','fryette-1']},
{id:'a08',src:'an',ch:'thorax',ch2:'cotes',ref:'Sujet A Q8, sujet B Q13',q:"T4 en flexion bilatérale :",o:[
 ['favorisera l\'inspiration thoracique',0,'La flexion bilatérale est une dysfonction en expiration.'],
 ['favorisera l\'expiration thoracique',1,'Le cours l\'appelle aussi « dysfonction en expi ».'],
 ['favorisera une dysfonction en BPI des 4èmes côtes droite et gauche',0,'Une flexion pousse vers l\'expiration, pas vers l\'inspiration.'],
 ['favorisera une dysfonction en ASE des 4èmes côtes droite et gauche',0,'Non retenu au corrigé. Lecture probable : la 4e côte travaille surtout en bras de pompe.'],
 ['aucune réponse n\'est correcte',0,'B est juste.']],
 ex:"Flexion bilatérale = expiration ; extension bilatérale = inspiration.",t:['flexion-bilat','cote-inspi-expi']},
{id:'a09',src:'an',ch:'cotes',ref:'Sujet A Q9, sujet B Q11',q:"Les dysfonctions en BP se retrouvent principalement au niveau :",o:[
 ['du rachis thoracique supérieur',0,'Le BP est un mouvement des côtes, pas des vertèbres.'],
 ['du rachis thoracique moyen',0,'Même raison : on parle de côtes, pas de rachis.'],
 ['du rachis thoracique inférieur',0,'Même raison.'],
 ['du cadran thoracique inférieur',0,'Les côtes basses travaillent surtout en anse de seau.'],
 ['aucune réponse n\'est correcte',1,'Réponse du corrigé.']],
 ex:"Lecture probable du corrigé : le bras de pompe concerne surtout les côtes hautes, et aucune proposition ne parle des côtes. Vérifie la formulation de ton cours sur les côtes.",t:['bras-de-pompe']},
{id:'a10',src:'an',ch:'cotes',ref:'Sujet A Q10, sujet B Q1',q:"La dysfonction de côte en PL, amène :",o:[
 ['l\'arc moyen de la côte en arrière, dehors',0,'C\'est l\'angle postérieur qui se déplace, pas l\'arc moyen.'],
 ['l\'angle postérieur de côte en arrière, dehors',1,'PL : angle postérieur en arrière et en dehors.'],
 ['l\'angle postérieur de côte en avant, dedans',0,'C\'est le déplacement inverse.'],
 ['l\'arc antérieur de côte en avant, dehors',0,'Ce n\'est pas l\'arc antérieur.'],
 ['l\'arc moyen de côte en avant, dehors',0,'Ce n\'est pas l\'arc moyen.']],
 ex:"Pour retenir (déduit du corrigé) : P = postérieur, L = latéral, donc en arrière et en dehors.",t:['cote-pl']},
{id:'a11',src:'an',ch:'cotes',ref:'Sujet A Q11, sujet B Q12',q:"K1 en supériorité :",o:[
 ['est uniquement une élévation de l\'arc antérieur de K1',0,'« Uniquement » rend la proposition fausse.'],
 ['est un abaissement de l\'arc postérieur de K1',0,'Supériorité = position haute, pas un abaissement.'],
 ['est maintenu/fixée par le muscle scalène postérieur',0,'Le scalène postérieur s\'insère sur K2.'],
 ['est maintenue/fixée par le muscle scalène moyen',1,'Le scalène moyen s\'insère sur K1 et la maintient haute.'],
 ['aucune réponse n\'est correcte',0,'D est juste.']],
 ex:"Scalènes antérieur et moyen sur K1 ; scalène postérieur sur K2.",t:['k1-sup']},
{id:'a12',src:'an',ch:'cotes',ref:'Sujet A Q12, sujet B Q4',q:"L'axe de mobilité des mouvements de BP passe par les articulations :",o:[
 ['costocorporéales homolatérales et costochondrales homolatérales',0,'Le 2e point de l\'axe est en arrière (costo-transversaire), pas à l\'avant de la côte.'],
 ['costocorporéales homolatérales et costotransversaires homolatérales',1,'L\'axe suit le col de la côte : tête (costo-corporéale) et tubercule (costo-transversaire).'],
 ['costocorporéales controlatérales et chondrosternales controlatérales',0,'Tout se passe du même côté que la côte.'],
 ['chondrocostales controlatérales et chondrosternales homolatérales',0,'Ni à l\'avant, ni de l\'autre côté.'],
 ['aucune réponse n\'est correcte',0,'B est juste.']],
 ex:"Bras de pompe : axe en arrière, le long du col de la côte. Anse de seau : axe de la costo-vertébrale à la chondro-sternale.",t:['bras-de-pompe','anse-de-seau']},
{id:'a13',src:'an',ch:'coude',ref:'Sujet A Q13, sujet B Q8',q:"La dysfonction de la tête radiale en postériorité est toujours d'origine traumatique :",o:[
 ['Vrai',0,'Elle peut être secondaire : supination (RE) ou ligament annulaire détendu.'],
 ['Faux',1,'Elle est primaire ou secondaire.']],
 ex:"Méfie-toi de « toujours » : le cours donne des causes primaires ET secondaires.",t:['tr-post']},
{id:'a14',src:'an',ch:'cotes',ch2:'thorax',ref:'Sujet A Q14, sujet B Q7',q:"La dysfonction de T5 en FRS gauche sera préférentiellement associée à :",o:[
 ['K5 gauche en PL',1,'Rotation gauche : la transverse gauche recule et emmène l\'angle de K5 gauche en arrière-dehors.'],
 ['K5 gauche en BPI',0,'Non retenu : à gauche, la côte part en PL.'],
 ['K5 droite en ASI',1,'Le side gauche écarte les côtes droites : K5 droite part en inspiration (anse de seau).'],
 ['K5 droite en PL',0,'Le PL est du côté de la rotation, donc à gauche.'],
 ['K5 droite en BPI',0,'Non retenu : à droite, la côte part en ASI.']],
 ex:"Corrigé : FRS gauche → K5 G en PL et K5 D en ASI. Logique : la côte suit sa transverse ; le côté opposé au side s'ouvre.",t:['frs','cote-pl','cote-inspi-expi']},
{id:'a15',src:'an',ch:'coude',ref:'Sujet A Q15, sujet B Q14',q:"La dysfonction de la tête radiale en postériorité peut être associée à :",o:[
 ['une RI du coude, ligament annulaire tonique',0,'Ligament tonique : la tête postérieure va avec la supination (RE).'],
 ['une RI du coude ligament annulaire détendu',1,'Ligament lâche : la tête n\'a plus d\'appui sur l\'ulna et recule, même en pronation (RI).'],
 ['une RE du coude ligament annulaire détendu',0,'Ligament détendu → RI, pas RE.'],
 ['une RE du coude ligament annulaire tonique',1,'Ligament normal : la supination (RE) postériorise la tête.'],
 ['aucune réponse n\'est correcte',0,'B et D sont justes.']],
 ex:"Le croisement à retenir : tonique → RE ; détendu → RI.",t:['tr-post','ligament-annulaire']},

/* ================= VARIANTES D'ANNALES ================= */
{id:'v01',src:'va',of:'a01',ch:'coude',q:"Pronation douloureuse de l'enfant, à propos du mécanisme :",o:[
 ['le coude est en extension',1,'Oui, bras tendu.'],
 ['l\'avant-bras est en supination forcée',0,'Pronation forcée.'],
 ['une traction s\'exerce dans l\'axe du membre',1,'Oui : on tire l\'enfant par la main.'],
 ['le ligament annulaire s\'insinue entre capitulum et tête radiale',1,'C\'est la conséquence de la décoaptation.'],
 ['elle touche surtout l\'adolescent',0,'Enfant de 2 à 6 ans.']],ex:"Extension + pronation + traction, entre 2 et 6 ans.",t:['pronation-douloureuse']},
{id:'v02',src:'va',of:'a02',ch:'coude',q:"Pronation douloureuse de l'enfant :",o:[
 ['elle est uniquement primaire traumatique',1,'Le cours le précise.'],
 ['elle peut être secondaire à une épicondylite',0,'Uniquement primaire traumatique.'],
 ['la tubérosité bicipitale passe en arrière de l\'ulna',1,'Effet de la pronation forcée.'],
 ['le coude est bloqué en supination',0,'Bloqué en pronation (et en extension).'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"Elle est liée à la forme de la tête radiale de l'enfant.",t:['pronation-douloureuse']},
{id:'v03',src:'va',of:'a03',ch:'coude',q:"Dans la dysfonction d'adduction du coude :",o:[
 ['le ligament collatéral latéral est mis en tension',1,'Le côté latéral s\'ouvre, le LLE se tend.'],
 ['le ligament collatéral médial est mis en tension',0,'Il est détendu.'],
 ['l\'interligne articulaire médial est pincé',1,'Oui : pincé dedans, ouvert dehors.'],
 ['le valgus physiologique est augmenté',0,'Il est diminué.'],
 ['le mouvement de pronation est perturbé',1,'L\'adduction perturbe la pronation.']],ex:"Adduction : tout s'inverse par rapport à l'abduction.",t:['add-coude']},
{id:'v04',src:'va',of:'a03',ch:'coude',q:"Dysfonction d'abduction du coude, causes et fixateurs :",o:[
 ['primaire : chute sur le membre supérieur tendu',1,'Attention alors à la fracture de la tête radiale.'],
 ['secondaire : épitrochléite',0,'Secondaire à une épicondylite.'],
 ['fixée par les muscles épitrochléens',0,'Fixée par les épicondyliens.'],
 ['elle peut contraindre le nerf ulnaire',1,'Le côté médial s\'ouvre : contrainte sur le nerf ulnaire.'],
 ['elle diminue le valgus physiologique',0,'Elle l\'augmente.']],ex:"Abduction ↔ épicondyle (dehors) ; adduction ↔ épitrochlée (dedans).",t:['abd-coude','epicondylite']},
{id:'v05',src:'va',of:'a04',ch:'poignet',ch2:'coude',q:"La dysfonction d'abduction du poignet (radio-carpienne) est :",o:[
 ['généralement associée à une dysfonction d\'adduction du coude',1,'Coude ADD ↔ poignet ABD.'],
 ['généralement associée à une dysfonction d\'abduction du coude',0,'C\'est l\'ADD du poignet qui va avec l\'ABD du coude.'],
 ['maintenue/fixée par le long abducteur du pouce',1,'Fixateur de l\'ABD, avec FRC, LERC et CERC.'],
 ['maintenue/fixée par le fléchisseur ulnaire du carpe',0,'Le FUC fixe l\'ADD.'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"Côté radial (pouce) → abduction ; côté ulnaire → adduction.",t:['rc-abd','add-coude']},
{id:'v06',src:'va',of:'a05',ch:'poignet',q:"L'articulation radio-carpienne présente plus d'amplitude d'extension que l'articulation médio-carpienne :",o:[
 ['Vrai',0,'En extension, la médio-carpienne domine (50° contre 35°).'],
 ['Faux',1,'Le rebord postérieur du radius, plus bas, freine l\'extension de la radio-carpienne.']],ex:"Flexion : radio-carpienne. Extension : médio-carpienne.",t:['amplitudes-poignet']},
{id:'v07',src:'va',of:'a05',ch:'poignet',q:"Amplitudes du poignet (chiffres du cours) :",o:[
 ['la flexion fait environ 85°',1,'Comme l\'extension.'],
 ['l\'abduction est plus ample que l\'adduction',0,'ABD ≈ 15°, ADD ≈ 45°.'],
 ['en extension, la médio-carpienne fait environ 50°',1,'Et la radio-carpienne 35°.'],
 ['en ABD-ADD, la médio-carpienne fait les 2/3 de l\'amplitude',0,'2/3 dans la radio-carpienne, 1/3 dans la médio-carpienne.'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"Chiffres discutés entre enseignants : apprends ceux de ton cours.",t:['amplitudes-poignet']},
{id:'v08',src:'va',of:'a06',ch:'thorax',q:"La dysfonction d'une vertèbre thoracique en FRS gauche :",o:[
 ['induit une rotation gauche',1,'FRS gauche = rotation gauche.'],
 ['induit une inclinaison droite',0,'Side du même côté : gauche.'],
 ['est souvent plurisegmentaire',0,'Unisegmentaire.'],
 ['répond à la 2e loi de Fryette',1,'Side et rotation du même côté.'],
 ['est souvent adaptative',0,'Primaire traumatique.']],ex:"Même règle que la FRS droite, côté inversé.",t:['frs']},
{id:'v09',src:'va',of:'a06',ch:'thorax',q:"La dysfonction thoracique en ERS droite :",o:[
 ['crée une convergence facettaire maximale à droite',1,'Du côté de la dysfonction.'],
 ['répond à la 1re loi de Fryette',0,'2e loi.'],
 ['est fixée par le multifide et le longissimus du côté du side',1,'Fixateurs du cours.'],
 ['est souvent secondaire à une scoliose',0,'Primaire traumatique, avec une composante d\'extension.'],
 ['est plurisegmentaire',0,'Unisegmentaire.']],ex:"ERS : convergence max du côté de la dysfonction. FRS : divergence max du côté opposé.",t:['ers','convergence-divergence']},
{id:'v10',src:'va',of:'a07',ch:'thorax',q:"T8 en dysfonction de NSR droite :",o:[
 ['répond à la 1re loi de Fryette',1,'NSR = type 1.'],
 ['induit une rotation droite',0,'NSR droite = side droit, rotation gauche.'],
 ['est souvent unisegmentaire',0,'Plurisegmentaire.'],
 ['est souvent traumatique',0,'Secondaire adaptative.'],
 ['est fixée par le multifide du côté du side',1,'Fixateur du cours.']],ex:"Même raisonnement que l'annale « T6 en NSR gauche », côté inversé.",t:['nsr']},
{id:'v11',src:'va',of:'a08',ch:'thorax',q:"T4 en extension bilatérale :",o:[
 ['favorisera l\'inspiration thoracique',1,'Extension bilatérale = dysfonction en inspiration.'],
 ['favorisera l\'expiration thoracique',0,'C\'est la flexion qui va avec l\'expiration.'],
 ['se traduit souvent par un méplat',1,'Signe du cours.'],
 ['est fixée par les muscles expirateurs',0,'Fixée par les érecteurs du rachis.'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"Extension = inspiration ; flexion = expiration.",t:['extension-bilat']},
{id:'v12',src:'va',of:'a10',ch:'cotes',q:"Une côte en PL :",o:[
 ['a son angle postérieur déplacé en arrière',1,'P = postérieur.'],
 ['a son angle postérieur déplacé en dehors',1,'L = latéral.'],
 ['a son angle postérieur déplacé en avant, en dedans',0,'C\'est l\'inverse.'],
 ['accompagne souvent une FRS de la vertèbre, du côté de la rotation',1,'Corrigé : T5 FRS gauche → K5 gauche en PL.'],
 ['aucune réponse n\'est correcte',0,'A, B et D sont justes.']],ex:"La côte suit sa transverse : du côté de la rotation, l'angle recule.",t:['cote-pl','frs']},
{id:'v13',src:'va',of:'a12',ch:'cotes',q:"À propos des axes de mobilité costale :",o:[
 ['l\'axe du bras de pompe passe par les costo-corporéale et costo-transversaire homolatérales',1,'Corrigé de l\'annale.'],
 ['l\'axe de l\'anse de seau va de la costo-vertébrale à la chondro-sternale',1,'Axe presque antéro-postérieur.'],
 ['le bras de pompe concerne surtout les côtes basses',0,'Surtout les côtes hautes.'],
 ['l\'anse de seau concerne surtout les côtes hautes',0,'Surtout les côtes basses.'],
 ['les deux axes passent par des articulations controlatérales',0,'Tout se passe du même côté.']],ex:"Pompe = haut ; seau = bas.",t:['bras-de-pompe','anse-de-seau']},
{id:'v14',src:'va',of:'a13',ch:'coude',q:"La dysfonction de la tête radiale en antériorité :",o:[
 ['peut être primaire, par contraction importante du biceps',1,'Ou un métier qui sollicite le biceps.'],
 ['est toujours d\'origine traumatique',0,'Elle peut être secondaire (RI, supination).'],
 ['avec un ligament normal, peut être secondaire à une RI du coude',1,'Oui.'],
 ['n\'a aucun muscle fixateur',0,'Biceps (et pronateurs ou supinateurs selon le ligament).'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"Tête antérieure = pense biceps.",t:['tr-ant']},
{id:'v15',src:'va',of:'a14',ch:'cotes',ch2:'thorax',q:"La dysfonction de T5 en FRS droite sera préférentiellement associée à :",o:[
 ['K5 droite en PL',1,'Rotation droite : la transverse droite recule et emmène l\'angle de K5 droite.'],
 ['K5 gauche en ASI',1,'Le side droit écarte les côtes gauches.'],
 ['K5 gauche en PL',0,'Le PL est du côté de la rotation : à droite.'],
 ['K5 droite en ASI',0,'L\'ASI est du côté opposé au side.'],
 ['aucune réponse n\'est correcte',0,'A et B sont justes.']],ex:"Miroir de l'annale : FRS gauche → K5 G en PL et K5 D en ASI.",t:['frs','cote-pl']},
{id:'v16',src:'va',of:'a15',ch:'coude',q:"La dysfonction de la tête radiale en antériorité peut être associée à :",o:[
 ['une RI du coude, ligament annulaire tonique',1,'Ligament normal : secondaire à une RI.'],
 ['une supination (RE), ligament annulaire détendu',1,'Ligament lâche : la supination favorise l\'antériorisation.'],
 ['une RE du coude, ligament annulaire tonique',0,'Avec un ligament tonique, la RE va avec la tête postérieure.'],
 ['une RI du coude, ligament annulaire détendu',0,'C\'est la tête postérieure qui va avec ce couple.'],
 ['aucune réponse n\'est correcte',0,'A et B sont justes.']],ex:"Tête antérieure : tonique → RI ; détendu → RE. L'inverse exact de la tête postérieure.",t:['tr-ant','ligament-annulaire']},

/* ===== Variantes ajoutées : l'inverse ou le complément d'une annale (côté, mouvement ou cas opposé) ===== */
{id:'v17',src:'va',of:'a06',ch:'thorax',q:"La dysfonction d'une vertèbre thoracique en ERS gauche :",o:[
 ['induit une rotation gauche',1,'2e loi de Fryette : rotation et side du même côté, ici à gauche.'],
 ['induit une inclinaison droite',0,'Le side est du même côté que la rotation : à gauche.'],
 ['est souvent plurisegmentaire',0,'Une ERS touche une seule vertèbre (unisegmentaire).'],
 ['est souvent d\'origine primaire traumatique, en extension',1,'Comme la FRS, c\'est une dysfonction primaire traumatique ; ici le traumatisme se fait en extension.'],
 ['est souvent adaptative',0,'Adaptative, c\'est la NSR (scoliose). L\'ERS est traumatique.']],
 ex:"Annale inversée : FRS droite → ERS gauche. Même logique (2e loi, une vertèbre, traumatique), mais en extension et côté gauche.",t:['ers','fryette-2']},
{id:'v18',src:'va',of:'a06',ch:'thorax',q:"Une vertèbre thoracique en FRS droite :",o:[
 ['a une divergence facettaire maximale à gauche',1,'FRS : divergence maximale du côté opposé à la dysfonction.'],
 ['répond à la 1re loi de Fryette',0,'Flexion + side et rotation du même côté : 2e loi.'],
 ['est fixée par le multifide homolatéral et les intercostaux',1,'Fixateurs de la FRS au cours.'],
 ['est fixée par les érecteurs du rachis, de façon bilatérale',0,'Ce sont les fixateurs de l\'extension bilatérale.'],
 ['peut s\'accompagner d\'une entorse',1,'Dysfonction traumatique : entorse possible.']],
 ex:"Complément de l'annale FRS droite : où se fait la divergence, et quels muscles la fixent.",t:['frs','fryette-2']},
{id:'v19',src:'va',of:'a07',ch:'thorax',q:"T6 en dysfonction de FRS gauche :",o:[
 ['répond à la 2e loi de Fryette',1,'Flexion, side et rotation du même côté.'],
 ['répond à la 1re loi de Fryette',0,'La 1re loi, c\'est la NSR (neutre, en groupe).'],
 ['est souvent traumatique',1,'FRS = primaire traumatique, en flexion.'],
 ['induit une rotation droite',0,'Rotation gauche : même côté que le side.'],
 ['est plurisegmentaire',0,'Une seule vertèbre.']],
 ex:"Annale « T6 en NSR gauche » retournée : même vertèbre, mais FRS. Tout ce qui était faux pour la NSR devient juste, et inversement.",t:['frs','fryette-2']},
{id:'v20',src:'va',of:'a07',ch:'thorax',q:"Une dysfonction thoracique en NSR gauche :",o:[
 ['est fixée par le multifide du côté du side, donc à gauche',1,'Fixateur de la NSR : multifide du côté du side.'],
 ['est souvent secondaire adaptative, par exemple à une scoliose',1,'C\'est la dysfonction adaptative type.'],
 ['touche une seule vertèbre',0,'1re loi : en groupe, plurisegmentaire.'],
 ['associe side gauche et rotation gauche',0,'Neutre : side et rotation opposés, donc rotation droite.'],
 ['aucune réponse n\'est correcte',0,'A et B sont justes.']],
 ex:"Complément de l'annale NSR gauche : fixateur et origine.",t:['nsr','fryette-1']},
{id:'v21',src:'va',of:'a08',ch:'thorax',q:"La dysfonction thoracique en flexion bilatérale :",o:[
 ['est plurisegmentaire',1,'Dysfonction sagittale, sur plusieurs segments.'],
 ['est souvent secondaire à une hyperlordose lombaire ou à une grossesse',1,'Causes secondaires du cours.'],
 ['est fixée par les expirateurs, le psoas et la pesanteur',1,'Fixateurs du cours.'],
 ['est fixée par les érecteurs du rachis',0,'Ce sont les fixateurs de l\'extension bilatérale.'],
 ['est une dysfonction en inspiration',0,'Flexion bilatérale = dysfonction en expiration.']],
 ex:"Complément de l'annale « T4 en flexion bilatérale favorise l'expiration ». La plus basse des vertèbres en flexion est la moins mobile.",t:['flexion-bilat']},
{id:'v22',src:'va',of:'a14',ch:'cotes',q:"La dysfonction de T7 en FRS gauche sera préférentiellement associée à :",o:[
 ['K7 gauche en PL',1,'Même règle que l\'annale : côte du côté de la dysfonction en PL.'],
 ['K7 droite en ASI',1,'Et côte opposée en anse de seau inspiratoire.'],
 ['K7 droite en PL',0,'La PL est du côté de la FRS (gauche).'],
 ['K7 gauche en ASI',0,'L\'ASI est du côté opposé.'],
 ['aucune réponse n\'est correcte',0,'A et B sont justes.']],
 ex:"Même raisonnement que l'annale « T5 en FRS gauche », transposé à un autre niveau. Lecture du corrigé : PL du même côté, ASI en face.",t:['frs','cote-pl']},
{id:'v23',src:'va',of:'a03',ch:'coude',q:"Dysfonction d'abduction du coude, conséquences :",o:[
 ['le radius est abaissé : le poignet part en adduction',1,'Coude et poignet se croisent : coude en ABD → poignet en ADD.'],
 ['le poignet part en abduction',0,'C\'est l\'adduction du coude qui met le poignet en ABD.'],
 ['le capitulum et la tête radiale sont comprimés',1,'Le côté latéral est pincé.'],
 ['elle est fixée par les épicondyliens',1,'Fixateurs de l\'abduction.'],
 ['le ligament collatéral latéral est tendu',0,'Il est détendu : c\'est le LLI qui se tend.']],
 ex:"Complément de l'annale sur l'abduction du coude : ce qu'elle entraîne au poignet et qui la fixe.",t:['abd-coude','valgus']},
{id:'v24',src:'va',of:'a03',ch:'coude',q:"Dysfonction d'adduction du coude :",o:[
 ['primaire : traction du membre tendu (porter une charge bras tendu)',1,'Cause primaire du cours.'],
 ['secondaire : épicondylite',0,'Secondaire à une épitrochléite. L\'épicondylite, c\'est l\'abduction.'],
 ['elle met le tendon distal du biceps en tension',1,'Conséquence citée au cours.'],
 ['elle s\'accompagne d\'un poignet en abduction',1,'Coude en ADD → poignet en ABD.'],
 ['elle est fixée par les épicondyliens',0,'Par les épitrochléens.']],
 ex:"Inverse de l'annale sur l'abduction : tout se retourne (côté pincé, ligament tendu, fixateurs, poignet).",t:['add-coude']},
{id:'v25',src:'va',of:'a15',ch:'coude',q:"Dysfonction de rotation interne (RI) du coude :",o:[
 ['primaire : pronation forcée, l\'ulna bascule en dedans',1,'Mécanisme du cours.'],
 ['secondaire : souvent un coude en abduction',1,'L\'abduction favorise la pronation.'],
 ['fixée par le carré pronateur et le rond pronateur',1,'Fixateurs de la RI.'],
 ['supination exagérée',0,'C\'est la RE. En RI, la pronation est exagérée et la supination limitée.'],
 ['aucune réponse n\'est correcte',0,'A, B et C sont justes.']],
 ex:"Complément de l'annale « tête radiale postérieure + RI » : ce qu'est la RI elle-même. Risque : compression du nerf médian.",t:['ri-coude']},
{id:'v26',src:'va',of:'a15',ch:'coude',q:"Dysfonction de rotation externe (RE) du coude :",o:[
 ['primaire : supination forcée ou prolongée',1,'Mécanisme du cours.'],
 ['secondaire : souvent un coude en adduction',1,'L\'adduction perturbe la pronation.'],
 ['fixée par le supinateur, le brachio-radial et le biceps',1,'Fixateurs de la RE.'],
 ['fixée par le carré pronateur',0,'Fixateur de la RI.'],
 ['elle limite la supination',0,'Elle l\'exagère.']],
 ex:"Inverse de la RI. Retiens le croisement : RI ↔ coude en ABD ; RE ↔ coude en ADD.",t:['re-coude']},
{id:'v27',src:'va',of:'a13',ch:'coude',q:"Tête radiale en postériorité, ligament annulaire tonique (normal) :",o:[
 ['primaire : extension rapide et forcée, chute',1,'Cause primaire du cours.'],
 ['secondaire : supination, donc RE du coude',1,'Avec un ligament tonique, la RE postériorise la tête.'],
 ['elle a un fixateur direct, le biceps',0,'Pas de fixateur direct. Le biceps fixe la tête antérieure.'],
 ['elle est toujours d\'origine traumatique',0,'Faux, comme dans l\'annale : elle peut être secondaire.'],
 ['aucune réponse n\'est correcte',0,'A et B sont justes.']],
 ex:"Complément de l'annale « toujours traumatique ? Faux » : voici justement ses causes primaire et secondaire.",t:['tr-post','ligament-annulaire']},
{id:'v28',src:'va',of:'a15',ch:'coude',q:"Tête radiale en postériorité, ligament annulaire détendu (lâche) :",o:[
 ['la tête recule en supination comme en pronation',1,'Elle n\'a plus d\'appui sur l\'ulna.'],
 ['elle s\'associe à une RI du coude',1,'Ligament détendu → RI (le croisement de l\'annale).'],
 ['elle s\'associe à une RE du coude',0,'RE avec un ligament tonique, pas détendu.'],
 ['elle est fixée par les fixateurs de la RI',1,'Carré et rond pronateurs.'],
 ['aucune réponse n\'est correcte',0,'A, B et D sont justes.']],
 ex:"Inverse du cas « ligament tonique » : tonique → RE ; détendu → RI.",t:['tr-post','ligament-annulaire','ri-coude']},
{id:'v29',src:'va',of:'a04',ch:'poignet',q:"La dysfonction de la radio-carpienne en flexion :",o:[
 ['primaire : chute en hyperflexion',1,'Cause primaire du cours.'],
 ['secondaire : épitrochléite',1,'Flexion du poignet ↔ épitrochléite.'],
 ['secondaire : épicondylite',0,'L\'épicondylite va avec l\'extension du poignet.'],
 ['fixée par FRC, FUC, long palmaire, FCS et FCP',1,'Les fléchisseurs.'],
 ['primaire : chute paume au sol',0,'C\'est la cause de l\'extension.']],
 ex:"Complément de l'annale sur l'adduction du poignet : même tableau (primaire, secondaire, fixateurs) pour la flexion.",t:['rc-flexion','epitrochleite']},
{id:'v30',src:'va',of:'a04',ch:'poignet',q:"La dysfonction de la radio-carpienne en extension :",o:[
 ['primaire : chute paume au sol',1,'Cause primaire du cours.'],
 ['secondaire : épicondylite',1,'Extension du poignet ↔ épicondylite.'],
 ['fixée par ERC, EUC et l\'extenseur commun',1,'Les extenseurs.'],
 ['fixée par le fléchisseur ulnaire du carpe et le long palmaire',0,'Fixateurs de la flexion.'],
 ['aucune réponse n\'est correcte',0,'A, B et C sont justes.']],
 ex:"Inverse de la flexion : fléchisseurs ↔ extenseurs, épitrochléite ↔ épicondylite.",t:['rc-extension','epicondylite']},
{id:'v31',src:'va',of:'a11',ch:'cotes',q:"À propos de K1 en supériorité :",o:[
 ['elle est maintenue par le scalène moyen',1,'Réponse du corrigé.'],
 ['le scalène postérieur s\'insère sur K2, pas sur K1',1,'C\'est pour ça qu\'il ne fixe pas K1.'],
 ['c\'est uniquement une élévation de l\'arc antérieur',0,'Le corrigé refuse le « uniquement ».'],
 ['elle est maintenue par le scalène postérieur',0,'Il s\'insère sur K2.'],
 ['aucune réponse n\'est correcte',0,'A et B sont justes.']],
 ex:"Complément de l'annale K1 : pourquoi le scalène moyen et pas le postérieur.",t:['k1-sup']},
{id:'v32',src:'va',of:'a09',ch:'cotes',q:"Bras de pompe et anse de seau :",o:[
 ['le bras de pompe concerne surtout les côtes hautes',1,'L\'extrémité antérieure monte et avance.'],
 ['l\'anse de seau concerne surtout les côtes basses',1,'La partie latérale monte.'],
 ['une côte en BPI est bloquée en inspiration',1,'I = inspiration, E = expiration.'],
 ['une côte en ASE est bloquée en inspiration',0,'ASE = anse de seau bloquée en expiration.'],
 ['aucune réponse n\'est correcte',0,'A, B et C sont justes.']],
 ex:"Complément des annales sur le bras de pompe : les deux mouvements et leurs abréviations.",t:['bras-de-pompe','anse-de-seau','cote-inspi-expi']},

/* ================= ENTRAÎNEMENT (chapitres sans annale : épaule, bases) ================= */
/* coude */

/* épaule */
{id:'c10',src:'cl',ch:'epaule',q:"Le complexe articulaire de l'épaule :",o:[
 ['est plus stable qu\'une hanche',0,'Plus instable : articulation en suspension.'],
 ['sert surtout à positionner la main dans l\'espace',1,'Pour la préhension.'],
 ['comprend l\'articulation scapulo-serrato-thoracique',1,'Avec SCC, AC et scapulo-humérale.'],
 ['n\'a qu\'un système de stabilisation passif',0,'Systèmes actifs et passifs.'],
 ['aucune réponse n\'est correcte',0,'B et C sont justes.']],ex:"",t:['complexe-epaule']},
{id:'c11',src:'cl',ch:'epaule',q:"Questions obligatoires de l'anamnèse d'épaule :",o:[
 ['la latéralité',1,'Droitier ou gaucher.'],
 ['l\'activité sportive',1,'Exemple : 6 h de tennis par semaine.'],
 ['la profession et l\'ergonomie du poste',1,'Oui.'],
 ['le groupe sanguin',0,'Sans rapport.'],
 ['l\'utilisation de la ceinture scapulaire',1,'Oui.']],ex:"",t:['complexe-epaule']},
{id:'c12',src:'cl',ch:'epaule',q:"Clavicule présternale :",o:[
 ['l\'extrémité médiale glisse plus vers l\'avant que vers l\'arrière',1,'Glissement postérieur limité.'],
 ['primaire : choc sur le dessus de l\'épaule',0,'C\'est la suprasternale. Ici : choc d\'avant en arrière.'],
 ['fixée par le trapèze moyen et les rhomboïdes',1,'Fixateurs du cours.'],
 ['fixée par le grand dorsal et le SCOM',0,'Ce sont des fixateurs de la suprasternale.'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"",t:['clav-presternale']},
{id:'c13',src:'cl',ch:'epaule',q:"Clavicule suprasternale :",o:[
 ['l\'extrémité médiale s\'élève quand l\'épaule s\'abaisse',1,'Définition du cours.'],
 ['peut venir d\'une traction forte dans l\'axe du membre',1,'Cause primaire.'],
 ['est fixée par le grand pectoral',0,'Grand dorsal, subclavier, SCOM.'],
 ['peut être secondaire à une scapula trop haute',0,'À une scapula trop basse (scoliose).'],
 ['aucune réponse n\'est correcte',0,'A et B sont justes.']],ex:"",t:['clav-suprasternale']},
{id:'c14',src:'cl',ch:'epaule',q:"Acromio-claviculaire en rotation antérieure :",o:[
 ['le grand pectoral maintient la clavicule en antéversion',1,'Il limite la bascule vers l\'arrière.'],
 ['le ligament trapézoïde se tend et le conoïde se détend',0,'C\'est la rotation postérieure. Ici : conoïde tendu.'],
 ['mécanisme cinétique : flexion du membre trop rapide',1,'Le muscle se contracte avant que la clavicule suive.'],
 ['elle n\'est jamais traumatique',0,'Elle est traumatique.'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"",t:['ac-rot-ant','cinetique-balistique']},
{id:'c15',src:'cl',ch:'epaule',q:"Acromio-claviculaire en rotation postérieure :",o:[
 ['mécanisme cinétique : flexion trop rapide',0,'Ça, c\'est la rotation antérieure. Ici : extension trop rapide.'],
 ['mécanisme balistique : extension exagérée',0,'Rotation antérieure aussi. Ici : flexion forcée, trop loin.'],
 ['implique le deltoïde faisceau antérieur',0,'Le faisceau postérieur.'],
 ['détend le ligament trapézoïde',0,'Trapézoïde tendu, conoïde détendu.'],
 ['aucune réponse n\'est correcte',1,'Toutes les propositions décrivent l\'inverse.']],ex:"Rotation postérieure : cinétique = extension trop rapide ; balistique = flexion forcée ; deltoïde postérieur ; trapézoïde tendu.",t:['ac-rot-post','cinetique-balistique']},
{id:'c16',src:'cl',ch:'epaule',q:"Scapulo-humérale :",o:[
 ['antériorité : choc à l\'arrière du moignon de l\'épaule',1,'Ou bras tiré vers l\'avant.'],
 ['antériorité secondaire : scapula en adduction',0,'Scapula en abduction.'],
 ['antériorité : fixée par le biceps et le sub-scapulaire',1,'Fixateurs du cours.'],
 ['supériorité primaire : chute sur le membre tendu',1,'Oui.'],
 ['supériorité : n\'a jamais de cause secondaire',0,'Abducteurs hypertoniques, supra-épineux, bursite.']],ex:"",t:['sh-anteriorite','sh-superiorite']},
{id:'c17',src:'cl',ch:'epaule',q:"Relations de l'épaule :",o:[
 ['épaule et bassin du même côté sont liés par le grand dorsal',1,'Le balancier de la marche.'],
 ['le canal thoracique se jette dans la veine subclavière droite',0,'Gauche.'],
 ['l\'artère subclavière passe en arrière et en dessous de la clavicule',1,'D\'où le syndrome thoraco-brachial.'],
 ['les deux ceintures fonctionnent dans le même sens à la marche',0,'De façon opposée.'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"",t:['balancier','thoraco-brachial']},
{id:'c18',src:'cl',ch:'epaule',q:"Articulation scapulo-serrato-thoracique :",o:[
 ['présente 6 dysfonctions',1,'Les 6 mouvements de la scapula.'],
 ['ses dysfonctions viennent d\'hypertonies et/ou d\'une scoliose',1,'Oui.'],
 ['ses fixateurs sont les muscles moteurs de chaque mouvement',1,'Oui.'],
 ['c\'est une articulation synoviale avec capsule',0,'C\'est un glissement sans contact os-os (syssarcose).'],
 ['aucune réponse n\'est correcte',0,'A, B et C sont justes.']],ex:"",t:['sst','syssarcose']},

/* poignet-main */

/* rachis thoracique */

/* côtes */

/* bases */
{id:'c43',src:'cl',ch:'bases',q:"Types d'articulations de ton cours :",o:[
 ['l\'huméro-ulnaire est une trochléenne',1,'Oui.'],
 ['la radio-ulnaire supérieure est une condylienne',0,'Une trochoïde.'],
 ['la radio-carpienne est une condylienne',1,'Oui.'],
 ['la trapézo-métacarpienne est une sphéroïde',0,'Une toroïde (en selle).'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"",t:['trochleenne','trochoide','condylienne','selle']},
{id:'c44',src:'cl',ch:'bases',q:"Une arthrodie :",o:[
 ['a des surfaces planes ou presque',1,'Oui.'],
 ['permet surtout des glissements',1,'Oui.'],
 ['a 3 axes de mouvement',0,'C\'est la sphéroïde.'],
 ['on en trouve entre les os du carpe',1,'Oui.'],
 ['aucune réponse n\'est correcte',0,'A, B et D sont justes.']],ex:"",t:['arthrodie']},
{id:'c45',src:'cl',ch:'bases',q:"Dysfonction primaire ou secondaire :",o:[
 ['primaire : causée directement par un traumatisme',1,'Oui.'],
 ['secondaire : adaptative, conséquence d\'un autre trouble',1,'Oui.'],
 ['une épicondylite peut entraîner une abduction secondaire du coude',1,'Exemple du cours.'],
 ['la pronation douloureuse de l\'enfant peut être secondaire',0,'Uniquement primaire traumatique.'],
 ['aucune réponse n\'est correcte',0,'A, B et C sont justes.']],ex:"",t:['primaire-secondaire']},
{id:'c46',src:'cl',ch:'bases',q:"Mouvements :",o:[
 ['flexion-extension : plan sagittal',1,'Oui.'],
 ['abduction-adduction : plan transversal',0,'Plan frontal.'],
 ['la circumduction combine au moins 2 axes',1,'Le segment décrit un cône.'],
 ['la supination amène la paume vers le bas',0,'Vers le haut ou l\'avant.'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"",t:['flexion-extension','abduction-adduction','circumduction','prono-supination']},
{id:'c47',src:'cl',ch:'bases',q:"Muscle fixateur :",o:[
 ['son hypertonie maintient une dysfonction',1,'Oui.'],
 ['les épicondyliens fixent l\'abduction du coude',1,'Oui.'],
 ['le grand pectoral fixe la rotation postérieure de l\'acromio-claviculaire',0,'La rotation antérieure.'],
 ['le FUC fixe l\'abduction du poignet',0,'L\'adduction.'],
 ['aucune réponse n\'est correcte',0,'A et B sont justes.']],ex:"",t:['muscle-fixateur']}
];
