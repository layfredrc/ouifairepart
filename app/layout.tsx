import type { Metadata } from "next";
import { fontVariablesClassName } from "@/lib/theme/fonts";
import "./globals.css";

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
    <html lang="fr" className={`h-full antialiased ${fontVariablesClassName}`}>
      <body className="min-h-full flex flex-col bg-paper text-ink">
        {children}
      </body>
    </html>
  );
}
