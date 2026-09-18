import type { MotifProps } from "@/components/invitation/decor/motifs/types";

export function Diagonale({ palette, stroke }: MotifProps) {
  const { accent, ink } = palette;

  return (
    <g>
      <path d="M0 0 L180 0 L0 240 Z" fill={ink} opacity="0.92" />
      <path d="M400 700 L220 700 L400 460 Z" fill={ink} opacity="0.92" />
      <line
        x1="0"
        y1="260"
        x2="220"
        y2="0"
        stroke={accent}
        strokeWidth={1 * stroke}
        opacity="0.6"
      />
      <line
        x1="180"
        y1="700"
        x2="400"
        y2="440"
        stroke={accent}
        strokeWidth={1 * stroke}
        opacity="0.6"
      />
    </g>
  );
}
