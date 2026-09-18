# Galerie et FAQ — note de cadrage

*Passe 2 du moteur de templates. Ces deux types de section sont inscrits au §4 de la spec (Galerie 3, FAQ 2) mais aucune variante n'en est écrite ici : la règle du §5 — « aucune variante ne peut introduire un champ de contenu qui n'existe pas dans `StudioDraft` » — les rend inécrivables en l'état. Cette note dit, pour chacun, ce qu'il faudrait ajouter à la couche 0, ce que cela implique pour ses invariants, ce que cela coûte au budget du §6, et ce que je recommande. C'est une décision produit : rien de ce qui suit n'est implémenté.*

---

## 1. Le constat

`StudioDraft` porte aujourd'hui, comme contenu affichable : deux prénoms, une date, une ville, un lieu, un programme, un dress code et un texte d'invitation. Il n'a **aucun champ d'image** et **aucun champ de question-réponse**.

- Une galerie sans photos n'a rien à composer. Trois variantes de galerie, ce serait trois manières de disposer des rectangles vides.
- Une FAQ sans questions saisies non plus. Une FAQ « type » écrite en dur dans une variante violerait deux règles à la fois : la couche 0 (le template déciderait ce qui existe) et le §5 (un placeholder affiché à la place d'un contenu absent).

Le dress code, lui, est écrivable : `draft.dressCode` existe, et ses deux variantes sont livrées dans cette passe.

---

## 2. Galerie

### 2.1 Extension minimale de `StudioDraft`

```ts
export interface PhotoGalerie {
  id: string;
  /** URL publique de l'image. Jamais une data URI : voir 2.2. */
  src: string;
  /** Dimensions intrinsèques en pixels. Obligatoires : sans elles, aucune
   *  variante ne peut réserver l'espace avant chargement (CLS). */
  largeur: number;
  hauteur: number;
  /** Texte alternatif. Chaîne vide autorisée pour une photo purement
   *  décorative, mais le champ existe toujours. */
  alt: string;
  legende?: string;
}

export interface StudioDraft {
  // …champs existants inchangés…
  /** Ordre du tableau = ordre d'affichage. */
  photos: PhotoGalerie[];
}
```

Rien de plus. Pas de « photo mise en avant », pas de recadrage par template, pas de disposition mémorisée : tout cela serait de la métadonnée propre à un template, et c'est précisément ce que la couche 0 interdit (voir 2.2). Un champ optionnel `apercu?: string` (miniature floutée de quelques centaines d'octets, encodée en base64) évite le flash au chargement ; je le déconseille en première version, il alourdit le brouillon persisté.

### 2.2 Ce que cela implique pour l'invariant de la couche 0

L'invariant : *un couple change de template sans rien ressaisir et sans rien perdre.* Il tient si, et seulement si :

1. **Chaque variante rend toutes les photos, dans l'ordre du tableau.** Une variante « trio » qui n'affiche que les trois premières ne perd rien dans les données, mais perd tout dans la perception : un couple qui a déposé douze photos et en voit trois après un changement de template croira les avoir perdues. Si une variante impose un plafond, le Studio doit l'annoncer avant le choix du template, pas après.
2. **Aucune donnée dépendante du template.** Ni recadrage, ni « cette photo en grand », ni ordre différent selon la composition. Une variante mosaïque qui veut une photo dominante prend la première du tableau, point.
3. **Le brouillon ne contient que des références.** Le brouillon est persisté dans `localStorage` (clé `ofp-studio-draft`, plafond pratique d'environ 5 Mo par origine). Une photo de smartphone pèse 3 à 5 Mo. Une seule photo en data URI saturerait le stockage et ferait échouer la persistance de tout le brouillon, prénoms compris. Le champ `src` est donc une URL, ce qui suppose un service de dépôt et d'hébergement — que le §9 place explicitement hors périmètre (« base de données et publication »).

Conséquence : **la galerie ne dépend pas seulement d'une extension de schéma, elle dépend d'une infrastructure qui n'existe pas encore.** C'est le point qui change l'ordre de priorité.

### 2.3 Ce que cela coûte au §6

Le §6 est explicite : « Décor SVG inline, aucune image bitmap ». Une galerie est du bitmap par définition. Il ne s'agit donc pas de respecter le budget, mais de décider une **exception** et de la borner.

**Hébergement.** Il faut un stockage d'objets, un CDN, et une chaîne de transformation d'images (redimensionnement, conversion AVIF/WebP, plusieurs largeurs pour `srcset`). Soit un service dédié, soit l'optimisation d'images de la plateforme d'hébergement. À cela s'ajoutent des obligations qui ne sont pas techniques : les photos d'un mariage montrent des personnes identifiables sur une URL publique — il faut des URL non devinables, la suppression effective à la demande (RGPD), et une durée de rétention définie après le mariage.

**Poids.** Ordre de grandeur : une photo servie à 1 200 px de large en WebP pèse 120 à 200 ko. Six photos, c'est environ 1 Mo ; douze, environ 2 Mo. C'est plus que l'intégralité du JavaScript de la page (§6 : GSAP et ses plugins, une cinquantaine de ko). Sur 4G moyenne, ce sont une à deux secondes de bande passante — acceptables seulement si elles ne bloquent rien.

**LCP.** La cible est < 2,0 s sur Android milieu de gamme en 4G. Elle tient à trois conditions, toutes structurelles :

- **jamais d'image dans le premier écran** : la couverture reste vectorielle, la galerie est toujours sous la ligne de flottaison, et le moteur devrait l'interdire par le typage ou par le test de build de la matrice (une galerie en première ou deuxième section est refusée) ;
- **`loading="lazy"`, `width`/`height` renseignés, `srcset`/`sizes`** sur chaque image, sans exception — les dimensions obligatoires du schéma existent pour ça ;
- **un plafond de photos** (huit me paraît raisonnable) et une taille maximale côté serveur (1 600 px sur le grand côté) imposés au dépôt, pas à l'affichage.

Enfin, la parité d'aperçu (§7) exige que l'aperçu téléphone du Studio charge les mêmes images par le même moteur : le coût se paie aussi dans le Studio, à chaque frappe.

### 2.4 Recommandation

**Ne pas écrire les trois variantes de galerie dans la passe 2.** Ce n'est pas une question de composition : les variantes seront simples à écrire le jour où les données existent. C'est une question de dépendances :

1. décision produit d'accepter le bitmap comme exception au §6, avec les trois bornes ci-dessus inscrites dans la spec ;
2. dépôt et hébergement des photos (§9), avec la chaîne de transformation et les obligations RGPD ;
3. extension de `StudioDraft` (2.1), pas de migration du brouillon persisté (un tableau vide par défaut suffit, voir 3.2 pour le piège de fusion) ;
4. étape « Photos » dans le Studio ;
5. entrée `galerie` dans `aDuContenu()` du moteur (`draft.photos.length > 0`) ;
6. et seulement alors, les trois variantes.

Le point 2 est le seul coûteux. Tant qu'il n'est pas arbitré, la galerie doit sortir du compte des 28 variantes de la passe 2, ou y rester en tant que « dette déclarée » : les 30 templates se déclarent sans elle, et elle s'ajoutera comme une section optionnelle de plus, sans toucher au moteur.

---

## 3. FAQ

### 3.1 Extension minimale de `StudioDraft`

```ts
export interface QuestionFaq {
  id: string;
  question: string;
  reponse: string;
}

export interface StudioDraft {
  // …champs existants inchangés…
  /** Ordre du tableau = ordre d'affichage. */
  faq: QuestionFaq[];
}
```

Deux chaînes par entrée, rien d'autre. Pas de catégorie, pas d'icône, pas de « question mise en avant » : ce seraient des choix de présentation, donc du ressort du template, et le template n'écrit pas dans la couche 0. Une variante qui veut regrouper ou numéroter le fait à partir de l'ordre du tableau.

À écarter : un champ `texteFaq: string` en texte libre (« à la Markdown »). Il paraît plus simple, mais il rend impossible toute variante structurée — accordéon, deux colonnes, numérotation — et il déplace la mise en forme dans le contenu, exactement ce que la couche 0 sépare.

### 3.2 Ce que cela implique pour l'invariant de la couche 0

Le contenu est du texte pur : l'invariant tient naturellement, aux mêmes conditions que la galerie — chaque variante rend toutes les entrées, dans l'ordre, sans métadonnée par template.

Deux implications techniques, hors moteur :

- **Migration du brouillon persisté.** Le middleware `persist` de Zustand fusionne l'état persisté sur l'état initial par copie superficielle : un brouillon déjà enregistré dans le navigateur, sans champ `faq`, écraserait `draft` entier et laisserait `draft.faq` à `undefined`. Il faut soit une fonction `merge` qui complète les champs manquants, soit un `version` avec `migrate`. Ce piège est le même pour `photos`.
- **Une étape de saisie dans le Studio** (liste de questions-réponses, ajout, suppression, réordonnancement). C'est le vrai coût de la FAQ : non pas ses variantes, mais son formulaire.

Et une ligne dans le moteur : `faq` dans `aDuContenu()`, `draft.faq.length > 0`.

### 3.3 Coût au §6

Nul. Du texte, rendu côté serveur, lisible sans JavaScript. La seule exigence : la variante « accordéon » — la plus attendue — doit s'écrire avec `<details>`/`<summary>` natifs, pas avec un état React, pour rester lisible si le JavaScript échoue (§6, corollaire sur le portail d'ouverture : le contenu est dans le DOM dès le rendu serveur). Les deux variantes du §4 ont alors une différence de composition réelle et non cosmétique : l'une replie (accordéon, une question visible à la fois), l'autre déploie (liste ouverte, numérotée, en deux colonnes sur écran large).

### 3.4 Recommandation

**Faire la FAQ, et la faire tôt** — mais pas dans cette passe, et pas depuis une session de variantes. La FAQ est la section qui absorbe le plus de questions adressées au couple (hébergement, enfants, parking, cadeaux, horaires de fin) ; elle vaut plus, pour le produit, que la troisième variante de bien des types. Elle coûte une extension de schéma de trois lignes, une garde de migration, une étape de Studio et une entrée dans `aDuContenu()`.

Séquence proposée : une passe courte, après la fusion de la passe 2, qui livre en une seule pull request l'extension de `StudioDraft`, la garde de migration, l'étape Studio, l'entrée dans le moteur et les deux variantes. Le tout touche des fichiers partagés (`lib/types.ts`, `InvitationCanvas.tsx`, le store), ce qui est exactement pourquoi cela ne se fait pas en parallèle des quatre sessions de la passe 2.

---

## 4. Résumé

| | Galerie | FAQ |
|---|---|---|
| Extension de `StudioDraft` | `photos: PhotoGalerie[]` (id, src, largeur, hauteur, alt, legende?) | `faq: QuestionFaq[]` (id, question, reponse) |
| Invariant couche 0 | Tient si toutes les photos sont rendues et si le brouillon ne stocke que des URL | Tient naturellement ; garde de migration du brouillon persisté |
| Coût §6 | Exception au « aucun bitmap » à décider et borner ; hébergement, RGPD, plafond, lazy, jamais au premier écran | Nul, si l'accordéon est en `<details>` natif |
| Dépendance bloquante | Dépôt et hébergement des photos (§9) | Aucune |
| Recommandation | Reporter après l'arbitrage hébergement ; sortir du compte de la passe 2 | Passe courte dédiée juste après la passe 2 |
