import { motion } from 'framer-motion';
import { ArrowRight, Sparkles } from 'lucide-react';
import ParticleBackground from '../../three/ParticleBackground';
import TextReveal from '../../ui/TextReveal';
import Button from '../../ui/Button';
import MagneticElement from '../../ui/MagneticElement';
import TypewriterText from '../../ui/TypewriterText';
import GradientOrb from '../../effects/GradientOrb';
import siteContent from '../../../config/siteContent';

export default function HeroSection() {
    const { hero } = siteContent.home;

    return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
            <ParticleBackground fullScreen />

            {/* Decorative purple orbs (layered behind, additive — sit above particles, below content) */}
            <GradientOrb className="top-[-20%] left-[-10%]" size="w-[55vw] h-[55vw]" color="rgba(133,43,237,0.4)" blur={100} />
            <GradientOrb className="bottom-[-25%] right-[-15%]" size="w-[60vw] h-[60vw]" color="rgba(165,88,255,0.35)" blur={120} />

            {/* Gradient overlays (kept exactly as before) */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-dark-primary z-[1]" />
            <div className="absolute inset-0 bg-radial-gradient z-[1]" style={{ background: 'radial-gradient(ellipse at center, transparent 0%, var(--color-bg-primary) 70%)' }} />

            <div className="relative z-10 container-custom text-center px-4 pt-20">
                {/* New: brand overline pill */}
                <motion.div
                    initial={{ opacity: 0, y: -8 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="inline-flex items-center gap-2 px-4 py-1.5 mb-8 rounded-full glass border border-primary-500/40 text-xs uppercase tracking-[0.2em] text-primary-300 font-medium"
                >
                    <Sparkles size={12} className="text-primary-400" />
                    {hero.overline || 'Welcome to Astyv'}
                </motion.div>

                <TextReveal
                    text={hero.headline}
                    tag="h1"
                    charByChar
                    className="text-hero font-bold text-white leading-[1.05] tracking-tight mb-8 whitespace-pre-line"
                />

                {/* Static lead paragraph (kept) */}
                <motion.p
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.2, duration: 0.6 }}
                    className="text-base md:text-lg lg:text-xl text-zinc-400 max-w-2xl mx-auto mb-6 leading-relaxed"
                >
                    {hero.subheadline}
                </motion.p>

                {/* New: rotating typewriter subline (only renders if rotatingSublines present) */}
                {hero.rotatingSublines && hero.rotatingSublines.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 1.5, duration: 0.6 }}
                        className="text-sm md:text-base text-primary-300 max-w-2xl mx-auto mb-10 min-h-[1.5em] font-medium"
                    >
                        <TypewriterText phrases={hero.rotatingSublines} />
                    </motion.div>
                )}

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 1.7, duration: 0.5 }}
                    className="flex flex-col sm:flex-row items-center justify-center gap-4"
                >
                    <MagneticElement>
                        <Button to={hero.cta.path} size="lg" icon={<ArrowRight size={16} />}>
                            {hero.cta.label}
                        </Button>
                    </MagneticElement>
                    <MagneticElement>
                        <Button to={hero.ctaSecondary.path} variant="secondary" size="lg">
                            {hero.ctaSecondary.label}
                        </Button>
                    </MagneticElement>
                </motion.div>

                {/* Scroll indicator (kept exactly as before) */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 2, duration: 0.5 }}
                    className="absolute bottom-8 left-1/2 -translate-x-1/2"
                >
                    <motion.div
                        animate={{ y: [0, 8, 0] }}
                        transition={{ duration: 2, repeat: Infinity }}
                        className="w-5 h-8 rounded-full border border-white/20 flex items-start justify-center p-1.5"
                    >
                        <motion.div className="w-1 h-2 rounded-full bg-primary-400" />
                    </motion.div>
                </motion.div>
            </div>
        </section>
    );
}
