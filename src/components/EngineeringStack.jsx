import { useEffect, useRef, useState } from 'react'
import benchSvg from '../generated/controller.svg?raw'
import { hardwareLayers, softwareLayers, systemBranches, engineeringLayers } from '../data/engineeringLayers'
import { projects } from '../data/projects'
import '../../vendor/anatomy/iso.css'
import '../engineering.css'

export default function EngineeringStack() {
  const [selected, setSelected] = useState('mcu')
  const [tour, setTour] = useState(true)
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [hovered, setHovered] = useState(false)
  const [focused, setFocused] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(!document.hidden)
  const root = useRef(null)
  const stage = engineeringLayers.find(item => item.id === selected)
  const hardware = hardwareLayers.find(item => item.id === selected)?.id || stage.hardware
  const select = id => { setSelected(id); setTour(false) }

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .1 })
    observer.observe(root.current)
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const changeMotion = () => setReduced(media.matches)
    const changeVisibility = () => setPageVisible(!document.hidden)
    media.addEventListener('change', changeMotion)
    document.addEventListener('visibilitychange', changeVisibility)
    return () => { observer.disconnect(); media.removeEventListener('change', changeMotion); document.removeEventListener('visibilitychange', changeVisibility) }
  }, [])
  useEffect(() => {
    if (!tour || reduced || hovered || focused || !visible || !pageVisible) return
    const interval = setInterval(() => setSelected(current => engineeringLayers[(engineeringLayers.findIndex(item => item.id === current) + 1) % engineeringLayers.length].id), 6500)
    return () => clearInterval(interval)
  }, [tour, reduced, hovered, focused, visible, pageVisible])

  return <section className="engineering-section" id="systems" aria-labelledby="engineering-title" ref={root}
    onPointerEnter={event => { if (event.pointerType !== 'touch') setHovered(true) }} onPointerLeave={() => setHovered(false)}
    onFocusCapture={() => setFocused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setFocused(false) }}>
    <div className="wrap">
      <header className="engineering-heading"><div><p className="eyebrow">HOW I WORK / HARDWARE + SOFTWARE</p><h2 id="engineering-title">From the MCU<br />to the whole system.</h2></div><p>I work across electronics, power, mechanics and software. Pick a layer to see where it connects to my projects.</p></header>

      <div className="engineering-grid">
        <div className="hardware-track"><p className="track-label mono">PHYSICAL LAYERS <span aria-hidden="true">↓</span></p>
          <div className="hardware-buttons" role="group" aria-label="Explore hardware layers">
            {hardwareLayers.map((item, index) => <button type="button" key={item.id} aria-pressed={hardware === item.id} aria-controls="engineering-detail" onClick={() => select(item.id)}><span className="layer-number mono">0{index + 1}</span><span>{item.label}</span><span className="layer-indicator" aria-hidden="true">↗</span></button>)}
          </div><p className="track-note">From the smallest component<br />to the structure around it.</p>
        </div>

        <figure className="engineering-figure iso" data-theme="light" data-areas={stage.areas.join(' ')}>
          <div className="engineering-plate"><div className="bench-frame mono"><span>FIG. 01</span><span>THE INTEGRATION BENCH</span></div>
            <div className="bench-art" dangerouslySetInnerHTML={{ __html: benchSvg }} />
            <div className="bench-frame bench-bottom mono"><span>{stage.short || stage.label}</span><span className="bench-tour">{!reduced && <button type="button" aria-pressed={tour} onClick={() => setTour(value => !value)} aria-label={tour ? 'Pause engineering tour' : 'Play engineering tour'}>{tour ? 'Ⅱ Pause tour' : '▷ Play tour'}</button>}</span></div>
          </div>
          <figcaption><span className="bench-key" aria-hidden="true" /> Highlighted parts show the selected layer. Illustrative hardware, not a specific build or wiring diagram.</figcaption>
        </figure>

        <div className="software-track"><p className="track-label mono">SOFTWARE, IN PARALLEL <span aria-hidden="true">↕</span></p>
          <div role="group" aria-label="Explore software layers">{softwareLayers.map(item => <button type="button" key={item.id} aria-pressed={stage.software === item.id} aria-controls="engineering-detail" onClick={() => select(item.id)}><span>{item.label}</span><small>{item.tools}</small></button>)}</div>
          <p className="track-note">Code runs through every layer.<br />Simulation feeds back into the build.</p>
        </div>
      </div>

      <div className="system-branches"><p className="track-label mono">COMPLETE SYSTEMS <span>SHARED SKILLS, DIFFERENT MACHINES</span></p><div className="system-options" role="group" aria-label="Explore complete systems">{systemBranches.map(item => <button type="button" key={item.id} aria-pressed={selected === item.id} aria-controls="engineering-detail" onClick={() => select(item.id)}><img src={`/assets/work/${item.image}.webp`} alt="" loading="lazy" decoding="async" /><span>{item.label}</span><span className="system-arrow" aria-hidden="true">↗</span></button>)}</div></div>

      <div className="engineering-detail" id="engineering-detail">
        <div className="engineering-detail-copy" aria-live={tour ? 'off' : 'polite'} aria-atomic="true"><p className="eyebrow">{stage.label} / {softwareLayers.find(item => item.id === stage.software).label}</p><h3>{stage.title}</h3><p>{stage.body}</p><div className="engineering-evidence">{stage.projects.map(id => { const project = projects.find(item => item.id === id); return <a className="text-link" href={`#project-${id}`} key={id}>{project.title}<span aria-hidden="true">↗</span></a> })}</div></div>
        <figure className="engineering-project-photo"><img key={stage.image} src={`/assets/work/${stage.image}.webp`} alt={stage.alt} loading="lazy" decoding="async" /><figcaption>{stage.alt}</figcaption></figure>
      </div>
    </div>
  </section>
}
