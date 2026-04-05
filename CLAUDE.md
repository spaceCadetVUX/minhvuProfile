# CLAUDE.md — Project Context

## Project Overview

- **Type:** Static Website
- **Purpose:** Personal Portfolio + Project Showcase
- **Hosting:** GitHub Pages (no server-side processing, no build step required)
- **Languages:** HTML5, CSS3, JavaScript (ES6+)

---

## Tech Stack

### CSS
- **Framework:** Bootstrap 5 (via CDN)
- **CDN:** `https://cdn.jsdelivr.net/npm/bootstrap@5.3.x/dist/css/bootstrap.min.css`
- **Custom CSS:** `assets/css/style.css` — extends and overrides Bootstrap only when necessary
- **Do not use:** Sass/SCSS build step, Tailwind, inline styles

### JavaScript
- **Approach:** Vanilla JS preferred; any library loadable via CDN is allowed
- **Allowed CDNs:** jsDelivr, cdnjs, unpkg
- **Do not use:** npm packages requiring a build process (webpack, vite, etc.), Node.js runtime
- **Main file:** `assets/js/main.js`

### Common JS Libraries (CDN only)
```html
<!-- Bootstrap Bundle (includes Popper) -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.x/dist/js/bootstrap.bundle.min.js"></script>

<!-- Animation (if needed) -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.x/gsap.min.js"></script>

<!-- Icons -->
<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.x.x/css/all.min.css">
```

---

## Folder Structure

```
project-root/
├── index.html
├── CLAUDE.md
├── README.md
├── assets/
│   ├── css/
│   │   └── style.css       ← custom CSS, Bootstrap overrides
│   ├── js/
│   │   └── main.js         ← custom JavaScript
│   └── images/
│       ├── projects/
│       └── avatars/
├── pages/                  ← sub-pages (if any)
│   ├── about.html
│   └── contact.html
└── .github/
    └── workflows/          ← GitHub Actions (if needed)
```

---

## Design Tokens

```css
:root {
  /* Colors */
  --color-primary:     #215EDD;  /* Blue — nav, links, borders, focus rings */
  --color-cta:         #ED3104;  /* Red — CTA buttons, "Hire Me", "Get a Quote" */
  --color-cta-hover:   #C42803;  /* Red darkened 10% — button hover state */
  --color-primary-hover: #1a4db8; /* Blue darkened — link/button hover */
  --color-bg:          #FFFFFF;  /* Main background */
  --color-bg-alt:      #F0F6FF;  /* Alternate section background */
  --color-heading:     #111827;  /* H1, H2, H3 */
  --color-body:        #6B7280;  /* Paragraph text */
  --color-border:      #DBEAFE;  /* Subtle borders, dividers */
  --color-badge-bg:    #EFF6FF;  /* Tag / badge background */
  --color-badge-text:  #1D4ED8;  /* Tag / badge text */


  /* Typography */
  --font-primary: 'Inter', sans-serif;
  --font-size-base: 16px;

  /* Spacing scale */
  --space-xs:  4px;
  --space-sm:  8px;
  --space-md:  16px;
  --space-lg:  24px;
  --space-xl:  32px;
  --space-2xl: 48px;
  --space-3xl: 64px;

  /* Border radius */
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
}
```



Typography:

Font: Inter (Google Fonts)
Base size: 16px
Heading weight: 700
Body weight: 400
Line height: 1.7


/* Primary CTA — Red */
.btn-cta {
  background-color: var(--color-cta);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 12px 28px;
  font-weight: 600;
  transition: background 0.2s ease;
}
.btn-cta:hover { background-color: var(--color-cta-hover); }

/* Secondary — Blue outline */
.btn-secondary {
  background-color: transparent;
  color: var(--color-primary);
  border: 2px solid var(--color-primary);
  border-radius: 8px;
  padding: 12px 28px;
  font-weight: 600;
  transition: all 0.2s ease;
}
.btn-secondary:hover {
  background-color: var(--color-primary);
  color: #ffffff;
}
the style and js need to separate 
---

## Coding Conventions

### HTML
- Use semantic HTML5 elements: `<header>`, `<main>`, `<section>`, `<article>`, `<footer>`
- Every section must have a clear `id` for anchor linking
- Always include `alt` text for `<img>` elements
- Include full SEO meta tags in `<head>`

### CSS
- **Always prefer Bootstrap utility classes** before writing custom CSS
- Write custom CSS only when Bootstrap cannot fulfill the requirement
- Use CSS custom properties (`--var`) for colors and spacing — never hardcode hex values
- Avoid `!important` unless absolutely necessary to override Bootstrap
- Mobile-first approach: write base styles for mobile, scale up with `@media (min-width: ...)`

### JavaScript
- Never use `var` — use `const` or `let` only
- Use `DOMContentLoaded` event or `defer` attribute on script tags
- No inline event handlers (`onclick=""`) in HTML
- Keep functions small and single-purpose
- Add comments for non-obvious logic

---

## Responsive Breakpoints (Bootstrap 5)

| Breakpoint | Class prefix | Min-width |
|---|---|---|
| Mobile | (none) | < 576px |
| Small | `sm` | ≥ 576px |
| Medium | `md` | ≥ 768px |
| Large | `lg` | ≥ 992px |
| Extra Large | `xl` | ≥ 1200px |
| Extra Extra Large | `xxl` | ≥ 1400px |

---

## GitHub Pages Constraints

- **No server-side code:** PHP, Node.js, Python, etc. are not supported
- **No database or backend API** — use external services instead
- **External APIs:** Fetch API calls to third-party REST/JSON APIs are allowed
- **Forms:** Use Formspree, EmailJS, or similar services instead of a backend
- **Repo size limit:** 1GB total, individual files must be under 100MB

---

## Rules for AI-Generated Code

1. **No build tools** — output must run by opening the HTML file directly in a browser
2. **CDN only** — all libraries must be loaded via CDN, no `import` / `require`
3. **Bootstrap first** — use Bootstrap classes before writing any custom CSS
4. **Follow design tokens** — use CSS variables from `:root`, never hardcode color values
5. **Always responsive** — every component must work correctly on mobile
6. **No inline styles** — except for dynamic styles applied via JavaScript
7. **Semantic HTML** — avoid using `<div>` for everything; use the appropriate element

---

## Project Notes

<!-- Add project-specific details below -->
- **Brand color:** (update here)
- **Font:** Inter (update if different)
- **Required sections:** Hero, About, Projects, Contact
- **Content language:** English / Vietnamese