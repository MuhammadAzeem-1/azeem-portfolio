export type Market = "global" | "saudi";
export type Project = {
  slug: string; name: string; category: string; summary: string; accent: "violet" | "cyan" | "green";
  technologies: string[]; highlights: string[]; context: string;
  screenshot?: { src: string; alt: string; width: number; height: number };
  sections: { title: string; description: string; items: string[] }[];
};

// The only source of personal content. Supplied brief details await comparison with the original CV.
// Use null for unavailable assets/links; never substitute fictional URLs or PDFs.
export const portfolio = {
  name: "Muhammad Azeem",
  initials: "MA",
  role: "Full-Stack Software Engineer",
  email: "mazxeem123@gmail.com",
  linkedin: "https://www.linkedin.com/in/muhammad-azeem1/",
  github: null as string | null,
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || null,
  portrait: null as string | null,
  availability: "Open to opportunities",
  availabilityDescription: "Open to international remote roles and relocation opportunities in Saudi Arabia or Germany.",
  targetMarkets: ["Remote", "Saudi Arabia", "Germany"],
  projectRotationMs: 10000,
  coreStack: [
    { name: "React", color: "#61dafb" }, { name: "Vue 3", color: "#57c78d" },
    { name: "TypeScript", color: "#5798ed" }, { name: "Node.js", color: "#77bc64" },
    { name: "PostgreSQL", color: "#78a9d1" }, { name: "FastAPI", color: "#4bceba" },
  ],
  heroTitle: { opening: "Production SaaS.", middle: "Intelligent software.", accent: "Built for real work." },
  introduction: "I build production SaaS platforms, AI-integrated products, and scalable business systems using modern frontend and backend technologies.",
  philosophy: "Good software starts with understanding the people who use it. I care about clear interfaces, dependable systems, and taking responsibility for the details that connect them.",
  about: "My focus is full-stack engineering, with a particular interest in practical AI and complex business workflows. I value continuous learning, honest communication, and thoughtful collaboration from the first conversation to the finished product.",
  contactTitle: { opening: "Let’s build something", accent: "meaningful." },
  contactDescription: "Have an engineering opportunity or a product challenge in mind? I’m open to international remote roles and relocation conversations.",
  markets: {
    global: { label: "Global / Remote", message: "Production SaaS & AI integrations for distributed teams", resume: null as string | null, projectOrder: ["odoopilot", "dockops", "aishop"] },
    saudi: { label: "Saudi Arabia", message: "AI-enabled business platforms & ERP workflows · Open to relocation", resume: null as string | null, projectOrder: ["odoopilot", "aishop", "dockops"] },
  },
  experience: [
    { company: "ByteLegions", role: "Full Stack Developer", dates: "March 2025 — Present", current: true },
    { company: "ZikraInfotech LLC", role: "React Developer", dates: "September 2023 — April 2025", current: false },
    { company: "Enigmatix", role: "Frontend Developer", dates: "January 2022 — August 2023", current: false },
  ],
  expertise: [
    { title: "Frontend Engineering", description: "Clear, responsive interfaces for complex products.", technologies: ["React", "Vue 3", "TypeScript"] },
    { title: "Backend & APIs", description: "Business logic, integrations, and tenant-aware systems.", technologies: ["Node.js", "Express", "NestJS", "FastAPI"] },
    { title: "AI & LLM Integrations", description: "Practical AI connected to real business workflows.", technologies: ["LLM APIs", "RAG", "Streaming interfaces", "Odoo RPC"] },
    { title: "Data & Infrastructure", description: "Relational and document data for production applications.", technologies: ["PostgreSQL", "MongoDB", "Prisma", "TypeORM"] },
    { title: "Production Quality", description: "A focus on dependable behavior and maintainable delivery.", technologies: ["Role-based access", "Audit workflows", "Type safety"] },
  ],
  projects: [
    {
      slug: "odoopilot", name: "OdooPilot", category: "AI-powered Odoo SaaS", accent: "violet",
      summary: "Bringing conversational AI, document workflows, and ERP automation into one multi-tenant workspace.",
      technologies: ["React", "TypeScript", "FastAPI", "MongoDB", "LLM APIs", "RAG", "Odoo RPC"],
      highlights: ["Streaming AI interfaces", "Document workflows", "Multi-tenant workspaces", "ERP automation"],
      context: "OdooPilot connects AI-assisted workflows with Odoo business operations. The project combines a streaming interface, document-based retrieval, and ERP integrations in a multi-tenant SaaS environment.",
      sections: [
        { title: "A connected AI workspace", description: "The interface brings conversations and document workflows into the same product experience.", items: ["Streaming AI responses", "Document-oriented workflows", "Tenant-specific workspaces"] },
        { title: "From context to business workflows", description: "The integration layer connects language models and retrieved context with ERP functionality.", items: ["LLM API integrations", "Retrieval-augmented generation", "Odoo XML-RPC / JSON-RPC automation"] },
      ],
    },
    {
      slug: "aishop", name: "AiShop Solution", category: "Automotive ERP", accent: "cyan",
      summary: "A connected operations platform for automotive scheduling, inventory, payments, and everyday business workflows.",
      technologies: ["Vue 3", "TypeScript", "Node.js", "Express", "Prisma", "PostgreSQL"],
      highlights: ["Operational workflows", "Scheduling & inventory", "Payments & integrations", "Multi-tenant systems"],
      context: "AiShop Solution brings automotive business operations into a single ERP platform. Scheduling, inventory, payment workflows, and external integrations form the core of the product.",
      sections: [
        { title: "Connected daily operations", description: "The product spans the workflows that automotive teams use to organize their work.", items: ["Scheduling workflows", "Inventory management", "Operational business interfaces"] },
        { title: "An integrated business platform", description: "Backend services connect product workflows to structured data and third-party systems.", items: ["Payment workflows", "Third-party integrations", "Multi-tenant systems with Prisma and PostgreSQL"] },
      ],
    },
    {
      slug: "dockops", name: "DockOps", category: "Maritime workforce operations", accent: "green",
      summary: "Coordinating dispatch, workforce assignments, certifications, and scheduling for maritime operations.",
      technologies: ["Vue 3", "TypeScript", "NestJS", "TypeORM", "PostgreSQL"],
      highlights: ["Dispatch & assignment", "Role-based access", "Certifications & scheduling", "Audit workflows"],
      context: "DockOps supports the coordination of maritime workforces. Its workflows cover dispatch, assignments, certification tracking, and scheduling, with access controls and audit workflows.",
      sections: [
        { title: "Workforce coordination", description: "A shared operational interface brings assignment and scheduling workflows together.", items: ["Workforce dispatch", "Assignment management", "Certification and scheduling workflows"] },
        { title: "Operational accountability", description: "Structured access and audit workflows support the needs of different operational roles.", items: ["Role-based access control", "Audit workflows", "NestJS services with TypeORM and PostgreSQL"] },
      ],
    },
  ] satisfies Project[],
};

export function resumeHref(market: Market = "global") {
  const path = portfolio.markets[market].resume ?? portfolio.markets.global.resume;
  return path || `mailto:${portfolio.email}?subject=${encodeURIComponent("Resume request — " + portfolio.name)}`;
}
export function resumeLabel(market: Market = "global") {
  return portfolio.markets[market].resume || portfolio.markets.global.resume ? "View resume" : "Request resume";
}
