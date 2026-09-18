"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { PersonalizedPreview } from "@/components/ui/PersonalizedPreview";
import { designs } from "@/lib/data/designs";
import { useCoupleStore } from "@/lib/store/useCoupleStore";

const showcaseIds = [
  "jardin-secret-sauge",
  "riviera-azur",
  "nuit-doree-bordeaux",
  "lumiere-automne-terracotta",
];

export function HeroShowcase() {
  const [index, setIndex] = useState(0);
  const { setPrenoms } = useCoupleStore();

  useEffect(() => {
    // Pré-remplit une démonstration si le champ est encore vide.
    setPrenoms("Camille", "Antoine");
    const interval = setInterval(() => {
      setIndex((i) => (i + 1) % showcaseIds.length);
    }, 3200);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const design = designs.find((d) => d.id === showcaseIds[index])!;

  return (
    <div className="relative flex justify-center">
      <div className="absolute -inset-10 -z-10 rounded-[3rem] bg-gradient-to-br from-paper-deep to-paper" />
      <AnimatePresence mode="wait">
        <motion.div
          key={design.id}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <PersonalizedPreview design={design} date="Samedi 12 septembre 2026" compact={false} />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
