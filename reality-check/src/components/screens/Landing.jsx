import { motion } from "framer-motion";
import Logo from "../Logo";
import { PrimaryButton } from "../Buttons";
import { LANDING_COPY } from "../../lib/copy";

export default function Landing({ onStart }) {
  return (
    <div className="relative flex h-full w-full flex-col overflow-hidden px-6 pb-[calc(env(safe-area-inset-bottom)+2rem)] pt-[calc(env(safe-area-inset-top)+2rem)]">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_50%_35%,rgba(255,122,0,0.10),transparent_48%)]"
      />

      <div className="relative z-10">
        <Logo size="sm" />
      </div>

      <div className="relative z-10 flex flex-1 flex-col justify-center py-8">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="mb-5 inline-flex w-fit items-center rounded-full border border-danger/30 bg-danger/10 px-3.5 py-1.5 text-xs font-bold uppercase tracking-[0.14em] text-danger"
        >
          {LANDING_COPY.eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.06, duration: 0.45 }}
          className="font-display text-[2.8rem] leading-[0.98] text-white sm:text-5xl"
        >
          {LANDING_COPY.headline.split("\n").map((line, index) => (
            <span key={`${line}-${index}`} className="block">
              {line}
            </span>
          ))}
          <span className="mt-1 block text-orange">
            {LANDING_COPY.headline2}
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.45 }}
          className="mt-6 max-w-sm text-base leading-relaxed text-white/55"
        >
          {LANDING_COPY.body.split("\n").map((line, index) => (
            <span key={`${line}-${index}`} className="block">
              {line}
            </span>
          ))}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.22, duration: 0.45 }}
          className="mt-7 grid grid-cols-3 gap-2"
        >
          {[
            ["60 SEC", "Fast"],
            ["PERSONAL", "Results"],
            ["FREE", "No catch"],
          ].map(([title, label]) => (
            <div
              key={title}
              className="rounded-xl border border-white/10 bg-card/70 px-2 py-3 text-center backdrop-blur-sm"
            >
              <p className="font-display text-sm text-orange">{title}</p>
              <p className="mt-0.5 text-[10px] uppercase tracking-[0.12em] text-white/35">
                {label}
              </p>
            </div>
          ))}
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.45 }}
        className="relative z-10"
      >
        <PrimaryButton onClick={onStart}>
          {LANDING_COPY.button}
        </PrimaryButton>

        <p className="mt-4 text-center text-xs leading-relaxed text-white/30">
          No login. No tracking. Answers stay on your device.
        </p>
      </motion.div>
    </div>
  );
}
