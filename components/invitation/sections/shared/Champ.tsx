"use client";

import type { InputHTMLAttributes, TextareaHTMLAttributes } from "react";
import { useSection } from "@/components/invitation/engine/SectionScope";
import { ETIQUETTE } from "@/lib/theme/tokens";

interface EtiquetteProps {
  etiquette: string;
  className?: string;
}

function useEtiquette() {
  const { theme } = useSection();
  return { className: `${ETIQUETTE} block`, style: { color: theme.encre("doux") } };
}

/** Champ de coupon-réponse : l'étiquette en petites capitales, un filet sous la saisie. */
export function Champ({
  etiquette,
  className = "",
  ...props
}: EtiquetteProps & InputHTMLAttributes<HTMLInputElement>) {
  const label = useEtiquette();
  return (
    <label className={`block ${className}`}>
      <span className={label.className} style={label.style}>
        {etiquette}
      </span>
      <input {...props} className="ofp-champ mt-1" />
    </label>
  );
}

export function ChampTexte({
  etiquette,
  className = "",
  ...props
}: EtiquetteProps & TextareaHTMLAttributes<HTMLTextAreaElement>) {
  const label = useEtiquette();
  return (
    <label className={`block ${className}`}>
      <span className={label.className} style={label.style}>
        {etiquette}
      </span>
      <textarea {...props} className="ofp-champ mt-1 resize-none" />
    </label>
  );
}

interface ChoixProps<V extends string> {
  etiquette: string;
  options: readonly { valeur: V; libelle: string }[];
  valeur: V | null;
  onChange: (valeur: V) => void;
  disabled?: boolean;
  className?: string;
}

/**
 * Un choix exclusif rendu comme sur un carton imprimé : une case carrée
 * à cocher devant chaque réponse, les réponses séparées par un filet.
 */
export function Choix<V extends string>({
  etiquette,
  options,
  valeur,
  onChange,
  disabled,
  className = "",
}: ChoixProps<V>) {
  const { theme } = useSection();
  const label = useEtiquette();

  return (
    <fieldset className={`min-w-0 border-0 p-0 ${className}`} disabled={disabled}>
      <legend className={label.className} style={label.style}>
        {etiquette}
      </legend>
      <div className="mt-1 grid @md:grid-cols-2">
        {options.map((option, index) => {
          const coche = valeur === option.valeur;
          return (
            <button
              key={option.valeur}
              type="button"
              role="radio"
              aria-checked={coche}
              onClick={() => onChange(option.valeur)}
              className={`flex items-center gap-3 border-b py-3 text-left text-base transition-colors ${
                index > 0 ? "@md:border-l @md:pl-4" : "@md:pr-4"
              }`}
              style={{ borderColor: theme.derives.lineStrong, color: theme.palette.ink }}
            >
              <span
                aria-hidden="true"
                className="flex h-4 w-4 shrink-0 items-center justify-center border"
                style={{ borderColor: theme.palette.ink }}
              >
                <span
                  className="block h-2 w-2 transition-opacity"
                  style={{ background: theme.palette.ink, opacity: coche ? 1 : 0 }}
                />
              </span>
              <span className={coche ? "ofp-display italic text-[1.1em]" : ""}>{option.libelle}</span>
            </button>
          );
        })}
      </div>
    </fieldset>
  );
}
