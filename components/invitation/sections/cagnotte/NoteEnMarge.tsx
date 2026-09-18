"use client";

import { useState } from "react";
import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";

const LIEN_CAGNOTTE = "https://ouifairepart.fr/cagnotte/demo";
const LIEN_AFFICHE = "ouifairepart.fr/cagnotte/demo";

/**
 * La cagnotte en note de marge.
 *
 * `bloc-centre` fait de la cagnotte un moment : centré, un bouton, un
 * appel. Cette variante en fait une mention : un intitulé dans la marge
 * de gauche, un texte au fil aligné à gauche, l'adresse écrite en toutes
 * lettres — lisible, copiable, mais jamais mise en avant — et la
 * signature des mariés. C'est le registre discret que réclament les
 * couples pour qui parler d'argent sur un faire-part doit rester une
 * note en bas de lettre, pas une étape du parcours.
 */
export function NoteEnMarge() {
  const { draft, theme } = useSection();
  const { accent, ink } = theme.palette;
  const { full } = theme;
  const [copied, setCopied] = useState(false);

  const nom1 = draft.prenom1 || "Prénom";
  const nom2 = draft.prenom2 || "Prénom";

  return (
    <SectionRoot className={`${theme.gutter} ${theme.space("normal")}`}>
      <div
        className={`mx-auto border-l pl-5 text-left ${
          full ? "max-w-2xl md:grid md:grid-cols-[10rem_1fr] md:gap-x-10 md:border-l-0 md:pl-0" : "max-w-[16rem]"
        }`}
        style={{ borderColor: accent }}
      >
        <div className={full ? "md:border-l md:pl-5" : ""} style={{ borderColor: accent }}>
          <p
            className={`ofp-body uppercase tracking-[0.3em] ${full ? "text-[0.65rem]" : "text-[0.5rem]"}`}
            style={{ color: accent }}
          >
            Cagnotte
          </p>
        </div>

        <div className={`${full ? "mt-3 text-sm md:mt-0" : "mt-2 text-[0.6rem]"}`} style={{ color: ink }}>
          <p style={{ opacity: 0.8 }}>
            Votre présence est notre plus beau cadeau. Si vous souhaitez toutefois
            participer à notre voyage de noces, une cagnotte est ouverte à cette adresse&nbsp;:
          </p>

          <p className={`ofp-display ${theme.displayStyleClass} mt-4 ${full ? "text-lg" : "text-xs"}`}>
            {LIEN_AFFICHE}
            <button
              type="button"
              onClick={() => {
                if (!full) return;
                navigator.clipboard?.writeText(LIEN_CAGNOTTE).catch(() => {});
                setCopied(true);
                setTimeout(() => setCopied(false), 2000);
              }}
              className={`ofp-body ml-3 align-middle not-italic normal-case tracking-normal underline underline-offset-4 ${
                full ? "text-xs" : "text-[0.55rem]"
              }`}
              style={{ color: ink }}
            >
              {copied ? "copié ✓" : "copier"}
            </button>
          </p>

          <p className={`mt-6 ${full ? "text-sm" : "text-[0.6rem]"}`} style={{ opacity: 0.8 }}>
            — {nom1} &amp; {nom2}
          </p>
        </div>
      </div>
    </SectionRoot>
  );
}
