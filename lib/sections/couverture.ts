import type { SansOptions } from "@/lib/sections/options";

/**
 * Variantes de couverture et leurs options.
 *
 * Toute option doit être facultative : le moteur rend une variante dont
 * le template ne déclare aucune option.
 */
export interface CouvertureVariants {
  "plein-cadre-centre": SansOptions;
}
