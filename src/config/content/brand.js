// =====================================================================
//  ASTYV — BRAND INFORMATION
// =====================================================================
//  Edit this file to change the company name, contact details, or
//  social links across the entire site.
// =====================================================================

const brand = {
  name: "Astyv",
  legalName: "Astyv Private Limited",
  tagline: "Building What's Next.",
  description:
    "Astyv is a technology firm specializing in digital transformation, IT consulting, enterprise software development, and strategic staffing — empowering businesses to thrive in an era of relentless change.",
  shortDescription:
    "Technology firm. Hyderabad-based. We build, advise, and staff for ambitious enterprises.",
  foundedYear: "2025",

  // Contact
  email: "hr@astyv.com",
  careersEmail: "hr@astyv.com",
  pressEmail: "hr@astyv.com",
  phone: "+91 8442058442",
  phoneFormatted: "+91-8442058442",

  // Office address
  address: {
    line1: "WeWork Raja Pushpa Summit",
    line2: "",
    city: "Hyderabad",
    area: "Financial District",
    state: "Telangana",
    zip: "500032",
    country: "India",
    countryCode: "IN",
    mapsUrl:
      "https://maps.google.com/?q=WeWork+Raja+Pushpa+Summit+Financial+District+Hyderabad",
  },

  // Social links — leave as "" to hide that icon in the footer
  social: {
    linkedin:  "https://linkedin.com/company/astyv",
    twitter:   "https://twitter.com/astyv",
    github:    "https://github.com/astyvgroup",
    instagram: "https://instagram.com/astyv",
    youtube:   "",
    medium:    "",
  },

  // Logo asset paths (in /public/brand/, these are already in place)
  logos: {
    wordmark: "/brand/wordmark.svg",
    icon: "/brand/icon.svg",                       // white bg + purple A
    iconTransparent: "/brand/icon-transparent.svg",// transparent bg + purple A (best for dark sites)
    iconDark: "/brand/icon-dark.svg",              // dark bg + purple A
    iconWhite: "/brand/icon-white.svg",            // dark bg + white A (outline)
    full: "/brand/logo.svg",                       // white bg + purple wordmark + black tagline
    fullDark: "/brand/logo-dark.svg",              // purple bg + white wordmark (lockup pill)
    fullTransparent: "/brand/logo-transparent.svg",      // transparent bg + purple wordmark + white tagline (dark mode)
    fullTransparentLight: "/brand/logo-transparent-light.svg", // same lockup with dark tagline (light mode)
  },
};

export default brand;
