import { useEffect, useRef, useState } from 'react'
import { createTimeline } from 'animejs'
import figures from '../generated/systems.json'
import uavArt from '../generated/system-uav.svg?url'
import armArt from '../generated/system-arm.svg?url'
import roverArt from '../generated/system-rover.svg?url'
import satelliteArt from '../generated/system-satellite.svg?url'
import { systemChapters } from '../data/systemChapters'
import '../../vendor/anatomy/iso.css'
import '../engineering.css'

const clamp = (x, lo=0, hi=1) => Math.max(lo, Math.min(hi, x))
const end = systemChapters.length - .6
const sceneIds = ['assembly', 'uav', 'arm', 'rover', 'satellite']
const machineArt = {uav:uavArt,arm:armArt,rover:roverArt,satellite:satelliteArt}

function Drawing({ id, className='' }) {
  return id==='assembly'
    ? <div className={`system-drawing ${className}`} data-machine={id} dangerouslySetInnerHTML={{__html:figures[id].svg}} />
    : <div className={`system-drawing ${className}`} data-machine={id}><img src={machineArt[id]} alt={figures[id].label} decoding="async" /></div>
}

export default function EngineeringStack() {
  const root = useRef(null)
  const [active, setActive] = useState(0)
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches)
  const chapter = systemChapters[active]

  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const change = () => setReduced(motion.matches)
    motion.addEventListener('change', change)
    return () => motion.removeEventListener('change', change)
  }, [])

  useEffect(() => {
    if (reduced) return
    const section = root.current
    const scene = section.querySelector('.systems-art')
    const machineNodes = Object.fromEntries(sceneIds.map(id=>[id,scene.querySelector(`[data-machine="${id}"]`)]))
    const assemblyNodes = Object.fromEntries(['electronics','chip','power','frame','cover'].map(id=>[id,machineNodes.assembly.querySelector(`[data-assembly="${id}"]`)]))
    const [cx,cy] = figures.assembly.chip
    const state = {assemblyAlpha:1,assemblyScale:3.3,assemblyX:(450-cx)*3.3,assemblyY:(320-cy)*3.3,
      electronics:.12,power:0,frame:0,cover:0,spread:0,uavAlpha:0,uavScale:.48,armAlpha:0,armScale:.65,
      roverAlpha:0,roverScale:.65,satelliteAlpha:0,satelliteScale:.65,software:0,fleet:0}
    const timeline = createTimeline({autoplay:false,defaults:{ease:'inOutSine'}})
    const change = (at,values,duration=620) => timeline.add(state,{...values,duration},at*1000)
    change(.3,{assemblyScale:1.28,assemblyX:0,assemblyY:25,electronics:1})
    change(1.3,{assemblyScale:.88,assemblyY:0,power:1,frame:1,cover:1,spread:1})
    change(2.2,{spread:0,assemblyScale:.32,assemblyY:0,cover:0},650)
    change(2.42,{assemblyAlpha:0,uavAlpha:1,uavScale:1},580)
    change(3.35,{uavAlpha:0,uavScale:.65,armAlpha:1,armScale:1},650)
    change(4.35,{armAlpha:0,armScale:.65,roverAlpha:1,roverScale:1},650)
    change(5.35,{roverAlpha:0,roverScale:.65,satelliteAlpha:1,satelliteScale:1},650)
    change(6.35,{satelliteAlpha:0,satelliteScale:.65,uavAlpha:1,uavScale:.43,armAlpha:1,armScale:.45,roverAlpha:1,roverScale:.52,software:1,fleet:1},650)
    change(7,{software:1},400)

    const draw = value => {
      timeline.seek(value*1000)
      machineNodes.assembly.style.transform=`translate(${state.assemblyX/9}%,${state.assemblyY/6.4}%) scale(${state.assemblyScale})`
      machineNodes.assembly.style.opacity=state.assemblyAlpha
      for(const id of ['electronics','power','frame','cover']) assemblyNodes[id].style.opacity=state[id]
      const offsets={frame:85,power:25,electronics:-50,chip:-50,cover:-130}
      for(const [id,y] of Object.entries(offsets)) assemblyNodes[id].setAttribute('transform',`translate(0 ${y*state.spread})`)
      const positions={uav:[-25,-11],arm:[27,-11],rover:[0,22],satellite:[0,0]}
      for(const id of ['uav','arm','rover','satellite']) {
        const [x,y]=positions[id]
        machineNodes[id].style.opacity=state[`${id}Alpha`]
        machineNodes[id].style.transform=`translate(${x*state.fleet}%,${y*state.fleet}%) scale(${state[`${id}Scale`]})`
      }
      scene.style.setProperty('--software',state.software)
      section.style.setProperty('--systems-progress',value/end)
      const next=Math.min(systemChapters.length-1,Math.floor(value+.35))
      setActive(previous=>previous===next?previous:next)
    }

    let frame=0, last=0, target=0, current=0, visible=false
    const measure = () => {
      const header=innerWidth<=700?72:88
      const rect=section.getBoundingClientRect()
      const viewport=section.querySelector('.systems-sticky').getBoundingClientRect().height
      target=clamp((header-rect.top)/Math.max(1,rect.height-viewport))*end
    }
    const tick = now => {
      frame=0
      if(document.hidden || !visible) return
      const dt=last?Math.min((now-last)/1000,.05):1/60
      last=now
      current+=(target-current)*(1-Math.exp(-dt/.095))
      if(Math.abs(target-current)<.0005) current=target
      draw(current)
      if(current!==target) frame=requestAnimationFrame(tick)
    }
    const schedule=()=>{measure();if(visible&&!document.hidden&&!frame){last=0;frame=requestAnimationFrame(tick)}}
    const observer=new IntersectionObserver(entries=>{
      visible=entries.at(-1).isIntersecting
      if(visible) schedule()
      else {cancelAnimationFrame(frame);frame=0}
    },{rootMargin:'100px'})
    observer.observe(section)
    const size=new ResizeObserver(schedule)
    size.observe(section)
    addEventListener('scroll',schedule,{passive:true})
    addEventListener('resize',schedule)
    document.addEventListener('visibilitychange',schedule)
    measure();current=target;draw(current)
    return ()=>{
      cancelAnimationFrame(frame);observer.disconnect();size.disconnect();timeline.revert()
      removeEventListener('scroll',schedule);removeEventListener('resize',schedule)
      document.removeEventListener('visibilitychange',schedule)
    }
  }, [reduced])

  const go = index => {
    const section=root.current, header=innerWidth<=700?72:88
    const travel=section.offsetHeight-section.querySelector('.systems-sticky').offsetHeight
    window.scrollTo({top:window.scrollY+section.getBoundingClientRect().top-header+(index/end)*travel,behavior:'smooth'})
  }

  return <section id="systems" className={`engineering-section${reduced?' systems-still':''}`} ref={root} aria-label="From electronics to complete systems">
    {reduced ? <div className="systems-static wrap">
      <p className="eyebrow">HOW I WORK / HARDWARE + SOFTWARE</p><h2>From the chip<br />to the whole machine.</h2>
      {systemChapters.map((item,index)=><article key={item.id} className="systems-static-chapter">
        <div><p className="eyebrow">0{index+1} / {item.label}</p><h3>{item.title}</h3><p>{item.body}</p><p className="systems-static-software">Alongside it: {item.software}.</p><a className="text-link" href={`#project-${item.project}`}>{item.projectLabel} ↗</a></div>
        <figure className="iso" data-theme="light"><Drawing id={item.machine}/><figcaption>Illustrative assembly. {item.photoLabel} <img src={`/assets/work/${item.photo}.webp`} alt={item.photoLabel} loading="lazy"/></figcaption></figure>
      </article>)}
    </div> : <div className="systems-sticky">
      <div className="systems-topline mono"><span>HOW I WORK / FROM COMPONENT TO SYSTEM</span><a href="#selected">SKIP TO THE PROJECTS ↘</a></div>
      <div className="systems-body">
        <div className="systems-copy" key={chapter.id}>
          <p className="systems-kicker mono"><span>0{active+1} / 0{systemChapters.length}</span> {chapter.label}</p>
          <h2 id="engineering-title">{chapter.title}</h2><p className="systems-description">{chapter.body}</p>
          <a className="systems-project" href={`#project-${chapter.project}`}><img src={`/assets/work/${chapter.photo}.webp`} alt="" loading="lazy" decoding="async"/><span><small className="mono">FROM MY PROJECTS</small>{chapter.projectLabel}<span aria-hidden="true"> ↗</span></span></a>
        </div>
        <figure className="systems-visual iso" data-theme="light" aria-label={`${chapter.label}: ${chapter.title}`}>
          <div className="systems-art" aria-hidden="true">
            <div className="systems-ground" />
            {sceneIds.map(id=><Drawing key={id} id={id}/>)}
            <div className="systems-orbit"><img src="/assets/work/orbit-mission.webp" alt="" loading="lazy"/><span className="mono">ORBIT / MISSION OPERATIONS</span></div>
            <div className="systems-sim"><img src="/assets/work/robot-sim.webp" alt="" loading="lazy"/><span className="mono">SIMULATION / ROBOT LEARNING</span></div>
          </div>
          <figcaption><span className="mono">FIG. 0{active+1}</span> Illustrative assemblies. Real projects linked alongside.</figcaption>
        </figure>
      </div>
      <div className="systems-parallel"><span className="mono">SOFTWARE, ALONGSIDE THE HARDWARE</span><div className="systems-parallel-line" aria-hidden="true"/><p>{chapter.software}</p><small className="mono">{chapter.tools}</small></div>
      <nav className="systems-chapters" aria-label="Engineering chapters">{systemChapters.map((item,index)=><button type="button" key={item.id} aria-current={index===active?'step':undefined} onClick={()=>go(index)} aria-label={`Scroll to ${item.label}`}><span className="chapter-tick"/><span className="chapter-text">{item.short}</span></button>)}</nav>
      <div className="systems-bottom mono"><span>SCROLL TO EXPLORE ↓</span><span>HARDWARE ↔ SOFTWARE</span></div>
    </div>}
  </section>
}
