"use client";

import { useEffect, useRef, useState } from "react";
import { DecorCanvas } from "@/components/invitation/decor/DecorCanvas";
import { useMotion } from "@/components/invitation/engine/MotionRoot";
import { sonInvitation } from "@/lib/motion/audio";
import { deriverPalette } from "@/lib/theme/palette";
import { ETIQUETTE, themeCssVars } from "@/lib/theme/tokens";
import type { OpeningSpec, TemplateDefinition } from "@/lib/types";

interface OpeningGateProps {
  template: TemplateDefinition;
  opening: OpeningSpec;
  prenom1: string;
  prenom2: string;
  onOpen: () => void;
}

/**
 * Délai du voile de secours (voir `globals.css`) : si l'hydratation n'a
 * pas eu lieu à ce moment-là, on ne l'annule plus, on la laisse finir.
 */
const SECOURS_MS = 6000;

/**
 * Le portail d'ouverture. Le voile couvre une invitation déjà complète
 * dans le DOM ; il ne peut jamais la masquer définitivement :
 *
 * - sans JavaScript, `<noscript>` le retire ;
 * - si le JavaScript est lent ou échoue, une animation CSS l'efface
 *   d'elle-même au bout de six secondes ;
 * - au clic, GSAP joue l'ouverture s'il est chargé, sinon une transition
 *   CSS ouvre le voile sur-le-champ.
 *
 * Le clic est aussi le geste qui déverrouille le son : la musique part
 * avec le mouvement, jamais avant.
 */
export function OpeningGate({ template, opening, prenom1, prenom2, onOpen }: OpeningGateProps) {
  const { moteur } = useMotion();
  const voileRef = useRef<HTMLDivElement>(null);
  const ouvertureRef = useRef<{ terminer(): void } | null>(null);
  const [ouvert, setOuvert] = useState(false);
  const { palette, stroke } = template.theme;
  const { accent, ink } = palette;
  const { lineStrong, paperDeep } = deriverPalette(palette);
  const italique = template.theme.typography.displayStyle === "italique";

  // Hydraté à temps : le voile attend le clic. Trop tard : il finit de
  // s'effacer en CSS et `onAnimationEnd` rend la main.
  useEffect(() => {
    if (performance.now() < SECOURS_MS - 500) {
      voileRef.current?.setAttribute("data-pret", "");
    }
  }, []);

  const ouvrir = () => {
    if (ouvert) {
      ouvertureRef.current?.terminer();
      return;
    }
    // Synchrone, dans le geste : c'est ce qui autorise la lecture audio.
    sonInvitation.demarrer();
    setOuvert(true);
    const voile = voileRef.current;
    if (moteur && voile) {
      ouvertureRef.current = moteur.ouvrir(voile, opening, onOpen);
    } else {
      window.setTimeout(onOpen, opening.duree + 200);
    }
  };

  const decor = (
    <DecorCanvas decor={template.decor} palette={palette} stroke={stroke} className="h-full w-full" />
  );

  return (
    <div
      ref={voileRef}
      data-ofp-voile=""
      data-style={opening.style}
      className={`ofp-voile ofp-root fixed inset-0 z-40 flex items-center justify-center overflow-hidden ${
        ouvert && !moteur ? "is-ouvert" : ""
      }`}
      style={{ ...themeCssVars(template.theme), "--ofp-duree": `${opening.duree}ms` } as React.CSSProperties}
      onAnimationEnd={(e) => {
        if (e.animationName === "ofp-voile-secours") onOpen();
      }}
    >
      {opening.style === "rideau" ? (
        <>
          <div data-volet="gauche" className="ofp-volet absolute inset-y-0 left-0 w-1/2 overflow-hidden">
            <div className="absolute inset-y-0 left-0 w-[200%]">{decor}</div>
          </div>
          <div data-volet="droite" className="ofp-volet absolute inset-y-0 right-0 w-1/2 overflow-hidden">
            <div className="absolute inset-y-0 right-0 w-[200%]">{decor}</div>
          </div>
        </>
      ) : (
        <div data-fond="" className="absolute inset-0">
          {decor}
        </div>
      )}

      {opening.style === "enveloppe" && (
        <div
          data-rabat=""
          aria-hidden="true"
          className="ofp-rabat absolute inset-x-0 top-0 h-[46%]"
          style={{
            background: paperDeep,
            clipPath: "polygon(0 0, 100% 0, 50% 100%)",
            boxShadow: `inset 0 -1px 0 ${lineStrong}`,
          }}
        />
      )}

      <div data-contenu="" className="relative z-10 flex flex-col items-center px-6 text-center">
        <p className={`${ETIQUETTE} flex items-center gap-4`} style={{ color: ink }}>
          <span aria-hidden="true" className="h-px w-8" style={{ background: lineStrong }} />
          Le mariage de
          <span aria-hidden="true" className="h-px w-8" style={{ background: lineStrong }} />
        </p>
        <p
          data-prenoms=""
          className={`ofp-display mt-6 text-(length:--ofp-t-prenoms) leading-[0.92] ${italique ? "italic" : ""}`}
          style={{ color: ink }}
        >
          {prenom1 || "Prénom"}
          <span
            aria-hidden="true"
            className="block py-[0.12em] text-[0.42em] leading-none"
            style={{ color: accent }}
          >
            &amp;
          </span>
          {prenom2 || "Prénom"}
        </p>
        <button
          type="button"
          onClick={ouvrir}
          className={`${ETIQUETTE} mt-12 border-b pb-1.5 transition-colors hover:text-(--ofp-accent)`}
          style={{ color: ink, borderColor: accent }}
        >
          Ouvrir l&rsquo;invitation
        </button>
      </div>
    </div>
  );
}
