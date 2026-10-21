import { useState } from 'react'
import activity from '../../public/data/github-activity.json'
const comparisons = [
 {size:2.44, label:'football goal heights',fact:'A regulation football goal is 2.44 m high.'},
 {size:7.32, label:'football goal widths',fact:'A regulation football goal is 7.32 m wide.'},
]
export default function GithubActivity() {
 const [comparison] = useState(() => comparisons[Math.floor(Math.random()*comparisons.length)])
 const metres = activity.additions * 12 / 72 * .0254
 const number = new Intl.NumberFormat('en')
 return <section className="github-activity wrap" aria-labelledby="github-heading">
  <p className="eyebrow">A little perspective / {activity.year}</p>
  <div className="github-stat"><h2 id="github-heading">{number.format(activity.commits)} commits.<br /><em>Still building.</em></h2><div><p>This year, my public GitHub commits added <strong>{number.format(activity.additions)} lines.</strong></p><p>If you printed each added line at 12-point line spacing, the strip would stretch <strong>{number.format(Math.round(metres))} metres</strong> - about <strong>{number.format(Math.round(metres/comparison.size))} {comparison.label}.</strong></p></div></div>
  <div className="github-footnote"><p>{comparison.fact} <a href="https://www.theifab.com/laws/latest/the-field-of-play/#goals" target="_blank" rel="noopener noreferrer">Source: IFAB ↗</a></p><a className="text-link" href="https://github.com/AryanRai" target="_blank" rel="noopener noreferrer">See the commits ↗</a></div>
  <details className="github-method"><summary>Where these numbers come from</summary><p>{activity.scope} Refreshed daily; last successful update: {new Date(activity.updatedAt).toLocaleDateString('en-AU',{day:'numeric',month:'short',year:'numeric',timeZone:'UTC'})}. The print comparison is a calculated illustration: 12 points = 1/6 inch of line spacing.</p></details>
 </section>
}
