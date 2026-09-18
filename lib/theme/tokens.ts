import type { CSSProperties } from "react";
import { couleurAttenuee } from "@/lib/theme/contraste";
import { fontStacks } from "@/lib/theme/fonts";
import { deriverPalette, type PaletteDerivee } from "@/lib/theme/palette";
import type { Palette, RadiusToken, Rhythm, ThemeTokens, TypeScale } from "@/lib/types";

export type InvitationMode = "phone" | "full";

/** Rôles typographiques pilotés par `typography.scale`. */
export type TypeRole = "prenoms" | "citation" | "lieu" | "intitule";

/** Pas de rythme vertical demandé par une variante à sa section. */
export type SpaceStep = "aucun" | "serre" | "normal" | "ample" | "pied";

export type RadiusRole = "champ" | "carte" | "pastille";

/**
 * Niveau d'atténuation d'un texte secondaire. Le thème le traduit en
 * couleur opaque : une variante ne dilue jamais un texte à la main, sinon
 * le contraste dépend de la palette et §5 n'est plus tenable.
 */
export type NiveauTexte = "fort" | "doux" | "discret";

const opacitesSouhaitees: Record<NiveauTexte, number> = {
  fort: 1,
  doux: 0.7,
  discret: 0.6,
};

/**
 * Corps de texte par rôle, en unités de conteneur (`cqi`) : la racine du
 * rendu est un conteneur, et l'aperçu téléphone du Studio se comporte
 * donc exactement comme un mobile, quelle que soit la largeur de l'écran
 * qui l'affiche. C'est ce qui rend la parité d'aperçu (§7) structurelle.
 *
 * Les prénoms sont le seul corps réellement grand : c'est la typographie
 * qui fait le décor, pas l'ornement.
 */
const typeScale: Record<TypeScale, Record<TypeRole, string>> = {
  compacte: {
    prenoms: "clamp(2.5rem, 13cqi, 5.5rem)",
    citation: "clamp(1.125rem, 3.6cqi, 1.5rem)",
    lieu: "clamp(1.375rem, 4.6cqi, 2.125rem)",
    intitule: "clamp(1.0625rem, 3.2cqi, 1.25rem)",
  },
  normale: {
    prenoms: "clamp(2.75rem, 15cqi, 7rem)",
    citation: "clamp(1.25rem, 4cqi, 1.875rem)",
    lieu: "clamp(1.5rem, 5.2cqi, 2.5rem)",
    intitule: "clamp(1.125rem, 3.6cqi, 1.5rem)",
  },
  ample: {
    prenoms: "clamp(3rem, 17cqi, 8.5rem)",
    citation: "clamp(1.375rem, 4.6cqi, 2.25rem)",
    lieu: "clamp(1.75rem, 6cqi, 3rem)",
    intitule: "clamp(1.25rem, 4cqi, 1.75rem)",
  },
};

const typeClasses: Record<TypeRole, string> = {
  prenoms: "text-(length:--ofp-t-prenoms) leading-[0.92] tracking-[-0.01em]",
  citation: "text-(length:--ofp-t-citation) leading-[1.4]",
  lieu: "text-(length:--ofp-t-lieu) leading-[1.1]",
  intitule: "text-(length:--ofp-t-intitule) leading-[1.25]",
};

/**
 * Rythme vertical, lui aussi en unités de conteneur : un même pas donne
 * une marge serrée dans le cadre téléphone et ample sur la feuille.
 * `pied` dégage la barre d'actions fixe en bas de la dernière section.
 */
const sectionSpacing: Record<Rhythm, Record<SpaceStep, string>> = {
  dense: {
    aucun: "",
    serre: "py-[clamp(1.5rem,5cqi,3rem)]",
    normal: "py-[clamp(2rem,7cqi,4.5rem)]",
    ample: "py-[clamp(2.5rem,9cqi,6rem)]",
    pied: "pt-[clamp(1rem,3cqi,2rem)] pb-[clamp(4rem,10cqi,7rem)]",
  },
  normal: {
    aucun: "",
    serre: "py-[clamp(2rem,6cqi,4rem)]",
    normal: "py-[clamp(2.5rem,9cqi,6rem)]",
    ample: "py-[clamp(3rem,11cqi,7.5rem)]",
    pied: "pt-[clamp(1.5rem,4cqi,2.5rem)] pb-[clamp(4.5rem,12cqi,8rem)]",
  },
  aere: {
    aucun: "",
    serre: "py-[clamp(2.5rem,8cqi,5rem)]",
    normal: "py-[clamp(3rem,11cqi,7.5rem)]",
    ample: "py-[clamp(4rem,14cqi,9rem)]",
    pied: "pt-[clamp(2rem,5cqi,3rem)] pb-[clamp(5rem,14cqi,9rem)]",
  },
};

const radiusClasses: Record<RadiusToken, Record<RadiusRole, string>> = {
  vif: { champ: "rounded-none", carte: "rounded-none", pastille: "rounded-none" },
  doux: { champ: "rounded-[2px]", carte: "rounded-[3px]", pastille: "rounded-full" },
  rond: { champ: "rounded-md", carte: "rounded-lg", pastille: "rounded-full" },
};

const displayStyleClasses = {
  italique: "italic",
  romain: "not-italic",
  capitales: "not-italic uppercase tracking-[0.08em]",
} as const;

/** Gouttière latérale d'une section, proportionnelle au conteneur. */
const GUTTER = "px-[clamp(1.25rem,6cqi,3rem)]";

/**
 * Le registre des petites capitales : l'unique niveau d'intitulé de la
 * charte. Il ne se pose jamais seul au-dessus d'un bloc centré ; il court
 * avec un filet, ou se cale dans une marge.
 */
export const ETIQUETTE = "ofp-body text-[0.6875rem] font-normal uppercase tracking-[0.22em]";

/** Colonne de lecture : la largeur d'une ligne confortable. */
export const COLONNE = "mx-auto w-full max-w-[34rem]";

/** Largeur de la feuille sur écran large. */
export const FEUILLE = "mx-auto w-full max-w-[56rem]";

export interface ResolvedTheme {
  tokens: ThemeTokens;
  palette: Palette;
  derives: PaletteDerivee;
  mode: InvitationMode;
  full: boolean;
  /**
   * Toutes les variables `--ofp-*` : polices, couleurs et corps de texte.
   * À poser sur la racine du rendu. `fontVars` en est l'ancien nom.
   */
  cssVars: CSSProperties;
  fontVars: CSSProperties;
  displayStyleClass: string;
  radius: Record<RadiusRole, string>;
  /** Encre atténuée, remontée jusqu'au seuil de contraste sur le papier. */
  encre: (niveau: NiveauTexte) => string;
  /** Accent atténué, même garantie. */
  accentue: (niveau: NiveauTexte) => string;
  /** Épaisseur de trait du décor, en unités du viewBox des motifs. */
  stroke: (reference: number) => number;
  type: (role: TypeRole) => string;
  space: (step: SpaceStep) => string;
  gutter: string;
}

export function resolveTheme(tokens: ThemeTokens, mode: InvitationMode): ResolvedTheme {
  const { palette } = tokens;
  const derives = deriverPalette(palette);
  const cssVars = themeCssVars(tokens);

  return {
    tokens,
    palette,
    derives,
    mode,
    full: mode === "full",
    cssVars,
    fontVars: cssVars,
    displayStyleClass: displayStyleClasses[tokens.typography.displayStyle],
    radius: radiusClasses[tokens.radius],
    encre: (niveau) =>
      couleurAttenuee(palette.ink, palette.paper, opacitesSouhaitees[niveau]),
    accentue: (niveau) =>
      couleurAttenuee(palette.accent, palette.paper, opacitesSouhaitees[niveau]),
    stroke: (reference) => reference * tokens.stroke,
    type: (role) => typeClasses[role],
    space: (step) => sectionSpacing[tokens.rhythm][step],
    gutter: GUTTER,
  };
}

/**
 * Variables d'un thème — polices, palette, dérivées, corps de texte —
 * pour tout rendu qui vit hors du moteur (portail d'ouverture, aperçus).
 */
export function themeCssVars(tokens: ThemeTokens): CSSProperties {
  const { typography, palette } = tokens;
  const derives = deriverPalette(palette);
  const scale = typeScale[typography.scale];
  return {
    "--ofp-display": fontStacks[typography.display].family,
    "--ofp-body": fontStacks[typography.body].family,
    "--ofp-paper": palette.paper,
    "--ofp-paper-deep": derives.paperDeep,
    "--ofp-ink": palette.ink,
    "--ofp-accent": palette.accent,
    "--ofp-accent-soft": palette.accentSoft,
    "--ofp-line": derives.line,
    "--ofp-line-strong": derives.lineStrong,
    "--ofp-t-prenoms": scale.prenoms,
    "--ofp-t-citation": scale.citation,
    "--ofp-t-lieu": scale.lieu,
    "--ofp-t-intitule": scale.intitule,
  } as CSSProperties;
}

/** Ancien nom de `themeCssVars`, conservé pour les appels existants. */
export const themeFontVars = themeCssVars;
