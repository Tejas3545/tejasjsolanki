import Link from "next/link";
import { Reveal, MotionToggle } from "./interactions";
import { profile } from "./data";

export function Arrow() {
  return <span className="arrow" aria-hidden="true">↗</span>;
}

export function SectionLabel({ number, children }) {
  return <p className="section-label"><span>{number}</span>{children}</p>;
}

export function ContactSection({ children }) {
  return <section className="contact-section container"><Reveal><div className="contact-banner"><div className="contact-banner-top"><span className="eyebrow">Have something in mind?</span><span className="contact-ring" aria-hidden="true" /></div><h2>Good things start<br />with a <span>conversation.</span></h2><div className="contact-banner-bottom"><Link href="/contact" className="button button-ink">Let’s talk <Arrow /></Link>{children}<p>Projects, collaborations,<br />and the next good question.</p></div></div></Reveal></section>;
}

export function Toolkit() {
  const groups = [
    { name: "Web & backend", code: "</>", tone: "peach", tools: ["HTML & CSS", "JavaScript", "Python", "Flask", "Django", "PHP", "Laravel"] },
    { name: "Mobile", code: "[ ]", tone: "green", tools: ["Kotlin", "Jetpack Compose", "Room", "WorkManager", "Flutter", "Dart"] },
    { name: "Data & the workbench", code: "{ }", tone: "pink", tools: ["SQLite", "MySQL", "Git", "GitHub", "Figma", "Raspberry Pi"] },
  ];
  return <div className="toolkit-grid">{groups.map((group, index) => <Reveal delay={index * 80} key={group.name}><article className={`toolkit-card ${group.tone}`}><span className="toolkit-symbol" aria-hidden="true">{group.code}</span><h3>{group.name}</h3><ul>{group.tools.map((tool) => <li key={tool}>{tool}</li>)}</ul></article></Reveal>)}</div>;
}

export function Footer() {
  return <footer className="footer container"><div className="footer-top"><Link className="footer-wordmark" href="/">tejas<span>j</span>solanki<span>.</span></Link><p>A curious mind. A practical approach.<br />Built in Rajkot, India.</p></div><div className="footer-bottom"><span>© {new Date().getFullYear()} Tejas J Solanki</span><nav aria-label="Footer navigation"><Link href="/about">About</Link><Link href="/projects">Projects</Link><Link href="/contact">Contact</Link><a href={profile.github}>GitHub <Arrow /></a><a href={profile.linkedin}>LinkedIn <Arrow /></a></nav><MotionToggle /></div></footer>;
}
