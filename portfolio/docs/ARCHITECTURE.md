# Architecture

## System context

Current system is one Next.js 16 App Router application. It renders public portfolio routes and static dashboard-preview routes from local TypeScript data; no API routes, server services, database, authentication, persistence, analytics, or deployment configuration exists yet.

## Repository map

| Area | Current responsibility |
|---|---|
| `app/layout.tsx` | Root document, Geist fonts, global metadata. |
| `app/page.tsx` | Static home route with student-template introduction, skills, process, and featured projects. |
| `app/projects/` | Static project archive and generated detail routes. |
| `app/contact/` | Safe contact-placeholder route. |
| `app/login/` | Visual-only owner login preview. |
| `app/dashboard/` | Static owner-workspace preview: overview, profile, skills, learning tracks, projects, and project editor. |
| `data/portfolio.ts` | Typed, replaceable local sample identity, learning tracks, and projects. |
| `data/dashboard-preview.ts` | Preview-only status, activity, and project metadata derived from local portfolio data. |
| `components/dashboard/` | Dashboard shell, reusable states, and static project form. |
| `components/` | Shared navigation, footer, project rendering, dashboard primitives, and visual components. |
| `public/images/` | Local editorial image assets rendered through `next/image`. |

## Runtime and data flow

`Request /` → `app/layout.tsx` → public route component → `data/portfolio.ts` → static HTML/CSS/local assets.

`Request /dashboard/**` → `app/dashboard/layout.tsx` → `DashboardShell` → dashboard route component → `data/dashboard-preview.ts` and `data/portfolio.ts` → static HTML/CSS/local assets.

No runtime data source exists. Dashboard controls are visual only; they do not mutate data or establish an authenticated session.

## Trust boundaries

There is no request input or authenticated boundary today. `/dashboard` is deliberately direct-access preview UI and must not be presented as a protected admin surface. Future login and all admin handlers are trust boundaries; validate them server-side, rate limit login, and keep public inputs separate from analytics payloads.

## Constraints and open decisions

- The workspace profile expects a `frontend/src` layout, but the actual Git repository is `portfolio/` and uses Next.js root-level `app/`. This is documented, not changed; relocation needs explicit approval.
- The unused `Globe` component remains optional visual code until a reviewed UI section needs it.
- Hosting, domain, analytics provider, email provider, and database are unknown.
- Phase 2 starts with `P2-T001`: local database procedure, `databases/`, and `.env.example`; Prisma, auth, and Route Handlers remain absent until that task begins.
