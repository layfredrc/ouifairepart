"use client";

import { InvitationCanvas } from "@/components/invitation/InvitationCanvas";
import { PhoneFrame } from "@/components/ui/PhoneFrame";
import { demoDraft } from "@/lib/data/demoDraft";
import { useStudioStore } from "@/lib/store/useStudioStore";

export function StudioPreviewPanel({ className = "" }: { className?: string }) {
  const { draft } = useStudioStore();
  const effectiveDraft = { ...(draft.designId ? draft : demoDraft), ...(draft.designId ? {} : { prenom1: draft.prenom1 || demoDraft.prenom1, prenom2: draft.prenom2 || demoDraft.prenom2 }) };

  return (
    <div className={className}>
      <PhoneFrame compact className="mx-auto w-full max-w-[300px]">
        <InvitationCanvas draft={effectiveDraft} mode="phone" />
      </PhoneFrame>
      <p className="mt-4 text-center text-xs text-ink-soft">
        Aperçu en temps réel — identique à la page publiée
      </p>
    </div>
  );
}
