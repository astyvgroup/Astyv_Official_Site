// =====================================================================
//  ASTYV — SERVICES PAGE CONTENT
// =====================================================================

const services = {
  hero: {
    overline: "Services",
    headline: "Capabilities That\nCompound.",
    subheadline:
      "Astyv doesn't believe in siloed services. Our four practice areas are designed to interlock — so whether you need a strategic roadmap, a delivery team, or a production-ready product, you get a partner who sees the full picture.",
  },

  offerings: [
    {
      id: "product-innovation",
      icon: "Lightbulb",
      title: "Product Innovation",
      tagline: "From concept to market in months, not years.",
      description:
        "Astyv works alongside your product and business teams to identify high-value digital product opportunities, validate them with real users, and build production-grade platforms that scale. Our approach blends design thinking with lean engineering — so you invest in building the right thing before building the thing right.",
      capabilities: [
        "Product Discovery & Opportunity Assessment",
        "UX Research, Prototyping & Design Systems",
        "MVP Development & Rapid Iteration",
        "Platform Architecture & Scalability Engineering",
        "Go-to-Market Technical Strategy",
        "Post-Launch Optimization & Growth Engineering",
      ],
      caseBullets: [
        "Shipped a B2B SaaS MVP in 11 weeks for a Series A startup — first 100 paying customers within 90 days of launch.",
        "Rebuilt a marketplace's checkout flow — conversion lifted from 2.1% to 5.4% on the same traffic.",
        "Designed and launched a vertical fintech product on AWS with regulatory compliance baked in from day one.",
      ],
      metrics: { label: "Average time from concept to production MVP", value: "12 Weeks" },
    },
    {
      id: "it-consulting",
      icon: "BrainCircuit",
      title: "IT Consulting",
      tagline: "Strategy that ships. Advisory that builds.",
      description:
        "Astyv's consulting practice is led by practitioners who have designed, built, and operated the systems they advise on. We help CIOs and CTOs navigate cloud migration, application modernization, data strategy, AI adoption, and technology operating model redesign — always grounded in what's actually achievable.",
      capabilities: [
        "Digital Transformation Strategy & Roadmapping",
        "Cloud Migration & Multi-Cloud Architecture",
        "Application Modernization (Monolith to Microservices)",
        "AI & Machine Learning Strategy",
        "Technology Due Diligence (M&A Support)",
        "IT Operating Model & Governance Design",
      ],
      caseBullets: [
        "Authored a multi-cloud migration roadmap that saved a Fortune 1000 client $4.1M annually in infra costs.",
        "Led AI strategy work for a healthcare provider — five validated use cases prioritized over 60 candidates.",
        "Conducted technical due diligence for a $200M acquisition; surfaced the integration risk that reshaped the deal terms.",
      ],
      metrics: { label: "Client NPS across consulting engagements", value: "82" },
    },
    {
      id: "it-services",
      icon: "Code2",
      title: "IT Services",
      tagline: "Engineering excellence, delivered at scale.",
      description:
        "From custom application development to enterprise platform implementation, Astyv's engineering teams deliver production-grade software across the full technology stack. We operate in two-week sprint cycles with continuous deployment — giving you velocity without sacrificing quality.",
      capabilities: [
        "Custom Application Development (Web, Mobile, API)",
        "Enterprise Platform Integration (SAP, Salesforce, ServiceNow)",
        "Cloud-Native Engineering (AWS, Azure, GCP)",
        "Data Engineering & Analytics Pipelines",
        "DevOps, SRE & Platform Engineering",
        "Cybersecurity Assessment & Hardening",
      ],
      caseBullets: [
        "Decomposed a 15-year-old monolith into 23 microservices — zero downtime, deployment frequency went from bi-monthly to 12x/day.",
        "Built a real-time data pipeline processing 200M events/day on AWS for a logistics partner.",
        "Migrated a healthcare platform's legacy authentication to OAuth 2.1 + WebAuthn with zero user-facing disruption.",
      ],
      metrics: { label: "On-time delivery rate across all engagements", value: "96%" },
    },
    {
      id: "staffing",
      icon: "Users",
      title: "Staffing Solutions",
      tagline: "The right talent, exactly when you need them.",
      description:
        "Astyv's staffing practice gives you access to a curated network of pre-vetted technology professionals — from individual contributors to full cross-functional squads. Every candidate goes through our proprietary technical assessment, culture-fit evaluation, and reference validation process before they're presented to you.",
      capabilities: [
        "Contract & Contract-to-Hire Placement",
        "Full-Time Direct Hire",
        "Managed Delivery Squads (Embedded Teams)",
        "Executive & Leadership Search (CTO, VP Eng, Directors)",
        "Offshore & Nearshore Team Augmentation",
        "Rapid-Scale Hiring Programs",
      ],
      caseBullets: [
        "Scaled a Series B retail tech client's engineering team from 8 to 120 in 6 months — 95% one-year retention.",
        "Sourced and placed a CTO for a healthcare AI startup in 28 days, including reference validation.",
        "Built a managed offshore delivery squad of 14 engineers for a US fintech — fully embedded into their daily standups.",
      ],
      metrics: { label: "Average time to present qualified candidates", value: "5 Days" },
    },
  ],

  techStack: {
    overline: "Technology",
    heading: "Astyv's Technology Ecosystem",
    subheading:
      "We're technology-agnostic but opinion-rich. We select the right tools for the job, not the trendiest.",
    categories: [
      { name: "Cloud & Infrastructure", icon: "Cloud",       items: ["AWS", "Azure", "GCP", "Kubernetes", "Terraform", "Docker", "Helm", "Ansible"] },
      { name: "Languages & Frameworks", icon: "Code2",       items: ["TypeScript", "Python", "Java", "Go", "Rust", "React", "Next.js", "Node.js", "Spring Boot", ".NET", "Flutter"] },
      { name: "Data & AI",              icon: "Database",    items: ["Snowflake", "Databricks", "Apache Spark", "PostgreSQL", "MongoDB", "TensorFlow", "PyTorch", "OpenAI", "Anthropic", "LangChain", "Pinecone"] },
      { name: "DevOps & SRE",           icon: "GitBranch",   items: ["GitHub Actions", "GitLab CI", "Jenkins", "Datadog", "PagerDuty", "ArgoCD", "Prometheus", "Grafana"] },
    ],
  },

  // Engagement models (NEW)
  engagement: {
    overline: "How We Work With You",
    heading: "Three Ways to Engage Astyv",
    items: [
      {
        title: "Fixed-Bid Project",
        description: "For well-scoped initiatives where outcomes and timelines are clear. We commit to milestones, you commit to clarity. No scope-creep games.",
        bestFor: "MVP builds, defined platform implementations, modernization with known scope.",
        icon: "Target",
      },
      {
        title: "Time & Materials",
        description: "For evolving work where the destination is clear but the path is exploratory. Two-week sprints, weekly demos, complete transparency on hours.",
        bestFor: "AI prototyping, feature development, ongoing platform engineering.",
        icon: "Clock",
      },
      {
        title: "Managed Squad / Retainer",
        description: "For long-horizon partnerships. A dedicated cross-functional team embedded with your org — engineers, leads, designers, data — under a single retainer.",
        bestFor: "Continuous product development, embedded delivery pods, sustained platform investment.",
        icon: "Users",
      },
    ],
  },

  cta: {
    overline: "Get Started",
    heading: "Find the Right Engagement for Your Goals.",
    subheading: "Tell us what you're trying to do. We'll tell you exactly how we'd help — or, if we're not the right fit, who else to call.",
    buttonLabel: "Talk to Astyv",
    buttonPath: "/contact",
  },
};

export default services;
