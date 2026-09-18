"use client";

import type { ReactNode } from "react";
import { useSection } from "@/components/invitation/engine/SectionScope";
import { ETIQUETTE } from "@/lib/theme/tokens";

interface IntituleProps {
  children: ReactNode;
  /**
   * `gauche` : titre courant, le filet court jusqu'au bord de la colonne.
   * `centre` : encadré de deux filets courts, pour une composition symétrique.
   */
  alignement?: "gauche" | "centre";
  /** Numéro en chiffres romains ou arabes, posé en italique de titrage. */
  numero?: string;
  className?: string;
}

/**
 * L'unique niveau d'intitulé de la charte : petites capitales espacées,
 * toujours accompagnées d'un filet. Jamais un mot seul flottant au-dessus
 * d'un bloc centré.
 */
export function Intitule({ children, alignement = "gauche", numero, className = "" }: IntituleProps) {
  const { theme } = useSection();
  const couleur = theme.accentue("fort");
  const filet = { background: theme.derives.lineStrong };

  const chiffre = numero && (
    <span className="ofp-display text-[1.05rem] normal-case italic tracking-normal" aria-hidden="true">
      {numero}
    </span>
  );

  if (alignement === "centre") {
    return (
      <p className={`${ETIQUETTE} flex items-center justify-center gap-4 ${className}`} style={{ color: couleur }}>
        <span aria-hidden="true" className="h-px w-[clamp(1.25rem,6cqi,2.5rem)]" style={filet} />
        {chiffre}
        <span>{children}</span>
        <span aria-hidden="true" className="h-px w-[clamp(1.25rem,6cqi,2.5rem)]" style={filet} />
      </p>
    );
  }

  return (
    <p className={`${ETIQUETTE} flex items-center gap-4 ${className}`} style={{ color: couleur }}>
      {chiffre}
      <span className="shrink-0">{children}</span>
      <span aria-hidden="true" className="h-px flex-1" style={{ background: theme.derives.line }} />
    </p>
  );
}
