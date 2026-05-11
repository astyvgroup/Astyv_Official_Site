import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import siteContent from '../../config/siteContent';

const SITE_URL = siteContent.launch.siteUrl || 'https://astyv.com';

const PAGE_TITLES = {
    home: 'Home',
    about: 'About',
    services: 'Services',
    caseStudies: 'Case Studies',
    careers: 'Careers',
    contact: 'Contact',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    cookies: 'Cookie Policy',
};

function buildBreadcrumbList(pathname, customCrumbs) {
    const crumbs = customCrumbs || [];
    if (!customCrumbs && pathname && pathname !== '/') {
        const segments = pathname.split('/').filter(Boolean);
        crumbs.push({ name: 'Home', url: SITE_URL + '/' });
        let path = '';
        segments.forEach((seg) => {
            path += '/' + seg;
            const label = seg
                .replace(/-/g, ' ')
                .replace(/\b\w/g, (c) => c.toUpperCase());
            crumbs.push({ name: label, url: SITE_URL + path });
        });
    }
    if (crumbs.length === 0) return null;
    return {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: crumbs.map((c, i) => ({
            '@type': 'ListItem',
            position: i + 1,
            name: c.name,
            item: c.url,
        })),
    };
}

function buildFAQPage() {
    const items = siteContent.home.faq?.items || [];
    if (items.length === 0) return null;
    return {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: items.map((it) => ({
            '@type': 'Question',
            name: it.q,
            acceptedAnswer: { '@type': 'Answer', text: it.a },
        })),
    };
}

function buildLocalBusiness() {
    const { brand } = siteContent;
    return {
        '@context': 'https://schema.org',
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#localbusiness`,
        name: brand.name,
        legalName: brand.legalName,
        description: brand.description,
        url: SITE_URL,
        image: `${SITE_URL}/brand/logo-dark.png`,
        logo: `${SITE_URL}/brand/logo-dark.png`,
        telephone: brand.phoneFormatted || brand.phone,
        email: brand.email,
        priceRange: '$$$',
        address: {
            '@type': 'PostalAddress',
            streetAddress: `${brand.address.line1}, ${brand.address.area}`,
            addressLocality: brand.address.city,
            addressRegion: brand.address.state,
            postalCode: brand.address.zip,
            addressCountry: brand.address.countryCode || 'IN',
        },
        sameAs: Object.values(brand.social).filter(Boolean),
        areaServed: { '@type': 'Place', name: 'Worldwide' },
    };
}

function buildServiceCatalog() {
    const offerings = siteContent.services.offerings || [];
    return {
        '@context': 'https://schema.org',
        '@type': 'Service',
        provider: { '@id': `${SITE_URL}/#organization` },
        name: 'Astyv Technology Services',
        description: siteContent.services.hero.subheadline,
        hasOfferCatalog: {
            '@type': 'OfferCatalog',
            name: 'Astyv Capabilities',
            itemListElement: offerings.map((o) => ({
                '@type': 'Offer',
                itemOffered: {
                    '@type': 'Service',
                    name: o.title,
                    description: o.description,
                },
            })),
        },
    };
}

function injectScript(id, json) {
    if (typeof document === 'undefined' || !json) return;
    let el = document.getElementById(id);
    if (!el) {
        el = document.createElement('script');
        el.type = 'application/ld+json';
        el.id = id;
        document.head.appendChild(el);
    }
    el.textContent = JSON.stringify(json);
}

function removeScript(id) {
    if (typeof document === 'undefined') return;
    const el = document.getElementById(id);
    if (el) el.remove();
}

/**
 * StructuredData — emits JSON-LD blocks for:
 *  - BreadcrumbList (auto-derived from URL path)
 *  - FAQPage (only on /, where FAQ section lives)
 *  - LocalBusiness (only on / and /contact)
 *  - Service catalog (only on /services)
 *  - Custom extras passed via the `extra` prop
 *
 * Cleans up its scripts on unmount.
 */
export default function StructuredData({ page, breadcrumbs, extra }) {
    const location = useLocation();

    useEffect(() => {
        const breadcrumbJson = buildBreadcrumbList(location.pathname, breadcrumbs);
        injectScript('astyv-ld-breadcrumb', breadcrumbJson);

        if (page === 'home') {
            injectScript('astyv-ld-faq', buildFAQPage());
            injectScript('astyv-ld-localbusiness', buildLocalBusiness());
        } else removeScript('astyv-ld-faq');

        if (page === 'contact') {
            injectScript('astyv-ld-localbusiness', buildLocalBusiness());
        }

        if (page === 'services') {
            injectScript('astyv-ld-services', buildServiceCatalog());
        } else removeScript('astyv-ld-services');

        if (page !== 'home' && page !== 'contact') {
            removeScript('astyv-ld-localbusiness');
        }

        if (extra) injectScript('astyv-ld-extra', extra);
        else removeScript('astyv-ld-extra');

        return () => {
            removeScript('astyv-ld-breadcrumb');
            removeScript('astyv-ld-faq');
            removeScript('astyv-ld-localbusiness');
            removeScript('astyv-ld-services');
            removeScript('astyv-ld-extra');
        };
    }, [location.pathname, page, breadcrumbs, extra]);

    return null;
}
