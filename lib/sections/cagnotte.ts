import type { SansOptions } from "@/lib/sections/options";

/**
 * Variantes de cagnotte et leurs options.
 *
 * Toute option doit être facultative : le moteur rend une variante dont
 * le template ne déclare aucune option.
 */
export interface CagnotteVariants {
  "bloc-centre": SansOptions;
  "note-en-marge": SansOptions;
}
