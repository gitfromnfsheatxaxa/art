# Implementation Plan

[Overview]
Convert the existing HTML/JSX-based Codex Luminara prototype into a production-ready Next.js 15 application with Feature-Sliced Design (FSD) architecture.

This implementation transforms standalone HTML files with embedded React/Babel into a professional Next.js application. The current codebase consists of 4 HTML pages (Home, Gallery, Timeline, Artwork Detail) and 4 JSX component files (codex-components.jsx, timeline-components.jsx, artwork-data.jsx, tweaks-panel.jsx). The goal is to maintain 100% visual fidelity while establishing a scalable, maintainable architecture using Next.js 15 App Router, FSD layers, Tailwind CSS, Motion.dev, Zustand for state management, and Prisma for data persistence.

[Types]
Type system changes introduce TypeScript interfaces for all data models and component props throughout the application.

**Core Data Types:**
- `Artwork`: { slug: string, title: string, artist: string, year: string, era: string, eraId: string, period: string, img: string, medium?: string, dimensions?: string, location?: string, description?: string }
- `Era`: { id: string, label: string, period: string, defaultBg: string, entries: TimelineEntry[] }
- `TimelineEntry`: { year: string, title: string, artist: string, img: string }
- `GalleryFeature`: { slug: string, desc: string }

**UI Component Props:**
- `LoadingScreenProps`: { progress: number, visible: boolean }
- `KenBurnsBackgroundProps`: { src: string, active: boolean, index: number }
- `TimelineEntryProps`: { entry: TimelineEntry, index: number, side: 'left' | 'right', onHover: (img: string | null) => void, isActive: boolean }
- `GalleryCardProps`: { art: string, title: string, artist: string, year: string }
- `TweakDefaults`: { goldColor: string, bgDark: string, kenBurnsDuration: number, transitionSpeed: number, fontHeading: string, fontBody: string, overlayOpacity: number, bloomIntensity: number }

**Design System Constants:**
- CODEX: { gold: '#D4AF77', burgundy: '#5C2C2C', parchment: '#F5E8C7', dark: '#1C1814', ink: '#3C2F2F', glowGold: '#E8C77F', overlay: string }

[Files]
New and modified files organized by FSD layer:

**New Files to Create:**
1. `package.json` - Next.js 15 dependencies, scripts, and peer dependencies
2. `next.config.js` - Next.js configuration with image domains for Wikimedia
3. `tailwind.config.ts` - Custom theme with Renaissance colors, fonts, animations
4. `tsconfig.json` - TypeScript configuration with path aliases
5. `postcss.config.js` - PostCSS with Tailwind
6. `app/globals.css` - Global styles, CSS variables, keyframe animations
7. `app/layout.tsx` - Root layout with font imports and metadata
8. `app/page.tsx` - Home page (converted from Codex Luminara.html)
9. `app/gallery/page.tsx` - Gallery page (converted from Gallery.html)
10. `app/timeline/page.tsx` - Timeline page (converted from Timeline.html)
11. `app/artwork/[slug]/page.tsx` - Artwork detail page (converted from Artwork Detail.html)
12. `src/entities/artwork/types.ts` - Artwork entity TypeScript definitions
13. `src/entities/era/types.ts` - Era entity TypeScript definitions
14. `src/features/tweaks/store.ts` - Zustand store for design tweaks
15. `src/features/navigation/store.ts` - Zustand store for navigation state
16. `src/shared/ui/LoadingScreen.tsx` - Loading screen component
17. `src/shared/ui/KenBurnsBackground.tsx` - Ken Burns effect component
18. `src/shared/ui/OrnateFrame.tsx` - Ornate frame container
19. `src/shared/ui/GoldDivider.tsx` - Gold ornament divider
20. `src/shared/ui/DropCap.tsx` - Drop cap typography
21. `src/shared/ui/GalleryCard.tsx` - Gallery card component
22. `src/shared/ui/GoldButton.tsx` - Gold button component
23. `src/shared/ui/MetaRow.tsx` - Metadata row component
24. `src/shared/lib/utils.ts` - Utility functions (slugify, cn)
25. `src/shared/constants/design.ts` - Design tokens and constants
26. `src/shared/constants/artworks.ts` - Static artwork data
27. `src/shared/constants/timeline.ts` - Timeline era data
28. `src/widgets/HomeHero.tsx` - Home page hero section
29. `src/widgets/HomeArtworkSection.tsx` - Home page artwork sections
30. `src/widgets/HomeGallery.tsx` - Home page gallery section
31. `src/widgets/TimelineContainer.tsx` - Timeline page container
32. `src/widgets/TimelineSVG.tsx` - SVG timeline visualization
33. `src/widgets/GallerySection.tsx` - Gallery page sections
34. `src/widgets/ArtworkDetailPanel.tsx` - Artwork detail panel
35. `src/processes/MusicPlayer.tsx` - Music player (placeholder)
36. `src/processes/Preloader.tsx` - Asset preloader
37. `prisma/schema.prisma` - Prisma schema for Artwork, Era, Artist models
38. `prisma/seed.ts` - Seed script with all artwork data
39. `public/images/` - Directory for local images (placeholder)
40. `public/music/` - Directory for music files (placeholder)

**Existing Files to Keep as Reference:**
- `Codex Luminara.html` - Reference for home page
- `Gallery.html` - Reference for gallery page
- `Timeline.html` - Reference for timeline page
- `Artwork Detail.html` - Reference for detail page
- `codex-components.jsx` - Reference for shared components
- `timeline-components.jsx` - Reference for timeline components
- `artwork-data.jsx` - Reference for artwork data
- `tweaks-panel.jsx` - Reference for tweaks system
- `description.md` - Project specification
- `plan.md` - Original phased plan

**Files to Delete (after migration):**
- All `.html` files (after confirming Next.js pages work)
- All `.jsx` files (after converting to TypeScript)

[Functions]
New and modified functions organized by layer:

**New Functions:**
- `slugify(str: string): string` - Convert string to URL-safe slug (src/shared/lib/utils.ts)
- `cn(...classes: string[]): string` - Merge Tailwind classes (src/shared/lib/utils.ts)
- `getArtworkBySlug(slug: string): Artwork | undefined` - Find artwork by slug (src/entities/artwork)
- `getEraById(id: string): Era | undefined` - Find era by ID (src/entities/era)
- `useTweaks(defaults: TweakDefaults): [TweakDefaults, (key: string, value: any) => void]` - Custom hook for design tweaks
- `useNavigation(): { activeEra, setActiveEra, navigate }` - Custom hook for navigation state

**Modified Functions (from JSX to TypeScript):**
- `LoadingScreen({ progress, visible })` - Converted to TypeScript with proper types
- `KenBurnsBackground({ src, active, index })` - Converted with animation refs
- `TimelineSVG({ activeEra, totalEras })` - Converted to TypeScript with SVG props
- `TimelineEntry({ entry, index, side, onHover, isActive })` - Converted with link handling
- `GalleryCard({ art, title, artist, year })` - Converted to TypeScript
- `GallerySection({ art, index })` - Converted with IntersectionObserver
- `ArtworkSection({ section, index, active, tweaks })` - Converted with motion
- `HomeHero` widget - New composition component
- `TimelineContainer` widget - New composition with wheel/swipe handlers
- `ArtworkDetailPanel` widget - New composition with metadata display

**Removed Functions:**
- `ARTWORK_DETAILS` object - Migrated to constants file
- `TIMELINE_ERAS` array - Migrated to constants file
- `GALLERY_FEATURES` array - Migrated to constants file
- `DESKTOP_SECTIONS` array - Migrated to constants file
- `MOBILE_SECTIONS` array - Migrated to constants file

[Classes]
No class-based components in current codebase; all React functional components will be converted to TypeScript functional components.

**New Component Classes (Functional):**
- `LoadingScreen` - Full-screen loading overlay with progress
- `KenBurnsBackground` - Animated background with scale/pan effects
- `OrnateFrame` - Decorative frame container
- `GoldDivider` - SVG ornamental divider
- `DropCap` - Initial letter decoration
- `GalleryCard` - Horizontal scrollable artwork card
- `GoldButton` - Styled CTA button
- `MetaRow` - Two-column metadata display
- `TimelineSVG` - Vertical SVG timeline with animated progress
- `TimelineEntry` - Interactive timeline item with hover effects
- `TweaksPanel` - Floating design controls panel
- `TweakSection` - Grouped tweak controls
- `TweakSlider` - Range slider control
- `TweakToggle` - Boolean toggle control
- `TweakColor` - Color picker control
- `TweakSelect` - Dropdown select control

**Zustand Stores:**
- `useTweaksStore` - Design system customization state
- `useNavigationStore` - Page/era navigation state
- `useMusicStore` - Audio playback state (placeholder)

[Dependencies]
New packages required for Next.js 15 + FSD implementation:

**Production Dependencies:**
- `next@15.0.0` - Next.js framework
- `react@18.3.1` - React library
- `react-dom@18.3.1` - React DOM
- `framer-motion@11.0.0` - Motion animations (Motion.dev)
- `zustand@4.5.0` - State management
- `@prisma/client@5.0.0` - Database ORM client
- `tailwindcss@3.4.0` - Utility-first CSS
- `tailwindcss-animate@1.0.7` - Tailwind animation plugins
- `lucide-react@0.300.0` - Icon library (optional, for future icons)
- `clsx@2.0.0` - Class name utility
- `tailwind-merge@2.0.0` - Tailwind class merging

**Development Dependencies:**
- `typescript@5.3.0` - TypeScript compiler
- `@types/node@20.10.0` - Node.js types
- `@types/react@18.2.0` - React types
- `@types/react-dom@18.2.0` - React DOM types
- `prisma@5.0.0` - Prisma ORM CLI
- `eslint@8.55.0` - Linting
- `eslint-config-next@15.0.0` - Next.js ESLint config
- `postcss@8.4.32` - PostCSS processor
- `autoprefixer@10.4.16` - CSS vendor prefixes

**Integration Requirements:**
- Initialize shadcn/ui with New York style and Slate base color
- Configure Tailwind with custom theme extending shadcn/ui
- Set up Prisma with SQLite provider for local development
- Configure Next.js image optimization for Wikimedia domains

[Testing]
Manual testing approach for visual fidelity; automated testing setup for future iterations.

**Test File Requirements:**
- No automated tests required for initial implementation (per plan.md focus on aesthetics)
- Manual visual testing checklist:
  - Home page: 6 sections render correctly, Ken Burns backgrounds animate, scroll navigation works
  - Gallery page: 10 artwork sections, navigation dots, hover effects
  - Timeline page: 7 eras, SVG timeline renders, wheel/keyboard/swipe navigation
  - Artwork Detail page: Dynamic slug routing, metadata display, navigation buttons
  - Loading screen: Progress bar, fade-out on complete
  - Responsive: Mobile vs desktop layouts, touch gestures
  - Typography: Cinzel and EB Garamond fonts load correctly
  - Colors: Gold, burgundy, parchment, dark marble match design tokens

**Validation Strategies:**
- Visual comparison against original HTML files
- Browser DevTools for console errors
- Lighthouse for performance metrics
- Mobile device testing for touch interactions

[Implementation Order]
Sequential implementation steps to minimize conflicts and ensure successful integration:

1. **Phase 1: Project Setup** - Create Next.js project, install dependencies, initialize shadcn/ui, configure Tailwind
2. **Phase 2: FSD Architecture** - Create folder structure (entities/, features/, shared/, widgets/, processes/, app/)
3. **Phase 3: Design System** - Set up globals.css, Tailwind config, design constants, utility functions
4. **Phase 4: Data Layer** - Migrate artwork-data, timeline-data, gallery-data to TypeScript constants
5. **Phase 5: Shared Components** - Convert codex-components to TypeScript UI components
6. **Phase 6: Widgets** - Create page-level widgets (HomeHero, TimelineContainer, GallerySection, ArtworkDetailPanel)
7. **Phase 7: Pages** - Implement app/page.tsx, app/gallery/page.tsx, app/timeline/page.tsx, app/artwork/[slug]/page.tsx
8. **Phase 8: State Management** - Set up Zustand stores for tweaks and navigation
9. **Phase 9: Prisma Setup** - Create schema.prisma, seed script with artwork data
10. **Phase 10: Polish** - Add Motion.dev animations, responsive tweaks, loading states, navigation
11. **Phase 11: Testing** - Manual visual testing, fix discrepancies, optimize performance
12. **Phase 12: Cleanup** - Remove original HTML/JSX files, verify build, prepare for deployment