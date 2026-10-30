import Link from "next/link";
import { ArrowRightIcon } from "../components/icons";

export default function NotFound() {
  return (
    <div className="scroll-block" style={{ paddingTop: "4rem", textAlign: "center" }}>
      <p className="eyebrow" style={{ marginBottom: "0.75rem" }}>
        404 / Page Not Found
      </p>
      <h1 className="hero-title font-display" style={{ marginBottom: "1rem" }}>
        This page isn&apos;t here.
      </h1>
      <p style={{ color: "var(--muted-foreground)", fontSize: "0.9375rem", maxWidth: "28rem", margin: "0 auto 1.75rem" }}>
        The link may have moved or no longer exists. All projects and contact channels are available on the home page.
      </p>
      <Link href="/" className="pill-btn" style={{ display: "inline-flex" }}>
        <span>Return to Home</span>
        <ArrowRightIcon size={12} />
      </Link>
    </div>
  );
}
