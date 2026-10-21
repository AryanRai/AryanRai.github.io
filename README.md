# Aryan Rai — portfolio

React and Vite portfolio for robotics, embedded systems and AI. The design restores the centered monochrome opening from c02fa9b, with the existing journal, photography and story sections. A separate light engineering section follows the opening.

## Development

- `npm ci` to install dependencies.
- `npm run dev` to preview locally.
- `npm run build` to produce `dist/`.
- `npm run preview` to check the production build.

Edit components in `src/components/`, project content in `src/data/projects.js`, the journey in `src/data/timeline.js`, and styling in `src/index.css` and `src/landing.css`. The selected work section links into the searchable project index. Timeline years can be selected from the year navigation. Keyboard navigation and reduced motion are supported.

Assets served by Vite live in `public/`. The printable experience summary is `public/resume.html`, styled by `public/resume.css`. Root-level static files are retained for historical links; `build.py` is the legacy generator and should not be used to regenerate the React homepage.

## Deployment

The existing GitHub Actions workflow builds `dist/` and deploys to GitHub Pages on pushes to `main`. Live address: https://aryanrai.github.io/.

## Content

The existing work history and project photography are preserved. SIRI, UAV, rocketry and employer projects are collaborative work; descriptions identify Aryan's contribution. Source information comes from the September 2026 resume and October 2026 portfolio updates.

## Image curation and journal

The journal presents open year chapters with captioned images, stable image frames, and direct links to full-size assets. The original opening uses native sticky positioning on desktop; reduced-motion and mobile visitors use normal scrolling. The interactive engineering section scrolls normally. Additional galleries live in `src/data/projectGalleries.js`.

`image-sources.json` records the new photos' origins: Aryan's 28 September 2026 Canva portfolio, the Perception website repository, public project screenshots, and the public Perception Antler announcement on LinkedIn. Photos are optimized as WebP, lazy-loaded, and retain team attribution where applicable. Local source PDFs and private contact details are not published.

The question sequence in `src/components/QuestionStory.jsx` pairs three original questions with real project images. Native sticky panels reveal the answers as visitors scroll; reduced-motion visitors receive a static sequence. The existing first-visit signature animation remains separate, and direct section/project links bypass it.

The desktop dot cursor uses a light eased trail and local grain texture, with native text cursors in editable fields and native pointers for touch/reduced-motion visitors. Question answers combine real project photos into layered collages rather than using stock or generated imagery.

## Interactive engineering section

The [Anatomy skill](https://github.com/wheresryan22/anatomy) supplies the isometric drawing style and geometry kit. An [Anime.js](https://github.com/juliangarnier/anime) timeline turns ordinary page scrolling into a reversible sequence after the question scenes: MCU, PCB, exploded power/frame assembly, UAV, robot arm, rover, space hardware, then simulation and applications. The complete machines are illustrations, with the user's actual project photos and links alongside. Existing question collages, UAV/Perception photography and CV timeline are preserved.

`npm run figure` runs `scripts/build-systems.mjs`, regenerating the assembly data and four standalone machine SVGs. Production builds do this automatically. Only the exploded assembly stays in the DOM; machine drawings are separate cached image assets. The build checks closed meshes and resolves paint order from projected surface intersections. Motion stops when settled/offscreen, native chapter buttons are optional shortcuts, and reduced motion gets all eight chapters as a static illustrated list. The vendored kit retains its MIT license. See `docs/scroll-systems.md` for the concept and verification; the earlier bench study is documented in `docs/engineering-stack.md`.
