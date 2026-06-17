# strategy/ — pre-plan ideation: the thinking behind the site

The **ideation** stage — everything that informs *what* we build and *why*, none of it yet committed to
implementation. That's the line: loose ideas and research live here, work we've committed to build lives in
`plans/`, and the as-built current state lives in `docs/`. Kept separate from the app itself (`web/`).

For a portfolio this is deliberately **lean** — one part:

- `research/` — sourced, reusable research feeding the build: design references, competitor/peer portfolios,
  library/API notes, anything that can't be derived from the code. Has its own `CLAUDE.md`.

(No `architecture/` or `client-documents/` — there's no external client and no multi-service architecture to
canonize here. Add a folder only when a real need appears, with its own `CLAUDE.md`.)

## Rules

- Separate **verified** facts from **inference**; cite external claims with URLs. No black-box claims.
- Convert relative dates to absolute.
- When an idea here graduates into committed work, write it up as a plan in `plans/` and reference it.
