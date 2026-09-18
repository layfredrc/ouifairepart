"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useSection } from "@/components/invitation/engine/SectionScope";

/**
 * Racine commune à toutes les variantes. Le moteur y applique l'ancre et
 * la révélation déclarée : aucune variante ne pilote son propre mouvement.
 */
export function SectionRoot({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { anchorId, reveal } = useSection();

  if (!reveal) {
    return (
      <section id={anchorId} className={className}>
        {children}
      </section>
    );
  }

  return (
    <motion.section id={anchorId} className={className} {...reveal}>
      {children}
    </motion.section>
  );
}
