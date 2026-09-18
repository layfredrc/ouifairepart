"use client";

import { useState } from "react";
import { DecorCanvas } from "@/components/invitation/decor/DecorCanvas";
import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import type { SectionVariantProps } from "@/components/invitation/engine/variantTable";
import { useRsvpStore } from "@/lib/store/useRsvpStore";

/**
 * Carte de réponse posée sur le décor du template.
 *
 * Là où `formulaire-centre` empile ses champs directement sur le papier,
 * cette variante isole le formulaire dans un objet : une carte au fond
 * papier, cernée et portée par une ombre, qui flotte sur le décor continu.
 * La carte a une tête (intitulé à gauche, question en display), un corps
 * sur deux colonnes en desktop et un pied qui porte le compteur. Le texte
 * ne touche jamais le décor : tout est sur le fond papier de la carte,
 * ce qui tient le contraste y compris sur les palettes d'ambiance Sombre.
 */
export function FormulaireEncadre({
  options,
}: SectionVariantProps<"rsvp", "formulaire-encadre">) {
  const { draft, template, theme } = useSection();
  const { accent, ink, paper } = theme.palette;
  const { full } = theme;
  const { entries, addEntry } = useRsvpStore();
  const [reponse, setReponse] = useState<"present" | "absent">("present");
  const [submitted, setSubmitted] = useState(false);

  const pleine = full && options.hauteur === "pleine";

  const totalPresent = entries
    .filter((e) => e.reponse === "present")
    .reduce((sum, e) => sum + e.personnes, 0);

  const champClass = `w-full ${theme.radius.champ} border px-3.5 py-2.5 text-sm outline-none focus-visible:outline-2 focus-visible:outline-offset-2`;
  const champStyle = { borderColor: `${accent}55`, background: paper, color: ink, outlineColor: accent };
  const etiquetteClass = "ofp-body block text-[0.65rem] uppercase tracking-[0.2em]";
  const etiquetteStyle = { color: theme.encre("doux") };

  const entete = (
    <div
      className={`border-b ${full ? "px-7 pt-7 pb-5" : "px-4 pt-4 pb-3"}`}
      style={{ borderColor: `${accent}33` }}
    >
      <p
        className={`ofp-body uppercase tracking-[0.3em] ${full ? "text-[0.65rem]" : "text-[0.5rem]"}`}
        style={{ color: accent }}
      >
        RSVP
      </p>
      <p
        className={`ofp-display mt-2 ${theme.displayStyleClass} ${theme.type("lieu")}`}
        style={{ color: ink }}
      >
        Serez-vous des nôtres&nbsp;?
      </p>
    </div>
  );

  const pied = draft.compteurPublic && (
    <p
      className={`border-t ${full ? "px-7 py-4 text-xs" : "px-4 py-3 text-[0.55rem]"}`}
      style={{ borderColor: `${accent}33`, color: theme.encre("doux") }}
    >
      {totalPresent} personne{totalPresent > 1 ? "s" : ""} déjà annoncée
      {totalPresent > 1 ? "s" : ""}
    </p>
  );

  return (
    <SectionRoot
      className={`relative overflow-hidden ${theme.gutter} ${
        pleine ? "flex min-h-[85vh] items-center py-16" : theme.space("ample")
      }`}
    >
      <DecorCanvas
        decor={template.decor}
        palette={theme.palette}
        stroke={theme.tokens.stroke}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      <div
        className={`relative mx-auto w-full border ${theme.radius.carte} ${
          full ? "max-w-lg" : "max-w-[15rem]"
        }`}
        style={{
          background: paper,
          borderColor: `${accent}55`,
          boxShadow: `0 30px 60px -30px ${ink}66, 0 2px 6px -2px ${ink}22`,
        }}
      >
        {entete}

        {!full ? (
          <p
            className="px-4 py-5 text-center text-[0.6rem]"
            style={{ color: theme.encre("discret") }}
          >
            Aperçu — le formulaire RSVP est actif sur la page publiée.
          </p>
        ) : submitted ? (
          <p className="px-7 py-8 text-sm" style={{ color: ink }}>
            Merci, votre réponse a bien été enregistrée.
          </p>
        ) : (
          <form
            className="px-7 py-6"
            onSubmit={(e) => {
              e.preventDefault();
              const data = new FormData(e.currentTarget);
              addEntry({
                nom: String(data.get("nom") || "Invité"),
                personnes: Number(data.get("personnes") || 1),
                reponse,
                message: String(data.get("message") || "") || undefined,
              });
              setSubmitted(true);
            }}
          >
            <div
              role="group"
              aria-label="Votre présence"
              className={`flex overflow-hidden border ${theme.radius.champ}`}
              style={{ borderColor: accent }}
            >
              <button
                type="button"
                aria-pressed={reponse === "present"}
                onClick={() => setReponse("present")}
                className="flex-1 px-3 py-2.5 text-sm transition"
                style={{
                  background: reponse === "present" ? accent : "transparent",
                  color: reponse === "present" ? paper : ink,
                }}
              >
                Présent·e
              </button>
              <button
                type="button"
                aria-pressed={reponse === "absent"}
                onClick={() => setReponse("absent")}
                className="flex-1 border-l px-3 py-2.5 text-sm transition"
                style={{
                  borderColor: accent,
                  background: reponse === "absent" ? ink : "transparent",
                  color: reponse === "absent" ? paper : ink,
                }}
              >
                Absent·e
              </button>
            </div>

            <div className="mt-5 grid gap-4 sm:grid-cols-[1fr_7rem]">
              <label className="space-y-1.5">
                <span className={etiquetteClass} style={etiquetteStyle}>
                  Votre nom
                </span>
                <input name="nom" required autoComplete="name" className={champClass} style={champStyle} />
              </label>
              <label className="space-y-1.5">
                <span className={etiquetteClass} style={etiquetteStyle}>
                  Personnes
                </span>
                <input
                  name="personnes"
                  type="number"
                  min={1}
                  defaultValue={1}
                  className={champClass}
                  style={champStyle}
                />
              </label>
            </div>

            <label className="mt-4 block space-y-1.5">
              <span className={etiquetteClass} style={etiquetteStyle}>
                Un mot pour les mariés
              </span>
              <textarea name="message" rows={3} className={champClass} style={champStyle} />
            </label>

            <div className="mt-6 flex justify-end">
              <button
                type="submit"
                className={`${theme.radius.pastille} px-6 py-2.5 text-sm`}
                style={{ background: ink, color: paper }}
              >
                Envoyer ma réponse&nbsp;→
              </button>
            </div>
          </form>
        )}

        {pied}
      </div>
    </SectionRoot>
  );
}
