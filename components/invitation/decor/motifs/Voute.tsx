import { motifCount, type MotifProps } from "@/components/invitation/decor/motifs/types";

/** Voûte : des arcs concentriques qui naissent du bas du cadre. */
export function Voute({ palette, density, stroke, box }: MotifProps) {
  const { accent, accentSoft } = palette;
  const arcs = motifCount(4, density);
  const bas = box.y + box.height + 20;
  const rayonMax = Math.max(260, box.width / 2 - 20);

  return (
    <g>
      {Array.from({ length: arcs }).map((_, i) => {
        const r = rayonMax - i * 40;
        return (
          <path
            key={i}
            d={`M${200 - r} ${bas} A ${r} ${r} 0 0 1 ${200 + r} ${bas}`}
            fill="none"
            stroke={i % 2 === 0 ? accent : accentSoft}
            strokeWidth={(i === arcs - 1 ? 1.8 : 1) * stroke}
            opacity={Math.max(0.1, 0.9 - i * 0.12)}
          />
        );
      })}
      <circle cx="200" cy={bas - rayonMax + 10} r="3" fill={accent} />
    </g>
  );
}
