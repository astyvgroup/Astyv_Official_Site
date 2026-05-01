// =====================================================================
//  ASTYV — FOOTER CONTENT
// =====================================================================

const footer = {
  tagline: "Building What's Next.",
  description:
    "Astyv is a technology firm in Hyderabad, India — partnering with enterprises across the world on product innovation, IT consulting, engineering, and strategic staffing.",

  columns: [
    {
      title: "Company",
      links: [
        { label: "About",        path: "/about" },
        { label: "Careers",      path: "/careers" },
        { label: "Case Studies", path: "/case-studies" },
        { label: "Contact",      path: "/contact" },
      ],
    },
    {
      title: "Services",
      links: [
        { label: "Product Innovation", path: "/services#product-innovation" },
        { label: "IT Consulting",      path: "/services#it-consulting" },
        { label: "IT Services",        path: "/services#it-services" },
        { label: "Staffing Solutions", path: "/services#staffing" },
      ],
    },
    {
      title: "Resources",
      links: [
        { label: "Insights",         path: "/#insights" },
        { label: "Privacy Policy",   path: "/privacy" },
        { label: "Terms of Service", path: "/terms" },
        { label: "Cookie Policy",    path: "/cookies" },
      ],
    },
  ],

  copyright: "© {year} Astyv Private Limited. All rights reserved.",
  legalLine: "Astyv Private Limited · Registered in India · Hyderabad, Telangana 500032",

  bottomLinks: [
    { label: "Privacy",  path: "/privacy" },
    { label: "Terms",    path: "/terms" },
    { label: "Cookies",  path: "/cookies" },
    { label: "Sitemap",  path: "/sitemap.xml", external: true },
  ],
};

export default footer;
