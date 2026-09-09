import { useState } from 'react';
import RulerSlider from './RulerSlider';
import { frequencyLabel } from '../data/partOneScoring';

const DEFAULTS = {
  frequency: null,
  strength: null,
  endurance: null,
  coordination: null,
  mobility: null,
  sedentaryHrs: null,
  injuryProneness: null,
  notes: '',
};

const SPLIT_DIMENSIONS = [
  { key: 'strength', label: 'Strength' },
  { key: 'endurance', label: 'Endurance' },
  { key: 'coordination', label: 'Coordination' },
  { key: 'mobility', label: 'Mobility / Flexibility' },
];

export default function MovementSection({ value, onChange, onNext, onBack }) {
  const [state, setState] = useState({ ...DEFAULTS, ...value });

  const update = (patch) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      onChange(next);
      return next;
    });
  };

  const canContinue =
    state.frequency != null &&
    SPLIT_DIMENSIONS.every((d) => state[d.key] != null) &&
    state.sedentaryHrs != null &&
    state.injuryProneness != null;

  return (
    <div className="eq-qs eq-fi">
      <div className="eq-qc">
        <div className="eq-qid">Movement</div>

        <div className="eq-fb">
          <p className="eq-qsub">Frequency</p>
          <p className="eq-qt">How often do you move your body with intention — training, sport, deliberate exercise?</p>
          <RulerSlider
            value={state.frequency}
            onChange={(v) => update({ frequency: v })}
            min={0} max={10} step={1}
            anchorLow="None" anchorHigh="Multiple times a day"
            formatValue={frequencyLabel}
            ariaLabel="How often you move your body with intention"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Split</p>
          <p className="eq-qt">How much of your movement time goes toward each? Rate each on its own — they don't need to add up to anything.</p>
          <div className="eq-split-block">
            {SPLIT_DIMENSIONS.map((d) => (
              <div key={d.key} className="eq-split-row">
                <div className="eq-split-head">
                  <span className="eq-split-label">{d.label}</span>
                  <span className="eq-split-val">{state[d.key] ?? '—'}</span>
                </div>
                <input
                  type="range"
                  min={0} max={10} step={1}
                  value={state[d.key] ?? 0}
                  onChange={(e) => update({ [d.key]: parseInt(e.target.value, 10) })}
                  className="eq-sl eq-sl-sm"
                  style={{ '--eq-sl-pct': `${((state[d.key] ?? 0) / 10) * 100}%` }}
                  aria-label={`How much of your movement time goes toward ${d.label}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Sedentary Time</p>
          <p className="eq-qt">On a typical day, how many hours do you spend mostly sitting or still?</p>
          <RulerSlider
            value={state.sedentaryHrs}
            onChange={(v) => update({ sedentaryHrs: v })}
            min={0} max={10} step={0.5}
            anchorLow="0 hrs" anchorHigh="10+ hrs"
            formatValue={(v) => (v >= 10 ? '10+ hrs' : `${v} hrs`)}
            ticks={false}
            tierColoring={false}
            ariaLabel="Hours per day spent mostly sitting or still"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Injury Proneness</p>
          <p className="eq-qt">How prone are you to injury?</p>
          <RulerSlider
            value={state.injuryProneness}
            onChange={(v) => update({ injuryProneness: v })}
            min={0} max={10} step={1}
            anchorLow="Rarely / never injured" anchorHigh="Very prone / frequently injured"
            tierColoring={false}
            ariaLabel="How prone you are to injury"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Anything else?</p>
          <textarea
            className="eq-ta"
            value={state.notes}
            onChange={(e) => update({ notes: e.target.value })}
            placeholder="Current injuries, chronic pain, mobility restrictions, or anything else worth noting…"
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
