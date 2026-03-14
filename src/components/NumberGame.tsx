import { useState, useCallback, useMemo } from "react";
import { numberItems, type NumberItem } from "@/data/gameData";
import ScoreBar from "./ScoreBar";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface NumberGameProps {
  onBack: () => void;
}

const NumberGame = ({ onBack }: NumberGameProps) => {
  const queue = useMemo(() => shuffle(numberItems), []);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [finished, setFinished] = useState(false);

  const current: NumberItem | undefined = queue[index];

  const handleAnswer = useCallback(
    (answer: "singulier" | "pluriel") => {
      if (feedback || !current) return;
      const correct = answer === current.number;
      if (correct) setScore((s) => s + 1);
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
        <h2 className="text-4xl font-bold font-display">🎉 Bravo !</h2>
        <p className="text-2xl font-semibold">
          Tu as obtenu <span className="text-primary">{score}</span> / {queue.length}
        </p>
        <button
          onClick={onBack}
          className="rounded-2xl bg-primary px-8 py-3 text-lg font-bold text-primary-foreground shadow-lg transition-all hover:scale-105 active:scale-95"
        >
          Retour au menu
        </button>
      </div>
    );
  }

  if (!current) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <ScoreBar
        score={score}
        total={queue.length}
        onBack={onBack}
        modeLabel="Singulier / Pluriel"
      />

      <div className="flex flex-1 flex-col items-center justify-center gap-8 p-6">
        <div
          className={`game-pop relative flex h-56 w-56 items-center justify-center rounded-3xl bg-card shadow-xl ring-4 transition-all sm:h-72 sm:w-72 ${
            feedback === "correct"
              ? "ring-game-success game-bounce"
              : feedback === "wrong"
              ? "ring-game-error game-shake"
              : "ring-transparent"
          }`}
        >
          <img
            src={current.image}
            alt={current.name}
            className="h-40 w-40 object-contain sm:h-56 sm:w-56"
          />
        </div>

        <div className="h-8 text-center">
          {feedback === "correct" && (
            <p className="text-xl font-bold text-game-success game-pop">
              ✅ Correct ! C'est « {current.label} »
            </p>
          )}
          {feedback === "wrong" && (
            <p className="text-xl font-bold text-game-error game-pop">
              ❌ Non ! C'est « {current.label} » ({current.number})
            </p>
          )}
        </div>

        <div className="flex gap-5">
          <button
            onClick={() => handleAnswer("singulier")}
            disabled={!!feedback}
            className="rounded-2xl bg-game-singular px-10 py-4 text-xl font-bold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:brightness-110 active:scale-95 disabled:opacity-60"
          >
            Singulier
          </button>
          <button
            onClick={() => handleAnswer("pluriel")}
            disabled={!!feedback}
            className="rounded-2xl bg-game-plural px-10 py-4 text-xl font-bold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:brightness-110 active:scale-95 disabled:opacity-60"
          >
            Pluriel
          </button>
        </div>
      </div>
    </div>
  );
};

export default NumberGame;
