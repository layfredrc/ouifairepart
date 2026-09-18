"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

interface CoupleState {
  prenom1: string;
  prenom2: string;
  setPrenoms: (prenom1: string, prenom2: string) => void;
  reset: () => void;
}

export const useCoupleStore = create<CoupleState>()(
  persist(
    (set) => ({
      prenom1: "",
      prenom2: "",
      setPrenoms: (prenom1, prenom2) => set({ prenom1, prenom2 }),
      reset: () => set({ prenom1: "", prenom2: "" }),
    }),
    { name: "ofp-couple" }
  )
);
