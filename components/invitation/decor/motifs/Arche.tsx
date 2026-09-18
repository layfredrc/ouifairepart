import { motifCount, type MotifProps } from "@/components/invitation/decor/motifs/types";

/**
 * Arche : deux arcs en plein cintre, l'un en accent, l'autre en accent
 * doux, dont les montants descendent jusqu'au bas du cadre. Un semis de
 * graines court le long des montants.
 */
export function Arche({ palette, density, stroke, box }: MotifProps) {
  const { accent, accentSoft } = palette;
  const graines = motifCount(9, density);
  const bas = box.y + box.height;

  const semis = (cote: "gauche" | "droite") =>
    Array.from({ length: graines }).map((_, i) => (
      <circle
        key={`${cote}-${i}`}
        cx={cote === "gauche" ? 72 + (i % 3) * 12 : 328 - (i % 3) * 12}
        cy={170 + Math.floor(i / 3) * 40 + (i % 2) * 14}
        r={i % 4 === 0 ? 3 : 1.8}
        fill={i % 3 === 0 ? accent : accentSoft}
        opacity={0.7}
      />
    ));

  return (
    <g>
      <path
        d={`M60 ${bas} V300 Q60 140 200 140 Q340 140 340 300 V${bas}`}
        fill="none"
        stroke={accent}
        strokeWidth={1.5 * stroke}
      />
      <path
        d={`M90 ${bas} V310 Q90 175 200 175 Q310 175 310 310 V${bas}`}
        fill="none"
        stroke={accentSoft}
        strokeWidth={1 * stroke}
      />
      {semis("gauche")}
      {semis("droite")}
    </g>
  );
}
