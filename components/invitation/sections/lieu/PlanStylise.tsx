import type { Palette } from "@/lib/types";

interface PlanStyliseProps {
  palette: Palette;
  /** Multiplicateur d'épaisseur de trait, celui du thème. */
  stroke: number;
  className?: string;
}

/** Îlots bâtis : des rectangles arrondis posés entre les rues. */
const ilots: [number, number, number, number][] = [
  [22, 20, 70, 44],
  [108, 18, 58, 38],
  [236, 22, 64, 40],
  [318, 26, 60, 46],
  [20, 96, 52, 58],
  [88, 104, 66, 50],
  [300, 108, 78, 52],
  [24, 200, 88, 56],
  [130, 214, 60, 46],
  [262, 206, 72, 52],
  [350, 196, 34, 64],
];

/** Rues secondaires, tracées en filet léger. */
const rues: string[] = [
  "M0 84 H400",
  "M0 190 H400",
  "M100 0 V300",
  "M226 0 V300",
  "M306 0 V300",
  "M40 0 V300",
];

/**
 * Vignette de plan stylisée — un tracé vectoriel, recoloré par la palette
 * comme le reste du décor. Aucune carte réelle n'est chargée : la route
 * publique n'admet ni image bitmap ni service externe. Le plan ne prétend
 * pas à l'exactitude ; il dit « ici », avec une rivière, des îlots, une
 * avenue et un repère.
 */
export function PlanStylise({ palette, stroke, className }: PlanStyliseProps) {
  const { paper, accent, accentSoft } = palette;
  const trait = (reference: number) => reference * stroke;

  return (
    <svg
      viewBox="0 0 400 300"
      preserveAspectRatio="xMidYMid slice"
      className={className}
      role="img"
      aria-hidden="true"
    >
      <rect width="400" height="300" fill={paper} />

      {/* Rivière */}
      <path
        d="M-10 262 C60 250 90 214 150 226 S250 268 320 244 S380 210 410 224"
        fill="none"
        stroke={accentSoft}
        strokeWidth={trait(14)}
        opacity="0.5"
        strokeLinecap="round"
      />

      {/* Îlots bâtis */}
      {ilots.map(([x, y, w, h], i) => (
        <rect key={i} x={x} y={y} width={w} height={h} rx="3" fill={accent} opacity="0.09" />
      ))}

      {/* Parc */}
      <path
        d="M176 96 C210 84 258 92 262 128 C266 160 224 176 194 168 C164 160 150 118 176 96 Z"
        fill={accent}
        opacity="0.14"
      />
      {[
        [196, 116],
        [226, 108],
        [242, 138],
        [206, 150],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r={3} fill={accent} opacity="0.35" />
      ))}

      {/* Rues secondaires */}
      {rues.map((d) => (
        <path key={d} d={d} fill="none" stroke={accent} strokeWidth={trait(1.2)} opacity="0.3" />
      ))}

      {/* Avenue principale */}
      <path
        d="M-10 148 C80 136 150 150 214 144 S330 118 410 130"
        fill="none"
        stroke={accent}
        strokeWidth={trait(5)}
        opacity="0.55"
        strokeLinecap="round"
      />

      {/* Itinéraire pointillé jusqu'au repère */}
      <path
        d="M14 286 C60 262 120 246 158 214 S196 160 200 150"
        fill="none"
        stroke={accent}
        strokeWidth={trait(1.8)}
        strokeDasharray={`${trait(5)} ${trait(6)}`}
        strokeLinecap="round"
      />

      {/* Repère */}
      <circle
        cx="200"
        cy="150"
        r="28"
        fill="none"
        stroke={accent}
        strokeWidth={trait(1)}
        strokeDasharray={`${trait(3)} ${trait(4)}`}
        opacity="0.6"
      />
      <ellipse cx="200" cy="152" rx="10" ry="3.5" fill={accent} opacity="0.25" />
      <path
        d="M200 150 C190 136 186 130 186 122 a14 14 0 0 1 28 0 c0 8 -4 14 -14 28 Z"
        fill={accent}
      />
      <circle cx="200" cy="122" r="5" fill={paper} />

      {/* Rose des vents */}
      <g transform="translate(360 46)">
        <circle r="17" fill={paper} stroke={accent} strokeWidth={trait(1)} opacity="0.9" />
        <path d="M0 -13 L4 -2 L0 2 L-4 -2 Z" fill={accent} />
        <path d="M0 13 L4 2 L0 -2 L-4 2 Z" fill={accent} opacity="0.35" />
        <text
          y="-18"
          textAnchor="middle"
          fontSize="11"
          fontFamily="var(--ofp-body)"
          letterSpacing="1"
          fill={accent}
        >
          N
        </text>
      </g>
    </svg>
  );
}
