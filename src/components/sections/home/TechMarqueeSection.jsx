import siteContent from '../../../config/siteContent';
import RevealOnScroll from '../../ui/RevealOnScroll';
import KineticHeading from '../../ui/KineticHeading';
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
                    {rows.map((row, i) => (
                        <MarqueeRow
                            key={i}
                            items={row}
                            direction={i % 2 === 0 ? 'left' : 'right'}
                            speed={50 + i * 10}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
}
