# Project Backlog & Roadmap

## Completed
- [x] Project scaffold with Next.js 16, TypeScript, Tailwind CSS, Turbopack.
- [x] Setup of design tokens in `globals.css` and `tailwind.config.ts`.
- [x] Authoring of UI primitives (`GlassCard`, `Button`, `Badge`, `IconChip`, `Container`, `Section`, `Reveal`).
- [x] Implementation of visual systems (`AgentNetwork` SVG with animated pulses and `GlowBackground`).
- [x] Implementation of all 8 core sections (`Nav`, `Hero`, `Vision`, `HowItWorks`, `UseCases`, `BuiltOnNear`, `FinalCTA`, `Footer`).
- [x] Configuration of dynamic metadata (`opengraph-image`, `icon.svg`, `robots.txt`, `sitemap.xml`).
- [x] Responsive layout testing across mobile, tablet, and desktop viewports.
- [x] TypeScript verification (`tsc --noEmit`) and ESLint validation (`next lint`).
- [x] Production build verification (`npm run build`).

## Pre-Launch / Pending User Input
- [ ] Set live URLs in `src/content/site.ts`:
  - `links.docs`
  - `links.primaryCta` (App / Waitlist)
  - `links.github`
  - `links.x`
  - `links.discord`
- [ ] Connect custom production domain in `layout.tsx`, `robots.ts`, and `sitemap.ts`.
- [ ] Import official NEAR Protocol vector logo SVG if available.
- [ ] Deploy to Vercel production.
