export const profile = {
  name: "Tejas J Solanki",
  firstName: "Tejas",
  lastName: "Solanki",
  role: "Full-Stack Developer & Android Builder",
  headline: "Building offline-first Android apps, modern web platforms, and data systems.",
  bio: "Information Technology undergraduate at AU Rajkot with hands-on practice across native Android engineering, modern Next.js web applications, and backend systems. Focused on clean architecture, reliable local persistence, and high-performance interfaces.",
  exploring: ["Machine Learning", "GHL", "LLM", "Deep Learning"],
  email: "tejassolanki5881@gmail.com",
  github: "https://github.com/Tejas3545",
  linkedin: "https://www.linkedin.com/in/tejas-j-solanki2476/",
  twitter: "https://x.com/tejasjsolanki",
  instagram: "https://www.instagram.com/tejas_solanki_2476",
  location: "Rajkot, India",
  university: "AU Rajkot",
  degree: "IT @ AU Rajkot",
  avatar: "/img/tejas.jpg",
  avatarFallback: "https://avatars.githubusercontent.com/u/167677777?v=4",
  status: "Available for internships & developer roles",
  replyTime: "Usually replies within a day",
};

export const thought = {
  quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.",
  author: "Will Durant",
};

export const highlights = [
  {
    title: "GitHub Activity",
    value: "30+ Repos",
    subtitle: "Public repositories · Active open-source builder",
    href: "https://github.com/Tejas3545",
  },
  {
    title: "Hackathons & Coding",
    value: "Code Carnival & GitAgent",
    subtitle: "Adaptive Quiz (Gemini AI) & Offline FIR Engine",
    href: "https://github.com/Tejas3545/Quizi",
  },
  {
    title: "Academic Engineering",
    value: "Atmiya IT Lead",
    subtitle: "Department Attendance & Analytics Engine",
    href: "https://github.com/Tejas3545/atmiya-it-portal",
  },
];

export const experience = {
  work: [
    {
      role: "Web Development Intern",
      organization: "WeIntern Pvt Ltd",
      logo: "/img/weintern.png",
      location: "Remote / India",
      period: "Oct 2024 — Present",
      url: "https://github.com/Tejas3545",
      description: [
        "Developing semantic, responsive, high-performance web applications using modern frontend architectures and the Next.js App Router.",
        "Implementing component-driven design systems with fluid CSS Grid & Flexbox layouts adhering strictly to modern UX and accessibility guidelines.",
        "Building production-ready interfaces with dark/light theme switching, accessible focus states, and zero-layout-shift performance.",
        "Managing structured Git version control workflows, automated deployment verification, and comprehensive technical documentation.",
      ],
      skills: ["Next.js", "React", "JavaScript", "HTML5 & CSS3", "Git & GitHub"],
    },
    {
      role: "Data Science Intern",
      organization: "Zidio Development",
      logo: "/img/zidio.png",
      location: "Remote / India",
      period: "Jun 2024 — Sep 2024",
      url: "https://github.com/Tejas3545/churn-prediction-sales-analysis",
      description: [
        "Engineered customer churn prediction models using Logistic Regression and Random Forest classifiers with scikit-learn, optimizing classification thresholds.",
        "Conducted exploratory sales trend analysis and built automated data visualization pipelines with automated report generation.",
        "Developed NLP classification utilities for email spam detection and rule-based conversational modules.",
      ],
      skills: ["Python", "scikit-learn", "Pandas", "Matplotlib", "Data Analysis"],
    },
  ],
  education: [
    {
      role: "Bachelor of Technology in Information Technology",
      organization: "Atmiya University",
      logo: "/img/atmiya.png",
      location: "Rajkot, Gujarat, India",
      period: "Sep 2022 — Jun 2026",
      url: "https://atmiya.ac.in",
      description: [
        "Pursuing core Computer Science & IT curriculum covering Data Structures, Relational Database Management (SQL), Android App Development, Operating Systems, and Web Engineering.",
        "Engineered the official Atmiya IT Attendance & Analytics Portal (atmiya-it-portal), parsing departmental records for real-time student tracking.",
        "Active technical lead in student hackathons, workshops, and open-source initiatives.",
      ],
      skills: ["Data Structures", "Android SDK", "SQL & Relational Databases", "Python", "Web Engineering"],
    },
  ],
};

export const leadership = [
  "Top Finalist, Code Carnival 2 Hackathon — Built Quizi, an adaptive AI quiz engine using Google Gemini",
  "Department Technical Lead, Atmiya IT Attendance & Analytics Portal (atmiya-it-portal)",
  "Participant, Gemma 4 Offline FIR Narration & Document Engine Hackathon",
  "Participant, GitAgent CTF Cryptanalysis & Automated Cipher Identification Hackathon",
  "Active Open Source Contributor with 30+ Public Repositories across Android, Web, and ML",
  "Core Technical Member, Atmiya Developer Student Circle (ADSC)",
];

export const skillCategories = [
  {
    id: "frontend",
    title: "Frontend",
    skills: [
      { name: "React", icon: "react" },
      { name: "Next.js", icon: "nextjs" },
      { name: "TypeScript", icon: "typescript" },
      { name: "JavaScript", icon: "javascript" },
      { name: "HTML5", icon: "html5" },
      { name: "Tailwind CSS", icon: "tailwind" },
    ],
  },
  {
    id: "backend",
    title: "Backend",
    skills: [
      { name: "Python", icon: "python" },
      { name: "Flask", icon: "flask" },
      { name: "FastAPI", icon: "fastapi" },
      { name: "Node.js", icon: "nodejs" },
      { name: "Express", icon: "express" },
    ],
  },
  {
    id: "mobile",
    title: "Mobile / Android",
    skills: [
      { name: "Kotlin", icon: "kotlin" },
      { name: "Jetpack Compose", icon: "compose" },
      { name: "Room SQLite", icon: "sqlite" },
      { name: "Android SDK", icon: "android" },
    ],
  },
  {
    id: "databases",
    title: "Databases",
    skills: [
      { name: "PostgreSQL", icon: "postgres" },
      { name: "SQLite", icon: "sqlite" },
      { name: "MySQL", icon: "mysql" },
      { name: "MongoDB", icon: "mongodb" },
      { name: "Firebase", icon: "firebase" },
    ],
  },
  {
    id: "tools",
    title: "Tools & DevOps",
    skills: [
      { name: "Git", icon: "git" },
      { name: "GitHub", icon: "github" },
      { name: "Docker", icon: "docker" },
      { name: "Postman", icon: "postman" },
      { name: "Linux / CLI", icon: "terminal" },
    ],
  },
];

export const projects = [
  {
    id: "syncspend",
    name: "SyncSpend",
    category: "mobile",
    discipline: "Native Android · Personal Finance",
    tagline: "Offline-first expense tracking with seamless cloud synchronization.",
    description:
      "A native Android expense manager designed for zero-latency everyday logging. Stores transactions locally in Room SQLite and leverages Android WorkManager to reliably synchronize records to Notion and Google Sheets whenever connectivity resumes.",
    about:
      "Engineered with an offline-first architecture to eliminate network lag when logging daily transactions. Room SQLite handles transactional ACID consistency locally, while Kotlin StateFlow drives instantaneous UI state updates. Background synchronization runs smoothly via Android WorkManager with exponential backoff.",
    architecture: [
      "Offline-first architecture ensuring immediate UI updates with zero network wait",
      "Room SQLite database with reactive Kotlin StateFlow pipelines",
      "Background synchronization worker powered by Android WorkManager",
      "Modern declarative UI built entirely with Jetpack Compose & Material 3",
    ],
    tags: ["Kotlin", "Jetpack Compose", "Room SQLite", "WorkManager"],
    source: "https://github.com/Tejas3545/SyncSpend",
    live: null,
    featured: true,
    image: "/img/projects/syncspend.png",
  },
  {
    id: "atmiya",
    name: "Atmiya IT Portal",
    category: "web",
    discipline: "Full-Stack Web · Academic Analytics",
    tagline: "Student attendance tracking and academic performance dashboard.",
    description:
      "A centralized academic web portal built for IT students and faculty at AU Rajkot. Ingests departmental Excel lecture logs to deliver instant attendance calculations, weekly breakdown matrices, and compensation tracking.",
    about:
      "Replaced scattered spreadsheets across the B.Tech department with an automated ingestion parser. Students and faculty can instantly look up weekly subject attendance, lecture counts, and medical compensation status through a responsive, mobile-optimized dashboard.",
    architecture: [
      "Automated Excel data ingestion parser replacing scattered spreadsheets",
      "Interactive weekly attendance visualization with lecture-by-lecture breakdowns",
      "Clean REST API backend developed with Python and Flask",
      "Responsive, mobile-optimized dashboard interface for quick student lookups",
    ],
    tags: ["Python", "Flask", "JavaScript", "REST API"],
    source: "https://github.com/Tejas3545/atmiya-it-portal",
    live: null,
    featured: true,
    image: "/img/projects/atmiya.png",
  },
  {
    id: "adschackathon",
    name: "ADSCHACKATHON",
    category: "web",
    discipline: "Realtime Engine · Competitive Platform",
    tagline: "Live hackathon leaderboard with automated GitHub commit evaluation.",
    description:
      "A real-time competitive hackathon scoring platform that polls each team's GitHub repository every two minutes, verifies commits against milestone criteria, and broadcasts live XP updates to spectators through Server-Sent Events (SSE).",
    about:
      "Automates hackathon judging by connecting directly to team repositories. An async polling worker inspects commit SHAs, milestone flags, and commit timestamps, awarding XP in real-time. Spectators watch a live animated leaderboard powered by Server-Sent Events (SSE) and Next.js.",
    architecture: [
      "Real-time event streaming pipeline powered by Server-Sent Events (SSE)",
      "Automated GitHub API polling worker checking commit sha and message milestones",
      "MongoDB document store tracking team rosters, submissions, and point logs",
      "Next.js App Router frontend with real-time animated leaderboard rankings",
    ],
    tags: ["Next.js", "TypeScript", "MongoDB", "SSE"],
    source: "https://github.com/Tejas3545/ADSCHACKATHON",
    live: null,
    featured: true,
    image: "/img/projects/adschackathon.png",
  },
  {
    id: "smart-business-ai",
    name: "Smart AI Business Assistant",
    category: "systems",
    discipline: "AI & Systems · RAG Architecture",
    tagline: "Enterprise MVP combining conversational AI, document retrieval, and lead capture.",
    description:
      "A production-oriented enterprise MVP developed for data-driven customer workflows. Couples a conversational assistant with a Retrieval-Augmented Generation (RAG) knowledge engine, automated lead capture pipelines, and an administrative control panel.",
    about:
      "Designed as a reliable enterprise assistant combining semantic document search with conversational guidance. Documents are chunked and vectorized, enabling high-precision contextual answers while capturing customer leads into a PostgreSQL relational ledger.",
    architecture: [
      "RAG document retrieval pipeline chunking and indexing technical documents",
      "FastAPI asynchronous backend with PostgreSQL and SQLAlchemy ORM",
      "Automated lead ingestion and workflow trigger pipeline",
      "Containerized deployment running via Docker Compose",
    ],
    tags: ["Python", "FastAPI", "PostgreSQL", "Docker"],
    source: "https://github.com/Tejas3545/Smart-AI-Business-Assistant-Platform",
    live: null,
    featured: true,
    image: "/img/projects/smart-business-ai.png",
  },
  {
    id: "mega-ai",
    name: "Mega-AI Video Pipeline",
    category: "systems",
    discipline: "Computer Vision · Realtime Video",
    tagline: "Real-time face detection pipeline streaming low-latency video over WebSockets.",
    description:
      "A real-time face detection pipeline built with FastAPI and MediaPipe. Detects facial landmarks and features per frame, streaming processed frames to a React frontend over low-latency MJPEG and WebSockets inside Docker.",
    about:
      "High-speed computer vision pipeline processing camera frames at 30fps. Streams annotated frames and facial landmark coordinates over persistent binary WebSockets to a React client with zero perceptible latency.",
    architecture: [
      "FastAPI streaming backend utilizing MediaPipe for 30fps face tracking",
      "Dual streaming transport supporting both MJPEG and binary WebSocket frames",
      "Interactive React client rendering real-time bounding boxes and confidence metrics",
      "Isolated container packaging with Docker Compose",
    ],
    tags: ["FastAPI", "MediaPipe", "React", "Docker"],
    source: "https://github.com/Tejas3545/Mega-AI",
    live: null,
    featured: false,
    image: "/img/projects/mega-ai.png",
  },
  {
    id: "quizi",
    name: "Quizi Adaptive Engine",
    category: "web",
    discipline: "Adaptive Learning · AI Hackathon",
    tagline: "AI-driven adaptive quiz platform built for Code Carnival 2.",
    description:
      "An adaptive quiz platform engineered for the Code Carnival 2 hackathon. Leverages Gemini AI to dynamically adjust question difficulty based on student response patterns, featuring streaks, leaderboards, and GATE exam sets.",
    about:
      "Built for the Code Carnival 2 hackathon, Quizi monitors a student's answer patterns and dynamically adjusts upcoming question difficulty using Gemini API prompts, featuring streaks, scoring multipliers, and GATE CS sets.",
    architecture: [
      "Adaptive difficulty algorithm dynamically querying Gemini for calibrated questions",
      "Session state management tracking student streaks, timings, and weak spots",
      "Curated practice sets for GATE Computer Science preparation",
      "Responsive React interface styled with Tailwind CSS",
    ],
    tags: ["TypeScript", "React", "Gemini API"],
    source: "https://github.com/Tejas3545/Quizi",
    live: null,
    featured: false,
    image: "/img/projects/quizi.png",
  },
  {
    id: "money-heist-quiz",
    name: "Money Heist Quiz",
    category: "web",
    discipline: "Interactive Web · Game Engine",
    tagline: "Themed real-time quiz game with interactive audio-visual feedback.",
    description:
      "A fast, suspense-driven interactive web game inspired by the series Money Heist. Engineered with TypeScript for strict type safety, responsive scoring logic, randomized question state, and fluid UI micro-interactions deployed on Vercel.",
    about:
      "A zero-dependency client-side game engine built in TypeScript. Features randomized question sequences, high-pressure countdown timers, dynamic audio-visual feedback, and global edge distribution via Vercel.",
    architecture: [
      "Lightweight, zero-dependency client-side game engine written in TypeScript",
      "Real-time countdown timer, score calculation, and evaluation matrix",
      "Thematic visual styling with smooth CSS keyframe motion effects",
      "Deployed on Vercel with global edge distribution and 100/100 Lighthouse score",
    ],
    tags: ["TypeScript", "React", "Vercel Edge"],
    source: "https://github.com/Tejas3545/money-heist-quiz",
    live: "https://money-heist-quiz.vercel.app",
    featured: false,
    image: "/img/projects/money-heist.png",
  },
  {
    id: "agrosense",
    name: "AgroSense",
    category: "systems",
    discipline: "Agritech · Machine Learning",
    tagline: "Crop disease diagnosis with severity estimation and treatment protocols.",
    description:
      "An intelligent crop diagnosis platform. Users upload field photos of crops to receive instant disease classification, severity metrics, and recommended treatment advice, with a historical record of past inspections.",
    about:
      "Assists agricultural workers with on-the-spot crop health diagnosis. Deep learning classifiers evaluate uploaded leaf imagery, estimate infection severity, and generate step-by-step treatment protocols.",
    architecture: [
      "Deep learning inference model classifying common agricultural foliage diseases",
      "Flask backend handling image pre-processing, normalization, and scan logging",
      "Clean React dashboard showing past scan history and prevention guides",
      "SQLite local storage for instant query response",
    ],
    tags: ["Python", "Flask", "React", "SQLite"],
    source: "https://github.com/Tejas3545/AgroSense",
    live: null,
    featured: false,
    image: "/img/projects/agrosense.png",
  },
  {
    id: "crm-plumbing",
    name: "Plumbing CRM & POS",
    category: "web",
    discipline: "Business Systems · POS & Ledger",
    tagline: "Full-scale CRM, inventory management, and POS billing system.",
    description:
      "A complete inventory, point-of-sale, and billing management system built for plumbing hardware businesses. Handles GST invoice generation, live stock auditing, customer credit ledgers, and supplier procurement.",
    about:
      "Engineered for hardware wholesale and retail operations. Supports live inventory barcode auditing, GST-compliant invoice generation, customer credit ledgers with automated balance summaries, and vendor procurement.",
    architecture: [
      "FastAPI asynchronous REST backend with SQLAlchemy ORM and PostgreSQL",
      "Automated GST invoice generator calculating itemized tax rates",
      "Ledger management system tracking customer outstanding balances and payment receipts",
      "Interactive React frontend with instant search and barcode input compatibility",
    ],
    tags: ["FastAPI", "React", "PostgreSQL"],
    source: "https://github.com/Tejas3545/CRM",
    live: null,
    featured: false,
    image: "/img/projects/crm.png",
  },
];
