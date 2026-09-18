"use client";

import type { ReactNode } from "react";
import { useSection } from "@/components/invitation/engine/SectionScope";

export function SectionLabel({ children }: { children: ReactNode }) {
  const { theme } = useSection();

  return (
    <p
      className="ofp-body text-center text-[0.65rem] uppercase tracking-[0.3em]"
      style={{ color: theme.palette.accent }}
    >
      {children}
    </p>
  );
}
