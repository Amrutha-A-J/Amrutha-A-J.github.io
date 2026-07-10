import { useEffect, useState } from 'react';

export type Theme = 'light' | 'dark';

const getInitialTheme = (): Theme => {
    try {
        const savedTheme = localStorage.getItem('theme');
        if (savedTheme === 'light' || savedTheme === 'dark') {
            return savedTheme;
        }
    } catch {
        /* localStorage unavailable (e.g. private browsing) */
    }

    if (window.matchMedia?.('(prefers-color-scheme: light)').matches) {
        return 'light';
    }

    return document.documentElement.dataset.theme === 'light' ? 'light' : 'dark';
};

const useTheme = () => {
    const [theme, setTheme] = useState<Theme>(getInitialTheme);

    useEffect(() => {
        document.documentElement.dataset.theme = theme;
        document.documentElement.style.colorScheme = theme;
        try {
            localStorage.setItem('theme', theme);
        } catch {
            /* localStorage unavailable (e.g. private browsing) */
        }
    }, [theme]);

    const toggleTheme = () => setTheme((current) => (current === 'dark' ? 'light' : 'dark'));

    return { theme, toggleTheme };
};

export default useTheme;
