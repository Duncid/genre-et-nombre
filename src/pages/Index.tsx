import { useState } from "react";
import GameMenu from "@/components/GameMenu";
import GenderGame from "@/components/GenderGame";
import NumberGame from "@/components/NumberGame";

type GameMode = "menu" | "gender" | "number";

const Index = () => {
  const [mode, setMode] = useState<GameMode>("menu");

  if (mode === "gender") return <GenderGame onBack={() => setMode("menu")} />;
  if (mode === "number") return <NumberGame onBack={() => setMode("menu")} />;
  return <GameMenu onSelectMode={setMode} />;
};

export default Index;
