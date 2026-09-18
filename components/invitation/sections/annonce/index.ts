import { CitationCentree } from "@/components/invitation/sections/annonce/CitationCentree";
import { LettreJustifiee } from "@/components/invitation/sections/annonce/LettreJustifiee";
import type { SectionVariantTable } from "@/components/invitation/engine/variantTable";

export const annonceVariants: SectionVariantTable<"annonce"> = {
  "citation-centree": CitationCentree,
  "lettre-justifiee": LettreJustifiee,
};
