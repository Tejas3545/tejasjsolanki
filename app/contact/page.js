import { ContactForm, CopyEmail, Reveal } from "../../components/interactions";
import { Arrow } from "../../components/site";

export const metadata = { title: "Contact" };

export default function Contact() {
  return (
    <>
      <section className="page-intro container"><p className="eyebrow">A good place to start</p><h1>Tell me what<br />you’re <span className="orange-text">thinking.</span></h1><p>An idea, an opportunity, or a problem worth working on. I’d like to hear about it.</p></section>
      <section className="container contact-layout section"><Reveal><div className="contact-info"><span className="contact-tag">OPEN TO CONVERSATIONS</span><h2>A direct line.<br /><span className="muted-text">No middleman.</span></h2><a className="contact-email" href="mailto:tejassolanki5881@gmail.com">tejassolanki5881@gmail.com</a><CopyEmail /><div className="contact-socials"><a href="https://github.com/Tejas3545"><span>GitHub</span><span>Tejas3545 <Arrow /></span></a><a href="https://www.linkedin.com/in/tejas-j-solanki2476/"><span>LinkedIn</span><span>Tejas J Solanki <Arrow /></span></a></div><p className="small-copy">Based in Rajkot, Gujarat, India.<br />For project enquiries, a little context goes a long way.</p></div></Reveal><Reveal delay={100}><ContactForm /></Reveal></section>
    </>
  );
}
