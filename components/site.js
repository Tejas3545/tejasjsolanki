"use client";

import { useState } from "react";
import Link from "next/link";
import { profile, projects } from "./data";
import { ProjectCard } from "./interactions";

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="site-shell site-footer">
      <div>
        <span>© {year} {profile.name}. All rights reserved.</span>
      </div>

      <nav className="footer-nav" aria-label="Footer Navigation">
        <Link href="/" className="footer-link">
          home
        </Link>
        <Link href="/projects" className="footer-link">
          projects
        </Link>
        <Link href="/about" className="footer-link">
          about
        </Link>
        <Link href="/contact" className="footer-link">
          contact
        </Link>
        <a
          href={profile.github}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          github
        </a>
        <a
          href={profile.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="footer-link"
        >
          linkedin
        </a>
      </nav>
    </footer>
  );
}

export function ProjectsCatalog() {
  const [filter, setFilter] = useState("all");

  const categories = [
    { id: "all", label: "All" },
    { id: "mobile", label: "Mobile / Android" },
    { id: "web", label: "Full-Stack Web" },
    { id: "systems", label: "Systems & AI" },
  ];

  const filteredProjects =
    filter === "all" ? projects : projects.filter((p) => p.category === filter);

  return (
    <div className="scroll-block">
      <div className="tabs-container">
        <div className="tab-list" role="tablist" aria-label="Project categories">
          {categories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={filter === cat.id}
              className="tab-btn"
              onClick={() => setFilter(cat.id)}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      <div className="projects-grid">
        {filteredProjects.map((project) => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </div>
    </div>
  );
}
