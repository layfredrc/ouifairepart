import { CarteEncadree } from "@/components/invitation/sections/lieu/CarteEncadree";
import { CentreSimple } from "@/components/invitation/sections/lieu/CentreSimple";
import type { SectionVariantTable } from "@/components/invitation/engine/variantTable";

export const lieuVariants: SectionVariantTable<"lieu"> = {
  "centre-simple": CentreSimple,
  "carte-encadree": CarteEncadree,
};
