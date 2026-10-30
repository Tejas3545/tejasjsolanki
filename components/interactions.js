"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useId, useRef, useState } from "react";
import { projects, profile, stats, skillCategories, experience } from "./data";
import { ProjectPreview } from "./previews";

/* ---------------- Theme & Motion Contexts ---------------- */

const ThemeContext = createContext({ theme: "light", toggleTheme: () => {} });
const MotionContext = createContext({ paused: false, toggleMotion: () => {} });

export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState("light");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    let saved = null;
    try {
      saved = localStorage.getItem("tjs-theme");
    } catch {}
    if (saved === "dark" || saved === "light") {
      setTheme(saved);
      document.documentElement.dataset.theme = saved;
    } else {
      const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
      const initial = prefersDark ? "dark" : "light";
      setTheme(initial);
      document.documentElement.dataset.theme = initial;
    }
    setMounted(true);
  }, []);

  function toggleTheme() {
    setTheme((prev) => {
      const next = prev === "light" ? "dark" : "light";
      try {
        localStorage.setItem("tjs-theme", next);
      } catch {}
      document.documentElement.dataset.theme = next;
      return next;
    });
  }

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, mounted }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function MotionProvider({ children }) {
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stored = null;
    try {
      stored = localStorage.getItem("tjs-motion");
    } catch {}
    setPaused(media.matches || stored === "paused");

    const change = (event) => setPaused(event.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);

  useEffect(() => {
    document.documentElement.dataset.motion = paused ? "paused" : "active";
  }, [paused]);

  function toggleMotion() {
    setPaused((prev) => {
      const next = !prev;
      try {
        localStorage.setItem("tjs-motion", next ? "paused" : "active");
      } catch {}
      return next;
    });
  }

  return (
    <MotionContext.Provider value={{ paused, toggleMotion }}>
      {children}
    </MotionContext.Provider>
  );
}

export function ThemeToggle() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const isDark = theme === "dark";

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light notebook" : "dark studio"} mode`}
      title={`Switch to ${isDark ? "Light" : "Dark"} theme`}
    >
      <span className="theme-icon" aria-hidden="true">
        {isDark ? (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <circle cx="12" cy="12" r="5" />
            <line x1="12" y1="1" x2="12" y2="3" />
            <line x1="12" y1="21" x2="12" y2="23" />
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
            <line x1="1" y1="12" x2="3" y2="12" />
            <line x1="21" y1="12" x2="23" y2="12" />
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
          </svg>
        ) : (
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
          </svg>
        )}
      </span>
      <span className="theme-label">{isDark ? "Light" : "Dark"}</span>
    </button>
  );
}

export function MotionToggle() {
  const { paused, toggleMotion } = useContext(MotionContext);
  return (
    <button
      className="motion-toggle"
      onClick={toggleMotion}
      aria-pressed={paused}
    >
      <span className={paused ? "motion-indicator paused" : "motion-indicator"} aria-hidden="true">
        <i /><i /><i />
      </span>
      Motion {paused ? "off" : "on"}
    </button>
  );
}

/* ---------------- Navigation Header ---------------- */

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    function handleEscape(event) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [open]);

  return (
    <header className="header-shell">
      <div className="site-header container">
        <Link href="/" className="wordmark" aria-label="Tejas J Solanki, Homepage">
          tjs<span className="brand-dot">.</span>
        </Link>

        <nav className={`nav-pill ${open ? "menu-open" : ""}`} id="main-nav" aria-label="Main navigation">
          {[
            ["/", "Home"],
            ["/projects", "Projects"],
            ["/about", "About & Journey"],
            ["/contact", "Contact & Chat"],
          ].map(([href, label]) => (
            <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>
              {label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <ThemeToggle />
          <Link href="/contact" className="header-contact">
            Let’s talk <span aria-hidden="true">↗</span>
          </Link>
          <button
            className="menu-button"
            ref={menuButton}
            aria-controls="main-nav"
            aria-expanded={open}
            onClick={() => setOpen(!open)}
            aria-label={open ? "Close menu" : "Open menu"}
          >
            {open ? "Close" : "Menu"}
            <span aria-hidden="true">{open ? "✕" : "☰"}</span>
          </button>
        </div>
      </div>
    </header>
  );
}

/* ---------------- Scroll Reveal & Physics Tilt ---------------- */

export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const { paused } = useContext(MotionContext);

  useEffect(() => {
    const element = ref.current;
    if (!element || paused || !("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          element.animate(
            [
              { opacity: 0.2, transform: "translateY(22px)" },
              { opacity: 1, transform: "translateY(0)" },
            ],
            {
              duration: 650,
              delay,
              easing: "cubic-bezier(0.16, 1, 0.3, 1)",
              fill: "backwards",
            }
          );
          observer.disconnect();
        }
      },
      { threshold: 0.06 }
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      element.getAnimations().forEach((anim) => anim.cancel());
    };
  }, [delay, paused]);

  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export function Tilt({ children, className = "" }) {
  const { paused } = useContext(MotionContext);
  const ref = useRef(null);
  const frame = useRef(null);

  useEffect(() => () => cancelAnimationFrame(frame.current), []);

  function handleMove(event) {
    if (paused || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;

    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      ref.current?.style.setProperty("--tilt-x", `${-y * 6}deg`);
      ref.current?.style.setProperty("--tilt-y", `${x * 6}deg`);
    });
  }

  function handleReset() {
    cancelAnimationFrame(frame.current);
    ref.current?.style.setProperty("--tilt-x", "0deg");
    ref.current?.style.setProperty("--tilt-y", "0deg");
  }

  return (
    <div
      ref={ref}
      className={`tilt ${className}`}
      onPointerMove={handleMove}
      onPointerLeave={handleReset}
    >
      {children}
    </div>
  );
}

/* ---------------- Hero Interactive Studio ---------------- */

export function HeroStudio() {
  const [active, setActive] = useState(0);
  const project = projects[active];

  return (
    <div className="hero-studio">
      <div className="studio-top">
        <span className="studio-label">
          <i /> INTERACTIVE BENCH
        </span>
        <span className="studio-edition">VOL. 01 — ARCHITECTURE STUDY</span>
      </div>

      <div className="studio-stage">
        <div className="stack-sheet sheet-back" />
        <div className="stack-sheet sheet-mid" />
        <Tilt className={`studio-card studio-${project.id}`}>
          <div key={project.id} className="studio-preview">
            <ProjectPreview kind={project.id} compact />
          </div>
        </Tilt>
        <span className="studio-sticker">
          crafted<br />to work.
        </span>
      </div>

      <div className="studio-bottom">
        <div className="studio-project" aria-live="polite">
          <span>{project.number} / LIVE DEMO STUDY</span>
          <strong>{project.name}</strong>
        </div>
        <div className="studio-controls" role="group" aria-label="Preview a project">
          {projects.map((item, index) => (
            <button
              key={item.id}
              onClick={() => setActive(index)}
              aria-label={`Preview ${item.name}`}
              aria-pressed={active === index}
            >
              {item.number}
            </button>
          ))}
        </div>
      </div>
      <p className="studio-hint">
        Switch projects above to inspect interactive component architectures.
      </p>
    </div>
  );
}

/* ---------------- Stats Strip ---------------- */

export function StatsStrip() {
  return (
    <div className="stats-strip">
      {stats.map((s) => (
        <div key={s.label} className="stat-item">
          <strong className="stat-value">{s.value}</strong>
          <span className="stat-label">{s.label}</span>
        </div>
      ))}
    </div>
  );
}

/* ---------------- Project Collection with Category Filtering ---------------- */

export function ProjectCollection({ featured = false }) {
  const [filter, setFilter] = useState("all");

  const filtered = projects.filter((p) => {
    if (filter === "all") return true;
    return p.category === filter;
  });

  const list = featured ? filtered.slice(0, 3) : filtered;

  return (
    <div className="projects-container">
      {!featured && (
        <div className="filter-row">
          <div className="project-filters" role="group" aria-label="Filter projects by category">
            {[
              ["all", "All Projects", "03"],
              ["mobile", "Android / Mobile", "01"],
              ["web", "Web & Full-Stack", "02"],
            ].map(([val, label, count]) => (
              <button
                key={val}
                onClick={() => setFilter(val)}
                aria-pressed={filter === val}
              >
                {label}
                <span className="filter-badge">{count}</span>
              </button>
            ))}
          </div>
          <span className="filter-count" role="status">
            {list.length} {list.length === 1 ? "project" : "projects"} showing
          </span>
        </div>
      )}

      <div className="project-collection">
        {list.map((project, index) => (
          <Reveal key={project.id} delay={index * 90}>
            <article className={`project-case case-${project.id}`}>
              <a
                className="case-preview"
                href={project.live || project.source}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${project.name} ${project.live ? "live project" : "source repository"}`}
              >
                <ProjectPreview kind={project.id} />
                <span className="preview-open" aria-hidden="true">↗</span>
              </a>

              <div className="case-copy">
                <div className="case-eyebrow">
                  <span className="case-discipline">{project.discipline}</span>
                  <span className="case-num">/{project.number}</span>
                </div>

                <h3 className="case-title">{project.name}</h3>
                <p className="case-tagline">{project.tagline}</p>
                <p className="case-desc">{project.description}</p>

                {project.architecture && (
                  <ul className="case-highlights">
                    {project.architecture.map((item, i) => (
                      <li key={i}>{item}</li>
                    ))}
                  </ul>
                )}

                <ul className="tag-list" aria-label={`${project.name} technology stack`}>
                  {project.tags.map((tag) => (
                    <li key={tag}>{tag}</li>
                  ))}
                </ul>

                <div className="case-actions">
                  <a
                    className="case-btn case-btn-code"
                    href={project.source}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    View Source <span aria-hidden="true">↗</span>
                  </a>
                  {project.live && (
                    <a
                      className="case-btn case-btn-live"
                      href={project.live}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Live Demo <span aria-hidden="true">↗</span>
                    </a>
                  )}
                </div>

                <div className="case-footer">
                  <span className="case-detail-note">{project.detail}</span>
                </div>
              </div>
            </article>
          </Reveal>
        ))}
      </div>
    </div>
  );
}

/* ---------------- Tech Stack Panel ---------------- */

export function TechStackPanel() {
  const id = useId();
  const [active, setActive] = useState(0);
  const current = skillCategories[active];

  function handleKey(event, index) {
    const total = skillCategories.length;
    const keys = {
      ArrowRight: (index + 1) % total,
      ArrowLeft: (index + total - 1) % total,
      Home: 0,
      End: total - 1,
    };
    if (event.key in keys) {
      event.preventDefault();
      const next = keys[event.key];
      setActive(next);
      document.getElementById(`${id}-tab-${next}`)?.focus();
    }
  }

  return (
    <div className="skills-panel">
      <div className="skills-tabs" role="tablist" aria-label="Technology specializations">
        {skillCategories.map((cat, index) => (
          <button
            id={`${id}-tab-${index}`}
            key={cat.id}
            role="tab"
            aria-selected={active === index}
            aria-controls={`${id}-panel`}
            tabIndex={active === index ? 0 : -1}
            onClick={() => setActive(index)}
            onKeyDown={(e) => handleKey(e, index)}
          >
            {cat.title}
            <span className="skills-tab-num">0{index + 1}</span>
          </button>
        ))}
      </div>

      <div
        className={`skills-content skills-${current.id}`}
        id={`${id}-panel`}
        role="tabpanel"
        aria-labelledby={`${id}-tab-${active}`}
        tabIndex={0}
      >
        <p className="skills-summary">{current.summary}</p>
        <ul className="skills-grid">
          {current.skills.map((skill, index) => (
            <li key={skill.name} style={{ "--item-order": index }}>
              <span className="skill-initial" aria-hidden="true">
                {skill.name.slice(0, 2)}
              </span>
              <div className="skill-meta">
                <strong className="skill-name">{skill.name}</strong>
                <span className="skill-level">{skill.level}</span>
              </div>
            </li>
          ))}
        </ul>
        <span className="skills-note">
          Verified through real repository code, ongoing studies, and internship deliverables.
        </span>
      </div>
    </div>
  );
}

/* ---------------- Experience & Education Timeline ---------------- */

export function ExperienceTimeline() {
  return (
    <div className="timeline-grid">
      {experience.map((item, index) => (
        <Reveal delay={index * 100} key={item.role}>
          <article className="timeline-card">
            <div className="timeline-header">
              <span className="timeline-type">{item.type}</span>
              <span className="timeline-period">{item.period}</span>
            </div>
            <h3 className="timeline-role">{item.role}</h3>
            <p className="timeline-org">
              <strong>{item.organization}</strong> · <span>{item.location}</span>
            </p>
            <p className="timeline-desc">{item.description}</p>
            <ul className="timeline-highlights">
              {item.highlights.map((h, i) => (
                <li key={i}>{h}</li>
              ))}
            </ul>
            <div className="timeline-tags">
              {item.skills.map((s) => (
                <span key={s} className="timeline-tag">
                  {s}
                </span>
              ))}
            </div>
          </article>
        </Reveal>
      ))}
    </div>
  );
}

/* ---------------- Direct Contact & Instant Messaging Hub ---------------- */

export function DirectContactHub() {
  const id = useId();
  const [formState, setFormState] = useState("idle");
  const [feedback, setFeedback] = useState("");
  const formRef = useRef(null);
  const inFlight = useRef(false);

  // Direct WhatsApp message trigger
  function handleWhatsAppSend(e) {
    e.preventDefault();
    const form = formRef.current;
    if (!form) return;

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const topic = form.elements.topic ? form.elements.topic.value.trim() : "Portfolio Inquiry";
    const message = form.elements.message.value.trim();

    if (!name || !message) {
      setFormState("error");
      setFeedback("Please enter your name and message before opening WhatsApp.");
      return;
    }

    const formatted = `Hi Tejas! My name is ${name} (${email || "No email provided"}).\nRegarding: ${topic}\n\n${message}`;
    const url = `https://api.whatsapp.com/send?text=${encodeURIComponent(formatted)}`;
    window.open(url, "_blank", "noopener,noreferrer");

    setFormState("success");
    setFeedback("WhatsApp opened! You can now send your pre-filled message directly.");
  }

  // Direct Email submission via FormSubmit
  async function handleEmailSend(event) {
    event.preventDefault();
    if (inFlight.current) return;

    const form = formRef.current;
    if (!form) return;

    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const topic = form.elements.topic ? form.elements.topic.value.trim() : "General Inquiry";
    const message = form.elements.message.value.trim();

    if (!name || !form.checkValidity() || message.length < 10) {
      setFormState("error");
      setFeedback("Please fill out your name, valid email, and a message of at least 10 characters.");
      return;
    }

    if (form.elements._honey.value) {
      setFormState("error");
      setFeedback("Submission halted. Please reach out via WhatsApp or LinkedIn instead.");
      return;
    }

    inFlight.current = true;
    setFormState("sending");
    setFeedback("Delivering message directly to Tejas…");

    try {
      const response = await fetch(`https://formsubmit.co/ajax/${profile.email}`, {
        method: "POST",
        headers: { "Content-Type": "application/json", Accept: "application/json" },
        body: JSON.stringify({
          name,
          email,
          topic,
          message,
          _subject: `New Portfolio Message: ${topic} from ${name}`,
          _template: "table",
          _url: window.location.href,
        }),
        signal: AbortSignal.timeout(18000),
      });

      const result = await response.json();
      if (!response.ok || ![true, "true"].includes(result.success)) {
        throw new Error("Delivery response rejected");
      }

      setFormState("success");
      setFeedback("Message sent directly to Tejas’s inbox! He will respond promptly.");
      form.reset();
    } catch {
      // Fallback: trigger default mailto
      const mailtoUrl = `mailto:${profile.email}?subject=${encodeURIComponent(
        `Portfolio Note: ${topic} (${name})`
      )}&body=${encodeURIComponent(
        `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`
      )}`;
      window.location.href = mailtoUrl;

      setFormState("success");
      setFeedback("Your mail application has been prepared with your message to send to Tejas.");
    } finally {
      inFlight.current = false;
    }
  }

  return (
    <div className="contact-hub-grid">
      {/* Left Column: Direct channels */}
      <Reveal>
        <div className="direct-channels">
          <div className="channels-header">
            <span className="channel-eyebrow">DIRECT COMMUNICATIONS</span>
            <h3 className="channels-title">Reach me directly.</h3>
            <p className="channels-intro">
              Whether you have an internship position, a freelance web/Android project, or want to discuss technical ideas—connect with me right away.
            </p>
          </div>

          <div className="channel-cards">
            {/* Direct WhatsApp */}
            <a
              href="https://api.whatsapp.com/send?text=Hi%20Tejas,%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect!"
              target="_blank"
              rel="noopener noreferrer"
              className="channel-card whatsapp-card"
            >
              <div className="channel-icon-wrap wa-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.455 5.711 1.456h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                </svg>
              </div>
              <div className="channel-text">
                <span className="channel-name">Instant WhatsApp</span>
                <strong className="channel-action">Chat on WhatsApp</strong>
                <small className="channel-desc">Quickest response for projects & urgent questions</small>
              </div>
              <span className="channel-arrow" aria-hidden="true">↗</span>
            </a>

            {/* Direct Email */}
            <a
              href={`mailto:${profile.email}`}
              className="channel-card email-card"
            >
              <div className="channel-icon-wrap mail-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div className="channel-text">
                <span className="channel-name">Direct Inbox</span>
                <strong className="channel-action">{profile.email}</strong>
                <small className="channel-desc">Detailed proposals, resumes, and official correspondence</small>
              </div>
              <span className="channel-arrow" aria-hidden="true">↗</span>
            </a>

            {/* LinkedIn */}
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="channel-card linkedin-card"
            >
              <div className="channel-icon-wrap in-icon" aria-hidden="true">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                </svg>
              </div>
              <div className="channel-text">
                <span className="channel-name">LinkedIn Profile</span>
                <strong className="channel-action">Connect with Tejas J Solanki</strong>
                <small className="channel-desc">Professional network, internships & endorsements</small>
              </div>
              <span className="channel-arrow" aria-hidden="true">↗</span>
            </a>

            {/* GitHub */}
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="channel-card github-card"
            >
              <div className="channel-icon-wrap git-icon" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"/>
                </svg>
              </div>
              <div className="channel-text">
                <span className="channel-name">GitHub Repositories</span>
                <strong className="channel-action">github.com/Tejas3545</strong>
                <small className="channel-desc">Explore live commits, Android and web codebases</small>
              </div>
              <span className="channel-arrow" aria-hidden="true">↗</span>
            </a>
          </div>

          <div className="location-badge">
            <span className="status-dot pulse" />
            <span>Based in Rajkot, Gujarat, India · Open to Remote & On-Site</span>
          </div>
        </div>
      </Reveal>

      {/* Right Column: Direct Instant Message Form */}
      <Reveal delay={120}>
        <div className="direct-form-wrapper">
          <form
            ref={formRef}
            className="contact-form"
            onSubmit={handleEmailSend}
            aria-busy={formState === "sending"}
          >
            <div className="form-head">
              <div>
                <span className="form-eyebrow">INSTANT INBOX / DISPATCH</span>
                <h3 className="form-title">Send a message.</h3>
              </div>
              <span className="form-note">Direct to Tejas</span>
            </div>

            <fieldset disabled={formState === "sending"}>
              <div className="form-row">
                <div className="form-field">
                  <label htmlFor={`${id}-name`}>Your Name *</label>
                  <input
                    id={`${id}-name`}
                    name="name"
                    type="text"
                    autoComplete="name"
                    placeholder="e.g. Alex Sharma"
                    required
                    maxLength={100}
                  />
                </div>
                <div className="form-field">
                  <label htmlFor={`${id}-email`}>Email or Contact *</label>
                  <input
                    id={`${id}-email`}
                    name="email"
                    type="text"
                    autoComplete="email"
                    placeholder="alex@company.com"
                    required
                    maxLength={254}
                  />
                </div>
              </div>

              <div className="form-field">
                <label htmlFor={`${id}-topic`}>Regarding / Purpose</label>
                <select id={`${id}-topic`} name="topic" defaultValue="Internship Opportunity">
                  <option value="Internship Opportunity">Internship Opportunity (Web / Android)</option>
                  <option value="Project Collaboration">Freelance / Project Collaboration</option>
                  <option value="Code Review / Discussion">Technical Discussion / Inquiry</option>
                  <option value="General Hello">General Greeting & Networking</option>
                </select>
              </div>

              <div className="form-field">
                <label htmlFor={`${id}-message`}>Your Message *</label>
                <textarea
                  id={`${id}-message`}
                  name="message"
                  rows={4}
                  placeholder="Share a short summary of the role, project, or question…"
                  required
                  minLength={10}
                  maxLength={5000}
                />
              </div>

              {/* Spam Trap */}
              <div className="form-trap" aria-hidden="true">
                <label htmlFor={`${id}-honey`}>Leave empty</label>
                <input id={`${id}-honey`} name="_honey" tabIndex={-1} autoComplete="off" />
              </div>

              <div className="form-actions-split">
                <button
                  type="submit"
                  className="btn btn-primary"
                  title="Delivers directly to Tejas's personal inbox"
                >
                  {formState === "sending" ? "Delivering…" : "Send via Email"}
                  <span aria-hidden="true">↗</span>
                </button>

                <button
                  type="button"
                  onClick={handleWhatsAppSend}
                  className="btn btn-whatsapp"
                  title="Opens WhatsApp directly with your message pre-formatted"
                >
                  Send on WhatsApp
                  <span aria-hidden="true">↗</span>
                </button>
              </div>
            </fieldset>

            {feedback && (
              <p
                className={`form-status status-${formState}`}
                role="status"
                aria-live="polite"
              >
                {feedback}
              </p>
            )}
          </form>
        </div>
      </Reveal>
    </div>
  );
}
