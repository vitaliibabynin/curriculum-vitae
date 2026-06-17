# docs/ — current state + technical reference

What the project actually **is right now**, plus the **how-it-works** reference for the moving parts. Distinct
from the other thinking folders by time and commitment:

- `strategy/` — **pre-plan**: ideas and research we have *not* committed to building.
- `plans/` — **committed work**: build/execution plans we've decided to implement.
- `docs/` — **current state**: a faithful description of what exists and is true today, and how it works.

If `strategy/` is "what we might do" and `plans/` is "what we're going to do", `docs/` is "what is".

## What belongs here

- **Current-state docs** — settled decisions, the live structure, operational facts a newcomer needs:
  - `status.md` — a "where are we" snapshot.
  - `deployment.md` — how the site is hosted/deployed (Vercel), as built.
- **Technical reference** — how the load-bearing animation/interaction systems work:
  - `animations.md`, `3d-cube-carousel.md`, `smooth-scroll.md`, `components.md`, `skills-globe.md`.
- `screenshots/` — durable, committed screenshots worth keeping (visual records). Transient Playwriter
  captures go to the gitignored repo-root `tmp/`, **not** here.

## What does NOT belong here

- Speculative or not-yet-committed ideas → `strategy/`.
- Work we intend to do but haven't → `plans/`.
- Anything the code already records — don't restate the source. Reference docs explain *patterns and intent*,
  not line-by-line what the code says.

## Rules

- **Keep it true.** This folder is only useful if it reflects reality; update it when the site changes, and
  delete what goes stale.
- Convert relative dates to absolute; mark inference vs. verified fact.
