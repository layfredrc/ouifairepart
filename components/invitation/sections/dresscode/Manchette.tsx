"use client";

import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import type { SectionVariantProps } from "@/components/invitation/engine/variantTable";
import type { TypeScale } from "@/lib/types";

/**
 * Registre de titre, absent des quatre rôles de `theme.type()` : la
 * consigne se compose comme une manchette, plus grande que la citation,
 * et suit tout de même l'échelle du thème.
 */
const titreParEchelle: Record<TypeScale, { full: string; phone: string }> = {
  compacte: { full: "text-2xl md:text-4xl", phone: "text-sm" },
  normale: { full: "text-3xl md:text-5xl", phone: "text-base" },
  ample: { full: "text-4xl md:text-6xl", phone: "text-lg" },
};

/**
 * La manchette de magazine.
 *
 * Composition ouverte et asymétrique : deux filets pleine largeur, une
 * marge étroite qui porte l'intitulé — à la verticale dès qu'un écran
 * large le permet — et la consigne au fer, en grand, sur la colonne
 * restante. Rien n'est centré, rien n'est refermé : c'est le contraire
 * du carton.
 */
export function Manchette({ options }: SectionVariantProps<"dresscode", "manchette">) {
  const { draft, theme } = useSection();
  const { ink, accent } = theme.palette;
  const { full } = theme;
  const intitule = options.intitule ?? "Dress code";
  const droite = options.marge === "droite";
  const filets = options.filets ?? true;
  const trait = theme.stroke(1);
  const titre = titreParEchelle[theme.tokens.typography.scale][full ? "full" : "phone"];

  const rangee = full
    ? `md:flex-row ${droite ? "md:flex-row-reverse" : ""} gap-5 py-8 md:gap-10 md:py-10`
    : "gap-2.5 py-4";
  const margeVerticale = full ? "md:self-start md:[writing-mode:vertical-rl] md:rotate-180" : "";

  return (
    <SectionRoot className={`${theme.gutter} ${theme.space("normal")}`}>
      <div className={`mx-auto ${full ? "max-w-3xl" : ""}`}>
        <div
          style={
            filets
              ? { borderTop: `${trait}px solid ${accent}`, borderBottom: `${trait}px solid ${accent}` }
              : undefined
          }
        >
          <div className={`flex flex-col ${droite ? "items-end" : "items-start"} ${rangee}`}>
            <span
              className={`ofp-body shrink-0 uppercase tracking-[0.3em] ${full ? "text-[0.65rem]" : "text-[0.5rem]"} ${margeVerticale}`}
              style={{ color: accent }}
            >
              {intitule}
            </span>
            <p
              className={`ofp-display ${theme.displayStyleClass} ${titre} min-w-0 flex-1 text-pretty leading-tight ${droite ? "text-right" : "text-left"}`}
              style={{ color: ink }}
            >
              {draft.dressCode}
            </p>
          </div>
        </div>
      </div>
    </SectionRoot>
  );
}
