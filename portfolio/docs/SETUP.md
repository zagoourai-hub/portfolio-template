# Local Setup

## Verified baseline

| Item | Value |
|---|---|
| Node.js used for verification | `v24.14.1` |
| npm used for verification | `11.12.1` |
| Package lock format | npm lockfile v3 |
| Framework | Next.js `16.3.0` |

`package.json` has no `engines` constraint. Use the verified Node/npm pair until the project declares a supported range.

## Install and run

```powershell
Set-Location 'D:\Project\Template\portfolio v1\portfolio'
npm ci
npm run dev
```

Open the URL printed by Next.js, normally `http://localhost:3000/`. The scoped server used `http://localhost:3001/` during the dashboard frontend check on 2026-08-12.

## Verification

```powershell
npm run lint
npx next typegen
npx tsc --noEmit
npm run build
npm audit --omit=dev
```

On 2026-08-12, `npx next typegen`, `npx tsc --noEmit`, and dashboard-targeted ESLint passed. Full `npm run lint` has six pre-existing errors outside the dashboard files. `npm run build` must run after the scoped dev server stops because it owns `.next/dev/lock`. `npm audit --omit=dev` last reported zero production vulnerabilities on 2026-08-11.

## Environment and data

- No `.env*` file or environment variable is currently required by the application.
- `.env*` is ignored by Git. Add only variable names and non-secret setup instructions to docs.
- No database, seed, migration, or external service bootstrap exists.
- `P2-T001` is the first backend task and will create `../databases/`, `portfolio/.env.example`, and the documented local database procedure. Do not create a database or environment file before that task begins.
