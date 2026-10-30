import Link from "next/link";
import { ProjectCollection, Reveal } from "../../components/interactions";
import { ContactSection, Arrow } from "../../components/site";
import { profile } from "../../components/data";

export const metadata = {
  title: "Projects & Architecture",
  description:
    "Explore SyncSpend (offline-first Android app), Atmiya IT Portal (academic analytics), and Money Heist Quiz — engineering projects by Tejas J Solanki.",
};

export default function Projects() {
  return (
    <>
      <section className="page-intro container">
        <p className="eyebrow">Production & Learning Work / 01—03</p>
        <h1>
          Engineered to work.<br />
          <span className="accent-text">Open source on GitHub.</span>
        </h1>
        <p>
          Native Android applications with offline-first synchronization, student academic tools, and responsive web systems. Every project includes public source code.
        </p>
      </section>

      <section className="container projects-page">
        <ProjectCollection />

        <Reveal>
          <div className="projects-footer-cta">
            <div className="cta-copy">
              <h3>Have a specific project or role in mind?</h3>
              <p>
                All project source code is available under MIT/open license on GitHub. Feel free to inspect commit history, issues, and architectures.
              </p>
            </div>
            <div className="cta-buttons">
              <a
                className="btn btn-ink"
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore GitHub Repositories <Arrow />
              </a>
              <Link className="btn btn-outline" href="/contact">
                Discuss an Opportunity <Arrow />
              </Link>
            </div>
          </div>
        </Reveal>
      </section>

      <ContactSection />
    </>
  );
}
