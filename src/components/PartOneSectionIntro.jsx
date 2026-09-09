/* Generic "Section X of 5" intro screen, reused across all Part One sections. */
export default function PartOneSectionIntro({ index, total, title, description, onContinue }) {
  return (
    <div className="eq-ci">
      <div className="eq-cic">
        <div className="eq-cn">Part 1 · Section {index} of {total}</div>
        <h2 className="eq-ct">{title}</h2>
        <p className="eq-cd">{description}</p>
        <button className="eq-btn" onClick={onContinue}>Start</button>
      </div>
    </div>
  );
}
