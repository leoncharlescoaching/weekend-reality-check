import { motion } from "framer-motion";
import { PrimaryButton, GhostButton } from "../Buttons";
import { CTA_COPY, BOOKING_URL } from "../../lib/copy";

function CheckItem({ text, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 + index * 0.06, duration: 0.3 }}
      className="flex items-center gap-3 text-left"
    >
      <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-success/15 text-success">
        <svg width="11" height="11" viewBox="0 0 24 24" fill="none">
          <path d="M5 13l4 4L19 7" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <span className="text-sm text-white/80">{text}</span>
    </motion.div>
  );
}

export default function CoachingCTA({ onSkip }) {
  // This is the actual end of the funnel now that results are delivered
  // right after email capture — there's no further in-app screen to
  // advance to. The primary CTA opens the real booking link directly
  // instead of trying to call a next step that no longer exists.
  const handleBookCall = () => {
    window.open(BOOKING_URL, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto no-scrollbar px-6 pb-8 pt-10 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="font-display text-4xl leading-[1.05] text-white sm:text-5xl"
      >
        {CTA_COPY.headline.split("\n").map((l, i) => (
          <span key={i} className="block">
            {l}
          </span>
        ))}
      </motion.h1>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.12, duration: 0.4 }}
        className="mt-4 space-y-1"
      >
        {CTA_COPY.subheading.map((line, i) => (
          <p key={i} className="text-base text-white/60">
            {line}
          </p>
        ))}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24, duration: 0.4 }}
        className="mt-8 rounded-2xl border border-white/10 bg-card p-5"
      >
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-orange">{CTA_COPY.whyTitle}</p>
        <div className="mt-4 flex flex-col gap-3">
          {CTA_COPY.whyPoints.map((point, i) => (
            <CheckItem key={point} text={point} index={i} />
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.36, duration: 0.4 }}
        className="mt-4 rounded-2xl border border-white/10 bg-card p-5"
      >
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/40">{CTA_COPY.imagineTitle}</p>
        <div className="mt-4 flex flex-col gap-2.5">
          {CTA_COPY.imaginePoints.map((point, i) => (
            <motion.p
              key={point}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.44 + i * 0.08, duration: 0.3 }}
              className="text-left text-sm leading-relaxed text-white/80"
            >
              <span className="text-orange">•</span> {point}
            </motion.p>
          ))}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.56, duration: 0.4 }}
        className="mt-8"
      >
        <PrimaryButton onClick={handleBookCall}>{CTA_COPY.button}</PrimaryButton>
        <GhostButton onClick={onSkip} className="mt-3">
          {CTA_COPY.skip}
        </GhostButton>
        <div className="mt-4 space-y-0.5">
          {CTA_COPY.disclaimer.map((line, i) => (
            <p key={i} className="text-xs text-white/30">
              {line}
            </p>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
