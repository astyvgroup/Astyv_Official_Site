import { motion } from 'framer-motion';
import RevealOnScroll from '../../ui/RevealOnScroll';
import siteContent from '../../../config/siteContent';

export default function ClientLogos() {
    const { clientLogos } = siteContent.home;

    return (
        <section className="py-16 lg:py-20 bg-dark-secondary border-y border-white/5">
            <div className="container-custom">
                <RevealOnScroll>
                    <p className="text-center text-sm text-zinc-500 uppercase tracking-widest mb-10">
                        {clientLogos.heading}
                    </p>
                </RevealOnScroll>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
                    {clientLogos.logos.map((logo, i) => (
                        <RevealOnScroll key={logo.name} delay={i * 0.05}>
                            <div className="flex items-center justify-center h-12 opacity-30 hover:opacity-60 transition-opacity duration-300">
                                <span className="text-lg font-bold text-zinc-500 tracking-wide">{logo.name}</span>
                            </div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
