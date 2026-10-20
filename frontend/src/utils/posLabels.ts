export const POS_LABELS: Record<string, string> = {
  abb: "Abbreviation",
  adj: "Adjective",
  adv: "Adverb",
  conj: "Conjunction",
  fw: "Foreign Word",
  int: "Interjection",
  n: "Noun",
  num: "Number",
  part: "Particle",
  ppm: "Postpositional Marker",
  pron: "Pronoun",
  punc: "Punctuation",
  sb: "Symbol",
  tn: "Text Number",
  v: "Verb",
};

export function getPosLabel(tag: string): string {
  return POS_LABELS[tag] ?? tag;
}

// export const POS_COLORS: Record<string, string> = {
//   abb: "bg-gray-50 border-gray-200",
//   adj: "bg-pink-50 border-pink-200",
//   adv: "bg-orange-50 border-orange-200",
//   conj: "bg-yellow-50 border-yellow-200",
//   fw: "bg-slate-50 border-slate-200",
//   int: "bg-rose-50 border-rose-200",
//   n: "bg-blue-50 border-blue-200",
//   num: "bg-cyan-50 border-cyan-200",
//   part: "bg-amber-50 border-amber-200",
//   ppm: "bg-purple-50 border-purple-200",
//   pron: "bg-violet-50 border-violet-200",
//   punc: "bg-gray-50 border-gray-200",
//   sb: "bg-neutral-50 border-neutral-200",
//   tn: "bg-teal-50 border-teal-200",
//   v: "bg-green-50 border-green-200",
// };

// export function getPosColor(tag: string): string {
//   return POS_COLORS[tag] ?? "bg-gray-50 border-gray-200";
// }
