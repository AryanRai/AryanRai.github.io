# From the MCU to the whole system

Historical bench study, superseded by the scroll-driven complete-machine sequence in [scroll-systems.md](scroll-systems.md).

Anatomy Hero tier: one illustrative robotics integration bench, 123 solid parts. Expand the existing controller study with a battery bay, power distribution, an open structural frame, and a workstation. This is a map of engineering work, not an actual wiring diagram or a claim that all projects use the same hardware.

## Concept and interaction

Selecting a hardware scale highlights the relevant physical parts of the bench: MCU, sensor interfaces, battery/power stage, PCB, then outer chassis. The right-hand software track selects the corresponding firmware, communications, control, simulation or application work. UAVs, robot arms, rover and space hardware are complete-system branches, represented by the user's real project photographs and linked descriptions. They are not successive stages of one machine.

The supported scope includes firmware at ANT61, rocketry sensors, BlueLily, SIRI power distribution/PCB/CAN integration, Sydney UAV, Imitation Machines, Orbit and simulation. Power is described as battery packs and power distribution, without inventing a voltage rating or claiming an HV certification. The user's requested high-voltage-to-low-voltage scope is shown as the relationship between the power and sensing domains, with no unsupported numerical specifications.

## Parts before geometry

Retain the controller's 75 solids: PCB, package and 24 leads, sensor packages and contacts, reset switch, crystal, passives, connectors, radio module, support plate, feet, posts and fasteners.

Add the physical context:
- Frame: two long side members, two end members, four corner brackets, four mount fasteners.
- Power bay: carrier tray, four prismatic pack sections, two hold-down bars, positive and negative contact blocks, fuse housing and cover, distribution bus, two output contacts.
- Workstation: stand foot, vertical support, display case, inset display surface, keyboard base and 18 keycaps.
- Surface details: fastener recesses, battery lid seams, connector recesses, screen graphics in the face plane and a PCB perimeter. Every unclosed signal trace terminates on solder pads. Screen marks are explicitly printed interface marks, not live telemetry.

The illustration uses only supported bevelled slabs and planar face graphics. No invented pipework, moving solid geometry or voltage telemetry. Static geometry is generated with the vendored Anatomy kit at its existing pinned revision. A slow optional tour moves between areas; hover, focus, offscreen visibility and reduced motion pause it. All selections are native buttons, also usable by keyboard and touch.

## Layout

Restore the opening and existing design from `c02fa9b`, the commit immediately before today's redesign. Insert the new light section directly after the original opening. The hardware selector and parallel software selector share one state model. Show a clear selected step, its relevant software layer, explanatory copy, evidence links and the corresponding project image. Keep timeline data and Canva galleries.

## Verification

- Restored `src/landing.css` exactly from c02fa9b; the original Hero differs only by its new How I work anchor. Existing copy uses normal hyphens and the prior no-red preference remains.
- Timeline content is unchanged apart from dash normalization. All 13 layer/branch entries reference existing photos and projects.
- Chrome: all five hardware choices, all five software choices and all three system branches update their geometry emphasis, captions, photos and project links. Keyboard Tab/Enter selection works.
- Desktop and 390px mobile inspected. Mobile overflow caused by the hardware selector's intrinsic grid size was fixed with zero minimum widths; no horizontal page overflow remains.
- Reduced-motion emulation: transitions are zero-duration, the tour is absent and manual selection still works.
- Native Chrome line-end audit: 18 ends, 43 lines, zero floating ends. The complete bench was inspected at 4x. No tubes, cables or lathed solids are used.
- Vite production build splits the engineering section into its own bundle.
