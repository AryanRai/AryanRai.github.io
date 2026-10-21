# Scroll through the engineering work

A sequence of Anatomy-style figures, driven by one reversible Anime.js timeline. The camera starts at a controller package, pulls back to the PCB, separates the power and chassis assemblies, then reveals complete UAV, robot-arm, rover and satellite forms. Software follows the hardware throughout; the last view brings simulation and mission software alongside the machines. These are illustrative assemblies, not replicas or claims of designing every part of the pictured team projects.

Keep the existing opening, question scenes, UAV/Perception photo collage, selected work and CV timeline. Place this sequence after the questions. No autoplay, scroll interception or mandatory tapping. Ordinary scrolling, Page Down and optional chapter links traverse the same sequence. Reduced motion becomes a static, readable list of illustrated chapters.

## Parts planned before drawing

- Electronics: carrier plate, four feet, four mounting posts, PCB, four mounting fasteners, MCU package, 32 leads, crystal, sensor packages, passives, interface headers and contacts, radio shield, connectors, four battery modules, terminals, straps, four frame rails, cover and fasteners.
- UAV: four booms, motor mounts, four motor housings, stators, hubs, two-blade propellers, landing supports/skids, stacked center plates, standoffs, flight controller, battery and straps, GNSS mount, camera and lens.
- Arm: base plate and bolts, pedestal, base joint, shoulder clevis, shoulder joint, upper link and cover, elbow joint, forearm and cover, wrist joint, tool flange, gripper body, two slides, fingers and pads; repeated joint rings and fasteners.
- Rover: six wheels with rims, hubs, tread blocks and fasteners, rocker/bogie suspension links, chassis rails, belly plate, electronics enclosure, power bay, top deck, camera mast, stereo camera bar, two lenses, antenna and front sampling mechanism.
- Space: smallsat structural rails, eight corner fittings, six bus panels, avionics boards, power module, two deployable array hinges, four solar panels with cell grids, antenna base/whip, payload aperture and fasteners.

Geometry is built once with the vendored Anatomy projection and solid renderer. Oblique link prisms and axial wheel/joint meshes supplement the horizontal solids. Every visible mesh is opaque and shaded by its surface normal. Explosion offsets belong to complete mounted assemblies; no wires span separating assemblies. Full vehicles are static meshes, with camera movement and crossfades between different project domains rather than implying a drone physically turns into a rover.

## Narrative and verification

The story connects AI/ML models, robot learning, perception and computer vision to embedded systems and space hardware. Imitation learning and robot integration describe current work; reinforcement learning is explicitly an interest to explore.

Production build and chapter project/photo reference checks pass. The geometry generator validates 672 closed solids and resolves surface ordering; this is not a physical CAD clearance audit. Native Chrome review covered all eight stages on desktop and at 390 x 844, a 375 x 667 rover view, ordinary Page Down scrolling, and the eight static reduced-motion chapters. Main illustrations were also inspected at 4x. No horizontal overflow was observed in the tested mobile views. The final copy-only updates passed the build but could not receive a further visual check because the browser connection timed out, including after one recovery attempt.
