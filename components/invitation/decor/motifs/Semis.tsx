import { motifCount, type MotifProps } from "@/components/invitation/decor/motifs/types";

/** Semis : des grains et de petites croix dispersés sur tout le cadre. */
export function Semis({ palette, density, stroke, box }: MotifProps) {
  const { accent, accentSoft } = palette;
  const surface = (box.width * box.height) / (400 * 700);
  const grains = motifCount(Math.round(60 * surface), density);

  return (
    <g>
      {Array.from({ length: grains }).map((_, i) => {
        const x = box.x + ((i * 53) % box.width);
        const y = box.y + ((i * 97) % box.height);
        return i % 5 === 0 ? (
          <path
            key={i}
            d={`M${x - 5} ${y} h10 M${x} ${y - 5} v10`}
            stroke={accent}
            strokeWidth={1.2 * stroke}
            opacity="0.7"
          />
        ) : (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i % 3 === 0 ? 2 : 1.3}
            fill={accentSoft}
            opacity="0.85"
          />
        );
      })}
    </g>
  );
}
