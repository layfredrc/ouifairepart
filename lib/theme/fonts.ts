import { Jost, Karla, Lato, Work_Sans } from "next/font/google";
import type { FontStackId } from "@/lib/types";

/**
 * Deux régimes de polices.
 *
 * Les polices de corps passent par `next/font` : Jost, corps du site et de
 * trois collections, est préchargée ; les trois autres sont découvertes
 * par la feuille de style du template qui les utilise.
 *
 * Les six polices de titrage sont auto-hébergées (`public/fonts/`, déclarées
 * dans `app/fonts.css`) : leurs URL sont connues du code, et la page
 * publique peut donc précharger exactement la police de titrage de SON
 * template, celle qui porte le LCP (§6). `next/font` ne le permet pas :
 * il précharge par route, jamais par template.
 *
 * Toutes couvrent la plage `latin` de Google, qui inclut U+00C0-00FF et
 * U+0152-0153 : les accents français et la ligature œ sont rendus par la
 * fonte, jamais par un fallback système. Les titrages sont chargés en
 * romain et en vraie italique, jamais en oblique synthétisée.
 */

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
  /** Classe next/font qui déclare la variable CSS ; vide pour une police auto-hébergée. */
  variableClass: string;
  /** Valeur à poser en `font-family`. */
  family: string;
}

const serifFallback = `Georgia, "Times New Roman", serif`;
const sansFallback = `"Segoe UI", "Helvetica Neue", Helvetica, Arial, sans-serif`;

export type FontStyle = "normal" | "italic";

/** Fichiers des polices de titrage auto-hébergées, par style. */
export const displayFontFiles: Partial<Record<FontStackId, Record<FontStyle, string>>> = {
  "cormorant-garamond": {
    normal: "/fonts/cormorant-garamond-normal.woff2",
    italic: "/fonts/cormorant-garamond-italic.woff2",
  },
  spectral: { normal: "/fonts/spectral-normal.woff2", italic: "/fonts/spectral-italic.woff2" },
  "playfair-display": {
    normal: "/fonts/playfair-display-normal.woff2",
    italic: "/fonts/playfair-display-italic.woff2",
  },
  "eb-garamond": { normal: "/fonts/eb-garamond-normal.woff2", italic: "/fonts/eb-garamond-italic.woff2" },
  "libre-baskerville": {
    normal: "/fonts/libre-baskerville-normal.woff2",
    italic: "/fonts/libre-baskerville-italic.woff2",
  },
  fraunces: { normal: "/fonts/fraunces-normal.woff2", italic: "/fonts/fraunces-italic.woff2" },
};

export const fontStacks: Record<FontStackId, FontStack> = {
  "cormorant-garamond": { variableClass: "", family: `"Cormorant Garamond", ${serifFallback}` },
  spectral: { variableClass: "", family: `Spectral, ${serifFallback}` },
  "playfair-display": { variableClass: "", family: `"Playfair Display", ${serifFallback}` },
  "eb-garamond": { variableClass: "", family: `"EB Garamond", ${serifFallback}` },
  "libre-baskerville": { variableClass: "", family: `"Libre Baskerville", ${serifFallback}` },
  fraunces: { variableClass: "", family: `Fraunces, ${serifFallback}` },
  jost: { variableClass: jost.variable, family: `var(--font-jost), ${sansFallback}` },
  karla: { variableClass: karla.variable, family: `var(--font-karla), ${sansFallback}` },
  "work-sans": {
    variableClass: workSans.variable,
    family: `var(--font-work-sans), ${sansFallback}`,
  },
  lato: { variableClass: lato.variable, family: `var(--font-lato), ${sansFallback}` },
};

/** À poser sur `<html>` : rend les polices de corps adressables par variable CSS. */
export const fontVariablesClassName = Object.values(fontStacks)
  .map((stack) => stack.variableClass)
  .filter(Boolean)
  .join(" ");
