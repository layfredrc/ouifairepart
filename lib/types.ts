/* ------------------------------------------------------------------ *
 * Couche 0 — Contenu
 *
 * Invariant sur tous les templates. Un template choisit comment
 * afficher ces données, jamais lesquelles existent.
 * ------------------------------------------------------------------ */

export interface CoupleNames {
  prenom1: string;
  prenom2: string;
}

export type OpeningStyle = "rideau" | "enveloppe" | "fondu";
export type AnimationIntensity = "sobre" | "normale" | "festive";

export interface CeremonyStep {
  id: string;
  label: string;
  heure: string;
  lieu?: string;
}

export interface AddonSelection {
  langueSupplementaire: boolean;
  musiquePersonnelle: boolean;
  domainePersonnalise: boolean;
  exportImprimable: boolean;
  revisionAssistee: boolean;
}

export interface StudioDraft {
  /** Identifiant de template. Conserve le nom `designId` : la clé est persistée côté navigateur. */
  designId: string | null;
  paletteId: string | null;
  prenom1: string;
  prenom2: string;
  dateMariage: string;
  ville: string;
  lieu: string;
  programme: CeremonyStep[];
  dressCode: string;
  texteInvitation: string;
  openingStyle: OpeningStyle;
  animationIntensity: AnimationIntensity;
  addons: AddonSelection;
  compteurPublic: boolean;
}

export interface RsvpEntry {
  id: string;
  nom: string;
  personnes: number;
  reponse: "present" | "absent";
  message?: string;
  soumisLe: string;
}

/* ------------------------------------------------------------------ *
 * Couche 1 — Thème (tokens)
 * ------------------------------------------------------------------ */

export interface Palette {
  id: string;
  name: string;
  paper: string;
  ink: string;
  accent: string;
  accentSoft: string;
}

export type FontStackId =
  | "cormorant-garamond"
  | "spectral"
  | "playfair-display"
  | "eb-garamond"
  | "libre-baskerville"
  | "fraunces"
  | "jost"
  | "karla"
  | "work-sans"
  | "lato";

export type TypeScale = "compacte" | "normale" | "ample";
export type DisplayStyle = "italique" | "romain" | "capitales";
export type Rhythm = "dense" | "normal" | "aere";
export type RadiusToken = "vif" | "doux" | "rond";

export interface TypographyTokens {
  display: FontStackId;
  body: FontStackId;
  scale: TypeScale;
  displayStyle: DisplayStyle;
}

export interface ThemeTokens {
  palette: Palette;
  typography: TypographyTokens;
  rhythm: Rhythm;
  /** Multiplicateur d'épaisseur des traits du décor. 1 = épaisseurs de référence. */
  stroke: number;
  radius: RadiusToken;
}

/* ------------------------------------------------------------------ *
 * Couche 2 — Composition
 *
 * `SectionVariantRegistry` est la source unique : elle associe à chaque
 * type de section ses variantes et, pour chacune, ses options. Ajouter
 * une variante = ajouter une ligne ici, un composant, et son entrée
 * dans le registre de composants du moteur.
 *
 * Toutes les options doivent être facultatives : le moteur rend une
 * variante sans `options` déclarées.
 * ------------------------------------------------------------------ */

/** Variante sans réglage : `options` n'accepte alors que l'objet vide. */
export type SansOptions = Record<string, never>;

export interface LieuCentreSimpleOptions {
  /** Services d'itinéraire proposés sous l'adresse. */
  itineraires?: readonly string[];
}

export interface SectionVariantRegistry {
  couverture: {
    "plein-cadre-centre": SansOptions;
  };
  annonce: {
    "citation-centree": SansOptions;
  };
  programme: {
    "timeline-verticale": SansOptions;
  };
  lieu: {
    "centre-simple": LieuCentreSimpleOptions;
  };
  galerie: Record<never, never>;
  dresscode: Record<never, never>;
  rsvp: {
    "formulaire-centre": SansOptions;
  };
  cagnotte: {
    "bloc-centre": SansOptions;
  };
  faq: Record<never, never>;
  contact: {
    "signature-centree": SansOptions;
  };
}

export type SectionType = keyof SectionVariantRegistry;

export type VariantIdOf<T extends SectionType> = Extract<
  keyof SectionVariantRegistry[T],
  string
>;

export type VariantOptionsOf<
  T extends SectionType,
  V extends VariantIdOf<T>,
> = SectionVariantRegistry[T][V];

export interface SectionInstanceOf<
  T extends SectionType,
  V extends VariantIdOf<T>,
> {
  type: T;
  variant: V;
  options?: VariantOptionsOf<T, V>;
  reveal?: RevealSpec;
}

/**
 * Union distribuée sur les couples (type, variante) réellement déclarés.
 * C'est elle qui rend `{ type: "couverture", variant: "timeline-verticale" }`
 * impossible à compiler.
 */
export type SectionInstance<T extends SectionType = SectionType> = {
  [K in T]: { [V in VariantIdOf<K>]: SectionInstanceOf<K, V> }[VariantIdOf<K>];
}[T];

/* ------------------------------------------------------------------ *
 * Couche 3 — Décor
 * ------------------------------------------------------------------ */

export type MotifShape =
  | "arche"
  | "onde"
  | "cadre"
  | "diagonale"
  | "semis"
  | "voute";

export type DecorDensity = "rare" | "moyenne" | "dense";
export type DecorAnchor = "haut" | "bas" | "lateral" | "continu";

export interface DecorSpec {
  /** Un ou deux motifs : au-delà, le décor devient du bruit. */
  motifs: readonly [MotifShape] | readonly [MotifShape, MotifShape];
  density: DecorDensity;
  parallax: boolean;
  anchors: readonly DecorAnchor[];
}

/* ------------------------------------------------------------------ *
 * Couche 4 — Mouvement
 * ------------------------------------------------------------------ */

export type RevealKind = "fade-up" | "masque" | "cascade";

export interface RevealSpec {
  kind: RevealKind;
  /**
   * Décalage entre enfants, en secondes. Pris en compte par `cascade`,
   * qui orchestre les enfants enveloppés dans `RevealItem`.
   */
  stagger?: number;
}

export interface OpeningSpec {
  /** Ouverture suggérée par le template ; le choix du couple prévaut. */
  style: OpeningStyle;
  /** Durée en millisecondes. Plafonnée à 1200 par le moteur. */
  duree: number;
  cascadePrenoms: boolean;
}

/* ------------------------------------------------------------------ *
 * Couche 5 — Son
 * ------------------------------------------------------------------ */

export interface SoundSpec {
  pisteId: string;
  titre: string;
  /** Volume de départ, de 0 à 1. */
  volume: number;
}

/* ------------------------------------------------------------------ *
 * Template
 * ------------------------------------------------------------------ */

export type StyleFamily =
  | "Botanique"
  | "Minimaliste"
  | "Contemporain"
  | "Romantique"
  | "Editorial"
  | "Graphique";

export type Ambiance = "Chaude" | "Froide" | "Neutre" | "Sombre";

export interface FeatureFlags {
  rsvp: boolean;
  cagnotte: boolean;
  musique: boolean;
  multilingue: boolean;
  planInvites: boolean;
}

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  description: string;
}

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
  sections: readonly SectionInstance[];
  features: FeatureFlags;
}
