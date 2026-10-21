import SelectedWork from './components/SelectedWork'
import { lazy, Suspense, useCallback, useEffect, useState } from 'react'
import Intro, { shouldPlayIntro } from './components/Intro'
import QuestionStory from './components/QuestionStory'
import DotCursor from './components/DotCursor'
import GithubActivity from './components/GithubActivity'
import MusicPlayer from './components/MusicPlayer'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

const EngineeringStack = lazy(() => import('./components/EngineeringStack'))

export default function App() {
  const [intro, setIntro] = useState(shouldPlayIntro)
  const completeIntro = useCallback(() => setIntro(false), [])
  useEffect(() => {
    const backToTop = event => {
      if (!(event.target instanceof Element) || !event.target.closest('a[href="#home"]')) return
      event.preventDefault()
      history.replaceState(null, '', '#home')
      window.scrollTo({top:0, behavior:matchMedia('(prefers-reduced-motion: reduce)').matches ? 'instant' : 'smooth'})
    }
    document.addEventListener('click', backToTop)
    return () => document.removeEventListener('click', backToTop)
  }, [])
  useEffect(() => {
    if (location.hash === '#home') { window.scrollTo(0, 0); return }
    if (!location.hash || location.hash.startsWith('#project-')) return
    let active = true
    document.fonts.ready.then(() => {
      if (active) requestAnimationFrame(() => document.getElementById(location.hash.slice(1))?.scrollIntoView({ behavior: 'instant', block: 'start' }))
    })
    return () => { active = false }
  }, [])
  return (
    <div className={`portfolio-page${intro ? ' is-entering' : ''}`}>
      <DotCursor />
      {intro && <Intro onComplete={completeIntro} />}
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <MusicPlayer />
      <main id="main">
        <Hero />
        <QuestionStory />
        <Suspense fallback={<section id="systems" className="wrap" style={{ minHeight: '820svh', paddingBlock: 100 }} aria-busy="true"><p className="eyebrow">HOW I WORK / HARDWARE + SOFTWARE</p><h2>From the chip to the whole machine.</h2></section>}><EngineeringStack /></Suspense>
        <SelectedWork />
        <Timeline />
        <Projects />
        <GithubActivity />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
