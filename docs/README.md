# Product Documentation — Web Portfolio

Canonical product documentation for the portfolio workspace.

## Index

- [Product requirements](../PRD.md) — canonical PRD.
- [Delivery tracker](PRD.tasks.md) — atomic implementation work derived from the PRD.
- [Visual design lock](../portfolio/STYLESEED.md) — dashboard and public-portfolio design direction.
- [Engineering documentation](../portfolio/docs/README.md) — versioned documentation for the Next.js app.

## Current handoff

- Phase 1B dashboard frontend preview is complete: login preview, dashboard shell, profile, skills, learning tracks, projects, and static project editor.
- The preview uses local template data only. It does not authenticate, save, publish, delete, or protect `/dashboard`.
- Resume at `P2-T001` in [the delivery tracker](PRD.tasks.md) before adding Prisma, environment variables, or a database.

## Ownership

- Product owner: Portfolio Owner.
- Last verified: 2026-08-12.
- Documentation rule: update `PRD.md` when product scope changes; update `PRD.tasks.md` when implementation status changes. Do not copy the PRD into `portfolio/`.
