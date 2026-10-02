---
name: resume
description: Regenerate the downloadable CV PDF from web/resume-src/resume.html (headless Chrome), archiving the outgoing version first when the change is material. Use when the resume content changed, the user asks to update/refresh/regenerate the CV or resume PDF, or the career KB was updated.
---

Regenerate `web/public/resume/resume.pdf` — the file the Contact section's **Resume** button serves at the
stable URL `/resume/resume.pdf` (`developerInfo.resumeUrl` in `web/app/data.ts`). The PDF is **generated,
never hand-edited**. Follow every step in order.

## 1. Reconcile content (only if content is changing)

The source of truth is the **off-repo career KB**: `F:\IPC Expert Management System\aceli\career\` —
start with `cv-full.md` (also `profile.md`, `experience.md`, `projects.md`, `skills.md`). It is
**read-only** from here.

- Edit `web/resume-src/resume.html` to match it. **Nothing invented** — no metrics, titles, dates or
  clients that aren't in the KB. If the user wants a change the KB doesn't support, say so and ask them to
  update the KB first.
- Honour the KB's framing decisions (e.g. "10+ years since 2015"; Robot Army = independent practice,
  "Founder & Technical Lead"; Chirayou GmbH internals stay generic/outcome-level; Financier is login-gated).
- Keep it ATS-friendly: single column, standard fonts, real selectable text, logical heading order,
  **two A4 pages**. Print geometry lives in the `@page` rule in `resume.html`.
- If the same facts appear on the site, check `web/app/data.ts` agrees (it reconciles to the KB too).

## 2. Archive the outgoing PDF (material changes only)

A material change = anything a reader would notice (new role/project, rewritten summary, changed dates).
Typo/spacing fixes don't need an archive entry.

1. Next version `N` = highest `-v<N>` in `web/public/resume/archive/` + 1.
2. Move the current live file (never edit an archived snapshot):

   ```bash
   git -C /f/CurriculumVitae/curriculum-vitae mv web/public/resume/resume.pdf "web/public/resume/archive/resume-$(date +%F)-v<N>.pdf"
   ```

3. Add a row at the **top** of the index table in `web/public/resume/README.md`:
   `| resume-<YYYY-MM-DD>-v<N>.pdf | <YYYY-MM-DD> | <why superseded, one line> |`.

## 3. Render

From any directory (absolute paths; `--user-data-dir` avoids clashing with the running Chrome):

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --user-data-dir="$TEMP/chrome-resume-profile" \
  --print-to-pdf="F:/CurriculumVitae/curriculum-vitae/web/public/resume/resume.pdf" \
  "file:///F:/CurriculumVitae/curriculum-vitae/web/resume-src/resume.html"
```

(Edge works too: same flags, `msedge.exe`. PowerShell form in `web/resume-src/README.md`.)

## 4. Verify

- The file exists, is non-empty, starts with `%PDF`, and has a fresh timestamp.
- **Page count is 2**: `grep -aoE "/Count [0-9]+" web/public/resume/resume.pdf` prints `/Count 2`. Then
  Read the PDF (`pages: "1-2"`) and look — confirms nothing overflows, clips or orphans a heading.
- If it spilled to 3 pages, tighten content or spacing in `resume.html` and re-render — don't shrink the
  font below readable.

## 5. Hand off

Report what changed, the archive file (if any), and the page count. Don't commit — `/save` does that (and
`/save` pushing to `main` is what deploys the new PDF to Vercel).
