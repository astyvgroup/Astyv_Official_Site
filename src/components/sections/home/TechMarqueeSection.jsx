import siteContent from '../../../config/siteContent';
import RevealOnScroll from '../../ui/RevealOnScroll';
import KineticHeading from '../../ui/KineticHeading';
import TechPill from '../../ui/TechPill';
import MarqueeRow from '../../effects/MarqueeRow';

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
                                ? <TechPill key={idx} name={item} slug={null} variant="marquee" />
                                : <TechPill key={idx} name={item.name} slug={item.slug} variant="marquee" />
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
