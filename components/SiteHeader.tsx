import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="sticky top-0 z-30 border-b border-line/70 bg-paper/90 backdrop-blur">
      <div className="container-page flex h-16 items-center justify-between">
        <Link href="/" className="font-display text-xl tracking-tight">
          Oui<span className="text-accent italic">FairePart</span>
        </Link>
        <nav className="hidden items-center gap-8 text-sm text-ink-soft md:flex">
          <Link href="/catalogue" className="hover:text-ink">
            Catalogue
          </Link>
          <Link href="/studio" className="hover:text-ink">
            Studio
          </Link>
          <Link href="/invitation" className="hover:text-ink">
            Exemple publié
          </Link>
        </nav>
        <Link
          href="/catalogue"
          className="rounded-full bg-ink px-5 py-2 text-sm text-paper transition hover:bg-accent"
        >
          Découvrir
        </Link>
      </div>
    </header>
  );
}
