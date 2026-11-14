# LEARNINGS & PRAR Log

## PRAR Cycle 1 — Automa Landing Page Build
- **Date**: 2026-10-21
- **Task**: Scaffold and build the complete Automa landing page from specifications using Next.js, Tailwind CSS, TypeScript, and Framer Motion.
- **Outcome**: Successfully established architecture, primitives, tokens, dynamic OG, and core page structure.

## PRAR Cycle 2 — 1:1 Pixel-Fidelity Match with CryptEx Reference
- **Date**: 2026-10-21
- **Task**: Restructure and style all page sections to match the exact visual layout of the Behance reference design (`d9d540f23358da0138b2ad199ab64df8.webp`).
- **Outcome**: Implemented floating island hero, Core Products cards, Agent Simulator widget, Vision 2x2 grid with orbiting tokens, Capabilities 2x3 grid, Architecture cards with carousel arrows, dual-tone Final CTA, and footer newsletter integration.

## PRAR Cycle 3 — Tailwind CSS v4 Loading Resolution
- **Date**: 2026-10-21
- **Task**: Fix issue where CSS utility classes were not loading in the browser.

### Perceive
- Found that Next.js 16 was running `tailwindcss: "^4"`.
- `globals.css` contained legacy Tailwind v3 directives (`@tailwind base; @tailwind components; @tailwind utilities;`), causing Turbopack to bypass utility class synthesis.

### Reason
- Tailwind v4 uses `@import "tailwindcss";` and `@theme` definitions, requiring `@tailwindcss/postcss` and `postcss.config.mjs` for pipeline integration with Next.js Turbopack.

### Act
- Installed `@tailwindcss/postcss`.
- Created `postcss.config.mjs`.
- Migrated `globals.css` to `@import "tailwindcss";` and declared all design tokens inside `@theme`.
- Simplified `next.config.ts`.
- Cleared `.next` cache and restarted the dev server.
- Verified that generated CSS size expanded from 28KB to 70KB, containing all utility classes (`violet-*`, `rounded-*`, `backdrop-blur-*`, etc.).
- Verified `npm run build` completed with code 0.

### Refine
- Confirmed that hot-reloading and CSS generation work seamlessly during local development and in production static export.


## PRAR Cycle 4 — Automa Spec Content Sections & Logo Integration
- **Date**: 2026-10-21
- **Task**: Expand landing page with official content sections from `automa_landing_page_spec.md`, preserve the light architectural design from `download (34).jpg`, remove pricing, and integrate `Automalogo.png`.

### Perceive
- User requested adding all official content sections from `automa_landing_page_spec.md` without modifying the light architectural Swiss AI aesthetic.
- The pricing section needed complete removal.
- The official Automa logo (`Automalogo.png`) needed integration wherever a brand mark was required.

### Reason
- Designed a step-by-step mapping from the spec into architectural components:
  1. `Nav`: Automa logo + uppercase tracking wordmark + anchor links + `Explore Automa` CTA.
  2. `Hero`: Eyebrow `THE AGENTIC ECONOMY`, headline `Give AI Agents the Power to Transact.`, subtitle, dual CTAs, and `Built on NEAR Protocol` indicator, preserving the generative mesh sphere.
  3. `Vision`: `#vision` anchor, `Intelligence Needs an Economy.`, 3 architectural pillar cards.
  4. `How It Works`: `#how-it-works` anchor, `From Agents to Action.`, 3-step bento diagram with `AUTOMA CORE` device featuring the logo, and early-stage roadmap honesty note.
  5. `Use Cases`: `#use-cases` anchor, `Built for an Agent-Powered World.`, 3 capability cards.
  6. `Built on NEAR`: `#built-on-near` anchor, 3 technical capability pillars (Sub-Second Finality, Account Abstraction, Predictable Micro-Fees).
  7. `Final CTA`: `#final-cta` anchor, closing vision copy with Automa logo mark and primary/secondary CTAs.
  8. `Footer`: Automa logo mark, official tagline, live links, and legal copy.

### Act
- Centralized all copy in `src/content/site.ts`.
- Copied `Automalogo.png` to `public/Automalogo.png` and `src/app/icon.png`.
- Updated `Nav.tsx`, `Hero.tsx`, `HowItWorks.tsx`, and `Footer.tsx`.
- Created `Vision.tsx`, `UseCases.tsx`, `BuiltOnNear.tsx`, and `FinalCTA.tsx`.
- Deleted `Pricing.tsx` and removed unused legacy components.
- Composed the full page in `src/app/page.tsx`.

### Refine
- Verified TypeScript types with `npx tsc --noEmit` (0 errors).
- Verified production build with `npm run build` (all 9 routes prerendered cleanly).
- Verified live dev server on `http://localhost:3001` (HTTP 200 OK, all sections rendered).


## PRAR Cycle 5 — Hero Artwork (hsi.png) Integration & Seamless Blending
- **Date**: 2026-10-21
- **Task**: Integrate `hsi.png` into the Hero section with seamless blending into the light architectural theme.

### Perceive
- The user provided `hsi.png` (high-resolution monochrome artwork depicting two reaching hands converging on the floating chrome Automa coin).
- Requested integrating it into the hero section and ensuring it blends into the entire website.
- Pixel analysis revealed edge pixel RGB values of `252-255` on the artwork.

### Reason
- Placing the artwork directly on pure `#FFFFFF` without blending could leave a faint rectangular outline.
- By applying `mix-blend-multiply` and a soft radial feather mask (`[mask-image:radial-gradient(ellipse_at_center,black_78%,transparent_100%)]`), any boundary artifacts are eliminated.
- Framing the image with the architectural crosshair grid, reference circles, and subtle technical telemetry labels (`AUTOMA CORE // PROTOCOL`, `NEAR CONSENSUS`) anchors the visual into the Swiss AI theme.

### Act
- Copied `hsi.png` to `public/hsi.png`.
- Updated `Hero.tsx` with `<Image>`, `mix-blend-multiply`, radial feather mask, crosshair grid, and technical telemetry labels.
- Verified TypeScript compilation (`npx tsc --noEmit` exited with code 0).
- Verified HTTP 200 and image inclusion on the local dev server.

### Refine
- Verified smooth hover interaction and responsive display on mobile and desktop.


## PRAR Cycle 6 — Permanent Dark Theme & Scroll-Based Animations
- **Date**: 2026-10-21
- **Task**: Implement a permanent dark theme across the website and add full scroll-based animations.

### Perceive
- The user requested converting the website to a dark theme and adding scroll-based animations across the entire site.
- The user confirmed selecting a permanent dark theme over a toggle.
- The artwork needed to transition smoothly to a dark canvas without losing detail or the official Automa logo mark on the coin.

### Reason
- Designed a custom dark palette based on the official spec: near-black canvas `#07070A`, elevated `#0E0E13` surfaces, hairline `rgba(255,255,255,0.08)` borders, and crisp silver corner tick marks.
- Created `hsi-dark-branded.png` with illuminated sculptural silver hands on `#07070A` background and preserved the official white Automa mark on the black coin face.
- Created a top hairline scroll progress bar using `framer-motion` (`useScroll`, `useSpring`).
- Implemented scroll-spy on the sticky nav to dynamically highlight active anchors.
- Added staggered scroll-reveal animations across all sections and cards using `Reveal.tsx`.
- Added glowing pulse light packets traversing the connection lines in How It Works.

### Act
- Updated `globals.css` with dark variables, tick borders, and wire pulse keyframes.
- Updated `layout.tsx` with dark background and metadata colorScheme.
- Created `ScrollProgress.tsx` and enhanced `Reveal.tsx`.
- Updated `Nav.tsx`, `Hero.tsx`, `Vision.tsx`, `HowItWorks.tsx`, `UseCases.tsx`, `BuiltOnNear.tsx`, `FinalCTA.tsx`, and `Footer.tsx`.
- Mounted `ScrollProgress` in `page.tsx`.
- Verified with `npx tsc --noEmit` (0 errors) and confirmed HTTP 200 on `http://localhost:3001`.

### Refine
- Verified high-contrast readability, smooth 60fps scroll transitions, and graceful fallbacks for `prefers-reduced-motion`.


## PRAR Cycle 7 — Currency Engraving Integration into Final CTA
- **Date**: 2026-10-22
- **Task**: Integrate `5 Payment Options For Any Furniture Purchase in 2026.jpg` into the "Build for the Agentic Economy." section with seamless blending.

### Perceive
- The user provided a macro intaglio engraving of Benjamin Franklin's eye from the 100-dollar bill.
- The user requested adding it into the "Build for the Agentic Economy." section and blending it completely with the section.
- The section is a dark card (`#0E0E13`), whereas the source image had textured cream/green fiat paper with black hatch lines.

### Reason
- Placing the raw image would produce a harsh rectangular boundary that clashes with the dark theme.
- Extracted and pre-processed the intaglio lines into `currency-engraving-dark.png` with luminous silver hatch lines on `#000000`.
- Integrated as an atmospheric watermark behind the headline, crosshairs, and logo using `mix-blend-screen`, a radial feather mask, and `opacity-20` (hover `opacity-30`).
- This symbolically reflects the transformation from traditional fiat currency to the autonomous agentic economy while maintaining maximum typography contrast and zero border artifacts.

### Act
- Created `currency-engraving-dark.png` in `public/`.
- Updated `FinalCTA.tsx` with the watermark layer, radial feather mask, and hover transition.
- Verified with `npx tsc --noEmit` (0 errors) and confirmed HTTP 200 on `http://localhost:3001` with `HasCurrencyEngraving: True`.

### Refine
- Verified that all text and CTAs in the foreground remain sharp and readable, while the engraving provides rich narrative depth in the background.


## PRAR Cycle 8 — Moving Animated Logo Carousel Below Hero
- **Date**: 2026-10-22
- **Task**: Create an animated moving logo carousel section below the hero section featuring NEAR, OpenAI, and Anthropic.

### Perceive
- The user provided `nearlogo.png`, `openailogo.png`, and `anthropiclogo.png`.
- The user requested creating a moving animated carousel below the hero section featuring these logos.
- The user selected a minimalist layout with pure moving logos and no text heading.
- The raw images had solid white and green backgrounds that needed transparent dark-mode extraction to integrate into the dark theme.

### Reason
- Processed the images to extract transparent PNGs with crisp white and emerald marks (`openai-dark.png`, `anthropic-dark.png`, `near-dark.png`).
- Designed a dedicated `LogoCarousel.tsx` component with:
  - Bilateral gradient fade masks to blend entry and exit.
  - Infinite gapless marquee animation using CSS transforms (`animate-marquee`).
  - Quadruple repetition to prevent any stutter or gap across all screen sizes.
  - Interactive pause on hover.
- Positioned the section directly between `<Hero />` and `<Vision />` in `page.tsx`.

### Act
- Added `@keyframes marquee` and `.animate-marquee` to `globals.css`.
- Created `LogoCarousel.tsx`.
- Updated `page.tsx` with `<LogoCarousel />`.
- Verified with `npx tsc --noEmit` (0 errors) and confirmed HTTP 200 on `http://localhost:3001` with `HasNear: True`, `HasOpenAI: True`, and `HasAnthropic: True`.

### Refine
- Confirmed smooth 60fps GPU-accelerated motion, seamless looping, and responsive layout.
