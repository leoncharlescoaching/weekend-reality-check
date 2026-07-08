import { useState } from "react";
import { PrimaryButton } from "./Buttons";
import { cmToFtIn, kgToLb } from "../lib/units";

function Stepper({ onDec, onInc, children }) {
  return (
    <div className="flex items-center justify-center gap-6">
      <RoundBtn onClick={onDec} label="−" />
      <div className="min-w-[9rem] text-center">{children}</div>
      <RoundBtn onClick={onInc} label="+" />
    </div>
  );
}

function RoundBtn({ onClick, label }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full border border-white/15 bg-card font-display text-2xl text-white active:bg-white/10"
    >
      {label}
    </button>
  );
}

function UnitToggle({ unit, setUnit, options }) {
  return (
    <div className="mx-auto flex w-fit rounded-full border border-white/10 bg-card p-1">
      {options.map((o) => (
        <button
          key={o.value}
          type="button"
          onClick={() => setUnit(o.value)}
          className={`rounded-full px-4 py-1.5 text-sm font-semibold transition-colors ${
            unit === o.value ? "bg-orange text-bg" : "text-white/50"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}

export default function MeasureQuestion({ question, type, value, onAnswer, unitSystem, setUnitSystem }) {
  // AGE ----------------------------------------------------------------
  if (type === "number") {
    const [val, setVal] = useState(value ?? question.default ?? 30);
    const clamp = (n) => Math.max(question.min, Math.min(question.max, n));
    return (
      <div className="flex flex-1 flex-col justify-center py-4">
        <h1 className="font-display text-3xl leading-[1.05] text-white sm:text-4xl">
          {question.question}
        </h1>
        <div className="mt-10">
          <Stepper onDec={() => setVal((v) => clamp(v - question.step))} onInc={() => setVal((v) => clamp(v + question.step))}>
            <span className="font-display text-6xl text-orange">{val}</span>
            <div className="mt-1 text-sm text-white/40">{question.unitLabel}</div>
          </Stepper>
          <input
            type="range"
            min={question.min}
            max={question.max}
            step={question.step}
            value={val}
            onChange={(e) => setVal(Number(e.target.value))}
            className="mt-8 w-full accent-orange"
          />
        </div>
        <div className="mt-10">
          <PrimaryButton onClick={() => onAnswer(val)}>CONTINUE</PrimaryButton>
        </div>
      </div>
    );
  }

  // HEIGHT ---------------------------------------------------------------
  if (type === "height") {
    const [cm, setCm] = useState(value ?? 175);
    const isImperial = unitSystem === "imperial";
    const { ft, inch } = cmToFtIn(cm);

    const adjust = (deltaCm) => setCm((c) => Math.max(120, Math.min(220, c + deltaCm)));

    return (
      <div className="flex flex-1 flex-col justify-center py-4">
        <h1 className="font-display text-3xl leading-[1.05] text-white sm:text-4xl">
          {question.question}
        </h1>
        <div className="mt-6">
          <UnitToggle
            unit={unitSystem}
            setUnit={setUnitSystem}
            options={[
              { value: "metric", label: "cm" },
              { value: "imperial", label: "ft/in" },
            ]}
          />
        </div>
        <div className="mt-8">
          <Stepper onDec={() => adjust(isImperial ? -2.54 : -1)} onInc={() => adjust(isImperial ? 2.54 : 1)}>
            {isImperial ? (
              <span className="font-display text-5xl text-orange">
                {ft}′ {inch}″
              </span>
            ) : (
              <span className="font-display text-6xl text-orange">
                {Math.round(cm)} <span className="text-2xl text-white/40">cm</span>
              </span>
            )}
          </Stepper>
        </div>
        <div className="mt-10">
          <PrimaryButton onClick={() => onAnswer(Math.round(cm))}>CONTINUE</PrimaryButton>
        </div>
      </div>
    );
  }

  // WEIGHT ---------------------------------------------------------------
  if (type === "weight") {
    const [kg, setKg] = useState(value ?? 75);
    const isImperial = unitSystem === "imperial";
    const displayLb = kgToLb(kg);

    const adjust = (delta) => setKg((k) => Math.max(35, Math.min(220, k + delta)));

    return (
      <div className="flex flex-1 flex-col justify-center py-4">
        <h1 className="font-display text-3xl leading-[1.05] text-white sm:text-4xl">
          {question.question}
        </h1>
        <div className="mt-6">
          <UnitToggle
            unit={unitSystem}
            setUnit={setUnitSystem}
            options={[
              { value: "metric", label: "kg" },
              { value: "imperial", label: "lb" },
            ]}
          />
        </div>
        <div className="mt-8">
          <Stepper
            onDec={() => adjust(isImperial ? -lbToKgStep() : -1)}
            onInc={() => adjust(isImperial ? lbToKgStep() : 1)}
          >
            {isImperial ? (
              <span className="font-display text-6xl text-orange">
                {displayLb} <span className="text-2xl text-white/40">lb</span>
              </span>
            ) : (
              <span className="font-display text-6xl text-orange">
                {Math.round(kg)} <span className="text-2xl text-white/40">kg</span>
              </span>
            )}
          </Stepper>
        </div>
        <div className="mt-10">
          <PrimaryButton onClick={() => onAnswer(Math.round(kg))}>CONTINUE</PrimaryButton>
        </div>
      </div>
    );
  }

  return null;
}

function lbToKgStep() {
  return 1 / 2.20462;
}
