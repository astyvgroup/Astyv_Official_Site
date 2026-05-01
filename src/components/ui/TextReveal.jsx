import { motion } from 'framer-motion';

export default function TextReveal({ text, className = '', tag = 'h1', charByChar = false, delay = 0 }) {
    const words = text.split(' ');
    const chars = text.split('');
    const Tag = tag;

    if (charByChar) {
        return (
            <Tag className={className}>
                {text.split('\n').map((line, li) => (
                    <span key={li} className="block">
                        {line.split('').map((char, ci) => (
                            <motion.span
                                key={`${li}-${ci}`}
                                initial={{ opacity: 0, y: 40 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: delay + (li * line.length + ci) * 0.03, duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
                                className="inline-block"
                                style={{ whiteSpace: char === ' ' ? 'pre' : 'normal' }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </span>
                ))}
            </Tag>
        );
    }

    return (
        <Tag className={className}>
            {text.split('\n').map((line, li) => (
                <span key={li} className="block overflow-hidden">
                    {line.split(' ').map((word, wi) => (
                        <motion.span
                            key={`${li}-${wi}`}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: delay + (li * 5 + wi) * 0.08, duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
                            className="inline-block mr-[0.3em]"
                        >
                            {word}
                        </motion.span>
                    ))}
                </span>
            ))}
        </Tag>
    );
}
