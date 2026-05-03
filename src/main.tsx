import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Prevent pinch-zoom and multi-touch gesture zoom on iOS Safari
document.addEventListener("gesturestart", (e) => e.preventDefault());
document.addEventListener("gesturechange", (e) => e.preventDefault());
document.addEventListener("gestureend", (e) => e.preventDefault());

// Prevent double-tap zoom on iOS
let lastTouchEnd = 0;
document.addEventListener(
  "touchend",
  (e) => {
    const now = Date.now();
    if (now - lastTouchEnd <= 350) e.preventDefault();
    lastTouchEnd = now;
  },
  { passive: false }
);

// Prevent multi-touch zoom
document.addEventListener(
  "touchmove",
  (e) => {
    if ((e as TouchEvent).touches.length > 1) e.preventDefault();
  },
  { passive: false }
);

createRoot(document.getElementById("root")!).render(<App />);

