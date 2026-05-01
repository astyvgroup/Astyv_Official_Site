// =====================================================================
//  ASTYV — CASE STUDIES PAGE CONTENT
// =====================================================================

const caseStudies = {
  hero: {
    overline: "Proof",
    headline: "Proof Over\nPromises.",
    subheadline:
      "Every Astyv engagement tells a story. Here are some of ours — with real metrics, real challenges, and real impact.",
  },

  studies: [
    {
      id: "meridian-health",
      title: "Modernizing a National Healthcare Platform",
      client: "Meridian Health Systems",
      industry: "Healthcare",
      duration: "8 months",
      teamSize: "12 engineers, 2 architects",
      image: "case-study-1.jpg",
      challenge:
        "Meridian was running its patient management platform on a 15-year-old monolithic architecture. Deployment cycles took 6 weeks. Downtime during peak hours was costing $2M annually. They needed to modernize without disrupting 12,000 active users.",
      solution:
        "Astyv designed and executed a strangler-fig migration strategy — decomposing the monolith into 23 microservices over 8 months. We implemented blue-green deployments, a service mesh for inter-service communication, and a comprehensive observability stack. The migration was zero-downtime.",
      results: [
        { metric: "Deployment frequency", before: "Bi-monthly",  after: "12x per day" },
        { metric: "System downtime",      before: "47 hrs/year", after: "< 2 hrs/year" },
        { metric: "Page load time",       before: "4.2 seconds", after: "0.8 seconds" },
        { metric: "Annual cost savings",  before: "—",          after: "$3.2M" },
      ],
      technologies: ["AWS ECS", "Kubernetes", "Go", "React", "Datadog", "Terraform", "PostgreSQL"],
      testimonialQuote:
        "Astyv didn't just modernize our platform — they fundamentally changed how we think about technology as a business lever.",
      testimonialAuthor: "Sarah Chen, CTO",
    },
    {
      id: "finleap-ai",
      title: "Building an AI-Powered Risk Assessment Engine",
      client: "FinLeap",
      industry: "Financial Services",
      duration: "5 months",
      teamSize: "6 engineers, 2 ML scientists",
      image: "case-study-2.jpg",
      challenge:
        "FinLeap's underwriting process relied on manual risk assessment that took 72 hours per application. They needed an AI-driven solution that could reduce assessment time to minutes while maintaining — or improving — accuracy.",
      solution:
        "Astyv built a machine learning pipeline that ingests 200+ data signals per application, processes them through an ensemble model, and produces risk scores with explainability reports. The system integrates directly with their existing underwriting workflow via API.",
      results: [
        { metric: "Assessment time",        before: "72 hours",  after: "4 minutes" },
        { metric: "Accuracy rate",          before: "84%",       after: "93%" },
        { metric: "Application throughput", before: "200/week",  after: "3,000/week" },
        { metric: "False positive rate",    before: "18%",       after: "6%" },
      ],
      technologies: ["Python", "PyTorch", "AWS SageMaker", "FastAPI", "PostgreSQL", "Redis"],
      testimonialQuote:
        "Astyv was the only firm that came to the table with a working prototype instead of a pitch deck.",
      testimonialAuthor: "Marcus Rivera, VP Engineering",
    },
    {
      id: "quantum-retail",
      title: "Scaling a Retail Tech Team from 8 to 120",
      client: "Quantum Retail",
      industry: "E-Commerce / Retail",
      duration: "6 months",
      teamSize: "5-person staffing pod (Astyv) + 120 placed engineers",
      image: "case-study-3.jpg",
      challenge:
        "After closing a $40M Series B, Quantum Retail needed to 15x their engineering team in 6 months to hit aggressive product milestones. Their internal recruiting team couldn't keep pace, and previous agency hires had a 40% attrition rate within the first year.",
      solution:
        "Astyv deployed a dedicated staffing pod — 3 technical recruiters, 1 sourcing specialist, and 1 engineering interviewer — embedded directly within Quantum's hiring process. We rebuilt their technical assessment pipeline, implemented structured interviews, and created a candidate experience that reflected their engineering culture.",
      results: [
        { metric: "Engineers placed",       before: "—",         after: "112 in 6 months" },
        { metric: "Time to fill",           before: "65 days avg", after: "21 days avg" },
        { metric: "12-month retention",     before: "60%",       after: "95%" },
        { metric: "Offer acceptance rate",  before: "52%",       after: "88%" },
      ],
      technologies: ["Technical Assessment Platform", "ATS Integration", "Custom Sourcing Tools"],
      testimonialQuote:
        "Astyv's staffing team placed 22 engineers with us in under 6 weeks. Every single one passed our technical bar.",
      testimonialAuthor: "Priya Narayan, Head of Talent",
    },
  ],

  cta: {
    overline: "Your Story",
    heading: "Ready to Add Your Story?",
    subheading: "Let's build something worth writing about.",
    buttonLabel: "Start a Conversation",
    buttonPath: "/contact",
  },
};

export default caseStudies;
