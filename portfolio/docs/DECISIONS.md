# Architecture Decisions

Append new records; do not rewrite existing decisions.

## ADR-001 — Split product and engineering documentation

- Date: 2026-08-11
- Status: accepted
- Context: product PRD lives at workspace root while code is versioned in `portfolio/`.
- Decision: keep root `PRD.md` canonical; keep product tracker/design docs in root `docs/`; keep engineering docs in `portfolio/docs/` and link to the canonical sources.
- Consequence: root product docs are not automatically versioned with the application repository.

## ADR-002 — Preserve current repository layout

- Date: 2026-08-11
- Status: accepted
- Context: workspace standards describe `frontend/src`, while the existing Next.js repository uses `portfolio/app`.
- Decision: document the actual layout and do not relocate code during documentation setup.
- Consequence: any future move requires a dedicated migration decision and verification of scripts, imports, CI, and deployment paths.

## ADR-003 — MVP content storage

- Date: 2026-08-11
- Status: proposed
- Context: PRD recommends local TypeScript or MDX content; no CMS, database, or admin workflow exists.
- Decision: use local versioned content for the MVP unless product owner explicitly approves a different content workflow.
- Consequence: content updates require repository changes and deployment.

## ADR-004 — Frontend-first dashboard preview

- Date: 2026-08-12
- Status: accepted
- Context: the product owner requested the full dashboard visual system before choosing database, authentication, and persistence details.
- Decision: implement dashboard routes as clearly labelled static preview UI derived from local portfolio data. Do not add fake persistence, client-only authentication, API routes, Prisma, environment files, or database state in this phase.
- Consequence: `/dashboard` is not a protected admin area yet. Backend integration starts at `P2-T001`, then replaces preview data and disabled actions with owner-scoped server behavior.
