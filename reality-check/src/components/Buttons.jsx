import { motion } from "framer-motion";

export function PrimaryButton({ children, onClick, disabled, type = "button", className = "" }) {
  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      whileTap={{ scale: 0.97 }}
      className={`w-full rounded-2xl bg-orange px-6 py-5 text-center font-display text-lg tracking-wide text-bg transition-opacity active:opacity-90 disabled:opacity-40 ${className}`}
    >
      {children}
    </motion.button>
  );
}

export function GhostButton({ children, onClick, className = "" }) {
  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileTap={{ scale: 0.97 }}
      className={`w-full rounded-2xl border border-white/15 bg-transparent px-6 py-5 text-center font-display text-lg tracking-wide text-white ${className}`}
    >
      {children}
    </motion.button>
  );
}

export function BackChevron({ onClick }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label="Back"
      className="flex h-10 w-10 items-center justify-center rounded-full text-white/60 transition-colors hover:text-white"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
        <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </button>
  );
}
