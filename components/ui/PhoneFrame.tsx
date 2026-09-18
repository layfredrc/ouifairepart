import type { ReactNode } from "react";

interface PhoneFrameProps {
  children: ReactNode;
  className?: string;
  compact?: boolean;
}

export function PhoneFrame({ children, className = "", compact = false }: PhoneFrameProps) {
  return (
    <div
      className={`relative mx-auto overflow-hidden rounded-[2rem] border border-ink/10 bg-paper shadow-[0_20px_60px_-25px_rgba(34,28,22,0.45)] ${
        compact ? "w-full aspect-[9/16]" : "aspect-[9/17] w-[280px]"
      } ${className}`}
    >
      <div className="absolute left-1/2 top-2 z-20 h-4 w-20 -translate-x-1/2 rounded-full bg-ink/15" />
      <div className="h-full w-full overflow-hidden">{children}</div>
    </div>
  );
}
