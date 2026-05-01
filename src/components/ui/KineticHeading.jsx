import { motion, useReducedMotion } from 'framer-motion';

/**
 * KineticHeading — splits text by character and reveals each with a
 * staggered 3D rotateX entrance. Falls back to a plain element under
 * prefers-reduced-motion.
 *
 * Renders any heading tag via the `as` prop. Newlines (\n) become <br/>.
 */
export default function KineticHeading({
    text = '',
    as: Tag = 'h1',
    className = '',
    delay = 0,
    stagger = 0.04,
    duration = 0.7,
    splitBy = 'word', // 'word' | 'char'
    once = true,
}) {
    const reducedMotion = useReducedMotion();

    if (reducedMotion) {
        return <Tag className={className}>{text.split('\n').map((line, i) => (
            <span key={i}>{line}{i < text.split('\n').length - 1 && <br />}</span>
        ))}</Tag>;
    }

    const lines = text.split('\n');
    const container = {
        hidden: {},
        visible: { transition: { staggerChildren: stagger, delayChildren: delay } },
    };
    const item = {
        hidden: { y: '110%', opacity: 0, rotateX: -45 },
        visible: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: { duration, ease: [0.16, 1, 0.3, 1] },
        },
    };

    return (
        <motion.div
            className={className}
            initial="hidden"
            whileInView="visible"
            viewport={{ once, amount: 0.3 }}
            variants={container}
            style={{ perspective: 1000 }}
        >
            {lines.map((line, lineIdx) => {
                const tokens = splitBy === 'char' ? Array.from(line) : line.split(' ');
                return (
                    <Tag key={lineIdx} className="block overflow-hidden">
                        {tokens.map((tok, i) => (
                            <span
                                key={`${lineIdx}-${i}`}
                                className="inline-block overflow-hidden align-baseline"
                                style={{ paddingRight: splitBy === 'word' ? '0.25em' : 0 }}
                            >
                                <motion.span
                                    className="inline-block"
                                    variants={item}
                                    style={{ transformOrigin: 'bottom center' }}
                                >
                                    {tok === '' ? ' ' : tok}
                                </motion.span>
                            </span>
                        ))}
                    </Tag>
                );
            })}
        </motion.div>
    );
}
