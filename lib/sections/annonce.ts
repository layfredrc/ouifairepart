import type { SansOptions } from "@/lib/sections/options";

export interface AnnonceLettreJustifieeOptions {
  /** Ligne « Ville, le date » en tête de lettre. Vrai par défaut. */
  enTete?: boolean;
  /** Prénoms en signature au pied de la lettre. Vrai par défaut. */
  signature?: boolean;
}

export interface AnnonceBandeauOptions {
  /** Teinte de la bande : encre du thème (par défaut) ou accent. */
  teinte?: "encre" | "accent";
}

export interface AnnonceVariants {
  "citation-centree": SansOptions;
  "lettre-justifiee": AnnonceLettreJustifieeOptions;
  bandeau: AnnonceBandeauOptions;
}
