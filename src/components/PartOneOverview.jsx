import { useState } from 'react';

export default function PartOneOverview({ onStart }) {
  const [consent, setConsent] = useState(false);

  return (
    <div className="eq-welcome">
      <div className="eq-wc">
        <div className="eq-badge">Two-Part Assessment</div>
        <h1>how <span className="eq-accent">equipped<span className="eq-accent-dot">.</span></span> are you?</h1>
        <p className="eq-wsub eq-wsub-lead">Your nervous system is shaped by what you feed it, and how well you can steer it.</p>
        <p className="eq-wsub">This assessment covers both, in two parts:</p>
        <ul className="eq-wlist">
          <li><strong>Part 1 — Foundations.</strong> The daily inputs that build, or erode, your baseline: sleep, movement, nutrition, social connection, and the information you consume.</li>
          <li><strong>Part 2 — Core Skills.</strong> How well you can read and steer your nervous system in real time: Notice, Shift, and Expand.</li>
        </ul>
        <p className="eq-wsub">At the end, you'll get one personalised profile across both.</p>
        <div className="eq-meta">
          <div className="eq-mi"><span className="eq-mi-i">&#9201;</span><span>25 to 35 minutes</span></div>
          <div className="eq-mi"><span className="eq-mi-i">&#9670;</span><span>2 parts</span></div>
          <div className="eq-mi"><span className="eq-mi-i">&#9673;</span><span>Personalised results</span></div>
        </div>

        <div className="eq-consent">
          <label className="eq-consent-label">
            <input
              type="checkbox"
              checked={consent}
              onChange={(e) => setConsent(e.target.checked)}
              className="eq-consent-check"
            />
            <span>
              This assessment asks about everyday habits — sleep, movement, nutrition, and more. It's a lifestyle and habit inventory, not medical advice, and it doesn't diagnose or treat any condition.
              Your answers stay in your browser as you go. If you choose to enter your email at the end to receive your results, equipped. will process and retain your name, email, and answers to send your personalised report and to contact you with relevant content.
              You can request deletion of your data at any time by emailing <a href="mailto:hello@equipped.to">hello@equipped.to</a>. If you'd rather not proceed on these terms, please reach out to us directly at that address instead.
            </span>
          </label>
        </div>

        <button className="eq-btn" onClick={onStart} disabled={!consent}>Begin Part 1</button>
        <p className="eq-wf">Grounded in polyvagal theory, somatic experiencing, interoception science, and the window of tolerance model.</p>
      </div>
    </div>
  );
}
