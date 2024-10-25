import React from 'react';
import './Footer.css';
import { Main } from '../../types/types';

interface FooterProps {
    data: Main;
}

const Footer: React.FC<FooterProps> = ({ data }) => {
    if (!data) return null;

    const networks = data.social.map((network) => (
        <li key={network.name}>
            <a href={network.url} target="_blank" rel="noopener noreferrer">
                <i className={network.className}></i>
            </a>
        </li>
    ));

    const year = new Date().getFullYear();

    return (
        <footer>
            <div className="row">
                <div className="twelve columns">
                    <ul className="social-links">{networks}</ul>
                    <ul className="copyright">
                        <li>&copy; Copyright {year} Amrutha Adiyath</li>
                    </ul>
                </div>
                <div id="go-top">
                    <a className="smoothscroll" title="Back to Top" href="#home">
                        <i className="fa fa-arrow-up"></i>
                    </a>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
