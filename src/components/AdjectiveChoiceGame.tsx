import { useState, useCallback, useMemo } from "react";
import ScoreBar from "./ScoreBar";
import { playCorrect, playWrong } from "@/lib/sounds";
import { generateAdjectiveExercises, type AdjectiveExerciseItem } from "@/data/adjectiveData";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface Props {
  onBack: () => void;
}

type FormKey = "ms" | "fs" | "mp" | "fp";

function correctKey(item: AdjectiveExerciseItem): FormKey {
  if (item.gender === "masculin" && item.number === "singulier") return "ms";
  if (item.gender === "féminin" && item.number === "singulier") return "fs";
  if (item.gender === "masculin" && item.number === "pluriel") return "mp";
  return "fp";
}

const AdjectiveChoiceGame = ({ onBack }: Props) => {
  const queue = useMemo(() => generateAdjectiveExercises(12), []);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selected, setSelected] = useState<FormKey | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [finished, setFinished] = useState(false);

  const current = queue[index];

  const options = useMemo(() => {
    if (!current) return [];
    const opts: { key: FormKey; word: string }[] = [
      { key: "ms", word: current.adjective.ms },
      { key: "fs", word: current.adjective.fs },
      { key: "mp", word: current.adjective.mp },
      { key: "fp", word: current.adjective.fp },
    ];
    return shuffle(opts);
  }, [current]);

  const handleChoose = useCallback(
    (key: FormKey, e?: React.MouseEvent<HTMLButtonElement>) => {
      if (feedback || !current) return;
      e?.currentTarget.blur();
      setSelected(key);
      const correct = key === correctKey(current);
      if (correct) {
        setScore((s) => s + 1);
        playCorrect();
      } else {
        playWrong();
      }
      setFeedback(correct ? "correct" : "wrong");

      setTimeout(() => {
        setFeedback(null);
        setSelected(null);
        if (index + 1 >= queue.length) {
          setFinished(true);
        } else {
          setIndex((i) => i + 1);
        }
      }, 1400);
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

  const [before, after] = current.template.split("{adj}");
  const correctWord = current.adjective[correctKey(current)];

  return (
    <div className="flex min-h-screen flex-col">
      <ScoreBar
        score={score}
        total={queue.length}
        onBack={onBack}
        modeLabel="Choisis l'adjectif"
      />

      <div className="flex flex-1 flex-col items-center justify-center gap-8 p-6">
        <div
          className={`game-pop flex min-h-32 max-w-2xl items-center justify-center rounded-3xl bg-card px-6 py-8 shadow-xl ring-4 transition-all ${
            feedback === "correct"
              ? "ring-game-success game-bounce"
              : feedback === "wrong"
              ? "ring-game-error game-shake"
              : "ring-transparent"
          }`}
        >
          <span
            className="text-3xl font-bold sm:text-4xl text-foreground text-center"
            style={{ fontFamily: '"Belle Allure", cursive' }}
          >
            {before}
            <span
              className={`mx-1 inline-block min-w-24 border-b-4 px-2 ${
                feedback === "correct"
                  ? "border-game-success text-game-success"
                  : feedback === "wrong"
                  ? "border-game-error text-game-error"
                  : "border-muted-foreground/40 text-muted-foreground/60"
              }`}
            >
              {feedback ? correctWord : "…"}
            </span>
            {after}
          </span>
        </div>

        <div className="h-8 text-center">
          {feedback === "correct" && (
            <p className="text-xl font-bold text-game-success game-pop">✅ Bravo !</p>
          )}
          {feedback === "wrong" && (
            <p className="text-xl font-bold text-game-error game-pop">
              ❌ La bonne réponse était « {correctWord} »
            </p>
          )}
        </div>

        <div className="grid grid-cols-2 gap-3 sm:gap-4 w-full max-w-md">
          {options.map((opt) => {
            const isSelected = selected === opt.key;
            const isCorrect = feedback && opt.key === correctKey(current);
            return (
              <button
                key={opt.key}
                onClick={(e) => handleChoose(opt.key, e)}
                disabled={!!feedback}
                className={`rounded-2xl px-6 py-4 text-xl font-bold shadow-lg transition-all hover:scale-105 hover:brightness-110 active:scale-95 disabled:opacity-80 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                  isCorrect
                    ? "bg-game-success text-primary-foreground"
                    : isSelected && feedback === "wrong"
                    ? "bg-game-error text-primary-foreground"
                    : "bg-card text-foreground ring-1 ring-primary/20"
                }`}
                style={{ fontFamily: '"Belle Allure", cursive' }}
              >
                {opt.word}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AdjectiveChoiceGame;
