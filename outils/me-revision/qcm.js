/* QCM. src : 'an' = annale (texte et corrigé d'origine), 'va' = variante d'une annale écrite par Claude, 'cl' = QCM écrit par Claude.
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

/* ================= VARIANTES D'ANNALES (écrites par Claude) ================= */
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

/* ================= QCM CLAUDE ================= */
/* coude */
{id:'c01',src:'cl',ch:'coude',q:"Modèle explicatif du coude :",o:[
 ['le fonctionnement du coude dépend de celui de l\'épaule',1,'L\'épaule positionne tout le membre supérieur.'],
 ['on associe souvent flexion-supination et extension-pronation',0,'On associe flexion-pronation et extension-supination.'],
 ['l\'abduction-adduction est un mouvement actif volontaire',0,'C\'est un mouvement passif.'],
 ['l\'abduction-adduction n\'est possible que coude déverrouillé',1,'Elle est limitée par les ligaments périphériques.'],
 ['aucune réponse n\'est correcte',0,'A et D sont justes.']],ex:"",t:['valgus']},
{id:'c02',src:'cl',ch:'coude',q:"L'articulation huméro-ulnaire :",o:[
 ['est une trochléenne',1,'Flexion-extension.'],
 ['permet la prono-supination',0,'C\'est la radio-ulnaire supérieure.'],
 ['porte un valgus physiologique dû à la forme de la tête radiale',0,'Le valgus vient de l\'orientation de la gorge de la trochlée.'],
 ['plus le valgus est faible, plus la névralgie ulnaire est fréquente',0,'C\'est l\'inverse : un valgus marqué expose le nerf ulnaire.'],
 ['est le siège de la pronation douloureuse',0,'C\'est l\'huméro-radiale (capitulum et tête radiale).']],ex:"",t:['humero-ulnaire','valgus']},
{id:'c03',src:'cl',ch:'coude',q:"Motifs de consultation du coude :",o:[
 ['l\'épicondylite est la tendinite la plus fréquente du coude',1,'Le tennis elbow.'],
 ['l\'hygroma est une bursite',1,'De la bourse en avant du tendon du triceps.'],
 ['la névralgie médiane est la compression nerveuse la plus fréquente du coude',0,'C\'est la névralgie ulnaire.'],
 ['l\'épitrochléite est associée au syndrome du canal carpien',1,'Et à une tendinite du poignet.'],
 ['l\'épicondylite n\'a aucun lien avec le poignet',0,'Elle est souvent associée à des troubles du poignet.']],ex:"",t:['epicondylite','epitrochleite','hygroma']},
{id:'c04',src:'cl',ch:'coude',q:"Rotation interne du coude :",o:[
 ['correspond à une pronation exagérée avec restriction de supination',1,'Définition du cours.'],
 ['est fixée par le biceps brachial',0,'Fixée par le carré pronateur et le rond pronateur.'],
 ['peut comprimer le nerf médian',1,'Risque cité dans le cours.'],
 ['est secondaire à un coude en adduction',0,'Secondaire à un coude en abduction.'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"",t:['ri-coude']},
{id:'c05',src:'cl',ch:'coude',q:"Rotation externe du coude :",o:[
 ['est souvent secondaire à une adduction du coude',1,'L\'adduction pince dedans et ouvre dehors.'],
 ['est fixée par le rond pronateur',0,'Fixée par le supinateur, le brachio-radial et le biceps.'],
 ['peut venir d\'une supination prolongée dans le temps',1,'Ou d\'une supination forcée.'],
 ['correspond à une pronation exagérée',0,'C\'est une supination exagérée.'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"",t:['re-coude']},
{id:'c06',src:'cl',ch:'coude',q:"Dysfonction d'adduction du coude :",o:[
 ['primaire : traction du membre supérieur tendu',1,'Porter souvent une charge bras tendu.'],
 ['fixée par les muscles épicondyliens',0,'Fixée par les épitrochléens.'],
 ['favorise une dysfonction en ABD du poignet',1,'Le croisement coude-poignet.'],
 ['détend la membrane interosseuse',0,'Elle la met en tension (cisaillement radius-ulna).'],
 ['secondaire : épicondylite',0,'Secondaire à une épitrochléite.']],ex:"",t:['add-coude']},
{id:'c07',src:'cl',ch:'coude',q:"Tête radiale postérieure avec un ligament annulaire normal :",o:[
 ['peut être primaire après une extension rapide et forcée',1,'Souvent lors d\'une chute.'],
 ['peut être secondaire à une supination (RE)',1,'La supination postériorise la tête.'],
 ['est fixée directement par le biceps',0,'Pas de fixateur direct : les dysfonctions associées la maintiennent.'],
 ['ne s\'associe jamais à un coude en abduction',0,'Une chute peut associer tête postérieure et coude en abduction.'],
 ['aucune réponse n\'est correcte',0,'A et B sont justes.']],ex:"",t:['tr-post']},
{id:'c08',src:'cl',ch:'coude',q:"Dans la dysfonction d'abduction du coude :",o:[
 ['le radius s\'abaisse légèrement par rapport à l\'ulna',1,'Par compression entre capitulum et tête radiale.'],
 ['elle est associée à un poignet en abduction',0,'À un poignet en adduction.'],
 ['le LLE est tendu',0,'Le LLE est détendu, le LLI tendu.'],
 ['une chute sur le membre tendu doit faire penser à une fracture de la tête radiale',1,'Mise en garde du cours.'],
 ['l\'interligne huméro-ulnaire externe est ouvert',0,'Il est pincé.']],ex:"",t:['abd-coude']},
{id:'c09',src:'cl',ch:'coude',q:"Articulation huméro-radiale :",o:[
 ['met en rapport le capitulum et la tête radiale',1,'Oui.'],
 ['présente de nombreuses dysfonctions ostéopathiques propres',0,'Pas de dysfonction à proprement parler.'],
 ['est le siège de la pronation douloureuse de l\'enfant',1,'Le ligament annulaire s\'y interpose.'],
 ['est une trochléenne',0,'La trochléenne du coude est l\'huméro-ulnaire.'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"",t:['humero-radiale']},

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
{id:'c19',src:'cl',ch:'poignet',q:"Articulation radio-carpienne :",o:[
 ['est une condylienne',1,'Condyle carpien dans la glène antébrachiale.'],
 ['est une arthrodie',0,'L\'arthrodie, c\'est la partie externe de la médio-carpienne.'],
 ['le radius répond au scaphoïde et au lunatum',1,'Oui.'],
 ['le ligament triangulaire répond au trapèze',0,'Il répond au triquetrum.'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"",t:['radio-carpienne']},
{id:'c20',src:'cl',ch:'poignet',q:"Articulation médio-carpienne :",o:[
 ['unit les deux rangées du carpe',1,'Oui.'],
 ['sa partie externe est une condylienne',0,'Externe : arthrodie ; interne : condylienne.'],
 ['fait l\'essentiel de la flexion du poignet',0,'L\'essentiel de l\'extension.'],
 ['est une condylienne sur toute sa largeur',0,'Partie externe en arthrodie, interne en condylienne.'],
 ['aucune réponse n\'est correcte',0,'A est juste.']],ex:"",t:['medio-carpienne']},
{id:'c21',src:'cl',ch:'poignet',q:"Axes et amplitudes du poignet :",o:[
 ['l\'abduction-adduction se fait dans un plan frontal',1,'Autour d\'un axe sagittal.'],
 ['l\'axe de flexion-extension passe entre lunatum et capitatum',1,'Au niveau du petit rayon du condyle.'],
 ['l\'adduction fait environ 15°',0,'Environ 45°. L\'abduction fait environ 15°.'],
 ['l\'axe d\'abduction-adduction passe par le petit rayon de courbure',0,'Par le grand rayon.'],
 ['aucune réponse n\'est correcte',0,'A et B sont justes.']],ex:"",t:['axes-poignet','amplitudes-poignet']},
{id:'c22',src:'cl',ch:'poignet',q:"Ténosynovite de De Quervain :",o:[
 ['touche le court extenseur et le long abducteur du pouce',1,'Oui.'],
 ['est une inflammation du tendon seul',0,'Tendon ET gaine synoviale.'],
 ['ses tendons forment la limite interne de la tabatière anatomique',0,'La limite externe.'],
 ['se teste par le test de Finkelstein',1,'Inclinaison ulnaire + abduction du pouce contre résistance.'],
 ['est rare au poignet',0,'C\'est la plus fréquente du poignet et de la main.']],ex:"",t:['de-quervain','finkelstein']},
{id:'c23',src:'cl',ch:'poignet',q:"Fractures du poignet :",o:[
 ['Pouteau-Colles : déplacement postérieur',1,'Par hyperextension.'],
 ['Goyrand-Smith : par hyperextension',0,'Par hyperflexion, déplacement antérieur.'],
 ['elles touchent l\'extrémité inférieure du radius',1,'Oui.'],
 ['Pouteau-Colles : déplacement antérieur',0,'Postérieur.'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"",t:['pouteau-colles','goyrand-smith']},
{id:'c24',src:'cl',ch:'poignet',q:"Pathologies de la main et du poignet :",o:[
 ['Dupuytren touche surtout le pouce et l\'index',0,'Surtout les deux derniers doigts.'],
 ['la polyarthrite rhumatoïde donne une déviation ulnaire en coup de vent',1,'Avec une carpite.'],
 ['le kyste synovial est le plus souvent à la face dorsale',1,'Oui.'],
 ['le canal carpien comprime le nerf ulnaire',0,'Le nerf médian.'],
 ['aucune réponse n\'est correcte',0,'B et C sont justes.']],ex:"",t:['dupuytren','polyarthrite','kyste-synovial','canal-carpien']},
{id:'c25',src:'cl',ch:'poignet',q:"Trapézo-métacarpienne (TMC) :",o:[
 ['est une toroïde (en selle)',1,'Oui.'],
 ['est une sphéroïde',0,'Toroïde.'],
 ['donne l\'opposition du pouce',1,'Oui.'],
 ['sa dysfonction en ADD est surtout primaire traumatique',0,'Surtout secondaire : arthrose, hypertonie des thénariens.'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"",t:['tmc','selle']},
{id:'c26',src:'cl',ch:'poignet',q:"Opposition du pouce :",o:[
 ['nécessite une TMC libre (antépulsion et ADD de M1)',1,'1er temps.'],
 ['nécessite la flexion de M1 sur P1',1,'2e temps.'],
 ['nécessite la rotation axiale de P1 sur M1',1,'3e temps.'],
 ['dépend surtout de la mobilité de P2 sur P1',0,'Elle compte peu.'],
 ['aucune réponse n\'est correcte',0,'A, B et C sont justes.']],ex:"",t:['opposition']},
{id:'c27',src:'cl',ch:'poignet',q:"Dysfonctions de la radio-carpienne :",o:[
 ['flexion : secondaire à une épitrochléite',1,'Oui.'],
 ['extension : secondaire à une épitrochléite',0,'À une épicondylite.'],
 ['ABD : fixée par FUC et EUC',0,'FUC et EUC fixent l\'ADD.'],
 ['ADD : souvent secondaire à un coude en ABD',1,'Le croisement coude-poignet.'],
 ['flexion : fixée par les extenseurs radiaux du carpe',0,'Par FRC, FUC, long palmaire, FCS, FCP.']],ex:"",t:['rc-flexion','rc-extension','rc-add']},
{id:'c28',src:'cl',ch:'poignet',q:"TMC en adduction :",o:[
 ['correspond à un manque d\'ouverture de la 1re commissure',1,'Oui.'],
 ['est fixée surtout par le court adducteur du pouce',1,'Parmi les thénariens.'],
 ['est fixée par les lombricaux',0,'Les lombricaux fixent les MCP.'],
 ['est le plus souvent primaire',0,'Le plus souvent secondaire.'],
 ['aucune réponse n\'est correcte',0,'A et B sont justes.']],ex:"",t:['tmc']},
{id:'c29',src:'cl',ch:'poignet',q:"Os du carpe, carpo-métacarpiennes et doigts :",o:[
 ['les articulations carpiennes sont surtout des arthrodies',1,'D\'où les glissements ant. ou post.'],
 ['les MCP sont fixées par les interosseux et les lombricaux',1,'Oui.'],
 ['les dysfonctions des inter-phalangiennes sont surtout primaires',0,'Surtout secondaires (tendons qui tirent d\'un côté).'],
 ['les os du carpe s\'articulent en trochoïde',0,'En arthrodies.'],
 ['aucune réponse n\'est correcte',0,'A et B sont justes.']],ex:"",t:['carpe-ant-post','arthrodie']},

/* rachis thoracique */
{id:'c30',src:'cl',ch:'thorax',q:"UFS et UFM :",o:[
 ['l\'UFM va de T6 à L3',1,'Oui.'],
 ['l\'UFS va de C0 à T12',0,'De C0 à T6.'],
 ['T6 appartient aux deux',1,'Il faut examiner les deux.'],
 ['la partie moyenne de l\'UFS va de C0 à T2',1,'En lien avec les scalènes.'],
 ['l\'UFM commence à T1',0,'À T6.']],ex:"",t:['ufs','ufm']},
{id:'c31',src:'cl',ch:'thorax',q:"Chaînes mécaniques du rachis thoracique :",o:[
 ['T1–T6 : surtout des chaînes descendantes',1,'Tête, cou et épaules.'],
 ['T6–T12 : surtout des chaînes descendantes',0,'Surtout montantes.'],
 ['T12 est une charnière avec des adaptations du bas vers le haut',1,'Oui.'],
 ['le haut de la cyphose ne dépend pas de la position de la tête',0,'Il s\'y adapte en permanence.'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"",t:['chaines']},
{id:'c32',src:'cl',ch:'thorax',q:"Vertèbres thoraciques clés :",o:[
 ['T1 : centre cilio-spinal de Budge et ganglion stellaire',1,'Et dômes pleuraux.'],
 ['T4 : relation avec l\'estomac',0,'C\'est T5. T4 : circulation, carène.'],
 ['T6 : apex de la cyphose dorsale',1,'Oui.'],
 ['T10 : centre de rotation des ceintures',0,'T7 à T9.'],
 ['T11 et T12 : moins mobiles que les autres',0,'Plus mobiles (côtes flottantes).']],ex:"",t:['t1','t4','t5','t6','t7-t9','t11-t12']},
{id:'c33',src:'cl',ch:'thorax',q:"Nerfs splanchniques :",o:[
 ['grand splanchnique : T6 à T9',1,'Oui.'],
 ['petit splanchnique : T10 et T11',1,'Oui.'],
 ['ils appartiennent au parasympathique',0,'Au sympathique viscéral abdominal.'],
 ['une dysfonction du foie peut donner une dysfonction dorsale basse',1,'Réaction viscéro-somatique.'],
 ['aucune réponse n\'est correcte',0,'A, B et D sont justes.']],ex:"",t:['splanchniques']},
{id:'c34',src:'cl',ch:'thorax',q:"Mouvements simples du rachis thoracique :",o:[
 ['en flexion, les facettes divergent',1,'Oui.'],
 ['en extension, les facettes divergent',0,'Elles convergent.'],
 ['l\'extension est limitée par la tension des intercostaux',1,'Écartement des arcs antérieurs.'],
 ['l\'axe de rotation passe par les processus épineux',0,'Par les corps vertébraux.'],
 ['la rotation crée une convergence du même côté que la rotation',0,'Du côté opposé.']],ex:"",t:['convergence-divergence']},
{id:'c35',src:'cl',ch:'thorax',q:"En inclinaison thoracique droite :",o:[
 ['les facettes convergent à droite',1,'Du côté de l\'inclinaison.'],
 ['les facettes convergent à gauche',0,'À gauche, elles divergent.'],
 ['les arcs costaux moyens se rapprochent à droite',1,'Ce qui limite l\'inclinaison.'],
 ['les intercostaux gauches se détendent',0,'Ils se tendent (écartement à gauche).'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"",t:['convergence-divergence']},
{id:'c36',src:'cl',ch:'thorax',q:"Lois de Fryette :",o:[
 ['1re loi : side et rotation opposés',1,'Type 1, en groupe.'],
 ['2e loi : concerne les NSR',0,'Elle concerne FRS et ERS.'],
 ['3e loi : un mouvement combiné modifie l\'amplitude des autres',1,'Oui.'],
 ['2e loi : side et rotation de côtés opposés',0,'Du même côté.'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"",t:['fryette-1','fryette-2','fryette-3']},
{id:'c37',src:'cl',ch:'thorax',q:"Dysfonction en flexion bilatérale :",o:[
 ['se fait uniquement dans le plan sagittal',1,'Oui.'],
 ['la vertèbre la moins mobile est la plus haute',0,'La plus basse.'],
 ['est aussi appelée dysfonction en inspiration',0,'En expiration.'],
 ['est fréquente chez la femme enceinte',1,'Secondaire adaptative.'],
 ['est fixée par les érecteurs du rachis',0,'Par les expirateurs, le psoas, la pesanteur.']],ex:"",t:['flexion-bilat']},
{id:'c38',src:'cl',ch:'thorax',q:"Dysfonctions en FRS et ERS :",o:[
 ['elles sont unisegmentaires',1,'Oui.'],
 ['FRS : divergence maximale du côté de la dysfonction',0,'Du côté opposé.'],
 ['ERS : convergence maximale du côté de la dysfonction',1,'Oui.'],
 ['elles s\'accompagnent de dysfonctions costales',1,'Et parfois d\'une entorse vertébrale.'],
 ['elles sont souvent secondaires à une scoliose',0,'Primaires traumatiques.']],ex:"",t:['frs','ers']},
{id:'c39',src:'cl',ch:'thorax',q:"Scoliose et Scheuermann :",o:[
 ['la scoliose est une déformation dans les 3 plans',1,'Déviation frontale + rotation.'],
 ['elle se mesure par l\'angle de Cobb',1,'Oui.'],
 ['en ostéopathie, on supprime toutes les compensations',0,'On les respecte.'],
 ['Scheuermann est une épiphysite de croissance vertébrale',1,'Avec hypercyphose.'],
 ['Scheuermann donne une hypolordose cervicale isolée',0,'Hypercyphose dorsale.']],ex:"",t:['scoliose','scheuermann']},
{id:'c40',src:'cl',ch:'thorax',q:"Vertèbre thoracique :",o:[
 ['le corps porte des facettes costales supérieure et inférieure',1,'Oui.'],
 ['le trou de conjugaison est surtout formé par la vertèbre sous-jacente',0,'Par la vertèbre sus-jacente.'],
 ['le processus transverse ne porte aucune facette',0,'Il porte une facette costale à sa face antérieure.'],
 ['le processus épineux est horizontal',0,'Oblique en bas et en arrière.'],
 ['aucune réponse n\'est correcte',0,'A est juste.']],ex:"",t:['vertebre-thoracique']},

/* côtes */
{id:'c41',src:'cl',ch:'cotes',q:"Bras de pompe et anse de seau :",o:[
 ['le bras de pompe prédomine sur les côtes hautes',1,'Oui.'],
 ['l\'anse de seau prédomine sur les côtes hautes',0,'Sur les côtes basses.'],
 ['ASI signifie anse de seau en inspiration',1,'Oui.'],
 ['BPE signifie bras de pompe en extension',0,'En expiration.'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"",t:['bras-de-pompe','anse-de-seau','cote-inspi-expi']},
{id:'c42',src:'cl',ch:'cotes',q:"Scalènes et 1re côte :",o:[
 ['le scalène moyen s\'insère sur K1',1,'Oui.'],
 ['le scalène postérieur s\'insère sur K1',0,'Sur K2.'],
 ['le scalène antérieur s\'insère sur K1',1,'Oui.'],
 ['K1 en supériorité est fixée par le scalène postérieur',0,'Par le scalène moyen.'],
 ['aucune réponse n\'est correcte',0,'A et C sont justes.']],ex:"",t:['k1-sup']},

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
