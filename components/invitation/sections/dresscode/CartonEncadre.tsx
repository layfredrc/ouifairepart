"use client";

import { DecorCanvas } from "@/components/invitation/decor/DecorCanvas";
import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import type { SectionVariantProps } from "@/components/invitation/engine/variantTable";
import { SectionLabel } from "@/components/invitation/sections/shared/SectionLabel";

/**
 * Le carton glissé dans l'enveloppe.
 *
 * Composition fermée et symétrique : un petit cadre double, centré et
 * étroit, qui ne s'élargit pas avec l'écran. L'intitulé, un filet à
 * losange et la consigne se lisent dedans, à la verticale. Le carton est
 * opaque : posé sur le décor, le texte reste toujours sur le papier.
 */
export function CartonEncadre({
  options,
}: SectionVariantProps<"dresscode", "carton-encadre">) {
  const { draft, template, theme } = useSection();
  const { paper, ink, accent } = theme.palette;
  const { full } = theme;
  const intitule = options.intitule ?? "Tenue";
  const surDecor = options.fond === "decor";
  const trait = theme.stroke(1);

  return (
    <SectionRoot
      className={`relative ${theme.gutter} ${surDecor ? theme.space("ample") : theme.space("normal")}`}
    >
      {surDecor && (
        <DecorCanvas
          decor={template.decor}
          palette={theme.palette}
          stroke={theme.tokens.stroke}
          className="absolute inset-0 h-full w-full"
        />
      )}
      <div className={`relative mx-auto ${full ? "max-w-xs" : "max-w-[13.5rem]"}`}>
        <div
          className={`${theme.radius.carte} ${full ? "p-1.5" : "p-1"}`}
          style={{
            background: paper,
            border: `${trait}px solid ${accent}`,
          }}
        >
          <div
            className={`${theme.radius.carte} text-center ${full ? "px-6 py-8" : "px-4 py-5"}`}
            style={{ border: `${trait}px solid ${accent}66` }}
          >
            <SectionLabel>{intitule}</SectionLabel>
            <svg
              viewBox="0 0 120 12"
              className={`mx-auto ${full ? "my-4 h-3 w-28" : "my-2.5 h-2 w-20"}`}
              aria-hidden="true"
            >
              <path
                d="M0 6h46M74 6h46"
                stroke={accent}
                strokeWidth={trait}
                fill="none"
              />
              <path
                d="M60 1.5l4.5 4.5L60 10.5 55.5 6z"
                stroke={accent}
                strokeWidth={trait}
                fill="none"
              />
            </svg>
            <p
              className={`ofp-display ${theme.displayStyleClass} ${theme.type("lieu")} text-pretty leading-snug`}
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
