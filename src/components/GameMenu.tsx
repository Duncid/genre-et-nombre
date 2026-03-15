import { BookOpen, Users, Shuffle, Type, PenLine, Layers, GraduationCap } from "lucide-react";

interface GameMenuProps {
  onSelectMode: (mode: "gender" | "number" | "mix" | "words" | "adjectives" | "sentence" | "sentence-advanced") => void;
}

const GameMenu = ({ onSelectMode }: GameMenuProps) => {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-8 p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full max-w-md">
        <button
          onClick={() => onSelectMode("gender")}
          className="group flex items-center gap-3 rounded-xl bg-card p-4 shadow-md ring-1 ring-game-feminine/30 transition-all hover:scale-[1.03] hover:shadow-lg hover:ring-game-feminine active:scale-95"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-game-feminine/10">
            <BookOpen className="h-5 w-5 text-game-feminine" />
          </div>
          <div className="text-left">
            <span className="text-sm font-bold font-display leading-tight block">Féminin / Masculin</span>
            <span className="text-xs text-muted-foreground">UN ou UNE ?</span>
          </div>
        </button>

        <button
          onClick={() => onSelectMode("number")}
          className="group flex items-center gap-3 rounded-xl bg-card p-4 shadow-md ring-1 ring-game-singular/30 transition-all hover:scale-[1.03] hover:shadow-lg hover:ring-game-singular active:scale-95"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-game-singular/10">
            <Users className="h-5 w-5 text-game-singular" />
          </div>
          <div className="text-left">
            <span className="text-sm font-bold font-display leading-tight block">Singulier / Pluriel</span>
            <span className="text-xs text-muted-foreground">Un ou plusieurs ?</span>
          </div>
        </button>

        <button
          onClick={() => onSelectMode("mix")}
          className="group flex items-center gap-3 rounded-xl bg-card p-4 shadow-md ring-1 ring-primary/30 transition-all hover:scale-[1.03] hover:shadow-lg hover:ring-primary active:scale-95"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary/10">
            <Shuffle className="h-5 w-5 text-primary" />
          </div>
          <div className="text-left">
            <span className="text-sm font-bold font-display leading-tight block">Mode Mixte</span>
            <span className="text-xs text-muted-foreground">Genre + Nombre</span>
          </div>
        </button>

        <button
          onClick={() => onSelectMode("words")}
          className="group flex items-center gap-3 rounded-xl bg-card p-4 shadow-md ring-1 ring-accent/30 transition-all hover:scale-[1.03] hover:shadow-lg hover:ring-accent active:scale-95"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-accent/10">
            <Type className="h-5 w-5 text-accent-foreground" />
          </div>
          <div className="text-left">
            <span className="text-sm font-bold font-display leading-tight block">Mode Mots</span>
            <span className="text-xs text-muted-foreground">Mots écrits</span>
          </div>
        </button>

        <button
          onClick={() => onSelectMode("adjectives")}
          className="group flex items-center gap-3 rounded-xl bg-card p-4 shadow-md ring-1 ring-secondary/30 transition-all hover:scale-[1.03] hover:shadow-lg hover:ring-secondary active:scale-95"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-secondary/10">
            <PenLine className="h-5 w-5 text-secondary" />
          </div>
          <div className="text-left">
            <span className="text-sm font-bold font-display leading-tight block">Mots & Adjectifs</span>
            <span className="text-xs text-muted-foreground">les grands arbres</span>
          </div>
        </button>

        <button
          onClick={() => onSelectMode("sentence")}
          className="group flex items-center gap-3 rounded-xl bg-card p-4 shadow-md ring-1 ring-game-singular/30 transition-all hover:scale-[1.03] hover:shadow-lg hover:ring-game-singular active:scale-95"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-game-singular/10">
            <Layers className="h-5 w-5 text-game-singular" />
          </div>
          <div className="text-left">
            <span className="text-sm font-bold font-display leading-tight block">Structure de phrase</span>
            <span className="text-xs text-muted-foreground">dét. / adj. / nom</span>
          </div>
        </button>

        <button
          onClick={() => onSelectMode("sentence-advanced")}
          className="group flex items-center gap-3 rounded-xl bg-card p-4 shadow-md ring-1 ring-game-plural/30 transition-all hover:scale-[1.03] hover:shadow-lg hover:ring-game-plural active:scale-95"
        >
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-game-plural/10">
            <GraduationCap className="h-5 w-5 text-game-plural" />
          </div>
          <div className="text-left">
            <span className="text-sm font-bold font-display leading-tight block">Structure avancée</span>
            <span className="text-xs text-muted-foreground">verbe, pronom…</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default GameMenu;
