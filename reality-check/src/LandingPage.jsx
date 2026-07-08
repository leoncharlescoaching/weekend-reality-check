import React from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowRight,
  Check,
  ShieldAlert,
  UserCircle2,
  RotateCcw,
  MessageSquareText,
} from "lucide-react";

/* ------------------------------------------------------------------ */
/*  Shared config                                                      */
/* ------------------------------------------------------------------ */

const REALITY_CHECK_ROUTE = "/reality-check";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const viewport = { once: true, amount: 0.3 };

/* ------------------------------------------------------------------ */
/*  Reusable CTA button                                                 */
/* ------------------------------------------------------------------ */

function CTAButton({ onClick, className = "", size = "lg" }) {
  const sizes = {
    lg: "px-8 py-5 text-base sm:text-lg",
    md: "px-7 py-4 text-sm sm:text-base",
  };

  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-3 rounded-xl bg-amber-500 font-semibold tracking-tight text-neutral-950 shadow-lg shadow-amber-500/20 transition-all duration-200 hover:bg-amber-400 hover:shadow-amber-500/30 active:scale-[0.98] ${sizes[size]} ${className}`}
    >
      START MY FREE REALITY CHECK
      <ArrowRight
        className="h-5 w-5 transition-transform duration-200 group-hover:translate-x-1"
        strokeWidth={2.5}
      />
    </button>
  );
}

/* ------------------------------------------------------------------ */
/*  Section wrapper                                                     */
/* ------------------------------------------------------------------ */

function Section({ id, className = "", children }) {
  return (
    <section id={id} className={`w-full ${className}`}>
      <div className="mx-auto w-full max-w-[1200px] px-6 sm:px-8 lg:px-10">
        {children}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */
/*  Data                                                                */
/* ------------------------------------------------------------------ */

const trustItems = [
  "Under 2 minutes",
  "Personalised coaching breakdown",
  "Built from real client coaching",
  "Completely free",
];

const deliverables = [
  {
    icon: ShieldAlert,
    title: "Bullshit Detected™",
    description: "The truth about what's really holding you back.",
  },
  {
    icon: UserCircle2,
    title: "Weekend Profile™",
    description: "Discover your behaviour pattern.",
  },
  {
    icon: RotateCcw,
    title: "Monday Reset™",
    description: "Know exactly what to change next weekend.",
  },
  {
    icon: MessageSquareText,
    title: "What I'd Do If You Were My Client™",
    description: "Experience how Leon coaches before spending a penny.",
  },
];

const checklistItems = [
  "You restart every Monday.",
  "You lose control every weekend.",
  "You know what to do.",
  "You struggle to stay consistent.",
  "You tell yourself “next week will be different.”",
  "You want lasting results.",
];

const steps = [
  {
    number: "1",
    title: "Complete the Weekend Reality Check™.",
  },
  {
    number: "2",
    title: "Receive your personalised coaching breakdown.",
  },
  {
    number: "3",
    title: "See exactly what I'd change first.",
  },
  {
    number: "4",
    title: "Start putting it into action.",
  },
];

/* ------------------------------------------------------------------ */
/*  Page                                                                */
/* ------------------------------------------------------------------ */

export default function LandingPage() {
  const navigate = useNavigate();

  const goToRealityCheck = () => navigate(REALITY_CHECK_ROUTE);

  return (
    <main className="min-h-screen w-full bg-neutral-950 text-neutral-100 antialiased">
      {/* ============================================================ */}
      {/* 1. HERO */}
      {/* ============================================================ */}
      <Section className="pt-28 pb-20 sm:pt-36 sm:pb-28 lg:pt-44 lg:pb-32">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start text-left"
        >
          <h1 className="max-w-4xl text-4xl font-black leading-[1.05] tracking-tight text-white sm:text-6xl lg:text-7xl">
            STOP STARTING AGAIN
            <br />
            EVERY MONDAY<span className="text-amber-500">™</span>
          </h1>

          <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl">
            Every Monday you promise yourself this week will be different.
            Every Friday proves it won't be. The Weekend Reality Check
            <span className="text-neutral-200">™</span> uncovers the habit
            that's really holding you back and lets you experience how I'd
            coach you before you ever become a client.
          </p>

          <div className="mt-10">
            <CTAButton onClick={goToRealityCheck} />
          </div>

          <ul className="mt-10 flex flex-col flex-wrap gap-x-8 gap-y-3 text-sm text-neutral-400 sm:flex-row sm:items-center">
            {trustItems.map((item) => (
              <li key={item} className="flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0 text-amber-500" strokeWidth={3} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      </Section>

      {/* ============================================================ */}
      {/* 2. THE PROBLEM */}
      {/* ============================================================ */}
      <Section className="border-t border-neutral-900 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            WHY YOU KEEP STARTING AGAIN
            <br />
            EVERY MONDAY
          </h2>

          <div className="mt-8 space-y-2 text-lg leading-relaxed text-neutral-400 sm:text-xl">
            <p>You already know how to lose weight.</p>
            <p>You already know protein matters.</p>
            <p>You already know you should train.</p>
            <p>You already know weekends matter.</p>
          </div>

          <p className="mt-6 text-lg leading-relaxed text-neutral-400 sm:text-xl">
            So why do you keep ending up back at square one?
          </p>

          <p className="mt-6 text-lg leading-relaxed text-neutral-200 sm:text-xl">
            Because your problem isn't knowledge.{" "}
            <span className="font-semibold text-white">It's repetition.</span>
          </p>

          <p className="mt-6 text-lg leading-relaxed text-neutral-400 sm:text-xl">
            Every weekend you repeat the same behaviours. The Weekend Reality
            Check™ identifies exactly where that cycle begins.
          </p>
        </motion.div>
      </Section>

      {/* ============================================================ */}
      {/* 3. WHY THIS IS DIFFERENT */}
      {/* ============================================================ */}
      <Section className="border-t border-neutral-900 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            THIS ISN'T ANOTHER FREE QUIZ.
          </h2>

          <p className="mt-8 text-lg leading-relaxed text-neutral-400 sm:text-xl">
            Most free quizzes tell you things you already know. The Weekend
            Reality Check™ doesn't. It identifies:
          </p>

          <ul className="mt-8 space-y-4">
            {[
              "Your biggest weekend saboteur.",
              "Your Weekend Profile™.",
              "Your Monday Reset™.",
              "What I'd Do If You Were My Client™.",
            ].map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-lg text-neutral-200 sm:text-xl"
              >
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-amber-500" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-8 text-lg leading-relaxed text-neutral-400 sm:text-xl">
            This is designed to feel like a genuine coaching review.
          </p>
        </motion.div>
      </Section>

      {/* ============================================================ */}
      {/* 4. HERE'S EXACTLY WHAT YOU'LL GET */}
      {/* ============================================================ */}
      <Section className="border-t border-neutral-900 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            HERE'S EXACTLY WHAT YOU'LL GET
          </h2>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl">
            These are real screens from the Weekend Reality Check™. No fake
            examples. No stock images. This is exactly what you'll
            experience.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-6 sm:grid-cols-2">
            {deliverables.map(({ icon: Icon, title, description }, i) => (
              <motion.div
                key={title}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="rounded-2xl border border-neutral-800 bg-neutral-900 p-6 shadow-lg shadow-black/20 sm:p-7"
              >
                <div className="mb-6 flex aspect-video w-full items-center justify-center rounded-xl border border-neutral-800 bg-neutral-950">
                  <Icon className="h-10 w-10 text-amber-500" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-bold tracking-tight text-white">
                  {title}
                </h3>
                <p className="mt-2 text-base leading-relaxed text-neutral-400">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ============================================================ */}
      {/* 5. WHO THIS IS FOR */}
      {/* ============================================================ */}
      <Section className="border-t border-neutral-900 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            YOU'LL RECOGNISE YOURSELF IF...
          </h2>

          <ul className="mt-10 space-y-4">
            {checklistItems.map((item) => (
              <li
                key={item}
                className="flex items-start gap-3 text-lg text-neutral-200 sm:text-xl"
              >
                <Check
                  className="mt-1 h-5 w-5 shrink-0 text-amber-500"
                  strokeWidth={3}
                />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <p className="mt-10 text-lg leading-relaxed text-neutral-400 sm:text-xl">
            If that sounds like you...
            <br />
            <span className="font-semibold text-white">
              This was built for you.
            </span>
          </p>
        </motion.div>
      </Section>

      {/* ============================================================ */}
      {/* 6. WHY THIS WORKS */}
      {/* ============================================================ */}
      <Section className="border-t border-neutral-900 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="max-w-3xl"
        >
          <h2 className="text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            WHY THIS WORKS
          </h2>

          <div className="mt-8 space-y-2 text-lg leading-relaxed text-neutral-400 sm:text-xl">
            <p>Most people don't need another meal plan.</p>
            <p>Most people don't need another calorie calculator.</p>
            <p>Most people don't need more motivation.</p>
          </div>

          <p className="mt-6 text-lg leading-relaxed text-neutral-200 sm:text-xl">
            They need somebody to identify what's actually sabotaging them.
          </p>

          <p className="mt-6 text-lg leading-relaxed text-neutral-400 sm:text-xl">
            That's exactly what the Weekend Reality Check™ does. It uses the
            same coaching thinking Leon uses with his paying clients.
          </p>
        </motion.div>
      </Section>

      {/* ============================================================ */}
      {/* 7. WHAT HAPPENS NEXT */}
      {/* ============================================================ */}
      <Section className="border-t border-neutral-900 py-20 sm:py-28">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <h2 className="max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            WHAT HAPPENS NEXT?
          </h2>

          <div className="mt-14 flex flex-col items-start gap-0 sm:items-center">
            {steps.map((step, i) => (
              <React.Fragment key={step.number}>
                <motion.div
                  initial="hidden"
                  whileInView="visible"
                  viewport={viewport}
                  variants={fadeUp}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: "easeOut" }}
                  className="flex w-full max-w-xl items-center gap-5 rounded-2xl border border-neutral-800 bg-neutral-900 px-6 py-5 shadow-lg shadow-black/20"
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-amber-500 text-base font-black text-neutral-950">
                    {step.number}
                  </span>
                  <span className="text-lg font-semibold text-white sm:text-xl">
                    {step.title}
                  </span>
                </motion.div>

                {i < steps.length - 1 && (
                  <div
                    aria-hidden="true"
                    className="my-3 h-8 w-px bg-neutral-800"
                  />
                )}
              </React.Fragment>
            ))}
          </div>
        </motion.div>
      </Section>

      {/* ============================================================ */}
      {/* 8. FINAL CTA */}
      {/* ============================================================ */}
      <Section className="border-t border-neutral-900 py-24 sm:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="flex flex-col items-start text-left"
        >
          <h2 className="max-w-3xl text-3xl font-black leading-tight tracking-tight text-white sm:text-4xl lg:text-5xl">
            READY TO FIND OUT WHAT'S REALLY HOLDING YOU BACK?
          </h2>

          <div className="mt-8 space-y-2 text-lg leading-relaxed text-neutral-400 sm:text-xl">
            <p>Take the Weekend Reality Check™.</p>
            <p>Discover your Weekend Profile™.</p>
            <p>See your Monday Reset™.</p>
            <p>Experience how I coach.</p>
          </div>

          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-neutral-200 sm:text-xl">
            Then start changing the weekends that have been holding you back.
          </p>

          <div className="mt-12">
            <CTAButton onClick={goToRealityCheck} />
          </div>
        </motion.div>
      </Section>

      <footer className="border-t border-neutral-900 py-10">
        <div className="mx-auto w-full max-w-[1200px] px-6 text-center text-sm text-neutral-600 sm:px-8 lg:px-10">
          © {new Date().getFullYear()} Leon Charles. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
