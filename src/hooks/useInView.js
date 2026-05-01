import { useState, useEffect, useRef } from 'react';

export default function useInView(options = {}) {
    const ref = useRef(null);
    const [isInView, setIsInView] = useState(false);
    const { threshold = 0.2, once = true } = options;

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setIsInView(true);
                    if (once) observer.unobserve(element);
                } else if (!once) {
                    setIsInView(false);
                }
            },
            { threshold }
        );

        observer.observe(element);
        return () => observer.disconnect();
    }, [threshold, once]);

    return [ref, isInView];
}
