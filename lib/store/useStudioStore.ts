"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { AddonSelection, CeremonyStep, StudioDraft } from "@/lib/types";

const defaultProgramme: CeremonyStep[] = [
  { id: "civile", label: "Cérémonie civile", heure: "14:00" },
  { id: "vin-honneur", label: "Vin d'honneur", heure: "16:00" },
  { id: "diner", label: "Dîner", heure: "19:30" },
  { id: "soiree", label: "Soirée dansante", heure: "22:00" },
];

const defaultAddons: AddonSelection = {
  langueSupplementaire: false,
  musiquePersonnelle: false,
  domainePersonnalise: false,
  exportImprimable: false,
  revisionAssistee: false,
};

const defaultDraft: StudioDraft = {
  designId: null,
  paletteId: null,
  prenom1: "",
  prenom2: "",
  dateMariage: "",
  ville: "",
  lieu: "",
  programme: defaultProgramme,
  dressCode: "",
  texteInvitation:
    "Avec la joie au cœur, nous vous invitons à célébrer notre union.",
  openingStyle: "rideau",
  animationIntensity: "normale",
  addons: defaultAddons,
  compteurPublic: true,
};

interface StudioState {
  draft: StudioDraft;
  step: number;
  setField: <K extends keyof StudioDraft>(key: K, value: StudioDraft[K]) => void;
  setAddon: (key: keyof AddonSelection, value: boolean) => void;
  setStep: (step: number) => void;
  updateProgrammeStep: (id: string, patch: Partial<CeremonyStep>) => void;
  reset: () => void;
}

export const useStudioStore = create<StudioState>()(
  persist(
    (set) => ({
      draft: defaultDraft,
      step: 0,
      setField: (key, value) =>
        set((state) => ({ draft: { ...state.draft, [key]: value } })),
      setAddon: (key, value) =>
        set((state) => ({
          draft: { ...state.draft, addons: { ...state.draft.addons, [key]: value } },
        })),
      setStep: (step) => set({ step }),
      updateProgrammeStep: (id, patch) =>
        set((state) => ({
          draft: {
            ...state.draft,
            programme: state.draft.programme.map((p) =>
              p.id === id ? { ...p, ...patch } : p
            ),
          },
        })),
      reset: () => set({ draft: defaultDraft, step: 0 }),
    }),
    { name: "ofp-studio-draft" }
  )
);
