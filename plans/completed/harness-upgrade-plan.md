# Claude Harness Upgrade — Plan

**Status:** ✅ Completed (2026-06-17) · **Created:** 2026-06-16 · **Decision owner:** Vitalii
**Scope:** Port the Claude Code harness, documentation structure, and repo layout from
`F:\IPC Expert Management System\proposal-automation` (the "reference repo") to this portfolio,
adapting each piece to a Next.js portfolio's reality. Also move the app into a `web/` subfolder
so the repo root stops being polluted with app code + build config.

> **Completed 2026-06-17.** All five phases executed: `.claude/` harness ported (merged `settings.json`,
> `settings.local.json`, CLI `playwriter` agent+skill, Next.js/Vercel `/save`, MCP removed, Playwriter
> bumped `^0.0.56`→`^0.3.1`); `strategy/`+`plans/`(`completed/`,`canceled/`)+`docs/` scaffolded with
> `CLAUDE.md`s, `status.md`, `deployment.md`; root `CLAUDE.md` rewritten; app moved to `web/` with split
> `.gitignore`. `web/` build + lint pass (also fixed a pre-existing break: Next 16 removed `next lint`, so the
> script now runs `eslint .`). Vercel Root Directory flipped `.`→`web` via API. Decisions taken at defaults
> (§6): archive specs → `completed/`; `docs/deployment.md` added; `strategy/research/` seeded empty;
> harness-first ordering; `docs/screenshots/` scaffolded. Screenshots use repo-root `tmp/` (already gitignored),
> not a dedicated `screenshots/` folder.

---

## 0. Decisions already locked (from kickoff Q&A)

1. **App subfolder name → `web/`.** `app/`, `components/`, `public/` + all build config move into `web/`.
   Root keeps `.claude/`, `docs/`, `plans/`, `strategy/`, `.git`, `.gitignore`, and the top-level `CLAUDE.md`.
2. **`strategy/` scope → lean.** Create `strategy/` with `research/` only (design references, competitor
   portfolios, tech notes) + `CLAUDE.md` files. No `architecture/`, no `client-documents/` (no client here).
3. **Playwriter → CLI, disable MCP.** Adopt the reference's CLI-based `playwriter` skill + subagent and
   remove the project MCP server (`.mcp.json`), matching the reference repo's approach.

**Already done / verified (2026-06-16):**

- **`AGENTS.md` deleted** (staged) — superseded; its durable content is regenerated into `web/CLAUDE.md`
  during Phase 4, and git history retains the original if needed. (Resolves the old open decision on its fate.)
- **Vercel access verified** — authenticated via the Vercel CLI as `vitaliibabynin`; project `curriculum-vitae`
  (`prj_AyDEJZr128asHoonHtwMwOU2EvSa`, framework `nextjs`, **current Root Directory `.`**) is visible and
  writable through both the CLI and the REST API (stored token at `%APPDATA%\com.vercel.cli\Data\auth.json`).
  **The Root-Directory change can be made by Claude — no manual dashboard step is required from the user.**

---

## 1. Goal & what we're adopting

The reference repo organizes itself by **stage of commitment** — ideas (`strategy/`) → committed work
(`plans/`) → as-built reality (`docs/`) — with the app in its own subfolder and a `.claude/` harness
(settings, agents, skills) driving the workflow. We adopt that whole shape, scaled down for a portfolio:

| Reference repo | This portfolio (target) | Notes |
|---|---|---|
| `prototype/` (the app) | `web/` (the app) | The Next.js site moves here. |
| `strategy/{client-documents,research,architecture,…}` | `strategy/research/` only | Lean — no client, no canon architecture doc. |
| `plans/` + `completed/` + `canceled/` + `CLAUDE.md` | same | Add the two subfolders + a `CLAUDE.md`; re-sort existing plans. |
| `docs/` + `CLAUDE.md` (as-built state) | `docs/` + `CLAUDE.md` (as-built **and** technical reference) | Keep existing technical docs; add a `CLAUDE.md`, `status.md`, `deployment.md`. |
| `.claude/settings.json` (rich perms + deny list) | merge into existing `settings.json` | Keep CV's `enabledPlugins` + MCP keys; add the allow/deny lists. |
| `.claude/agents/playwriter.md` | adapted copy | Repaths + Chrome profile + screenshots folder. |
| `.claude/skills/playwriter/SKILL.md` | adapted copy | Repaths; resolve MCP-vs-CLI note (we use CLI). |
| `.claude/skills/save/SKILL.md` | adapted copy | Re-target: Next.js checks + Vercel deploy + this repo's remote. |
| root `CLAUDE.md` (identity, layout, conventions, git) | rewrite in that style | Portfolio identity + new layout + Vercel/git. |

---

## 2. Target repo structure (after)

```
curriculum-vitae/                 # repo root — de-polluted
├── .claude/
│   ├── settings.json             # merged: CV plugins/MCP keys + reference perms/deny list
│   ├── settings.local.json       # { permissions: { defaultMode: "bypassPermissions" } }  (gitignored)
│   ├── agents/
│   │   └── playwriter.md          # adapted: curriculum-vitae paths + profile
│   └── skills/
│       ├── playwriter/SKILL.md    # adapted: CLI flow, this repo's paths
│       └── save/SKILL.md          # adapted: Next.js build/lint + Vercel + this remote
├── .gitignore                     # updated for web/ paths (`/tmp` already covers Playwriter scratch)
├── CLAUDE.md                      # rewritten: identity, layout, conventions, skills, git/deploy
├── docs/
│   ├── CLAUDE.md                  # NEW — what docs/ is (as-built + technical reference)
│   ├── status.md                  # NEW — "where we are" snapshot
│   ├── deployment.md              # NEW — Vercel as-built (light)
│   ├── 3d-cube-carousel.md        # kept
│   ├── animations.md              # kept
│   ├── components.md              # kept
│   └── smooth-scroll.md           # kept
├── plans/
│   ├── CLAUDE.md                  # NEW — lifecycle of a plan (active/completed/canceled)
│   ├── harness-upgrade-plan.md    # this file (active)
│   ├── completed/
│   │   ├── .gitkeep
│   │   ├── portfolio-rebuild-plan.md     # moved from plans/ (rebuild shipped)
│   │   └── original-spec-*.md            # moved from plans/archive/ (see §6 open decision)
│   └── canceled/
│       └── .gitkeep
├── strategy/
│   ├── CLAUDE.md                  # NEW — lean: "ideation, the why/what behind the site"
│   └── research/
│       ├── CLAUDE.md              # NEW — sourced research feeding the build
│       └── .gitkeep
├── tmp/                           # Playwriter scratch output — already gitignored (/tmp); auto-created
└── web/                           # ← THE APP (everything below moved from root)
    ├── CLAUDE.md                  # NEW — app conventions (absorbs AGENTS.md detail)
    ├── README.md
    ├── package.json
    ├── package-lock.json
    ├── next.config.mjs
    ├── next-env.d.ts
    ├── tsconfig.json
    ├── tailwind.config.ts
    ├── postcss.config.mjs
    ├── eslint.config.mjs
    ├── .gitignore                 # (optional) app-scoped ignores
    ├── app/
    ├── components/
    ├── public/
    └── node_modules/              # reinstalled in place (not moved)
```

Removed at root: `.mcp.json` (Playwriter MCP disabled per decision 3), `.next/`, `node_modules/`
(both regenerate under `web/`).

---

## 3. Phased implementation

Each phase is independently committable and verifiable. Recommended order puts the **lowest-risk**
work first (harness + docs) and the **app move last** so the repo is stable before the disruptive step.

### Phase 1 — `.claude/` harness

1. **`settings.json` (merge, not overwrite).** Keep this repo's `enableAllProjectMcpServers`,
   `disabledMcpjsonServers`, and `enabledPlugins` (`frontend-design@claude-plugins-official`).
   Add from the reference: `env` (`CLAUDE_CODE_USE_POWERSHELL_TOOL`, `CLAUDE_CODE_EXPERIMENTAL_AGENT_TEAMS`,
   `alwaysThinkingEnabled`) and the full `permissions.allow` (git read/write, `npm run dev/build/lint/test`)
   + `permissions.deny` (the destructive-command blocklist for Bash **and** PowerShell).
   - Move `defaultMode: "bypassPermissions"` out of `settings.json` and into `settings.local.json`
     (matches the reference split; `.local` is gitignored so the committed file carries the allow/deny intent).
2. **`settings.local.json`** — create with `{ "permissions": { "defaultMode": "bypassPermissions" } }`.
3. **`agents/playwriter.md`** — copy + adapt: repo path `F:\IPC Expert Management System\proposal-automation`
   → `F:\CurriculumVitae\curriculum-vitae`; screenshot output dir → project-root `tmp/` (step 7);
   **Chrome profile** (the reference agent uses the `Vitalii` profile — confirm the profile/account/browser-key
   for this machine during implementation).
4. **`skills/playwriter/SKILL.md`** — **regenerate from the current upstream skill** (`npx playwriter@latest
   skill`, v0.3.1), *not* the reference repo's older 0.0.56-era copy — upstream's sandbox `fs` rules and the
   absolute-path requirement have changed since. Then layer on this repo's specifics: CLI + **disable MCP**
   (keep the "do not use the MCP server" guidance), the WSL2 relay handling, and screenshot output to the
   project-root `tmp/` folder (step 7). Per upstream, screenshot calls must use an **absolute** path (relative
   paths resolve to the relay cwd) — target `F:\CurriculumVitae\curriculum-vitae\tmp\<name>.png`.
5. **`skills/save/SKILL.md`** — copy + **re-target for Next.js + Vercel**:
   - Checks become `cd web && npm run build && npm run lint` (drop the Python/ruff/pytest branch).
   - Doc-update step points at `web/CLAUDE.md`, `docs/`, `plans/`, `strategy/` + root `CLAUDE.md`.
   - Git/deploy: remote `origin` → `github.com/vitaliibabynin/curriculum-vitae`; **push to `main` triggers
     Vercel's Git-integration deploy** (parallels the reference's Render auto-deploy).
6. **Disable Playwriter MCP + bump the version** — remove `.mcp.json` (or delete the `playwriter` server
   entry); the CLI skill replaces it. Keep `playwriter` in `web/package.json` devDeps and **bump it
   `^0.0.56` → `^0.3.1`** (latest) — the CLI is what the skill drives, and 0.0.56 predates the current
   sandbox/output behavior.
7. **Screenshot output → project-root `tmp/` (Playwriter's sandbox default).** Playwriter's sandboxed `fs`
   only permits writes to the session cwd, `/tmp`, and the OS temp dir. We send captures to a **`tmp/` folder
   at the repo root** — it stays at root (the app move doesn't touch it; the skill/agent run from the repo
   root). This is **already gitignored** (`/tmp` in `.gitignore`), so **no `.gitignore` change and no folder
   scaffolding are needed** — Playwright auto-creates the parent dir on first capture. Chosen over a dedicated
   `screenshots/` folder on purpose: a broad `screenshots` ignore could swallow *legitimate* committed
   screenshots elsewhere, whereas `tmp/` is unambiguously throwaway. Keepers still go to a committed
   `docs/screenshots/` (see §6 open decision). The pre-existing, gitignored `public/screenshots/` (old local
   PNGs) is unrelated and left alone.

**Verify:** open a fresh Claude session; confirm `/save` and the `playwriter` agent/skill are listed, the
deny list blocks a destructive sample, and a Playwriter capture lands in repo-root `tmp/`.

### Phase 2 — documentation folders (root)

1. **`plans/`**
   - Create `plans/completed/.gitkeep` and `plans/canceled/.gitkeep`.
   - Write `plans/CLAUDE.md` (adapt the reference's: active at top level → `completed/` when shipped →
     `canceled/` with a one-line "why"; never silently delete; convert relative dates to absolute).
   - Re-sort existing plans: `portfolio-rebuild-plan.md` → `completed/` (the rebuild shipped — see git log
     `d2c2780 Portfolio rebuild`). `plans/archive/{draft,instructions}.md` → see §6 open decision.
2. **`docs/`**
   - Write `docs/CLAUDE.md` adapted so it covers **both** the reference's "as-built current state" **and**
     this repo's existing **technical reference** docs (animations / cube / scroll / components stay).
   - Add `docs/status.md` — a short "where we are" snapshot (5-section portfolio, deploy target, what's live).
   - Add `docs/deployment.md` — Vercel as-built (project, domain, build cmd, Root Directory = `web/` after the
     move). Keep light; flagged as an open decision in §6 if you'd rather not.
3. **`strategy/`**
   - `strategy/CLAUDE.md` — lean adaptation: "pre-plan ideation — the why/what behind the site; ideas live
     here, committed work in `plans/`, as-built in `docs/`."
   - `strategy/research/CLAUDE.md` + `strategy/research/.gitkeep` — sourced research feeding the build
     (design references, competitor portfolios, library/API notes); cite sources, separate fact from inference.

**Verify:** every new folder has its `CLAUDE.md`; existing technical docs untouched; plans re-sorted.

### Phase 3 — root `CLAUDE.md` rewrite

Rewrite the thin root `CLAUDE.md` in the reference's richer style, adapted to a portfolio:

- **Identity** — what this is (Vitalii's portfolio: Next.js 16 / React 19 / Tailwind 4 SPA, 5 sections).
- **Repo layout** — explain the stage-of-commitment split (`strategy/` → `plans/` → `docs/`) + the app in
  `web/` + `.claude/`. One line per folder; each owns its `CLAUDE.md`.
- **Quick commands** — note they run from `web/` (`cd web && npm run dev|build|lint`).
- **Conventions** — data-driven from `web/app/data.ts`, `'use client'` for interactive components, dark mode
  via `dark` class, kebab-case component files. (Deep detail lives in `web/CLAUDE.md`, not here.)
- **Skills & agents** — `/save`, `playwriter`.
- **Git / deploy** — `main`, `origin` → this repo, Vercel auto-deploy on push.

Keep it concise (it loads into every conversation). Deep technical detail lives in `web/CLAUDE.md` + `docs/`.

### Phase 4 — move the app into `web/` (the disruptive step)

> Highest-risk phase. Do it on a clean tree, in its own commit, with a build verification gate before commit.

1. **Create `web/`** and `git mv` the app into it:
   - Source: `app/`, `components/`, `public/`
   - Config: `package.json`, `package-lock.json`, `next.config.mjs`, `next-env.d.ts`, `tsconfig.json`,
     `tailwind.config.ts`, `postcss.config.mjs`, `eslint.config.mjs`, `README.md`
   - Use `git mv` so history follows the files.
2. **Do not move `node_modules/` or `.next/`** — delete them at root; run `cd web && npm install` to
   regenerate under `web/` (moving `node_modules` on Windows is slow and fragile).
3. **Path checks after the move** (most need no change because they're already relative):
   - `tsconfig.json` `paths: { "@/*": ["./*"] }` — still resolves relative to `web/`. ✓
   - `tailwind.config.ts` content globs (`./app`, `./components`) — relative to `web/`. ✓
   - `eslint.config.mjs` ignores (`.next/**`, etc.) — relative. ✓
   - `next.config.mjs` — empty, no change. ✓
4. **`.gitignore`** — either update root globs that assume app-at-root (`/.next/`, `/node_modules`,
   `/build`, `public/screenshots`, `next-env.d.ts`) to `web/…`, **or** add a scoped `web/.gitignore`
   and trim the root one. Recommend a `web/.gitignore` for the app + a slim root `.gitignore`.
5. **`web/CLAUDE.md`** — create fresh; document the durable app conventions (code style, theme system,
   cube carousel mapping, key-files table, troubleshooting). Source from the code itself; the now-deleted
   `AGENTS.md` remains in git history if any wording is worth lifting.
6. **Vercel Root Directory — Claude does this (no dashboard step):** set the project's `rootDirectory`
   from `.` → `web`, done **in the same change as the move** so a build is never attempted against the wrong
   layout. Two equivalent mechanisms, both verified available this session:
   - REST API: `PATCH https://api.vercel.com/v9/projects/prj_AyDEJZr128asHoonHtwMwOU2EvSa` with
     `{"rootDirectory":"web"}` and the stored bearer token; **or**
   - `vercel link` + `vercel pull`/`vercel.json` flow.

   Until this flips, a Vercel build would fail (no `package.json` at repo root) — so it's sequenced *with*
   the move, not after. No `web/`-aware `vercel.json` is needed once `rootDirectory` is set.

**Verify:** `cd web && npm install && npm run build && npm run lint` all pass; `npm run dev` serves on :3000;
images/fonts/resume load (paths are `public/`-relative, unaffected). Flip `rootDirectory` to `web`, push, and
confirm the Vercel production deploy succeeds (re-check via `vercel project inspect curriculum-vitae`).

### Phase 5 — wrap

- Update `docs/status.md` to reflect the new structure as the current state.
- Move this plan to `plans/completed/` once done.
- Commit via the adapted `/save` (or manually) — which now also pushes and triggers Vercel.

---

## 4. What we deliberately do NOT port

- `strategy/client-documents/`, `strategy/architecture/` — no external client and no multi-service
  architecture to canonize for a portfolio (per decision 2).
- `strategy/tender-pipeline-expert-system/` — reference-repo cross-project strategy; irrelevant here.
- `render.yaml`, `proposal/`, `scripts/`, the FastAPI/Python backend, the Python checks in `/save`.
- `.claude/worktrees/` — those are the reference repo's git worktrees, not harness content.

---

## 5. Risks & mitigations

| Risk | Mitigation |
|---|---|
| **Vercel build breaks** after the move (no root `package.json`). | Claude flips `rootDirectory` `.`→`web` via the Vercel API/CLI **in lockstep with the move** (access verified 2026-06-16), then confirms a production deploy. No manual dashboard step. |
| `git mv` of many files muddies history / conflicts. | Clean tree first; do the move as one isolated commit; use `git mv` (not delete+add) to preserve history. |
| Reinstalling `node_modules` pulls different transitive versions. | `package-lock.json` moves with the app; run `npm ci` in `web/` to honor the lockfile exactly. |
| `.gitignore` globs miss `web/` and commit `web/node_modules` / `web/.next`. | Add `web/.gitignore`; double-check `git status` shows no build artifacts staged. |
| Playwriter agent's Chrome profile/path differs on this machine. | Confirm profile/account/browser-key live during Phase 1 (`npx playwriter@latest browser list`). |
| Harness commands assume app at root (`npm run dev`). | Root `CLAUDE.md` + `/save` updated to `cd web`; permission allow-list entries are command-prefix based, so they still match. |

---

## 6. Open decisions (defaults proposed — revise freely)

> Resolved already: **AGENTS.md** — deleted per your instruction (was open decision; now closed).

1. **Where the two `plans/archive/` specs go.** `draft.md` + `instructions.md` are the original pre-build
   portfolio brief. **Default:** move into `plans/completed/` (renamed, e.g. `original-portfolio-spec.md`)
   as the spec that was built, and delete the now-empty `plans/archive/`. Alternative: keep a `plans/archive/`.
2. **`docs/deployment.md`.** **Default:** add a light Vercel as-built doc. Alternative: skip it and fold the
   one or two deploy facts into `docs/status.md`.
3. **`strategy/research/` seed content.** **Default:** ship empty (`.gitkeep` + `CLAUDE.md`) and fill as
   research happens. Alternative: seed one starter file (e.g. `design-references.md`).
4. **Phase ordering.** **Default:** harness + docs first, app move last (safest). Alternative: do the `web/`
   move first if you'd rather get the disruptive part over with while the tree is simplest.
5. **Durable screenshots folder.** Root `tmp/` is the Playwriter scratch sink (gitignored; see Phase 1.7).
   **Default:** also scaffold a committed `docs/screenshots/` for keeper shots. Alternative: scratch-only,
   add `docs/screenshots/` later if a keeper ever appears.

---

## 7. Execution checklist (for when approved)

- [ ] Phase 1 — `.claude/`: merge `settings.json`, add `settings.local.json`, adapt `agents/playwriter.md`,
      regenerate `skills/playwriter/SKILL.md` from upstream v0.3.1 (output → root `tmp/`), adapt
      `skills/save/SKILL.md`; remove `.mcp.json`; bump `playwriter` devDep `^0.0.56`→`^0.3.1`.
- [ ] Phase 2 — `plans/` (subfolders + `CLAUDE.md` + re-sort), `docs/` (`CLAUDE.md` + `status.md` +
      `deployment.md`), `strategy/` (`CLAUDE.md` + `research/CLAUDE.md`).
- [ ] Phase 3 — rewrite root `CLAUDE.md`.
- [ ] Phase 4 — `git mv` app → `web/`, reinstall, fix `.gitignore`, write `web/CLAUDE.md`,
      **flip Vercel `rootDirectory` `.`→`web` via API/CLI** (Claude), verify build/lint/dev + production deploy.
- [ ] Phase 5 — update `docs/status.md`; move this plan to `plans/completed/`; `/save`.
```
