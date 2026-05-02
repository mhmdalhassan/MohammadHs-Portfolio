// ============================================================
//  portfolioData.js  –  Edit this file to update your content
// ============================================================

export const personal = {
  name: "Mohammad Al Hassan",
  title: "Full-Stack Web Developer",
  tagline: "Building modern web apps from idea to deployment.",
  email: "mhmd.6hs@gmail.com",
  phone: "+961 78 910 585",
  linkedin: "https://www.linkedin.com/in/mohammadalhassan/",
  github: "https://github.com/mhmdalhassan",
  avatar: "/images/me.jpg",
  location: "Lebanon",
  cvUrl: "/Mohammad_Al_Hassan_CV.pdf", // place your CV PDF in /public
  summary:
    "Full-Stack Web Developer with hands-on full-stack project experience and a Communication Engineering background. Currently completing an intensive program at The Digital Hub. Fast learner, detail-oriented, and eager to contribute to modern software projects.",
  avatarInitials: "MH",
};

// ─── Skills ──────────────────────────────────────────────────
export const skills = [
  {
    category: "Languages",
    icon: "💻",
    items: ["JavaScript", "PHP", "HTML5", "CSS3"],
  },
  {
    category: "Frameworks & Libraries",
    icon: "⚡",
    items: ["React", "Node.js", "Express", "Next.js", "Laravel", "Bootstrap", "Tailwind CSS"],
  },
  {
    category: "Databases",
    icon: "🗄️",
    items: ["MySQL", "MongoDB"],
  },
  {
    category: "DevOps & Tools",
    icon: "🛠️",
    items: ["Git", "GitHub", "GitLab", "Docker", "Kubernetes", "CI/CD", "Postman"],
  },
  {
    category: "Project Management",
    icon: "📋",
    items: ["Jira", "ClickUp", "Slack", "Agile / Scrum", "SOLID Principles"],
  },
  {
    category: "Design & Multimedia",
    icon: "🎨",
    items: ["Figma", "Adobe Photoshop", "Adobe Premiere", "Photography", "Video Editing"],
  },
];

// ─── Experience ───────────────────────────────────────────────
export const experience = [
  {
    id: 1,
    role: "Freelance Web Developer",
    company: "Al Mooradi's Workspace",
    type: "Remote",
    period: "Mar 2026 – Present",
    bullets: [
      "Collaborated within a distributed remote team to develop features for large-scale, international projects.",
      "Utilized GitHub for version control and structured code reviews.",
      "Managed project workflows and executed modular assignments via ClickUp, taking ownership of complex, task-based deliverables from conception to completion.",
    ],
  },
  {
    id: 2,
    role: "Freelance Web Developer",
    company: "Self-Employed",
    type: "Remote",
    period: "2025 – Present",
    bullets: [
      "Developing custom websites and web-based applications for real, paying clients.",
      "Building end-to-end business systems such as POS solutions for the food and retail sector, covering cashier operations, order management, reporting, expenses, and inventory workflows.",
      "Delivering full-stack solutions using Laravel, React, and MySQL while working directly with clients.",
    ],
  },
];

// ─── Education ────────────────────────────────────────────────
export const education = [
  {
    id: 1,
    degree: "Full-Stack Web Development Program",
    institution: "The Digital Hub",
    location: "Beirut, Lebanon",
    period: "Jul 2025 – Dec 2025",
    bullets: [
      "Constructed responsive full-stack apps based on MERN, Next.js, and Laravel architectures.",
      "Developed RESTful APIs through Express.js, Next.js, and Laravel frameworks.",
      "Built dashboard-driven web systems for fintech and multi-role users.",
      "Practiced Agile methodology using Jira workflows, sprint retrospectives, and daily updates.",
      "Adopted SOLID principles and reusable design structures.",
    ],
  },
  {
    id: 2,
    degree: "Science of Communication Engineering (Undergraduate)",
    institution: "Lebanese International University",
    location: "Saida, Lebanon",
    period: "Aug 2018 – Jun 2021",
    bullets: [
      "Gained foundational knowledge in networking, IT, programming, and digital systems.",
    ],
  },
  {
    id: 3,
    degree: "Graphic Design Diploma",
    institution: "CIS College",
    location: "Saida, Lebanon",
    period: "Sep 2020 – Jun 2021",
    bullets: [
      "Learned graphic design principles, visual communication, and multimedia production.",
    ],
  },
];

// ─── Projects ─────────────────────────────────────────────────
export const projects = [
  {
    id: 1,
    title: "Electronics POS & Management System",
    description:
      "Full-stack Point-of-Sale and Inventory Management System with role-based access control for Admin, Clerk, and Accountant. Features product and category modules, delivery interface, and a client-facing shopping page.",
    techStack: ["MongoDB", "Express", "React", "Node.js"],
    stack: "MERN",
    github: "https://github.com/mhmdalhassan/Electronics-POS-MERN-stack",
    live: null,
    featured: true,
  },
  {
    id: 2,
    title: "MH-C Academy",
    description:
      "Fully informative educational website with a built-in Content Management System (CMS) and role-based access control, enabling dynamic content updates by authorized users.",
    techStack: ["Laravel", "PHP", "MySQL", "Bootstrap"],
    stack: "LAMP",
    github: "https://github.com/mhmdalhassan/MHC-Academy",
    live: null,
    featured: true,
  },
  {
    id: 3,
    title: "LEB-EX",
    description:
      "Modern full-stack web platform designed to help local businesses manage their operations efficiently through a centralized, role-based system. Focused on scalability, security, and real-world business workflows.",
    techStack: ["Laravel", "React", "MySQL"],
    stack: "Full-Stack",
    github: "https://github.com/mhmdalhassan/LEB-EX",
    live: null,
    featured: true,
  },
];

// ─── Certificates ─────────────────────────────────────────────
export const certificates = [
  {
    id: 1,
    title: "Advanced Leadership Diploma",
    issuer: "IABC",
    period: "06/2015 – 06/2021",
    icon: "🏆",
  },
  {
    id: 2,
    title: "Design Thinking Training",
    issuer: "UNICEF – Generation of Innovation Leaders",
    period: "09/2024",
    icon: "💡",
  },
  {
    id: 3,
    title: "Full-Stack Web Development",
    issuer: "The Digital Hub",
    period: "2025",
    icon: "🎓",
  },
];

// ─── Spoken Languages ──────────────────────────────────────────
export const spokenLanguages = [
  { language: "Arabic", level: "Native", percent: 100 },
  { language: "English", level: "Professional", percent: 85 },
];

// ─── Soft Skills ───────────────────────────────────────────────
export const softSkills = [
  "Leadership",
  "Problem Solving",
  "Collaboration",
  "Fast Learner",
  "Detail-Oriented",
  "Agile Mindset",
];

// ─── Navigation links ─────────────────────────────────────────
export const navLinks = [
  { label: "About",        href: "#about" },
  { label: "Skills",       href: "#skills" },
  { label: "Experience",   href: "#experience" },
  { label: "Education",    href: "#education" },
  { label: "Projects",     href: "#projects" },
  { label: "Certificates", href: "#certificates" },
  { label: "Contact",      href: "#contact" },
];