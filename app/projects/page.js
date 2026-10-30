import { ProjectCollection, Reveal } from "../../components/interactions";
import { ContactSection } from "../../components/site";

export const metadata = { title: "Projects", description: "Explore SyncSpend, Atmiya IT Portal, and Money Heist Quiz — real projects by Tejas J Solanki." };

export default function Projects() {
  return (
    <>
      <section className="page-intro container"><p className="eyebrow">The project shelf / 01—03</p><h1>Ideas out of my head.<br /><span className="orange-text">Into the real world.</span></h1><p>Mobile apps, useful web tools, and the occasional experiment. Here’s what I’ve been making.</p></section>
      <section className="container projects-page"><ProjectCollection /><Reveal><p className="project-note">Project previews are custom interface studies based on each project’s purpose—not screenshots or live financial/student data.</p><a className="button button-outline" href="https://github.com/Tejas3545">More on GitHub <span aria-hidden="true">↗</span></a></Reveal></section>
      <ContactSection />
    </>
  );
}
