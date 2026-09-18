import { motifCount, type MotifProps } from "@/components/invitation/decor/motifs/types";

/**
 * Onde : un soleil en filet fin, haut, et des vagues qui traversent tout
 * le cadre et s'éteignent vers le bas. Aucun aplat : un dessin au trait.
 */
export function Onde({ palette, density, stroke, box }: MotifProps) {
  const { accent, accentSoft } = palette;
  const vagues = motifCount(5, density);
  const gauche = box.x - 40;
  const droite = box.x + box.width + 40;
  const periode = 200;
  const bas = box.y + box.height;

  const vague = (y: number) => {
    let d = `M${gauche} ${y}`;
    for (let x = gauche; x < droite; x += periode) {
      d += ` Q${x + periode / 4} ${y - 22} ${x + periode / 2} ${y} T${x + periode} ${y}`;
    }
    return d;
  };

  return (
    <g>
      <circle cx="200" cy={box.y + 110} r="46" fill="none" stroke={accent} strokeWidth={1.2 * stroke} />
      <circle cx="200" cy={box.y + 110} r="35" fill="none" stroke={accentSoft} strokeWidth={0.8 * stroke} />
      {Array.from({ length: vagues }).map((_, i) => (
        <path
          key={i}
          d={vague(bas - 140 + i * 26)}
          fill="none"
          stroke={i % 2 === 0 ? accent : accentSoft}
          strokeWidth={(i === 0 ? 1.6 : 1) * stroke}
          opacity={Math.max(0.15, 1 - i * 0.2)}
        />
      ))}
    </g>
  );
}
