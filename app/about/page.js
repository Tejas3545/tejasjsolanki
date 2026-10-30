import Link from "next/link";
import { Reveal, Tilt } from "../../components/interactions";
import { Arrow, ContactSection, SectionLabel, Toolkit } from "../../components/site";

export const metadata = { title: "About" };

export default function About() {
  return (
    <>
      <section className="page-intro container"><p className="eyebrow">A little context / About me</p><h1>Builder by practice.<br /><span className="orange-text">Curious by default.</span></h1><p>I’m Tejas J Solanki. An IT student, a developer, and someone who usually has another project in mind.</p></section>
      <section className="container bio-grid section">
        <Reveal><Tilt className="identity-card"><div className="identity-top"><span>RAJKOT, GUJARAT</span><span>INDIA</span></div><div className="identity-monogram">tjs<span>.</span></div><div className="identity-bottom"><strong>Tejas J Solanki</strong><span>Developer & maker</span><div className="identity-lines" aria-hidden="true"><i /><i /><i /><i /><i /></div></div></Tilt></Reveal>
        <Reveal delay={100}><div className="bio-copy"><SectionLabel number="01">The short version</SectionLabel><h2>I like when an idea<br /><span className="muted-text">becomes useful.</span></h2><p>I’m pursuing Information Technology at Atmiya University in Rajkot. Alongside my studies, I build native Android apps, web interfaces, and backend services.</p><p>My projects range from an offline-first expense tracker to a student attendance portal. I enjoy moving between the visible interface and the systems underneath it, using the stack that makes sense for the task.</p><p>IoT integration, applied machine learning, cloud computing, and cybersecurity keep me curious. These are areas I’m exploring—not a list of things I claim to have mastered.</p><a className="quiet-link" href="https://www.linkedin.com/in/tejas-j-solanki2476/">Find me on LinkedIn <Arrow /></a></div></Reveal>
      </section>
      <section className="section container"><Reveal><div className="section-heading"><div><SectionLabel number="02">How I approach things</SectionLabel><h2>Small details.<br /><span className="muted-text">Whole systems.</span></h2></div></div></Reveal><div className="principles-grid">{[
        ["01", "Understand first.", "Who is this for? What’s getting in their way? A useful project starts before the first line of code."],
        ["02", "Build the whole thing.", "Interfaces, local data, background jobs, APIs. The experience only works when the pieces work together."],
        ["03", "Keep learning.", "Projects reveal what I don’t know yet. I like that part: investigating, testing, and improving the next version."],
      ].map(([number, title, copy], index) => <Reveal delay={index * 80} key={number}><article className="principle"><span>{number}</span><h3>{title}</h3><p>{copy}</p></article></Reveal>)}</div></section>
      <section className="section container"><Reveal><div className="section-heading"><div><SectionLabel number="03">Working toolkit</SectionLabel><h2>A flexible <span className="muted-text">foundation.</span></h2></div><Link href="/projects" className="quiet-link">See it in practice <Arrow /></Link></div></Reveal><Toolkit /></section>
      <ContactSection />
    </>
  );
}
