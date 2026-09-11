import { useState, useCallback, useEffect, useRef } from 'react';
import Welcome from './components/Welcome';
import CategoryIntro from './components/CategoryIntro';
import QuestionPage, { QUESTIONS_PER_PAGE } from './components/QuestionPage';
import EmailGate from './components/EmailGate';
import Results from './components/Results';
import PartOneOverview from './components/PartOneOverview';
import PartOneSectionIntro from './components/PartOneSectionIntro';
import SleepSection from './components/SleepSection';
import MovementSection from './components/MovementSection';
import NutritionSection from './components/NutritionSection';
import SocialSection from './components/SocialSection';
import DataContentSection from './components/DataContentSection';
import PartOneStub from './components/PartOneStub';
import { categories, questions } from './data/questions';
import { scoreSleep, scoreMovement, scoreNutrition, scoreSocial, scoreDataContent } from './data/partOneScoring';
import logoSrc from './assets/logo.png';
import './App.css';

/*
 * Flow:
 *  partOneOverview → sleepIntro → sleep → movementIntro → movement →
 *  nutritionIntro → nutrition → socialIntro → social → dataContentIntro →
 *  dataContent → partOneStub (all 5 sections complete) → [Preview Part 2 →]
 *
 * Part Two (27 questions, 3 per page — 3 pages per core skill):
 *  welcome → categoryIntro(notice) → pages 0,3,6 →
 *  categoryIntro(shift) → pages 9,12,15 →
 *  categoryIntro(expand) → pages 18,21,24 →
 *  emailGate → results
 */

const TOTAL_QUESTIONS = questions.length;
const CATEGORY_STARTS = Object.fromEntries(
  categories.map((c) => [c.id, questions.findIndex((q) => q.category === c.id)])
);

export default function App() {
  const [screen, setScreen] = useState('partOneOverview');
  const [curQ, setCurQ] = useState(0);
  const [curCatIntro, setCurCatIntro] = useState(null);
  const [answers, setAnswers] = useState({});
  const [partOneAnswers, setPartOneAnswers] = useState({ sleep: null, movement: null, nutrition: null, social: null, dataContent: null });
  const [userData, setUserData] = useState(null);
  const appRef = useRef(null);

  useEffect(() => {
    if (appRef.current) {
      appRef.current.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [screen, curQ]);

  const handlePartOneStart = useCallback(() => setScreen('sleepIntro'), []);
  const handleSleepIntroContinue = useCallback(() => setScreen('sleep'), []);
  const handleSleepChange = useCallback((data) => {
    setPartOneAnswers((p) => ({ ...p, sleep: data }));
  }, []);
  const handleSleepNext = useCallback(() => setScreen('movementIntro'), []);
  const handleSleepBack = useCallback(() => setScreen('sleepIntro'), []);

  const handleMovementIntroContinue = useCallback(() => setScreen('movement'), []);
  const handleMovementChange = useCallback((data) => {
    setPartOneAnswers((p) => ({ ...p, movement: data }));
  }, []);
  const handleMovementNext = useCallback(() => setScreen('nutritionIntro'), []);
  const handleMovementBack = useCallback(() => setScreen('sleep'), []);

  const handleNutritionIntroContinue = useCallback(() => setScreen('nutrition'), []);
  const handleNutritionChange = useCallback((data) => {
    setPartOneAnswers((p) => ({ ...p, nutrition: data }));
  }, []);
  const handleNutritionNext = useCallback(() => setScreen('socialIntro'), []);
  const handleNutritionBack = useCallback(() => setScreen('movement'), []);

  const handleSocialIntroContinue = useCallback(() => setScreen('social'), []);
  const handleSocialChange = useCallback((data) => {
    setPartOneAnswers((p) => ({ ...p, social: data }));
  }, []);
  const handleSocialNext = useCallback(() => setScreen('dataContentIntro'), []);
  const handleSocialBack = useCallback(() => setScreen('nutrition'), []);

  const handleDataContentIntroContinue = useCallback(() => setScreen('dataContent'), []);
  const handleDataContentChange = useCallback((data) => {
    setPartOneAnswers((p) => ({ ...p, dataContent: data }));
  }, []);
  const handleDataContentNext = useCallback(() => setScreen('partOneStub'), []);
  const handleDataContentBack = useCallback(() => setScreen('social'), []);

  const handleStart = useCallback(() => {
    setCurCatIntro('notice');
    setScreen('categoryIntro');
  }, []);

  const handleCatContinue = useCallback(() => {
    setCurQ(CATEGORY_STARTS[curCatIntro]);
    setScreen('question');
  }, [curCatIntro]);

  const handleAnswer = useCallback((qId, val) => {
    setAnswers((p) => ({ ...p, [qId]: val }));
  }, []);

  const handleNext = useCallback(() => {
    const next = curQ + QUESTIONS_PER_PAGE;
    if (next >= TOTAL_QUESTIONS) { setScreen('emailGate'); return; }
    const curCat = questions[curQ].category;
    const nextCat = questions[next].category;
    if (curCat !== nextCat) { setCurCatIntro(nextCat); setScreen('categoryIntro'); }
    else setCurQ(next);
  }, [curQ]);

  const handleBack = useCallback(() => {
    if (curQ > 0) setCurQ(curQ - QUESTIONS_PER_PAGE);
  }, [curQ]);

  const handleEmail = useCallback((data) => {
    setUserData(data);
    setScreen('results');
  }, []);

  return (
    <div className="eq-app" ref={appRef}>
      <div className="eq-header">
        <a href="https://weareequipped.com" target="_blank" rel="noopener noreferrer">
          <img src={logoSrc} alt="equipped." className="eq-logo-img" />
        </a>
      </div>
      <div className="eq-main">
        {screen === 'partOneOverview' && <PartOneOverview onStart={handlePartOneStart} />}
        {screen === 'sleepIntro' && (
          <PartOneSectionIntro
            index={1} total={5} title="Sleep"
            description="Sleep is the foundation everything else is built on. Three questions on how much you get, how continuous it is, and how restorative it feels — plus space to flag anything unusual."
            onContinue={handleSleepIntroContinue}
          />
        )}
        {screen === 'sleep' && (
          <SleepSection value={partOneAnswers.sleep} onChange={handleSleepChange} onNext={handleSleepNext} onBack={handleSleepBack} />
        )}
        {screen === 'movementIntro' && (
          <PartOneSectionIntro
            index={2} total={5} title="Movement"
            description="How often you move, how that time is spent, and how prone your body is to injury. Four quick ratings plus space to flag anything unusual."
            onContinue={handleMovementIntroContinue}
          />
        )}
        {screen === 'movement' && (
          <MovementSection value={partOneAnswers.movement} onChange={handleMovementChange} onNext={handleMovementNext} onBack={handleMovementBack} />
        )}
        {screen === 'nutritionIntro' && (
          <PartOneSectionIntro
            index={3} total={5} title="Nutrition"
            description="Hydration, protein, alcohol, caffeine, sugar, and other stimulants — six quick ratings, plus space to note supplements or any diet you follow."
            onContinue={handleNutritionIntroContinue}
          />
        )}
        {screen === 'nutrition' && (
          <NutritionSection value={partOneAnswers.nutrition} onChange={handleNutritionChange} onNext={handleNutritionNext} onBack={handleNutritionBack} />
        )}
        {screen === 'socialIntro' && (
          <PartOneSectionIntro
            index={4} total={5} title="Social"
            description="Who you spend time with outside of work, how many you can count on, and how deep those connections go. Four quick ratings, plus which kinds of relationships you currently have."
            onContinue={handleSocialIntroContinue}
          />
        )}
        {screen === 'social' && (
          <SocialSection value={partOneAnswers.social} onChange={handleSocialChange} onNext={handleSocialNext} onBack={handleSocialBack} />
        )}
        {screen === 'dataContentIntro' && (
          <PartOneSectionIntro
            index={5} total={5} title="Data & Content"
            description="Screen time, what you consume, and how actionable versus catastrophic it tends to be. Three quick ratings, plus format and theme."
            onContinue={handleDataContentIntroContinue}
          />
        )}
        {screen === 'dataContent' && (
          <DataContentSection value={partOneAnswers.dataContent} onChange={handleDataContentChange} onNext={handleDataContentNext} onBack={handleDataContentBack} />
        )}
        {screen === 'partOneStub' && (
          <PartOneStub
            sleepScore={scoreSleep(partOneAnswers.sleep)}
            movementScore={scoreMovement(partOneAnswers.movement)}
            nutritionScore={scoreNutrition(partOneAnswers.nutrition)}
            socialScore={scoreSocial(partOneAnswers.social)}
            dataContentScore={scoreDataContent(partOneAnswers.dataContent)}
            onContinuePart2={handleStart}
          />
        )}
        {screen === 'welcome' && <Welcome onStart={handleStart} />}
        {screen === 'categoryIntro' && <CategoryIntro categoryId={curCatIntro} onContinue={handleCatContinue} />}
        {screen === 'question' && <QuestionPage pageIndex={curQ} answers={answers} onAnswer={handleAnswer} onNext={handleNext} onBack={handleBack} />}
        {screen === 'emailGate' && <EmailGate answers={answers} partOneAnswers={partOneAnswers} onSubmit={handleEmail} />}
        {screen === 'results' && <Results answers={answers} userName={userData?.name} userEmail={userData?.email} hideScores={userData?.hideScores} partOneAnswers={partOneAnswers} />}
      </div>
      <footer className="eq-footer">
        <div className="eq-footer-links">
          <a href="https://www.linkedin.com/company/weareequipped" target="_blank" rel="noopener noreferrer">LinkedIn</a>
          <a href="https://substack.com/@weareequipped" target="_blank" rel="noopener noreferrer">Newsletter</a>
          <a href="https://weareequipped.com/contact" target="_blank" rel="noopener noreferrer">Contact</a>
        </div>
        <p className="eq-footer-copy">&copy; 2026 equipped.</p>
      </footer>
    </div>
  );
}
