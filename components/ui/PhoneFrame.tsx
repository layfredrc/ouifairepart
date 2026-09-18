import type { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
  compact?: boolean;
}

/**
 * Le cadre téléphone des aperçus : un rectangle aux angles doux, un filet
 * d'encre, une ombre portée courte. Pas d'encoche dessinée : le cadre
 * suggère l'écran, il ne l'imite pas.
 */
export function PhoneFrame({ children, className = "", compact = false }: PhoneFrameProps) {
  return (
    <div
      className={`relative mx-auto overflow-hidden rounded-[1.25rem] border border-ink/15 bg-paper shadow-[0_24px_48px_-28px_rgba(34,28,22,0.5)] ${
        compact ? "w-full aspect-[9/16]" : "aspect-[9/17] w-[300px]"
      } ${className}`}
    >
      <div className="h-full w-full overflow-hidden">{children}</div>
    </div>
  );
}
