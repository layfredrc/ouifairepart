"use client";

import Link from "next/link";
import { PersonalizedPreview } from "@/components/ui/PersonalizedPreview";
import { getCollection } from "@/lib/data/designs";
import { useFavoritesStore } from "@/lib/store/useFavoritesStore";
import type { DesignVariant } from "@/lib/types";

export function DesignCard({ design }: { design: DesignVariant }) {
  const collection = getCollection(design.collectionId)!;
  const { isFavorite, toggle } = useFavoritesStore();
  const favorite = isFavorite(design.id);

  return (
    <div className="group relative rounded-3xl border border-line bg-paper-deep/40 p-4 transition hover:border-accent/50">
      <button
        onClick={() => toggle(design.id)}
        aria-label="Ajouter aux favoris"
        className={`absolute right-6 top-6 z-10 flex h-8 w-8 items-center justify-center rounded-full border text-sm transition ${
          favorite
            ? "border-accent bg-accent text-paper"
            : "border-line bg-paper text-ink-soft hover:border-accent hover:text-accent"
        }`}
      >
        ♥
      </button>
      <PersonalizedPreview design={design} compact className="w-full" />
      <div className="mt-4">
        <p className="text-[0.65rem] uppercase tracking-[0.2em] text-accent">
          {collection.style}
        </p>
        <h3 className="mt-1 font-display text-lg">{design.name}</h3>
        <p className="mt-1 text-xs text-ink-soft">{collection.tagline}</p>
        <div className="mt-3 flex flex-wrap gap-1.5">
          {design.features.rsvp && <Tag>RSVP</Tag>}
          {design.features.cagnotte && <Tag>Cagnotte</Tag>}
          {design.features.musique && <Tag>Musique</Tag>}
          {design.features.multilingue && <Tag>Multilingue</Tag>}
        </div>
        <Link
          href={`/design?id=${design.id}`}
          className="mt-4 block rounded-full bg-ink py-2 text-center text-sm text-paper transition group-hover:bg-accent"
        >
          Essayer ce design
        </Link>
      </div>
    </div>
  );
}

function Tag({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-line px-2.5 py-1 text-[0.6rem] uppercase tracking-wide text-ink-soft">
      {children}
    </span>
  );
}
