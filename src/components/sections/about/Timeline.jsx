import { motion } from 'framer-motion';
import RevealOnScroll from '../../ui/RevealOnScroll';
import siteContent from '../../../config/siteContent';

export default function Timeline() {
    const { timeline } = siteContent.about;
    return (
        <section className="section-padding bg-dark-secondary">
            <div className="container-custom">
                <RevealOnScroll>
                    <h2 className="text-3xl md:text-4xl font-bold text-white text-center mb-16">Our Journey</h2>
                </RevealOnScroll>
                <div className="relative max-w-3xl mx-auto">
                    {/* Vertical line */}
                    <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-white/10 md:-translate-x-px" />
                    {timeline.map((item, i) => (
                        <RevealOnScroll key={i} delay={i * 0.1}>
                            <div className={`relative flex items-start mb-12 last:mb-0 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'}`}>
                                {/* Dot */}
                                <div className="absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-primary-500 -translate-x-1.5 md:-translate-x-1.5 mt-1.5 z-10 shadow-lg shadow-primary-500/50" />
                                {/* Content */}
                                <div className={`ml-12 md:ml-0 md:w-[calc(50%-2rem)] ${i % 2 === 0 ? 'md:pr-12 md:text-right' : 'md:pl-12'}`}>
                                    <span className="text-sm font-mono text-primary-400 mb-1 block">{item.year}</span>
                                    <p className="text-zinc-300 text-sm leading-relaxed">{item.event}</p>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
