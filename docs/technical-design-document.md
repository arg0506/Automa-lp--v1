# Technical Design Document (TDD) — Automa Landing Page

## 1. Technical Stack & Dependencies
- **Next.js**: `16.4.2` (Turbopack bundler)
- **React**: `19.3.0`
- **Tailwind CSS**: `4.x` with `@tailwindcss/turbopack`
- **Animation**: `framer-motion`
- **Icons**: `lucide-react`
- **Utilities**: `clsx`

## 2. Dynamic Route Generation
- `src/app/opengraph-image.tsx`: Dynamic image generation using Next.js `ImageResponse` with SVG vectors and CSS gradients.
- `src/app/icon.svg`: High-resolution vector favicon matching the central Automa network core.
- `src/app/robots.ts`: Standard crawler indexing instructions.
- `src/app/sitemap.ts`: Dynamic sitemap generator returning domain priority routes.

## 3. Link Safety & Content Injection
The centralized configuration in `src/content/site.ts` exports helper:
```typescript
export function href(key: keyof typeof site.links): string | undefined {
  return site.links[key];
}
```
Components conditionally render links and action targets, preventing dead anchor links (`#` or broken paths) until external URLs are configured.
