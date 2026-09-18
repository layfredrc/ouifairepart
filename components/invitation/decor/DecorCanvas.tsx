"use client";

import { useEffect, useRef, useState } from "react";
import { Arche } from "@/components/invitation/decor/motifs/Arche";
import { Cadre } from "@/components/invitation/decor/motifs/Cadre";
import { Diagonale } from "@/components/invitation/decor/motifs/Diagonale";
import { Onde } from "@/components/invitation/decor/motifs/Onde";
import { Semis } from "@/components/invitation/decor/motifs/Semis";
import { Voute } from "@/components/invitation/decor/motifs/Voute";
import {
  MOTIF_VIEWBOX,
  type MotifBox,
  type MotifProps,
} from "@/components/invitation/decor/motifs/types";
import type { DecorSpec, MotifShape, Palette } from "@/lib/types";

const motifComponents: Record<MotifShape, (props: MotifProps) => React.ReactElement> = {
  arche: Arche,
  onde: Onde,
  cadre: Cadre,
  diagonale: Diagonale,
  semis: Semis,
  voute: Voute,
};

interface DecorCanvasProps {
  decor: DecorSpec;
  palette: Palette;
  stroke?: number;
  className?: string;
}

const boxDeReference: MotifBox = { x: 0, y: 0, width: MOTIF_VIEWBOX.width, height: MOTIF_VIEWBOX.height };

/**
 * Zone visible pour un cadre de proportion donnée : le repère de
 * référence, élargi ou allongé autour de son centre pour que rien n'en
 * soit rogné. Sur la feuille large, le décor s'étend donc sur les côtés
 * au lieu de perdre son haut et son bas.
 */
function boxPour(ratio: number): MotifBox {
  const reference = MOTIF_VIEWBOX.width / MOTIF_VIEWBOX.height;
  if (Math.abs(ratio - reference) < 0.01) return boxDeReference;
  if (ratio > reference) {
    const width = MOTIF_VIEWBOX.height * ratio;
    return { x: (MOTIF_VIEWBOX.width - width) / 2, y: 0, width, height: MOTIF_VIEWBOX.height };
  }
  const height = MOTIF_VIEWBOX.width / ratio;
  return { x: 0, y: (MOTIF_VIEWBOX.height - height) / 2, width: MOTIF_VIEWBOX.width, height };
}

/**
 * Décor 100 % vectoriel et inline : le recoloriage par palette est gratuit,
 * et aucune image bitmap n'entre dans le budget de la route publique.
 *
 * Le rendu serveur dessine le repère de référence (4:7, le mobile) ; une
 * fois monté, le canevas mesure son cadre et donne aux motifs la zone
 * réellement visible, pour qu'ils s'y accrochent.
 */
export function DecorCanvas({ decor, palette, stroke = 1, className }: DecorCanvasProps) {
  const ref = useRef<SVGSVGElement>(null);
  const [box, setBox] = useState<MotifBox>(boxDeReference);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(([entry]) => {
      const { width, height } = entry.contentRect;
      if (width > 0 && height > 0) setBox(boxPour(width / height));
    });
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <svg
      ref={ref}
      viewBox={`${box.x} ${box.y} ${box.width} ${box.height}`}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
    >
      <rect x={box.x} y={box.y} width={box.width} height={box.height} fill={palette.paper} />
      {decor.motifs.map((motif) => {
        const Motif = motifComponents[motif];
        return (
          <Motif key={motif} palette={palette} density={decor.density} stroke={stroke} box={box} />
        );
      })}
    </svg>
  );
}
