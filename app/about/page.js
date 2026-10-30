import Link from "next/link";
import { Reveal, Tilt, ExperienceTimeline } from "../../components/interactions";
import { Arrow, ContactSection, SectionLabel, Toolkit } from "../../components/site";
import { profile } from "../../components/data";

export const metadata = {
  title: "About & Journey",
  description:
    "Learn more about Tejas J Solanki, IT undergraduate at Atmiya University, web development intern at WeIntern, and builder of native Android and web projects.",
};

export default function About() {
  return (
    <>
      <section className="page-intro container">
        <p className="eyebrow">Background & Story / About Me</p>
        <h1>
          Builder by practice.<br />
          <span className="accent-text">Curious by default.</span>
        </h1>
        <p>
          I’m Tejas J Solanki—an Information Technology student, web development intern, and software builder based in Rajkot, Gujarat.
        </p>
      </section>

      {/* ---------------- Bio Grid ---------------- */}
      <section className="container bio-grid section">
        <Reveal>
          <Tilt className="identity-card">
            <div className="identity-top">
              <span>{profile.location.toUpperCase()}</span>
              <span>INDIA</span>
            </div>
            <div className="identity-monogram">
              tjs<span className="brand-dot">.</span>
            </div>
            <div className="identity-bottom">
              <strong>{profile.name}</strong>
              <span>{profile.role}</span>
              <div className="identity-lines" aria-hidden="true">
                <i /><i /><i /><i /><i />
              </div>
            </div>
          </Tilt>
        </Reveal>

        <Reveal delay={100}>
          <div className="bio-copy">
            <SectionLabel number="01">The Developer Story</SectionLabel>
            <h2>
              Turning ideas into<br />
              <span className="muted-text">durable, usable software.</span>
            </h2>
            <p>
              I am pursuing my Bachelor of Technology in Information Technology at <strong>Atmiya University</strong> in Rajkot. Alongside coursework, I spend my time engineering practical software: from native Android applications with offline-first SQLite synchronization to responsive student-facing web platforms.
            </p>
            <p>
              As a Web Development Intern at <strong>WeIntern Pvt Ltd</strong>, I focus on core web technologies—semantic HTML5, modern CSS layouts (Grid and Flexbox), component architectures, accessibility, and clean repository maintenance.
            </p>
            <p>
              I love working across both sides of an application: designing clear, tactile user interfaces and engineering the data flows, local databases, and background sync workers that keep things fast and resilient.
            </p>

            <div className="bio-actions">
              <a
                className="btn btn-whatsapp-pill"
                href="https://api.whatsapp.com/send?text=Hi%20Tejas,%20I%20read%20your%20About%20page%20and%20would%20like%20to%20connect!"
                target="_blank"
                rel="noopener noreferrer"
              >
                Chat on WhatsApp <Arrow />
              </a>
              <a
                className="quiet-link"
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn Profile <Arrow />
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* ---------------- Experience & Education Timeline ---------------- */}
      <section className="section container">
        <Reveal>
          <div className="section-heading">
            <div>
              <SectionLabel number="02">Education & Experience</SectionLabel>
              <h2>
                Milestones &<br />
                <span className="muted-text">hands-on practice.</span>
              </h2>
            </div>
          </div>
        </Reveal>
        <ExperienceTimeline />
      </section>

      {/* ---------------- Core Principles ---------------- */}
      <section className="section container">
        <Reveal>
          <div className="section-heading">
            <div>
              <SectionLabel number="03">How I Build</SectionLabel>
              <h2>
                Deliberate decisions.<br />
                <span className="muted-text">Solid foundations.</span>
              </h2>
            </div>
          </div>
        </Reveal>
        <div className="principles-grid">
          {[
            [
              "01",
              "Offline-First & Resilient",
              "Networks are intermittent. Good software keeps working offline using local storage (Room, SQLite, IndexedDB) and queues sync tasks smoothly.",
            ],
            [
              "02",
              "End-to-End Ownership",
              "From the first Figma sketch and component layout down to API endpoints, database schemas, and background workers—everything connects.",
            ],
            [
              "03",
              "No Shortcuts, No AI Slop",
              "Real code written with understanding. Clean Git histories, tested component states, and continuous refinement instead of boilerplate templates.",
            ],
          ].map(([num, title, copy], idx) => (
            <Reveal delay={idx * 80} key={num}>
              <article className="principle">
                <span className="principle-num">{num}</span>
                <h3>{title}</h3>
                <p>{copy}</p>
              </article>
            </Reveal>
          ))}
        </div>
      </section>

      {/* ---------------- Technical Capabilities ---------------- */}
      <section className="section container">
        <Reveal>
          <div className="section-heading">
            <div>
              <SectionLabel number="04">Skills & Tooling</SectionLabel>
              <h2>
                A flexible<br />
                <span className="muted-text">engineering toolkit.</span>
              </h2>
            </div>
            <Link href="/projects" className="quiet-link">
              See in Projects <Arrow />
            </Link>
          </div>
        </Reveal>
        <Toolkit />
      </section>

      <ContactSection />
    </>
  );
}
