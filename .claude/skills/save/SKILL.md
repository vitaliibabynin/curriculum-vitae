---
name: save
description: Review changes since last commit, tidy them, update documentation, run the Next.js checks, and commit + push to main (which auto-deploys to Vercel)
---

Perform a full review, cleanup, and commit of all changes since the last commit. Follow every step in order. Solo workflow — changes land directly on `main`. This repo has an `origin` remote (`github.com/vitaliibabynin/curriculum-vitae`), so the final step pushes to it — and **push to `main` auto-deploys to Vercel** via the project's Git integration, so saving ships live. If `origin` is ever removed, `save` commits locally only.

## 1. Review changes since last commit

```bash
git status
git diff HEAD
```

Read every modified and new file end-to-end. The review scope is everything that would land in the next commit.

If this is **not** a git repository, **stop immediately** — do not run `git init`. Report "This is not a git repository." and take no further action.

## 2. Light tidy

Improvements applied to the diff only. Stay inside the diff's blast radius.

**For app code (`web/`):**
- Remove dead instrumentation (`console.log`, `debugger`, leftover `// TODO: remove`).
- Remove unused imports introduced in this work; inline single-use scratch variables; collapse trivially redundant logic.
- DRY across files when the same pattern was added in 2–3 places; match the file's existing conventions (kebab-case component files, `'use client'` for interactive components, content sourced from `web/app/data.ts`).

**For docs / plans / strategy markdown:**
- Fix typos, broken markdown, dead links, and inconsistent heading levels introduced in this work.
- Convert relative dates to absolute.

Hard rules:
- Don't touch content/code outside the diff. If you spot a pre-existing issue, leave it and mention it in the commit body.
- Don't add abstractions for hypothetical future requirements.
- If uncertain whether a change is improvement or scope creep, leave it.

## 3. Run checks

If `web/` source changed, run the app's checks:

```bash
cd web
npm run build
npm run lint
```

Run only what's configured. Fix every error by addressing root causes. Do **not** suppress with `@ts-ignore`, `eslint-disable`, `any` casts, or similar. If an error genuinely cannot be fixed, explain exactly why in the report.

If only docs/markdown changed, skip the build — there is nothing to compile.

## 4. Update documentation

- Update `web/CLAUDE.md` if the change affects the app's conventions, structure, or key files.
- Update the relevant root-level `CLAUDE.md` files (`docs/`, `plans/`, `strategy/`, `strategy/research/`) if the changes affect their conventions or contents.
- Update root `CLAUDE.md` if the change affects repo layout, conventions, the skills/agents list, or git/deploy.
- Keep CLAUDE.md files concise — they load into every conversation.

## 5. Commit

Stage all changes (tidy + checks + doc updates) and commit with a clear message describing what changed and why. Follow the repository's commit message style (see recent `git log`).

If the working tree is clean (no changes to commit), skip steps 5 and 6. Report "nothing to save."

## 6. Push to main (only if a remote exists)

Check for a remote first — **do not** push without one:

```bash
git remote
```

- **No remote:** stop here. The commit is saved locally on `main`. Report "committed locally; no remote configured, nothing pushed."
- **Remote `origin` exists** (current state): push with `git push origin main`. This triggers a Vercel production deploy (Root Directory is `web/`).
