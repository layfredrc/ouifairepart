import type { CSSProperties } from "react";
import { fontStacks } from "@/lib/theme/fonts";
import type { Palette, RadiusToken, Rhythm, ThemeTokens, TypeScale } from "@/lib/types";

export type InvitationMode = "phone" | "full";

/** Rôles typographiques pilotés par `typography.scale`. */
export type TypeRole = "prenoms" | "citation" | "lieu" | "intitule";

/** Pas de rythme vertical demandé par une variante à sa section. */
export type SpaceStep = "aucun" | "serre" | "normal" | "ample" | "pied";

export type RadiusRole = "champ" | "carte" | "pastille";

type ByMode = { full: string; phone: string };

const typeScale: Record<TypeScale, Record<TypeRole, ByMode>> = {
  compacte: {
    prenoms: { full: "text-5xl md:text-6xl", phone: "text-2xl" },
    citation: { full: "text-xl", phone: "text-xs" },
    lieu: { full: "text-xl", phone: "text-sm" },
    intitule: { full: "text-base", phone: "text-xs" },
  },
  normale: {
    prenoms: { full: "text-6xl md:text-7xl", phone: "text-3xl" },
    citation: { full: "text-2xl", phone: "text-sm" },
    lieu: { full: "text-2xl", phone: "text-base" },
    intitule: { full: "text-lg", phone: "text-sm" },
  },
  ample: {
    prenoms: { full: "text-7xl md:text-8xl", phone: "text-4xl" },
    citation: { full: "text-3xl", phone: "text-base" },
    lieu: { full: "text-3xl", phone: "text-lg" },
    intitule: { full: "text-xl", phone: "text-base" },
  },
};

/**
 * `pied` est le pas de la dernière section du scroll : elle dégage la
 * hauteur de la barre d'actions fixe.
 */
const sectionSpacing: Record<Rhythm, Record<SpaceStep, ByMode>> = {
  dense: {
    aucun: { full: "", phone: "" },
    serre: { full: "py-8", phone: "py-4" },
    normal: { full: "py-12", phone: "py-6" },
    ample: { full: "py-16", phone: "py-8" },
    pied: { full: "pt-3 pb-20", phone: "pb-8" },
  },
  normal: {
    aucun: { full: "", phone: "" },
    serre: { full: "py-12", phone: "py-6" },
    normal: { full: "py-16", phone: "py-8" },
    ample: { full: "py-20", phone: "py-10" },
    pied: { full: "pt-4 pb-24", phone: "pb-10" },
  },
  aere: {
    aucun: { full: "", phone: "" },
    serre: { full: "py-16", phone: "py-8" },
    normal: { full: "py-20", phone: "py-10" },
    ample: { full: "py-24", phone: "py-12" },
    pied: { full: "pt-6 pb-28", phone: "pb-12" },
  },
};

const radiusClasses: Record<RadiusToken, Record<RadiusRole, string>> = {
  vif: { champ: "rounded-none", carte: "rounded-none", pastille: "rounded-full" },
  doux: { champ: "rounded-lg", carte: "rounded-xl", pastille: "rounded-full" },
  rond: { champ: "rounded-2xl", carte: "rounded-3xl", pastille: "rounded-full" },
};

const displayStyleClasses = {
  italique: "italic",
  romain: "not-italic",
  capitales: "not-italic uppercase tracking-[0.12em]",
} as const;

const gutters: ByMode = { full: "px-6", phone: "px-5" };

export interface ResolvedTheme {
  tokens: ThemeTokens;
  palette: Palette;
  mode: InvitationMode;
  full: boolean;
  /** `--ofp-display` et `--ofp-body`, à poser sur la racine du rendu. */
  fontVars: CSSProperties;
  displayStyleClass: string;
  radius: Record<RadiusRole, string>;
  /** Épaisseur de trait du décor, en unités du viewBox des motifs. */
  stroke: (reference: number) => number;
  type: (role: TypeRole) => string;
  space: (step: SpaceStep) => string;
  gutter: string;
}

export function resolveTheme(tokens: ThemeTokens, mode: InvitationMode): ResolvedTheme {
  const { typography } = tokens;
  const fontVars = {
    "--ofp-display": fontStacks[typography.display].family,
    "--ofp-body": fontStacks[typography.body].family,
  } as CSSProperties;

  return {
    tokens,
    palette: tokens.palette,
    mode,
    full: mode === "full",
    fontVars,
    displayStyleClass: displayStyleClasses[typography.displayStyle],
    radius: radiusClasses[tokens.radius],
    stroke: (reference) => reference * tokens.stroke,
    type: (role) => typeScale[typography.scale][role][mode],
    space: (step) => sectionSpacing[tokens.rhythm][step][mode],
    gutter: gutters[mode],
  };
}

/** Variables de police d'un thème, pour les aperçus rendus hors du moteur. */
export function themeFontVars(tokens: ThemeTokens): CSSProperties {
  return {
    "--ofp-display": fontStacks[tokens.typography.display].family,
    "--ofp-body": fontStacks[tokens.typography.body].family,
  } as CSSProperties;
}
