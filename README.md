# Tejas J Solanki — Personal Developer Portfolio

A modern, high-performance personal developer portfolio and engineering showcase built with **Next.js App Router (v16), React 19, and Modern CSS**.

- **Live Deployment**: [https://tejasjsolanki.vercel.app](https://tejasjsolanki.vercel.app)
- **Source Repository**: [https://github.com/Tejas3545/tejasjsolanki](https://github.com/Tejas3545/tejasjsolanki)
- **Organization**: WeIntern Pvt Ltd — Week 1 Frontend Engineering Assignment (Task- 1)

---

## Overview & Design System

The portfolio is designed around a clean, focused developer aesthetic inspired by modern engineering portfolios:

- **Typography**: Apple SF Pro system typography (`-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Text", system-ui`) paired with `JetBrains Mono` for code and metadata accents.
- **Color Palette & Themes**:
  - **Studio Obsidian (Dark Mode)**: Deep carbon obsidian (`#080b11`), slate surfaces, subtle glass borders (`rgba(255, 255, 255, 0.09)`), and electric cyan accents (`#38bdf8`).
  - **Crisp Craft (Light Mode)**: Crisp paper white (`#fbfcfd`), clean slate borders, high contrast text, and deep ocean blue accents (`#0284c7`).
  - Seamless, persistent dark/light theme switching with system preference detection and zero-flicker hydration.
- **Layout Rhythm**: Centered `max-w-3xl` container (`48rem` / `768px`) with balanced section rhythm, horizontal eyebrow dividers, and smooth micro-interactions.

---

## Core Features & Pages

### 1. Home Page (`/`)
- **Hero Banner**: Developer avatar from GitHub, headline, current role, location in Rajkot, academic details at Atmiya University, bio copy, and instant action pills (Resume, LinkedIn, GitHub, Email).
- **Experience & Education**: Interactive segmented tab switcher (`[Work]` and `[Education]`) rendering timeline items with organization badges, roles, dates, engineering bullet points, and technology tags.
- **Tech Stack**: 5-category tab filter (`Frontend`, `Backend`, `Mobile / Android`, `Databases`, `Tools`) displaying skill cards with SVG icons and card-lift hover physics.
- **Highlights & Milestones**: 3-card metric showcase highlighting 30+ public GitHub repositories, hackathon entries, and academic engineering lead roles.
- **Featured Projects**: 2-column responsive grid showcasing featured projects with custom SVG preview banners, external live demo links, source code links, and technology badges.
- **GitHub Contributions**: 53-week contribution heat map with 7 daily rows, month labels, level indicators, and total annual activity.
- **Direct Messaging Hub**: Direct communication channels (Email, LinkedIn, GitHub) alongside a responsive direct message contact form.

### 2. Projects Showcase (`/projects`)
- Filterable project catalog with category tabs: `All`, `Mobile / Android`, `Full-Stack Web`, `Systems & AI`.
- In-depth project cards with preview banners, descriptions, live deployment links, and technology stacks (SyncSpend, Atmiya IT Portal, ADSCHACKATHON, Smart AI Business Assistant, Mega-AI, Quizi, Money Heist Quiz, AgroSense, CRM).

### 3. Contact Page (`/contact`)
- Dedicated contact portal matching the two-column layout.
- Left column: Direct reach-out channels, response availability status badge ("Usually replies within a day"), and role availability badge ("Open to internships & full-time roles").
- Right column: Clean contact form with Name, Email, and Message inputs, client-side validation, and instant dispatch confirmation.

### 4. About Page (`/about`)
- Biography detailing software engineering journey at Atmiya University, practical frontend internship at WeIntern Pvt Ltd, and core engineering philosophy (Offline-First Reliability, Semantic & Accessible UI, Clean Architecture).

---

## File Structure

```text
tejasjsolanki/
├── app/
│   ├── layout.js          # Root layout with ThemeProvider, SEO metadata, SiteHeader, and Footer
│   ├── page.js            # Home page: Hero, ExperienceTabs, TechStackTabs, Projects, Contributions, Contact
│   ├── globals.css        # Responsive CSS: Obsidian Dark & Crisp Light themes, SF Pro typography
│   ├── about/
│   │   └── page.js        # Developer biography, WeIntern internship focus, and engineering principles
│   ├── projects/
│   │   └── page.js        # Full project catalog with category filtering and project cards
│   ├── contact/
│   │   └── page.js        # Dedicated direct contact and messaging page
│   └── not-found.js       # Custom 404 page
├── components/
│   ├── data.js            # Profile, experience, tech stack categories, and project records
│   ├── icons.js           # SVG icon components (Lucide-style & Tech icons)
│   ├── interactions.js    # Client components: ThemeProvider, SiteHeader, Tabs, ProjectCard, Heatmap, Form
│   └── site.js            # Site footer and ProjectsCatalog container
├── public/
│   ├── img/
│   │   └── tejas.jpg      # Profile avatar
│   └── resume.pdf         # Resume PDF document
├── screenshots/           # Acceptance test output screenshots
│   ├── home-desktop.png   # Full desktop home view (1440px)
│   ├── home-mobile.png    # Mobile view (390px)
│   ├── projects.png       # Projects page view (1440px)
│   └── contact.png        # Contact page view (1440px)
├── tests/
│   └── browser.py         # Automated Playwright test suite and screenshot generator
├── next.config.mjs
└── package.json
```

---

## Local Development

Prerequisites: Node.js 20.9+

```bash
# Navigate into the project
cd tejasjsolanki

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000) in your browser.

### Production Build

```bash
npm run build
npm start
```

---

## Quality & Standards

- **Semantic HTML5**: Native semantic tags (`<header>`, `<nav>`, `<main>`, `<section>`, `<article>`, `<dl>`, `<footer>`).
- **Responsive Layout**: Zero horizontal overflow from 320px mobile screens to large desktop monitors.
- **Accessibility**: Keyboard navigable, visible focus rings (`:focus-visible`), alt attributes, and screen reader skip links.
- **Fast Performance**: Statically prerendered pages via Next.js App Router for instant page transitions.
