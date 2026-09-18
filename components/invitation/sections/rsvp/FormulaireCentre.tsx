"use client";

import { useState } from "react";
import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import { SectionLabel } from "@/components/invitation/sections/shared/SectionLabel";
import { useRsvpStore } from "@/lib/store/useRsvpStore";

export function FormulaireCentre() {
  const { draft, theme } = useSection();
  const { accent, ink, paper } = theme.palette;
  const { full } = theme;
  const { entries, addEntry } = useRsvpStore();
  const [reponse, setReponse] = useState<"present" | "absent" | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const totalPresent = entries
    .filter((e) => e.reponse === "present")
    .reduce((sum, e) => sum + e.personnes, 0);

  const champClass = `w-full ${theme.radius.champ} border px-4 py-2.5 text-sm outline-none`;
  const champStyle = { borderColor: `${accent}44`, background: paper, color: ink };

  return (
    <SectionRoot className={`${theme.gutter} ${theme.space("normal")}`}>
      <SectionLabel>RSVP</SectionLabel>
      {draft.compteurPublic && (
        <p
          className={`mt-3 text-center ${full ? "text-sm" : "text-[0.6rem]"}`}
          style={{ color: ink, opacity: 0.6 }}
        >
          {totalPresent} personne{totalPresent > 1 ? "s" : ""} déjà annoncée
          {totalPresent > 1 ? "s" : ""}
        </p>
      )}

      {!full ? (
        <div
          className={`mx-auto mt-4 max-w-sm ${theme.radius.carte} border px-4 py-5 text-center text-[0.6rem]`}
          style={{ borderColor: `${accent}44`, color: ink, opacity: 0.55 }}
        >
          Aperçu — le formulaire RSVP est actif sur la page publiée.
        </div>
      ) : submitted ? (
        <p className="mx-auto mt-6 max-w-sm text-center text-sm" style={{ color: ink }}>
          Merci, votre réponse a bien été enregistrée.
        </p>
      ) : (
        <form
          className="mx-auto mt-6 max-w-sm space-y-4"
          onSubmit={(e) => {
            e.preventDefault();
            const data = new FormData(e.currentTarget);
            addEntry({
              nom: String(data.get("nom") || "Invité"),
              personnes: Number(data.get("personnes") || 1),
              reponse: reponse ?? "present",
              message: String(data.get("message") || "") || undefined,
            });
            setSubmitted(true);
          }}
        >
          <input
            name="nom"
            required
            placeholder="Votre nom"
            className={champClass}
            style={champStyle}
          />
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => setReponse("present")}
              className={`flex-1 ${theme.radius.champ} border px-4 py-2.5 text-sm transition`}
              style={{
                borderColor: accent,
                background: reponse === "present" ? accent : "transparent",
                color: reponse === "present" ? paper : ink,
              }}
            >
              Je serai présent·e
            </button>
            <button
              type="button"
              onClick={() => setReponse("absent")}
              className={`flex-1 ${theme.radius.champ} border px-4 py-2.5 text-sm transition`}
              style={{
                borderColor: `${accent}66`,
                background: reponse === "absent" ? ink : "transparent",
                color: reponse === "absent" ? paper : ink,
              }}
            >
              Je ne pourrai pas venir
            </button>
          </div>
          <input
            name="personnes"
            type="number"
            min={1}
            defaultValue={1}
            className={champClass}
            style={champStyle}
          />
          <textarea
            name="message"
            placeholder="Un mot pour les mariés (facultatif)"
            rows={3}
            className={champClass}
            style={champStyle}
          />
          <button
            type="submit"
            className={`w-full ${theme.radius.champ} py-3 text-sm`}
            style={{ background: ink, color: paper }}
          >
            Envoyer ma réponse
          </button>
        </form>
      )}

      {full && entries.length > 0 && (
        <div
          className="mx-auto mt-10 max-w-sm border-t pt-6"
          style={{ borderColor: `${accent}33` }}
        >
          <p className="text-xs uppercase tracking-widest" style={{ color: ink, opacity: 0.5 }}>
            Réponses reçues
          </p>
          <ul className="mt-3 space-y-2 text-sm">
            {entries
              .slice(-5)
              .reverse()
              .map((entry) => (
                <li
                  key={entry.id}
                  className="flex items-center justify-between"
                  style={{ color: ink }}
                >
                  <span>{entry.nom}</span>
                  <span
                    style={{
                      color: entry.reponse === "present" ? accent : ink,
                      opacity: 0.6,
                    }}
                  >
                    {entry.reponse === "present" ? `${entry.personnes} pers.` : "Absent·e"}
                  </span>
                </li>
              ))}
          </ul>
        </div>
      )}
    </SectionRoot>
  );
}
