"use client";

import { intensityProfiles, revealTweens } from "@/lib/motion/reveal";
import type { AnimationIntensity, OpeningSpec, RevealSpec } from "@/lib/types";

/**
 * Le runtime de mouvement de la route publique.
 *
 * GSAP et ses plugins n'entrent jamais dans le bundle partagé : ils sont
 * importés ici, dynamiquement, après le premier rendu et hors du chemin
 * critique (§6). Tout ce que ce module fait est une amélioration : la page
 * est complète et lisible avant qu'il ne charge, et reste telle quelle s'il
 * ne charge jamais.
 */

type Gsap = typeof import("gsap")["gsap"];
type ScrollTriggerType = typeof import("gsap/ScrollTrigger")["ScrollTrigger"];
type ScrollSmootherType = typeof import("gsap/ScrollSmoother")["ScrollSmoother"];
type SplitTextType = typeof import("gsap/SplitText")["SplitText"];

export interface InstallationOptions {
  wrapper: HTMLElement;
  content: HTMLElement;
  /** Lissage du défilement : desktop seulement, jamais au tactile (§6). */
  lisser: boolean;
}

export interface Ouverture {
  /** Saute à la fin : l'ouverture est toujours interruptible au clic. */
  terminer(): void;
}

export interface MoteurMouvement {
  installer(options: InstallationOptions): void;
  /** Défile vers une ancre (`#lieu`) ou un élément. Rend `false` si la cible n'existe pas. */
  scrollTo(cible: string | Element): boolean;
  /** Câble les révélations déclarées sous `racine`. Rend la fonction qui les défait. */
  revealer(racine: HTMLElement, intensity: AnimationIntensity): () => void;
  /** Joue l'ouverture du portail sur le voile rendu par `OpeningGate`. */
  ouvrir(voile: HTMLElement, opening: OpeningSpec, onTermine: () => void): Ouverture;
  detruire(): void;
}

let chargement: Promise<MoteurMouvement> | null = null;

/** Charge GSAP une seule fois ; les appels suivants rendent la même promesse. */
export function chargerMoteur(): Promise<MoteurMouvement> {
  chargement ??= importer();
  return chargement;
}

async function importer(): Promise<MoteurMouvement> {
  const [{ gsap }, { ScrollTrigger }, { ScrollSmoother }, { ScrollToPlugin }, { SplitText }] =
    await Promise.all([
      import("gsap"),
      import("gsap/ScrollTrigger"),
      import("gsap/ScrollSmoother"),
      import("gsap/ScrollToPlugin"),
      import("gsap/SplitText"),
    ]);
  gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin, SplitText);
  return creerMoteur(gsap, ScrollTrigger, ScrollSmoother, SplitText);
}

function creerMoteur(
  gsap: Gsap,
  ScrollTrigger: ScrollTriggerType,
  ScrollSmoother: ScrollSmootherType,
  SplitText: SplitTextType
): MoteurMouvement {
  let smoother: InstanceType<ScrollSmootherType> | null = null;

  const rafraichir = debounce(() => ScrollTrigger.refresh(), 120);

  return {
    installer({ wrapper, content, lisser }) {
      smoother?.kill();
      smoother = null;
      if (lisser) {
        smoother = ScrollSmoother.create({
          wrapper,
          content,
          smooth: 1.1,
          effects: true,
          // Le défaut : aucun lissage au tactile. On le fixe explicitement
          // pour qu'une mise à jour de la librairie ne le change pas.
          smoothTouch: false,
          normalizeScroll: false,
        });
      }
    },

    scrollTo(cible) {
      const element = typeof cible === "string" ? document.querySelector(cible) : cible;
      if (!element) return false;
      if (smoother) {
        smoother.scrollTo(element, true, "top top");
      } else {
        gsap.to(window, { duration: 0.8, ease: "power2.inOut", scrollTo: { y: element, autoKill: true } });
      }
      return true;
    },

    revealer(racine, intensity) {
      const profile = intensityProfiles[intensity];
      const sections = Array.from(racine.querySelectorAll<HTMLElement>("[data-reveal]"));
      const tweens: gsap.core.Tween[] = [];
      const seuil = window.innerHeight * 0.9;

      for (const section of sections) {
        const kind = section.dataset.reveal as RevealSpec["kind"];
        const stagger = section.dataset.stagger ? Number(section.dataset.stagger) : undefined;
        const spec: RevealSpec = { kind, stagger };
        // Une section déjà à l'écran reste telle que le serveur l'a rendue :
        // aucun clignotement au chargement, rien à révéler.
        if (section.getBoundingClientRect().top < seuil) continue;

        const { section: tween, items } = revealTweens(spec, intensity);
        const enfants = items ? Array.from(section.querySelectorAll<HTMLElement>("[data-reveal-item]")) : [];
        const trigger = { trigger: section, start: profile.start, once: true };

        if (items && enfants.length > 0) {
          tweens.push(gsap.fromTo(section, tween.from, { ...tween.to, scrollTrigger: trigger }));
          tweens.push(
            gsap.fromTo(enfants, items.from, { ...items.to, stagger: items.stagger, scrollTrigger: trigger })
          );
        } else {
          tweens.push(gsap.fromTo(section, tween.from, { ...tween.to, scrollTrigger: trigger }));
        }
      }

      // Les sections différées (`content-visibility: auto`) prennent leur
      // vraie hauteur en approchant du viewport : les déclencheurs suivent.
      racine.addEventListener("contentvisibilityautostatechange", rafraichir);
      ScrollTrigger.refresh();

      return () => {
        racine.removeEventListener("contentvisibilityautostatechange", rafraichir);
        for (const tween of tweens) {
          tween.scrollTrigger?.kill();
          tween.kill();
        }
        gsap.set(sections, { clearProps: "opacity,transform,clipPath" });
      };
    },

    ouvrir(voile, opening, onTermine) {
      const duree = opening.duree / 1000;
      const tl = gsap.timeline({ defaults: { ease: "power3.inOut" }, onComplete: onTermine });
      const contenu = voile.querySelector<HTMLElement>("[data-contenu]");
      const prenoms = voile.querySelector<HTMLElement>("[data-prenoms]");

      // La cascade sur les prénoms précède le mouvement du voile : les
      // lettres s'élèvent, puis le voile s'ouvre sur l'invitation.
      if (opening.cascadePrenoms && prenoms) {
        const split = SplitText.create(prenoms, { type: "chars" });
        tl.to(split.chars, { yPercent: -60, opacity: 0, duration: 0.45, stagger: 0.018, ease: "power2.in" }, 0);
        if (contenu) tl.to(contenu, { opacity: 0, duration: 0.3 }, 0.25);
      } else if (contenu) {
        tl.to(contenu, { opacity: 0, y: -8, duration: 0.3 }, 0);
      }

      const depart = opening.cascadePrenoms ? 0.35 : 0.1;
      switch (opening.style) {
        case "rideau": {
          tl.to(voile.querySelector("[data-volet='gauche']"), { xPercent: -100, duration: duree }, depart);
          tl.to(voile.querySelector("[data-volet='droite']"), { xPercent: 100, duration: duree }, depart);
          break;
        }
        case "enveloppe": {
          tl.to(
            voile.querySelector("[data-rabat]"),
            { rotateX: -170, transformOrigin: "top center", duration: duree * 0.55, ease: "power2.inOut" },
            depart
          );
          tl.to(voile, { yPercent: 100, duration: duree * 0.7, ease: "power3.in" }, depart + duree * 0.35);
          break;
        }
        default: {
          tl.to(voile, { autoAlpha: 0, duration: duree, ease: "power1.inOut" }, depart);
        }
      }

      return { terminer: () => tl.progress(1) };
    },

    detruire() {
      smoother?.kill();
      smoother = null;
    },
  };
}

function debounce(fn: () => void, delai: number) {
  let timer: ReturnType<typeof setTimeout> | undefined;
  return () => {
    clearTimeout(timer);
    timer = setTimeout(fn, delai);
  };
}
