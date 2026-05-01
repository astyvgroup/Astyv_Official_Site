// =====================================================================
//  ASTYV — ABOUT PAGE CONTENT
// =====================================================================

const about = {
  hero: {
    overline: "Our Story",
    headline: "Built by Engineers.\nDriven by Ambition.",
    subheadline:
      "Astyv was founded on a simple conviction: the best technology companies are built by people who understand both the code and the business. We're a firm of practitioners — architects, engineers, strategists, and builders who ship at scale and lead transformation from the inside.",
  },

  mission: {
    heading: "Our Mission",
    text:
      "To empower enterprises with technology that doesn't just solve today's problems, but anticipates tomorrow's opportunities. Astyv exists to close the gap between business strategy and technical execution — making digital transformation tangible, measurable, and real.",
  },

  vision: {
    heading: "Our Vision",
    text:
      "A world where every organization — regardless of size, industry, or legacy — has access to world-class technology talent and thinking. We're building the firm we wished existed when we were on the other side of the table.",
  },

  // Culture & values
  values: [
    {
      icon: "Gem",
      title: "Relentless Craft",
      description:
        "We sweat the details. From system architecture to pixel alignment, from API design to deployment automation — excellence isn't a goal, it's the baseline.",
    },
    {
      icon: "Scale",
      title: "Intellectual Honesty",
      description:
        "We tell you what you need to hear, not what you want to hear. If a project is off-track, we raise the flag early. If a technology isn't the right fit, we'll say so — even if it means less revenue for us.",
    },
    {
      icon: "Repeat",
      title: "Compounding Impact",
      description:
        "We optimize for long-term value, not short-term deliverables. Every decision we make is evaluated against the question: will this still be the right choice in three years?",
    },
    {
      icon: "Users",
      title: "Inclusive Meritocracy",
      description:
        "The best idea wins, regardless of who brought it. We've built a culture where a junior engineer can challenge a senior architect — and be celebrated for it.",
    },
  ],

  // Granular numbers (NEW)
  numbers: {
    heading: "Astyv by the Numbers",
    items: [
      { value: 150, suffix: "+", label: "Enterprise Clients" },
      { value: 12,  suffix: "",  label: "Countries Served" },
      { value: 500, suffix: "+", label: "Engineers & Consultants" },
      { value: 98,  suffix: "%", label: "Client Retention" },
      { value: 96,  suffix: "%", label: "On-Time Delivery" },
      { value: 82,  suffix: "",  label: "Average Client NPS" },
      { value: 3,   suffix: "%", label: "Talent Acceptance Rate" },
      { value: 24,  suffix: "h", label: "Avg Response Time" },
    ],
  },

  // Timeline
  timeline: [
    { year: "2025", event: "Astyv founded in Hyderabad with a vision to bridge the strategy-execution gap in enterprise technology." },
    { year: "2025", event: "Established headquarters at WeWork Financial District. Assembled core engineering and consulting team." },
    { year: "2025", event: "Secured first enterprise clients across IT services, staffing, and cloud consulting." },
    { year: "2026", event: "Expanded service offerings to include AI & Data practice. Growing delivery capacity across India and global markets." },
    { year: "2026", event: "Crossed 150 enterprise clients milestone. Opened pre-launch waitlist for the Astyv Talent Network." },
  ],

  // Leadership team (NEW — placeholder photos until real ones provided)
  leadership: {
    overline: "Leadership",
    heading: "The People Behind Astyv",
    subheading:
      "Practitioners, not pitchers. Every Astyv leader has shipped production systems, run engineering orgs, and earned the trust of partners through years of doing the work.",
    members: [
      {
        name: "Founder & CEO",
        role: "Founder & CEO",
        bio: "Two decades across product engineering, platform architecture, and enterprise consulting. Believes the best companies are still mostly built by hand.",
        photo: "",
        linkedin: "",
      },
      {
        name: "Head of Engineering",
        role: "Head of Engineering",
        bio: "Former staff engineer at hyperscale platforms. Quietly opinionated about pragmatism over fashion, and tests over heroics.",
        photo: "",
        linkedin: "",
      },
      {
        name: "Head of Consulting",
        role: "Head of Consulting",
        bio: "Operator-turned-advisor with deep experience guiding CIOs through cloud, data, and AI inflections. Tells the truth, especially the inconvenient kind.",
        photo: "",
        linkedin: "",
      },
      {
        name: "Head of Talent",
        role: "Head of Talent",
        bio: "Built engineering organizations from 0 to 200+. Believes hiring is a system, not a series of opinions.",
        photo: "",
        linkedin: "",
      },
    ],
  },

  // CTA at bottom of about
  cta: {
    overline: "Work With Astyv",
    heading: "Build Something Real With Us.",
    subheading: "Whether you have a defined project or a team to scale, we'd love to talk.",
    buttonLabel: "Get in Touch",
    buttonPath: "/contact",
  },
};

export default about;
