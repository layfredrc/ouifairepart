import type { ComponentType } from "react";
import { CitationCentree } from "@/components/invitation/sections/annonce/CitationCentree";
import { BlocCentre } from "@/components/invitation/sections/cagnotte/BlocCentre";
import { SignatureCentree } from "@/components/invitation/sections/contact/SignatureCentree";
import { PleinCadreCentre } from "@/components/invitation/sections/couverture/PleinCadreCentre";
import { CentreSimple } from "@/components/invitation/sections/lieu/CentreSimple";
import { TimelineVerticale } from "@/components/invitation/sections/programme/TimelineVerticale";
import { FormulaireCentre } from "@/components/invitation/sections/rsvp/FormulaireCentre";
import type { SectionType, VariantIdOf, VariantOptionsOf } from "@/lib/types";

/**
 * Une variante reçoit ses options par props et tout le reste — brouillon,
 * template, thème résolu, mode — par `useSection()`.
 */
export interface SectionVariantProps<
  T extends SectionType,
  V extends VariantIdOf<T>,
> {
  options: VariantOptionsOf<T, V>;
}

type SectionVariantComponents = {
  [T in SectionType]: {
    [V in VariantIdOf<T>]: ComponentType<SectionVariantProps<T, V>>;
  };
};

/**
 * Le typage de cette table est ce qui relie un identifiant de variante à
 * son composant : enregistrer `TimelineVerticale` sous `couverture` ne
 * compile pas, pas plus qu'un composant dont les options ne correspondent
 * pas à celles déclarées dans `SectionVariantRegistry`.
 */
export const sectionVariants: SectionVariantComponents = {
  couverture: { "plein-cadre-centre": PleinCadreCentre },
  annonce: { "citation-centree": CitationCentree },
  programme: { "timeline-verticale": TimelineVerticale },
  lieu: { "centre-simple": CentreSimple },
  galerie: {},
  dresscode: {},
  rsvp: { "formulaire-centre": FormulaireCentre },
  cagnotte: { "bloc-centre": BlocCentre },
  faq: {},
  contact: { "signature-centree": SignatureCentree },
};

/**
 * Le moteur parcourt une union de couples (type, variante) : aucune
 * signature ne peut exprimer ce double index sans perdre la corrélation.
 * L'effacement est confiné ici ; la table ci-dessus reste, elle, vérifiée.
 */
type ErasedVariant = ComponentType<{ options: unknown }>;

export function lookupVariant(type: SectionType, variant: string): ErasedVariant | undefined {
  const byVariant = sectionVariants[type] as Record<string, ErasedVariant>;
  return byVariant[variant];
}
