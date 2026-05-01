// =====================================================================
//  ASTYV — HOMEPAGE CONTENT
// =====================================================================
//  Each block below maps to a section on the home page.
//  To add/remove items in arrays, just edit the array — counts auto-adjust.
//  Lucide icon names are valid: https://lucide.dev/icons
// =====================================================================

const home = {
  // ---------------- Hero (top of page) ----------------
  hero: {
    overline: "Welcome to Astyv",
    headline: "We Don't Just Build Software.\nWe Engineer Futures.",
    // Static fallback subheadline — used by older code paths and as a safe default
    subheadline:
      "Astyv partners with visionary enterprises to architect, build, and scale digital solutions that redefine industries. From strategic consulting to hands-on engineering — we turn complexity into competitive advantage.",
    // Rotating sublines (typewriter effect, 3-5 phrases — cycled through one by one)
    rotatingSublines: [
      "Architecting, building, and scaling digital solutions that redefine industries.",
      "From AI strategy to production engineering — turning complexity into advantage.",
      "150+ enterprises trust Astyv. 98% stick with us. Here's why.",
      "Strategy that ships. Advisory that builds. Talent that sticks.",
    ],
    cta: { label: "Explore Our Work", path: "/case-studies" },
    ctaSecondary: { label: "Talk to an Expert", path: "/contact" },
    scrollHint: "Scroll to discover",
  },

  // ---------------- Stats bar ----------------
  stats: [
    { value: 150, suffix: "+", label: "Enterprise Clients", description: "Across 12 countries and 18 industries" },
    { value: 98,  suffix: "%", label: "Client Retention",   description: "Annual rate, year over year" },
    { value: 500, suffix: "+", label: "Engineers & Consultants", description: "Pre-vetted, top 3% talent" },
    { value: 12,  suffix: "",  label: "Countries Served",   description: "And every major time zone" },
  ],

  // ---------------- Services preview (4 cards) ----------------
  servicesPreview: {
    overline: "Capabilities",
    heading: "What Astyv Does",
    subheading: "Four integrated capabilities, one relentless focus — accelerating your digital ambition.",
    items: [
      {
        icon: "Lightbulb",
        title: "Product Innovation",
        description:
          "From zero-to-one ideation to scalable product platforms — we conceive, design, prototype, and launch digital products that capture markets and create new revenue streams.",
        link: "/services#product-innovation",
        accentMetric: "12 weeks to MVP",
      },
      {
        icon: "BrainCircuit",
        title: "IT Consulting",
        description:
          "Strategic technology advisory that aligns your IT roadmap with business objectives. We navigate cloud migrations, architecture modernization, AI adoption, and digital operating model design.",
        link: "/services#it-consulting",
        accentMetric: "82 NPS score",
      },
      {
        icon: "Code2",
        title: "IT Services",
        description:
          "End-to-end software engineering across the stack — custom applications, enterprise platforms, cloud-native solutions, data pipelines, DevOps automation, and cybersecurity hardening.",
        link: "/services#it-services",
        accentMetric: "96% on-time delivery",
      },
      {
        icon: "Users",
        title: "Staffing Solutions",
        description:
          "Access curated, pre-vetted technology talent on demand. From individual specialists to full delivery squads — embedded seamlessly into your teams, culture, and workflows.",
        link: "/services#staffing",
        accentMetric: "5-day shortlist",
      },
    ],
  },

  // ---------------- Why Astyv ----------------
  whyAstyv: {
    overline: "Why Choose Astyv",
    heading: "We Think Differently",
    subheading:
      "In a crowded technology landscape, what sets Astyv apart isn't just what we deliver — it's how we think about the problem in the first place.",
    points: [
      {
        icon: "Target",
        title: "Outcome-Obsessed",
        description:
          "We measure success by your business metrics, not billable hours. Every engagement is designed around the outcomes that matter to you — revenue growth, operational efficiency, market speed, risk reduction.",
      },
      {
        icon: "Cpu",
        title: "Engineering-First Culture",
        description:
          "Our leadership team writes code. Our architects ship production systems. This isn't a firm where strategy lives in slide decks — we prototype, validate, and iterate at the speed of software.",
      },
      {
        icon: "Eye",
        title: "Radical Transparency",
        description:
          "No black boxes. You get real-time visibility into every sprint, every decision, every trade-off. We believe the best partnerships are built on shared context, not information asymmetry.",
      },
      {
        icon: "Award",
        title: "Talent Density",
        description:
          "We hire the top 3%. Every engineer, every consultant, every designer has been through our rigorous vetting process. You get senior-caliber talent from day one — not a bait-and-switch.",
      },
    ],
  },

  // ---------------- Process (NEW: 6-step horizontal journey) ----------------
  process: {
    overline: "How We Work",
    heading: "Six Steps. One Outcome.",
    subheading:
      "From the first conversation to launch and beyond, every Astyv engagement follows a clear, transparent rhythm. No surprises. No black boxes.",
    steps: [
      { number: "01", icon: "Search",       title: "Discover",  description: "We start by understanding your goals, constraints, and current systems. No assumptions, no boilerplate." },
      { number: "02", icon: "Compass",      title: "Strategy",  description: "We translate ambition into a roadmap — milestones, risks, dependencies, and success metrics." },
      { number: "03", icon: "PenTool",      title: "Design",    description: "We prototype the experience and architecture before writing a line of production code." },
      { number: "04", icon: "Hammer",       title: "Build",     description: "Two-week sprints, continuous deployment, full visibility into the work as it happens." },
      { number: "05", icon: "Rocket",       title: "Launch",    description: "We ship to production with confidence — load-tested, security-reviewed, observability-instrumented." },
      { number: "06", icon: "TrendingUp",   title: "Scale",     description: "We stay engaged through scale-up, optimization, and the next wave of opportunities." },
    ],
  },

  // ---------------- Industries served (NEW) ----------------
  industries: {
    overline: "Industries",
    heading: "Where Astyv Has Impact",
    subheading: "We've built across regulated, high-stakes, and high-velocity industries. The pattern: deep domain immersion, then technology that compounds.",
    items: [
      { icon: "Banknote",   name: "Financial Services", description: "Risk, underwriting, payments, compliance" },
      { icon: "HeartPulse", name: "Healthcare",         description: "EHR, telehealth, clinical platforms" },
      { icon: "ShoppingBag", name: "Retail & E-Commerce", description: "Storefronts, supply chain, personalization" },
      { icon: "Cloud",      name: "SaaS & Platforms",   description: "Multi-tenant infrastructure, billing, integrations" },
      { icon: "Factory",    name: "Manufacturing",      description: "OT/IT convergence, predictive maintenance" },
      { icon: "GraduationCap", name: "Education",       description: "Learning platforms, assessment, content delivery" },
      { icon: "Truck",      name: "Logistics",          description: "Routing, visibility, fleet optimization" },
      { icon: "Building2",  name: "Real Estate",        description: "Property tech, transaction platforms, analytics" },
    ],
  },

  // ---------------- Case studies preview (carousel of 3) ----------------
  caseStudiesPreview: {
    overline: "Proof of Work",
    heading: "Real Engagements. Real Numbers.",
    subheading: "Three brief windows into how Astyv has moved the needle for partner organizations.",
    cta: { label: "See All Case Studies", path: "/case-studies" },
  },

  // ---------------- Tech marquee (NEW) ----------------
  // Each entry: { name: "displayed label", slug: "simple-icons slug for the logo" }
  // Find slugs at https://simpleicons.org — copy the slug from the icon page URL.
  // Logos auto-load from cdn.simpleicons.org. If a slug doesn't exist, only
  // the name shows (graceful fallback).
  techMarquee: {
    overline: "Technology Stack",
    heading: "We Speak Every Modern Stack",
    subheading: "Technology-agnostic but opinion-rich. We pick the right tool for the job, not the trendiest.",
    rows: [
      [
        { name: "AWS",        slug: "amazonwebservices" },
        { name: "Azure",      slug: "microsoftazure" },
        { name: "GCP",        slug: "googlecloud" },
        { name: "Kubernetes", slug: "kubernetes" },
        { name: "Docker",     slug: "docker" },
        { name: "Terraform",  slug: "terraform" },
        { name: "Ansible",    slug: "ansible" },
        { name: "Helm",       slug: "helm" },
      ],
      [
        { name: "TypeScript", slug: "typescript" },
        { name: "Python",     slug: "python" },
        { name: "Java",       slug: "openjdk" },
        { name: "Go",         slug: "go" },
        { name: "Rust",       slug: "rust" },
        { name: "Node.js",    slug: "nodedotjs" },
        { name: ".NET",       slug: "dotnet" },
        { name: "Spring",     slug: "spring" },
      ],
      [
        { name: "React",      slug: "react" },
        { name: "Next.js",    slug: "nextdotjs" },
        { name: "Vue",        slug: "vuedotjs" },
        { name: "Svelte",     slug: "svelte" },
        { name: "Flutter",    slug: "flutter" },
        { name: "iOS",        slug: "apple" },
        { name: "Android",    slug: "android" },
        { name: "GraphQL",    slug: "graphql" },
      ],
      [
        { name: "PostgreSQL", slug: "postgresql" },
        { name: "Snowflake",  slug: "snowflake" },
        { name: "Databricks", slug: "databricks" },
        { name: "MongoDB",    slug: "mongodb" },
        { name: "Redis",      slug: "redis" },
        { name: "Kafka",      slug: "apachekafka" },
        { name: "Spark",      slug: "apachespark" },
        { name: "Elasticsearch", slug: "elasticsearch" },
      ],
      [
        { name: "TensorFlow", slug: "tensorflow" },
        { name: "PyTorch",    slug: "pytorch" },
        { name: "OpenAI",     slug: "openai" },
        { name: "LangChain",  slug: "langchain" },
        { name: "Hugging Face", slug: "huggingface" },
        { name: "Pinecone",   slug: "pinecone" },
        { name: "Weaviate",   slug: "weaviate" },
        { name: "Anthropic",  slug: "anthropic" },
      ],
    ],
  },

  // ---------------- Testimonials ----------------
  // Anonymized — replace `author` and `title` with real attributions when
  // you have signed-off quotes from real partners.
  testimonials: [
    {
      quote:
        "We don't just want code — we want a partner who understands the business. That's exactly what we'd look for, and that's the bar Astyv sets.",
      author: "",
      title: "",
      company: "",
      rating: 5,
      avatar: "",
    },
    {
      quote:
        "The best engagements pair strategy with execution under one roof. Slide decks alone don't ship product — working software does.",
      author: "",
      title: "",
      company: "",
      rating: 5,
      avatar: "",
    },
    {
      quote:
        "Talent density and retention are the two metrics most agencies fail on. Get those right and the rest takes care of itself.",
      author: "",
      title: "",
      company: "",
      rating: 5,
      avatar: "",
    },
  ],

  // ---------------- Client logos ----------------
  // Currently NOT rendered on the homepage (no real logos yet).
  // To re-enable: import + render <ClientLogos /> in src/pages/HomePage.jsx
  // and add real logo files in /public/brand/clients/.
  clientLogos: {
    overline: "Trusted by",
    heading: "Trusted by Industry Leaders",
    logos: [],
  },

  // ---------------- FAQ (NEW — also feeds JSON-LD FAQPage) ----------------
  faq: {
    overline: "Common Questions",
    heading: "Frequently Asked Questions",
    subheading: "If your question isn't here, write to us — we usually reply same day.",
    items: [
      {
        q: "What does Astyv actually do?",
        a: "Astyv provides four integrated services: product innovation (we build new digital products), IT consulting (strategic technology advisory), IT services (custom software engineering and platform implementation), and strategic staffing (pre-vetted technology talent on demand).",
      },
      {
        q: "Where is Astyv based?",
        a: "Astyv is headquartered in Hyderabad, India, at WeWork Raja Pushpa Summit in the Financial District. We deliver to clients in 12+ countries and operate across every major time zone.",
      },
      {
        q: "How quickly can Astyv start an engagement?",
        a: "For staffing, we typically present qualified candidates within 5 business days. For consulting and engineering engagements, we can kick off a discovery within 2 weeks of first contact.",
      },
      {
        q: "Does Astyv work with startups, mid-market, or enterprise?",
        a: "All three. Roughly 60% of Astyv's revenue comes from mid-market and enterprise (Series B onward), and 40% from earlier-stage companies that need senior technical leadership before they can hire it in-house.",
      },
      {
        q: "How does Astyv vet engineers and consultants?",
        a: "Every Astyv team member passes a multi-stage process: technical screen, paired-coding interview, system-design interview, behavioral interview with two senior leaders, and reference validation. Our acceptance rate is under 3%.",
      },
      {
        q: "What's the typical engagement model?",
        a: "We offer fixed-bid for well-scoped projects, time-and-materials for evolving work, and managed retainers for embedded squads. Many of our long-term partners use a hybrid: fixed-bid discovery, then T&M execution.",
      },
      {
        q: "Can Astyv help with AI and ML?",
        a: "Yes — Astyv has a dedicated AI & Data practice. We've built risk-assessment engines, recommendation systems, generative AI applications, and end-to-end ML platforms. We work across modern stacks: PyTorch, OpenAI, Anthropic, LangChain, Pinecone, and more.",
      },
      {
        q: "Is the source code mine?",
        a: "Yes. Astyv assigns full IP ownership to clients on engagement close — code, designs, docs, everything. No lock-in, no surprise licensing.",
      },
      {
        q: "How does Astyv handle security and compliance?",
        a: "All Astyv engineers complete annual security training. We follow OWASP Top 10, implement SAST/DAST in CI, and have worked under HIPAA, SOC 2, ISO 27001, and PCI-DSS frameworks on client engagements.",
      },
      {
        q: "How do I get in touch with Astyv?",
        a: "Email hr@astyv.com, call +91 8442058442, or use the contact form on our site. We respond within one business day.",
      },
    ],
  },

  // ---------------- Insights / blog teaser (NEW — placeholder posts) ----------------
  insights: {
    overline: "Astyv Insights",
    heading: "Field Notes from the Frontier",
    subheading:
      "Sharp takes from our engineers, consultants, and partners — on what's actually working, and what isn't.",
    items: [
      {
        category: "AI & Data",
        title: "Why Most Enterprise AI Projects Fail (And the Three That Don't)",
        excerpt:
          "After running ML engagements across finance, healthcare, and retail, three patterns separate the wins from the dust. Spoiler: none of them are about the model.",
        readTime: "7 min read",
        date: "Coming Soon",
        slug: "enterprise-ai-success-patterns",
        image: "",
      },
      {
        category: "Engineering",
        title: "The 12-Week MVP: How Astyv Ships Production Software in a Quarter",
        excerpt:
          "A breakdown of our actual engineering rhythm — sprint cadence, design checkpoints, deployment gates, and the hard tradeoffs that make 12 weeks possible.",
        readTime: "11 min read",
        date: "Coming Soon",
        slug: "12-week-mvp-playbook",
        image: "",
      },
      {
        category: "Talent",
        title: "Hiring Top 3% Engineers Without Burning the Pipeline",
        excerpt:
          "Conventional wisdom says you have to choose: speed or quality. We've built a hiring engine that delivers both — here's the architecture.",
        readTime: "9 min read",
        date: "Coming Soon",
        slug: "top-3-percent-hiring",
        image: "",
      },
    ],
    cta: { label: "All Insights", path: "/insights" },
  },

  // ---------------- Final CTA ----------------
  cta: {
    overline: "Let's Talk",
    heading: "Ready to Accelerate?",
    subheading: "Let's turn your most ambitious technology vision into your next competitive advantage.",
    buttonLabel: "Start a Conversation",
    buttonPath: "/contact",
    secondaryLabel: "See Case Studies",
    secondaryPath: "/case-studies",
  },
};

export default home;
