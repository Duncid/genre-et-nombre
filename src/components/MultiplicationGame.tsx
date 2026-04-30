import { useState, useMemo, useCallback } from "react";
import ScoreBar from "./ScoreBar";
import { ArrowLeft } from "lucide-react";

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
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);
  const [seed, setSeed] = useState(0);

  // Generate the queue of multipliers (1..10) shuffled
  const multipliers = useMemo(() => {
    if (!table) return [];
    const base = Array.from({ length: 10 }, (_, i) => i + 1);
    return shuffle(base).slice(0, QUESTIONS_PER_ROUND);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, seed]);

  const currentMultiplier = multipliers[questionIndex];
  const correctAnswer = table && currentMultiplier ? table * currentMultiplier : 0;

  // Generate 6 unique answer options from the same table
  const options = useMemo(() => {
    if (!table || !currentMultiplier) return [];
    const allResults = Array.from({ length: 10 }, (_, i) => table * (i + 1));
    const distractors = shuffle(allResults.filter((r) => r !== correctAnswer)).slice(0, 5);
    return shuffle([correctAnswer, ...distractors]);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [table, currentMultiplier, questionIndex, seed]);

  const handleAnswer = useCallback(
    (answer: number) => {
      if (feedback) return;
      const correct = answer === correctAnswer;
      if (correct) setScore((s) => s + 1);
      setSelectedAnswer(answer);
      setFeedback(correct ? "correct" : "wrong");

      setTimeout(() => {
        setFeedback(null);
        setSelectedAnswer(null);
        if (questionIndex + 1 >= multipliers.length) {
          setFinished(true);
        } else {
          setQuestionIndex((i) => i + 1);
        }
      }, 1200);
    },
    [feedback, correctAnswer, questionIndex, multipliers.length]
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

  // Table selection screen
  if (table === null) {
    return (
      <div className="flex min-h-screen flex-col">
        <div className="flex items-center justify-between px-4 py-3">
          <button
            onClick={onBack}
            className="flex items-center gap-1 rounded-xl bg-card px-3 py-2 text-sm font-semibold shadow transition-all hover:scale-105 active:scale-95"
          >
            <ArrowLeft className="h-4 w-4" />
            Menu
          </button>
          <span className="font-display text-lg font-bold">Multiplications</span>
          <div className="w-16" />
        </div>

        <div className="flex flex-1 flex-col items-center justify-center gap-8 p-6">
          <h2 className="text-3xl font-bold font-display">Choisis ta table</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {AVAILABLE_TABLES.map((t) => (
              <button
                key={t}
                onClick={() => setTable(t)}
                className="flex h-28 w-28 flex-col items-center justify-center rounded-2xl bg-card shadow-lg ring-2 ring-primary/30 transition-all hover:scale-105 hover:ring-primary active:scale-95"
              >
                <span className="text-4xl font-bold font-display text-primary">×{t}</span>
                <span className="text-xs text-muted-foreground mt-1">Table de {t}</span>
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  }

  if (finished) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
        <h2 className="text-4xl font-bold font-display">🎉 Bravo !</h2>
        <p className="text-2xl font-semibold">
          Tu as obtenu <span className="text-primary">{score}</span> / {multipliers.length}
        </p>
        <p className="text-lg text-muted-foreground">Table de {table}</p>
        <div className="flex gap-3">
          <button
            onClick={() => resetRound(table)}
            className="rounded-2xl bg-primary px-6 py-3 text-base font-bold text-primary-foreground shadow-lg transition-all hover:scale-105 active:scale-95"
          >
            Rejouer
          </button>
          <button
            onClick={() => resetRound(undefined as unknown as number) || setTable(null)}
            className="rounded-2xl bg-card px-6 py-3 text-base font-bold shadow-lg ring-1 ring-border transition-all hover:scale-105 active:scale-95"
          >
            Changer de table
          </button>
          <button
            onClick={onBack}
            className="rounded-2xl bg-card px-6 py-3 text-base font-bold shadow-lg ring-1 ring-border transition-all hover:scale-105 active:scale-95"
          >
            Menu
          </button>
        </div>
      </div>
    );
  }

  if (!currentMultiplier) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <ScoreBar
        score={score}
        total={multipliers.length}
        onBack={onBack}
        modeLabel={`Table de ${table}`}
      />

      <div className="flex flex-1 flex-col items-center justify-center gap-8 p-6">
        {/* Question */}
        <div
          className={`game-pop flex h-40 w-72 items-center justify-center rounded-3xl bg-card shadow-xl ring-4 transition-all sm:h-48 sm:w-96 ${
            feedback === "correct"
              ? "ring-game-success game-bounce"
              : feedback === "wrong"
              ? "ring-game-error game-shake"
              : "ring-primary/30"
          }`}
        >
          <span className="text-5xl font-bold font-display sm:text-6xl">
            {table} × {currentMultiplier}
          </span>
        </div>

        {/* Feedback */}
        <div className="h-8 text-center">
          {feedback === "correct" && (
            <p className="text-xl font-bold text-game-success game-pop">✅ Bravo !</p>
          )}
          {feedback === "wrong" && (
            <p className="text-xl font-bold text-game-error game-pop">
              ❌ Non ! {table} × {currentMultiplier} = {correctAnswer}
            </p>
          )}
        </div>

        {/* Options */}
        <div className="grid grid-cols-3 gap-3 sm:gap-4">
          {options.map((opt) => {
            const isCorrect = opt === correctAnswer;
            const isSelected = opt === selectedAnswer;
            let extra = "bg-card ring-1 ring-border hover:ring-primary";
            if (feedback && isCorrect) extra = "bg-game-success/20 ring-2 ring-game-success text-game-success";
            else if (feedback && isSelected && !isCorrect)
              extra = "bg-game-error/20 ring-2 ring-game-error text-game-error";
            else if (feedback) extra = "bg-card ring-1 ring-border opacity-60";

            return (
              <button
                key={opt}
                onClick={() => handleAnswer(opt)}
                disabled={!!feedback}
                className={`flex h-20 w-20 items-center justify-center rounded-2xl text-2xl font-bold shadow-md transition-all hover:scale-105 active:scale-95 disabled:cursor-not-allowed sm:h-24 sm:w-24 sm:text-3xl ${extra}`}
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
