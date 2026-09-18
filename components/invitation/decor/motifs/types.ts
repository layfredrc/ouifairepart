import type { DecorDensity, Palette } from "@/lib/types";

/** Repère commun à tous les motifs, en unités du viewBox du décor. */
export const MOTIF_VIEWBOX = { width: 400, height: 700 } as const;

export interface MotifProps {
  palette: Palette;
  density: DecorDensity;
  /** Multiplicateur d'épaisseur de trait. 1 = épaisseurs de référence. */
  stroke: number;
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
