"use client";

import { useState } from "react";
import { ActionBar } from "@/components/invitation/ActionBar";
import { InvitationCanvas } from "@/components/invitation/InvitationCanvas";
import { OpeningGate } from "@/components/invitation/OpeningGate";
import { demoDraft } from "@/lib/data/demoDraft";
import { resolveOpening } from "@/lib/motion/opening";
import { useStudioStore } from "@/lib/store/useStudioStore";
import { resolveTemplate } from "@/lib/templates";

export default function InvitationPage() {
  const { draft } = useStudioStore();
  const [opened, setOpened] = useState(false);

  const effectiveDraft = draft.designId ? draft : demoDraft;
  const template = resolveTemplate(effectiveDraft.designId);
  const opening = resolveOpening(template, effectiveDraft);

  return (
    <div
      className="relative min-h-screen pb-24"
      style={{ background: template.theme.palette.paper }}
    >
      {!opened && (
        <OpeningGate
          template={template}
          opening={opening}
          prenom1={effectiveDraft.prenom1}
          prenom2={effectiveDraft.prenom2}
          onOpen={() => setOpened(true)}
        />
      )}
      <InvitationCanvas draft={effectiveDraft} mode="full" />
      {opened && <ActionBar template={template} />}
    </div>
  );
}
