import { useEffect, useState } from 'react';
import { useReducedMotion } from 'framer-motion';

/**
 * TypewriterText — cycles through an array of phrases with a typing/erasing
 * effect. Used for rotating sublines in the hero.
 *
 * Props:
 *   phrases    — array of strings
 *   typeSpeed  — ms per char while typing (default 38)
 *   eraseSpeed — ms per char while erasing (default 24)
 *   pauseAfter — ms to hold once typed (default 1800)
 */
export default function TypewriterText({
    phrases = [],
    typeSpeed = 38,
    eraseSpeed = 24,
    pauseAfter = 1800,
    className = '',
    cursor = true,
}) {
    const reducedMotion = useReducedMotion();
    const [text, setText] = useState('');
    const [phraseIdx, setPhraseIdx] = useState(0);
    const [phase, setPhase] = useState('typing'); // typing | hold | erasing

    useEffect(() => {
        if (reducedMotion || phrases.length === 0) {
            setText(phrases[0] || '');
            return;
        }

        const phrase = phrases[phraseIdx];
        let timer;

        if (phase === 'typing') {
            if (text.length < phrase.length) {
                timer = setTimeout(() => setText(phrase.slice(0, text.length + 1)), typeSpeed);
            } else {
                timer = setTimeout(() => setPhase('erasing'), pauseAfter);
            }
        } else if (phase === 'erasing') {
            if (text.length > 0) {
                timer = setTimeout(() => setText(text.slice(0, -1)), eraseSpeed);
            } else {
                setPhraseIdx((i) => (i + 1) % phrases.length);
                setPhase('typing');
            }
        }

        return () => clearTimeout(timer);
    }, [text, phraseIdx, phase, phrases, typeSpeed, eraseSpeed, pauseAfter, reducedMotion]);

    return (
        <span className={className}>
            {text}
            {cursor && !reducedMotion && (
                <span className="inline-block w-[2px] h-[1em] align-middle ml-1 bg-primary-400 animate-typing-cursor" />
            )}
        </span>
    );
}
