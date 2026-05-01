import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'astyv:theme';

function readInitial() {
    if (typeof document === 'undefined') return 'dark';
    if (document.documentElement.classList.contains('light')) return 'light';
    return 'dark';
}

export default function useTheme() {
    const [theme, setThemeState] = useState(readInitial);

    const apply = useCallback((next) => {
        const html = document.documentElement;
        html.classList.remove('dark', 'light');
        html.classList.add(next);
        try { localStorage.setItem(STORAGE_KEY, next); } catch (_) {}
        setThemeState(next);
    }, []);

    const toggle = useCallback(() => {
        apply(theme === 'dark' ? 'light' : 'dark');
    }, [theme, apply]);

    useEffect(() => {
        if (typeof window === 'undefined' || !window.matchMedia) return;
        const mq = window.matchMedia('(prefers-color-scheme: light)');
        const handler = (e) => {
            try {
                if (localStorage.getItem(STORAGE_KEY)) return;
            } catch (_) {}
            apply(e.matches ? 'light' : 'dark');
        };
        mq.addEventListener?.('change', handler);
        return () => mq.removeEventListener?.('change', handler);
    }, [apply]);

    return { theme, toggle, setTheme: apply };
}
