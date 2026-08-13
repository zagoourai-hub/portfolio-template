# Testing

## Current coverage

No unit, integration, or end-to-end test files or test script exist. Current checked quality gates are:

```powershell
Set-Location 'D:\Project\Template\portfolio v1\portfolio'
npm run lint
npx next typegen
npx tsc --noEmit
npm run build
```

On 2026-08-12, `npx next typegen`, `npx tsc --noEmit`, and dashboard-targeted ESLint passed. Full lint has six existing errors in non-dashboard UI files. Production build is pending because an active scoped dev server owns `.next/dev/lock`; do not stop unrelated Node.js processes to clear it.

## Dashboard preview checks

- Playwright verified `/login`, `/dashboard`, profile, skills, learning tracks, projects, project create, and project edit routes.
- At 390px every checked route had the expected H1 and no horizontal overflow. Overview and project list were also inspected at 1440px.
- Console errors: 0. Failed non-static requests: 0. The mobile drawer moved focus to its close button, closed with Escape, and returned focus to its trigger.
- Screenshot evidence is stored in root `screenshots/`. Backend data, auth, mutation, and authorization tests remain pending from Phase 2 onward.

## Required test strategy before MVP launch

| Layer | Scope | Evidence |
|---|---|---|
| Static quality | TypeScript, lint, production build | Commands above pass. |
| Browser | Navigation, project routes, WhatsApp/email CTAs, 404, contact form if implemented | Playwright URL/H1, console, network, and screenshots. |
| Responsive | 360 px, 768 px, 1024 px, 1440 px | Screenshots stored only under project-root `screenshots/`. |
| Accessibility | Keyboard path, focus, landmarks, headings, contrast, reduced motion | Manual/browser evidence. |
| Server security | Contact validation/rate limit only if form exists | Automated abuse-path check. |

Do not add fixtures, test data, or a test framework until the related feature exists. Update this document with exact commands when introduced.
