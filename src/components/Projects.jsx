import { useState, useMemo, useEffect } from 'react'
import { projects, categories } from '../data/projects'
import { projectGalleries } from '../data/projectGalleries'

function WorkRow({ project, index, isOpen, onToggle }) {
  const { id, title, category, when, subtitle, body, stack, image, imageAlt, url, urlLabel } = project

  return (
    <div className={`wl-row${isOpen ? ' open' : ''}`} id={`project-${id}`} data-category={category}>
      <button type="button"
        className="wl-row-header"
        onClick={() => onToggle(id)}
        aria-expanded={isOpen}
        aria-controls={isOpen ? `detail-${id}` : undefined}
      >
        <span className="wl-num">{String(index + 1).padStart(2, '0')}</span>
        <span className="wl-title">{title}</span>
        <span className="wl-sub">{subtitle}</span>
        <span className="wl-cat">{category}</span>
        <span className="wl-expand" aria-hidden="true">{isOpen ? '−' : '+'}</span>
      </button>

      {isOpen && (
        <div className="wl-detail" id={`detail-${id}`}>
          <div className={`wl-detail-inner${!image ? ' text-only' : ''}`}>
            {image && (
              <div className="wl-detail-media">
                <img src={`/assets/work/${image}.webp`} alt={imageAlt} loading="lazy" decoding="async" />
              </div>
            )}
            <div className="wl-detail-text">
              <p className="eyebrow">{when}</p>
              <h3>{subtitle}</h3>
              <p>{body}</p>
              <p className="stack">{stack}</p>
              {url && (
                <a className="text-link" href={url} target="_blank" rel="noopener noreferrer">
                  {urlLabel} ↗
                </a>
              )}
            </div>
          </div>
          {projectGalleries[id] && <div className="project-extra-gallery">{projectGalleries[id].map(photo => <figure key={photo.image}><a href={`/assets/work/${photo.image}.webp`} target="_blank" rel="noopener noreferrer" aria-label={`Open full image: ${photo.caption}`}><img src={`/assets/work/${photo.image}.webp`} alt={photo.caption} loading="lazy" decoding="async" /></a><figcaption>{photo.caption}</figcaption></figure>)}</div>}
        </div>
      )}
    </div>
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

  const handleToggle = (id) => setOpenId(prev => prev === id ? null : id)

  return (
    <section className="archive-section" id="projects">
      <div className="wrap">
        <div className="archive-intro">
          <h2>The workbench.</h2>
          <p className="mono">03 / THE WORKBENCH<br />Open a project to see the build.</p>
        </div>
        <div className="archive-tools">
          <div className="filters" role="group" aria-label="Filter projects">
            {categories.map(cat => (
              <button key={cat} type="button" data-filter={cat} aria-pressed={category === cat} onClick={() => setCategory(cat)}>
                {cat}
              </button>
            ))}
          </div>
          <label className="search-label">
            <span className="sr-only">Search projects</span>
            <input type="search" placeholder="Search..." value={query} onChange={e => setQuery(e.target.value)} />
          </label>
        </div>
        <p className="mono result-count" aria-live="polite">{visible.length} {visible.length === 1 ? 'project' : 'projects'}</p>
        <div className="wl">
          {visible.map((p, i) => (
            <WorkRow
              key={p.id}
              project={p}
              index={i}
              isOpen={openId === p.id}
              onToggle={handleToggle}
            />
          ))}
          {visible.length === 0 && <p className="empty-state">No matches.</p>}
        </div>
        <div className="archive-end">
          <p>More in the visual portfolio.</p>
          <a className="text-link" href="https://www.canva.com/design/DAGrMs5FilU/B8yaZq9XQcU6J3cw5SShiA/view" target="_blank" rel="noopener noreferrer">
            Canva portfolio ↗
          </a>
        </div>
      </div>
    </section>
  )
}
