import { motion } from "framer-motion";
import Logo from "../Logo";
import { PrimaryButton } from "../Buttons";
import { LANDING_COPY } from "../../lib/copy";

export default function Landing({ onStart }) {
  return (
    <div className="flex h-full w-full flex-col justify-between px-6 pb-8 pt-10">
      <Logo size="sm" />

      <div className="flex flex-1 flex-col justify-center">
        <motion.span
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="mb-4 inline-flex w-fit items-center gap-1.5 rounded-full border border-danger/30 bg-danger/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-danger"
        >
          {LANDING_COPY.eyebrow}
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.08, duration: 0.45 }}
          className="font-display text-4xl leading-[1.05] text-white sm:text-5xl"
        >
          {LANDING_COPY.headline.split("\n").map((l, i) => (
            <span key={i} className="block">
              {l}
            </span>
          ))}
          <span className="block text-orange">{LANDING_COPY.headline2}</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.18, duration: 0.45 }}
          className="mt-6 text-base leading-relaxed text-white/50"
        >
          {LANDING_COPY.body.split("\n").map((l, i) => (
            <span key={i} className="block">
              {l}
            </span>
          ))}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.45 }}
      >
        <PrimaryButton onClick={onStart}>{LANDING_COPY.button}</PrimaryButton>
        <p className="mt-4 text-center text-xs text-white/30">
          No login. No tracking. Answers stay on your device.
        </p>
      </motion.div>
    </div>
  );
}
