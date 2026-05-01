let audioCtx: AudioContext | null = null;

function getAudioCtx(): AudioContext | null {
  if (typeof window === "undefined") return null;
  if (!audioCtx) {
    const Ctx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!Ctx) return null;
    audioCtx = new Ctx();
  }
  return audioCtx;
}

function playTone(frequencies: number[], duration = 0.18, type: OscillatorType = "sine") {
  const ctx = getAudioCtx();
  if (!ctx) return;
  if (ctx.state === "suspended") ctx.resume();
  const now = ctx.currentTime;
  frequencies.forEach((freq, i) => {
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.type = type;
    osc.frequency.value = freq;
    const start = now + i * duration;
    gain.gain.setValueAtTime(0.0001, start);
    gain.gain.exponentialRampToValueAtTime(0.25, start + 0.02);
    gain.gain.exponentialRampToValueAtTime(0.0001, start + duration);
    osc.connect(gain).connect(ctx.destination);
    osc.start(start);
    osc.stop(start + duration);
  });
}

export function playCorrect() {
  // Uplifting major arpeggio: C5 -> E5 -> G5
  playTone([523.25, 659.25, 783.99], 0.13, "triangle");
}

export function playWrong() {
  // Downlifting descending tones
  playTone([311.13, 233.08], 0.22, "sawtooth");
}

// Ranked list of preferred French voices by name (best-sounding first).
// These are commonly available across macOS/iOS, Chrome, Edge and Android.
const PREFERRED_FR_VOICES = [
  // Apple (macOS / iOS) — naturelles
  "Amélie (Premium)",
  "Amelie (Premium)",
  "Thomas (Premium)",
  "Audrey (Premium)",
  "Aurélie (Premium)",
  "Amélie (Enhanced)",
  "Thomas (Enhanced)",
  "Audrey (Enhanced)",
  "Amélie",
  "Amelie",
  "Thomas",
  "Audrey",
  "Aurélie",
  // Google (Chrome / Android) — neuronales
  "Google français",
  "Google français (France)",
  // Microsoft (Edge / Windows) — neuronales
  "Microsoft Denise Online (Natural) - French (France)",
  "Microsoft Henri Online (Natural) - French (France)",
  "Microsoft Denise - French (France)",
  "Microsoft Julie - French (France)",
  "Microsoft Paul - French (France)",
];

function pickBestFrenchVoice(voices: SpeechSynthesisVoice[]): SpeechSynthesisVoice | undefined {
  const fr = voices.filter((v) => v.lang && v.lang.toLowerCase().startsWith("fr"));
  if (fr.length === 0) return undefined;

  // 1) Try preferred names in order
  for (const name of PREFERRED_FR_VOICES) {
    const match = fr.find((v) => v.name === name);
    if (match) return match;
  }
  // 2) Any voice whose name contains a known good keyword
  const keywords = ["amélie", "amelie", "thomas", "audrey", "aurélie", "denise", "henri", "natural", "neural", "premium", "enhanced", "google"];
  for (const kw of keywords) {
    const match = fr.find((v) => v.name.toLowerCase().includes(kw));
    if (match) return match;
  }
  // 3) Prefer fr-FR over other French locales
  const frFR = fr.find((v) => v.lang.toLowerCase() === "fr-fr");
  if (frFR) return frFR;
  // 4) Fallback: first French voice
  return fr[0];
}

let cachedVoice: SpeechSynthesisVoice | null = null;
let voicesReady = false;

function ensureVoicesLoaded(synth: SpeechSynthesis): Promise<void> {
  if (voicesReady && synth.getVoices().length > 0) return Promise.resolve();
  return new Promise((resolve) => {
    const tryNow = () => {
      const v = synth.getVoices();
      if (v.length > 0) {
        voicesReady = true;
        resolve();
        return true;
      }
      return false;
    };
    if (tryNow()) return;
    const handler = () => {
      if (tryNow()) {
        synth.removeEventListener("voiceschanged", handler);
      }
    };
    synth.addEventListener("voiceschanged", handler);
    // Safety fallback
    setTimeout(() => {
      voicesReady = true;
      resolve();
    }, 800);
  });
}

export function speakFrench(text: string, delayMs = 0) {
  if (typeof window === "undefined") return;
  const synth = window.speechSynthesis;
  if (!synth) return;

  const speak = async () => {
    await ensureVoicesLoaded(synth);
    synth.cancel();

    const voice = cachedVoice ?? pickBestFrenchVoice(synth.getVoices()) ?? null;
    if (voice) cachedVoice = voice;

    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = voice?.lang || "fr-FR";
    if (voice) utter.voice = voice;
    // Slightly slower & natural pitch for kids-friendly clarity
    utter.rate = 0.92;
    utter.pitch = 1.05;
    utter.volume = 1;

    synth.speak(utter);
  };

  if (delayMs > 0) setTimeout(speak, delayMs);
  else speak();
}
