import React from 'react';
import './header.css';

interface SocialNetwork {
    name: string;
    url: string;
    className: string;
}

interface HeaderProps {
    data: {
        name: string;
        occupation: string;
        description: string;
        address: {
            state: string;
        };
        social: SocialNetwork[];
    };
}

const Header: React.FC<HeaderProps> = ({ data }) => {
    const monthDiff = (dateFrom: Date, dateTo: Date): number => {
        return (
            (dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear())) /
            12
        );
    };

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
            <nav id="nav-wrap">
                <a className="mobile-btn" href="#nav-wrap" title="Show navigation">
                    Show navigation
                </a>
                <a className="mobile-btn" href="#home" title="Hide navigation">
                    Hide navigation
                </a>

                <ul id="nav" className="nav">
                    <li className="current">
                        <a className="smoothscroll" href="#home">
                            Home
                        </a>
                    </li>
                    <li>
                        <a className="smoothscroll" href="#about">
                            About
                        </a>
                    </li>
                    <li>
                        <a className="smoothscroll" href="#resume">
                            Resume
                        </a>
                    </li>
                    <li>
                        <a className="smoothscroll" href="#portfolio">
                            Works
                        </a>
                    </li>
                    <li>
                        <a className="smoothscroll" href="#contact">
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
                <a className="smoothscroll" href="#about">
                    <i className="icon-down-circle"></i>
                </a>
            </p>
        </header>
    );
};

export default Header;
