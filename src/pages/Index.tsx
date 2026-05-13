import { useState } from "react";
import GameMenu from "@/components/GameMenu";
import GenderGame from "@/components/GenderGame";
import NumberGame from "@/components/NumberGame";
import MixGame from "@/components/MixGame";
import WordGame from "@/components/WordGame";
import SentenceGame from "@/components/SentenceGame";
import MultiplicationGame from "@/components/MultiplicationGame";
import AdjectiveChoiceGame from "@/components/AdjectiveChoiceGame";
import QuestionGuessGame from "@/components/QuestionGuessGame";
import { adjectiveWordItems } from "@/data/gameData";
import { advancedSentenceItems, advancedRoles } from "@/data/sentenceData";

type GameMode = "menu" | "gender" | "number" | "mix" | "words" | "adjectives" | "adjective-choice" | "sentence" | "sentence-advanced" | "question-guess" | "multiplication";

const Index = () => {
  const [mode, setMode] = useState<GameMode>("menu");

  if (mode === "gender") return <GenderGame onBack={() => setMode("menu")} />;
  if (mode === "number") return <NumberGame onBack={() => setMode("menu")} />;
  if (mode === "mix") return <MixGame onBack={() => setMode("menu")} />;
  if (mode === "words") return <WordGame onBack={() => setMode("menu")} />;
  if (mode === "adjectives") return <WordGame onBack={() => setMode("menu")} items={adjectiveWordItems} modeLabel="Lis et classe" />;
  if (mode === "adjective-choice") return <AdjectiveChoiceGame onBack={() => setMode("menu")} />;
  if (mode === "sentence") return <SentenceGame onBack={() => setMode("menu")} />;
  if (mode === "sentence-advanced") return <SentenceGame onBack={() => setMode("menu")} items={advancedSentenceItems} roles={advancedRoles} modeLabel="Je suis expert !" />;
  if (mode === "question-guess") return <QuestionGuessGame onBack={() => setMode("menu")} />;
  if (mode === "multiplication") return <MultiplicationGame onBack={() => setMode("menu")} />;
  return <GameMenu onSelectMode={setMode} />;
};

export default Index;
