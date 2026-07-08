import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PrimaryButton } from "../Buttons";
import Logo from "../Logo";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function EmailCapture({ onSubmit, onRestart }) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!EMAIL_RE.test(email)) {
      setError("That doesn't look like a real email. Try again.");
      return;
    }
    setError("");
    onSubmit(email);
    setSubmitted(true);
  };

  return (
    <div className="flex h-full w-full flex-col justify-between px-6 pb-8 pt-10">
      <Logo size="sm" />

      <AnimatePresence mode="wait">
        {!submitted ? (
          <motion.div
            key="form"
            exit={{ opacity: 0, y: -12 }}
            className="flex flex-1 flex-col justify-center"
          >
            <h1 className="font-display text-3xl leading-[1.05] text-white sm:text-4xl">
              Where do we send the full breakdown?
            </h1>
            <p className="mt-3 text-white/50">
              Your Weekend Reality Check™ results, saved. No spam, no bullshit.
            </p>

            <form onSubmit={handleSubmit} className="mt-8">
              <input
                type="email"
                inputMode="email"
                autoComplete="email"
                placeholder="you@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-2xl border border-white/15 bg-card px-5 py-4 text-white placeholder:text-white/30"
              />
              {error && <p className="mt-2 text-sm text-danger">{error}</p>}
              <div className="mt-4">
                <PrimaryButton type="submit">GET MY RESULTS</PrimaryButton>
              </div>
            </form>
          </motion.div>
        ) : (
          <motion.div
            key="confirm"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="flex flex-1 flex-col items-center justify-center text-center"
          >
            <div className="text-5xl">✅</div>
            <h1 className="mt-4 font-display text-3xl leading-tight text-white">
              Check your inbox.
            </h1>
            <p className="mt-3 max-w-xs text-white/50">
              We've saved your Weekend Reality Check™ to <span className="text-white/80">{email}</span>. No more guessing what's actually going on.
            </p>
            <button
              type="button"
              onClick={onRestart}
              className="mt-8 text-xs text-white/30 underline underline-offset-4"
            >
              Start another check
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
