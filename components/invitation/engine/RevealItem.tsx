"use client";

import type { ReactNode } from "react";
import { useSection } from "@/components/invitation/engine/SectionScope";

/**
 * Enfant orchestré par une section en révélation `cascade`. Il ne fait
 * que se déclarer (`data-reveal-item`) : sous les autres révélations, ou
 * sans runtime, il ne laisse qu'un `div`.
 */
export function RevealItem({
  className,
  children,
}: {
  className?: string;
  children: ReactNode;
}) {
  const { reveal } = useSection();

  return (
    <div className={className} data-reveal-item={reveal?.kind === "cascade" ? "" : undefined}>
      {children}
    </div>
  );
}
