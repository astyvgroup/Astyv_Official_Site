import { useRef } from 'react';
import { motion, useScroll, useTransform, useReducedMotion } from 'framer-motion';

/**
 * ParallaxSection — moves child content at a different scroll speed
 * than its container. Use to give depth to imagery, headers, or backgrounds.
 *
 * Props:
 *   speed — 0.0–1.0 multiplier. 0 = static, 1 = full scroll. Default 0.3.
 *   axis  — 'y' (default) or 'x'
 */
export default function ParallaxSection({
    children,
    className = '',
    speed = 0.3,
    axis = 'y',
}) {
    const ref = useRef(null);
    const reducedMotion = useReducedMotion();
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ['start end', 'end start'],
    });
    const range = 100 * speed;
    const y = useTransform(scrollYProgress, [0, 1], [`-${range}px`, `${range}px`]);
    const x = useTransform(scrollYProgress, [0, 1], [`-${range}px`, `${range}px`]);

    if (reducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <div ref={ref} className={className}>
            <motion.div style={axis === 'x' ? { x } : { y }}>{children}</motion.div>
        </div>
    );
}
