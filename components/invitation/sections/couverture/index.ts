import { Diptyque } from "@/components/invitation/sections/couverture/Diptyque";
import { EditorialBasGauche } from "@/components/invitation/sections/couverture/EditorialBasGauche";
import { Medaillon } from "@/components/invitation/sections/couverture/Medaillon";
import { PleinCadreCentre } from "@/components/invitation/sections/couverture/PleinCadreCentre";
import type { SectionVariantTable } from "@/components/invitation/engine/variantTable";

export const couvertureVariants: SectionVariantTable<"couverture"> = {
  "plein-cadre-centre": PleinCadreCentre,
  "editorial-bas-gauche": EditorialBasGauche,
  diptyque: Diptyque,
  medaillon: Medaillon,
};
