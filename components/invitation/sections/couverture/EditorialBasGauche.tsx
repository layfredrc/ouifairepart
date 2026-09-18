"use client";

import { DecorCanvas } from "@/components/invitation/decor/DecorCanvas";
import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import type { SectionVariantProps } from "@/components/invitation/engine/variantTable";
import { formatDateFr } from "@/lib/format";

/** Tuiles de la frise : impair pour centrer une tuile entière, assez pour couvrir 1440 px. */
const TUILES_FRISE = 9;

/**
 * Couverture éditoriale : le décor occupe le haut, pleine largeur ; les
 * prénoms se posent en bas à gauche, fer à gauche, sous un filet qui
 * court sur toute la largeur. Le pied aligne date et ville aux deux
 * marges, comme un colophon.
 */
export function EditorialBasGauche({
  options,
}: SectionVariantProps<"couverture", "editorial-bas-gauche">) {
  const { draft, template, theme } = useSection();
  const { accent } = theme.palette;
  const { full } = theme;
  const partDecor = options.partDecor ?? "moitie";

  const nom1 = draft.prenom1 || "Prénom";
  const nom2 = draft.prenom2 || "Prénom";
  const date = draft.dateMariage ? formatDateFr(draft.dateMariage) : "";
  const ville = draft.ville.trim();
  const prenomClass = `ofp-display ${theme.displayStyleClass} leading-[0.95] ${theme.type("prenoms")}`;

  const hauteurDecor = full
    ? partDecor === "deux-tiers"
      ? "h-[58vh] min-h-[340px]"
      : "h-[46vh] min-h-[280px]"
    : partDecor === "deux-tiers"
      ? "h-[48%]"
      : "h-[38%]";

  return (
    <SectionRoot
      className={`relative flex flex-col ${full ? "min-h-[92vh]" : "h-[70%]"}`}
    >
      {/* Bande de décor : une frise de motifs entiers, centrée sur une
          tuile. Un motif unique découpé en tranche dans une bande courte
          n'en montrerait que les flancs. */}
      <div className={`relative w-full shrink-0 overflow-hidden ${hauteurDecor}`}>
        <div className="absolute inset-0 flex justify-center">
          {Array.from({ length: TUILES_FRISE }).map((_, i) => (
            <DecorCanvas
              key={i}
              decor={template.decor}
              palette={theme.palette}
              stroke={theme.tokens.stroke}
              className="h-full shrink-0 aspect-[4/7]"
            />
          ))}
        </div>
      </div>

      <div
        className={`relative flex flex-1 flex-col justify-end ${theme.gutter} ${
          full ? "pb-10 pt-8" : "pb-4 pt-3"
        }`}
      >
        <p
          className={`ofp-body flex items-center gap-3 uppercase tracking-[0.35em] ${
            full ? "text-xs" : "text-[0.55rem]"
          }`}
          style={{ color: theme.encre("discret") }}
        >
          <span
            aria-hidden="true"
            className={`inline-block h-px ${full ? "w-8" : "w-4"}`}
            style={{ background: accent }}
          />
          Le mariage de
        </p>

        <div
          className={`mt-3 border-t ${full ? "pt-5" : "pt-2"}`}
          style={{ borderColor: `${accent}66` }}
        >
          <p className={prenomClass} style={{ color: accent }}>
            {nom1}
          </p>
          <p
            className={`ofp-display ${full ? "my-1 text-2xl" : "text-base"}`}
            style={{ color: theme.encre("discret") }}
          >
            &amp;
          </p>
          <p className={prenomClass} style={{ color: accent }}>
            {nom2}
          </p>
        </div>

        {(date || ville) && (
          <div
            className={`ofp-body flex items-baseline justify-between gap-4 border-t uppercase tracking-[0.25em] ${
              full ? "mt-8 pt-4 text-xs" : "mt-3 pt-2 text-[0.5rem]"
            }`}
            style={{ borderColor: `${accent}66`, color: theme.encre("doux") }}
          >
            <span>{date}</span>
            <span className="text-right">{ville}</span>
          </div>
        )}
      </div>
    </SectionRoot>
  );
}
