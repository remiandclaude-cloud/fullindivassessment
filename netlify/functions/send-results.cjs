// Zero dependencies — calls Resend REST API directly with fetch
//
// Note: inline SVG does not render in Gmail/Outlook/most email clients, so
// unlike the on-page results view, charts here are HTML/CSS bar tables, not
// the triangle/pentagon SVGs. The logo is a hosted URL, not a base64 data
// URI — most clients (Gmail included) block data: URIs as images.

var LOGO_URL = "https://equippedintake.netlify.app/logo.png";

function getTier(pct) {
  if (pct < 40) return "wakingUp";
  if (pct <= 80) return "building";
  return "equipped";
}

function getTierLabel(tier) {
  return { wakingUp: "Waking Up", building: "Building", equipped: "equipped." }[tier];
}

var TIER_COLOR = { wakingUp: "#8a8980", building: "#D9B557", equipped: "#D97757" };

function tierColorValue(v) {
  if (!v || v < 4) return "#8a8980";
  if (v <= 8) return "#D9B557";
  return "#D97757";
}

/* ── Part Two (Notice / Shift / Expand) — unchanged data ── */

var tierDescriptions = {
  notice: {
    wakingUp: "Your awareness of what's happening inside you is still waking up. Sensations, thoughts, and shifts in your state tend to pass by unnoticed until they're loud. You're living more from autopilot than from real time data. This isn't where you're stuck. It's where you're starting. Most people walk through life without ever questioning how much they're actually feeling versus how much they're missing. The fact that you're measuring it puts you ahead of where you think you are. And Notice is the fastest skill to build because it only requires one thing: attention. You are at the beginning of developing this skill, and this is when progress can be the most palpable. Small shifts in awareness compound fast.",
    building: "You're noticing more than most people do. Body signals land, thought patterns get caught mid loop, and you can sometimes sit with what arises without reacting. But it's inconsistent. Under pressure, fatigue, or distraction, the channel narrows and you lose the thread. This is the most common place to be, and it's also the most exciting. You've proven that awareness is available to you. The work now is making it resilient enough to hold up when it matters most, not just on quiet mornings but in the moments where your system is under real load. The gap between your best and worst days of noticing is your opportunity. Closing that gap is what separates someone who notices from someone who is equipped. to notice.",
    equipped: "You have a strong, open channel to your internal world. You read your body in real time, you catch your thoughts before they run the show, and you can sit in stillness without needing to escape. This is the sensory foundation that makes everything else possible. You don't just notice. You notice early, accurately, and consistently. Most people never get here because they never train it. You have. The question now is depth. How subtle can the signal be and still reach you? How early can you catch the shift? How still can you stay when everything in you wants to move? You are operating at a high level. How much more equipped. are you interested in getting?",
  },
  shift: {
    wakingUp: "When your state changes, you go with it. Activation stays high, flatness lingers, and stress sticks. You don't yet have reliable tools to move yourself between states, and your body tends to get stuck in whatever mode it lands in. The signals might be there, but the ability to act on them and change course hasn't been built yet. This shows up in how long stress follows you home, how hard it is to get going when you're flat, and how often you override what your body is telling you rather than responding to it. You are at the beginning of developing this skill, and this is when progress can be the most palpable. Learning even one reliable tool to shift your state changes your entire relationship with stress, energy, and performance.",
    building: "You can shift your state, but not always when it counts. On calm days, your tools work. Under real pressure, they become harder to access. You can come down from activation sometimes, pull yourself up from flat sometimes, and act on your body's signals sometimes. The pattern is there. What's missing is reliability under load. The moments where you most need to shift are the moments where shifting is hardest, and that's exactly where the training needs to happen. Consistency and speed are the next edge. You have the tools. The opportunity now is making them available to you in the moments that actually matter, not just the moments that are easy.",
    equipped: "You move between states deliberately. You regulate down from activation, up from shutdown, and you act on what your body tells you in real time. Stress doesn't stick, flatness doesn't trap you, and your body's signals get a response, not an override. Your nervous system is not just reactive. It's steerable. This is rare. Most people spend their entire lives being driven by their state rather than driving it. You've built the ability to choose. The question now is range. Can you shift faster? Can you hold a chosen state longer? Can you move through states that used to take you hours in minutes? You are operating at a high level. How much more equipped. are you interested in getting?",
  },
  expand: {
    wakingUp: "Your world is shaped more by default than by design. You endure your environment rather than curating it, you avoid the situations that would stretch your capacity, and your nervous system doesn't get the deliberate care it needs to grow. This isn't a character flaw. It means the conditions for expansion haven't been set up yet. Most people never realise that their environment, their exposure, and their daily inputs are all variables they can control. You're measuring them now, and that's the first step. Setting them up is entirely within your control, and the return on even small changes here is enormous. You are at the beginning of developing this skill, and this is when progress can be the most palpable. Your window of tolerance is ready to grow. It's just waiting for the right conditions.",
    building: "You're growing, but unevenly. Some areas of expansion are active: maybe you seek hard conversations but neglect your physical environment, or you nurture your system but avoid real exposure. The pieces are in motion but they're not yet a system. You've shown you can stretch in certain directions. The insight from this score is about what you're avoiding, not what you're doing. The areas you score lowest in are almost certainly the ones that would unlock the most growth. The next step is treating all three, environment design, deliberate exposure, and nervous system care, as equally important. Your biggest opportunity is in the dimension you've been neglecting.",
    equipped: "You are actively expanding your capacity on all fronts. You design your environment to support your system, you seek discomfort deliberately to widen your window of tolerance, and you feed your nervous system with the inputs it needs to sustain that growth. This is not maintenance. This is someone building a bigger container, on purpose, every day. Very few people operate here because expansion requires the willingness to keep going when you're already doing well. You're not resting on what you've built. You're building more. The question now is: where is the ceiling? What would it look like to go even further? You are operating at a high level. How much more equipped. are you interested in getting?",
  },
};

var questionMeta = [
  { id: "N1", category: "notice", title: "Body Signals" },
  { id: "N2", category: "notice", title: "Breath Patterns" },
  { id: "N3", category: "notice", title: "Emotional Signatures" },
  { id: "N4", category: "notice", title: "State Recognition" },
  { id: "N5", category: "notice", title: "Early Warning" },
  { id: "N6", category: "notice", title: "Hunger and Fatigue" },
  { id: "N7", category: "notice", title: "Heart Rhythm" },
  { id: "N8", category: "notice", title: "Room Reading" },
  { id: "N9", category: "notice", title: "After Effects" },
  { id: "S1", category: "shift", title: "Down Regulation" },
  { id: "S2", category: "shift", title: "Up Regulation" },
  { id: "S3", category: "shift", title: "Breath as a Tool" },
  { id: "S4", category: "shift", title: "Recovery" },
  { id: "S5", category: "shift", title: "Staying Unstuck" },
  { id: "S6", category: "shift", title: "Response Over Reaction" },
  { id: "S7", category: "shift", title: "Substance Independence" },
  { id: "S8", category: "shift", title: "Pressure Performance" },
  { id: "S9", category: "shift", title: "Sleep Transition" },
  { id: "E1", category: "expand", title: "Discomfort Tolerance" },
  { id: "E2", category: "expand", title: "Receiving Feedback" },
  { id: "E3", category: "expand", title: "Implementing Feedback" },
  { id: "E4", category: "expand", title: "Hard Conversations" },
  { id: "E5", category: "expand", title: "Circling Back" },
  { id: "E6", category: "expand", title: "Self Reflection" },
  { id: "E7", category: "expand", title: "Emotional Stretch" },
  { id: "E8", category: "expand", title: "Self Deconstruction" },
  { id: "E9", category: "expand", title: "Raising the Floor" },
];

var categoryNames = { notice: "Notice", shift: "Shift", expand: "Expand" };

function generateSummary(noticePct, shiftPct, expandPct) {
  var noticeS = {
    wakingUp: "Your awareness of internal signals is still developing. You tend to notice what's happening in your body only after it's already loud. Notice is the fastest skill to build because it only requires one thing: attention.",
    building: "You're building real body awareness. Some days you catch the signals early, other days they slip past you. The gap between your best and worst days of noticing is your opportunity.",
    equipped: "Your interoceptive awareness is strong. You read your body's signals in real time, catching shifts before they build. The question now is depth and subtlety.",
  };
  var shiftS = {
    wakingUp: "When your state shifts, you don't yet have reliable tools to move through it. Your system tends to get stuck. Learning even one reliable tool changes everything.",
    building: "You have tools that work on good days, but under real pressure they can disappear. The opportunity is making them available in the moments that actually matter.",
    equipped: "You move between states deliberately. You regulate without external crutches and perform under pressure. The question now is range and speed.",
  };
  var expandS = {
    wakingUp: "Your world is shaped more by default than by design. The conditions for expansion haven't been set up yet, and even small changes here produce enormous returns.",
    building: "You're growing, but unevenly. The subcategories you score lowest in are almost certainly the ones that would unlock the most growth.",
    equipped: "You actively expand your capacity on all fronts. You design your environment, seek discomfort deliberately, and feed your nervous system what it needs.",
  };
  return [noticeS[getTier(noticePct)], shiftS[getTier(shiftPct)], expandS[getTier(expandPct)]];
}

/* ── Part One (Sleep / Movement / Nutrition / Social / Data & Content) ──
 * Mirrors src/data/partOneScoring.js and src/data/partOneTiers.js. This
 * function can't import from src/ (separate bundle), so it's duplicated
 * here — keep in sync with the frontend if those formulas change. */

function inverseScore(value) {
  if (value == null) return null;
  return Math.max(0, 100 - value * 10);
}
function linearScore(value) {
  if (value == null) return null;
  return (value / 10) * 100;
}
function interpolate(points, x) {
  if (x <= points[0][0]) return points[0][1];
  var last = points[points.length - 1];
  if (x >= last[0]) return last[1];
  for (var i = 0; i < points.length - 1; i++) {
    var x0 = points[i][0], y0 = points[i][1];
    var x1 = points[i + 1][0], y1 = points[i + 1][1];
    if (x >= x0 && x <= x1) {
      var t = (x - x0) / (x1 - x0);
      return y0 + t * (y1 - y0);
    }
  }
  return 0;
}

var DURATION_CURVE = [[0, 5], [3, 15], [4, 30], [5, 50], [6, 72], [7, 90], [7.5, 98], [8, 100], [8.5, 98], [9, 90], [9.5, 75], [10, 55]];
function scoreDuration(hours) { return hours == null ? null : interpolate(DURATION_CURVE, hours); }
function scoreContinuity(fallingAsleep, stayingAsleep) {
  var count = (fallingAsleep ? 1 : 0) + (stayingAsleep ? 1 : 0);
  if (count === 0) return 100;
  if (count === 1) return 55;
  return 20;
}
function scoreWakeQuality(v) { return v == null ? null : (v / 10) * 100; }
function scoreSleep(a) {
  a = a || {};
  var duration = scoreDuration(a.durationHrs);
  var continuity = scoreContinuity(a.difficultyFallingAsleep, a.difficultyStayingAsleep);
  var wake = scoreWakeQuality(a.wakeQuality);
  if (duration == null || wake == null) return null;
  return Math.round((duration + continuity + wake) / 3);
}

var FREQUENCY_LABELS = ["None", "Rarely", "A few times a month", "Once a week", "Twice a week", "3x a week", "4x a week", "5x a week", "6x a week", "Every day", "Multiple times a day"];
function frequencyLabel(v) { return v == null ? null : FREQUENCY_LABELS[Math.round(v)]; }
function scoreFrequency(v) { return linearScore(v); }
function scoreSedentary(h) { return inverseScore(h); }
function scoreInjuryProneness(v) { return inverseScore(v); }
function scoreMovementSplit(a) {
  a = a || {};
  var vals = [a.strength, a.endurance, a.coordination, a.mobility];
  for (var i = 0; i < vals.length; i++) { if (vals[i] == null) return null; }
  return (vals.reduce(function (s, v) { return s + v; }, 0) / vals.length / 10) * 100;
}
function scoreMovement(a) {
  a = a || {};
  var freq = scoreFrequency(a.frequency);
  var split = scoreMovementSplit(a);
  var sed = scoreSedentary(a.sedentaryHrs);
  var inj = scoreInjuryProneness(a.injuryProneness);
  if (freq == null || split == null || sed == null || inj == null) return null;
  return Math.round((freq + split + sed + inj) / 4);
}

var HYDRATION_CURVE = [[0, 10], [0.5, 20], [1, 35], [1.5, 55], [2, 75], [2.5, 92], [3, 100], [3.5, 95]];
function scoreHydration(l) { return l == null ? null : interpolate(HYDRATION_CURVE, l); }
var PROTEIN_CURVE = [[0, 10], [20, 25], [40, 45], [60, 65], [80, 80], [100, 92], [120, 98], [150, 100], [200, 100]];
function scoreProtein(g) { return g == null ? null : interpolate(PROTEIN_CURVE, g); }
function scoreAlcohol(d) { return inverseScore(d); }
function scoreCaffeine(c) { return inverseScore(c); }
function scoreProcessedFoodFrequency(v) { return inverseScore(v); }
function scoreStimulantFrequency(v) { return inverseScore(v); }
function scoreNutrition(a) {
  a = a || {};
  var scores = [scoreHydration(a.hydrationLitres), scoreProtein(a.proteinGrams), scoreAlcohol(a.alcoholDrinksPerWeek), scoreCaffeine(a.caffeineCupsPerDay), scoreProcessedFoodFrequency(a.processedFoodFrequency), scoreStimulantFrequency(a.stimulantFrequency)];
  for (var i = 0; i < scores.length; i++) { if (scores[i] == null) return null; }
  return Math.round(scores.reduce(function (s, v) { return s + v; }, 0) / scores.length);
}

var RELATIONSHIP_TYPES = [
  { key: "closeFriends", label: "Close friends I see regularly" },
  { key: "partner", label: "A romantic or life partner" },
  { key: "family", label: "Family I'm emotionally close to" },
  { key: "mentor", label: "A mentor or someone I turn to" },
  { key: "community", label: "A community or group I belong to" },
];
function scoreSocialFrequency(v) { return linearScore(v); }
var SUPPORT_CIRCLE_CURVE = [[0, 10], [1, 30], [2, 50], [3, 75], [4, 90], [5, 97], [6, 100], [10, 100]];
function scoreSupportCircleSize(c) { return c == null ? null : interpolate(SUPPORT_CIRCLE_CURVE, c); }
function scoreDepth(v) { return linearScore(v); }
function scoreCircleSatisfaction(v) { return linearScore(v); }
function scoreRelationshipDiversity(keys) { keys = keys || []; return (keys.length / RELATIONSHIP_TYPES.length) * 100; }
function scoreSocial(a) {
  a = a || {};
  var scores = [scoreSocialFrequency(a.socialFrequency), scoreSupportCircleSize(a.supportCircleSize), scoreDepth(a.depth), scoreCircleSatisfaction(a.circleSatisfaction), scoreRelationshipDiversity(a.relationshipTypes)];
  for (var i = 0; i < scores.length; i++) { if (scores[i] == null) return null; }
  return Math.round(scores.reduce(function (s, v) { return s + v; }, 0) / scores.length);
}

var CONTENT_FORMATS = [
  { key: "video", label: "Video / streaming" },
  { key: "shortForm", label: "Short-form (Reels, TikTok, Shorts)" },
  { key: "text", label: "Text / articles" },
  { key: "audio", label: "Audio / podcasts" },
  { key: "socialFeed", label: "Social feeds / images" },
];
var CONTENT_THEMES = [
  { key: "news", label: "News / current events" },
  { key: "entertainment", label: "Entertainment" },
  { key: "education", label: "Education / learning" },
  { key: "selfImprovement", label: "Self-improvement" },
  { key: "socialCulture", label: "Social / culture" },
  { key: "work", label: "Work / professional" },
];
function scoreScreenTime(h) { return inverseScore(h); }
function scoreActionability(v) { return linearScore(v); }
function scoreCatastrophizing(v) { return inverseScore(v); }
function scoreDataContent(a) {
  a = a || {};
  var scores = [scoreScreenTime(a.screenTimeHours), scoreActionability(a.actionability), scoreCatastrophizing(a.catastrophizing)];
  for (var i = 0; i < scores.length; i++) { if (scores[i] == null) return null; }
  return Math.round(scores.reduce(function (s, v) { return s + v; }, 0) / scores.length);
}

var partOneTierSummaries = {
  sleep: {
    wakingUp: "Sleep isn't yet doing its job. Your duration, continuity, or how rested you feel on waking point to a foundation that needs rebuilding before much else will stick. This is the highest-leverage place to start.",
    building: "Sleep is mostly working, but not reliably. Some nights land well, others don't, and the gap between your best and worst nights is where the opportunity lives.",
    equipped: "Sleep is a genuine strength — you're getting enough, it's continuous, and you wake up rested more often than not. The question now is protecting that consistency, not chasing more.",
  },
  movement: {
    wakingUp: "Movement isn't yet a consistent part of your life, and a lot of the day is spent still. Frequency matters more than intensity at this stage — even a small, regular practice changes the baseline quickly.",
    building: "You move with some regularity, but it's uneven — across frequency, how balanced your training is, or how much of the day is spent sedentary. Whichever is weakest is probably your fastest win.",
    equipped: "Movement is a real strength — you're active, reasonably balanced across how you train, and not sitting still all day. From here it's about refining, not overhauling.",
  },
  nutrition: {
    wakingUp: "Hydration, what you're eating, or what you're using to get through the day are working against you more than for you right now. Small, boring changes here tend to move the needle fast.",
    building: "The basics are mostly in place, but something in the mix — hydration, protein, or how much you're leaning on caffeine, alcohol, or sugar — is still pulling the average down.",
    equipped: "Nutrition is solidly dialled in — you're hydrated, fuelled, and not overly reliant on stimulants or alcohol to get through the day. This is a strength to maintain, not a project.",
  },
  social: {
    wakingUp: "Connection outside of work is thin right now — how often you see people, how many you could call, or how deep those conversations go. Worth treating with the same seriousness as sleep or training.",
    building: "You have real connection, but it's inconsistent — maybe frequent contact without much depth, or a small circle you'd like to lean on more. The gap between quantity and depth is usually where the work is.",
    equipped: "Your social world is a genuine asset — frequent, deep, and with people you're glad to be spending time with. Protecting this as life gets busier is the main job now.",
  },
  dataContent: {
    wakingUp: "Screens are taking up a lot of the day, and what's coming in tends to be more passive or more anxiety-driving than useful. Even a small shift toward actionable content changes how your nervous system carries the rest of the day.",
    building: "Your relationship with content is mixed — some of it is actionable and calm, some of it is passive or catastrophic, and the balance could tip either way. Worth noticing which sources are doing the pulling.",
    equipped: "What you consume is mostly working for you — actionable, and not steeped in doom. Screen time itself is the only thing worth keeping an eye on.",
  },
};

function labelsFor(keys, options) {
  keys = keys || [];
  var list = keys.map(function (k) {
    var match = options.filter(function (o) { return o.key === k; })[0];
    return match ? match.label : null;
  }).filter(function (v) { return !!v; });
  return list.length ? list.join(", ") : "None";
}

function sleepRows(a) {
  a = a || {};
  var continuity = [];
  if (a.difficultyFallingAsleep) continuity.push("Trouble falling asleep");
  if (a.difficultyStayingAsleep) continuity.push("Trouble staying asleep");
  return [
    { label: "Duration", value: a.durationHrs != null ? a.durationHrs + " hrs" : "—" },
    { label: "Continuity", value: continuity.length ? continuity.join(", ") : "None" },
    { label: "Wake quality", value: a.wakeQuality != null ? a.wakeQuality + "/10" : "—" },
  ];
}
function movementRows(a) {
  a = a || {};
  return [
    { label: "Frequency", value: frequencyLabel(a.frequency) || "—" },
    { label: "Split", value: "Strength " + (a.strength != null ? a.strength : "—") + " · Endurance " + (a.endurance != null ? a.endurance : "—") + " · Coordination " + (a.coordination != null ? a.coordination : "—") + " · Mobility " + (a.mobility != null ? a.mobility : "—") },
    { label: "Sedentary time", value: a.sedentaryHrs != null ? a.sedentaryHrs + " hrs/day" : "—" },
    { label: "Injury proneness", value: a.injuryProneness != null ? a.injuryProneness + "/10" : "—" },
  ];
}
function nutritionRows(a) {
  a = a || {};
  return [
    { label: "Hydration", value: a.hydrationLitres != null ? a.hydrationLitres + " L" : "—" },
    { label: "Protein", value: a.proteinGrams != null ? a.proteinGrams + " g" : "—" },
    { label: "Alcohol", value: a.alcoholDrinksPerWeek != null ? a.alcoholDrinksPerWeek + "/week" : "—" },
    { label: "Caffeine", value: a.caffeineCupsPerDay != null ? a.caffeineCupsPerDay + "/day" : "—" },
    { label: "Sugar & processed food", value: frequencyLabel(a.processedFoodFrequency) || "—" },
    { label: "Other stimulants", value: frequencyLabel(a.stimulantFrequency) || "—" },
  ];
}
function socialRows(a) {
  a = a || {};
  return [
    { label: "Frequency", value: frequencyLabel(a.socialFrequency) || "—" },
    { label: "Support circle", value: a.supportCircleSize != null ? a.supportCircleSize + " people" : "—" },
    { label: "Depth", value: a.depth != null ? a.depth + "/10" : "—" },
    { label: "Circle satisfaction", value: a.circleSatisfaction != null ? a.circleSatisfaction + "/10" : "—" },
    { label: "Relationship types", value: labelsFor(a.relationshipTypes, RELATIONSHIP_TYPES) },
  ];
}
function dataContentRows(a) {
  a = a || {};
  return [
    { label: "Screen time", value: a.screenTimeHours != null ? a.screenTimeHours + " hrs/day" : "—" },
    { label: "Format", value: labelsFor(a.contentFormats, CONTENT_FORMATS) },
    { label: "Theme", value: labelsFor(a.contentThemes, CONTENT_THEMES) },
    { label: "Actionability", value: a.actionability != null ? a.actionability + "/10" : "—" },
    { label: "Catastrophizing", value: a.catastrophizing != null ? a.catastrophizing + "/10" : "—" },
  ];
}

function buildPartOneSections(partOneAnswers) {
  var pa = partOneAnswers || {};
  return [
    { id: "sleep", name: "Sleep", score: scoreSleep(pa.sleep), rows: sleepRows(pa.sleep) },
    { id: "movement", name: "Movement", score: scoreMovement(pa.movement), rows: movementRows(pa.movement) },
    { id: "nutrition", name: "Nutrition", score: scoreNutrition(pa.nutrition), rows: nutritionRows(pa.nutrition) },
    { id: "social", name: "Social", score: scoreSocial(pa.social), rows: socialRows(pa.social) },
    { id: "dataContent", name: "Data & Content", score: scoreDataContent(pa.dataContent), rows: dataContentRows(pa.dataContent) },
  ];
}

function partOneOverall(sections) {
  var scored = sections.filter(function (s) { return s.score != null; });
  if (!scored.length) return { pct: null, tier: null };
  var pct = scored.reduce(function (sum, s) { return sum + s.score; }, 0) / scored.length;
  return { pct: pct, tier: getTier(pct) };
}

/* ── Shared HTML builders ── */

var PART_LABEL_LG = 'font-size:22px;font-weight:600;color:#D97757;text-align:center;margin-bottom:6px;letter-spacing:-0.01em;';
var PART_LABEL_SM = 'font-size:11px;font-weight:600;letter-spacing:0.12em;text-transform:uppercase;color:#b5613f;text-align:center;margin-bottom:16px;';

function buildOverviewBarTable(items) {
  // items: [{ name, pct }] — pct may be null
  var html = '<table style="width:100%;margin:20px 0 28px;"><tr>';
  items.forEach(function (item) {
    var col = item.pct != null ? (TIER_COLOR[getTier(item.pct)] || "#D97757") : "#5c5b54";
    html += '<td style="text-align:center;padding:6px 4px;"><div style="font-size:12px;font-weight:600;color:#f0efea;">' + item.name + '</div><div style="font-size:17px;font-weight:600;color:' + col + ';">' + (item.pct != null ? Math.round(item.pct) + "%" : "—") + '</div></td>';
  });
  html += '</tr><tr>';
  items.forEach(function (item) {
    var col = item.pct != null ? (TIER_COLOR[getTier(item.pct)] || "#D97757") : "#2C2C2B";
    html += '<td style="padding:4px 4px;"><div style="background:#2C2C2B;border-radius:3px;height:8px;"><div style="background:' + col + ';border-radius:3px;height:8px;width:' + (item.pct != null ? Math.round(item.pct) : 0) + '%;"></div></div></td>';
  });
  html += '</tr></table>';
  return html;
}

function buildPartOneSummaryParagraphs(sections) {
  return sections.map(function (s) {
    var text = s.score != null ? partOneTierSummaries[s.id][getTier(s.score)] : "Not yet completed.";
    return '<p style="font-size:14px;line-height:1.7;color:#C3C2B7;padding-left:14px;border-left:2px solid #b5613f;margin-bottom:12px;"><strong style="display:block;font-size:15px;font-weight:700;color:#EFEFEA;margin-bottom:4px;">' + s.name + '.</strong>' + text + '</p>';
  }).join("");
}

function buildPartOneDetailCards(sections, hideScores) {
  return sections.map(function (s) {
    var rowsHTML = s.rows.map(function (r) {
      return '<tr><td style="padding:6px 0;font-size:12px;color:#9e9d92;">' + r.label + '</td><td style="padding:6px 0;font-size:12px;font-weight:600;color:#EFEFEA;text-align:right;">' + r.value + '</td></tr>';
    }).join("");

    var scoreHeaderHTML;
    if (hideScores || s.score == null) {
      scoreHeaderHTML = '<div style="font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#8a8980;">' + s.name + '</div>';
    } else {
      var tier = getTier(s.score);
      scoreHeaderHTML = '<div style="font-size:32px;font-weight:600;color:#f0efea;">' + Math.round(s.score) + '%</div>' +
        '<div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:' + (TIER_COLOR[tier] || "#D97757") + ';margin-top:4px;">' + getTierLabel(tier) + '</div>' +
        '<div style="font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#8a8980;margin-top:6px;">' + s.name + '</div>';
    }

    return '<div style="background:#1F1F1E;border:1px solid #2C2C2B;border-radius:16px;padding:28px 24px;margin-bottom:24px;">' +
      '<div style="text-align:center;margin-bottom:16px;">' + scoreHeaderHTML + '</div>' +
      '<table style="width:100%;border-collapse:collapse;margin-top:8px;">' + rowsHTML + '</table>' +
      '</div>';
  }).join("");
}

function buildEmailHTML(params) {
  var userName = params.userName;
  var answers = params.answers;
  var catScores = params.catScores;
  var overallPct = params.overallPct;
  var overallTier = params.overallTier;
  var summaryLines = params.summaryLines;
  var hideScores = !!params.hideScores;
  var partOneSections = params.partOneSections;
  var partOneOverallResult = params.partOneOverallResult;

  var categoryBlocks = catScores.map(function (cat) {
    var desc = tierDescriptions[cat.id][cat.tier];

    var qsHTML = cat.questions.map(function (q) {
      var score = answers[q.id] || 0;
      var pctWidth = (score / 10) * 100;
      var c = tierColorValue(score);
      return '<tr><td style="padding:4px 0;font-size:12px;color:#9e9d92;width:140px;">' + q.id + '. ' + q.title + '</td><td style="padding:4px 6px;"><div style="background:#2C2C2B;border-radius:3px;height:5px;width:100%;"><div style="background:' + c + ';border-radius:3px;height:5px;width:' + pctWidth + '%;"></div></div></td><td style="padding:4px 0;font-size:12px;font-weight:600;color:' + c + ';width:24px;text-align:right;">' + score + '</td></tr>';
    }).join("");

    var responsesHTML = '<div style="margin-top:20px;padding-top:16px;border-top:1px solid #2C2C2B;">' +
      '<div style="font-size:10px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#8a8980;margin-bottom:12px;">Your responses</div>' +
      '<table style="width:100%;border-collapse:collapse;">' + qsHTML + '</table>' +
      '</div>';

    var scoreHeaderHTML = hideScores
      ? '<div style="font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#8a8980;">' + cat.name + '</div>'
      : '<div style="font-size:32px;font-weight:600;color:#f0efea;">' + Math.round(cat.pct) + '%</div>' +
        '<div style="font-size:11px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:' + (TIER_COLOR[cat.tier] || "#D97757") + ';margin-top:4px;">' + getTierLabel(cat.tier) + '</div>' +
        '<div style="font-size:13px;font-weight:600;text-transform:uppercase;letter-spacing:0.08em;color:#8a8980;margin-top:6px;">' + cat.name + '</div>';

    return '<div style="background:#1F1F1E;border:1px solid #2C2C2B;border-radius:16px;padding:28px 24px;margin-bottom:24px;">' +
      '<div style="text-align:center;margin-bottom:16px;">' +
      scoreHeaderHTML +
      '</div>' +
      '<p style="font-size:14px;line-height:1.75;color:#C3C2B7;margin-bottom:20px;text-align:center;">' + desc + '</p>' +
      responsesHTML +
      '</div>';
  }).join("");

  var summaryHTML = summaryLines.map(function (s, i) {
    return '<p style="font-size:14px;line-height:1.7;color:#C3C2B7;padding-left:14px;border-left:2px solid #b5613f;margin-bottom:12px;"><strong style="display:block;font-size:15px;font-weight:700;color:#EFEFEA;margin-bottom:4px;">' + catScores[i].name + '.</strong>' + s + '</p>';
  }).join("");

  var part2OverviewTable = hideScores ? "" : buildOverviewBarTable(catScores.map(function (c) { return { name: c.name, pct: c.pct }; }));
  var part1OverviewTable = hideScores ? "" : buildOverviewBarTable(partOneSections.map(function (s) { return { name: s.name, pct: s.score }; }));

  var overallLineHTML = hideScores ? "" :
    '<div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:' + (TIER_COLOR[overallTier] || "#D97757") + ';">Overall: ' + Math.round(overallPct) + '% &middot; ' + getTierLabel(overallTier) + '</div>';

  var partOneOverallLineHTML = (hideScores || partOneOverallResult.pct == null) ? "" :
    '<div style="font-size:12px;font-weight:600;text-transform:uppercase;letter-spacing:0.1em;color:' + (TIER_COLOR[partOneOverallResult.tier] || "#D97757") + ';margin-bottom:8px;">Overall: ' + Math.round(partOneOverallResult.pct) + '% &middot; ' + getTierLabel(partOneOverallResult.tier) + '</div>';

  var partOneSummaryBlock =
    '<div style="text-align:center;margin-bottom:8px;">' +
      '<div style="' + PART_LABEL_LG + '">Part 1 — Fundamentals</div>' +
      partOneOverallLineHTML +
    '</div>' +
    part1OverviewTable +
    '<div style="margin-bottom:32px;">' + buildPartOneSummaryParagraphs(partOneSections) + '</div>';

  var part2SummaryBlock =
    '<div style="text-align:center;margin-bottom:8px;">' +
      '<div style="' + PART_LABEL_LG + '">Part 2 — Core Skills</div>' +
      overallLineHTML +
    '</div>' +
    part2OverviewTable +
    '<div style="margin-bottom:32px;">' + summaryHTML + '</div>';

  var partOneDetailsBlock =
    '<div style="' + PART_LABEL_SM + '">Part 1 — Fundamentals</div>' +
    buildPartOneDetailCards(partOneSections, hideScores);

  var part2DetailsBlock =
    '<div style="' + PART_LABEL_SM + '">Part 2 — Core Skills</div>' +
    categoryBlocks;

  var divider = '<div style="height:1px;background:#3a3a38;margin:32px 0;"></div>';

  return '<!DOCTYPE html><html><head><meta charset="utf-8" /><meta name="viewport" content="width=device-width, initial-scale=1.0" /><title>Your equipped. Nervous System Assessment Results</title></head><body style="margin:0;padding:0;background:#2C2C2B;font-family:Helvetica Neue,Helvetica,Arial,sans-serif;">' +
    '<div style="max-width:600px;margin:0 auto;padding:32px 20px;">' +
    '<div style="padding:20px 0 24px;border-bottom:1px solid #3a3a38;margin-bottom:32px;"><img src="' + LOGO_URL + '" alt="equipped." width="112" style="height:28px;width:auto;display:block;" /></div>' +
    '<div style="text-align:center;margin-bottom:8px;"><h1 style="color:#f0efea;font-size:24px;font-weight:500;margin:0 0 8px;letter-spacing:-0.02em;">' + userName + ', your current nervous system profile</h1></div>' +
    partOneSummaryBlock +
    divider +
    part2SummaryBlock +
    divider +
    partOneDetailsBlock +
    part2DetailsBlock +
    '<div style="text-align:center;padding:32px 24px;background:#1F1F1E;border:1px solid #3a3a38;border-radius:16px;margin-bottom:24px;"><h2 style="color:#f0efea;font-size:20px;font-weight:500;margin:0 0 12px;letter-spacing:-0.02em;">Ready to train your nervous system?</h2><p style="color:#C3C2B7;line-height:1.7;margin:0 0 20px;font-size:14px;">Whether you are waking up to what is possible or fine tuning an already strong practice, equipped. has sessions, coaching, and programmes designed to move the needle across all of this.</p><a href="https://weareequipped.com" style="display:inline-block;padding:14px 36px;background:#D97757;color:#fff;font-size:15px;font-weight:600;border-radius:10px;text-decoration:none;">Explore equipped.</a></div>' +
    '<div style="text-align:center;padding:16px 0;"><p style="font-size:12px;color:#5c5b54;font-style:italic;margin:0;">This assessment is original to equipped. Grounded in polyvagal theory, somatic experiencing, interoception science, and the window of tolerance model.</p></div>' +
    '</div></body></html>';
}

// Netlify Function handler — CommonJS export, zero dependencies
exports.handler = async function (event) {
  console.log("Function called, method:", event.httpMethod);

  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: JSON.stringify({ error: "Method not allowed" }) };
  }

  try {
    var body = JSON.parse(event.body);
    var name = body.name;
    var email = body.email;
    var answers = body.answers;
    var partOneAnswers = body.partOneAnswers || {};
    var hideScores = !!body.hideScores;

    if (!name || !email || !answers) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing required fields: name, email, answers" }) };
    }

    var apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return { statusCode: 500, body: JSON.stringify({ error: "RESEND_API_KEY not configured" }) };
    }

    // Calculate Part Two scores
    var cats = ["notice", "shift", "expand"];
    var catScores = cats.map(function (catId) {
      var catQs = questionMeta.filter(function (q) { return q.category === catId; });
      var scores = catQs.map(function (q) { return answers[q.id] || 0; });
      var avg = scores.reduce(function (a, b) { return a + b; }, 0) / scores.length;
      var pct = (avg / 10) * 100;
      return { id: catId, name: categoryNames[catId], pct: pct, tier: getTier(pct), questions: catQs };
    });

    var allScores = questionMeta.map(function (q) { return answers[q.id] || 0; });
    var overallAvg = allScores.reduce(function (a, b) { return a + b; }, 0) / allScores.length;
    var overallPct = (overallAvg / 10) * 100;
    var overallTier = getTier(overallPct);

    var summaryLines = generateSummary(catScores[0].pct, catScores[1].pct, catScores[2].pct);

    // Calculate Part One scores
    var partOneSections = buildPartOneSections(partOneAnswers);
    var partOneOverallResult = partOneOverall(partOneSections);

    var html = buildEmailHTML({
      userName: name,
      answers: answers,
      catScores: catScores,
      overallPct: overallPct,
      overallTier: overallTier,
      summaryLines: summaryLines,
      hideScores: hideScores,
      partOneSections: partOneSections,
      partOneOverallResult: partOneOverallResult,
    });

    // Call Resend REST API directly
    var response = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Authorization": "Bearer " + apiKey,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from: "equipped. <hello@equipped.to>",
        to: [email],
        subject: name + ", your equipped. Nervous System Assessment results",
        html: html,
      }),
    });

    var result = await response.json();

    if (!response.ok) {
      console.error("Resend API error:", response.status, result);
      return { statusCode: 500, body: JSON.stringify({ error: "Resend API error: " + (result.message || response.status) }) };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, emailId: result.id }),
    };

  } catch (err) {
    console.error("Function error:", err);
    return { statusCode: 500, body: JSON.stringify({ error: err.message || "Internal server error" }) };
  }
};
