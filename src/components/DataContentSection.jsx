import { useState } from 'react';
import RulerSlider from './RulerSlider';
import { CONTENT_FORMATS, CONTENT_THEMES } from '../data/partOneScoring';

const DEFAULTS = {
  screenTimeHours: null,
  contentFormats: [],
  contentThemes: [],
  actionability: null,
  catastrophizing: null,
  notes: '',
};

export default function DataContentSection({ value, onChange, onNext, onBack }) {
  const [state, setState] = useState({ ...DEFAULTS, ...value });

  const update = (patch) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      onChange(next);
      return next;
    });
  };

  const toggle = (field, key) => {
    const list = state[field];
    update({ [field]: list.includes(key) ? list.filter((k) => k !== key) : [...list, key] });
  };

  const canContinue =
    state.screenTimeHours != null && state.actionability != null && state.catastrophizing != null;

  return (
    <div className="eq-qs eq-fi">
      <div className="eq-qc">
        <div className="eq-qid">Data &amp; Content</div>

        <div className="eq-fb">
          <p className="eq-qsub">Screen Time</p>
          <p className="eq-qt">How many hours a day do you spend consuming content on screens — outside of work?</p>
          <RulerSlider
            value={state.screenTimeHours}
            onChange={(v) => update({ screenTimeHours: v })}
            min={0} max={10} step={0.5}
            anchorLow="0 hrs" anchorHigh="10+ hrs"
            formatValue={(v) => (v >= 10 ? '10+ hrs' : `${v} hrs`)}
            ticks={false}
            tierColoring={false}
            ariaLabel="Hours per day spent consuming content on screens"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Format</p>
          <p className="eq-qt">What format is most of that content in?</p>
          <div className="eq-chips">
            {CONTENT_FORMATS.map((f) => (
              <button
                key={f.key}
                type="button"
                className={`eq-chip ${state.contentFormats.includes(f.key) ? 'active' : ''}`}
                onClick={() => toggle('contentFormats', f.key)}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Theme</p>
          <p className="eq-qt">What's it mostly about?</p>
          <div className="eq-chips">
            {CONTENT_THEMES.map((t) => (
              <button
                key={t.key}
                type="button"
                className={`eq-chip ${state.contentThemes.includes(t.key) ? 'active' : ''}`}
                onClick={() => toggle('contentThemes', t.key)}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Actionability</p>
          <p className="eq-qt">How much of what you consume is actionable — the kind that teaches you something you actually apply (self-help, science) — versus purely informative or entertaining?</p>
          <RulerSlider
            value={state.actionability}
            onChange={(v) => update({ actionability: v })}
            min={0} max={10} step={1}
            anchorLow="Purely informative / entertaining" anchorHigh="Highly actionable"
            ariaLabel="How actionable the content you consume is"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Catastrophizing</p>
          <p className="eq-qt">Of the informative content you consume — news, commentary — how catastrophic or anxiety-driven does it tend to be?</p>
          <RulerSlider
            value={state.catastrophizing}
            onChange={(v) => update({ catastrophizing: v })}
            min={0} max={10} step={1}
            anchorLow="Calm, balanced" anchorHigh="Catastrophic, doom-driven"
            tierColoring={false}
            ariaLabel="How catastrophic or anxiety-driven your informative content tends to be"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Anything else?</p>
          <textarea
            className="eq-ta"
            value={state.notes}
            onChange={(e) => update({ notes: e.target.value })}
            placeholder="Specific creators, outlets, or platforms you spend the most time on, or anything else worth noting…"
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
