import RevealOnScroll from '../../ui/RevealOnScroll';
import GlowCard from '../../ui/GlowCard';
import SectionHeading from '../../ui/SectionHeading';
import siteContent from '../../../config/siteContent';

export default function CultureValues() {
    const { values } = siteContent.about;
    return (
        <section className="section-padding bg-dark-primary">
            <div className="container-custom">
                <SectionHeading title="Our Values" subtitle="The principles that guide every decision we make." />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {values.map((val, i) => (
                        <RevealOnScroll key={val.title} delay={i * 0.1}>
                            <GlowCard className="h-full">
                                <span className="text-xs font-mono text-primary-400 mb-3 block">0{i + 1}</span>
                                <h3 className="text-xl font-bold text-white mb-3">{val.title}</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">{val.description}</p>
                            </GlowCard>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
