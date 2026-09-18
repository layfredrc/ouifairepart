"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { RsvpEntry } from "@/lib/types";

const seedEntries: RsvpEntry[] = [
  {
    id: "seed-1",
    nom: "Camille & Hugo Bernard",
    personnes: 2,
    reponse: "present",
    message: "On a hâte, merci pour l'invitation !",
    soumisLe: "2026-08-02",
  },
  {
    id: "seed-2",
    nom: "Famille Rousseau",
    personnes: 4,
    reponse: "present",
    soumisLe: "2026-08-05",
  },
  {
    id: "seed-3",
    nom: "Léa Fontaine",
    personnes: 1,
    reponse: "absent",
    message: "Toutes mes félicitations, je penserai fort à vous.",
    soumisLe: "2026-08-10",
  },
];

interface RsvpState {
  entries: RsvpEntry[];
  addEntry: (entry: Omit<RsvpEntry, "id" | "soumisLe">) => void;
  reset: () => void;
}

export const useRsvpStore = create<RsvpState>()(
  persist(
    (set) => ({
      entries: seedEntries,
      addEntry: (entry) =>
        set((state) => ({
          entries: [
            ...state.entries,
            {
              ...entry,
              id: `entry-${Date.now()}`,
              soumisLe: new Date().toISOString().slice(0, 10),
            },
          ],
        })),
      reset: () => set({ entries: seedEntries }),
    }),
    { name: "ofp-rsvp" }
  )
);
