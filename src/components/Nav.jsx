import { useEffect, useState } from 'react'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`site-header${scrolled ? ' scrolled' : ''}`}>
      <a className="brand" href="#home" aria-label="Aryan Rai home">Aryan Rai</a>
      <nav aria-label="Main navigation">
        <a href="#journey">Timeline</a>
        <a href="#projects">Projects</a>
        <a href="#about">About</a>
        <a className="nav-contact" href="#contact">Say hello <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  )
}
