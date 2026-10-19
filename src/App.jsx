import SelectedWork from './components/SelectedWork'
import { useCallback, useState } from 'react'
import Intro, { shouldPlayIntro } from './components/Intro'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  const [intro, setIntro] = useState(shouldPlayIntro)
  const completeIntro = useCallback(() => setIntro(false), [])
  return (
    <div className={`portfolio-page${intro ? ' is-entering' : ''}`}>
      {intro && <Intro onComplete={completeIntro} />}
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <SelectedWork />
        <Projects />
        <Timeline />
        <About />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}
