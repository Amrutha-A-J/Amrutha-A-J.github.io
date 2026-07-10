import React, { useState } from 'react';
import useSmoothScroll from '../../hooks/useSmoothScroll';
import useHighlightSection from '../../hooks/useHighlightSection';
import useScrollNav from '../../hooks/useScrollNav';
import useTheme from '../../hooks/useTheme';
import useMagnetic from '../../hooks/useMagnetic';
import Icon, { IconName } from '../icons/Icon';
import './Header.css';
import { Main } from '../../types/types';

interface HeaderProps {
    data: Main;
}

const socialIcon: Record<string, IconName> = {
    facebook: 'facebook',
    linkedin: 'linkedin',
    instagram: 'instagram',
    github: 'github',
};

const navItems = [
    { id: 'about', label: 'About' },
    { id: 'resume', label: 'Resume' },
    { id: 'portfolio', label: 'Portfolio' },
    { id: 'contact', label: 'Contact' },
];

const monthDiff = (dateFrom: Date, dateTo: Date): number =>
    (dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear())) / 12;

const Header: React.FC<HeaderProps> = ({ data }) => {
    const smoothScroll = useSmoothScroll();
    const { scrolled } = useScrollNav();
    const { theme, toggleTheme } = useTheme();
    const [menuOpen, setMenuOpen] = useState(false);
    const magneticRef = useMagnetic<HTMLAnchorElement>();

    useHighlightSection('#nav-wrap', 'section');

    if (!data) return null;

    const { name, occupation, description, address, resumedownload } = data;
    const experience = Math.round(monthDiff(new Date(2018, 3), new Date()));
    const formattedDescription = description.replace('{{EXPERIENCE}}', experience.toString());
    const { state } = address;
    const firstName = name.split(' ')[0];

    const handleNavClick = (e: React.MouseEvent<HTMLElement>, id: string) => {
        smoothScroll(e, id);
        setMenuOpen(false);
    };

    const networks = data.social.map((network) => (
        <li key={network.name}>
            <a href={network.url} target="_blank" rel="noopener noreferrer" title={network.name}>
                <Icon name={socialIcon[network.name] ?? 'external-link'} />
            </a>
        </li>
    ));

    return (
        <>
            <nav id="nav-wrap" className={scrolled ? 'scrolled' : ''}>
                <div className="nav-inner">
                    <a
                        className="logo"
                        href="#home"
                        onClick={(e) => handleNavClick(e, 'home')}
                        aria-label="Back to top"
                    >
                        {firstName}
                        <span className="logo-dot">.</span>
                    </a>

                    <ul id="nav" className={`nav-links${menuOpen ? ' open' : ''}`}>
                        {navItems.map((item, index) => (
                            <li key={item.id} className={index === 0 ? 'current' : ''}>
                                <a
                                    href={`#${item.id}`}
                                    className="smoothscroll"
                                    onClick={(e) => handleNavClick(e, item.id)}
                                >
                                    {item.label}
                                </a>
                            </li>
                        ))}
                        <li className="nav-resume-mobile">
                            <a href={resumedownload} download onClick={() => setMenuOpen(false)}>
                                <Icon name="download" />
                                Download Résumé
                            </a>
                        </li>
                    </ul>

                    <div className="nav-actions">
                        <button
                            className="theme-toggle"
                            onClick={toggleTheme}
                            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
                        >
                            <Icon name={theme === 'dark' ? 'sun' : 'moon'} />
                        </button>

                        <a className="btn btn-primary nav-resume" href={resumedownload} download>
                            <Icon name="download" />
                            Resume
                        </a>

                        <button
                            className="nav-toggle"
                            onClick={() => setMenuOpen((open) => !open)}
                            aria-label="Toggle navigation"
                            aria-expanded={menuOpen}
                        >
                            <Icon name={menuOpen ? 'close' : 'menu'} />
                        </button>
                    </div>
                </div>
            </nav>

            <header id="home">
            <div className="hero">
                <div className="hero-blob hero-blob-1" aria-hidden="true" />
                <div className="hero-blob hero-blob-2" aria-hidden="true" />

                <div className="hero-content">
                    <p className="hero-kicker">Hi, I&rsquo;m</p>
                    <h1 className="hero-name">{name}</h1>
                    <p className="hero-role">
                        <span>{occupation}</span>
                        <span className="cursor" aria-hidden="true" />
                    </p>
                    <p className="hero-desc">
                        {formattedDescription}. Based in {state}.
                    </p>

                    <div className="hero-actions">
                        <a
                            ref={magneticRef}
                            className="btn btn-primary"
                            href="#portfolio"
                            onClick={(e) => handleNavClick(e, 'portfolio')}
                        >
                            View My Work
                            <Icon name="arrow-right" />
                        </a>
                        <a className="btn btn-ghost" href="#contact" onClick={(e) => handleNavClick(e, 'contact')}>
                            Get In Touch
                        </a>
                    </div>

                    <ul className="hero-social">{networks}</ul>
                </div>
            </div>

            <a className="scroll-cue" href="#about" onClick={(e) => handleNavClick(e, 'about')}>
                <Icon name="chevron-down" />
            </a>
            </header>
        </>
    );
};

export default Header;
