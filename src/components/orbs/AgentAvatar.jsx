// Adapted from Ally desktop.
import { jsx } from "react/jsx-runtime";
const cn = (...names) => names.filter(Boolean).join(" ");
import { useEffect, useRef } from "react";
const GRID_SIZE = 6;
const PULSE_SPEED = 2e-3;
const PULSE_AMPLITUDE = 22;
const BREATHE_SPEED = 1e-3;
const BREATHE_AMPLITUDE = 10;
const WAVE_SPEED = 15e-4;
const WAVE_AMPLITUDE = 15;
const WAVE_LENGTH = 3;
const SPARKLE_SPEED = 4e-3;
const SPARKLE_THRESHOLD = 0.92;
const SPARKLE_BOOST = 25;
const SCALE_PULSE_SPEED = 8e-4;
const SCALE_PULSE_AMOUNT = 0.03;
const HUE_SPREAD = 45;
const GLOW_RADIUS_RATIO = 0.25;
const hashSeed = (str) => {
  let hash = 0;
  for (const char of str) {
    hash = (hash << 5) - hash + char.charCodeAt(0) | 0;
  }
  return Math.abs(hash);
};
const createRng = (seed) => {
  let state = seed;
  return () => {
    state = state + 1831565813 | 0;
    let t = Math.imul(state ^ state >>> 15, 1 | state);
    t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t;
    return ((t ^ t >>> 14) >>> 0) / 4294967296;
  };
};
const generatePalette = (hash) => {
  const rng = createRng(hash);
  const baseHue = rng() * 360;
  const sat = 75 + rng() * 20;
  return [
    [baseHue, sat, 55 + rng() * 10],
    [
      (baseHue - HUE_SPREAD + rng() * HUE_SPREAD * 2) % 360,
      sat - 5 + rng() * 10,
      40 + rng() * 15
    ],
    [
      (baseHue - HUE_SPREAD + rng() * HUE_SPREAD * 2) % 360,
      sat - 10 + rng() * 15,
      60 + rng() * 15
    ]
  ];
};
const generateGrid = (hash) => {
  const rng = createRng(hash + 1);
  const grid = [];
  for (let y = 0; y < GRID_SIZE; y++) {
    grid[y] = [];
    for (let x = 0; x < GRID_SIZE; x++) {
      grid[y][x] = {
        colorIndex: Math.floor(rng() * 3),
        phase: rng() * Math.PI * 2,
        brightness: 0.3 + rng() * 0.7,
        sparklePhase: rng() * Math.PI * 2
      };
    }
  }
  return grid;
};
const AgentAvatar = ({
  seed,
  size = 64,
  animated = true,
  className,
  ...props
}) => {
  const canvasRef = useRef(null);
  const rafRef = useRef(0);
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    const ctx = canvas.getContext("2d");
    if (!ctx) {
      return;
    }
    const dpr = window.devicePixelRatio || 1;
    canvas.width = size * dpr;
    canvas.height = size * dpr;
    ctx.scale(dpr, dpr);
    const hash = hashSeed(seed);
    const palette = generatePalette(hash);
    const grid = generateGrid(hash);
    const cellSize = size / GRID_SIZE;
    const half = size / 2;
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let shouldAnimate = animated && !motionQuery.matches;
    const draw = (time) => {
      ctx.clearRect(0, 0, size, size);
      const scale = shouldAnimate ? 1 + Math.sin(time * SCALE_PULSE_SPEED) * SCALE_PULSE_AMOUNT : 1;
      ctx.save();
      ctx.translate(half, half);
      ctx.scale(scale, scale);
      ctx.translate(-half, -half);
      ctx.beginPath();
      ctx.arc(half, half, half, 0, Math.PI * 2);
      ctx.clip();
      ctx.fillStyle = "#08080f";
      ctx.fillRect(0, 0, size, size);
      const breatheOffset = shouldAnimate ? Math.sin(time * BREATHE_SPEED) * BREATHE_AMPLITUDE : 0;
      for (let y = 0; y < GRID_SIZE; y++) {
        for (let x = 0; x < GRID_SIZE; x++) {
          const cell = grid[y][x];
          const [h, s, l] = palette[cell.colorIndex];
          const pulse = shouldAnimate ? Math.sin(time * PULSE_SPEED + cell.phase) * PULSE_AMPLITUDE : 0;
          const waveDist = (x + y) / WAVE_LENGTH;
          const wave = shouldAnimate ? Math.sin(time * WAVE_SPEED + waveDist) * WAVE_AMPLITUDE : 0;
          const sparkleVal = shouldAnimate ? Math.sin(time * SPARKLE_SPEED + cell.sparklePhase) : 0;
          const sparkle = sparkleVal > SPARKLE_THRESHOLD ? (sparkleVal - SPARKLE_THRESHOLD) / (1 - SPARKLE_THRESHOLD) * SPARKLE_BOOST : 0;
          const finalLight = Math.min(
            90,
            Math.max(
              20,
              (l + pulse + breatheOffset + wave + sparkle) * cell.brightness
            )
          );
          const finalSat = Math.min(100, s + 5);
          ctx.shadowColor = `hsl(${h}, ${finalSat}%, ${finalLight}%)`;
          ctx.shadowBlur = cellSize * 0.45;
          ctx.fillStyle = `hsl(${h}, ${finalSat}%, ${finalLight}%)`;
          ctx.fillRect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
      ctx.shadowBlur = 0;
      ctx.restore();
      const [gh, gs, gl] = palette[0];
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      ctx.shadowColor = `hsla(${gh}, ${gs}%, ${gl}%, 0.6)`;
      ctx.shadowBlur = size * GLOW_RADIUS_RATIO;
      ctx.beginPath();
      ctx.arc(half, half, half - 1, 0, Math.PI * 2);
      ctx.strokeStyle = `hsla(${gh}, ${gs}%, ${gl}%, 0.15)`;
      ctx.lineWidth = 2;
      ctx.stroke();
      ctx.restore();
      if (shouldAnimate) {
        rafRef.current = requestAnimationFrame(draw);
      }
    };
    const handleMotionChange = () => {
      cancelAnimationFrame(rafRef.current);
      shouldAnimate = animated && !motionQuery.matches;
      if (shouldAnimate) {
        rafRef.current = requestAnimationFrame(draw);
      } else {
        draw(0);
      }
    };
    motionQuery.addEventListener("change", handleMotionChange);
    if (shouldAnimate) {
      rafRef.current = requestAnimationFrame(draw);
    } else {
      draw(0);
    }
    return () => {
      cancelAnimationFrame(rafRef.current);
      motionQuery.removeEventListener("change", handleMotionChange);
    };
  }, [seed, size, animated]);
  return /* @__PURE__ */ jsx(
    "canvas",
    {
      "aria-label": `Avatar for ${seed}`,
      className: cn("rounded-full", className),
      ref: canvasRef,
      role: "img",
      style: { width: size, height: size },
      ...props
    }
  );
};
var stdin_default = AgentAvatar;
export {
  stdin_default as default
};
