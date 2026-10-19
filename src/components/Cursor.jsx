import { useEffect, useRef } from 'react'

export default function Cursor() {
  const dotRef = useRef(null)
  const crossRef = useRef(null)

  useEffect(() => {
    if (!window.matchMedia('(pointer: fine)').matches) return

    const dot = dotRef.current
    const cross = crossRef.current
    if (!dot || !cross) return

    let mx = -200, my = -200
    let cx = -200, cy = -200
    let rafId

    const move = (e) => {
      mx = e.clientX
      my = e.clientY
      dot.style.transform = `translate(${mx}px,${my}px)`
    }

    const lerp = (a, b, t) => a + (b - a) * t

    const tick = () => {
      cx = lerp(cx, mx, 0.1)
      cy = lerp(cy, my, 0.1)
      cross.style.transform = `translate(${cx}px,${cy}px)`
      rafId = requestAnimationFrame(tick)
    }

    const onEnter = () => cross.classList.add('hover')
    const onLeave = () => cross.classList.remove('hover')

    const bind = () => {
      document.querySelectorAll('a,button,[role=button],summary,.wl-row-header').forEach(el => {
        el.addEventListener('mouseenter', onEnter)
        el.addEventListener('mouseleave', onLeave)
      })
    }

    window.addEventListener('mousemove', move)
    rafId = requestAnimationFrame(tick)
    bind()

    const mo = new MutationObserver(bind)
    mo.observe(document.body, { childList: true, subtree: true })

    return () => {
      window.removeEventListener('mousemove', move)
      cancelAnimationFrame(rafId)
      mo.disconnect()
    }
  }, [])

  return (
    <>
      <div className="c-dot" ref={dotRef} aria-hidden="true" />
      <div className="c-cross" ref={crossRef} aria-hidden="true" />
    </>
  )
}
