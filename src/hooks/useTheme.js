import { useCallback, useEffect, useState } from 'react';

const STORAGE_KEY = 'astyv:theme';

// Shared state + subscribers so every component using useTheme stays in
// sync — calling toggle in one place re-renders consumers everywhere.
const listeners = new Set();
let currentTheme = readInitial();

function readInitial() {
    if (typeof document === 'undefined') return 'dark';
    if (document.documentElement.classList.contains('light')) return 'light';
    return 'dark';
}

function applyTheme(next) {
    const html = document.documentElement;
    html.classList.remove('dark', 'light');
    html.classList.add(next);
    try { localStorage.setItem(STORAGE_KEY, next); } catch (_) {}
    currentTheme = next;
    listeners.forEach((fn) => fn(next));
}

export default function useTheme() {
    const [theme, setThemeState] = useState(currentTheme);

    useEffect(() => {
        listeners.add(setThemeState);
        // Sync in case the global was updated before we mounted.
        if (theme !== currentTheme) setThemeState(currentTheme);
        return () => listeners.delete(setThemeState);
    }, [theme]);

    const setTheme = useCallback((next) => applyTheme(next), []);
    const toggle = useCallback(
        () => applyTheme(currentTheme === 'dark' ? 'light' : 'dark'),
        []
    );

    return { theme, toggle, setTheme };
}
