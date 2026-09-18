"use client";

import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import type { SectionVariantProps } from "@/components/invitation/engine/variantTable";
import { PlanStylise } from "@/components/invitation/sections/lieu/PlanStylise";
import { SectionLabel } from "@/components/invitation/sections/shared/SectionLabel";

const ITINERAIRES_PAR_DEFAUT = ["Google Maps", "Apple Plans", "Waze"] as const;

const coins = ["left-0 top-0", "right-0 top-0 -scale-x-100", "left-0 bottom-0 -scale-y-100", "right-0 bottom-0 -scale-100"];

/**
 * Carte encadrée — le plan est le héros, l'adresse sa légende.
 *
 * Une vignette de plan stylisée, 100 % vectorielle, sous passe-partout :
 * double filet, coins en équerre. Le nom du lieu et la ville viennent en
 * légende sous le cadre, comme une gravure. La composition est celle
 * d'une estampe posée au centre, pas d'un titre centré.
 */
export function CarteEncadree({ options }: SectionVariantProps<"lieu", "carte-encadree">) {
  const { draft, theme } = useSection();
  const { accent, ink } = theme.palette;
  const { full } = theme;
  const itineraires = options.itineraires ?? ITINERAIRES_PAR_DEFAUT;
  const carre = (options.format ?? "paysage") === "carre";
  const dressCode = options.dressCode ?? true;

  return (
    <SectionRoot className={`${theme.gutter} ${theme.space("normal")}`}>
      <SectionLabel>Lieu</SectionLabel>
      <figure className={`mx-auto ${full ? "mt-8 max-w-lg" : "mt-4"}`}>
        <div
          className={`relative ${full ? "p-3" : "p-2"}`}
          style={{ border: `1.5px solid ${accent}` }}
        >
          {coins.map((coin) => (
            <span
              key={coin}
              className={`pointer-events-none absolute ${full ? "h-5 w-5" : "h-3.5 w-3.5"} ${coin}`}
              style={{
                borderTop: `1.5px solid ${accent}`,
                borderLeft: `1.5px solid ${accent}`,
                transformOrigin: "center",
              }}
            />
          ))}
          <div style={{ border: `1px solid ${accent}66` }}>
            <PlanStylise
              palette={theme.palette}
              stroke={theme.tokens.stroke}
              className={`block h-auto w-full ${carre ? "aspect-square" : "aspect-[4/3]"}`}
            />
          </div>
        </div>
        <figcaption className={`text-center ${full ? "mt-6" : "mt-3"}`}>
          <p className={`ofp-display ${theme.type("lieu")}`} style={{ color: ink }}>
            {draft.lieu || "Lieu à confirmer"}
          </p>
          {draft.ville && (
            <p
              className={`ofp-body mt-1 uppercase tracking-[0.25em] ${full ? "text-xs" : "text-[0.55rem]"}`}
              style={{ color: theme.encre("doux") }}
            >
              {draft.ville}
            </p>
          )}
          <div className={`flex flex-wrap justify-center gap-x-5 gap-y-1 ${full ? "mt-5" : "mt-3"}`}>
            {itineraires.map((label) => (
              <a
                key={label}
                href="#"
                onClick={(e) => e.preventDefault()}
                className={`ofp-body underline underline-offset-4 ${full ? "text-xs" : "text-[0.6rem]"}`}
                style={{ color: ink, textDecorationColor: `${accent}99` }}
              >
                {label}
              </a>
            ))}
          </div>
        </figcaption>
      </figure>
      {dressCode && draft.dressCode && (
        <p
          className={`text-center ${full ? "mt-8 text-sm" : "mt-4 text-[0.65rem]"}`}
          style={{ color: theme.encre("doux") }}
        >
          Dress code — {draft.dressCode}
        </p>
      )}
    </SectionRoot>
  );
}
