import { motion, useReducedMotion } from 'framer-motion';

/**
 * RevealText — line-by-line mask reveal for paragraphs.
 * Use for any body text where character-by-character would be overkill.
 */
export default function RevealText({
    children,
    className = '',
    delay = 0,
    once = true,
}) {
    const reducedMotion = useReducedMotion();

    if (reducedMotion) {
        return <div className={className}>{children}</div>;
    }

    return (
        <motion.div
            className={`overflow-hidden ${className}`}
            initial={{ opacity: 0, y: 30, filter: 'blur(8px)' }}
            whileInView={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            viewport={{ once, amount: 0.3 }}
            transition={{ duration: 0.9, delay, ease: [0.16, 1, 0.3, 1] }}
        >
            {children}
        </motion.div>
    );
}
