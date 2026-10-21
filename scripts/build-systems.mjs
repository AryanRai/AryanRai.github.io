import { readFileSync, writeFileSync } from 'node:fs'
import * as k from '../vendor/anatomy/iso-kit.mjs'

const W = 900, H = 640
const add = (a,b) => a.map((v,i)=>v+b[i])
const sub = (a,b) => a.map((v,i)=>v-b[i])
const mul = (a,s) => a.map(v=>v*s)
const dot = (a,b) => a.reduce((s,v,i)=>s+v*b[i],0)
const cross = (a,b) => [a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]]
const unit = a => mul(a,1/Math.hypot(...a))
const average = ps => mul(ps.reduce((s,p)=>add(s,p),[0,0,0]),1/ps.length)
const scenes = {}
const palette = readFileSync(new URL('../src/engineering.css',import.meta.url),'utf8').split('\n').filter(line=>line.startsWith('.engineering-section .iso[')||line.startsWith('.engineering-section .material-')).join('\n').replaceAll('.engineering-section ','')

// Sort by surface depth where projected faces actually overlap. A center-only
// sort lets a large solar panel paint over the cells attached to its far edge.
function surfaceOrder(parts,P,view) {
  const bounds=points=>({x0:Math.min(...points.map(p=>p[0])),x1:Math.max(...points.map(p=>p[0])),y0:Math.min(...points.map(p=>p[1])),y1:Math.max(...points.map(p=>p[1]))})
  const overlaps=(a,b)=>a.x0<b.x1-.01&&b.x0<a.x1-.01&&a.y0<b.y1-.01&&b.y0<a.y1-.01
  const area=ps=>ps.reduce((s,p,i)=>{const q=ps[(i+1)%ps.length];return s+p[0]*q[1]-q[0]*p[1]},0)/2
  const side=(a,b,p)=>(b[0]-a[0])*(p[1]-a[1])-(b[1]-a[1])*(p[0]-a[0])
  const intersection=(subject,clip)=>{
    let out=subject
    const sign=Math.sign(area(clip))||1
    for(let i=0;i<clip.length&&out.length;i++) {
      const a=clip[i],b=clip[(i+1)%clip.length],input=out;out=[]
      for(let j=0;j<input.length;j++) {
        const p=input[j],q=input[(j+1)%input.length],sp=side(a,b,p)*sign,sq=side(a,b,q)*sign
        if(sp>=-.00001)out.push(p)
        if((sp>0&&sq<0)||(sp<0&&sq>0))out.push([p[0]+(q[0]-p[0])*sp/(sp-sq),p[1]+(q[1]-p[1])*sp/(sp-sq)])
      }
    }
    return out
  }
  const projected=parts.map(p=>{
    const vertices=p.vertices.map(v=>[...k.iso(v,P),k.depthOf(v,P)])
    const faces=p.faces.map(f=>{
      const a=p.vertices[f[0]],b=p.vertices[f[1]],c=p.vertices[f[2]]
      let n=cross(sub(b,a),sub(c,a))
      if(dot(n,sub(average(f.map(i=>p.vertices[i])),p.center))<0)n=mul(n,-1)
      if(dot(n,view)<1e-7)return null
      const points=f.map(i=>vertices[i]),normal=cross(sub(points[1],points[0]),sub(points[2],points[0]))
      if(Math.abs(normal[2])<1e-8)return null
      return {points:points.map(p=>p.slice(0,2)),bounds:bounds(points),depth:xy=>points[0][2]-(normal[0]*(xy[0]-points[0][0])+normal[1]*(xy[1]-points[0][1]))/normal[2]}
    }).filter(Boolean)
    return {bounds:bounds(vertices),faces}
  })
  const edges=parts.map(()=>new Set()), incoming=parts.map(()=>0)
  for(let i=0;i<parts.length;i++)for(let j=i+1;j<parts.length;j++) {
    const a=projected[i],b=projected[j]
    if(!overlaps(a.bounds,b.bounds))continue
    let front=false,back=false
    for(const fa of a.faces)for(const fb of b.faces) {
      if(!overlaps(fa.bounds,fb.bounds))continue
      const polygon=intersection(fa.points,fb.points)
      if(polygon.length<3||Math.abs(area(polygon))<.02)continue
      const xy=[polygon.reduce((s,p)=>s+p[0],0)/polygon.length,polygon.reduce((s,p)=>s+p[1],0)/polygon.length]
      const delta=fa.depth(xy)-fb.depth(xy)
      if(delta>.01)front=true
      if(delta<-.01)back=true
    }
    if(front===back)continue
    const [from,to]=front?[j,i]:[i,j]
    edges[from].add(to);incoming[to]++
  }
  const order=[],remaining=new Set(parts.map((_,i)=>i))
  while(remaining.size) {
    const ready=[...remaining].filter(i=>incoming[i]===0).sort((a,b)=>parts[a].depth-parts[b].depth)
    if(!ready.length) {
      const find=(i,path=[])=>{if(path.includes(i))return [...path.slice(path.indexOf(i)),i];for(const j of edges[i])if(remaining.has(j)){const cycle=find(j,[...path,i]);if(cycle)return cycle}}
      const cycle=find([...remaining][0])||[]
      throw new Error(`Cyclic surface order: ${cycle.map(i=>`${i}:${parts[i].name} at ${parts[i].center.map(v=>v.toFixed(1))}`).join(' -> ')}`)
    }
    const next=ready[0];remaining.delete(next);order.push(parts[next]);for(const to of edges[next])incoming[to]--
  }
  return order
}

function model(id, label, build, options={}) {
  const parts=[]
  function put(name, vertices, faces, material='metal', assembly='body', detail=null) {
    parts.push({name,vertices,faces,material,assembly,detail,center:average(vertices)})
  }
  function prism(name, ring, axis, material='metal', assembly='body') {
    const n=ring.length, vertices=[...ring,...ring.map(p=>add(p,axis))]
    const faces=[Array.from({length:n},(_,i)=>n-1-i),Array.from({length:n},(_,i)=>n+i)]
    for(let i=0;i<n;i++) faces.push([i,(i+1)%n,(i+1)%n+n,i+n])
    put(name,vertices,faces,material,assembly)
  }
  function box(name,x,y,z,w,d,h,material='metal',assembly='body') {
    const ring=[[x,y,z],[x+w,y,z],[x+w,y+d,z],[x,y+d,z]]
    prism(name,ring,[0,0,h],material,assembly)
    parts.at(-1).slab={x,y,w,d,r:Math.min(1.5,w/6,d/6),z,h}
  }
  function cylinder(name,c,axis,r,length,material='metal',assembly='body',steps=48) {
    const a=unit(axis), u=unit(cross(Math.abs(a[2])<.9?[0,0,1]:[0,1,0],a)), v=cross(a,u)
    const ring=Array.from({length:steps},(_,i)=>add(c,add(mul(u,r*Math.cos(i/steps*2*Math.PI)),mul(v,r*Math.sin(i/steps*2*Math.PI)))))
    prism(name,ring,mul(a,length),material,assembly)
    parts.at(-1).round=true
  }
  function beam(name,a,b,width,depth,material='metal',assembly='body') {
    const dir=unit(sub(b,a)), u=unit(cross(Math.abs(dir[2])<.9?[0,0,1]:[0,1,0],dir)), v=cross(dir,u)
    const ring=[[-1,-1],[1,-1],[1,1],[-1,1]].map(([s,t])=>add(a,add(mul(u,s*width/2),mul(v,t*depth/2))))
    prism(name,ring,sub(b,a),material,assembly)
  }
  function bolt(x,y,z,assembly='body',r=1.5) { cylinder('fastener',[x,y,z],[0,0,1],r,1.2,'dark',assembly,12) }
  function pcb(x,y,z,w,d,assembly='electronics',full=false) {
    box('PCB substrate',x,y,z,w,d,2,'pcb',assembly)
    const cx=x+w*.48,cy=y+d*.48, size=full?24:Math.min(w,d)*.28
    box('MCU package',cx-size/2,cy-size/2,z+2,size,size,3,'dark',full?'chip':assembly)
    const leads=full?8:4
    for(let i=0;i<leads;i++) {
      const q=(i+.5)*size/leads
      box('lead',cx-size/2-3,cy-size/2+q-.5,z+2,3,1,1,'metal',full?'chip':assembly)
      box('lead',cx+size/2,cy-size/2+q-.5,z+2,3,1,1,'metal',full?'chip':assembly)
      box('lead',cx-size/2+q-.5,cy-size/2-3,z+2,1,3,1,'metal',full?'chip':assembly)
      box('lead',cx-size/2+q-.5,cy+size/2,z+2,1,3,1,'metal',full?'chip':assembly)
    }
    for(let i=0;i<5;i++) box('passive',x+6+i*(w-12)/5,y+d-10,z+2,4,2,2,'dark',assembly)
    box('radio shield',x+w-23,y+6,z+2,17,14,5,'metal',assembly)
    box('sensor',x+7,y+7,z+2,10,9,3,'dark',assembly)
    box('connector',x+4,y+d*.45,z+2,7,d*.3,5,'dark',assembly)
    for(let i=0;i<4;i++) box('header pin',x+6,y+d*.45+2+i*d*.06,z+7,2,1,3,'metal',assembly)
    for(const bx of [x+3,x+w-3]) for(const by of [y+3,y+d-3]) bolt(bx,by,z+2,assembly,1)
  }
  build({box,cylinder,beam,bolt,pcb,prism,parts})
  for(const part of parts) {
    if(part.vertices.some(vertex=>vertex.some(value=>!Number.isFinite(value))))throw new Error(`${id}: non-finite vertex`)
    const edges=new Map()
    for(const face of part.faces)for(let i=0;i<face.length;i++) {
      const edge=[face[i],face[(i+1)%face.length]].sort((a,b)=>a-b).join(':')
      edges.set(edge,(edges.get(edge)||0)+1)
    }
    if([...edges.values()].some(count=>count!==2))throw new Error(`${id}: open mesh in ${part.name}`)
  }
  const points=parts.flatMap(p=>p.vertices)
  const P=k.fitProjection(points,W,H,{pad:options.pad||70,azimuth:options.azimuth||44,elevation:options.elevation||30})
  const camera=k.cameraOf(P), view=[camera.cosA*camera.cosE,camera.sinA*camera.cosE,camera.sinE]
  const light=unit([-1,1,2])
  const normalOf=(face,p)=>{
    let n=unit(cross(sub(p.vertices[face[1]],p.vertices[face[0]]),sub(p.vertices[face[2]],p.vertices[face[0]])))
    if(dot(n,sub(average(face.map(i=>p.vertices[i])),p.center))<0) n=mul(n,-1)
    return n
  }
  for(const p of parts) {
    if(p.slab) {
      const {z,h,...plan}=p.slab
      p.body=k.solidSvg(k.slabOf(plan,z,h,P,4,Math.min(.65,h/4)),{tone:p.material==='dark'?'lo':'mid',crease:'lo'})
    } else {
      const normals=p.faces.map(f=>normalOf(f,p))
      const faces=p.faces.map((f,i)=>({f,n:normals[i],visible:dot(normals[i],view)>1e-7}))
      const paths=faces.filter(f=>f.visible).map(({f,n})=>{
        const shade=Math.max(0,Math.min(3,Math.floor((dot(n,light)+1)*2)))
        return `<path class="${n[2]>.8?'iso-top':'iso-shade'}" data-shade="${shade}" d="${k.pathOf(f.map(i=>k.iso(p.vertices[i],P)),true)}"/>`
      }).join('')
      const edges=new Map()
      faces.forEach(({f,visible,n})=>f.forEach((v,i)=>{
        const next=f[(i+1)%f.length],key=[v,next].sort((a,b)=>a-b).join(':')
        if(!edges.has(key)) edges.set(key,{a:v,b:next,faces:[]})
        edges.get(key).faces.push({visible,n})
      }))
      const outline=[...edges.values()].filter(e=> e.faces.some(f=>f.visible) && (!e.faces.every(f=>f.visible)||(!p.round || Math.abs(dot(e.faces[0].n,e.faces[1].n))<.2)))
      p.body=`<g class="iso-solid">${paths}${k.lineSvg(outline.map(e=>k.pathOf([k.iso(p.vertices[e.a],P),k.iso(p.vertices[e.b],P)])).join(''),{tone:'mid'})}</g>`
    }
    p.depth=k.depthOf(p.center,P)
  }
  // Fixed machine assemblies are painted back-to-front. Exploded tiers are
  // emitted separately; their vertical separation keeps their order stable.
  const groups=options.groups || ['body','electronics','chip']
  const body=groups.map(group=>`<g data-assembly="${group}">${surfaceOrder(parts.filter(p=>p.assembly===group),P,view).map(p=>`<g class="material-${p.material}" data-part="${p.name}">${p.body}</g>`).join('')}</g>`).join('')
  const svg=k.figureSvg({width:W,height:H,label,body})
  if(/NaN|Infinity/.test(svg)) throw new Error(`${id}: invalid geometry`)
  if(parts.length<40) throw new Error(`${id}: under-detailed figure`)
  scenes[id]={parts:parts.length,label}
  if(id==='assembly') Object.assign(scenes[id],{svg,chip:k.iso([-2.4,-1.6,55],P),projection:P})
  else writeFileSync(new URL(`../src/generated/system-${id}.svg`,import.meta.url),k.figureSvg({width:W,height:H,label,standalone:'light',body:`<style>${palette}</style>${body}`})+'\n')
  console.log(`${id}: ${parts.length} closed solid parts; surface order resolved`)
}

model('assembly','Exploded electronics assembly with an MCU, sensor PCB, battery modules and structural carrier',({box,bolt,pcb})=>{
  for(const x of [-78,70]) for(const y of [-54,46]) box('rubber foot',x,y,-12,8,8,12,'dark','frame')
  box('base plate',-84,-60,0,168,120,4,'metal','frame')
  for(const x of [-84,78]) box('side rail',x,-60,4,6,120,22,'metal','frame')
  for(const y of [-60,54]) box('end rail',-78,y,4,156,6,10,'metal','frame')
  for(const x of [-70,64]) for(const y of [-46,40]) {box('standoff',x,y,4,6,6,42,'metal','frame');bolt(x+3,y+3,46,'frame')}
  box('battery tray',-54,-35,4,108,70,3,'metal','power')
  for(let i=0;i<4;i++) box('battery module',-50+i*25,-30,7,23,60,22,'battery','power')
  for(const y of [-20,18]) box('battery strap',-52,y,29,104,4,2,'dark','power')
  for(const x of [-42,36]) box('power terminal',x,31,8,6,7,6,'metal','power')
  box('fuse block',-18,34,7,36,13,9,'dark','power')
  pcb(-60,-40,46,120,80,'electronics',true)
  box('crystal',-13,17,48,14,6,3,'metal','electronics')
  for(const x of [-72,66]) box('lid rail',x,-48,61,6,96,3,'metal','cover')
  for(const y of [-48,42]) box('lid crossmember',-66,y,61,132,6,3,'metal','cover')
  for(const x of [-69,69]) for(const y of [-45,45]) bolt(x,y,64,'cover')
},{groups:['frame','power','electronics','chip','cover'],elevation:36,pad:100})

model('uav','Complete quadrotor with four propellers, motor booms, landing gear, flight controller and battery',({box,beam,cylinder,pcb,bolt,prism})=>{
  for(const y of [-25,25]) {
    for(const x of [-24,24]) beam('landing strut',[x,y,24],[x,y*1.9,4],5,5,'metal')
    box('landing skid',-50,y*1.9-3,0,100,6,4,'dark')
  }
  for(const x of [-90,90]) for(const y of [-74,74]) {
    const motorDirection=unit([x,y,0])
    beam('carbon boom',[Math.sign(x)*24,Math.sign(y)*18,34.5],sub([x,y,34.5],mul(motorDirection,13)),12,7,'dark')
    cylinder('motor mount',[x,y,31],[0,0,1],13,7,'metal')
    cylinder('motor housing',[x,y,38],[0,0,1],11,13,'dark')
    cylinder('motor bell',[x,y,51],[0,0,1],12,4,'metal')
    for(let i=0;i<8;i++) {const a=i*Math.PI/4;box('motor vent',x+8*Math.cos(a)-1,y+8*Math.sin(a)-1,55,2,2,1,'dark')}
    const angle=(x*y>0?.35:-.35), rotate=([u,v])=>[x+u*Math.cos(angle)-v*Math.sin(angle),y+u*Math.sin(angle)+v*Math.cos(angle),57]
    prism('two-blade propeller',[[-42,-3],[-13,-7],[0,-4],[13,-7],[42,-3],[42,3],[13,7],[0,4],[-13,7],[-42,3]].map(rotate),[0,0,1.4],'dark')
    cylinder('prop hub',[x,y,55],[0,0,1],4,5,'metal')
  }
  box('lower deck',-37,-29,27,74,58,4,'metal')
  for(const x of [-31,27]) for(const y of [-23,19]) box('deck standoff',x,y,31,4,4,18,'metal')
  box('upper deck',-37,-29,49,74,58,3,'metal')
  pcb(-23,-18,52,46,36,'body')
  box('battery',-25,-20,31,50,40,15,'battery')
  for(const x of [-17,13]) box('battery strap',x,-21,46,4,42,2,'dark')
  cylinder('GNSS mast',[-27,-20,52],[0,0,1],2,18,'metal')
  cylinder('GNSS receiver',[-27,-20,70],[0,0,1],8,4,'light')
  box('camera bracket',24,-9,15,5,18,12,'metal')
  box('camera',29,-8,17,13,16,12,'dark')
  cylinder('camera lens',[42,0,23],[1,0,0],5,4,'glass')
  for(const x of [-31,31]) for(const y of [-23,23]) bolt(x,y,52)
},{elevation:31,pad:60})

model('arm','Complete articulated robot arm with shoulder, elbow, wrist and parallel gripper',({box,beam,cylinder,bolt})=>{
  box('base foot',-45,-38,0,90,76,7,'metal')
  for(const x of [-35,35]) for(const y of [-28,28]) bolt(x,y,7,'body',3)
  cylinder('pedestal',[0,0,7],[0,0,1],25,17,'dark')
  cylinder('base rotation',[0,0,24],[0,0,1],27,12,'light')
  box('shoulder bracket',-17,-19,36,34,38,25,'metal')
  const joints=[[0,0,62],[28,0,155],[111,0,130],[132,0,91]]
  for(let i=0;i<joints.length;i++) {
    const [x,y,z]=joints[i],r=[19,16,13,10][i]
    cylinder('joint housing',[x,y-19,z],[0,1,0],r,38,'light')
    cylinder('joint cap',[x,y+19,z],[0,1,0],r*.76,3,'dark')
    cylinder('joint center',[x,y+22,z],[0,1,0],r*.35,1.5,'metal')
    for(let b=0;b<6;b++) {const a=b*Math.PI/3;cylinder('joint bolt',[x+r*.57*Math.cos(a),y+22,z+r*.57*Math.sin(a)],[0,1,0],1.1,1,'metal','body',12)}
    if(i<joints.length-1) {
      const next=joints[i+1],dir=unit(sub(next,joints[i]))
      beam('arm link',add(joints[i],mul(dir,r*.7)),sub(next,mul(dir,[16,13,10][i]*.7)),21-i*3,24-i*3,'light')
      beam('link access cover',add(add(joints[i],mul(dir,r)),[0,13,0]),add(sub(next,mul(dir,[16,13,10][i])),[0,13,0]),10-i,2,'metal')
    }
  }
  cylinder('tool flange',[132,0,81],[0,0,-1],12,8,'metal')
  box('gripper housing',116,-12,57,32,24,16,'dark')
  for(const x of [117,139]) {
    box('finger slide',x,-10,51,8,20,6,'metal')
    box('gripper finger',x,-7,27,6,14,24,'metal')
    box('finger pad',x+(x===117?6:-2),-7,29,2,14,14,'dark')
  }
},{azimuth:35,elevation:25,pad:62})

model('rover','Six-wheel planetary rover with suspension, electronics deck, stereo mast and sampling arm',({box,beam,cylinder,bolt,pcb})=>{
  for(const side of [-1,1]) {
    const y=side*70
    beam('rocker link',[-65,y*.7,29],[0,y*.7,54],8,8,'metal')
    beam('bogie link',[0,y*.7,54],[65,y*.7,29],8,8,'metal')
    beam('center suspension',[0,y*.7,54],[0,y,29],7,7,'metal')
    for(const x of [-65,0,65]) {
      beam('wheel axle',[x,y*.7,29],[x,y,29],8,8,'metal')
      cylinder('wheel tyre',[x,y-11,27],[0,1,0],27,22,'dark')
      cylinder('wheel rim',[x,y+11,27],[0,1,0],19,2,'metal')
      cylinder('wheel hub',[x,y+13,27],[0,1,0],8,3,'dark')
      for(let i=0;i<12;i++) {
        const a=i*Math.PI/6
        beam('tread rib',[x+27*Math.cos(a),y-10,27+27*Math.sin(a)],[x+27*Math.cos(a),y+10,27+27*Math.sin(a)],3,2,'metal')
      }
      for(let i=0;i<6;i++) {const a=i*Math.PI/3;cylinder('hub bolt',[x+13*Math.cos(a),y+13,27+13*Math.sin(a)],[0,1,0],1.5,1,'dark','body',12)}
    }
  }
  box('belly pan',-70,-42,44,140,84,5,'metal')
  for(const y of [-44,38]) box('chassis rail',-73,y,49,146,6,17,'metal')
  box('electronics enclosure',-54,-30,49,65,60,24,'light')
  box('battery enclosure',15,-30,49,43,60,20,'battery')
  pcb(-46,-23,73,48,44,'body')
  for(const x of [-64,60]) for(const y of [-32,28]) {box('deck mount',x,y,49,4,4,32,'metal');bolt(x+2,y+2,81)}
  box('rear deck',-69,-36,81,55,72,3,'metal')
  box('mast foot',-46,-10,84,22,20,5,'dark')
  box('camera mast',-38,-4,89,7,8,58,'metal')
  box('stereo camera bar',-43,-27,147,17,54,12,'light')
  for(const y of [-19,19]) cylinder('stereo lens',[-26,y,153],[1,0,0],5,5,'glass')
  cylinder('antenna mount',[-56,24,84],[0,0,1],4,4,'dark')
  cylinder('antenna',[-56,24,88],[0,0,1],.9,42,'dark','body',12)
  beam('sampling arm',[65,0,58],[96,0,80],10,12,'metal')
  cylinder('sampling elbow',[96,-8,80],[0,1,0],8,16,'dark')
  beam('sampling forearm',[96,0,80],[119,0,48],7,8,'metal')
  box('sample tool',113,-8,35,15,16,13,'dark')
},{azimuth:40,elevation:27,pad:65})

model('satellite','Small satellite with avionics bus, structural rails, solar arrays, antenna and payload aperture',({box,beam,cylinder,bolt,pcb})=>{
  box('bus bottom panel',-28,-28,0,56,56,3,'metal')
  box('bus rear panel',-28,-28,3,56,3,82,'light')
  box('bus side panel',-28,-25,3,3,50,82,'light')
  for(const x of [-28,24]) for(const y of [-28,24]) box('structural rail',x,y,3,4,4,82,'metal')
  for(const z of [0,82]) for(const x of [-28,22]) for(const y of [-28,22]) box('corner fitting',x,y,z,6,6,6,'dark')
  for(const z of [18,36,54]) pcb(-22,-22,z,44,44,'body')
  box('power module',-18,-18,3,36,36,13,'battery')
  box('top panel',-28,-28,85,56,56,3,'metal')
  cylinder('payload collar',[0,0,88],[0,0,1],15,5,'dark')
  cylinder('payload aperture',[0,0,93],[0,0,1],11,2,'glass')
  cylinder('antenna boss',[20,18,88],[0,0,1],3,4,'dark')
  beam('antenna whip',[20,18,92],[31,27,130],1.4,1.4,'metal')
  for(const side of [-1,1]) {
    beam('array hinge',[side*28,0,44],[side*37,0,44],8,8,'dark')
    for(let i=0;i<2;i++) {
      const x=side===1?37+i*47:-81-i*47
      box('array frame',x,-40,42,44,80,3,'metal')
      for(let col=0;col<3;col++) for(let row=0;row<6;row++) box('solar cell',x+3+col*13,-37+row*12.5,45,11,10.5,.6,'solar')
      for(const bx of [x+2,x+42]) for(const by of [-38,38]) bolt(bx,by,45,'body',.7)
    }
  }
},{azimuth:38,elevation:26,pad:65})

writeFileSync(new URL('../src/generated/systems.json',import.meta.url),JSON.stringify(scenes)+'\n')
