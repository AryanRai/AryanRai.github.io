import { useEffect, useRef, useState } from 'react'

const TRACK_ID = '0Mcj0sP4xiyctG9kDY86j8'
const TRACK_URL = `https://open.spotify.com/track/${TRACK_ID}`
let spotifyAPI

function loadSpotifyAPI() {
  if (spotifyAPI) return spotifyAPI
  spotifyAPI = new Promise((resolve, reject) => {
    window.onSpotifyIframeApiReady = resolve
    const script = document.createElement('script')
    script.src = 'https://open.spotify.com/embed/iframe-api/v1'
    script.async = true
    script.onerror = () => { spotifyAPI = null; reject(new Error('Spotify unavailable')) }
    document.head.appendChild(script)
  })
  return spotifyAPI
}

export default function MusicPlayer() {
  const [loaded, setLoaded] = useState(false)
  const [open, setOpen] = useState(false)
  const [playing, setPlaying] = useState(false)
  const [ready, setReady] = useState(false)
  const [fallback, setFallback] = useState(false)
  const mountRef = useRef(null)
  const controllerRef = useRef(null)
  const playRequested = useRef(false)

  useEffect(() => {
    if (!loaded) return
    let active = true
    const fail = () => {
      if (!active) return
      active = false
      controllerRef.current?.destroy()
      controllerRef.current = null
      setPlaying(false)
      setFallback(true)
    }
    const timeout = setTimeout(fail, 15000)
    loadSpotifyAPI().then(api => {
      if (!active || !mountRef.current) return
      api.createController(mountRef.current, { uri: `spotify:track:${TRACK_ID}`, width: '100%', height: 152, theme: '0' }, controller => {
        if (!active) { controller.destroy(); return }
        controllerRef.current = controller
        controller.addListener('ready', () => {
          if (!active) return
          clearTimeout(timeout)
          setReady(true)
          if (playRequested.current) controller.play()
        })
        controller.addListener('playback_update', event => {
          if (active) setPlaying(!event.data.isPaused)
        })
      })
    }).catch(fail)
    return () => {
      active = false
      clearTimeout(timeout)
      controllerRef.current?.destroy()
      controllerRef.current = null
    }
  }, [loaded])

  const toggle = () => {
    if (fallback) { setOpen(value => !value); return }
    if (playing) {
      playRequested.current = false
      controllerRef.current?.pause()
    } else {
      playRequested.current = true
      if (ready && controllerRef.current) controllerRef.current.play()
      else { setLoaded(true); setOpen(true) }
    }
  }

  return <aside className="music-widget" aria-label="Optional music">
    {loaded && <div className="music-panel" id="music-panel" hidden={!open}>
      <div className="music-panel-heading"><div><strong>Warriors</strong><span>Too Many Zooz</span></div><button type="button" onClick={() => setOpen(false)} aria-label="Hide music player">×</button></div>
      {!ready && !fallback && <p className="music-loading" role="status">Loading Spotify…</p>}
      {fallback ? <iframe title="Warriors by Too Many Zooz on Spotify" src={`https://open.spotify.com/embed/track/${TRACK_ID}?theme=0`} width="100%" height="152" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" /> : <div className="spotify-mount"><div ref={mountRef} /></div>}
      <div className="music-panel-footer"><span>{playing ? 'Playing on Spotify' : 'Press play in Spotify if prompted.'}</span><a href={TRACK_URL} target="_blank" rel="noopener noreferrer">Open Spotify ↗</a></div>
    </div>}
    <button type="button" className="music-toggle" aria-label={fallback ? 'Open Spotify controls' : playing ? 'Pause music' : 'Play Warriors by Too Many Zooz'} aria-pressed={playing} onClick={toggle}>
      <svg viewBox="0 0 24 24" width="15" height="15" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true"><path d="M11 5 6 9H3v6h3l5 4V5Z" />{playing ? <><path d="M15 8a6 6 0 0 1 0 8M18 5a10 10 0 0 1 0 14" /></> : <path d="m16 9 6 6m0-6-6 6" />}</svg>
      <span>{fallback ? 'Spotify player' : playing ? 'Sound on' : 'Sound off'}</span><span className="music-spotify" aria-hidden="true">♫</span>
    </button>
    {loaded && <button type="button" className="music-details-toggle" aria-label={open ? 'Hide Spotify player' : 'Show Spotify player'} aria-expanded={open} aria-controls="music-panel" onClick={() => setOpen(value => !value)}>{open ? '⌄' : '⌃'}</button>}
  </aside>
}
