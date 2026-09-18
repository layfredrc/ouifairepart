"use client";

import { useState } from "react";
import { ActionBar } from "@/components/invitation/ActionBar";
import { InvitationCanvas } from "@/components/invitation/InvitationCanvas";
import { OpeningGate } from "@/components/invitation/OpeningGate";
import { getCollection, getDesign } from "@/lib/data/designs";
import { demoDraft } from "@/lib/data/demoDraft";
import { useStudioStore } from "@/lib/store/useStudioStore";

export default function InvitationPage() {
  const { draft } = useStudioStore();
  const [opened, setOpened] = useState(false);

  const effectiveDraft = draft.designId ? draft : demoDraft;
  const design = getDesign(effectiveDraft.designId ?? "") ?? getDesign(demoDraft.designId!)!;
  const collection = getCollection(design.collectionId)!;

  return (
    <div className="relative min-h-screen pb-24" style={{ background: design.palette.paper }}>
      {!opened && (
        <OpeningGate
          design={design}
          collection={collection}
          prenom1={effectiveDraft.prenom1}
          prenom2={effectiveDraft.prenom2}
          style={effectiveDraft.openingStyle}
          onOpen={() => setOpened(true)}
        />
      )}
      <InvitationCanvas draft={effectiveDraft} mode="full" />
      {opened && <ActionBar design={design} />}
    </div>
  );
}
