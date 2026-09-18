import { motifCount, type MotifProps } from "@/components/invitation/decor/motifs/types";

export function Onde({ palette, density, stroke }: MotifProps) {
  const { accent, accentSoft } = palette;
  const vagues = motifCount(4, density);

  return (
    <g>
      <circle cx="200" cy="180" r="46" fill="none" stroke={accent} strokeWidth={1.5 * stroke} />
      <circle cx="200" cy="180" r="46" fill={accentSoft} opacity="0.35" />
      {Array.from({ length: vagues }).map((_, i) => (
        <path
          key={i}
          d={`M0 ${480 + i * 32} Q100 ${450 + i * 32} 200 ${480 + i * 32} T400 ${480 + i * 32}`}
          fill="none"
          stroke={i % 2 === 0 ? accent : accentSoft}
          strokeWidth={(i === 0 ? 2 : 1.2) * stroke}
          opacity={Math.max(0.1, 1 - i * 0.18)}
        />
      ))}
    </g>
  );
}
