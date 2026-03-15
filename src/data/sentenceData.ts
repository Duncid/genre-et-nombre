export type GrammarRole = "déterminant" | "adjectif" | "nom" | "verbe" | "pronom" | "préposition" | "adverbe";

export interface SentenceWord {
  word: string;
  role: GrammarRole;
}

export interface SentenceItem {
  words: SentenceWord[];
}

// Simple mode: déterminant + adjectif + nom
export const simpleSentenceItems: SentenceItem[] = [
  { words: [{ word: "Un", role: "déterminant" }, { word: "petit", role: "adjectif" }, { word: "chat", role: "nom" }] },
  { words: [{ word: "La", role: "déterminant" }, { word: "grande", role: "adjectif" }, { word: "maison", role: "nom" }] },
  { words: [{ word: "Une", role: "déterminant" }, { word: "jolie", role: "adjectif" }, { word: "fleur", role: "nom" }] },
  { words: [{ word: "Le", role: "déterminant" }, { word: "gros", role: "adjectif" }, { word: "livre", role: "nom" }] },
  { words: [{ word: "Les", role: "déterminant" }, { word: "petits", role: "adjectif" }, { word: "chats", role: "nom" }] },
  { words: [{ word: "Des", role: "déterminant" }, { word: "belles", role: "adjectif" }, { word: "fleurs", role: "nom" }] },
  { words: [{ word: "Un", role: "déterminant" }, { word: "vieux", role: "adjectif" }, { word: "chapeau", role: "nom" }] },
  { words: [{ word: "La", role: "déterminant" }, { word: "nouvelle", role: "adjectif" }, { word: "voiture", role: "nom" }] },
  { words: [{ word: "Le", role: "déterminant" }, { word: "bon", role: "adjectif" }, { word: "pain", role: "nom" }] },
  { words: [{ word: "Une", role: "déterminant" }, { word: "longue", role: "adjectif" }, { word: "rivière", role: "nom" }] },
  { words: [{ word: "Les", role: "déterminant" }, { word: "grands", role: "adjectif" }, { word: "arbres", role: "nom" }] },
  { words: [{ word: "Un", role: "déterminant" }, { word: "gentil", role: "adjectif" }, { word: "chien", role: "nom" }] },
  { words: [{ word: "La", role: "déterminant" }, { word: "haute", role: "adjectif" }, { word: "montagne", role: "nom" }] },
  { words: [{ word: "Le", role: "déterminant" }, { word: "beau", role: "adjectif" }, { word: "bateau", role: "nom" }] },
  { words: [{ word: "Des", role: "déterminant" }, { word: "nouveaux", role: "adjectif" }, { word: "crayons", role: "nom" }] },
  { words: [{ word: "La", role: "déterminant" }, { word: "vieille", role: "adjectif" }, { word: "porte", role: "nom" }] },
  { words: [{ word: "Un", role: "déterminant" }, { word: "joli", role: "adjectif" }, { word: "jardin", role: "nom" }] },
  { words: [{ word: "Les", role: "déterminant" }, { word: "grosses", role: "adjectif" }, { word: "pommes", role: "nom" }] },
  // Some without adjective (just det + nom)
  { words: [{ word: "Le", role: "déterminant" }, { word: "soleil", role: "nom" }] },
  { words: [{ word: "La", role: "déterminant" }, { word: "lune", role: "nom" }] },
  { words: [{ word: "Une", role: "déterminant" }, { word: "pomme", role: "nom" }] },
  { words: [{ word: "Un", role: "déterminant" }, { word: "livre", role: "nom" }] },
  { words: [{ word: "Les", role: "déterminant" }, { word: "étoiles", role: "nom" }] },
  { words: [{ word: "Des", role: "déterminant" }, { word: "voitures", role: "nom" }] },
];

// Advanced mode: adds verbe, pronom, préposition, adverbe
export const advancedSentenceItems: SentenceItem[] = [
  { words: [{ word: "Le", role: "déterminant" }, { word: "chat", role: "nom" }, { word: "dort", role: "verbe" }] },
  { words: [{ word: "Il", role: "pronom" }, { word: "mange", role: "verbe" }, { word: "une", role: "déterminant" }, { word: "pomme", role: "nom" }] },
  { words: [{ word: "Elle", role: "pronom" }, { word: "lit", role: "verbe" }, { word: "un", role: "déterminant" }, { word: "livre", role: "nom" }] },
  { words: [{ word: "Le", role: "déterminant" }, { word: "petit", role: "adjectif" }, { word: "chat", role: "nom" }, { word: "dort", role: "verbe" }] },
  { words: [{ word: "Il", role: "pronom" }, { word: "court", role: "verbe" }, { word: "vite", role: "adverbe" }] },
  { words: [{ word: "Elle", role: "pronom" }, { word: "chante", role: "verbe" }, { word: "bien", role: "adverbe" }] },
  { words: [{ word: "Le", role: "déterminant" }, { word: "chien", role: "nom" }, { word: "joue", role: "verbe" }, { word: "dans", role: "préposition" }, { word: "le", role: "déterminant" }, { word: "jardin", role: "nom" }] },
  { words: [{ word: "Il", role: "pronom" }, { word: "va", role: "verbe" }, { word: "à", role: "préposition" }, { word: "la", role: "déterminant" }, { word: "maison", role: "nom" }] },
  { words: [{ word: "Elle", role: "pronom" }, { word: "parle", role: "verbe" }, { word: "avec", role: "préposition" }, { word: "un", role: "déterminant" }, { word: "ami", role: "nom" }] },
  { words: [{ word: "Le", role: "déterminant" }, { word: "gros", role: "adjectif" }, { word: "chat", role: "nom" }, { word: "dort", role: "verbe" }, { word: "sur", role: "préposition" }, { word: "la", role: "déterminant" }, { word: "table", role: "nom" }] },
  { words: [{ word: "Il", role: "pronom" }, { word: "regarde", role: "verbe" }, { word: "les", role: "déterminant" }, { word: "belles", role: "adjectif" }, { word: "étoiles", role: "nom" }] },
  { words: [{ word: "Nous", role: "pronom" }, { word: "mangeons", role: "verbe" }, { word: "du", role: "déterminant" }, { word: "bon", role: "adjectif" }, { word: "pain", role: "nom" }] },
  { words: [{ word: "Je", role: "pronom" }, { word: "lis", role: "verbe" }, { word: "un", role: "déterminant" }, { word: "grand", role: "adjectif" }, { word: "livre", role: "nom" }] },
  { words: [{ word: "Tu", role: "pronom" }, { word: "cours", role: "verbe" }, { word: "très", role: "adverbe" }, { word: "vite", role: "adverbe" }] },
  { words: [{ word: "Les", role: "déterminant" }, { word: "enfants", role: "nom" }, { word: "jouent", role: "verbe" }, { word: "dehors", role: "adverbe" }] },
  { words: [{ word: "Elle", role: "pronom" }, { word: "met", role: "verbe" }, { word: "le", role: "déterminant" }, { word: "chapeau", role: "nom" }, { word: "sur", role: "préposition" }, { word: "la", role: "déterminant" }, { word: "table", role: "nom" }] },
];

export const simpleRoles: GrammarRole[] = ["déterminant", "adjectif", "nom"];
export const advancedRoles: GrammarRole[] = ["déterminant", "adjectif", "nom", "verbe", "pronom", "préposition", "adverbe"];

// Colors for each role (mapped to CSS variables)
export const roleColors: Record<GrammarRole, { bg: string; text: string; ring: string }> = {
  "déterminant": { bg: "bg-game-feminine/20", text: "text-game-feminine", ring: "ring-game-feminine" },
  "adjectif": { bg: "bg-game-singular/20", text: "text-game-singular", ring: "ring-game-singular" },
  "nom": { bg: "bg-primary/20", text: "text-primary", ring: "ring-primary" },
  "verbe": { bg: "bg-game-success/20", text: "text-game-success", ring: "ring-game-success" },
  "pronom": { bg: "bg-game-plural/20", text: "text-game-plural", ring: "ring-game-plural" },
  "préposition": { bg: "bg-secondary/20", text: "text-secondary", ring: "ring-secondary" },
  "adverbe": { bg: "bg-accent/20", text: "text-accent", ring: "ring-accent" },
};
