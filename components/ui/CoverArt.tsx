import type { MotifShape, Palette } from "@/lib/types";

interface CoverArtProps {
  motif: MotifShape;
  palette: Palette;
  className?: string;
}

/**
 * Système de "covers" 100% vectoriel : chaque famille de design est une
 * composition de formes géométriques/organiques (pas une image importée),
 * recolorée dynamiquement par la palette de la variante choisie. C'est ce
 * même mécanisme qui permettra, en production, de recomposer une couverture
 * à partir d'une palette extraite de la photo du couple sans intervention
 * manuelle par commande.
 */
export function CoverArt({ motif, palette, className }: CoverArtProps) {
  const { paper, ink, accent, accentSoft } = palette;

  return (
    <svg
      viewBox="0 0 400 700"
      className={className}
      preserveAspectRatio="xMidYMid slice"
      role="img"
      aria-hidden="true"
    >
      <rect width="400" height="700" fill={paper} />
      {motif === "arche" && (
        <g>
          <path
            d="M60 640 V300 Q60 140 200 140 Q340 140 340 300 V640"
            fill="none"
            stroke={accent}
            strokeWidth="2"
          />
          <path
            d="M90 640 V310 Q90 175 200 175 Q310 175 310 310 V640"
            fill="none"
            stroke={accentSoft}
            strokeWidth="1.5"
          />
          {Array.from({ length: 9 }).map((_, i) => (
            <circle
              key={i}
              cx={72 + (i % 3) * 12}
              cy={170 + Math.floor(i / 3) * 40 + (i % 2) * 14}
              r={i % 4 === 0 ? 4 : 2.4}
              fill={i % 3 === 0 ? accent : accentSoft}
              opacity={0.8}
            />
          ))}
          {Array.from({ length: 9 }).map((_, i) => (
            <circle
              key={`r-${i}`}
              cx={328 - (i % 3) * 12}
              cy={170 + Math.floor(i / 3) * 40 + (i % 2) * 14}
              r={i % 4 === 0 ? 4 : 2.4}
              fill={i % 3 === 0 ? accent : accentSoft}
              opacity={0.8}
            />
          ))}
        </g>
      )}

      {motif === "onde" && (
        <g>
          <circle cx="200" cy="180" r="46" fill="none" stroke={accent} strokeWidth="1.5" />
          <circle cx="200" cy="180" r="46" fill={accentSoft} opacity="0.35" />
          {[0, 1, 2, 3].map((i) => (
            <path
              key={i}
              d={`M0 ${480 + i * 32} Q100 ${450 + i * 32} 200 ${480 + i * 32} T400 ${480 + i * 32}`}
              fill="none"
              stroke={i % 2 === 0 ? accent : accentSoft}
              strokeWidth={i === 0 ? 2 : 1.2}
              opacity={1 - i * 0.18}
            />
          ))}
        </g>
      )}

      {motif === "cadre" && (
        <g>
          <rect x="34" y="34" width="332" height="632" fill="none" stroke={accent} strokeWidth="1.5" />
          <rect x="48" y="48" width="304" height="604" fill="none" stroke={accentSoft} strokeWidth="1" />
          {[
            [34, 34],
            [366, 34],
            [34, 666],
            [366, 666],
          ].map(([x, y], i) => (
            <path
              key={i}
              d={`M${x} ${y} l${x < 200 ? 26 : -26} 0 M${x} ${y} l0 ${y < 200 ? 26 : -26}`}
              stroke={accent}
              strokeWidth="1.5"
            />
          ))}
        </g>
      )}

      {motif === "diagonale" && (
        <g>
          <path d="M0 0 L180 0 L0 240 Z" fill={ink} opacity="0.92" />
          <path d="M400 700 L220 700 L400 460 Z" fill={ink} opacity="0.92" />
          <line x1="0" y1="260" x2="220" y2="0" stroke={accent} strokeWidth="1" opacity="0.6" />
          <line x1="180" y1="700" x2="400" y2="440" stroke={accent} strokeWidth="1" opacity="0.6" />
        </g>
      )}

      {motif === "semis" && (
        <g>
          {Array.from({ length: 60 }).map((_, i) => {
            const x = (i * 53) % 400;
            const y = ((i * 97) % 700);
            const isPlus = i % 5 === 0;
            return isPlus ? (
              <path
                key={i}
                d={`M${x - 5} ${y} h10 M${x} ${y - 5} v10`}
                stroke={accent}
                strokeWidth="1.3"
                opacity="0.7"
              />
            ) : (
              <circle key={i} cx={x} cy={y} r={i % 3 === 0 ? 2.2 : 1.4} fill={accentSoft} opacity="0.85" />
            );
          })}
        </g>
      )}

      {motif === "voute" && (
        <g>
          {[300, 260, 220, 180].map((r, i) => (
            <path
              key={i}
              d={`M${200 - r} 620 A ${r} ${r} 0 0 1 ${200 + r} 620`}
              fill="none"
              stroke={i % 2 === 0 ? accent : accentSoft}
              strokeWidth={i === 3 ? 2 : 1}
              opacity={0.9 - i * 0.12}
            />
          ))}
          <circle cx="200" cy="330" r="3" fill={accent} />
        </g>
      )}
    </svg>
  );
}
