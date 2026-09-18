import type { SansOptions } from "@/lib/sections/options";

export interface AnnonceLettreJustifieeOptions {
  /** Ligne « Ville, le date » en tête de lettre. Vrai par défaut. */
  enTete?: boolean;
  /** Prénoms en signature au pied de la lettre. Vrai par défaut. */
  signature?: boolean;
}

export interface AnnonceVariants {
  "citation-centree": SansOptions;
  "lettre-justifiee": AnnonceLettreJustifieeOptions;
}
