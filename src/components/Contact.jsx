import { useState } from 'react'

export default function Contact() {
  const [copied, setCopied] = useState(false)
  const [copyFailed, setCopyFailed] = useState(false)

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText('buzzaryanrai@gmail.com')
      setCopyFailed(false)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      setCopyFailed(true)
    }
  }

  return (
    <section className="contact wrap" id="contact">
      <div className="contact-top">
        <h2>Have something<br />in <em>mind?</em></h2>
        <p className="contact-sub">Robotics, embedded systems, interesting ideas. I'd love to hear what you're building.</p>
      </div>
      <button className={`email-btn${copied ? ' copied' : ''}`} onClick={copyEmail} aria-label="Copy email address">
        {copied ? 'Copied!' : 'buzzaryanrai@gmail.com'}
      </button>
      <span className="sr-only" role="status">{copied ? 'Email address copied to clipboard.' : ''}</span>
      {copyFailed && <p className="copy-fallback">Copy unavailable. <a className="text-link" href="mailto:buzzaryanrai@gmail.com">Open your email app ↗</a></p>}
      <div className="contact-links">
        <a className="text-link" href="https://www.linkedin.com/in/aryan-rai-503a59201/" target="_blank" rel="noopener noreferrer">LinkedIn ↗</a>
        <a className="text-link" href="https://github.com/AryanRai" target="_blank" rel="noopener noreferrer">GitHub ↗</a>
        <a className="text-link" href="https://twitter.com/AryanyanRai" target="_blank" rel="noopener noreferrer">X ↗</a>
      </div>
    </section>
  )
}
