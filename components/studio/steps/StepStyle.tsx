"use client";

import { collections } from "@/lib/data/collections";
import { templates } from "@/lib/templates";
import { useStudioStore } from "@/lib/store/useStudioStore";
import type { AnimationIntensity, OpeningStyle } from "@/lib/types";
import { Header } from "@/components/studio/steps/StepNames";

const openingOptions: { value: OpeningStyle; label: string }[] = [
  { value: "rideau", label: "Rideau" },
  { value: "enveloppe", label: "Enveloppe" },
  { value: "fondu", label: "Fondu" },
];

const intensityOptions: { value: AnimationIntensity; label: string; text: string }[] = [
  { value: "sobre", label: "Sobre", text: "Apparitions en fondu uniquement" },
  { value: "normale", label: "Normale", text: "Un léger mouvement, discret" },
  { value: "festive", label: "Festive", text: "Plus de présence, sans excès" },
];

export function StepStyle() {
  const { draft, setField } = useStudioStore();

  return (
    <div className="space-y-8">
      <Header title="Style" text="Choisissez une palette et réglez l'intensité de l'animation." />

      <div>
        <span className="mb-3 block text-xs uppercase tracking-widest text-ink-soft">
          Collection & palette
        </span>
        <div className="space-y-4">
          {collections.map((collection) => (
            <div key={collection.id}>
              <p className="text-xs text-ink-soft">{collection.name}</p>
              <div className="mt-1.5 flex flex-wrap gap-2">
                {templates
                  .filter((t) => t.collectionId === collection.id)
                  .map((t) => {
                    const selected = t.id === draft.designId;
                    return (
                      <button
                        key={t.id}
                        title={t.name}
                        onClick={() => {
                          setField("designId", t.id);
                          setField("paletteId", t.theme.palette.id);
                        }}
                        className={`h-9 w-9 rounded-full border-2 transition ${
                          selected ? "border-ink scale-110" : "border-transparent hover:border-line"
                        }`}
                        style={{ background: t.theme.palette.accent }}
                      />
                    );
                  })}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div>
        <span className="mb-2 block text-xs uppercase tracking-widest text-ink-soft">
          Style d&rsquo;ouverture
        </span>
        <div className="flex gap-2">
          {openingOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setField("openingStyle", opt.value)}
              className={`rounded-full border px-4 py-2 text-sm transition ${
                draft.openingStyle === opt.value
                  ? "border-ink bg-ink text-paper"
                  : "border-line text-ink-soft hover:border-ink"
              }`}
            >
              {opt.label}
            </button>
          ))}
        </div>
      </div>

      <div>
        <span className="mb-2 block text-xs uppercase tracking-widest text-ink-soft">
          Intensité de l&rsquo;animation
        </span>
        <div className="grid gap-2 sm:grid-cols-3">
          {intensityOptions.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setField("animationIntensity", opt.value)}
              className={`rounded-xl border p-3 text-left transition ${
                draft.animationIntensity === opt.value
                  ? "border-accent bg-accent/10"
                  : "border-line hover:border-ink"
              }`}
            >
              <p className="text-sm">{opt.label}</p>
              <p className="mt-0.5 text-xs text-ink-soft">{opt.text}</p>
            </button>
          ))}
        </div>
      </div>

      <label className="flex items-center gap-3 text-sm">
        <input
          type="checkbox"
          checked={draft.compteurPublic}
          onChange={(e) => setField("compteurPublic", e.target.checked)}
          className="h-4 w-4 accent-[var(--accent)]"
        />
        Afficher le compteur de présence aux invités
      </label>
    </div>
  );
}
