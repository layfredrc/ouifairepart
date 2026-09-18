"use client";

import { InvitationCanvas } from "@/components/invitation/InvitationCanvas";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { demoDraft } from "@/lib/data/demoDraft";
import { useCoupleStore } from "@/lib/store/useCoupleStore";
import type { TemplateDefinition } from "@/lib/types";

interface PersonalizedPreviewProps {
  template: TemplateDefinition;
  /** Date au format ISO ; sans elle, le pied de couverture ne montre que la ville. */
  date?: string;
  compact?: boolean;
  className?: string;
}

/**
 * Composant transverse : consommé par le Catalogue, la Fiche détail et le
 * Studio. Il rend la couverture du template par le moteur lui-même, avec
 * les prénoms du couple : ce que le catalogue montre est exactement ce que
 * la page publiée ouvrira, variante de couverture comprise.
 */
export function PersonalizedPreview({
  template,
  date,
  compact = true,
  className,
}: PersonalizedPreviewProps) {
  const { prenom1, prenom2 } = useCoupleStore();
  const draft = {
    ...demoDraft,
    designId: template.id,
    paletteId: template.theme.palette.id,
    prenom1: prenom1 || "Prénom",
    prenom2: prenom2 || "Prénom",
    dateMariage: date ?? "",
    ville: date ? demoDraft.ville : "",
  };

  return (
    <PhoneFrame compact={compact} className={className}>
      <InvitationCanvas draft={draft} mode="phone" seulement={["couverture"]} />
    </PhoneFrame>
  );
}
