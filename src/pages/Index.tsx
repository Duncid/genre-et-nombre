import { useState } from "react";
import GameMenu from "@/components/GameMenu";
import GenderGame from "@/components/GenderGame";
import NumberGame from "@/components/NumberGame";
import MixGame from "@/components/MixGame";
import WordGame from "@/components/WordGame";
import { adjectiveWordItems } from "@/data/gameData";

type GameMode = "menu" | "gender" | "number" | "mix" | "words" | "adjectives";

const Index = () => {
  const [mode, setMode] = useState<GameMode>("menu");

  if (mode === "gender") return <GenderGame onBack={() => setMode("menu")} />;
  if (mode === "number") return <NumberGame onBack={() => setMode("menu")} />;
  if (mode === "mix") return <MixGame onBack={() => setMode("menu")} />;
  if (mode === "words") return <WordGame onBack={() => setMode("menu")} />;
  if (mode === "adjectives") return <WordGame onBack={() => setMode("menu")} items={adjectiveWordItems} modeLabel="Mots & Adjectifs" />;
  return <GameMenu onSelectMode={setMode} />;
};

export default Index;
