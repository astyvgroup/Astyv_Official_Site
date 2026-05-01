import { motion } from 'framer-motion';
import { Lightbulb, BrainCircuit, Code2, Users, Check } from 'lucide-react';
import RevealOnScroll from '../../ui/RevealOnScroll';
import siteContent from '../../../config/siteContent';

const iconMap = { Lightbulb, BrainCircuit, Code2, Users };

export default function ServiceDetail() {
    const { offerings } = siteContent.services;

    return (
        <section className="section-padding bg-dark-primary">
            <div className="container-custom space-y-24">
                {offerings.map((service, i) => {
                    const Icon = iconMap[service.icon] || Code2;
                    const isEven = i % 2 === 0;
                    return (
                        <div key={service.id} id={service.id} className="scroll-mt-24">
                            <RevealOnScroll>
                                <div className={`grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start ${!isEven ? 'lg:direction-rtl' : ''}`}>
                                    {/* Content side */}
                                    <div className={!isEven ? 'lg:order-2' : ''}>
                                        <div className="flex items-center gap-3 mb-4">
                                            <div className="w-10 h-10 rounded-lg bg-primary-500/10 flex items-center justify-center">
                                                <Icon className="w-5 h-5 text-primary-400" />
                                            </div>
                                            <span className="text-xs font-mono text-primary-400 uppercase tracking-wider">{service.tagline}</span>
                                        </div>
                                        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">{service.title}</h2>
                                        <p className="text-zinc-400 leading-relaxed mb-8">{service.description}</p>

                                        {/* Capabilities */}
                                        <ul className="space-y-3">
                                            {service.capabilities.map((cap) => (
                                                <li key={cap} className="flex items-start gap-3 text-sm text-zinc-300">
                                                    <Check className="w-4 h-4 text-primary-400 shrink-0 mt-0.5" />
                                                    {cap}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>

                                    {/* Metric card side */}
                                    <div className={!isEven ? 'lg:order-1' : ''}>
                                        <div className="p-8 lg:p-10 rounded-2xl border border-white/[0.06] bg-dark-secondary flex flex-col items-center justify-center text-center h-full min-h-[250px]">
                                            <motion.div
                                                initial={{ scale: 0.8, opacity: 0 }}
                                                whileInView={{ scale: 1, opacity: 1 }}
                                                viewport={{ once: true }}
                                                transition={{ duration: 0.5 }}
                                            >
                                                <div className="text-5xl md:text-6xl font-bold gradient-text mb-3">{service.metrics.value}</div>
                                                <p className="text-sm text-zinc-500">{service.metrics.label}</p>
                                            </motion.div>
                                        </div>
                                    </div>
                                </div>
                            </RevealOnScroll>
                        </div>
                    );
                })}
            </div>
        </section>
    );
}
