import { useState } from 'react';
import RevealOnScroll from '../../ui/RevealOnScroll';
import SectionHeading from '../../ui/SectionHeading';
import siteContent from '../../../config/siteContent';

function TechPill({ name, slug }) {
    const [logoFailed, setLogoFailed] = useState(false);
    const src = slug ? `https://cdn.simpleicons.org/${slug}/ffffff` : null;
    return (
        <span
            title={name}
            className="inline-flex items-center gap-2 px-3 py-1.5 text-xs rounded-full bg-white/5 text-zinc-300 border border-white/[0.06] hover:border-primary-500/30 hover:text-primary-300 transition-all duration-200"
        >
            {src && !logoFailed && (
                <img
                    src={src}
                    alt=""
                    aria-hidden="true"
                    width={14}
                    height={14}
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

export default function TechStack() {
    const { techStack } = siteContent.services;

    return (
        <section className="section-padding bg-dark-secondary">
            <div className="container-custom">
                <SectionHeading title={techStack.heading} subtitle={techStack.subheading} />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {techStack.categories.map((cat, ci) => (
                        <RevealOnScroll key={cat.name} delay={ci * 0.1}>
                            <div className="p-6 rounded-xl border border-white/[0.06] bg-dark-primary">
                                <h3 className="text-sm font-semibold text-primary-400 uppercase tracking-wider mb-4">{cat.name}</h3>
                                <div className="flex flex-wrap gap-2">
                                    {cat.items.map((item) => {
                                        const isObj = typeof item === 'object' && item !== null;
                                        const name = isObj ? item.name : item;
                                        const slug = isObj ? item.slug : null;
                                        return <TechPill key={name} name={name} slug={slug} />;
                                    })}
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
