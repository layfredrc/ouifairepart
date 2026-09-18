# Direction artistique du moteur d'invitation

*Charte de rendu. Elle s'applique à toute variante de section, à l'ouverture, à la barre d'ancres et aux aperçus. Elle est écrite pour être relue commit par commit : une variante qui y déroge est à refaire, pas à retoucher.*

---

## 1. Le constat

Les quatre PR de la passe 2 (#4 à #7) livrent vingt variantes correctes et interchangeables. Prises ensemble, elles produisent l'effet inverse de celui recherché par le cadrage (§1 de `docs/moteur-de-templates.md`) : au lieu de trente templates qui se distinguent, un catalogue de mises en page d'application recolorées.

Ce qui les rend génériques est précis, et ce n'est pas la composition :

- **Un lexique d'interface, pas d'imprimé.** Pastilles arrondies pour les itinéraires, champs à bord gris et coins ronds, boutons `rounded-full`, cartes ombrées, cartons avec « pastille d'heure », icônes Unicode dans une barre d'onglets. Ce sont des composants de SaaS posés sur un faire-part.
- **Un corps de texte timide.** Les prénoms à `text-6xl`, des intitulés à `0.65rem` centrés au-dessus de chaque bloc, le tout dans une colonne `max-w-md` au milieu d'un écran de 1440 px : la page de bureau est un écran de téléphone étiré, avec du vide autour.
- **Le même geste répété.** Chaque section commence par un petit intitulé espacé et centré, puis un bloc centré. Dix sections, dix fois la même entrée : la monotonie vient de là, pas des palettes.
- **Un décor tuile.** Le motif est un dessin 400 × 700 étiré ou rogné pour couvrir un cadre. Sur la feuille large, le haut et le bas disparaissent ; en frise, il se répète en tuiles (la rangée de ronds de la couverture éditoriale de Riviera).
- **Des aplats brutaux.** Les triangles d'encre de Clair-Obscur, la bande noire de l'annonce `bandeau` : le seul contraste fort du système est un bloc opaque.

## 2. Les principes

1. **L'objet avant l'interface.** Une invitation est un imprimé rendu actif, pas une application. Rien de ce qui existe sur un écran d'application n'a sa place ici : pas de pastille, pas de carte ombrée, pas de champ encadré, pas d'icône, pas d'onglet. Un formulaire emprunte au coupon-réponse : une étiquette en petites capitales, un filet sous la saisie, une case carrée à cocher, un bouton en bloc d'encre.
2. **La typographie fait le décor.** Les prénoms sont le seul corps réellement grand, en encre, interlettrés serrés, en vraie italique quand le template le demande. L'esperluette est l'unique touche d'accent de la couverture. Tout ce qui est décoratif reste au trait fin ; l'ornement n'est jamais le héros.
3. **Un seul niveau d'intitulé, jamais seul.** Les petites capitales espacées (`ETIQUETTE`) sont le seul registre d'intitulé. Elles ne flottent jamais seules au-dessus d'un bloc : elles courent avec un filet jusqu'au bord de la colonne (titre courant, fer à gauche) ou s'encadrent de deux filets courts (composition centrée). Deux compositions d'entrée au moins doivent alterner dans un template.
4. **La feuille, pas la page.** Sur écran large, l'invitation est une feuille de 56 rem posée sur le papier profond, bordée d'un filet. Elle n'est jamais une colonne de 28 rem au milieu de 90 rem de vide. À l'intérieur, la colonne de lecture (`COLONNE`, 34 rem) porte le texte ; la couverture et les moments de titrage prennent toute la feuille.
5. **Tout est relatif au cadre.** Corps de texte, rythme vertical et gouttières sont exprimés en unités de conteneur (`cqi`). L'aperçu téléphone du Studio n'est pas un mode à part : c'est le même rendu dans un cadre plus étroit. Une variante n'utilise plus de préfixe `md:` (viewport) mais `@sm:`, `@md:` (conteneur), et ne branche plus sur `theme.full` pour des tailles.
6. **Le décor s'accroche au cadre réel.** `DecorCanvas` mesure son cadre et donne aux motifs la zone visible (`box`). Un cadre se cale sur les bords, une onde traverse toute la largeur, une arche descend jusqu'en bas. Rien n'est étiré, rien n'est tuilé.
7. **De la profondeur sans photo.** Le papier porte un grain vectoriel (`ofp-grain`, 4,5 %). La palette est enrichie de dérivées calculées, jamais déclarées : `paperDeep` (fond hors feuille, bandes), `line` (filet courant), `lineStrong` (filet porteur). Ces valeurs sont partagées par le moteur et par le test de matrice.
8. **Les règles de contraste ne bougent pas.** `theme.encre()` et `theme.accentue()` restent l'unique moyen d'atténuer un texte ; tout couple texte/fond inédit s'ajoute à `COUPLES`.

## 3. Le vocabulaire

Tout vit dans `components/invitation/sections/shared/` et `lib/theme/tokens.ts`. Une variante compose avec ce vocabulaire ; elle n'en réinvente pas.

| élément | rôle |
| --- | --- |
| `ETIQUETTE` | petites capitales, 0,6875 rem, interlettrage 0,22 em — l'unique intitulé |
| `COLONNE`, `FEUILLE` | la colonne de lecture (34 rem) et la feuille (56 rem) |
| `theme.type("prenoms" \| "citation" \| "lieu" \| "intitule")` | les quatre corps de titrage, fluides |
| `theme.space(...)`, `theme.gutter` | le rythme vertical et la gouttière, en `cqi` |
| `theme.derives.{paperDeep, line, lineStrong}` | les couleurs dérivées |
| `<Intitule>` | intitulé avec filet, `alignement="gauche" \| "centre"`, `numero` facultatif |
| `<Filet>` | trait fin, porté ou non d'un losange |
| `<Bouton variante="plein" \| "contour">` | rectangle, petites capitales |
| `<Champ>`, `<ChampTexte>`, `<Choix>` | le coupon-réponse |
| `<LiensItineraires>` | des mots soulignés, séparés d'un point médian |

## 4. Ce que cette PR livre

- Les fondations : palette dérivée, tokens fluides, grain, feuille, conteneur (`ofp-root`), `DecorCanvas` ancré au cadre.
- Les sept variantes de la passe 1 réécrites sur la charte. Elles sont la référence : c'est à elles qu'une nouvelle variante doit ressembler par le registre, et dont elle doit se distinguer par la composition.
- Le portail d'ouverture, la barre d'ancres (qui n'apparaît qu'après la couverture) et l'aperçu du catalogue, qui rend désormais la couverture par le moteur lui-même : ce que le catalogue montre est ce que la page ouvrira, variante comprise.
- Les six motifs, affinés et accrochés au cadre.

## 5. Ce qu'il faut faire des quatre PR

Elles ne sont pas à fusionner telles quelles, et pas non plus à jeter : leurs idées de composition sont bonnes, c'est le registre qui est à refaire. Pour chacune, rebaser sur cette branche, puis :

**#7 — couverture et annonce.**
- `editorial-bas-gauche` : supprimer la frise de neuf tuiles. Le décor prend la bande du haut par un seul `DecorCanvas` ancré (il s'accroche maintenant au cadre). Prénoms en `theme.type("prenoms")` fer à gauche, sous un `<Intitule>` courant.
- `diptyque` : garder la composition ; passer les seuils en `@container`, les corps en `theme.type`.
- `medaillon` : le cartouche est le bon geste ; sortir les étiquettes chevauchantes de leur fond papier plaqué et les poser sur un filet, le double filet en `line` / `lineStrong`.
- `lettre-justifiee` : garder la lettrine et la césure ; l'en-tête « Ville, le date » en `ETIQUETTE`, la signature en `theme.type("intitule")`.
- `bandeau` : la bande pleine d'encre est trop lourde. Une bande `paperDeep` bordée de deux filets `lineStrong`, la frise du motif au trait fin ; l'option `teinte: "encre"` reste possible pour les ambiances Sombre uniquement.

**#6 — programme et lieu.**
- `grille-horaires` : la bonne idée de la passe. Heures en `theme.type("lieu")`, filets en `line`, sans bord vertical continu ; c'est un tableau d'horaires de gare, pas une grille de tableur.
- `cartes-empilees` : à refaire entièrement. Pas de fond teinté, pas d'ombre, pas de pastille d'heure. L'empilement peut être suggéré par un décalage de colonne et un filet, l'heure en `ETIQUETTE`, la numérotation en chiffres de titrage italiques dans la marge.
- `frise-horizontale` : garder ; marqueurs en losange, ligne en `lineStrong`, dégradé de rappel remplacé par un simple fondu vers `paper`.
- `carte-encadree` : `PlanStylise` est un fil de fer gris qui ressemble à un placeholder. Le redessiner en trois traits : une rivière, une route, un repère en losange, tout en accent sur papier, sans îlots gris ni rose des vents. Le passe-partout à double filet est bon ; retirer les équerres.
- `duo-lieux` : garder, ornement central en `<Filet ornement="losange">`, itinéraires par `<LiensItineraires>`.

**#5 — dress code.**
- `carton-encadre` : garder le cadre double, supprimer le filet à losange intérieur (le `<Filet>` s'y substitue), consigne en `theme.type("intitule")`.
- `manchette` : la meilleure variante de la passe ; passer l'intitulé vertical en `ETIQUETTE` et les filets en `lineStrong`. Aucune autre retouche.

**#4 — RSVP, cagnotte, contact.**
- `formulaire-encadre` : la carte ombrée sur décor est le contre-exemple de la charte. La reprendre comme un carton posé : fond `paper`, un seul filet `lineStrong`, aucune ombre, champs `<Champ>`, choix `<Choix>`, bouton `<Bouton>`.
- `deux-temps` : le parcours est bon. Les deux grandes réponses deviennent deux `<Bouton>` (plein / contour) sous la question en `theme.type("lieu")` ; les champs soulignés existent maintenant dans `<Champ>`.
- `note-en-marge` : garder telle quelle, intitulé par `<Intitule>` fer à gauche.
- `colophon` : redondant avec `signature-centree` réécrite. À supprimer, ou à distinguer réellement (deux colonnes date / question sur la même ligne de base, sans prénoms).

## 6. Règles de relecture

Une variante est refusée si l'une de ces lignes est vraie :

- elle contient `rounded-full`, `shadow-`, une pastille, une icône, ou un fond de champ.
- elle pose une taille de texte en `text-xs`, `text-sm`, `text-2xl`… au lieu d'un rôle `theme.type` ou de `ETIQUETTE`.
- elle branche sur `theme.full` pour une taille ou un espacement, ou utilise un préfixe `md:` de viewport.
- elle rend un `<DecorCanvas>` en tuiles répétées.
- elle introduit un intitulé sans filet.
- elle a le même geste d'entrée que la section précédente dans les templates qui la déclarent.
