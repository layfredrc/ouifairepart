import type { ComponentType } from "react";
import type { SectionType, VariantIdOf, VariantOptionsOf } from "@/lib/types";

/**
 * Une variante reçoit ses options par props et tout le reste — brouillon,
 * template, thème résolu, mode — par `useSection()`.
 */
export interface SectionVariantProps<
  T extends SectionType,
  V extends VariantIdOf<T>,
> {
  options: VariantOptionsOf<T, V>;
}

/**
 * Table des composants d'un type de section. Son typage relie chaque
 * identifiant de variante à son composant : enregistrer sous `couverture`
 * un composant de programme ne compile pas, pas plus qu'un composant dont
 * les options ne correspondent pas à celles déclarées dans
 * `lib/sections/<type>.ts`.
 */
export type SectionVariantTable<T extends SectionType> = {
  [V in VariantIdOf<T>]: ComponentType<SectionVariantProps<T, V>>;
};
