import { motion } from 'framer-motion';

export default function RevealOnScroll({ children, delay = 0, className = '' }) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, delay, ease: [0.4, 0, 0.2, 1] }}
            className={className}
        >
            {children}
        </motion.div>
    );
}
