import { DirectContactSection } from "../../components/interactions";

export const metadata = {
  title: "Contact",
  description:
    "Get in touch with Tejas J Solanki for developer roles, software projects, or technical collaborations.",
};

export default function ContactPage() {
  return (
    <div className="scroll-block" style={{ paddingTop: "1rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <p className="eyebrow" style={{ marginBottom: "0.5rem" }}>
          Inquiries
        </p>
        <h1 className="hero-title font-display" style={{ marginBottom: "0.5rem" }}>
          Contact
        </h1>
        <p style={{ color: "var(--muted-foreground)", fontSize: "0.9375rem", maxWidth: "40rem" }}>
          Got a role, a project, or just a question? Pick whichever channel suits you. I read everything.
        </p>
      </div>

      <DirectContactSection standalone={true} />
    </div>
  );
}
