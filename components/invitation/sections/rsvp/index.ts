import { FormulaireCentre } from "@/components/invitation/sections/rsvp/FormulaireCentre";
import { FormulaireEncadre } from "@/components/invitation/sections/rsvp/FormulaireEncadre";
import type { SectionVariantTable } from "@/components/invitation/engine/variantTable";

export const rsvpVariants: SectionVariantTable<"rsvp"> = {
  "formulaire-centre": FormulaireCentre,
  "formulaire-encadre": FormulaireEncadre,
};
