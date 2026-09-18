import type { SansOptions } from "@/lib/sections/options";

export interface RsvpFormulaireEncadreOptions {
  /**
   * `auto` : la carte suit le rythme vertical du template.
   * `pleine` : la section occupe la hauteur de l'écran et la carte y flotte,
   * pour en faire un moment du scroll. Sans effet dans l'aperçu téléphone.
   */
  hauteur?: "auto" | "pleine";
}

/**
 * Variantes de RSVP et leurs options.
 *
 * Toute option doit être facultative : le moteur rend une variante dont
 * le template ne déclare aucune option.
 */
export interface RsvpVariants {
  "formulaire-centre": SansOptions;
  "formulaire-encadre": RsvpFormulaireEncadreOptions;
  "deux-temps": SansOptions;
}
