import { Arche } from "@/components/invitation/decor/motifs/Arche";
import { Cadre } from "@/components/invitation/decor/motifs/Cadre";
import { Diagonale } from "@/components/invitation/decor/motifs/Diagonale";
import { Onde } from "@/components/invitation/decor/motifs/Onde";
import { Semis } from "@/components/invitation/decor/motifs/Semis";
import { Voute } from "@/components/invitation/decor/motifs/Voute";
import { MOTIF_VIEWBOX, type MotifProps } from "@/components/invitation/decor/motifs/types";
import type { DecorSpec, MotifShape, Palette } from "@/lib/types";

const motifComponents: Record<MotifShape, (props: MotifProps) => React.ReactElement> = {
  arche: Arche,
  onde: Onde,
  cadre: Cadre,
  diagonale: Diagonale,
  semis: Semis,
  voute: Voute,
};

interface DecorContinuProps {
  decor: DecorSpec;
  palette: Palette;
  stroke?: number;
}

/** Échelle d'une tuile du décor continu, en unités du repère des motifs. */
const ECHELLE = 1.7;
/** Opacité du décor sous le texte : un filet à ce niveau ne déplace pas le contraste du papier. */
const OPACITE = 0.16;

/**
 * Couche 3 — le décor continu : la texture du template habille tout le
 * défilement, pas seulement la couverture. 100 % vectoriel, rendu côté
 * serveur, posé derrière les sections et jamais devant.
 *
 * `continu` répète le motif sur toute la hauteur ; `lateral` le confine
 * aux marges ; `bas` le pose une fois, en pied de page. `haut` est le
 * ressort de la couverture, qui rend son propre décor plein cadre.
 * La parallaxe est confiée au lissage de bureau (`data-speed`) : au
 * tactile, le décor défile avec la page.
 */
export function DecorContinu({ decor, palette, stroke = 1 }: DecorContinuProps) {
  const { anchors, parallax } = decor;
  const continu = anchors.includes("continu");
  const lateral = anchors.includes("lateral");
  const bas = anchors.includes("bas");
  if (!continu && !lateral && !bas) return null;

  const box = { x: 0, y: 0, width: MOTIF_VIEWBOX.width, height: MOTIF_VIEWBOX.height };
  const motifs = decor.motifs.map((motif) => {
    const Motif = motifComponents[motif];
    return <Motif key={motif} palette={palette} density="rare" stroke={stroke * 0.8} box={box} />;
  });

  const masque = lateral && !continu
    ? "linear-gradient(to right, black 0%, transparent 22%, transparent 78%, black 100%)"
    : undefined;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
      data-speed={parallax ? "0.94" : undefined}
      style={{ opacity: OPACITE, maskImage: masque, WebkitMaskImage: masque }}
    >
      {(continu || lateral) && (
        <svg className="absolute inset-0 h-full w-full" role="img">
          <defs>
            <pattern
              id="ofp-decor-continu"
              patternUnits="userSpaceOnUse"
              width={MOTIF_VIEWBOX.width * ECHELLE}
              height={MOTIF_VIEWBOX.height * ECHELLE}
              patternTransform={`scale(${ECHELLE})`}
              viewBox={`0 0 ${MOTIF_VIEWBOX.width} ${MOTIF_VIEWBOX.height}`}
              preserveAspectRatio="xMidYMid slice"
            >
              {motifs}
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#ofp-decor-continu)" />
        </svg>
      )}
      {bas && (
        <svg
          className="absolute inset-x-0 bottom-0 h-[60svh] w-full"
          viewBox={`0 0 ${MOTIF_VIEWBOX.width} ${MOTIF_VIEWBOX.height}`}
          preserveAspectRatio="xMidYMax slice"
          role="img"
        >
          {motifs}
        </svg>
      )}
    </div>
  );
}
