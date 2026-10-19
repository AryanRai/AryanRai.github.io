import { projects } from '../data/projects'
const selected = ['orbit', 'imitation', 'rover', 'satmap']
export default function SelectedWork() {
  return (
    <section className="selected wrap" id="selected">
      <div className="section-heading"><p className="eyebrow">01 / SELECTED WORK</p><h2>Ideas, meet<br /><em>the real world.</em></h2><p>A few things I've helped bring to life.<br />From the first circuit to the whole system.</p></div>
      <div className="selected-grid">
        {selected.map((id, i) => {
          const project = projects.find(p => p.id === id)
          return <a className={`work-card work-card-${id}`} key={id} href={`#project-${id}`}>
            <div className="work-image"><img src={`/assets/work/${project.image}.webp`} alt={project.imageAlt} loading="lazy" decoding="async" /><span className="work-index mono">0{i + 1} / {project.category.toUpperCase()}</span><span className="work-arrow" aria-hidden="true">↗</span></div>
            <div className="work-card-title"><h3>{id === 'rover' ? 'Interplanetary Rover' : project.title}</h3><span className="mono">{id === 'satmap' ? '2025' : id === 'rover' ? '2024 — 2026' : '2026 — NOW'}</span></div>
            <p>{project.subtitle}</p>
          </a>
        })}
      </div>
      <a className="text-link" href="#projects">THE COMPLETE PROJECT INDEX <span>↗</span></a>
    </section>
  )
}
