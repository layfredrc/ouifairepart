import { motifCount, type MotifProps } from "@/components/invitation/decor/motifs/types";

export function Semis({ palette, density, stroke }: MotifProps) {
  const { accent, accentSoft } = palette;
  const grains = motifCount(60, density);

  return (
    <g>
      {Array.from({ length: grains }).map((_, i) => {
        const x = (i * 53) % 400;
        const y = (i * 97) % 700;
        return i % 5 === 0 ? (
          <path
            key={i}
            d={`M${x - 5} ${y} h10 M${x} ${y - 5} v10`}
            stroke={accent}
            strokeWidth={1.3 * stroke}
            opacity="0.7"
          />
        ) : (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 3 === 0 ? 2.2 : 1.4}
            fill={accentSoft}
            opacity="0.85"
          />
        );
      })}
    </g>
  );
}
