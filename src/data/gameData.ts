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
  { word: "un chien", gender: "masculin", number: "singulier", label: "un chien" },
  { word: "une souris", gender: "féminin", number: "singulier", label: "une souris" },
  { word: "un oiseau", gender: "masculin", number: "singulier", label: "un oiseau" },
  { word: "une montagne", gender: "féminin", number: "singulier", label: "une montagne" },
  { word: "un nuage", gender: "masculin", number: "singulier", label: "un nuage" },
  { word: "une rivière", gender: "féminin", number: "singulier", label: "une rivière" },
  { word: "un jardin", gender: "masculin", number: "singulier", label: "un jardin" },
  { word: "une fenêtre", gender: "féminin", number: "singulier", label: "une fenêtre" },
  { word: "un chapeau", gender: "masculin", number: "singulier", label: "un chapeau" },
  { word: "une chaise", gender: "féminin", number: "singulier", label: "une chaise" },
  { word: "un crayon", gender: "masculin", number: "singulier", label: "un crayon" },
  { word: "une clé", gender: "féminin", number: "singulier", label: "une clé" },
  { word: "un bateau", gender: "masculin", number: "singulier", label: "un bateau" },
  { word: "une bougie", gender: "féminin", number: "singulier", label: "une bougie" },
  { word: "un papillon", gender: "masculin", number: "singulier", label: "un papillon" },
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
  { word: "le chien", gender: "masculin", number: "singulier", label: "le chien" },
  { word: "la souris", gender: "féminin", number: "singulier", label: "la souris" },
  { word: "le ciel", gender: "masculin", number: "singulier", label: "le ciel" },
  { word: "la mer", gender: "féminin", number: "singulier", label: "la mer" },
  { word: "le vent", gender: "masculin", number: "singulier", label: "le vent" },
  { word: "la pluie", gender: "féminin", number: "singulier", label: "la pluie" },
  { word: "le roi", gender: "masculin", number: "singulier", label: "le roi" },
  { word: "la reine", gender: "féminin", number: "singulier", label: "la reine" },
  { word: "le pain", gender: "masculin", number: "singulier", label: "le pain" },
  { word: "la neige", gender: "féminin", number: "singulier", label: "la neige" },
  // l' (singulier, défini, voyelle/h muet)
  { word: "l'école", gender: "féminin", number: "singulier", label: "l'école" },
  { word: "l'oiseau", gender: "masculin", number: "singulier", label: "l'oiseau" },
  { word: "l'arbre", gender: "masculin", number: "singulier", label: "l'arbre" },
  { word: "l'eau", gender: "féminin", number: "singulier", label: "l'eau" },
  { word: "l'herbe", gender: "féminin", number: "singulier", label: "l'herbe" },
  { word: "l'étoile", gender: "féminin", number: "singulier", label: "l'étoile" },
  // des (pluriel, indéfini)
  { word: "des pommes", gender: "féminin", number: "pluriel", label: "des pommes" },
  { word: "des livres", gender: "masculin", number: "pluriel", label: "des livres" },
  { word: "des étoiles", gender: "féminin", number: "pluriel", label: "des étoiles" },
  { word: "des arbres", gender: "masculin", number: "pluriel", label: "des arbres" },
  { word: "des fleurs", gender: "féminin", number: "pluriel", label: "des fleurs" },
  { word: "des chats", gender: "masculin", number: "pluriel", label: "des chats" },
  { word: "des voitures", gender: "féminin", number: "pluriel", label: "des voitures" },
  { word: "des chiens", gender: "masculin", number: "pluriel", label: "des chiens" },
  { word: "des oiseaux", gender: "masculin", number: "pluriel", label: "des oiseaux" },
  { word: "des montagnes", gender: "féminin", number: "pluriel", label: "des montagnes" },
  { word: "des nuages", gender: "masculin", number: "pluriel", label: "des nuages" },
  { word: "des rivières", gender: "féminin", number: "pluriel", label: "des rivières" },
  { word: "des crayons", gender: "masculin", number: "pluriel", label: "des crayons" },
  { word: "des chaises", gender: "féminin", number: "pluriel", label: "des chaises" },
  { word: "des bateaux", gender: "masculin", number: "pluriel", label: "des bateaux" },
  { word: "des papillons", gender: "masculin", number: "pluriel", label: "des papillons" },
  // les (pluriel, défini)
  { word: "les pommes", gender: "féminin", number: "pluriel", label: "les pommes" },
  { word: "les livres", gender: "masculin", number: "pluriel", label: "les livres" },
  { word: "les étoiles", gender: "féminin", number: "pluriel", label: "les étoiles" },
  { word: "les arbres", gender: "masculin", number: "pluriel", label: "les arbres" },
  { word: "les fleurs", gender: "féminin", number: "pluriel", label: "les fleurs" },
  { word: "les chats", gender: "masculin", number: "pluriel", label: "les chats" },
  { word: "les voitures", gender: "féminin", number: "pluriel", label: "les voitures" },
  { word: "les chiens", gender: "masculin", number: "pluriel", label: "les chiens" },
  { word: "les oiseaux", gender: "masculin", number: "pluriel", label: "les oiseaux" },
  { word: "les fenêtres", gender: "féminin", number: "pluriel", label: "les fenêtres" },
  { word: "les jardins", gender: "masculin", number: "pluriel", label: "les jardins" },
  { word: "les clés", gender: "féminin", number: "pluriel", label: "les clés" },
  { word: "les bougies", gender: "féminin", number: "pluriel", label: "les bougies" },
  { word: "les chapeaux", gender: "masculin", number: "pluriel", label: "les chapeaux" },
];

export const adjectiveWordItems: WordItem[] = [
  // Masculin singulier
  { word: "le petit chat", gender: "masculin", number: "singulier", label: "le petit chat" },
  { word: "un grand arbre", gender: "masculin", number: "singulier", label: "un grand arbre" },
  { word: "le gros livre", gender: "masculin", number: "singulier", label: "le gros livre" },
  { word: "un joli jardin", gender: "masculin", number: "singulier", label: "un joli jardin" },
  { word: "le vieux chapeau", gender: "masculin", number: "singulier", label: "le vieux chapeau" },
  { word: "un long chemin", gender: "masculin", number: "singulier", label: "un long chemin" },
  { word: "le bon pain", gender: "masculin", number: "singulier", label: "le bon pain" },
  { word: "un beau bateau", gender: "masculin", number: "singulier", label: "un beau bateau" },
  { word: "le nouveau crayon", gender: "masculin", number: "singulier", label: "le nouveau crayon" },
  { word: "un gentil chien", gender: "masculin", number: "singulier", label: "un gentil chien" },
  // Féminin singulier
  { word: "la petite maison", gender: "féminin", number: "singulier", label: "la petite maison" },
  { word: "une grande étoile", gender: "féminin", number: "singulier", label: "une grande étoile" },
  { word: "la grosse pomme", gender: "féminin", number: "singulier", label: "la grosse pomme" },
  { word: "une jolie fleur", gender: "féminin", number: "singulier", label: "une jolie fleur" },
  { word: "la vieille porte", gender: "féminin", number: "singulier", label: "la vieille porte" },
  { word: "une longue rivière", gender: "féminin", number: "singulier", label: "une longue rivière" },
  { word: "la bonne soupe", gender: "féminin", number: "singulier", label: "la bonne soupe" },
  { word: "une belle voiture", gender: "féminin", number: "singulier", label: "une belle voiture" },
  { word: "la nouvelle chaise", gender: "féminin", number: "singulier", label: "la nouvelle chaise" },
  { word: "une gentille souris", gender: "féminin", number: "singulier", label: "une gentille souris" },
  { word: "la haute montagne", gender: "féminin", number: "singulier", label: "la haute montagne" },
  { word: "une large fenêtre", gender: "féminin", number: "singulier", label: "une large fenêtre" },
  // Masculin pluriel
  { word: "les petits chats", gender: "masculin", number: "pluriel", label: "les petits chats" },
  { word: "les grands arbres", gender: "masculin", number: "pluriel", label: "les grands arbres" },
  { word: "les gros livres", gender: "masculin", number: "pluriel", label: "les gros livres" },
  { word: "des jolis jardins", gender: "masculin", number: "pluriel", label: "des jolis jardins" },
  { word: "les vieux chapeaux", gender: "masculin", number: "pluriel", label: "les vieux chapeaux" },
  { word: "des longs chemins", gender: "masculin", number: "pluriel", label: "des longs chemins" },
  { word: "les beaux bateaux", gender: "masculin", number: "pluriel", label: "les beaux bateaux" },
  { word: "des nouveaux crayons", gender: "masculin", number: "pluriel", label: "des nouveaux crayons" },
  { word: "les gentils chiens", gender: "masculin", number: "pluriel", label: "les gentils chiens" },
  { word: "des bons gâteaux", gender: "masculin", number: "pluriel", label: "des bons gâteaux" },
  // Féminin pluriel
  { word: "les petites maisons", gender: "féminin", number: "pluriel", label: "les petites maisons" },
  { word: "les grandes étoiles", gender: "féminin", number: "pluriel", label: "les grandes étoiles" },
  { word: "les grosses pommes", gender: "féminin", number: "pluriel", label: "les grosses pommes" },
  { word: "des jolies fleurs", gender: "féminin", number: "pluriel", label: "des jolies fleurs" },
  { word: "les vieilles portes", gender: "féminin", number: "pluriel", label: "les vieilles portes" },
  { word: "des longues rivières", gender: "féminin", number: "pluriel", label: "des longues rivières" },
  { word: "les belles voitures", gender: "féminin", number: "pluriel", label: "les belles voitures" },
  { word: "des nouvelles chaises", gender: "féminin", number: "pluriel", label: "des nouvelles chaises" },
  { word: "les gentilles souris", gender: "féminin", number: "pluriel", label: "les gentilles souris" },
  { word: "les hautes montagnes", gender: "féminin", number: "pluriel", label: "les hautes montagnes" },
  { word: "des larges fenêtres", gender: "féminin", number: "pluriel", label: "des larges fenêtres" },
  { word: "les bonnes soupes", gender: "féminin", number: "pluriel", label: "les bonnes soupes" },
];
