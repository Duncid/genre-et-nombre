import { useState, useMemo, useCallback } from "react";
import ScoreBar from "./ScoreBar";
import {
  type SentenceItem,
  type GrammarRole,
  roleColors,
  simpleSentenceItems,
  simpleRoles,
} from "@/data/sentenceData";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface SentenceGameProps {
  onBack: () => void;
  items?: SentenceItem[];
  roles?: GrammarRole[];
  modeLabel?: string;
}

const SentenceGame = ({
  onBack,
  items,
  roles = simpleRoles,
  modeLabel = "Structure de phrase",
}: SentenceGameProps) => {
  const source = items ?? simpleSentenceItems;
  const queue = useMemo(() => shuffle(source), [source]);
  const [sentenceIndex, setSentenceIndex] = useState(0);
  const [wordIndex, setWordIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [totalWords, setTotalWords] = useState(0);
  const [feedback, setFeedback] = useState<"correct" | "wrong" | null>(null);
  const [finished, setFinished] = useState(false);
  // Track completed words in current sentence
  const [completedWords, setCompletedWords] = useState<Map<number, "correct" | "wrong">>(new Map());

  const currentSentence = queue[sentenceIndex];
  const currentWord = currentSentence?.words[wordIndex];
  const totalQuestions = queue.reduce((sum, s) => sum + s.words.length, 0);

  const handleChoice = useCallback(
    (choice: GrammarRole) => {
      if (feedback || !currentWord) return;

      const correct = choice === currentWord.role;
      if (correct) setScore((s) => s + 1);
      setTotalWords((t) => t + 1);
      setFeedback(correct ? "correct" : "wrong");

      setCompletedWords((prev) => {
        const next = new Map(prev);
        next.set(wordIndex, correct ? "correct" : "wrong");
        return next;
      });

      setTimeout(() => {
        setFeedback(null);

        const nextWordIdx = wordIndex + 1;
        if (nextWordIdx >= currentSentence.words.length) {
          // Move to next sentence
          const nextSentenceIdx = sentenceIndex + 1;
          if (nextSentenceIdx >= queue.length) {
            setFinished(true);
          } else {
            setSentenceIndex(nextSentenceIdx);
            setWordIndex(0);
            setCompletedWords(new Map());
          }
        } else {
          setWordIndex(nextWordIdx);
        }
      }, 1000);
    },
    [feedback, currentWord, wordIndex, currentSentence, sentenceIndex, queue]
  );

  if (finished) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
        <h2 className="text-4xl font-bold font-display">🎉 Bravo !</h2>
        <p className="text-2xl font-semibold">
          Tu as obtenu <span className="text-primary">{score}</span> / {totalQuestions}
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

  if (!currentSentence || !currentWord) return null;

  return (
    <div className="flex min-h-screen flex-col">
      <ScoreBar
        score={score}
        total={totalQuestions}
        onBack={onBack}
        modeLabel={modeLabel}
      />

      <div className="flex flex-1 flex-col items-center justify-center gap-8 p-6">
        {/* Sentence display */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {currentSentence.words.map((w, i) => {
            const completed = completedWords.get(i);
            const isActive = i === wordIndex;
            const colors = roleColors[w.role];

            return (
              <div key={i} className="flex flex-col items-center gap-1">
                <span
                  className={`rounded-xl px-4 py-2 text-2xl font-bold transition-all sm:text-3xl ${
                    isActive
                      ? "bg-primary/10 text-foreground ring-2 ring-primary scale-110 game-pop"
                      : completed === "correct"
                      ? `${colors.bg} ${colors.text} ring-1 ${colors.ring}`
                      : completed === "wrong"
                      ? "bg-game-error/10 text-game-error ring-1 ring-game-error"
                      : "text-muted-foreground"
                  }`}
                  style={{ fontFamily: '"Belle Allure", cursive' }}
                >
                  {w.word}
                </span>
                {completed && (
                  <span className={`text-xs font-semibold game-pop ${completed === "correct" ? colors.text : "text-game-error"}`}>
                    {w.role}
                  </span>
                )}
              </div>
            );
          })}
        </div>

        {/* Feedback */}
        <div className="h-8 text-center">
          {feedback === "correct" && (
            <p className="text-xl font-bold text-game-success game-pop">
              ✅ Correct ! « {currentWord.word} » est un {currentWord.role}
            </p>
          )}
          {feedback === "wrong" && (
            <p className="text-xl font-bold text-game-error game-pop">
              ❌ Non ! « {currentWord.word} » est un {currentWord.role}
            </p>
          )}
        </div>

        {/* Instruction */}
        <p className="text-sm font-semibold text-muted-foreground">
          Quel est le rôle de « <span className="text-foreground">{currentWord.word}</span> » ?
        </p>

        {/* Role choices */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {roles.map((role) => {
            const colors = roleColors[role];
            return (
              <button
                key={role}
                onClick={() => handleChoice(role)}
                disabled={!!feedback}
                className={`rounded-2xl px-6 py-3 text-base font-bold shadow-md transition-all hover:scale-105 hover:brightness-110 active:scale-95 disabled:opacity-60 ${colors.bg} ${colors.text} ring-1 ${colors.ring}/30 hover:${colors.ring}`}
              >
                {role.charAt(0).toUpperCase() + role.slice(1)}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default SentenceGame;
