"use client";

import { DecorCanvas } from "@/components/invitation/decor/DecorCanvas";
import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import type { SectionVariantProps } from "@/components/invitation/engine/variantTable";
import { formatDateFr } from "@/lib/format";

/**
 * Couverture en médaillon : le décor couvre toute la section, et les
 * prénoms se lisent dans un cartouche à fond papier, encadré d'un filet
 * (double par défaut). L'intitulé chevauche le filet du haut, la date
 * celui du bas, comme les cartels gravés : c'est ce chevauchement, et le
 * fond opaque du cartouche, qui garantissent la lecture sur le décor.
 */
export function Medaillon({
  options,
}: SectionVariantProps<"couverture", "medaillon">) {
  const { draft, template, theme } = useSection();
  const { accent, ink, paper } = theme.palette;
  const { full } = theme;
  const double = options.bordure !== "simple";

  const nom1 = draft.prenom1 || "Prénom";
  const nom2 = draft.prenom2 || "Prénom";
  const date = draft.dateMariage ? formatDateFr(draft.dateMariage) : "";
  const ville = draft.ville.trim();
  const prenomClass = `ofp-display ${theme.displayStyleClass} leading-none ${theme.type("prenoms")}`;
  const etiquetteClass = `ofp-body absolute left-1/2 -translate-x-1/2 whitespace-nowrap uppercase tracking-[0.3em] ${
    full ? "px-3 text-xs" : "px-2 text-[0.5rem]"
  }`;

  return (
    <SectionRoot
      className={`relative flex items-center justify-center ${theme.gutter} ${
        full ? "min-h-[92vh] py-16" : "h-[70%] py-6"
      }`}
    >
      <DecorCanvas
        decor={template.decor}
        palette={theme.palette}
        stroke={theme.tokens.stroke}
        className="absolute inset-0 h-full w-full"
      />

      <div
        className={`relative w-full border text-center ${full ? "max-w-md" : "max-w-[85%]"}`}
        style={{ background: paper, borderColor: accent }}
      >
        <span
          className={`${etiquetteClass} top-0 -translate-y-1/2`}
          style={{ background: paper, color: ink }}
        >
          Le mariage de
        </span>

        <div
          className={`flex flex-col items-center ${double ? "border" : ""} ${
            full
              ? double
                ? "m-2 px-6 py-12"
                : "px-6 py-14"
              : double
                ? "m-1 px-3 py-6"
                : "px-3 py-7"
          }`}
          style={{ borderColor: `${accent}66` }}
        >
          <p className={`${prenomClass} break-words`} style={{ color: accent }}>
            {nom1}
          </p>
          <p
            className={`ofp-display ${full ? "my-3 text-2xl" : "my-1 text-base"}`}
            style={{ color: ink, opacity: 0.75 }}
          >
            &amp;
          </p>
          <p className={`${prenomClass} break-words`} style={{ color: accent }}>
            {nom2}
          </p>

          {ville && (
            <>
              <span
                aria-hidden="true"
                className={`h-px ${full ? "mt-8 w-10" : "mt-4 w-6"}`}
                style={{ background: accent }}
              />
              <p
                className={`ofp-display ${theme.displayStyleClass} ${full ? "mt-4 text-lg" : "mt-2 text-xs"}`}
                style={{ color: ink, opacity: 0.75 }}
              >
                {ville}
              </p>
            </>
          )}
        </div>

        {date && (
          <span
            className={`${etiquetteClass} bottom-0 translate-y-1/2`}
            style={{ background: paper, color: ink }}
          >
            {date}
          </span>
        )}
      </div>
    </SectionRoot>
  );
}
