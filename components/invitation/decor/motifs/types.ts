import type { DecorDensity, Palette } from "@/lib/types";

/** Repère commun à tous les motifs, en unités du viewBox du décor. */
export const MOTIF_VIEWBOX = { width: 400, height: 700 } as const;

/**
 * Zone réellement visible, dans le repère des motifs. Elle contient
 * toujours le repère de référence (400 × 700) et s'élargit ou s'allonge
 * pour épouser le cadre : un motif qui s'accroche aux bords (un cadre, un
 * coin) se cale sur `box`, un motif centré ignore tout sauf le centre.
 */
export interface MotifBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface MotifProps {
  palette: Palette;
  density: DecorDensity;
  /** Multiplicateur d'épaisseur de trait. 1 = épaisseurs de référence. */
  stroke: number;
  box: MotifBox;
}

const densityFactors: Record<DecorDensity, number> = {
  rare: 0.6,
  moyenne: 1,
  dense: 1.6,
};

/** Nombre d'occurrences d'un ornement pour une densité donnée. */
export function motifCount(reference: number, density: DecorDensity): number {
  return Math.max(1, Math.round(reference * densityFactors[density]));
}
