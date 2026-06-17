# plans/ — work we've committed to building

Build/execution plans for work we have **decided to do** — past the ideation stage. This is the commitment
line: loose ideas live in `strategy/`, the as-built reality lives in `docs/`, and the things we're actually
going to build live here.

A plan is a concrete, actionable execution doc: scope, steps, and the decision that we're doing it.

## Lifecycle

- **Active** — a plan in flight sits at the top level of `plans/`.
- `completed/` — move a plan here once its work is done and reflected in the site (often graduating into a
  current-state description in `docs/`).
- `canceled/` — move a plan here when it's shelved or abandoned. Leave a one-line note at the top saying
  **why** it was canceled, so the road-not-taken stays legible.

Never silently delete a plan — archive it into `completed/` or `canceled/` so the history of decisions stays visible.

## Rules

- Convert relative dates to absolute.
- When a plan's work lands, update `docs/` to reflect the new current state, then move the plan to `completed/`.
- Keep plans honest about status (a header line: Draft / Active / ✅ Completed / ❌ Canceled + date).
