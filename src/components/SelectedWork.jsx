import { projects } from '../data/projects'
const selected = ['imitation', 'rover']
export default function SelectedWork() {
  return (
    <section className="selected wrap" id="selected">
      <div className="section-heading"><p className="eyebrow">01 / SELECTED WORK</p><h2>A few things<br /><em>I've built.</em></h2></div>
      <a className="mission-feature" href="#project-orbit">
        <div className="mission-visual">
          <div className="mission-bar mono"><span><i /> PERCEPTION / ORBIT</span><span>MISSION CONTROL ↗</span></div>
          <img src="/assets/work/orbit-mission.webp" alt="Orbit mission executor with a live drone camera, mission graph, map and telemetry" width="1800" height="1012" loading="lazy" decoding="async" />
          <div className="mission-footnote mono"><span>01 / DESIGN → SIMULATE → DEPLOY</span><span>SOFTWARE + HARDWARE</span></div>
        </div>
        <div className="mission-copy"><span className="eyebrow">CO-FOUNDER / 2026 — NOW</span><h3>One mission.<br />Every system.</h3><p>At Perception, I'm building the connection between mission intent and the machines that carry it out.</p><div className="mission-products"><span>ORBIT <small>Mission intelligence</small></span><span>RAVEN <small>Drone prototype</small></span><span>ORION <small>Mesh communications</small></span></div><span className="text-link">EXPLORE THE PROJECT <span>↗</span></span></div>
      </a>
      <div className="selected-grid">
        {selected.map((id, i) => {
          const project = projects.find(p => p.id === id)
          return <a className={`work-card work-card-${id}`} key={id} href={`#project-${id}`}>
            <div className={`work-image${id === 'imitation' ? ' work-image-pair' : ''}`}><img src={`/assets/work/${project.image}.webp`} alt={project.imageAlt} loading="lazy" decoding="async" />{id === 'imitation' && <img src="/assets/work/robot-arm-close.webp" alt="Robotics integration and sensing hardware on the workbench" loading="lazy" decoding="async" />}<span className="work-index mono">0{i + 1} / {project.category.toUpperCase()}</span><span className="work-arrow" aria-hidden="true">↗</span></div>
            <div className="work-card-title"><h3>{id === 'rover' ? 'Interplanetary Rover' : project.title}</h3><span className="mono">{id === 'satmap' || id === 'ant61' ? '2025' : id === 'rover' ? '2024 — 2026' : '2026 — NOW'}</span></div>
            <p>{project.subtitle}</p>
          </a>
        })}
      </div>
      <a className="text-link" href="#projects">THE COMPLETE PROJECT INDEX <span>↗</span></a>
    </section>
  )
}
