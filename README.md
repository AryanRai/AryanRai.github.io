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
