import { useState, useEffect } from 'react';

export default function useScrollProgress() {
    const [progress, setProgress] = useState(0);
    const [scrollY, setScrollY] = useState(0);
    const [direction, setDirection] = useState('up');

    useEffect(() => {
        let lastY = window.scrollY;
        const handleScroll = () => {
            const currentY = window.scrollY;
            const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(totalHeight > 0 ? currentY / totalHeight : 0);
            setScrollY(currentY);
            setDirection(currentY > lastY ? 'down' : 'up');
            lastY = currentY;
        };
        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return { progress, scrollY, direction };
}
