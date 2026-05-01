import RevealOnScroll from '../../ui/RevealOnScroll';
import SectionHeading from '../../ui/SectionHeading';
import TechPill from '../../ui/TechPill';
import siteContent from '../../../config/siteContent';

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
