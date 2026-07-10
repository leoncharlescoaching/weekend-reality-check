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
      className={`group inline-flex w-full items-center justify-center gap-3 rounded-xl bg-[#ff6a00] px-6 py-4 text-sm font-black tracking-tight text-neutral-950 shadow-lg shadow-[#ff6a00]/20 transition-all duration-200 hover:bg-[#ff8833] active:scale-[0.98] sm:w-auto sm:px-10 sm:py-5 sm:text-lg ${className}`}
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
    image: "/images/bullshit-detected.png",
    title: "Bullshit Detected™",
    description: "No sugar coating. I'm going to tell you exactly what's been holding you back. Even if it's not what you want to hear.",
  },
  {
    image: "/images/weekend-profile.png",
    title: "Weekend Profile™",
    description: "The pattern you've been repeating every single weekend. Identified. Finally.",
  },
  {
    image: "/images/monday-reset.png",
    title: "Monday Reset™",
    description: "Exactly what to change next weekend. Simple. Clear. No guessing. No fluff.",
  },
  {
    image: "/images/coaching-breakdown.png",
    title: "What I'd Do If You Were My Client™",
    description: "This is how I actually coach. You get to see it before you spend a single penny.",
  },
];
const checklistItems = [
  "Every Monday you start again.",
  "Every weekend you fall apart and undo everything.",
  "You know what you should be doing but you're still not doing it.",
  "You've tried loads of things and you're still in the same place.",
  "You've told yourself next week will be different so many times you don't even believe it anymore.",
  "You just want something that actually works. For good. Not just for two weeks before it all goes to shit again.",
];
const steps = [
  "Take the Weekend Reality Check™. Under two minutes.",
  "Get your personalised coaching breakdown.",
  "See exactly what I'd change first if you were my client.",
  "Stop repeating the same weekend. Start fixing it.",
];
const transformations = [
  {
    image: "/images/mark.png",
    name: "MARK, 61 — BUSINESS OWNER",
    quote: "At 61 I thought I'd left it too late. Leon adapted everything around my health, kept me accountable every week and gave me a clear plan. My cholesterol dropped significantly, my strength increased every phase and my metabolic age came back at 45."
  },
  { image:"/images/vlad.png", name:"VLAD", result:"Spent years training without looking like he trained. With structure and accountability he built the lean athletic physique he had always wanted."},
  { image:"/images/sam.png", name:"SAM", result:"Stopped restarting every Monday, fixed the habits holding him back and lost over 20kg."},
  { image:"/images/jack.png", name:"JACK", result:"Stopped guessing in the gym and finally built muscle while dropping body fat."},
  { image:"/images/glen.png", name:"GLEN", result:"After years of spinning his wheels he finally made consistent progress."},
  { image:"/images/chris.png", name:"CHRIS", result:"Turned inconsistency into routine through simple coaching and accountability."},
  { image:"/images/caine.png", name:"CAINE", result:"Built habits that lasted and transformed both his physique and confidence."}
];
export default function LandingPage({ onStart }) {
  const goToRealityCheck = () => {
    if (onStart) onStart();
  };
  return (
    <main className="min-h-screen w-full overflow-x-hidden bg-neutral-950 text-neutral-100 antialiased">
      <Section className="pt-20 pb-20 sm:pt-28 sm:pb-24 lg:pt-32 lg:pb-28">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
          className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr]"
        >
          <div>
            <p className="mb-5 inline-flex rounded-full border border-[#ff6a00]/30 bg-[#ff6a00]/10 px-4 py-2 text-xs font-black uppercase tracking-[0.25em] text-[#ff6a00]">
              Weekend Reality Check™
            </p>
            <h1 className="max-w-5xl break-words text-4xl font-black leading-[0.95] tracking-tight text-white sm:text-7xl lg:text-8xl">
              STOP STARTING AGAIN
              <br />
              EVERY MONDAY<span className="text-[#ff6a00]">™</span>
            </h1>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-neutral-400 sm:text-xl">
              Brother — you&apos;ve been doing the same shit for years. Same cycle. Same excuses. Same result. The Weekend Reality Check<span className="text-neutral-200">™</span> finds exactly what&apos;s been sabotaging you every single weekend and shows you how I&apos;d coach you before you spend a single penny. It&apos;s free. And it&apos;s better than most people&apos;s paid coaching. I mean that.
            </p>
            <div className="mt-10">
              <CTAButton onClick={goToRealityCheck} />
            </div>
            <ul className="mt-8 grid gap-3 text-sm text-neutral-400 sm:grid-cols-2">
              {trustItems.map((item) => (
                <li key={item} className="flex items-center gap-2">
                  <span className="font-bold text-[#ff6a00]">✓</span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-3 shadow-2xl shadow-black/40 sm:p-4">
            <div className="aspect-video overflow-hidden rounded-2xl bg-neutral-950">
              <video
                className="h-full w-full rounded-2xl"
                autoPlay
                muted
                playsInline
                preload="auto"
                controls
              >
                <source src="/theweekendrealitycheck.mp4" type="video/mp4" />
                Your browser does not support the video tag.
              </video>
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
            <p>You know you should be eating better.</p>
            <p>You know protein matters.</p>
            <p>You know you should be training.</p>
            <p>You know the weekends are where it all goes to shit.</p>
          </div>
          <p className="mt-8 text-xl leading-relaxed text-neutral-200">
            So why does it keep happening?
          </p>
          <p className="mt-6 text-xl leading-relaxed text-neutral-400">
            It&apos;s not because you&apos;re lazy. It&apos;s not because you don&apos;t care.{" "}
            <span className="font-bold text-white">It&apos;s because you keep repeating the same pattern every single weekend without even knowing why.</span>{" "}
            That&apos;s the problem. Not your knowledge. Your pattern. And until someone shows you exactly what that pattern is — nothing changes. Nothing. That&apos;s what I&apos;m going to do.
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
              I know what you&apos;re thinking. Another quiz that tells me to eat more vegetables and drink more water. Cheers for that mate. This is nothing like that. This is built from the exact same process I use with my paying clients. The ones actually getting results. Most coaches wouldn&apos;t show you this for free because their coaching isn&apos;t good enough to show off. Mine is.
            </p>
            <ul className="mt-8 grid gap-4">
              {[
                "Your biggest weekend saboteur.",
                "Your Weekend Profile™.",
                "Your Monday Reset™.",
                "What I'd Do If You Were My Client™.",
              ].map((item) => (
                <li key={item} className="rounded-2xl border border-neutral-800 bg-neutral-900 px-6 py-5 text-lg font-semibold text-neutral-200">
                  <span className="mr-3 text-[#ff6a00]">•</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-8 text-lg leading-relaxed text-neutral-400 sm:text-xl">
              No bullshit. No watered down version. The actual thing.
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
            Real screens. No bullshit. No stock images. This is exactly what you&apos;ll see when you take it.
          </p>
          <div className="mt-14 grid grid-cols-1 gap-6 md:grid-cols-2">
            {deliverables.map(({ image, title, description }, i) => (
              <motion.div
                key={title}
                initial="hidden"
                whileInView="visible"
                viewport={viewport}
                variants={fadeUp}
                transition={{ duration: 0.5, delay: i * 0.08, ease: "easeOut" }}
                className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8 shadow-lg shadow-black/20"
              >
                <div className="mb-7 aspect-[3/4] overflow-hidden rounded-2xl border border-neutral-800 bg-neutral-950">
                  <img
                    src={image}
                    alt={title}
                    className="h-full w-full object-contain"
                  />
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
                  <span className="mr-3 font-bold text-[#ff6a00]">✓</span>
                  {item}
                </li>
              ))}
            </ul>
            <p className="mt-10 text-xl leading-relaxed text-neutral-400">
              Sound familiar?
              <br />
              <span className="font-bold text-white">
                Good. This was built for you mate.
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
            <p>Most dads don&apos;t need another meal plan. You&apos;ve had meal plans. They didn&apos;t stick.</p>
            <p>Most dads don&apos;t need another calorie calculator. You&apos;ve counted calories. It didn&apos;t last.</p>
            <p>Most dads don&apos;t need more motivation. Motivation comes and goes and you know that better than anyone.</p>
          </div>
          <p className="mt-8 text-xl leading-relaxed text-neutral-200">
            What you actually need is someone to show you exactly what&apos;s been sabotaging you and tell you straight what to do about it.
          </p>
          <p className="mt-6 text-xl leading-relaxed text-neutral-400">
            No fads. No quick fixes. No bullshit. That&apos;s what this does. It&apos;s built from the same process I use with my coaching clients every single week. The dads dropping weight, getting stronger and showing up properly for their kids. Not because they found some magic secret. Because someone finally showed them what was actually stopping them.
          </p>
        </motion.div>
      </Section>
      <Section className="border-t border-neutral-900 py-24 sm:py-32">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={viewport}
          variants={fadeUp}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <p className="text-center text-sm font-black uppercase tracking-[0.35em] text-[#ff6a00]">
            REAL RESULTS
          </p>
          <h2 className="mt-4 text-center text-4xl font-black leading-tight tracking-tight text-white sm:text-5xl lg:text-6xl">
            REAL DADS.
            <br />
            REAL RESULTS.
          </h2>
          <p className="mx-auto mt-6 max-w-3xl text-center text-lg leading-relaxed text-neutral-400 sm:text-xl">
            Real dads who got sick of starting again every Monday and actually did something about it.
          </p>
          <div className="mx-auto mt-16 max-w-5xl overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 shadow-2xl shadow-black/30">
            <img
              src={transformations[0].image}
              alt={transformations[0].name}
              className="w-full object-cover"
            />
            <div className="p-8 lg:p-10">
              <div className="flex flex-wrap gap-3">
                <span className="rounded-full bg-[#ff6a00] px-4 py-2 text-sm font-black text-neutral-950">
                  61 YEARS OLD
                </span>
                <span className="rounded-full bg-neutral-800 px-4 py-2 text-sm font-bold text-white">
                  Metabolic Age: 45
                </span>
                <span className="rounded-full bg-neutral-800 px-4 py-2 text-sm font-bold text-white">
                  Cholesterol Reduced
                </span>
              </div>
              <blockquote className="mt-8 text-xl italic leading-relaxed text-white lg:text-2xl">
                "{transformations[0].quote}"
              </blockquote>
              <p className="mt-8 text-sm font-black uppercase tracking-widest text-[#ff6a00] sm:text-base">
                {transformations[0].name}
              </p>
            </div>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {transformations.slice(1).map((client) => (
              <div
                key={client.name}
                className="overflow-hidden rounded-3xl border border-neutral-800 bg-neutral-900 shadow-lg shadow-black/20 transition duration-200 hover:-translate-y-1 hover:border-[#ff6a00]/40"
              >
                <img
                  src={client.image}
                  alt={client.name}
                  className="aspect-square w-full object-cover"
                />
                <div className="p-6">
                  <p className="text-xl font-black tracking-wider text-white">
                    {client.name}
                  </p>
                  <p className="mt-4 text-sm leading-relaxed text-neutral-300">
                    {client.result}
                  </p>
                </div>
              </div>
            ))}
          </div>
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
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#ff6a00] text-lg font-black text-neutral-950">
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
            <p>You&apos;ve been starting again every Monday for long enough.</p>
            <p>You&apos;re not lazy. You&apos;re not weak. You just haven&apos;t had anyone show you exactly what&apos;s been getting in the way.</p>
            <p>That ends now.</p>
          </div>
          <p className="mt-6 max-w-2xl text-xl leading-relaxed text-neutral-200">
            Take the Weekend Reality Check™. Find out what&apos;s actually been sabotaging you. See exactly what I&apos;d do if you were sat in front of me as a client. Then do something about it for once. Life ain&apos;t gonna calm down and wait for you mate. The right time isn&apos;t Monday. It&apos;s right now.
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
