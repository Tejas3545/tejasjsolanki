# Tejas J Solanki — Developer’s Studio

A personal portfolio built with **Next.js App Router and React**, replacing the earlier plain HTML version.

## Design

An original developer-studio composition: layered project previews, warm neutral surfaces, orange accents, moss, rose, and ochre. Inspired by the interaction vocabulary of [21st.dev](https://21st.dev) (card stacks, hover previews, compact navigation) and the project-focused clarity of [Brittany Chiang’s portfolio](https://brittanychiang.com). No components, source code, or artwork were copied from those sites.

- Selectable hero project stack.
- Custom CSS interface studies for three real public projects.
- Responsive project cards with category filters.
- Pointer-based card tilt and scroll-entry animation.
- Native browser animation APIs and CSS transforms; no animation or WebGL dependency.
- Motion toggle and operating-system reduced-motion support.
- Keyboard-accessible mobile navigation with Escape dismissal.
- Contact form validation and email-draft creation.
- Clipboard feedback, including a manual fallback if access is denied.
- Four pre-rendered routes, metadata, and security headers.
- No analytics, trackers, backend data collection, stock testimonials, or invented career claims.

### Fonts

The system font stack uses San Francisco on Apple devices when available. Helvetica Neue and Arial are fallbacks. Apple’s proprietary SF Pro files are not redistributed.

### Contact behaviour

The contact form **does not send messages**. It prepares an encoded `mailto:` draft that the visitor opens, reviews, and sends using their email application. Direct email and social links are always available.

### Project artwork

The previews are illustrative interface studies, not screenshots. Financial and attendance values are clearly marked as demo data. They are not statements about the author’s finances or academic records.

## Run

Requires Node.js 20.9 or later.

```text
npm ci
npm run dev
```

Open http://localhost:3000.

Production:

```text
npm run build
npm start
```

## Structure

```text
app/
  layout.js
  page.js
  globals.css
  about/page.js
  projects/page.js
  contact/page.js
  not-found.js
components/
  data.js
  interactions.js
  previews.js
  site.js
tests/
  browser.py
screenshots/
next.config.mjs
package.json
```

## Verification

With Python Playwright and Chromium installed, start the production server and run:

```text
python tests/browser.py
```

Set `PORTFOLIO_BASE_URL` to test a live deployment instead of localhost. Browser tests cover page responses, responsive overflow, local routes, mobile navigation, keyboard access, hero previews, project filters, form validation, draft generation, clipboard success/failure feedback, motion preferences, and the no-JavaScript content fallback. The test captures the four required portfolio screenshots.

## Content and author

**Tejas J Solanki** · Rajkot, Gujarat, India  
Email: tejassolanki5881@gmail.com  
GitHub: https://github.com/Tejas3545  
LinkedIn: https://www.linkedin.com/in/tejas-j-solanki2476/

Content is based on the author’s public GitHub profile and the SyncSpend, Atmiya IT Portal, and Money Heist Quiz repositories, reviewed on 30 October 2026. LinkedIn was available only through search indexing; unverified employment claims and dates are excluded.

## Assignment scope

This is the **portfolio** assignment, rebuilt in Next.js at the author’s request. The original Week 1 PDF specifies HTML/CSS and approval for external UI libraries; confirm that a React/Next.js submission is accepted by the coordinator. This repository does not claim completion of the separate business landing page or CSS challenge assignments.

## Publication

- Live: **https://tejasjsolanki.vercel.app**
- Source: **https://github.com/Tejas3545/tejasjsolanki**

Production build and the full browser suite passed locally and on the public Vercel deployment on 30 October 2026. All four routes were checked at 320, 390, 768, and 1440 pixels. Interaction, reduced-motion, clipboard fallback, email-draft, mobile navigation, no-JavaScript content, and 404 checks passed with no browser script errors.

### Screenshots

- [Desktop homepage](screenshots/home-desktop.png)
- [Mobile homepage](screenshots/home-mobile.png)
- [Projects](screenshots/projects.png)
- [Contact](screenshots/contact.png)

Deploy updates from this folder using `vercel --prod`. GitHub pushes alone do not guarantee deployment unless the Git integration is connected in Vercel.
