export interface LieuCentreSimpleOptions {
  /** Services d'itinéraire proposés sous l'adresse. */
  itineraires?: readonly string[];
}

export interface LieuCarteEncadreeOptions {
  /** Services d'itinéraire proposés sous l'adresse. */
  itineraires?: readonly string[];
  /** Proportions de la vignette de plan. `paysage` par défaut. */
  format?: "paysage" | "carre";
  /** Rappelle le dress code sous l'adresse, comme `centre-simple`. Vrai par défaut. */
  dressCode?: boolean;
}

/**
 * Variantes de lieu et leurs options.
 *
 * Toute option doit être facultative : le moteur rend une variante dont
 * le template ne déclare aucune option.
 */
export interface LieuVariants {
  "centre-simple": LieuCentreSimpleOptions;
  "carte-encadree": LieuCarteEncadreeOptions;
}
