import { useMemo } from 'react';
import { categories, questions } from '../data/questions';
import { getTier, getTierLabel, tierDescriptions } from '../data/tiers';
import ScoreRing, { tierColor } from './ScoreRing';
import PolygonChart from './PolygonChart';
import { PartOneHero, PartOneDetails, getPartOneOverallPct } from './PartOneSummary';
import ContactForm from './ContactForm';

/* Tier colour by raw 1-10 value: <4 grey, 4-8 yellow, >8 orange */
function tierColorValue(v) {
  if (!v || v < 4) return '#8a8980';
  if (v <= 8) return '#D9B557';
  return '#D97757';
}

/* ── Summary Generator ── */
function generateSummary(noticePct, shiftPct, expandPct) {
  const noticeS = {
    wakingUp: "Your awareness of internal signals is still developing. You tend to notice what's happening in your body only after it's already loud. Notice is the fastest skill to build because it only requires one thing: attention.",
    building: "You're building real body awareness. Some days you catch the signals early, other days they slip past you. The gap between your best and worst days of noticing is your opportunity.",
    equipped: "Your interoceptive awareness is strong. You read your body's signals in real time, catching shifts before they build. The question now is depth and subtlety.",
  };
  const shiftS = {
    wakingUp: "When your state shifts, you don't yet have reliable tools to move through it. Your system tends to get stuck. Learning even one reliable tool changes everything.",
    building: "You have tools that work on good days, but under real pressure they can disappear. The opportunity is making them available in the moments that actually matter.",
    equipped: "You move between states deliberately. You regulate without external crutches and perform under pressure. The question now is range and speed.",
  };
  const expandS = {
    wakingUp: "Your world is shaped more by default than by design. The conditions for expansion haven't been set up yet, and even small changes here produce enormous returns.",
    building: "You're growing, but unevenly. The areas you score lowest in are almost certainly the ones that would unlock the most growth.",
    equipped: "You actively expand your capacity on all fronts. You design your environment, seek discomfort deliberately, and feed your nervous system what it needs.",
  };

  return [noticeS[getTier(noticePct)], shiftS[getTier(shiftPct)], expandS[getTier(expandPct)]];
}

/* ── Results Page ── */
export default function Results({ answers, userName, userEmail, hideScores, partOneAnswers }) {
  const catScores = useMemo(() => {
    return categories.map(cat => {
      const catQs = questions.filter(q => q.category === cat.id);
      const scores = catQs.map(q => answers[q.id] || 0);
      const avg = scores.reduce((a, b) => a + b, 0) / scores.length;
      const pct = (avg / 10) * 100;
      return { ...cat, pct, tier: getTier(pct), questions: catQs };
    });
  }, [answers]);

  const overallAvg = questions.map(q => answers[q.id] || 0).reduce((a, b) => a + b, 0) / questions.length;
  const overallPct = (overallAvg / 10) * 100;
  const overallTier = getTier(overallPct);

  const noticePct = catScores[0].pct;
  const shiftPct = catScores[1].pct;
  const expandPct = catScores[2].pct;

  const summaryLines = generateSummary(noticePct, shiftPct, expandPct);

  return (
    <div className="eq-res">
      <h2 className="eq-main-greeting">{userName ? `${userName}, your` : "Your"} current nervous system profile</h2>

      {/* Part 1 summary: chart + short paragraphs */}
      <PartOneHero partOneAnswers={partOneAnswers} hideScores={hideScores} />

      <div className="eq-div" />

      {/* Part 2 summary: chart + short paragraphs */}
      <div className="eq-hero">
        <div className="eq-part-label eq-part-label-lg">Part 2 — Core Skills</div>
        {!hideScores && (
          <>
            <div className="eq-hero-tier eq-hero-tier-lg" style={{ color: tierColor(overallPct) }}>Overall: {Math.round(overallPct)}% · {getTierLabel(overallTier)}</div>
            <div className="eq-tri-wrap">
              <PolygonChart dimensions={[
                { name: 'Notice', pct: noticePct },
                { name: 'Shift', pct: shiftPct },
                { name: 'Expand', pct: expandPct },
              ]} />
            </div>
          </>
        )}
        <div className="eq-summary">
          {summaryLines.map((s, i) => (
            <p key={i}><strong className="eq-summary-cat">{categories[i].name}.</strong> {s}</p>
          ))}
        </div>
      </div>

      <div className="eq-div" />

      {/* Part 1 answers */}
      <PartOneDetails partOneAnswers={partOneAnswers} hideScores={hideScores} />

      {/* Part 2 answers */}
      <div className="eq-part-label">Part 2 — Core Skills</div>
      <div className="eq-rcs">
        {catScores.map((cat, i) => {
          const desc = tierDescriptions[cat.id][cat.tier];
          return (
            <div key={cat.id} className="eq-cr">
              {!hideScores && (
                <div className="eq-crh">
                  <ScoreRing percentage={cat.pct} label={cat.name} tier={cat.tier} />
                </div>
              )}
              <h3 className="eq-cr-title">{cat.name}</h3>
              <p className="eq-cr-lead">{summaryLines[i]}</p>
              <p className="eq-crd">{desc}</p>
              <div className="eq-crq">
                <h4>Your responses</h4>
                <div className="eq-rg">
                  {cat.questions.map(q => {
                    const v = answers[q.id] || 0;
                    const c = tierColorValue(v);
                    return (
                      <div key={q.id} className="eq-ri">
                        <span className="eq-ril">{q.id}. {q.title}</span>
                        <div className="eq-rbc">
                          <div className="eq-rb" style={{ width: `${(v / 10) * 100}%`, background: c }} />
                        </div>
                        <span className="eq-rval" style={{ color: c }}>{v}</span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="eq-cta">
        <h3>Ready to train your nervous system?</h3>
        <p>Whether you're waking up to what's possible or fine tuning an already strong practice, equipped. has sessions, coaching, and programmes designed to move the needle across all of this. Tell us a bit about what you're looking for and we'll be in touch.</p>
        <ContactForm userName={userName} userEmail={userEmail} part1Pct={getPartOneOverallPct(partOneAnswers)} part2Pct={overallPct} />
      </div>

      <div className="eq-rftr">
        <p>This assessment is original to equipped. Grounded in polyvagal theory, somatic experiencing, interoception science, and the window of tolerance model.</p>
      </div>
    </div>
  );
}
