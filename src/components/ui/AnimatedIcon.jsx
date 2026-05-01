import { motion, useReducedMotion } from 'framer-motion';
import * as Icons from 'lucide-react';

/**
 * AnimatedIcon — Lucide icon with an animated entry + idle effects.
 * Replaces a Lottie dependency for service-card icons. Cheap, accessible,
 * fully styled by Tailwind.
 *
 * Props:
 *   name — Lucide icon name (e.g. "Lightbulb", "BrainCircuit")
 *   variant — 'pulse' | 'spin' | 'float' | 'static' (default 'pulse')
 *   accent — bool — whether to render with a gradient ring background
 */
export default function AnimatedIcon({
    name,
    size = 28,
    variant = 'pulse',
    accent = true,
    className = '',
}) {
    const Icon = Icons[name] || Icons.Sparkles;
    const reducedMotion = useReducedMotion();

    const motionProps = (() => {
        if (reducedMotion) return {};
        switch (variant) {
            case 'spin':  return { animate: { rotate: 360 }, transition: { duration: 14, repeat: Infinity, ease: 'linear' } };
            case 'float': return { animate: { y: [-3, 3, -3] }, transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' } };
            case 'pulse': return { animate: { scale: [1, 1.06, 1] }, transition: { duration: 3, repeat: Infinity, ease: 'easeInOut' } };
            default: return {};
        }
    })();

    if (!accent) {
        return (
            <motion.span
                className={`inline-flex items-center justify-center ${className}`}
                {...motionProps}
            >
                <Icon size={size} strokeWidth={1.6} />
            </motion.span>
        );
    }

    return (
        <motion.span
            className={`relative inline-flex items-center justify-center w-14 h-14 rounded-2xl ${className}`}
            {...motionProps}
        >
            <span
                aria-hidden="true"
                className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary-500/30 via-primary-400/15 to-primary-700/25 border border-primary-500/30"
            />
            <span
                aria-hidden="true"
                className="absolute inset-[-1px] rounded-2xl opacity-50 blur-md bg-gradient-to-br from-primary-500/40 to-primary-700/40"
            />
            <Icon size={size} strokeWidth={1.6} className="relative text-white" />
        </motion.span>
    );
}
