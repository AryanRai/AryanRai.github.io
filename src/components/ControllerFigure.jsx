import { useEffect, useRef, useState } from 'react'
import controllerSvg from '../generated/controller.svg?raw'
import '../../vendor/anatomy/iso.css'

const stages = [
  { id: 'sensing', title: 'Sensing', text: 'Sensor interfaces bring measurements into the controller.' },
  { id: 'control', title: 'Control', text: 'Configurable firmware uses those measurements to decide what happens next.' },
  { id: 'comms', title: 'Comms', text: 'Communication interfaces connect the controller to other hardware. BlueLily explores RS485, CAN and LoRa.' },
]

export default function ControllerFigure() {
  const [selected, setSelected] = useState(0)
  const [tour, setTour] = useState(true)
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  const [paused, setPaused] = useState(false)
  const [visible, setVisible] = useState(false)
  const [pageVisible, setPageVisible] = useState(!document.hidden)
  const root = useRef(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting), { threshold: .25 })
    observer.observe(root.current)
    const media = matchMedia('(prefers-reduced-motion: reduce)')
    const motionChanged = () => setReduced(media.matches)
    const visibilityChanged = () => setPageVisible(!document.hidden)
    media.addEventListener('change', motionChanged)
    document.addEventListener('visibilitychange', visibilityChanged)
    return () => { observer.disconnect(); media.removeEventListener('change', motionChanged); document.removeEventListener('visibilitychange', visibilityChanged) }
  }, [])
  useEffect(() => {
    if (!tour || paused || !visible || !pageVisible || reduced) return
    const interval = setInterval(() => setSelected(value => (value + 1) % stages.length), 4500)
    return () => clearInterval(interval)
  }, [tour, paused, visible, pageVisible, reduced])
  const stage = stages[selected]
  return <figure className="controller-figure iso" data-theme="light" data-stage={stage.id} ref={root}
    onPointerEnter={() => setPaused(true)} onPointerLeave={() => setPaused(false)}
    onFocusCapture={() => setPaused(true)} onBlurCapture={event => { if (!event.currentTarget.contains(event.relatedTarget)) setPaused(false) }}>
    <div className="controller-plate">
      <div className="controller-frame mono"><span>FIG. 01</span><span>INSIDE A CONTROLLER</span></div>
      <div className="controller-art" dangerouslySetInnerHTML={{ __html: controllerSvg }} />
      <div className="controller-frame controller-frame-bottom mono"><span>EXPLORE THE COMPONENTS</span><span>{String(selected + 1).padStart(2,'0')} / 03</span></div>
    </div>
    <div className="controller-controls" role="group" aria-label="Controller components">
      {stages.map((item, index) => <button key={item.id} type="button" aria-pressed={index === selected} aria-controls="controller-explanation" onClick={() => { setSelected(index); setTour(false) }}><span>0{index+1}</span> {item.title}</button>)}
      {!reduced && <button className="controller-tour" type="button" aria-label={tour ? 'Pause controller tour' : 'Play controller tour'} aria-pressed={tour} onClick={() => setTour(!tour)}>{tour ? 'Ⅱ' : '▷'}</button>}
    </div>
    <p className="controller-explanation" id="controller-explanation" aria-live={tour ? 'off' : 'polite'}>{stage.text}</p>
    <figcaption>Based on <a href="#project-bluelily">BlueLily ↗</a>. Conceptual illustration; not the actual board layout.</figcaption>
  </figure>
}
