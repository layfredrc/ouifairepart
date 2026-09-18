"use client";

import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import type { SectionVariantProps } from "@/components/invitation/engine/variantTable";
import { Intitule } from "@/components/invitation/sections/shared/Intitule";
import { LiensItineraires } from "@/components/invitation/sections/shared/LiensItineraires";
import { COLONNE, ETIQUETTE } from "@/lib/theme/tokens";

/**
 * Lieu centré : le nom du lieu en corps de titrage, la ville en petites
 * capitales, les itinéraires en mots soulignés. La tenue, si elle est
 * saisie, vient après un filet, avec son propre intitulé.
 */
export function CentreSimple({ options }: SectionVariantProps<"lieu", "centre-simple">) {
  const { draft, theme } = useSection();
  const { ink } = theme.palette;

  return (
    <SectionRoot className={`${theme.gutter} ${theme.space("normal")}`}>
      <div className={`${COLONNE} text-center`}>
        <Intitule alignement="centre">Lieu</Intitule>
        <p
          className={`ofp-display ${theme.type("lieu")} mt-[clamp(1.25rem,5cqi,2.25rem)] text-balance`}
          style={{ color: ink }}
        >
          {draft.lieu || "Lieu à confirmer"}
        </p>
        {draft.ville && (
          <p className={`${ETIQUETTE} mt-3`} style={{ color: theme.encre("doux") }}>
            {draft.ville}
          </p>
        )}
        <LiensItineraires liens={options.itineraires} className="mt-[clamp(1.25rem,5cqi,2rem)]" />

        {draft.dressCode && (
          <div
            className="mt-[clamp(2rem,8cqi,3.5rem)] border-t pt-[clamp(1.25rem,5cqi,2rem)]"
            style={{ borderColor: theme.derives.line }}
          >
            <p className={ETIQUETTE} style={{ color: theme.accentue("fort") }}>
              Tenue
            </p>
            <p
              className={`ofp-display ${theme.displayStyleClass} mt-2 text-[1.25rem] leading-snug text-balance`}
              style={{ color: ink }}
            >
              {draft.dressCode}
            </p>
          </div>
        )}
      </div>
    </SectionRoot>
  );
}
