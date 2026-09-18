"use client";

import { SectionScope } from "@/components/invitation/engine/SectionScope";
import { lookupVariant } from "@/components/invitation/engine/registry";
import { usePrefersReducedMotion } from "@/lib/motion/usePrefersReducedMotion";
import { revealMotion } from "@/lib/motion/reveal";
import { resolveTemplate } from "@/lib/templates";
import { FEUILLE, resolveTheme, type InvitationMode } from "@/lib/theme/tokens";
import type { FeatureFlags, SectionType, StudioDraft } from "@/lib/types";

interface InvitationCanvasProps {
  draft: StudioDraft;
  mode: InvitationMode;
  /** Ne rendre que ces types de section (l'aperçu du catalogue ne montre que la couverture). */
  seulement?: readonly SectionType[];
}

/** Sections dont l'affichage dépend d'une fonctionnalité du template. */
const featureGates: Partial<Record<SectionType, keyof FeatureFlags>> = {
  rsvp: "rsvp",
  cagnotte: "cagnotte",
};

/** §5 — une section optionnelle sans contenu saisi disparaît. */
function aDuContenu(type: SectionType, draft: StudioDraft): boolean {
  switch (type) {
    case "annonce":
      return draft.texteInvitation.trim().length > 0;
    case "programme":
      return draft.programme.length > 0;
    case "dresscode":
      return draft.dressCode.trim().length > 0;
    default:
      return true;
  }
}

/**
 * Le moteur : il ne décrit aucune page. Il parcourt `template.sections`,
 * rend pour chaque entrée le composant de la variante déclarée, et lui
 * fournit le brouillon, le thème résolu et la révélation à jouer.
 *
 * La racine est un conteneur (`ofp-root`) : tout ce qui est dimensionné en
 * `cqi` suit la largeur du cadre, pas celle de l'écran. Sur écran large, le
 * rendu plein est une feuille de 56 rem posée sur le papier profond, avec
 * un filet de chaque côté : l'invitation reste un objet, pas une page web
 * étirée.
 */
export function InvitationCanvas({ draft, mode, seulement }: InvitationCanvasProps) {
  const template = resolveTemplate(draft.designId);
  const theme = resolveTheme(template.theme, mode);
  const prefersReducedMotion = usePrefersReducedMotion();

  const cadre = theme.full
    ? `${FEUILLE} min-h-screen lg:border-x`
    : "h-full w-full overflow-y-auto scrollbar-none";

  return (
    <div
      className={`ofp-root ofp-grain ${cadre}`}
      style={{
        ...theme.cssVars,
        background: theme.palette.paper,
        color: theme.palette.ink,
        borderColor: theme.derives.line,
        fontFamily: "var(--ofp-body)",
      }}
    >
      {template.sections.map((section, index) => {
        if (seulement && !seulement.includes(section.type)) return null;
        const gate = featureGates[section.type];
        if (gate && !template.features[gate]) return null;
        if (!aDuContenu(section.type, draft)) return null;

        const Variant = lookupVariant(section.type, section.variant);
        if (!Variant) return null;

        return (
          <SectionScope
            key={`${section.type}-${section.variant}-${index}`}
            value={{
              draft,
              template,
              theme,
              intensity: draft.animationIntensity,
              sectionType: section.type,
              anchorId: section.type,
              reveal: prefersReducedMotion
                ? null
                : revealMotion(section.reveal, draft.animationIntensity),
            }}
          >
            <Variant options={section.options ?? {}} />
          </SectionScope>
        );
      })}
    </div>
  );
}
