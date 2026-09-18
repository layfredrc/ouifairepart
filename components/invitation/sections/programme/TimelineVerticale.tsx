"use client";

import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import { Intitule } from "@/components/invitation/sections/shared/Intitule";
import { formatHeureFr } from "@/lib/format";
import { COLONNE, ETIQUETTE } from "@/lib/theme/tokens";

/**
 * Programme en fil vertical : un filet porteur, un losange par étape,
 * l'heure en petites capitales et l'intitulé en corps de titrage. La
 * colonne est fer à gauche sous un titre courant : une liste éditoriale,
 * pas une timeline d'application.
 */
export function TimelineVerticale() {
  const { draft, theme } = useSection();
  const { accent, ink } = theme.palette;

  return (
    <SectionRoot className={`${theme.gutter} ${theme.space("normal")}`}>
      <div className={COLONNE}>
        <Intitule>Programme</Intitule>
        <ol
          className="ml-[3px] mt-[clamp(1.75rem,6cqi,3rem)] border-l"
          style={{ borderColor: theme.derives.lineStrong }}
        >
          {draft.programme.map((step, index) => (
            <li
              key={step.id}
              className={`relative pl-[clamp(1.5rem,6cqi,2.5rem)] ${
                index < draft.programme.length - 1 ? "pb-[clamp(1.5rem,5cqi,2.5rem)]" : ""
              }`}
            >
              <span
                aria-hidden="true"
                className="absolute -left-[4.5px] top-[0.4em] block h-2 w-2 rotate-45"
                style={{ background: accent }}
              />
              <p className={ETIQUETTE} style={{ color: theme.encre("doux") }}>
                {formatHeureFr(step.heure)}
              </p>
              <p className={`ofp-display ${theme.type("intitule")} mt-1`} style={{ color: ink }}>
                {step.label}
              </p>
              {step.lieu && (
                <p className="mt-1 text-[0.9375rem]" style={{ color: theme.encre("doux") }}>
                  {step.lieu}
                </p>
              )}
            </li>
          ))}
        </ol>
      </div>
    </SectionRoot>
  );
}
