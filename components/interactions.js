"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createContext, useContext, useEffect, useRef, useState } from "react";
import { projects, profile } from "./data";
import { ProjectPreview } from "./previews";

const MotionContext = createContext({ paused: false, toggle: () => {} });

export function MotionProvider({ children }) {
  const [paused, setPaused] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stored = null;
    try { stored = localStorage.getItem("tjs-motion"); } catch {}
    setPaused(media.matches || stored === "paused");
    const change = (event) => setPaused(event.matches);
    media.addEventListener("change", change);
    return () => media.removeEventListener("change", change);
  }, []);
  useEffect(() => { document.documentElement.dataset.motion = paused ? "paused" : "active"; }, [paused]);
  function toggle() {
    setPaused((value) => {
      try { localStorage.setItem("tjs-motion", value ? "active" : "paused"); } catch {}
      return !value;
    });
  }
  return <MotionContext.Provider value={{ paused, toggle }}>{children}</MotionContext.Provider>;
}

export function MotionToggle() {
  const { paused, toggle } = useContext(MotionContext);
  return <button className="motion-toggle" onClick={toggle} aria-pressed={paused}><span className={paused ? "motion-indicator paused" : "motion-indicator"} aria-hidden="true"><i /><i /><i /></span>Motion {paused ? "off" : "on"}</button>;
}

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const menuButton = useRef(null);
  useEffect(() => setOpen(false), [pathname]);
  useEffect(() => {
    function escape(event) {
      if (event.key === "Escape" && open) {
        setOpen(false);
        menuButton.current?.focus();
      }
    }
    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [open]);
  return <header className="header-shell"><div className="site-header container"><Link href="/" className="wordmark" aria-label="Tejas J Solanki, home">tjs<span>.</span></Link><nav className={`nav-pill ${open ? "menu-open" : ""}`} id="main-nav" aria-label="Main navigation">{[["/", "Home"], ["/projects", "Work"], ["/about", "About"], ["/contact", "Contact"]].map(([href, label]) => <Link key={href} href={href} aria-current={pathname === href ? "page" : undefined}>{label}</Link>)}</nav><a className="header-contact" href={`mailto:${profile.email}`}>Let’s talk <span aria-hidden="true">↗</span></a><button className="menu-button" ref={menuButton} aria-controls="main-nav" aria-expanded={open} onClick={() => setOpen(!open)}>{open ? "Close" : "Menu"}<span aria-hidden="true">{open ? "−" : "+"}</span></button></div></header>;
}

export function Reveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const { paused } = useContext(MotionContext);
  useEffect(() => {
    const element = ref.current;
    if (!element || paused || !("IntersectionObserver" in window)) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        element.animate([{ opacity: 0.35, transform: "translateY(24px)" }, { opacity: 1, transform: "translateY(0)" }], { duration: 700, delay, easing: "cubic-bezier(.2,.7,.2,1)", fill: "backwards" });
        observer.disconnect();
      }
    }, { threshold: 0.08 });
    observer.observe(element);
    return () => {
      observer.disconnect();
      element.getAnimations().forEach((animation) => animation.cancel());
    };
  }, [delay, paused]);
  return <div ref={ref} className={`reveal ${className}`}>{children}</div>;
}

export function Tilt({ children, className = "" }) {
  const { paused } = useContext(MotionContext);
  const ref = useRef(null);
  const frame = useRef(null);
  useEffect(() => () => cancelAnimationFrame(frame.current), []);
  function move(event) {
    if (paused || event.pointerType !== "mouse") return;
    const box = event.currentTarget.getBoundingClientRect();
    const x = (event.clientX - box.left) / box.width - 0.5;
    const y = (event.clientY - box.top) / box.height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      ref.current?.style.setProperty("--tilt-x", `${-y * 7}deg`);
      ref.current?.style.setProperty("--tilt-y", `${x * 7}deg`);
    });
  }
  function reset() {
    cancelAnimationFrame(frame.current);
    ref.current?.style.setProperty("--tilt-x", "0deg");
    ref.current?.style.setProperty("--tilt-y", "0deg");
  }
  return <div ref={ref} className={`tilt ${className}`} onPointerMove={move} onPointerLeave={reset}>{children}</div>;
}

export function HeroStudio() {
  const [active, setActive] = useState(0);
  const project = projects[active];
  return <div className="hero-studio"><div className="studio-top"><span className="studio-label"><i /> FROM THE WORKBENCH</span><span className="studio-edition">VOL. 01 — ALWAYS IN PROGRESS</span></div><div className="studio-stage"><div className="stack-sheet sheet-back" /><div className="stack-sheet sheet-mid" /><Tilt className={`studio-card studio-${project.id}`}><div key={project.id} className="studio-preview"><ProjectPreview kind={project.id} compact /></div></Tilt><span className="studio-sticker">made<br />to work.</span></div><div className="studio-bottom"><div className="studio-project" aria-live="polite"><span>{project.number} / SELECTED PROJECT</span><strong>{project.name}</strong></div><div className="studio-controls" role="group" aria-label="Preview a project">{projects.map((item, index) => <button key={item.id} onClick={() => setActive(index)} aria-label={`Preview ${item.name}`} aria-pressed={active === index}>{item.number}</button>)}</div></div><p className="studio-hint">Three projects. Three different starting points.</p></div>;
}

export function ProjectCollection({ featured = false }) {
  const [filter, setFilter] = useState("all");
  const list = (featured ? projects.slice(0, 2) : projects).filter((project) => filter === "all" || project.category === filter);
  return <div>{!featured && <div className="filter-row"><div className="project-filters" role="group" aria-label="Filter projects">{[["all", "All projects", "03"], ["web", "Web", "02"], ["mobile", "Mobile", "01"]].map(([value, label, count]) => <button key={value} onClick={() => setFilter(value)} aria-pressed={filter === value}>{label}<span>{count}</span></button>)}</div><span className="filter-count" role="status">{list.length} {list.length === 1 ? "project" : "projects"}</span></div>}<div className="project-collection">{list.map((project, index) => <Reveal key={project.id}><article className={`project-case case-${project.id} ${index % 2 ? "case-reverse" : ""}`}><a className="case-preview" href={project.live || project.source} aria-label={`View ${project.name} ${project.live ? "live website" : "source code"}`}><ProjectPreview kind={project.id} /><span className="preview-open" aria-hidden="true">↗</span></a><div className="case-copy"><div className="case-eyebrow"><span>{project.discipline}</span><span>/{project.number}</span></div><h3>{project.name}</h3><h4>{project.headline.split("\n").map((line, i) => <span key={line}>{i > 0 && <br />}{line}</span>)}</h4><p>{project.description}</p><ul className="tag-list" aria-label={`${project.name} technologies`}>{project.tags.map((tag) => <li key={tag}>{tag}</li>)}</ul><div className="case-links"><a className="quiet-link" href={project.source}>Source code <span aria-hidden="true">↗</span></a>{project.live && <a className="quiet-link" href={project.live}>Live project <span aria-hidden="true">↗</span></a>}</div><p className="case-detail">{project.detail}</p></div></article></Reveal>)}</div></div>;
}

export function CopyEmail() {
  const [status, setStatus] = useState("");
  const timer = useRef(null);
  useEffect(() => () => clearTimeout(timer.current), []);
  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setStatus("Email copied");
    } catch {
      setStatus(`Copy manually: ${profile.email}`);
    }
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 5000);
  }
  return <div className="copy-email"><button className="quiet-link" type="button" onClick={copy}>Copy email address <span className="copy-icon" aria-hidden="true" /></button><span className="copy-status" role="status">{status}</span></div>;
}

export function ContactForm() {
  const [draft, setDraft] = useState("");
  const [status, setStatus] = useState("");
  function submit(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const name = form.elements.name.value.trim();
    const email = form.elements.email.value.trim();
    const message = form.elements.message.value.trim();
    if (!name || message.length < 10) {
      setStatus("Please enter your name and a message of at least 10 non-padding characters.");
      return;
    }
    setDraft(`mailto:${profile.email}?subject=${encodeURIComponent(`Portfolio enquiry from ${name}`)}&body=${encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`)}`);
    setStatus("Your draft is ready. Open it below, then review and send it from your email app. Nothing has been sent yet.");
  }
  return <form className="contact-form" onSubmit={submit} action={`mailto:${profile.email}`} method="post" encType="text/plain" aria-describedby="form-note"><div className="form-top"><span>WRITE A NOTE</span><span>All fields required</span></div><label htmlFor="name">Your name</label><input id="name" name="name" autoComplete="name" placeholder="How should I address you?" required maxLength={100} onChange={() => setDraft("")} /><label htmlFor="email">Email address</label><input id="email" name="email" type="email" autoComplete="email" placeholder="you@example.com" required maxLength={254} onChange={() => setDraft("")} /><label htmlFor="message">What are you thinking?</label><textarea id="message" name="message" rows={5} placeholder="An idea, a project, a little context…" required minLength={10} maxLength={5000} onChange={() => setDraft("")} /><p id="form-note" className="small-copy">This form prepares a draft for your email app. No backend, no data storage, and no message sent until you send it yourself.</p><button type="submit" className="button button-ink">Prepare email draft <span aria-hidden="true">↗</span></button><p className="form-status" role="status">{status}</p>{draft && <a className="button button-outline" href={draft}>Open email draft <span aria-hidden="true">↗</span></a>}<noscript><p>JavaScript is off. Use the direct email link, or submit this form to your email app.</p></noscript></form>;
}
