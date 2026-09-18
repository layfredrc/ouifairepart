# Moteur de templates — cadrage technique

*Spécification d'implémentation. Destinée à être exécutée en plusieurs passes par un agent, puis relue commit par commit.*

---

## 1. Le problème réel

Le catalogue annonce 24 designs. Le moteur en rend un seul.

`InvitationCanvas.tsx` code en dur une page unique : couverture centrée plein écran, citation centrée, programme en timeline verticale, lieu centré, RSVP, cagnotte, contact — toujours dans cet ordre, toujours dans cette composition. Ce qui varie d'un « design » à l'autre, c'est la palette (4 valeurs hex) et le motif de couverture (1 parmi 6). Autrement dit, les 24 designs sont 24 recolorisations de la même page.

C'est exactement le défaut identifié chez Jemputan dans l'audit : un catalogue volumineux dont les entrées se ressemblent, parce que le moteur n'expose qu'un squelette. Et c'est l'inverse de ce qui fait la perception premium de The Digital Yes, où chaque design a sa propre composition, pas seulement sa propre couleur.

Un couple qui compare deux designs doit voir deux mises en page, pas deux nuanciers.

**Objectif du chantier** : un moteur où 30 templates se distinguent réellement les uns des autres, et où ajouter le 31ᵉ est un fichier de données déclaratif — jamais un nouveau composant de page.

---

## 2. Architecture en couches

La règle qui gouverne tout le reste : **le contenu ne connaît pas le template, et le template ne connaît pas le contenu.** Un couple doit pouvoir changer de template à tout moment sans rien ressaisir et sans rien perdre. Cela interdit à un template d'introduire ses propres champs de contenu.

### Couche 0 — Contenu

`StudioDraft`, inchangé dans son principe. Invariant sur tous les templates. Toute donnée saisie par le couple vit ici. Un template ne peut que *choisir comment l'afficher*, jamais *décider ce qui existe*.

### Couche 1 — Thème (tokens)

Aujourd'hui `Palette` = 4 couleurs, et la typographie est globale au site. Il faut la faire grandir :

```ts
export interface ThemeTokens {
  palette: Palette;                    // paper, ink, accent, accentSoft (existant)
  typography: {
    display: FontStackId;              // paire de polices par collection
    body: FontStackId;
    scale: "compacte" | "normale" | "ample";
    displayStyle: "italique" | "romain" | "capitales";
  };
  rhythm: "dense" | "normal" | "aere";  // pilote les py- des sections
  stroke: number;                       // épaisseur de trait du décor
  radius: "vif" | "doux" | "rond";
}
```

Point de vigilance repris de la direction artistique : toute paire de polices doit être testée sur les accents et ligatures françaises (`À`, `Ç`, `œ`, `É` en capitales). Beaucoup de polices « wedding » anglo-saxonnes les rendent mal ou pas du tout.

### Couche 2 — Composition *(le cœur du chantier)*

Un template n'est pas une page. C'est **une liste ordonnée de sections, chacune rendue par une variante choisie**.

```ts
export type SectionType =
  | "couverture" | "annonce" | "programme" | "lieu"
  | "galerie" | "dresscode" | "rsvp" | "cagnotte" | "faq" | "contact";

export interface SectionInstance<T extends SectionType = SectionType> {
  type: T;
  variant: VariantIdOf<T>;        // typé : une variante de programme est refusée sur une couverture
  options?: VariantOptionsOf<T>;
  reveal?: RevealSpec;
}
```

C'est là que se trouve l'effet de levier. Avec une trentaine de composants de variantes, le nombre de compositions possibles est de plusieurs milliers ; on en curate trente. La production d'un template devient un acte de direction artistique (choisir et assortir), plus un acte de développement.

Le typage conditionnel `VariantIdOf<T>` n'est pas cosmétique : il rend un template invalide **impossible à compiler**. C'est ce qui permet d'en déclarer trente sans relire trente fichiers à la main.

### Couche 3 — Décor

Généralisation de `CoverArt`. Aujourd'hui le motif est confiné à la couverture ; le meilleur principe visuel relevé chez Jemputan est au contraire **une texture continue qui habille tout le scroll**.

```ts
export interface DecorSpec {
  motifs: MotifShape[];          // 1 à 2 maximum — au-delà, ça devient du bruit
  density: "rare" | "moyenne" | "dense";
  parallax: boolean;
  anchors: ("haut" | "bas" | "lateral" | "continu")[];
}
```

Contraintes : 100 % vectoriel et inline (pas d'images bitmap, c'est déjà un acquis du prototype et c'est ce qui rend le recoloriage par palette gratuit) ; le décor ne doit jamais passer sous un bloc de texte sans que le contraste reste conforme (voir §5).

### Couche 4 — Mouvement

Trois mécanismes distincts, à ne pas confondre :

**L'ouverture** — le moment signature, joué une fois. Quatre variantes maîtrisées : `voile` (un voile se lève), `enveloppe` (rabat qui s'ouvre), `volets` (deux panneaux qui s'écartent), `fondu-lent`. Durée maximale 1,2 s, toujours interruptible au clic. Le type `OpeningStyle` existant (`rideau | enveloppe | fondu`) est à étendre. Implémentée en timeline GSAP, qui orchestre dans le même objet le mouvement, la cascade sur les prénoms (SplitText) et le démarrage de la musique.

**Les révélations au scroll** — déclarées par variante, pas codées dans chaque section : `{ kind: "fade-up" | "masque" | "cascade", stagger?: number }`. Le moteur traduit cette déclaration en `ScrollTrigger`. Aucune section ne contient d'appel d'animation en dur.

**L'intensité** — `sobre | normale | festive`, réglée par le couple, appliquée comme un multiplicateur global sur durée/distance/décalage. La logique actuelle de `motionProps()` est la bonne intuition, mais elle doit sortir du composant pour devenir une fonction du moteur.

**Non négociable** : `prefers-reduced-motion: reduce` neutralise l'ouverture et toutes les révélations. C'est une exigence d'accessibilité, pas une option.

### Couche 5 — Son

Un morceau de la bibliothèque licenciée suggéré par défaut selon le template, remplaçable par le couple.

Le point technique qui compte : **jamais d'autoplay sonore**. Les navigateurs le bloquent de toute façon, et c'est hostile. Mais il existe une élégance ici — le clic sur « Ouvrir l'invitation » *est* le geste utilisateur qui débloque l'audio. Le portail d'ouverture doit donc servir de déverrouillage sonore, et la musique démarrer avec l'animation d'ouverture, accompagnée d'un bouton de coupure toujours visible.

---

## 3. Schéma déclaratif complet

```ts
export interface TemplateDefinition {
  id: string;
  name: string;
  collectionId: string;
  style: StyleFamily;
  ambiance: Ambiance;
  theme: ThemeTokens;
  decor: DecorSpec;
  opening: OpeningSpec;
  sound?: SoundSpec;
  sections: SectionInstance[];
  features: FeatureFlags;
}
```

Un template vit dans `lib/templates/<id>.ts` et n'exporte que cet objet. Aucun JSX.

---

## 4. Inventaire de production

Variantes à écrire, par type de section. La première de chaque liste est la composition actuelle, à extraire de `InvitationCanvas` sans la modifier — elle sert de référence de non-régression.

**Couverture (4)** — `plein-cadre-centre` (actuelle) · `editorial-bas-gauche` (noms en bas à gauche, décor en haut) · `diptyque` (art / texte côte à côte en desktop, empilés en mobile) · `medaillon` (noms dans un cartouche encadré, décor tout autour).

**Annonce (3)** — `citation-centree` (actuelle) · `lettre-justifiee` (texte au fil, lettrine) · `bandeau` (texte sur une bande de décor pleine largeur).

**Programme (4)** — `timeline-verticale` (actuelle) · `grille-horaires` (deux colonnes) · `cartes-empilees` · `frise-horizontale` (défilement latéral en mobile).

**Lieu (3)** — `centre-simple` (actuelle) · `carte-encadree` (vignette de plan encadrée) · `duo-lieux` (cérémonie et réception côte à côte).

**RSVP (3)** — `formulaire-centre` (actuelle) · `formulaire-encadre` (carte posée sur le décor) · `deux-temps` (présence d'abord, champs ensuite — variante UX réelle, pas cosmétique).

**Galerie (3)** · **Dress code (2)** · **Cagnotte (2)** · **FAQ (2)** · **Contact (2)**.

Soit 28 composants de variantes. C'est le gros du travail, et c'est du travail parallélisable.

---

## 5. Règles de validation

À faire respecter par le typage quand c'est possible, par un test de build sinon :

- Toute combinaison texte / fond / décor d'un template doit atteindre un contraste ≥ 4.5:1 (≥ 3:1 au-delà de 24 px). **Le script de contraste écrit lors de la passe d'accessibilité est à transformer en test qui parcourt la matrice complète des templates** — c'est déjà lui qui avait rattrapé 12 accents de palette non conformes.
- Un template d'ambiance `Sombre` ne peut pas utiliser une variante de décor conçue pour un papier clair.
- Deux motifs de décor maximum par template.
- Sections obligatoires : `couverture`, `annonce`, `lieu`, `rsvp`, `contact`. Les autres sont optionnelles et **ne s'affichent jamais vides** — une section sans contenu saisi disparaît, elle n'affiche pas un placeholder.
- Aucune variante ne peut introduire un champ de contenu qui n'existe pas dans `StudioDraft`.

---

## 6. Budget de performance

C'est la page que 100 % des invités ouvrent, en très grande majorité sur smartphone et souvent en 4G. Elle prime sur tout le reste du site.

**Pile d'animation retenue : GSAP + ScrollTrigger, plus un défilement lissé.** Poids réels mesurés (min + gzip) : GSAP 27,6 ko, ScrollTrigger 17,6 ko, ScrollSmoother 5,4 ko, SplitText 3,6 ko, Lenis 5,3 ko. Pour comparaison, l'usage actuel de Framer Motion (`motion.div`) coûte environ 39 ko. GSAP n'est donc pas gratuit — il coûte une dizaine de kilos de plus que l'existant, et une quarantaine de plus qu'une solution CSS maison. C'est un choix assumé : le produit se vend sur la qualité du mouvement, et c'est la seule page qui le justifie. GSAP est depuis 2025 entièrement gratuit, plugins Club inclus, usage commercial couvert.

**La condition qui rend ce poids acceptable : l'amélioration progressive.** La page est rendue côté serveur et entièrement lisible sans JavaScript. GSAP est importé dynamiquement après le premier rendu, jamais dans le bundle partagé, jamais bloquant. Conséquence directe : le poids n'entre pas dans le LCP, il ne pèse que sur la bande passante et l'INP.

**Corollaire non négociable sur le portail d'ouverture.** Le contenu de l'invitation est présent dans le DOM dès le rendu serveur et simplement masqué visuellement par le voile. Si le JavaScript échoue, est lent, ou est désactivé, le voile s'efface en CSS seul et l'invitation reste lisible. Une invitation de mariage qui affiche une page blanche à un invité est un échec produit total — c'est le scénario à rendre structurellement impossible, pas à tester.

Le reste du budget :

- **LCP < 2,0 s** sur Android milieu de gamme en 4G, mesuré sur la page publiée, pas en local.
- **JS bloquant au premier rendu : zéro**, hors socle Next/React. Le socle seul dépasse déjà largement les 60 ko évoqués dans une version antérieure de ce document ; viser un total en kilo-octets n'avait pas de sens, seul compte ce qui bloque le rendu.
- Décor SVG inline, aucune image bitmap, aucune police distante bloquante.
- Sections hors écran non montées au premier rendu.
- Framer Motion est retiré de la route publique et reste dans le Studio, qui n'a aucune de ces contraintes.

### Défilement lissé

Retenu, avec trois garde-fous :

- **Desktop uniquement.** Sur mobile, le défilement natif iOS et Android est meilleur que tout ce qu'une librairie peut produire, et le lisser casse le masquage automatique de la barre d'adresse et dégrade l'INP. Or le mobile, c'est 100 % des invités. Lenis comme ScrollSmoother ne lissent pas le tactile par défaut : garder ce défaut.
- **`prefers-reduced-motion: reduce` désactive complètement** le lissage, pas seulement les révélations.
- **Recâbler les ancres.** La barre d'actions basse navigue par ancres (`#programme`, `#lieu`, `#rsvp`) : elles cessent de fonctionner sous défilement lissé si elles ne passent pas par le `scrollTo` de la librairie. C'est le premier bug que produira cette intégration.

Si GSAP est adopté, prendre **ScrollSmoother** plutôt que Lenis : poids équivalent, mais intégration native avec ScrollTrigger, sans le pont manuel qu'exige Lenis pour synchroniser les deux boucles.

---

## 7. Migration depuis l'existant

- `InvitationCanvas.tsx` cesse de décrire une page et devient un moteur qui parcourt `template.sections` et rend la variante déclarée. Ses sections actuelles deviennent la première variante de chaque type.
- `CoverArt.tsx` éclate en `components/invitation/decor/` : un module par motif plus la couche de décor continue.
- `lib/data/designs.ts` devient `lib/templates/`, un fichier par template.
- `Palette` devient un membre de `ThemeTokens`.
- **Parité d'aperçu non négociable** : le Studio et la page publique consomment le même moteur, avec le même template et le même draft, et produisent le même rendu. Aucun avertissement « l'aperçu peut différer » — c'était un objectif explicite du cadrage produit, contre-exemple du dark mode de Jemputan.

---

## 8. Définition de fini

1. Trente templates déclarés en données, zéro composant de page sur mesure.
2. Ajouter un template = un fichier dans `lib/templates/`, aucune modification du moteur.
3. Un test de build rend les 30 templates × 3 intensités et vérifie contraste, variantes existantes, sections obligatoires.
4. Page publique et aperçu Studio produisent un rendu identique pour un même draft.
5. Changer de template en cours de Studio ne perd aucune donnée saisie.
6. `prefers-reduced-motion` neutralise tout mouvement.
7. Budget de performance du §6 respecté, mesuré sur la page publiée.

---

## 9. Hors périmètre

Base de données et publication, paiement, extraction de palette depuis photo, multilingue, plan de table, tableau de bord invités. Ce chantier ne touche qu'au moteur de rendu et à sa bibliothèque de variantes.

---

## 10. Découpage d'exécution

À faire en trois passes distinctes, relues entre chaque. Une passe unique sur un chantier de cette taille est le meilleur moyen d'obtenir trente variantes qui se ressemblent.

**Passe 1 — Le squelette.** Types, schéma, moteur de rendu, migration des sections existantes en première variante de chaque type, les 6 collections actuelles redéclarées en templates. Critère de sortie : le site rend exactement comme aujourd'hui, mais piloté par les données.

**Passe 2 — La bibliothèque.** Les 22 variantes restantes, plus le test de build de la matrice. Critère de sortie : les 30 templates déclarés se distinguent visuellement en capture d'écran.

**Passe 3 — Le mouvement, le décor et le son.** Décor continu, quatre ouvertures, révélations CSS, retrait de Framer Motion de la route publique, déverrouillage audio par le portail d'ouverture. Critère de sortie : budget de performance tenu.
