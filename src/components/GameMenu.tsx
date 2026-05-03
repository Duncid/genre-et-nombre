import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { BookOpen, Users, Shuffle, Type, PenLine, Layers, GraduationCap, X, Sparkles, Languages, Calculator, ChevronRight } from "lucide-react";

type Mode = "gender" | "number" | "mix" | "words" | "adjectives" | "adjective-choice" | "sentence" | "sentence-advanced" | "multiplication";

interface GameMenuProps {
  onSelectMode: (mode: Mode) => void;
}

interface ModeItem {
  mode: Mode;
  title: string;
  subtitle: string;
  Icon: typeof BookOpen;
  tone: string; // CSS variable name, e.g. "var(--game-feminine)"
}

interface Category {
  id: string;
  title: string;
  emoji: string;
  CatIcon: typeof BookOpen;
  catTone: string;
  modes: ModeItem[];
}

const TONES: Record<Mode, string> = {
  gender: "hsl(var(--game-feminine))",
  number: "hsl(var(--game-singular))",
  mix: "hsl(var(--primary))",
  words: "hsl(var(--game-success))",
  adjectives: "hsl(var(--game-feminine))",
  "adjective-choice": "hsl(var(--game-feminine))",
  sentence: "hsl(var(--game-singular))",
  "sentence-advanced": "hsl(var(--game-plural))",
  multiplication: "hsl(var(--primary))",
};

const categories: Category[] = [
  {
    id: "genre-nombre",
    title: "Les articles",
    emoji: "🏷️",
    CatIcon: Languages,
    catTone: "hsl(var(--game-feminine))",
    modes: [
      { mode: "gender", title: "Un ou une ?", subtitle: "Regarde l'image et devine", Icon: BookOpen, tone: TONES.gender },
      { mode: "number", title: "Combien ?", subtitle: "Un seul ou plusieurs ?", Icon: Users, tone: TONES.number },
      { mode: "mix", title: "Défi double", subtitle: "Genre et nombre à la fois", Icon: Shuffle, tone: TONES.mix },
      { mode: "words", title: "Je lis le mot", subtitle: "Quel genre, quel nombre ?", Icon: Type, tone: TONES.words },
    ],
  },
  {
    id: "phrase",
    title: "Les phrases",
    emoji: "✍️",
    CatIcon: Layers,
    catTone: "hsl(var(--game-plural))",
    modes: [
      { mode: "adjectives", title: "Lis et classe", subtitle: "Genre et nombre avec adjectif", Icon: PenLine, tone: TONES.adjectives },
      { mode: "adjective-choice", title: "Complète la phrase", subtitle: "Quelle forme de l'adjectif ?", Icon: Sparkles, tone: TONES["adjective-choice"] },
      { mode: "sentence", title: "Les rôles des mots", subtitle: "Déterminant · adjectif · nom", Icon: Layers, tone: TONES.sentence },
      { mode: "sentence-advanced", title: "Je suis expert !", subtitle: "Tous les rôles de la phrase", Icon: GraduationCap, tone: TONES["sentence-advanced"] },
    ],
  },
  {
    id: "maths",
    title: "Les maths",
    emoji: "🔢",
    CatIcon: Calculator,
    catTone: "hsl(var(--primary))",
    modes: [
      { mode: "multiplication", title: "Les tables", subtitle: "×2 · ×3 · ×4 · ×5", Icon: X, tone: TONES.multiplication },
    ],
  },
];

const CategoryCard = ({
  cat,
  isActive,
  onSelectMode,
}: {
  cat: Category;
  isActive: boolean;
  onSelectMode: (mode: Mode) => void;
}) => (
  <div
    className={`flex flex-col gap-3.5 rounded-[28px] border border-[#EFE3C2] bg-card p-5 transition-all duration-300 ${
      isActive
        ? "shadow-[0_8px_0_rgba(31,36,64,0.06),0_14px_30px_rgba(31,36,64,0.06)]"
        : "opacity-90 shadow-[0_4px_12px_rgba(31,36,64,0.04)]"
    }`}
  >
    <div className="flex items-center gap-3">
      <div
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-[14px] text-[22px]"
        style={{ backgroundColor: `color-mix(in srgb, ${cat.catTone} 12%, white)` }}
      >
        {cat.emoji}
      </div>
      <div>
        <h2 className="font-display font-semibold text-lg leading-tight">{cat.title}</h2>
        <p className="text-xs text-muted-foreground">
          {cat.modes.length} {cat.modes.length > 1 ? "exercices" : "exercice"}
        </p>
      </div>
    </div>

    <div className="flex flex-col gap-2.5">
      {cat.modes.map((m) => {
        const Icon = m.Icon;
        return (
          <button
            key={m.mode}
            onClick={() => onSelectMode(m.mode)}
            disabled={!isActive}
            className="group flex items-center gap-3 rounded-[18px] border-[1.5px] border-[#EFE3C2] bg-card px-3.5 py-3 text-left transition-all duration-200 hover:scale-[1.01] disabled:pointer-events-none"
            style={
              {
                "--hover-border": m.tone,
              } as React.CSSProperties
            }
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = m.tone)}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#EFE3C2")}
          >
            <div
              className="flex h-[38px] w-[38px] shrink-0 items-center justify-center rounded-[12px]"
              style={{
                backgroundColor: `color-mix(in srgb, ${m.tone} 14%, white)`,
                color: m.tone,
              }}
            >
              <Icon size={18} />
            </div>
            <div className="flex-1">
              <span className="block font-display font-semibold text-[15px] leading-tight">{m.title}</span>
              <span className="text-xs text-muted-foreground mt-0.5 block">{m.subtitle}</span>
            </div>
            <ChevronRight size={18} className="text-muted-foreground" />
          </button>
        );
      })}
    </div>
  </div>
);

const GameMenu = ({ onSelectMode }: GameMenuProps) => {
  const [api, setApi] = useState<CarouselApi>();
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    if (!api) return;
    const onSelect = () => setSelectedIndex(api.selectedScrollSnap());
    onSelect();
    api.on("select", onSelect);
    api.on("reInit", onSelect);
    return () => {
      api.off("select", onSelect);
      api.off("reInit", onSelect);
    };
  }, [api]);

  const scrollTo = (i: number) => api?.scrollTo(i);

  return (
    <div className="flex w-full flex-col bg-background">
      {/* Mobile carousel */}
      <div className="md:hidden flex flex-col items-center justify-center gap-4 px-5 min-h-screen">
        <Carousel
          setApi={setApi}
          opts={{ align: "center", loop: false, containScroll: "trimSnaps" }}
          className="w-full"
        >
          <CarouselContent className="-ml-3">
            {categories.map((cat, idx) => (
              <CarouselItem key={cat.id} className="pl-3 basis-full">
                <CategoryCard cat={cat} isActive={idx === selectedIndex} onSelectMode={onSelectMode} />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        <div className="flex items-center justify-center gap-2">
          {categories.map((cat, i) => (
            <button
              key={cat.id}
              onClick={() => scrollTo(i)}
              aria-label={`Aller à ${cat.title}`}
              className={`rounded-full transition-all ${
                i === selectedIndex ? "h-2 w-7 bg-primary" : "h-2 w-2 bg-muted-foreground/30 hover:bg-muted-foreground/50"
              }`}
            />
          ))}
        </div>
      </div>

      {/* Desktop grid */}
      <div className="hidden md:grid md:grid-cols-3 md:gap-3.5 px-16 pt-12 pb-12">
        {categories.map((cat) => (
          <CategoryCard key={cat.id} cat={cat} isActive onSelectMode={onSelectMode} />
        ))}
      </div>
    </div>
  );
};

export default GameMenu;
