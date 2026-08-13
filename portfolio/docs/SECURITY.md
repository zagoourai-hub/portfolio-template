# Security

## Current posture

- Application currently serves static local portfolio-template content only.
- No authentication, authorization, API route, form endpoint, database, or secret-backed integration exists.
- `/dashboard/**` is an intentionally direct-access preview. It contains only local template data and must not be described as a protected admin surface until server-side owner guards exist.
- `.env*` and `*.pem` are ignored by Git.
- `npm audit --omit=dev` reported zero production vulnerabilities on 2026-08-11.

## Data classification and trust boundaries

| Data | Current state | Required handling when introduced |
|---|---|---|
| Public portfolio content | Generated sample template data | Keep factual, copyright-cleared, free of secrets, and clearly labelled before public use. |
| Contact form data | Not implemented | Validate on server, minimize retention, never send message/email/phone to analytics. |
| Credentials/API keys | Not implemented | Server-only environment variables; never log or return to the browser. |
| Dashboard preview data | Local template data | Keep it non-sensitive; add owner authorization before database-backed content or controls are enabled. |

## Required controls for future features

- Contact form: Zod validation at Route Handler/Server Action boundary, rate limiting, honeypot before CAPTCHA, generic failure responses, and CSRF review.
- External links: use `rel="noopener noreferrer"` for new tabs.
- Uploads: do not implement unless required; then validate type/size, authorize access, and prevent path traversal.
- Analytics: track only approved event names and non-personal metadata from the PRD.
- Dashboard auth: use server-side owner guard for every `/dashboard/**` and `/api/admin/**` request, httpOnly secure session cookies, generic login errors, and rate limiting before enabling mutations.

## Audit command and known limits

```powershell
Set-Location 'D:\Project\Template\portfolio v1\portfolio'
npm audit --omit=dev
```

No production deployment or security-header policy has been configured. Reassess before launch rather than treating the static starter posture as a production approval.
