/* Temporary placeholder shown once all 5 Part One sections are complete,
 * until the real aggregate Part One results page is built. Lets us
 * validate scores and jump into Part 2 for testing. */
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
        <div className="eq-badge">Part 1 Complete — All 5 Sections</div>
        <h1 style={{ fontSize: '1.6rem' }}>
          {scores.map(([label, score], i) => (
            <span key={label}>
              {i > 0 && ' · '}
              {label} <span className="eq-accent">{score != null ? `${score}%` : '—'}</span>
            </span>
          ))}
        </h1>
        <p className="eq-wsub">This is a placeholder — Part 1's real results page (a unified profile like Part 2's) isn't built yet. For now, here's Part 2.</p>
        <button className="eq-btn" onClick={onContinuePart2}>Preview Part 2 →</button>
      </div>
    </div>
  );
}
