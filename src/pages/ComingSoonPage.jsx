import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Linkedin, Twitter, Github, ArrowRight, Check } from 'lucide-react';
import siteContent from '../config/siteContent';
import ParticleBackground from '../components/three/ParticleBackground';
import AuroraBackground from '../components/effects/AuroraBackground';
import GradientOrb from '../components/effects/GradientOrb';
import KineticHeading from '../components/ui/KineticHeading';
import RevealText from '../components/ui/RevealText';
import RevealOnScroll from '../components/ui/RevealOnScroll';
import MagneticButton from '../components/ui/MagneticButton';
import BrandLogo from '../components/ui/BrandLogo';
import SEOHead from '../components/seo/SEOHead';

function useCountdown(target) {
    const [now, setNow] = useState(Date.now());
    useEffect(() => {
        const id = setInterval(() => setNow(Date.now()), 1000);
        return () => clearInterval(id);
    }, []);
    if (!target) return null;
    const diff = Math.max(0, new Date(target).getTime() - now);
    const days    = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours   = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { days, hours, minutes, seconds, isOver: diff === 0 };
}

export default function ComingSoonPage() {
    const { brand, launch } = siteContent;
    const cs = launch.comingSoon;
    const countdown = useCountdown(launch.launchDate);

    const [email, setEmail] = useState('');
    const [status, setStatus] = useState('idle'); // idle | submitting | success | error

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!email || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)) {
            setStatus('error');
            return;
        }
        setStatus('submitting');
        // Send via a simple mailto fallback (or wire up EmailJS later).
        // Open a prefilled mail composition so we don't lose the address even
        // without a backend.
        try {
            window.location.href = `mailto:${brand.email}?subject=${encodeURIComponent(
                'Notify me at launch'
            )}&body=${encodeURIComponent(`Please add me to the Astyv launch list: ${email}`)}`;
            setStatus('success');
        } catch {
            setStatus('error');
        }
    };

    const Box = ({ value, label }) => (
        <div className="text-center">
            <div className="text-3xl md:text-5xl font-black text-white tabular-nums tracking-tight">
                {String(value).padStart(2, '0')}
            </div>
            <div className="text-[10px] md:text-xs uppercase tracking-[0.2em] text-zinc-500 mt-2">
                {label}
            </div>
        </div>
    );

    return (
        <>
            <SEOHead
                page="home"
                title={`${brand.name} — ${cs.headline.split('\n').join(' ')}`}
                description={cs.subheadline}
            />

            <div className="relative min-h-screen flex flex-col overflow-hidden bg-[#0A0A0A]">
                {/* Backgrounds */}
                <AuroraBackground intensity="subtle" />
                <div className="absolute inset-0 opacity-60">
                    <ParticleBackground fullScreen subtle />
                </div>
                <GradientOrb className="top-[-15%] right-[-10%]" size="w-[60vw] h-[60vw]" />
                <GradientOrb className="bottom-[-25%] left-[-15%]" size="w-[50vw] h-[50vw]" color="rgba(165,88,255,0.4)" />

                {/* Top brand bar */}
                <header className="relative z-10 px-6 md:px-12 py-6 flex items-center justify-between">
                    <BrandLogo variant="fullTransparent" alt="Astyv — Building What's Next" className="h-16 md:h-20 w-auto" />
                    <span className="hidden sm:block text-xs uppercase tracking-[0.2em] text-zinc-500">
                        astyv.com
                    </span>
                </header>

                {/* Hero */}
                <main className="relative z-10 flex-1 flex items-center">
                    <div className="container-custom w-full">
                        <div className="max-w-4xl mx-auto text-center">
                            <RevealOnScroll>
                                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full glass border border-primary-500/40 text-xs uppercase tracking-[0.2em] text-primary-300 font-medium">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary-400 animate-pulse" />
                                    {cs.overline}
                                </span>
                            </RevealOnScroll>

                            <KineticHeading
                                text={cs.headline}
                                as="h1"
                                className="mt-8 text-display-xl font-black tracking-tighter text-white leading-[0.95]"
                            />

                            <RevealText delay={0.4} className="mt-8">
                                <p className="text-lg md:text-xl text-zinc-300 leading-relaxed max-w-2xl mx-auto">
                                    {cs.subheadline}
                                </p>
                            </RevealText>

                            {/* Countdown */}
                            {countdown && !countdown.isOver && (
                                <RevealOnScroll delay={0.5}>
                                    <div className="mt-12 inline-grid grid-cols-4 gap-4 md:gap-10 px-6 md:px-10 py-6 rounded-2xl glass border border-white/10">
                                        <Box value={countdown.days}    label="Days" />
                                        <Box value={countdown.hours}   label="Hours" />
                                        <Box value={countdown.minutes} label="Minutes" />
                                        <Box value={countdown.seconds} label="Seconds" />
                                    </div>
                                </RevealOnScroll>
                            )}

                            {/* Email capture */}
                            <RevealOnScroll delay={0.6}>
                                <div className="mt-12 max-w-xl mx-auto">
                                    <p className="text-base font-semibold text-white">{cs.notifyHeading}</p>
                                    <p className="text-sm text-zinc-400 mt-2">{cs.notifySubheading}</p>
                                    <form
                                        onSubmit={handleSubmit}
                                        className="mt-6 flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
                                    >
                                        <input
                                            type="email"
                                            value={email}
                                            onChange={(e) => setEmail(e.target.value)}
                                            placeholder={cs.notifyPlaceholder}
                                            aria-label="Email address"
                                            disabled={status === 'success'}
                                            className="flex-1 px-5 py-3.5 rounded-full bg-white/5 border border-white/10 text-white placeholder-zinc-500 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/30 transition-all"
                                            required
                                        />
                                        <MagneticButton strength={0.25}>
                                            <button
                                                type="submit"
                                                disabled={status === 'submitting' || status === 'success'}
                                                className="inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full bg-primary-500 hover:bg-primary-600 text-white font-semibold transition-all shadow-lg shadow-primary-500/30 hover:shadow-primary-500/50 hover:-translate-y-0.5 disabled:opacity-60"
                                            >
                                                {status === 'success' ? (
                                                    <><Check size={18} /> Added</>
                                                ) : (
                                                    <>{cs.notifyButton} <ArrowRight size={18} /></>
                                                )}
                                            </button>
                                        </MagneticButton>
                                    </form>
                                    {status === 'success' && (
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm text-primary-300">
                                            {cs.notifySuccess}
                                        </motion.p>
                                    )}
                                    {status === 'error' && (
                                        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-3 text-sm text-red-400">
                                            {cs.notifyError}
                                        </motion.p>
                                    )}
                                </div>
                            </RevealOnScroll>

                            {/* Pillars */}
                            <RevealOnScroll delay={0.8}>
                                <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-4">
                                    {cs.pillars.map((p, i) => (
                                        <motion.div
                                            key={p.title}
                                            whileHover={{ y: -4 }}
                                            className="p-6 rounded-xl glass border border-white/5 text-left"
                                        >
                                            <div className="text-xs font-semibold uppercase tracking-widest text-primary-400">
                                                0{i + 1}
                                            </div>
                                            <h3 className="mt-3 text-base font-bold text-white">{p.title}</h3>
                                            <p className="mt-2 text-sm text-zinc-400 leading-relaxed">{p.description}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </RevealOnScroll>
                        </div>
                    </div>
                </main>

                {/* Footer */}
                <footer className="relative z-10 px-6 md:px-12 py-8 flex flex-wrap items-center justify-between gap-4">
                    <span className="text-xs text-zinc-500">{cs.legalNote}</span>
                    <div className="flex items-center gap-4">
                        <a
                            href={`mailto:${brand.email}`}
                            data-cursor="Email"
                            aria-label="Email Astyv"
                            className="w-9 h-9 grid place-items-center rounded-full glass border border-white/10 text-zinc-400 hover:text-white hover:border-primary-500/50 transition-colors"
                        >
                            <Mail size={15} />
                        </a>
                        {brand.social.linkedin && (
                            <a
                                href={brand.social.linkedin}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor="LinkedIn"
                                aria-label="LinkedIn"
                                className="w-9 h-9 grid place-items-center rounded-full glass border border-white/10 text-zinc-400 hover:text-white hover:border-primary-500/50 transition-colors"
                            >
                                <Linkedin size={15} />
                            </a>
                        )}
                        {brand.social.twitter && (
                            <a
                                href={brand.social.twitter}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor="X / Twitter"
                                aria-label="X / Twitter"
                                className="w-9 h-9 grid place-items-center rounded-full glass border border-white/10 text-zinc-400 hover:text-white hover:border-primary-500/50 transition-colors"
                            >
                                <Twitter size={15} />
                            </a>
                        )}
                        {brand.social.github && (
                            <a
                                href={brand.social.github}
                                target="_blank"
                                rel="noopener noreferrer"
                                data-cursor="GitHub"
                                aria-label="GitHub"
                                className="w-9 h-9 grid place-items-center rounded-full glass border border-white/10 text-zinc-400 hover:text-white hover:border-primary-500/50 transition-colors"
                            >
                                <Github size={15} />
                            </a>
                        )}
                    </div>
                </footer>
            </div>
        </>
    );
}
