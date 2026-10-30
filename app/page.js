import Link from "next/link";
import { profile, projects } from "../components/data";
import {
  MapPinIcon,
  MailIcon,
  GraduationCapIcon,
  FileTextIcon,
  LinkedinIcon,
  GithubIcon,
  ArrowRightIcon,
} from "../components/icons";
import {
  ExperienceTabs,
  TechStackTabs,
  HighlightsGrid,
  ProjectCard,
  ContributionsGraph,
  DirectContactSection,
} from "../components/interactions";

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      {/* ---------------- Hero Section ---------------- */}
      <section className="hero-section">
        <div className="hero-profile-row">
          <div className="avatar-wrapper">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/img/tejas.jpg"
              alt={`${profile.name} profile`}
              className="avatar-img"
            />
          </div>
          <div className="hero-headings">
            <h1 className="hero-title font-display">{profile.name}</h1>
            <p className="hero-subtitle">{profile.role}</p>
          </div>
        </div>

        {/* Quick Meta List */}
        <dl className="hero-meta-list">
          <div className="hero-meta-item">
            <dt className="eyebrow">Location</dt>
            <dd className="hero-meta-val">
              <MapPinIcon size={13} className="text-muted" />
              <span>{profile.location}</span>
            </dd>
          </div>

          <div className="hero-meta-item">
            <dt className="eyebrow">Email</dt>
            <dd className="hero-meta-val">
              <a href={`mailto:${profile.email}`} className="link-underline hero-meta-val">
                <MailIcon size={13} className="text-muted" />
                <span>{profile.email}</span>
              </a>
            </dd>
          </div>

          <div className="hero-meta-item">
            <dt className="eyebrow">Studying</dt>
            <dd className="hero-meta-val">
              <GraduationCapIcon size={13} className="text-muted" />
              <span>{profile.degree} @ {profile.university}</span>
            </dd>
          </div>
        </dl>

        {/* Bio Copy */}
        <div className="hero-bio">
          <p>{profile.bio}</p>
          <p>
            Currently exploring{" "}
            {profile.exploring.map((item, idx) => (
              <span key={item}>
                <span className="highlight-word">{item}</span>
                {idx < profile.exploring.length - 1 ? ", " : "."}
              </span>
            ))}
          </p>
        </div>

        {/* Action Pills */}
        <div className="hero-cta-row">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn"
          >
            <FileTextIcon size={13} />
            <span>Resume</span>
          </a>
          <a
            href={profile.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn"
          >
            <LinkedinIcon size={13} />
            <span>LinkedIn</span>
          </a>
          <a
            href={profile.github}
            target="_blank"
            rel="noopener noreferrer"
            className="pill-btn"
          >
            <GithubIcon size={13} />
            <span>GitHub</span>
          </a>
          <a href={`mailto:${profile.email}`} className="pill-btn">
            <MailIcon size={13} />
            <span>Email</span>
          </a>
        </div>
      </section>

      {/* ---------------- Experience & Education ---------------- */}
      <ExperienceTabs />

      {/* ---------------- Tech Stack ---------------- */}
      <TechStackTabs />

      {/* ---------------- Highlights & Achievements ---------------- */}
      <HighlightsGrid />

      {/* ---------------- Featured Projects ---------------- */}
      <section className="scroll-block" id="projects">
        <div className="section-divider">
          <h2 className="eyebrow shrink-0">Featured Projects</h2>
          <span className="divider-line" aria-hidden="true" />
          <Link
            href="/projects"
            className="eyebrow link-underline shrink-0"
            style={{ display: "inline-flex", alignItems: "center", gap: "0.25rem" }}
          >
            <span>All projects</span>
            <ArrowRightIcon size={12} />
          </Link>
        </div>

        <div className="projects-grid">
          {featuredProjects.map((project) => (
            <ProjectCard key={project.id} project={project} />
          ))}
        </div>
      </section>

      {/* ---------------- GitHub Contributions Heatmap ---------------- */}
      <ContributionsGraph />

      {/* ---------------- Direct Contact & Messaging ---------------- */}
      <DirectContactSection />
    </>
  );
}
