# Aryan Rai — portfolio

React and Vite portfolio for robotics, embedded systems and AI. The design uses warm paper, burnt orange, technical diagrams and subtle grain, with real project photography.

## Development

- `npm ci` to install dependencies.
- `npm run dev` to preview locally.
- `npm run build` to produce `dist/`.
- `npm run preview` to check the production build.

Edit components in `src/components/`, project content in `src/data/projects.js`, the journey in `src/data/timeline.js`, and styling in `src/index.css`. The selected work section links into the searchable project index. Timeline years expand with native disclosures. Keyboard navigation and reduced motion are supported.

Assets served by Vite live in `public/`. The printable experience summary is `public/resume.html`, styled by `public/resume.css`. Root-level static files are retained for historical links; `build.py` is the legacy generator and should not be used to regenerate the React homepage.

## Deployment

The existing GitHub Actions workflow builds `dist/` and deploys to GitHub Pages on pushes to `main`. Live address: https://aryanrai.github.io/.

## Content

The existing work history and project photography are preserved. SIRI, UAV, rocketry and employer projects are collaborative work; descriptions identify Aryan's contribution. Source information comes from the September 2026 resume and October 2026 portfolio updates.

## Image curation and journal

The journal presents open year chapters with captioned images, stable image frames, and direct links to full-size assets. The opening uses native sticky positioning on desktop; reduced-motion and mobile visitors use normal scrolling. Additional galleries live in `src/data/projectGalleries.js`.

`image-sources.json` records the new photos' origins: Aryan's 28 September 2026 Canva portfolio, the Perception website repository, public project screenshots, and the public Perception Antler announcement on LinkedIn. Photos are optimized as WebP, lazy-loaded, and retain team attribution where applicable. Local source PDFs and private contact details are not published.

The question sequence in `src/components/QuestionStory.jsx` pairs three original questions with real project images. Native sticky panels reveal the answers as visitors scroll; reduced-motion visitors receive a static sequence. The existing first-visit signature animation remains separate, and direct section/project links bypass it.

The desktop dot cursor uses a light eased trail and local grain texture, with native text cursors in editable fields and native pointers for touch/reduced-motion visitors. Question answers combine real project photos into layered collages rather than using stock or generated imagery.
