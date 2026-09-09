import { categories, questions } from '../data/questions';
import RulerSlider from './RulerSlider';

export const QUESTIONS_PER_PAGE = 3;
const TOTAL_QUESTIONS = questions.length;
const TOTAL_PAGES = TOTAL_QUESTIONS / QUESTIONS_PER_PAGE;

/* pageIndex = index of the first question on this page (0, 3, 6, ... 24) */
export default function QuestionPage({ pageIndex, answers, onAnswer, onNext, onBack }) {
  const pageQuestions = questions.slice(pageIndex, pageIndex + QUESTIONS_PER_PAGE);
  const cat = categories.find((c) => c.id === pageQuestions[0].category);
  const catQs = questions.filter((q) => q.category === cat.id);
  const catStartIndex = questions.findIndex((q) => q.category === cat.id);
  const pagesInCat = catQs.length / QUESTIONS_PER_PAGE;
  const pageInCat = (pageIndex - catStartIndex) / QUESTIONS_PER_PAGE;

  const currentPageNum = pageIndex / QUESTIONS_PER_PAGE + 1;
  const isLastPage = pageIndex + QUESTIONS_PER_PAGE >= TOTAL_QUESTIONS;

  const allAnswered = pageQuestions.every((q) => answers[q.id]);

  const handleNext = () => {
    if (!allAnswered) return;
    onNext();
  };

  return (
    <div className="eq-qs eq-fi">
      <div className="eq-ph">
        <div className="eq-pcs">
          {categories.map((c) => {
            const isActive = c.id === cat.id;
            const isDone = categories.indexOf(c) < categories.indexOf(cat);
            const catProg = isDone ? 100 : isActive ? ((pageInCat + 1) / pagesInCat) * 100 : 0;
            return (
              <div key={c.id} className={`eq-pc ${isActive ? "active" : ""} ${isDone ? "done" : ""}`}>
                <span className="eq-pcl">{c.name}</span>
                <div className="eq-pcb">
                  <div className="eq-pcf" style={{ width: `${catProg}%` }} />
                </div>
              </div>
            );
          })}
        </div>
        <div className="eq-po">
          <div className="eq-pob"><div className="eq-pof" style={{ width: `${(currentPageNum / TOTAL_PAGES) * 100}%` }} /></div>
          <span className="eq-poc">{currentPageNum} / {TOTAL_PAGES}</span>
        </div>
      </div>
      <div className="eq-qc">
        {pageQuestions.map((q) => (
          <div key={q.id} className="eq-fb">
            <div className="eq-qid">{q.id}  ·  {q.title}</div>
            <p className="eq-qt">{q.text}</p>
            <RulerSlider
              value={answers[q.id] || null}
              onChange={(v) => onAnswer(q.id, v)}
              min={1} max={10} step={1}
              anchorLow={cat.scaleAnchors.low}
              anchorHigh={cat.scaleAnchors.high}
              ariaLabel={`Rating for ${q.title}`}
            />
          </div>
        ))}
        <div className="eq-nav">
          {pageIndex > 0 && <button className="eq-btn-s" onClick={onBack}>Back</button>}
          <button className="eq-btn" onClick={handleNext} disabled={!allAnswered}>
            {isLastPage ? "See My Results" : "Next"}
          </button>
        </div>
      </div>
    </div>
  );
}
