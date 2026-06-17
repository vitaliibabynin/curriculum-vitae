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

Drive the user's already-open Chrome (same profile, same logged-in session, same dev-server tabs) via the **Playwriter CLI**. The CLI talks to a Chrome extension over a local relay.

## Getting the latest upstream guidance

Playwriter evolves; for the canonical, current docs run:

```bash
npx playwriter@latest skill   # prints the full upstream skill — do not pipe through head
```

Read it in full if anything below seems out of date. (This repo pins `playwriter` in `web/package.json`; the CLI above always fetches latest.)

## This project: drive the `Vitalii` Chrome profile

**This project uses the `Vitalii` Chrome profile** — it carries the right logins and the Playwriter extension. Always drive that profile, never a clean Chrome for Testing.

| What | Value |
|---|---|
| Profile directory | `Default` |
| Display name | `Vitalii` |
| Account | `vbabynin1@gmail.com` |
| Playwriter browser key | `profile:103026131667974306927` |

```bash
npx playwriter@latest browser list
```

- If `vbabynin1@gmail.com` is listed → use it: `npx playwriter session new --browser profile:103026131667974306927`.
- If it's **not** listed → launch the profile, then re-run `browser list`. The extension auto-connects a few seconds after the window opens. From PowerShell:

```powershell
Start-Process chrome -ArgumentList '--profile-directory="Default"'
```

(The browser key can change if the profile is re-created; if `profile:103026131667974306927` is gone, match by the `vbabynin1@gmail.com` account in `browser list`. The profile→directory map lives in `%LOCALAPPDATA%\Google\Chrome\User Data\Local State` under `profile.info_cache`.)

Prefer this over `npx playwriter@latest browser start` — `browser start` launches a clean Chrome for Testing without the user's logins.

## CLI shape — read this first

The CLI is **NOT** a natural-language interface. It is a session-based JS evaluator.

```bash
npx playwriter@latest browser list        # 1. confirm a browser is connected
npx playwriter@latest session new          # 2. get a session id (a number, e.g. "2")
npx playwriter -s 2 -e '<one-line javascript>'   # 3. run JS in that session
```

**Do NOT** do `npx playwriter "click the button"` — the positional natural-language form does not exist and silently does nothing. Every action is JavaScript via `-e` (or `-f` for a file).

## Do NOT use the Playwriter MCP server

This project drives Playwriter **through the CLI only**. The project MCP server has been removed (`.mcp.json` deleted) in favour of the CLI + this skill. Do **not** call `mcp__playwriter__execute` / `mcp__playwriter__reset` — they are not configured here.

(Unrelated: **Playwright** is a separate npm package. Do NOT install or import it.)

## File writes & screenshots → repo-root `tmp/`, always absolute paths

Playwriter's sandboxed `fs` (`require('node:fs')`) only permits writes to: the directory where the CLI was invoked (session cwd), `/tmp`, and the OS temp dir. Separately, Playwright's artifact APIs (`page.screenshot({ path })`, `page.pdf`, `download.saveAs`, …) resolve `path` on the **relay**, not the sandbox.

**Rule: write every artifact to an absolute path under the repo-root `tmp/` folder** — `F:\CurriculumVitae\curriculum-vitae\tmp\<name>.png`. `tmp/` is gitignored scratch; Playwright auto-creates it. Never write to `~/Downloads`, `~/Desktop`, or other paths (throws `EPERM: access outside allowed directories`).

```bash
npx playwriter -s 2 -e 'await page.screenshot({ path: "F:/CurriculumVitae/curriculum-vitae/tmp/home.png", scale: "css" }); await resizeImageForAgent({ input: "F:/CurriculumVitae/curriculum-vitae/tmp/home.png" })'
```

## WSL2 relay — route every call through `wsl.exe`, or file writes land inside WSL

The relay on this machine often runs inside **WSL2** (another repo starts it there). Playwriter's ScopedFS captures the CLI's cwd at `session new` time and resolves sandbox `fs` paths against it *on the relay's OS*. A session created from a Windows CLI then has a broken file scope when the relay is in WSL.

**Rule: create the session on the relay's side with cwd = this project, and run every subsequent call the same way.**

1. If `wsl.exe --list --running` shows a distro, create the session AND run all calls via:

   ```powershell
   wsl.exe --cd "F:\CurriculumVitae\curriculum-vitae" -- /home/vitalii/.nvm/versions/node/v24.15.0/bin/node /home/vitalii/.nvm/versions/node/v24.15.0/bin/playwriter session new
   wsl.exe --cd "F:\CurriculumVitae\curriculum-vitae" -- /home/vitalii/.nvm/versions/node/v24.15.0/bin/node /home/vitalii/.nvm/versions/node/v24.15.0/bin/playwriter -s <id> -f <script.js>
   ```

   The fs scope becomes `/mnt/f/CurriculumVitae/curriculum-vitae`, so the **relative** path `tmp/<name>.png` lands directly in the Windows folder. (If that node version is gone, find the current one with `wsl.exe -- ls /home/vitalii/.nvm/versions/node/`.)
2. If WSL is **not** running, plain `npx playwriter@latest` from the project dir works — use the absolute `F:\…\tmp\<name>.png` path.
3. Through the WSL wrapper, prefer `-f script.js` (Write the snippet to a temp file in the project root, delete after) over inline `-e` — quoting breaks across the PowerShell → `wsl.exe` → bash layers.

### Verify every capture on the Windows side

After every screenshot, confirm the PNG exists on `F:` with a fresh timestamp:

```powershell
Get-Item 'F:\CurriculumVitae\curriculum-vitae\tmp\<name>.png' | Select-Object Length,LastWriteTime
```

A screenshot that only exists inside WSL2 counts as a failed capture. Probe-write `tmp/_probe.png` before the first real capture of a session and verify it on `F:` before continuing.

## Pre-bound variables inside `-e`

- `page` — a default Playwright `Page`. Prefer creating your own with `state.page = await context.newPage()`.
- `context` — the `BrowserContext`; `context.pages()` to inspect open tabs.
- `state` — per-session sandbox object persisted across `-e` calls.
- `require` plus Node globals (`setTimeout`, `fetch`, `Buffer`, `crypto`, …). No `import`, `__dirname`, `__filename`.

## Act → observe → decide

1. **Act** — `npx playwriter -s 2 -e 'await page.goto("http://localhost:3000")'`
2. **Observe** — `snapshot({ page })` for text/state (free, searchable), and `getLatestLogs({ page, sinceLastCall: true })` after every goto/click to catch console errors. Screenshot only for visual/CSS layout.
3. **Decide** — pick the next action from what actually rendered.

Other helpers (see `npx playwriter skill` for signatures): `screenshotWithAccessibilityLabels` (find interactive elements), `resizeImageForAgent` (shrink before reading back), `getCleanHTML`, `getPageMarkdown`, `waitForPageLoad`.

## Screenshots — keep them under 2000px, half-screen viewport

Claude rejects images over 2000px on either axis; high-DPI Windows doubles a 1920px viewport into ~3840px PNGs. **Always** pass `scale: 'css'` and pipe through `resizeImageForAgent({ input })` before reading. For new pages, target a 1440–1920px viewport (real laptop sizes; smaller PNGs, fewer tokens). Prefer `snapshot()` over screenshots for text/state.

## Sessions

```bash
npx playwriter session list      # show sessions and state keys
npx playwriter session reset 2   # reuse id, fresh browser connection
npx playwriter session new       # brand-new id
```

After a reset, do `state.page = await context.newPage()` (or use the pre-bound `page`).

$ARGUMENTS
