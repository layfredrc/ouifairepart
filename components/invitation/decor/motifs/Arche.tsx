import { motifCount, type MotifProps } from "@/components/invitation/decor/motifs/types";

export function Arche({ palette, density, stroke }: MotifProps) {
  const { accent, accentSoft } = palette;
  const graines = motifCount(9, density);

  const semis = (cote: "gauche" | "droite") =>
    Array.from({ length: graines }).map((_, i) => (
      <circle
        key={`${cote}-${i}`}
        cx={cote === "gauche" ? 72 + (i % 3) * 12 : 328 - (i % 3) * 12}
        cy={170 + Math.floor(i / 3) * 40 + (i % 2) * 14}
        r={i % 4 === 0 ? 4 : 2.4}
        fill={i % 3 === 0 ? accent : accentSoft}
        opacity={0.8}
      />
    ));

  return (
    <g>
      <path
        d="M60 640 V300 Q60 140 200 140 Q340 140 340 300 V640"
        fill="none"
        stroke={accent}
        strokeWidth={2 * stroke}
      />
      <path
        d="M90 640 V310 Q90 175 200 175 Q310 175 310 310 V640"
        fill="none"
        stroke={accentSoft}
        strokeWidth={1.5 * stroke}
      />
      {semis("gauche")}
      {semis("droite")}
    </g>
  );
}
