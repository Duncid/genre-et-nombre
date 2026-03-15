import { useState } from "react";
import GameMenu from "@/components/GameMenu";
import GenderGame from "@/components/GenderGame";
import NumberGame from "@/components/NumberGame";
import MixGame from "@/components/MixGame";
import WordGame from "@/components/WordGame";
import SentenceGame from "@/components/SentenceGame";
import { adjectiveWordItems } from "@/data/gameData";
import { advancedSentenceItems, advancedRoles } from "@/data/sentenceData";

type GameMode = "menu" | "gender" | "number" | "mix" | "words" | "adjectives" | "sentence" | "sentence-advanced";

const Index = () => {
  const [mode, setMode] = useState<GameMode>("menu");

  if (mode === "gender") return <GenderGame onBack={() => setMode("menu")} />;
  if (mode === "number") return <NumberGame onBack={() => setMode("menu")} />;
  if (mode === "mix") return <MixGame onBack={() => setMode("menu")} />;
  if (mode === "words") return <WordGame onBack={() => setMode("menu")} />;
  if (mode === "adjectives") return <WordGame onBack={() => setMode("menu")} items={adjectiveWordItems} modeLabel="Mots & Adjectifs" />;
  if (mode === "sentence") return <SentenceGame onBack={() => setMode("menu")} />;
  if (mode === "sentence-advanced") return <SentenceGame onBack={() => setMode("menu")} items={advancedSentenceItems} roles={advancedRoles} modeLabel="Structure avancée" />;
  return <GameMenu onSelectMode={setMode} />;
};

export default Index;
