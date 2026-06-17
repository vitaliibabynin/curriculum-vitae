# public/resume/ — downloadable CV

`resume.pdf` is the **live** resume served from the portfolio's Resume button
(`developerInfo.resumeUrl` → `/resume/resume.pdf`). The link is intentionally stable: the button
always points at `resume.pdf`, so updating the CV never changes the URL.

The PDF is **generated**, not hand-edited. Source + regeneration steps live in
[`../../resume-src/`](../../resume-src/README.md). Content traces to the off-repo career knowledge base
(`F:\IPC Expert Management System\aceli\career\cv-full.md`) — the source of truth.

## archive/ — old versions

Mirrors the career KB's `cv-archive/` convention. **Before replacing `resume.pdf` with a materially new
version**, snapshot the current live file into `archive/` and add a row to the index below:

1. Live copy stays at `resume.pdf`. Generate the new one over it.
2. Move the *outgoing* file to `archive/resume-<YYYY-MM-DD>-v<N>.pdf` (date it was retired, next version
   number). Never edit an archived snapshot.
   - PowerShell: `Move-Item -LiteralPath "public\resume\resume.pdf" -Destination "public\resume\archive\resume-2026-06-17-v2.pdf"`
3. Add a one-line row to the index.

## Index (newest first)

| File | Archived | Why superseded |
|---|---|---|
| `resume-2024-10-14-v1.pdf` | 2026-06-17 | Original portfolio CV (Oct 2024). Stale — predated the AI-native pivot and the current role/project set. Replaced by a fresh two-page CV generated from `cv-full.md`. |
