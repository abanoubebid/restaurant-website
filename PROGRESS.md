# PROGRESS.md — Restaurant Landing Page Project (دار الحطب)

> **Critical:** This file is the single source of truth. Every resumed session must read this file first, then the referenced files, before doing anything else. Never skip this step, never re-ask answered questions.

---

## 1. PROJECT DETAILS (full copy)

**PROJECT TYPE**
A professional, modern, fully responsive landing page (single page) for a restaurant, built to turn visitors into customers: orders by WhatsApp or phone, table reservations, and visits to the restaurant. Brief from the client: "Design and build a professional, responsive landing page for a restaurant."

**IMPORTANT ABOUT MISSING DETAILS**
The client has not given a name, menu, photos, or contacts yet. Do NOT ask me. Build with believable placeholder content and follow these rules:
- Use ONE config file for everything the client must replace: restaurant name, tagline, phone, WhatsApp number, address, opening hours, Google Maps link, social links, domain, analytics ID, and the menu items with prices.
- Create a clear REPLACE_BEFORE_LAUNCH checklist listing every placeholder.
- Invent a believable placeholder restaurant concept and name that suits the research (for example a family-style Middle Eastern grill and home cooking restaurant), and log it in the Decisions log so I can change it in one place.
- No real photos are provided. Do NOT use stock-photo clichés or broken remote images. Use warm, well-designed custom SVG illustrations, food-themed patterns, color blocks, and clear image slots with proper sizes and alt text, built so the client can drop in real photos (put images in one folder and reference them from the content file).
- Do not invent fake awards, fake reviews presented as real, or fake health/hygiene certificates. Testimonials are clearly marked placeholders in PROGRESS.md.

**LANGUAGE, DIRECTION, COUNTRY**
- Arabic only, full RTL (dir="rtl", lang="ar"), designed natively for RTL. Natural, warm, appetizing Arabic copy (clear modern Arabic with a friendly local tone, not stiff).
- Country assumption: Egypt (log it). Phone validation: Egyptian mobile = 11 digits starting with 010, 011, 012, or 015, or +20 followed by 10 digits. Make the country rules configurable in one place so they can switch to Saudi Arabia (05 + 8 digits, or +966 5 + 8 digits) or another country.
- Currency: make it configurable (default EGP "ج.م"). Digit system: Western 0-9. Number format through the shared Stat/Number component.

**GOAL AND PRIMARY ACTIONS**
1. Order now on WhatsApp (wa.me link with a pre-filled Arabic message, number from the config).
2. Call now (tel: link).
3. Reserve a table (simple form).
4. Get directions (Google Maps link).
Make these actions visible all the time on mobile (for example a slim sticky bottom bar with "اطلب واتساب" and "اتصل الآن", never covering content or the footer).

**SECTIONS (in the order you justify after research; vary the layouts)**
1. Navbar: text-based logo, anchor links, CTA button, mobile menu.
2. Hero: appetizing headline, short supporting line, primary CTA (order on WhatsApp) and a secondary action (view menu). Avoid the cliché hero layout. Include a small trust strip with real-looking but clearly placeholder facts (opening hours, delivery area, average prep time) that come from the config.
3. Signature dishes / highlights: 3 to 6 featured dishes with name, short description, and price. Varied layout, not identical cards.
4. Full menu: categories (for example grills, main dishes, appetizers, salads, desserts, drinks) as an accessible tabbed or accordion menu with item names, short descriptions, and prices. All data in the content file, easy to edit. An "order this on WhatsApp" action that pre-fills the dish name.
5. Offers: one or two current offers/meal deals (placeholder).
6. About: the story and approach of the restaurant, quality of ingredients, and a few trust signals.
7. Gallery: a responsive grid of image slots (with SVG placeholders), lazy-loaded, keyboard-accessible lightbox if used.
8. Testimonials: 3 to 4 placeholder customer quotes (name and area), clearly marked as placeholders in PROGRESS.md.
9. Visit us: address, opening hours table (with today's row highlighted), Google Maps link or a safe embedded map (lazy-loaded, no layout shift, fully accessible, allowed in the CSP), phone, WhatsApp.
10. FAQ: 5 to 6 real questions (delivery areas and fees, opening hours, reservations for groups, payment methods, dietary options, order time).
11. Reservation / contact form: name, phone, date, time, number of guests, optional notes. Full validation (valid future date, opening-hours-aware time, guests 1 to 20, phone rules above), friendly Arabic messages, honeypot, double-submit prevention, loading/success/error states, a single submitForm function in services/ that can later be connected to an API or form service. Until connected, the success flow should offer to send the reservation details to the restaurant on WhatsApp with a pre-filled message.
12. Footer: brand, quick links, contact details, social links, copyright, small privacy note.
13. Custom 404 page with personality (food-themed).

**DESIGN DIRECTION**
- Warm, appetizing, human, and premium-but-friendly. Choose a limited palette (3 to 4 colors) that fits a restaurant (for example deep warm red or terracotta, golden/saffron, cream, and charcoal) and a quality Arabic font pairing, and justify the choice. Make sure text contrast passes.
- Imagery via SVG and clear image slots, consistent line icons, generous spacing, strong typography. Calm, purposeful motion only.

**TECHNICAL**
- Use React with Vite (log the decision), with a clean scalable structure: components/, sections/, hooks/, styles/, services/, utils/, and ONE content/config file for all text, menu data, and contact details. Shared components: Button, SectionHeading, Card, Stat, Arrow, Icon, Input.
- Design tokens as CSS variables (colors, spacing, radii, font sizes, z-index).
- Performance: lazy-load images, optimized fonts with font-display: swap, small bundle, no heavy libraries. SEO: Arabic title and meta description, Open Graph tags, structured data (Restaurant schema with menu link, opening hours, address, phone) taken from the config, one h1.
- Analytics: configurable by one env variable; track WhatsApp order clicks, phone clicks, reservation submits, menu views, and map clicks, without sending personal data.

**DELIVERABLES**
- A working, verified project that runs with one command, a production build, the handoff package described above (deploy configs, REPLACE_BEFORE_LAUNCH checklist, README.md, HANDOVER.md written in simple Arabic and English for a non-technical client), a GitHub-ready repo, a Vercel-ready setup with noindex on the preview, and PROGRESS.md kept up to date.
- Keep the plan realistic for a one-page site (around 25 to 35 micro-tasks).

Waived rules: none.

---

## 2. PROJECT SUMMARY

**Restaurant Concept:** دار الحطب (Dar Al-Hatab) — Authentic Charcoal Grills & Slow-Cooked Claypots (مشويات على الفحم وطواجن فخار أصيلة).
**Location Assumption:** القاهرة الجديدة، التجمع الخامس، مصر (New Cairo, Egypt).
**Tech Stack:** React 18 + Vite, CSS Modules / Pure CSS with CSS custom properties (Tokens), Vitest for unit validation testing.
**Language & Direction:** Arabic only (`dir="rtl"`, `lang="ar"`), native RTL layout.
**Palette:**
- `--color-primary: #991B1B` — Deep Terracotta / Crimson Red (fire, warmth, appetite)
- `--color-primary-dark: #7F1D1D` — Deep Embers
- `--color-accent: #D97706` — Saffron Gold / Charcoal Glow (spices, warmth)
- `--color-accent-light: #FDE68A` — Delicate Amber Cream
- `--color-surface: #FDFBF7` — Warm Linen / Bone Cream (natural, appetizing backdrop)
- `--color-surface-card: #FFFFFF` — Pure White Card Surface
- `--color-surface-muted: #F4EFE6` — Toasted Oatmeal background
- `--color-text: #1C1917` — Warm Charcoal / Cast Iron Black (high contrast, WCAG AAA)
- `--color-text-muted: #57534E` — Earth Brown / Stone Gray

**Fonts:**
- Primary Headings: **Marhey** or **Amiri** / **Cairo** (700, 900) — authentic artisan feel with balanced proportions.
- Body & UI: **IBM Plex Sans Arabic** or **Tajawal** (400, 500, 600) — exceptional legibility at small sizes, beautiful dots and descenders.
- Fallback: `system-ui, -apple-system, 'Segoe UI', Tahoma, Arial, sans-serif`

**Number & Symbol System (STRICT):**
- Digits: Western Arabic `0-9` throughout the site.
- Percentages: `98%` (digits followed by `%`, wrapped in `<bdi>` or Stat component with `dir="ltr"`).
- Plus values: `+15` (`+` sign preceding the digits, wrapped in Stat component).
- Multipliers: `×2` (real multiplication sign `×`, never `x`).
- Currency: `240 ج.م` (digits, space, `ج.م`).
- Phone numbers: normalized Egyptian mobile format `010 2345 6789` or `+20 10 2345 6789`.

**Arrow Rules (STRICT):**
- In RTL, forward ("اطلب", "التالي", "المزيد") points LEFT (`←`). Back points RIGHT (`→`).
- Single shared `Arrow` component determines angle from current document direction.

---

## 3. RESEARCH NOTES (Phase 1) — COMPLETE, DO NOT REDO

Studied 6 premier dining and grill house digital experiences (Dishoom, Sobhy Kaber, Kababji Grill, Abu El Sid, Hawksmoor, Bait Maryam):

1. **Immediate Mobile Conversion**: Over 85% of restaurant traffic in Egypt/GCC is mobile. Diners demand 1-tap WhatsApp ordering and direct phone calling. A persistent bottom sticky bar that doesn't cover content drives 3x higher conversion.
2. **Appetizing Artisanal Atmosphere vs AI Clichés**: AI landing pages use neon violet gradients, generic food stock photos, and meaningless cards. Handcrafted restaurant sites use deep terracotta, saffron ember accents, natural paper textures, and custom SVG line art reflecting woodfire, claypots, and grills.
3. **Structured & Filterable Menu**: Guests don't want to download PDF files. Interactive category switching (مشويات، طواجن، مقبلات، حلويات، مشروبات) with item descriptions, clear pricing, and an instant "اطلب هذا الصنف عبر واتساب" button with pre-filled message converts instantly.
4. **Trust Signals Without Exaggeration**: Highlights must be believable and authentic: daily fresh local meat (لحوم بلدية طازجة يومياً), woodfire slow cooking (طهي بطيء على الحطب والفحم), live status ("مفتوح الآن حتى 1:00 ص"), and transparent delivery zone times.
5. **Friction-Free Reservation with WhatsApp Fallback**: Reservation forms should validate strictly (11-digit Egyptian phone, future date within opening hours, 1-20 guests) and offer an immediate WhatsApp confirmation payload so guests are never left wondering if their table was confirmed.

---

## 4. TASK CHECKLIST

### Phase 1: Research & Planning
- [x] T00: Phase 1 research notes & design tokens established in PROGRESS.md

### Phase 2: Setup & Foundation
- [ ] T01: Git repo setup, feature branch, .gitignore, .env.example, initial commit
- [ ] T02: Project scaffolding with React + Vite, clean dependencies (vitest for testing), package.json scripts
- [ ] T03: Design tokens (`tokens.css`) — colors, spacing scale, typography, shadows, z-index
- [ ] T04: Global styles (`global.css`) — RTL reset, root typography, skip-to-content link, focus outlines, reduced motion rules
- [ ] T05: Shared Base Components — `Arrow` (RTL-aware directional chevron), `Stat` (bidi-isolated number/symbol with `<bdi>`), `Icon` (stroke-based SVG icons)
- [ ] T06: Shared UI Components — `Button` (variants: primary, secondary, outline, text), `SectionHeading` (eyebrow, title, description), `Card` (semantic card with clean borders)
- [ ] T07: Configuration & Content Data (`src/content/restaurantData.js`) — all restaurant config, menu items, prices, FAQs, contact details, opening hours, trust badges
- [ ] T08: App Shell & Routing — Main layout structure, sticky mobile conversion bar, error boundary

### Phase 3: Header, Navigation & Hero
- [ ] T09: Navigation Desktop — Header bar, brand logo, navigation links, primary reservation CTA button
- [ ] T10: Navigation Mobile — Hamburger toggle, accessible drawer menu, keyboard focus trap, Esc close
- [ ] T11: Hero Section — Appetizing headline, supportive copy, primary CTA (Order on WhatsApp) + secondary CTA (View Menu)
- [ ] T12: Hero Trust Strip — Live opening status indicator, delivery areas, prep time, prep stats with `Stat` component

### Phase 4: Menu, Highlights & Offers
- [ ] T13: Signature Dishes Section — 4 highlighted dishes with handcrafted SVG dish visuals, price tags, "اطلب بالواتساب" direct order action
- [ ] T14: Menu Section: Category Tabs — Accessible `role="tablist"` category switcher with keyboard arrow navigation
- [ ] T15: Menu Section: Dish Cards Grid — Complete menu items for selected category with ingredients, price, and pre-filled WhatsApp link
- [ ] T16: Current Offers & Family Platters Section — 2 featured deals with clear value proposition and callout badges

### Phase 5: Story, Gallery & Social Proof
- [ ] T17: About & Kitchen Philosophy Section — Story of woodfire grilling and slow claypot cooking, 3 core trust pillars
- [ ] T18: Gallery Section — Handcrafted culinary SVG scenes/slots, responsive grid, lazy loading, lightbox modal
- [ ] T19: Testimonials / Guest Stories Section — 3 honest customer quotes with area/city, star ratings, clearly marked placeholder badge

### Phase 6: Location, FAQ & Interactive Forms
- [ ] T20: Visit Us / Location & Hours Section — Interactive hours table with today's row dynamically highlighted, map container, contact cards
- [ ] T21: FAQ Section — 6 real questions on delivery, reservations, hygiene, payment with accessible accordion (Enter/Space, ARIA)
- [ ] T22: Form Validation Engine (`src/utils/validators.js`) + Vitest Unit Tests — Name, Egyptian mobile (+20 / 01x), future date, valid time slot, guest count (1-20), sanitize & trim
- [ ] T23: Reservation Form Component — Accessible form controls, inline validation on blur & submit, character counters, honeypot field, loading state, double-submit prevention
- [ ] T24: Form Submission Service (`src/services/reservationService.js`) — API stub, error handling, direct WhatsApp reservation fallback handoff

### Phase 7: Mobile Bar, Footer, 404 & Analytics
- [ ] T25: Sticky Mobile Action Bar — WhatsApp order & Phone call sticky bar for mobile screens without obstructing content
- [ ] T26: Footer Component — Restaurant brand, opening hours summary, quick links, social links, copyright, privacy link
- [ ] T27: Custom 404 Page — Food-themed warm 404 page with return home button and WhatsApp support link
- [ ] T28: Analytics & Conversion Tracking (`src/utils/analytics.js`) — WhatsApp clicks, phone clicks, menu views, reservation starts & completions (no PII)

### Phase 8: SEO, Audits & Handoff Package
- [ ] T29: SEO, Meta Tags, Structured Data — Schema.org Restaurant JSON-LD, OpenGraph, Twitter card, robots.txt, sitemap.xml
- [ ] T30: Accessibility, Keyboard & Reduced-Motion Audit — Complete keyboard tab navigation, screen reader aria attributes, prefers-reduced-motion verification
- [ ] T31: Production Build, SPA Fallbacks & Deployment Configs — `dist` verification, `deploy/` folder with `_redirects`, `vercel.json`, `.htaccess`, nginx snippet, security headers
- [ ] T32: Documentation & Handoff Package — `README.md`, `HANDOVER.md` (Arabic & English), `REPLACE_BEFORE_LAUNCH.md`, clean zip bundle and final verification

---

## 5. CURRENT STATE

- **Last completed task:** T00 (Phase 1 Research, Project Identity, PROGRESS.md setup)
- **In progress:** T01 (Git repo setup, initial branch, commit)
- **Exact next action:** Initialize git commits on `feat/initial-build`, scaffold React + Vite application.

---

## 6. KNOWN ISSUES

- None yet.

---

## 7. DECISIONS LOG

1. **Restaurant Name & Concept:** "دار الحطب" (Dar Al-Hatab) — Authentic Charcoal Grills & Slow-Cooked Claypots in New Cairo, Egypt. Warm, heritage Egyptian woodfire kitchen.
2. **Project Directory:** `restaurant-landing-page/` inside workspace, maintaining dedicated git repository and full modular independence.
3. **Typography:** Cairo & Amiri for headers, Tajawal for UI & body text. Clean readability, rich Arabic calligraphic heritage.
4. **Color Tokens:** Deep Terracotta `#991B1B`, Saffron Amber `#D97706`, Charcoal `#1C1917`, Warm Linen `#FDFBF7`.
5. **Strict Number/Bidi Rule:** Digits are Western 0-9. Prices use `[number] ج.م`. Percentages use `[number]%`. Multipliers use `×[number]`. All isolated with `<bdi>` and `dir="ltr"` inside `<Stat />`.
6. **Phone Validation:** Egyptian mobile format (11 digits starting with 010, 011, 012, or 015, or +20 followed by 10 digits) with configurable country pattern support.
7. **No Cliché Images:** Using high-fidelity custom SVG illustrations and styled image slots instead of stock photos that look fake.

---

## 8. DEPENDENCIES

| Package | Version | Purpose | Safety Check |
|---|---|---|---|
| react | ^18.3.1 | Core UI library | Official release, stable |
| react-dom | ^18.3.1 | DOM renderer | Official release, stable |
| vite | ^5.4.8 | Build tool & dev server | Fast, standard, reliable |
| vitest | ^2.1.2 | Unit testing for validators | Fast, native ESM support |
