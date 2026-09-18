"use client";

import { DecorCanvas } from "@/components/invitation/decor/DecorCanvas";
import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import { formatDateFr } from "@/lib/format";
import { ETIQUETTE } from "@/lib/theme/tokens";

/**
 * Couverture plein cadre : le décor occupe toute la hauteur du cadre, les
 * prénoms se lisent au centre en très grand corps d'encre, l'esperluette
 * en accent. Date et ville tiennent le pied, aux deux marges, sous un
 * filet : c'est la typographie qui compose, l'ornement ne fait qu'habiller.
 */
export function PleinCadreCentre() {
  const { draft, template, theme } = useSection();
  const { accent, ink } = theme.palette;

  const nom1 = draft.prenom1 || "Prénom";
  const nom2 = draft.prenom2 || "Prénom";
  const date = draft.dateMariage ? formatDateFr(draft.dateMariage) : "";
  const ville = draft.ville.trim();
  const filet = { background: theme.derives.lineStrong };

  return (
    <SectionRoot
      className={`relative flex flex-col overflow-hidden ${theme.full ? "min-h-svh" : "h-full"}`}
    >
      <DecorCanvas
        decor={template.decor}
        palette={theme.palette}
        stroke={theme.tokens.stroke}
        className="absolute inset-0 h-full w-full"
      />

      <div className={`relative flex flex-1 flex-col items-center justify-center text-center ${theme.gutter} py-[clamp(3rem,10cqi,6rem)]`}>
        <p
          className={`${ETIQUETTE} flex items-center gap-4`}
          style={{ color: theme.encre("doux") }}
        >
          <span aria-hidden="true" className="h-px w-[clamp(1.25rem,6cqi,2.5rem)]" style={filet} />
          Le mariage de
          <span aria-hidden="true" className="h-px w-[clamp(1.25rem,6cqi,2.5rem)]" style={filet} />
        </p>

        <h1
          className={`ofp-display ${theme.displayStyleClass} ${theme.type("prenoms")} mt-[clamp(1.25rem,5cqi,2.5rem)] max-w-full break-words`}
          style={{ color: ink }}
        >
          {nom1}
          <span
            aria-hidden="true"
            className="block py-[0.12em] text-[0.42em] not-italic leading-none"
            style={{ color: accent }}
          >
            &amp;
          </span>
          <span className="sr-only"> et </span>
          {nom2}
        </h1>
      </div>

      {(date || ville) && (
        <div
          className={`relative mx-[clamp(1.25rem,6cqi,3rem)] flex flex-col items-center gap-2 border-t pt-4 pb-[clamp(3rem,8cqi,4rem)] text-center @sm:flex-row @sm:items-baseline @sm:justify-between @sm:gap-6 @sm:text-left ${ETIQUETTE}`}
          style={{ borderColor: theme.derives.lineStrong, color: theme.encre("doux") }}
        >
          <span>{date}</span>
          <span className="@sm:text-right">{ville}</span>
        </div>
      )}
    </SectionRoot>
  );
}
