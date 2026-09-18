import Link from "next/link";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { HeroShowcase } from "@/components/landing/HeroShowcase";

const steps = [
  {
    title: "Choisissez une collection",
    text: "Parcourez le catalogue et voyez instantanément vos prénoms sur chaque design, sans créer de compte.",
  },
  {
    title: "Personnalisez dans le Studio",
    text: "Date, lieu, programme, palette, musique — un parcours guidé de quelques écrans, avec aperçu en temps réel.",
  },
  {
    title: "Publiez et partagez",
    text: "Un lien scrollable et animé, envoyé par WhatsApp, email ou QR code — modifiable jusqu'au jour J.",
  },
];

const proof = [
  { label: "Publication", value: "< 15 min" },
  { label: "Prix", value: "Unique, tout compris" },
  { label: "RSVP", value: "Toujours inclus" },
];

export default function LandingPage() {
  return (
    <>
      <SiteHeader />
      <main className="flex-1">
        <section className="container-page grid gap-12 py-16 md:grid-cols-2 md:items-center md:py-24">
          <div>
            <p className="mb-4 text-xs uppercase tracking-[0.3em] text-accent">
              Prototype de recherche — OuiFairePart
            </p>
            <h1 className="font-display text-4xl leading-tight md:text-5xl">
              Le faire-part qui a l&rsquo;air fait pour vous,
              <span className="italic text-accent"> publié par vous.</span>
            </h1>
            <p className="mt-6 max-w-md text-ink-soft">
              Entre le configurateur générique et l&rsquo;agence à 900€, une
              troisième voie&nbsp;: une invitation digitale scrollable et
              animée, à votre image, publiée en quelques minutes.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/catalogue"
                className="rounded-full bg-ink px-6 py-3 text-sm text-paper transition hover:bg-accent"
              >
                Découvrir le catalogue
              </Link>
              <Link
                href="/invitation"
                className="rounded-full border border-line px-6 py-3 text-sm text-ink-soft transition hover:border-ink hover:text-ink"
              >
                Voir un exemple publié
              </Link>
            </div>
            <dl className="mt-12 grid max-w-md grid-cols-3 gap-4 border-t border-line pt-6">
              {proof.map((item) => (
                <div key={item.label}>
                  <dt className="text-[0.65rem] uppercase tracking-wide text-ink-soft">
                    {item.label}
                  </dt>
                  <dd className="font-display text-lg">{item.value}</dd>
                </div>
              ))}
            </dl>
          </div>
          <HeroShowcase />
        </section>

        <section className="border-y border-line/70 bg-paper-deep/60 py-16">
          <div className="container-page">
            <h2 className="font-display text-2xl md:text-3xl">
              Comment ça marche
            </h2>
            <div className="mt-10 grid gap-8 md:grid-cols-3">
              {steps.map((step, i) => (
                <div key={step.title} className="relative rounded-2xl border border-line bg-paper p-6">
                  <span className="font-display text-3xl italic text-accent">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="mt-3 font-display text-lg">{step.title}</h3>
                  <p className="mt-2 text-sm text-ink-soft">{step.text}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="container-page py-16 text-center">
          <h2 className="font-display text-2xl md:text-3xl">
            Prêt·es à essayer&nbsp;?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-ink-soft">
            Saisissez vos prénoms dans le catalogue et regardez votre
            invitation prendre vie sur chacune de nos collections.
          </p>
          <Link
            href="/catalogue"
            className="mt-6 inline-block rounded-full bg-accent px-8 py-3 text-sm text-paper transition hover:opacity-90"
          >
            Voir le catalogue
          </Link>
        </section>
      </main>
      <SiteFooter />
    </>
  );
}
