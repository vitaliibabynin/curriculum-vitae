# CV refresh + Skills Globe — progress tracker

Reconcile the portfolio to the career KB (`F:\IPC Expert Management System\aceli\career\`) and replace the
3D project cube as centerpiece with an interactive **3D skills globe**. The cube is **relocated, not deleted**.

**Final section order:** Hero → **Expertise (globe + Selected Work)** → Experience → About → **Playground (cube, as-is)** → Contact

### Decisions (confirmed)
- Projects → globe + compact describe-only **Selected Work** in the same section.
- Globe section named **"Expertise"**; detailed skill tags stay in About.
- Resume button **hidden** for now (stale PDF); regenerate later.
- Cube → bottom **Playground** section, rendered **as-is**; not in nav.

---

## Progress — ✅ complete (eslint clean · `next build` passes · verified in browser, both themes)

### Phase 1 — Data & content (low risk)
- [x] **`app/data.ts`**
  - [x] `developerInfo`: tagline + about reframe ("decade since 2015, AI-native"); annotate stale `resumeUrl`
  - [x] `topExperiences`: add **Chirayou** (top, generic), rename freelance → **Robot Army — Founder & Technical Lead** (+stack)
  - [x] `skillGroups`: full rewrite — AI/LLM + Compliance lead; legacy demoted
  - [x] `educations`: + Winchester College (logo-optional), optional Queen Mary
  - [x] new `credentials` (TestGorilla 95/89/85)
  - [x] new `selectedProjects` (describe-only; live links only Shukai + Robot Army; Financier excluded)
  - [x] new `skillClusters` (5 clusters → globe data)
  - [x] `navItems`: Projects → Expertise
- [x] **`components/contact-section.tsx`**: remove Resume button
- [x] **`components/about-section.tsx`**: optional education-logo fallback + Credentials block
- [x] **`components/experiences-timeline.tsx`**: skillPriority entries for new core tags
- [x] **`components/hero-section.tsx`**: scroll target `#projects` → `#expertise`
- [x] **Playground**: rename `projects-section.tsx` → `playground-section.tsx` (id=playground, heading "Playground"); keep `<ProjectCube/>`

### Phase 2 — 3D Skills Globe
- [x] Install `three` + `@react-three/fiber` (v9) + `@react-three/drei`
- [x] `components/skills-globe.tsx`: r3f scene (cluster anchors + orbiting tech nodes, autorotate+drag, theme-aware, reduced-motion safe, offscreen pause)
- [x] `components/expertise-section.tsx`: heading + dynamic(ssr:false) globe + cluster legend (a11y fallback) + Selected Work cards
- [x] `app/page.tsx`: wire Expertise (section 2) + Playground (before Contact)

### Verify
- [x] `npx eslint .` clean
- [x] `npm run build` succeeds
- [x] `npm run dev` — both themes, drag/autorotate, hover, legend, Selected Work, Playground cube, no Resume button
- [x] reduced-motion (static globe) + mobile (touch drag, stacking)
- [x] screenshots both themes

### Post-test fixes (playwriter QA)
- [x] Nav links + hero scroll button didn't move the page (native smooth-scroll fought Lenis) → exposed `window.lenis` in `smooth-scroll.tsx`; nav + hero now use `lenis.scrollTo`
- [x] Education reordered to reverse-chronological: BSc → Edinburgh → **Queen Mary (2011–12) → Winchester (2006–11)**
- [x] Added real coat-of-arms logos (Wikimedia Commons, CC BY-SA) for Queen Mary + Winchester; education tile switched to `object-contain` so crests aren't cropped
- [x] Re-verified: eslint clean, `next build` passes, browser QA (no console errors, autorotate + hover tooltips work, theme toggle, nav scroll)

### Accuracy pass + cube decision (2026-06-17)
- [x] Reconciled to the **softened** career KB (honesty pass): Robot Army HQ → "built, pre-launch … architected toward HIPAA/GDPR" (was "HIPAA-compliant"); Shukai → shukai.eu live web app, offline-first RN/PowerSync app "in development"; About + Skills → "HIPAA-architected" / "audit logging"; Robot Army role → "AI products and prototypes"
- [x] Education corrected from 2018 CV: Queen Mary **2012–2013 (Economics)**, Winchester **2007–2012 (High School Diploma)**
- [x] Selected Work trimmed to 3 (Robot Army HQ, Shukai, Financier) with screenshots; Financier login-gated (hint shown), `image:` TODO
- [x] **Cube removed from the page** (kept in repo: `playground-section.tsx` + `project-cube.tsx`) — competed with the globe + spotlighted weak/legacy projects

### Follow-ups (not in this pass)
- Regenerate `/resume/resume.pdf` from `cv-full.md`, then re-enable Resume button.
- Optionally refresh the Playground cube's project content later.
- Confirm exact Winchester/Queen Mary years if precision wanted.

> Full approved plan: `C:\Users\Sacrifice\.claude\plans\compiled-mapping-robin.md`
