"use client";

import { useState } from "react";
import { ActionBar } from "@/components/invitation/ActionBar";
import { AudioControl } from "@/components/invitation/AudioControl";
import { FontPreload } from "@/components/invitation/FontPreload";
import { InvitationCanvas } from "@/components/invitation/InvitationCanvas";
import { MotionRoot } from "@/components/invitation/engine/MotionRoot";
import { OpeningGate } from "@/components/invitation/OpeningGate";
import { demoDraft } from "@/lib/data/demoDraft";
import { resolveOpening } from "@/lib/motion/opening";
import { useStudioStore } from "@/lib/store/useStudioStore";
import { resolveTemplate } from "@/lib/templates";
import { deriverPalette } from "@/lib/theme/palette";

/**
 * La page publique. Rendue côté serveur, complète et lisible sans
 * JavaScript : le mouvement (`MotionRoot`) et le son (`AudioControl`) sont
 * des améliorations chargées après coup, jamais des conditions.
 */
export default function InvitationPage() {
  const { draft } = useStudioStore();
  const [opened, setOpened] = useState(false);

  const effectiveDraft = draft.designId ? draft : demoDraft;
  const template = resolveTemplate(effectiveDraft.designId);
  const opening = resolveOpening(template, effectiveDraft);
  const { paperDeep } = deriverPalette(template.theme.palette);

  return (
    <MotionRoot
      intensity={effectiveDraft.animationIntensity}
      signature={`${template.id}:${effectiveDraft.programme.length}:${effectiveDraft.dressCode ? 1 : 0}`}
      background={paperDeep}
      fixes={
        <>
          <FontPreload template={template} />
          <noscript>
            <style>{`[data-ofp-voile]{display:none}`}</style>
          </noscript>
          {!opened && (
            <OpeningGate
              template={template}
              opening={opening}
              prenom1={effectiveDraft.prenom1}
              prenom2={effectiveDraft.prenom2}
              onOpen={() => setOpened(true)}
            />
          )}
          {opened && <ActionBar template={template} />}
          {template.features.musique && (
            <AudioControl sound={template.sound} palette={template.theme.palette} />
          )}
        </>
      }
    >
      <InvitationCanvas draft={effectiveDraft} mode="full" />
    </MotionRoot>
  );
}
