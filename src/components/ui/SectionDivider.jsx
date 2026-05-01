import { motion, useReducedMotion } from 'framer-motion';

/**
 * SectionDivider — a draw-on-scroll SVG accent that visually separates
 * sections. Three variants: 'line', 'wave', 'chevron'.
 */
export default function SectionDivider({ variant = 'line', className = '' }) {
    const reducedMotion = useReducedMotion();
    const draw = reducedMotion
        ? { initial: { pathLength: 1 }, animate: { pathLength: 1 } }
        : {
              initial: { pathLength: 0, opacity: 0 },
              whileInView: { pathLength: 1, opacity: 1 },
              transition: { duration: 1.4, ease: 'easeInOut' },
              viewport: { once: true },
          };

    if (variant === 'wave') {
        return (
            <div className={`w-full overflow-hidden ${className}`} aria-hidden="true">
                <svg viewBox="0 0 1200 60" className="w-full h-12">
                    <motion.path
                        d="M0,30 Q300,0 600,30 T1200,30"
                        stroke="url(#div-grad-wave)"
                        strokeWidth="2"
                        fill="none"
                        {...draw}
                    />
                    <defs>
                        <linearGradient id="div-grad-wave" x1="0" y1="0" x2="1" y2="0">
                            <stop offset="0%" stopColor="rgba(255,255,255,0)" />
                            <stop offset="50%" stopColor="#852BED" />
                            <stop offset="100%" stopColor="rgba(255,255,255,0)" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        );
    }

    if (variant === 'chevron') {
        return (
            <div className={`flex justify-center ${className}`} aria-hidden="true">
                <svg viewBox="0 0 24 12" className="w-12 h-6">
                    <motion.path d="M2,2 L12,10 L22,2" stroke="#852BED" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...draw} />
                </svg>
            </div>
        );
    }

    // default: line
    return (
        <div className={`flex justify-center ${className}`} aria-hidden="true">
            <svg viewBox="0 0 200 4" className="w-32 h-1">
                <motion.line
                    x1="0" y1="2" x2="200" y2="2"
                    stroke="url(#div-grad-line)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    {...draw}
                />
                <defs>
                    <linearGradient id="div-grad-line" x1="0" y1="0" x2="1" y2="0">
                        <stop offset="0%" stopColor="rgba(133,43,237,0)" />
                        <stop offset="50%" stopColor="#852BED" />
                        <stop offset="100%" stopColor="rgba(133,43,237,0)" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}
