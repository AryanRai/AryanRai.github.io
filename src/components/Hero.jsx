export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-topline mono wrap"><span>INDEPENDENT MIND. CONNECTED SYSTEMS.</span><span>SYDNEY, AU / 2026</span></div>
      <div className="hero-stage wrap">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Mechatronics · Robotics · AI</p>
          <h1>Making<br />intelligence<br /><em>physical.</em></h1>
          <p className="hero-desc">I'm Aryan Rai. I build robots, embedded systems, and the software that brings them to life.</p>
          <a className="pill-link" href="#selected">Explore my work <span aria-hidden="true">↘</span></a>
        </div>
        <div className="orbital" aria-hidden="true">
          <span className="orbital-label mono">FIG. 01 — FROM SIGNAL TO SYSTEM</span>
          <div className="orbit-field">
            <div className="orbit-glow" /><div className="planet" />
            <svg className="orbit-lines" viewBox="0 0 640 640" fill="none">
              <g transform="rotate(-32 320 320)" stroke="currentColor" strokeWidth=".8">
                {[110, 150, 190, 230, 270].map(r => <ellipse key={r} cx="320" cy="320" rx="300" ry={r} />)}
                <path d="M12 320h616M320 12v616" strokeDasharray="2 8" />
              </g>
              <circle cx="320" cy="320" r="302" stroke="currentColor" strokeWidth=".5" strokeDasharray="1 9" />
              <circle cx="553" cy="128" r="5" fill="currentColor" />
              <path d="M542 128h22M553 117v22M90 476h18M99 467v18" stroke="currentColor" />
            </svg>
          </div>
          <div className="orbital-caption mono"><span>HUMAN CURIOSITY<br />MACHINE POSSIBILITY</span><span>↗<br />ALWAYS EXPLORING</span></div>
        </div>
      </div>
      <div className="hero-bottom wrap"><span className="signature">Aryan Rai<span>26</span></span><p>Currently at <strong>Imitation Machines</strong><br />Co-founder of <a href="https://prxptn.com" target="_blank" rel="noopener noreferrer">Perception ↗</a></p><a className="mono scroll-link" href="#selected">SCROLL TO DISCOVER <span>↓</span></a></div>
    </section>
  )
}
