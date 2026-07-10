import { useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LOADING_MESSAGES } from "../../lib/copy";

const STEP_MS = 650;
const REVEAL_MS = 1200;

export default function LoadingScan({ onDone }) {
  const [index, setIndex] = useState(0);
  const [showReveal, setShowReveal] = useState(false);

  const finalIndex = useMemo(
    () => Math.max(LOADING_MESSAGES.length - 1, 0),
    []
  );

  useEffect(() => {
    if (LOADING_MESSAGES.length === 0) {
      setShowReveal(true);
      const doneTimer = window.setTimeout(onDone, REVEAL_MS);
      return () => window.clearTimeout(doneTimer);
    }

    if (index < finalIndex) {
      const stepTimer = window.setTimeout(
        () => setIndex((current) => current + 1),
        STEP_MS
      );
      return () => window.clearTimeout(stepTimer);
    }

    const revealTimer = window.setTimeout(() => setShowReveal(true), STEP_MS);
    const doneTimer = window.setTimeout(
      onDone,
      STEP_MS + REVEAL_MS
    );

    return () => {
      window.clearTimeout(revealTimer);
      window.clearTimeout(doneTimer);
    };
  }, [finalIndex, index, onDone]);

  const progress =
    LOADING_MESSAGES.length > 1
      ? Math.min(((index + 1) / LOADING_MESSAGES.length) * 100, 100)
      : 100;

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-center overflow-hidden bg-bg px-6">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,122,0,0.10),transparent_52%)]"
      />

      <AnimatePresence mode="wait">
        {!showReveal ? (
          <motion.div
            key="scan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3 }}
            className="relative z-10 flex w-full max-w-sm flex-col items-center"
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 2.4, repeat: Infinity, ease: "linear" }}
              className="flex h-20 w-20 items-center justify-center rounded-full border border-orange/30 bg-orange/10 shadow-[0_0_60px_rgba(255,122,0,0.12)]"
            >
              <div className="h-10 w-10 rounded-full border-2 border-white/10 border-t-orange" />
            </motion.div>

            <div className="mt-10 w-full">
              <div className="h-1.5 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-orange"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                />
              </div>
            </div>

            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
                className="mt-6 min-h-10 text-center text-sm font-bold uppercase tracking-[0.16em] text-white/55"
              >
                {LOADING_MESSAGES[index] ?? "Finding the truth..."}
              </motion.p>
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            key="reveal"
            initial={{ opacity: 0, scale: 0.88 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="relative z-10 flex w-full flex-col items-center"
          >
            <motion.img
              src="/images/bullshit-detected-logo.png"
              alt="Bullshit Detected™"
              className="w-full max-w-sm drop-shadow-[0_0_35px_rgba(255,122,0,0.22)]"
              initial={{ filter: "brightness(0.7)" }}
              animate={{ filter: "brightness(1)" }}
              transition={{ duration: 0.5 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
