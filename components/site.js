import Link from "next/link";
import {
  DirectContactHub,
  Reveal,
  MotionToggle,
  TechStackPanel,
  StatsStrip,
  ExperienceTimeline,
} from "./interactions";
import { profile } from "./data";

export function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

export function SectionLabel({ number, children }) {
  return (
    <p className="section-label">
      <span>{number}</span>
      {children}
    </p>
  );
}

export function ContactSection({ standalone = false }) {
  return (
    <section
      className={`contact-section container ${standalone ? "contact-standalone" : ""}`}
      id="get-in-touch"
    >
      <div className="section-heading">
        <div>
          <SectionLabel number="04">Direct Contact & Channels</SectionLabel>
          <h2>
            Let’s start a conversation.<br />
            <span className="muted-text">Directly to my WhatsApp or inbox.</span>
          </h2>
        </div>
        <p>
          No middlemen or unnecessary friction.<br />
          Feel free to send a direct message below.
        </p>
      </div>
      <DirectContactHub />
    </section>
  );
}

export function Toolkit() {
  return <TechStackPanel />;
}

export function StatsBanner() {
  return <StatsStrip />;
}

export function JourneySection() {
  return (
    <div className="journey-wrapper">
      <ExperienceTimeline />
    </div>
  );
}

export function Footer() {
  return (
    <footer className="footer container">
      <div className="footer-top">
        <div className="footer-brand">
          <Link className="footer-wordmark" href="/">
            tejas<span className="brand-dot">j</span>solanki<span>.</span>
          </Link>
          <p className="footer-subtitle">
            Full-Stack Developer & Android Builder.<br />
            Crafting durable software from Rajkot, Gujarat, India.
          </p>
        </div>

        <div className="footer-quick-contacts">
          <a
            href="https://api.whatsapp.com/send?text=Hi%20Tejas,%20I%20saw%20your%20portfolio!"
            target="_blank"
            rel="noopener noreferrer"
            className="footer-contact-pill"
          >
            WhatsApp <Arrow />
          </a>
          <a href={`mailto:${profile.email}`} className="footer-contact-pill">
            Email Me <Arrow />
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-contact-pill"
          >
            LinkedIn <Arrow />
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-contact-pill"
          >
            GitHub <Arrow />
          </a>
        </div>
      </div>

      <div className="footer-bottom">
        <div className="footer-legal">
          <span>© {new Date().getFullYear()} Tejas J Solanki. Built with Next.js App Router.</span>
          <span className="footer-note">All rights reserved · No AI slop</span>
        </div>

        <nav aria-label="Footer navigation" className="footer-nav">
          <Link href="/">Home</Link>
          <Link href="/projects">Projects</Link>
          <Link href="/about">About & Journey</Link>
          <Link href="/contact">Contact</Link>
          <a href={profile.github} target="_blank" rel="noopener noreferrer">
            GitHub <Arrow />
          </a>
        </nav>

        <div className="footer-controls">
          <MotionToggle />
        </div>
      </div>
    </footer>
  );
}
