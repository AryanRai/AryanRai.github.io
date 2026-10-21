import { writeFileSync } from 'node:fs'
import * as k from '../vendor/anatomy/iso-kit.mjs'

const width = 620, height = 410
const base = { x: 0, y: 0, w: 184, d: 132, r: 5 }
const board = { x: 9, y: 9, w: 166, d: 114, r: 3 }
const P = k.fitProjection(k.boxCorners(base, -5, 38), width, height, { pad: 65, azimuth: 42, elevation: 36 })
const at = p => k.iso(p, P)
const layers = []
const parts = []
const wrap = (group, body) => `<g class="controller-region region-${group}">${body}</g>`
function slab(name, x, y, w, d, z, h, group = 'structure', layer = 3, tone = 'mid') {
  const plan = { x, y, w, d, r: Math.min(1.4, w / 5, d / 5) }
  const body = k.solidSvg(k.slabOf(plan, z, h, P, 5, Math.min(.5, h / 4)), { tone, crease: 'lo' })
  const part = { name, layer, depth: k.depthOf([x + w / 2, y + d / 2, z + h / 2], P), body: wrap(group, body) }
  parts.push(part)
  return part
}
function topDetail(part, x, y, w, d, z, group = 'structure') {
  part.body += wrap(group, k.lineSvg(k.planOutline({ x, y, w, d, r: .7 }, z, P), { tone: 'mid' }))
}

// Every component sits on a support plane. Layering keeps the board below its parts.
for (const x of [8, 165]) for (const y of [8, 113]) slab('rubber foot', x, y, 11, 11, -5, 5, 'structure', 0, 'lo')
slab('bench plate', 0, 0, 184, 132, 0, 4, 'structure', 1, 'lo')
for (const x of [14, 162]) for (const y of [14, 110]) slab('standoff', x, y, 7, 7, 4, 10, 'structure', 2)
slab('PCB', 9, 9, 166, 114, 14, 2, 'board', 3)
layers.push({ layer: 3.5, depth: 0, body: k.lineSvg(k.planOutline({ ...board, x: 12, y: 12, w: 160, d: 108 }, 16.05, P), { tone: 'faint' }) })

// Copper routes stop at solder lands; no arrows or imaginary telemetry.
const traces = [
  ['sensing', [[34,35],[51,35],[62,46],[72,46]]],
  ['sensing', [[34,42],[46,42],[57,53],[72,53]]],
  ['sensing', [[43,66],[58,66],[66,60],[72,60]]],
  ['control', [[90,82],[90,73],[88,70]]],
  ['control', [[117,90],[106,90],[99,83],[99,70]]],
  ['comms', [[104,46],[111,46],[118,39],[132,39]]],
  ['comms', [[104,53],[119,53],[130,64],[139,64]]],
  ['comms', [[149,69],[149,83],[149,94]]],
  ['power', [[39,100],[55,100],[65,90],[78,90]]],
]
for (const [group, points] of traces) {
  const projected = points.map(([x,y]) => at([x,y,16.08]))
  layers.push({ layer: 3.6, depth: 0, body: wrap(group, k.lineSvg(k.pathOf(projected), { tone: 'mid' }) + k.dotsSvg([projected[0], projected.at(-1)], { size: 1.3, tone: 'hi' })) })
}
for (const x of [14,162]) for (const y of [14,110]) {
  const screw = slab('mounting fastener', x, y, 7, 7, 16, 1.3, 'structure', 4)
  topDetail(screw, x+2.2,y+2.2,2.6,2.6,17.3)
}

// 24 gull-wing lands around a central controller package.
for (let i = 0; i < 6; i++) {
  const offset = 3 + i * 4
  slab('MCU lead west', 71, 39+offset, 5, 1.6, 16, 1, 'control', 4)
  slab('MCU lead east', 102, 39+offset, 5, 1.6, 16, 1, 'control', 4)
  slab('MCU lead north', 76+offset, 34, 1.6, 5, 16, 1, 'control', 4)
  slab('MCU lead south', 76+offset, 65, 1.6, 5, 16, 1, 'control', 4)
}
const mcu = slab('MCU package', 75,38,28,28,17,5,'control',5,'hi')
mcu.body += wrap('control', k.dotsSvg([at([79,42,22])], {size:1.4,tone:'hi'}))
topDetail(mcu,80,43,18,18,22,'control')
slab('crystal',81,77,16,7,16,3,'control',4)
for (const [x,y] of [[64,34],[108,35],[66,73],[104,74]]) slab('decoupling capacitor',x,y,5,3,16,2,'control',4)
slab('reset housing',111,84,12,12,16,3,'control',4)
slab('reset cap',114,87,6,6,19,3,'control',5,'hi')

for (const [x,y] of [[39,30],[37,60]]) {
  const sensor = slab('sensor interface',x,y,17,13,16,4,'sensing',4,'hi')
  topDetail(sensor,x+3,y+3,11,7,20,'sensing')
}
for (let i=0;i<4;i++) slab('input passive',50,79+i*5,7,2.5,16,1.8,'sensing',4)
slab('input header',21,30,9,53,16,4,'sensing',4)
for (let i=0;i<6;i++) slab('input contact',23.5,34+i*8,4,3,20,6,'sensing',5,'hi')

const radio = slab('shielded radio module',128,27,28,23,16,7,'comms',4,'hi')
topDetail(radio,131,30,22,17,23,'comms')
slab('bus transceiver',134,59,19,13,17,4,'comms',5,'hi')
for (let i=0;i<4;i++) slab('transceiver lead',136+i*4,70,1.8,6,16,1,'comms',4)
slab('terminal housing',132,94,29,15,16,9,'comms',4)
for (let i=0;i<3;i++) {
  const terminal = slab('terminal contact',135+i*8,97,5,8,25,.8,'comms',5,'hi')
  topDetail(terminal,136+i*8,99,3,4,25.8,'comms')
}
const power = slab('power socket',26,92,16,17,16,8,'power',4,'hi')
topDetail(power,30,95,8,10,24,'power')
slab('regulator',64,94,11,9,16,3,'power',4)
for (const x of [79,89]) slab('power capacitor',x,99,5,7,16,4,'power',4)
for (const x of [105,114]) slab('status LED',x,107,4,3,16,2,'power',4)

const body = [...parts,...layers].sort((a,b)=>a.layer-b.layer || a.depth-b.depth).map(p=>p.body).join('')
const svg = k.figureSvg({ width,height,label:'Conceptual embedded controller with sensor connectors, central processor and communications modules',body })
if (parts.length < 40 || parts.length > 80) throw new Error(`Figure part budget exceeded: ${parts.length}`)
if (/NaN|Infinity/.test(svg)) throw new Error('Invalid geometry')
writeFileSync(new URL('../src/generated/controller.svg',import.meta.url), svg+'\n')
console.log(`Controller figure: ${parts.length} supported solid parts, ${traces.length} pad-terminated routes.`)
