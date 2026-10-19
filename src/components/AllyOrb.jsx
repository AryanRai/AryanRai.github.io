import { useEffect, useRef, useState } from 'react'

// Energy orb shader from Ally desktop: src/components/glow/EnergyOrb.tsx.
// Uses Ally's sunset palette and idle timing, with a softer halo for the portfolio.
const FRAGMENT = `#version 300 es
precision highp float;
uniform float iTime;
uniform vec2 iResolution;
uniform float uSpeed;
uniform float uIntensity;
uniform vec3 uColor0;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform float uGlowRadius;
uniform float uFloor;
out vec4 fragColor;

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * iResolution) / iResolution.y;
  float r = length(uv);

  // uFloor (Ally addition) keeps the orb from fully blinking out between pulses
  float wave = mix(uFloor, 1.0, sin(r * 2.0 - iTime * uSpeed) * 0.5 + 0.5);
  float glow = smoothstep(uGlowRadius, 0.2, r) * wave * uIntensity;

  float t1 = sin(iTime * 0.8 + r * 6.0) * 0.5 + 0.5;
  float t2 = sin(iTime * 0.5 + r * 3.0) * 0.5 + 0.5;

  vec3 color = mix(mix(uColor0, uColor1, t1), uColor2, t2) * glow;
  color += 0.26 * smoothstep(0.55, 0.3, r) * mix(uColor0, uColor2, 0.5);

  float alpha = smoothstep(0.6, 0.2, r) * glow;
  fragColor = vec4(color * alpha, alpha);
}
`;

export default function AllyOrb({ className = '' }) {
  const canvasRef = useRef(null)
  const [ready, setReady] = useState(false)
  useEffect(() => {
    const canvas = canvasRef.current
    const gl = canvas.getContext('webgl2', { alpha: true, premultipliedAlpha: true })
    if (!gl) return
    const shaders = []
    let program, buffer, frame = 0
    let observer, resizeObserver
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)')
    let visible = true, time = 1.5, last = 0
    const compile = (type, source) => {
      const shader = gl.createShader(type)
      shaders.push(shader)
      gl.shaderSource(shader, source)
      gl.compileShader(shader)
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) throw new Error('Orb shader unavailable')
      return shader
    }
    try {
      program = gl.createProgram()
      gl.attachShader(program, compile(gl.VERTEX_SHADER, '#version 300 es\nin vec2 a_position;\nvoid main(){gl_Position=vec4(a_position,0.,1.);}'))
      gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAGMENT))
      gl.linkProgram(program)
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) throw new Error('Orb program unavailable')
      gl.useProgram(program)
      buffer = gl.createBuffer()
      gl.bindBuffer(gl.ARRAY_BUFFER, buffer)
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW)
      const position = gl.getAttribLocation(program, 'a_position')
      gl.enableVertexAttribArray(position)
      gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0)
      gl.enable(gl.BLEND)
      gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA)
      const uniform = name => gl.getUniformLocation(program, name)
      const timeUniform = uniform('iTime'), resolutionUniform = uniform('iResolution')
      ;['#FF6B35', '#F72585', '#FFB347'].forEach((hex, i) => {
        const rgb = [1,3,5].map(start => parseInt(hex.slice(start, start + 2), 16) / 255)
        gl.uniform3f(uniform(`uColor${i}`), ...rgb)
      })
      gl.uniform1f(uniform('uSpeed'), .8)
      gl.uniform1f(uniform('uIntensity'), 1.15)
      gl.uniform1f(uniform('uGlowRadius'), .5)
      gl.uniform1f(uniform('uFloor'), .55)
      const render = now => {
        frame = 0
        if (!visible || document.hidden) { last = 0; return }
        if (!motion.matches && last) time += Math.min((now - last) / 1000, .05) * .8
        last = now
        gl.viewport(0, 0, canvas.width, canvas.height)
        gl.clearColor(0, 0, 0, 0)
        gl.clear(gl.COLOR_BUFFER_BIT)
        gl.uniform1f(timeUniform, time)
        gl.uniform2f(resolutionUniform, canvas.width, canvas.height)
        gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4)
        if (!motion.matches) frame = requestAnimationFrame(render)
      }
      const resume = () => { if (!frame) frame = requestAnimationFrame(render) }
      const resize = () => {
        const pixels = Math.min(768, Math.max(160, Math.round(canvas.clientWidth * Math.min(devicePixelRatio || 1, 2))))
        canvas.width = pixels
        canvas.height = pixels
        resume()
      }
      resizeObserver = new ResizeObserver(resize)
      resizeObserver.observe(canvas)
      observer = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; if (visible) resume() })
      observer.observe(canvas)
      document.addEventListener('visibilitychange', resume)
      motion.addEventListener('change', resume)
      resize()
      setReady(true)
      return () => {
        cancelAnimationFrame(frame)
        observer.disconnect()
        resizeObserver.disconnect()
        document.removeEventListener('visibilitychange', resume)
        motion.removeEventListener('change', resume)
        gl.deleteBuffer(buffer)
        gl.deleteProgram(program)
        shaders.forEach(shader => gl.deleteShader(shader))
      }
    } catch {
      cancelAnimationFrame(frame)
      observer?.disconnect()
      resizeObserver?.disconnect()
      if (buffer) gl.deleteBuffer(buffer)
      if (program) gl.deleteProgram(program)
      shaders.forEach(shader => gl.deleteShader(shader))
    }
  }, [])
  return <span className={`ally-orb ${ready ? 'is-ready' : ''} ${className}`} aria-hidden="true"><span className="ally-orb-fallback" /><canvas ref={canvasRef} /></span>
}
