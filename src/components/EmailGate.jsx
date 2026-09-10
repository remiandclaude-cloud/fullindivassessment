import { useState } from 'react';

export default function EmailGate({ answers, partOneAnswers, onSubmit }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [hideScores, setHideScores] = useState(false);
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null); // 'sent', 'failed'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setEmailStatus(null);
    if (!name.trim()) { setError('Please enter your name.'); return; }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email address.'); return; }
    if (!consent) { setError('Please consent to the processing of your data to continue.'); return; }

    setSubmitting(true);

    let emailOk = false;
    try {
      const res = await fetch('.netlify/functions/send-results', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          answers,
          partOneAnswers,
          hideScores,
        }),
      });

      if (res.ok) {
        emailOk = true;
        setEmailStatus('sent');
      } else {
        const data = await res.json().catch(() => ({}));
        console.error('Email send failed:', res.status, data);
        setEmailStatus('failed');
        setError(`Email could not be sent (${res.status}). ${data.error || ''} Your results are still available below.`);
      }
    } catch (err) {
      console.error('Email send error:', err);
      setEmailStatus('failed');
      setError(`Could not reach email service. ${err.message || ''} Your results are still available below.`);
    }

    // Always proceed to results, even if email failed
    setTimeout(() => {
      onSubmit({ name: name.trim(), email: email.trim(), emailSent: emailOk, hideScores });
    }, emailOk ? 800 : 2000);
  };

  return (
    <div className="eq-eg">
      <div className="eq-egc">
        <div className="eq-egi">&#10003;</div>
        <h2>Assessment complete.</h2>
        <p className="eq-egs">Your nervous system profile is ready. Enter your details to unlock your personalised results, including your tier across Notice, Shift, and Expand, and what each score means. We'll also email you a full copy.</p>
        <form onSubmit={handleSubmit} className="eq-ef">
          <div className="eq-ff"><label>First name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your first name" autoComplete="given-name" /></div>
          <div className="eq-ff"><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" /></div>
          <div className="eq-consent">
            <label className="eq-consent-label">
              <input type="checkbox" checked={consent} onChange={(e) => setConsent(e.target.checked)} className="eq-consent-check" />
              <span>I consent to equipped. storing my name, email address, and assessment results to deliver my personalised profile and to contact me with relevant content. I can withdraw my consent or request deletion of my data at any time by emailing <a href="mailto:hello@equipped.to">hello@equipped.to</a>.</span>
            </label>
          </div>
          <p className="eq-score-disclaimer">
            The scores in this assessment are intentionally rough. They compare things — sleep, movement, social connection, nervous system regulation — that don't reduce to a single number in any precise sense.
            Treat them as a compass, not a report card: a hint at which section is worth your attention, not a measurement of how you're doing.
          </p>
          <div className="eq-consent">
            <label className="eq-consent-label">
              <input type="checkbox" checked={hideScores} onChange={(e) => setHideScores(e.target.checked)} className="eq-consent-check" />
              <span>Show my results without scores or percentages — just the qualitative breakdown.</span>
            </label>
          </div>
          {error && <p className="eq-ferr">{error}</p>}
          {emailStatus === 'sent' && <p style={{ color: '#6665DD', fontSize: '0.85rem', marginBottom: '14px' }}>Results sent to your inbox.</p>}
          <button className="eq-btn" type="submit" disabled={submitting || !consent}>
            {submitting ? (emailStatus === 'sent' ? 'Opening results...' : emailStatus === 'failed' ? 'Continuing...' : 'Sending...') : 'Unlock My Results'}
          </button>
          <p className="eq-ep">We respect your inbox. No spam, ever. Unsubscribe anytime.</p>
        </form>
      </div>
    </div>
  );
}
