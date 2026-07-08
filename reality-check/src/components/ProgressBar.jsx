import { motion } from "framer-motion";
import { BackChevron } from "./Buttons";

export default function ProgressBar({ current, total, section, onBack }) {
  const pct = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="pt-3 pb-2">
      <div className="flex items-center gap-3">
        <BackChevron onClick={onBack} />
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-white/10">
          <motion.div
            className="h-full rounded-full bg-orange"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.35, ease: "easeOut" }}
          />
        </div>
        <span className="w-10 text-right text-xs font-medium text-white/40 tabular-nums">
          {current}/{total}
        </span>
      </div>
      {section && (
        <p className="mt-3 text-xs font-semibold uppercase tracking-[0.2em] text-orange">
          {section}
        </p>
      )}
    </div>
  );
}
