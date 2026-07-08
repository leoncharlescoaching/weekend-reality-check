# Weekend Reality Check™

Powered by 🚨 Bullshit Detected™

A mobile-first, single-page web app that takes people under 60 seconds to complete, then shows them the gap between what they *say* they want and what their weekend actually shows. No backend, no login, no accounts — every answer stays in the browser's `localStorage`.

## Stack

- React 19 + Vite
- Tailwind CSS v4 (via `@tailwindcss/vite`, theme tokens defined in `src/index.css`)
- Framer Motion for transitions and micro-interactions
- Zero backend — deploy the built `dist/` folder anywhere static (Vercel, Netlify, S3, GitHub Pages)

## Getting started

```bash
npm install
npm run dev       # local dev server
npm run build      # production build → dist/
npm run preview    # serve the production build locally
npm test            # run the scoring engine smoke tests
```

## How it's structured

```
src/
  data/flow.js        Every question in the flow + answer options (single source of truth)
  lib/scoring.js       The Bullshit Detector™ — deterministic, rule-based scoring
  lib/copy.js          Leon Charles voice: reality read-out + Monday Reset tips
  lib/units.js          cm <-> ft/in, kg <-> lb conversions
  hooks/useLocalStorage.js
  components/           Shared UI (buttons, progress bar, question renderers)
  components/screens/    Splash, Landing, Loading Scan, Results, Monday Reset, Coaching CTA, Email
  App.jsx                 The state machine that drives the whole flow
tests/
  scoring.test.mjs        Node-run assertions against the scoring engine
```

### The flow

Splash → Landing → Age → Gender → Height → Weight → Goal → Friday → Saturday → Sunday (alcohol, takeaway, dessert, snacks, steps — same 5 questions each day) → Bullshit Scan™ (loading) → Results → Monday Reset™ → Coaching CTA → Email.

One question per screen. Choice questions auto-advance on tap (~190ms). Number/height/weight screens use a stepper + Continue button. Every screen transition is a direction-aware push (forward slides in from the right, back reverses it) for a native-app feel. Progress persists in `localStorage`, so a refresh mid-flow doesn't lose answers.

### The scoring engine

`computeResults()` in `src/lib/scoring.js` is fully deterministic and rule-based — no black box. Every calorie estimate traces back to a specific answer:

- Alcohol: ~150 kcal/drink
- Takeaway: 0 / 700 / 1,400 kcal depending on frequency that day
- Dessert: 0 / 350 / 700 kcal
- Snacks: 0 / 250 / 600 kcal
- Steps: adjusts the day's surplus by ±300 kcal based on activity band

From there it derives:

- **Weekend Score™** (0–100) — purely behavioural, based on total surplus.
- **Bullshit Level™** — Mild / Questionable / Delusional / Dangerous / Nuclear, the gap between the stated goal and actual behaviour (the formula differs per goal — a surplus is judged very differently for "lose fat" vs "build muscle").
- **Biggest Progress Killer™** — Alcohol / Takeaways / Desserts / Snacking / Weekend Inactivity, or **Poor Food Choices** when no single food category dominates but the combined food total still outweighs alcohol and inactivity. Falls back to a genuine "clean weekend" state when every category is at zero.
- **Your Weekend Breakdown™** — an itemised kcal receipt, built by `buildWeekendBreakdown()` in `src/lib/copy.js`, showing only the categories that actually contributed.

### Customising the copy

All user-facing copy lives in `src/lib/copy.js` and `src/data/flow.js`.

- `buildRealityLines()` — short-sentence (≤15 words each), goal-vs-behaviour contradiction copy. Structure: goal line → day callout → 2-line category couplet → 2-line closer (varies by Bullshit Level). Extend `CATEGORY_COUPLETS` / `CLOSING_COUPLETS` for more variety.
- `buildMondayResetTips()` — 3 personalised actions built from the top 2 contributing categories (referencing the actual worst day for each) plus one goal-based prep tip. Extend `CATEGORY_TIP` / `GOAL_TIP`.
- `buildWeekendBreakdown()` — the itemised kcal list under "Your Weekend Breakdown™".

## Design tokens

| Token | Value |
|---|---|
| Background | `#0D0D0D` |
| Card | `#1B1B1B` |
| Primary Orange | `#FF6A00` |
| White | `#FFFFFF` |
| Success | `#22C55E` |
| Warning | `#F59E0B` |
| Danger | `#EF4444` |
| Headline font | Anton |
| Body font | Inter |

No gradients, no glossy buttons, no gimmicks — large type, large tap targets, dark and premium throughout.
