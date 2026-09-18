"use client";

import { useSection } from "@/components/invitation/engine/SectionScope";

export const ITINERAIRES_PAR_DEFAUT = ["Google Maps", "Apple Plans", "Waze"] as const;

interface LiensItinerairesProps {
  liens?: readonly string[];
  alignement?: "gauche" | "centre";
  className?: string;
}

/**
 * Les liens d'itinéraire en texte courant, séparés d'un point médian et
 * soulignés d'un filet. Aucune pastille : ce sont des mots, pas des
 * boutons d'application.
 */
export function LiensItineraires({
  liens = ITINERAIRES_PAR_DEFAUT,
  alignement = "centre",
  className = "",
}: LiensItinerairesProps) {
  const { theme } = useSection();

  return (
    <p
      className={`ofp-body flex flex-wrap items-baseline gap-x-3 gap-y-1 text-[0.9375rem] ${
        alignement === "centre" ? "justify-center" : ""
      } ${className}`}
      style={{ color: theme.palette.ink }}
    >
      {liens.map((label, index) => (
        <span key={label} className="flex items-baseline gap-x-3">
          {index > 0 && (
            <span aria-hidden="true" style={{ color: theme.palette.accent }}>
              ·
            </span>
          )}
          <a
            href="#"
            onClick={(e) => e.preventDefault()}
            className="underline decoration-1 underline-offset-[5px] transition-colors hover:text-(--ofp-accent)"
            style={{ textDecorationColor: theme.derives.lineStrong }}
          >
            {label}
          </a>
        </span>
      ))}
    </p>
  );
}
