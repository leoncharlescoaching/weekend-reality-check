import React from "react";
import { motion } from "framer-motion";

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0 },
};

const viewport = { once: true, amount: 0.25 };

function CTAButton({ onClick, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`group inline-flex items-center justify-center gap-3 rounded-xl bg-amber-500 px-10 py-5 text-base font-black tracking-tight text-neutral-950 shadow-lg shadow-amber-500/20 transition-all duration-200 hover:bg-amber-400 active:scale-[0.98] sm:text-lg ${className}`}
    >
      START MY FREE REALITY CHECK
      <span className="text-xl transition-transform duration-200 group-hover:translate-x-1">
        →
      </span>
    </button>
  );
}

function Section({ className = "", children }) {
  return (
    <section className={`w-full ${className}`}>
      <div className="mx-auto w-full max-w-6xl px-6 sm:px-10 lg:px-12">
        {children}
      </div>
    </section>
  );
}

const trustItems = [
  "Under 2 minutes",
  "Personalised coaching breakdown",
  "Built from real client coaching",
  "Completely free",
];

const deliverables = [
  {
    label: "01",
    title: "Bullshit Detected™",
    description: "The truth about what's really holding you back.",
  },
  {
    label: "02",
    title: "Weekend Profile™",
    description: "Discover the pattern you keep repeating.",
  },
  {
    label: "03",
    title: "Monday Reset™",
    description: "Know exactly what to change next weekend.",
  },
  {
    label: "04",
    title: "What I'd Do If You Were My Client™",
    description: "Experience how I coach before spending a penny.",
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
  "Complete the Weekend Reality Check™.",
  "Receive your personalised coaching breakdown.",
  "See exactly what I'd change first.",
  "Start putting it into action.",
];

export default function LandingPage({ onStart }) {
  const goToRealityCheck = () => {
    if (onStart) onStart();
  };

  return (
    <main className="min-h-screen w-full bg-neutral-950 text-neutral-100 antialiased">
      <Section className="pt-20 pb-20 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <div className="mb-8 flex items-center gap-4">
  <img src="/lgf-logo.png" alt="Look Good Fitness" className="h-14 w-auto" />
  <div>
    <p className="text-sm font-bold uppercase tracking-[0.25em] text-amber-500">Created by Leon Charles</p>
    <p className="text-sm text-neutral-500">Look Good Fitness</p>
  </div>
</div>

            <h1 className="max-w-5xl text-5xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
              STOP STARTING AGAIN
              <br />
              EVERY MONDAY<span className="text-amber-500">™</span>
            </h1>

            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl">
              Every Monday you promise yourself this week will be different.
              Every Friday proves it won&apos;t be. The Weekend Reality Check
              <span className="text-neutral-200">™</span> uncovers the habit
              that&apos;s really holding you back and lets you experience how
              I&apos;d coach you before you ever become a client.
            </p>

            

            <ul className="mt-8 grid gap-3 text-sm text-neutral-400 sm:grid-cols-2">
              {trustItems.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="font-bold text-amber-500">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-4 shadow-2xl shadow-black/40">
            <div className="aspect-video overflow-hidden rounded-2xl bg-neutral-950">
              <iframe
                className="h-full w-full"
                src="PASTE_YOUR_VIDEO_EMBED_URL_HERE"
                title="Weekend Reality Check welcome video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="mt-6">
  <CTAButton onClick={goToRealityCheck} className="w-full" />
</div>

<p className="mt-4 text-center text-sm text-neutral-500">
              Watch this first. I&apos;ll explain exactly how the Reality Check
              works and why weekends keep ruining your progress.
            </p>
          </div>
        </motion.div>
      </Section>

      <Section className="border-t border-neutral-900 py-24 sm:py-32">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }} className="max-w-4xl">
          <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            WHY YOU KEEP STARTING AGAIN EVERY MONDAY
          </h2>

          <div className="mt-8 space-y-3 text-lg leading-relaxed text-neutral-400 sm:text-xl">
            <p>You already know how to lose weight.</p>
            <p>You already know protein matters.</p>
            <p>You already know you should train.</p>
            <p>You already know weekends matter.</p>
          </div>

          <p className="mt-8 text-xl leading-relaxed text-neutral-200">
            So why do you keep ending up back at square one?
          </p>

          <p className="mt-6 text-xl leading-relaxed text-neutral-400">
            Because your problem isn&apos;t knowledge.{" "}
            <span className="font-bold text-white">It&apos;s repetition.</span>{" "}
            Every weekend you repeat the same behaviours. The Weekend Reality
            Check™ identifies exactly where that cycle begins.
          </p>
        </motion.div>
      </Section>

      <Section className="border-t border-neutral-900 py-24 sm:py-32">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }} className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            THIS ISN&apos;T ANOTHER FREE QUIZ.
          </h2>

          <div>
            <p className="text-lg leading-relaxed text-neutral-400 sm:text-xl">
              Most free quizzes tell you things you already know. The Weekend
              Reality Check™ doesn&apos;t.
            </p>

            <ul className="mt-8 grid gap-4">
              {[
                "Your biggest weekend saboteur.",
                "Your Weekend Profile™.",
                "Your Monday Reset™.",
                "What I'd Do If You Were My Client™.",
              ].map((item) => (
                <li key={item} className="rounded-2xl border border-neutral-800 bg-neutral-900 px-6 py-5 text-lg font-semibold text-neutral-200">
                  <span className="mr-3 text-amber-500">•</span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-8 text-lg leading-relaxed text-neutral-400 sm:text-xl">
              This is designed to feel like a genuine coaching review.
            </p>
          </div>
        </motion.div>
      </Section>

      <Section className="border-t border-neutral-900 py-24 sm:py-32">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
          <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            HERE&apos;S EXACTLY WHAT YOU&apos;LL GET
          </h2>

          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-neutral-400 sm:text-xl">
            These are real screens from the Weekend Reality Check™. No fake
            examples. No stock images. This is exactly what you&apos;ll
            experience.
          </p>

          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {deliverables.map(({ label, title, description }, i) => (
              <motion.div
                key={title}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8 shadow-lg shadow-black/20"
              >
                <div className="mb-7 flex aspect-video w-full items-center justify-center rounded-2xl border border-neutral-800 bg-neutral-950">
                  <div className="flex h-24 w-24 items-center justify-center rounded-full border border-amber-500/30 bg-amber-500/10">
                    <span className="text-3xl font-black tracking-widest text-amber-500">
                      {label}
                    </span>
                  </div>
                </div>

                <h3 className="text-2xl font-black tracking-tight text-white">
                  {title}
                </h3>

                <p className="mt-3 text-lg leading-relaxed text-neutral-400">
                  {description}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </Section>

      <Section className="border-t border-neutral-900 py-24 sm:py-32">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }} className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr]">
          <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl">
            YOU&apos;LL RECOGNISE YOURSELF IF...
          </h2>

          <div>
            <ul className="grid gap-4 sm:grid-cols-2">
              {checklistItems.map((item) => (
                <li key={item} className="rounded-2xl border border-neutral-800 bg-neutral-900 px-5 py-4 text-base text-neutral-200">
                  <span className="mr-3 font-bold text-amber-500">✓</span>
                  {item}
                </li>
              ))}
            </ul>

            <p className="mt-10 text-xl leading-relaxed text-neutral-400">
              If that sounds like you...
              <br />
              <span className="font-bold text-white">
                This was built for you.
              </span>
            </p>
          </div>
        </motion.div>
      </Section>

      <Section className="border-t border-neutral-900 py-24 sm:py-32">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }} className="max-w-4xl">
          <h2 className="text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            WHY THIS WORKS
          </h2>

          <div className="mt-8 space-y-3 text-lg leading-relaxed text-neutral-400 sm:text-xl">
            <p>Most people don&apos;t need another meal plan.</p>
            <p>Most people don&apos;t need another calorie calculator.</p>
            <p>Most people don&apos;t need more motivation.</p>
          </div>

          <p className="mt-8 text-xl leading-relaxed text-neutral-200">
            They need somebody to identify what&apos;s actually sabotaging them.
          </p>

          <p className="mt-6 text-xl leading-relaxed text-neutral-400">
            That&apos;s exactly what the Weekend Reality Check™ does. It uses
            the same coaching thinking I use with my paying clients.
          </p>
        </motion.div>
      </Section>

      <Section className="border-t border-neutral-900 py-24 sm:py-32">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }}>
          <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            WHAT HAPPENS NEXT?
          </h2>

          <div className="mt-14 grid gap-5 md:grid-cols-4">
            {steps.map((step, i) => (
              <div key={step} className="rounded-3xl border border-neutral-800 bg-neutral-900 p-6 shadow-lg shadow-black/20">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-amber-500 text-lg font-black text-neutral-950">
                  {i + 1}
                </span>
                <p className="mt-6 text-lg font-semibold leading-snug text-white">
                  {step}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </Section>

      <Section className="border-t border-neutral-900 py-24 sm:py-32">
        <motion.div initial="hidden" whileInView="visible" viewport={viewport} variants={fadeUp} transition={{ duration: 0.6, ease: "easeOut" }} className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8 shadow-2xl shadow-black/30 sm:p-12 lg:p-16">
          <h2 className="max-w-4xl text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            READY TO FIND OUT WHAT&apos;S REALLY HOLDING YOU BACK?
          </h2>

          <div className="mt-8 space-y-2 text-lg leading-relaxed text-neutral-400 sm:text-xl">
            <p>Take the Weekend Reality Check™.</p>
            <p>Discover your Weekend Profile™.</p>
            <p>See your Monday Reset™.</p>
            <p>Experience how I coach.</p>
          </div>

          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-neutral-200">
            Then start changing the weekends that have been holding you back.
          </p>

          <div className="mt-12">
            <CTAButton onClick={goToRealityCheck} />
          </div>
        </motion.div>
      </Section>

      <footer className="border-t border-neutral-900 py-10">
        <div className="mx-auto w-full max-w-6xl px-6 text-center text-sm text-neutral-600 sm:px-10 lg:px-12">
          © {new Date().getFullYear()} Leon Charles. All rights reserved.
        </div>
      </footer>
    </main>
  );
}
