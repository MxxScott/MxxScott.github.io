# David Lawal — Portfolio

Personal portfolio of **David Lawal** — frontend engineer working in Nuxt, React/Next.js, and interactive 3D web, with a systems foundation in Python, C, and C++.

**Live site:** https://mxxscott.github.io

## Stack

- **Next.js 15** (App Router, static export) + **React 19**
- **React Three Fiber + drei** — live WebGL hero scene (scroll-linked, pointer-reactive)
- **Tailwind CSS 4** + **Framer Motion** for scroll-driven animation
- **Python data pipeline** — `scripts/fetch_projects.py` pulls live repo metadata from the GitHub API into `src/data/projects.json` at build time
- **GitHub Actions** — builds and deploys to GitHub Pages on every push to `main`

## Architecture

```
.github/workflows/deploy.yml   CI: Python data refresh → Next build → Pages deploy
scripts/fetch_projects.py      Build-time GitHub API pipeline (Python)
src/app/                       App Router: layout, page, global theme
src/components/                Navbar, Hero, Scene (R3F), About, Skills, Projects, Contact, Footer
src/data/projects.json         Generated project data (committed fallback)
public/portrait.jpg            About-section portrait
```

## Local development

```bash
npm install
npm run dev            # http://localhost:3000
npm run fetch-projects # refresh project data via GitHub API (Python 3)
npm run build          # static export to ./out
```

## Contact

dlawal979@gmail.com · [github.com/MxxScott](https://github.com/MxxScott)
