import { useState } from 'react';

export default function ContactForm({ userName, userEmail, part1Pct, part2Pct }) {
  const [name, setName] = useState(userName || '');
  const [email, setEmail] = useState(userEmail || '');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState(null); // 'sent' | 'failed'

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    if (!name.trim()) { setError('Please enter your name.'); return; }
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError('Please enter a valid email address.'); return; }

    setSubmitting(true);
    try {
      const res = await fetch('.netlify/functions/send-contact-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
          message: message.trim(),
          part1Pct,
          part2Pct,
        }),
      });
      if (res.ok) {
        setStatus('sent');
      } else {
        const data = await res.json().catch(() => ({}));
        console.error('Contact request failed:', res.status, data);
        setStatus('failed');
        setError(`Could not send (${res.status}). ${data.error || ''}`);
      }
    } catch (err) {
      console.error('Contact request error:', err);
      setStatus('failed');
      setError(`Could not reach the server. ${err.message || ''}`);
    }
    setSubmitting(false);
  };

  if (status === 'sent') {
    return (
      <p className="eq-contact-sent">Thanks{name ? `, ${name}` : ''} — we've got your message and will be in touch.</p>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="eq-ef eq-contact-form">
      <div className="eq-ff"><label>Name</label><input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Your name" autoComplete="name" /></div>
      <div className="eq-ff"><label>Email</label><input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email" /></div>
      <div className="eq-ff">
        <label>What would you like help with?</label>
        <textarea className="eq-ta" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us a bit about what you're looking for…" rows={3} />
      </div>
      {error && <p className="eq-ferr">{error}</p>}
      <button className="eq-btn" type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Get in Touch'}</button>
    </form>
  );
}
