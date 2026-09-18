import { jardinSecretSauge } from "@/lib/templates/jardin-secret-sauge";
import { jardinSecretIvoire } from "@/lib/templates/jardin-secret-ivoire";
import { jardinSecretLavande } from "@/lib/templates/jardin-secret-lavande";
import { jardinSecretOlive } from "@/lib/templates/jardin-secret-olive";
import { rivieraLagon } from "@/lib/templates/riviera-lagon";
import { rivieraSable } from "@/lib/templates/riviera-sable";
import { rivieraAzur } from "@/lib/templates/riviera-azur";
import { rivieraCorail } from "@/lib/templates/riviera-corail";
import { nuitDoreeMinuit } from "@/lib/templates/nuit-doree-minuit";
import { nuitDoreeEncre } from "@/lib/templates/nuit-doree-encre";
import { nuitDoreeBordeaux } from "@/lib/templates/nuit-doree-bordeaux";
import { nuitDoreeEmeraude } from "@/lib/templates/nuit-doree-emeraude";
import { trousseauPoudre } from "@/lib/templates/trousseau-poudre";
import { trousseauMiel } from "@/lib/templates/trousseau-miel";
import { trousseauPerle } from "@/lib/templates/trousseau-perle";
import { trousseauRoseThe } from "@/lib/templates/trousseau-rose-the";
import { clairObscurGraphite } from "@/lib/templates/clair-obscur-graphite";
import { clairObscurCraie } from "@/lib/templates/clair-obscur-craie";
import { clairObscurEncreBleue } from "@/lib/templates/clair-obscur-encre-bleue";
import { clairObscurSepia } from "@/lib/templates/clair-obscur-sepia";
import { lumiereAutomneTerracotta } from "@/lib/templates/lumiere-automne-terracotta";
import { lumiereAutomneCuivre } from "@/lib/templates/lumiere-automne-cuivre";
import { lumiereAutomneBordeauxDoux } from "@/lib/templates/lumiere-automne-bordeaux-doux";
import { lumiereAutomneMoutarde } from "@/lib/templates/lumiere-automne-moutarde";
import type { TemplateDefinition } from "@/lib/types";

export const DEFAULT_TEMPLATE_ID = "jardin-secret-sauge";

/**
 * L'ordre de ce tableau est celui du catalogue. Ajouter un template,
 * c'est ajouter un fichier de données et une entrée ici — le moteur,
 * lui, ne change pas.
 */
export const templates: TemplateDefinition[] = [
  jardinSecretSauge,
  jardinSecretIvoire,
  jardinSecretLavande,
  jardinSecretOlive,
  rivieraLagon,
  rivieraSable,
  rivieraAzur,
  rivieraCorail,
  nuitDoreeMinuit,
  nuitDoreeEncre,
  nuitDoreeBordeaux,
  nuitDoreeEmeraude,
  trousseauPoudre,
  trousseauMiel,
  trousseauPerle,
  trousseauRoseThe,
  clairObscurGraphite,
  clairObscurCraie,
  clairObscurEncreBleue,
  clairObscurSepia,
  lumiereAutomneTerracotta,
  lumiereAutomneCuivre,
  lumiereAutomneBordeauxDoux,
  lumiereAutomneMoutarde,
];

export function getTemplate(id: string | null | undefined): TemplateDefinition | undefined {
  if (!id) return undefined;
  return templates.find((template) => template.id === id);
}

/** Le template du brouillon, ou celui de démonstration s'il n'y en a pas. */
export function resolveTemplate(id: string | null | undefined): TemplateDefinition {
  return getTemplate(id) ?? templates[0];
}

export function getTemplatesByCollection(collectionId: string): TemplateDefinition[] {
  return templates.filter((template) => template.collectionId === collectionId);
}
