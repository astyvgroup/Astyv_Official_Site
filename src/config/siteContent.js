// =====================================================================
//  ASTYV WEBSITE — MASTER CONTENT FILE (aggregator)
// =====================================================================
//  TO EDIT TEXT/IMAGES/JOBS, GO TO:
//    src/config/content/brand.js        — name, contact, social
//    src/config/content/home.js         — homepage sections
//    src/config/content/about.js        — about page
//    src/config/content/services.js     — services page
//    src/config/content/caseStudies.js  — case studies
//    src/config/content/careers.js      — careers page (job listings live in /public/data/careers.json)
//    src/config/content/contact.js      — contact page
//    src/config/content/footer.js       — site footer
//    src/config/content/seo.js          — page titles + meta descriptions (search engines & social shares)
//    src/config/content/legal.js        — privacy / terms / cookies
//    src/config/content/_launch.js      — coming-soon vs live launch flag
//
//  This file just glues them together. Don't edit it unless you're
//  adding a brand-new top-level section. All components import from
//  here, so backwards-compatible.
// =====================================================================

import brand       from './content/brand.js';
import home        from './content/home.js';
import about       from './content/about.js';
import services    from './content/services.js';
import caseStudies from './content/caseStudies.js';
import careers     from './content/careers.js';
import contact     from './content/contact.js';
import footer      from './content/footer.js';
import seo         from './content/seo.js';
import legal       from './content/legal.js';
import launch      from './content/_launch.js';

// Backwards-compat: derive nav from brand+home structure (was inline before)
const nav = {
    links: [
        { label: "Home",         path: "/" },
        { label: "About",        path: "/about" },
        { label: "Services",     path: "/services" },
        { label: "Case Studies", path: "/case-studies" },
        { label: "Careers",      path: "/careers" },
        { label: "Contact",      path: "/contact" },
    ],
    ctaButton: { label: "Get in Touch", path: "/contact" },
};

const siteContent = {
    brand,
    nav,
    home,
    about,
    services,
    caseStudies,
    careers,
    contact,
    footer,
    seo,
    legal,
    launch,
};

export default siteContent;

// Named exports for code that prefers grabbing slices directly
export {
    brand,
    nav,
    home,
    about,
    services,
    caseStudies,
    careers,
    contact,
    footer,
    seo,
    legal,
    launch,
};
