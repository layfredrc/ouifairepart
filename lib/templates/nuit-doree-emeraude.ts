import type { TemplateDefinition } from "@/lib/types";

export const nuitDoreeEmeraude: TemplateDefinition = {
  id: "nuit-doree-emeraude",
  name: "Nuit Dorée · Émeraude",
  collectionId: "nuit-doree",
  style: "Contemporain",
  ambiance: "Sombre",
  theme: {
    palette: {
      id: "emeraude",
      name: "Émeraude",
      paper: "#E7ECE6",
      ink: "#0E1710",
      accent: "#2F6B4F",
      accentSoft: "#1C3327",
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
    cagnotte: false,
    musique: true,
    multilingue: false,
    planInvites: true,
  },
};
