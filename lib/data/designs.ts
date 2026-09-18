import type { Collection, DesignVariant, Palette } from "@/lib/types";

export const collections: Collection[] = [
  {
    id: "jardin-secret",
    name: "Jardin Secret",
    tagline: "Botanique et romantique, pour une cérémonie en pleine nature",
    style: "Botanique",
    ambiance: "Neutre",
    motif: "arche",
    description:
      "Une arche végétale dessinée en traits fins, pensée pour les mariages en extérieur et les cérémonies laïques.",
  },
  {
    id: "riviera",
    name: "Riviera",
    tagline: "Minimaliste et lumineuse, esprit bord de mer",
    style: "Minimaliste",
    ambiance: "Froide",
    motif: "onde",
    description:
      "Des lignes d'onde épurées et une palette claire pour les mariages en bord de mer ou en Méditerranée.",
  },
  {
    id: "nuit-doree",
    name: "Nuit Dorée",
    tagline: "Contemporaine et graphique, pour une soirée élégante",
    style: "Contemporain",
    ambiance: "Sombre",
    motif: "cadre",
    description:
      "Un cadre géométrique fin sur fond profond, pour les mariages en soirée et les réceptions en intérieur d'exception.",
  },
  {
    id: "trousseau",
    name: "Trousseau",
    tagline: "Romantique et poudrée, inspirée des cartes anciennes",
    style: "Romantique",
    ambiance: "Chaude",
    motif: "voute",
    description:
      "Une voûte ornementale discrète et des tons poudrés, pour un mariage au charme intemporel.",
  },
  {
    id: "clair-obscur",
    name: "Clair-Obscur",
    tagline: "Graphique et sobre, noir et blanc assumé",
    style: "Graphique",
    ambiance: "Neutre",
    motif: "diagonale",
    description:
      "Une composition diagonale minimale, pour les couples qui préfèrent la typographie aux fleurs.",
  },
  {
    id: "lumiere-automne",
    name: "Lumière d'Automne",
    tagline: "Éditoriale et chaleureuse, tons terracotta et cuivre",
    style: "Editorial",
    ambiance: "Chaude",
    motif: "semis",
    description:
      "Un semis de motifs fins sur une palette chaude, pour les mariages de fin de saison.",
  },
];

const paletteSets: Record<string, Palette[]> = {
  "jardin-secret": [
    { id: "sauge", name: "Sauge", paper: "#F6F4EC", ink: "#2B3327", accent: "#5B7355", accentSoft: "#C9D3BC" },
    { id: "ivoire", name: "Ivoire", paper: "#FBF8F1", ink: "#332C22", accent: "#876f46", accentSoft: "#E3D6BB" },
    { id: "lavande", name: "Lavande", paper: "#F6F3F6", ink: "#2E2A33", accent: "#6E5C82", accentSoft: "#D9CFE3" },
    { id: "olive", name: "Olive", paper: "#F5F2E6", ink: "#282A1E", accent: "#6B6B33", accentSoft: "#D6D4B4" },
  ],
  riviera: [
    { id: "lagon", name: "Lagon", paper: "#F3F8F7", ink: "#1D3335", accent: "#2E7A78", accentSoft: "#BFE1DE" },
    { id: "sable", name: "Sable", paper: "#FAF5EC", ink: "#33291D", accent: "#8d6730", accentSoft: "#EAD9B7" },
    { id: "azur", name: "Azur", paper: "#F1F6FA", ink: "#1B2A38", accent: "#2C6293", accentSoft: "#BFD6E8" },
    { id: "corail", name: "Corail", paper: "#FBF3EF", ink: "#3A241D", accent: "#b55239", accentSoft: "#F0C9BB" },
  ],
  "nuit-doree": [
    { id: "minuit", name: "Minuit", paper: "#EDE7DC", ink: "#14110C", accent: "#806227", accentSoft: "#3A3324" },
    { id: "encre", name: "Encre", paper: "#E9E6E2", ink: "#100F0D", accent: "#566880", accentSoft: "#2B2E33" },
    { id: "bordeaux", name: "Bordeaux", paper: "#EFE6E1", ink: "#180D0B", accent: "#7A2E32", accentSoft: "#3A1A1B" },
    { id: "emeraude", name: "Émeraude", paper: "#E7ECE6", ink: "#0E1710", accent: "#2F6B4F", accentSoft: "#1C3327" },
  ],
  trousseau: [
    { id: "poudre", name: "Poudré", paper: "#FBF2EF", ink: "#3A2A28", accent: "#a65850", accentSoft: "#EBCEC8" },
    { id: "miel", name: "Miel", paper: "#FBF4E7", ink: "#3A2E17", accent: "#936829", accentSoft: "#ECD8AE" },
    { id: "perle", name: "Perle", paper: "#F7F4F1", ink: "#2F2C28", accent: "#796f5e", accentSoft: "#DAD3C6" },
    { id: "rose-the", name: "Rosé", paper: "#FAF1F0", ink: "#372425", accent: "#a65459", accentSoft: "#E9C7C8" },
  ],
  "clair-obscur": [
    { id: "graphite", name: "Graphite", paper: "#F4F4F2", ink: "#111111", accent: "#111111", accentSoft: "#CFCFCA" },
    { id: "craie", name: "Craie", paper: "#FFFFFF", ink: "#1A1A1A", accent: "#5B5B57", accentSoft: "#E4E3DE" },
    { id: "encre-bleue", name: "Encre bleue", paper: "#F3F4F6", ink: "#151A22", accent: "#22314A", accentSoft: "#CCD3DE" },
    { id: "sepia", name: "Sépia", paper: "#F6F1E9", ink: "#231C14", accent: "#5B4632", accentSoft: "#D9CBB4" },
  ],
  "lumiere-automne": [
    { id: "terracotta", name: "Terracotta", paper: "#FAF1E9", ink: "#3B2318", accent: "#ab542f", accentSoft: "#EDC7AE" },
    { id: "cuivre", name: "Cuivre", paper: "#F9F0E4", ink: "#39281A", accent: "#976328", accentSoft: "#E7CFA9" },
    { id: "bordeaux-doux", name: "Bordeaux doux", paper: "#F8EDE9", ink: "#371C1B", accent: "#8C3C3A", accentSoft: "#E4BEBA" },
    { id: "moutarde", name: "Moutarde", paper: "#FAF2E1", ink: "#372B12", accent: "#8d6916", accentSoft: "#EBD7A0" },
  ],
};

export const designs: DesignVariant[] = collections.flatMap((collection) =>
  paletteSets[collection.id].map((palette, index) => ({
    id: `${collection.id}-${palette.id}`,
    collectionId: collection.id,
    name: `${collection.name} · ${palette.name}`,
    palette,
    features: {
      rsvp: true,
      cagnotte: index % 4 !== 3,
      musique: index % 3 !== 2,
      multilingue: index % 2 === 0,
      planInvites: collection.style === "Contemporain" || collection.style === "Editorial",
    },
  }))
);

export function getCollection(id: string): Collection | undefined {
  return collections.find((c) => c.id === id);
}

export function getDesign(id: string): DesignVariant | undefined {
  return designs.find((d) => d.id === id);
}

export function getDesignsByCollection(collectionId: string): DesignVariant[] {
  return designs.filter((d) => d.collectionId === collectionId);
}
