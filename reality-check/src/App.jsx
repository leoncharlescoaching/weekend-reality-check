import { useMemo, useState } from "react";
import { AnimatePresence } from "framer-motion";

import { buildFlow } from "./data/flow";
import { computeResults } from "./lib/scoring";
import { useLocalStorage } from "./hooks/useLocalStorage";

import ScreenShell from "./components/ScreenShell";
import ProgressBar from "./components/ProgressBar";
import ChoiceQuestion from "./components/ChoiceQuestion";
import MeasureQuestion from "./components/MeasureQuestion";

import Splash from "./components/screens/Splash";
import LandingPage from "./LandingPage";
import LoadingScan from "./components/screens/LoadingScan";
import Results from "./components/screens/Results";
import MondayReset from "./components/screens/MondayReset";
import CoachingCTA from "./components/screens/CoachingCTA";
import EmailCapture from "./components/screens/EmailCapture";

const QUESTION_TYPES = ["number", "choice", "height", "weight"];

export default function App() {
  const flow = useMemo(() => buildFlow(), []);
  // Quiz progress is deliberately NOT persisted to localStorage anymore.
  // It used to be (via useLocalStorage), which meant that once a visitor
  // reached any screen past the landing page, that screen got locked into
  // their browser and every future visit resumed there instead of
  // starting fresh — including a permanent "stuck" state if they closed
  // the tab mid-quiz. Plain useState means every fresh page load always
  // starts at the landing screen. unitSystem (metric/imperial) is a real
  // user preference, not quiz progress, so that one still persists.
  const [stepIndex, setStepIndex] = useState(1);
  const [answers, setAnswers] = useState({});
  const [unitSystem, setUnitSystem] = useLocalStorage("rc_units", "metric");
  const [direction, setDirection] = useState(1);

  const safeIndex = Math.min(Math.max(stepIndex, 0), flow.length - 1);
  const step = flow[safeIndex];

  const questionSteps = useMemo(
    () => flow.filter((item) => QUESTION_TYPES.includes(item.type)),
    [flow]
  );

  const questionNumber =
    questionSteps.findIndex((item) => item.id === step.id) + 1;
  const isQuestion = QUESTION_TYPES.includes(step.type);

  const results = useMemo(() => computeResults(answers), [answers]);

  const goNext = () => {
    setDirection(1);
    setStepIndex((current) =>
      Math.min(flow.length - 1, current + 1)
    );
  };

  const goBack = () => {
    setDirection(-1);
    setStepIndex((current) => Math.max(1, current - 1));
  };

  const restart = () => {
    setDirection(-1);
    setAnswers({});
    setStepIndex(1);
  };

  // "Not ready yet" on the final CTA screen jumps straight back to the
  // Results screen rather than ending the interaction or navigating away
  // — keeps them looking at their own data instead of losing them.
  const goToResults = () => {
    setDirection(-1);
    const resultsIndex = flow.findIndex((item) => item.type === "results");
    if (resultsIndex !== -1) setStepIndex(resultsIndex);
  };

  const recordAndAdvance = (field, value) => {
    setAnswers((current) => ({
      ...current,
      [field]: value,
    }));
    goNext();
  };

  const recordEmail = (email) => {
    setAnswers((current) => ({
      ...current,
      email,
    }));
    goNext();
  };

  if (!step) {
    return null;
  }

  // Shows on every screen so there's always a fast way back to the start
  // — useful mid-quiz for real visitors, not just while testing. Wired to
  // the existing restart() so it's an instant state reset, not a hard
  // page reload.
  const resetButton = (
    <button
      type="button"
      onClick={restart}
      className="fixed bottom-3 right-3 z-50 rounded-full border border-white/10 bg-black/60 px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-white/50 backdrop-blur hover:text-white/80"
    >
      Reset
    </button>
  );

  if (step.type === "landing") {
    return (
      <>
        <LandingPage onStart={goNext} />
        {resetButton}
      </>
    );
  }

  return (
    <div className="relative mx-auto flex h-svh max-w-md flex-col overflow-hidden bg-bg">
      {resetButton}
      <AnimatePresence
        initial={false}
        custom={direction}
        mode="popLayout"
      >
        {step.type === "splash" && (
          <ScreenShell key="splash" noPad direction={direction}>
            <Splash onDone={goNext} />
          </ScreenShell>
        )}

        {isQuestion && (
          <ScreenShell key={step.id} direction={direction}>
            <ProgressBar
              current={questionNumber}
              total={questionSteps.length}
              section={step.section}
              onBack={goBack}
            />

            {step.type === "choice" ? (
              <ChoiceQuestion
                question={step.question}
                options={step.options}
                value={answers[step.field]}
                onAnswer={(value) =>
                  recordAndAdvance(step.field, value)
                }
              />
            ) : (
              <MeasureQuestion
                question={step}
                type={step.type}
                value={answers[step.field]}
                unitSystem={unitSystem}
                setUnitSystem={setUnitSystem}
                onAnswer={(value) =>
                  recordAndAdvance(step.field, value)
                }
              />
            )}
          </ScreenShell>
        )}

        {step.type === "scan" && (
          <ScreenShell key="scan" noPad direction={direction}>
            <LoadingScan onDone={goNext} />
          </ScreenShell>
        )}

        {step.type === "results" && (
          <ScreenShell key="results" noPad direction={direction}>
            <Results results={results} onContinue={goNext} />
          </ScreenShell>
        )}

        {step.type === "reset" && (
          <ScreenShell key="reset" noPad direction={direction}>
            <MondayReset results={results} onContinue={goNext} />
          </ScreenShell>
        )}

        {step.type === "cta" && (
          <ScreenShell key="cta" noPad direction={direction}>
            <CoachingCTA onViewResults={goToResults} />
          </ScreenShell>
        )}

        {step.type === "email" && (
          <ScreenShell key="email" noPad direction={direction}>
            <EmailCapture
              results={results}
              onSubmit={recordEmail}
              onRestart={restart}
            />
          </ScreenShell>
        )}
      </AnimatePresence>
    </div>
  );
}
