"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { CoverArt } from "@/components/ui/CoverArt";
import { getCollection, getDesign } from "@/lib/data/designs";
import { demoDraft } from "@/lib/data/demoDraft";
import { useRsvpStore } from "@/lib/store/useRsvpStore";
import type { StudioDraft } from "@/lib/types";

interface InvitationCanvasProps {
  draft: StudioDraft;
  mode: "phone" | "full";
}

const monthsFr = [
  "janvier", "février", "mars", "avril", "mai", "juin",
  "juillet", "août", "septembre", "octobre", "novembre", "décembre",
];

function formatDate(iso: string) {
  if (!iso) return "";
  const [y, m, d] = iso.split("-").map(Number);
  if (!y || !m || !d) return iso;
  return `${d} ${monthsFr[m - 1]} ${y}`;
}

function motionProps(intensity: StudioDraft["animationIntensity"]) {
  if (intensity === "sobre") {
    return { initial: { opacity: 0 }, whileInView: { opacity: 1 }, viewport: { once: true, amount: 0.4 }, transition: { duration: 0.7 } };
  }
  if (intensity === "festive") {
    return {
      initial: { opacity: 0, y: 28, scale: 0.98 },
      whileInView: { opacity: 1, y: 0, scale: 1 },
      viewport: { once: true, amount: 0.3 },
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
    };
  }
  return {
    initial: { opacity: 0, y: 16 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, amount: 0.35 },
    transition: { duration: 0.55, ease: "easeOut" as const },
  };
}

export function InvitationCanvas({ draft, mode }: InvitationCanvasProps) {
  const design = getDesign(draft.designId ?? "") ?? getDesign(demoDraft.designId!)!;
  const collection = getCollection(design.collectionId)!;
  const { accent, ink, paper } = design.palette;
  const full = mode === "full";
  const m = motionProps(draft.animationIntensity);
  const { entries, addEntry } = useRsvpStore();
  const [reponse, setReponse] = useState<"present" | "absent" | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [copied, setCopied] = useState(false);

  const present = entries.filter((e) => e.reponse === "present");
  const totalPresent = present.reduce((sum, e) => sum + e.personnes, 0);

  const nom1 = draft.prenom1 || "Prénom";
  const nom2 = draft.prenom2 || "Prénom";

  return (
    <div
      className={full ? "w-full" : "h-full w-full overflow-y-auto scrollbar-none"}
      style={{ background: paper }}
    >
      {/* Cover */}
      <section
        className={`relative flex flex-col items-center justify-center text-center ${
          full ? "h-[92vh] min-h-[560px]" : "h-[70%]"
        }`}
      >
        <CoverArt motif={collection.motif} palette={design.palette} className="absolute inset-0 h-full w-full" />
        <div className="relative flex flex-col items-center gap-3 px-6">
          <span
            className={`font-body uppercase tracking-[0.35em] ${full ? "text-xs" : "text-[0.55rem]"}`}
            style={{ color: ink, opacity: 0.6 }}
          >
            Le mariage de
          </span>
          <span
            className={`font-display italic leading-none ${full ? "text-6xl md:text-7xl" : "text-3xl"}`}
            style={{ color: accent }}
          >
            {nom1}
          </span>
          <span className="font-display text-lg" style={{ color: ink, opacity: 0.6 }}>
            &amp;
          </span>
          <span
            className={`font-display italic leading-none ${full ? "text-6xl md:text-7xl" : "text-3xl"}`}
            style={{ color: accent }}
          >
            {nom2}
          </span>
          {draft.dateMariage && (
            <span
              className={`mt-4 uppercase tracking-[0.25em] ${full ? "text-sm" : "text-[0.6rem]"}`}
              style={{ color: ink, opacity: 0.7 }}
            >
              {formatDate(draft.dateMariage)}
            </span>
          )}
        </div>
      </section>

      {/* Quote */}
      <motion.section {...m} className={`mx-auto text-center ${full ? "max-w-xl px-6 py-20" : "px-5 py-10"}`}>
        <p className={`font-display italic ${full ? "text-2xl" : "text-sm"}`} style={{ color: ink }}>
          {draft.texteInvitation}
        </p>
      </motion.section>

      {/* Programme */}
      <motion.section {...m} id="programme" className={full ? "px-6 py-16" : "px-5 py-8"}>
        <SectionLabel accent={accent}>Programme</SectionLabel>
        <div className={`mx-auto mt-6 max-w-sm border-l ${full ? "" : ""}`} style={{ borderColor: accent + "55" }}>
          {draft.programme.map((step) => (
            <div key={step.id} className={`relative pl-6 ${full ? "pb-8" : "pb-4"}`}>
              <span
                className="absolute -left-[5px] top-1.5 h-2.5 w-2.5 rounded-full"
                style={{ background: accent }}
              />
              <p className={`font-body uppercase tracking-widest ${full ? "text-xs" : "text-[0.55rem]"}`} style={{ color: ink, opacity: 0.55 }}>
                {step.heure}
              </p>
              <p className={`font-display ${full ? "text-lg" : "text-sm"}`} style={{ color: ink }}>
                {step.label}
              </p>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Lieu */}
      <motion.section {...m} id="lieu" className={`text-center ${full ? "px-6 py-16" : "px-5 py-8"}`}>
        <SectionLabel accent={accent}>Lieu</SectionLabel>
        <p className={`mt-4 font-display ${full ? "text-2xl" : "text-base"}`} style={{ color: ink }}>
          {draft.lieu || "Lieu à confirmer"}
        </p>
        <p className="mt-1 text-sm" style={{ color: ink, opacity: 0.6 }}>
          {draft.ville}
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {["Google Maps", "Apple Plans", "Waze"].map((label) => (
            <a
              key={label}
              href="#"
              onClick={(e) => e.preventDefault()}
              className={`rounded-full border px-4 py-2 ${full ? "text-xs" : "text-[0.6rem]"}`}
              style={{ borderColor: accent + "66", color: ink }}
            >
              {label}
            </a>
          ))}
        </div>
        {draft.dressCode && (
          <p className={`mt-8 ${full ? "text-sm" : "text-[0.65rem]"}`} style={{ color: ink, opacity: 0.65 }}>
            Dress code — {draft.dressCode}
          </p>
        )}
      </motion.section>

      {/* RSVP */}
      <motion.section {...m} id="rsvp" className={full ? "px-6 py-16" : "px-5 py-8"}>
        <SectionLabel accent={accent}>RSVP</SectionLabel>
        {draft.compteurPublic && (
          <p className={`mt-3 text-center ${full ? "text-sm" : "text-[0.6rem]"}`} style={{ color: ink, opacity: 0.6 }}>
            {totalPresent} personne{totalPresent > 1 ? "s" : ""} déjà annoncée{totalPresent > 1 ? "s" : ""}
          </p>
        )}

        {!full ? (
          <div
            className="mx-auto mt-4 max-w-sm rounded-xl border px-4 py-5 text-center text-[0.6rem]"
            style={{ borderColor: accent + "44", color: ink, opacity: 0.55 }}
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
              const formEl = e.currentTarget;
              const data = new FormData(formEl);
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
              className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none"
              style={{ borderColor: accent + "44", background: paper, color: ink }}
            />
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setReponse("present")}
                className="flex-1 rounded-lg border px-4 py-2.5 text-sm transition"
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
                className="flex-1 rounded-lg border px-4 py-2.5 text-sm transition"
                style={{
                  borderColor: accent + "66",
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
              className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none"
              style={{ borderColor: accent + "44", background: paper, color: ink }}
            />
            <textarea
              name="message"
              placeholder="Un mot pour les mariés (facultatif)"
              rows={3}
              className="w-full rounded-lg border px-4 py-2.5 text-sm outline-none"
              style={{ borderColor: accent + "44", background: paper, color: ink }}
            />
            <button
              type="submit"
              className="w-full rounded-lg py-3 text-sm"
              style={{ background: ink, color: paper }}
            >
              Envoyer ma réponse
            </button>
          </form>
        )}

        {full && entries.length > 0 && (
          <div className="mx-auto mt-10 max-w-sm border-t pt-6" style={{ borderColor: accent + "33" }}>
            <p className="text-xs uppercase tracking-widest" style={{ color: ink, opacity: 0.5 }}>
              Réponses reçues
            </p>
            <ul className="mt-3 space-y-2 text-sm">
              {entries.slice(-5).reverse().map((entry) => (
                <li key={entry.id} className="flex items-center justify-between" style={{ color: ink }}>
                  <span>{entry.nom}</span>
                  <span style={{ color: entry.reponse === "present" ? accent : ink, opacity: 0.6 }}>
                    {entry.reponse === "present" ? `${entry.personnes} pers.` : "Absent·e"}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </motion.section>

      {/* Cagnotte */}
      {design.features.cagnotte && (
        <motion.section {...m} id="cagnotte" className={`text-center ${full ? "px-6 py-16" : "px-5 py-8"}`}>
          <SectionLabel accent={accent}>Cagnotte de mariage</SectionLabel>
          <p className={`mx-auto mt-3 max-w-sm ${full ? "text-sm" : "text-[0.6rem]"}`} style={{ color: ink, opacity: 0.65 }}>
            Votre présence est le plus beau des cadeaux. Pour celles et ceux
            qui le souhaitent, une cagnotte est ouverte pour notre voyage de
            noces.
          </p>
          <button
            onClick={() => {
              if (!full) return;
              navigator.clipboard?.writeText("https://ouifairepart.fr/cagnotte/demo").catch(() => {});
              setCopied(true);
              setTimeout(() => setCopied(false), 2000);
            }}
            className={`mt-5 rounded-full border px-6 py-2.5 ${full ? "text-sm" : "text-[0.6rem]"}`}
            style={{ borderColor: accent, color: ink }}
          >
            {copied ? "Lien copié ✓" : "Copier le lien de la cagnotte"}
          </button>
        </motion.section>
      )}

      {/* Contact */}
      <motion.section {...m} className={`text-center ${full ? "px-6 pb-24 pt-4" : "px-5 pb-10"}`}>
        <SectionLabel accent={accent}>Une question&nbsp;?</SectionLabel>
        <p className={`mt-3 ${full ? "text-sm" : "text-[0.6rem]"}`} style={{ color: ink, opacity: 0.65 }}>
          {nom1} &amp; {nom2} — répondent avec plaisir avant le grand jour.
        </p>
      </motion.section>
    </div>
  );
}

function SectionLabel({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <p
      className="text-center text-[0.65rem] font-body uppercase tracking-[0.3em]"
      style={{ color: accent }}
    >
      {children}
    </p>
  );
}
