import { useState, useCallback, useMemo } from "react";
import { Check, X } from "lucide-react";
import { genderItems, type GenderItem } from "@/data/gameData";
import ScoreBar from "./ScoreBar";
import { playCorrect, playWrong } from "@/lib/sounds";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface GenderGameProps {
  onBack: () => void;
}

const GenderGame = ({ onBack }: GenderGameProps) => {
  const queue = useMemo(() => shuffle(genderItems), []);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [finished, setFinished] = useState(false);

  const current: GenderItem | undefined = queue[index];

  const handleAnswer = useCallback(
    (answer: "féminin" | "masculin") => {
      if (feedback || !current) return;
      const correct = answer === current.gender;
      if (correct) {
        setScore((s) => s + 1);
        playCorrect();
      } else {
        playWrong();
      }
      setFeedback(correct ? "correct" : "wrong");

      setTimeout(() => {
        setFeedback(null);
        if (index + 1 >= queue.length) {
          setFinished(true);
        } else {
          setIndex((i) => i + 1);
        }
      }, 1200);
    },
    [feedback, current, index, queue.length]
  );

  if (finished) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
        <h2 className="font-display text-[44px] sm:text-[56px] underline decoration-primary underline-offset-8">
          🎉 Bravo !
        </h2>
        <p className="text-[22px] font-semibold">
          Tu as obtenu <span className="text-primary">{score}</span> / {queue.length}
        </p>
        <button
          onClick={onBack}
          className="btn-stack rounded-[18px] bg-primary px-8 py-3.5 font-display font-semibold text-[18px] text-primary-foreground transition-all hover:scale-105"
        >
          Retour au menu
        </button>
      </div>
    );
  }

  if (!current) return null;

  const cardStyle: React.CSSProperties =
    feedback === "correct"
      ? { boxShadow: "0 0 0 4px hsl(var(--game-success)), 0 20px 50px rgba(31,36,64,0.08)", border: "none" }
      : feedback === "wrong"
      ? { boxShadow: "0 0 0 4px hsl(var(--game-error))", border: "none" }
      : { boxShadow: "0 20px 50px rgba(31,36,64,0.08)" };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScoreBar score={score} total={queue.length} onBack={onBack} modeLabel="Féminin / Masculin" />

      <div className="flex flex-1 flex-col items-center justify-center gap-7 p-5 sm:p-8">
        {/* Image card */}
        <div
          key={current.name}
          className={`game-pop flex h-[220px] w-[220px] items-center justify-center rounded-[32px] border border-[#EFE3C2] bg-card p-[22px] transition-all sm:h-[280px] sm:w-[280px] ${
            feedback === "correct" ? "game-bounce" : feedback === "wrong" ? "game-shake" : ""
          }`}
          style={cardStyle}
        >
          <img src={current.image} alt={current.name} className="h-40 w-40 object-contain sm:h-56 sm:w-56" />
        </div>

        {/* Question */}
        <p className="font-display font-semibold text-[22px] sm:text-[28px]">Cette image, c'est…</p>

        {/* Feedback row */}
        <div className="h-6 flex items-center justify-center gap-2">
          {feedback === "correct" && (
            <p className="game-pop flex items-center gap-1.5 font-display font-semibold text-[18px] text-game-success">
              <Check size={20} className="text-game-success" />
              C'est {current.article} {current.name} — bravo !
            </p>
          )}
          {feedback === "wrong" && (
            <p className="game-pop flex items-center gap-1.5 font-display font-semibold text-[18px] text-game-error">
              <X size={20} className="text-game-error" />
              C'est {current.article} {current.name} ({current.gender})
            </p>
          )}
        </div>

        {/* Choice buttons */}
        <div className="flex gap-5">
          <button
            onClick={() => handleAnswer("féminin")}
            disabled={!!feedback}
            className="btn-stack rounded-[18px] bg-game-feminine px-7 py-3.5 font-display font-semibold text-[18px] tracking-[0.2px] text-white transition-all hover:scale-105 disabled:pointer-events-none disabled:opacity-60 sm:px-9 sm:py-4 sm:text-[22px]"
          >
            Féminin
          </button>
          <button
            onClick={() => handleAnswer("masculin")}
            disabled={!!feedback}
            className="btn-stack rounded-[18px] bg-game-masculine px-7 py-3.5 font-display font-semibold text-[18px] tracking-[0.2px] text-white transition-all hover:scale-105 disabled:pointer-events-none disabled:opacity-60 sm:px-9 sm:py-4 sm:text-[22px]"
          >
            Masculin
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenderGame;
