"use client";

import { createContext, useContext, type ReactNode } from "react";
import type { ResolvedTheme } from "@/lib/theme/tokens";
import type {
  AnimationIntensity,
  RevealSpec,
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
  /** Révélation déclarée par le template ; `null` sous `prefers-reduced-motion`. */
  reveal: RevealSpec | null;
  /** Hors écran au premier rendu : la section est rendue, mais sa mise en page est différée. */
  differee: boolean;
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
