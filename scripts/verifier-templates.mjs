/**
 * Test de build de la matrice (§5, §8.3).
 *
 * Parcourt les templates déclarés dans lib/templates/ et vérifie les règles
 * que le typage ne peut pas porter : sections obligatoires, nombre de motifs,
 * et surtout le contraste de chaque couple texte/fond réellement rendu par les
 * variantes, sur les 24 palettes.
 *
 * L'existence des variantes n'est pas revérifiée ici : un couple
 * (type, variante) invalide ne compile pas, `tsc` en est le garde-fou.
 */

import { readdir } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";
import {
  CONTRASTE_GRAND_TEXTE,
  CONTRASTE_TEXTE_COURANT,
  GRAND_TEXTE_PX,
  contraste,
  couleurAttenuee,
  versRvb,
} from "../lib/theme/contraste.ts";

const racineTemplates = fileURLToPath(new URL("../lib/templates/", import.meta.url));

const SECTIONS_OBLIGATOIRES = ["couverture", "annonce", "lieu", "rsvp", "contact"];
const MOTIFS_MAX = 2;
/**
 * Couples texte/fond rendus par les variantes de la passe 1 sous la direction
 * artistique (docs/direction-artistique.md), relevés dans leur source. Une nouvelle variante qui introduit un couple inédit doit l'ajouter
 * ici, sinon elle n'est pas couverte.
 */
const COUPLES = [
  { role: "couverture · surtitre", texte: "ink", niveau: "doux", fond: "paper", px: 11 },
  { role: "couverture · prénoms", texte: "ink", niveau: "fort", fond: "paper", px: 44 },
  { role: "couverture · esperluette", texte: "accent", niveau: "fort", fond: "paper", px: 18 },
  { role: "couverture · pied (date, ville)", texte: "ink", niveau: "doux", fond: "paper", px: 11 },
  { role: "portail · ouvrir", texte: "ink", niveau: "fort", fond: "paper", px: 11 },
  { role: "annonce · citation", texte: "ink", niveau: "fort", fond: "paper", px: 20 },
  { role: "intitulé de section", texte: "accent", niveau: "fort", fond: "paper", px: 11 },
  { role: "programme · heure", texte: "ink", niveau: "doux", fond: "paper", px: 11 },
  { role: "programme · étape", texte: "ink", niveau: "fort", fond: "paper", px: 18 },
  { role: "programme · lieu d'étape", texte: "ink", niveau: "doux", fond: "paper", px: 15 },
  { role: "lieu · nom", texte: "ink", niveau: "fort", fond: "paper", px: 24 },
  { role: "lieu · ville", texte: "ink", niveau: "doux", fond: "paper", px: 11 },
  { role: "lieu · itinéraires", texte: "ink", niveau: "fort", fond: "paper", px: 15 },
  { role: "lieu · tenue", texte: "ink", niveau: "fort", fond: "paper", px: 20 },
  { role: "rsvp · question", texte: "ink", niveau: "fort", fond: "paper", px: 24 },
  { role: "rsvp · compteur", texte: "ink", niveau: "doux", fond: "paper", px: 11 },
  { role: "rsvp · étiquette de champ", texte: "ink", niveau: "doux", fond: "paper", px: 11 },
  { role: "rsvp · choix et champs", texte: "ink", niveau: "fort", fond: "paper", px: 16 },
  { role: "rsvp · envoyer", texte: "paper", niveau: "fort", fond: "ink", px: 11 },
  { role: "rsvp · réponse reçue", texte: "ink", niveau: "fort", fond: "paper", px: 15 },
  { role: "rsvp · réponse présente", texte: "accent", niveau: "fort", fond: "paper", px: 15 },
  { role: "rsvp · réponse absente", texte: "ink", niveau: "doux", fond: "paper", px: 15 },
  { role: "cagnotte · texte", texte: "ink", niveau: "fort", fond: "paper", px: 17 },
  { role: "cagnotte · bouton contour", texte: "ink", niveau: "fort", fond: "paper", px: 11 },
  { role: "contact · prénoms", texte: "ink", niveau: "fort", fond: "paper", px: 24 },
  { role: "contact · esperluette", texte: "accent", niveau: "fort", fond: "paper", px: 24 },
  { role: "contact · repère", texte: "ink", niveau: "doux", fond: "paper", px: 11 },
  { role: "contact · question", texte: "ink", niveau: "doux", fond: "paper", px: 15 },
  { role: "barre d'ancres", texte: "ink", niveau: "fort", fond: "paper", px: 11 },
];

/** Doit rester aligné sur `opacitesSouhaitees` de lib/theme/tokens.ts. */
const OPACITES = { fort: 1, doux: 0.7, discret: 0.6 };

const fichiers = (await readdir(racineTemplates))
  .filter((f) => f.endsWith(".ts") && f !== "index.ts")
  .sort();

const templates = [];
for (const fichier of fichiers) {
  const declare = await import(path.join(racineTemplates, fichier));
  const valeurs = Object.values(declare);
  if (valeurs.length !== 1) {
    throw new Error(`${fichier} doit exporter exactement un TemplateDefinition, il en exporte ${valeurs.length}.`);
  }
  templates.push({ fichier, template: valeurs[0] });
}

const erreurs = [];

for (const { fichier, template } of templates) {
  const situe = (message) => erreurs.push(`${template.id} (${fichier}) — ${message}`);

  const typesPresents = new Set(template.sections.map((s) => s.type));
  for (const obligatoire of SECTIONS_OBLIGATOIRES) {
    if (!typesPresents.has(obligatoire)) {
      situe(`section obligatoire absente : ${obligatoire}`);
    }
  }

  if (template.decor.motifs.length > MOTIFS_MAX) {
    situe(`${template.decor.motifs.length} motifs de décor, maximum ${MOTIFS_MAX}`);
  }

  if (template.opening.duree > 1200) {
    situe(`ouverture de ${template.opening.duree} ms, maximum 1200`);
  }

  const palette = template.theme.palette;
  for (const couple of COUPLES) {
    const seuil = couple.px >= GRAND_TEXTE_PX ? CONTRASTE_GRAND_TEXTE : CONTRASTE_TEXTE_COURANT;
    // Même calcul que le thème : on vérifie la couleur réellement rendue.
    const rendue = couleurAttenuee(
      palette[couple.texte],
      palette[couple.fond],
      OPACITES[couple.niveau],
      CONTRASTE_TEXTE_COURANT
    );
    const mesure = contraste(versRvb(rendue), versRvb(palette[couple.fond]));
    if (mesure < seuil) {
      situe(
        `contraste ${mesure.toFixed(2)}:1 < ${seuil}:1 — ${couple.role} ` +
          `(${couple.texte} niveau ${couple.niveau} sur ${couple.fond}, ${couple.px}px)`
      );
    }
  }
}

const nbCouples = templates.length * COUPLES.length;
console.log(
  `${templates.length} templates · ${SECTIONS_OBLIGATOIRES.length} sections obligatoires · ` +
    `${nbCouples} couples de contraste vérifiés`
);

if (erreurs.length > 0) {
  console.error(`\n${erreurs.length} violation(s) :`);
  for (const erreur of erreurs) console.error(`  ✗ ${erreur}`);
  process.exit(1);
}

console.log("Aucune violation.");
