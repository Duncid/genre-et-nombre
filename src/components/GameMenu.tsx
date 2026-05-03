import { useEffect, useState } from "react";
import { Carousel, CarouselContent, CarouselItem, type CarouselApi } from "@/components/ui/carousel";
import { BookOpen, Users, Shuffle, Type, PenLine, Layers, GraduationCap, X, Sparkles, Languages, Calculator } from "lucide-react";

type Mode = "gender" | "number" | "mix" | "words" | "adjectives" | "adjective-choice" | "sentence" | "sentence-advanced" | "multiplication";

interface GameMenuProps {
  onSelectMode: (mode: Mode) => void;
}

interface ModeItem {
  mode: Mode;
  title: string;
  subtitle: string;
  Icon: typeof BookOpen;
  ringColor: string;
  bgColor: string;
  textColor: string;
}

interface Category {
  id: string;
  title: string;
  emoji: string;
  CatIcon: typeof BookOpen;
  accent: string; // tailwind text color class
  bgGradient: string; // tailwind bg gradient classes
  modes: ModeItem[];
}

const categories: Category[] = [
  {
    id: "genre-nombre",
    title: "Genre & Nombre",
    emoji: "🔤",
    CatIcon: Languages,
    accent: "text-game-feminine",
    bgGradient: "from-game-feminine/20 via-game-masculine/15 to-game-singular/20",
    modes: [
      {
        mode: "gender",
        title: "Féminin / Masculin",
        subtitle: "UN ou UNE ?",
        Icon: BookOpen,
        ringColor: "ring-game-feminine/40 hover:ring-game-feminine",
        bgColor: "bg-game-feminine/10",
        textColor: "text-game-feminine",
      },
      {
        mode: "number",
        title: "Singulier / Pluriel",
        subtitle: "Un ou plusieurs ?",
        Icon: Users,
        ringColor: "ring-game-singular/40 hover:ring-game-singular",
        bgColor: "bg-game-singular/10",
        textColor: "text-game-singular",
      },
      {
        mode: "mix",
        title: "Mode Mixte",
        subtitle: "Genre + Nombre",
        Icon: Shuffle,
        ringColor: "ring-primary/40 hover:ring-primary",
        bgColor: "bg-primary/10",
        textColor: "text-primary",
      },
      {
        mode: "words",
        title: "Mode Mots",
        subtitle: "Mots écrits",
        Icon: Type,
        ringColor: "ring-accent/40 hover:ring-accent",
        bgColor: "bg-accent/10",
        textColor: "text-accent-foreground",
      },
    ],
  },
  {
    id: "phrase",
    title: "Structure de phrase",
    emoji: "✍️",
    CatIcon: Layers,
    accent: "text-game-plural",
    bgGradient: "from-secondary/20 via-game-plural/15 to-accent/20",
    modes: [
      {
        mode: "adjectives",
        title: "Mots & Adjectifs",
        subtitle: "les grands arbres",
        Icon: PenLine,
        ringColor: "ring-secondary/40 hover:ring-secondary",
        bgColor: "bg-secondary/10",
        textColor: "text-secondary",
      },
      {
        mode: "adjective-choice",
        title: "Choisis l'adjectif",
        subtitle: "accord en genre/nombre",
        Icon: Sparkles,
        ringColor: "ring-game-feminine/40 hover:ring-game-feminine",
        bgColor: "bg-game-feminine/10",
        textColor: "text-game-feminine",
      },
      {
        mode: "sentence",
        title: "Structure de phrase",
        subtitle: "dét. / adj. / nom",
        Icon: Layers,
        ringColor: "ring-game-singular/40 hover:ring-game-singular",
        bgColor: "bg-game-singular/10",
        textColor: "text-game-singular",
      },
      {
        mode: "sentence-advanced",
        title: "Structure avancée",
        subtitle: "verbe, pronom…",
        Icon: GraduationCap,
        ringColor: "ring-game-plural/40 hover:ring-game-plural",
        bgColor: "bg-game-plural/10",
        textColor: "text-game-plural",
      },
    ],
  },
  {
    id: "maths",
    title: "Mathématiques",
    emoji: "🔢",
    CatIcon: Calculator,
    accent: "text-primary",
    bgGradient: "from-primary/20 via-primary/10 to-accent/20",
    modes: [
      {
        mode: "multiplication",
        title: "Multiplications",
        subtitle: "tables de 2 à 5",
        Icon: X,
        ringColor: "ring-primary/40 hover:ring-primary",
        bgColor: "bg-primary/10",
        textColor: "text-primary",
      },
    ],
  },
];

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
    <div className="flex min-h-screen flex-col items-center justify-center gap-6 py-6">
      <header className="px-6 text-center">
        <h1 className="text-3xl sm:text-4xl font-bold font-display">Choisis une catégorie</h1>
        <p className="text-sm text-muted-foreground mt-1">Glisse pour explorer ✨</p>
      </header>

      <Carousel
        setApi={setApi}
        opts={{ align: "center", loop: false, containScroll: "trimSnaps" }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {categories.map((cat, idx) => {
            const isActive = idx === selectedIndex;
            const CatIcon = cat.CatIcon;
            return (
              <CarouselItem
                key={cat.id}
                className="pl-3 basis-[85%] sm:basis-[70%] md:basis-[55%] lg:basis-[45%]"
              >
                <div
                  className={`rounded-3xl bg-gradient-to-br ${cat.bgGradient} p-5 sm:p-6 shadow-xl ring-1 ring-border transition-all duration-300 ${
                    isActive ? "scale-100 opacity-100" : "scale-90 opacity-60"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-card shadow-md">
                      <CatIcon className={`h-6 w-6 ${cat.accent}`} />
                    </div>
                    <div>
                      <h2 className="text-lg sm:text-xl font-bold font-display leading-tight">
                        {cat.emoji} {cat.title}
                      </h2>
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
                          className={`group flex items-center gap-3 rounded-2xl bg-card p-3.5 shadow-sm ring-1 transition-all hover:scale-[1.02] hover:shadow-md active:scale-95 disabled:pointer-events-none ${m.ringColor}`}
                        >
                          <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${m.bgColor}`}>
                            <Icon className={`h-5 w-5 ${m.textColor}`} />
                          </div>
                          <div className="text-left flex-1">
                            <span className="text-sm font-bold font-display leading-tight block">{m.title}</span>
                            <span className="text-xs text-muted-foreground">{m.subtitle}</span>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CarouselItem>
            );
          })}
        </CarouselContent>
      </Carousel>

      <div className="flex items-center gap-2">
        {categories.map((cat, i) => (
          <button
            key={cat.id}
            onClick={() => scrollTo(i)}
            aria-label={`Aller à ${cat.title}`}
            className={`h-2.5 rounded-full transition-all ${
              i === selectedIndex ? "w-8 bg-primary" : "w-2.5 bg-muted-foreground/30 hover:bg-muted-foreground/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default GameMenu;
