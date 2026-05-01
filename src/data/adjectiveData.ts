import type { Gender, NumberType } from "./gameData";

export interface AdjectiveForms {
  // masculin singulier, féminin singulier, masculin pluriel, féminin pluriel
  ms: string;
  fs: string;
  mp: string;
  fp: string;
}

export interface AdjectiveExerciseItem {
  // Phrase template with {adj} placeholder, e.g. "le {adj} chat"
  template: string;
  // Determinant + noun (used for display before/after blank)
  gender: Gender;
  number: NumberType;
  adjective: AdjectiveForms;
}

export const adjectives: AdjectiveForms[] = [
  { ms: "petit", fs: "petite", mp: "petits", fp: "petites" },
  { ms: "grand", fs: "grande", mp: "grands", fp: "grandes" },
  { ms: "gros", fs: "grosse", mp: "gros", fp: "grosses" },
  { ms: "joli", fs: "jolie", mp: "jolis", fp: "jolies" },
  { ms: "vieux", fs: "vieille", mp: "vieux", fp: "vieilles" },
  { ms: "long", fs: "longue", mp: "longs", fp: "longues" },
  { ms: "bon", fs: "bonne", mp: "bons", fp: "bonnes" },
  { ms: "beau", fs: "belle", mp: "beaux", fp: "belles" },
  { ms: "nouveau", fs: "nouvelle", mp: "nouveaux", fp: "nouvelles" },
  { ms: "gentil", fs: "gentille", mp: "gentils", fp: "gentilles" },
  { ms: "haut", fs: "haute", mp: "hauts", fp: "hautes" },
  { ms: "doux", fs: "douce", mp: "doux", fp: "douces" },
  { ms: "heureux", fs: "heureuse", mp: "heureux", fp: "heureuses" },
  { ms: "blanc", fs: "blanche", mp: "blancs", fp: "blanches" },
  { ms: "vert", fs: "verte", mp: "verts", fp: "vertes" },
];

interface NounEntry {
  ms?: { det: string; noun: string }[];
  fs?: { det: string; noun: string }[];
  mp?: { det: string; noun: string }[];
  fp?: { det: string; noun: string }[];
}

const nouns: NounEntry = {
  ms: [
    { det: "le", noun: "chat" },
    { det: "un", noun: "arbre" },
    { det: "le", noun: "livre" },
    { det: "un", noun: "jardin" },
    { det: "le", noun: "chien" },
    { det: "un", noun: "chemin" },
    { det: "le", noun: "bateau" },
    { det: "un", noun: "crayon" },
  ],
  fs: [
    { det: "la", noun: "maison" },
    { det: "une", noun: "étoile" },
    { det: "la", noun: "pomme" },
    { det: "une", noun: "fleur" },
    { det: "la", noun: "porte" },
    { det: "une", noun: "rivière" },
    { det: "la", noun: "voiture" },
    { det: "une", noun: "souris" },
    { det: "la", noun: "montagne" },
  ],
  mp: [
    { det: "les", noun: "chats" },
    { det: "des", noun: "arbres" },
    { det: "les", noun: "livres" },
    { det: "des", noun: "jardins" },
    { det: "les", noun: "chiens" },
    { det: "des", noun: "bateaux" },
  ],
  fp: [
    { det: "les", noun: "maisons" },
    { det: "des", noun: "étoiles" },
    { det: "les", noun: "pommes" },
    { det: "des", noun: "fleurs" },
    { det: "les", noun: "voitures" },
    { det: "des", noun: "fenêtres" },
  ],
};

function pick<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

const combos: Array<{ key: "ms" | "fs" | "mp" | "fp"; gender: Gender; number: NumberType }> = [
  { key: "ms", gender: "masculin", number: "singulier" },
  { key: "fs", gender: "féminin", number: "singulier" },
  { key: "mp", gender: "masculin", number: "pluriel" },
  { key: "fp", gender: "féminin", number: "pluriel" },
];

export function generateAdjectiveExercises(count = 12): AdjectiveExerciseItem[] {
  const items: AdjectiveExerciseItem[] = [];
  for (let i = 0; i < count; i++) {
    const combo = combos[i % combos.length];
    const adj = pick(adjectives);
    const noun = pick(nouns[combo.key]!);
    items.push({
      template: `${noun.det} {adj} ${noun.noun}`,
      gender: combo.gender,
      number: combo.number,
      adjective: adj,
    });
  }
  return items;
}
