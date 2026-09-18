"use client";

/**
 * Le son de l'invitation. Jamais d'autoplay : le clic sur « Ouvrir
 * l'invitation » est le geste utilisateur qui déverrouille l'audio, et
 * `demarrer()` doit être appelé de façon synchrone dans ce geste.
 *
 * `AudioControl` enregistre l'élément ; le portail le démarre ; le bouton
 * de coupure, toujours visible, le met en sourdine.
 */

type Ecouteur = (etat: EtatSon) => void;

export interface EtatSon {
  /** Aucune piste déclarée par le template : rien à jouer, rien à afficher. */
  disponible: boolean;
  enLecture: boolean;
  coupe: boolean;
}

let element: HTMLAudioElement | null = null;
let volumeCible = 0.4;
let etat: EtatSon = { disponible: false, enLecture: false, coupe: false };
const ecouteurs = new Set<Ecouteur>();

function publier(patch: Partial<EtatSon>) {
  etat = { ...etat, ...patch };
  for (const ecouteur of ecouteurs) ecouteur(etat);
}

export const sonInvitation = {
  enregistrer(audio: HTMLAudioElement | null, volume: number) {
    element = audio;
    volumeCible = volume;
    publier({ disponible: audio !== null, enLecture: false });
    return () => {
      if (element === audio) element = null;
      publier({ disponible: false, enLecture: false });
    };
  },

  /** À appeler dans le gestionnaire de clic, avant tout `await`. */
  demarrer() {
    if (!element || etat.coupe) return;
    element.volume = volumeCible;
    element.play().then(
      () => publier({ enLecture: true }),
      () => publier({ enLecture: false })
    );
  },

  basculer() {
    if (!element) return;
    if (etat.coupe) {
      publier({ coupe: false });
      element.volume = volumeCible;
      element.play().then(() => publier({ enLecture: true }), () => {});
    } else {
      element.pause();
      publier({ coupe: true, enLecture: false });
    }
  },

  souscrire(ecouteur: Ecouteur) {
    ecouteurs.add(ecouteur);
    return () => ecouteurs.delete(ecouteur);
  },

  etat: () => etat,
};
