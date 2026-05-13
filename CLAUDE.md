# SelfStorage.help — Next.js Template

## What this project is

A Next.js 15 (App Router, TypeScript) website for selfstorage.help. The visual design lives entirely in `app/globals.css`. Every page is built by composing pre-built section components — no Tailwind utility classes in page files, no inline styles, no new CSS classes unless a genuinely new layout pattern is needed.

Page copy is defined in markdown files inside `selfstoragelandingpageupdate/`. The workflow is: read the MD file, map each section to a component, write the page.

---

## Design tokens (never hardcode these values)

All tokens live in `:root` inside `app/globals.css`.

| Variable | Hex | When to use |
|---|---|---|
| `--ink` | `#1a1614` | Body text, dark section backgrounds |
| `--ink-soft` | `#2d2622` | Secondary body text |
| `--paper` | `#f5f0e8` | Page background, light sections |
| `--paper-warm` | `#ece4d3` | Warm-tinted sections |
| `--rust` | `#b5441f` | Primary accent, CTA backgrounds |
| `--ochre` | `#d4a24c` | Secondary accent, featured highlights |
| `--muted` | `#6b6157` | Captions, sub-labels, muted text |
| `--line` | `#c7bca8` | Borders, dividers |
| `--steel` | `#3a4552` | Testimonial section background |
| `--success` | `#2d5a3d` | Positive signals |

Fonts: **Fraunces** (display/serif, for headings) and **Inter Tight** (sans, for body). Loaded via `next/font` in `app/layout.tsx`. Referenced as `var(--font-display)` and `var(--font-body)` in CSS.

---

## File structure

```
app/
  globals.css          ← ALL CSS lives here (tokens + every component style)
  layout.tsx           ← Loads fonts, wraps all pages in Navbar + Footer
  page.tsx             ← Home page
  services/
    local-seo-gbp-optimization/page.tsx
    technical-seo/page.tsx
    content-keyword-strategy/page.tsx
    multi-location-seo/page.tsx
  who-we-serve/
    independent-facility-owners/page.tsx
    multi-location-operators/page.tsx
    climate-controlled-facilities/page.tsx
    vehicle-rv-boat-storage/page.tsx
    new-facility-openings/page.tsx
  case-studies/page.tsx
  resources/page.tsx
  contact/page.tsx

components/
  layout/
    Navbar.tsx          ← "use client" (mobile toggle state)
    Footer.tsx          ← server component
  sections/
    Hero.tsx            ← Home page hero (SVG + floating badges + stats)
    PageHero.tsx        ← Inner page hero (simpler, no illustration)
    MarqueeBanner.tsx   ← Scrolling ticker
    Problem.tsx         ← 3-col card grid for problem items
    Services.tsx        ← Dark-bg numbered service list
    Process.tsx         ← 4-step process with numbered badges
    Results.tsx         ← 3-col cards with large metric numbers
    Testimonial.tsx     ← Pull quote on steel background
    Pricing.tsx         ← 3-col pricing cards
    FAQ.tsx             ← "use client" accordion
    CTABanner.tsx       ← "use client" rust bg with email form
    FeatureList.tsx     ← Numbered or bulleted item list (light/warm/dark)
    ContentBlock.tsx    ← Prose block with optional bullets (light/warm/dark)
    SimpleCTA.tsx       ← Rust bg CTA, no form (for service page endings)
    CardGrid.tsx        ← Linked card grid (services overview, resources, etc.)
  ui/
    RevealSection.tsx   ← "use client" IntersectionObserver scroll-reveal wrapper
    StorageIllo.tsx     ← SVG storage building illustration

lib/
  utils.ts             ← cn() utility (clsx + tailwind-merge)

selfstoragelandingpageupdate/
  INDEX.md             ← Full page index and voice guide
  02-home-page.md
  04-service-local-seo-gbp.md     → /services/local-seo-gbp-optimization
  05-service-technical-seo.md     → /services/technical-seo
  06-service-content-keyword-strategy.md → /services/content-keyword-strategy
  07-service-multi-location-seo.md → /services/multi-location-seo
  12-segment-independent-owners.md → /who-we-serve/independent-facility-owners
  13-segment-multi-location-operators.md → /who-we-serve/multi-location-operators
  14-segment-climate-controlled.md → /who-we-serve/climate-controlled-facilities
  15-segment-vehicle-rv-boat-storage.md → /who-we-serve/vehicle-rv-boat-storage
  16-segment-new-facility-openings.md → /who-we-serve/new-facility-openings
  17-case-studies-hub.md          → /case-studies
  19-resources-hub.md             → /resources
  24-contact.md                   → /contact
```

---

## Component reference

### PageHero — inner page hero
```tsx
import PageHero from "@/components/sections/PageHero";

<PageHero
  eyebrow="Optional eyebrow label"        // string, optional
  headline={<>H1 with <em>accent</em></>} // ReactNode, required
  subheadline="Subhead text"              // string, required
  primaryCta={{ label: "CTA text", href: "/contact" }} // optional
  note="Small note under CTA"            // string, optional
/>
```

### FeatureList — numbered or bulleted list
```tsx
import FeatureList from "@/components/sections/FeatureList";

// Numbered (for framework/how-we-work sections)
<FeatureList
  variant="light"        // "light" | "warm" | "dark"
  style="numbered"       // "numbered" | "bullet"
  label="Our approach"   // optional section label
  headline="Framework headline"
  intro="Optional intro paragraph"
  items={[
    { num: "1", title: "Step title", desc: "Step description" },
  ]}
/>

// Bulleted (for problem bullet lists)
<FeatureList
  variant="warm"
  style="bullet"
  label="The problem"
  headline="Section headline"
  items={[
    { title: "Bold label", desc: "Description text after the label" },
    // or without title:
    { title: "", desc: "Just a plain bullet sentence" },
  ]}
/>
```

### ContentBlock — prose with optional bullets
```tsx
import ContentBlock from "@/components/sections/ContentBlock";

<ContentBlock
  variant="dark"         // "light" | "warm" | "dark"
  label="The storage edge"
  headline="Headline here"
  body="One or more paragraph strings, or a ReactNode"
  bullets={[             // optional
    "Bullet point one",
    "Bullet point two",
  ]}
/>
```

### SimpleCTA — rust CTA, no form
```tsx
import SimpleCTA from "@/components/sections/SimpleCTA";

<SimpleCTA
  headline="CTA headline"
  body="Optional body paragraph"  // optional
  ctaLabel="Button text"
  ctaHref="/contact"              // default: "/contact"
/>
```

### CardGrid — linked card grid
```tsx
import CardGrid from "@/components/sections/CardGrid";

<CardGrid
  variant="light"        // "light" | "warm" | "dark"
  cols={3}               // 2 | 3 | 4
  label="Section label"
  headline="Grid headline"
  intro="Optional intro"
  cards={[
    {
      eyebrow: "Optional small label",
      title: "Card title",
      body: "Card description",
      href: "/link",         // makes card a link (optional)
      ctaLabel: "Read more", // link text shown at bottom (optional)
    },
  ]}
/>
```

### Testimonial — pull quote
```tsx
import Testimonial from "@/components/sections/Testimonial";

<Testimonial
  quote={<>"Quote text with <em>optional italic</em>."</>}
  avatarInitials="AB"
  name="Name, title or location"
  detail="Optional sub-line"     // optional
/>
```

### FAQ — accordion
```tsx
import FAQ from "@/components/sections/FAQ";

<FAQ
  label="Common questions"       // optional, has default
  headline={<>Things <em>usually asked</em>.</>}  // optional
  items={[
    { q: "Question?", a: "Answer text." },
  ]}
/>
```

### CTABanner — rust bg with email form
```tsx
import CTABanner from "@/components/sections/CTABanner";

<CTABanner
  headline={<>Headline with <em>italic</em>.</>}
  subtext="Body text"
  placeholder="yourfacility.com"
  ctaLabel="Send my audit"
  note="Small print note"
/>
```

---

## Section-to-component mapping

Use this table when reading an MD file to decide which component handles each section.

| MD section type | Component + key props |
|---|---|
| Hero on inner page | `PageHero` — eyebrow, headline, subheadline, primaryCta |
| Hero on home page | `Hero` — eyebrow, headline, subheadline, primaryCta, secondaryCta, stats |
| Problem as 3-col cards | `Problem` — label, headline, intro, items[]{num, title, desc} |
| Problem as bullet list | `FeatureList` style="bullet" variant="warm" |
| Numbered framework / how-we-work | `FeatureList` style="numbered" variant="light" |
| "The storage edge" / dark insight block | `ContentBlock` variant="dark" — label, headline, body, bullets[] |
| "What [segment] actually need" prose | `ContentBlock` variant="warm" — headline, body |
| "Typical results" bullet list | `FeatureList` style="bullet" variant="warm" — no label needed |
| Pull quote / proof | `Testimonial` — quote, avatarInitials, name |
| FAQ accordion | `FAQ` — items[]{q, a} |
| Final CTA without form | `SimpleCTA` — headline, body, ctaLabel |
| Final CTA with email form | `CTABanner` — headline, subtext, ctaLabel |
| Cards grid (services, segments, resources) | `CardGrid` — variant, cols, cards[]{title, body, href, ctaLabel} |
| 4-step process | `Process` — steps[]{num, title, desc} |

---

## How to create a new page from an MD file

**Step 1 — read the MD file.**
The HTML comment at the top gives the URL: `Page: Title `/some/path``

**Step 2 — create the file.**
Route `/services/foo` → file `app/services/foo/page.tsx`

**Step 3 — add metadata.**
```tsx
import { Metadata } from "next";
export const metadata: Metadata = {
  title: "Page Title | SelfStorage.help",
  description: "One sentence from the subhead.",
};
```

**Step 4 — map MD sections to components using the table above.**

**Step 5 — use `<em>` tags for italicised copy.**
The MD files use standard markdown emphasis. In JSX: `<>text with <em>emphasis</em> here</>`.

**Step 6 — verify.**
Run `npm run dev` and check `http://localhost:3000/your-path`.

---

## New page template (copy-paste starting point)

```tsx
import { Metadata } from "next";
import PageHero from "@/components/sections/PageHero";
import FeatureList from "@/components/sections/FeatureList";
import ContentBlock from "@/components/sections/ContentBlock";
import Testimonial from "@/components/sections/Testimonial";
import FAQ from "@/components/sections/FAQ";
import SimpleCTA from "@/components/sections/SimpleCTA";

export const metadata: Metadata = {
  title: "Page Title | SelfStorage.help",
  description: "Page description.",
};

export default function PageName() {
  return (
    <>
      <PageHero
        eyebrow="Section label"
        headline={<>H1 text with <em>italic accent</em></>}
        subheadline="Subhead paragraph."
        primaryCta={{ label: "CTA label", href: "/contact" }}
      />

      <FeatureList
        variant="warm"
        style="bullet"
        label="The problem"
        headline="Problem headline"
        items={[
          { title: "Bold label", desc: "Description." },
        ]}
      />

      <FeatureList
        variant="light"
        style="numbered"
        label="Our approach"
        headline="Framework headline"
        items={[
          { num: "1", title: "Step title", desc: "Step description." },
        ]}
      />

      <ContentBlock
        variant="dark"
        label="The storage edge"
        headline="Insight headline"
        body="Paragraph text."
        bullets={["Bullet one.", "Bullet two."]}
      />

      <Testimonial
        quote={<>"Quote text."</>}
        avatarInitials="AB"
        name="Name, role, location"
      />

      <FAQ
        items={[
          { q: "Question?", a: "Answer." },
        ]}
      />

      <SimpleCTA
        headline="CTA headline"
        body="Body text."
        ctaLabel="Button label"
      />
    </>
  );
}
```

---

## Voice rules (from the copy deck)

- US English, direct second person (you / your facility / your units)
- No em dashes — use commas or rewrite the sentence
- No rhetorical "not X, Y" contrasts
- Storage-industry vocabulary: move-ins, occupancy, map pack, drive-up, climate-controlled, trade area, lease-up

---

## Running the project

```bash
npm install      # first time
npm run dev      # http://localhost:3000
npm run build    # production build check
```
