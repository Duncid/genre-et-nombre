import type { Gender, NumberType } from "./gameData";

export type AdjectivePosition = "before" | "after";

export interface AdjectiveForms {
  ms: string;
  fs: string;
  mp: string;
  fp: string;
  position: AdjectivePosition;
}

export interface AdjectiveExerciseItem {
  template: string;
  gender: Gender;
  number: NumberType;
  adjective: AdjectiveForms;
}

// Adjective dictionary — referenced by id from noun compatibility lists
const ADJ = {
  // "before" adjectives
  petit: { ms: "petit", fs: "petite", mp: "petits", fp: "petites", position: "before" as const },
  grand: { ms: "grand", fs: "grande", mp: "grands", fp: "grandes", position: "before" as const },
  gros: { ms: "gros", fs: "grosse", mp: "gros", fp: "grosses", position: "before" as const },
  joli: { ms: "joli", fs: "jolie", mp: "jolis", fp: "jolies", position: "before" as const },
  vieux: { ms: "vieux", fs: "vieille", mp: "vieux", fp: "vieilles", position: "before" as const },
  jeune: { ms: "jeune", fs: "jeune", mp: "jeunes", fp: "jeunes", position: "before" as const },
  bon: { ms: "bon", fs: "bonne", mp: "bons", fp: "bonnes", position: "before" as const },
  mauvais: { ms: "mauvais", fs: "mauvaise", mp: "mauvais", fp: "mauvaises", position: "before" as const },
  beau: { ms: "beau", fs: "belle", mp: "beaux", fp: "belles", position: "before" as const },
  nouveau: { ms: "nouveau", fs: "nouvelle", mp: "nouveaux", fp: "nouvelles", position: "before" as const },
  haut: { ms: "haut", fs: "haute", mp: "hauts", fp: "hautes", position: "before" as const },
  meilleur: { ms: "meilleur", fs: "meilleure", mp: "meilleurs", fp: "meilleures", position: "before" as const },

  // "after" adjectives
  long: { ms: "long", fs: "longue", mp: "longs", fp: "longues", position: "after" as const },
  court: { ms: "court", fs: "courte", mp: "courts", fp: "courtes", position: "after" as const },
  gentil: { ms: "gentil", fs: "gentille", mp: "gentils", fp: "gentilles", position: "after" as const },
  doux: { ms: "doux", fs: "douce", mp: "doux", fp: "douces", position: "after" as const },
  heureux: { ms: "heureux", fs: "heureuse", mp: "heureux", fp: "heureuses", position: "after" as const },
  triste: { ms: "triste", fs: "triste", mp: "tristes", fp: "tristes", position: "after" as const },
  blanc: { ms: "blanc", fs: "blanche", mp: "blancs", fp: "blanches", position: "after" as const },
  vert: { ms: "vert", fs: "verte", mp: "verts", fp: "vertes", position: "after" as const },
  noir: { ms: "noir", fs: "noire", mp: "noirs", fp: "noires", position: "after" as const },
  bleu: { ms: "bleu", fs: "bleue", mp: "bleus", fp: "bleues", position: "after" as const },
  rouge: { ms: "rouge", fs: "rouge", mp: "rouges", fp: "rouges", position: "after" as const },
  jaune: { ms: "jaune", fs: "jaune", mp: "jaunes", fp: "jaunes", position: "after" as const },
  brun: { ms: "brun", fs: "brune", mp: "bruns", fp: "brunes", position: "after" as const },
  rond: { ms: "rond", fs: "ronde", mp: "ronds", fp: "rondes", position: "after" as const },
  carré: { ms: "carré", fs: "carrée", mp: "carrés", fp: "carrées", position: "after" as const },
  léger: { ms: "léger", fs: "légère", mp: "légers", fp: "légères", position: "after" as const },
  lourd: { ms: "lourd", fs: "lourde", mp: "lourds", fp: "lourdes", position: "after" as const },
  chaud: { ms: "chaud", fs: "chaude", mp: "chauds", fp: "chaudes", position: "after" as const },
  froid: { ms: "froid", fs: "froide", mp: "froids", fp: "froides", position: "after" as const },
  poli: { ms: "poli", fs: "polie", mp: "polis", fp: "polies", position: "after" as const },
  méchant: { ms: "méchant", fs: "méchante", mp: "méchants", fp: "méchantes", position: "after" as const },
  intelligent: { ms: "intelligent", fs: "intelligente", mp: "intelligents", fp: "intelligentes", position: "after" as const },
  amusant: { ms: "amusant", fs: "amusante", mp: "amusants", fp: "amusantes", position: "after" as const },
  bruyant: { ms: "bruyant", fs: "bruyante", mp: "bruyants", fp: "bruyantes", position: "after" as const },
  silencieux: { ms: "silencieux", fs: "silencieuse", mp: "silencieux", fp: "silencieuses", position: "after" as const },
  rapide: { ms: "rapide", fs: "rapide", mp: "rapides", fp: "rapides", position: "after" as const },
  lent: { ms: "lent", fs: "lente", mp: "lents", fp: "lentes", position: "after" as const },
  fort: { ms: "fort", fs: "forte", mp: "forts", fp: "fortes", position: "after" as const },
  sucré: { ms: "sucré", fs: "sucrée", mp: "sucrés", fp: "sucrées", position: "after" as const },
  salé: { ms: "salé", fs: "salée", mp: "salés", fp: "salées", position: "after" as const },
  propre: { ms: "propre", fs: "propre", mp: "propres", fp: "propres", position: "after" as const },
  sale: { ms: "sale", fs: "sale", mp: "sales", fp: "sales", position: "after" as const },
  brillant: { ms: "brillant", fs: "brillante", mp: "brillants", fp: "brillantes", position: "after" as const },
  pointu: { ms: "pointu", fs: "pointue", mp: "pointus", fp: "pointues", position: "after" as const },
  mou: { ms: "mou", fs: "molle", mp: "mous", fp: "molles", position: "after" as const },
  dur: { ms: "dur", fs: "dure", mp: "durs", fp: "dures", position: "after" as const },
  large: { ms: "large", fs: "large", mp: "larges", fp: "larges", position: "after" as const },
  étroit: { ms: "étroit", fs: "étroite", mp: "étroits", fp: "étroites", position: "after" as const },
  profond: { ms: "profond", fs: "profonde", mp: "profonds", fp: "profondes", position: "after" as const },
  mûr: { ms: "mûr", fs: "mûre", mp: "mûrs", fp: "mûres", position: "after" as const },
  délicieux: { ms: "délicieux", fs: "délicieuse", mp: "délicieux", fp: "délicieuses", position: "after" as const },
  magnifique: { ms: "magnifique", fs: "magnifique", mp: "magnifiques", fp: "magnifiques", position: "after" as const },
  curieux: { ms: "curieux", fs: "curieuse", mp: "curieux", fp: "curieuses", position: "after" as const },
  peureux: { ms: "peureux", fs: "peureuse", mp: "peureux", fp: "peureuses", position: "after" as const },
  fatigué: { ms: "fatigué", fs: "fatiguée", mp: "fatigués", fp: "fatiguées", position: "after" as const },
  sauvage: { ms: "sauvage", fs: "sauvage", mp: "sauvages", fp: "sauvages", position: "after" as const },
  mouillé: { ms: "mouillé", fs: "mouillée", mp: "mouillés", fp: "mouillées", position: "after" as const },
  sec: { ms: "sec", fs: "sèche", mp: "secs", fp: "sèches", position: "after" as const },
  épais: { ms: "épais", fs: "épaisse", mp: "épais", fp: "épaisses", position: "after" as const },
  fin: { ms: "fin", fs: "fine", mp: "fins", fp: "fines", position: "after" as const },
  dangereux: { ms: "dangereux", fs: "dangereuse", mp: "dangereux", fp: "dangereuses", position: "after" as const },
} as const;

type AdjId = keyof typeof ADJ;

export const adjectives: AdjectiveForms[] = Object.values(ADJ);

interface NounDef {
  det: string;
  noun: string;
  adj: AdjId[];
}

interface NounEntry {
  ms: NounDef[];
  fs: NounDef[];
  mp: NounDef[];
  fp: NounDef[];
}

// Common adjective groups for reuse
const ANIMAL: AdjId[] = ["petit", "grand", "gros", "joli", "vieux", "jeune", "beau", "doux", "gentil", "méchant", "heureux", "peureux", "curieux", "sauvage", "rapide", "lent", "intelligent", "amusant"];
const ANIMAL_COLOR: AdjId[] = [...ANIMAL, "blanc", "noir", "brun", "bleu", "vert", "rouge", "jaune"];
const FOOD: AdjId[] = ["petit", "grand", "gros", "bon", "mauvais", "beau", "joli", "sucré", "salé", "chaud", "froid", "délicieux", "mûr", "rond", "vert", "rouge", "jaune", "blanc"];
const OBJECT: AdjId[] = ["petit", "grand", "gros", "joli", "vieux", "nouveau", "beau", "léger", "lourd", "long", "court", "rond", "carré", "blanc", "noir", "rouge", "bleu", "vert", "jaune", "brillant", "propre", "sale"];
const PLACE: AdjId[] = ["petit", "grand", "joli", "vieux", "nouveau", "beau", "magnifique", "haut", "long", "large", "étroit", "profond", "blanc", "vert"];
const PERSON: AdjId[] = ["petit", "grand", "gros", "joli", "vieux", "jeune", "beau", "bon", "gentil", "méchant", "heureux", "triste", "doux", "poli", "intelligent", "amusant", "fort", "fatigué", "curieux"];

const nouns: NounEntry = {
  ms: [
    // Animaux
    { det: "le", noun: "chat", adj: ANIMAL_COLOR },
    { det: "le", noun: "chien", adj: ANIMAL_COLOR },
    { det: "un", noun: "lapin", adj: ANIMAL_COLOR },
    { det: "le", noun: "loup", adj: [...ANIMAL_COLOR, "dangereux"] },
    { det: "un", noun: "lion", adj: [...ANIMAL_COLOR, "fort", "dangereux"] },
    { det: "le", noun: "tigre", adj: [...ANIMAL_COLOR, "fort", "dangereux"] },
    { det: "un", noun: "écureuil", adj: ANIMAL_COLOR },
    { det: "le", noun: "renard", adj: [...ANIMAL_COLOR, "rusé" as never].filter(a => a !== ("rusé" as never)) },
    { det: "un", noun: "oiseau", adj: [...ANIMAL_COLOR, "léger"] },
    { det: "le", noun: "poisson", adj: ANIMAL_COLOR },
    { det: "un", noun: "cheval", adj: [...ANIMAL_COLOR, "fort"] },
    { det: "le", noun: "singe", adj: [...ANIMAL_COLOR, "amusant"] },
    // Personnes
    { det: "le", noun: "garçon", adj: PERSON },
    { det: "un", noun: "homme", adj: PERSON },
    { det: "le", noun: "boulanger", adj: PERSON },
    { det: "un", noun: "ami", adj: PERSON },
    // Objets
    { det: "le", noun: "livre", adj: [...OBJECT, "épais", "fin", "amusant", "intelligent"] },
    { det: "un", noun: "crayon", adj: [...OBJECT, "pointu", "fin"] },
    { det: "le", noun: "ballon", adj: [...OBJECT, "rond", "léger"] },
    { det: "un", noun: "vélo", adj: [...OBJECT, "rapide", "lent"] },
    { det: "le", noun: "bateau", adj: [...OBJECT, "rapide"] },
    { det: "un", noun: "avion", adj: [...OBJECT, "rapide", "bruyant"] },
    { det: "le", noun: "camion", adj: [...OBJECT, "lourd", "bruyant"] },
    { det: "un", noun: "chapeau", adj: OBJECT },
    { det: "le", noun: "manteau", adj: [...OBJECT, "chaud", "épais"] },
    { det: "un", noun: "gâteau", adj: FOOD },
    { det: "le", noun: "fromage", adj: FOOD },
    { det: "un", noun: "fruit", adj: FOOD },
    { det: "le", noun: "pain", adj: FOOD },
    { det: "un", noun: "couteau", adj: [...OBJECT, "pointu", "dangereux"] },
    // Lieux
    { det: "le", noun: "jardin", adj: [...PLACE, "vert"] },
    { det: "un", noun: "arbre", adj: [...PLACE, "vert", "vieux", "jeune"] },
    { det: "le", noun: "chemin", adj: [...PLACE, "long", "court", "étroit", "blanc"] },
    { det: "un", noun: "village", adj: PLACE },
    { det: "le", noun: "château", adj: [...PLACE, "vieux", "magnifique"] },
    { det: "un", noun: "lac", adj: [...PLACE, "profond"] },
  ],
  fs: [
    // Animaux
    { det: "la", noun: "souris", adj: ANIMAL_COLOR },
    { det: "une", noun: "vache", adj: ANIMAL_COLOR },
    { det: "la", noun: "poule", adj: ANIMAL_COLOR },
    { det: "une", noun: "tortue", adj: [...ANIMAL_COLOR, "lent"] },
    { det: "la", noun: "girafe", adj: [...ANIMAL_COLOR, "haut"] },
    { det: "une", noun: "abeille", adj: [...ANIMAL_COLOR, "bruyant"] },
    { det: "la", noun: "grenouille", adj: ANIMAL_COLOR },
    // Personnes
    { det: "la", noun: "fille", adj: PERSON },
    { det: "une", noun: "femme", adj: PERSON },
    { det: "la", noun: "maîtresse", adj: PERSON },
    { det: "une", noun: "amie", adj: PERSON },
    { det: "la", noun: "princesse", adj: [...PERSON, "magnifique"] },
    // Objets
    { det: "la", noun: "table", adj: [...OBJECT, "carré", "rond"] },
    { det: "une", noun: "chaise", adj: OBJECT },
    { det: "la", noun: "voiture", adj: [...OBJECT, "rapide"] },
    { det: "une", noun: "fenêtre", adj: [...OBJECT, "haut", "large", "étroit", "carré"] },
    { det: "la", noun: "porte", adj: [...OBJECT, "haut", "large", "étroit", "lourd"] },
    { det: "une", noun: "balle", adj: [...OBJECT, "rond", "léger", "mou", "dur"] },
    { det: "la", noun: "lampe", adj: [...OBJECT, "brillant"] },
    { det: "une", noun: "robe", adj: [...OBJECT, "long", "court"] },
    { det: "la", noun: "chemise", adj: [...OBJECT, "propre", "sale"] },
    // Nourriture
    { det: "la", noun: "pomme", adj: FOOD },
    { det: "une", noun: "banane", adj: FOOD },
    { det: "la", noun: "fraise", adj: FOOD },
    { det: "une", noun: "tomate", adj: FOOD },
    { det: "la", noun: "soupe", adj: [...FOOD, "chaud", "froid"] },
    { det: "une", noun: "tarte", adj: FOOD },
    // Lieux / nature
    { det: "la", noun: "maison", adj: PLACE },
    { det: "une", noun: "rivière", adj: [...PLACE, "long", "profond", "rapide"] },
    { det: "la", noun: "montagne", adj: [...PLACE, "haut", "magnifique", "blanc"] },
    { det: "une", noun: "forêt", adj: [...PLACE, "profond", "vert", "sauvage", "dangereux"] },
    { det: "la", noun: "fleur", adj: [...PLACE, "joli", "magnifique", "rouge", "jaune", "bleu", "blanc", "vert"] },
    { det: "une", noun: "étoile", adj: [...PLACE, "petit", "brillant", "blanc", "jaune"] },
    { det: "la", noun: "lune", adj: ["petit", "grand", "rond", "brillant", "blanc", "jaune", "magnifique", "haut"] },
    { det: "une", noun: "route", adj: [...PLACE, "long", "court", "large", "étroit"] },
  ],
  mp: [
    // Animaux
    { det: "les", noun: "chats", adj: ANIMAL_COLOR },
    { det: "des", noun: "chiens", adj: ANIMAL_COLOR },
    { det: "les", noun: "lapins", adj: ANIMAL_COLOR },
    { det: "des", noun: "loups", adj: [...ANIMAL_COLOR, "dangereux"] },
    { det: "les", noun: "oiseaux", adj: [...ANIMAL_COLOR, "léger"] },
    { det: "des", noun: "poissons", adj: ANIMAL_COLOR },
    { det: "les", noun: "chevaux", adj: [...ANIMAL_COLOR, "fort", "rapide"] },
    { det: "des", noun: "singes", adj: [...ANIMAL_COLOR, "amusant"] },
    // Personnes
    { det: "les", noun: "garçons", adj: PERSON },
    { det: "des", noun: "amis", adj: PERSON },
    // Objets
    { det: "les", noun: "livres", adj: [...OBJECT, "épais", "fin", "amusant"] },
    { det: "des", noun: "crayons", adj: [...OBJECT, "pointu"] },
    { det: "les", noun: "ballons", adj: [...OBJECT, "rond", "léger"] },
    { det: "des", noun: "vélos", adj: [...OBJECT, "rapide"] },
    { det: "les", noun: "bateaux", adj: OBJECT },
    { det: "des", noun: "avions", adj: [...OBJECT, "rapide", "bruyant"] },
    { det: "les", noun: "gâteaux", adj: FOOD },
    { det: "des", noun: "fruits", adj: FOOD },
    // Lieux
    { det: "les", noun: "jardins", adj: [...PLACE, "vert"] },
    { det: "des", noun: "arbres", adj: [...PLACE, "vert", "haut", "vieux"] },
    { det: "les", noun: "châteaux", adj: [...PLACE, "vieux", "magnifique"] },
    { det: "des", noun: "chemins", adj: [...PLACE, "long", "étroit"] },
  ],
  fp: [
    // Animaux
    { det: "les", noun: "souris", adj: ANIMAL_COLOR },
    { det: "des", noun: "vaches", adj: ANIMAL_COLOR },
    { det: "les", noun: "poules", adj: ANIMAL_COLOR },
    { det: "des", noun: "abeilles", adj: [...ANIMAL_COLOR, "bruyant"] },
    { det: "les", noun: "tortues", adj: [...ANIMAL_COLOR, "lent"] },
    // Personnes
    { det: "les", noun: "filles", adj: PERSON },
    { det: "des", noun: "amies", adj: PERSON },
    // Objets
    { det: "les", noun: "tables", adj: [...OBJECT, "carré", "rond"] },
    { det: "des", noun: "chaises", adj: OBJECT },
    { det: "les", noun: "voitures", adj: [...OBJECT, "rapide"] },
    { det: "des", noun: "fenêtres", adj: [...OBJECT, "haut", "large"] },
    { det: "les", noun: "portes", adj: [...OBJECT, "haut", "lourd"] },
    { det: "des", noun: "balles", adj: [...OBJECT, "rond", "léger", "mou"] },
    { det: "les", noun: "robes", adj: [...OBJECT, "long", "court"] },
    // Nourriture
    { det: "les", noun: "pommes", adj: FOOD },
    { det: "des", noun: "bananes", adj: FOOD },
    { det: "les", noun: "fraises", adj: FOOD },
    { det: "des", noun: "tomates", adj: FOOD },
    { det: "les", noun: "tartes", adj: FOOD },
    // Lieux / nature
    { det: "les", noun: "maisons", adj: PLACE },
    { det: "des", noun: "rivières", adj: [...PLACE, "long", "profond"] },
    { det: "les", noun: "montagnes", adj: [...PLACE, "haut", "magnifique", "blanc"] },
    { det: "des", noun: "forêts", adj: [...PLACE, "profond", "vert", "sauvage"] },
    { det: "les", noun: "fleurs", adj: [...PLACE, "joli", "magnifique", "rouge", "jaune", "bleu", "blanc"] },
    { det: "des", noun: "étoiles", adj: ["petit", "grand", "joli", "brillant", "blanc", "jaune", "magnifique"] },
    { det: "les", noun: "routes", adj: [...PLACE, "long", "large", "étroit"] },
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

function hasFourDistinctForms(adj: AdjectiveForms): boolean {
  const set = new Set([adj.ms, adj.fs, adj.mp, adj.fp]);
  return set.size === 4;
}

export function generateAdjectiveExercises(count = 12): AdjectiveExerciseItem[] {
  const items: AdjectiveExerciseItem[] = [];
  // Shuffle combos order each time for variety
  const order = [...combos].sort(() => Math.random() - 0.5);
  for (let i = 0; i < count; i++) {
    const combo = order[i % order.length];
    const noun = pick(nouns[combo.key]);

    const candidates = noun.adj
      .map((id) => ADJ[id])
      .filter(hasFourDistinctForms);

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
