import { useMemo, useState } from "react";
import { Volume2, Eye, ChevronRight, RotateCcw } from "lucide-react";
import ScoreBar from "./ScoreBar";
import { speakFrench } from "@/lib/sounds";
import { questionGuessItems, type QuestionGuessItem } from "@/data/questionGuessData";

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

interface QuestionGuessGameProps {
  onBack: () => void;
}

const QuestionGuessGame = ({ onBack }: QuestionGuessGameProps) => {
  const queue = useMemo<QuestionGuessItem[]>(() => shuffle(questionGuessItems), []);
  const [index, setIndex] = useState(0);
  const [revealed, setRevealed] = useState(false);
  const [finished, setFinished] = useState(false);

  const total = queue.length;
  const current = queue[index];

  const handleNext = () => {
    if (index + 1 >= total) {
      setFinished(true);
    } else {
      setIndex(index + 1);
      setRevealed(false);
    }
  };

  const handleRestart = () => {
    setIndex(0);
    setRevealed(false);
    setFinished(false);
  };

  if (finished) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-6 p-6">
        <h2 className="font-display text-[44px] sm:text-[56px] underline decoration-primary underline-offset-8">
          🎉 Bravo !
        </h2>
        <p className="text-[20px] font-semibold text-center">
          Tu as deviné {total} questions !
        </p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={handleRestart}
            className="btn-stack flex items-center gap-2 rounded-[18px] bg-secondary px-6 py-3 font-display font-semibold text-[16px] transition-all hover:scale-105"
          >
            <RotateCcw size={18} /> Recommencer
          </button>
          <button
            onClick={onBack}
            className="btn-stack rounded-[18px] bg-primary px-8 py-3.5 font-display font-semibold text-[18px] text-primary-foreground transition-all hover:scale-105"
          >
            Retour au menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <ScoreBar score={index + 1} total={total} onBack={onBack} modeLabel="Devine la question" />

      <div className="flex flex-1 flex-col items-center justify-center gap-8 p-5 sm:p-8">
        <p className="text-sm font-semibold text-muted-foreground text-center max-w-md">
          Voici une réponse. À toi de deviner la question (à dire à voix haute) !
        </p>

        {/* Réponse */}
        <div className="w-full max-w-2xl rounded-[28px] border border-[#EFE3C2] bg-card p-6 sm:p-10 text-center shadow-[0_8px_0_rgba(31,36,64,0.06)]">
          <p
            className="text-[28px] sm:text-[36px] leading-snug text-foreground"
            style={{ fontFamily: '"Belle Allure", cursive' }}
          >
            {current.answer}
          </p>

          <button
            onClick={() => speakFrench(current.answer)}
            className="mt-5 inline-flex items-center gap-2 rounded-full border border-[#EFE3C2] bg-background px-4 py-2 text-sm font-semibold transition-all hover:scale-105"
            aria-label="Écouter la réponse"
          >
            <Volume2 size={16} /> Écouter
          </button>
        </div>

        {/* Question révélée */}
        <div className="min-h-[80px] flex items-center justify-center w-full max-w-2xl">
          {revealed ? (
            <div className="game-pop w-full rounded-[20px] bg-primary/10 ring-2 ring-primary px-6 py-4 text-center">
              <p className="text-xs font-semibold uppercase tracking-wide text-primary mb-1">La question était</p>
              <p className="text-[22px] sm:text-[26px] font-display font-semibold text-foreground">
                {current.question}
              </p>
            </div>
          ) : (
            <button
              onClick={() => {
                setRevealed(true);
                speakFrench(current.question, 150);
              }}
              className="btn-stack flex items-center gap-2 rounded-[18px] bg-secondary px-6 py-3 font-display font-semibold text-[16px] transition-all hover:scale-105"
            >
              <Eye size={18} /> Voir la question
            </button>
          )}
        </div>

        <button
          onClick={handleNext}
          className="btn-stack flex items-center gap-2 rounded-[18px] bg-primary px-8 py-3.5 font-display font-semibold text-[18px] text-primary-foreground transition-all hover:scale-105"
        >
          Suivant <ChevronRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default QuestionGuessGame;
