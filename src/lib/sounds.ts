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

export function speakFrench(text: string, delayMs = 0) {
  if (typeof window === "undefined") return;
  const synth = window.speechSynthesis;
  if (!synth) return;
  const speak = () => {
    synth.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    utter.lang = "fr-FR";
    utter.rate = 0.95;
    utter.pitch = 1;
    const voices = synth.getVoices();
    const frVoice = voices.find((v) => v.lang.startsWith("fr"));
    if (frVoice) utter.voice = frVoice;
    synth.speak(utter);
  };
  if (delayMs > 0) setTimeout(speak, delayMs);
  else speak();
}
