import { motion, useReducedMotion } from 'framer-motion';

/**
 * BlobBackground — drifting SVG blobs as a section-level decorative
 * background. Use behind any section with position: relative.
 */
export default function BlobBackground({ className = '', count = 2, variant = 'primary' }) {
    const reducedMotion = useReducedMotion();
    const colors = variant === 'subtle'
        ? ['rgba(133,43,237,0.10)', 'rgba(165,88,255,0.08)']
        : ['rgba(133,43,237,0.22)', 'rgba(165,88,255,0.18)'];

    return (
        <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`} aria-hidden="true">
            {Array.from({ length: count }).map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute"
                    style={{
                        top: i % 2 === 0 ? '10%' : '50%',
                        left: i % 2 === 0 ? '8%' : 'auto',
                        right: i % 2 === 0 ? 'auto' : '8%',
                        width: '34vw',
                        height: '34vw',
                        background: colors[i % colors.length],
                        filter: 'blur(80px)',
                        borderRadius: '60% 40% 30% 70% / 60% 30% 70% 40%',
                    }}
                    animate={
                        reducedMotion
                            ? {}
                            : {
                                  borderRadius: [
                                      '60% 40% 30% 70% / 60% 30% 70% 40%',
                                      '30% 60% 70% 40% / 50% 60% 30% 60%',
                                      '50% 60% 30% 60% / 30% 60% 70% 40%',
                                      '60% 40% 30% 70% / 60% 30% 70% 40%',
                                  ],
                                  rotate: [0, 12, -8, 0],
                                  scale: [1, 1.05, 0.97, 1],
                              }
                    }
                    transition={{
                        duration: 14 + i * 4,
                        repeat: Infinity,
                        ease: 'easeInOut',
                    }}
                />
            ))}
        </div>
    );
}
