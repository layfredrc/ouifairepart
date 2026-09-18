"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { RevealMotion } from "@/lib/motion/reveal";
import type { ResolvedTheme } from "@/lib/theme/tokens";
import type {
  AnimationIntensity,
  SectionType,
  StudioDraft,
  TemplateDefinition,
} from "@/lib/types";

export interface SectionContextValue {
  draft: StudioDraft;
  template: TemplateDefinition;
  theme: ResolvedTheme;
  intensity: AnimationIntensity;
  sectionType: SectionType;
  anchorId: string;
  reveal: RevealMotion | null;
}

const SectionContext = createContext<SectionContextValue | null>(null);

export function SectionScope({
  value,
  children,
}: {
  value: SectionContextValue;
  children: ReactNode;
}) {
  return <SectionContext.Provider value={value}>{children}</SectionContext.Provider>;
}

export function useSection(): SectionContextValue {
  const value = useContext(SectionContext);
  if (!value) {
    throw new Error("useSection doit être appelé depuis une variante rendue par le moteur.");
  }
  return value;
}
