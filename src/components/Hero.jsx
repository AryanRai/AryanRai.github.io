import ControllerFigure from './ControllerFigure'

export default function Hero() {
  return (
    <section className="hero" id="home">
      <div className="hero-stage wrap">
        <div className="hero-copy">
          <p className="eyebrow">Robotics & embedded systems / Sydney</p>
          <h1>Aryan Rai<span className="hero-period">.</span></h1>
          <p className="hero-desc">I work on robots, embedded electronics and the software that connects them.</p>
          <p className="hero-context">This is a record of what I've been building, from projects with my dad to my work in robotics and space.</p>
          <div className="hero-links">
            <a href="#selected">Selected work <span aria-hidden="true">↗</span></a>
            <a href="#journey">My timeline <span aria-hidden="true">↓</span></a>
          </div>
          <p className="hero-roles">Robotics at <strong>Imitation Machines</strong><br />Co-founder of <a href="https://prxptn.com" target="_blank" rel="noopener noreferrer">Perception ↗</a></p>
        </div>
        <ControllerFigure />
      </div>
    </section>
  )
}
