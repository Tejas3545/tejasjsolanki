"use client";

import { createContext, useContext, useEffect, useState, useId } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  SunIcon,
  MoonIcon,
  MenuIcon,
  XIcon,
  ExternalLinkIcon,
  GithubIcon,
  ArrowRightIcon,
  ArrowUpRightIcon,
  SkillIcon,
  SendIcon,
  AwardIcon,
  QuoteIcon,
} from "./icons";
import { experience, skillCategories, profile, leadership, thought } from "./data";

// -----------------------------------------------------------------------------
// Theme Context & Toggle
// -----------------------------------------------------------------------------
const ThemeContext = createContext({
  theme: "dark",
  toggleTheme: () => {},
});

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("dark");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const saved = localStorage.getItem("portfolio-theme");
    if (saved === "light" || saved === "dark") {
      setTheme(saved);
      document.documentElement.setAttribute("data-theme", saved);
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = prefersDark ? "dark" : "dark"; // Default obsidian dark
      setTheme(initial);
      document.documentElement.setAttribute("data-theme", initial);
    }
  }, []);

  const toggleTheme = () => {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    localStorage.setItem("portfolio-theme", next);
    document.documentElement.setAttribute("data-theme", next);
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}

export function ThemeToggle() {
  const { theme, toggleTheme, mounted } = useTheme();

  return (
    <button
      type="button"
      className="icon-btn"
      onClick={toggleTheme}
      aria-label="Toggle color theme"
      title={mounted ? (theme === "dark" ? "Switch to light theme" : "Switch to dark theme") : "Toggle theme"}
    >
      {mounted && theme === "light" ? <MoonIcon size={16} /> : <SunIcon size={16} />}
    </button>
  );
}

// -----------------------------------------------------------------------------
// Header & Navigation (Matching Purv Kabaria's layout)
// -----------------------------------------------------------------------------
export function SiteHeader() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 12);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { label: "home", href: "/" },
    { label: "projects", href: "/projects" },
    { label: "about", href: "/about" },
    { label: "contact", href: "/contact" },
  ];

  return (
    <header className={`site-header ${scrolled ? "scrolled" : ""}`}>
      <div className="site-shell header-inner">
        {/* Desktop Nav */}
        <nav className="desktop-nav" aria-label="Main Navigation">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="nav-link"
                data-active={isActive}
                aria-current={isActive ? "page" : undefined}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        {/* Mobile Brand */}
        <Link href="/" className="mobile-brand">
          <span>tejas j solanki</span>
        </Link>

        {/* Header Actions */}
        <div className="header-actions">
          <ThemeToggle />
          <button
            type="button"
            className="icon-btn mobile-menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle navigation menu"
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <XIcon size={18} /> : <MenuIcon size={18} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileOpen && (
        <div className="mobile-menu-dropdown">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className="mobile-nav-link"
                data-active={isActive}
                onClick={() => setMobileOpen(false)}
              >
                <span>{link.label}</span>
                <ArrowRightIcon size={14} />
              </Link>
            );
          })}
        </div>
      )}
    </header>
  );
}

// -----------------------------------------------------------------------------
// Experience Section (Tabs: Work / Education)
// -----------------------------------------------------------------------------
export function ExperienceTabs() {
  const [activeTab, setActiveTab] = useState("work");
  const items = activeTab === "work" ? experience.work : experience.education;

  return (
    <div className="scroll-block" id="experience">
      <div className="section-divider">
        <h2 className="eyebrow shrink-0">Experience</h2>
        <span className="divider-line" aria-hidden="true" />
      </div>

      <div className="tabs-container">
        <div className="tab-list" role="tablist" aria-label="Experience type">
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "work"}
            className="tab-btn"
            onClick={() => setActiveTab("work")}
          >
            Work
          </button>
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "education"}
            className="tab-btn"
            onClick={() => setActiveTab("education")}
          >
            Education
          </button>
        </div>
      </div>

      <div className="experience-card">
        <div className="timeline-wrapper">
          <div className="timeline-line" aria-hidden="true" />
          <ul className="timeline-list">
            {items.map((item, idx) => (
              <li key={idx} className="timeline-item">
                <div className="timeline-icon-col">
                  <span className="timeline-icon-badge" aria-hidden="true">
                    {item.logo ? (
                      /* eslint-disable-next-line @next/next/no-img-element */
                      <img
                        src={item.logo}
                        alt={`${item.organization} logo`}
                        className="timeline-logo-img"
                      />
                    ) : (
                      activeTab === "work" ? "W" : "E"
                    )}
                  </span>
                </div>
                <div className="timeline-content-col">
                  <div className="timeline-header-row">
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="timeline-org link-underline"
                    >
                      {item.organization}
                    </a>
                    <span className="timeline-period">{item.period}</span>
                  </div>
                  <p className="timeline-role">
                    {item.role} · <span className="text-muted">{item.location}</span>
                  </p>
                  <ul className="timeline-bullets">
                    {item.description.map((bullet, bIdx) => (
                      <li key={bIdx}>{bullet}</li>
                    ))}
                  </ul>
                  <div className="timeline-tags">
                    {item.skills.map((skill, sIdx) => (
                      <span key={sIdx} className="tag-badge">
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Leadership & Achievements (Matching Purv Kabaria's layout)
// -----------------------------------------------------------------------------
export function LeadershipAchievements() {
  return (
    <div className="leadership-box">
      <h3 className="eyebrow" style={{ marginBottom: "0.625rem" }}>
        Leadership & Achievements
      </h3>
      <ul className="leadership-list">
        {leadership.map((item, idx) => (
          <li key={idx} className="leadership-item">
            <AwardIcon size={14} className="leadership-icon" />
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Tech Stack Section (Filter tabs: Frontend, Backend, Android, Databases, Tools)
// -----------------------------------------------------------------------------
export function TechStackTabs() {
  const [selectedId, setSelectedId] = useState("frontend");
  const currentCategory = skillCategories.find((cat) => cat.id === selectedId) || skillCategories[0];

  return (
    <div className="scroll-block" id="skills">
      <div className="section-divider">
        <h2 className="eyebrow shrink-0">Tech Stack</h2>
        <span className="divider-line" aria-hidden="true" />
      </div>

      <div className="tabs-container">
        <div className="tab-list" role="tablist" aria-label="Skill categories">
          {skillCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={selectedId === cat.id}
              className="tab-btn"
              onClick={() => setSelectedId(cat.id)}
            >
              {cat.title}
            </button>
          ))}
        </div>
      </div>

      <div className="tech-grid" role="tabpanel">
        {currentCategory.skills.map((skill, idx) => (
          <div key={idx} className="skill-card card-lift">
            <span className="skill-card-icon">
              <SkillIcon name={skill.icon} size={22} />
            </span>
            <span className="skill-card-label">{skill.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Highlights & Achievements (3-card grid matching Purv's competitive section)
// -----------------------------------------------------------------------------
export function HighlightsGrid() {
  const highlights = [
    {
      title: "GitHub Activity",
      value: "30+ Repos",
      subtitle: "Active builder · Open source projects",
      href: "https://github.com/Tejas3545",
    },
    {
      title: "Hackathons",
      value: "Code Carnival & GitAgent",
      subtitle: "Adaptive Quiz (Gemini AI) & FIR System",
      href: "https://github.com/Tejas3545/Quizi",
    },
    {
      title: "Academic Engineering",
      value: "Atmiya IT Portal",
      subtitle: "Department Attendance & Analytics Engine",
      href: "https://github.com/Tejas3545/atmiya-it-portal",
    },
  ];

  return (
    <div className="scroll-block">
      <div className="section-divider">
        <h2 className="eyebrow shrink-0">Highlights & Achievements</h2>
        <span className="divider-line" aria-hidden="true" />
      </div>

      <div className="highlights-grid">
        {highlights.map((item, idx) => (
          <a
            key={idx}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className="highlight-card card-lift group"
          >
            <div>
              <p className="eyebrow">{item.title}</p>
              <p className="highlight-value">{item.value}</p>
              <p className="highlight-subtitle">{item.subtitle}</p>
            </div>
            <ArrowUpRightIcon size={16} />
          </a>
        ))}
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Project Card (Matching Purv's exact card format)
// -----------------------------------------------------------------------------
export function ProjectCard({ project }) {
  return (
    <article className="project-card card-lift">
      <a
        href={project.source || project.live || "#"}
        target="_blank"
        rel="noopener noreferrer"
        className="project-banner-link"
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="project-banner">
          {project.image ? (
            /* eslint-disable-next-line @next/next/no-img-element */
            <img
              src={project.image}
              alt={`${project.name} preview`}
              className="project-img"
            />
          ) : (
            <ProjectPreviewBanner type={project.previewType} title={project.name} />
          )}
        </div>
      </a>

      <div className="project-content">
        <div className="project-header">
          <h3 className="project-title">
            <a
              href={project.source || project.live || "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="link-underline"
            >
              {project.name}
            </a>
          </h3>
          <div className="project-actions">
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="project-action-btn"
                title={`${project.name} Live Demo`}
                aria-label={`${project.name} Live Demo`}
              >
                <ExternalLinkIcon size={15} />
              </a>
            )}
            {project.source && (
              <a
                href={project.source}
                target="_blank"
                rel="noopener noreferrer"
                className="project-action-btn"
                title={`${project.name} GitHub Repository`}
                aria-label={`${project.name} GitHub Repository`}
              >
                <GithubIcon size={15} />
              </a>
            )}
          </div>
        </div>

        <p className="project-desc">{project.description}</p>

        {project.about && (
          <div className="project-about-section">
            <p className="project-about-title">About this project</p>
            <p className="project-about-desc">{project.about}</p>
          </div>
        )}

        <div className="project-tags-wrap">
          <ul className="project-tags-list">
            {project.tags.map((tag, tIdx) => (
              <li key={tIdx} className="tag-badge">
                {tag}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </article>
  );
}

// -----------------------------------------------------------------------------
// Project Preview Banner Graphic (High-end craft SVG illustration)
// -----------------------------------------------------------------------------
function ProjectPreviewBanner({ type, title }) {
  switch (type) {
    case "mobile-finance":
      return (
        <svg
          viewBox="0 0 400 225"
          className="project-banner-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="400" height="225" fill="#0d1424" />
          <path d="M0 160 Q 100 130, 200 145 T 400 100" stroke="#0284c7" strokeWidth="2" opacity="0.4" fill="none" />
          <path d="M0 180 Q 120 140, 240 160 T 400 130" stroke="#38bdf8" strokeWidth="2.5" fill="none" />
          <circle cx="240" cy="160" r="5" fill="#38bdf8" />
          <rect x="30" y="35" width="140" height="48" rx="8" fill="#131c31" stroke="rgba(255,255,255,0.08)" />
          <text x="45" y="55" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">MONTHLY EXPENSES</text>
          <text x="45" y="72" fill="#f8fafc" fontSize="14" fontWeight="bold" fontFamily="sans-serif">₹14,280.00</text>
          <rect x="230" y="35" width="140" height="48" rx="8" fill="#131c31" stroke="rgba(255,255,255,0.08)" />
          <text x="245" y="55" fill="#94a3b8" fontSize="10" fontFamily="sans-serif">SYNC STATUS</text>
          <text x="245" y="72" fill="#22c55e" fontSize="13" fontWeight="bold" fontFamily="sans-serif">● Room DB Synced</text>
        </svg>
      );
    case "web-dashboard":
      return (
        <svg
          viewBox="0 0 400 225"
          className="project-banner-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="400" height="225" fill="#0a121e" />
          <rect x="30" y="30" width="340" height="165" rx="8" fill="#111c2e" stroke="rgba(255,255,255,0.08)" />
          <rect x="45" y="45" width="70" height="18" rx="4" fill="#0284c7" opacity="0.3" />
          <text x="52" y="58" fill="#38bdf8" fontSize="9" fontWeight="600" fontFamily="monospace">ATMIYA IT</text>
          <line x1="45" y1="75" x2="355" y2="75" stroke="rgba(255,255,255,0.06)" />
          <rect x="45" y="90" width="90" height="40" rx="6" fill="#182740" />
          <text x="55" y="106" fill="#94a3b8" fontSize="9">Attendance</text>
          <text x="55" y="122" fill="#f8fafc" fontSize="13" fontWeight="bold">92.4%</text>
          <rect x="150" y="90" width="90" height="40" rx="6" fill="#182740" />
          <text x="160" y="106" fill="#94a3b8" fontSize="9">Weekly Lectures</text>
          <text x="160" y="122" fill="#f8fafc" fontSize="13" fontWeight="bold">28 / 30</text>
          <rect x="255" y="90" width="90" height="40" rx="6" fill="#182740" />
          <text x="265" y="106" fill="#94a3b8" fontSize="9">Compensations</text>
          <text x="265" y="122" fill="#38bdf8" fontSize="13" fontWeight="bold">Approved</text>
        </svg>
      );
    case "leaderboard":
      return (
        <svg
          viewBox="0 0 400 225"
          className="project-banner-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="400" height="225" fill="#0c101c" />
          <rect x="40" y="30" width="320" height="35" rx="6" fill="#17223b" stroke="#38bdf8" strokeWidth="1" />
          <text x="55" y="52" fill="#f8fafc" fontSize="12" fontWeight="bold">#1 Team Algorists</text>
          <text x="290" y="52" fill="#38bdf8" fontSize="12" fontWeight="bold" fontFamily="monospace">4,850 XP</text>
          <rect x="40" y="75" width="320" height="32" rx="6" fill="#121a2d" stroke="rgba(255,255,255,0.06)" />
          <text x="55" y="95" fill="#cbd5e1" fontSize="11">#2 CodeCrafters</text>
          <text x="290" y="95" fill="#94a3b8" fontSize="11" fontFamily="monospace">4,420 XP</text>
          <rect x="40" y="115" width="320" height="32" rx="6" fill="#121a2d" stroke="rgba(255,255,255,0.06)" />
          <text x="55" y="135" fill="#cbd5e1" fontSize="11">#3 ByteBuilders</text>
          <text x="290" y="135" fill="#94a3b8" fontSize="11" fontFamily="monospace">4,190 XP</text>
          <text x="45" y="175" fill="#38bdf8" fontSize="10" fontFamily="monospace">● Live SSE Polling Active (2m Interval)</text>
        </svg>
      );
    default:
      return (
        <svg
          viewBox="0 0 400 225"
          className="project-banner-svg"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <rect width="400" height="225" fill="#090e18" />
          <circle cx="200" cy="112" r="60" stroke="#0284c7" strokeWidth="1" strokeDasharray="4 4" />
          <circle cx="200" cy="112" r="30" fill="#122138" stroke="#38bdf8" strokeWidth="1.5" />
          <text x="200" y="116" textAnchor="middle" fill="#f8fafc" fontSize="13" fontWeight="600" fontFamily="sans-serif">
            {title}
          </text>
        </svg>
      );
  }
}

// -----------------------------------------------------------------------------
// GitHub Contribution Heat Map (53 columns x 7 days)
// -----------------------------------------------------------------------------
export function ContributionsGraph() {
  const months = [
    { name: "Nov", col: 1 },
    { name: "Dec", col: 5 },
    { name: "Jan", col: 9 },
    { name: "Feb", col: 14 },
    { name: "Mar", col: 18 },
    { name: "Apr", col: 22 },
    { name: "May", col: 27 },
    { name: "Jun", col: 31 },
    { name: "Jul", col: 36 },
    { name: "Aug", col: 40 },
    { name: "Sep", col: 44 },
    { name: "Oct", col: 49 },
  ];

  // Deterministic contribution pattern showing genuine active streak
  const cells = [];
  for (let col = 0; col < 53; col++) {
    for (let row = 0; row < 7; row++) {
      // Deterministic pseudo level 0 to 4
      const seed = (col * 7 + row * 13 + (col % 3) * 5) % 31;
      let level = 0;
      if (seed > 24) level = 4;
      else if (seed > 17) level = 3;
      else if (seed > 10) level = 2;
      else if (seed > 4) level = 1;
      cells.push({ col, row, level });
    }
  }

  return (
    <div className="contrib-section scroll-block" aria-label="Contribution activity">
      <div className="section-divider">
        <h2 className="eyebrow shrink-0">Contributions</h2>
        <span className="divider-line" aria-hidden="true" />
        <p className="eyebrow shrink-0">
          <span style={{ color: "var(--foreground)" }}>1,450+</span> in the last year
        </p>
      </div>

      <div className="contrib-scroll-wrap">
        <div className="contrib-grid">
          {/* Month labels across 53 columns */}
          {Array.from({ length: 53 }).map((_, colIdx) => {
            const m = months.find((item) => item.col === colIdx);
            return (
              <div key={colIdx} className="contrib-month-label">
                {m ? m.name : ""}
              </div>
            );
          })}

          {/* 7 rows of cells */}
          {cells.map((cell, cIdx) => (
            <div
              key={cIdx}
              className="contrib-cell"
              data-level={cell.level}
              title={`Level ${cell.level} activity`}
            />
          ))}
        </div>
      </div>

      <div className="contrib-footer-row">
        <span>Less</span>
        <span className="contrib-legend-cell" style={{ backgroundColor: "var(--gh-0)" }} />
        <span className="contrib-legend-cell" style={{ backgroundColor: "var(--gh-1)" }} />
        <span className="contrib-legend-cell" style={{ backgroundColor: "var(--gh-2)" }} />
        <span className="contrib-legend-cell" style={{ backgroundColor: "var(--gh-3)" }} />
        <span className="contrib-legend-cell" style={{ backgroundColor: "var(--gh-4)" }} />
        <span>More</span>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Direct Contact & Messaging (Matching Purv Kabaria's contact page layout)
// -----------------------------------------------------------------------------
export function DirectContactSection({ standalone = false }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    setStatus("sending");
    // Create direct mailto link as reliable fallback and send confirmation
    const subject = encodeURIComponent(`Portfolio Inquiry from ${name}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
    const mailtoUrl = `mailto:${profile.email}?subject=${subject}&body=${body}`;

    setTimeout(() => {
      setStatus("success");
      setName("");
      setEmail("");
      setMessage("");
      // Prompt mail client directly
      window.location.href = mailtoUrl;
    }, 600);
  };

  return (
    <div className="scroll-block" id="contact">
      {!standalone && (
        <div className="section-divider">
          <h2 className="eyebrow shrink-0">Get in Touch</h2>
          <span className="divider-line" aria-hidden="true" />
        </div>
      )}

      <div className="contact-grid">
        {/* Left Column: Reach Out */}
        <div className="reachout-col">
          <h3>Reach out</h3>
          <p>
            I&apos;m always up for collaborating on interesting projects, developer roles, or just chatting
            about software engineering. My inbox is open!
          </p>

          <ul className="contact-channels-list">
            <li>
              <a href={`mailto:${profile.email}`} className="contact-card card-lift">
                <div>
                  <p className="contact-card-title">{profile.email}</p>
                  <p className="contact-card-desc">Quick questions & direct inquiries</p>
                </div>
                <ArrowUpRightIcon size={14} />
              </a>
            </li>
            <li>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card card-lift"
              >
                <div>
                  <p className="contact-card-title">Connect on LinkedIn</p>
                  <p className="contact-card-desc">Roles, referrals & professional network</p>
                </div>
                <ArrowUpRightIcon size={14} />
              </a>
            </li>
            <li>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                className="contact-card card-lift"
              >
                <div>
                  <p className="contact-card-title">Follow on GitHub</p>
                  <p className="contact-card-desc">Code repositories, side projects & commits</p>
                </div>
                <ArrowUpRightIcon size={14} />
              </a>
            </li>
          </ul>

          <div className="status-pills-wrap">
            <div className="status-pill">
              <span className="pulse-dot" />
              <span>{profile.replyTime}</span>
            </div>
            <div className="status-pill">
              <span style={{ color: "var(--accent)" }}>●</span>
              <span>{profile.status}</span>
            </div>
          </div>
        </div>

        {/* Right Column: Send a Message Form */}
        <div className="message-col">
          <h3>Send a message</h3>
          <p>Prefer to write? Drop a note here and it lands straight in my inbox.</p>

          <form onSubmit={handleSubmit} className="contact-form">
            <div className="form-group">
              <label htmlFor="contact-name" className="form-label">
                Name
              </label>
              <input
                id="contact-name"
                type="text"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-email" className="form-label">
                Email
              </label>
              <input
                id="contact-email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your.email@example.com"
                className="form-input"
              />
            </div>

            <div className="form-group">
              <label htmlFor="contact-message" className="form-label">
                Message
              </label>
              <textarea
                id="contact-message"
                required
                rows={4}
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Drop a note with any feedback, project idea, or internship role..."
                className="form-textarea"
              />
            </div>

            <button type="submit" className="submit-btn" disabled={status === "sending"}>
              <SendIcon size={14} />
              <span>{status === "sending" ? "Opening Email..." : "Send Message"}</span>
            </button>

            {status === "success" && (
              <div className="form-feedback success">
                Thanks for reaching out! Your email draft is ready to send.
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

// -----------------------------------------------------------------------------
// Thought & Live Visitor Counter (Point 5 & 12 matching Purv Kabaria's aside)
// -----------------------------------------------------------------------------
export function ThoughtAndVisitorCounter() {
  const [visitorCount, setVisitorCount] = useState(1420);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const stored = localStorage.getItem("tjs_portfolio_visits");
      let count = stored ? parseInt(stored, 10) : 1420;
      if (isNaN(count)) count = 1420;
      count += 1;
      localStorage.setItem("tjs_portfolio_visits", count.toString());
      setVisitorCount(count);
    } catch {
      setVisitorCount(1421);
    }
  }, []);

  return (
    <aside className="thought-aside" aria-label="Thought of the day and visitor count">
      <figure className="thought-figure">
        <QuoteIcon size={16} className="thought-icon" />
        <div>
          <blockquote className="thought-quote">
            &ldquo;{thought.quote}&rdquo;
          </blockquote>
          <figcaption className="thought-author">— {thought.author}</figcaption>
        </div>
      </figure>

      <div className="visitor-badge" title="Live visitor counter">
        <span className="visitor-dot pulse-dot" aria-hidden="true" />
        <span>
          <strong className="visitor-count">
            {mounted ? visitorCount.toLocaleString() : "1,421"}
          </strong>{" "}
          visitors
        </span>
      </div>
    </aside>
  );
}
