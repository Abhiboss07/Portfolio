# Abhishek Yadav — Portfolio

An Awwwards-tier personal portfolio for **Abhishek Yadav**, backend engineer.
Dark, technical aesthetic with a "distributed systems, rendered" concept — a live
WebGL node/edge network hero, scroll-driven storytelling, and bespoke per-project
motion motifs.

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS v4** — utility styling & design tokens
- **Framer Motion** — component animation, reveals, page-level motion config
- **GSAP + ScrollTrigger** — scroll-scrubbed timelines, pinning, line reveals
- **Lenis** — smooth scroll (bridged into GSAP's ticker)
- **React Three Fiber + three** — the WebGL network hero (lazy-loaded, desktop only)
- **lucide-react** — icons
- Self-hosted **Space Grotesk** (display) + **JetBrains Mono** (mono) via `@fontsource`

## Run it

```bash
npm install
npm run dev      # http://localhost:5173
```

Other scripts:

```bash
npm run build    # type-check + production build to dist/
npm run preview  # serve the production build
```

## Design system

| Token | Hex | Use |
|-------|-----|-----|
| bg | `#08090C` | page background |
| surface | `#111318` | cards |
| text | `#E8EAED` | headings / body |
| muted | `#7C8291` | secondary text |
| border | `#20242E` | hairlines |
| **accent** | `#2DD4FF` | single accent, used consistently |

## Sections

Preloader (terminal boot, skippable) → Hero (WebGL network + kinetic type, custom
magnetic cursor) → Tech marquee → About (line reveals + photo parallax/tilt) →
Experience (scroll timeline + animated stat counters) → Projects (5 pinned cards,
each with a bespoke motif) → Skills (grouped grid) → Certifications (horizontal
scroll cards) → Contact/Footer (magnetic socials, live IST clock).

## Accessibility & performance

- Full `prefers-reduced-motion` support: Framer via `<MotionConfig reducedMotion="user">`,
  GSAP/Lenis/3D/counters gated on the media query, plus a global CSS safety net. The 3D
  hero is never mounted for reduced-motion or coarse-pointer (mobile) users — they get a
  lightweight animated SVG network instead.
- The Three.js bundle is code-split into its own lazy chunk and only loads on capable
  desktops, keeping the mobile payload light.
- Images are optimized (WebP + fallback) and lazy-loaded.

## Assets

- `public/images/my_photo.*` — profile photo (WebP + PNG)
- `public/Abhishek_Yadav_Resume.pdf` — downloadable résumé
- `public/favicon.svg`, `public/og-image.png` — favicon + social share card

## Remaining TODOs (optional polish)

- [ ] **Distributed Key-Value Store** and **Voice AI Platform** point to the GitHub
      profile (`Abhiboss07`) — swap in the exact repo URLs once public.
- [ ] Optionally replace the per-project motifs with real screenshots/GIFs of each
      project if you want literal previews instead of the abstract visualizations.
- [ ] Set the production domain in `index.html` `og:url` (currently a placeholder).
