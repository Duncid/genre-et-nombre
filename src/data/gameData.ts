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
