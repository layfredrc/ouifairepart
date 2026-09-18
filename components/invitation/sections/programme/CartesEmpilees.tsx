"use client";

import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import type { SectionVariantProps } from "@/components/invitation/engine/variantTable";
import { SectionLabel } from "@/components/invitation/sections/shared/SectionLabel";

/**
 * Cartes empilées — une pile de cartons, pas une liste.
 *
 * Chaque étape est un carton fermé : fond teinté, bord, ombre portée.
 * Les cartons se chevauchent et se décalent en quinconce, comme posés
 * les uns sur les autres ; l'heure est une pastille pleine qui déborde
 * du bord supérieur, l'intitulé occupe le carton en grand titrage, et
 * une numérotation en marge rythme la pile.
 */
export function CartesEmpilees({
  options,
}: SectionVariantProps<"programme", "cartes-empilees">) {
  const { draft, theme } = useSection();
  const { accent, accentSoft, ink, paper } = theme.palette;
  const { full } = theme;
  const numerotation = options.numerotation ?? true;
  const quinconce = options.quinconce ?? true;
  const total = draft.programme.length;

  return (
    <SectionRoot className={`${theme.gutter} ${theme.space("normal")}`}>
      <SectionLabel>Programme</SectionLabel>
      <div className={`mx-auto ${full ? "mt-12 max-w-md" : "mt-6"}`}>
        {draft.programme.map((step, index) => {
          const decalage = quinconce
            ? index % 2 === 0
              ? full
                ? "mr-5"
                : "mr-3"
              : full
                ? "ml-5"
                : "ml-3"
            : "";
          return (
            <article
              key={step.id}
              className={`relative border ${theme.radius.carte} ${
                full ? "px-6 pb-6 pt-7" : "px-4 pb-4 pt-5"
              } ${index > 0 ? (full ? "-mt-3" : "-mt-2") : ""} ${decalage}`}
              style={{
                zIndex: index + 1,
                background: `linear-gradient(${accentSoft}33, ${accentSoft}33) ${paper}`,
                borderColor: `${accent}66`,
                boxShadow: `0 18px 28px -20px ${ink}99`,
              }}
            >
              {step.heure && (
                <span
                  className={`ofp-body absolute ${theme.radius.pastille} uppercase tracking-[0.2em] ${
                    full ? "-top-3 left-6 px-3 py-1 text-xs" : "-top-2.5 left-4 px-2 py-0.5 text-[0.55rem]"
                  }`}
                  style={{ background: accent, color: paper }}
                >
                  {step.heure}
                </span>
              )}
              {numerotation && (
                <span
                  className={`ofp-display absolute italic tabular-nums ${
                    full ? "right-5 top-4 text-sm" : "right-3 top-2.5 text-[0.6rem]"
                  }`}
                  style={{ color: ink, opacity: 0.75 }}
                >
                  {String(index + 1).padStart(2, "0")}&thinsp;/&thinsp;
                  {String(total).padStart(2, "0")}
                </span>
              )}
              <p
                className={`ofp-display leading-tight ${full ? "text-2xl md:text-3xl" : "text-base"}`}
                style={{ color: ink }}
              >
                {step.label}
              </p>
              {step.lieu && (
                <p
                  className={`ofp-body mt-2 ${full ? "text-sm" : "text-[0.65rem]"}`}
                  style={{ color: ink, opacity: 0.75 }}
                >
                  {step.lieu}
                </p>
              )}
            </article>
          );
        })}
      </div>
    </SectionRoot>
  );
}
