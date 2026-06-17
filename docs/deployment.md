# Deployment & hosting — as built

The live operational facts of the portfolio's hosting on **Vercel**. The *configuration* lives in code
(`web/package.json`, `web/next.config.mjs`) and the Vercel project settings; this captures what **isn't in the
repo** — the project identifiers and runtime behaviour. **As of 2026-06-17.** Identifiers verified by direct
observation via the Vercel CLI/API.

## Source repository

- **GitHub:** `vitaliibabynin/curriculum-vitae` — default branch `main`, set as the local `origin` remote.

## Vercel project (live)

| Fact | Value |
|---|---|
| Project name | `curriculum-vitae` |
| Project ID | `prj_AyDEJZr128asHoonHtwMwOU2EvSa` |
| Owner / scope | `vitaliibabynin's projects` (`vitaliibabynins-projects`) |
| Account | `vitalii.babynin@gmail.com` (user `vitaliibabynin`) |
| Production URL | https://curriculum-vitae-five-ashy.vercel.app |
| Framework preset | Next.js |
| **Root Directory** | **`web`** — set when the app moved into `web/` (was `.`). **Load-bearing:** `package.json` is under `web/`, so a build against repo root would fail. |
| Build command | `npm run build` (Next.js default) |
| Node.js version | 20.x |

## Auto-deploy pipeline

**Push to `main` on GitHub → Vercel builds and deploys** (Git integration, production branch `main`). The
`/save` skill pushes to `origin/main`, so saving ships to Vercel. Because Root Directory is `web`, Vercel runs
`npm install` + `npm run build` inside `web/`.

## Changing project settings without the dashboard

The Root Directory and other project settings can be read/written via the Vercel CLI/REST API with the locally
stored token (`%APPDATA%\com.vercel.cli\Data\auth.json`):

```bash
vercel project inspect curriculum-vitae          # read current settings
# REST: PATCH https://api.vercel.com/v9/projects/prj_AyDEJZr128asHoonHtwMwOU2EvSa  {"rootDirectory":"web"}
```

## Runtime notes

- Static/SSR Next.js app; no server secrets or env vars required for the current build.
- Transient Playwriter/browser captures go to the gitignored repo-root `tmp/`, never committed.
