"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { CoverArt } from "@/components/ui/CoverArt";
import type { DesignVariant, OpeningStyle } from "@/lib/types";
import type { Collection } from "@/lib/types";

interface OpeningGateProps {
  design: DesignVariant;
  collection: Collection;
  prenom1: string;
  prenom2: string;
  style: OpeningStyle;
  onOpen: () => void;
}

export function OpeningGate({ design, collection, prenom1, prenom2, style, onOpen }: OpeningGateProps) {
  const [opening, setOpening] = useState(false);
  const { accent, ink, paper } = design.palette;

  const handleClick = () => {
    setOpening(true);
    setTimeout(onOpen, 700);
  };

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        {style === "rideau" ? (
          <>
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2"
              animate={opening ? { x: "-100%" } : { x: 0 }}
              transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            >
              <CoverArt motif={collection.motif} palette={design.palette} className="h-full w-full" />
            </motion.div>
            <motion.div
              className="absolute inset-y-0 right-0 w-1/2"
              animate={opening ? { x: "100%" } : { x: 0 }}
              transition={{ duration: 0.7, ease: [0.65, 0, 0.35, 1] }}
            >
              <CoverArt motif={collection.motif} palette={design.palette} className="h-full w-full" />
            </motion.div>
          </>
        ) : (
          <motion.div
            className="absolute inset-0"
            animate={opening ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <CoverArt motif={collection.motif} palette={design.palette} className="h-full w-full" />
          </motion.div>
        )}

        <motion.button
          onClick={handleClick}
          animate={opening ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="relative z-10 flex h-32 w-32 flex-col items-center justify-center gap-1 rounded-full text-center shadow-lg"
          style={{ background: paper, border: `1px solid ${accent}66` }}
        >
          <span className="font-display text-sm italic" style={{ color: accent }}>
            {prenom1 || "Prénom"} &amp; {prenom2 || "Prénom"}
          </span>
          <span className="mt-1 text-[0.6rem] uppercase tracking-[0.2em]" style={{ color: ink, opacity: 0.6 }}>
            Ouvrir
          </span>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
