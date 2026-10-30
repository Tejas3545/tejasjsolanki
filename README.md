# Tejas J Solanki — Personal Developer Portfolio

A developer portfolio and engineering showcase engineered with **Next.js App Router (v16), React 19, and Modern CSS**.

- **Live Deployment**: [https://tejasjsolanki.vercel.app](https://tejasjsolanki.vercel.app)
- **Source Repository**: [https://github.com/Tejas3545/tejasjsolanki](https://github.com/Tejas3545/tejasjsolanki)
- **Internship**: WeIntern Pvt Ltd — Week 1 Frontend Engineering Task

---

## Design System & Inspiration

The design combines the tactile, editorial feel of a **lightweight notebook page** with the high-contrast precision of **studio dark mode**. 
Inspired by the interaction patterns of [21st.dev](https://21st.dev), the clean portfolio architecture of [Purv Kabaria](https://purvkabaria.netlify.app/), and developer portfolio structures:

- **Typography**: Apple SF Pro system font stack (`-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui`).
- **Dual Theme Support**:
  - **Notebook Page (Light Mode)**: Warm linen/paper tones (`#f7f6f2`), graphite text, terracotta orange accents (`#bd441e`), botanical sage (`#4e6a43`), and warm ochre.
  - **Studio Obsidian (Dark Mode)**: Deep carbon obsidian (`#0e1110`), crisp contrast, and subtle borders inspired by modern developer tooling.
- **Zero AI Slop**: No generic blue-purple gradient washes, no robotic AI emojis, no boilerplate copy. Pure hand-crafted CSS Grid, Flexbox, and native browser animations.
- **Micro-Interactions & Smoothness**:
  - Interactive 3D tilt hero workbench with preview switcher.
  - Smooth tab switching across tech stack categories and project filters.
  - Pulsing status availability indicator ("Available for internships & developer roles").
  - Accessible reduced-motion toggle with persistent storage and system preference detection.

---

## Key Features

1. **Direct Instant Messaging & Communications Hub**:
   - Replaced clunky email-copy buttons with direct, frictionless communication paths.
   - **Direct WhatsApp Chat**: One-click instant WhatsApp chat with pre-formatted message generation for immediate mobile-to-mobile replies.
   - **Direct Email Dispatch**: Real-time form submission directly to `tejassolanki5881@gmail.com` with spam trap protection and instant feedback.
   - **Verified Channels**: Direct access to LinkedIn profile and GitHub repositories.
2. **Experience & Journey Timeline**:
   - Web Development Intern @ **WeIntern Pvt Ltd** (Semantic web architectures, CSS layout systems, responsive UI components).
   - B.Tech in Information Technology @ **Atmiya University** (Rajkot, Gujarat — core CS, Android SDK, and database systems).
3. **Engineering Project Showcases**:
   - **SyncSpend**: Native Android personal finance app built with Kotlin, Jetpack Compose, Room SQLite, and WorkManager (100% offline-first).
   - **Atmiya IT Portal**: Student attendance and academic analytics dashboard built with Python, Flask, JavaScript, and Excel data ingestion.
   - **Money Heist Quiz**: Interactive game experiment built with TypeScript and deployed on Vercel.
4. **Responsive Across All Viewports**:
   - Zero horizontal overflow across 320px, 390px, 768px, 1080px, and 1440px screens.
   - Mobile navigation drawer with keyboard Escape dismissal.
   - Touch-friendly inputs and buttons.

---

## File Structure

```text
tejasjsolanki/
├── app/
│   ├── layout.js          # Root layout with ThemeProvider, MotionProvider, SEO metadata
│   ├── page.js            # Home: Hero studio, stats, experience timeline, work, toolkit, contact
│   ├── globals.css        # Comprehensive CSS: Light notebook & dark studio themes, SF Pro font
│   ├── about/
│   │   └── page.js        # Developer story, Atmiya University journey, core engineering principles
│   ├── projects/
│   │   └── page.js        # Filterable project showcase, architecture breakdowns, live links
│   ├── contact/
│   │   └── page.js        # Direct WhatsApp and Email messaging hub, FAQs
│   └── not-found.js       # 404 error page
├── components/
│   ├── data.js            # Developer bio, stats, experience, tech stack categories, projects data
│   ├── interactions.js    # ThemeToggle, MotionToggle, HeroStudio, ProjectCollection, DirectContactHub
│   ├── previews.js        # Custom CSS UI mockups (SyncSpend, Atmiya Portal, Money Heist Quiz)
│   └── site.js            # Header, Footer, Section labels, and container helpers
├── screenshots/           # Acceptance test output screenshots
│   ├── home-desktop.png   # Full desktop home view (1440px)
│   ├── home-mobile.png    # Mobile view (390px)
│   ├── projects.png       # Projects section view (1440px)
│   └── contact.png        # Direct messaging and contact view (1440px)
├── tests/
│   └── browser.py         # Automated Playwright acceptance test suite and screenshot generator
├── next.config.mjs
└── package.json
```

---

## Local Setup & Development

Prerequisites: Node.js 20.9+ (Turbopack supported).

```bash
# Navigate to the project directory
cd tejasjsolanki

# Install dependencies
npm install

# Start local development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

### Production Build

```bash
npm run build
npm start
```

### Running Automated Acceptance Tests

```bash
python tests/browser.py
```

Tests verify:
- HTTP 200 on all routes (`/`, `/about`, `/projects`, `/contact`)
- Zero horizontal layout overflow across 320px, 390px, 768px, 1440px viewports
- Interactive preview switcher on the hero workbench
- Category filtering for projects
- Direct WhatsApp and Email form action triggers
- Theme switching and motion pause persistence
- Automatic high-resolution screenshot generation into `screenshots/`

---

## Author & Contact Details

- **Name**: Tejas J Solanki
- **Location**: Rajkot, Gujarat, India
- **University**: Atmiya University (B.Tech Information Technology)
- **Email**: tejassolanki5881@gmail.com
- **GitHub**: [https://github.com/Tejas3545](https://github.com/Tejas3545)
- **LinkedIn**: [https://www.linkedin.com/in/tejas-j-solanki2476/](https://www.linkedin.com/in/tejas-j-solanki2476/)
- **Live Portfolio**: [https://tejasjsolanki.vercel.app](https://tejasjsolanki.vercel.app)
