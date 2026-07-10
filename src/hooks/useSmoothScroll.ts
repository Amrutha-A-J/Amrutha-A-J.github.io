import React from 'react';

const useSmoothScroll = () => {
    const smoothScroll = (event: React.MouseEvent<HTMLElement>, targetId: string) => {
        event.preventDefault();
        const target = document.getElementById(targetId);
        if (target) {
            const navHeight = document.getElementById('nav-wrap')?.offsetHeight ?? 0;
            const targetTop = target.getBoundingClientRect().top + window.scrollY;
            const top = Math.max(0, targetTop - navHeight - 20);

            window.scrollTo({
                top,
                behavior: 'smooth',
            });

            window.history.replaceState(null, '', `#${targetId}`);
        }
    };

    return smoothScroll;
};

export default useSmoothScroll;
