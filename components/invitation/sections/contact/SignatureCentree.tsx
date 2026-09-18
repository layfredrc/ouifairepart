"use client";

import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import { SectionLabel } from "@/components/invitation/sections/shared/SectionLabel";

export function SignatureCentree() {
  const { draft, theme } = useSection();
  const { ink } = theme.palette;
  const { full } = theme;

  return (
    <SectionRoot className={`text-center ${theme.gutter} ${theme.space("pied")}`}>
      <SectionLabel>Une question&nbsp;?</SectionLabel>
      <p
        className={`mt-3 ${full ? "text-sm" : "text-[0.6rem]"}`}
        style={{ color: ink, opacity: 0.65 }}
      >
        {draft.prenom1 || "Prénom"} &amp; {draft.prenom2 || "Prénom"} — répondent
        avec plaisir avant le grand jour.
      </p>
    </SectionRoot>
  );
}
