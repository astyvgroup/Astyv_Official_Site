import { motion } from 'framer-motion';

export default function TextReveal({ text, className = '', tag = 'h1', charByChar = false, delay = 0 }) {
    const Tag = tag;

    if (charByChar) {
        // Walk each line, split into words, then split each word into characters.
        // Each WORD is an inline-block so it stays atomic at line-break time —
        // prevents "Software" from breaking into "S" + "oftware".
        // Characters within the word remain individually animated.
        let globalIdx = 0;
        return (
            <Tag className={className}>
                {text.split('\n').map((line, li) => {
                    const words = line.split(' ');
                    return (
                        <span key={li} className="block">
                            {words.map((word, wi) => (
                                <span
                                    key={`${li}-w-${wi}`}
                                    className="inline-block whitespace-nowrap"
                                    style={{ marginRight: wi < words.length - 1 ? '0.28em' : 0 }}
                                >
                                    {Array.from(word).map((char, ci) => {
                                        const i = globalIdx++;
                                        return (
                                            <motion.span
                                                key={`${li}-${wi}-${ci}`}
                                                initial={{ opacity: 0, y: 40 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{
                                                    delay: delay + i * 0.03,
                                                    duration: 0.4,
                                                    ease: [0.4, 0, 0.2, 1],
                                                }}
                                                className="inline-block"
                                            >
                                                {char}
                                            </motion.span>
                                        );
                                    })}
                                </span>
                            ))}
                        </span>
                    );
                })}
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
                            className="inline-block mr-[0.3em] whitespace-nowrap"
                        >
                            {word}
                        </motion.span>
                    ))}
                </span>
            ))}
        </Tag>
    );
}
