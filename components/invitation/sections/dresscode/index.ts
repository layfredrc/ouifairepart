import { CartonEncadre } from "@/components/invitation/sections/dresscode/CartonEncadre";
import { Manchette } from "@/components/invitation/sections/dresscode/Manchette";
import type { SectionVariantTable } from "@/components/invitation/engine/variantTable";

export const dresscodeVariants: SectionVariantTable<"dresscode"> = {
  "carton-encadre": CartonEncadre,
  manchette: Manchette,
};
