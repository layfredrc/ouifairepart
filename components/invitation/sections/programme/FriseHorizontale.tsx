"use client";

import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import type { SectionVariantProps } from "@/components/invitation/engine/variantTable";
import { SectionLabel } from "@/components/invitation/sections/shared/SectionLabel";

/**
 * Frise horizontale — la journée se lit de gauche à droite.
 *
 * Une ligne continue traverse la section ; chaque étape est une colonne
 * posée dessus, l'heure au-dessus de la ligne, un marqueur sur la ligne,
 * l'intitulé au-dessous. Quand la largeur manque — mobile, aperçu
 * téléphone — la frise déborde et se fait défiler latéralement, un
 * dégradé sur le bord droit le signale. Quand elle suffit, les colonnes
 * se répartissent sur toute la largeur.
 *
 * Les largeurs se décident par requête de conteneur : l'aperçu téléphone
 * du Studio est un cadre de 300 px dans une fenêtre large.
 */
export function FriseHorizontale({
  options,
}: SectionVariantProps<"programme", "frise-horizontale">) {
  const { draft, theme } = useSection();
  const { accent, ink, paper } = theme.palette;
  const { full } = theme;
  const aimant = options.aimant ?? true;
  const numeros = (options.marqueurs ?? "points") === "numeros";

  const gouttiere = full ? "px-6" : "px-5";
  const base = full ? "10.5rem" : "8.5rem";

  return (
    <SectionRoot className={`@container ${theme.space("normal")}`}>
      <div className={gouttiere}>
        <SectionLabel>Programme</SectionLabel>
      </div>
      <div className={`relative ${full ? "mx-auto mt-10 max-w-5xl" : "mt-5"}`}>
        <div
          className={`scrollbar-none flex overflow-x-auto ${gouttiere} ${
            aimant ? "snap-x snap-mandatory" : ""
          }`}
          style={{ scrollPaddingInline: full ? "1.5rem" : "1.25rem" }}
        >
          {draft.programme.map((step, index) => (
            <div
              key={step.id}
              className="min-w-0 shrink-0 grow snap-start text-center"
              style={{ flexBasis: base }}
            >
              <p
                className={`ofp-body px-3 uppercase tracking-[0.25em] ${
                  full ? "text-xs" : "text-[0.55rem]"
                }`}
                style={{ color: ink, opacity: 0.75 }}
              >
                {step.heure || " "}
              </p>
              <div
                className={`relative ${full ? "my-5" : "my-3"} h-px`}
                style={{ background: `${accent}80` }}
              >
                {numeros ? (
                  <span
                    className={`ofp-body absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full tabular-nums ${
                      full ? "h-7 w-7 text-[0.65rem]" : "h-5 w-5 text-[0.5rem]"
                    }`}
                    style={{ background: accent, color: paper }}
                  >
                    {index + 1}
                  </span>
                ) : (
                  <span
                    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full ${
                      full ? "h-3.5 w-3.5" : "h-2.5 w-2.5"
                    }`}
                    style={{ background: accent, boxShadow: `0 0 0 4px ${paper}` }}
                  />
                )}
              </div>
              <p
                className={`ofp-display px-3 leading-tight ${theme.type("intitule")}`}
                style={{ color: ink }}
              >
                {step.label}
              </p>
              {step.lieu && (
                <p
                  className={`ofp-body mt-1 px-3 ${full ? "text-xs" : "text-[0.55rem]"}`}
                  style={{ color: ink, opacity: 0.75 }}
                >
                  {step.lieu}
                </p>
              )}
            </div>
          ))}
        </div>
        <div
          className="pointer-events-none absolute inset-y-0 right-0 w-12 @3xl:hidden"
          style={{ background: `linear-gradient(to right, transparent, ${paper})` }}
        />
      </div>
    </SectionRoot>
  );
}
