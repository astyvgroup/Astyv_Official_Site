import { useRef } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useReducedMotion } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery';

/**
 * TiltCard — wraps content with a 3D tilt-on-hover effect.
 * Tilts up to ±10° based on cursor position. Adds a soft purple-glow
 * on the corner the cursor is closest to.
 *
 * Disabled on touch devices and reduced-motion settings.
 */
export default function TiltCard({
    children,
    className = '',
    intensity = 10,
    glare = true,
    ...rest
}) {
    const ref = useRef(null);
    const reducedMotion = useReducedMotion();
    const isTouch = useMediaQuery('(hover: none)');

    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const rotX = useSpring(useTransform(y, [-0.5, 0.5], [intensity, -intensity]), { stiffness: 300, damping: 30 });
    const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-intensity, intensity]), { stiffness: 300, damping: 30 });
    const glareX = useTransform(x, [-0.5, 0.5], ['0%', '100%']);
    const glareY = useTransform(y, [-0.5, 0.5], ['0%', '100%']);

    const handleMove = (e) => {
        if (!ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        x.set((e.clientX - rect.left) / rect.width - 0.5);
        y.set((e.clientY - rect.top) / rect.height - 0.5);
    };

    const handleLeave = () => {
        x.set(0);
        y.set(0);
    };

    if (reducedMotion || isTouch) {
        return <div className={className} {...rest}>{children}</div>;
    }

    return (
        <motion.div
            ref={ref}
            onMouseMove={handleMove}
            onMouseLeave={handleLeave}
            style={{
                rotateX: rotX,
                rotateY: rotY,
                transformStyle: 'preserve-3d',
                transformPerspective: 1000,
            }}
            className={`relative ${className}`}
            {...rest}
        >
            <div style={{ transform: 'translateZ(0)' }}>{children}</div>
            {glare && (
                <motion.div
                    aria-hidden="true"
                    className="absolute inset-0 rounded-[inherit] pointer-events-none"
                    style={{
                        background: `radial-gradient(circle at ${glareX} ${glareY}, rgba(165,88,255,0.18), transparent 50%)`,
                        mixBlendMode: 'soft-light',
                    }}
                />
            )}
        </motion.div>
    );
}
