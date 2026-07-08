// Lightweight smoke tests for the Bullshit Detector(tm) scoring engine.
// Run with: node tests/scoring.test.mjs

import assert from "node:assert/strict";
import { computeResults } from "../src/lib/scoring.js";
import {
  buildRealityLines,
  buildMondayResetTips,
  buildWeekendBreakdown,
  buildWeekendProfile,
  buildFirstCheckIn,
} from "../src/lib/copy.js";

function makeAnswers(overrides) {
  overrides = overrides || {};
  var base = {
    goal: "lose_fat",
    friday_alcohol: "none",
    friday_takeaway: "none",
    friday_dessert: "none",
    friday_snacks: "none",
    friday_steps: "high",
    saturday_alcohol: "none",
    saturday_takeaway: "none",
    saturday_dessert: "none",
    saturday_snacks: "none",
    saturday_steps: "high",
    sunday_alcohol: "none",
    sunday_takeaway: "none",
    sunday_dessert: "none",
    sunday_snacks: "none",
    sunday_steps: "high",
  };
  var out = {};
  for (var k in base) out[k] = base[k];
  for (var k2 in overrides) out[k2] = overrides[k2];
  return out;
}

function wordCount(s) {
  return s.trim().split(/\s+/).length;
}

function testCleanWeekend() {
  var r = computeResults(makeAnswers());
  assert.ok(r.weekendScore >= 90, "expected clean weekend score >=90, got " + r.weekendScore);
  assert.equal(r.bullshitLevel, "Mild");
  assert.ok(r.surplus <= 0);
  assert.equal(r.biggestKiller, "Nothing — Genuinely Clean Weekend");
}

function testTrainwreckWeekend() {
  var r = computeResults(
    makeAnswers({
      friday_alcohol: "high",
      friday_takeaway: "multiple",
      friday_dessert: "multiple",
      friday_snacks: "constant",
      friday_steps: "low",
      saturday_alcohol: "high",
      saturday_takeaway: "multiple",
      saturday_dessert: "multiple",
      saturday_snacks: "constant",
      saturday_steps: "low",
      sunday_alcohol: "high",
      sunday_takeaway: "multiple",
      sunday_dessert: "multiple",
      sunday_snacks: "constant",
      sunday_steps: "low",
    })
  );
  assert.ok(r.weekendScore <= 15, "expected trainwreck score <=15, got " + r.weekendScore);
  assert.equal(r.bullshitLevel, "Nuclear");
  assert.equal(r.biggestKiller, "Takeaways");
  assert.ok(r.surplus > 10000);
}

function testEachCategoryCanWinAlone() {
  var alcoholOnly = computeResults(
    makeAnswers({ friday_alcohol: "high", saturday_alcohol: "high", sunday_alcohol: "high" })
  );
  assert.equal(alcoholOnly.biggestKiller, "Alcohol");

  var dessertOnly = computeResults(
    makeAnswers({ friday_dessert: "multiple", saturday_dessert: "multiple", sunday_dessert: "multiple" })
  );
  assert.equal(dessertOnly.biggestKiller, "Desserts");

  var snackOnly = computeResults(
    makeAnswers({ friday_snacks: "constant", saturday_snacks: "constant", sunday_snacks: "constant" })
  );
  assert.equal(snackOnly.biggestKiller, "Snacking");

  var inactiveOnly = computeResults(
    makeAnswers({ friday_steps: "low", saturday_steps: "low", sunday_steps: "low" })
  );
  assert.equal(inactiveOnly.biggestKiller, "Weekend Inactivity");
}

function testPoorFoodChoicesAggregate() {
  var r = computeResults(
    makeAnswers({
      friday_takeaway: "one",
      saturday_dessert: "multiple",
      sunday_snacks: "some",
    })
  );
  assert.equal(r.biggestKiller, "Poor Food Choices");
}

function testBreakdownOnlyShowsRelevantCategories() {
  var r = computeResults(makeAnswers({ friday_alcohol: "high" }));
  var items = buildWeekendBreakdown(r);
  var labels = items.map(function (i) {
    return i.label;
  });
  assert.ok(labels.includes("Alcohol"));
  assert.ok(!labels.includes("Takeaways"));
  assert.ok(!labels.includes("Desserts"));
  assert.ok(!labels.includes("Grazing"));

  // A totally clean weekend still shows the Activity credit (steps reduced
  // the surplus) — only the food/drink lines should be absent.
  var clean = computeResults(makeAnswers());
  var cleanLabels = buildWeekendBreakdown(clean).map(function (i) {
    return i.label;
  });
  assert.deepEqual(cleanLabels, ["Activity"]);
}

function testCopyGeneratorsForEveryGoal() {
  var goals = ["lose_fat", "build_muscle", "get_fitter", "feel_better"];
  for (var i = 0; i < goals.length; i++) {
    var answers = makeAnswers({ goal: goals[i], saturday_alcohol: "mid", saturday_takeaway: "one" });
    var r = computeResults(answers);
    var lines = buildRealityLines(r);
    assert.ok(lines.length >= 4, "expected at least 4 short lines, got " + lines.length);
    lines.forEach(function (l) {
      assert.ok(l.length > 0);
      assert.ok(wordCount(l) <= 15, 'line exceeds 15 words: "' + l + '" (' + wordCount(l) + ")");
    });
    var tips = buildMondayResetTips(r);
    assert.equal(tips.length, 3);
  }
}

function testCleanWeekendCopy() {
  var r = computeResults(makeAnswers());
  var lines = buildRealityLines(r);
  lines.forEach(function (l) {
    assert.ok(wordCount(l) <= 15);
  });
  var tips = buildMondayResetTips(r);
  assert.equal(tips.length, 3);
}

var ALLOWED_REASON_LABELS = ["Alcohol", "Takeaways", "Activity", "Snacking"];

function assertReasonsValid(reasons) {
  reasons.forEach(function (r) {
    assert.ok(ALLOWED_REASON_LABELS.includes(r.label), 'unexpected reason label "' + r.label + '"');
    assert.ok(r.emoji, "reason missing emoji: " + r.label);
  });
}

function testWeekendProfileClassification() {
  // Alcohol-dominant -> Social Saboteur
  var saboteur = computeResults(
    makeAnswers({ friday_alcohol: "high", saturday_alcohol: "high", sunday_alcohol: "mid" })
  );
  var saboteurProfile = buildWeekendProfile(saboteur);
  assert.equal(saboteurProfile.key, "saboteur");
  assert.deepEqual(
    saboteurProfile.reasons.map(function (r) {
      return r.label;
    }),
    ["Alcohol"]
  );
  assertReasonsValid(saboteurProfile.reasons);

  // Takeaway-dominant -> Weekend Wrecker
  var wrecker = computeResults(
    makeAnswers({ friday_takeaway: "multiple", saturday_takeaway: "multiple", sunday_alcohol: "low" })
  );
  var wreckerProfile = buildWeekendProfile(wrecker);
  assert.equal(wreckerProfile.key, "wrecker");
  assertReasonsValid(wreckerProfile.reasons);

  // Dessert-only, no snacking at all -> still Weekend Wrecker, not Grazer
  // (Grazer should only win when snacking itself is genuinely present).
  var dessertOnly = computeResults(
    makeAnswers({ friday_dessert: "multiple", saturday_dessert: "multiple", sunday_dessert: "multiple" })
  );
  var dessertProfile = buildWeekendProfile(dessertOnly);
  assert.equal(dessertProfile.key, "wrecker");
  // No takeaway/snacking/alcohol actually happened, so it's honest for
  // this edge case to have no "why" bullets rather than a fabricated one.
  assert.deepEqual(dessertProfile.reasons, []);

  // Snacking-dominant with low alcohol -> The Grazer
  var grazer = computeResults(
    makeAnswers({ friday_snacks: "constant", saturday_snacks: "constant", sunday_dessert: "one" })
  );
  var grazerProfile = buildWeekendProfile(grazer);
  assert.equal(grazerProfile.key, "grazer");
  assertReasonsValid(grazerProfile.reasons);

  // Inactivity-dominant -> The Weekend Hibernator
  var hibernator = computeResults(
    makeAnswers({ friday_steps: "low", saturday_steps: "low", sunday_steps: "low" })
  );
  var hibernatorProfile = buildWeekendProfile(hibernator);
  assert.equal(hibernatorProfile.key, "hibernator");
  assertReasonsValid(hibernatorProfile.reasons);

  // Everything maxed, every day, severe gap -> The Monday Restarter
  var restarter = computeResults(
    makeAnswers({
      friday_alcohol: "high",
      friday_takeaway: "multiple",
      friday_dessert: "multiple",
      friday_snacks: "constant",
      friday_steps: "low",
      saturday_alcohol: "high",
      saturday_takeaway: "multiple",
      saturday_dessert: "multiple",
      saturday_snacks: "constant",
      saturday_steps: "low",
      sunday_alcohol: "high",
      sunday_takeaway: "multiple",
      sunday_dessert: "multiple",
      sunday_snacks: "constant",
      sunday_steps: "low",
    })
  );
  var restarterProfile = buildWeekendProfile(restarter);
  assert.equal(restarterProfile.key, "restarter");
  assert.ok(restarterProfile.reasons.length >= 2, "expected multiple reasons for a habitual pattern");
  assertReasonsValid(restarterProfile.reasons);

  // Genuinely clean weekend -> the reward profile, no "why" bullets at all
  var clean = computeResults(makeAnswers());
  var cleanProfile = buildWeekendProfile(clean);
  assert.equal(cleanProfile.key, "clean");
  assert.deepEqual(cleanProfile.reasons, []);

  // Classification must be a pure function of the answers — same input,
  // same output, every time. Never random.
  var repeat1 = buildWeekendProfile(computeResults(makeAnswers({ friday_alcohol: "high" })));
  var repeat2 = buildWeekendProfile(computeResults(makeAnswers({ friday_alcohol: "high" })));
  assert.equal(repeat1.key, repeat2.key);
  assert.deepEqual(repeat1.reasons, repeat2.reasons);
}

var CHECKIN_ACTIONS = {
  Alcohol: [
    "Decide your drink limit before you leave home.",
    "Eat before drinking.",
    "Every alcoholic drink gets a glass of water.",
  ],
  Takeaways: [
    "Friday's takeaway gets planned before Friday arrives.",
    "Protein comes first.",
    "Once you've eaten, the kitchen is closed.",
  ],
  Snacking: ["Three proper meals.", "No trigger foods in the house.", "Planned snacks only."],
  "Weekend Inactivity": [
    "Saturday starts with a walk.",
    "Hit 10,000 steps before relaxing.",
    "Sunday morning is non-negotiable movement.",
  ],
};

var CHECKIN_HELD_BACK = {
  Alcohol: ["The alcohol didn't ruin your weekend.", "The decisions you made afterwards did."],
  Takeaways: ["The takeaway wasn't the problem.", "It became permission to keep eating."],
  Snacking: ["You aren't hungry.", "You're eating because food keeps appearing."],
  "Weekend Inactivity": ["You spend too much of Sunday recovering instead of resetting."],
};

function testFirstCheckIn() {
  // Alcohol-dominant -> the exact literal alcohol read + action set
  var alcohol = computeResults(
    makeAnswers({ friday_alcohol: "high", saturday_alcohol: "high", sunday_alcohol: "mid" })
  );
  var alcoholCheckIn = buildFirstCheckIn(alcohol);
  assert.deepEqual(alcoholCheckIn.actions, CHECKIN_ACTIONS.Alcohol);
  assert.deepEqual(alcoholCheckIn.heldBack, CHECKIN_HELD_BACK.Alcohol);
  // "What you did well" must never credit the category that's actually the
  // problem — Alcohol is active here, so it can't be the praised line.
  assert.notEqual(alcoholCheckIn.wellDone, "You kept alcohol out of this weekend completely.");

  // Takeaway-dominant
  var takeaway = computeResults(
    makeAnswers({ friday_takeaway: "multiple", saturday_takeaway: "multiple" })
  );
  var takeawayCheckIn = buildFirstCheckIn(takeaway);
  assert.deepEqual(takeawayCheckIn.actions, CHECKIN_ACTIONS.Takeaways);
  assert.deepEqual(takeawayCheckIn.heldBack, CHECKIN_HELD_BACK.Takeaways);
  // Takeaway is the problem here, but alcohol was never touched -> that's
  // the honest thing to praise.
  assert.equal(takeawayCheckIn.wellDone, "You kept alcohol out of this weekend completely.");

  // Snacking-dominant
  var snacking = computeResults(
    makeAnswers({ friday_snacks: "constant", saturday_snacks: "constant", sunday_snacks: "constant" })
  );
  var snackingCheckIn = buildFirstCheckIn(snacking);
  assert.deepEqual(snackingCheckIn.actions, CHECKIN_ACTIONS.Snacking);
  assert.deepEqual(snackingCheckIn.heldBack, CHECKIN_HELD_BACK.Snacking);

  // Inactivity-dominant
  var inactive = computeResults(
    makeAnswers({ friday_steps: "low", saturday_steps: "low", sunday_steps: "low" })
  );
  var inactiveCheckIn = buildFirstCheckIn(inactive);
  assert.deepEqual(inactiveCheckIn.actions, CHECKIN_ACTIONS["Weekend Inactivity"]);
  assert.deepEqual(inactiveCheckIn.heldBack, CHECKIN_HELD_BACK["Weekend Inactivity"]);

  // Dessert-only (no snacking at all) -> falls back to the Takeaways bucket,
  // matching the same disambiguation rule used for Weekend Profile.
  var dessertOnly = computeResults(
    makeAnswers({ friday_dessert: "multiple", saturday_dessert: "multiple", sunday_dessert: "multiple" })
  );
  assert.deepEqual(buildFirstCheckIn(dessertOnly).actions, CHECKIN_ACTIONS.Takeaways);

  // Poor Food Choices aggregate -> also the Takeaways bucket
  var poorFood = computeResults(
    makeAnswers({ friday_takeaway: "one", saturday_dessert: "multiple", sunday_snacks: "some" })
  );
  assert.equal(poorFood.biggestKiller, "Poor Food Choices");
  assert.deepEqual(buildFirstCheckIn(poorFood).actions, CHECKIN_ACTIONS.Takeaways);

  // Clean weekend -> dedicated positive-reinforcement copy, exact literal text
  var clean = computeResults(makeAnswers());
  var cleanCheckIn = buildFirstCheckIn(clean);
  assert.equal(cleanCheckIn.wellDone, "Every category came back clean. That's not an accident.");
  assert.deepEqual(cleanCheckIn.heldBack, ["Nothing did.", "This is what alignment actually looks like."]);
  assert.equal(cleanCheckIn.actions.length, 3);

  // Every category active at once (nothing left to honestly praise) -> falls
  // back to the goal-clarity line, which is still true, not fabricated.
  var trainwreck = computeResults(
    makeAnswers({
      friday_alcohol: "high",
      friday_takeaway: "multiple",
      friday_dessert: "multiple",
      friday_snacks: "constant",
      friday_steps: "low",
      saturday_alcohol: "high",
      saturday_takeaway: "multiple",
      saturday_dessert: "multiple",
      saturday_snacks: "constant",
      saturday_steps: "low",
      sunday_alcohol: "high",
      sunday_takeaway: "multiple",
      sunday_dessert: "multiple",
      sunday_snacks: "constant",
      sunday_steps: "low",
    })
  );
  var trainwreckCheckIn = buildFirstCheckIn(trainwreck);
  assert.ok(trainwreckCheckIn.wellDone.indexOf("already know exactly what's in the way") !== -1);

  // Every branch always returns exactly 3 non-empty actions, a non-empty
  // held-back read, and a non-empty well-done line.
  [alcohol, takeaway, snacking, inactive, dessertOnly, poorFood, clean, trainwreck].forEach(function (r) {
    var checkIn = buildFirstCheckIn(r);
    assert.equal(checkIn.actions.length, 3);
    checkIn.actions.forEach(function (t) {
      assert.ok(t.length > 0);
    });
    assert.ok(checkIn.heldBack.length >= 1);
    assert.ok(checkIn.wellDone.length > 0);
  });
}

testCleanWeekend();
testTrainwreckWeekend();
testEachCategoryCanWinAlone();
testPoorFoodChoicesAggregate();
testBreakdownOnlyShowsRelevantCategories();
testCopyGeneratorsForEveryGoal();
testCleanWeekendCopy();
testWeekendProfileClassification();
testFirstCheckIn();

console.log("All scoring tests passed.");
