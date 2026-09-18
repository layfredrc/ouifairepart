"use client";

import { useStudioStore } from "@/lib/store/useStudioStore";
import type { CeremonyStep } from "@/lib/types";
import { Field, Header } from "@/components/studio/steps/StepNames";

export function StepVenue() {
  const { draft, setField, updateProgrammeStep } = useStudioStore();

  const addStep = () => {
    const step: CeremonyStep = {
      id: `etape-${Date.now()}`,
      label: "Nouveau moment",
      heure: "18:00",
    };
    setField("programme", [...draft.programme, step]);
  };

  const removeStep = (id: string) => {
    setField(
      "programme",
      draft.programme.filter((p) => p.id !== id)
    );
  };

  return (
    <div className="space-y-6">
      <Header
        title="Lieu & programme"
        text="Le déroulé de votre journée, tel qu'il apparaîtra sur l'invitation."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Lieu de réception">
          <input
            value={draft.lieu}
            onChange={(e) => setField("lieu", e.target.value)}
            placeholder="Domaine de la Bastide Blanche"
            className="input"
          />
        </Field>
        <Field label="Dress code">
          <input
            value={draft.dressCode}
            onChange={(e) => setField("dressCode", e.target.value)}
            placeholder="Élégant champêtre"
            className="input"
          />
        </Field>
      </div>

      <div>
        <span className="mb-2 block text-xs uppercase tracking-widest text-ink-soft">
          Programme de la journée
        </span>
        <div className="space-y-2">
          {draft.programme.map((step) => (
            <div key={step.id} className="flex items-center gap-2">
              <input
                type="time"
                value={step.heure}
                onChange={(e) => updateProgrammeStep(step.id, { heure: e.target.value })}
                className="input w-32 shrink-0"
              />
              <input
                value={step.label}
                onChange={(e) => updateProgrammeStep(step.id, { label: e.target.value })}
                className="input min-w-0 flex-1"
              />
              <button
                onClick={() => removeStep(step.id)}
                aria-label="Retirer ce moment"
                className="shrink-0 rounded-full border border-line px-2.5 py-2 text-xs text-ink-soft hover:border-accent hover:text-accent"
              >
                ✕
              </button>
            </div>
          ))}
        </div>
        <button
          onClick={addStep}
          className="mt-3 text-xs text-accent underline underline-offset-4"
        >
          + Ajouter un moment
        </button>
      </div>
    </div>
  );
}
