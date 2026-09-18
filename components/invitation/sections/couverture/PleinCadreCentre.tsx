"use client";

import { DecorCanvas } from "@/components/invitation/decor/DecorCanvas";
import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import { formatDateFr } from "@/lib/format";

export function PleinCadreCentre() {
  const { draft, template, theme } = useSection();
  const { accent } = theme.palette;
  const { full } = theme;

  const nom1 = draft.prenom1 || "Prénom";
  const nom2 = draft.prenom2 || "Prénom";
  const prenomClass = `ofp-display ${theme.displayStyleClass} leading-none ${theme.type("prenoms")}`;

  return (
    <SectionRoot
      className={`relative flex flex-col items-center justify-center text-center ${
        full ? "h-[92vh] min-h-[560px]" : "h-[70%]"
      }`}
    >
      <DecorCanvas
        decor={template.decor}
        palette={theme.palette}
        stroke={theme.tokens.stroke}
        className="absolute inset-0 h-full w-full"
      />
      <div className="relative flex flex-col items-center gap-3 px-6">
        <span
          className={`ofp-body uppercase tracking-[0.35em] ${full ? "text-xs" : "text-[0.55rem]"}`}
          style={{ color: theme.encre("discret") }}
        >
          Le mariage de
        </span>
        <span className={prenomClass} style={{ color: accent }}>
          {nom1}
        </span>
        <span className="ofp-display text-lg" style={{ color: theme.encre("discret") }}>
          &amp;
        </span>
        <span className={prenomClass} style={{ color: accent }}>
          {nom2}
        </span>
        {draft.dateMariage && (
          <span
            className={`mt-4 uppercase tracking-[0.25em] ${full ? "text-sm" : "text-[0.6rem]"}`}
            style={{ color: theme.encre("doux") }}
          >
            {formatDateFr(draft.dateMariage)}
          </span>
        )}
      </div>
    </SectionRoot>
  );
}
