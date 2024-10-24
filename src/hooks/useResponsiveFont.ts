import { useEffect } from 'react';

const useResponsiveFont = (selector: string, minFontSize: string, maxFontSize: string) => {
    useEffect(() => {
        const resizeHeadline = () => {
            const element = document.querySelector(selector) as HTMLElement;
            if (element) {
                const width = window.innerWidth;
                element.style.fontSize = width < 600 ? minFontSize : maxFontSize;
            }
        };

        resizeHeadline(); // Call it initially
        window.addEventListener('resize', resizeHeadline);

        return () => {
            window.removeEventListener('resize', resizeHeadline);
        };
    }, [selector, minFontSize, maxFontSize]);
};

export default useResponsiveFont;
