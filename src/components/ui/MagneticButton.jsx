import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery';

/**
 * MagneticButton — wraps any button or link in a subtle magnetic-pull
 * effect: the element drifts toward the cursor as it nears.
 *
 * Disabled on touch devices and reduced-motion settings.
 */
export default function MagneticButton({
    children,
    className = '',
    strength = 0.4,
    as: Tag = 'div',
    ...rest
}) {
    const ref = useRef(null);
    const reducedMotion = useReducedMotion();
    const isTouch = useMediaQuery('(hover: none)');

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const sx = useSpring(x, { stiffness: 200, damping: 20 });
    const sy = useSpring(y, { stiffness: 200, damping: 20 });

    const handleMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        x.set((e.clientX - cx) * strength);
        y.set((e.clientY - cy) * strength);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    if (reducedMotion || isTouch) {
        return <Tag className={className} {...rest}>{children}</Tag>;
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{ x: sx, y: sy }}
            className={`inline-block ${className}`}
            {...rest}
        >
            {children}
        </motion.div>
    );
}
