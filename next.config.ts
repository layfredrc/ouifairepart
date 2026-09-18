import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // La feuille de style (Tailwind, ~12 ko) part avec le HTML : un aller-retour
    // de moins avant le premier rendu, sur la page que chaque invité ouvre une
    // fois, en 4G (§6).
    inlineCss: true,
  },
};

export default nextConfig;
