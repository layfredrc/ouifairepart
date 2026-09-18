"use client";

import { useState } from "react";
import { ActionBar } from "@/components/invitation/ActionBar";
import { InvitationCanvas } from "@/components/invitation/InvitationCanvas";
import { OpeningGate } from "@/components/invitation/OpeningGate";
import { demoDraft } from "@/lib/data/demoDraft";
import { resolveOpening } from "@/lib/motion/opening";
import { useStudioStore } from "@/lib/store/useStudioStore";
import { resolveTemplate } from "@/lib/templates";
import { deriverPalette } from "@/lib/theme/palette";

export default function InvitationPage() {
  const { draft } = useStudioStore();
  const [opened, setOpened] = useState(false);

  const effectiveDraft = draft.designId ? draft : demoDraft;
  const template = resolveTemplate(effectiveDraft.designId);
  const opening = resolveOpening(template, effectiveDraft);
  const { paperDeep } = deriverPalette(template.theme.palette);

  return (
    <div className="relative min-h-screen" style={{ background: paperDeep }}>
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
