import { motion } from 'framer-motion';

/**
 * MarqueeRow — infinite-scroll horizontal strip.
 * Pass items as an array of strings/JSX. Children are duplicated so the
 * scroll loops seamlessly.
 *
 * Props:
 *   items     — array of nodes to display
 *   direction — 'left' | 'right' (default 'left')
 *   speed     — seconds per loop (default 40)
 *   className — extra classes for the container
 *   itemClass — class applied to each item wrapper
 */
export default function MarqueeRow({
    items = [],
    direction = 'left',
    speed = 40,
    className = '',
    itemClass = '',
}) {
    if (!items.length) return null;
    const animate = direction === 'left' ? { x: ['0%', '-50%'] } : { x: ['-50%', '0%'] };

    return (
        <div className={`relative overflow-hidden ${className}`} aria-hidden="true">
            <div className="absolute inset-y-0 left-0 w-24 z-10 pointer-events-none bg-gradient-to-r from-[var(--color-bg-primary)] to-transparent" />
            <div className="absolute inset-y-0 right-0 w-24 z-10 pointer-events-none bg-gradient-to-l from-[var(--color-bg-primary)] to-transparent" />
            <motion.div
                className="flex gap-8 whitespace-nowrap"
                animate={animate}
                transition={{ duration: speed, ease: 'linear', repeat: Infinity }}
            >
                {[...items, ...items].map((it, i) => (
                    <div key={i} className={`shrink-0 ${itemClass}`}>
                        {typeof it === 'string' ? (
                            <span className="px-6 py-3 rounded-full glass border border-white/10 text-sm font-medium text-white/80 hover:text-white transition-colors">
                                {it}
                            </span>
                        ) : (
                            it
                        )}
                    </div>
                ))}
            </motion.div>
        </div>
    );
}
