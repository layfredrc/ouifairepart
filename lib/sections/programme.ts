import type { SansOptions } from "@/lib/sections/options";

export interface ProgrammeGrilleHorairesOptions {
  /** Filets horizontaux entre les lignes de la grille. Vrai par défaut. */
  filets?: boolean;
  /** Côté où les heures s'alignent, contre le filet vertical ou en marge. `droite` par défaut. */
  alignementHeures?: "droite" | "gauche";
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
}
