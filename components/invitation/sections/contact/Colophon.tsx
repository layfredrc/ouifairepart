"use client";

import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import { formatDateFr } from "@/lib/format";

/**
 * Le contact en colophon.
 *
 * `signature-centree` est une note de deux lignes. Le colophon referme
 * l'invitation comme la couverture l'a ouverte : un filet sur toute la
 * largeur, les prénoms en display comme élément dominant, la date et la
 * ville en petites capitales sous eux, et, à l'opposé sur la même ligne
 * de base en desktop, l'invitation à poser ses questions. La hiérarchie
 * est inversée : la signature est le sujet, la question un détail.
 */
export function Colophon() {
  const { draft, theme } = useSection();
  const { accent, ink } = theme.palette;
  const { full } = theme;

  const nom1 = draft.prenom1 || "Prénom";
  const nom2 = draft.prenom2 || "Prénom";
  const meta = [formatDateFr(draft.dateMariage), draft.ville.trim()].filter(Boolean);

  return (
    <SectionRoot className={`${theme.gutter} ${theme.space("pied")}`}>
      <div
        className={`mx-auto border-t text-left ${
          full ? "max-w-3xl pt-8 md:grid md:grid-cols-[1fr_auto] md:items-end md:gap-x-12" : "pt-4"
        }`}
        style={{ borderColor: accent }}
      >
        <div>
          <p
            className={`ofp-display ${theme.displayStyleClass} leading-tight ${
              full ? "text-4xl md:text-5xl" : "text-xl"
            }`}
            style={{ color: ink }}
          >
            {nom1} <span style={{ color: accent }}>&amp;</span> {nom2}
          </p>
          {meta.length > 0 && (
            <p
              className={`ofp-body mt-3 uppercase tracking-[0.25em] ${
                full ? "text-xs" : "text-[0.5rem]"
              }`}
              style={{ color: ink, opacity: 0.7 }}
            >
              {meta.map((item, i) => (
                <span key={item}>
                  {i > 0 && <span aria-hidden="true"> · </span>}
                  <span className="whitespace-nowrap">{item}</span>
                </span>
              ))}
            </p>
          )}
        </div>

        <div className={`${full ? "mt-8 md:mt-0 md:text-right" : "mt-4"}`}>
          <p
            className={`ofp-body uppercase tracking-[0.3em] ${full ? "text-[0.65rem]" : "text-[0.5rem]"}`}
            style={{ color: accent }}
          >
            Une question&nbsp;?
          </p>
          <p
            className={`mt-1.5 ${full ? "text-sm" : "text-[0.6rem]"}`}
            style={{ color: ink, opacity: 0.7 }}
          >
            Nous y répondons avec plaisir avant le grand jour.
          </p>
        </div>
      </div>
    </SectionRoot>
  );
}
