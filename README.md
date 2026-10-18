# Aryan Rai - personal portfolio

A light, chronological portfolio: early electronics, university teams, space systems, robot learning and Perception.

Live site: https://aryanrai.github.io/

## Edit and preview

The site uses static HTML, CSS and a small progressive-enhancement script. It has no runtime API, account, analytics, package install or build-service dependency.

- Edit the narrative and project entries in `build.py`.
- Run `python build.py` to regenerate `index.html` and `resume.html`.
- Edit presentation in `portfolio.css` and interaction in `portfolio.js`.
- Run `python -m http.server 57321 --bind 127.0.0.1` and open http://127.0.0.1:57321/.
- Commit the source and generated HTML together. GitHub Pages serves `main` from the repository root.

The timeline and native project disclosures remain readable without JavaScript. JavaScript adds category filters, search, project deep links and chapter highlighting. Reduced-motion preferences are respected. The experience summary has print styles.

## Content and images

Updated October 2026 from Aryan's September 2026 resume, the Canva portfolio dated 28 September 2026, and the personal narrative in CVDoc. Work dates use the current resume; undated personal projects are not assigned invented years.

Project photography comes from Aryan's portfolio. SIRI, UAV, rocketry and employer projects are collaborative work; the text describes Aryan's role rather than claiming sole authorship. Orbit images come from the Perception website assets. `assets/work/` holds optimized WebP copies. The original resume and CV documents are not published in this repository.

## Domain recovery

On 18 October 2026, `aryanrai.me` returned NXDOMAIN while GitHub Pages still redirected visitors there. The obsolete `CNAME` was removed to restore the default `aryanrai.github.io` address.

To restore the custom domain later, first recover or correct its DNS at the registrar. Configure the domain for GitHub Pages, verify that it resolves, then add it back in repository Settings > Pages and restore `CNAME`. Keep HTTPS enabled. Do not add the broken domain back before DNS is working.

## Validation

- `python build.py`
- `node --check portfolio.js`
- Check all local asset paths, fragment destinations, duplicate IDs and image alt text.
- Preview desktop and mobile; test timeline navigation, category/search combinations, empty results and project deep links.
- Check `git diff --check` before publishing.

Older files and original university demo pages are retained for historical links; the new homepage does not depend on the legacy Bootstrap, jQuery or Supabase scripts.
