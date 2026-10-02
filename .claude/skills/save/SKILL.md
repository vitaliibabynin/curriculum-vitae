---
name: save
description: Review changes since last commit, tidy them, update documentation, run the Next.js checks, and commit THIS session's work + push to main (which auto-deploys to Vercel). A parallel chat's changes in the tree are reported and left dirty unless the user says to include them.
---

Perform a full review, cleanup, and commit of all changes since the last commit. Follow every step in order. Solo workflow — changes land directly on `main`. This repo has an `origin` remote (`github.com/vitaliibabynin/curriculum-vitae`), so the final step pushes to it — and **push to `main` auto-deploys to Vercel** via the project's Git integration, so saving ships live. If `origin` is ever removed, `save` commits locally only.

## 0. Scope — this session's work only

If this is **not** a git repository, **stop immediately** — do not run `git init`. Report "This is not a git repository." and take no further action.

`save` commits only what *this* session did. Another chat working in the same checkout may have left files dirty;
those are reported and left exactly as they are — not tidied, not staged, not committed.

```bash
git status --porcelain -uall        # everything dirty, whoever made it
```

A path is **in scope** only if this session created or edited it. If you didn't write it and don't recognise it,
it's **out of scope** — ask rather than guess (a foreign file left behind costs a re-run; a foreign file pushed is
live on Vercel under your commit). Write the list down — step 5 stages exactly these paths:

```bash
SCOPE=( 'path/one' 'path/two' )
```

**Override:** if the user says "save everything" (or names other work), that wins. Never widen on your own initiative.

## 1. Review changes since last commit

```bash
git diff HEAD -- "${SCOPE[@]}"
```

Read every in-scope modified and new file end-to-end.

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

If `web/resume-src/resume.html` changed, `web/public/resume/resume.pdf` must be regenerated in the same commit
(`/resume` skill) — a stale PDF ships live. Check the PDF's timestamp is newer than the HTML's.

## 4. Update documentation

- Update `web/CLAUDE.md` if the change affects the app's conventions, structure, or key files.
- Update `docs/status.md` (current state) and the relevant folder `CLAUDE.md` files (`docs/`, `plans/`, `strategy/`, `strategy/research/`) if the changes affect their conventions or contents.
- Update root `CLAUDE.md` if the change affects repo layout, conventions, the skills/agents list, or git/deploy.
- Keep CLAUDE.md files concise — they load into every conversation.

## 5. Commit

Stage **`$SCOPE`** (including the tidy and doc updates from steps 2–4 — add any new files to it) and commit. Never `git add -A`.

```bash
git status --porcelain -uall        # re-check: another chat may have written since step 0
git add -- "${SCOPE[@]}"
git diff --cached --name-only       # must list ONLY this session's paths
```

Unstage anything foreign (`git restore --staged -- '<path>'`). Commit with a clear message describing what changed
and why, following the repo's style (see recent `git log`).

If `$SCOPE` is empty, skip steps 5 and 6 and report "nothing to save" — even if the tree is dirty with someone
else's work. Report every foreign path left dirty and say it was left on purpose.

## 6. Push to main (only if a remote exists)

Check for a remote first — **do not** push without one:

```bash
git remote
```

- **No remote:** stop here. The commit is saved locally on `main`. Report "committed locally; no remote configured, nothing pushed."
- **Remote `origin` exists** (current state): push with `git push origin main`. This triggers a Vercel production deploy (Root Directory is `web/`).
