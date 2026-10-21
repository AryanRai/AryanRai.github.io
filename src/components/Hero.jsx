import AllyOrb from './AllyOrb'
import { useEffect, useRef } from 'react'

export default function Hero() {
  const heroRef = useRef(null)
  useEffect(() => {
    const hero = heroRef.current
    const measure = () => hero.style.setProperty('--hero-sticky-top', `${Math.min(88, window.innerHeight - hero.offsetHeight)}px`)
    const observer = new ResizeObserver(measure)
    observer.observe(hero)
    window.addEventListener('resize', measure)
    measure()
    return () => { observer.disconnect(); window.removeEventListener('resize', measure) }
  }, [])
  return (
    <section className="hero" id="home" ref={heroRef}>
      <div className="hero-stage wrap">
        <a className="hero-emblem" href="#project-ally" aria-label="Explore Ally">
          <AllyOrb className="hero-monochrome-orb" />
        </a>
        <div className="hero-copy">
          <p className="eyebrow">Aryan Rai / Sydney</p>
          <h1 className="hero-quote">If it has wire,<br />solder, or code,<br /><em>I can work on it.</em></h1>
          <p className="hero-desc">Embedded · Robotics · Space · AI</p>
          <div className="hero-links">
            <a href="#selected">Selected work <span aria-hidden="true">↗</span></a>
            <a href="#questions">A few questions <span aria-hidden="true">↓</span></a>
            <a href="#systems">How I work <span aria-hidden="true">↓</span></a>
          </div>
          <p className="hero-roles">Robotics at <strong>Imitation Machines</strong><br />Co-founder of <a href="https://prxptn.com" target="_blank" rel="noopener noreferrer">Perception ↗</a></p>
        </div>
      </div>
    </section>
  )
}
