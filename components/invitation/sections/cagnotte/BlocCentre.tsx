"use client";

import { useState } from "react";
import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import { SectionLabel } from "@/components/invitation/sections/shared/SectionLabel";

const LIEN_CAGNOTTE = "https://ouifairepart.fr/cagnotte/demo";

export function BlocCentre() {
  const { theme } = useSection();
  const { accent, ink } = theme.palette;
  const { full } = theme;
  const [copied, setCopied] = useState(false);

  return (
    <SectionRoot className={`text-center ${theme.gutter} ${theme.space("normal")}`}>
      <SectionLabel>Cagnotte de mariage</SectionLabel>
      <p
        className={`mx-auto mt-3 max-w-sm ${full ? "text-sm" : "text-[0.6rem]"}`}
        style={{ color: theme.encre("doux") }}
      >
        Votre présence est le plus beau des cadeaux. Pour celles et ceux qui le
        souhaitent, une cagnotte est ouverte pour notre voyage de noces.
      </p>
      <button
        onClick={() => {
          if (!full) return;
          navigator.clipboard?.writeText(LIEN_CAGNOTTE).catch(() => {});
          setCopied(true);
          setTimeout(() => setCopied(false), 2000);
        }}
        className={`mt-5 ${theme.radius.pastille} border px-6 py-2.5 ${full ? "text-sm" : "text-[0.6rem]"}`}
        style={{ borderColor: accent, color: ink }}
      >
        {copied ? "Lien copié ✓" : "Copier le lien de la cagnotte"}
      </button>
    </SectionRoot>
  );
}
