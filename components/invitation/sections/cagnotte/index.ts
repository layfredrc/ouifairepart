import { BlocCentre } from "@/components/invitation/sections/cagnotte/BlocCentre";
import { NoteEnMarge } from "@/components/invitation/sections/cagnotte/NoteEnMarge";
import type { SectionVariantTable } from "@/components/invitation/engine/variantTable";

export const cagnotteVariants: SectionVariantTable<"cagnotte"> = {
  "bloc-centre": BlocCentre,
  "note-en-marge": NoteEnMarge,
};
