import type { MotifProps } from "@/components/invitation/decor/motifs/types";

const coins: [number, number][] = [
  [34, 34],
  [366, 34],
  [34, 666],
  [366, 666],
];

export function Cadre({ palette, stroke }: MotifProps) {
  const { accent, accentSoft } = palette;

  return (
    <g>
      <rect
        x="34"
        y="34"
        width="332"
        height="632"
        fill="none"
        stroke={accent}
        strokeWidth={1.5 * stroke}
      />
      <rect
        x="48"
        y="48"
        width="304"
        height="604"
        fill="none"
        stroke={accentSoft}
        strokeWidth={1 * stroke}
      />
      {coins.map(([x, y], i) => (
        <path
          key={i}
          d={`M${x} ${y} l${x < 200 ? 26 : -26} 0 M${x} ${y} l0 ${y < 200 ? 26 : -26}`}
          stroke={accent}
          strokeWidth={1.5 * stroke}
        />
      ))}
    </g>
  );
}
