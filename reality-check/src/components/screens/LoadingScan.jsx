import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { LOADING_MESSAGES } from "../../lib/copy";

const STEP_MS = 520;

export default function LoadingScan({ onDone }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (index >= LOADING_MESSAGES.length - 1) {
      const t = setTimeout(onDone, STEP_MS + 250);
      return () => clearTimeout(t);
    }
    const t = setTimeout(() => setIndex((i) => i + 1), STEP_MS);
    return () => clearTimeout(t);
  }, [index, onDone]);

  return (
    <div className="flex h-full w-full flex-col items-center justify-center gap-10 bg-bg px-6">
      <div className="font-display text-2xl text-white/80">🚨</div>
      <div className="w-full max-w-xs">
        <div className="h-1.5 w-full overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full w-1/3 rounded-full bg-orange"
            animate={{ x: ["-100%", "20%", "220%"] }}
            transition={{ duration: 1.3, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
      <AnimatePresence mode="wait">
        <motion.p
          key={index}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.25 }}
          className="text-center text-sm font-semibold uppercase tracking-[0.15em] text-white/50"
        >
          {LOADING_MESSAGES[index]}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}
