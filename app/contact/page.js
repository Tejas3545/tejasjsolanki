import { DirectContactHub, Reveal } from "../../components/interactions";
import { SectionLabel, Arrow } from "../../components/site";
import { profile } from "../../components/data";

export const metadata = {
  title: "Contact & Instant Chat",
  description:
    "Get in touch with Tejas J Solanki directly via WhatsApp, direct email dispatch, or LinkedIn for internships, project work, and collaborations.",
};

export default function Contact() {
  return (
    <>
      <section className="page-intro container">
        <p className="eyebrow">Instant Communications & Direct Line</p>
        <h1>
          Let’s start a<br />
          <span className="accent-text">direct conversation.</span>
        </h1>
        <p>
          Whether you’re hiring for an internship, looking for a developer for a web or Android project, or just want to chat tech—message me directly on WhatsApp or drop a note below.
        </p>
      </section>

      <section className="container section contact-page-section">
        <DirectContactHub />
      </section>

      <section className="container faq-section section">
        <Reveal>
          <div className="section-heading">
            <div>
              <SectionLabel number="FAQ">Quick Answers</SectionLabel>
              <h2>
                Common questions &<br />
                <span className="muted-text">availability details.</span>
              </h2>
            </div>
          </div>
        </Reveal>

        <div className="faq-grid">
          <Reveal delay={60}>
            <div className="faq-card">
              <h4>Are you available for internships?</h4>
              <p>
                Yes. I am currently open to web development and Android engineering internships—both remote and on-site in Gujarat or across India.
              </p>
            </div>
          </Reveal>

          <Reveal delay={120}>
            <div className="faq-card">
              <h4>What is your primary development stack?</h4>
              <p>
                For Android: Kotlin, Jetpack Compose, Room SQLite, WorkManager, Coroutines. For Web: Next.js, React, JavaScript/TypeScript, Python (Flask/Django), Modern CSS.
              </p>
            </div>
          </Reveal>

          <Reveal delay={180}>
            <div className="faq-card">
              <h4>How quickly do you reply on WhatsApp?</h4>
              <p>
                WhatsApp messages reach my phone directly and I usually respond within a few hours on business days.
              </p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
