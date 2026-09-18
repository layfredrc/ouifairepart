"use client";

import { useEffect, useRef, useState } from "react";
import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import { SectionLabel } from "@/components/invitation/sections/shared/SectionLabel";
import { useRsvpStore } from "@/lib/store/useRsvpStore";

type Reponse = "present" | "absent";
type Etape = "presence" | "champs" | "merci";

/**
 * Réponse en deux temps : la présence d'abord, les champs ensuite.
 *
 * La différence avec les deux formulaires n'est pas une mise en page mais
 * un parcours. Le premier temps ne pose qu'une question, en display, avec
 * deux réponses larges — c'est le seul geste demandé à l'invité qui lit
 * sur son téléphone. Le second temps rappelle la réponse choisie, permet
 * d'y revenir sans rien perdre, et ne demande le nombre de personnes qu'à
 * celles et ceux qui viennent. Les champs y sont soulignés plutôt
 * qu'encadrés : le registre est celui d'une lettre, pas d'un formulaire.
 */
export function DeuxTemps() {
  const { draft, theme } = useSection();
  const { accent, ink, paper } = theme.palette;
  const { full } = theme;
  const { entries, addEntry } = useRsvpStore();

  const [etape, setEtape] = useState<Etape>("presence");
  const [reponse, setReponse] = useState<Reponse | null>(null);
  const [nom, setNom] = useState("");
  const [personnes, setPersonnes] = useState(1);
  const [message, setMessage] = useState("");

  const champNom = useRef<HTMLInputElement>(null);
  const boutonOui = useRef<HTMLButtonElement>(null);
  const aNavigue = useRef(false);

  useEffect(() => {
    if (!aNavigue.current) return;
    if (etape === "champs") champNom.current?.focus();
    if (etape === "presence") boutonOui.current?.focus();
  }, [etape]);

  const choisir = (valeur: Reponse) => {
    aNavigue.current = true;
    setReponse(valeur);
    setEtape("champs");
  };

  const revenir = () => {
    aNavigue.current = true;
    setEtape("presence");
  };

  const totalPresent = entries
    .filter((e) => e.reponse === "present")
    .reduce((sum, e) => sum + e.personnes, 0);

  const questionClass = `ofp-display ${theme.displayStyleClass} ${
    full ? "text-3xl md:text-4xl" : "text-lg"
  }`;
  const choixClass = `${theme.radius.carte} border text-center transition ${
    full ? "px-8 py-5 text-base" : "px-4 py-2.5 text-[0.65rem]"
  }`;
  const ouiStyle = { background: accent, borderColor: accent, color: paper };
  const nonStyle = { borderColor: `${accent}88`, color: ink };
  const champBase =
    "border-0 border-b bg-transparent px-0 py-2 text-base outline-none focus-visible:outline-2 focus-visible:outline-offset-4";
  const champClass = `w-full ${champBase}`;
  const champStyle = { borderColor: `${accent}66`, color: ink, outlineColor: accent };
  const etiquetteClass = "ofp-body block text-[0.65rem] uppercase tracking-[0.2em]";
  const etiquetteStyle = { color: theme.encre("doux") };

  const indicateur = (numero: 1 | 2) => (
    <p
      className={`ofp-body uppercase tracking-[0.25em] ${full ? "text-[0.65rem]" : "text-[0.5rem]"}`}
      style={{ color: theme.encre("doux") }}
    >
      Étape {numero} sur 2
    </p>
  );

  return (
    <SectionRoot className={`text-center ${theme.gutter} ${theme.space("ample")}`}>
      <SectionLabel>RSVP</SectionLabel>
      {draft.compteurPublic && (
        <p
          className={`mt-3 ${full ? "text-sm" : "text-[0.6rem]"}`}
          style={{ color: theme.encre("doux") }}
        >
          {totalPresent} personne{totalPresent > 1 ? "s" : ""} déjà annoncée
          {totalPresent > 1 ? "s" : ""}
        </p>
      )}

      {!full ? (
        <div className="mx-auto mt-6 max-w-[16rem]">
          <p className={questionClass} style={{ color: ink }}>
            Serez-vous des nôtres&nbsp;?
          </p>
          <div className="mt-4 grid grid-cols-2 gap-2" aria-hidden="true">
            <span className={choixClass} style={ouiStyle}>
              Oui, avec joie
            </span>
            <span className={choixClass} style={nonStyle}>
              Non, hélas
            </span>
          </div>
          <p className="mt-4 text-[0.6rem]" style={{ color: theme.encre("discret") }}>
            Aperçu — le formulaire RSVP est actif sur la page publiée.
          </p>
        </div>
      ) : (
        <div className="mx-auto mt-8 max-w-md" aria-live="polite">
          {etape === "presence" && (
            <div className="space-y-8">
              <p className={questionClass} style={{ color: ink }}>
                Serez-vous des nôtres&nbsp;?
              </p>
              <div role="group" aria-label="Votre présence" className="grid gap-3 sm:grid-cols-2">
                <button
                  ref={boutonOui}
                  type="button"
                  onClick={() => choisir("present")}
                  className={choixClass}
                  style={ouiStyle}
                >
                  Oui, avec joie
                </button>
                <button
                  type="button"
                  onClick={() => choisir("absent")}
                  className={choixClass}
                  style={nonStyle}
                >
                  Non, hélas
                </button>
              </div>
              {indicateur(1)}
            </div>
          )}

          {etape === "champs" && reponse && (
            <form
              className="text-left"
              onSubmit={(e) => {
                e.preventDefault();
                addEntry({
                  nom: nom.trim() || "Invité",
                  personnes: reponse === "present" ? personnes : 0,
                  reponse,
                  message: message.trim() || undefined,
                });
                aNavigue.current = true;
                setEtape("merci");
              }}
            >
              <div
                className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b pb-3"
                style={{ borderColor: `${accent}66` }}
              >
                <p className={`ofp-display ${theme.displayStyleClass} text-xl`} style={{ color: ink }}>
                  {reponse === "present" ? "Vous serez présent·e" : "Vous ne pourrez pas venir"}
                </p>
                <button
                  type="button"
                  onClick={revenir}
                  className="ofp-body text-xs underline underline-offset-4"
                  style={{ color: ink }}
                >
                  ← Changer ma réponse
                </button>
              </div>

              <div className="mt-6 space-y-6">
                <label className="block space-y-1">
                  <span className={etiquetteClass} style={etiquetteStyle}>
                    Votre nom
                  </span>
                  <input
                    ref={champNom}
                    name="nom"
                    required
                    autoComplete="name"
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    className={champClass}
                    style={champStyle}
                  />
                </label>

                {reponse === "present" && (
                  <label className="block space-y-1">
                    <span className={etiquetteClass} style={etiquetteStyle}>
                      Vous serez, en tout
                    </span>
                    <div className="flex items-baseline gap-3">
                      <input
                        name="personnes"
                        type="number"
                        min={1}
                        value={personnes}
                        onChange={(e) => setPersonnes(Math.max(1, Number(e.target.value) || 1))}
                        className={`w-20 text-center ${champBase}`}
                        style={champStyle}
                      />
                      <span className="text-sm" style={{ color: theme.encre("doux") }}>
                        personne{personnes > 1 ? "s" : ""}
                      </span>
                    </div>
                  </label>
                )}

                <label className="block space-y-1">
                  <span className={etiquetteClass} style={etiquetteStyle}>
                    Un mot pour les mariés
                  </span>
                  <textarea
                    name="message"
                    rows={2}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className={champClass}
                    style={champStyle}
                  />
                </label>
              </div>

              <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
                {indicateur(2)}
                <button
                  type="submit"
                  className={`${theme.radius.pastille} px-7 py-3 text-sm`}
                  style={{ background: ink, color: paper }}
                >
                  Confirmer
                </button>
              </div>
            </form>
          )}

          {etape === "merci" && (
            <div className="space-y-3">
              <p className={questionClass} style={{ color: ink }}>
                Merci{nom.trim() ? `, ${nom.trim()}` : ""}.
              </p>
              <p className="text-sm" style={{ color: theme.encre("doux") }}>
                {reponse === "present"
                  ? "Votre présence est notée, à très vite."
                  : "Votre réponse est bien enregistrée, vous nous manquerez."}
              </p>
            </div>
          )}
        </div>
      )}
    </SectionRoot>
  );
}
