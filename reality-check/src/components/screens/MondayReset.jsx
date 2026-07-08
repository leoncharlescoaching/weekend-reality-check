import { motion } from "framer-motion";
import { PrimaryButton } from "../Buttons";
import { buildMondayResetTips, buildFirstCheckIn, CHECKIN_COPY, MONDAY_RESET_CLOSER } from "../../lib/copy";
import { CLEAN_WEEKEND_LABEL } from "../../lib/scoring";

export default function MondayReset({ results, onContinue }) {
  const tips = buildMondayResetTips(results);
  const checkIn = buildFirstCheckIn(results);
  const isClean = results.biggestKiller === CLEAN_WEEKEND_LABEL;

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto no-scrollbar px-6 pb-8 pt-10">
      <span className="w-fit rounded-full border border-success/30 bg-success/10 px-3 py-1 text-xs font-bold uppercase tracking-wider text-success">
        Monday Reset™
      </span>

      <h1 className="mt-4 font-display text-3xl leading-tight text-white sm:text-4xl">
        {isClean ? "Nothing to fix here." : "Fixing this doesn't need a new plan."}
      </h1>
      <p className="mt-3 text-white/50">
        {isClean ? (
          "Just keep doing what already worked."
        ) : (
          <>
            Just three moves aimed at your biggest leak:{" "}
            <span className="text-orange">{results.biggestKiller}</span>.
          </>
        )}
      </p>

      <div className="mt-8 flex flex-col gap-3">
        {tips.map((tip, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.35 }}
            className="flex items-start gap-4 rounded-2xl border border-white/10 bg-card p-5"
          >
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-orange font-display text-sm text-bg">
              {i + 1}
            </span>
            <p className="text-base leading-relaxed text-white/90">{tip}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.55 }}
        className="mt-8 text-center text-sm italic text-white/40"
      >
        {MONDAY_RESET_CLOSER}
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.65, duration: 0.4 }}
        className="mt-8 rounded-2xl border border-white/10 bg-card p-5"
      >
        <p className="text-center text-xs font-bold uppercase tracking-[0.15em] text-orange">
          {CHECKIN_COPY.title}
        </p>
        <div className="mt-3 flex flex-col gap-1 text-center">
          {CHECKIN_COPY.subheading.map((line) => (
            <p key={line} className="text-sm text-white/50">
              {line}
            </p>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.78, duration: 0.3 }}
          className="mt-6"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-success">{CHECKIN_COPY.wellTitle}</p>
          <p className="mt-2 text-sm leading-relaxed text-white/85">{checkIn.wellDone}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.3 }}
          className="mt-5"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-warning">{CHECKIN_COPY.heldBackTitle}</p>
          <div className="mt-2 flex flex-col gap-0.5">
            {checkIn.heldBack.map((line) => (
              <p key={line} className="text-sm leading-relaxed text-white/85">
                {line}
              </p>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.02, duration: 0.3 }}
          className="mt-5"
        >
          <p className="text-xs font-bold uppercase tracking-wider text-orange">{CHECKIN_COPY.changeTitle}</p>
          <div className="mt-3 flex flex-col gap-3">
            {checkIn.actions.map((tip, i) => (
              <motion.div
                key={tip}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.1 + i * 0.08, duration: 0.3 }}
                className="flex items-start gap-3 text-left"
              >
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-orange font-display text-xs text-bg">
                  {i + 1}
                </span>
                <span className="text-sm leading-relaxed text-white/85">{tip}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.3 }}
          className="mt-6 text-center text-sm italic text-white/40"
        >
          {CHECKIN_COPY.closer}
        </motion.p>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 0.4 }}
        className="mt-8 border-t border-white/10"
      />

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.58, duration: 0.4 }}
        className="mt-8 text-center"
      >
        <p className="font-display text-2xl leading-tight text-white">{CHECKIN_COPY.dividerHeadline}</p>
        <div className="mt-3 flex flex-col gap-1">
          {CHECKIN_COPY.dividerBody.map((line) => (
            <p key={line} className="text-sm text-white/50">
              {line}
            </p>
          ))}
        </div>
        <div className="mt-5">
          <PrimaryButton onClick={onContinue}>{CHECKIN_COPY.ctaButton}</PrimaryButton>
        </div>
        <p className="mt-3 text-xs text-white/30">{CHECKIN_COPY.ctaSubtext}</p>
      </motion.div>
    </div>
  );
}
