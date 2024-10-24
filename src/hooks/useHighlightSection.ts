import { useEffect } from 'react';

const useHighlightSection = (navSelector: string, sectionSelector: string) => {
    useEffect(() => {
        const highlightCurrentSection = () => {
            const sections = document.querySelectorAll(sectionSelector);
            const navLinks = document.querySelectorAll(`${navSelector} a`);

            sections.forEach(section => {
                const rect = section.getBoundingClientRect();
                if (rect.top >= 0 && rect.top < window.innerHeight) {
                    navLinks.forEach(link => link.parentElement?.classList.remove("current"));
                    const activeLink = document.querySelector(`${navSelector} a[href="#${section.id}"]`);
                    activeLink?.parentElement?.classList.add("current");
                }
            });
        };

        window.addEventListener('scroll', highlightCurrentSection);
        return () => {
            window.removeEventListener('scroll', highlightCurrentSection);
        };
    }, [navSelector, sectionSelector]);
};

export default useHighlightSection;
