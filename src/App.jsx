import Nav from './components/Nav'
import Hero from './components/Hero'
import Timeline from './components/Timeline'
import Projects from './components/Projects'
import About from './components/About'
import Contact from './components/Contact'
import Footer from './components/Footer'

export default function App() {
  return (
    <>
      <a className="skip-link" href="#main">Skip to content</a>
      <Nav />
      <main id="main">
        <Hero />
        <Timeline />
        <Projects />
        <About />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
