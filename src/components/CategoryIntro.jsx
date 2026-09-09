import { categories } from '../data/questions';

export default function CategoryIntro({ categoryId, onContinue }) {
  const cat = categories.find((c) => c.id === categoryId);
  const idx = categories.findIndex((c) => c.id === categoryId);

  return (
    <div className="eq-ci">
      <div className="eq-cic">
        <div className="eq-cn">Part {idx + 1} of 3</div>
        <h2 className="eq-ct">{cat.name}</h2>
        <p className="eq-cd">{cat.description}</p>
        <div className="eq-sa">
          <div className="eq-anch"><span className="eq-av">1</span><span className="eq-al">{cat.scaleAnchors.low}</span></div>
          <div className="eq-anch"><span className="eq-av">5</span><span className="eq-al">{cat.scaleAnchors.mid}</span></div>
          <div className="eq-anch"><span className="eq-av">10</span><span className="eq-al">{cat.scaleAnchors.high}</span></div>
        </div>
        <button className="eq-btn" onClick={onContinue}>Start</button>
      </div>
    </div>
  );
}
