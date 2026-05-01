import type { Gender, NumberType } from "./gameData";

export type AdjectivePosition = "before" | "after";

export interface AdjectiveForms {
  // masculin singulier, féminin singulier, masculin pluriel, féminin pluriel
  ms: string;
  fs: string;
  mp: string;
  fp: string;
  // Position relative to the noun in standard French usage
  position: AdjectivePosition;
}

export interface AdjectiveExerciseItem {
  // Phrase template with {adj} placeholder, e.g. "le {adj} chat" or "le chat {adj}"
  template: string;
  gender: Gender;
  number: NumberType;
  adjective: AdjectiveForms;
}

// Adjective dictionary — referenced by id from noun compatibility lists
const ADJ = {
  petit: { ms: "petit", fs: "petite", mp: "petits", fp: "petites", position: "before" as const },
  grand: { ms: "grand", fs: "grande", mp: "grands", fp: "grandes", position: "before" as const },
  gros: { ms: "gros", fs: "grosse", mp: "gros", fp: "grosses", position: "before" as const },
  joli: { ms: "joli", fs: "jolie", mp: "jolis", fp: "jolies", position: "before" as const },
  vieux: { ms: "vieux", fs: "vieille", mp: "vieux", fp: "vieilles", position: "before" as const },
  bon: { ms: "bon", fs: "bonne", mp: "bons", fp: "bonnes", position: "before" as const },
  beau: { ms: "beau", fs: "belle", mp: "beaux", fp: "belles", position: "before" as const },
  nouveau: { ms: "nouveau", fs: "nouvelle", mp: "nouveaux", fp: "nouvelles", position: "before" as const },
  haut: { ms: "haut", fs: "haute", mp: "hauts", fp: "hautes", position: "before" as const },
  long: { ms: "long", fs: "longue", mp: "longs", fp: "longues", position: "after" as const },
  gentil: { ms: "gentil", fs: "gentille", mp: "gentils", fp: "gentilles", position: "after" as const },
  doux: { ms: "doux", fs: "douce", mp: "doux", fp: "douces", position: "after" as const },
  heureux: { ms: "heureux", fs: "heureuse", mp: "heureux", fp: "heureuses", position: "after" as const },
  blanc: { ms: "blanc", fs: "blanche", mp: "blancs", fp: "blanches", position: "after" as const },
  vert: { ms: "vert", fs: "verte", mp: "verts", fp: "vertes", position: "after" as const },
} as const;

type AdjId = keyof typeof ADJ;

export const adjectives: AdjectiveForms[] = Object.values(ADJ);

interface NounDef {
  det: string;
  noun: string;
  // Adjectives that make sense with this noun
  adj: AdjId[];
}

interface NounEntry {
  ms: NounDef[];
  fs: NounDef[];
  mp: NounDef[];
  fp: NounDef[];
}

// Each noun is paired with adjectives that produce a meaningful phrase
const nouns: NounEntry = {
  ms: [
    { det: "le", noun: "chat", adj: ["petit", "gros", "joli", "vieux", "beau", "doux", "blanc", "heureux", "gentil"] },
    { det: "un", noun: "arbre", adj: ["petit", "grand", "gros", "joli", "vieux", "beau", "haut", "vert"] },
    { det: "le", noun: "livre", adj: ["petit", "gros", "vieux", "beau", "nouveau", "bon", "long"] },
    { det: "un", noun: "jardin", adj: ["petit", "grand", "joli", "beau", "vert"] },
    { det: "le", noun: "chien", adj: ["petit", "grand", "gros", "joli", "vieux", "beau", "doux", "blanc", "heureux", "gentil"] },
    { det: "un", noun: "chemin", adj: ["petit", "grand", "vieux", "long", "blanc"] },
    { det: "le", noun: "bateau", adj: ["petit", "grand", "gros", "joli", "vieux", "beau", "nouveau", "long", "blanc"] },
    { det: "un", noun: "crayon", adj: ["petit", "gros", "joli", "beau", "nouveau", "long", "vert", "blanc"] },
  ],
  fs: [
    { det: "la", noun: "maison", adj: ["petit", "grand", "gros", "joli", "vieux", "beau", "nouveau", "haut", "blanc"] },
    { det: "une", noun: "étoile", adj: ["petit", "grand", "gros", "joli", "beau", "blanc"] },
    { det: "la", noun: "pomme", adj: ["petit", "grand", "gros", "joli", "beau", "bon", "vert"] },
    { det: "une", noun: "fleur", adj: ["petit", "grand", "joli", "beau", "blanc", "vert"] },
    { det: "la", noun: "porte", adj: ["petit", "grand", "gros", "joli", "vieux", "beau", "nouveau", "haut", "blanc"] },
    { det: "une", noun: "rivière", adj: ["petit", "grand", "joli", "long"] },
    { det: "la", noun: "voiture", adj: ["petit", "grand", "gros", "joli", "vieux", "beau", "nouveau", "blanc"] },
    { det: "la", noun: "montagne", adj: ["petit", "grand", "gros", "joli", "vieux", "beau", "haut", "long", "blanc"] },
  ],
  mp: [
    { det: "les", noun: "chats", adj: ["petit", "gros", "joli", "vieux", "beau", "doux", "blanc", "heureux", "gentil"] },
    { det: "des", noun: "arbres", adj: ["petit", "grand", "gros", "joli", "vieux", "beau", "haut", "vert"] },
    { det: "les", noun: "livres", adj: ["petit", "gros", "vieux", "beau", "nouveau", "bon", "long"] },
    { det: "des", noun: "jardins", adj: ["petit", "grand", "joli", "beau", "vert"] },
    { det: "les", noun: "chiens", adj: ["petit", "grand", "gros", "joli", "vieux", "beau", "doux", "blanc", "heureux", "gentil"] },
    { det: "des", noun: "bateaux", adj: ["petit", "grand", "gros", "joli", "vieux", "beau", "nouveau", "long", "blanc"] },
  ],
  fp: [
    { det: "les", noun: "maisons", adj: ["petit", "grand", "gros", "joli", "vieux", "beau", "nouveau", "haut", "blanc"] },
    { det: "des", noun: "étoiles", adj: ["petit", "grand", "gros", "joli", "beau", "blanc"] },
    { det: "les", noun: "pommes", adj: ["petit", "grand", "gros", "joli", "beau", "bon", "vert"] },
    { det: "des", noun: "fleurs", adj: ["petit", "grand", "joli", "beau", "blanc", "vert"] },
    { det: "les", noun: "voitures", adj: ["petit", "grand", "gros", "joli", "vieux", "beau", "nouveau", "blanc"] },
    { det: "des", noun: "fenêtres", adj: ["petit", "grand", "gros", "joli", "vieux", "beau", "nouveau", "haut", "blanc"] },
  ],
};

// Clean stray hack from typing — ensure all adj arrays are AdjId[]
// (the maison entry above accidentally chains; normalize at runtime)
function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const combos: Array<{ key: "ms" | "fs" | "mp" | "fp"; gender: Gender; number: NumberType }> = [
  { key: "ms", gender: "masculin", number: "singulier" },
  { key: "fs", gender: "féminin", number: "singulier" },
  { key: "mp", gender: "masculin", number: "pluriel" },
  { key: "fp", gender: "féminin", number: "pluriel" },
];

// Returns true if the 4 forms of an adjective are all distinct
// (so the multiple-choice question stays unambiguous)
function hasFourDistinctForms(adj: AdjectiveForms): boolean {
  const set = new Set([adj.ms, adj.fs, adj.mp, adj.fp]);
  return set.size === 4;
}

export function generateAdjectiveExercises(count = 12): AdjectiveExerciseItem[] {
  const items: AdjectiveExerciseItem[] = [];
  for (let i = 0; i < count; i++) {
    const combo = combos[i % combos.length];
    const noun = pick(nouns[combo.key]);

    // Only keep adjectives that have 4 distinct forms (avoids duplicate buttons)
    const candidates = noun.adj
      .map((id) => ADJ[id])
      .filter(hasFourDistinctForms);

    // Fallback: if a noun has no fully-distinct adjective, allow any compatible one
    const adj = candidates.length > 0 ? pick(candidates) : pick(noun.adj.map((id) => ADJ[id]));

    const template =
      adj.position === "before"
        ? `${noun.det} {adj} ${noun.noun}`
        : `${noun.det} ${noun.noun} {adj}`;
    items.push({
      template,
      gender: combo.gender,
      number: combo.number,
      adjective: adj,
    });
  }
  return items;
}
