import { ProjectsCatalog } from "../../components/site";

export const metadata = {
  title: "Projects",
  description:
    "Showcase of full-stack web applications, native Android apps, and systems engineering projects by Tejas J Solanki.",
};

export default function ProjectsPage() {
  return (
    <div className="scroll-block" style={{ paddingTop: "1rem" }}>
      <div style={{ marginBottom: "1.75rem" }}>
        <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>
          Portfolio
        </p>
        <h1 className="hero-title font-display" style={{ marginBottom: "0.5rem" }}>
          Projects
        </h1>
        <p style={{ color: "var(--muted-foreground)", fontSize: "0.9375rem", maxWidth: "40rem" }}>
          Things I&apos;ve built: native Android apps, full-stack web platforms, and systems tools.
          Most are open source on GitHub.
        </p>
      </div>

      <ProjectsCatalog />
    </div>
  );
}
