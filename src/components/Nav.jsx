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
      <a className="brand" href="#home" aria-label="Aryan Rai home"><span className="brand-symbol" aria-hidden="true">✳</span> ARYAN RAI<span className="brand-note">ENGINEER & BUILDER</span></a>
      <nav aria-label="Main navigation">
        <a href="#selected">Work <sup>01</sup></a>
        <a href="#journey">Journey <sup>02</sup></a>
        <a href="#about">About</a>
        <a className="nav-contact" href="#contact">Let's talk <span aria-hidden="true">↗</span></a>
      </nav>
    </header>
  )
}
