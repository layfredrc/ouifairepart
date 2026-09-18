"use client";

import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import type { SectionVariantProps } from "@/components/invitation/engine/variantTable";
import { SectionLabel } from "@/components/invitation/sections/shared/SectionLabel";

/**
 * Grille horaires — un tableau d'horaires plutôt qu'un fil.
 *
 * Deux colonnes séparées d'un filet vertical continu : l'heure à gauche,
 * en grands chiffres de titrage, l'intitulé à droite en corps de texte.
 * L'heure est le héros typographique ; l'œil descend la colonne des
 * heures avant de lire les intitulés. Les lignes sont fermées par des
 * filets, la grille par deux traits épais.
 */
export function GrilleHoraires({
  options,
}: SectionVariantProps<"programme", "grille-horaires">) {
  const { draft, theme } = useSection();
  const { accent, ink } = theme.palette;
  const { full } = theme;
  const filets = options.filets ?? true;
  const aDroite = (options.alignementHeures ?? "droite") === "droite";

  const grille = full
    ? "grid-cols-[minmax(7.5rem,auto)_1fr]"
    : "grid-cols-[minmax(4.5rem,auto)_1fr]";
  const cellule = full ? "py-6" : "py-3";

  return (
    <SectionRoot className={`${theme.gutter} ${theme.space("normal")}`}>
      <SectionLabel>Programme</SectionLabel>
      <div
        className={`mx-auto ${full ? "mt-10 max-w-2xl" : "mt-5"}`}
        style={{ borderTop: `2px solid ${accent}`, borderBottom: `2px solid ${accent}` }}
      >
        {draft.programme.map((step, index) => (
          <div
            key={step.id}
            className={`grid ${grille}`}
            style={filets && index > 0 ? { borderTop: `1px solid ${accent}55` } : undefined}
          >
            <p
              className={`ofp-display flex items-center tabular-nums leading-none ${cellule} ${
                aDroite ? "justify-end text-right" : "justify-start text-left"
              } ${full ? "pr-6 text-4xl md:text-5xl" : "pr-3 text-xl"}`}
              style={{ color: accent }}
            >
              {step.heure}
            </p>
            <div
              className={`flex flex-col justify-center ${cellule} ${full ? "pl-6" : "pl-3"}`}
              style={{ borderLeft: `1px solid ${accent}55` }}
            >
              <p
                className={`ofp-body leading-snug ${full ? "text-lg md:text-xl" : "text-sm"}`}
                style={{ color: ink }}
              >
                {step.label}
              </p>
              {step.lieu && (
                <p
                  className={`ofp-body mt-1 uppercase tracking-[0.18em] ${
                    full ? "text-xs" : "text-[0.55rem]"
                  }`}
                  style={{ color: ink, opacity: 0.75 }}
                >
                  {step.lieu}
                </p>
              )}
            </div>
          </div>
        ))}
      </div>
    </SectionRoot>
  );
}
