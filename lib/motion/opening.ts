import type { OpeningSpec, StudioDraft, TemplateDefinition } from "@/lib/types";

/** §4 : une ouverture ne dépasse jamais 1,2 s. */
export const OPENING_MAX_DURATION = 1200;

/**
 * Le template propose une ouverture, le couple en dispose : `openingStyle`
 * appartient à la couche contenu et survit donc à un changement de template.
 */
export function resolveOpening(
  template: TemplateDefinition,
  draft: StudioDraft
): OpeningSpec {
  return {
    ...template.opening,
    style: draft.openingStyle,
    duree: Math.min(template.opening.duree, OPENING_MAX_DURATION),
  };
}
