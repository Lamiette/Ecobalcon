# SEO Audit — EcoBalcon

**Date:** 2026-03-25
**Site:** https://ecobalcon.com
**Stack:** Static HTML, GitHub Pages
**Language:** French

---

## Overall Assessment: 8/10

The site has strong SEO foundations. Every page has canonical URLs, meta descriptions, OG tags, Twitter cards, and BlogPosting/WebSite JSON-LD schema. The gaps below are the delta between "good" and "ranking at full potential".

---

## What already works well

- Sitemap and robots.txt: properly configured, sitemap declared in robots.txt
- Meta descriptions: keyword-rich, correct length (150–160 chars) on all pages
- OG tags + Twitter cards: fully implemented on all pages
- `BlogPosting` schema: present on all articles with author, dates, and publisher
- `lang="fr"` attribute: correct on all pages
- Canonical URLs: on every page
- WebP images with lazy loading throughout
- Alt text: descriptive on all images
- Heading hierarchy (H1 → H2 → H3): respected on all pages
- Related articles sections: strong internal linking architecture
- System fonts: zero web font loading overhead
- URL structure: clean, keyword-rich, hyphenated slugs
- No render-blocking JS or CSS

---

## CRITICAL — Core Web Vitals (direct Google ranking factor)

### 1. Add `width` and `height` to all `<img>` tags

**Problem:** 253 images across 73 HTML files lack explicit dimensions. This directly causes **Cumulative Layout Shift (CLS)**, a Core Web Vitals metric and Google ranking signal. The CSS uses `aspect-ratio` as a partial workaround, but Lighthouse still flags missing attributes.

**Fix:** Add `width="W" height="H"` attributes matching the actual image file resolution to every `<img>` tag.

```html
<!-- Before -->
<img src="images/articles/hero.webp" alt="..." loading="eager">

<!-- After -->
<img src="images/articles/hero.webp" alt="..." loading="eager" width="1280" height="720">
```

**Files:** All HTML files (especially all 33 articles in `articles/`).

---

### 2. Add `<link rel="preload">` for hero images

**Problem:** No resource hints for above-the-fold images. This delays **First Contentful Paint (FCP)**, another Core Web Vital.

**Fix:** In each page's `<head>`, add a preload for the specific hero image used on that page:

```html
<link rel="preload" as="image" href="images/articles/[hero-image].webp" fetchpriority="high">
```

**Files:** `index.html` and each article HTML file.

---

## HIGH IMPACT — Structured Data / Schema

### 3. Add `BreadcrumbList` JSON-LD schema to all article pages

**Problem:** No explicit breadcrumb schema exists. Google cannot generate breadcrumbs in SERP results, reducing click-through rates.

**Fix:** Add a second `<script type="application/ld+json">` block to every article:

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {"@type": "ListItem", "position": 1, "name": "Accueil", "item": "https://ecobalcon.com/"},
    {"@type": "ListItem", "position": 2, "name": "Articles", "item": "https://ecobalcon.com/articles/"},
    {"@type": "ListItem", "position": 3, "name": "[Article title]", "item": "[Canonical URL]"}
  ]
}
```

**Files:** All 33 article HTML files in `articles/`.

---

### 4. Add `FAQPage` JSON-LD schema on applicable articles

**Problem:** Several articles contain Q&A sections in their HTML but don't mark them up with FAQ schema. Google cannot show FAQ rich snippets for these.

**Applicable articles:**
- `articles/legumes-faciles-a-cultiver.html`
- `articles/jardinage-en-lasagnes-sur-balcon.html`
- `articles/jardin-sur-balcon-astuces.html`
- `articles/erreurs-jardiner-sur-un-balcon.html`
- `articles/guide-tomates-sur-son-balcon.html`

**Fix:** Add `FAQPage` schema referencing the actual Q&A content in the HTML:

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "[Question text]",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "[Answer text]"
      }
    }
  ]
}
```

---

### 5. Add `HowTo` JSON-LD schema on tutorial/guide articles

**Problem:** Step-by-step guide articles have no HowTo markup. Google cannot generate how-to rich snippets with step previews.

**Applicable articles:**
- `articles/guide-tomates-sur-son-balcon.html`
- `articles/jardinage-en-lasagnes-sur-balcon.html`
- `articles/recuperer-eau-de-pluie-balcon.html`
- `articles/diy-pots-pour-le-balcon.html`
- `articles/solutions-compostage-sur-balcon.html`

**Fix:** Add `HowTo` schema with `step` array matching the article's numbered steps.

---

### 6. Add `SearchAction` to WebSite schema (`index.html`)

**Problem:** The existing WebSite JSON-LD has no `potentialAction`. Google cannot offer a sitelinks search box in SERP.

**Fix:** Extend the WebSite JSON-LD in `index.html`:

```json
{
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "EcoBalcon",
  "url": "https://ecobalcon.com/",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://ecobalcon.com/articles/?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
}
```

**File:** `index.html`

---

### 7. Add `sameAs` / `url` to author `Person` schema

**Problem:** Authors (Clara Fontaine, Louis Fargot, Mathias Lancet) appear in `BlogPosting` schema but their `author` nodes have no `url` or `sameAs` links (LinkedIn, Instagram). This weakens E-E-A-T signals.

**Fix:** Expand the `author` node in each article's `BlogPosting` JSON-LD:

```json
"author": {
  "@type": "Person",
  "name": "Clara Fontaine",
  "url": "https://ecobalcon.com/auteurs/clara-fontaine.html",
  "sameAs": ["https://www.instagram.com/..."]
}
```

**Files:** All article HTML files (update per-author).

---

## HIGH IMPACT — E-E-A-T (Experience, Expertise, Authoritativeness, Trust)

### 8. Create an About page (`a-propos.html`)

**Problem:** No About page exists. Google's quality raters and the algorithm cannot assess who runs the site, their expertise, or the site's mission. This is a direct E-E-A-T gap that can suppress rankings for informational content.

**Fix:** Create `a-propos.html` with:
- Site mission and focus
- Team/author introductions
- Year the site was founded
- Proper SEO meta tags and `AboutPage` schema

**Also add to:** `sitemap.xml`, footer navigation.

---

### 9. Create author bio pages

**Problem:** Three authors have no dedicated pages. Linking article bylines to author bio pages is a primary E-E-A-T signal.

**Fix:** Create `/auteurs/clara-fontaine.html`, `/auteurs/louis-fargot.html`, `/auteurs/mathias-lancet.html` with:
- Short bio and expertise description
- List of articles written
- `Person` JSON-LD schema with `sameAs` social profiles

Link the "Par [Author]" byline in each article to the author's page.

---

### 10. Add a Contact page (`contact.html`)

**Problem:** No contact information anywhere on the site. This is a trust signal for both users and search engines (especially important for a site giving practical advice).

**Fix:** Create a simple `contact.html` with email address or contact form. Link from footer.

---

## MEDIUM IMPACT — Page-Level SEO

### 11. Improve weak title tags on 2 pages

**Problem:** Two pages have very short, keyword-free titles:

| Page | Current title | Length | Problem |
|------|--------------|--------|---------|
| `articles/index.html` | "Articles \| EcoBalcon" | 20 chars | No target keyword |
| `galerie.html` | "Galerie \| EcoBalcon" | 22 chars | No keyword value |

**Fix:**
- Articles index: `"Conseils et guides jardinage sur balcon | EcoBalcon"`
- Gallery: `"Galerie jardinage urbain sur balcon | EcoBalcon"`

Also update the corresponding `og:title` and `twitter:title` tags.

---

### 12. Mark `article-template.html` as noindex + remove from sitemap

**Problem:** `articles/article-template.html` is a blank article template. It has no `noindex` directive and is listed in `sitemap.xml`. Google may crawl and index it as thin content.

**Fix:**
1. Add to `articles/article-template.html` head: `<meta name="robots" content="noindex, nofollow">`
2. Remove its `<url>` entry from `sitemap.xml`

---

### 13. Add visible breadcrumb HTML navigation to article pages

**Problem:** No `<nav aria-label="breadcrumb">` element exists on any page. Breadcrumbs reduce bounce rate, improve UX, and are required to support the BreadcrumbList schema (item 3 above).

**Fix:** Add above the article `<h1>` on every article page:

```html
<nav aria-label="fil d'ariane">
  <ol class="breadcrumb">
    <li><a href="/">Accueil</a></li>
    <li><a href="/articles/">Articles</a></li>
    <li aria-current="page">[Article title]</li>
  </ol>
</nav>
```

Style with minimal CSS in `css/style.css`.

---

### 14. Add `article:modified_time` OG meta tag to articles

**Problem:** Articles have `dateModified` in JSON-LD but not as an HTML meta tag. Some crawlers and aggregators specifically read `<meta property="article:modified_time">`.

**Fix:** Articles already have `article:published_time`. Add next to it:

```html
<meta property="article:modified_time" content="[ISO 8601 date]">
```

---

### 15. Expand `robots` meta tag to allow full snippets

**Problem:** Current value: `"index,follow,max-image-preview:large"`. Missing snippet length controls limit how Google displays result excerpts.

**Fix:** Update on all pages to:
```html
<meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1">
```

---

## MEDIUM IMPACT — Architecture

### 16. Create category landing pages

**Problem:** Articles are tagged with 4 categories (Fiches Techniques, Plantes & semis, Entretien & astuces, Aménagement du balcon) but no dedicated category pages exist. These would be high-authority, keyword-rich entry points and improve crawl depth.

**Fix:** Create one page per category, e.g.:
- `/categories/fiches-techniques.html`
- `/categories/plantes-et-semis.html`
- `/categories/entretien-et-astuces.html`
- `/categories/amenagement-du-balcon.html`

Each with `<h1>`, meta description targeting the category keyword, and a list of all articles in that category. Add to `sitemap.xml`.

---

### 17. Add social sharing buttons on article pages

**Problem:** No share buttons on articles. Social engagement indirectly drives backlinks and amplification.

**Fix:** Add Twitter/X share button and copy-link button at the bottom of each article, after the related articles section.

---

### 18. Add newsletter or return-visit CTA

**Problem:** No mechanism to retain visitors. Return visit frequency is a behavioral ranking signal.

**Fix:** Add an email signup CTA (Mailchimp, Brevo, etc.) or link to an existing newsletter in the article footer, before the related articles section.

---

## LOW IMPACT / Polish

### 19. Create a custom `404.html` page

**Problem:** GitHub Pages shows a generic 404 page. A custom page with navigation links helps retain users and preserves perceived link equity.

**Fix:** Create `404.html` with site header, a friendly message, and links to homepage and articles index.

---

### 20. Add image URLs to `sitemap.xml`

**Problem:** `sitemap.xml` lists pages but not images. Google Image Search cannot discover article hero images without an image sitemap.

**Fix:** Add `<image:image>` extensions to each article `<url>` block:

```xml
<url>
  <loc>https://ecobalcon.com/articles/guide-tomates-sur-son-balcon.html</loc>
  <image:image>
    <image:loc>https://ecobalcon.com/images/articles/tomates-balcon.webp</image:loc>
    <image:caption>Tomates cultivées sur un balcon en pot</image:caption>
  </image:image>
</url>
```

Requires adding `xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"` to the sitemap root.

---

### 21. Add `manifest.json` for PWA support

**Problem:** No web app manifest. Reduces mobile installability and misses a small engagement signal.

**Fix:** Create `/manifest.json`:

```json
{
  "name": "EcoBalcon",
  "short_name": "EcoBalcon",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#2d6a4f",
  "icons": [
    {"src": "/images/favicon-192.png", "sizes": "192x192", "type": "image/png"},
    {"src": "/images/apple-touch-icon.png", "sizes": "180x180", "type": "image/png"}
  ]
}
```

Add to all page `<head>`: `<link rel="manifest" href="/manifest.json">`

---

### 22. Fix favicon file format inconsistency

**Problem:** `images/favicon-32.png` and `images/favicon-192.png` are JPEG files with `.png` extensions. This can cause rendering issues in some browsers.

**Fix:** Re-export both favicons as actual PNG files and replace them.

---

### 23. Add `hreflang` self-referential tags

**Problem:** No hreflang tags. Best practice for a monolingual site and future-proofs any language expansion.

**Fix:** Add to all pages `<head>`:
```html
<link rel="alternate" hreflang="fr" href="[canonical URL]">
<link rel="alternate" hreflang="x-default" href="[canonical URL]">
```

---

### 24. Add `<meta name="author">` to article pages

**Problem:** Author is present in JSON-LD but not as a standard HTML meta tag. Some aggregators and scrapers read this tag.

**Fix:** Add to each article `<head>`:
```html
<meta name="author" content="Clara Fontaine">
```

---

### 25. Audit `rel` attributes on external links in article body content

**Problem:** Navigation links have proper `rel="noopener noreferrer"` but external `<a>` links within article `<main>` content have not been audited. Missing `rel` attributes can leak PageRank.

**Fix:** Grep all article HTML for `<a href="http` and verify each has `rel="noopener noreferrer"`. Add `rel="nofollow"` for affiliate or unvetted external links.

---

## Summary Table

| # | Enhancement | Impact | Effort |
|---|---|---|---|
| 1 | `width`/`height` on all images | Critical (CLS) | High |
| 2 | `preload` for hero images | High (FCP) | Medium |
| 3 | `BreadcrumbList` schema on articles | High | Medium |
| 4 | `FAQPage` schema on Q&A articles | High | Medium |
| 5 | `HowTo` schema on guide articles | High | Medium |
| 6 | `SearchAction` in WebSite schema | Medium | Low |
| 7 | `sameAs` / `url` in author schema | Medium (E-E-A-T) | Low |
| 8 | About page (`a-propos.html`) | High (E-E-A-T) | Medium |
| 9 | Author bio pages | Medium (E-E-A-T) | Medium |
| 10 | Contact page | Medium (trust) | Low |
| 11 | Fix weak title tags (2 pages) | Medium | Low |
| 12 | Noindex article-template.html | Medium | Low |
| 13 | Visible breadcrumb HTML | Medium | Medium |
| 14 | `article:modified_time` OG tag | Low | Low |
| 15 | `max-snippet` in robots meta | Low | Low |
| 16 | Category landing pages | High | High |
| 17 | Social share buttons on articles | Low | Low |
| 18 | Newsletter / return-visit CTA | Low | Low |
| 19 | Custom `404.html` | Low | Low |
| 20 | Image URLs in sitemap.xml | Low | Medium |
| 21 | `manifest.json` | Low | Low |
| 22 | Fix favicon file format | Low | Low |
| 23 | `hreflang` self-referential tags | Low | Low |
| 24 | `<meta name="author">` on articles | Low | Low |
| 25 | External link `rel` audit | Low | Medium |

---

## Verification checklist after implementing

1. **Google Rich Results Test** — test 3–4 article URLs to validate FAQPage, HowTo, BreadcrumbList schemas
2. **Lighthouse** — run on `index.html` and 2 articles; CLS score should reach < 0.1 after image dimension fix
3. **Google Search Console** — submit updated `sitemap.xml`; use URL Inspection to confirm `article-template.html` is noindex
4. **Chrome DevTools > Application** — verify `manifest.json` loads correctly
5. **W3C Validator** — confirm no HTML errors introduced by schema additions
