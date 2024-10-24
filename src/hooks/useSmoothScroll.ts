import React from 'react';

const useSmoothScroll = () => {
    const smoothScroll = (event: React.MouseEvent<HTMLElement>, targetId: string) => {
        event.preventDefault();
        const target = document.getElementById(targetId);
        if (target) {
            window.scrollTo({
                top: target.offsetTop,
                behavior: 'smooth',
            });
        }
    };

    return smoothScroll;
};

export default useSmoothScroll;
