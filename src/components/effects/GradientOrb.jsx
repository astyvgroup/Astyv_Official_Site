import { motion, useReducedMotion } from 'framer-motion';

/**
 * GradientOrb — a floating, blurred purple orb used as a hero accent.
 * Pass `size`, `top`, `left`, etc. as Tailwind classes via `className`.
 */
export default function GradientOrb({
    className = '',
    size = 'w-[40vw] h-[40vw]',
    color = 'rgba(133,43,237,0.45)',
    blur = 80,
}) {
    const reducedMotion = useReducedMotion();
    return (
        <motion.div
            aria-hidden="true"
            className={`absolute rounded-full pointer-events-none ${size} ${className}`}
            style={{
                background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
                filter: `blur(${blur}px)`,
            }}
            animate={
                reducedMotion
                    ? {}
                    : {
                          scale: [1, 1.15, 0.95, 1],
                          opacity: [0.85, 1, 0.8, 0.85],
                      }
            }
            transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        />
    );
}
