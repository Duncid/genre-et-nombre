import { useState, useMemo, useCallback } from "react";
import { Check, X, ArrowLeft } from "lucide-react";
import ScoreBar from "./ScoreBar";
import { playCorrect, playWrong, speakFrench } from "@/lib/sounds";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface MultiplicationGameProps {
  onBack: () => void;
}

const AVAILABLE_TABLES = [2, 3, 4, 5];
const QUESTIONS_PER_ROUND = 10;

const MultiplicationGame = ({ onBack }: MultiplicationGameProps) => {
  const [table, setTable] = useState<number | null>(null);
  const [showTablePreview, setShowTablePreview] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [seed, setSeed] = useState(0);

  const multipliers = useMemo(() => {
    if (!table) return [];
    const base = Array.from({ length: 10 }, (_, i) => i + 1);
    return shuffle(base).slice(0, QUESTIONS_PER_ROUND);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, seed]);

  const currentMultiplier = multipliers[questionIndex];
  const correctAnswer = table && currentMultiplier ? table * currentMultiplier : 0;

  const options = useMemo(() => {
    if (!table || !currentMultiplier) return [];
    const allResults = Array.from({ length: 10 }, (_, i) => table * (i + 1));
    const distractors = shuffle(allResults.filter((r) => r !== correctAnswer)).slice(0, 5);
    return shuffle([correctAnswer, ...distractors]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, currentMultiplier, questionIndex, seed]);

  const handleAnswer = useCallback(
    (answer: number, e?: React.MouseEvent<HTMLButtonElement>) => {
      if (feedback) return;
      e?.currentTarget.blur();
      const correct = answer === correctAnswer;
      if (correct) {
        setScore((s) => s + 1);
        playCorrect();
      } else {
        playWrong();
      }
      setSelectedAnswer(answer);
      setFeedback(correct ? "correct" : "wrong");
      speakFrench(`${table} fois ${currentMultiplier} égale ${correctAnswer}`, 350);

      setTimeout(() => {
        setFeedback(null);
        setSelectedAnswer(null);
        if (questionIndex + 1 >= multipliers.length) {
          setFinished(true);
        } else {
          setQuestionIndex((i) => i + 1);
        }
      }, 2200);
    },
    [feedback, correctAnswer, questionIndex, multipliers.length, table, currentMultiplier]
  );

  const resetRound = (newTable?: number) => {
    setQuestionIndex(0);
    setScore(0);
    setFeedback(null);
    setSelectedAnswer(null);
    setFinished(false);
    setSeed((s) => s + 1);
    if (newTable !== undefined) setTable(newTable);
  };

  const miniHeader = (label: string, onBackFn: () => void) => (
    <div>
      <div className="flex items-center justify-between px-4 py-3 sm:px-8 sm:py-5">
        <button
          onClick={onBackFn}
          className="flex items-center gap-1.5 rounded-[14px] border border-[#EFE3C2] bg-card px-3 py-2 font-bold text-[13px] transition-all hover:scale-105 active:scale-95"
        >
          <ArrowLeft size={14} />
          Menu
        </button>
        <span className="font-display font-semibold text-[16px]">{label}</span>
        <div className="w-16" />
      </div>
      <div className="mx-4 sm:mx-8 h-1.5 rounded-full bg-foreground/[0.08]" />
    </div>
  );

  // Table selection screen
  if (table === null) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        {miniHeader("Multiplications", onBack)}
        <div className="flex flex-1 flex-col items-center justify-center gap-8 p-6">
          <h2 className="font-display font-semibold text-[28px]">Choisis ta table</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {AVAILABLE_TABLES.map((t) => (
              <button
                key={t}
                onClick={() => { setTable(t); setShowTablePreview(true); }}
                className="btn-stack flex h-28 w-28 flex-col items-center justify-center rounded-[18px] border border-[#EFE3C2] bg-card transition-all hover:scale-105"
              >
                <span className="font-display font-semibold text-4xl text-primary">×{t}</span>
                <span className="text-xs text-muted-foreground mt-1">Table de {t}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  // Table preview screen
  if (showTablePreview) {
    return (
      <div className="flex min-h-screen flex-col bg-background">
        {miniHeader(`Table de ${table}`, () => { setShowTablePreview(false); setTable(null); })}
        <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
          <div className="grid grid-cols-1 gap-2 rounded-[28px] border border-[#EFE3C2] bg-card p-6 shadow-[0_20px_50px_rgba(31,36,64,0.08)]">
            {Array.from({ length: 10 }, (_, i) => i + 1).map((n) => (
              <div key={n} className="flex items-center justify-center gap-2 font-display font-semibold text-2xl sm:text-3xl">
                <span>{table}</span>
                <span className="text-primary">×</span>
                <span>{n}</span>
                <span className="text-muted-foreground">=</span>
                <span className="text-primary">{(table as number) * n}</span>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowTablePreview(false)}
            className="btn-stack rounded-[18px] bg-primary px-8 py-4 font-display font-semibold text-[18px] text-primary-foreground transition-all hover:scale-105"
          >
            Commencer ▶
          </button>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6 bg-background">
        <h2 className="font-display text-[44px] sm:text-[56px] underline decoration-primary underline-offset-8">
          🎉 Bravo !
        </h2>
        <p className="text-[22px] font-semibold">
          Tu as obtenu <span className="text-primary">{score}</span> / {multipliers.length}
        </p>
        <p className="text-lg text-muted-foreground">Table de {table}</p>
        <div className="flex gap-3 flex-wrap justify-center">
          <button
            onClick={() => resetRound(table)}
            className="btn-stack rounded-[18px] bg-primary px-6 py-3 font-display font-semibold text-[18px] text-primary-foreground transition-all hover:scale-105"
          >
            Rejouer
          </button>
          <button
            onClick={() => { setFinished(false); setQuestionIndex(0); setScore(0); setTable(null); }}
            className="btn-stack rounded-[18px] border border-[#EFE3C2] bg-card px-6 py-3 font-display font-semibold text-[18px] transition-all hover:scale-105"
          >
            Changer de table
          </button>
          <button
            onClick={onBack}
            className="btn-stack rounded-[18px] border border-[#EFE3C2] bg-card px-6 py-3 font-display font-semibold text-[18px] transition-all hover:scale-105"
          >
            Menu
          </button>
        </div>
      </div>
    );
  }

  if (!currentMultiplier) return null;

  const cardStyle: React.CSSProperties =
    feedback === "correct"
      ? { boxShadow: "0 0 0 4px hsl(var(--game-success)), 0 20px 50px rgba(31,36,64,0.08)", border: "none" }
      : feedback === "wrong"
      ? { boxShadow: "0 0 0 4px hsl(var(--game-error))", border: "none" }
      : { boxShadow: "0 20px 50px rgba(31,36,64,0.08)" };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScoreBar score={score} total={multipliers.length} onBack={onBack} modeLabel={`Table de ${table}`} />

      <div className="flex flex-1 flex-col items-center justify-center gap-7 p-5 sm:p-8">
        <div
          className={`game-pop flex h-40 w-72 items-center justify-center rounded-[32px] border border-[#EFE3C2] bg-card transition-all sm:h-48 sm:w-96 ${
            feedback === "correct" ? "game-bounce" : feedback === "wrong" ? "game-shake" : ""
          }`}
          style={cardStyle}
        >
          <span className="font-display font-semibold text-5xl sm:text-6xl">
            {table} × {currentMultiplier}
          </span>
        </div>

        <div className="h-6 flex items-center justify-center">
          {feedback === "correct" && (
            <p className="game-pop flex items-center gap-1.5 font-display font-semibold text-[18px] text-game-success">
              <Check size={20} />
              Bravo !
            </p>
          )}
          {feedback === "wrong" && (
            <p className="game-pop flex items-center gap-1.5 font-display font-semibold text-[18px] text-game-error">
              <X size={20} />
              {table} × {currentMultiplier} = {correctAnswer}
            </p>
          )}
        </div>

        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {options.map((opt) => {
            const isCorrect = opt === correctAnswer;
            const isSelected = opt === selectedAnswer;
            let extra = "border border-[#EFE3C2] bg-card text-foreground hover:border-primary";
            if (feedback && isCorrect) extra = "bg-game-success/20 border-2 border-game-success text-game-success";
            else if (feedback && isSelected && !isCorrect) extra = "bg-game-error/20 border-2 border-game-error text-game-error";
            else if (feedback) extra = "border border-[#EFE3C2] bg-card opacity-60";

            return (
              <button
                key={opt}
                onClick={(e) => handleAnswer(opt, e)}
                disabled={!!feedback}
                className={`btn-stack flex h-20 w-20 items-center justify-center rounded-[18px] font-display font-semibold text-2xl transition-all hover:scale-105 disabled:cursor-not-allowed sm:h-24 sm:w-24 sm:text-3xl ${extra}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default MultiplicationGame;
