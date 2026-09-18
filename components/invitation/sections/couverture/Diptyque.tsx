"use client";

import { DecorCanvas } from "@/components/invitation/decor/DecorCanvas";
import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import type { SectionVariantProps } from "@/components/invitation/engine/variantTable";
import { formatDateFr } from "@/lib/format";

/**
 * Couverture en diptyque : deux panneaux, l'art et le texte. Côte à côte
 * dès que la section est assez large (container query : l'aperçu
 * téléphone reste empilé même sur un écran de bureau), empilés sinon.
 * Le panneau de texte se construit de haut en bas — intitulé, prénoms
 * séparés par un filet porteur du « & », date en pastille — sans
 * jamais recentrer l'ensemble comme le plein cadre.
 */
export function Diptyque({
  options,
}: SectionVariantProps<"couverture", "diptyque">) {
  const { draft, template, theme } = useSection();
  const { accent, ink } = theme.palette;
  const { full } = theme;
  const artADroite = options.coteArt === "droite";

  const nom1 = draft.prenom1 || "Prénom";
  const nom2 = draft.prenom2 || "Prénom";
  const date = draft.dateMariage ? formatDateFr(draft.dateMariage) : "";
  const ville = draft.ville.trim();
  const prenomClass = `ofp-display ${theme.displayStyleClass} leading-none ${theme.type("prenoms")}`;
  const filet = { background: `${accent}66` };

  return (
    <SectionRoot className={`@container ${full ? "" : "h-[70%]"}`}>
      {/* La grille vit sous la racine : une container query ne s'applique
          qu'aux descendants du conteneur, jamais à lui-même. */}
      <div
        className={`grid grid-cols-1 @md:grid-cols-2 ${
          full ? "min-h-[92vh]" : "h-full grid-rows-[45%_1fr] @md:grid-rows-1"
        }`}
      >
        <div
          className={`relative overflow-hidden ${
            full ? "h-[44vh] min-h-[260px] @md:h-auto @md:min-h-0" : ""
          } ${artADroite ? "@md:order-last" : ""}`}
        >
          {/* Empilé, le décor remplit la largeur ; côte à côte, le panneau
              montre le motif entier, centré, plutôt qu'une tranche. */}
          <DecorCanvas
            decor={template.decor}
            palette={theme.palette}
            stroke={theme.tokens.stroke}
            className="absolute inset-0 h-full w-full @md:hidden"
          />
          <div className="absolute inset-0 hidden justify-center @md:flex">
            <DecorCanvas
              decor={template.decor}
              palette={theme.palette}
              stroke={theme.tokens.stroke}
              className="h-full aspect-[4/7]"
            />
          </div>
        </div>

        <div
          className={`flex flex-col justify-between text-center ${theme.gutter} ${
            full ? "py-10 @md:px-12 @md:py-14" : "py-4"
          } ${artADroite ? "@md:border-r" : "@md:border-l"}`}
          style={{ borderColor: `${accent}66` }}
        >
          <p
            className={`ofp-body uppercase tracking-[0.35em] ${full ? "text-xs" : "text-[0.55rem]"}`}
            style={{ color: ink, opacity: 0.6 }}
          >
            Le mariage de
          </p>

          <div
            className={`flex flex-col ${full ? "my-8 gap-5" : "my-3 gap-2"}`}
          >
            <p
              className={`${prenomClass} break-words`}
              style={{ color: accent }}
            >
              {nom1}
            </p>
            <div
              className={`flex items-center ${full ? "gap-5" : "gap-3"}`}
              aria-hidden="true"
            >
              <span className="h-px flex-1" style={filet} />
              <span
                className={`ofp-display ${full ? "text-2xl" : "text-base"}`}
                style={{ color: ink, opacity: 0.6 }}
              >
                &amp;
              </span>
              <span className="h-px flex-1" style={filet} />
            </div>
            <p
              className={`${prenomClass} break-words`}
              style={{ color: accent }}
            >
              {nom2}
            </p>
          </div>

          <div
            className={`flex flex-col items-center ${full ? "gap-3" : "gap-1.5"}`}
          >
            {date && (
              <span
                className={`${theme.radius.pastille} ofp-body inline-block border uppercase tracking-[0.25em] ${
                  full ? "px-5 py-2 text-xs" : "px-3 py-1 text-[0.5rem]"
                }`}
                style={{ borderColor: `${accent}66`, color: ink }}
              >
                {date}
              </span>
            )}
            {ville && (
              <span
                className={`ofp-display ${theme.displayStyleClass} ${full ? "text-lg" : "text-xs"}`}
                style={{ color: ink, opacity: 0.7 }}
              >
                {ville}
              </span>
            )}
          </div>
        </div>
      </div>
    </SectionRoot>
  );
}
