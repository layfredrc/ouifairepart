"use client";

import { DecorCanvas } from "@/components/invitation/decor/DecorCanvas";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { useCoupleStore } from "@/lib/store/useCoupleStore";
import { themeFontVars } from "@/lib/theme/tokens";
import type { TemplateDefinition } from "@/lib/types";

interface PersonalizedPreviewProps {
  template: TemplateDefinition;
  date?: string;
  compact?: boolean;
  className?: string;
}

/**
 * Composant transverse : consommé par le Catalogue, la Fiche détail et le
 * Studio. Le nom du couple vient du store global (persisté) et s'applique
 * en direct sur chaque template, sans compte ni sauvegarde serveur.
 */
export function PersonalizedPreview({
  template,
  date,
  compact = true,
  className,
}: PersonalizedPreviewProps) {
  const { prenom1, prenom2 } = useCoupleStore();
  const nom1 = prenom1 || "Prénom";
  const nom2 = prenom2 || "Prénom";
  const { palette } = template.theme;
  const { accent, ink } = palette;

  return (
    <PhoneFrame compact={compact} className={className}>
      <div className="relative h-full w-full" style={themeFontVars(template.theme)}>
        <DecorCanvas
          decor={template.decor}
          palette={palette}
          stroke={template.theme.stroke}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
          <span
            className="ofp-body text-[0.6rem] uppercase tracking-[0.3em]"
            style={{ color: ink, opacity: 0.65 }}
          >
            Le mariage de
          </span>
          <span
            className="ofp-display text-2xl italic leading-tight"
            style={{ color: accent }}
          >
            {nom1}
          </span>
          <span className="ofp-display text-sm" style={{ color: ink, opacity: 0.7 }}>
            &amp;
          </span>
          <span
            className="ofp-display text-2xl italic leading-tight"
            style={{ color: accent }}
          >
            {nom2}
          </span>
          {date && (
            <span
              className="ofp-body text-[0.65rem] uppercase tracking-[0.2em] mt-2"
              style={{ color: ink, opacity: 0.6 }}
            >
              {date}
            </span>
          )}
        </div>
      </div>
    </PhoneFrame>
  );
}
