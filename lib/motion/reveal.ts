import type { Transition, Variants } from "framer-motion";
import type { AnimationIntensity, RevealSpec } from "@/lib/types";

export const REPOS = "repos";
export const VISIBLE = "visible";

const DEFAULT_STAGGER = 0.08;

interface IntensityProfile {
  duration: number;
  /** Distance de translation, en pixels. */
  distance: number;
  scale: number;
  ease: Transition["ease"];
  /** Fraction de la section devant entrer dans le viewport. */
  amount: number;
}

/**
 * L'intensité est un profil global : les variantes ne décident que du
 * mécanisme de révélation, jamais de sa durée ni de son amplitude.
 */
const intensityProfiles: Record<AnimationIntensity, IntensityProfile> = {
  sobre: { duration: 0.7, distance: 0, scale: 1, ease: "easeOut", amount: 0.4 },
  normale: { duration: 0.55, distance: 16, scale: 1, ease: "easeOut", amount: 0.35 },
  festive: {
    duration: 0.6,
    distance: 28,
    scale: 0.98,
    ease: [0.22, 1, 0.36, 1],
    amount: 0.3,
  },
};

export interface RevealMotion {
  initial: string;
  whileInView: string;
  viewport: { once: true; amount: number };
  variants: Variants;
}

function sectionVariants(reveal: RevealSpec, profile: IntensityProfile): Variants {
  const transition: Transition = { duration: profile.duration, ease: profile.ease };

  if (reveal.kind === "masque") {
    return {
      [REPOS]: { opacity: 0, y: profile.distance / 2, clipPath: "inset(0% 0% 100% 0%)" },
      [VISIBLE]: { opacity: 1, y: 0, clipPath: "inset(0% 0% 0% 0%)", transition },
    };
  }

  const repos = { opacity: 0, y: profile.distance, scale: profile.scale };
  const visible = { opacity: 1, y: 0, scale: 1 };

  if (reveal.kind === "cascade") {
    return {
      [REPOS]: repos,
      [VISIBLE]: {
        ...visible,
        transition: { ...transition, staggerChildren: reveal.stagger ?? DEFAULT_STAGGER },
      },
    };
  }

  return { [REPOS]: repos, [VISIBLE]: { ...visible, transition } };
}

export function revealMotion(
  reveal: RevealSpec | undefined,
  intensity: AnimationIntensity
): RevealMotion | null {
  if (!reveal) return null;
  const profile = intensityProfiles[intensity];
  return {
    initial: REPOS,
    whileInView: VISIBLE,
    viewport: { once: true, amount: profile.amount },
    variants: sectionVariants(reveal, profile),
  };
}

/** Variantes des enfants orchestrés par une révélation `cascade`. */
export function revealItemVariants(intensity: AnimationIntensity): Variants {
  const profile = intensityProfiles[intensity];
  return {
    [REPOS]: { opacity: 0, y: profile.distance * 0.6 },
    [VISIBLE]: {
      opacity: 1,
      y: 0,
      transition: { duration: profile.duration, ease: profile.ease },
    },
  };
}
