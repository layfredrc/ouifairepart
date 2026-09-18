"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { DecorCanvas } from "@/components/invitation/decor/DecorCanvas";
import { PersonalizedPreview } from "@/components/ui/PersonalizedPreview";
import { getCollection } from "@/lib/data/collections";
import { getTemplate, getTemplatesByCollection } from "@/lib/templates";
import { useCoupleStore } from "@/lib/store/useCoupleStore";
import { useStudioStore } from "@/lib/store/useStudioStore";

export function DesignDetail() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const [selectedId, setSelectedId] = useState(id ?? "");
  const { prenom1, prenom2 } = useCoupleStore();
  const { setField } = useStudioStore();

  const template = getTemplate(selectedId) ?? getTemplate(id);

  if (!template) {
    return (
      <div className="container-page py-24 text-center">
        <p className="font-display text-2xl">Design introuvable</p>
        <p className="mt-2 text-sm text-ink-soft">
          Ce lien ne correspond à aucun design du catalogue.
        </p>
        <Link
          href="/catalogue"
          className="mt-6 inline-block rounded-full bg-ink px-6 py-3 text-sm text-paper hover:bg-accent"
        >
          Retour au catalogue
        </Link>
      </div>
    );
  }

  const collection = getCollection(template.collectionId)!;
  const variants = getTemplatesByCollection(template.collectionId);

  const handlePersonalize = () => {
    setField("designId", template.id);
    setField("paletteId", template.theme.palette.id);
    if (prenom1) setField("prenom1", prenom1);
    if (prenom2) setField("prenom2", prenom2);
    router.push("/studio");
  };

  return (
    <div className="container-page py-12">
      <Link href="/catalogue" className="text-xs text-ink-soft hover:text-ink">
        ← Retour au catalogue
      </Link>

      <div className="mt-6 grid gap-12 lg:grid-cols-[380px_1fr]">
        <div className="mx-auto lg:mx-0">
          <PersonalizedPreview
            template={template}
            compact={false}
            date="2026-09-12"
          />
        </div>

        <div>
          <p className="text-xs uppercase tracking-[0.25em] text-accent">
            Collection {collection.name}
          </p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl">{template.name}</h1>
          <p className="mt-3 max-w-lg text-ink-soft">{collection.description}</p>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.25em] text-ink-soft">
              Palette de la collection
            </p>
            <div className="mt-3 flex flex-wrap gap-3">
              {variants.map((variant) => (
                <button
                  key={variant.id}
                  onClick={() => setSelectedId(variant.id)}
                  className={`flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs transition ${
                    variant.id === template.id
                      ? "border-ink"
                      : "border-line text-ink-soft hover:border-ink"
                  }`}
                >
                  <span
                    className="h-3 w-3 rounded-full"
                    style={{ background: variant.theme.palette.accent }}
                  />
                  {variant.theme.palette.name}
                </button>
              ))}
            </div>
          </div>

          <div className="mt-8">
            <p className="text-xs uppercase tracking-[0.25em] text-ink-soft">
              Inclus avec ce design
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-2 text-sm text-ink-soft sm:grid-cols-3">
              <FeatureRow label="RSVP" on={template.features.rsvp} />
              <FeatureRow label="Cagnotte" on={template.features.cagnotte} />
              <FeatureRow label="Musique" on={template.features.musique} />
              <FeatureRow label="Multilingue" on={template.features.multilingue} />
              <FeatureRow label="Plan des invités" on={template.features.planInvites} />
            </ul>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <button
              onClick={handlePersonalize}
              className="rounded-full bg-ink px-7 py-3 text-sm text-paper transition hover:bg-accent"
            >
              Personnaliser dans le Studio
            </button>
            <Link
              href="/invitation"
              className="rounded-full border border-line px-7 py-3 text-sm text-ink-soft transition hover:border-ink hover:text-ink"
            >
              Voir un rendu publié
            </Link>
          </div>

          <div className="mt-12 border-t border-line pt-6">
            <p className="text-xs uppercase tracking-[0.25em] text-ink-soft">
              Aperçu de la composition
            </p>
            <div className="mt-4 aspect-[4/7] w-full max-w-[180px] overflow-hidden rounded-2xl border border-line">
              <DecorCanvas
                decor={template.decor}
                palette={template.theme.palette}
                stroke={template.theme.stroke}
                className="h-full w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function FeatureRow({ label, on }: { label: string; on: boolean }) {
  return (
    <li className="flex items-center gap-2">
      <span
        className={`h-1.5 w-1.5 rounded-full ${on ? "bg-accent" : "bg-line"}`}
      />
      <span className={on ? "" : "text-ink-soft/50 line-through"}>{label}</span>
    </li>
  );
}
