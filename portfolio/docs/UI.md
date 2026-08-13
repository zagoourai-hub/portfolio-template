# UI Implementation

## Current state

- The application is a static Next.js portfolio template for Indonesian secondary-school students learning programming.
- `data/portfolio.ts` holds generated, replaceable sample identity, skills, project stories, and a safe `example.com` email placeholder.
- `/`, `/projects`, `/projects/[slug]`, `/contact`, and `not-found` are implemented with semantic landmarks, responsive layouts, and local optimized images.
- Header navigation uses a native mobile-menu button with Escape close and visible focus styles.
- `/login` is a visual-only owner-login preview and `/dashboard/**` is a visual-only dashboard preview built from local template data.
- Dashboard uses a persistent desktop sidebar and an inert mobile drawer. The drawer focuses its close control, closes with Escape, and returns focus to its trigger.

## Route map

| Route | Status | Purpose |
|---|---|---|
| `/` | implemented | Intro, learning tracks, learning process, featured sample projects, and contact prompt. |
| `/projects` | implemented | Full sample project collection and intentional empty state. |
| `/projects/[slug]` | implemented | Static project story with challenge, process, learning outcome, and skill tags. |
| `/contact` | implemented | Safe email placeholder and clear replacement instruction. |
| `not-found` | implemented | Intentional invalid-route recovery. |
| `/login` | preview only | Owner-login visual direction; credentials are not submitted. |
| `/dashboard` | preview only | Content readiness overview and next editing task. |
| `/dashboard/profile` | preview only | Static profile and contact form. |
| `/dashboard/skills` | preview only | Static skill inventory. |
| `/dashboard/learning-tracks` | preview only | Static learning-track sequence. |
| `/dashboard/projects` | preview only | Project list with draft/published preview states. |
| `/dashboard/projects/new` | preview only | Static project-create form. |
| `/dashboard/projects/[id]` | preview only | Static project-edit form. |

## Implementation boundaries

- Keep page composition in `app/`, shared visual primitives in `components/`, and local template data in `data/portfolio.ts`.
- Use Server Components by default. `SiteHeader` and `ProjectArt` are client components only for real interaction and image-failure handling.
- Use `next/link` for internal navigation and `next/image` for content images.
- Preserve one semantic `main` per route, ordered headings, native interactive elements, visible focus, and meaningful alt text.
- Keep generated sample content clearly labelled. Replace it with factual student work before publishing outside a template context.
- Do not wire preview buttons to local persistence or client-only fake authentication. Backend mutation, validation, feedback, and owner guards start after `P2-T001`.

## Design and quality source

`STYLESEED.md` is the visual source of truth. It locks the dark Cyber-Industrial Developer Notebook system, Electric Emerald actions, Cyber Cyan metadata, and the student-template content rule. Dashboard uses the `operations-console × product-ui × developer tools × dashboard × technical` grammar. Verify desktop and mobile output, console errors, failed requests, dark mode, and reduced motion after visual changes.

## Dashboard preview verification

- 2026-08-12: desktop 1440px and mobile 390px screenshots captured for overview, project list, project form, and login.
- Seven dashboard/login routes passed URL/H1 checks with no horizontal overflow at 390px, zero console errors, and zero failed non-static requests.
- Forms deliberately show disabled backend-dependent actions. Loading, empty, and error UI exists for the later authenticated data flow.
