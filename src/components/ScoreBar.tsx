import { ArrowLeft, Star, Circle } from "lucide-react";

interface ScoreBarProps {
  score: number;
  total: number;
  onBack: () => void;
  modeLabel: string;
  wrong?: number;
}

const ScoreBar = ({ score, total, onBack, modeLabel, wrong }: ScoreBarProps) => {
  const progress = total > 0 ? (score / total) * 100 : 0;

  return (
    <div>
      <div className="flex items-center justify-between px-4 py-3 sm:px-8 sm:py-5">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 rounded-[14px] border border-[#EFE3C2] bg-card px-3 py-2 font-bold text-[13px] transition-all hover:scale-105 active:scale-95"
        >
          <ArrowLeft size={14} />
          Menu
        </button>
        <span className="font-display font-semibold text-[16px]">{modeLabel}</span>
        <div className="flex items-center gap-1.5 rounded-[14px] border border-[#EFE3C2] bg-card px-3.5 py-2">
          <Star size={14} className="fill-game-singular text-game-singular" />
          <span className="font-display font-semibold text-[16px]">{score}</span>
          {typeof wrong === "number" ? (
            <>
              <Circle size={10} className="ml-1.5 fill-game-error text-game-error" />
              <span className="font-display font-semibold text-[16px]">{wrong}</span>
            </>
          ) : (
            <span className="font-display font-semibold text-[16px]">/{total}</span>
          )}
        </div>
      </div>
      <div className="mx-4 sm:mx-8 h-1.5 rounded-full bg-foreground/[0.08]">
        <div
          className="h-1.5 rounded-full bg-primary transition-all duration-200"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default ScoreBar;
