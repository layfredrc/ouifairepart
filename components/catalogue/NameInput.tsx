"use client";

import { useState } from "react";
import { useCoupleStore } from "@/lib/store/useCoupleStore";

export function NameInput() {
  const { prenom1, prenom2, setPrenoms, reset } = useCoupleStore();
  const [local1, setLocal1] = useState(prenom1);
  const [local2, setLocal2] = useState(prenom2);

  return (
    <div className="rounded-2xl border border-line bg-paper-deep/50 p-5">
      <p className="text-xs uppercase tracking-[0.25em] text-ink-soft">
        Aperçu personnalisé
      </p>
      <p className="mt-1 text-sm text-ink-soft">
        Indiquez vos prénoms pour les voir immédiatement sur chaque design du
        catalogue.
      </p>
      <div className="mt-4 flex flex-wrap items-center gap-3">
        <input
          value={local1}
          onChange={(e) => setLocal1(e.target.value)}
          placeholder="Votre prénom"
          className="w-40 rounded-full border border-line bg-paper px-4 py-2 text-sm outline-none focus:border-accent"
        />
        <span className="font-display italic text-ink-soft">&amp;</span>
        <input
          value={local2}
          onChange={(e) => setLocal2(e.target.value)}
          placeholder="Le prénom de votre partenaire"
          className="w-40 rounded-full border border-line bg-paper px-4 py-2 text-sm outline-none focus:border-accent"
        />
        <button
          onClick={() => setPrenoms(local1, local2)}
          className="rounded-full bg-ink px-5 py-2 text-sm text-paper transition hover:bg-accent"
        >
          Appliquer
        </button>
        {(prenom1 || prenom2) && (
          <button
            onClick={() => {
              setLocal1("");
              setLocal2("");
              reset();
            }}
            className="text-xs text-ink-soft underline underline-offset-4 hover:text-ink"
          >
            Réinitialiser
          </button>
        )}
      </div>
    </div>
  );
}
