import { useState } from 'react';
import RulerSlider from './RulerSlider';
import { frequencyLabel, RELATIONSHIP_TYPES } from '../data/partOneScoring';

const DEFAULTS = {
  socialFrequency: null,
  supportCircleSize: null,
  depth: null,
  circleSatisfaction: null,
  relationshipTypes: [],
  notes: '',
};

export default function SocialSection({ value, onChange, onNext, onBack }) {
  const [state, setState] = useState({ ...DEFAULTS, ...value });

  const update = (patch) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      onChange(next);
      return next;
    });
  };

  const toggleType = (key) => {
    const has = state.relationshipTypes.includes(key);
    update({ relationshipTypes: has ? state.relationshipTypes.filter((k) => k !== key) : [...state.relationshipTypes, key] });
  };

  const noneActive = state.relationshipTypes.length === 0;

  const canContinue =
    state.socialFrequency != null &&
    state.supportCircleSize != null &&
    state.depth != null &&
    state.circleSatisfaction != null;

  return (
    <div className="eq-qs eq-fi">
      <div className="eq-qc">
        <div className="eq-qid">Social</div>

        <div className="eq-fb">
          <p className="eq-qsub">Frequency</p>
          <p className="eq-qt">How often do you interact with people outside of a work context — not colleagues, employees, clients, or business partners?</p>
          <RulerSlider
            value={state.socialFrequency}
            onChange={(v) => update({ socialFrequency: v })}
            min={0} max={10} step={1}
            anchorLow="None" anchorHigh="Multiple times a day"
            formatValue={frequencyLabel}
            ariaLabel="How often you interact with people outside of a work context"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Support Circle</p>
          <p className="eq-qt">How many people could you call right now who would pick up?</p>
          <RulerSlider
            value={state.supportCircleSize}
            onChange={(v) => update({ supportCircleSize: v })}
            min={0} max={10} step={1}
            anchorLow="0 people" anchorHigh="10+ people"
            formatValue={(v) => (v >= 10 ? '10+ people' : `${v} ${v === 1 ? 'person' : 'people'}`)}
            ariaLabel="How many people would pick up if you called"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Depth</p>
          <p className="eq-qt">When you talk with the people close to you, how often does it go beyond surface-level small talk?</p>
          <RulerSlider
            value={state.depth}
            onChange={(v) => update({ depth: v })}
            min={0} max={10} step={1}
            anchorLow="Rarely / small talk only" anchorHigh="Regularly / real depth"
            ariaLabel="How often your conversations go beyond small talk"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Circle Satisfaction</p>
          <p className="eq-qt">"We're the average of the 5 people we spend the most time with." How satisfied are you that yours are who you want to become more like?</p>
          <RulerSlider
            value={state.circleSatisfaction}
            onChange={(v) => update({ circleSatisfaction: v })}
            min={0} max={10} step={1}
            anchorLow="Not who I want to become" anchorHigh="Exactly who I want to become"
            ariaLabel="Satisfaction with who you spend the most time with"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Relationship Types</p>
          <p className="eq-qt">Which of these do you currently have in your life?</p>
          <div className="eq-chips">
            {RELATIONSHIP_TYPES.map((t) => (
              <button
                key={t.key}
                type="button"
                className={`eq-chip ${state.relationshipTypes.includes(t.key) ? 'active' : ''}`}
                onClick={() => toggleType(t.key)}
              >
                {t.label}
              </button>
            ))}
            <button
              type="button"
              className={`eq-chip ${noneActive ? 'active' : ''}`}
              onClick={() => update({ relationshipTypes: [] })}
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
            placeholder="Recent changes to your social circle, loneliness, conflict, or anything else worth noting…"
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
