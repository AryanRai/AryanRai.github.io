import { useEffect, useRef } from 'react'

const scenes = [
  {
    number: '01', theme: 'light', question: <>Where did<br />it start?</>,
    image: 'skateboard', alt: 'My early electric skateboard build',
    collage: [{ image: 'drone', alt: 'An early hobby quadcopter' }, { image: 'rc-car', alt: 'An RC car electronics build' }],
    answer: 'Building things with my dad.', detail: 'Quadcopters, RC cars, an electric skateboard. Then a few more projects.', label: 'THE FIRST EXPERIMENTS',
  },
  {
    number: '02', theme: 'light', question: <>Can a robot learn<br />by watching?</>,
    image: 'robot-arm-close', alt: 'Robot hardware and sensing equipment in the Imitation Machines workspace',
    collage: [{ image: 'robot-dog', alt: 'Robot dog in the workspace' }, { image: 'robot-sim', alt: 'Robot learning environment in simulation' }],
    answer: 'That question became my day job.', detail: 'Robot integration, teleoperation, simulation, and learning from demonstration.', label: 'IMITATION MACHINES / ROBOT LEARNING',
  },
  {
    number: '03', theme: 'light', question: <>What am I<br />working on now?</>,
    image: 'orbit-mission', alt: 'Orbit mission executor bringing together a mission graph, camera, map and telemetry',
    collage: [{ image: 'raven-hardware', alt: 'Raven drone prototype' }, { image: 'orion-board', alt: 'Orion mesh radio PCB design' }],
    answer: 'Building Perception.', detail: 'At Perception: mission planning, drone hardware, and mesh communications.', label: 'PERCEPTION / ORBIT, RAVEN & ORION',
  },
]

export default function QuestionStory() {
  const rootRef = useRef(null)
  useEffect(() => {
    const root = rootRef.current
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const panels = Array.from(root.querySelectorAll('.question-scene'))
    let frame = 0
    const update = () => {
      frame = 0
      if (motion.matches) { root.classList.remove('is-scroll-ready'); return }
      root.classList.add('is-scroll-ready')
      const headerHeight = innerWidth <= 700 ? 72 : 88
      panels.forEach(panel => {
        const rect = panel.getBoundingClientRect()
        const travel = rect.height - (innerHeight - headerHeight)
        const progress = Math.max(0, Math.min(1, (headerHeight - rect.top) / Math.max(1, travel)))
        const answer = Math.max(0, Math.min(1, (progress - .22) / .35))
        panel.style.setProperty('--answer-progress', answer.toFixed(4))
        panel.style.setProperty('--scene-progress', progress.toFixed(4))
      })
    }
    const schedule = () => { if (!frame) frame = requestAnimationFrame(update) }
    addEventListener('scroll', schedule, { passive: true })
    addEventListener('resize', schedule)
    motion.addEventListener('change', schedule)
    update()
    return () => {
      cancelAnimationFrame(frame)
      removeEventListener('scroll', schedule)
      removeEventListener('resize', schedule)
      motion.removeEventListener('change', schedule)
    }
  }, [])

  return <section className="question-sequence" ref={rootRef} id="questions" aria-label="Questions behind the work">
    {scenes.map(scene => <article className={`question-scene question-${scene.theme}`} key={scene.number} aria-labelledby={`question-${scene.number}`}>
      <div className="question-stage">
        <div className="question-frame-top mono"><span>A FEW QUESTIONS / {scene.number} OF 03</span><a href="#journey">SKIP TO THE JOURNEY ↘</a></div>
        <h2 className="question-title" id={`question-${scene.number}`}>{scene.question}</h2>
        <figure className="question-visual"><div className="question-collage"><img className="collage-main" src={`/assets/work/${scene.image}.webp`} alt={scene.alt} loading="lazy" decoding="async" />{scene.collage.map((photo, index) => <div className={`collage-piece collage-piece-${index + 1}`} key={photo.image}><img src={`/assets/work/${photo.image}.webp`} alt={photo.alt} loading="lazy" decoding="async" /></div>)}</div><figcaption className="mono">{scene.label}</figcaption></figure>
        <div className="question-answer"><p>{scene.answer}</p><span>{scene.detail}</span></div>
        <div className="question-frame-bottom mono"><span>KEEP SCROLLING <span aria-hidden="true">↓</span></span><div className="question-progress" aria-hidden="true"><span /></div><span>{scene.number} / 03</span></div>
      </div>
    </article>)}
  </section>
}
