// Czech typography, applied once to every content string (see typeset below).
//
//  - non-breaking space after one-letter prepositions and conjunctions (k s v z o u a i)
//  - non-breaking space between a number and the following word or unit ("5 minut", "8 900 Kč")
//  - non-breaking space inside numbers with thousand groups ("8 900") and dates ("28. 11. 2026")
//  - Czech quotes „…“ instead of straight "…"
//  - no line break inside number ranges ("2019–2023")
//  - en dash with spaces " – " instead of " - ", glued to the word before it

const NBSP = " ";

export function czTypo(input: string): string {
  let s = input;

  // Straight quotes → „…“
  s = s.replace(/"([^"]*)"/g, "„$1“");

  // Spaced hyphen or dash → en dash, with a non-breaking space before it.
  s = s.replace(/\s+[-–]\s+/g, `${NBSP}– `);

  // One-letter prepositions and conjunctions. The look-behind also matches a preceding
  // NBSP, so chains like "a v Praze" are handled in one pass.
  s = s.replace(/(?<=^|[\s („“])([ksvzouaiKSVZOUAI])\s+/g, `$1${NBSP}`);

  // Thousand groups: "8 900" → "8 900".
  s = s.replace(/(\d)\s(?=\d{3}(?!\d))/g, `$1${NBSP}`);

  // Ordinal or date numbers: "28. 11. 2026", "3. ročník".
  s = s.replace(/(\d\.)\s+(?=\d|\p{Ll})/gu, `$1${NBSP}`);

  // Number followed by a word or unit: "5 minut", "6 hodin", "8 900 Kč", "100 %".
  s = s.replace(/(\d)\s+(?=[\p{L}%])/gu, `$1${NBSP}`);

  // Number ranges "2019–2023": no line break around the dash (word joiner).
  s = s.replace(/(\d)–(\d)/g, "$1\u2060–\u2060$2");

  return s;
}

/** Keys whose values are addresses or identifiers, not prose. */
const RAW_KEYS = new Set(["href", "url", "email", "src", "id", "slug", "path", "pdf"]);

/** Applies czTypo to every string in a content object, skipping URL-like keys. */
export function typeset<T>(value: T, key?: string): T {
  if (typeof value === "string") {
    return (key && RAW_KEYS.has(key) ? value : czTypo(value)) as T;
  }
  if (Array.isArray(value)) {
    return value.map((v) => typeset(v)) as T;
  }
  if (value && typeof value === "object") {
    const out: Record<string, unknown> = {};
    for (const [k, v] of Object.entries(value)) out[k] = typeset(v, k);
    return out as T;
  }
  return value;
}

/** "28. 11. 2026" with non-breaking spaces. */
export function formatDate(date: Date): string {
  return [date.getDate() + ".", date.getMonth() + 1 + ".", date.getFullYear()].join(NBSP);
}

/** 8900 → "8 900 Kč" with non-breaking spaces. */
export function formatCzk(amount: number): string {
  const digits = String(Math.round(amount)).replace(/\B(?=(\d{3})+(?!\d))/g, NBSP);
  return `${digits}${NBSP}Kč`;
}
