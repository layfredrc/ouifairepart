"use client";

import { useEffect, useRef, useSyncExternalStore } from "react";
import { sonInvitation } from "@/lib/motion/audio";
import { ETIQUETTE } from "@/lib/theme/tokens";
import type { Palette, SoundSpec } from "@/lib/types";

interface AudioControlProps {
  sound: SoundSpec | undefined;
  palette: Palette;
}

/**
 * Couche 5 — le son. L'élément audio ne précharge rien (`preload="none"`) :
 * la piste ne pèse ni sur le premier rendu ni sur la bande passante tant
 * que l'invité n'a pas ouvert l'invitation. Le bouton de coupure reste
 * visible tant que la piste est disponible.
 */
export function AudioControl({ sound, palette }: AudioControlProps) {
  const ref = useRef<HTMLAudioElement>(null);
  const etat = useSyncExternalStore(sonInvitation.souscrire, sonInvitation.etat, sonInvitation.etat);

  useEffect(() => {
    if (!sound) return;
    return sonInvitation.enregistrer(ref.current, sound.volume);
  }, [sound]);

  if (!sound) return null;

  return (
    <>
      <audio ref={ref} preload="none" loop src={`/audio/${sound.pisteId}.wav`} aria-label={sound.titre} />
      {etat.disponible && (
        <button
          type="button"
          onClick={() => sonInvitation.basculer()}
          aria-pressed={etat.coupe}
          className={`${ETIQUETTE} fixed right-4 top-4 z-50 border-b pb-1 transition-colors`}
          style={{ color: palette.ink, borderColor: etat.coupe ? "transparent" : palette.accent }}
        >
          {etat.coupe ? "Son coupé" : etat.enLecture ? "Couper le son" : "Son"}
        </button>
      )}
    </>
  );
}
