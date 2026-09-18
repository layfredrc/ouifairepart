import type { TemplateDefinition } from "@/lib/types";

export const nuitDoreeMinuit: TemplateDefinition = {
  id: "nuit-doree-minuit",
  name: "Nuit Dorée · Minuit",
  collectionId: "nuit-doree",
  style: "Contemporain",
  ambiance: "Sombre",
  theme: {
    palette: {
      id: "minuit",
      name: "Minuit",
      paper: "#EDE7DC",
      ink: "#14110C",
      accent: "#806227",
      accentSoft: "#3A3324",
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
    multilingue: true,
    planInvites: true,
  },
};
