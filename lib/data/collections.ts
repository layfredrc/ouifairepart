import type { Collection } from "@/lib/types";

/**
 * Métadonnées éditoriales d'une collection : ce que le catalogue et la
 * fiche détail racontent. Le style, l'ambiance et la composition sont,
 * eux, portés par chaque template.
 */
export const collections: Collection[] = [
  {
    id: "jardin-secret",
    name: "Jardin Secret",
    tagline: "Botanique et romantique, pour une cérémonie en pleine nature",
    description:
      "Une arche végétale dessinée en traits fins, pensée pour les mariages en extérieur et les cérémonies laïques.",
  },
  {
    id: "riviera",
    name: "Riviera",
    tagline: "Minimaliste et lumineuse, esprit bord de mer",
    description:
      "Des lignes d'onde épurées et une palette claire pour les mariages en bord de mer ou en Méditerranée.",
  },
  {
    id: "nuit-doree",
    name: "Nuit Dorée",
    tagline: "Contemporaine et graphique, pour une soirée élégante",
    description:
      "Un cadre géométrique fin sur fond profond, pour les mariages en soirée et les réceptions en intérieur d'exception.",
  },
  {
    id: "trousseau",
    name: "Trousseau",
    tagline: "Romantique et poudrée, inspirée des cartes anciennes",
    description:
      "Une voûte ornementale discrète et des tons poudrés, pour un mariage au charme intemporel.",
  },
  {
    id: "clair-obscur",
    name: "Clair-Obscur",
    tagline: "Graphique et sobre, noir et blanc assumé",
    description:
      "Une composition diagonale minimale, pour les couples qui préfèrent la typographie aux fleurs.",
  },
  {
    id: "lumiere-automne",
    name: "Lumière d'Automne",
    tagline: "Éditoriale et chaleureuse, tons terracotta et cuivre",
    description:
      "Un semis de motifs fins sur une palette chaude, pour les mariages de fin de saison.",
  },
];

export function getCollection(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}
