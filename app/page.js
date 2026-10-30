import Link from "next/link";
import { HeroStudio, ProjectCollection, Reveal, StatsStrip, ExperienceTimeline } from "../components/interactions";
import { Arrow, SectionLabel, ContactSection, Toolkit } from "../components/site";
import { profile } from "../components/data";

export default function Home() {
  return (
    <>
      {/* ---------------- Hero Section ---------------- */}
      <section className="hero profile-hero container">
        <div className="hero-copy">
          <div className="status-badge">
            <span className="status-dot pulse" />
            <span className="status-text">{profile.status}</span>
          </div>

          <h1 className="hero-name">
            Tejas J<br />
            <span className="word-accent">
              Solanki
              <span className="word-underline" />
            </span>
            <span className="name-period">.</span>
          </h1>

          <p className="profile-role">{profile.role}</p>
          <p className="hero-description">{profile.headline}</p>

          <dl className="profile-facts">
            <div>
              <dt>Location</dt>
              <dd>{profile.location}</dd>
            </div>
            <div>
              <dt>Education</dt>
              <dd>BTech IT @ {profile.university}</dd>
            </div>
          </dl>

          <div className="hero-actions">
            <Link className="btn btn-ink" href="#projects-showcase">
              View Projects <Arrow />
            </Link>
            <a
              className="btn btn-whatsapp-pill"
              href="https://api.whatsapp.com/send?text=Hi%20Tejas,%20I%20saw%20your%20portfolio%20and%20would%20love%20to%20connect!"
              target="_blank"
              rel="noopener noreferrer"
            >
              Chat on WhatsApp <Arrow />
            </a>
            <a className="btn btn-outline" href="#get-in-touch">
              Direct Contact <Arrow />
            </a>
          </div>

          <div className="profile-socials">
            <a href={profile.github} target="_blank" rel="noopener noreferrer">
              GitHub <Arrow />
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">
              LinkedIn <Arrow />
            </a>
            <Link href="/about">
              About & Journey <Arrow />
            </Link>
          </div>
        </div>

        <HeroStudio />
      </section>

      {/* ---------------- Quick Stats Banner ---------------- */}
      <section className="container">
        <StatsStrip />
      </section>

      {/* ---------------- Experience & Education (Inspired by Purv & Punja) ---------------- */}
      <section className="section container" id="experience">
        <Reveal>
          <div className="section-heading">
            <div>
              <SectionLabel number="01">Experience & Journey</SectionLabel>
              <h2>
                Academic foundation.<br />
                <span className="muted-text">Practical software engineering.</span>
              </h2>
            </div>
            <Link className="quiet-link" href="/about">
              Detailed Journey <Arrow />
            </Link>
          </div>
        </Reveal>
        <ExperienceTimeline />
      </section>

      {/* ---------------- Featured Projects ---------------- */}
      <section className="section container" id="projects-showcase">
        <Reveal>
          <div className="section-heading">
            <div>
              <SectionLabel number="02">Selected Work</SectionLabel>
              <h2>
                Built to solve<br />
                <span className="muted-text">real engineering problems.</span>
              </h2>
            </div>
            <p>
              Offline-first architectures, university dashboards,<br />
              and real-time interactive systems. Source is fully public.
            </p>
          </div>
        </Reveal>

        <ProjectCollection featured />

        <Reveal>
          <div className="section-end">
            <span>Explore architecture details, schemas & source code.</span>
            <Link className="quiet-link" href="/projects">
              Browse full portfolio collection <Arrow />
            </Link>
          </div>
        </Reveal>
      </section>

      {/* ---------------- Technical Capabilities & Toolkit ---------------- */}
      <section className="section container" id="skills">
        <Reveal>
          <div className="section-heading">
            <div>
              <SectionLabel number="03">Technical Capabilities</SectionLabel>
              <h2>
                Tools & Stacks<br />
                <span className="muted-text">proven through actual code.</span>
              </h2>
            </div>
            <p>
              Categorized breakdown of technologies used across<br />
              Android, full-stack web, and database systems.
            </p>
          </div>
        </Reveal>
        <Toolkit />
      </section>

      {/* ---------------- Direct Contact & WhatsApp Hub ---------------- */}
      <ContactSection />
    </>
  );
}
