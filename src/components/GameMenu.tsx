import { BookOpen, Users, Shuffle } from "lucide-react";

interface GameMenuProps {
  onSelectMode: (mode: "gender" | "number" | "mix") => void;
}

const GameMenu = ({ onSelectMode }: GameMenuProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <div className="text-center">
        <h1 className="text-5xl font-bold tracking-tight md:text-7xl">
          🇫🇷 Jeu de Français
        </h1>
        <p className="mt-4 text-lg text-muted-foreground font-semibold">
          Apprends la grammaire en t'amusant !
        </p>
      </div>

      <div className="flex flex-col gap-5 sm:flex-row">
        <button
          onClick={() => onSelectMode("gender")}
          className="group flex flex-col items-center gap-3 rounded-2xl bg-card p-8 shadow-lg ring-2 ring-game-feminine/30 transition-all hover:scale-105 hover:shadow-xl hover:ring-game-feminine active:scale-95 min-w-[220px]"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-game-feminine/10">
            <BookOpen className="h-8 w-8 text-game-feminine" />
          </div>
          <span className="text-xl font-bold font-display">
            Féminin / Masculin
          </span>
          <span className="text-sm text-muted-foreground">
            UN ou UNE ?
          </span>
        </button>

        <button
          onClick={() => onSelectMode("number")}
          className="group flex flex-col items-center gap-3 rounded-2xl bg-card p-8 shadow-lg ring-2 ring-game-singular/30 transition-all hover:scale-105 hover:shadow-xl hover:ring-game-singular active:scale-95 min-w-[220px]"
        >
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-game-singular/10">
            <Users className="h-8 w-8 text-game-singular" />
          </div>
          <span className="text-xl font-bold font-display">
            Singulier / Pluriel
          </span>
          <span className="text-sm text-muted-foreground">
            Un ou plusieurs ?
          </span>
        </button>
      </div>
    </div>
  );
};

export default GameMenu;
