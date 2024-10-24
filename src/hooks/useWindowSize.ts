import { useEffect } from 'react';

const useWindowSize = (selector: string) => {
    useEffect(() => {
        const resizeHeader = () => {
            const element = document.querySelector(selector) as HTMLElement;
            if (element) {
                element.style.height = `${window.innerHeight}px`;
            }
        };

        resizeHeader(); // Initial resize
        window.addEventListener('resize', resizeHeader);

        return () => {
            window.removeEventListener('resize', resizeHeader);
        };
    }, [selector]);
};

export default useWindowSize;
