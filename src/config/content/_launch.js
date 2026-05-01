// =====================================================================
//  ASTYV — LAUNCH MODE FLAG
// =====================================================================
//  This file controls whether visitors see the polished COMING SOON
//  page or the FULL multi-page site.
//
//  HOW TO FLIP:
//    1. Change `launchMode` below from "coming-soon" to "live" (or vice versa).
//    2. Save.
//    3. Run: npm run build && npm run deploy
//
//  WHEN COMING-SOON IS ACTIVE:
//    All routes (/, /about, /services, etc.) show the coming-soon page.
//    /admin still works for managing content.
// =====================================================================

const launch = {
  // "live" — full multi-page site
  // "coming-soon" — only the polished launch page
  launchMode: "live",

  // ISO date string used for the countdown on the coming-soon page.
  // Set to a future date you're aiming for. Leave empty to hide countdown.
  launchDate: "2026-09-01T00:00:00+05:30",

  // Site URL used in canonical tags, sitemap, OG tags, JSON-LD.
  // Update this if you ever move off astyv.com.
  siteUrl: "https://astyv.com",

  // Coming-soon page content — only used when launchMode === "coming-soon".
  comingSoon: {
    overline: "Building What's Next",
    headline: "Something Extraordinary\nIs On Its Way.",
    subheadline:
      "Astyv is a new technology firm born from a simple conviction: the best companies are built by people who understand both the code and the business. We're putting the finishing touches on something we can't wait to share.",

    // Email-capture
    notifyHeading: "Be the first to know.",
    notifySubheading: "Drop your email — we'll send you a single message the day we launch. No spam, ever.",
    notifyPlaceholder: "you@company.com",
    notifyButton: "Notify Me",
    notifySuccess: "You're on the list. See you at launch.",
    notifyError: "Something went wrong. Email hr@astyv.com to be added manually.",

    // What we're building (3 quick value props on the coming-soon page)
    pillars: [
      { title: "Outcome-Obsessed", description: "We measure success by your business metrics, not billable hours." },
      { title: "Engineering-First", description: "Our leaders write code. Our architects ship production systems." },
      { title: "Talent Density", description: "Top 3% only. Senior-caliber talent from day one." },
    ],

    // Footer note
    legalNote: "© Astyv Private Limited · Hyderabad, India",
  },
};

export default launch;
