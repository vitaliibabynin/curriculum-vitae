---
name: playwriter
description: Browser automation using Playwriter CLI — navigate, click, type, screenshot, scrape. Use for visual QA of the portfolio and any real-browser checks.
allowed-tools:
  - Bash
  - Read
  - Glob
  - Grep
  - Write
---

# Playwriter Browser Automation

Drive the user's already-open Chrome (same profile, same logins, same dev-server tabs) via the **Playwriter
CLI**. The CLI talks to a Chrome extension over a local relay. Written against **playwriter 0.7.0**
(re-verified on this machine 2026-10-02).

## Getting the latest upstream guidance

Playwriter evolves; for the canonical, current docs run:

```bash
npx playwriter@latest skill   # prints the full upstream skill — do not pipe through head
```

Read it in full if anything below seems out of date, and before any `recorder` work. Always use `@latest`
on the first `npx` call of a session. (`web/package.json` pins `playwriter` as a devDep only to track the
version; nothing in the app imports it.)

## This project: drive the `Vitalii` Chrome profile

| What | Value |
|---|---|
| Profile directory | `Default` |
| Display name | `Vitalii` |
| Account | `vbabynin1@gmail.com` |
| Playwriter browser key | `install:Chrome:rq4g4k6uujkd` |

```bash
npx playwriter@latest browser list
```

- If `vbabynin1@gmail.com` is listed → `npx playwriter@latest session new --browser install:Chrome:rq4g4k6uujkd --tab-group cv`,
  **run from the repo root** (the session's cwd becomes its sandbox `fs` write scope).
- If it's **not** listed → launch the profile, wait a few seconds (the extension auto-connects), re-run
  `browser list`. Pre-approved in `.claude/settings.json`:

  ```bash
  powershell.exe -NoProfile -Command "Start-Process chrome -ArgumentList '--profile-directory=\"Default\"'"
  ```

  (From the PowerShell tool: `Start-Process chrome -ArgumentList '--profile-directory="Default"'`.)

**Browser keys are `install:Chrome:<id>`** — one per extension install, stable across Chrome restarts. The
old `profile:<gaia-id>` form is rejected (`Browser not found`). Other keys in `browser list` belong to other
profiles/repos (`robotarmyhqcom@gmail.com` = the IPC repo, `vitalii@chirayou.com` = work) — never drive
those from here. If `rq4g4k6uujkd` is gone (extension reinstalled), match by the `vbabynin1@gmail.com`
account and update the table.

Never fall back to `playwriter browser start` / `headless` — that's a clean Chrome without the user's
profile. (Fine only if the user explicitly asks for a clean browser.)

## CLI shape — read this first

The CLI is **NOT** a natural-language interface. It is a session-based JS evaluator.

```bash
npx playwriter@latest browser list                                               # 1. confirm the browser
npx playwriter@latest session new --browser install:Chrome:rq4g4k6uujkd --tab-group cv   # 2. session id
npx playwriter -s 3 -e '<javascript>'                                            # 3. run JS in it
```

**Do NOT** do `npx playwriter "click the button"` — that form does not exist.

- **Read the id off the `Session N created …` line**, never the last line — a cloud-browser tip prints
  after it. Lost it? `npx playwriter session list` shows ID, BROWSER, PROFILE, EXT, GROUP, CWD, STATE KEYS.
- **Ignore `Assertion failed: !(handle->flags & UV_HANDLE_CLOSING) … async.c`** — libuv noise on Windows
  exit. It can make the exit code non-zero; judge by the `Console output` block.
- `--tab-group cv` keeps this repo's tabs in their own Chrome tab group, away from other chats' tabs.

## The relay is on Windows — probe once per session

There is one relay per machine (`127.0.0.1:19988`), started at login on **Windows** (WSL's `playwriter` is a
wrapper around the Windows CLI). So Windows absolute paths just work — no `wsl.exe` wrapper needed. Right
after `session new`, sanity-check:

```bash
npx playwriter -s 3 -e 'console.log("RELAY:"+process.platform)'
```

- `win32` → expected.
- `linux` → setup broke. Stop and tell the user. **Never `playwriter serve --replace`** — it kills every
  other chat's sessions.

The session's `fs` scope is the **CWD column of `session list`** — must read
`F:\CurriculumVitae\curriculum-vitae`. (`path.resolve(".")` inside `-e` reports the *relay's* cwd, not
yours — don't use it as a check.)

## Pre-bound variables inside `-e`

- `state` — per-session object persisted across calls. **Initialize `state.page` first** and use it for
  every step: `state.page = context.pages().find(p => p.url() === "about:blank") ?? await context.newPage()`.
- `page` — a default page (may be shared with other agents). Quick one-offs only.
- `context` — the `BrowserContext`; `context.pages()` to find existing tabs (e.g. the dev server:
  `context.pages().findLast(p => p.url().includes("localhost:3000"))`).
- `require`, `import()`, Node globals (`fetch`, `Buffer`, `setTimeout`…). No `__dirname`/`__filename`.

## Quoting, files, timeouts

- One-liners: wrap `-e` in **single quotes**, double quotes inside the JS. Prefer the **Bash tool** —
  PowerShell doesn't treat single quotes like bash.
- Multi-line: heredoc with a quoted delimiter, or write a `.js` file and run `-f file.js` (same sandbox;
  `-e` and `-f` can't be combined). Delete scratch scripts afterwards.
- Default timeout is **10 s**. Navigation, the R3F globe's first paint, and full-page screenshots often need
  more: `--timeout 30000`, or `export PLAYWRITER_EXEC_TIMEOUT=30000` for the shell. A first screenshot after
  `goto` on a heavy page can time out once — retry with `--timeout 60000` before calling it broken.

## Observe → act → observe — never chain blindly

1. **Observe** — print `state.page.url()` + `snapshot({ page: state.page })` +
   `getLatestLogs({ page: state.page, sinceLastCall: true })`. Always print the URL; pages redirect.
2. **Act** — one action.
3. **Observe again**, then decide.

```bash
npx playwriter -s 3 --timeout 30000 -e 'state.page = context.pages().find(p => p.url() === "about:blank") ?? await context.newPage(); await state.page.goto("http://localhost:3000", {waitUntil:"domcontentloaded"}); console.log(state.page.url()); console.log(await getLatestLogs({page: state.page, sinceLastCall: true})); console.log(await snapshot({page: state.page, locator: state.page.locator("main")}))'
```

- **`snapshot()` is the default observation** — text tree with ready-made locators; use them directly,
  never invent selectors. Scope with `locator:` to cut tokens. Always pass `page` (or a `locator`).
- **`inspect({ locator })`** — box, scroll, computed styles, visibility, aria. Use it for layout questions
  instead of hand-written `page.evaluate()` that reads classes/bounding boxes.
- **`getLatestLogs` after every goto/click** — catches hydration errors and failed requests. Don't attach
  your own `page.on("console")`.
- Other helpers: `screenshotWithAccessibilityLabels`, `getCleanHTML`, `getPageMarkdown`, `waitForPageLoad`,
  `resizeImageForAgent`, `getCDPSession({ page })` (**never** `newCDPSession()` — doesn't work through the
  relay), `recording.start()/stop()`.

## Rules

- **Never** `browser.close()` / `context.close()`. Close only pages you opened.
- **No `bringToFront`** unless asked.
- **Click a field right before `fill()`/`keyboard`** — in extension mode keystrokes go to the OS-focused
  surface and can land in Chrome's omnibox otherwise.
- Click times out → a modal/overlay is blocking. Snapshot to find it; never `{ force: true }` or
  `dispatchEvent` (they skip React handlers).
- `waitForLoadState("domcontentloaded")`, not `waitForEvent("load")`.
- Remove only **your** listeners (by name/handler). **Never `removeAllListeners()`** — it strips
  Playwriter's own console/error listeners.
- No pre-written `.ts` Playwright scripts for ad-hoc checks — they're blind to what actually rendered.
- Downloads don't land through the extension relay (no `download` event fires). To verify the Resume PDF,
  `fetch` `/resume/resume.pdf` from the sandbox and check the `%PDF` magic bytes instead of clicking.

## Screenshots → repo-root `tmp/`, forward-slash absolute path

`tmp/` is gitignored **scratch**. Anything worth keeping goes to `docs/screenshots/` (see `docs/CLAUDE.md`).

Playwright artifact APIs (`page.screenshot({ path })`, `locator.screenshot`, `page.pdf`) are written by the
relay, so **always pass an absolute path**, with **forward slashes** (the CLI transport mangles `\t`, `\p`,
… into escapes). Never call `screenshot()` without a `path`.

```bash
npx playwriter -s 3 --timeout 30000 -e 'await state.page.screenshot({ path: "F:/CurriculumVitae/curriculum-vitae/tmp/home.png", scale: "css" }); await resizeImageForAgent({ input: "F:/CurriculumVitae/curriculum-vitae/tmp/home.png" })'
```

- **Always `scale: "css"` + `resizeImageForAgent`** — Claude rejects images over 2000px; high-DPI doubles a
  1920px viewport.
- Region shots: `clip: { x, y, width, height }`.
- **Verify every capture** exists on `F:` with `Length > 0` and a fresh timestamp
  (`ls -la tmp/<name>.png`). Missing → wrong session scope or relay platform; fix and recapture.
- Viewport for new pages: **1440–1920px** wide (`state.page.setViewportSize`). For the responsive pass also
  check ~390px (phone). Screenshot only for visual/CSS questions — the globe, theme, layout.

## Portfolio QA notes

- Dev server: `cd web && npm run dev` (auto-picks a free port if 3000 is busy — read the port from its
  output).
- Theme toggles the `dark` class on `<html>` and persists to `localStorage` — to test both themes, toggle via
  the UI button (snapshot finds it) rather than editing classes, then reload to confirm persistence.
- Lenis smooth scroll intercepts wheel input: to reach a section use the nav links, or
  `state.page.locator("#experience").scrollIntoViewIfNeeded()`; give GSAP/Framer reveals ~1 s before a
  screenshot.
- The skills globe is a WebGL canvas: `snapshot` can't see inside it — screenshot for visuals, and check
  `getLatestLogs` for WebGL/three warnings.

## Sessions

```bash
npx playwriter session list      # ID, BROWSER, PROFILE, EXT, GROUP, CWD (= fs scope), STATE KEYS
npx playwriter session reset 3   # same id, fresh browser connection (fixes stale connections)
```

After a reset, re-init `state.page`. Relay logs for internal errors: `npx playwriter logfile`.

## Not used here

- **The Playwriter MCP server** — not configured (`.mcp.json` removed). Don't call `mcp__playwriter__*`.
- **Playwright** (separate npm package) — don't install or import it.

$ARGUMENTS
