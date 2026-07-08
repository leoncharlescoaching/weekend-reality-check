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
  const [stepIndex, setStepIndex] = useLocalStorage("rc_step", 0);
  const [answers, setAnswers] = useLocalStorage("rc_answers", {});
  const [unitSystem, setUnitSystem] = useLocalStorage("rc_units", "metric");
  const [direction, setDirection] = useState(1);

  const safeIndex = Math.min(stepIndex, flow.length - 1);
  const step = flow[safeIndex];

  const questionSteps = useMemo(
    () => flow.filter((s) => QUESTION_TYPES.includes(s.type)),
    [flow]
  );

  const questionNumber = questionSteps.findIndex((s) => s.id === step.id) + 1;
  const isQuestion = QUESTION_TYPES.includes(step.type);

  const results = useMemo(() => computeResults(answers), [answers]);

  const goNext = () => {
    setDirection(1);
    setStepIndex((i) => Math.min(flow.length - 1, i + 1));
  };

  const goBack = () => {
    setDirection(-1);
    setStepIndex((i) => Math.max(0, i - 1));
  };

  const restart = () => {
    setDirection(-1);
    setAnswers({});
    setStepIndex(0);
  };

  const recordAndAdvance = (field, value) => {
    setAnswers((prev) => ({
      ...prev,
      [field]: value,
    }));
    goNext();
  };

  const recordEmail = (email) => {
    setAnswers((prev) => ({
      ...prev,
      email,
    }));
  };

  if (step.type === "landing") {
    return <LandingPage onStart={goNext} />;
  }

  return (
    <div className="relative mx-auto flex h-svh max-w-md flex-col overflow-hidden bg-bg">
      <AnimatePresence initial={false} custom={direction}>
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
                onAnswer={(value) => recordAndAdvance(step.field, value)}
              />
            ) : (
              <MeasureQuestion
                question={step}
                type={step.type}
                value={answers[step.field]}
                unitSystem={unitSystem}
                setUnitSystem={setUnitSystem}
                onAnswer={(value) => recordAndAdvance(step.field, value)}
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
            <CoachingCTA onContinue={goNext} onSkip={goNext} />
          </ScreenShell>
        )}

        {step.type === "email" && (
          <ScreenShell key="email" noPad direction={direction}>
            <EmailCapture onSubmit={recordEmail} onRestart={restart} />
          </ScreenShell>
        )}
      </AnimatePresence>
    </div>
  );
}
