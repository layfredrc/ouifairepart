"use client";

import { useStudioStore } from "@/lib/store/useStudioStore";

export function StepNames() {
  const { draft, setField } = useStudioStore();

  return (
    <div className="space-y-6">
      <Header
        title="Prénoms & date"
        text="Ce sont les premières informations que verront vos invités."
      />
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Votre prénom">
          <input
            value={draft.prenom1}
            onChange={(e) => setField("prenom1", e.target.value)}
            placeholder="Camille"
            className="input"
          />
        </Field>
        <Field label="Le prénom de votre partenaire">
          <input
            value={draft.prenom2}
            onChange={(e) => setField("prenom2", e.target.value)}
            placeholder="Antoine"
            className="input"
          />
        </Field>
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Date du mariage">
          <input
            type="date"
            value={draft.dateMariage}
            onChange={(e) => setField("dateMariage", e.target.value)}
            className="input"
          />
        </Field>
        <Field label="Ville">
          <input
            value={draft.ville}
            onChange={(e) => setField("ville", e.target.value)}
            placeholder="Aix-en-Provence"
            className="input"
          />
        </Field>
      </div>
      <Field label="Un mot d'introduction">
        <textarea
          value={draft.texteInvitation}
          onChange={(e) => setField("texteInvitation", e.target.value)}
          rows={3}
          className="input"
        />
      </Field>
    </div>
  );
}

export function Header({ title, text }: { title: string; text: string }) {
  return (
    <div>
      <h2 className="font-display text-2xl">{title}</h2>
      <p className="mt-1 text-sm text-ink-soft">{text}</p>
    </div>
  );
}

export function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs uppercase tracking-widest text-ink-soft">
        {label}
      </span>
      {children}
    </label>
  );
}
