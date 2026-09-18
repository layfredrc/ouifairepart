"use client";

import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import { formatDateFr } from "@/lib/format";
import { COLONNE, ETIQUETTE } from "@/lib/theme/tokens";

/**
 * La signature referme l'invitation comme la couverture l'a ouverte : un
 * filet, les prénoms en titrage, la date et la ville en petites capitales,
 * et une ligne pour dire qu'on répond aux questions.
 */
export function SignatureCentree() {
  const { draft, theme } = useSection();
  const { accent, ink } = theme.palette;
  const nom1 = draft.prenom1 || "Prénom";
  const nom2 = draft.prenom2 || "Prénom";
  const date = draft.dateMariage ? formatDateFr(draft.dateMariage) : "";
  const ville = draft.ville.trim();
  const repere = [date, ville].filter(Boolean).join("  ·  ");

  return (
    <SectionRoot className={`${theme.gutter} ${theme.space("pied")}`}>
      <div
        className={`${COLONNE} border-t pt-[clamp(2rem,7cqi,3rem)] text-center`}
        style={{ borderColor: theme.derives.lineStrong }}
      >
        <p
          className={`ofp-display ${theme.displayStyleClass} ${theme.type("lieu")} text-balance`}
          style={{ color: ink }}
        >
          {nom1}
          <span aria-hidden="true" className="px-[0.3em]" style={{ color: accent }}>
            &amp;
          </span>
          <span className="sr-only">et </span>
          {nom2}
        </p>
        {repere && (
          <p className={`${ETIQUETTE} mt-3 whitespace-pre`} style={{ color: theme.encre("doux") }}>
            {repere}
          </p>
        )}
        <p
          className="mx-auto mt-[clamp(1.25rem,5cqi,2rem)] max-w-[26rem] text-[0.9375rem] leading-[1.6]"
          style={{ color: theme.encre("doux") }}
        >
          Une question&nbsp;? Nous y répondons avec plaisir avant le grand jour.
        </p>
      </div>
    </SectionRoot>
  );
}
