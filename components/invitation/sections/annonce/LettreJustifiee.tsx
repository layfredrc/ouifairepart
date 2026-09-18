"use client";

import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import type { SectionVariantProps } from "@/components/invitation/engine/variantTable";
import { formatDateFr } from "@/lib/format";

/**
 * Annonce en lettre : le texte se lit au fil, justifié et coupé aux
 * règles françaises, ouvert par une lettrine qui descend sur trois
 * lignes. En tête, « Ville, le date » à droite ; au pied, les prénoms en
 * signature. Tout vient du brouillon : la lettre n'introduit aucun champ.
 */
export function LettreJustifiee({
  options,
}: SectionVariantProps<"annonce", "lettre-justifiee">) {
  const { draft, theme } = useSection();
  const { accent, ink } = theme.palette;
  const { full } = theme;
  const enTete = options.enTete ?? true;
  const signature = options.signature ?? true;

  const paragraphes = draft.texteInvitation
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean);
  if (paragraphes.length === 0) return null;

  const [premier, ...suite] = paragraphes;
  const [lettrine, ...resteDuPremier] = Array.from(premier);

  const ville = draft.ville.trim();
  const date = draft.dateMariage ? formatDateFr(draft.dateMariage) : "";
  const ligneEnTete = [ville, date && `le ${date}`].filter(Boolean).join(", ");
  const signataires = [draft.prenom1.trim(), draft.prenom2.trim()]
    .filter(Boolean)
    .join(" & ");

  const corpsClass = `ofp-body text-justify hyphens-auto ${
    full ? "text-lg leading-[1.75]" : "text-[0.7rem] leading-[1.7]"
  }`;

  return (
    <SectionRoot
      className={`mx-auto ${full ? "max-w-2xl" : ""} ${theme.gutter} ${theme.space("ample")}`}
    >
      {enTete && ligneEnTete && (
        <p
          className={`ofp-body text-right uppercase tracking-[0.25em] ${
            full ? "mb-8 text-xs" : "mb-4 text-[0.5rem]"
          }`}
          style={{ color: ink, opacity: 0.7 }}
        >
          {ligneEnTete}
        </p>
      )}

      <div lang="fr" className="flex flex-col gap-[1em]" style={{ color: ink }}>
        <p className={corpsClass}>
          <span
            className={`ofp-display ${theme.displayStyleClass} float-left mt-[0.1em] mr-[0.12em] text-[3.6em] leading-[0.8]`}
            style={{ color: accent }}
          >
            {lettrine}
          </span>
          {resteDuPremier.join("")}
        </p>
        {suite.map((paragraphe, i) => (
          <p key={i} className={corpsClass}>
            {paragraphe}
          </p>
        ))}
      </div>

      {signature && signataires && (
        <p
          className={`ofp-display ${theme.displayStyleClass} text-right ${
            full ? "mt-10 text-2xl" : "mt-5 text-base"
          }`}
          style={{ color: accent }}
        >
          {signataires}
        </p>
      )}
    </SectionRoot>
  );
}
