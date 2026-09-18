"use client";

import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";
import type { MoteurMouvement } from "@/lib/motion/runtime";
import { usePrefersReducedMotion } from "@/lib/motion/usePrefersReducedMotion";
import type { AnimationIntensity } from "@/lib/types";

interface MotionContextValue {
  moteur: MoteurMouvement | null;
  /** Défile vers une ancre. Rend `false` quand le navigateur doit le faire lui-même. */
  scrollTo(cible: string): boolean;
}

const MotionContext = createContext<MotionContextValue>({ moteur: null, scrollTo: () => false });

export function useMotion(): MotionContextValue {
  return useContext(MotionContext);
}

/** Écran large et pointeur fin : le seul cas où le défilement est lissé. */
const DESKTOP = "(min-width: 64rem) and (pointer: fine)";

interface MotionRootProps {
  children: ReactNode;
  /** Éléments fixes (portail, barre d'ancres) : hors du contenu lissé. */
  fixes?: ReactNode;
  intensity: AnimationIntensity;
  /** Change quand le contenu défilant est remplacé : les révélations sont recâblées. */
  signature: string;
  background: string;
}

/**
 * Racine du mouvement de la route publique.
 *
 * Elle rend la page complète, sans rien attendre ; puis, une fois le
 * navigateur au repos après le premier rendu, elle charge GSAP et câble ce
 * qui est déclaré dans le DOM (`data-reveal`) et dans le schéma. Sous
 * `prefers-reduced-motion: reduce`, elle ne charge rien du tout.
 */
export function MotionRoot({ children, fixes, intensity, signature, background }: MotionRootProps) {
  const reduced = usePrefersReducedMotion();
  const wrapperRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [moteur, setMoteur] = useState<MoteurMouvement | null>(null);

  useEffect(() => {
    // Sous `prefers-reduced-motion`, rien n'est chargé ; si la préférence
    // change en cours de route, le nettoyage ci-dessous a déjà tout défait.
    if (reduced) return;
    let actif = true;
    let instance: MoteurMouvement | null = null;

    const demarrer = () => {
      // Le chargeur lui-même est hors du bundle de la route : sous
      // `prefers-reduced-motion`, pas un octet de mouvement n'est demandé.
      import("@/lib/motion/runtime").then(({ chargerMoteur }) => chargerMoteur()).then((m) => {
        if (!actif || !wrapperRef.current || !contentRef.current) return;
        instance = m;
        m.installer({
          wrapper: wrapperRef.current,
          content: contentRef.current,
          lisser: window.matchMedia(DESKTOP).matches,
        });
        setMoteur(m);
      });
    };

    // Après le premier rendu, et hors du chemin critique : le poids de GSAP
    // n'entre pas dans le LCP.
    const idle = "requestIdleCallback" in window;
    const handle = idle
      ? window.requestIdleCallback(demarrer, { timeout: 2500 })
      : window.setTimeout(demarrer, 300);

    return () => {
      actif = false;
      if (idle) window.cancelIdleCallback(handle);
      else window.clearTimeout(handle);
      instance?.detruire();
      setMoteur(null);
    };
  }, [reduced]);

  useEffect(() => {
    if (!moteur || !contentRef.current) return;
    return moteur.revealer(contentRef.current, intensity);
  }, [moteur, intensity, signature]);

  // L'ancre présente à l'arrivée, et celles qui changent ensuite.
  useEffect(() => {
    if (!moteur) return;
    const suivre = () => {
      if (window.location.hash) moteur.scrollTo(window.location.hash);
    };
    suivre();
    window.addEventListener("hashchange", suivre);
    return () => window.removeEventListener("hashchange", suivre);
  }, [moteur]);

  const value: MotionContextValue = {
    moteur,
    scrollTo: (cible) => (moteur ? moteur.scrollTo(cible) : false),
  };

  return (
    <MotionContext.Provider value={value}>
      <div ref={wrapperRef} className="relative min-h-screen" style={{ background }}>
        <div ref={contentRef}>{children}</div>
      </div>
      {fixes}
    </MotionContext.Provider>
  );
}
