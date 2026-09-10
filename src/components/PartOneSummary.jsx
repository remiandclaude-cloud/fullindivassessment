import { useMemo } from 'react';
import ScoreRing, { tierColor } from './ScoreRing';
import PolygonChart from './PolygonChart';
import { getTier, getTierLabel } from '../data/tiers';
import { partOneTierSummaries } from '../data/partOneTiers';
import {
  scoreSleep, scoreMovement, scoreNutrition, scoreSocial, scoreDataContent,
  frequencyLabel, RELATIONSHIP_TYPES, CONTENT_FORMATS, CONTENT_THEMES,
} from '../data/partOneScoring';

function labelsFor(keys, options) {
  const list = (keys || []).map((k) => options.find((o) => o.key === k)?.label).filter(Boolean);
  return list.length ? list.join(', ') : 'None';
}

function sleepSummary(a) {
  const continuity = [];
  if (a?.difficultyFallingAsleep) continuity.push('Trouble falling asleep');
  if (a?.difficultyStayingAsleep) continuity.push('Trouble staying asleep');
  return [
    { label: 'Duration', value: a?.durationHrs != null ? `${a.durationHrs} hrs` : '—' },
    { label: 'Continuity', value: continuity.length ? continuity.join(', ') : 'None' },
    { label: 'Wake quality', value: a?.wakeQuality != null ? `${a.wakeQuality}/10` : '—' },
  ];
}

function movementSummary(a) {
  return [
    { label: 'Frequency', value: frequencyLabel(a?.frequency) || '—' },
    { label: 'Split', value: `Strength ${a?.strength ?? '—'} · Endurance ${a?.endurance ?? '—'} · Coordination ${a?.coordination ?? '—'} · Mobility ${a?.mobility ?? '—'}` },
    { label: 'Sedentary time', value: a?.sedentaryHrs != null ? `${a.sedentaryHrs} hrs/day` : '—' },
    { label: 'Injury proneness', value: a?.injuryProneness != null ? `${a.injuryProneness}/10` : '—' },
  ];
}

function nutritionSummary(a) {
  return [
    { label: 'Hydration', value: a?.hydrationLitres != null ? `${a.hydrationLitres} L` : '—' },
    { label: 'Protein', value: a?.proteinGrams != null ? `${a.proteinGrams} g` : '—' },
    { label: 'Alcohol', value: a?.alcoholDrinksPerWeek != null ? `${a.alcoholDrinksPerWeek}/week` : '—' },
    { label: 'Caffeine', value: a?.caffeineCupsPerDay != null ? `${a.caffeineCupsPerDay}/day` : '—' },
    { label: 'Sugar & processed food', value: frequencyLabel(a?.processedFoodFrequency) || '—' },
    { label: 'Other stimulants', value: frequencyLabel(a?.stimulantFrequency) || '—' },
  ];
}

function socialSummary(a) {
  return [
    { label: 'Frequency', value: frequencyLabel(a?.socialFrequency) || '—' },
    { label: 'Support circle', value: a?.supportCircleSize != null ? `${a.supportCircleSize} people` : '—' },
    { label: 'Depth', value: a?.depth != null ? `${a.depth}/10` : '—' },
    { label: 'Circle satisfaction', value: a?.circleSatisfaction != null ? `${a.circleSatisfaction}/10` : '—' },
    { label: 'Relationship types', value: labelsFor(a?.relationshipTypes, RELATIONSHIP_TYPES) },
  ];
}

function dataContentSummary(a) {
  return [
    { label: 'Screen time', value: a?.screenTimeHours != null ? `${a.screenTimeHours} hrs/day` : '—' },
    { label: 'Format', value: labelsFor(a?.contentFormats, CONTENT_FORMATS) },
    { label: 'Theme', value: labelsFor(a?.contentThemes, CONTENT_THEMES) },
    { label: 'Actionability', value: a?.actionability != null ? `${a.actionability}/10` : '—' },
    { label: 'Catastrophizing', value: a?.catastrophizing != null ? `${a.catastrophizing}/10` : '—' },
  ];
}

function buildSections(pa) {
  return [
    { id: 'sleep', name: 'Sleep', score: scoreSleep(pa.sleep), summary: sleepSummary(pa.sleep) },
    { id: 'movement', name: 'Movement', score: scoreMovement(pa.movement), summary: movementSummary(pa.movement) },
    { id: 'nutrition', name: 'Nutrition', score: scoreNutrition(pa.nutrition), summary: nutritionSummary(pa.nutrition) },
    { id: 'social', name: 'Social', score: scoreSocial(pa.social), summary: socialSummary(pa.social) },
    { id: 'dataContent', name: 'Data & Content', score: scoreDataContent(pa.dataContent), summary: dataContentSummary(pa.dataContent) },
  ];
}

export function getPartOneOverallPct(partOneAnswers) {
  return overallOf(buildSections(partOneAnswers || {})).pct;
}

function overallOf(sections) {
  const scored = sections.filter((s) => s.score != null);
  if (!scored.length) return { pct: null, tier: null };
  const pct = scored.reduce((sum, s) => sum + s.score, 0) / scored.length;
  return { pct, tier: getTier(pct) };
}

/* Chart + short paragraphs — the "summary" half */
export function PartOneHero({ partOneAnswers, hideScores }) {
  const pa = partOneAnswers || {};
  const sections = useMemo(() => buildSections(pa), [pa]);
  const { pct: overallPct, tier: overallTier } = overallOf(sections);

  return (
    <div className="eq-hero">
      <div className="eq-part-label eq-part-label-lg">Part 1 — Foundations</div>
      {!hideScores && overallPct != null && (
        <>
          <div className="eq-hero-tier eq-hero-tier-lg" style={{ color: tierColor(overallPct) }}>
            Overall: {Math.round(overallPct)}% · {getTierLabel(overallTier)}
          </div>
          <div className="eq-tri-wrap">
            <PolygonChart dimensions={sections.map((s) => ({ name: s.name, pct: s.score ?? 0 }))} />
          </div>
        </>
      )}
      <div className="eq-summary">
        {sections.map((s) => (
          <p key={s.id}>
            <strong className="eq-summary-cat">{s.name}.</strong>{' '}
            {s.score != null ? partOneTierSummaries[s.id][getTier(s.score)] : 'Not yet completed.'}
          </p>
        ))}
      </div>
    </div>
  );
}

/* Score rings + raw answers — the "details" half */
export function PartOneDetails({ partOneAnswers, hideScores }) {
  const pa = partOneAnswers || {};
  const sections = useMemo(() => buildSections(pa), [pa]);

  return (
    <>
      <div className="eq-part-label">Part 1 — Foundations</div>
      <div className="eq-p1-cards">
        {sections.map((s) => (
          <div key={s.id} className="eq-cr">
            {!hideScores && s.score != null && (
              <div className="eq-crh">
                <ScoreRing percentage={s.score} label={s.name} tier={getTier(s.score)} />
              </div>
            )}
            <h3 className="eq-cr-title">{s.name}</h3>
            <div className="eq-p1-list">
              {s.summary.map((row) => (
                <div key={row.label} className="eq-p1-row">
                  <span className="eq-p1-rl">{row.label}</span>
                  <span className="eq-p1-rv">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
