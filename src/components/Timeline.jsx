import { timeline } from '../data/timeline'

function TlPhoto({ src, alt, cls }) {
  return (
    <img
      src={`/assets/work/${src}.webp`}
      alt={alt}
      className={cls || undefined}
      loading="lazy"
      decoding="async"
    />
  )
}

function TlEntry({ entry }) {
  const { date, title, body, stack, photos, grid, links } = entry
  return (
    <div className="tl-entry">
      <div className="tl-entry-meta">
        <span className="mono">{date}</span>
        <h3>{title}</h3>
        <p>{body}</p>
        <span className="tl-stack">{stack}</span>
        {links.map(({ url, label }) => (
          <a key={url} className="text-link" href={url} target="_blank" rel="noopener noreferrer">{label}</a>
        ))}
      </div>
      <div className={`tl-photos ${grid}`}>
        {photos.map((p) => <TlPhoto key={p.src} {...p} />)}
      </div>
    </div>
  )
}

export default function Timeline() {
  return (
    <section className="proj-tl wrap" id="journey" aria-label="Project timeline">
      <div className="tl-intro">
        <h2>Following<br /><em>the curiosity.</em></h2>
        <p className="mono">03 / THE JOURNEY<br />The experiments that got me here.</p>
      </div>
      {timeline.map((block) => (
        <details className="tl-block" key={block.year} open={block.year === 'Current'}>
          <summary className="tl-block-label">
            {block.label && <span className="mono">{block.label}</span>}
            <span className="tl-year">{block.year}</span><span className="tl-plus" aria-hidden="true">+</span>
          </summary>
          {block.entries.map((entry) => (
            <TlEntry key={entry.title} entry={entry} />
          ))}
        </details>
      ))}
    </section>
  )
}
