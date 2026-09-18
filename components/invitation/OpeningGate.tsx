"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { DecorCanvas } from "@/components/invitation/decor/DecorCanvas";
import { deriverPalette } from "@/lib/theme/palette";
import { ETIQUETTE, themeCssVars } from "@/lib/theme/tokens";
import type { OpeningSpec, TemplateDefinition } from "@/lib/types";

interface OpeningGateProps {
  template: TemplateDefinition;
  opening: OpeningSpec;
  prenom1: string;
  prenom2: string;
  onOpen: () => void;
}

/**
 * Le portail d'ouverture : le décor plein écran, les prénoms en titrage
 * et un seul geste, « Ouvrir l'invitation », en petites capitales
 * soulignées d'un filet. Aucun bouton rond, aucune ombre : le portail est
 * la première page du faire-part, pas un écran de chargement.
 */
export function OpeningGate({
  template,
  opening,
  prenom1,
  prenom2,
  onOpen,
}: OpeningGateProps) {
  const [ouverture, setOuverture] = useState(false);
  const { palette, stroke } = template.theme;
  const { accent, ink } = palette;
  const { lineStrong } = deriverPalette(palette);
  const duree = opening.duree / 1000;
  const italique = template.theme.typography.displayStyle === "italique";

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
        className="ofp-root fixed inset-0 z-40 flex items-center justify-center overflow-hidden"
        exit={{ opacity: 0 }}
        transition={{ duration: 0.4 }}
        style={themeCssVars(template.theme)}
      >
        {opening.style === "rideau" ? (
          <>
            <motion.div
              className="absolute inset-y-0 left-0 w-1/2 overflow-hidden"
              animate={ouverture ? { x: "-100%" } : { x: 0 }}
              transition={{ duration: duree, ease: [0.65, 0, 0.35, 1] }}
            >
              <div className="absolute inset-y-0 left-0 w-[200%]">{decor}</div>
            </motion.div>
            <motion.div
              className="absolute inset-y-0 right-0 w-1/2 overflow-hidden"
              animate={ouverture ? { x: "100%" } : { x: 0 }}
              transition={{ duration: duree, ease: [0.65, 0, 0.35, 1] }}
            >
              <div className="absolute inset-y-0 right-0 w-[200%]">{decor}</div>
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

        <motion.div
          animate={ouverture ? { opacity: 0, y: -8 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="relative z-10 flex flex-col items-center px-6 text-center"
        >
          <p className={`${ETIQUETTE} flex items-center gap-4`} style={{ color: ink }}>
            <span aria-hidden="true" className="h-px w-8" style={{ background: lineStrong }} />
            Le mariage de
            <span aria-hidden="true" className="h-px w-8" style={{ background: lineStrong }} />
          </p>
          <p
            className={`ofp-display mt-6 text-(length:--ofp-t-prenoms) leading-[0.92] ${italique ? "italic" : ""}`}
            style={{ color: ink }}
          >
            {prenom1 || "Prénom"}
            <span aria-hidden="true" className="block py-[0.12em] text-[0.42em] not-italic leading-none" style={{ color: accent }}>
              &amp;
            </span>
            {prenom2 || "Prénom"}
          </p>
          <button
            onClick={handleClick}
            className={`${ETIQUETTE} mt-12 border-b pb-1.5 transition-colors hover:text-(--ofp-accent)`}
            style={{ color: ink, borderColor: accent }}
          >
            Ouvrir l&rsquo;invitation
          </button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
