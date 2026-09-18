import { melanger, versHex, versRvb } from "@/lib/theme/contraste";
import type { Palette } from "@/lib/types";

/**
 * Couleurs dérivées d'une palette. Quatre valeurs ne suffisent pas à donner
 * de la profondeur à une page : il faut un papier plus profond pour poser la
 * feuille et les bandes, et des filets qui ne sont ni l'encre ni l'accent.
 *
 * Tout est calculé, jamais déclaré : un template ne peut pas dériver.
 * Partagé par le moteur et par le test de matrice.
 */
export interface PaletteDerivee {
  /** Papier mêlé d'un soupçon d'encre : fond de page hors feuille, bandes. */
  paperDeep: string;
  /** Filet courant : sépare sans peser. */
  line: string;
  /** Filet appuyé : un cadre, un trait porteur. */
  lineStrong: string;
}

export function deriverPalette(palette: Palette): PaletteDerivee {
  const paper = versRvb(palette.paper);
  const ink = versRvb(palette.ink);
  return {
    paperDeep: versHex(melanger(ink, paper, 0.045)),
    line: versHex(melanger(ink, paper, 0.16)),
    lineStrong: versHex(melanger(ink, paper, 0.42)),
  };
}
