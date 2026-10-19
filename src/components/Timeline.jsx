import { timeline } from '../data/timeline'
import dimensions from '../../public/assets/work/dimensions.json'

function TimelinePhoto({ photo, index }) {
  const [width, height] = dimensions[photo.src] || [1500, 1000]
  return <figure className={`journal-photo ${photo.cls || ''}`} style={{ '--photo-ratio': width / height }}>
    <a className="journal-image" href={`/assets/work/${photo.src}.webp`} target="_blank" rel="noopener noreferrer" aria-label={`Open full image: ${photo.alt}`}>
      <img src={`/assets/work/${photo.src}.webp`} alt={photo.alt} width={width} height={height} loading="lazy" decoding="async" />
      <span className="image-open" aria-hidden="true">↗</span>
    </a>
    <figcaption><span>{photo.alt}</span><span className="mono">{String(index + 1).padStart(2, '0')} / {photo.src}.webp</span></figcaption>
  </figure>
}

function TimelineEntry({ entry, index }) {
  return <article className="journal-entry">
    <header className="journal-entry-heading"><h4>{entry.title}</h4><span className="mono">{entry.date}</span><span className="mono journal-entry-index">{String(index + 1).padStart(2, '0')}</span></header>
    <div className="journal-entry-description"><p>{entry.body}</p><div className="journal-facts"><span className="mono">TOOLS & SYSTEMS</span><p>{entry.stack}</p></div><div className="journal-entry-links">{entry.links.map(({ url, label }) => <a key={url} className="text-link" href={url} target="_blank" rel="noopener noreferrer">{label}</a>)}</div></div>
    {entry.photos.length > 0 && <div className={`journal-gallery journal-gallery-${Math.min(entry.photos.length, 4)}`}>{entry.photos.map((photo, index) => <TimelinePhoto key={photo.src} photo={photo} index={index} />)}</div>}
  </article>
}

export default function Timeline() {
  return <section className="project-journal wrap" id="journey" aria-labelledby="journey-heading">
    <div className="journal-intro"><p className="eyebrow">02 / A FIELD NOTEBOOK</p><h2 id="journey-heading">One thing<br />led to <em>another.</em></h2><p>Robots, circuits, late nights.<br />A few years of following the curiosity.</p></div>
    <nav className="journal-years" aria-label="Jump to a year">{timeline.map(block => <a href={`#year-${block.year.toLowerCase()}`} key={block.year}>{block.year === 'Current' ? 'Now' : block.year}<span aria-hidden="true">↘</span></a>)}</nav>
    {timeline.map(block => <section className="journal-chapter" id={`year-${block.year.toLowerCase()}`} key={block.year} aria-label={block.year}>
      <div className="journal-chapter-heading"><h3>{block.year === 'Current' ? 'In progress.' : block.year === 'Earlier' ? 'Where it started.' : block.year}</h3><span className="mono">{block.label || 'FROM THE ARCHIVE'} / {block.entries.length} {block.entries.length === 1 ? 'ENTRY' : 'ENTRIES'}</span></div>
      {block.entries.map((entry,index) => <TimelineEntry entry={entry} index={index} key={entry.title} />)}
    </section>)}
    <div className="journal-end"><p className="mono">THE NOTEBOOK IS STILL OPEN.</p><a className="text-link" href="#projects">Explore the complete project index ↗</a></div>
  </section>
}
