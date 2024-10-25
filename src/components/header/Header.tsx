import React from 'react';
import useResponsiveFont from '../../hooks/useResponsiveFont';
import useSmoothScroll from '../../hooks/useSmoothScroll';
import useHighlightSection from '../../hooks/useHighlightSection';
import useWindowSize from '../../hooks/useWindowSize';
import useScrollNav from '../../hooks/useScrollNav';
import './header.css';
import { Main } from '../../types/types';

interface HeaderProps {
    data: Main;
}

const Header: React.FC<HeaderProps> = ({ data }) => {
    const smoothScroll = useSmoothScroll();
    const { navVisible, opaque } = useScrollNav();
    const monthDiff = (dateFrom: Date, dateTo: Date): number => {
        return (
            (dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear())) /
            12
        );
    };

    useResponsiveFont('.responsive-headline', '40px', '90px');
    useWindowSize('header');
    useHighlightSection('#nav-wrap', 'section');

    if (!data) return null;

    const { name, occupation, description, address } = data;
    const age = new Date().getFullYear() - 1993;
    const experience = Math.round(monthDiff(new Date(2018, 3), new Date()));

    const formattedDescription = description
        .replace('{{AGE}}', age.toString())
        .replace('{{EXPERIENCE}}', experience.toString());

    const state = address.state;
    const networks = data.social.map((network) => (
        <li key={network.name}>
            <a href={network.url}>
                <i className={network.className}></i>
            </a>
        </li>
    ));

    return (
        <header id="home">
            <nav id="nav-wrap" className={opaque ? 'opaque' : ''} style={{ display: navVisible ? 'block' : 'none' }}>
                <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
                    Show navigation
                </a>
                <a className="mobile-btn" href="#home" title="Hide navigation">
                    Hide navigation
                </a>

                <ul id="nav" className="nav">
                    <li className="current">
                        <a href="#home" className="smoothscroll" onClick={(e) => smoothScroll(e, 'home')}>
                            Home
                        </a>
                    </li>
                    <li>
                        <a href="#about" className="smoothscroll" onClick={(e) => smoothScroll(e, 'about')}>
                            About
                        </a>
                    </li>
                    <li>
                        <a className="smoothscroll" href="#resume" onClick={(e) => smoothScroll(e, 'resume')}>
                            Resume
                        </a>
                    </li>
                    <li>
                        <a className="smoothscroll" href="#portfolio" onClick={(e) => smoothScroll(e, 'portfolio')}>
                            Works
                        </a>
                    </li>
                    <li>
                        <a className="smoothscroll" href="#contact" onClick={(e) => smoothScroll(e, 'contact')}>
                            Contact
                        </a>
                    </li>
                </ul>
            </nav>

            <div className="row banner">
                <div className="banner-text">
                    <h1 className="responsive-headline">I'm {name}.</h1>
                    <h3>
                        I'm a {state} based <span>{occupation}</span>. {formattedDescription}.
                    </h3>
                    <hr />
                    <ul className="social">{networks}</ul>
                </div>
            </div>

            <p className="scrolldown">
                <a href="#about" className="smoothscroll" onClick={(e) => smoothScroll(e, 'about')}>
                    <i className="icon-down-circle"></i>
                </a>
            </p>
        </header>
    );
};

export default Header;
