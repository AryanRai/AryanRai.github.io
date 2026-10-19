import { useEffect } from 'react'
import AllyOrb from './AllyOrb'

export function shouldPlayIntro() {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches || location.hash) return false
  try { return !sessionStorage.getItem('aryan-portfolio-intro') } catch { return true }
}

export default function Intro({ onComplete }) {
  useEffect(() => {
    try { sessionStorage.setItem('aryan-portfolio-intro', 'seen') } catch { /* animation still works without storage */ }
    const timer = setTimeout(onComplete, 2200)
    return () => clearTimeout(timer)
  }, [onComplete])

  return <div className="intro-screen" aria-hidden="true">
    <div className="intro-emblem">
      <svg className="intro-lettering" viewBox="0 0 240 240">
        <defs><path id="intro-circle" d="M120,28a92,92 0 1,1 -0.1,0" /></defs>
        <text><textPath href="#intro-circle" textLength="574" lengthAdjust="spacing">ARYAN RAI · ENGINEER & BUILDER · </textPath></text>
      </svg>
      <AllyOrb className="intro-orb" />
      <span className="intro-name">ar.</span>
    </div>
  </div>
}
