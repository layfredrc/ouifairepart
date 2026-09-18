"use client";

import type { ReactNode } from "react";
import { useSection } from "@/components/invitation/engine/SectionScope";

/**
 * Racine commune à toutes les variantes. Le moteur y pose l'ancre et
 * déclare la révélation dans le DOM (`data-reveal`) : aucune variante ne
 * pilote son propre mouvement, et aucune librairie n'est nécessaire pour
 * rendre la section. Le runtime, s'il charge, lit ces attributs.
 */
export function SectionRoot({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { anchorId, reveal, differee } = useSection();
  const classes = [className, differee ? "ofp-section-differee" : ""].filter(Boolean).join(" ");

  return (
    <section
      id={anchorId}
      className={classes || undefined}
      data-reveal={reveal?.kind}
      data-stagger={reveal?.stagger}
    >
      {children}
    </section>
  );
}
