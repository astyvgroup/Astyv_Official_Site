import { motion } from 'framer-motion';
import ParticleBackground from '../../three/ParticleBackground';
import TextReveal from '../../ui/TextReveal';
import siteContent from '../../../config/siteContent';

export default function ServicesHero() {
    const { hero } = siteContent.services;
    return (
        <section className="relative min-h-[70vh] flex items-center overflow-hidden">
            <ParticleBackground subtle />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent to-dark-primary z-[1]" />
            <div className="relative z-10 container-custom pt-32 pb-20">
                <TextReveal text={hero.headline} tag="h1" className="text-4xl md:text-5xl lg:text-7xl font-bold text-white leading-tight mb-6" />
                <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8, duration: 0.6 }} className="text-lg text-zinc-400 max-w-2xl leading-relaxed">
                    {hero.subheadline}
                </motion.p>
            </div>
        </section>
    );
}
