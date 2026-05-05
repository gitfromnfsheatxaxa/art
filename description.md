Codex Luminara
Tagline: Art Through the Ages – A Living Renaissance Manuscript
A purely aesthetic, cinematic digital illuminated manuscript that showcases art history in an elegant, luxurious Renaissance style. Every detail feels like turning the pages of a priceless 15th–16th century codex brought to life with modern motion, music, and interactivity.
Pages & Structure
1. Home Page (/)

Long vertical scroll page
Every section is exactly 100vh tall
6 cinematic full-screen sections with device-specific backgrounds:
Desktop/Tablet → landscape artworks
Mobile → portrait artworks

Smooth Ken Burns effect + parallax + cross-fade transitions on every background
First section = Hero / About the Project (poetic introduction + CTA to Timeline)
Final section = “Top 10 Famous Renaissance Artworks” (horizontal scrollable framed gallery)
Floating subtle gold-ribbon navigation

2. Timeline Page (/timeline)

Single full-screen view (exactly 100vh, no scrollbar)
7 eras as individual immersive slides
Centered animated SVG vertical timeline line (gilded gold, ornate, flows and curves during transitions)
Text entries (year + artist + artwork) placed elegantly along the line
Hover/tap any entry → instantly changes full-screen background to that specific artwork with crossfade + Ken Burns zoom + golden light bloom
Navigation:
Desktop → mouse wheel, drag gesture, keyboard arrows (no visible buttons)
Mobile → vertical swipe + drag

Each era has its own unique ambient background music that fades smoothly when changing slides

3. Gallery Page (/gallery)

Long vertical scroll (same style as Home page)
Each section is exactly 100vh
One major artwork per section with full-bleed background
Elegant centered overlay (title, artist, short description)
Large “Explore This Masterpiece” button that navigates to the detail page
Floating gold-ribbon navigation to jump between featured artworks

4. Artwork Detail Page (/artwork/[slug])

Full-screen immersive view (100vh)
Selected artwork as main full-bleed background with Ken Burns zoom
Elegant overlay panel (right on desktop, bottom on mobile) containing:
Title, artist, year, medium, dimensions, location
Poetic historical context / description
Era badge with link back to Timeline
“View in Timeline” and “Back to Gallery” ornate buttons

Same background music as the era the artwork belongs to

Design System (100% Renaissance Style)

Colors: #D4AF77 (gold leaf), #5C2C2C (burgundy), #F5E8C7 (parchment), #1C1814 (dark marble)
Fonts: Cinzel / Playfair Display (headings), EB Garamond (body)
All UI elements use ornate picture-frame borders, embossed gold effects, parchment textures, and subtle brush-stroke details
Shimmering gold glows, soft shadows, and illuminated-manuscript aesthetic everywhere

Audio & Loading Experience

Every 100vh section and every Timeline era has its own unique ambient music track
Music is the last asset loaded (after all images)
Music only starts after first user interaction
Elegant full-screen loading screen (“Illuminating the Codex…”) with animated gold quill until everything is ready

Tech Stack & Architecture

Next.js 15 (App Router)
Feature-Sliced Design (FSD) – clean layers (shared/, entities/, features/, widgets/, processes/)
Styling: Tailwind + heavily customized shadcn/ui
Animations: Motion.dev (Framer Motion) – every transition, hover, background change, page transition
State: Zustand
Database: Prisma + SQLite (with full Era, Artist, Artwork models and seed data)
Images & Music: All stored locally in /public/images/ and /public/music/
Fully responsive (desktop cinematic vs mobile natural)

Navigation & Feel

Seamless transitions between all pages
Clicking any artwork in Timeline or Gallery opens the dedicated detail page
Everything feels calm, opulent, cinematic, and luxurious — never modern or playful

This is now the final, complete vision of Codex Luminara.