import { Arche } from "@/components/invitation/decor/motifs/Arche";
import { Cadre } from "@/components/invitation/decor/motifs/Cadre";
import { Diagonale } from "@/components/invitation/decor/motifs/Diagonale";
import { Onde } from "@/components/invitation/decor/motifs/Onde";
import { Semis } from "@/components/invitation/decor/motifs/Semis";
import { Voute } from "@/components/invitation/decor/motifs/Voute";
import {
  MOTIF_VIEWBOX,
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

/**
 * Décor 100 % vectoriel et inline : le recoloriage par palette est gratuit,
 * et aucune image bitmap n'entre dans le budget de la route publique.
 */
export function DecorCanvas({ decor, palette, stroke = 1, className }: DecorCanvasProps) {
  return (
    <svg
      viewBox={`0 0 ${MOTIF_VIEWBOX.width} ${MOTIF_VIEWBOX.height}`}
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
    >
      <rect width={MOTIF_VIEWBOX.width} height={MOTIF_VIEWBOX.height} fill={palette.paper} />
      {decor.motifs.map((motif) => {
        const Motif = motifComponents[motif];
        return (
          <Motif key={motif} palette={palette} density={decor.density} stroke={stroke} />
        );
      })}
    </svg>
  );
}
