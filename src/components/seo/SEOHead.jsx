import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import siteContent from '../../config/siteContent';
import StructuredData from './StructuredData';

const SITE_URL = siteContent.launch.siteUrl || 'https://astyv.com';
const DEFAULT_OG = `${SITE_URL}/og-image.png`;
const DEFAULT_TWITTER = `${SITE_URL}/twitter-image.png`;

function setMeta(selector, attr, value) {
    if (typeof document === 'undefined') return;
    let el = document.querySelector(selector);
    if (!el) {
        el = document.createElement('meta');
        const [, name] = selector.match(/\[(?:name|property)="([^"]+)"\]/) || [];
        if (name) {
            if (selector.includes('property=')) el.setAttribute('property', name);
            else el.setAttribute('name', name);
        }
        document.head.appendChild(el);
    }
    el.setAttribute(attr, value);
}

function setLink(rel, href) {
    if (typeof document === 'undefined') return;
    let el = document.querySelector(`link[rel="${rel}"]`);
    if (!el) {
        el = document.createElement('link');
        el.setAttribute('rel', rel);
        document.head.appendChild(el);
    }
    el.setAttribute('href', href);
}

/**
 * SEOHead — applies per-page <title>, meta description, canonical, OG, Twitter,
 * and JSON-LD structured data. Loads content from siteContent.seo[page].
 *
 * Usage:  <SEOHead page="home" />
 *         <SEOHead page="services" structuredData={{ type: 'FAQPage', items: [...] }} />
 */
export default function SEOHead({
    page = 'home',
    title,
    description,
    image,
    canonical,
    structuredData,
    breadcrumbs,
}) {
    const location = useLocation();
    const seoConfig = siteContent.seo[page] || {};
    const finalTitle = title || seoConfig.title || `${siteContent.brand.name} — ${siteContent.brand.tagline}`;
    const finalDescription = description || seoConfig.description || siteContent.brand.description;
    const finalCanonical = canonical || `${SITE_URL}${seoConfig.canonical || location.pathname}`;
    const finalImage = image || siteContent.seo.defaults?.image
        ? `${SITE_URL}${image || siteContent.seo.defaults.image}`
        : DEFAULT_OG;

    useEffect(() => {
        if (typeof document === 'undefined') return;

        document.title = finalTitle;

        setMeta('meta[name="description"]', 'content', finalDescription);
        if (siteContent.seo.defaults?.keywords) {
            setMeta('meta[name="keywords"]', 'content', siteContent.seo.defaults.keywords);
        }
        setLink('canonical', finalCanonical);

        // Open Graph
        setMeta('meta[property="og:title"]',       'content', finalTitle);
        setMeta('meta[property="og:description"]', 'content', finalDescription);
        setMeta('meta[property="og:url"]',         'content', finalCanonical);
        setMeta('meta[property="og:image"]',       'content', finalImage);
        setMeta('meta[property="og:type"]',        'content', 'website');
        setMeta('meta[property="og:site_name"]',   'content', siteContent.brand.name);

        // Twitter
        setMeta('meta[name="twitter:card"]',        'content', 'summary_large_image');
        setMeta('meta[name="twitter:title"]',       'content', finalTitle);
        setMeta('meta[name="twitter:description"]', 'content', finalDescription);
        setMeta('meta[name="twitter:image"]',       'content', image ? `${SITE_URL}${image}` : DEFAULT_TWITTER);

        // robots
        setMeta('meta[name="robots"]', 'content', 'index, follow, max-image-preview:large, max-snippet:-1');
    }, [finalTitle, finalDescription, finalCanonical, finalImage, image]);

    return <StructuredData page={page} breadcrumbs={breadcrumbs} extra={structuredData} />;
}
