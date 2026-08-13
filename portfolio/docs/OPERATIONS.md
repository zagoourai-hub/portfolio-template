# Operations

## Service

| Service | Directory | Start command | Health signal |
|---|---|---|---|
| Next.js portfolio | `portfolio/` | `npm run dev` | URL printed by Next.js responds after startup. |

Next.js chooses another port if 3000 is already occupied; use the URL printed by `npm run dev`. The scoped development server was verified at `http://localhost:3001/` on 2026-08-12.

## Local lifecycle

```powershell
Set-Location 'D:\Project\Template\portfolio v1\portfolio'
npm run dev
```

Stop with `Ctrl+C` in the terminal that owns the process. Do not terminate unrelated Node.js processes.

## Smoke checks

```powershell
Invoke-WebRequest http://localhost:3000/ -UseBasicParsing
npx next typegen
npm run lint
npx tsc --noEmit
npm run build
```

Use the actual dev-server port for `Invoke-WebRequest`. `next build` cannot share the `.next` directory with an active `next dev` process; stop only the scoped portfolio server before running a production build.

## Logs, monitoring, backup, and incident handling

- Local logs: terminal output from `next dev` or `next start`.
- Metrics, alerts, backups, production hosting, and rollback: Unknown; no production service exists.
- First incident action: capture route, timestamp, browser console error, failed network request, and server output before changing code.
