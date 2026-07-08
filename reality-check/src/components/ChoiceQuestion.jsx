import { useState } from "react";
import { motion } from "framer-motion";

export default function ChoiceQuestion({ question, options, value, onAnswer }) {
  const [pending, setPending] = useState(null);

  const handleSelect = (optValue) => {
    if (pending) return;
    setPending(optValue);
    setTimeout(() => onAnswer(optValue), 190);
  };

  return (
    <div className="flex flex-1 flex-col justify-center py-4">
      <h1 className="font-display text-3xl leading-[1.05] text-white sm:text-4xl">
        {question}
      </h1>
      <div className="mt-8 flex flex-col gap-3">
        {options.map((opt, i) => {
          const active = (pending ?? value) === opt.value;
          return (
            <motion.button
              key={opt.value}
              type="button"
              onClick={() => handleSelect(opt.value)}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05, duration: 0.25 }}
              whileTap={{ scale: 0.98 }}
              className={`flex w-full items-center justify-between rounded-2xl border px-5 py-4 text-left transition-colors ${
                active
                  ? "border-orange bg-orange/10"
                  : "border-white/10 bg-card active:border-white/25"
              }`}
            >
              <span>
                <span className="block font-display text-base tracking-wide text-white sm:text-lg">
                  {opt.label}
                </span>
                {opt.sub && (
                  <span className="mt-0.5 block text-sm text-white/40">{opt.sub}</span>
                )}
              </span>
              <span
                className={`ml-3 flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 ${
                  active ? "border-orange bg-orange" : "border-white/20"
                }`}
              >
                {active && (
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
                    <path d="M5 13l4 4L19 7" stroke="#0D0D0D" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                )}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
