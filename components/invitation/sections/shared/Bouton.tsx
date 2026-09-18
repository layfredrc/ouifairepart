"use client";

import type { ButtonHTMLAttributes } from "react";
import { useSection } from "@/components/invitation/engine/SectionScope";
import { ETIQUETTE } from "@/lib/theme/tokens";

interface BoutonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  /** `plein` : bloc d'encre. `contour` : filet d'encre, fond papier. */
  variante?: "plein" | "contour";
  /** Prend toute la largeur de sa colonne. */
  large?: boolean;
}

/**
 * Le bouton de la charte : un rectangle, des petites capitales, aucune
 * pastille ni ombre. Le rayon vient du thème, jamais du composant.
 */
export function Bouton({
  variante = "plein",
  large = false,
  className = "",
  children,
  ...props
}: BoutonProps) {
  const { theme } = useSection();
  const plein = variante === "plein";

  return (
    <button
      {...props}
      className={`${ETIQUETTE} inline-flex items-center justify-center gap-3 px-6 py-3.5 text-center transition-colors duration-200 ${
        theme.radius.champ
      } ${large ? "w-full" : ""} ${
        plein
          ? "bg-(--ofp-ink) text-(--ofp-paper) hover:bg-(--ofp-accent)"
          : "border border-(--ofp-ink) bg-transparent text-(--ofp-ink) hover:border-(--ofp-accent) hover:text-(--ofp-accent)"
      } disabled:pointer-events-none ${className}`}
    >
      {children}
    </button>
  );
}
