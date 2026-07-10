import { useEffect, useRef } from 'react';

const useMagnetic = <T extends HTMLElement>(strength = 0.25) => {
    const ref = useRef<T | null>(null);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        node.style.transition = 'transform 0.2s cubic-bezier(0.16, 1, 0.3, 1)';

        const handleMouseMove = (e: MouseEvent) => {
            const rect = node.getBoundingClientRect();
            const x = e.clientX - (rect.left + rect.width / 2);
            const y = e.clientY - (rect.top + rect.height / 2);
            node.style.transform = `translate(${x * strength}px, ${y * strength}px)`;
        };

        const handleMouseLeave = () => {
            node.style.transform = '';
        };

        node.addEventListener('mousemove', handleMouseMove);
        node.addEventListener('mouseleave', handleMouseLeave);
        return () => {
            node.removeEventListener('mousemove', handleMouseMove);
            node.removeEventListener('mouseleave', handleMouseLeave);
        };
    }, [strength]);

    return ref;
};

export default useMagnetic;
