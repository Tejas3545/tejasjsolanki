import Link from "next/link";
import { profile, projects } from "../components/data";
import {
  MapPinIcon,
  MailIcon,
  GraduationCapIcon,
  FileTextIcon,
  LinkedinIcon,
  GithubIcon,
  TwitterIcon,
  InstagramIcon,
  ArrowRightIcon,
} from "../components/icons";
import {
  ContributionsGraph,
  ExperienceTabs,
  LeadershipAchievements,
  TechStackTabs,
  HighlightsGrid,
  ProjectCard,
  DirectContactSection,
  ThoughtAndVisitorCounter,
} from "../components/interactions";

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <>
      {/* ---------------- 1. Hero Section ---------------- */}
      <section className="hero-section">
        {/* Photo, Name, Subtitle */}
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

        {/* 2. Location, Email, Studying */}
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
              <span>{profile.degree}</span>
            </dd>
          </div>
        </dl>

        {/* 3. About section (Bio & Exploring) */}
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

        {/* 4. Resume button + Icon-only social links */}
        <div className="hero-social-row">
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="resume-btn"
          >
            <FileTextIcon size={14} />
            <span>Resume</span>
          </a>

          <div className="social-icons-group">
            <a
              href={profile.github}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="GitHub"
              aria-label="GitHub"
            >
              <GithubIcon size={16} />
            </a>
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="LinkedIn"
              aria-label="LinkedIn"
            >
              <LinkedinIcon size={16} />
            </a>
            <a
              href={profile.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="Twitter / X"
              aria-label="Twitter / X"
            >
              <TwitterIcon size={15} />
            </a>
            <a
              href={profile.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="social-icon-btn"
              title="Instagram"
              aria-label="Instagram"
            >
              <InstagramIcon size={15} />
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="social-icon-btn"
              title="Email"
              aria-label="Email"
            >
              <MailIcon size={15} />
            </a>
          </div>
        </div>
      </section>

      {/* ---------------- 5. GitHub Contributions Heatmap ---------------- */}
      <ContributionsGraph />

      {/* ---------------- 6. Experience (Work & Education with logos) ---------------- */}
      <ExperienceTabs />

      {/* ---------------- 7. Leadership & Achievements ---------------- */}
      <LeadershipAchievements />

      {/* ---------------- 8. Tech Stack (Colorful Brand Icons) ---------------- */}
      <TechStackTabs />

      {/* ---------------- 9. Competitive Programming & Highlights ---------------- */}
      <HighlightsGrid />

      {/* ---------------- 10. Featured Projects ---------------- */}
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

      {/* ---------------- 11. Get in Touch ---------------- */}
      <DirectContactSection />

      {/* ---------------- 12 & 13. Thought & Live Visitor Counter ---------------- */}
      <ThoughtAndVisitorCounter />
    </>
  );
}
