"use client";

import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";

export function CitationCentree() {
  const { draft, theme } = useSection();

  return (
    <SectionRoot
      className={`mx-auto text-center ${theme.full ? "max-w-xl" : ""} ${theme.gutter} ${theme.space("ample")}`}
    >
      <p
        className={`ofp-display ${theme.displayStyleClass} ${theme.type("citation")}`}
        style={{ color: theme.palette.ink }}
      >
        {draft.texteInvitation}
      </p>
    </SectionRoot>
  );
}
