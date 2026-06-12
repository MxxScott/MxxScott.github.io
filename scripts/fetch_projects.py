#!/usr/bin/env python3
"""
Build-time data pipeline for the portfolio.

Pulls live repository metadata (description, language, stars, last push)
from the GitHub API for each featured project and writes it to
src/data/projects.json, which the Next.js build consumes.

Run manually:  python scripts/fetch_projects.py
Runs automatically in CI before every deploy (see .github/workflows/deploy.yml).
"""

import json
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

USERNAME = "MxxScott"
OUTPUT = Path(__file__).resolve().parent.parent / "src" / "data" / "projects.json"

# Curated featured projects: repo name -> presentation overrides.
FEATURED = {
    "roar-frontend": {
        "title": "Roar — Article Builder",
        "emoji": "🦁",
        "flag": "FLAGSHIP",
        "blurb": (
            "A content-creation platform frontend with a mobile-friendly "
            "article builder and a fully reworked UI system."
        ),
        "stack": ["Next.js 15", "React 19", "Tailwind 4", "Framer Motion", "TypeScript"],
    },
    "Onlearn": {
        "title": "Onlearn — E-Learning Platform",
        "emoji": "🎓",
        "blurb": (
            "A fully responsive landing experience for an online learning "
            "platform, documented like production code."
        ),
        "stack": ["Nuxt", "Vue 3", "Tailwind", "TypeScript"],
    },
    "Wings-Height-Insurance-Brokers-Limited": {
        "title": "Wings Height Insurance Brokers",
        "emoji": "🏢",
        "blurb": (
            "A complete multi-page corporate website — quotes, claims, "
            "bookings and service pages. Client-style delivery, framework-free."
        ),
        "stack": ["HTML5", "CSS3", "JavaScript"],
    },
    "Anime_Abyss": {
        "title": "Anime Abyss",
        "emoji": "🌊",
        "blurb": (
            "An anime discovery homepage with custom styling and scripted "
            "interactions on a modern Nuxt 4 foundation."
        ),
        "stack": ["Nuxt 4", "Vue 3", "Tailwind"],
    },
    "Maneyger-7.0": {
        "title": "Maneyger 7.0",
        "emoji": "💰",
        "blurb": (
            "A personal finance manager with hand-built UI logic in vanilla "
            "JavaScript."
        ),
        "stack": ["JavaScript", "Bootstrap", "CSS"],
    },
    "Inventory-Management-System": {
        "title": "Inventory Manager CLI",
        "emoji": "📦",
        "blurb": (
            "A stateful command-line inventory tracker — full CRUD, "
            "documented through every SDLC phase."
        ),
        "stack": ["Python", "CLI", "SDLC Docs"],
    },
}


def fetch_repo(name: str) -> dict | None:
    url = f"https://api.github.com/repos/{USERNAME}/{name}"
    req = urllib.request.Request(url, headers={"User-Agent": "portfolio-build"})
    try:
        with urllib.request.urlopen(req, timeout=15) as resp:
            return json.load(resp)
    except (urllib.error.URLError, TimeoutError) as exc:
        print(f"  warn: could not fetch {name}: {exc}", file=sys.stderr)
        return None


def main() -> int:
    projects = []
    for repo_name, meta in FEATURED.items():
        live = fetch_repo(repo_name) or {}
        projects.append(
            {
                "title": meta["title"],
                "emoji": meta["emoji"],
                "flag": meta.get("flag"),
                "blurb": meta["blurb"],
                "stack": meta["stack"],
                "url": live.get("html_url", f"https://github.com/{USERNAME}/{repo_name}"),
                "homepage": live.get("homepage") or None,
                "stars": live.get("stargazers_count", 0),
                "pushedAt": live.get("pushed_at"),
            }
        )
        print(f"  ok: {repo_name}")

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "projects": projects,
    }
    OUTPUT.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(projects)} projects -> {OUTPUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
