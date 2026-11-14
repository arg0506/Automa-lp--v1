# Automa Landing Page — Project Context

## Purpose
Automa is building the financial infrastructure for the agentic economy on NEAR Protocol. This landing page introduces Automa to AI-agent and Web3 developers with a dark, violet-accented glassmorphism aesthetic inspired by institutional crypto web design.

## Architecture
- **Framework**: Next.js 16 (App Router), React 19
- **Styling**: Tailwind CSS with custom CSS variable design tokens
- **Animations**: Framer Motion with automatic `prefers-reduced-motion` fallbacks
- **Icons**: Lucide React
- **Architecture Principle**: React Server Components (RSC) by default for static sections, with client hydration isolated strictly to interactive components (`Nav`, `Reveal`, `AgentNetwork`).

## Key Files & Directories
- `src/content/site.ts`: Single source of truth for all copy, links, and navigation items.
- `src/components/layout/`: Global layout components (`Nav.tsx`, `Footer.tsx`).
- `src/components/sections/`: All 6 page sections:
  - `Hero.tsx`: Full-height gradient panel with headline, CTAs, pillars strip, and interactive agent network visual.
  - `Vision.tsx`: Split layout with problem statement and network expansion motif.
  - `HowItWorks.tsx`: 3 glass cards (Connect, Enable, Transact) with step numbering and flow connectors.
  - `UseCases.tsx`: 3 use-case cards (AI Services, Agent-to-Agent Commerce, Autonomous Applications).
  - `BuiltOnNear.tsx`: Container card explaining NEAR Protocol foundation.
  - `FinalCTA.tsx`: Conversion closer with violet dual-tone emphasis.
- `src/components/ui/`: Reusable primitives (`GlassCard.tsx`, `Button.tsx`, `Badge.tsx`, `IconChip.tsx`, `Container.tsx`, `Section.tsx`, `Reveal.tsx`).
- `src/components/visuals/`: Visual shaders and vectors (`AgentNetwork.tsx`, `GlowBackground.tsx`).
- `src/app/globals.css`: Dark violet tokens (`--bg`, `--violet-*`, `--surface`, glass highlights).
- `src/app/opengraph-image.tsx`: Dynamic 1200x630 OpenGraph card generation.
- `src/app/icon.svg`: Vector favicon.
- `src/app/robots.ts` & `src/app/sitemap.ts`: Search engine discovery.

## Local Setup & Development
```bash
cd automa-landing
npm run dev      # Start dev server on http://localhost:3000
npm run build    # Production build
npm run lint     # Lint check
npx tsc --noEmit # Typecheck
```
