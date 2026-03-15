import { useState, useCallback, useMemo } from "react";
import { wordItems, type Gender, type NumberType, type WordItem } from "@/data/gameData";
import ScoreBar from "./ScoreBar";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface WordGameProps {
  onBack: () => void;
}

const WordGame = ({ onBack }: WordGameProps) => {
  const queue = useMemo(() => shuffle(wordItems), []);
  const [index, setIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [genderAnswer, setGenderAnswer] = useState<Gender | null>(null);
  const [numberAnswer, setNumberAnswer] = useState<NumberType | null>(null);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [finished, setFinished] = useState(false);

  const current = queue[index];

  const validate = useCallback(
    (gender: Gender | null, number: NumberType | null) => {
      if (!gender || !number || feedback || !current) return;

      const correct = gender === current.gender && number === current.number;
      if (correct) setScore((s) => s + 1);
      setFeedback(correct ? "correct" : "wrong");

      setTimeout(() => {
        setFeedback(null);
        setGenderAnswer(null);
        setNumberAnswer(null);
        if (index + 1 >= queue.length) {
          setFinished(true);
        } else {
          setIndex((i) => i + 1);
        }
      }, 1200);
    },
    [feedback, current, index, queue.length]
  );

  const handleGender = useCallback(
    (g: Gender) => {
      if (feedback) return;
      setGenderAnswer(g);
      validate(g, numberAnswer);
    },
    [feedback, numberAnswer, validate]
  );

  const handleNumber = useCallback(
    (n: NumberType) => {
      if (feedback) return;
      setNumberAnswer(n);
      validate(genderAnswer, n);
    },
    [feedback, genderAnswer, validate]
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

  // Display the word with article
  const displayWord = current.word.charAt(0).toUpperCase() + current.word.slice(1);

  return (
    <div className="flex min-h-screen flex-col">
      <ScoreBar
        score={score}
        total={queue.length}
        onBack={onBack}
        modeLabel="Mode Mots"
      />

      <div className="flex flex-1 flex-col items-center justify-center gap-6 p-6">
        <div
          className={`game-pop flex h-48 w-64 items-center justify-center transition-all sm:h-56 sm:w-80 ${
            feedback === "correct"
              ? "game-bounce"
              : feedback === "wrong"
              ? "game-shake"
              : ""
          }`}
        >
          <span
            className={`text-4xl font-bold sm:text-5xl transition-colors ${
              feedback === "correct"
                ? "text-game-success"
                : feedback === "wrong"
                ? "text-game-error"
                : "text-foreground"
            }`}
            style={{ fontFamily: '"Belle Allure", cursive' }}
          >
            {displayWord}
          </span>
        </div>

        <div className="h-8 text-center">
          {feedback === "correct" && (
            <p className="text-xl font-bold text-game-success game-pop">
              ✅ Correct ! C'est « {current.label} »
            </p>
          )}
          {feedback === "wrong" && (
            <p className="text-xl font-bold text-game-error game-pop">
              ❌ Non ! C'est « {current.label} » ({current.gender}, {current.number})
            </p>
          )}
        </div>

        {/* Gender row */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-semibold text-muted-foreground">Genre</span>
          <div className="flex gap-4">
            <button
              onClick={() => handleGender("féminin")}
              disabled={!!feedback}
              className={`rounded-2xl px-8 py-3 text-lg font-bold shadow-lg transition-all hover:scale-105 hover:brightness-110 active:scale-95 disabled:opacity-60 ${
                genderAnswer === "féminin"
                  ? "bg-game-feminine text-primary-foreground ring-2 ring-game-feminine ring-offset-2"
                  : "bg-game-feminine/30 text-game-feminine"
              }`}
            >
              Féminin
            </button>
            <button
              onClick={() => handleGender("masculin")}
              disabled={!!feedback}
              className={`rounded-2xl px-8 py-3 text-lg font-bold shadow-lg transition-all hover:scale-105 hover:brightness-110 active:scale-95 disabled:opacity-60 ${
                genderAnswer === "masculin"
                  ? "bg-game-masculine text-primary-foreground ring-2 ring-game-masculine ring-offset-2"
                  : "bg-game-masculine/30 text-game-masculine"
              }`}
            >
              Masculin
            </button>
          </div>
        </div>

        {/* Number row */}
        <div className="flex flex-col items-center gap-2">
          <span className="text-sm font-semibold text-muted-foreground">Nombre</span>
          <div className="flex gap-4">
            <button
              onClick={() => handleNumber("singulier")}
              disabled={!!feedback}
              className={`rounded-2xl px-8 py-3 text-lg font-bold shadow-lg transition-all hover:scale-105 hover:brightness-110 active:scale-95 disabled:opacity-60 ${
                numberAnswer === "singulier"
                  ? "bg-game-singular text-primary-foreground ring-2 ring-game-singular ring-offset-2"
                  : "bg-game-singular/30 text-game-singular"
              }`}
            >
              Singulier
            </button>
            <button
              onClick={() => handleNumber("pluriel")}
              disabled={!!feedback}
              className={`rounded-2xl px-8 py-3 text-lg font-bold shadow-lg transition-all hover:scale-105 hover:brightness-110 active:scale-95 disabled:opacity-60 ${
                numberAnswer === "pluriel"
                  ? "bg-game-plural text-primary-foreground ring-2 ring-game-plural ring-offset-2"
                  : "bg-game-plural/30 text-game-plural"
              }`}
            >
              Pluriel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WordGame;
