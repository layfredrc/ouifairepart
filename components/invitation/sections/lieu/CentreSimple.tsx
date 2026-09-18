"use client";

import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import type { SectionVariantProps } from "@/components/invitation/engine/registry";
import { SectionLabel } from "@/components/invitation/sections/shared/SectionLabel";

const ITINERAIRES_PAR_DEFAUT = ["Google Maps", "Apple Plans", "Waze"] as const;

export function CentreSimple({ options }: SectionVariantProps<"lieu", "centre-simple">) {
  const { draft, theme } = useSection();
  const { accent, ink } = theme.palette;
  const { full } = theme;
  const itineraires = options.itineraires ?? ITINERAIRES_PAR_DEFAUT;

  return (
    <SectionRoot className={`text-center ${theme.gutter} ${theme.space("normal")}`}>
      <SectionLabel>Lieu</SectionLabel>
      <p className={`mt-4 ofp-display ${theme.type("lieu")}`} style={{ color: ink }}>
        {draft.lieu || "Lieu à confirmer"}
      </p>
      <p className="mt-1 text-sm" style={{ color: ink, opacity: 0.6 }}>
        {draft.ville}
      </p>
      <div className="mt-5 flex flex-wrap justify-center gap-2">
        {itineraires.map((label) => (
          <a
            key={label}
            href="#"
            onClick={(e) => e.preventDefault()}
            className={`${theme.radius.pastille} border px-4 py-2 ${full ? "text-xs" : "text-[0.6rem]"}`}
            style={{ borderColor: `${accent}66`, color: ink }}
          >
            {label}
          </a>
        ))}
      </div>
      {draft.dressCode && (
        <p
          className={`mt-8 ${full ? "text-sm" : "text-[0.65rem]"}`}
          style={{ color: ink, opacity: 0.65 }}
        >
          Dress code — {draft.dressCode}
        </p>
      )}
    </SectionRoot>
  );
}
