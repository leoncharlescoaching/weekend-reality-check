import { motion } from "framer-motion";
import { PrimaryButton } from "../Buttons";
import {
  buildRealityLines,
  buildWeekendBreakdown,
  buildWeekendProfile,
} from "../../lib/copy";

const LEVEL_COLOR = {
  Mild: "text-success border-success/30 bg-success/10",
  Questionable: "text-warning border-warning/30 bg-warning/10",
  Delusional: "text-warning border-warning/30 bg-warning/10",
  Dangerous: "text-danger border-danger/30 bg-danger/10",
  Nuclear: "text-danger border-danger/40 bg-danger/15",
  Critical: "text-danger border-danger/40 bg-danger/15",
};

function scoreColor(score) {
  if (score >= 70) return "text-success";
  if (score >= 40) return "text-warning";
  return "text-danger";
}

function StatCard({ label, children, className = "" }) {
  return (
    <div
      className={`rounded-2xl border border-white/10 bg-card/95 p-5 shadow-lg shadow-black/10 ${className}`}
    >
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/40">
        {label}
      </p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export default function Results({ results, onContinue }) {
  const lines = buildRealityLines(results);
  const breakdown = buildWeekendBreakdown(results);
  const profile = buildWeekendProfile(results);
  const displayedLevel =
    results.bullshitLevel === "Nuclear" ? "Critical" : results.bullshitLevel;

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto px-5 pb-[calc(env(safe-area-inset-bottom)+2rem)] pt-[calc(env(safe-area-inset-top)+1.5rem)] sm:px-6">
      <motion.img
        src="/images/bullshit-detected-logo.png"
        alt="Bullshit Detected™"
        initial={{ opacity: 0, scale: 0.9, y: 10 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="mx-auto w-full max-w-[330px] drop-shadow-[0_0_28px_rgba(255,122,0,0.18)]"
      />

      <div className="mt-7 grid grid-cols-2 gap-3">
        <StatCard label="Weekend Score™">
          <p className={`font-display text-4xl ${scoreColor(results.weekendScore)}`}>
            {results.weekendScore}
            <span className="text-lg text-white/30">/100</span>
          </p>
        </StatCard>

        <StatCard label="Bullshit Level™">
          <span
            className={`inline-block rounded-lg border px-2.5 py-1 font-display text-lg ${
              LEVEL_COLOR[displayedLevel] ?? LEVEL_COLOR.Dangerous
            }`}
          >
            {displayedLevel}
          </span>
        </StatCard>
      </div>

      <StatCard label="Biggest Progress Killer" className="mt-3">
        <p className="font-display text-2xl leading-tight text-orange">
          {results.biggestKiller}
        </p>
      </StatCard>

      <StatCard label="Estimated Weekend Surplus" className="mt-3">
        <p className="font-display text-3xl text-white">
          {results.surplus.toLocaleString()}{" "}
          <span className="text-base text-white/40">kcal</span>
        </p>
      </StatCard>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.18, duration: 0.4 }}
        className="mt-6 rounded-2xl border border-white/10 bg-card/95 p-5 shadow-lg shadow-black/10"
      >
        <p className="text-center text-xs font-bold uppercase tracking-[0.15em] text-white/40">
          Your Weekend Profile™
        </p>

        <motion.div
          initial={{ scale: 0.75, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            delay: 0.28,
            type: "spring",
            stiffness: 250,
            damping: 17,
          }}
          className="mx-auto mt-3 text-center text-5xl"
        >
          {profile.emoji}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.35 }}
          className="mt-2 text-center font-display text-2xl text-orange"
        >
          {profile.title}
        </motion.p>

        <div className="mt-4 space-y-2">
          {profile.description.map((line, index) => (
            <motion.p
              key={`${line}-${index}`}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.42 + index * 0.07, duration: 0.3 }}
              className="text-center text-sm leading-relaxed text-white/80"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {profile.reasons.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{
              delay: 0.48 + profile.description.length * 0.07,
              duration: 0.35,
            }}
            className="mt-5 border-t border-white/10 pt-4"
          >
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/40">
              Why we chose this
            </p>

            <div className="mt-3 flex flex-col gap-2">
              {profile.reasons.map((reason) => (
                <span
                  key={reason.label}
                  className="flex items-center gap-2.5 text-sm text-white/70"
                >
                  <span className="text-base leading-none">{reason.emoji}</span>
                  {reason.label}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-card/95 p-5 shadow-lg shadow-black/10">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/40">
          The Reality
        </p>

        <div className="mt-3 space-y-2.5">
          {lines.map((line, index) => (
            <motion.p
              key={`${line}-${index}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.25 + index * 0.1, duration: 0.3 }}
              className="text-base leading-relaxed text-white/85"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>

      {breakdown.length > 0 && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-card/95 p-5 shadow-lg shadow-black/10">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/40">
            Your Weekend Breakdown™
          </p>

          <div className="mt-3 flex flex-col divide-y divide-white/5">
            {breakdown.map((item, index) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.32 + index * 0.07, duration: 0.3 }}
                className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0"
              >
                <span className="flex min-w-0 items-center gap-2.5 text-sm text-white/80">
                  <span className="shrink-0 text-lg leading-none">
                    {item.emoji}
                  </span>
                  <span className="truncate">{item.label}</span>
                </span>

                <span className="shrink-0 font-display text-sm text-white">
                  {item.display}
                </span>
              </motion.div>
            ))}
          </div>

          <div className="mt-2 flex items-end justify-between gap-4 border-t border-white/10 pt-4">
            <span className="max-w-[55%] text-xs font-bold uppercase tracking-[0.1em] text-white/40">
              Estimated Weekend Surplus
            </span>

            <span className="text-right font-display text-base text-orange">
              ≈ {results.surplus.toLocaleString()} kcal
            </span>
          </div>
        </div>
      )}

      <div className="sticky bottom-0 z-10 -mx-5 mt-8 bg-gradient-to-t from-bg via-bg/95 to-transparent px-5 pb-1 pt-8 sm:-mx-6 sm:px-6">
        <PrimaryButton onClick={onContinue}>
          GET MY MONDAY RESET™
        </PrimaryButton>
      </div>
    </div>
  );
}
