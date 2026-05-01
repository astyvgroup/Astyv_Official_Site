import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import SectionHeading from '../../ui/SectionHeading';
import RevealOnScroll from '../../ui/RevealOnScroll';
import siteContent from '../../../config/siteContent';

export default function WhyAstyv() {
    const { whyAstyv } = siteContent.home;

    return (
        <section className="section-padding bg-dark-primary">
            <div className="container-custom">
                <SectionHeading title={whyAstyv.heading} subtitle={whyAstyv.subheading} />
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                    {whyAstyv.points.map((point, i) => (
                        <RevealOnScroll key={point.title} delay={i * 0.1}>
                            <div className="p-6 lg:p-8 rounded-xl border border-white/[0.06] bg-dark-secondary/50 group hover:border-primary-500/20 transition-all duration-300">
                                <div className="flex items-start gap-4">
                                    <div className="w-8 h-8 rounded-full bg-primary-500/10 flex items-center justify-center shrink-0 mt-0.5">
                                        <Check className="w-4 h-4 text-primary-400" />
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-2">{point.title}</h3>
                                        <p className="text-sm text-zinc-400 leading-relaxed">{point.description}</p>
                                    </div>
                                </div>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
