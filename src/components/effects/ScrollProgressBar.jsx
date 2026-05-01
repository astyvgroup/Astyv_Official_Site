import { motion, useScroll, useSpring } from 'framer-motion';

/**
 * ScrollProgressBar — sticky top bar that fills as the user scrolls.
 * Mounted once globally in App.jsx. Pure CSS/transform — zero layout cost.
 */
export default function ScrollProgressBar() {
    const { scrollYProgress } = useScroll();
    const scaleX = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001,
    });

    return (
        <motion.div
            aria-hidden="true"
            className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[100] pointer-events-none"
            style={{
                scaleX,
                background: 'linear-gradient(90deg, #852BED 0%, #A558FF 50%, #C189FF 100%)',
                boxShadow: '0 0 12px rgba(133, 43, 237, 0.6)',
            }}
        />
    );
}
