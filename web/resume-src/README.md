# resume-src/ — source for the downloadable CV

`resume.html` is the editable source for the portfolio's downloadable resume. It renders to
`../public/resume/resume.pdf` (the stable URL the Resume button links to). This folder is **not** under
`public/`, so the raw source is never served — only the generated PDF is.

- **Style:** ATS-friendly — single column, standard fonts, real selectable text, logical heading order,
  no header/footer chrome. Print geometry (A4, margins) lives in the `@page` rule inside `resume.html`.
- **Content:** traces to the off-repo career knowledge base
  (`F:\IPC Expert Management System\aceli\career\cv-full.md`) — the source of truth. Update content there
  first, then reconcile here. Nothing is invented.

## Regenerate the PDF

From the repo root, render the HTML to PDF with headless Chrome (built-in, no npm deps). The
`--user-data-dir` keeps it from clashing with a running Chrome instance:

```bash
"/c/Program Files/Google/Chrome/Application/chrome.exe" \
  --headless=new --disable-gpu --no-pdf-header-footer \
  --user-data-dir="$TEMP/chrome-resume-profile" \
  --print-to-pdf="F:/CurriculumVitae/curriculum-vitae/web/public/resume/resume.pdf" \
  "file:///F:/CurriculumVitae/curriculum-vitae/web/resume-src/resume.html"
```

PowerShell equivalent:

```powershell
& "C:\Program Files\Google\Chrome\Application\chrome.exe" `
  --headless=new --disable-gpu --no-pdf-header-footer `
  --user-data-dir="$env:TEMP\chrome-resume-profile" `
  --print-to-pdf="F:\CurriculumVitae\curriculum-vitae\web\public\resume\resume.pdf" `
  "file:///F:/CurriculumVitae/curriculum-vitae/web/resume-src/resume.html"
```

(Microsoft Edge works too — same flags, `msedge.exe`.)

## Versioning

Before replacing `resume.pdf` with a materially new version, archive the outgoing one. See
[`../public/resume/README.md`](../public/resume/README.md) for the convention
(`archive/resume-<YYYY-MM-DD>-v<N>.pdf` + an index row).
