import { motifCount, type MotifProps } from "@/components/invitation/decor/motifs/types";

export function Voute({ palette, density, stroke }: MotifProps) {
  const { accent, accentSoft } = palette;
  const arcs = motifCount(4, density);

  return (
    <g>
      {Array.from({ length: arcs }).map((_, i) => {
        const r = 300 - i * 40;
        return (
          <path
            key={i}
            d={`M${200 - r} 620 A ${r} ${r} 0 0 1 ${200 + r} 620`}
            fill="none"
            stroke={i % 2 === 0 ? accent : accentSoft}
            strokeWidth={(i === arcs - 1 ? 2 : 1) * stroke}
            opacity={Math.max(0.1, 0.9 - i * 0.12)}
          />
        );
      })}
      <circle cx="200" cy="330" r="3" fill={accent} />
    </g>
  );
}
