import type { AnimationIntensity, RevealSpec } from "@/lib/types";

/**
 * Profil d'intensité : réglé par le couple, appliqué comme multiplicateur
 * global. Les variantes ne décident que du mécanisme de révélation
 * (`RevealSpec`), jamais de sa durée ni de son amplitude.
 *
 * Ce module ne dépend d'aucune librairie d'animation : il décrit, et le
 * runtime (`lib/motion/runtime.ts`) traduit en tweens GSAP une fois chargé.
 */
export interface IntensityProfile {
  duration: number;
  /** Distance de translation, en pixels. */
  distance: number;
  scale: number;
  ease: string;
  /** Position du déclencheur : la section entre par le bas du viewport. */
  start: string;
}

export const intensityProfiles: Record<AnimationIntensity, IntensityProfile> = {
  sobre: { duration: 0.7, distance: 0, scale: 1, ease: "power1.out", start: "top 82%" },
  normale: { duration: 0.55, distance: 16, scale: 1, ease: "power2.out", start: "top 84%" },
  festive: { duration: 0.6, distance: 28, scale: 0.98, ease: "power3.out", start: "top 86%" },
};

export const DEFAULT_STAGGER = 0.08;

export interface Tween {
  from: Record<string, number | string>;
  to: Record<string, number | string>;
}

export interface RevealTweens {
  section: Tween;
  /** Tween des enfants d'une cascade ; absent pour les autres révélations. */
  items?: Tween & { stagger: number };
}

/** Traduit une déclaration de révélation en états de départ et d'arrivée. */
export function revealTweens(reveal: RevealSpec, intensity: AnimationIntensity): RevealTweens {
  const profile = intensityProfiles[intensity];
  const base = { duration: profile.duration, ease: profile.ease };

  if (reveal.kind === "masque") {
    return {
      section: {
        from: { opacity: 0, y: profile.distance / 2, clipPath: "inset(0% 0% 100% 0%)" },
        to: { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", ...base },
      },
    };
  }

  const section: Tween = {
    from: { opacity: 0, y: profile.distance, scale: profile.scale },
    to: { opacity: 1, y: 0, scale: 1, ...base },
  };

  if (reveal.kind === "cascade") {
    return {
      section: { from: { opacity: 0 }, to: { opacity: 1, duration: profile.duration * 0.6, ease: profile.ease } },
      items: {
        from: { opacity: 0, y: profile.distance * 0.6 },
        to: { opacity: 1, y: 0, ...base },
        stagger: reveal.stagger ?? DEFAULT_STAGGER,
      },
    };
  }

  return { section };
}
