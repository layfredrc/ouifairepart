import { Colophon } from "@/components/invitation/sections/contact/Colophon";
import { SignatureCentree } from "@/components/invitation/sections/contact/SignatureCentree";
import type { SectionVariantTable } from "@/components/invitation/engine/variantTable";

export const contactVariants: SectionVariantTable<"contact"> = {
  "signature-centree": SignatureCentree,
  colophon: Colophon,
};
