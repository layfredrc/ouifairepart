import {
  Cormorant_Garamond,
  EB_Garamond,
  Fraunces,
  Jost,
  Karla,
  Lato,
  Libre_Baskerville,
  Playfair_Display,
  Spectral,
  Work_Sans,
} from "next/font/google";
import type { FontStackId } from "@/lib/types";

/**
 * Toutes ces familles couvrent la plage `latin` de Google, qui inclut
 * U+00C0-00FF et U+0152-0153 : les accents français et la ligature œ
 * sont rendus par la fonte, jamais par un fallback système.
 *
 * Les polices de display sont chargées en romain et en italique, parce
 * qu'un `displayStyle: "italique"` doit tirer une vraie italique et non
 * une oblique synthétisée.
 *
 * Seule la paire du site (EB Garamond / Jost) est préchargée : les huit
 * autres n'habillent que la route d'invitation d'un template donné, et
 * les précharger toutes mettrait dix familles en concurrence de bande
 * passante sur la page qui compte le plus (§6).
 */

const cormorantGaramond = Cormorant_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
  variable: "--font-cormorant-garamond",
});

const spectral = Spectral({
  subsets: ["latin"],
  weight: ["300", "400", "600"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
  variable: "--font-spectral",
});

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
  variable: "--font-playfair-display",
});

const ebGaramond = EB_Garamond({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  variable: "--font-eb-garamond",
});

const libreBaskerville = Libre_Baskerville({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
  variable: "--font-libre-baskerville",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  style: ["normal", "italic"],
  display: "swap",
  preload: false,
  variable: "--font-fraunces",
});

const jost = Jost({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-jost",
});

const karla = Karla({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-karla",
});

const workSans = Work_Sans({
  subsets: ["latin"],
  display: "swap",
  preload: false,
  variable: "--font-work-sans",
});

const lato = Lato({
  subsets: ["latin"],
  weight: ["300", "400", "700"],
  display: "swap",
  preload: false,
  variable: "--font-lato",
});

interface FontStack {
  /** Classe next/font qui déclare la variable CSS. */
  variableClass: string;
  /** Valeur à poser en `font-family`. */
  family: string;
}

const serifFallback = `Georgia, "Times New Roman", serif`;
const sansFallback = `"Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif`;

export const fontStacks: Record<FontStackId, FontStack> = {
  "cormorant-garamond": {
    variableClass: cormorantGaramond.variable,
    family: `var(--font-cormorant-garamond), ${serifFallback}`,
  },
  spectral: {
    variableClass: spectral.variable,
    family: `var(--font-spectral), ${serifFallback}`,
  },
  "playfair-display": {
    variableClass: playfairDisplay.variable,
    family: `var(--font-playfair-display), ${serifFallback}`,
  },
  "eb-garamond": {
    variableClass: ebGaramond.variable,
    family: `var(--font-eb-garamond), ${serifFallback}`,
  },
  "libre-baskerville": {
    variableClass: libreBaskerville.variable,
    family: `var(--font-libre-baskerville), ${serifFallback}`,
  },
  fraunces: {
    variableClass: fraunces.variable,
    family: `var(--font-fraunces), ${serifFallback}`,
  },
  jost: { variableClass: jost.variable, family: `var(--font-jost), ${sansFallback}` },
  karla: { variableClass: karla.variable, family: `var(--font-karla), ${sansFallback}` },
  "work-sans": {
    variableClass: workSans.variable,
    family: `var(--font-work-sans), ${sansFallback}`,
  },
  lato: { variableClass: lato.variable, family: `var(--font-lato), ${sansFallback}` },
};

/** À poser sur `<html>` : rend les dix familles adressables par variable CSS. */
export const fontVariablesClassName = Object.values(fontStacks)
  .map((stack) => stack.variableClass)
  .join(" ");
