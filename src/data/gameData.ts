import pomme from "@/assets/game/pomme.png";
import livre from "@/assets/game/livre.png";
import soleil from "@/assets/game/soleil.png";
import etoile from "@/assets/game/etoile.png";
import maison from "@/assets/game/maison.png";
import voiture from "@/assets/game/voiture.png";
import arbre from "@/assets/game/arbre.png";
import fleur from "@/assets/game/fleur.png";
import chat from "@/assets/game/chat.png";
import table from "@/assets/game/table.png";
import lune from "@/assets/game/lune.png";
import porte from "@/assets/game/porte.png";

import pommes from "@/assets/game/pommes.png";
import livres from "@/assets/game/livres.png";
import etoiles from "@/assets/game/etoiles.png";
import fleurs from "@/assets/game/fleurs.png";
import chats from "@/assets/game/chats.png";
import arbres from "@/assets/game/arbres.png";
import voitures from "@/assets/game/voitures.png";

export type Gender = "féminin" | "masculin";

export interface GenderItem {
  name: string;
  image: string;
  gender: Gender;
  article: string;
}

export const genderItems: GenderItem[] = [
  { name: "pomme", image: pomme, gender: "féminin", article: "une" },
  { name: "livre", image: livre, gender: "masculin", article: "un" },
  { name: "soleil", image: soleil, gender: "masculin", article: "le" },
  { name: "étoile", image: etoile, gender: "féminin", article: "une" },
  { name: "maison", image: maison, gender: "féminin", article: "une" },
  { name: "voiture", image: voiture, gender: "féminin", article: "une" },
  { name: "arbre", image: arbre, gender: "masculin", article: "un" },
  { name: "fleur", image: fleur, gender: "féminin", article: "une" },
  { name: "chat", image: chat, gender: "masculin", article: "un" },
  { name: "table", image: table, gender: "féminin", article: "une" },
  { name: "lune", image: lune, gender: "féminin", article: "la" },
  { name: "porte", image: porte, gender: "féminin", article: "une" },
];

export type NumberType = "singulier" | "pluriel";

export interface NumberItem {
  name: string;
  image: string;
  number: NumberType;
  label: string;
}

export const numberItems: NumberItem[] = [
  { name: "pomme", image: pomme, number: "singulier", label: "une pomme" },
  { name: "pommes", image: pommes, number: "pluriel", label: "des pommes" },
  { name: "livre", image: livre, number: "singulier", label: "un livre" },
  { name: "livres", image: livres, number: "pluriel", label: "des livres" },
  { name: "étoile", image: etoile, number: "singulier", label: "une étoile" },
  { name: "étoiles", image: etoiles, number: "pluriel", label: "des étoiles" },
  { name: "fleur", image: fleur, number: "singulier", label: "une fleur" },
  { name: "fleurs", image: fleurs, number: "pluriel", label: "des fleurs" },
  { name: "chat", image: chat, number: "singulier", label: "un chat" },
  { name: "chats", image: chats, number: "pluriel", label: "des chats" },
  { name: "arbre", image: arbre, number: "singulier", label: "un arbre" },
  { name: "arbres", image: arbres, number: "pluriel", label: "des arbres" },
  { name: "voiture", image: voiture, number: "singulier", label: "une voiture" },
  { name: "voitures", image: voitures, number: "pluriel", label: "des voitures" },
];

export interface MixItem {
  name: string;
  image: string;
  gender: Gender;
  number: NumberType;
  label: string;
}

export const mixItems: MixItem[] = [
  { name: "pomme", image: pomme, gender: "féminin", number: "singulier", label: "une pomme" },
  { name: "pommes", image: pommes, gender: "féminin", number: "pluriel", label: "des pommes" },
  { name: "livre", image: livre, gender: "masculin", number: "singulier", label: "un livre" },
  { name: "livres", image: livres, gender: "masculin", number: "pluriel", label: "des livres" },
  { name: "soleil", image: soleil, gender: "masculin", number: "singulier", label: "le soleil" },
  { name: "étoile", image: etoile, gender: "féminin", number: "singulier", label: "une étoile" },
  { name: "étoiles", image: etoiles, gender: "féminin", number: "pluriel", label: "des étoiles" },
  { name: "maison", image: maison, gender: "féminin", number: "singulier", label: "une maison" },
  { name: "voiture", image: voiture, gender: "féminin", number: "singulier", label: "une voiture" },
  { name: "voitures", image: voitures, gender: "féminin", number: "pluriel", label: "des voitures" },
  { name: "arbre", image: arbre, gender: "masculin", number: "singulier", label: "un arbre" },
  { name: "arbres", image: arbres, gender: "masculin", number: "pluriel", label: "des arbres" },
  { name: "fleur", image: fleur, gender: "féminin", number: "singulier", label: "une fleur" },
  { name: "fleurs", image: fleurs, gender: "féminin", number: "pluriel", label: "des fleurs" },
  { name: "chat", image: chat, gender: "masculin", number: "singulier", label: "un chat" },
  { name: "chats", image: chats, gender: "masculin", number: "pluriel", label: "des chats" },
  { name: "table", image: table, gender: "féminin", number: "singulier", label: "une table" },
  { name: "lune", image: lune, gender: "féminin", number: "singulier", label: "la lune" },
  { name: "porte", image: porte, gender: "féminin", number: "singulier", label: "une porte" },
];

export interface WordItem {
  word: string;
  gender: Gender;
  number: NumberType;
  label: string;
}

export const wordItems: WordItem[] = [
  // un / une (singulier, indéfini)
  { word: "une pomme", gender: "féminin", number: "singulier", label: "une pomme" },
  { word: "un livre", gender: "masculin", number: "singulier", label: "un livre" },
  { word: "une étoile", gender: "féminin", number: "singulier", label: "une étoile" },
  { word: "un arbre", gender: "masculin", number: "singulier", label: "un arbre" },
  { word: "une fleur", gender: "féminin", number: "singulier", label: "une fleur" },
  { word: "un chat", gender: "masculin", number: "singulier", label: "un chat" },
  { word: "une maison", gender: "féminin", number: "singulier", label: "une maison" },
  { word: "une voiture", gender: "féminin", number: "singulier", label: "une voiture" },
  { word: "une table", gender: "féminin", number: "singulier", label: "une table" },
  { word: "une porte", gender: "féminin", number: "singulier", label: "une porte" },
  // le / la (singulier, défini)
  { word: "le soleil", gender: "masculin", number: "singulier", label: "le soleil" },
  { word: "la lune", gender: "féminin", number: "singulier", label: "la lune" },
  { word: "la pomme", gender: "féminin", number: "singulier", label: "la pomme" },
  { word: "le livre", gender: "masculin", number: "singulier", label: "le livre" },
  { word: "la fleur", gender: "féminin", number: "singulier", label: "la fleur" },
  { word: "le chat", gender: "masculin", number: "singulier", label: "le chat" },
  { word: "la table", gender: "féminin", number: "singulier", label: "la table" },
  { word: "la porte", gender: "féminin", number: "singulier", label: "la porte" },
  { word: "la maison", gender: "féminin", number: "singulier", label: "la maison" },
  { word: "la voiture", gender: "féminin", number: "singulier", label: "la voiture" },
  // des (pluriel, indéfini)
  { word: "des pommes", gender: "féminin", number: "pluriel", label: "des pommes" },
  { word: "des livres", gender: "masculin", number: "pluriel", label: "des livres" },
  { word: "des étoiles", gender: "féminin", number: "pluriel", label: "des étoiles" },
  { word: "des arbres", gender: "masculin", number: "pluriel", label: "des arbres" },
  { word: "des fleurs", gender: "féminin", number: "pluriel", label: "des fleurs" },
  { word: "des chats", gender: "masculin", number: "pluriel", label: "des chats" },
  { word: "des voitures", gender: "féminin", number: "pluriel", label: "des voitures" },
  // les (pluriel, défini)
  { word: "les pommes", gender: "féminin", number: "pluriel", label: "les pommes" },
  { word: "les livres", gender: "masculin", number: "pluriel", label: "les livres" },
  { word: "les étoiles", gender: "féminin", number: "pluriel", label: "les étoiles" },
  { word: "les arbres", gender: "masculin", number: "pluriel", label: "les arbres" },
  { word: "les fleurs", gender: "féminin", number: "pluriel", label: "les fleurs" },
  { word: "les chats", gender: "masculin", number: "pluriel", label: "les chats" },
  { word: "les voitures", gender: "féminin", number: "pluriel", label: "les voitures" },
];
