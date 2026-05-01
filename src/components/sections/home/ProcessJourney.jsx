import { motion } from 'framer-motion';
import siteContent from '../../../config/siteContent';
import RevealOnScroll from '../../ui/RevealOnScroll';
import KineticHeading from '../../ui/KineticHeading';
import AnimatedIcon from '../../ui/AnimatedIcon';
import SectionDivider from '../../ui/SectionDivider';

export default function ProcessJourney() {
    const { overline, heading, subheading, steps } = siteContent.home.process;

    return (
        <section className="section-padding relative overflow-hidden">
            <div className="container-custom relative">
                <div className="text-center max-w-3xl mx-auto mb-16">
                    <RevealOnScroll>
                        <span className="text-xs uppercase tracking-[0.25em] text-primary-400 font-semibold">
                            {overline}
                        </span>
                    </RevealOnScroll>
                    <KineticHeading
                        text={heading}
                        as="h2"
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-white"
                    />
                    <RevealOnScroll delay={0.2}>
                        <p className="text-base md:text-lg text-zinc-400 mt-6">{subheading}</p>
                    </RevealOnScroll>
                    <SectionDivider variant="line" className="mt-8" />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {steps.map((step, i) => (
                        <RevealOnScroll key={step.number} delay={0.05 * i}>
                            <motion.div
                                whileHover={{ y: -6 }}
                                transition={{ type: 'spring', stiffness: 300, damping: 22 }}
                                className="relative h-full p-8 rounded-2xl glass border border-white/5 hover:border-primary-500/40 transition-colors group"
                            >
                                <div className="absolute -top-3 -right-3 text-7xl font-black text-primary-500/10 select-none pointer-events-none leading-none">
                                    {step.number}
                                </div>
                                <AnimatedIcon name={step.icon} size={26} variant="pulse" />
                                <h3 className="mt-6 text-xl font-bold text-white">{step.title}</h3>
                                <p className="mt-3 text-sm text-zinc-400 leading-relaxed">{step.description}</p>
                                <span className="absolute bottom-6 right-6 text-[11px] uppercase tracking-widest text-primary-400/60 font-medium">
                                    Step {step.number}
                                </span>
                            </motion.div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
