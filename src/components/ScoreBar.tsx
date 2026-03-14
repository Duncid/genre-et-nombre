import { ArrowLeft } from "lucide-react";

interface ScoreBarProps {
  score: number;
  total: number;
  onBack: () => void;
  modeLabel: string;
}

const ScoreBar = ({ score, total, onBack, modeLabel }: ScoreBarProps) => {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <button
        onClick={onBack}
        className="flex items-center gap-1 rounded-xl bg-card px-3 py-2 text-sm font-semibold shadow transition-all hover:scale-105 active:scale-95"
      >
        <ArrowLeft className="h-4 w-4" />
        Menu
      </button>
      <span className="font-display text-lg font-bold">{modeLabel}</span>
      <div className="rounded-xl bg-card px-4 py-2 font-display text-lg font-bold shadow">
        ⭐ {score}/{total}
      </div>
    </div>
  );
};

export default ScoreBar;
