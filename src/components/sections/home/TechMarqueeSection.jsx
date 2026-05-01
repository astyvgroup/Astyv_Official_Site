import { useState } from 'react';
import siteContent from '../../../config/siteContent';
import RevealOnScroll from '../../ui/RevealOnScroll';
import KineticHeading from '../../ui/KineticHeading';
import MarqueeRow from '../../effects/MarqueeRow';

// Single pill: logo + name. Logo is loaded from cdn.simpleicons.org as a
// white SVG (currentColor inherited). On image load failure, hides the
// img and falls back to text-only.
function TechPill({ name, slug }) {
    const [logoFailed, setLogoFailed] = useState(false);
    const src = slug ? `https://cdn.simpleicons.org/${slug}/ffffff` : null;
    return (
        <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full glass border border-white/10 text-sm font-medium text-white/85 hover:text-white hover:border-primary-500/40 transition-colors whitespace-nowrap">
            {src && !logoFailed && (
                <img
                    src={src}
                    alt=""
                    aria-hidden="true"
                    width={18}
                    height={18}
                    loading="lazy"
                    decoding="async"
                    onError={() => setLogoFailed(true)}
                    className="opacity-90"
                />
            )}
            <span>{name}</span>
        </span>
    );
}

export default function TechMarqueeSection() {
    const { overline, heading, subheading, rows } = siteContent.home.techMarquee;

    return (
        <section className="section-padding relative">
            <div className="container-custom">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <RevealOnScroll>
                        <span className="text-xs uppercase tracking-[0.25em] text-primary-400 font-semibold">
                            {overline}
                        </span>
                    </RevealOnScroll>
                    <KineticHeading
                        text={heading}
                        as="h2"
                        className="text-3xl md:text-4xl lg:text-5xl font-bold mt-4 text-white"
                    />
                    <RevealOnScroll delay={0.2}>
                        <p className="text-base text-zinc-400 mt-4">{subheading}</p>
                    </RevealOnScroll>
                </div>

                <div className="space-y-4">
                    {rows.map((row, i) => {
                        // Accept both old string format and new {name, slug} format
                        const items = row.map((item, idx) =>
                            typeof item === 'string'
                                ? <TechPill key={idx} name={item} slug={null} />
                                : <TechPill key={idx} name={item.name} slug={item.slug} />
                        );
                        return (
                            <MarqueeRow
                                key={i}
                                items={items}
                                direction={i % 2 === 0 ? 'left' : 'right'}
                                speed={50 + i * 10}
                            />
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
