/**
 * Calcul de contraste WCAG, partagé par le moteur et par le test de matrice.
 *
 * Le prototype atténuait le texte secondaire avec `opacity`, ce qui fait
 * passer la quasi-totalité des palettes sous 4,5:1. Le principe retenu ici :
 * une variante demande un NIVEAU d'atténuation, et le thème rend la couleur
 * la plus légère qui atteint encore le seuil. L'intention graphique est
 * conservée là où elle est conforme, jamais au-delà.
 */

export const CONTRASTE_TEXTE_COURANT = 4.5;
export const CONTRASTE_GRAND_TEXTE = 3;
/** Au-delà de cette taille, le seuil abaissé de la WCAG s'applique. */
export const GRAND_TEXTE_PX = 24;

export type Rvb = readonly [number, number, number];

export function versRvb(hex: string): Rvb {
  const brut = hex.replace("#", "");
  const large =
    brut.length === 3
      ? brut
          .split("")
          .map((c) => c + c)
          .join("")
      : brut;
  return [
    parseInt(large.slice(0, 2), 16),
    parseInt(large.slice(2, 4), 16),
    parseInt(large.slice(4, 6), 16),
  ];
}

export function versHex(rvb: Rvb): string {
  return `#${rvb.map((c) => Math.round(c).toString(16).padStart(2, "0")).join("")}`;
}

/** Aplatit une couleur semi-opaque sur son fond. */
export function melanger(premierPlan: Rvb, fond: Rvb, opacite: number): Rvb {
  return [
    premierPlan[0] * opacite + fond[0] * (1 - opacite),
    premierPlan[1] * opacite + fond[1] * (1 - opacite),
    premierPlan[2] * opacite + fond[2] * (1 - opacite),
  ];
}

export function luminance(rvb: Rvb): number {
  const [r, v, b] = rvb.map((canal) => {
    const s = canal / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * r + 0.7152 * v + 0.0722 * b;
}

export function contraste(a: Rvb, b: Rvb): number {
  const la = luminance(a);
  const lb = luminance(b);
  return (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
}

/**
 * Couleur opaque équivalant à `premierPlan` atténué sur `fond`, remontée
 * juste assez pour atteindre `seuil`. Rend le premier plan à pleine
 * opacité si même lui n'y parvient pas — le test de matrice signale alors
 * la palette.
 */
export function couleurAttenuee(
  premierPlan: string,
  fond: string,
  opaciteSouhaitee: number,
  seuil: number = CONTRASTE_TEXTE_COURANT
): string {
  const pp = versRvb(premierPlan);
  const fd = versRvb(fond);

  // Le contraste est mesuré sur la couleur QUANTIFIÉE : l'arrondi en hexa
  // 8 bits suffit à faire repasser sous le seuil une couleur théoriquement
  // conforme.
  for (let opacite = opaciteSouhaitee; opacite < 1; opacite += 0.005) {
    const hex = versHex(melanger(pp, fd, opacite));
    if (contraste(versRvb(hex), fd) >= seuil) return hex;
  }
  return versHex(pp);
}
