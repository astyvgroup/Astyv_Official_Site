import { useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery';

/**
 * MagicCursor — a refined, replaceable cursor.
 * - Hidden on touch devices and when prefers-reduced-motion is set.
 * - Morphs to a larger ring + label when hovering elements with [data-cursor].
 * - Shrinks to a dot when over plain text.
 */
export default function MagicCursor() {
    const isMobile = useMediaQuery('(max-width: 1024px)');
    const reducedMotion = useReducedMotion();
    const x = useMotionValue(-200);
    const y = useMotionValue(-200);
    const sx = useSpring(x, { stiffness: 600, damping: 40, mass: 0.4 });
    const sy = useSpring(y, { stiffness: 600, damping: 40, mass: 0.4 });

    const [variant, setVariant] = useState('default'); // default | hover | text | hidden
    const [label, setLabel] = useState('');

    useEffect(() => {
        if (isMobile || reducedMotion) return;

        const handleMove = (e) => {
            x.set(e.clientX);
            y.set(e.clientY);
        };

        const handleOver = (e) => {
            const t = e.target;
            if (!t || !(t instanceof Element)) return;
            const interactive = t.closest('a, button, [role="button"], [data-cursor]');
            if (interactive) {
                setVariant('hover');
                setLabel(interactive.getAttribute('data-cursor') || '');
                return;
            }
            const isText = ['P', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'SPAN', 'LI', 'TD'].includes(t.tagName);
            setVariant(isText ? 'text' : 'default');
            setLabel('');
        };

        const handleOut = () => setVariant('hidden');
        const handleIn = () => setVariant('default');

        window.addEventListener('pointermove', handleMove);
        document.addEventListener('mouseover', handleOver);
        document.documentElement.addEventListener('mouseleave', handleOut);
        document.documentElement.addEventListener('mouseenter', handleIn);
        return () => {
            window.removeEventListener('pointermove', handleMove);
            document.removeEventListener('mouseover', handleOver);
            document.documentElement.removeEventListener('mouseleave', handleOut);
            document.documentElement.removeEventListener('mouseenter', handleIn);
        };
    }, [isMobile, reducedMotion, x, y]);

    if (isMobile || reducedMotion) return null;

    const ringSize = variant === 'hover' ? 64 : variant === 'text' ? 20 : 36;
    const dotSize = variant === 'hover' ? 8 : variant === 'text' ? 2 : 5;
    const opacity = variant === 'hidden' ? 0 : 1;

    return (
        <>
            {/* Outer ring */}
            <motion.div
                aria-hidden="true"
                className="fixed top-0 left-0 pointer-events-none z-[9998] mix-blend-difference will-change-transform"
                style={{
                    x: sx,
                    y: sy,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity,
                }}
            >
                <motion.div
                    className="rounded-full border flex items-center justify-center"
                    animate={{
                        width: ringSize,
                        height: ringSize,
                        borderColor: variant === 'hover'
                            ? 'rgba(165,88,255,0.95)'
                            : 'rgba(255,255,255,0.65)',
                        backgroundColor: variant === 'hover'
                            ? 'rgba(133,43,237,0.18)'
                            : 'transparent',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                >
                    {label && (
                        <span className="text-[10px] font-medium uppercase tracking-[0.15em] text-white whitespace-nowrap px-2">
                            {label}
                        </span>
                    )}
                </motion.div>
            </motion.div>

            {/* Inner dot */}
            <motion.div
                aria-hidden="true"
                className="fixed top-0 left-0 pointer-events-none z-[9999] will-change-transform"
                style={{
                    x: sx,
                    y: sy,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity,
                }}
            >
                <motion.div
                    className="rounded-full"
                    animate={{
                        width: dotSize,
                        height: dotSize,
                        backgroundColor: variant === 'hover' ? '#fff' : '#852BED',
                    }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
            </motion.div>
        </>
    );
}
