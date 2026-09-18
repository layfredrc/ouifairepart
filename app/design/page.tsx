import { Suspense } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { DesignDetail } from "@/components/design/DesignDetail";

export default function DesignPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <Suspense fallback={<div className="container-page py-24 text-sm text-ink-soft">Chargement…</div>}>
          <DesignDetail />
        </Suspense>
      </main>
      <SiteFooter />
    </>
  );
}
