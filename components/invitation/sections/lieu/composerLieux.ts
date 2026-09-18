import type { CeremonyStep, StudioDraft } from "@/lib/types";

export interface LieuCompose {
  nom: string;
  /** Seul le lieu principal porte la ville : `StudioDraft` n'en a qu'une. */
  ville?: string;
  /** Étapes du programme qui s'y déroulent. */
  etapes: CeremonyStep[];
}

const normaliser = (valeur: string) => valeur.trim().toLocaleLowerCase("fr");

/**
 * Compose la liste des lieux à partir du brouillon, sans y ajouter de
 * champ : le lieu principal vient de `draft.lieu`, les autres du `lieu`
 * facultatif que porte chaque étape du programme. Une étape sans lieu
 * propre — ou au même lieu que le principal — se déroule au principal.
 * Le résultat est ordonné : le principal d'abord, puis les autres dans
 * l'ordre du programme.
 */
export function composerLieux(draft: StudioDraft): LieuCompose[] {
  const principal = draft.lieu.trim();
  const lieux: LieuCompose[] = [
    { nom: principal, ville: draft.ville.trim() || undefined, etapes: [] },
  ];

  for (const etape of draft.programme) {
    const nom = etape.lieu?.trim();
    if (!nom || normaliser(nom) === normaliser(principal)) {
      lieux[0].etapes.push(etape);
      continue;
    }
    let lieu = lieux.find((candidat) => normaliser(candidat.nom) === normaliser(nom));
    if (!lieu) {
      lieu = { nom, etapes: [] };
      lieux.push(lieu);
    }
    lieu.etapes.push(etape);
  }

  return lieux;
}
