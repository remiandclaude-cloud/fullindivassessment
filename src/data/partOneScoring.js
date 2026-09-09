/*
 * Part One scoring is NOT a simple average like Part Two — some metrics
 * (sleep duration especially) are non-monotonic: more isn't always better.
 * Each metric gets its own curve; sections combine their metrics' scores.
 *
 * These curves are a starting rubric, not a clinical instrument — tune the
 * control points as we validate against real responses.
 */

/* Shared by every "more = worse" 0-10 metric (sedentary hours, injury
 * proneness, alcohol, caffeine, frequency-of-undesirable-thing ratings). */
function inverseScore(value) {
  if (value == null) return null;
  return Math.max(0, 100 - value * 10);
}

/* Shared by every plain "more = better" 0-10 metric. */
function linearScore(value) {
  if (value == null) return null;
  return (value / 10) * 100;
}

function interpolate(points, x) {
  if (x <= points[0][0]) return points[0][1];
  const last = points[points.length - 1];
  if (x >= last[0]) return last[1];
  for (let i = 0; i < points.length - 1; i++) {
    const [x0, y0] = points[i];
    const [x1, y1] = points[i + 1];
    if (x >= x0 && x <= x1) {
      const t = (x - x0) / (x1 - x0);
      return y0 + t * (y1 - y0);
    }
  }
  return 0;
}

/* [hours, score] — peaks 7.5-8.5h, penalises too little more than too much */
const DURATION_CURVE = [
  [0, 5], [3, 15], [4, 30], [5, 50], [6, 72], [7, 90],
  [7.5, 98], [8, 100], [8.5, 98], [9, 90], [9.5, 75], [10, 55],
];

export function scoreDuration(hours) {
  if (hours == null) return null;
  return interpolate(DURATION_CURVE, hours);
}

export function scoreContinuity(difficultyFallingAsleep, difficultyStayingAsleep) {
  const count = (difficultyFallingAsleep ? 1 : 0) + (difficultyStayingAsleep ? 1 : 0);
  if (count === 0) return 100;
  if (count === 1) return 55;
  return 20;
}

export function scoreWakeQuality(value) {
  if (value == null) return null;
  return (value / 10) * 100;
}

export function scoreSleep({ durationHrs, difficultyFallingAsleep, difficultyStayingAsleep, wakeQuality } = {}) {
  const duration = scoreDuration(durationHrs);
  const continuity = scoreContinuity(difficultyFallingAsleep, difficultyStayingAsleep);
  const wake = scoreWakeQuality(wakeQuality);
  if (duration == null || wake == null) return null;
  return Math.round((duration + continuity + wake) / 3);
}

/* ── Movement ── */

/* 0-10 -> frequency label. Anchors per spec: 0 none, 3 once/wk, 9 daily, 10 multiple/day. */
export const FREQUENCY_LABELS = [
  'None', 'Rarely', 'A few times a month', 'Once a week', 'Twice a week',
  '3x a week', '4x a week', '5x a week', '6x a week', 'Every day', 'Multiple times a day',
];

export function frequencyLabel(value) {
  if (value == null) return null;
  return FREQUENCY_LABELS[Math.round(value)];
}

/* More movement = better, roughly linear */
export function scoreFrequency(value) {
  return linearScore(value);
}

/* More sedentary time = worse — inverse of the raw value */
export function scoreSedentary(hours) {
  return inverseScore(hours);
}

/* More prone to injury = worse — inverse of the raw value */
export function scoreInjuryProneness(value) {
  return inverseScore(value);
}

/*
 * Split across the 4 movement dimensions is rated independently per axis
 * (0-10 each), not forced to sum to 100. The score rewards doing more of
 * each; the normalized % shares (for display) are computed separately.
 */
export function scoreMovementSplit({ strength, endurance, coordination, mobility } = {}) {
  const vals = [strength, endurance, coordination, mobility];
  if (vals.some((v) => v == null)) return null;
  return (vals.reduce((a, b) => a + b, 0) / vals.length / 10) * 100;
}

export function movementSplitShares({ strength, endurance, coordination, mobility } = {}) {
  const vals = { strength, endurance, coordination, mobility };
  const total = Object.values(vals).reduce((a, b) => a + (b || 0), 0);
  if (total === 0) return { strength: 25, endurance: 25, coordination: 25, mobility: 25 };
  return Object.fromEntries(Object.entries(vals).map(([k, v]) => [k, ((v || 0) / total) * 100]));
}

export function scoreMovement({ frequency, strength, endurance, coordination, mobility, sedentaryHrs, injuryProneness } = {}) {
  const freq = scoreFrequency(frequency);
  const split = scoreMovementSplit({ strength, endurance, coordination, mobility });
  const sedentary = scoreSedentary(sedentaryHrs);
  const injury = scoreInjuryProneness(injuryProneness);
  if (freq == null || split == null || sedentary == null || injury == null) return null;
  return Math.round((freq + split + sedentary + injury) / 4);
}

/* ── Nutrition ── */

/* [litres/day, score] — peaks ~3L, harsher penalty for under-hydration than over.
 * Capped at 3.5L: still tapering off the peak, not yet penalising heavily. */
const HYDRATION_CURVE = [
  [0, 10], [0.5, 20], [1, 35], [1.5, 55], [2, 75],
  [2.5, 92], [3, 100], [3.5, 95],
];

export function scoreHydration(litres) {
  if (litres == null) return null;
  return interpolate(HYDRATION_CURVE, litres);
}

/* [grams/day, score] — ramps up then plateaus; no penalty for high protein
 * (unlike hydration/sleep, there's no strong case that more is harmful) */
const PROTEIN_CURVE = [
  [0, 10], [20, 25], [40, 45], [60, 65], [80, 80],
  [100, 92], [120, 98], [150, 100], [200, 100],
];

export function scoreProtein(grams) {
  if (grams == null) return null;
  return interpolate(PROTEIN_CURVE, grams);
}

/* More alcohol = worse — inverse of the raw value (drinks/week, 0-10+) */
export function scoreAlcohol(drinksPerWeek) {
  return inverseScore(drinksPerWeek);
}

/* More caffeine = worse — inverse of the raw value (cups/day, 0-10+) */
export function scoreCaffeine(cupsPerDay) {
  return inverseScore(cupsPerDay);
}

/* More frequent sugar/processed food = worse — same 0-10 frequency labels
 * as Movement's ruler, but scored in the opposite direction */
export function scoreProcessedFoodFrequency(value) {
  return inverseScore(value);
}

/* More frequent use of other stimulants (nicotine, energy drinks, pre-workout,
 * prescription/recreational stimulants) = worse — specifics live in notes */
export function scoreStimulantFrequency(value) {
  return inverseScore(value);
}

export function scoreNutrition({
  hydrationLitres, proteinGrams, alcoholDrinksPerWeek,
  caffeineCupsPerDay, processedFoodFrequency, stimulantFrequency,
} = {}) {
  const scores = [
    scoreHydration(hydrationLitres),
    scoreProtein(proteinGrams),
    scoreAlcohol(alcoholDrinksPerWeek),
    scoreCaffeine(caffeineCupsPerDay),
    scoreProcessedFoodFrequency(processedFoodFrequency),
    scoreStimulantFrequency(stimulantFrequency),
  ];
  if (scores.some((s) => s == null)) return null;
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

/* ── Social ── */

export const RELATIONSHIP_TYPES = [
  { key: 'closeFriends', label: 'Close friends I see regularly' },
  { key: 'partner', label: 'A romantic or life partner' },
  { key: 'family', label: "Family I'm emotionally close to" },
  { key: 'mentor', label: 'A mentor or someone I turn to' },
  { key: 'community', label: 'A community or group I belong to' },
];

/* More non-work social contact = better, roughly linear */
export function scoreSocialFrequency(value) {
  return linearScore(value);
}

/* [people, score] — steep early gains (0→3 matters enormously), plateaus
 * after ~6: having 11 people who'd pick up isn't meaningfully more secure
 * than having 6 */
const SUPPORT_CIRCLE_CURVE = [
  [0, 10], [1, 30], [2, 50], [3, 75], [4, 90], [5, 97], [6, 100], [10, 100],
];

export function scoreSupportCircleSize(count) {
  if (count == null) return null;
  return interpolate(SUPPORT_CIRCLE_CURVE, count);
}

/* More depth beyond small talk = better, roughly linear */
export function scoreDepth(value) {
  return linearScore(value);
}

/* Higher satisfaction with who they spend time with = better, roughly linear */
export function scoreCircleSatisfaction(value) {
  return linearScore(value);
}

/* Presence across relationship types, not graded quality — a diversity
 * signal distinct from count/depth/satisfaction */
export function scoreRelationshipDiversity(selectedKeys = []) {
  return (selectedKeys.length / RELATIONSHIP_TYPES.length) * 100;
}

export function scoreSocial({
  socialFrequency, supportCircleSize, depth, circleSatisfaction, relationshipTypes,
} = {}) {
  const scores = [
    scoreSocialFrequency(socialFrequency),
    scoreSupportCircleSize(supportCircleSize),
    scoreDepth(depth),
    scoreCircleSatisfaction(circleSatisfaction),
    scoreRelationshipDiversity(relationshipTypes || []),
  ];
  if (scores.some((s) => s == null)) return null;
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}

/* ── Data & Content ── */

export const CONTENT_FORMATS = [
  { key: 'video', label: 'Video / streaming' },
  { key: 'shortForm', label: 'Short-form (Reels, TikTok, Shorts)' },
  { key: 'text', label: 'Text / articles' },
  { key: 'audio', label: 'Audio / podcasts' },
  { key: 'socialFeed', label: 'Social feeds / images' },
];

export const CONTENT_THEMES = [
  { key: 'news', label: 'News / current events' },
  { key: 'entertainment', label: 'Entertainment' },
  { key: 'education', label: 'Education / learning' },
  { key: 'selfImprovement', label: 'Self-improvement' },
  { key: 'socialCulture', label: 'Social / culture' },
  { key: 'work', label: 'Work / professional' },
];

/* More non-work screen time = worse — inverse of the raw value (hrs/day, 0-10+) */
export function scoreScreenTime(hours) {
  return inverseScore(hours);
}

/* More actionable (vs. purely informative/entertaining) = better, roughly linear */
export function scoreActionability(value) {
  return linearScore(value);
}

/* More catastrophic/anxiety-driven content = worse — inverse of the raw value */
export function scoreCatastrophizing(value) {
  return inverseScore(value);
}

/*
 * Format and theme (what kind of content, not how much/how it's consumed)
 * are captured for context only — there's no defensible "more of X format
 * is better" claim the way there is for, say, relationship diversity.
 * They don't factor into the score.
 */
export function scoreDataContent({ screenTimeHours, actionability, catastrophizing } = {}) {
  const scores = [
    scoreScreenTime(screenTimeHours),
    scoreActionability(actionability),
    scoreCatastrophizing(catastrophizing),
  ];
  if (scores.some((s) => s == null)) return null;
  return Math.round(scores.reduce((a, b) => a + b, 0) / scores.length);
}
