export type MotifShape =
  | "arche"
  | "onde"
  | "cadre"
  | "diagonale"
  | "semis"
  | "voute";

export type StyleFamily =
  | "Botanique"
  | "Minimaliste"
  | "Contemporain"
  | "Romantique"
  | "Editorial"
  | "Graphique";

export interface Palette {
  id: string;
  name: string;
  paper: string;
  ink: string;
  accent: string;
  accentSoft: string;
}

export type Ambiance = "Chaude" | "Froide" | "Neutre" | "Sombre";

export interface Collection {
  id: string;
  name: string;
  tagline: string;
  style: StyleFamily;
  ambiance: Ambiance;
  motif: MotifShape;
  description: string;
}

export interface FeatureFlags {
  rsvp: boolean;
  cagnotte: boolean;
  musique: boolean;
  multilingue: boolean;
  planInvites: boolean;
}

export interface DesignVariant {
  id: string;
  collectionId: string;
  name: string;
  palette: Palette;
  features: FeatureFlags;
}

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
