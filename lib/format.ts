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
