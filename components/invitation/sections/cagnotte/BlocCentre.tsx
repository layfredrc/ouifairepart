"use client";

import { useState } from "react";
import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import { Bouton } from "@/components/invitation/sections/shared/Bouton";
import { Intitule } from "@/components/invitation/sections/shared/Intitule";
import { COLONNE } from "@/lib/theme/tokens";

const LIEN_CAGNOTTE = "https://ouifairepart.fr/cagnotte/demo";

/**
 * La cagnotte en bloc centré : une phrase de courtoisie en corps de texte
 * et un bouton en filet. Le registre est celui d'une mention discrète.
 */
export function BlocCentre() {
  const { theme } = useSection();
  const { full } = theme;
  const [copied, setCopied] = useState(false);

  return (
    <SectionRoot className={`${theme.gutter} ${theme.space("normal")}`}>
      <div className={`${COLONNE} text-center`}>
        <Intitule alignement="centre">Cagnotte</Intitule>
        <p
          className="mx-auto mt-[clamp(1.25rem,5cqi,2rem)] max-w-[28rem] text-[1.0625rem] leading-[1.6] text-pretty"
          style={{ color: theme.encre("fort") }}
        >
          Votre présence est le plus beau des cadeaux. Pour celles et ceux qui le
          souhaitent, une cagnotte est ouverte pour notre voyage de noces.
        </p>
        <Bouton
          variante="contour"
          className="mt-[clamp(1.5rem,6cqi,2.5rem)]"
          onClick={() => {
            if (!full) return;
            navigator.clipboard?.writeText(LIEN_CAGNOTTE).catch(() => {});
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        >
          {copied ? "Lien copié" : "Copier le lien de la cagnotte"}
        </Bouton>
      </div>
    </SectionRoot>
  );
}
