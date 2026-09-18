"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DecorCanvas } from "@/components/invitation/decor/DecorCanvas";
import { themeFontVars } from "@/lib/theme/tokens";
import type { OpeningSpec, TemplateDefinition } from "@/lib/types";

interface OpeningGateProps {
  template: TemplateDefinition;
  opening: OpeningSpec;
  prenom1: string;
  prenom2: string;
  onOpen: () => void;
}

export function OpeningGate({
  template,
  opening,
  prenom1,
  prenom2,
  onOpen,
}: OpeningGateProps) {
  const [ouverture, setOuverture] = useState(false);
  const { palette, stroke } = template.theme;
  const { accent, ink, paper } = palette;
  const duree = opening.duree / 1000;

  const handleClick = () => {
    setOuverture(true);
    setTimeout(onOpen, opening.duree);
  };

  const decor = (
    <DecorCanvas
      decor={template.decor}
      palette={palette}
      stroke={stroke}
      className="h-full w-full"
    />
  );

  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-40 flex items-center justify-center overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={themeFontVars(template.theme)}
      >
        {opening.style === "rideau" ? (
          <>
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2"
              animate={ouverture ? { x: "-100%" } : { x: 0 }}
              transition={{ duration: duree, ease: [0.65, 0, 0.35, 1] }}
            >
              {decor}
            </motion.div>
            <motion.div
              className="absolute inset-y-0 right-0 w-1/2"
              animate={ouverture ? { x: "100%" } : { x: 0 }}
              transition={{ duration: duree, ease: [0.65, 0, 0.35, 1] }}
            >
              {decor}
            </motion.div>
          </>
        ) : (
          <motion.div
            className="absolute inset-0"
            animate={ouverture ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            {decor}
          </motion.div>
        )}

        <motion.button
          onClick={handleClick}
          animate={ouverture ? { opacity: 0, scale: 0.9 } : { opacity: 1, scale: 1 }}
          transition={{ duration: 0.35 }}
          className="relative z-10 flex h-32 w-32 flex-col items-center justify-center gap-1 rounded-full text-center shadow-lg"
          style={{ background: paper, border: `1px solid ${accent}66` }}
        >
          <span className="ofp-display text-sm italic" style={{ color: accent }}>
            {prenom1 || "Prénom"} &amp; {prenom2 || "Prénom"}
          </span>
          <span
            className="mt-1 text-[0.6rem] uppercase tracking-[0.2em]"
            style={{ color: ink, opacity: 0.6 }}
          >
            Ouvrir
          </span>
        </motion.button>
      </motion.div>
    </AnimatePresence>
  );
}
