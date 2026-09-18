import type { SansOptions } from "@/lib/sections/options";

/**
 * Variantes de couverture et leurs options.
 *
 * Toute option doit être facultative : le moteur rend une variante dont
 * le template ne déclare aucune option.
 */

export interface CouvertureEditorialBasGaucheOptions {
  /** Part de la hauteur laissée au décor, au-dessus du bloc de noms. */
  partDecor?: "moitie" | "deux-tiers";
}

export interface CouvertureDiptyqueOptions {
  /** Côté du panneau de décor quand les deux panneaux tiennent côte à côte. */
  coteArt?: "gauche" | "droite";
}

export interface CouvertureMedaillonOptions {
  /** Filet du cartouche : double (filet + filet intérieur) ou simple. */
  bordure?: "double" | "simple";
}

export interface CouvertureVariants {
  "plein-cadre-centre": SansOptions;
  "editorial-bas-gauche": CouvertureEditorialBasGaucheOptions;
  diptyque: CouvertureDiptyqueOptions;
  medaillon: CouvertureMedaillonOptions;
}
