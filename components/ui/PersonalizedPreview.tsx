"use client";

import { CoverArt } from "@/components/ui/CoverArt";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { getCollection } from "@/lib/data/designs";
import { useCoupleStore } from "@/lib/store/useCoupleStore";
import type { DesignVariant } from "@/lib/types";

interface PersonalizedPreviewProps {
  design: DesignVariant;
  date?: string;
  compact?: boolean;
  className?: string;
}

/**
 * Composant transverse : consommé par le Catalogue, la Fiche détail et le
 * Studio. Le nom du couple vient du store global (persisté) et s'applique
 * en direct sur chaque design, sans compte ni sauvegarde serveur.
 */
export function PersonalizedPreview({
  design,
  date,
  compact = true,
  className,
}: PersonalizedPreviewProps) {
  const { prenom1, prenom2 } = useCoupleStore();
  const nom1 = prenom1 || "Prénom";
  const nom2 = prenom2 || "Prénom";
  const { accent, ink } = design.palette;
  const collection = getCollection(design.collectionId);

  return (
    <PhoneFrame compact={compact} className={className}>
      <div className="relative h-full w-full">
        <CoverArt
          motif={collection?.motif ?? "arche"}
          palette={design.palette}
          className="absolute inset-0 h-full w-full"
        />
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 px-6 text-center">
          <span
            className="font-body text-[0.6rem] uppercase tracking-[0.3em]"
            style={{ color: ink, opacity: 0.65 }}
          >
            Le mariage de
          </span>
          <span
            className="font-display text-2xl italic leading-tight"
            style={{ color: accent }}
          >
            {nom1}
          </span>
          <span className="font-display text-sm" style={{ color: ink, opacity: 0.7 }}>
            &amp;
          </span>
          <span
            className="font-display text-2xl italic leading-tight"
            style={{ color: accent }}
          >
            {nom2}
          </span>
          {date && (
            <span
              className="mt-2 font-body text-[0.65rem] uppercase tracking-[0.2em]"
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
