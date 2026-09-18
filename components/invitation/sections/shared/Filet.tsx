"use client";

import { useSection } from "@/components/invitation/engine/SectionScope";

interface FiletProps {
  /** Ornement au centre du filet. */
  ornement?: "losange" | "point" | "aucun";
  /** Filet court, centré (une respiration), ou pleine largeur (une coupure). */
  largeur?: "court" | "pleine";
  className?: string;
}

/**
 * Le filet : un trait fin, éventuellement porté par un losange. C'est
 * l'unique ornement typographique de la charte, hors motif de décor.
 */
export function Filet({ ornement = "losange", largeur = "court", className = "" }: FiletProps) {
  const { theme } = useSection();
  const trait = { background: theme.derives.lineStrong };
  const segment =
    largeur === "court" ? "h-px w-[clamp(1.5rem,7cqi,3rem)]" : "h-px flex-1";

  return (
    <div
      aria-hidden="true"
      className={`flex items-center justify-center gap-3 ${largeur === "pleine" ? "w-full" : ""} ${className}`}
    >
      <span className={segment} style={trait} />
      {ornement === "losange" && (
        <span className="block h-1.5 w-1.5 rotate-45" style={{ background: theme.palette.accent }} />
      )}
      {ornement === "point" && (
        <span className="block h-1 w-1 rounded-full" style={{ background: theme.palette.accent }} />
      )}
      <span className={segment} style={trait} />
    </div>
  );
}
