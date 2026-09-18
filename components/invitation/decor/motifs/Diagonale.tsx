import type { MotifProps } from "@/components/invitation/decor/motifs/types";

/**
 * Diagonale : un seul aplat d'encre dans le coin haut gauche, et son écho
 * en hachures fines dans le coin bas droit. Le noir et blanc assumé de
 * Clair-Obscur tient à ce contraste entre le plein et le trait.
 */
export function Diagonale({ palette, stroke, box }: MotifProps) {
  const { accent, ink } = palette;
  const x0 = box.x;
  const y0 = box.y;
  const x1 = box.x + box.width;
  const y1 = box.y + box.height;
  const hachures = Array.from({ length: 16 }, (_, i) => i * 22);

  return (
    <g>
      <path d={`M${x0} ${y0} L${x0 + 150} ${y0} L${x0} ${y0 + 190} Z`} fill={ink} />
      <line x1={x0} y1={y0 + 215} x2={x0 + 172} y2={y0} stroke={accent} strokeWidth={1 * stroke} />
      <clipPath id="ofp-diagonale-coin">
        <path d={`M${x1} ${y1} L${x1 - 210} ${y1} L${x1} ${y1 - 260} Z`} />
      </clipPath>
      <g clipPath="url(#ofp-diagonale-coin)" stroke={ink} strokeWidth={0.9 * stroke} opacity="0.75">
        {hachures.map((d) => (
          <line key={d} x1={x1 - 300 + d} y1={y1 + 20} x2={x1 + 40 + d} y2={y1 - 400} />
        ))}
      </g>
      <line x1={x1 - 230} y1={y1} x2={x1} y2={y1 - 280} stroke={accent} strokeWidth={1 * stroke} />
    </g>
  );
}
