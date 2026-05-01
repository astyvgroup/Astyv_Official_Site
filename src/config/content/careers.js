// =====================================================================
//  ASTYV — CAREERS PAGE CONTENT
// =====================================================================
//  Job listings live in /public/data/careers.json — edit there to add,
//  remove, or pause openings. This file controls the surrounding copy.
// =====================================================================

const careers = {
  hero: {
    overline: "Careers at Astyv",
    headline: "Build What\nMatters.",
    subheadline:
      "At Astyv, you won't just write code or build decks. You'll solve problems that affect millions of users, work alongside some of the sharpest minds in the industry, and grow faster than you thought possible.",
  },

  perks: [
    {
      icon: "Globe",
      title: "Remote-First",
      description:
        "Work from anywhere. Astyv is distributed across 12 countries and 15 time zones. Your work speaks, not your location.",
      detail: "Annual team gathering covered. Co-working stipend if you prefer an office.",
    },
    {
      icon: "GraduationCap",
      title: "Learning Budget",
      description:
        "$3,000 annual learning stipend per person. Conferences, courses, certifications, books — invest in whatever accelerates your growth.",
      detail: "Plus paid time off for conferences. AWS/GCP/Azure certs reimbursed in full.",
    },
    {
      icon: "Heart",
      title: "Comprehensive Benefits",
      description:
        "Premium health, dental, and vision. Mental health support. Generous PTO. We take care of our people so they can take care of our clients.",
      detail: "Includes dependents. Parental leave: 26 weeks primary, 12 weeks secondary.",
    },
    {
      icon: "Rocket",
      title: "High-Impact Work",
      description:
        "No bench time, no make-work. Every project at Astyv is chosen for its complexity and impact. You'll work on systems that serve millions.",
      detail: "Project rotation every 3-6 months keeps things sharp.",
    },
    {
      icon: "GitBranch",
      title: "Open Source Time",
      description:
        "10% time for open source contributions. We believe in giving back to the community that powers our work.",
      detail: "We've contributed to over 40 OSS projects, including some you probably use daily.",
    },
    {
      icon: "TrendingUp",
      title: "Transparent Growth",
      description:
        "Clear leveling framework, biannual reviews, and a promotion process that rewards impact — not politics.",
      detail: "Compensation bands published internally. No salary negotiation theater.",
    },
  ],

  // Empty state (when no roles are open)
  emptyState: {
    headline: "We're Not Hiring Right Now — But Great Things Are Brewing.",
    subheadline:
      "Astyv's team is heads-down building something extraordinary. New roles open fast when they do, and we'd hate to miss someone like you.",
    alternateMessages: [
      {
        headline: "The Launchpad Is Quiet. For Now.",
        subheadline:
          "Every rocket needs a countdown. We're in ours. Leave your coordinates and we'll signal you the moment we're ready to fly.",
      },
      {
        headline: "No Open Roles — But We're Always Collecting Brilliance.",
        subheadline:
          "The best hires happen before the job is posted. If you're the kind of person who doesn't wait for openings, neither do we.",
      },
    ],
    cta: "Drop Your Resume Anyway",
    ctaSubtext:
      "Astyv keeps every submission on file and reviews them personally. When the right role opens, you'll be the first to know — not the last to apply.",
  },

  // Application form configuration
  applicationForm: {
    heading: "Apply Now",
    generalHeading: "Send Us Your Resume",
    generalSubheading:
      "No open role that fits? No problem. Drop your details and resume below — we review every single submission personally, and we'll reach out when something aligns.",
    fields: {
      name:    { label: "Full Name",     placeholder: "Jane Doe",                         required: true },
      email:   { label: "Email Address", placeholder: "jane@example.com",                 required: true },
      phone:   { label: "Phone (Optional)", placeholder: "+91 98765 43210",              required: false },
      role:    { label: "Role Applying For", placeholder: "e.g. Senior Full-Stack Engineer (or 'General Application')", required: false },
      linkedin:{ label: "LinkedIn Profile (Optional)", placeholder: "https://linkedin.com/in/...", required: false },
      coverNote:{ label: "Why Astyv? (Optional)", placeholder: "Tell us what excites you about working here, or share anything else you'd like us to know...", required: false },
      resume:  { label: "Resume (PDF only, max 5MB)", required: true, accept: ".pdf", maxSizeMB: 5 },
    },
    submitButton: "Submit Application",
    successMessage:
      "Application received! We've sent a confirmation to your email. Astyv reviews every submission — expect to hear from us within 5 business days.",
    errorMessage:
      "Something went wrong. Please try again or email your resume directly to hr@astyv.com.",
  },

  // What we look for (NEW — adds depth to careers page)
  whatWeLookFor: {
    overline: "What We Look For",
    heading: "Astyv Hires for Three Things.",
    subheadline:
      "Skills can be taught. These three traits are what we test for at every level — IC, lead, executive.",
    traits: [
      {
        icon: "Compass",
        title: "Judgment Under Ambiguity",
        description:
          "Senior work isn't about knowing the answer. It's about making good calls when the answer isn't clear — and being honest about the trade-offs.",
      },
      {
        icon: "ListChecks",
        title: "Bias Toward Shipping",
        description:
          "We love thoughtful design. We value working software more. The best Astyv hires can hold both at once.",
      },
      {
        icon: "MessageCircle",
        title: "Calibrated Communication",
        description:
          "Direct without being curt. Detailed without being dense. Astyv runs on radical transparency — that requires people who can communicate well, fast.",
      },
    ],
  },

  // Hiring process overview (NEW)
  hiringProcess: {
    overline: "What to Expect",
    heading: "Astyv's Hiring Process",
    subheadline: "No surprises. Here's exactly how we evaluate candidates, end to end.",
    steps: [
      { step: "1", title: "Application Review",          description: "We read every submission. You'll hear from us within 5 business days, even if it's a no.",       duration: "5 days" },
      { step: "2", title: "Intro Conversation",          description: "30 minutes with someone on the team. We talk about your goals, our work, and whether there's a fit.", duration: "30 min" },
      { step: "3", title: "Technical Screen",            description: "A focused technical conversation — no whiteboard trivia. Real-world problems we actually face.",  duration: "60 min" },
      { step: "4", title: "Paired Work Session",         description: "We work through a problem together, using your tools, your style. Designed to feel like a normal day.", duration: "90 min" },
      { step: "5", title: "Behavioral & References",     description: "Final conversation with two senior leaders. We check references in parallel.",                    duration: "60 min" },
      { step: "6", title: "Decision & Offer",            description: "We commit to a yes/no within 5 business days of the final round. No ghosting, no slow-rolls.",      duration: "5 days" },
    ],
  },

  departments: ["All", "Engineering", "Consulting", "AI & Data", "Talent & Staffing", "Design", "Operations"],
};

export default careers;
