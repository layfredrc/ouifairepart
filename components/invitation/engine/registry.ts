import type { ComponentType } from "react";
import { annonceVariants } from "@/components/invitation/sections/annonce";
import { cagnotteVariants } from "@/components/invitation/sections/cagnotte";
import { contactVariants } from "@/components/invitation/sections/contact";
import { couvertureVariants } from "@/components/invitation/sections/couverture";
import { dresscodeVariants } from "@/components/invitation/sections/dresscode";
import { faqVariants } from "@/components/invitation/sections/faq";
import { galerieVariants } from "@/components/invitation/sections/galerie";
import { lieuVariants } from "@/components/invitation/sections/lieu";
import { programmeVariants } from "@/components/invitation/sections/programme";
import { rsvpVariants } from "@/components/invitation/sections/rsvp";
import type { SectionVariantTable } from "@/components/invitation/engine/variantTable";
import type { SectionType } from "@/lib/types";

/**
 * Assemblage des tables par type. Ajouter une variante ne touche pas ce
 * fichier : seulement `lib/sections/<type>.ts`, le composant, et la table
 * de son type.
 */
export const sectionVariants: { [T in SectionType]: SectionVariantTable<T> } = {
  couverture: couvertureVariants,
  annonce: annonceVariants,
  programme: programmeVariants,
  lieu: lieuVariants,
  galerie: galerieVariants,
  dresscode: dresscodeVariants,
  rsvp: rsvpVariants,
  cagnotte: cagnotteVariants,
  faq: faqVariants,
  contact: contactVariants,
};

/**
 * Le moteur parcourt une union de couples (type, variante) : aucune
 * signature ne peut exprimer ce double index sans perdre la corrélation.
 * L'effacement est confiné ici ; les tables restent, elles, vérifiées.
 */
type ErasedVariant = ComponentType<{ options: unknown }>;

export function lookupVariant(type: SectionType, variant: string): ErasedVariant | undefined {
  const byVariant = sectionVariants[type] as Record<string, ErasedVariant>;
  return byVariant[variant];
}
