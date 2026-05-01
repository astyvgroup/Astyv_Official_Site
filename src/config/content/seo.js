// =====================================================================
//  ASTYV — SEO METADATA (per page)
// =====================================================================
//  These titles + descriptions appear in:
//    - Browser tabs
//    - Google search results
//    - Social shares (Open Graph, Twitter cards)
//
//  TIP: Page titles should always include "Astyv" so brand searches
//  rank our pages first. Aim for: 50-60 char titles, 140-160 char descs.
// =====================================================================

const seo = {
  // Default values used as fallbacks
  defaults: {
    titleSuffix: " | Astyv",
    keywords:
      "Astyv, astyv, Astyv Private Limited, IT consulting Hyderabad, software development India, digital transformation, technology staffing, AI engineering, product innovation, enterprise software, cloud migration, DevOps, custom software",
    image: "/og-image.png",
  },

  home: {
    title: "Astyv — Building What's Next | IT Consulting, Engineering & Staffing",
    description:
      "Astyv is a technology firm in Hyderabad specializing in IT consulting, software engineering, product innovation, and strategic staffing solutions. Building what's next.",
    canonical: "/",
  },
  about: {
    title: "About Astyv — Our Story, Mission & Values",
    description:
      "Learn about Astyv's mission to bridge the strategy-execution gap in enterprise technology. Discover our values, our journey, and the people building Astyv.",
    canonical: "/about",
  },
  services: {
    title: "Services — Product Innovation, IT Consulting, Engineering & Staffing | Astyv",
    description:
      "Explore Astyv's integrated technology capabilities: product innovation, IT consulting, software engineering, and pre-vetted talent staffing — built for enterprises that move fast.",
    canonical: "/services",
  },
  caseStudies: {
    title: "Case Studies — Real Results, Real Impact | Astyv",
    description:
      "See how Astyv has helped enterprises modernize platforms, build AI systems, and scale engineering teams — with the actual metrics behind every engagement.",
    canonical: "/case-studies",
  },
  careers: {
    title: "Careers at Astyv — Build What Matters",
    description:
      "Join Astyv's remote-first team of engineers, consultants, and technologists. See open positions, our hiring process, and what makes Astyv different.",
    canonical: "/careers",
  },
  contact: {
    title: "Contact Astyv — Let's Build Something",
    description:
      "Get in touch with Astyv in Hyderabad for IT consulting, software development, staffing, or product innovation. We respond within 24 hours.",
    canonical: "/contact",
  },
  privacy: {
    title: "Privacy Policy | Astyv",
    description: "How Astyv collects, uses, and protects your information.",
    canonical: "/privacy",
  },
  terms: {
    title: "Terms of Service | Astyv",
    description: "The terms governing your use of the Astyv website and services.",
    canonical: "/terms",
  },
  cookies: {
    title: "Cookie Policy | Astyv",
    description: "How and why Astyv uses cookies on this website.",
    canonical: "/cookies",
  },
};

export default seo;
