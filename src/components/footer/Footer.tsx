import React from 'react';
import './Footer.css';
import { Main } from '../../types/types';
import Icon, { IconName } from '../icons/Icon';
import useSmoothScroll from '../../hooks/useSmoothScroll';
import useScrollNav from '../../hooks/useScrollNav';

interface FooterProps {
    data: Main;
}

const socialIcon: Record<string, IconName> = {
    facebook: 'facebook',
    linkedin: 'linkedin',
    instagram: 'instagram',
    github: 'github',
};

const Footer: React.FC<FooterProps> = ({ data }) => {
    const smoothScroll = useSmoothScroll();
    const { scrolled: showGoTop } = useScrollNav(500);

    if (!data) return null;

    const networks = data.social.map((network) => (
        <li key={network.name}>
            <a href={network.url} target="_blank" rel="noopener noreferrer" title={network.name}>
                <Icon name={socialIcon[network.name] ?? 'external-link'} />
            </a>
        </li>
    ));

    const year = new Date().getFullYear();

    return (
        <footer>
            <div className="section-container footer-inner">
                <p className="footer-copyright">
                    &copy; {year} {data.name}. Designed &amp; built in Moose Jaw, Saskatchewan.
                </p>
                <ul className="footer-social">{networks}</ul>
            </div>

            <a
                className={`go-top${showGoTop ? ' visible' : ''}`}
                title="Back to top"
                href="#home"
                onClick={(e) => smoothScroll(e, 'home')}
            >
                <Icon name="arrow-up" />
            </a>
        </footer>
    );
};

export default Footer;
