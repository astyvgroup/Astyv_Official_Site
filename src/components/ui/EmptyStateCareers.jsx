import { useMemo } from 'react';
import { motion } from 'framer-motion';
import { Rocket } from 'lucide-react';
import siteContent from '../../config/siteContent';

export default function EmptyStateCareers() {
    const { emptyState } = siteContent.careers;

    // Randomly pick a message variant
    const message = useMemo(() => {
        const all = [
            { headline: emptyState.headline, subheadline: emptyState.subheadline },
            ...emptyState.alternateMessages,
        ];
        return all[Math.floor(Math.random() * all.length)];
    }, []);

    // Generate random particles for the rocket animation
    const particles = useMemo(() =>
        Array.from({ length: 20 }, (_, i) => ({
            id: i,
            x: (Math.random() - 0.5) * 60,
            y: Math.random() * 40 + 20,
            size: Math.random() * 4 + 2,
            delay: Math.random() * 2,
            duration: Math.random() * 2 + 2,
        })), []);

    return (
        <div className="text-center py-12">
            {/* Animated Rocket Illustration */}
            <div className="relative w-48 h-48 mx-auto mb-12">
                {/* Glow base */}
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-32 h-4 rounded-full bg-primary-500/20 blur-xl" />

                {/* Particles */}
                {particles.map((p) => (
                    <motion.div
                        key={p.id}
                        className="absolute rounded-full bg-primary-500"
                        style={{
                            width: p.size,
                            height: p.size,
                            left: `calc(50% + ${p.x}px)`,
                            bottom: '10%',
                        }}
                        animate={{
                            y: [-p.y, -p.y - 30, -p.y],
                            opacity: [0, 0.8, 0],
                            scale: [0.5, 1, 0.5],
                        }}
                        transition={{
                            duration: p.duration,
                            delay: p.delay,
                            repeat: Infinity,
                            ease: 'easeInOut',
                        }}
                    />
                ))}

                {/* Rocket */}
                <motion.div
                    className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    animate={{ y: [0, -8, 0], rotate: [-2, 2, -2] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                >
                    <div className="relative">
                        <Rocket className="w-16 h-16 text-primary-400 rotate-[-45deg]" />
                        {/* Exhaust glow */}
                        <motion.div
                            className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-6 h-8 rounded-full bg-primary-500/40 blur-md"
                            animate={{ opacity: [0.3, 0.7, 0.3], scale: [0.8, 1.2, 0.8] }}
                            transition={{ duration: 1, repeat: Infinity }}
                        />
                    </div>
                </motion.div>

                {/* Orbit ring */}
                <motion.div
                    className="absolute inset-4 rounded-full border border-primary-500/10"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
                >
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-primary-500/50" />
                </motion.div>
            </div>

            <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-2xl md:text-3xl font-bold text-white mb-4 max-w-lg mx-auto"
            >
                {message.headline}
            </motion.h3>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="text-zinc-400 max-w-md mx-auto mb-2"
            >
                {message.subheadline}
            </motion.p>
            <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-xs text-zinc-600 max-w-sm mx-auto"
            >
                {emptyState.ctaSubtext}
            </motion.p>
        </div>
    );
}
