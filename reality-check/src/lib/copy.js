// All copy written in one voice: direct, short, occasionally sharp, never cruel.
// Attacks behaviours, never the person. Every generator below is deterministic —
// same answers always produce the same read-out, personalised to those answers.

import { CLEAN_WEEKEND_LABEL } from "./scoring.js";

export const GOAL_LABELS = {
  lose_fat: "lose fat",
  build_muscle: "build muscle",
  get_fitter: "get fitter",
  feel_better: "feel better",
};

export const LOADING_MESSAGES = [
  "Scanning for bullshit...",
  "Going through what you actually did...",
  "Calling it out...",
  "Finding where it went wrong...",
  "Almost done...",
];

export const LANDING_COPY = {
  eyebrow: "🚨 Bullshit Detected™",
  headline: "Think your weekends\naren't the problem?",
  headline2: "Mate — they are.",
  body: "You've been starting again every Monday for how long now?\nTakes less than 60 seconds to find out exactly what's been holding you back.",
  button: "CALL MY BULLSHIT",
};

export const CTA_COPY = {
  headline: "You don't need\nmore willpower.",
  subheading: [
    "You don't have a weekday problem.",
    "You have a weekend problem.",
    "And now you know exactly what it is.",
    "So let's fix it.",
  ],
  whyTitle: "Why people work with me",
  whyPoints: [
    "A plan built around your actual life — not some perfect version of it that doesn't exist",
    "Eat out, have a social life, and still make progress",
    "Someone in your corner before Friday even starts",
    "No obsessing over every calorie",
    "No boring meal plans you'll ditch after three days",
    "No more starting again every Monday",
  ],
  imagineTitle: "Picture this. 12 weeks from now.",
  imaginePoints: [
    "You finish the weekend and you don't feel like shit about it.",
    "Monday isn't another fresh start. It's just another day.",
    "Food isn't controlling you anymore. You're controlling it.",
    "You're actually making progress. Consistent progress. Every single week.",
  ],
  button: "GET MY WEEKEND STRATEGY →",
  skip: "Not ready yet",
  disclaimer: [
    "No pressure.",
    "No hard sell.",
    "Just a straight conversation to see if we're a good fit.",
  ],
};

export const MONDAY_RESET_HEADLINE = "Monday Reset™";
export const MONDAY_RESET_CLOSER = "You don't need a new plan. You need to actually run the one you've got.";

// ---------------------------------------------------------------------------
// THE REALITY™ — short-sentence, personal, contradiction-first copy.
// Structure: goal line -> day callout -> 2-line category couplet -> 2-line closer.
// Every sentence stays under ~15 words on purpose.
// ---------------------------------------------------------------------------

const CATEGORY_COUPLETS = {
  Alcohol: (r) => {
    const n = round1(r.totals.drinks);
    return [`${n} drinks didn't ruin the weekend.`, "It's every decision you made after the first one that did."];
  },
  Takeaways: (r) => {
    const days = r.breakdowns.filter((b) => b.takeaway.value !== "none").length;
    const label = days === 1 ? "One takeaway" : `${days} takeaways`;
    return [`${label} isn't the problem.`, "The problem is using it as permission to write off the rest of the weekend."];
  },
  Desserts: () => ["Dessert didn't break the weekend.", "Mindlessly eating it without even enjoying it did."],
  Snacking: () => ["You're not actually hungry.", "You're eating because food is there and you haven't made a decision not to."],
  "Weekend Inactivity": () => ["One rest day is fine.", "Three days horizontal is a different story."],
  "Poor Food Choices": () => ["It wasn't one meal that did the damage.", "It was every small decision across the whole weekend adding up."],
};

const CLOSING_COUPLETS = {
  Mild: ["You're closer than you think mate.", "Tighten a few small gaps and this changes fast."],
  Questionable: ["The gap's small but it's real.", "And if you leave it, it won't stay small."],
  Delusional: ["You didn't lose progress on Monday.", "You lost it Friday night before Monday even had a chance."],
  Dangerous: ["This is becoming your normal.", "And somewhere in the back of your head you already know it."],
  Nuclear: ["That wasn't just a bad weekend.", "That's a pattern. And it's been running for a while now."],
};

function foodHeaviestDay(results) {
  return results.breakdowns.reduce((best, b) => {
    const val = b.takeaway.cal + b.dessert.cal + b.snacks.cal;
    const bestVal = best.takeaway.cal + best.dessert.cal + best.snacks.cal;
    return val > bestVal ? b : best;
  }, results.breakdowns[0]).label;
}

export function buildRealityLines(results) {
  const goalLabel = GOAL_LABELS[results.goal] || "make progress";
  const goalLine = `You said you want to ${goalLabel}.`;

  if (results.biggestKiller === CLEAN_WEEKEND_LABEL) {
    return [
      goalLine,
      "And this weekend you delivered.",
      "Friday, Saturday and Sunday all came back clean.",
      "Write down exactly what you did and repeat it next weekend. Don't let this be a fluke.",
    ];
  }

  const day =
    results.biggestKiller === "Poor Food Choices"
      ? foodHeaviestDay(results)
      : results.worstDays[results.biggestKiller];

  const dayLine = `But ${day} is where it went off track.`;
  const couplet = (CATEGORY_COUPLETS[results.biggestKiller] || CATEGORY_COUPLETS.Alcohol)(results);
  const closing = CLOSING_COUPLETS[results.bullshitLevel] || CLOSING_COUPLETS.Mild;

  return [goalLine, dayLine, ...couplet, ...closing];
}

// ---------------------------------------------------------------------------
// YOUR WEEKEND BREAKDOWN™ — only categories that actually showed up.
// ---------------------------------------------------------------------------

export function buildWeekendBreakdown(results) {
  const { totals } = results;
  const items = [];

  if (totals.alcohol > 0) items.push({ emoji: "🍺", label: "Alcohol", display: `≈ ${fmt(totals.alcohol)} kcal` });
  if (totals.takeaway > 0) items.push({ emoji: "🍔", label: "Takeaways", display: `≈ ${fmt(totals.takeaway)} kcal` });
  if (totals.dessert > 0) items.push({ emoji: "🍰", label: "Desserts", display: `≈ ${fmt(totals.dessert)} kcal` });
  if (totals.snacks > 0) items.push({ emoji: "🍟", label: "Grazing", display: `≈ ${fmt(totals.snacks)} kcal` });

  // Framed like every other line: a negative number is a credit (you moved,
  // it reduced the surplus). A positive number is a cost (you didn't, and
  // that cost you calories) — so it gets its own "Inactivity" label rather
  // than reading like activity somehow earned you calories.
  if (totals.activityNet < 0) {
    items.push({ emoji: "🚶", label: "Activity", display: `−${fmt(Math.abs(totals.activityNet))} kcal` });
  } else if (totals.activityNet > 0) {
    items.push({ emoji: "🛋️", label: "Inactivity", display: `≈ ${fmt(totals.activityNet)} kcal` });
  }

  return items;
}

// ---------------------------------------------------------------------------
// MONDAY RESET™ — three personalised actions, tied to real days and the goal.
// ---------------------------------------------------------------------------

const CATEGORY_TIP = {
  Alcohol: (day) => `Decide your drink limit before you leave the house next ${day}. Not when you're already out.`,
  Takeaways: (day) => `If you're having a takeaway next ${day}, decide which one now. Don't leave it to a hungry impulse decision.`,
  Desserts: (day) => `Next ${day} — if dessert isn't planned in advance, it doesn't happen.`,
  Snacking: (day) => `Plan ${day}'s meals and eat enough at each one. If you're hungry an hour later, the meal wasn't big enough.`,
  "Weekend Inactivity": (day) => `Next ${day} starts with a walk. Get it done before anything else gets in the way.`,
};

const GOAL_TIP = {
  lose_fat: "Eat a proper protein meal before you go out. You'll make better decisions.",
  build_muscle: "Hit your protein target before the weekend even starts. Don't leave it to chance.",
  get_fitter: "Book the session in before Friday hits. If it's not booked, it won't happen.",
  feel_better: "Prep Monday's breakfast on Sunday evening. Start the week on your terms.",
};

const CLEAN_WEEKEND_TIPS = [
  "Keep Friday exactly as it was. Don't change a thing.",
  "Same plan next weekend. Don't overthink it.",
  "A good weekend can make you complacent. Don't let it. Stay sharp.",
];

export function buildMondayResetTips(results) {
  if (results.biggestKiller === CLEAN_WEEKEND_LABEL) {
    return CLEAN_WEEKEND_TIPS;
  }

  const pool =
    results.biggestKiller === "Poor Food Choices"
      ? ["Takeaways", "Desserts", "Snacking"]
      : Object.keys(results.categoryTotals);

  const topCategories = pool
    .map((c) => [c, results.categoryTotals[c]])
    .filter(([, v]) => v > 0)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 2)
    .map(([c]) => c);

  const tips = topCategories.map((cat) => CATEGORY_TIP[cat](results.worstDays[cat]));

  tips.push(GOAL_TIP[results.goal] || GOAL_TIP.lose_fat);

  if (tips.length < 3) {
    const cleanCategory = Object.entries(results.categoryTotals).find(([, v]) => v === 0);
    if (cleanCategory) {
      tips.push(`Keep ${cleanCategory[0].toLowerCase()} at zero. That part's working.`);
    } else {
      tips.push("Keep doing the one thing that's already working.");
    }
  }

  return tips.slice(0, 3);
}

// ---------------------------------------------------------------------------
// YOUR FIRST CHECK-IN™ — reads like a real Monday-morning message from Leon,
// not a tip list. Three parts: one genuine positive (only ever pulled from a
// category that's actually clean — never invented), one coached read on the
// biggest saboteur, and three concrete actions for the coming week. Bucket
// selection reuses the same Desserts/Poor-Food-Choices disambiguation as the
// Weekend Profile classification, so features never disagree with each other.
// ---------------------------------------------------------------------------

export const CHECKIN_COPY = {
  title: "Your First Check-In™",
  subheading: [
    "This is exactly the message I'd send you on Monday morning if you were my client.",
  ],
  wellTitle: "What you did well",
  heldBackTitle: "What actually held you back",
  changeTitle: "What you're changing this week — not next week, this week",
  closer: "The goal is simple. Make this weekend better than the last one. That's it. One weekend at a time.",
  dividerHeadline: "This is how dads stop starting again every Monday.",
  dividerBody: [
    "One weekend won't fix everything. I'm not going to tell you it will.",
    "But fixing the pattern — understanding what's actually been sabotaging you weekend after weekend — that's where everything starts to change.",
    "That's what coaching does.",
  ],
  ctaButton: "GET MY WEEKEND STRATEGY →",
  ctaSubtext: "A straight conversation to see if coaching is right for you. No pressure. No pitch.",
};

// "What you did well" only ever names a category that's genuinely at zero —
// never a fabricated achievement. Priority order picks the most impressive
// clean category first when more than one qualifies.
const WELL_DONE_LINES = {
  Alcohol: "You kept alcohol out of the weekend completely. That takes real discipline and you delivered it.",
  Takeaways: "Not a single takeaway all weekend. You controlled what went in your mouth and that matters more than most people realise.",
  Snacking: "No grazing. No mindless eating between meals. You stayed in control of the small stuff — and the small stuff is usually where it all falls apart.",
  "Weekend Inactivity": "You kept moving when it would've been dead easy to park it on the sofa all weekend. That's the difference between people who make progress and people who don't.",
  Desserts: "You didn't touch dessert once across the whole weekend. Easy to overlook but those calories add up fast and you avoided them completely.",
};
const WELL_DONE_PRIORITY = ["Alcohol", "Takeaways", "Snacking", "Weekend Inactivity", "Desserts"];

function buildWellDone(results) {
  for (const cat of WELL_DONE_PRIORITY) {
    if (results.categoryTotals[cat] === 0) return WELL_DONE_LINES[cat];
  }
  // Nothing came back clean — fall back to something still true and earned:
  // they answered honestly and already know what the issue is.
  const goalLabel = GOAL_LABELS[results.goal] || "make progress";
  return `You said you want to ${goalLabel}. And now you know exactly what's been getting in the way. Most people never get that far. Now do something with it.`;
}

const HELD_BACK_LINES = {
  Alcohol: ["The drinks themselves didn't ruin the weekend.", "It was every decision you made after the first one. That's where it went wrong."],
  Takeaways: ["One takeaway isn't the problem.", "The problem is the moment it becomes permission — permission to have dessert, permission to graze, permission to write off the rest of the weekend. Sound familiar?"],
  Snacking: ["You're not actually hungry.", "You're eating because food is there and you haven't made a conscious decision not to. That's the habit. And that's what we're fixing."],
  "Weekend Inactivity": ["You're spending Sunday recovering from Saturday instead of resetting for the week ahead.", "By the time Monday comes you're already behind before it's even started."],
};

const CHANGE_ACTIONS = {
  Alcohol: [
    "Decide your drink limit before you leave the house. Not when you're already three in and someone's buying another round.",
    "Eat a proper meal before you drink. Don't show up empty. You'll make better decisions.",
    "Match every drink with a glass of water. Sounds simple. It works.",
  ],
  Takeaways: [
    "If you're going to have a takeaway this weekend, decide which one now. Don't leave it to a Friday night impulse when you're tired and hungry.",
    "Protein first. Whatever you're eating — lead with protein. Every time.",
    "Once you've eaten your meal, the kitchen is closed. No second visits. Decision made.",
  ],
  Snacking: [
    "Three proper meals and eat enough at each one. If you're hungry an hour later, the meal wasn't big enough.",
    "If it's in the house you'll eat it. Stop buying the stuff that triggers you.",
    "If you're going to snack, plan it in advance. A planned snack is fine. Mindlessly grazing all day isn't.",
  ],
  "Weekend Inactivity": [
    "Saturday starts with a walk. Get it done first thing before anything else gets in the way.",
    "10,000 steps before you sit down and relax. Earn the rest.",
    "Sunday morning movement is non-negotiable. 20 minutes minimum. Just move.",
  ],
};

const CLEAN_CHECKIN = {
  wellDone: "Every category came back clean. No damage. No spiral. No Sunday night guilt. That's what a good weekend looks like.",
  heldBack: ["Nothing held you back.", "This is what it looks like when everything aligns. Don't treat it as a fluke."],
  actions: [
    "Write down exactly what you did this weekend and do it again next weekend.",
    "Don't let a good weekend make you complacent. Stay sharp.",
    "Same plan, every weekend, until it's just what you do.",
  ],
};

function checkinBucket(results) {
  switch (results.biggestKiller) {
    case "Alcohol":
      return "Alcohol";
    case "Takeaways":
    case "Poor Food Choices":
      return "Takeaways";
    case "Desserts":
      return results.totals.snacks > 0 && results.totals.snacks >= results.totals.takeaway
        ? "Snacking"
        : "Takeaways";
    case "Snacking":
      return "Snacking";
    case "Weekend Inactivity":
      return "Weekend Inactivity";
    default:
      return "Takeaways";
  }
}

export function buildFirstCheckIn(results) {
  if (results.biggestKiller === CLEAN_WEEKEND_LABEL) {
    return { wellDone: CLEAN_CHECKIN.wellDone, heldBack: CLEAN_CHECKIN.heldBack, actions: CLEAN_CHECKIN.actions };
  }
  const bucket = checkinBucket(results);
  return {
    wellDone: buildWellDone(results),
    heldBack: HELD_BACK_LINES[bucket],
    actions: CHANGE_ACTIONS[bucket],
  };
}

// ---------------------------------------------------------------------------
// YOUR WEEKEND PROFILE™ — one archetype, chosen deterministically from the
// same totals every other section already uses. Never random.
// ---------------------------------------------------------------------------

const WEEKEND_PROFILES = {
  wrecker: {
    emoji: "🍔",
    title: "The Weekend Wrecker",
    description: [
      "You're not wrecking your progress in one meal mate.",
      "You're doing it through momentum.",
      "One takeaway becomes dessert.",
      "Dessert becomes grazing.",
      "A few drinks become a write-off.",
      "By Sunday night you're sat there telling yourself Monday will fix it all.",
      "It won't. Not without changing what happens between Friday and Sunday first.",
      "You don't need another diet. You don't need more willpower.",
      "You need to stop the snowball before it starts rolling.",
    ],
  },
  saboteur: {
    emoji: "🍺",
    title: "The Social Saboteur",
    description: [
      "Monday to Friday — you're disciplined. You've got structure. You're doing the work.",
      "Then Friday comes and it's like a switch flips.",
      "The weekend becomes permission. Permission to forget your goal. Permission to eat whatever. Permission to drink more than you planned.",
      "It's not the food that's the problem.",
      "It's the habits you've built around being social.",
      "You don't need to stop enjoying yourself.",
      "You need a plan before you walk out the door.",
      "Because right now you're going in with no plan and hoping for the best.",
      "And it's not working.",
    ],
  },
  grazer: {
    emoji: "🍫",
    title: "The Grazer",
    description: [
      "Your meals are fine.",
      "It's everything between them that's killing your progress.",
      "The handful of crisps. The couple of biscuits with a brew.",
      "The little bite here, the little bite there.",
      "The stuff you don't even register as eating because it doesn't feel like a proper meal.",
      "Those calories are adding up faster than you think mate.",
      "Way faster than you think.",
      "And because you never technically had a bad meal you can't work out why the scales aren't moving.",
      "That's why.",
    ],
  },
  hibernator: {
    emoji: "🛋️",
    title: "The Weekend Hibernator",
    description: [
      "Weekdays — you've got structure. You're moving. You're doing the right things.",
      "Weekends — you go completely horizontal.",
      "Two inactive days are cancelling out five productive ones.",
      "And you're wondering why progress is slow.",
      "Your body doesn't need more rest.",
      "It needs to move.",
      "And right now on weekends it's not moving.",
      "That's the gap. That's where your progress is going.",
    ],
  },
  restarter: {
    emoji: "🎭",
    title: "The Monday Restarter",
    description: [
      "You've got starting again down to an art form.",
      "Every Monday morning feels like a fresh start.",
      "Every Friday ends the same way.",
      "The problem isn't motivation.",
      "You've got motivation in buckets on a Monday morning.",
      "The problem is the routine you fall back into every single weekend without even realising it.",
      "Until you break that pattern — and I mean actually break it, not just promise yourself you will — Monday will keep feeling like a fresh start.",
      "Because it will keep needing to be one.",
    ],
  },
  clean: {
    emoji: "🏆",
    title: "The One Who Actually Did It",
    description: [
      "Every category came back clean.",
      "No damage. No spiral. No Sunday night guilt. No promising yourself Monday will fix it.",
      "That's what a good weekend looks like.",
      "Write down what you did and do the exact same thing next weekend.",
      "Don't let this be a fluke.",
    ],
  },
};

const REASON_EMOJI = { Alcohol: "🍺", Takeaways: "🍔", Snacking: "🍟", Activity: "🛋️" };

function classifyWeekendProfile(results) {
  if (results.biggestKiller === CLEAN_WEEKEND_LABEL) return "clean";

  // A pattern that shows up almost everywhere, at a genuinely rock-bottom
  // behavioural score, reads less like "bad weekend" and more like "this is
  // just the routine now." Gated tight (4+ of 5 categories, score <=15) so
  // it's reserved for real systemic weekends, not just an average bad one —
  // otherwise it would swallow most multi-category cases that a specific
  // archetype (Wrecker, Saboteur...) would describe more usefully. Uses the
  // goal-independent Weekend Score rather than Bullshit Level, since breadth
  // of bad behaviour should be judged the same regardless of stated goal.
  const activeCategoryCount = Object.values(results.categoryTotals).filter((v) => v > 0).length;
  const isHabitualPattern = activeCategoryCount >= 4 && results.weekendScore <= 15;
  if (isHabitualPattern) return "restarter";

  switch (results.biggestKiller) {
    case "Alcohol":
      return "saboteur";
    case "Takeaways":
    case "Poor Food Choices":
      return "wrecker";
    case "Desserts":
      // Only read as "grazing" when snacking is genuinely present and
      // matches or outweighs takeaway — otherwise it's just Wrecker-flavour
      // indulgence, since Desserts is one of the Wrecker's own triggers too.
      return results.totals.snacks > 0 && results.totals.snacks >= results.totals.takeaway ? "grazer" : "wrecker";
    case "Snacking":
      return "grazer";
    case "Weekend Inactivity":
      return "hibernator";
    default:
      return "wrecker";
  }
}

function buildProfileReasons(key, results) {
  const t = results.totals;
  const active = {
    Alcohol: t.alcohol > 0,
    Takeaways: t.takeaway > 0,
    Snacking: t.snacks > 0,
    Activity: t.inactivity > 0,
  };

  if (key === "clean") return [];
  if (key === "saboteur") return ["Alcohol"];
  if (key === "grazer") return ["Snacking"];
  if (key === "hibernator") return ["Activity"];
  if (key === "restarter") {
    return ["Alcohol", "Takeaways", "Snacking", "Activity"].filter((k) => active[k]).slice(0, 3);
  }
  // wrecker — no fabricated fallback here: if the only real driver was
  // Desserts (which isn't one of the four "why" buckets), the reasons list
  // can legitimately be empty rather than blaming a category at zero.
  return ["Takeaways", "Snacking", "Alcohol"].filter((k) => active[k]).slice(0, 3);
}

export function buildWeekendProfile(results) {
  const key = classifyWeekendProfile(results);
  const profile = WEEKEND_PROFILES[key];
  const reasons = buildProfileReasons(key, results).map((label) => ({
    label,
    emoji: REASON_EMOJI[label],
  }));

  return { key, emoji: profile.emoji, title: profile.title, description: profile.description, reasons };
}

function fmt(n) {
  return Math.round(n).toLocaleString();
}

function round1(n) {
  return Math.round(n * 10) / 10;
}
