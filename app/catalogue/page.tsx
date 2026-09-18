"use client";

import { useMemo, useState } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { NameInput } from "@/components/catalogue/NameInput";
import { DesignCard } from "@/components/catalogue/DesignCard";
import { collections } from "@/lib/data/collections";
import { templates } from "@/lib/templates";
import type { Ambiance, StyleFamily } from "@/lib/types";

const styles: StyleFamily[] = [
  "Botanique",
  "Minimaliste",
  "Contemporain",
  "Romantique",
  "Graphique",
  "Editorial",
];

const ambiances: Ambiance[] = ["Chaude", "Froide", "Neutre", "Sombre"];

type FeatureKey = "cagnotte" | "musique" | "multilingue" | "planInvites";

const featureLabels: Record<FeatureKey, string> = {
  cagnotte: "Cagnotte",
  musique: "Musique",
  multilingue: "Multilingue",
  planInvites: "Plan des invités",
};

export default function CataloguePage() {
  const [activeStyles, setActiveStyles] = useState<Set<StyleFamily>>(new Set());
  const [activeAmbiances, setActiveAmbiances] = useState<Set<Ambiance>>(new Set());
  const [activeFeatures, setActiveFeatures] = useState<Set<FeatureKey>>(new Set());

  const toggle = <T,>(set: Set<T>, value: T, setter: (s: Set<T>) => void) => {
    const next = new Set(set);
    if (next.has(value)) next.delete(value);
    else next.add(value);
    setter(next);
  };

  const filtered = useMemo(() => {
    return templates.filter((template) => {
      if (activeStyles.size && !activeStyles.has(template.style)) return false;
      if (activeAmbiances.size && !activeAmbiances.has(template.ambiance))
        return false;
      if (
        activeFeatures.size &&
        ![...activeFeatures].every((f) => template.features[f])
      )
        return false;
      return true;
    });
  }, [activeStyles, activeAmbiances, activeFeatures]);

  const hasFilters =
    activeStyles.size > 0 || activeAmbiances.size > 0 || activeFeatures.size > 0;

  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <div className="container-page py-12">
          <p className="text-xs uppercase tracking-[0.3em] text-accent">Catalogue</p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl">
            {collections.length} collections, {templates.length} déclinaisons
          </h1>
          <p className="mt-2 max-w-xl text-sm text-ink-soft">
            Chaque collection propose plusieurs palettes. Essayez, comparez,
            gardez vos favoris — rien n&rsquo;est engageant avant le Studio.
          </p>

          <div className="mt-8">
            <NameInput />
          </div>

          <div className="mt-8 grid gap-10 md:grid-cols-[220px_1fr]">
            <aside className="space-y-8">
              <FilterGroup
                title="Style"
                options={styles}
                active={activeStyles}
                onToggle={(v) => toggle(activeStyles, v, setActiveStyles)}
              />
              <FilterGroup
                title="Ambiance"
                options={ambiances}
                active={activeAmbiances}
                onToggle={(v) => toggle(activeAmbiances, v, setActiveAmbiances)}
              />
              <FilterGroup
                title="Fonctionnalités"
                options={Object.keys(featureLabels) as FeatureKey[]}
                active={activeFeatures}
                onToggle={(v) => toggle(activeFeatures, v, setActiveFeatures)}
                labels={featureLabels}
              />
              {hasFilters && (
                <button
                  onClick={() => {
                    setActiveStyles(new Set());
                    setActiveAmbiances(new Set());
                    setActiveFeatures(new Set());
                  }}
                  className="text-xs text-ink-soft underline underline-offset-4 hover:text-ink"
                >
                  Réinitialiser les filtres
                </button>
              )}
            </aside>

            <div>
              <p className="mb-4 text-xs text-ink-soft">
                {filtered.length} design{filtered.length > 1 ? "s" : ""}
              </p>
              {filtered.length === 0 ? (
                <p className="rounded-2xl border border-line bg-paper-deep/40 p-8 text-center text-sm text-ink-soft">
                  Aucun design ne correspond à cette combinaison de filtres.
                </p>
              ) : (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {filtered.map((template) => (
                    <DesignCard key={template.id} template={template} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}

function FilterGroup<T extends string>({
  title,
  options,
  active,
  onToggle,
  labels,
}: {
  title: string;
  options: T[];
  active: Set<T>;
  onToggle: (value: T) => void;
  labels?: Record<T, string>;
}) {
  return (
    <div>
      <h2 className="text-xs uppercase tracking-[0.25em] text-ink-soft">{title}</h2>
      <div className="mt-3 flex flex-col gap-2">
        {options.map((option) => (
          <button
            key={option}
            onClick={() => onToggle(option)}
            className={`flex items-center justify-between rounded-lg border px-3 py-2 text-left text-sm transition ${
              active.has(option)
                ? "border-accent bg-accent/10 text-ink"
                : "border-transparent text-ink-soft hover:border-line"
            }`}
          >
            {labels ? labels[option] : option}
            {active.has(option) && <span className="text-accent">✓</span>}
          </button>
        ))}
      </div>
    </div>
  );
}
