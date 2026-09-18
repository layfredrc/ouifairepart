/**
 * Variantes de dress code et leurs options.
 *
 * Toute option doit être facultative : le moteur rend une variante dont
 * le template ne déclare aucune option. Aucune option n'est un champ de
 * contenu : la seule donnée affichée est `draft.dressCode`.
 */

export interface DresscodeCartonEncadreOptions {
  /** Intitulé posé en tête du carton. Par défaut : « Tenue ». */
  intitule?: string;
  /**
   * Ce sur quoi le carton est posé : le papier nu, ou le décor du template
   * qui affleure autour du carton.
   */
  fond?: "papier" | "decor";
}

export interface DresscodeVariants {
  /**
   * Le carton glissé dans l'enveloppe : un petit cadre double, centré,
   * refermé sur lui-même, la consigne en display au milieu.
   */
  "carton-encadre": DresscodeCartonEncadreOptions;
}
