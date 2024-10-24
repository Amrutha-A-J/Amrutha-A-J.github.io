import { useEffect, useState } from 'react';

const useScrollNav = () => {
    const [navVisible, setNavVisible] = useState(true);
    const [opaque, setOpaque] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            const headerHeight = document.querySelector('header')?.clientHeight || 0;
            const scrollY = window.scrollY;

            if (scrollY > headerHeight * 0.2 && scrollY < headerHeight) {
                setNavVisible(false);
            } else {
                if (scrollY < headerHeight * 0.2) {
                    setOpaque(false);
                    setNavVisible(true);
                } else {
                    setOpaque(true);
                    setNavVisible(true);
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Clean up the event listener on unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return { navVisible, opaque };
};

export default useScrollNav;
