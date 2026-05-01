import { useState } from 'react';

// Brands simpleicons doesn't host (trademark restrictions). Map them to a
// short monogram so every pill still shows a visual mark instead of being
// text-only.
const monogramOverrides = {
    aws: 'AW',
    amazonwebservices: 'AW',
    azure: 'AZ',
    microsoftazure: 'AZ',
    openai: 'AI',
    pinecone: 'PC',
    weaviate: 'WV',
};

function getMonogram(name, slug) {
    const key = (slug || '').toLowerCase();
    if (monogramOverrides[key]) return monogramOverrides[key];
    const cleaned = (name || '').replace(/[^A-Za-z0-9]/g, '');
    return cleaned.slice(0, 2).toUpperCase() || '?';
}

function Monogram({ name, slug, size }) {
    const text = getMonogram(name, slug);
    const dim = size === 'lg' ? 18 : 14;
    const font = size === 'lg' ? 9 : 7;
    return (
        <span
            aria-hidden="true"
            className="inline-flex items-center justify-center rounded-full bg-white/15 text-white font-bold leading-none"
            style={{ width: dim, height: dim, fontSize: font }}
        >
            {text}
        </span>
    );
}

// Shared pill: tries simpleicons CDN first, falls back to a letter
// monogram if the slug is missing or the image fails to load.
//
// Variants:
//   - "marquee": larger, glassy pill (used in homepage marquee)
//   - "compact": smaller pill (used in Services > Tech Ecosystem)
export default function TechPill({ name, slug, variant = 'compact' }) {
    const [logoFailed, setLogoFailed] = useState(false);
    const src = slug ? `https://cdn.simpleicons.org/${slug}/ffffff` : null;
    const showImg = src && !logoFailed;
    const isMarquee = variant === 'marquee';

    const wrapperClass = isMarquee
        ? 'inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass border border-white/10 text-sm font-medium text-white/85 hover:text-white hover:border-primary-500/40 transition-colors whitespace-nowrap'
        : 'inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-full bg-white/5 text-zinc-300 border border-white/[0.06] hover:border-primary-500/30 hover:text-primary-300 transition-all duration-200';

    const imgSize = isMarquee ? 18 : 14;
    const monoSize = isMarquee ? 'lg' : 'sm';

    return (
        <span title={name} className={wrapperClass}>
            {showImg ? (
                <img
                    src={src}
                    alt=""
                    aria-hidden="true"
                    width={imgSize}
                    height={imgSize}
                    loading="lazy"
                    decoding="async"
                    onError={() => setLogoFailed(true)}
                    className="opacity-90"
                />
            ) : (
                <Monogram name={name} slug={slug} size={monoSize} />
            )}
            <span>{name}</span>
        </span>
    );
}
