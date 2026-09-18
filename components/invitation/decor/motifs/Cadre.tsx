import type { MotifProps } from "@/components/invitation/decor/motifs/types";

/**
 * Cadre : un double filet à marge constante, calé sur les bords réels du
 * cadre, et quatre équerres aux coins.
 */
export function Cadre({ palette, stroke, box }: MotifProps) {
  const { accent, accentSoft } = palette;
  const marge = 34;
  const x1 = box.x + marge;
  const y1 = box.y + marge;
  const x2 = box.x + box.width - marge;
  const y2 = box.y + box.height - marge;
  const coins: [number, number, number, number][] = [
    [x1, y1, 1, 1],
    [x2, y1, -1, 1],
    [x1, y2, 1, -1],
    [x2, y2, -1, -1],
  ];

  return (
    <g>
      <rect
        x={x1}
        y={y1}
        width={x2 - x1}
        height={y2 - y1}
        fill="none"
        stroke={accent}
        strokeWidth={1.4 * stroke}
      />
      <rect
        x={x1 + 14}
        y={y1 + 14}
        width={x2 - x1 - 28}
        height={y2 - y1 - 28}
        fill="none"
        stroke={accentSoft}
        strokeWidth={1 * stroke}
      />
      {coins.map(([x, y, sx, sy], i) => (
        <path
          key={i}
          d={`M${x} ${y} l${26 * sx} 0 M${x} ${y} l0 ${26 * sy}`}
          stroke={accent}
          strokeWidth={1.4 * stroke}
        />
      ))}
    </g>
  );
}
