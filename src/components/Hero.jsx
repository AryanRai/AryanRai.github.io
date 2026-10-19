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
        <div className="hero-copy">
          <p className="eyebrow">Aryan Rai / Sydney</p>
          <h1 className="hero-quote">If it has wire,<br />solder, or code,<br /><em>I can work on it.</em></h1>
          <p className="hero-desc">Embedded · Robotics · Space · AI</p>
          <a className="pill-link" href="#questions">A few questions first <span aria-hidden="true">↓</span></a>
        </div>
        <div className="orbital" aria-hidden="true">
          <div className="orbit-field">
            <AllyOrb className="ally-orb-hero" />
          </div>
        </div>
      </div>
      <div className="hero-bottom wrap"><p>Robotics at <strong>Imitation Machines</strong><br />Co-founder of <a href="https://prxptn.com" target="_blank" rel="noopener noreferrer">Perception ↗</a></p><a className="text-link" href="#project-ally">The glow is from Ally, another thing I build ↗</a></div>
    </section>
  )
}
