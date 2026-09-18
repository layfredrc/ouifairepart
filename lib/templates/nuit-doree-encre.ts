import type { TemplateDefinition } from "@/lib/types";

export const nuitDoreeEncre: TemplateDefinition = {
  id: "nuit-doree-encre",
  name: "Nuit Dorée · Encre",
  collectionId: "nuit-doree",
  style: "Contemporain",
  ambiance: "Sombre",
  theme: {
    palette: {
      id: "encre",
      name: "Encre",
      paper: "#E9E6E2",
      ink: "#100F0D",
      accent: "#566880",
      accentSoft: "#2B2E33",
    },
    typography: {
      display: "playfair-display",
      body: "work-sans",
      scale: "normale",
      displayStyle: "italique",
    },
    rhythm: "normal",
    stroke: 1,
    radius: "doux",
  },
  decor: {
    motifs: ["cadre"],
    density: "moyenne",
    parallax: true,
    anchors: ["haut", "continu"],
  },
  opening: { style: "enveloppe", duree: 700, cascadePrenoms: false },
  sections: [
    { type: "couverture", variant: "plein-cadre-centre" },
    { type: "annonce", variant: "citation-centree", reveal: { kind: "fade-up" } },
    { type: "programme", variant: "timeline-verticale", reveal: { kind: "fade-up" } },
    { type: "lieu", variant: "centre-simple", reveal: { kind: "fade-up" } },
    { type: "rsvp", variant: "formulaire-centre", reveal: { kind: "fade-up" } },
    { type: "cagnotte", variant: "bloc-centre", reveal: { kind: "fade-up" } },
    { type: "contact", variant: "signature-centree", reveal: { kind: "fade-up" } },
  ],
  features: {
    rsvp: true,
    cagnotte: true,
    musique: true,
    multilingue: false,
    planInvites: true,
  },
};
