import { useEffect, useState, useRef } from 'react';
import { motion } from 'framer-motion';

export default function StatCounter({ value, suffix = '', label, delay = 0 }) {
    const [count, setCount] = useState(0);
    const [started, setStarted] = useState(false);
    const ref = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !started) {
                    setStarted(true);
                }
            },
            { threshold: 0.5 }
        );
        if (ref.current) observer.observe(ref.current);
        return () => observer.disconnect();
    }, [started]);

    useEffect(() => {
        if (!started) return;
        let startTime;
        const duration = 2000;
        const startDelay = delay * 1000;

        const timer = setTimeout(() => {
            const animate = (timestamp) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / duration, 1);
                // Ease out cubic
                const eased = 1 - Math.pow(1 - progress, 3);
                setCount(Math.floor(eased * value));
                if (progress < 1) requestAnimationFrame(animate);
            };
            requestAnimationFrame(animate);
        }, startDelay);

        return () => clearTimeout(timer);
    }, [started, value, delay]);

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay }}
            className="text-center"
        >
            <div className="text-4xl md:text-5xl lg:text-6xl font-bold gradient-text mb-2">
                {count}{suffix}
            </div>
            <div className="text-sm text-zinc-500 uppercase tracking-wider">{label}</div>
        </motion.div>
    );
}
