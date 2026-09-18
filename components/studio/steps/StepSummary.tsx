"use client";

import { useRouter } from "next/navigation";
import { getCollection, getDesign } from "@/lib/data/designs";
import { useStudioStore } from "@/lib/store/useStudioStore";
import type { AddonSelection } from "@/lib/types";
import { Header } from "@/components/studio/steps/StepNames";

const BASE_PRICE = 79;

const addonMeta: { key: keyof AddonSelection; label: string; price: number; text: string }[] = [
  { key: "langueSupplementaire", label: "Langue supplémentaire", price: 15, text: "Invitation traduite, affichée en parallèle" },
  { key: "musiquePersonnelle", label: "Musique personnelle", price: 9, text: "Upload de votre propre morceau" },
  { key: "domainePersonnalise", label: "Domaine personnalisé", price: 19, text: "votreprenom-et-partenaire.fr" },
  { key: "exportImprimable", label: "Export imprimable", price: 12, text: "Version PDF/carton, avec QR code" },
  { key: "revisionAssistee", label: "Révision assistée sous 48h", price: 29, text: "Un regard humain sur votre mise en page" },
];

export function StepSummary() {
  const { draft, setAddon } = useStudioStore();
  const router = useRouter();

  const design = getDesign(draft.designId ?? "");
  const collection = design ? getCollection(design.collectionId) : undefined;

  const total =
    BASE_PRICE +
    addonMeta.reduce((sum, a) => (draft.addons[a.key] ? sum + a.price : sum), 0);

  return (
    <div className="space-y-8">
      <Header title="Récapitulatif" text="Vérifiez les informations, ajoutez des options si besoin." />

      <div className="rounded-2xl border border-line bg-paper-deep/40 p-5 text-sm">
        <dl className="grid gap-2 sm:grid-cols-2">
          <Row label="Couple" value={`${draft.prenom1 || "—"} & ${draft.prenom2 || "—"}`} />
          <Row label="Date" value={draft.dateMariage || "—"} />
          <Row label="Lieu" value={draft.lieu || "—"} />
          <Row label="Collection" value={collection ? `${collection.name} · ${design?.palette.name}` : "Aucune sélectionnée"} />
        </dl>
      </div>

      <div>
        <span className="mb-2 block text-xs uppercase tracking-widest text-ink-soft">
          Options
        </span>
        <div className="space-y-2">
          {addonMeta.map((addon) => (
            <label
              key={addon.key}
              className="flex cursor-pointer items-center justify-between rounded-xl border border-line px-4 py-3 hover:border-ink"
            >
              <span className="flex items-center gap-3">
                <input
                  type="checkbox"
                  checked={draft.addons[addon.key]}
                  onChange={(e) => setAddon(addon.key, e.target.checked)}
                  className="h-4 w-4 accent-[var(--accent)]"
                />
                <span>
                  <span className="block text-sm">{addon.label}</span>
                  <span className="block text-xs text-ink-soft">{addon.text}</span>
                </span>
              </span>
              <span className="text-sm text-ink-soft">+{addon.price}€</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center justify-between rounded-xl bg-ink px-5 py-4 text-paper">
        <span className="text-sm">Total — paiement unique</span>
        <span className="font-display text-xl">{total}€</span>
      </div>

      <button
        onClick={() => router.push("/invitation")}
        disabled={!draft.designId}
        className="w-full rounded-full bg-accent py-3.5 text-sm text-paper transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
      >
        {draft.designId ? "Publier mon invitation (démo)" : "Choisissez d'abord une collection"}
      </button>
    </div>
  );
}

function Row({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-widest text-ink-soft">{label}</dt>
      <dd className="text-ink">{value}</dd>
    </div>
  );
}
