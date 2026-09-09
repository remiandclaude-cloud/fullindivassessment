export default function Welcome({ onStart }) {
  return (
    <div className="eq-welcome">
      <div className="eq-wc">
        <div className="eq-badge">Nervous System Assessment</div>
        <h1>how <span className="eq-accent">equipped<span className="eq-accent-dot">.</span></span> are you?</h1>
        <p className="eq-wsub eq-wsub-lead">How well are you leveraging your own nervous system?</p>
        <p className="eq-wsub">
          This free assessment measures the 3 skills that define how well a nervous system is harnessed:
        </p>
        <ul className="eq-wlist">
          <li><strong>Notice</strong>, your ability to read what's happening inside you.</li>
          <li><strong>Shift</strong>, your ability to change your state deliberately.</li>
          <li><strong>Expand</strong>, how actively you are building a bigger, stronger container.</li>
        </ul>
        <p className="eq-wsub">
          At the end, you'll receive a personalised nervous system profile showing where you are, what's working, and where the real opportunity lives.
        </p>
        <div className="eq-meta">
          <div className="eq-mi"><span className="eq-mi-i">&#9201;</span><span>15 to 20 minutes</span></div>
          <div className="eq-mi"><span className="eq-mi-i">&#9670;</span><span>Scale of 1 to 10</span></div>
          <div className="eq-mi"><span className="eq-mi-i">&#9673;</span><span>Personalised results</span></div>
        </div>
        <button className="eq-btn" onClick={onStart}>Begin Assessment</button>
        <p className="eq-wf">Grounded in polyvagal theory, somatic experiencing, interoception science, and the window of tolerance model.</p>
      </div>
    </div>
  );
}
