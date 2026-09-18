import { displayFontFiles } from "@/lib/theme/fonts";
import type { TemplateDefinition } from "@/lib/types";

/**
 * Précharge la police de titrage du template, dans le style que la
 * couverture emploie : c'est le texte le plus grand de la page, donc son
 * LCP, et sans préchargement le navigateur ne la demande qu'au premier
 * rendu, derrière tout le JavaScript. React hisse ce `<link>` dans `<head>`,
 * y compris au rendu serveur.
 */
export function FontPreload({ template }: { template: TemplateDefinition }) {
  const { display, displayStyle } = template.theme.typography;
  const fichier = displayFontFiles[display]?.[displayStyle === "italique" ? "italic" : "normal"];
  if (!fichier) return null;
  return <link rel="preload" as="font" type="font/woff2" href={fichier} crossOrigin="anonymous" />;
}
