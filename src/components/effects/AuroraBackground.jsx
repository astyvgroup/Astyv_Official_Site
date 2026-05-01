import { motion, useReducedMotion } from 'framer-motion';
import useMediaQuery from '../../hooks/useMediaQuery';

/**
 * AuroraBackground — slowly-drifting gradient mesh used as a fixed
 * page-wide background accent. Heavy blur is reduced on mobile.
 * Disabled entirely under prefers-reduced-motion.
 */
export default function AuroraBackground({ intensity = 'normal' }) {
    const reducedMotion = useReducedMotion();
    const isMobile = useMediaQuery('(max-width: 768px)');
    const blur = isMobile ? 70 : intensity === 'subtle' ? 100 : 140;

    if (reducedMotion) {
        return (
            <div
                aria-hidden="true"
                className="fixed inset-0 -z-10 pointer-events-none opacity-50"
                style={{
                    background:
                        'radial-gradient(ellipse at 20% 0%, rgba(133,43,237,0.18), transparent 50%), radial-gradient(ellipse at 80% 100%, rgba(165,88,255,0.12), transparent 50%)',
                }}
            />
        );
    }

    return (
        <div
            aria-hidden="true"
            className="fixed inset-0 -z-10 pointer-events-none overflow-hidden"
        >
            <motion.div
                className="absolute -inset-32"
                style={{ filter: `blur(${blur}px)` }}
                initial={{ opacity: 0 }}
                animate={{ opacity: intensity === 'subtle' ? 0.55 : 0.85 }}
                transition={{ duration: 2 }}
            >
                <motion.div
                    className="absolute"
                    style={{
                        top: '8%',
                        left: '12%',
                        width: '40vw',
                        height: '40vw',
                        background: 'radial-gradient(circle, #852BED 0%, transparent 70%)',
                        borderRadius: '50%',
                    }}
                    animate={{
                        x: ['0%', '12%', '-6%', '0%'],
                        y: ['0%', '-8%', '6%', '0%'],
                        scale: [1, 1.18, 0.9, 1],
                    }}
                    transition={{ duration: 22, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute"
                    style={{
                        bottom: '6%',
                        right: '10%',
                        width: '50vw',
                        height: '50vw',
                        background: 'radial-gradient(circle, #A558FF 0%, transparent 70%)',
                        borderRadius: '50%',
                    }}
                    animate={{
                        x: ['0%', '-15%', '8%', '0%'],
                        y: ['0%', '10%', '-5%', '0%'],
                        scale: [1, 0.85, 1.15, 1],
                    }}
                    transition={{ duration: 28, repeat: Infinity, ease: 'easeInOut' }}
                />
                <motion.div
                    className="absolute"
                    style={{
                        top: '40%',
                        left: '50%',
                        width: '30vw',
                        height: '30vw',
                        background: 'radial-gradient(circle, #C189FF 0%, transparent 70%)',
                        borderRadius: '50%',
                    }}
                    animate={{
                        x: ['0%', '-12%', '14%', '0%'],
                        y: ['0%', '12%', '-10%', '0%'],
                        scale: [1, 1.12, 0.95, 1],
                    }}
                    transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
                />
            </motion.div>
        </div>
    );
}
