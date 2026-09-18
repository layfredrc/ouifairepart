export interface LieuCentreSimpleOptions {
  /** Services d'itinéraire proposés sous l'adresse. */
  itineraires?: readonly string[];
}

export interface LieuVariants {
  "centre-simple": LieuCentreSimpleOptions;
}
