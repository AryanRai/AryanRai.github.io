import { useEffect, useRef } from 'react'

export default function DotCursor() {
  const dotRef = useRef(null)
  const trailRef = useRef(null)
  useEffect(() => {
    const pointer = matchMedia('(pointer: fine) and (hover: hover)')
    const motion = matchMedia('(prefers-reduced-motion: reduce)')
    const dot = dotRef.current, trail = trailRef.current
    let frame = 0, shown = false
    const target = { x: -100, y: -100 }, current = { x: -100, y: -100 }
    const enabled = () => pointer.matches && !motion.matches
    const draw = () => {
      frame = 0
      current.x += (target.x - current.x) * .2
      current.y += (target.y - current.y) * .2
      trail.style.transform = `translate3d(${current.x}px,${current.y}px,0)`
      if (Math.abs(target.x - current.x) + Math.abs(target.y - current.y) > .1) frame = requestAnimationFrame(draw)
    }
    const hide = () => {
      shown = false
      dot.classList.remove('is-visible')
      trail.classList.remove('is-visible')
      document.documentElement.classList.remove('has-dot-cursor')
    }
    const move = event => {
      if (!enabled() || event.pointerType === 'touch') { hide(); return }
      const editing = Boolean(event.target.closest('input, textarea, [contenteditable="true"]'))
      if (editing) { hide(); return }
      target.x = event.clientX; target.y = event.clientY
      if (!shown) { current.x = target.x; current.y = target.y; shown = true }
      dot.classList.add('is-visible')
      trail.classList.add('is-visible')
      document.documentElement.classList.add('has-dot-cursor')
      const interactive = Boolean(event.target.closest('a, button, summary, [role="button"]'))
      dot.classList.toggle('is-interactive', interactive)
      trail.classList.toggle('is-interactive', interactive)
      dot.style.transform = `translate3d(${target.x}px,${target.y}px,0)`
      if (!frame) frame = requestAnimationFrame(draw)
    }
    const pointerOut = event => { if (!event.relatedTarget) hide() }
    const modeChanged = () => { if (!enabled()) hide() }
    addEventListener('pointermove', move, { passive: true })
    addEventListener('pointerout', pointerOut)
    addEventListener('blur', hide)
    motion.addEventListener('change', modeChanged)
    pointer.addEventListener('change', modeChanged)
    return () => {
      cancelAnimationFrame(frame)
      removeEventListener('pointermove', move)
      removeEventListener('pointerout', pointerOut)
      removeEventListener('blur', hide)
      motion.removeEventListener('change', modeChanged)
      pointer.removeEventListener('change', modeChanged)
      hide()
    }
  }, [])
  return <><span className="cursor-dot" ref={dotRef} aria-hidden="true"><i /></span><span className="cursor-trail" ref={trailRef} aria-hidden="true"><i /></span></>
}
