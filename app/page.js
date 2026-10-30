import Link from "next/link";
import { HeroStudio, ProjectCollection, Reveal, Tilt, CopyEmail } from "../components/interactions";
import { Arrow, SectionLabel, ContactSection, Toolkit } from "../components/site";

export default function Home() {
  return (
    <>
      <section className="hero container">
        <div className="hero-copy">
          <p className="eyebrow"><span className="status-dot" /> Tejas J Solanki / Developer & maker</p>
          <h1>A curious mind.<br />A <span className="word-window">practical<span className="word-underline" /></span><br />approach.</h1>
          <p className="hero-description">I turn everyday problems into things you can use.<br className="desktop-break" /> From a browser tab to the phone in your pocket.</p>
          <div className="hero-actions"><Link className="button button-ink" href="/projects">Explore my work <Arrow /></Link><Link className="quiet-link" href="/about">A little about me <Arrow /></Link></div>
          <div className="hero-footnote"><span className="location-mark" aria-hidden="true" /><span>Based in Rajkot, India</span><span className="footnote-divider" /><span>Building. Learning. Repeating.</span></div>
        </div>
        <HeroStudio />
      </section>
      <div className="discipline-strip"><div className="container"><span>Different platforms. Same curiosity.</span><div><span>WEB DEVELOPMENT</span><i /><span>ANDROID</span><i /><span>BACKEND SYSTEMS</span><i /><span>IoT EXPLORATION</span></div></div></div>
      <section className="section container" id="work">
        <Reveal><div className="section-heading"><div><SectionLabel number="01">Selected projects</SectionLabel><h2>Less talk.<br /><span className="muted-text">More making.</span></h2></div><p>A few things I’ve built to solve a problem,<br />try an idea, or figure something out.</p></div></Reveal>
        <ProjectCollection featured />
        <Reveal><div className="section-end"><span>Real projects. Public source. Still evolving.</span><Link className="quiet-link" href="/projects">Browse the collection <Arrow /></Link></div></Reveal>
      </section>
      <section className="about-section">
        <div className="container about-grid">
          <Reveal><SectionLabel number="02">Behind the screen</SectionLabel><h2>Not one stack.<br />Not one kind<br />of <span className="orange-text">problem.</span></h2><p>I’m an IT student at Atmiya University who likes connecting the dots between interfaces, data, and the real world.</p><p>Some days that means Kotlin. Others, Python or PHP. The constant is wanting to make something that actually works.</p><Link className="quiet-link" href="/about">Meet the person behind the projects <Arrow /></Link></Reveal>
          <Reveal delay={100}><Tilt className="maker-board"><div className="board-header"><span>THE WAY I WORK</span><span>tjs / personal notes</span></div><div className="board-statement">Start with<br />the <span>why.</span><br />Then build.</div><div className="board-sticker">Curiosity<br />in progress.</div><div className="board-bottom"><span>Understand the problem.<br />Keep the solution useful.</span><span className="board-cross" aria-hidden="true">+</span></div></Tilt></Reveal>
        </div>
      </section>
      <section className="section container">
        <Reveal><div className="section-heading"><div><SectionLabel number="03">The toolkit</SectionLabel><h2>Tools, not <span className="muted-text">labels.</span></h2></div><p>A mix of technologies from my projects.<br />No progress bars. Just things I work with.</p></div></Reveal>
        <Toolkit />
      </section>
      <section className="now-section container"><Reveal><div className="now-card"><div><p className="eyebrow"><span className="status-dot" /> On my radar</p><h2>There’s always<br />more to <span className="orange-text">figure out.</span></h2></div><div><p>Mobile development and IoT integration are my current focus. Cloud, cybersecurity, and applied ML are the next questions I’m exploring.</p><a className="quiet-link" href="https://github.com/Tejas3545">Follow the workbench <Arrow /></a></div></div></Reveal></section>
      <ContactSection><CopyEmail /></ContactSection>
    </>
  );
}
