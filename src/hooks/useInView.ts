import { useEffect, useRef, useState } from 'react';

const useInView = <T extends HTMLElement>(threshold = 0.15) => {
    const ref = useRef<T | null>(null);
    const [inView, setInView] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true);
                    observer.disconnect();
                }
            },
            { threshold, rootMargin: '0px 0px -80px 0px' }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, [threshold]);

    return { ref, inView };
};

export default useInView;
