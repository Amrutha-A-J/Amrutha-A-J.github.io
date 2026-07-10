import { useEffect } from 'react';

const useHighlightSection = (navSelector: string, sectionSelector: string) => {
    useEffect(() => {
        let currentId: string | null = null;

        const highlightCurrentSection = () => {
            const sections = document.querySelectorAll<HTMLElement>(sectionSelector);
            let activeId: string | null = null;
            const navHeight = document.getElementById('nav-wrap')?.offsetHeight ?? 0;
            const scrollPosition = window.scrollY + navHeight + window.innerHeight * 0.25;

            sections.forEach((section) => {
                if (section.offsetTop <= scrollPosition) {
                    activeId = section.id;
                }
            });

            if (!activeId || activeId === currentId) return;
            currentId = activeId;

            const applyHighlight = () => {
                const navLinks = document.querySelectorAll(`${navSelector} a`);
                navLinks.forEach((link) => link.parentElement?.classList.remove('current'));
                const activeLink = document.querySelector(`${navSelector} a[href="#${activeId}"]`);
                activeLink?.parentElement?.classList.add('current');
            };

            applyHighlight();
        };

        window.addEventListener('scroll', highlightCurrentSection);
        highlightCurrentSection();
        return () => {
            window.removeEventListener('scroll', highlightCurrentSection);
        };
    }, [navSelector, sectionSelector]);
};

export default useHighlightSection;
