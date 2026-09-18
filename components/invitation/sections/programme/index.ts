import { CartesEmpilees } from "@/components/invitation/sections/programme/CartesEmpilees";
import { FriseHorizontale } from "@/components/invitation/sections/programme/FriseHorizontale";
import { GrilleHoraires } from "@/components/invitation/sections/programme/GrilleHoraires";
import { TimelineVerticale } from "@/components/invitation/sections/programme/TimelineVerticale";
import type { SectionVariantTable } from "@/components/invitation/engine/variantTable";

export const programmeVariants: SectionVariantTable<"programme"> = {
  "timeline-verticale": TimelineVerticale,
  "grille-horaires": GrilleHoraires,
  "cartes-empilees": CartesEmpilees,
  "frise-horizontale": FriseHorizontale,
};
