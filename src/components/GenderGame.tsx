import { useState, useCallback, useMemo } from "react";
import { genderItems, type GenderItem } from "@/data/gameData";
import ScoreBar from "./ScoreBar";

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
        modeLabel="Féminin / Masculin"
      />

      <div className="flex flex-1 flex-col items-center justify-center gap-8 p-6">
        {/* Image card */}
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

        {/* Feedback text */}
        <div className="h-8 text-center">
          {feedback === "correct" && (
            <p className="text-xl font-bold text-game-success game-pop">
              ✅ Correct ! C'est {current.article} {current.name}
            </p>
          )}
          {feedback === "wrong" && (
            <p className="text-xl font-bold text-game-error game-pop">
              ❌ Non ! C'est {current.article} {current.name} ({current.gender})
            </p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex gap-5">
          <button
            onClick={() => handleAnswer("féminin")}
            disabled={!!feedback}
            className="rounded-2xl bg-game-feminine px-10 py-4 text-xl font-bold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:brightness-110 active:scale-95 disabled:opacity-60"
          >
            Féminin
          </button>
          <button
            onClick={() => handleAnswer("masculin")}
            disabled={!!feedback}
            className="rounded-2xl bg-game-masculine px-10 py-4 text-xl font-bold text-primary-foreground shadow-lg transition-all hover:scale-105 hover:brightness-110 active:scale-95 disabled:opacity-60"
          >
            Masculin
          </button>
        </div>
      </div>
    </div>
  );
};

export default GenderGame;
