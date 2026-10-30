import Link from "next/link";
import { profile } from "../../components/data";
import { ArrowRightIcon, FileTextIcon, MapPinIcon, GraduationCapIcon } from "../../components/icons";

export const metadata = {
  title: "About",
  description:
    "Background, academic foundations, and engineering philosophy of Tejas J Solanki.",
};

export default function AboutPage() {
  return (
    <div className="scroll-block" style={{ paddingTop: "1rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>
          Biography
        </p>
        <h1 className="hero-title font-display" style={{ marginBottom: "0.5rem" }}>
          About Me
        </h1>
        <p style={{ color: "var(--muted-foreground)", fontSize: "0.9375rem", maxWidth: "40rem" }}>
          Undergraduate software engineer building offline-first mobile applications, responsive web systems, and data-driven tools.
        </p>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "2rem" }}>
        {/* Story Section */}
        <section>
          <div className="section-divider">
            <h2 className="eyebrow shrink-0">Background & Education</h2>
            <span className="divider-line" aria-hidden="true" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "var(--muted-foreground)", fontSize: "0.9375rem", lineHeight: "1.7" }}>
            <p>
              I am an Information Technology student at <strong style={{ color: "var(--foreground)" }}>Atmiya University</strong> in Rajkot, Gujarat.
              My work spans across native Android engineering with Kotlin and Jetpack Compose, modern frontend architectures with Next.js, and backend service development with Python and FastAPI.
            </p>
            <p>
              I believe in building software that delivers a great user experience regardless of network constraints. That focus drove me to engineer <strong style={{ color: "var(--foreground)" }}>SyncSpend</strong>, an offline-first Android expense tracker with Room SQLite and WorkManager synchronization, and the <strong style={{ color: "var(--foreground)" }}>Atmiya IT Portal</strong>, replacing manual spreadsheets with real-time academic analytics for students and faculty.
            </p>
          </div>
        </section>

        {/* Internship at WeIntern */}
        <section>
          <div className="section-divider">
            <h2 className="eyebrow shrink-0">Internship at WeIntern</h2>
            <span className="divider-line" aria-hidden="true" />
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: "1rem", color: "var(--muted-foreground)", fontSize: "0.9375rem", lineHeight: "1.7" }}>
            <p>
              As a Web Development Intern at <strong style={{ color: "var(--foreground)" }}>WeIntern Pvt Ltd</strong>, I work on production frontend delivery. My daily work revolves around semantic HTML5 structure, modern CSS layout systems (Grid and Flexbox), component modularity, dark/light theme implementations, and strict accessibility standards.
            </p>
            <p>
              Each assignment emphasizes real-world engineering rigor: clean Git commit history, responsive cross-device validation from mobile to wide displays, and high-performance execution.
            </p>
          </div>
        </section>

        {/* Core Principles */}
        <section>
          <div className="section-divider">
            <h2 className="eyebrow shrink-0">Engineering Principles</h2>
            <span className="divider-line" aria-hidden="true" />
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "1rem" }}>
            <div className="experience-card card-lift">
              <h3 style={{ fontSize: "0.875rem", fontWeight: "600", color: "var(--foreground)", marginBottom: "0.375rem" }}>
                Offline-First Reliability
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", lineHeight: "1.6" }}>
                Prioritize local database persistence so interactions happen instantly, syncing to the cloud quietly in the background.
              </p>
            </div>

            <div className="experience-card card-lift">
              <h3 style={{ fontSize: "0.875rem", fontWeight: "600", color: "var(--foreground)", marginBottom: "0.375rem" }}>
                Semantic & Accessible
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", lineHeight: "1.6" }}>
                Build accessible interfaces with standard HTML elements, visible focus states, and zero unnecessary visual clutter.
              </p>
            </div>

            <div className="experience-card card-lift">
              <h3 style={{ fontSize: "0.875rem", fontWeight: "600", color: "var(--foreground)", marginBottom: "0.375rem" }}>
                Clean Architecture
              </h3>
              <p style={{ fontSize: "0.75rem", color: "var(--muted-foreground)", lineHeight: "1.6" }}>
                Structure modular, typed code with clear boundaries between UI components, state managers, and data pipelines.
              </p>
            </div>
          </div>
        </section>

        {/* CTA Bar */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", paddingTop: "0.5rem" }}>
          <Link href="/projects" className="pill-btn">
            <span>Explore Projects</span>
            <ArrowRightIcon size={12} />
          </Link>
          <a href="/resume.pdf" target="_blank" rel="noopener noreferrer" className="pill-btn">
            <FileTextIcon size={13} />
            <span>View Resume (PDF)</span>
          </a>
          <Link href="/contact" className="pill-btn">
            <span>Get in Touch</span>
            <ArrowRightIcon size={12} />
          </Link>
        </div>
      </div>
    </div>
  );
}
