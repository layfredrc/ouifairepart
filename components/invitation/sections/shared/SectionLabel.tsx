"use client";

import type { ReactNode } from "react";
import { Intitule } from "@/components/invitation/sections/shared/Intitule";

/** Ancien nom de l'intitulé centré, conservé pour les variantes existantes. */
export function SectionLabel({ children }: { children: ReactNode }) {
  return <Intitule alignement="centre">{children}</Intitule>;
}
