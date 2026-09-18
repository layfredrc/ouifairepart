"use client";

import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import type { SectionVariantProps } from "@/components/invitation/engine/variantTable";
import { composerLieux, type LieuCompose } from "@/components/invitation/sections/lieu/composerLieux";
import { SectionLabel } from "@/components/invitation/sections/shared/SectionLabel";

const ITINERAIRES_PAR_DEFAUT = ["Google Maps", "Apple Plans", "Waze"] as const;

/**
 * Duo de lieux — cérémonie et réception côte à côte.
 *
 * `StudioDraft` n'a qu'un lieu, mais chaque étape du programme peut
 * porter le sien : le duo compose ses deux volets à partir de là. Le
 * volet gauche est le lieu principal, le volet droit le premier lieu
 * distinct du programme ; chacun est coiffé des étapes qui s'y
 * déroulent, pour que l'invité sache où aller à quel moment. Les volets
 * se font face de part et d'autre d'un séparateur orné ; quand la
 * largeur manque, ils s'empilent et le séparateur se couche.
 *
 * Sans lieu distinct dans le programme, le duo se dégrade en un seul
 * volet, sans séparateur ni coiffe : il ne fabrique pas de second lieu.
 */
export function DuoLieux({ options }: SectionVariantProps<"lieu", "duo-lieux">) {
  const { draft, theme } = useSection();
  const { accent, ink } = theme.palette;
  const { full } = theme;
  const itineraires = options.itineraires ?? ITINERAIRES_PAR_DEFAUT;
  const ornement = options.ornement ?? "losange";
  const dressCode = options.dressCode ?? true;

  const lieux = composerLieux(draft).slice(0, 2);
  const duo = lieux.length === 2;

  return (
    <SectionRoot className={`@container ${theme.gutter} ${theme.space("normal")}`}>
      <SectionLabel>{duo ? "Les lieux" : "Lieu"}</SectionLabel>
      <div
        className={`mx-auto grid ${full ? "mt-8" : "mt-4"} ${
          duo
            ? `grid-cols-1 gap-y-8 @lg:grid-cols-[1fr_auto_1fr] @lg:gap-y-0 ${full ? "max-w-3xl" : ""}`
            : full
              ? "max-w-md"
              : ""
        }`}
      >
        <Volet lieu={lieux[0]} coiffe={duo} itineraires={itineraires} />
        {duo && (
          <div className="flex items-center @lg:flex-col @lg:px-8" aria-hidden="true">
            <span className="h-px flex-1 @lg:h-auto @lg:w-px" style={{ background: `${accent}80` }} />
            {ornement === "losange" && (
              <span
                className={`mx-3 rotate-45 @lg:my-3 @lg:mx-0 ${full ? "h-2.5 w-2.5" : "h-2 w-2"}`}
                style={{ background: accent }}
              />
            )}
            {ornement === "esperluette" && (
              <span
                className={`ofp-display mx-3 italic leading-none @lg:my-3 @lg:mx-0 ${full ? "text-2xl" : "text-lg"}`}
                style={{ color: accent }}
              >
                &amp;
              </span>
            )}
            <span className="h-px flex-1 @lg:h-auto @lg:w-px" style={{ background: `${accent}80` }} />
          </div>
        )}
        {duo && <Volet lieu={lieux[1]} coiffe itineraires={itineraires} />}
      </div>
      {dressCode && draft.dressCode && (
        <p
          className={`text-center ${full ? "mt-10 text-sm" : "mt-5 text-[0.65rem]"}`}
          style={{ color: ink, opacity: 0.75 }}
        >
          Dress code — {draft.dressCode}
        </p>
      )}
    </SectionRoot>
  );
}

function Volet({
  lieu,
  coiffe,
  itineraires,
}: {
  lieu: LieuCompose;
  /** Coiffe le volet des étapes qui s'y déroulent. */
  coiffe: boolean;
  itineraires: readonly string[];
}) {
  const { theme } = useSection();
  const { accent, ink } = theme.palette;
  const { full } = theme;
  const etapes = coiffe ? lieu.etapes.map((etape) => etape.label).filter(Boolean) : [];

  return (
    <div className="flex flex-col items-center text-center">
      {etapes.length > 0 && (
        <p
          className={`ofp-body uppercase tracking-[0.25em] ${full ? "text-xs" : "text-[0.55rem]"}`}
          style={{ color: ink, opacity: 0.75 }}
        >
          {etapes.join(" · ")}
        </p>
      )}
      <p
        className={`ofp-display ${etapes.length > 0 ? "mt-3" : ""} ${theme.type("lieu")}`}
        style={{ color: ink }}
      >
        {lieu.nom || "Lieu à confirmer"}
      </p>
      {lieu.ville && (
        <p className={`mt-1 ${full ? "text-sm" : "text-[0.65rem]"}`} style={{ color: ink, opacity: 0.75 }}>
          {lieu.ville}
        </p>
      )}
      <div className={`flex flex-wrap justify-center gap-2 ${full ? "mt-5" : "mt-3"}`}>
        {itineraires.map((label) => (
          <a
            key={label}
            href="#"
            onClick={(e) => e.preventDefault()}
            className={`${theme.radius.pastille} border px-4 py-2 ${full ? "text-xs" : "text-[0.6rem]"}`}
            style={{ borderColor: `${accent}66`, color: ink }}
          >
            {label}
          </a>
        ))}
      </div>
    </div>
  );
}
