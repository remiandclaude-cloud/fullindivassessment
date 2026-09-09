import { useState } from 'react';
import RulerSlider from './RulerSlider';

const DEFAULTS = {
  durationHrs: null,
  difficultyFallingAsleep: false,
  difficultyStayingAsleep: false,
  wakeQuality: null,
  notes: '',
};

export default function SleepSection({ value, onChange, onNext, onBack }) {
  const [state, setState] = useState({ ...DEFAULTS, ...value });

  const update = (patch) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      onChange(next);
      return next;
    });
  };

  const noneActive = !state.difficultyFallingAsleep && !state.difficultyStayingAsleep;
  const canContinue = state.durationHrs != null && state.wakeQuality != null;

  return (
    <div className="eq-qs eq-fi">
      <div className="eq-qc">
        <div className="eq-qid">Sleep</div>

        <div className="eq-fb">
          <p className="eq-qsub">Duration</p>
          <p className="eq-qt">How many hours do you sleep, on average, per night?</p>
          <RulerSlider
            value={state.durationHrs}
            onChange={(v) => update({ durationHrs: v })}
            min={0} max={10} step={0.5}
            anchorLow="0 hrs" anchorHigh="10+ hrs"
            formatValue={(v) => (v >= 10 ? '10+ hrs' : `${v} hrs`)}
            ticks={false}
            tierColoring={false}
            ariaLabel="Average hours of sleep per night"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Continuity</p>
          <p className="eq-qt">Do you have trouble falling asleep, staying asleep, or both?</p>
          <div className="eq-chips">
            <button
              type="button"
              className={`eq-chip ${state.difficultyFallingAsleep ? 'active' : ''}`}
              onClick={() => update({ difficultyFallingAsleep: !state.difficultyFallingAsleep })}
            >
              Trouble falling asleep
            </button>
            <button
              type="button"
              className={`eq-chip ${state.difficultyStayingAsleep ? 'active' : ''}`}
              onClick={() => update({ difficultyStayingAsleep: !state.difficultyStayingAsleep })}
            >
              Trouble staying asleep
            </button>
            <button
              type="button"
              className={`eq-chip ${noneActive ? 'active' : ''}`}
              onClick={() => update({ difficultyFallingAsleep: false, difficultyStayingAsleep: false })}
            >
              None
            </button>
          </div>
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Wake Quality</p>
          <p className="eq-qt">How rested do you feel when you wake up?</p>
          <RulerSlider
            value={state.wakeQuality}
            onChange={(v) => update({ wakeQuality: v })}
            min={1} max={10} step={1}
            anchorLow="Exhausted" anchorHigh="Fully rested"
            ariaLabel="How rested you feel on waking"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Anything else?</p>
          <textarea
            className="eq-ta"
            value={state.notes}
            onChange={(e) => update({ notes: e.target.value })}
            placeholder="Nightmares, night terrors, sleep apnea, snoring, restless legs, or anything else worth noting…"
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
