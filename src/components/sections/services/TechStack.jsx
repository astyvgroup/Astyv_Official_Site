import RevealOnScroll from '../../ui/RevealOnScroll';
import SectionHeading from '../../ui/SectionHeading';
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
                                    {cat.items.map((item) => (
                                        <span key={item} className="px-3 py-1.5 text-xs rounded-full bg-white/5 text-zinc-300 border border-white/[0.06] hover:border-primary-500/30 hover:text-primary-300 transition-all duration-200">
                                            {item}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
