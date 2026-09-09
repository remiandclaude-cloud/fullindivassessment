import { useState } from 'react';
import RulerSlider from './RulerSlider';
import { frequencyLabel } from '../data/partOneScoring';

const DEFAULTS = {
  hydrationLitres: null,
  proteinGrams: null,
  alcoholDrinksPerWeek: null,
  caffeineCupsPerDay: null,
  processedFoodFrequency: null,
  stimulantFrequency: null,
  notes: '',
};

export default function NutritionSection({ value, onChange, onNext, onBack }) {
  const [state, setState] = useState({ ...DEFAULTS, ...value });

  const update = (patch) => {
    setState((prev) => {
      const next = { ...prev, ...patch };
      onChange(next);
      return next;
    });
  };

  const canContinue =
    state.hydrationLitres != null &&
    state.proteinGrams != null &&
    state.alcoholDrinksPerWeek != null &&
    state.caffeineCupsPerDay != null &&
    state.processedFoodFrequency != null &&
    state.stimulantFrequency != null;

  return (
    <div className="eq-qs eq-fi">
      <div className="eq-qc">
        <div className="eq-qid">Nutrition</div>

        <div className="eq-fb">
          <p className="eq-qsub">Hydration</p>
          <p className="eq-qt">How much water do you drink, on average, per day?</p>
          <RulerSlider
            value={state.hydrationLitres}
            onChange={(v) => update({ hydrationLitres: v })}
            min={0} max={3.5} step={0.5}
            anchorLow="0 L" anchorHigh="3.5+ L"
            formatValue={(v) => (v >= 3.5 ? '3.5+ L' : `${v} L`)}
            ticks={false}
            ariaLabel="Average litres of water per day"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Protein</p>
          <p className="eq-qt">Roughly how much protein do you eat per day?</p>
          <RulerSlider
            value={state.proteinGrams}
            onChange={(v) => update({ proteinGrams: v })}
            min={0} max={200} step={10}
            anchorLow="0 g" anchorHigh="200+ g"
            formatValue={(v) => (v >= 200 ? '200+ g' : `${v} g`)}
            ticks={false}
            ariaLabel="Average grams of protein per day"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Alcohol</p>
          <p className="eq-qt">How many alcoholic drinks do you have, on average, per week?</p>
          <RulerSlider
            value={state.alcoholDrinksPerWeek}
            onChange={(v) => update({ alcoholDrinksPerWeek: v })}
            min={0} max={10} step={1}
            anchorLow="None" anchorHigh="10+ drinks/week"
            formatValue={(v) => (v >= 10 ? '10+ drinks/week' : `${v} drinks/week`)}
            tierColoring={false}
            ariaLabel="Average alcoholic drinks per week"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Caffeine</p>
          <p className="eq-qt">How many cups of coffee, tea, or other caffeinated drinks do you have per day?</p>
          <RulerSlider
            value={state.caffeineCupsPerDay}
            onChange={(v) => update({ caffeineCupsPerDay: v })}
            min={0} max={10} step={1}
            anchorLow="None" anchorHigh="10+ cups/day"
            formatValue={(v) => (v >= 10 ? '10+ cups/day' : `${v} cups/day`)}
            tierColoring={false}
            ariaLabel="Average cups of caffeine per day"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Sugar &amp; Processed Food</p>
          <p className="eq-qt">How often do you eat refined sugar or processed/packaged food?</p>
          <RulerSlider
            value={state.processedFoodFrequency}
            onChange={(v) => update({ processedFoodFrequency: v })}
            min={0} max={10} step={1}
            anchorLow="None" anchorHigh="Multiple times a day"
            formatValue={frequencyLabel}
            tierColoring={false}
            ariaLabel="How often you eat refined sugar or processed food"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Other Stimulants</p>
          <p className="eq-qt">How often do you use other stimulants — nicotine, energy drinks, pre-workout, prescription or recreational stimulants?</p>
          <RulerSlider
            value={state.stimulantFrequency}
            onChange={(v) => update({ stimulantFrequency: v })}
            min={0} max={10} step={1}
            anchorLow="None" anchorHigh="Multiple times a day"
            formatValue={frequencyLabel}
            tierColoring={false}
            ariaLabel="How often you use other stimulants"
          />
        </div>

        <div className="eq-fb">
          <p className="eq-qsub">Anything else?</p>
          <textarea
            className="eq-ta"
            value={state.notes}
            onChange={(e) => update({ notes: e.target.value })}
            placeholder="Supplements you take regularly, any specific diet you follow (vegan, keto, paleo, intermittent fasting…), which stimulants and how much, food sensitivities, or anything else worth noting…"
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
