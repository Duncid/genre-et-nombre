import { useState, useMemo, useCallback } from "react";
import { Check, X } from "lucide-react";
import ScoreBar from "./ScoreBar";
import { playCorrect, playWrong } from "@/lib/sounds";
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
  const [completedWords, setCompletedWords] = useState<Map<number, "correct" | "wrong">>(new Map());

  const currentSentence = queue[sentenceIndex];
  const currentWord = currentSentence?.words[wordIndex];
  const totalQuestions = queue.reduce((sum, s) => sum + s.words.length, 0);
  const shuffledRoles = useMemo(() => shuffle([...roles]), [roles, sentenceIndex, wordIndex]);

  const handleChoice = useCallback(
    (choice: GrammarRole) => {
      if (feedback || !currentWord) return;

      const correct = choice === currentWord.role;
      if (correct) {
        setScore((s) => s + 1);
        playCorrect();
      } else {
        playWrong();
      }
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
        <h2 className="font-display text-[44px] sm:text-[56px] underline decoration-primary underline-offset-8">
          🎉 Bravo !
        </h2>
        <p className="text-[22px] font-semibold">
          Tu as obtenu <span className="text-primary">{score}</span> / {totalQuestions}
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

  if (!currentSentence || !currentWord) return null;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScoreBar score={score} total={totalQuestions} onBack={onBack} modeLabel={modeLabel} />

      <div className="flex flex-1 flex-col items-center justify-center gap-8 p-5 sm:p-8">
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
        <div className="h-6 flex items-center justify-center">
          {feedback === "correct" && (
            <p className="game-pop flex items-center gap-1.5 font-display font-semibold text-[18px] text-game-success">
              <Check size={20} />
              « {currentWord.word} » est un {currentWord.role}
            </p>
          )}
          {feedback === "wrong" && (
            <p className="game-pop flex items-center gap-1.5 font-display font-semibold text-[18px] text-game-error">
              <X size={20} />
              « {currentWord.word} » est un {currentWord.role}
            </p>
          )}
        </div>

        <p className="text-sm font-semibold text-muted-foreground">
          Quel est le rôle de « <span className="text-foreground">{currentWord.word}</span> » ?
        </p>

        {/* Role choices */}
        <div className="flex flex-wrap items-center justify-center gap-3">
          {shuffledRoles.map((role) => {
            const colors = roleColors[role];
            return (
              <button
                key={role}
                onClick={() => handleChoice(role)}
                disabled={!!feedback}
                className={`btn-stack rounded-[18px] px-6 py-3 font-display font-semibold text-[16px] transition-all hover:scale-105 disabled:pointer-events-none disabled:opacity-60 ${colors.bg} ${colors.text}`}
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
