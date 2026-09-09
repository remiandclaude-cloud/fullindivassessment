function tierVars(value, min, max) {
  if (value == null) return {};
  const pct = (value - min) / (max - min);
  if (pct < 0.33) return { '--eq-tier-color': 'var(--tier-low)', '--eq-tier-glow': 'var(--tier-low-gs)' };
  if (pct <= 0.66) return { '--eq-tier-color': 'var(--tier-mid)', '--eq-tier-glow': 'var(--tier-mid-gs)' };
  return { '--eq-tier-color': 'var(--tier-high)', '--eq-tier-glow': 'var(--tier-high-gs)' };
}

/* Generic 0-10-style ruler used across Part One sections. */
export default function RulerSlider({
  value, onChange, min = 1, max = 10, step = 1,
  anchorLow, anchorHigh, formatValue, ticks = true, tierColoring = true, ariaLabel,
}) {
  const display = value == null ? '—' : (formatValue ? formatValue(value) : value);
  const pct = value == null ? 0 : ((value - min) / (max - min)) * 100;

  const tickValues = [];
  if (ticks) {
    const count = Math.round((max - min) / step);
    if (count <= 12) {
      for (let i = 0; i <= count; i++) tickValues.push(min + i * step);
    }
  }

  return (
    <div className="eq-sc" style={tierColoring ? tierVars(value, min, max) : {}}>
      <div className="eq-slv">{display}</div>
      <div className="eq-slw">
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={value ?? min}
          onChange={(e) => onChange(parseFloat(e.target.value))}
          className="eq-sl"
          style={{ '--eq-sl-pct': `${pct}%` }}
          aria-label={ariaLabel}
        />
        {tickValues.length > 0 && (
          <div className="eq-slt">
            {tickValues.map((n) => (
              <span key={n} className={`eq-slti ${value != null && n <= value ? 'active' : ''}`}>
                {Number.isInteger(n) ? n : n.toFixed(1)}
              </span>
            ))}
          </div>
        )}
      </div>
      {(anchorLow || anchorHigh) && (
        <div className="eq-sls"><span>{anchorLow}</span><span>{anchorHigh}</span></div>
      )}
    </div>
  );
}
