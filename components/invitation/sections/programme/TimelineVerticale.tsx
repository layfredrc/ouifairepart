"use client";

import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import { SectionLabel } from "@/components/invitation/sections/shared/SectionLabel";

export function TimelineVerticale() {
  const { draft, theme } = useSection();
  const { accent, ink } = theme.palette;
  const { full } = theme;

  return (
    <SectionRoot className={`${theme.gutter} ${theme.space("normal")}`}>
      <SectionLabel>Programme</SectionLabel>
      <div
        className="mx-auto mt-6 max-w-sm border-l"
        style={{ borderColor: `${accent}55` }}
      >
        {draft.programme.map((step) => (
          <div key={step.id} className={`relative pl-6 ${full ? "pb-8" : "pb-4"}`}>
            <span
              className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full"
              style={{ background: accent }}
            />
            <p
              className={`ofp-body uppercase tracking-widest ${full ? "text-xs" : "text-[0.55rem]"}`}
              style={{ color: ink, opacity: 0.55 }}
            >
              {step.heure}
            </p>
            <p className={`ofp-display ${theme.type("intitule")}`} style={{ color: ink }}>
              {step.label}
            </p>
          </div>
        ))}
      </div>
    </SectionRoot>
  );
}
