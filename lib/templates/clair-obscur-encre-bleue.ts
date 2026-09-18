import type { TemplateDefinition } from "@/lib/types";

export const clairObscurEncreBleue: TemplateDefinition = {
  id: "clair-obscur-encre-bleue",
  name: "Clair-Obscur · Encre bleue",
  collectionId: "clair-obscur",
  style: "Graphique",
  ambiance: "Neutre",
  theme: {
    palette: {
      id: "encre-bleue",
      name: "Encre bleue",
      paper: "#F3F4F6",
      ink: "#151A22",
      accent: "#22314A",
      accentSoft: "#CCD3DE",
    },
    typography: {
      display: "libre-baskerville",
      body: "work-sans",
      scale: "normale",
      displayStyle: "italique",
    },
    rhythm: "normal",
    stroke: 1,
    radius: "doux",
  },
  decor: {
    motifs: ["diagonale"],
    density: "moyenne",
    parallax: true,
    anchors: ["haut", "continu"],
  },
  opening: { style: "fondu", duree: 700, cascadePrenoms: false },
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
    musique: false,
    multilingue: true,
    planInvites: false,
  },
};
