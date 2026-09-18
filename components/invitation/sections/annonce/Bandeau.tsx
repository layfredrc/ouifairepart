"use client";

import { DecorCanvas } from "@/components/invitation/decor/DecorCanvas";
import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import type { SectionVariantProps } from "@/components/invitation/engine/variantTable";
import type { Palette } from "@/lib/types";

/** Tuiles de la frise : impair pour centrer une tuile entière, assez pour 1440 px. */
const TUILES_FRISE = 11;

/**
 * Annonce en bandeau : une bande pleine largeur, teintée à l'encre du
 * thème (ou à l'accent), habillée d'une frise du motif en filigrane, et
 * le texte posé dessus en couleur papier.
 *
 * Contraste : le décor se dessine dans la couleur du texte sur une bande
 * encre, dans l'encre sur une bande accent — toujours fondu à faible
 * opacité. Aux endroits où un trait passe sous une lettre, le fond reste
 * donc au moins aussi contrasté que la bande nue, dont le rapport avec le
 * papier est garanti par la palette (papier / encre, papier / accent).
 */
export function Bandeau({
  options,
}: SectionVariantProps<"annonce", "bandeau">) {
  const { draft, template, theme } = useSection();
  const { paper, ink, accent } = theme.palette;
  const { full } = theme;
  const surAccent = options.teinte === "accent";
  const fond = surAccent ? accent : ink;
  const trait = surAccent ? ink : paper;

  const paletteBande: Palette = {
    ...theme.palette,
    paper: fond,
    ink: trait,
    accent: trait,
    accentSoft: trait,
  };

  return (
    <SectionRoot
      className={`relative overflow-hidden ${full ? "min-h-[46vh] py-20" : "py-8"}`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0"
        style={{ background: fond }}
      />
      <div
        aria-hidden="true"
        className={`absolute inset-0 flex justify-center ${surAccent ? "opacity-25" : "opacity-20"}`}
      >
        {Array.from({ length: TUILES_FRISE }).map((_, i) => (
          <DecorCanvas
            key={i}
            decor={template.decor}
            palette={paletteBande}
            stroke={theme.tokens.stroke}
            className="h-full shrink-0 aspect-[4/7]"
          />
        ))}
      </div>

      <div
        className={`relative mx-auto flex flex-col items-center text-center ${theme.gutter} ${
          full ? "max-w-2xl gap-6" : "gap-3"
        }`}
      >
        <span
          aria-hidden="true"
          className={`h-px ${full ? "w-12" : "w-6"}`}
          style={{ background: paper, opacity: 0.7 }}
        />
        <p
          className={`ofp-display ${theme.displayStyleClass} ${theme.type("citation")}`}
          style={{ color: paper }}
        >
          {draft.texteInvitation}
        </p>
        <span
          aria-hidden="true"
          className={`h-px ${full ? "w-12" : "w-6"}`}
          style={{ background: paper, opacity: 0.7 }}
        />
      </div>
    </SectionRoot>
  );
}
