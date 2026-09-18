import type { SansOptions } from "@/lib/sections/options";

export interface ProgrammeGrilleHorairesOptions {
  /** Filets horizontaux entre les lignes de la grille. Vrai par défaut. */
  filets?: boolean;
  /** Côté où les heures s'alignent, contre le filet vertical ou en marge. `droite` par défaut. */
  alignementHeures?: "droite" | "gauche";
}

export interface ProgrammeCartesEmpileesOptions {
  /** Numérote chaque carte (01 / 04). Vrai par défaut. */
  numerotation?: boolean;
  /** Décale les cartes en quinconce pour l'effet de pile. Vrai par défaut. */
  quinconce?: boolean;
}

export interface ProgrammeFriseHorizontaleOptions {
  /** Aimante le défilement latéral sur chaque étape. Vrai par défaut. */
  aimant?: boolean;
  /** Marqueur posé sur la frise : un point plein, ou le numéro de l'étape. `points` par défaut. */
  marqueurs?: "points" | "numeros";
}

/**
 * Variantes de programme et leurs options.
 *
 * Toute option doit être facultative : le moteur rend une variante dont
 * le template ne déclare aucune option.
 */
export interface ProgrammeVariants {
  "timeline-verticale": SansOptions;
  "grille-horaires": ProgrammeGrilleHorairesOptions;
  "cartes-empilees": ProgrammeCartesEmpileesOptions;
  "frise-horizontale": ProgrammeFriseHorizontaleOptions;
}
