import { useState, useMemo, useEffect, useRef } from 'react'
import { projects, categories } from '../data/projects'

function ProjectItem({ project, isOpen, onToggle }) {
  const { id, title, category, when, subtitle, body, stack, image, imageAlt, url, urlLabel } = project
  const detailsRef = useRef(null)

  useEffect(() => {
    if (detailsRef.current) detailsRef.current.open = isOpen
  }, [isOpen])

  return (
    <details
      ref={detailsRef}
      className="project"
      id={`project-${id}`}
      data-category={category}
      onToggle={(e) => onToggle(id, e.target.open)}
    >
      <summary>
        <span className="project-name">
          {title}
          <small>{subtitle}</small>
        </span>
        <span className="project-category">{category}</span>
        <span className="expand" aria-hidden="true">+</span>
      </summary>
      <div className={`project-body${!image ? ' text-only' : ''}`}>
        {image && (
          <div className="project-media">
            <img src={`/assets/work/${image}.webp`} alt={imageAlt} loading="lazy" decoding="async" />
          </div>
        )}
        <div>
          <p className="eyebrow">{when}</p>
          <h3>{subtitle}</h3>
          <p>{body}</p>
          <p className="stack">{stack}</p>
          {url && (
            <a className="text-link" href={url} target="_blank" rel="noopener noreferrer">
              {urlLabel} <span aria-hidden="true">↗</span>
            </a>
          )}
        </div>
      </div>
    </details>
  )
}

export default function Projects() {
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const [openId, setOpenId] = useState(null)

  useEffect(() => {
    const openFromHash = () => {
      const hash = location.hash
      if (!hash.startsWith('#project-')) return
      const id = hash.slice('#project-'.length)
      setCategory('All')
      setQuery('')
      setOpenId(id)
      requestAnimationFrame(() => {
        document.getElementById(`project-${id}`)?.scrollIntoView({ block: 'start', behavior: 'instant' })
      })
    }
    window.addEventListener('hashchange', openFromHash)
    openFromHash()
    return () => window.removeEventListener('hashchange', openFromHash)
  }, [])

  const visible = useMemo(() =>
    projects.filter(p =>
      (category === 'All' || p.category === category) &&
      `${p.title} ${p.subtitle} ${p.body} ${p.stack}`.toLowerCase().includes(query.toLowerCase())
    ),
    [category, query]
  )

  const handleToggle = (id, open) => setOpenId(open ? id : (prev) => prev === id ? null : prev)

  return (
    <section className="archive-section" id="projects">
      <div className="wrap">
        <div className="archive-intro">
          <h2>The work,<br /><em>in detail.</em></h2>
          <p className="mono">02 / THE WORKBENCH<br />Open a project to see the build.</p>
        </div>
        <div className="archive-tools">
          <div className="filters" role="group" aria-label="Filter projects">
            {categories.map(cat => (
              <button
                key={cat}
                type="button"
                data-filter={cat}
                aria-pressed={category === cat}
                onClick={() => setCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
          <label className="search-label">
            <span className="sr-only">Search projects</span>
            <input
              type="search"
              id="project-search"
              placeholder="Find a project..."
              value={query}
              onChange={e => setQuery(e.target.value)}
            />
          </label>
        </div>
        <p id="project-count" className="mono result-count" aria-live="polite">
          {visible.length} {visible.length === 1 ? 'project' : 'projects'}
        </p>
        <div className="project-list">
          {visible.map(p => (
            <ProjectItem
              key={p.id}
              project={p}
              isOpen={openId === p.id}
              onToggle={handleToggle}
            />
          ))}
        </div>
        {visible.length === 0 && (
          <p className="empty-state">No projects match. Try another word or choose All.</p>
        )}
        <div className="archive-end">
          <p>More photos, prototypes and experiments in my visual portfolio.</p>
          <a className="text-link" href="https://www.canva.com/design/DAGrMs5FilU/B8yaZq9XQcU6J3cw5SShiA/view" target="_blank" rel="noopener noreferrer">
            Open the Canva portfolio <span aria-hidden="true">↗</span>
          </a>
        </div>
      </div>
    </section>
  )
}
