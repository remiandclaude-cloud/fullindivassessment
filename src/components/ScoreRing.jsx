import { useState, useEffect } from 'react';
import { getTierLabel } from '../data/tiers';

/* Tier colour by percentage: <40 grey, 40-80 yellow, >80 orange */
export function tierColor(pct) {
  if (pct < 40) return '#8a8980';
  if (pct <= 80) return '#D9B557';
  return '#D97757';
}

export default function ScoreRing({ percentage, label, tier }) {
  const r = 42, circ = 2 * Math.PI * r;
  const [offset, setOffset] = useState(circ);
  useEffect(() => {
    const t = setTimeout(() => setOffset(circ - (percentage / 100) * circ), 100);
    return () => clearTimeout(t);
  }, [percentage, circ]);

  const col = tierColor(percentage);

  return (
    <div className="eq-sr">
      <svg className="eq-ring" viewBox="0 0 96 96">
        <circle className="eq-rbg" cx="48" cy="48" r={r} strokeWidth="6" fill="none" />
        <circle cx="48" cy="48" r={r} strokeWidth="6" fill="none"
          stroke={col}
          strokeDasharray={circ} strokeDashoffset={offset} strokeLinecap="round"
          transform="rotate(-90 48 48)"
          style={{ transition: "stroke-dashoffset 1.2s ease-out, stroke 0.3s" }} />
        <text x="48" y="44" className="eq-rv" textAnchor="middle">{Math.round(percentage)}%</text>
        <text x="48" y="59" textAnchor="middle" fill={col} fontSize="8.5" fontWeight="600" fontFamily="Inter, sans-serif" style={{ textTransform:'uppercase', letterSpacing:'0.1em' }}>{getTierLabel(tier)}</text>
      </svg>
      <span className="eq-rl">{label}</span>
    </div>
  );
}
