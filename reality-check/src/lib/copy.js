// All copy written in one voice: direct, short, occasionally sharp,
never cruel. // Attacks behaviours, never the person. Every generator
below is deterministic — // same answers always produce the same
read-out, personalised to those answers.

import { CLEAN_WEEKEND_LABEL } from “./scoring.js”;

export const GOAL_LABELS = { lose_fat: “lose fat”, build_muscle: “build
muscle”, get_fitter: “get fitter”, feel_better: “feel better”, };

export const LOADING_MESSAGES = [ “Scanning for bullshit…”, “Comparing
words vs actions…”, “Checking your excuses…”, “Looking for the truth…”,
“Almost there…”,];

export const LANDING_COPY = { eyebrow: “🚨 Bullshit Detected™”,
headline: “Think your weekends’t the problem?”, headline2: “Let’s call
your bullshit.”, body: “Takes less than 60 seconds.out what’s actually
stopping your progress.”, button: “CALL MY BULLSHIT”, };

export const CTA_COPY = { headline: “You don’t needwillpower.”,
subheading: [ “You don’t have a weekday problem.”, “You have a weekend
system problem.”, “The good news?”, “Systems can be fixed.”, ],
whyTitle: “Why people work with me”, whyPoints: [ “Weekend strategy
built around real life”, “Eat out without ruining progress”,
“Accountability before the weekend starts”, “No calorie obsession”, “No
boring meal plans”, “No starting again every Monday”, ], imagineTitle:
“Imagine 12 weeks from now…”, imaginePoints: [ “Your weekends don’t fill
you with guilt.”, “Monday isn’t another restart.”, “Food doesn’t control
your decisions.”, “You’re finally making progress every week.”, ],
button: “BUILD MY WEEKEND STRATEGY →”, skip: “Not right now”,
disclaimer: [ “No pressure.”, “No hard sell.”, “Just an honest
conversation to see if coaching is right for you.”, ], };

export const MONDAY_RESET_HEADLINE = “Monday Reset™”; export const
MONDAY_RESET_CLOSER = “You don’t need a new plan. You need to run the
one you’ve got.”;

// ————————————————————————— // THE REALITY™ — short-sentence, personal,
contradiction-first copy. // Structure: goal line -> day callout ->
2-line category couplet -> 2-line closer. // Every sentence stays under
~15 words on purpose. // —————————————————————————

const CATEGORY_COUPLETS = { Alcohol: (r) => { const n =
round1(r.totals.drinks); return [${n} drinks isn't the problem., “It’s
what came with them.”]; }, Takeaways: (r) => { const days =
r.breakdowns.filter((b) => b.takeaway.value !== “none”).length; const
label = days === 1 ? “One takeaway” : ${days} takeaways; return
[${label} isn't the problem., “It’s what happened after it.”]; },
Desserts: () => [“Dessert isn’t the problem.”, “Eating it without
thinking is.”], Snacking: () => [“A snack isn’t the problem.”, “Snacking
all day is.”], “Weekend Inactivity”: () => [“Resting isn’t the
problem.”, “Three days of it is.”], “Poor Food Choices”: () => [“No
single meal broke this.”, “The pattern across the weekend did.”], };

const CLOSING_COUPLETS = { Mild: [“You’re closer than you think.”, “Just
tighten the small gaps.”], Questionable: [“The gap’s still small.”, “But
it’s there, and it’s real.”], Delusional: [“You didn’t lose progress on
Monday.”, “You lost it before Monday even started.”], Dangerous: [“This
isn’t a one-off anymore.”, “It’s turning into the norm.”], Nuclear:
[“This wasn’t really a weekend.”, “It was a pattern wearing a
disguise.”], };

function foodHeaviestDay(results) { return
results.breakdowns.reduce((best, b) => { const val = b.takeaway.cal +
b.dessert.cal + b.snacks.cal; const bestVal = best.takeaway.cal +
best.dessert.cal + best.snacks.cal; return val > bestVal ? b : best; },
results.breakdowns[0]).label; }

export function buildRealityLines(results) { const goalLabel =
GOAL_LABELS[results.goal] || “make progress”; const goalLine =
You said you want to ${goalLabel}.;

if (results.biggestKiller === CLEAN_WEEKEND_LABEL) { return [ goalLine,
“This time, you actually meant it.”, “Friday, Saturday and Sunday all
lined up.”, “That’s rare. Don’t let it become an accident.”, ]; }

const day = results.biggestKiller === “Poor Food Choices” ?
foodHeaviestDay(results) : results.worstDays[results.biggestKiller];

const dayLine = But ${day} had other ideas.; const couplet =
(CATEGORY_COUPLETS[results.biggestKiller] ||
CATEGORY_COUPLETS.Alcohol)(results); const closing =
CLOSING_COUPLETS[results.bullshitLevel] || CLOSING_COUPLETS.Mild;

return [goalLine, dayLine, …couplet, …closing]; }

// ————————————————————————— // YOUR WEEKEND BREAKDOWN™ — only
categories that actually showed up. // —————————————————————————

export function buildWeekendBreakdown(results) { const { totals } =
results; const items = [];

if (totals.alcohol > 0) items.push({ emoji: “🍺”, label: “Alcohol”,
display: ≈ ${fmt(totals.alcohol)} kcal }); if (totals.takeaway > 0)
items.push({ emoji: “🍔”, label: “Takeaways”, display:
≈ ${fmt(totals.takeaway)} kcal }); if (totals.dessert > 0) items.push({
emoji: “🍰”, label: “Desserts”, display: ≈ ${fmt(totals.dessert)} kcal
}); if (totals.snacks > 0) items.push({ emoji: “🍟”, label: “Grazing”,
display: ≈ ${fmt(totals.snacks)} kcal });

// Framed like every other line: a negative number is a credit (you
moved, // it reduced the surplus). A positive number is a cost (you
didn’t, and // that cost you calories) — so it gets its own “Inactivity”
label rather // than reading like activity somehow earned you calories.
if (totals.activityNet < 0) { items.push({ emoji: “🚶”, label:
“Activity”, display: −${fmt(Math.abs(totals.activityNet))} kcal }); }
else if (totals.activityNet > 0) { items.push({ emoji: “🛋️”, label:
“Inactivity”, display: ≈ ${fmt(totals.activityNet)} kcal }); }

return items; }

// ————————————————————————— // MONDAY RESET™ — three personalised
actions, tied to real days and the goal. // —————————————————————————

const CATEGORY_TIP = { Alcohol: (day) => Skip alcohol next ${day}.,
Takeaways: (day) => Swap the ${day} takeaway for a home-cooked meal.,
Desserts: (day) => Skip dessert next ${day}., Snacking: (day) =>
Plan ${day}'s meals so grazing has no gap., “Weekend Inactivity”: (day)
=> Hit 10,000 steps ${day} morning., };

const GOAL_TIP = { lose_fat: “Eat protein before you go out.”,
build_muscle: “Hit your protein target before the weekend starts.”,
get_fitter: “Book the session in before Friday hits.”, feel_better:
“Prep Monday’s breakfast on Sunday evening.”, };

const CLEAN_WEEKEND_TIPS = [ “Keep Friday exactly like this.”, “Same
again next weekend.”, “Don’t let a good week make you sloppy.”,];

export function buildMondayResetTips(results) { if
(results.biggestKiller === CLEAN_WEEKEND_LABEL) { return
CLEAN_WEEKEND_TIPS; }

const pool = results.biggestKiller === “Poor Food Choices” ?
[“Takeaways”, “Desserts”, “Snacking”] :
Object.keys(results.categoryTotals);

const topCategories = pool .map((c) => [c, results.categoryTotals[c]])
.filter(([, v]) => v > 0) .sort((a, b) => b[1] - a[1]) .slice(0, 2)
.map(([c]) => c);

const tips = topCategories.map((cat) => CATEGORY_TIPcat);

tips.push(GOAL_TIP[results.goal] || GOAL_TIP.lose_fat);

if (tips.length < 3) { const cleanCategory =
Object.entries(results.categoryTotals).find(([, v]) => v === 0); if
(cleanCategory) {
tips.push(Keep ${cleanCategory[0].toLowerCase()} at zero. That part's working.);
} else { tips.push(“Keep doing the one thing that’s already working.”);
} }

return tips.slice(0, 3); }

// ————————————————————————— // YOUR FIRST CHECK-IN™ — reads like a real
Monday-morning message from Leon, // not a tip list. Three parts: one
genuine positive (only ever pulled from a // category that’s actually
clean — never invented), one coached read on the // biggest saboteur,
and three concrete actions for the coming week. Bucket // selection
reuses the same Desserts/Poor-Food-Choices disambiguation as the //
Weekend Profile classification, so features never disagree with each
other. // —————————————————————————

export const CHECKIN_COPY = { title: “Your First Check-In™”, subheading:
[ “If you were one of my clients…”, “This is exactly what I’d send you
on Monday morning.”, ], wellTitle: “What you did well”, heldBackTitle:
“What held you back”, changeTitle: “What we change this week”, closer:
“The goal isn’t a perfect weekend. It’s a better one than last week.”,
dividerHeadline: “This is how people stop starting again every Monday.”,
dividerBody: [ “One weekend doesn’t define you.”, “Repeating the same
weekend every week does.”, “Imagine having someone reviewing every
weekend, adjusting the plan, and keeping you accountable until this
becomes automatic.”, “That’s what coaching is.”, ], ctaButton: “BUILD MY
WEEKEND STRATEGY →”, ctaSubtext: “See if coaching is the right fit for
you.”, };

// “What you did well” only ever names a category that’s genuinely at
zero — // never a fabricated achievement. Priority order picks the most
impressive // clean category first when more than one qualifies. const
WELL_DONE_LINES = { Alcohol: “You kept alcohol out of this weekend
completely.”, Takeaways: “You didn’t order a single takeaway.”,
Snacking: “You didn’t graze your way through the weekend.”, “Weekend
Inactivity”: “You stayed active when it would’ve been easier not to.”,
Desserts: “You didn’t reach for dessert once.”, }; const
WELL_DONE_PRIORITY = [“Alcohol”, “Takeaways”, “Snacking”, “Weekend
Inactivity”, “Desserts”];

function buildWellDone(results) { for (const cat of WELL_DONE_PRIORITY)
{ if (results.categoryTotals[cat] === 0) return WELL_DONE_LINES[cat]; }
// Nothing came back clean — fall back to something still true and
earned: // they answered honestly and already know what the issue is.
const goalLabel = GOAL_LABELS[results.goal] || “make progress”; return
You said you want to ${goalLabel} — and you already know exactly what's in the way. That's further than most people get.;
}

const HELD_BACK_LINES = { Alcohol: [“The alcohol didn’t ruin your
weekend.”, “The decisions you made afterwards did.”], Takeaways: [“The
takeaway wasn’t the problem.”, “It became permission to keep eating.”],
Snacking: [“You aren’t hungry.”, “You’re eating because food keeps
appearing.”], “Weekend Inactivity”: [“You spend too much of Sunday
recovering instead of resetting.”], };

const CHANGE_ACTIONS = { Alcohol: [ “Decide your drink limit before you
leave home.”, “Eat before drinking.”, “Every alcoholic drink gets a
glass of water.”, ], Takeaways: [ “Friday’s takeaway gets planned before
Friday arrives.”, “Protein comes first.”, “Once you’ve eaten, the
kitchen is closed.”, ], Snacking: [“Three proper meals.”, “No trigger
foods in the house.”, “Planned snacks only.”], “Weekend Inactivity”: [
“Saturday starts with a walk.”, “Hit 10,000 steps before relaxing.”,
“Sunday morning is non-negotiable movement.”, ], };

const CLEAN_CHECKIN = { wellDone: “Every category came back clean.
That’s not an accident.”, heldBack: [“Nothing did.”, “This is what
alignment actually looks like.”], actions: [ “Keep this exact weekend as
the template.”, “Don’t let a good week make you complacent.”, “Same
plan, every weekend, until it’s automatic.”, ], };

function checkinBucket(results) { switch (results.biggestKiller) { case
“Alcohol”: return “Alcohol”; case “Takeaways”: case “Poor Food Choices”:
return “Takeaways”; case “Desserts”: return results.totals.snacks > 0 &&
results.totals.snacks >= results.totals.takeaway ? “Snacking” :
“Takeaways”; case “Snacking”: return “Snacking”; case “Weekend
Inactivity”: return “Weekend Inactivity”; default: return “Takeaways”; }
}

export function buildFirstCheckIn(results) { if (results.biggestKiller
=== CLEAN_WEEKEND_LABEL) { return { wellDone: CLEAN_CHECKIN.wellDone,
heldBack: CLEAN_CHECKIN.heldBack, actions: CLEAN_CHECKIN.actions }; }
const bucket = checkinBucket(results); return { wellDone:
buildWellDone(results), heldBack: HELD_BACK_LINES[bucket], actions:
CHANGE_ACTIONS[bucket], }; }

// ————————————————————————— // YOUR WEEKEND PROFILE™ — one archetype,
chosen deterministically from the // same totals every other section
already uses. Never random. // —————————————————————————

const WEEKEND_PROFILES = { wrecker: { emoji: “🍔”, title: “The Weekend
Wrecker”, description: [ “You don’t ruin your progress in one meal.”,
“You ruin it through momentum.”, “One takeaway becomes dessert.”,
“Dessert becomes grazing.”, “By Sunday you’re promising Monday will fix
everything.”, “You don’t need another diet.”, “You need to stop the
weekend snowball.”, ], }, saboteur: { emoji: “🍺”, title: “The Social
Saboteur”, description: [ “Your weekdays are disciplined.”, “Your
weekends become permission to forget your goal.”, “Food isn’t your
biggest issue.”, “Social habits are.”, “You don’t need to stop enjoying
yourself.”, “You need a better strategy before you go out.”, ], },
grazer: { emoji: “🍫”, title: “The Grazer”, description: [ “Meals aren’t
the problem.”, “Everything between them is.”, “The handfuls.”, “The
little bites.”, “The snacks that don’t feel like food.”, “Those calories
are adding up faster than you think.”, ], }, hibernator: { emoji: “🛋️”,
title: “The Weekend Hibernator”, description: [ “Your weekdays have
structure.”, “Your weekends don’t.”, “Two inactive days are cancelling
out five productive ones.”, “Your body doesn’t need more rest.”, “It
needs more movement.”, ], }, restarter: { emoji: “🎭”, title: “The
Monday Restarter”, description: [ “You’ve become incredibly good at
starting again.”, “Every Monday feels different.”, “Every Friday ends
the same.”, “The cycle isn’t your motivation.”, “It’s your routine.”, ],
}, clean: { emoji: “🏆”, title: “The One Who Actually Did It”,
description: [ “Every category checked out clean.”, “No wreckage. No
spiral. No excuses needed.”, “This is what alignment actually looks
like.”, “Don’t treat it as a fluke.”, ], }, };

const REASON_EMOJI = { Alcohol: “🍺”, Takeaways: “🍔”, Snacking: “🍟”,
Activity: “🛋️” };

function classifyWeekendProfile(results) { if (results.biggestKiller ===
CLEAN_WEEKEND_LABEL) return “clean”;

// A pattern that shows up almost everywhere, at a genuinely rock-bottom
// behavioural score, reads less like “bad weekend” and more like “this
is // just the routine now.” Gated tight (4+ of 5 categories, score
<=15) so // it’s reserved for real systemic weekends, not just an
average bad one — // otherwise it would swallow most multi-category
cases that a specific // archetype (Wrecker, Saboteur…) would describe
more usefully. Uses the // goal-independent Weekend Score rather than
Bullshit Level, since breadth // of bad behaviour should be judged the
same regardless of stated goal. const activeCategoryCount =
Object.values(results.categoryTotals).filter((v) => v > 0).length; const
isHabitualPattern = activeCategoryCount >= 4 && results.weekendScore <=
15; if (isHabitualPattern) return “restarter”;

switch (results.biggestKiller) { case “Alcohol”: return “saboteur”; case
“Takeaways”: case “Poor Food Choices”: return “wrecker”; case
“Desserts”: // Only read as “grazing” when snacking is genuinely present
and // matches or outweighs takeaway — otherwise it’s just
Wrecker-flavour // indulgence, since Desserts is one of the Wrecker’s
own triggers too. return results.totals.snacks > 0 &&
results.totals.snacks >= results.totals.takeaway ? “grazer” : “wrecker”;
case “Snacking”: return “grazer”; case “Weekend Inactivity”: return
“hibernator”; default: return “wrecker”; } }

function buildProfileReasons(key, results) { const t = results.totals;
const active = { Alcohol: t.alcohol > 0, Takeaways: t.takeaway > 0,
Snacking: t.snacks > 0, Activity: t.inactivity > 0, };

if (key === “clean”) return []; if (key === “saboteur”) return
[“Alcohol”]; if (key === “grazer”) return [“Snacking”]; if (key ===
“hibernator”) return [“Activity”]; if (key === “restarter”) { return
[“Alcohol”, “Takeaways”, “Snacking”, “Activity”].filter((k) =>
active[k]).slice(0, 3); } // wrecker — no fabricated fallback here: if
the only real driver was // Desserts (which isn’t one of the four “why”
buckets), the reasons list // can legitimately be empty rather than
blaming a category at zero. return [“Takeaways”, “Snacking”,
“Alcohol”].filter((k) => active[k]).slice(0, 3); }

export function buildWeekendProfile(results) { const key =
classifyWeekendProfile(results); const profile = WEEKEND_PROFILES[key];
const reasons = buildProfileReasons(key, results).map((label) => ({
label, emoji: REASON_EMOJI[label], }));

return { key, emoji: profile.emoji, title: profile.title, description:
profile.description, reasons }; }

function fmt(n) { return Math.round(n).toLocaleString(); }

function round1(n) { return Math.round(n * 10) / 10; }
