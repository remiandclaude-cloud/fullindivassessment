import { useState } from 'react';
import RulerSlider from './RulerSlider';
import {
  LIGHT_NATURE_SOURCES, morningLightLabel, daylightLabel, wildNatureLabel, urbanNatureLabel,
} from '../data/partOneScoring';

const DEFAULTS = {
  morningLightDays: null,
  daylightHrs: null,
  wildNaturePerQuarter: null,
  urbanNaturePerWeek: null,
  sources: [],
  notes: '',
};

export default function LightNatureSection({ value, onChange, onNext, onBack }) {
  const [state, setState] = useState({ ...DEFAULTS, ...value });

  const update = (patch) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      onChange(next);
      return next;
    });
  };

  const toggleSource = (key) => {
    const has = state.sources.includes(key);
    update({ sources: has ? state.sources.filter((k) => k !== key) : [...state.sources, key] });
  };

  const noneActive = state.sources.length === 0;

  const canContinue =
    state.morningLightDays != null &&
    state.daylightHrs != null &&
    state.wildNaturePerQuarter != null &&
    state.urbanNaturePerWeek != null;

  return (
    <div className="eq-qs eq-fi">
      <div className="eq-qc">
        <div className="eq-qid">Light &amp; Nature</div>

        <div className="eq-fb">
          <p className="eq-qsub">Morning Light</p>
          <p className="eq-qt">On how many days a week do you get direct daylight within an hour or two of waking?</p>
          <RulerSlider
            value={state.morningLightDays}
            onChange={(v) => update({ morningLightDays: v })}
            min={0} max={7} step={1}
            anchorLow="Never" anchorHigh="Every day"
            formatValue={morningLightLabel}
            ariaLabel="Days a week you get morning daylight"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Daylight</p>
          <p className="eq-qt">On a typical day, how long are you outdoors in daylight?</p>
          <RulerSlider
            value={state.daylightHrs}
            onChange={(v) => update({ daylightHrs: v })}
            min={0} max={3} step={0.5}
            anchorLow="None" anchorHigh="3+ hrs"
            formatValue={daylightLabel}
            ariaLabel="Hours outdoors in daylight on a typical day"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Wild Nature</p>
          <p className="eq-qt">Over a typical quarter (three months), how many times do you spend time in wild or remote nature — forest, coast, mountains, open countryside?</p>
          <RulerSlider
            value={state.wildNaturePerQuarter}
            onChange={(v) => update({ wildNaturePerQuarter: v })}
            min={0} max={10} step={1}
            anchorLow="Not at all" anchorHigh="10+ times"
            formatValue={wildNatureLabel}
            ariaLabel="Times per quarter in wild or remote nature"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Urban Nature</p>
          <p className="eq-qt">In a typical week, how often do you spend time in green space in or near the city — parks, tree-lined streets, gardens, a river or waterfront?</p>
          <RulerSlider
            value={state.urbanNaturePerWeek}
            onChange={(v) => update({ urbanNaturePerWeek: v })}
            min={0} max={7} step={1}
            anchorLow="Never" anchorHigh="Every day"
            formatValue={urbanNatureLabel}
            ariaLabel="Times per week in urban green space"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">How You Get It</p>
          <p className="eq-qt">Where does most of your time outside come from?</p>
          <div className="eq-chips">
            {LIGHT_NATURE_SOURCES.map((s) => (
              <button
                key={s.key}
                type="button"
                className={`eq-chip ${state.sources.includes(s.key) ? 'active' : ''}`}
                onClick={() => toggleSource(s.key)}
              >
                {s.label}
              </button>
            ))}
            <button
              type="button"
              className={`eq-chip ${noneActive ? 'active' : ''}`}
              onClick={() => update({ sources: [] })}
            >
              None
            </button>
          </div>
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Anything else?</p>
          <textarea
            className="eq-ta"
            value={state.notes}
            onChange={(e) => update({ notes: e.target.value })}
            placeholder="Seasonal changes, limited access to green space, light sensitivity, or anything else worth noting…"
            rows={3}
          />
        </div>

        <div className="eq-nav">
          {onBack && <button className="eq-btn-s" onClick={onBack}>Back</button>}
          <button className="eq-btn" onClick={onNext} disabled={!canContinue}>Continue</button>
        </div>
      </div>
    </div>
  );
}
