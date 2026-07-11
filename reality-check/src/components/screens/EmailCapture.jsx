import { useState } from "react";
import { PrimaryButton } from "../Buttons";
import Logo from "../Logo";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// This is the LAST screen in the flow (see data/flow.js — results and the
// Monday Reset already showed earlier, on screen, in full). This screen is
// just lead capture (name + email) so Leon can follow up — it does NOT
// email them their results, since they've already seen everything here.
const RECAP_BULLETS = [
  "Your Weekend Score™ and Bullshit Level™",
  "Your Weekend Profile™",
  "Your Monday Reset™",
  "What I'd do first if you were my client",
];

export default function EmailCapture({ onSubmit, onRestart }) {
  const [form, setForm] = useState({ name: "", email: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const set = (key) => (e) =>
    setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.name.trim()) {
      setError("Enter your name.");
      return;
    }
    if (!EMAIL_RE.test(form.email.trim())) {
      setError("That doesn't look like a real email. Try again.");
      return;
    }

    setError("");
    setLoading(true);

    try {
      // This actually persists the lead — POSTs to a backend endpoint
      // that calls the Mailchimp API server-side. Mailchimp can't be
      // called directly from the browser (CORS + it'd expose your API key).
      // Just name + email — no results merge fields. Mailchimp rejects
      // the whole request if you send merge tags that don't exist in the
      // Audience, and there's no need for them anyway since results are
      // already shown on screen, not delivered by email.
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name.trim(),
          email: form.email.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(
          data.error || "Something went wrong. Please try again."
        );
      }

      // Subscribed successfully. This is the last screen in the flow
      // (nothing comes after "email" in flow.js), so there's nowhere to
      // advance to — we show a local success state instead. We still
      // tell the parent so `answers.email` gets recorded for consistency.
      await onSubmit(form.email.trim());
      setSubmitted(true);
    } catch (err) {
      console.error("EmailCapture subscribe error:", err);
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center px-6 pb-8 pt-10 text-center">
        <div className="text-5xl">✅</div>
        <h1 className="mt-4 font-display text-3xl leading-tight text-white">
          You&apos;re all set.
        </h1>
        <p className="mt-3 max-w-xs text-white/50">
          Got it — <span className="text-white/80">{form.email}</span> is on
          the list. I'll be in touch personally.
        </p>
        {onRestart && (
          <button
            type="button"
            onClick={onRestart}
            className="mt-8 text-xs text-white/30 underline underline-offset-4"
          >
            Start another check
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="flex h-full w-full flex-col items-center overflow-y-auto px-6 pb-8 pt-10">
      <div className="flex w-full items-center justify-between">
        {onRestart ? (
          <button
            type="button"
            onClick={onRestart}
            className="rounded-lg border border-white/15 px-3 py-2 text-[11px] font-bold uppercase tracking-[0.2em] text-white/60"
          >
            Start Over
          </button>
        ) : (
          <span className="w-[52px]" />
        )}
        <Logo size="sm" />
        <span className="w-[52px]" />
      </div>

      <div className="mt-10 h-[3px] w-10 bg-orange" />

      <h1 className="mt-8 max-w-xs text-center font-display text-3xl leading-[1.05] text-white sm:text-4xl">
        Don&apos;t lose this.
      </h1>
      <p className="mt-3 max-w-xs text-center text-sm leading-relaxed text-white/50">
        Leave your details and I&apos;ll follow up personally.
      </p>

      <div className="mt-6 w-full max-w-sm rounded-2xl border border-white/10 bg-card/95 p-5 shadow-lg shadow-black/10">
        <p className="text-center text-xs font-bold uppercase tracking-[0.2em] text-orange">
          What you just found out
        </p>
        <div className="mt-4 flex flex-col gap-2.5">
          {RECAP_BULLETS.map((item) => (
            <div
              key={item}
              className="flex items-center gap-3 text-sm text-white/80"
            >
              <span className="h-1.5 w-1.5 shrink-0 bg-orange" />
              {item}
            </div>
          ))}
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 w-full max-w-sm">
        <div className="flex flex-col gap-3">
          <input
            type="text"
            name="name"
            placeholder="Full name"
            value={form.name}
            onChange={set("name")}
            autoComplete="name"
            disabled={loading}
            className="w-full rounded-2xl border border-white/15 bg-card px-5 py-4 text-white placeholder:text-white/30 disabled:opacity-60"
          />
          <input
            type="email"
            name="email"
            inputMode="email"
            placeholder="Email address"
            value={form.email}
            onChange={set("email")}
            autoComplete="email"
            disabled={loading}
            className="w-full rounded-2xl border border-white/15 bg-card px-5 py-4 text-white placeholder:text-white/30 disabled:opacity-60"
          />
        </div>
        {error && <p className="mt-2 text-sm text-danger">{error}</p>}
        <div className="mt-4">
          <PrimaryButton type="submit" disabled={loading}>
            {loading ? "SAVING..." : "SAVE MY RESULTS"}
          </PrimaryButton>
        </div>
        <p className="mt-3 text-center text-xs leading-relaxed text-white/40">
          No spam. No fluff. Just a real follow-up from me.
        </p>
      </form>
    </div>
  );
}
