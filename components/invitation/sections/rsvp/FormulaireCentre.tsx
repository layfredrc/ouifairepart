"use client";

import { useState } from "react";
import { SectionRoot } from "@/components/invitation/engine/SectionRoot";
import { useSection } from "@/components/invitation/engine/SectionScope";
import { Bouton } from "@/components/invitation/sections/shared/Bouton";
import { Champ, ChampTexte, Choix } from "@/components/invitation/sections/shared/Champ";
import { Intitule } from "@/components/invitation/sections/shared/Intitule";
import { useRsvpStore } from "@/lib/store/useRsvpStore";
import { COLONNE, ETIQUETTE } from "@/lib/theme/tokens";

const REPONSES = [
  { valeur: "present", libelle: "Je serai présent·e" },
  { valeur: "absent", libelle: "Je ne pourrai pas venir" },
] as const;

/**
 * Le RSVP comme un coupon-réponse : une question en titrage, deux cases
 * à cocher, des champs soulignés d'un filet, un bouton en bloc d'encre.
 * Rien d'une interface d'application : c'est le carton glissé dans
 * l'enveloppe, rendu actif.
 *
 * Dans l'aperçu téléphone du Studio, le coupon est rendu tel quel mais
 * inerte : il n'écrit jamais dans le store des réponses.
 */
export function FormulaireCentre() {
  const { draft, theme } = useSection();
  const { ink } = theme.palette;
  const { full } = theme;
  const { entries, addEntry } = useRsvpStore();
  const [reponse, setReponse] = useState<"present" | "absent" | null>(null);
  const [submitted, setSubmitted] = useState(false);

  const totalPresent = entries
    .filter((e) => e.reponse === "present")
    .reduce((sum, e) => sum + e.personnes, 0);

  return (
    <SectionRoot className={`${theme.gutter} ${theme.space("normal")}`}>
      <div className={COLONNE}>
        <Intitule>Réponse souhaitée</Intitule>
        <p
          className={`ofp-display ${theme.displayStyleClass} ${theme.type("lieu")} mt-[clamp(1.25rem,5cqi,2.25rem)] text-balance`}
          style={{ color: ink }}
        >
          Serez-vous des nôtres&nbsp;?
        </p>
        {draft.compteurPublic && (
          <p className={`${ETIQUETTE} mt-3`} style={{ color: theme.encre("doux") }}>
            {totalPresent} personne{totalPresent > 1 ? "s" : ""} déjà annoncée
            {totalPresent > 1 ? "s" : ""}
          </p>
        )}

        {submitted ? (
          <p
            className={`ofp-display ${theme.displayStyleClass} mt-[clamp(2rem,7cqi,3rem)] text-[1.25rem]`}
            style={{ color: ink }}
          >
            Merci, votre réponse est bien arrivée.
          </p>
        ) : (
          <form
            className="mt-[clamp(2rem,7cqi,3rem)] space-y-[clamp(1.25rem,5cqi,2rem)]"
            onSubmit={(e) => {
              e.preventDefault();
              if (!full) return;
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
            <Choix
              etiquette="Votre présence"
              options={REPONSES}
              valeur={reponse}
              onChange={setReponse}
              disabled={!full}
            />
            <div className="grid gap-[clamp(1.25rem,5cqi,2rem)] @sm:grid-cols-[1fr_8rem]">
              <Champ etiquette="Votre nom" name="nom" required autoComplete="name" disabled={!full} />
              <Champ
                etiquette="Personnes"
                name="personnes"
                type="number"
                min={1}
                defaultValue={1}
                inputMode="numeric"
                disabled={!full}
              />
            </div>
            <ChampTexte etiquette="Un mot pour les mariés" name="message" rows={2} disabled={!full} />
            <Bouton type="submit" large disabled={!full} className="mt-2">
              Envoyer ma réponse
            </Bouton>
          </form>
        )}

        {full && entries.length > 0 && (
          <div className="mt-[clamp(2.5rem,9cqi,4rem)]">
            <Intitule>Ils ont répondu</Intitule>
            <ul className="mt-4">
              {entries
                .slice(-5)
                .reverse()
                .map((entry) => (
                  <li
                    key={entry.id}
                    className="flex items-baseline justify-between gap-4 border-b py-2.5 text-[0.9375rem]"
                    style={{ borderColor: theme.derives.line, color: ink }}
                  >
                    <span>{entry.nom}</span>
                    <span
                      className={`ofp-display ${theme.displayStyleClass}`}
                      style={{
                        color:
                          entry.reponse === "present"
                            ? theme.accentue("fort")
                            : theme.encre("doux"),
                      }}
                    >
                      {entry.reponse === "present"
                        ? `${entry.personnes} ${entry.personnes > 1 ? "personnes" : "personne"}`
                        : "Absent·e"}
                    </span>
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </SectionRoot>
  );
}
