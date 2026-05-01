import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Button from '../../ui/Button';
import MagneticElement from '../../ui/MagneticElement';
import siteContent from '../../../config/siteContent';

export default function CTASection() {
    const { cta } = siteContent.home;

    return (
        <section className="section-padding bg-dark-primary relative overflow-hidden">
            {/* Background glow */}
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[600px] h-[600px] rounded-full bg-primary-500/5 blur-[120px]" />
            </div>

            <div className="container-custom relative z-10 text-center">
                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="text-3xl md:text-4xl lg:text-6xl font-bold text-white mb-6"
                >
                    {cta.heading}
                </motion.h2>
                <motion.p
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="text-lg text-zinc-400 max-w-xl mx-auto mb-10"
                >
                    {cta.subheading}
                </motion.p>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                >
                    <MagneticElement>
                        <Button to={cta.buttonPath} size="lg" icon={<ArrowRight size={16} />}>
                            {cta.buttonLabel}
                        </Button>
                    </MagneticElement>
                </motion.div>
            </div>
        </section>
    );
}
