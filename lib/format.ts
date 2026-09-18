const moisFr = [
  "janvier",
  "février",
  "mars",
  "avril",
  "mai",
  "juin",
  "juillet",
  "août",
  "septembre",
  "octobre",
  "novembre",
  "décembre",
];

export function formatDateFr(iso: string): string {
  if (!iso) return "";
  const [annee, mois, jour] = iso.split("-").map(Number);
  if (!annee || !mois || !jour) return iso;
  return `${jour} ${moisFr[mois - 1]} ${annee}`;
}

/** `15:30` → `15 h 30`, la convention typographique française. */
export function formatHeureFr(heure: string): string {
  const match = /^(\d{1,2})[:h](\d{2})?$/.exec(heure.trim());
  if (!match) return heure;
  const minutes = match[2] ?? "00";
  return minutes === "00" ? `${match[1]} h` : `${match[1]} h ${minutes}`;
}
