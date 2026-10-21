> Historical record of the first controller illustration. The current expanded bench is described in [engineering-stack.md](engineering-stack.md).

# BlueLily controller study

Figure tier, using the Anatomy SVG kit. A small controller on a bench plate explains three areas of BlueLily: sensor interfaces, configurable control logic and communications. Selection lights the relevant physical components; it does not simulate a running board or invent measurements.

The existing portfolio describes a breadboard prototype and a platform for sensing, control and communications (C++, RS485, LoRa, CAN). This is a conceptual board illustration, not a circuit schematic, manufactured PCB layout or claim about a particular MCU or pin count. Photos of the actual prototype remain in the project index and timeline.

## Parts planned before geometry

- Support: four feet, one bevelled bench plate, four square standoffs, one PCB, four mounting fasteners.
- Control: one MCU package, 24 leads, one crystal, four decoupling components, one reset switch with a cap.
- Sensing: two interface packages, four passives, one six-way input connector body and six contacts.
- Communications: one bus transceiver, four leads, one shielded radio module, one terminal body, three terminal contacts.
- Power: one socket body with an inset opening, one regulator, two capacitors and two status LED packages.
- Surface details: closed solder pads, connector recesses, mounting-head recesses, pin-one marker, board perimeter and copper routes between real endpoints. No floating labels or decorative wiring.

World units are illustrative. Camera: azimuth 42 degrees, elevation 36 degrees. Parts are drawn by support layer and then depth within each layer. All solids are bevelled slabs; there are no tubes, lathed parts or moving geometry. Selecting a region changes its ink tones with a slow transition. A timed tour pauses on hover/focus, stops offscreen and in a hidden tab, and is disabled by reduced-motion preference. Native buttons provide touch and keyboard control.

## Source

Anatomy: https://github.com/wheresryan22/anatomy
Pinned commit: 1482e8469b0a9e0d8cc18ea2740a01423d29ae80 (MIT).
Minimal unchanged kit files and license are in `vendor/anatomy/`.
Regenerate with `npm run figure`; production builds regenerate automatically.

Verify with the native Chrome browser: desktop, 390px viewport, each selected stage, keyboard, paused tour, reduced motion and enlarged SVG detail. This environment uses the native browser instead of the skill's headless capture scripts.

## Verification completed

- Vite production build passed; generator validates the 75-part budget and finite geometry.
- All 69 project and timeline image references resolve locally. Timeline data matches the prior version after normalizing long dashes.
- Chrome desktop and 390px layouts checked; no horizontal page overflow.
- Pointer and keyboard stage selection, project deep link and timeline year navigation checked.
- Reduced-motion emulation: no tour control, no SVG transitions, manual selection works.
- Anatomy line-end audit executed through native Chrome: 18 ends on 22 lines, zero floating ends.
- Figure inspected at 4x. No tube/lathe geometry is used, so the round-part collision audit is not applicable.
