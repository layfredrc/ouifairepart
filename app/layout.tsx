import type { Metadata } from "next";
import "./globals.css";

// Le prototype tourne dans un environnement sans accès garanti à Google
// Fonts : on s'appuie donc sur des piles de polices système soignées
// (serif éditoriale / sans-serif géométrique) plutôt que sur next/font.
// En production, ces piles seraient remplacées par des polices
// licenciées/auto-hébergées cohérentes avec le design system.

export const metadata: Metadata = {
  title: "OuiFairePart — Faire-part de mariage digitaux",
  description:
    "Prototype — Le faire-part qui a l'air fait pour vous, publié par vous.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
