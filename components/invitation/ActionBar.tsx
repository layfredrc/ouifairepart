"use client";

import { useEffect, useState } from "react";
import { useMotion } from "@/components/invitation/engine/MotionRoot";
import { deriverPalette } from "@/lib/theme/palette";
import { ETIQUETTE, FEUILLE } from "@/lib/theme/tokens";
import type { TemplateDefinition } from "@/lib/types";

const items: { href: string; label: string }[] = [
  { href: "#programme", label: "Programme" },
  { href: "#lieu", label: "Lieu" },
  { href: "#rsvp", label: "Répondre" },
  { href: "#cagnotte", label: "Cagnotte" },
];

/**
 * La barre d'ancres : des mots en petites capitales sur un filet, dans la
 * largeur de la feuille. Pas d'icônes, une invitation n'a pas d'onglets.
 * Elle n'apparaît qu'une fois la couverture dépassée : rien ne doit se
 * poser sur la première page.
 */
export function ActionBar({ template }: { template: TemplateDefinition }) {
  const { ink, paper, accent } = template.theme.palette;
  const { line } = deriverPalette(template.theme.palette);
  const [visible, setVisible] = useState(false);
  const { scrollTo } = useMotion();

  useEffect(() => {
    const surveiller = () => setVisible(window.scrollY > window.innerHeight * 0.6);
    surveiller();
    window.addEventListener("scroll", surveiller, { passive: true });
    return () => window.removeEventListener("scroll", surveiller);
  }, []);

  return (
    <nav
      aria-hidden={!visible}
      className={`fixed inset-x-0 bottom-0 z-30 backdrop-blur-md transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-full opacity-0"
      }`}
      style={{ background: `${paper}E6`, "--ofp-accent": accent } as React.CSSProperties}
    >
      <div
        className={`${FEUILLE} flex items-center justify-center gap-[clamp(1.25rem,5vw,3rem)] border-t py-3.5`}
        style={{ borderColor: line }}
      >
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            onClick={(e) => {
              // Sous défilement lissé, l'ancre native ne mène nulle part :
              // le runtime défile lui-même. Sans lui, le navigateur le fait.
              if (scrollTo(item.href)) e.preventDefault();
            }}
            className={`${ETIQUETTE} transition-colors hover:text-(--ofp-accent)`}
            style={{ color: ink }}
          >
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
