import { useEffect } from "react";
import { motion } from "framer-motion";
import Logo from "../Logo";

export default function Splash({ onDone }) {
  useEffect(() => {
    const t = setTimeout(onDone, 1500);
    return () => clearTimeout(t);
  }, [onDone]);

  return (
    <div
      className="flex h-full w-full flex-col items-center justify-center gap-4 px-6"
      onClick={onDone}
      role="button"
      tabIndex={0}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      >
        <Logo size="xl" className="text-center" />
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex items-center gap-2 text-sm font-semibold uppercase tracking-[0.2em] text-white/40"
      >
        Powered by <span className="text-orange">🚨 Bullshit Detected™</span>
      </motion.div>
    </div>
  );
}
