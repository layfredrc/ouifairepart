"use client";

import type { DesignVariant } from "@/lib/types";

const items: { href: string; label: string; icon: string }[] = [
  { href: "#programme", label: "Programme", icon: "◔" },
  { href: "#lieu", label: "Lieu", icon: "⚲" },
  { href: "#rsvp", label: "RSVP", icon: "✉" },
  { href: "#cagnotte", label: "Cagnotte", icon: "♥" },
];

export function ActionBar({ design }: { design: DesignVariant }) {
  const { ink, paper, accent } = design.palette;

  return (
    <nav
      className="fixed inset-x-0 bottom-0 z-30 border-t backdrop-blur"
      style={{ background: paper + "F2", borderColor: accent + "33" }}
    >
      <div className="mx-auto flex max-w-md items-center justify-around py-2.5">
        {items.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="flex min-w-[64px] flex-col items-center gap-1 rounded-lg px-2 py-1.5 text-[0.6rem] uppercase tracking-wide transition hover:opacity-70"
            style={{ color: ink }}
          >
            <span className="text-base" style={{ color: accent }}>
              {item.icon}
            </span>
            {item.label}
          </a>
        ))}
      </div>
    </nav>
  );
}
