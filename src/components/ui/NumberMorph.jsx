import { useEffect, useRef, useState } from 'react';
import { motion, useInView, useMotionValue, useTransform, animate, useReducedMotion } from 'framer-motion';

/**
 * NumberMorph — smooth digit-rolling counter. Renders a target value,
 * easing from 0 → value when the element enters the viewport.
 *
 * Replaces / extends the original StatCounter with cleaner motion.
 */
export default function NumberMorph({
    value = 0,
    duration = 2.2,
    suffix = '',
    prefix = '',
    className = '',
    delay = 0,
}) {
    const ref = useRef(null);
    const inView = useInView(ref, { once: true, amount: 0.4 });
    const reducedMotion = useReducedMotion();
    const motionValue = useMotionValue(0);
    const [display, setDisplay] = useState(0);

    useEffect(() => {
        if (!inView) return;
        if (reducedMotion) {
            setDisplay(value);
            return;
        }
        const controls = animate(motionValue, value, {
            duration,
            delay,
            ease: [0.16, 1, 0.3, 1],
            onUpdate: (latest) => setDisplay(latest),
        });
        return () => controls.stop();
    }, [inView, value, duration, delay, reducedMotion, motionValue]);

    const formatted = (() => {
        const v = Math.round(display);
        return v.toLocaleString();
    })();

    return (
        <span ref={ref} className={className}>
            {prefix}{formatted}{suffix}
        </span>
    );
}
