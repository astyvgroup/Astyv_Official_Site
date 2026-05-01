import { motion } from 'framer-motion';
import siteContent from '../../../config/siteContent';
import RevealOnScroll from '../../ui/RevealOnScroll';
import KineticHeading from '../../ui/KineticHeading';
import AnimatedIcon from '../../ui/AnimatedIcon';

export default function IndustriesSection() {
    const { overline, heading, subheading, items } = siteContent.home.industries;

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
                        className="text-4xl md:text-5xl lg:text-6xl font-bold mt-4 text-white"
                    />
                    <RevealOnScroll delay={0.2}>
                        <p className="text-base md:text-lg text-zinc-400 mt-6">{subheading}</p>
                    </RevealOnScroll>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {items.map((ind, i) => (
                        <RevealOnScroll key={ind.name} delay={0.04 * i}>
                            <motion.div
                                whileHover={{ y: -4, scale: 1.02 }}
                                transition={{ type: 'spring', stiffness: 280, damping: 20 }}
                                className="h-full p-6 rounded-xl glass border border-white/5 hover:border-primary-500/40 hover:bg-primary-500/5 transition-all"
                                data-cursor="View"
                            >
                                <AnimatedIcon name={ind.icon} size={22} accent={false} className="text-primary-400" />
                                <h3 className="mt-4 text-base font-semibold text-white">{ind.name}</h3>
                                <p className="mt-2 text-xs text-zinc-500 leading-relaxed">{ind.description}</p>
                            </motion.div>
                        </RevealOnScroll>
                    ))}
                </div>
            </div>
        </section>
    );
}
