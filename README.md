# David Lawal — Portfolio

Personal portfolio of **David Lawal** — a frontend engineer working in Nuxt, React/Next.js
and interactive 3D web, with a systems foundation in Python, C and C++.

**Live:** https://mxxscott.github.io

A cinematic, editorial single-page site: a persistent WebGL "core" floats behind every
section, oversized type resolves from blur to focus as you scroll, and the navigation tracks
your position with a sliding, shared-layout indicator. Dedicated `/projects` and `/about`
routes round it out.

## Highlights

- **Live 3D background** — a liquid-metal distorted sphere in a wireframe shell (React Three Fiber), scroll-linked and pointer-reactive, persistent across the whole page. Falls back to a static gradient under `prefers-reduced-motion`.
- **FlowSection scroll system** — each section assembles as it arrives: elements slide/blur in, dwell, then leave before the next section builds, over a fixed background.
- **Cinematic hero** — spotlit core, fluid display type sized to *both* viewport axes (never overflows), an availability badge and a kinetic tech marquee.
- **Scroll-aware navbar** — transparent over the hero, solidifies on scroll, with a Framer Motion `layoutId` pill that glides to the active section and a magnetic Contact button.
- **Projects** — featured cards lead with live GitHub OpenGraph thumbnails; a click opens a detail drawer, and "Browse all repositories" pulls the full repo list **live from the GitHub API** with search + language filters.
- **Hybrid contact** — engineer-first, with a light services row and an email booking CTA.
- **Custom cursor + glow**, intro animation, GitHub contribution graph, and a full mobile sidebar.

## Stack

- **Next.js 15** (App Router, static export) + **React 19**
- **React Three Fiber + drei** — WebGL scene
- **Tailwind CSS 4** (`@theme` tokens) + **Framer Motion**
- **Python pipeline** — `scripts/fetch_projects.py` pulls repo metadata from the GitHub API into `src/data/projects.json` at build time
- Deployed to **GitHub Pages**

## Architecture

```
src/app/
  layout.js · page.js · globals.css      App Router + design system (@theme)
  projects/page.js · about/page.js       dedicated routes
src/components/
  Navbar · Hero · Magnetic · Footer      chrome + motion helpers
  Background · Scene                      persistent R3F 3D core
  Flow                                    FlowSection / FlowItem scroll engine
  About · Skills · Projects · Contact     home sections
  ProjectsShowcase · AllProjectsOverlay   /projects grid + live GitHub list
  ProjectDrawer · ContributionGraph       project detail + GitHub activity
  CustomCursor · CursorGlow · IntroAnimation
src/data/projects.json                    generated project data (committed fallback)
scripts/fetch_projects.py                 build-time GitHub API pipeline
```

## Local development

```bash
npm install
npm run dev             # http://localhost:3000
npm run fetch-projects  # refresh project data via the GitHub API (Python 3)
npm run build           # static export to ./out
npm run deploy          # build + publish to GitHub Pages
```

## Contact

dlawal979@gmail.com · [github.com/MxxScott](https://github.com/MxxScott)
