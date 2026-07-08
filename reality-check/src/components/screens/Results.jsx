import { motion } from "framer-motion";
import { PrimaryButton } from "../Buttons";
import { buildRealityLines, buildWeekendBreakdown, buildWeekendProfile } from "../../lib/copy";

const LEVEL_COLOR = {
  Mild: "text-success border-success/30 bg-success/10",
  Questionable: "text-warning border-warning/30 bg-warning/10",
  Delusional: "text-warning border-warning/30 bg-warning/10",
  Dangerous: "text-danger border-danger/30 bg-danger/10",
  Nuclear: "text-danger border-danger/40 bg-danger/15",
};

function scoreColor(score) {
  if (score >= 70) return "text-success";
  if (score >= 40) return "text-warning";
  return "text-danger";
}

function StatCard({ label, children, className = "" }) {
  return (
    <div className={`rounded-2xl border border-white/10 bg-card p-5 ${className}`}>
      <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/40">{label}</p>
      <div className="mt-2">{children}</div>
    </div>
  );
}

export default function Results({ results, onContinue }) {
  const lines = buildRealityLines(results);
  const breakdown = buildWeekendBreakdown(results);
  const profile = buildWeekendProfile(results);

  return (
    <div className="flex h-full w-full flex-col overflow-y-auto no-scrollbar px-6 pb-8 pt-8">
      <motion.div
        initial={{ scale: 0.6, opacity: 0, rotate: -8 }}
        animate={{ scale: 1, opacity: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 260, damping: 14 }}
        className="mx-auto text-6xl"
      >
        🚨
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="mt-3 text-center font-display text-3xl leading-tight text-white sm:text-4xl"
      >
        BULLSHIT DETECTED™
      </motion.h1>

      <div className="mt-8 grid grid-cols-2 gap-3">
        <StatCard label="Weekend Score™">
          <p className={`font-display text-4xl ${scoreColor(results.weekendScore)}`}>
            {results.weekendScore}
            <span className="text-lg text-white/30">/100</span>
          </p>
        </StatCard>
        <StatCard label="Bullshit Level™">
          <span
            className={`inline-block rounded-lg border px-2.5 py-1 font-display text-lg ${LEVEL_COLOR[results.bullshitLevel]}`}
          >
            {results.bullshitLevel}
          </span>
        </StatCard>
      </div>

      <StatCard label="Biggest Progress Killer" className="mt-3">
        <p className="font-display text-2xl text-orange">{results.biggestKiller}</p>
      </StatCard>

      <StatCard label="Estimated Weekend Surplus" className="mt-3">
        <p className="font-display text-3xl text-white">
          {results.surplus.toLocaleString()} <span className="text-base text-white/40">kcal</span>
        </p>
      </StatCard>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.4 }}
        className="mt-6 rounded-2xl border border-white/10 bg-card p-5"
      >
        <p className="text-center text-xs font-bold uppercase tracking-[0.15em] text-white/40">
          Your Weekend Profile™
        </p>

        <motion.div
          initial={{ scale: 0.7, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ delay: 0.36, type: "spring", stiffness: 260, damping: 16 }}
          className="mx-auto mt-3 text-center text-5xl"
        >
          {profile.emoji}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.44, duration: 0.35 }}
          className="mt-2 text-center font-display text-2xl text-orange"
        >
          {profile.title}
        </motion.p>

        <div className="mt-4 space-y-1.5">
          {profile.description.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.52 + i * 0.08, duration: 0.3 }}
              className="text-center text-sm leading-snug text-white/80"
            >
              {line}
            </motion.p>
          ))}
        </div>

        {profile.reasons.length > 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.52 + profile.description.length * 0.08 + 0.1, duration: 0.35 }}
            className="mt-5 border-t border-white/10 pt-4"
          >
            <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/40">Why we chose this</p>
            <div className="mt-2.5 flex flex-col gap-1.5">
              {profile.reasons.map((reason) => (
                <span key={reason.label} className="flex items-center gap-2 text-sm text-white/70">
                  <span className="text-base leading-none">{reason.emoji}</span>
                  {reason.label}
                </span>
              ))}
            </div>
          </motion.div>
        )}
      </motion.div>

      <div className="mt-6 rounded-2xl border border-white/10 bg-card p-5">
        <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/40">The Reality</p>
        <div className="mt-3 space-y-2">
          {lines.map((line, i) => (
            <motion.p
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.14, duration: 0.3 }}
              className="text-base leading-snug text-white/85"
            >
              {line}
            </motion.p>
          ))}
        </div>
      </div>

      {breakdown.length > 0 && (
        <div className="mt-6 rounded-2xl border border-white/10 bg-card p-5">
          <p className="text-xs font-bold uppercase tracking-[0.15em] text-white/40">
            Your Weekend Breakdown™
          </p>
          <div className="mt-3 flex flex-col divide-y divide-white/5">
            {breakdown.map((item, i) => (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, x: -8 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + i * 0.08, duration: 0.3 }}
                className="flex items-center justify-between py-2.5 first:pt-0 last:pb-0"
              >
                <span className="flex items-center gap-2.5 text-sm text-white/80">
                  <span className="text-lg leading-none">{item.emoji}</span>
                  {item.label}
                </span>
                <span className="font-display text-sm text-white">{item.display}</span>
              </motion.div>
            ))}
          </div>
          <div className="mt-1 flex items-center justify-between border-t border-white/10 pt-3">
            <span className="text-xs font-bold uppercase tracking-[0.1em] text-white/40">
              Estimated Weekend Surplus
            </span>
            <span className="font-display text-base text-orange">
              ≈ {results.surplus.toLocaleString()} kcal
            </span>
          </div>
        </div>
      )}

      <div className="mt-8">
        <PrimaryButton onClick={onContinue}>SEE MY MONDAY RESET™</PrimaryButton>
      </div>
    </div>
  );
}
