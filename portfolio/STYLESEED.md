# StyleSeed: Developer & Student Portfolio

## Design lock

- Product: Anti-AI-slop modern portfolio for high-school/college developers and GenZ programmers.
- Audience: Recruiters, peer developers, hackathon teammates, open-source contributors, and tech mentors.
- Aesthetic profile: Cyber-Industrial Developer Notebook (Dark Obsidian default with crisp light-mode support).
- Surface: Tech product UI / Developer portfolio.
- Typography: Geist Sans for clear reading & headings, Geist Mono for code snippets, CLI prompts, tech tags, and metadata.
- Palette: Dark Obsidian (`#090a0f`), Carbon Surface (`#12141c`), High-contrast text, Electric Emerald accent (`#00e599`) and Cyber Cyan (`#00f0ff`). Zero purple-on-dark SaaS clichés, zero generic pulsing pills, zero rainbow glows.
- Shape: Precision 8px to 14px radius scale, subtle 1px border lines, sharp tactile focus rings.
- Density: Compact & readable tech grid with interactive terminal widgets.
- Motion: Snappy motion entries (`motion`), tab switching transitions, command copy feedback.

## Product judgment

- Feels like a real developer workspace: terminal prompt, command line snippets, code inspect toggle, GitHub links.
- Interactive filtering: filter projects by tech stack (Next.js, React, TypeScript, etc.).
- Direct utility: copyable commands (`pnpm dev`, email, socials), zero fluff copy.
- Keyboard accessible: focus rings, Escape menu close, full semantic HTML5 landmarks (`header`, `nav`, `main`, `section`, `article`, `footer`).

## Dashboard extension (Horizon UI Redesign)

- Grammar: `Horizon UI × Clean SaaS Admin × Modern Card Grid × Content Workspace`.
- User job: owner monitors portfolio content readiness, manages skills, learning tracks, and projects.
- Dials: variance 6, motion 3, density 6. Desktop uses a persistent wide sidebar. Mobile uses a sliding drawer.
- Theme System: Supports Light & Dark modes based on html `.light` class toggle.
  - Light mode: Soft blue-gray background (`#f4f7fe`), pure white cards (`#ffffff`), dark navy headings (`#1b254b`), soft shadow.
  - Dark mode: Deep navy background (`#0b1437`), navy-blue cards (`#111c44`), white headings, flat borders.
- Primary Accent: Emerald/Electric Green (`#059669` in light mode, `#00e599` in dark mode) to synchronize with the landing page.
- Layout Components:
  - Sidebar: Bold flat vertical navigation, vertical active color bar on right edge, Sparkles info widget at bottom.
  - Floating Top Navbar: Translucent card with backdrop blur, breadcrumbs, search, notification bell, theme toggle, and user avatar initials.
  - Statistics Cards: Horizon-style circular icon on left (soft background) + label and number stats on right.
  - Card Radius: Large soft corners (`rounded-[20px]`).
- Verification checklist: desktop/mobile layout flow, light/dark mode toggling, typography hierarchy, input/select borders.

## Component rules

- Navbar: Terminal status header (`~/nara-portfolio`), active status indicator, quick links.
- Hero: Interactive CLI snippet with package manager toggle and instant copy.
- Project Cards: Tech stack badges, live demo link, GitHub link, code snippet tab option.
- Skills Section: Monospace tech matrix categorized by Frontend, Systems, and Developer Tools.
- Contact: Instant email copy with toast notification, social badges.

## Quality targets

- Build & Typecheck clean.
- Visually striking, high-contrast, responsive on mobile (360px) and desktop (1440px).
