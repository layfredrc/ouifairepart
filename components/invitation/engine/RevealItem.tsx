"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";
import { useSection } from "@/components/invitation/engine/SectionScope";
import { revealItemVariants } from "@/lib/motion/reveal";

/**
 * Enfant orchestré par une section en révélation `cascade`. Sous les
 * autres révélations — ou sans mouvement — il ne laisse qu'un `div`.
 */
export function RevealItem({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { reveal, intensity } = useSection();

  if (!reveal) {
    return <div className={className}>{children}</div>;
  }

  return (
    <motion.div className={className} variants={revealItemVariants(intensity)}>
      {children}
    </motion.div>
  );
}
