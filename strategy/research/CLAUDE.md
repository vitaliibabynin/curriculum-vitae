# strategy/research/ — sourced context feeding the build

Knowledge that can't be derived from the code: design references, peer/competitor portfolios, the libraries and
APIs the site leans on, and any external conventions worth capturing. Keep it sourced and reusable.

## What belongs here

Create files as the research is done. Likely topics:

- `design-references.md` — portfolios / interaction patterns / typography worth borrowing from, with links and
  a note on *what* to take from each.
- `animation-libraries.md` — GSAP / Framer Motion / Lenis / Three.js patterns and trade-offs relevant to the
  globe, cube, and scroll work.
- `accessibility-perf.md` — a11y and Core Web Vitals notes for an animation-heavy SPA.

## Rules

- **Cite every non-obvious claim** with a URL. Separate verified facts from inference.
- **No fabrication.** If something can't be verified, mark it unverified or turn it into an open question.
- **Convert relative dates to absolute.**

The `Explore` or `general-purpose` agents can do web-heavy gathering and write here; spawn one for broad
external research to keep the main context clean. For deep multi-source reports, use the `deep-research` skill.
