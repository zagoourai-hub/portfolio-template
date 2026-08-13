# Student Developer Portfolio - Delivery Tracker

Source: [PRD.md](../PRD.md)
Last updated: 2026-08-12 (dashboard frontend preview completed; backend handoff remains P2-T001)
Rule: one task may be `in_progress` at a time. Backend dashboard code has not started. Generated sample content must remain clearly labelled until replaced by factual owner data.

## Runtime Lokal

- Frontend portfolio aktif di `http://localhost:3001` saat diverifikasi pada 2026-08-12.
- Ini catatan runtime lokal, bukan konfigurasi deployment. Periksa ulang sebelum restart atau stop server.

## Summary

| Phase | Status | Completed | Notes |
|---|---:|---:|---|
| 1 - Frontend Portfolio Publik | blocked | 4/7 | Local public template is complete. Production domain and analytics remain. |
| 1B - Dashboard Frontend Preview | completed | 5/5 | Static login, shell, management pages, and project editor are complete. No auth or persistence exists. |
| 2 - Data dan Auth Foundation | completed | 8/8 | Database SQLite, Prisma v7, seed data, auth cookie, guard middleware, & login/logout UI complete. |
| 3 - Dashboard Content CRUD | completed | 12/12 | Profile, Skills, Learning Tracks, and Projects CRUD APIs and Dashboard UI forms fully connected to DB. |
| 4 - Integrasi Publik dan Hardening | completed | 5/5 | Public routes queries updated to DB (published status only). Runbook complete. |
| 5 - Quality Assurance | in_progress | 4/6 | Build, accessibility, security audit, & operations rehearsal completed. Domain pending for P5-T005. |

## Phase 1 - Frontend Portfolio Publik

| ID | Layer | Status | Task | Dependencies | Verification | Notes |
|---|---|---|---|---|---|---|
| P1-T001 | OPS | completed | Confirm `portfolio/` as code-repo root and record the profile-layout exception. | Product owner | Decision recorded | Existing Next.js app remains in `portfolio/`; do not move it without approval. |
| P1-T002 | FE | completed | Build public home, projects, project detail, contact, navigation, footer, and `not-found` routes. | P1-T001 | `npm run lint`, `npx tsc --noEmit`, `npm run build`, and browser smoke passed | Current public portfolio uses generated student-template content. |
| P1-T003 | FE | completed | Define design lock, responsive behavior, keyboard behavior, image fallback, dark mode, and reduced motion. | P1-T002 | Desktop/mobile visual checks and accessibility smoke passed | Reuse current `STYLESEED.md` when dashboard implementation begins. |
| P1-T004 | FE | completed | Define typed local student-template profile, skill, learning-track, and project data. | P1-T002 | Typecheck and build passed | This data becomes the seed and migration reference for dashboard content. |
| P1-T005 | FE | blocked | Set production `NEXT_PUBLIC_SITE_URL` and verify canonical URL, sitemap, robots, and social preview. | Production domain | Production build and deployed URL | Domain is not approved yet. |
| P1-T006 | OPS | pending | Select privacy-safe analytics provider and event plan. | Product owner | Event inventory approved | No analytics or dashboard metrics until data source is real. |
| P1-T007 | FE | skipped | Add professional service claims and client-conversion copy. | Product scope | Scope review | Student template intentionally avoids invented professional services. |

## Phase 1B - Dashboard Frontend Preview

| ID | Layer | Status | Task | Dependencies | Verification | Notes |
|---|---|---|---|---|---|---|
| DASH-FE-001 | FE | completed | Lock frontend-only dashboard scope, visual grammar, static-data boundary, and reusable UI states. | P1-T003, product owner | PRD, tracker, and `STYLESEED.md` review passed; no em dash introduced | No auth, API, Prisma, or persistence in this sprint. |
| DASH-FE-002 | FE | completed | Build visual login preview, responsive dashboard shell, navigation, and summary route. | DASH-FE-001 | `npx next typegen`, `npx tsc --noEmit`, targeted ESLint, desktop/mobile Playwright, drawer focus and Escape passed | Direct `/dashboard` access is intentionally preview-only until owner guard exists. |
| DASH-FE-003 | FE | completed | Build static profile, skills, and learning-tracks management routes. | DASH-FE-002 | Targeted typecheck/lint and 390px URL/H1/no-overflow checks passed | Controls are visual only until owner-scoped handlers exist. |
| DASH-FE-004 | FE | completed | Build static project list, create, and edit routes with preview draft/published states. | DASH-FE-002 | Targeted typecheck/lint and mobile list/form checks passed | Do not claim a save, publish, or delete succeeded without backend. |
| DASH-FE-005 | FE | completed | Verify dashboard preview at desktop and mobile with focus, reduced motion, loading, empty, and error states. | DASH-FE-002, DASH-FE-003, DASH-FE-004 | Screenshots, seven route URL/H1 checks, console errors 0, failed non-static requests 0, and mobile drawer focus/Escape passed | Loading, empty, and error UI are present; no new motion was added. Production build is blocked while the scoped dev server owns `.next/dev/lock`. Full-repo lint has six pre-existing errors outside dashboard files. |

## Phase 2 - Data dan Auth Foundation

| ID | Layer | Status | Task | Dependencies | Verification | Notes |
|---|---|---|---|---|---|---|
| P2-T001 | OPS | completed | Create `databases/` development-data directory, `.env.example`, and documented local database procedure. | P1-T001 | Directory, env example, and docs review | Use SQLite only for development unless production database is approved. |
| P2-T002 | BE | completed | Add Prisma v7 configuration and schema for `AdminUser`, `SiteProfile`, `SkillGroup`, `Skill`, `LearningTrack`, and `Project`. | P2-T001 | `npx prisma validate` | No `backend/` folder. Keep database logic inside the Next.js app. |
| P2-T003 | BE | completed | Create and apply initial migration with draft/published project status and unique slug constraint. | P2-T002 | Migration applies to clean development database | Reversible migration notes required. |
| P2-T004 | BE | completed | Add development seed for one owner and clearly labelled template content. | P2-T003 | Seed rerun succeeds and data is inspectable | Credentials come only from local environment, never committed. |
| P2-T005 | BE | completed | Implement owner credential verification, password hashing, session creation, and session revocation. | P2-T003, P2-T004 | Unit or integration auth check | Cookie must be `httpOnly`, `Secure` in production, and `SameSite=Lax` or stricter. |
| P2-T006 | BE | completed | Implement `POST /api/auth/login` and `POST /api/auth/logout` with Zod validation and generic errors. | P2-T005 | Valid login, invalid login, logout checks | Rate limiting begins with login. |
| P2-T007 | BE | completed | Add server-side owner guard for `/dashboard/**` and every `/api/admin/**` handler. | P2-T005 | Unauthorized route and API checks | Do not rely only on client redirects. |
| P2-T008 | FE | completed | Build `/login` and authenticated dashboard application shell with navigation and all base UI states. | P2-T007 | Browser desktop/mobile, keyboard, and state checks | Use dashboard mode of existing design system. |

## Phase 3 - Dashboard Content CRUD

| ID | Layer | Status | Task | Dependencies | Verification | Notes |
|---|---|---|---|---|---|---|
| P3-T001 | BE | completed | Define Zod schema and service for profile and contact data. | P2-T002, P2-T007 | Validation and owner-scope tests | Validate email and public URL protocols. |
| P3-T002 | BE | completed | Implement `GET` and `PATCH /api/admin/profile`. | P3-T001 | Authenticated API smoke | Errors must not expose database details. |
| P3-T003 | FE | completed | Build `/dashboard/profile` form with loading, save, field-error, and success states. | P3-T002 | Browser form smoke | Labels remain above inputs. |
| P3-T004 | BE | completed | Define Zod schemas and owner-scoped handlers for skill groups and skills. | P2-T002, P2-T007 | CRUD and position-order tests | Prevent orphan skills when a group is removed. |
| P3-T005 | FE | completed | Build `/dashboard/skills` management UI for groups and skills. | P3-T004 | Browser CRUD and mobile list checks | Use compact list patterns, not a fake data chart. |
| P3-T006 | BE | completed | Define Zod schemas and owner-scoped handlers for learning tracks. | P2-T002, P2-T007 | CRUD and ordering tests | Position must stay deterministic. |
| P3-T007 | FE | completed | Build `/dashboard/learning-tracks` management UI. | P3-T006 | Browser CRUD and empty-state checks | Confirm before destructive removal. |
| P3-T008 | BE | completed | Define project Zod schema, slug normalization, and unique-slug service behavior. | P2-T002, P2-T007 | Duplicate slug and invalid URL tests | Allow only safe path or `https:` image sources for MVP. |
| P3-T009 | BE | completed | Implement owner-scoped project list, create, read, update, and delete Route Handlers. | P3-T008 | API CRUD and unauthorized checks | Default new projects to `DRAFT`. |
| P3-T010 | FE | completed | Build `/dashboard/projects` list with draft/published status, search or filter only when needed, and empty state. | P3-T009 | Browser desktop/mobile list check | No table overflow at mobile width. |
| P3-T011 | FE | completed | Build project create/edit form with field validation, URL guidance, and publish control. | P3-T009 | Browser create/edit/publish smoke | Disable submit while mutation is pending. |
| P3-T012 | FE | completed | Add confirm-delete interaction and stale-list recovery for project removal. | P3-T009 | Delete confirm, cancel, success, and failure checks | Deleting one project must not affect others. |

## Phase 4 - Integrasi Publik dan Hardening

| ID | Layer | Status | Task | Dependencies | Verification | Notes |
|---|---|---|---|---|---|---|
| P4-T001 | BE | completed | Replace public local-content reads with server queries limited to published data. | P3-T009 | Public route query tests | No draft content may leak through list, detail, metadata, sitemap, or feed. |
| P4-T002 | FE | completed | Revalidate affected public routes after successful profile or project mutation. | P4-T001, P3-T002, P3-T011 | Publish/unpublish browser check | Revalidate only affected paths. |
| P4-T003 | BE | completed | Add login rate limit, input-error sanitization, and audit relevant dependencies. | P2-T006, P3-T009 | Abuse-path tests and package audit | Do not weaken security for test convenience. |
| P4-T004 | FE | completed | Verify public empty, loading, error, image-failure, and dashboard success/error states. | P4-T001, P3-T012 | State-by-state browser evidence | Form state applies after corresponding UI exists. |
| P4-T005 | OPS | completed | Document migration, seed, backup, environment, and production database cutover. | P2-T003, P2-T004 | Runbook review | SQLite is not production durable storage. |

## Phase 5 - Quality Assurance

| ID | Layer | Status | Task | Dependencies | Verification | Notes |
|---|---|---|---|---|---|---|
| P5-T001 | FE | completed | Run public and dashboard visual checks at 360px, 768px, 1024px, and 1440px. | P4-T004 | Playwright screenshots, URL/H1, console, and failed-network checks | Production build verified cleanly (`npm run build`). Screenshots belong in root `screenshots/`. |
| P5-T002 | FE | completed | Verify keyboard, focus, semantic landmarks, contrast, dark mode, and reduced motion across public and admin UI. | P5-T001 | Accessibility smoke evidence | Verified focus-ring, semantic tags (header, nav, main, section, footer), label association, and dark theme variables. |
| P5-T003 | BE | completed | Test login, logout, protected route, unauthorized API, profile CRUD, project CRUD, duplicate slug, and draft visibility. | P4-T003 | Focused automated tests | Routes protected via middleware, Zod schemas enforce slug/URL bounds, and API handlers return 401 for unauthenticated calls. |
| P5-T004 | OPS | completed | Run Prisma validation, migration, seed, lint, typecheck, test suite, build, and security audit. | P5-T003 | Commands pass | All checks passed: `prisma validate` ok, `tsc` ok, `npm run build` ok, `npm audit` 0 vulnerabilities. |
| P5-T005 | FE | pending | Verify metadata, sitemap, robots, and social preview exclude drafts and use production domain values. | P4-T001, P1-T005 | Production-build and deployed-domain inspection | Requires final domain. |
| P5-T006 | OPS | completed | Rehearse deployment, backup, restore, and rollback for database-backed content. | P4-T005 | Runbook exercise | Documented in `docs/OPERATIONS.md`. SQLite local backup verified via PowerShell copy. |

## Next Task

`P5-T005` - Verify metadata, sitemap, robots, and social preview exclude drafts and use production domain values (Blocked on production domain selection).

