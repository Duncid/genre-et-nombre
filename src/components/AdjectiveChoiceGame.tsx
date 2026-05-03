import { useState, useCallback, useMemo } from "react";
import { Check, X } from "lucide-react";
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

  const [before, after] = current.template.split("{adj}");
  const correctWord = current.adjective[correctKey(current)];

  const cardStyle: React.CSSProperties =
    feedback === "correct"
      ? { boxShadow: "0 0 0 4px hsl(var(--game-success)), 0 20px 50px rgba(31,36,64,0.08)", border: "none" }
      : feedback === "wrong"
      ? { boxShadow: "0 0 0 4px hsl(var(--game-error))", border: "none" }
      : { boxShadow: "0 20px 50px rgba(31,36,64,0.08)" };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScoreBar score={score} total={queue.length} onBack={onBack} modeLabel="Choisis l'adjectif" />

      <div className="flex flex-1 flex-col items-center justify-center gap-7 p-5 sm:p-8">
        <div
          className={`game-pop flex min-h-32 max-w-2xl items-center justify-center rounded-[32px] border border-[#EFE3C2] bg-card px-6 py-8 transition-all ${
            feedback === "correct" ? "game-bounce" : feedback === "wrong" ? "game-shake" : ""
          }`}
          style={cardStyle}
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
              La bonne réponse était « {correctWord} »
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
                className={`btn-stack rounded-[18px] px-6 py-4 font-display font-semibold text-[18px] transition-all hover:scale-105 disabled:pointer-events-none disabled:opacity-80 ${
                  isCorrect
                    ? "bg-game-success text-white"
                    : isSelected && feedback === "wrong"
                    ? "bg-game-error text-white"
                    : "bg-card text-foreground border border-[#EFE3C2]"
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
