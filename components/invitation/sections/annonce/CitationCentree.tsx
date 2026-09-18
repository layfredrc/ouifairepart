"use client";

import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import { Filet } from "@/components/invitation/sections/shared/Filet";
import { COLONNE } from "@/lib/theme/tokens";

/**
 * L'annonce en citation : le texte du couple, seul, en corps de titrage,
 * ouvert par un filet à losange. Une respiration, pas un paragraphe.
 */
export function CitationCentree() {
  const { draft, theme } = useSection();

  return (
    <SectionRoot className={`${theme.gutter} ${theme.space("ample")}`}>
      <div className={`${COLONNE} text-center`}>
        <Filet />
        <p
          className={`ofp-display ${theme.displayStyleClass} ${theme.type("citation")} mt-[clamp(1.5rem,6cqi,2.75rem)] text-pretty whitespace-pre-line`}
          style={{ color: theme.palette.ink }}
        >
          {draft.texteInvitation}
        </p>
      </div>
    </SectionRoot>
  );
}
