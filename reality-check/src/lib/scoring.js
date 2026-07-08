import {
  ALCOHOL_OPTIONS,
  TAKEAWAY_OPTIONS,
  DESSERT_OPTIONS,
  SNACK_OPTIONS,
  STEPS_OPTIONS,
} from "../data/flow.js";

const DAYS = ["friday", "saturday", "sunday"];
const DAY_LABEL = { friday: "Friday", saturday: "Saturday", sunday: "Sunday" };
const CAL_PER_DRINK = 150;

export const CLEAN_WEEKEND_LABEL = "Nothing — Genuinely Clean Weekend";

const find = (options, value) => options.find((o) => o.value === value) ?? options[0];

function dayBreakdown(answers, day) {
  const alcohol = find(ALCOHOL_OPTIONS, answers[`${day}_alcohol`]);
  const takeaway = find(TAKEAWAY_OPTIONS, answers[`${day}_takeaway`]);
  const dessert = find(DESSERT_OPTIONS, answers[`${day}_dessert`]);
  const snacks = find(SNACK_OPTIONS, answers[`${day}_snacks`]);
  const steps = find(STEPS_OPTIONS, answers[`${day}_steps`]);

  const alcoholCal = alcohol.drinks * CAL_PER_DRINK;
  const stepsAdjust = steps.adjust;
  const surplus = alcoholCal + takeaway.cal + dessert.cal + snacks.cal + stepsAdjust;

  return {
    day,
    label: DAY_LABEL[day],
    alcohol,
    takeaway,
    dessert,
    snacks,
    steps,
    alcoholCal,
    stepsAdjust,
    surplus,
  };
}

// Which day contributed most to a given category — powers both "The Reality"
// callouts and the personalised Monday Reset tips.
function worstDayFor(breakdowns, valueFn) {
  let best = breakdowns[0];
  breakdowns.forEach((b) => {
    if (valueFn(b) > valueFn(best)) best = b;
  });
  return best.label;
}

/**
 * The Bullshit Detector™ — fully deterministic, rule-based scoring.
 * No magic, no ML theatre. Every number traces back to an answer.
 */
export function computeResults(answers) {
  const breakdowns = DAYS.map((d) => dayBreakdown(answers, d));

  const totals = breakdowns.reduce(
    (acc, b) => {
      acc.surplus += b.surplus;
      acc.alcohol += b.alcoholCal;
      acc.takeaway += b.takeaway.cal;
      acc.dessert += b.dessert.cal;
      acc.snacks += b.snacks.cal;
      acc.inactivity += Math.max(0, b.stepsAdjust);
      acc.activityNet += b.stepsAdjust;
      acc.drinks += b.alcohol.drinks;
      return acc;
    },
    { surplus: 0, alcohol: 0, takeaway: 0, dessert: 0, snacks: 0, inactivity: 0, activityNet: 0, drinks: 0 }
  );

  const goal = answers.goal || "lose_fat";

  // --- Biggest Progress Killer™ ---------------------------------------
  const categoryTotals = {
    Alcohol: totals.alcohol,
    Takeaways: totals.takeaway,
    Desserts: totals.dessert,
    Snacking: totals.snacks,
    "Weekend Inactivity": totals.inactivity,
  };

  const foodTotal = totals.takeaway + totals.dessert + totals.snacks;
  const topFood = Math.max(totals.takeaway, totals.dessert, totals.snacks);
  const isSpreadAcrossFood =
    foodTotal > 0 && topFood < foodTotal * 0.5 && foodTotal >= totals.alcohol && foodTotal >= totals.inactivity;

  let biggestKiller;
  const maxCategoryValue = Math.max(...Object.values(categoryTotals));

  if (isSpreadAcrossFood) {
    biggestKiller = "Poor Food Choices";
  } else if (maxCategoryValue <= 0) {
    biggestKiller = CLEAN_WEEKEND_LABEL;
  } else {
    biggestKiller = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0][0];
  }

  // Which day gets named in the copy for each category.
  const worstDays = {
    Alcohol: worstDayFor(breakdowns, (b) => b.alcohol.drinks),
    Takeaways: worstDayFor(breakdowns, (b) => b.takeaway.cal),
    Desserts: worstDayFor(breakdowns, (b) => b.dessert.cal),
    Snacking: worstDayFor(breakdowns, (b) => b.snacks.cal),
    "Weekend Inactivity": worstDayFor(breakdowns, (b) => b.stepsAdjust),
  };

  // --- Weekend Score™ (0-100, purely behavioural — how heavy was the surplus) ---
  let score = 100 - (totals.surplus / 6500) * 70;
  score = Math.round(Math.max(1, Math.min(99, score)));

  // --- Bullshit Level™ — the gap between stated goal and actual behaviour ---
  let bullshitScore = 0;
  if (goal === "lose_fat") {
    bullshitScore = (totals.surplus / 7000) * 100;
  } else if (goal === "build_muscle") {
    bullshitScore = (Math.max(0, totals.surplus - 1500) / 5500) * 100;
  } else if (goal === "get_fitter") {
    const avgStepBand = breakdowns.reduce((s, b) => s + b.steps.band, 0) / breakdowns.length; // 0-2
    bullshitScore = ((2 - avgStepBand) / 2) * 100;
  } else {
    // feel_better — no sleep data anymore, so lean on alcohol + total junk as the proxy for "foggy"
    bullshitScore = totals.drinks * 7 + (totals.takeaway + totals.dessert + totals.snacks) / 45;
  }
  bullshitScore = Math.round(Math.max(0, Math.min(100, bullshitScore)));

  let bullshitLevel = "Mild";
  if (bullshitScore >= 80) bullshitLevel = "Nuclear";
  else if (bullshitScore >= 60) bullshitLevel = "Dangerous";
  else if (bullshitScore >= 40) bullshitLevel = "Delusional";
  else if (bullshitScore >= 20) bullshitLevel = "Questionable";

  const surplus = Math.round(totals.surplus);

  return {
    breakdowns,
    totals,
    goal,
    biggestKiller,
    categoryTotals,
    worstDays,
    weekendScore: score,
    bullshitScore,
    bullshitLevel,
    surplus,
  };
}
