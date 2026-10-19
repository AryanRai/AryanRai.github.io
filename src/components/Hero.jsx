import AllyOrb from './AllyOrb'

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
          <span className="orbital-label mono">FIG. 01 — ALLY / DESKTOP COMPANION</span>
          <div className="orbit-field">
            <AllyOrb className="ally-orb-hero" />
          </div>
          <div className="orbital-caption mono"><span>HUMAN CURIOSITY<br />MACHINE POSSIBILITY</span><span>↗<br />ALWAYS EXPLORING</span></div>
        </div>
      </div>
      <div className="hero-bottom wrap"><span className="signature">Aryan Rai<span>26</span></span><p>Currently at <strong>Imitation Machines</strong><br />Co-founder of <a href="https://prxptn.com" target="_blank" rel="noopener noreferrer">Perception ↗</a></p><a className="mono scroll-link" href="#selected">SCROLL TO DISCOVER <span>↓</span></a></div>
    </section>
  )
}
