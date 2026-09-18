/** Variante sans réglage : `options` n'accepte alors que l'objet vide. */
export type SansOptions = Record<string, never>;

/** Type de section dont aucune variante n'est encore écrite. */
export type AucuneVariante = Record<never, never>;
