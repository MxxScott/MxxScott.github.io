#!/usr/bin/env python3
"""
Build-time data pipeline for the portfolio.

Pulls ALL public repositories for the user from the GitHub API and writes
src/data/projects.json, which the Next.js build consumes.

Topic-based control (set these on your repos at github.com):
  portfolio-flagship  -> becomes the flagship hero card
  portfolio-featured  -> appears in the featured grid
  portfolio-hide      -> never shown anywhere

If no repo has portfolio-featured, the curated defaults below are used.
If the API is unreachable, the previously committed projects.json is kept.

Run manually:  python scripts/fetch_projects.py
Runs in CI before every deploy and on a daily schedule (see deploy.yml).
"""

import json
import sys
import urllib.error
import urllib.request
from datetime import datetime, timezone
from pathlib import Path

USERNAME = "MxxScott"
DEFAULT_FLAGSHIP = "roar-frontend"
OUTPUT = Path(__file__).resolve().parent.parent / "src" / "data" / "projects.json"

# Always excluded from all lists
EXCLUDE = {f"{USERNAME}.github.io", "Hello-World", "Test-Repo"}

EMOJI_BY_LANGUAGE = {
    "JavaScript": "\U0001f7e8",   # yellow square
    "TypeScript": "\U0001f537",   # blue diamond
    "Vue": "\U0001f49a",          # green heart
    "Python": "\U0001f40d",       # snake
    "C": "⚙️",          # gear
    "C++": "⚙️",
    "HTML": "\U0001f310",         # globe
    "CSS": "\U0001f3a8",          # palette
    "Assembly": "\U0001f529",     # nut and bolt
}

# Curated presentation metadata for key repos
CURATED = {
    "roar-frontend": {
        "title": "Roar — Article Builder",
        "emoji": "\U0001f981",    # lion
        "blurb": (
            "A content-creation platform frontend with a mobile-friendly "
            "article builder and a fully reworked UI system."
        ),
        "stack": ["Next.js 15", "React 19", "Tailwind 4", "Framer Motion", "TypeScript"],
    },
    "Onlearn": {
        "title": "Onlearn — E-Learning Platform",
        "emoji": "\U0001f393",   # graduation cap
        "blurb": (
            "A fully responsive landing experience for an online learning "
            "platform, documented like production code."
        ),
        "stack": ["Nuxt", "Vue 3", "Tailwind", "TypeScript"],
    },
    "Wings-Height-Insurance-Brokers-Limited": {
        "title": "Wings Height Insurance Brokers",
        "emoji": "\U0001f3e2",   # office building
        "blurb": (
            "A complete multi-page corporate website — quotes, claims, "
            "bookings and service pages. Client-style delivery, framework-free."
        ),
        "stack": ["HTML5", "CSS3", "JavaScript"],
    },
    "Anime_Abyss": {
        "title": "Anime Abyss",
        "emoji": "\U0001f30a",   # wave
        "blurb": (
            "An anime discovery homepage with custom styling and scripted "
            "interactions on a modern Nuxt 4 foundation."
        ),
        "stack": ["Nuxt 4", "Vue 3", "Tailwind"],
    },
    "Maneyger-7.0": {
        "title": "Maneyger 7.0",
        "emoji": "\U0001f4b0",   # money bag
        "blurb": "A personal finance manager with hand-built UI logic in vanilla JavaScript.",
        "stack": ["JavaScript", "Bootstrap", "CSS"],
    },
    "Inventory-Management-System": {
        "title": "Inventory Manager CLI",
        "emoji": "\U0001f4e6",   # package
        "blurb": (
            "A stateful command-line inventory tracker — full CRUD, "
            "documented through every SDLC phase."
        ),
        "stack": ["Python", "CLI", "SDLC Docs"],
    },
}


def api_get(path):
    req = urllib.request.Request(
        f"https://api.github.com{path}",
        headers={"User-Agent": "portfolio-build", "Accept": "application/vnd.github+json"},
    )
    with urllib.request.urlopen(req, timeout=20) as resp:
        return json.load(resp)


def to_card(repo, curated=None):
    """Shape a repo (plus optional curated overrides) into a card dict."""
    curated = curated or {}
    language = repo.get("language") or ""
    topics = [t for t in repo.get("topics", []) if not t.startswith("portfolio-")]
    raw_stack = ([language] if language else []) + topics[:4]
    return {
        "name": repo["name"],
        "title": curated.get("title", repo["name"].replace("-", " ").replace("_", " ")),
        "emoji": curated.get("emoji", EMOJI_BY_LANGUAGE.get(language, "\U0001f4c1")),
        "blurb": curated.get("blurb") or repo.get("description") or "",
        "stack": curated.get("stack") or raw_stack,
        "url": repo["html_url"],
        "homepage": repo.get("homepage") or None,
        "language": language,
        "stars": repo.get("stargazers_count", 0),
        "pushedAt": repo.get("pushed_at"),
        "fork": repo.get("fork", False),
    }


def main():
    try:
        repos = api_get(f"/users/{USERNAME}/repos?per_page=100&sort=pushed&type=owner")
    except (urllib.error.URLError, TimeoutError, OSError) as exc:
        print(
            f"warn: GitHub API unreachable ({exc}); keeping committed projects.json",
            file=sys.stderr,
        )
        return 0

    visible = [
        r for r in repos
        if not r.get("fork")
        and not r.get("archived")
        and r["name"] not in EXCLUDE
        and "portfolio-hide" not in r.get("topics", [])
    ]

    # flagship: topic wins, else default name
    flagship = next(
        (r["name"] for r in visible if "portfolio-flagship" in r.get("topics", [])),
        DEFAULT_FLAGSHIP,
    )

    # featured: topic wins, else curated defaults
    featured_names = [r["name"] for r in visible if "portfolio-featured" in r.get("topics", [])]
    if not featured_names:
        featured_names = list(CURATED.keys())
    if flagship in featured_names:
        featured_names.remove(flagship)
    featured_names.insert(0, flagship)

    by_name = {r["name"]: r for r in visible}
    featured = []
    for name in featured_names:
        repo = by_name.get(name)
        if not repo:
            continue
        card = to_card(repo, CURATED.get(name))
        card["flag"] = "FLAGSHIP" if name == flagship else None
        featured.append(card)

    all_projects = [to_card(r, CURATED.get(r["name"])) for r in visible]

    OUTPUT.parent.mkdir(parents=True, exist_ok=True)
    payload = {
        "generatedAt": datetime.now(timezone.utc).isoformat(timespec="seconds"),
        "flagship": flagship,
        "featured": featured,
        "all": all_projects,
    }
    OUTPUT.write_text(json.dumps(payload, indent=2) + "\n", encoding="utf-8")
    print(f"Wrote {len(featured)} featured / {len(all_projects)} total -> {OUTPUT}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
