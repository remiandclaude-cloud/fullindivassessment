/* Transition screen shown after all 5 Part One sections are complete,
 * before starting Part Two. */
export default function PartOneStub({ sleepScore, movementScore, nutritionScore, socialScore, dataContentScore, onContinuePart2 }) {
  const scores = [
    ['Sleep', sleepScore],
    ['Movement', movementScore],
    ['Nutrition', nutritionScore],
    ['Social', socialScore],
    ['Data & Content', dataContentScore],
  ];
  return (
    <div className="eq-welcome">
      <div className="eq-wc">
        <div className="eq-badge">Part 1 Complete</div>
        <h1 style={{ fontSize: '1.6rem' }}>
          {scores.map(([label, score], i) => (
            <span key={label}>
              {i > 0 && ' · '}
              {label} <span className="eq-accent">{score != null ? `${score}%` : '—'}</span>
            </span>
          ))}
        </h1>
        <p className="eq-wsub">That's your nervous system foundations mapped. Now for Part 2 — Core Skills.</p>
        <button className="eq-btn" onClick={onContinuePart2}>Continue to Part 2 →</button>
      </div>
    </div>
  );
}
