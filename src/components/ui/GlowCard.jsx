import { useRef, useState } from 'react';
import { motion } from 'framer-motion';

export default function GlowCard({ children, className = '' }) {
    const cardRef = useRef(null);
    const [glowPos, setGlowPos] = useState({ x: 50, y: 50 });

    const handleMouseMove = (e) => {
        const rect = cardRef.current?.getBoundingClientRect();
        if (!rect) return;
        setGlowPos({
            x: ((e.clientX - rect.left) / rect.width) * 100,
            y: ((e.clientY - rect.top) / rect.height) * 100,
        });
    };

    return (
        <motion.div
            ref={cardRef}
            onMouseMove={handleMouseMove}
            whileHover={{ y: -8 }}
            transition={{ duration: 0.3 }}
            className={`relative overflow-hidden rounded-xl border border-white/[0.06] bg-dark-secondary p-6 lg:p-8 group ${className}`}
            style={{
                background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(124,58,237,0.08) 0%, transparent 50%), #111111`,
            }}
        >
            {/* Hover border glow */}
            <div
                className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                style={{
                    background: `radial-gradient(circle at ${glowPos.x}% ${glowPos.y}%, rgba(124,58,237,0.2) 0%, transparent 70%)`,
                }}
            />
            <div className="relative z-10">{children}</div>
        </motion.div>
    );
}
