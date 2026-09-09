import { useState, useEffect } from 'react';
import { tierColor } from './ScoreRing';

/* Split a long label into up to 2 lines at the nearest word boundary,
 * so it doesn't overflow the chart canvas at tight vertex positions. */
function wrapLabel(name) {
  if (name.length <= 10) return [name];
  const words = name.split(' ');
  let line1 = '', i = 0;
  while (i < words.length && (line1 + words[i]).length <= name.length / 2 + 2) {
    line1 += (line1 ? ' ' : '') + words[i];
    i++;
  }
  const line2 = words.slice(i).join(' ');
  return line2 ? [line1, line2] : [line1];
}

/* Generalized triangle/pentagon/etc. radar chart. dimensions: [{ name, pct }] */
export default function PolygonChart({ dimensions }) {
  const n = dimensions.length;
  const isCompact = n > 4;
  const cx = 220, cy = 210;
  const R = isCompact ? 90 : 140;
  const angles = dimensions.map((_, i) => -Math.PI / 2 - i * (2 * Math.PI / n));
  const vertices = angles.map((a) => ({ x: cx + R * Math.cos(a), y: cy + R * Math.sin(a) }));

  const gridLevels = [0.33, 0.66, 1.0];
  const gridPaths = gridLevels.map((level) => {
    const pts = angles.map((a) => `${cx + R * level * Math.cos(a)},${cy + R * level * Math.sin(a)}`);
    return `M${pts.join("L")}Z`;
  });

  const values = dimensions.map((d) => d.pct / 100);

  const labelOffset = isCompact ? 46 : 44;
  const fontSize = isCompact ? 16 : 28;
  const pctFontSize = isCompact ? 15 : 26;
  const lineHeight = fontSize * 1.15;

  const labels = dimensions.map((d, i) => {
    const cosA = Math.cos(angles[i]);
    let anchor = "middle";
    if (isCompact) {
      if (cosA > 0.7) anchor = "start";
      else if (cosA < -0.7) anchor = "end";
    }
    return {
      name: d.name,
      pct: d.pct,
      x: cx + (R + labelOffset + 10) * cosA,
      y: cy + (R + labelOffset) * Math.sin(angles[i]),
      anchor,
      lines: isCompact ? wrapLabel(d.name) : [d.name],
    };
  });

  const [animValues, setAnimValues] = useState(dimensions.map(() => 0));
  useEffect(() => {
    const t = setTimeout(() => setAnimValues(values), 150);
    return () => clearTimeout(t);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...dimensions.map((d) => d.pct)]);

  const animPts = angles.map((a, i) => ({
    x: cx + R * (animValues[i] || 0) * Math.cos(a),
    y: cy + R * (animValues[i] || 0) * Math.sin(a),
  }));
  const animPath = `M${animPts.map((p) => `${p.x},${p.y}`).join("L")}Z`;

  return (
    <svg viewBox="0 0 440 430" style={{ width: "100%", maxWidth: 440, height: "auto" }}>
      {vertices.map((v, i) => (
        <line key={i} x1={cx} y1={cy} x2={v.x} y2={v.y} stroke="#2C2C2B" strokeWidth="1" />
      ))}
      {gridPaths.map((d, i) => (
        <path key={i} d={d} fill="none" stroke="#2C2C2B" strokeWidth="1" />
      ))}
      <path d={animPath} fill="rgba(217,119,87,0.10)" stroke="#C3C2B7" strokeWidth="2"
        style={{ transition: "d 1s ease-out" }} />
      {animPts.map((p, i) => {
        const c = tierColor(dimensions[i].pct);
        return (
          <circle key={i} cx={p.x} cy={p.y} r="8" fill={c} stroke="#141413" strokeWidth="2"
            style={{ transition: "cx 1s ease-out, cy 1s ease-out" }} />
        );
      })}
      {labels.map((l, i) => (
        <g key={i}>
          <text x={l.x} y={l.y} textAnchor={l.anchor} fill="#f0efea" fontSize={fontSize} fontWeight="600" fontFamily="Inter, sans-serif">
            {l.lines.map((line, li) => (
              <tspan key={li} x={l.x} dy={li === 0 ? 0 : lineHeight}>{line}</tspan>
            ))}
          </text>
          <text x={l.x} y={l.y + (l.lines.length - 1) * lineHeight + (isCompact ? 24 : 30)} textAnchor={l.anchor} fill={tierColor(l.pct)} fontSize={pctFontSize} fontWeight="600" fontFamily="Inter, sans-serif">{Math.round(l.pct)}%</text>
        </g>
      ))}
    </svg>
  );
}
