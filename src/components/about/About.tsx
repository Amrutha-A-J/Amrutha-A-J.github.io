import React from 'react';
import './About.css';
import { Main } from '../../types/types';
import Icon from '../icons/Icon';
import useInView from '../../hooks/useInView';
import useSmoothScroll from '../../hooks/useSmoothScroll';
import useMagnetic from '../../hooks/useMagnetic';

interface AboutProps {
    data: Main;
}

const monthDiff = (dateFrom: Date, dateTo: Date): number =>
    (dateTo.getMonth() - dateFrom.getMonth() + 12 * (dateTo.getFullYear() - dateFrom.getFullYear())) / 12;

const About: React.FC<AboutProps> = ({ data }) => {
    const { ref, inView } = useInView<HTMLDivElement>();
    const smoothScroll = useSmoothScroll();
    const magneticRef = useMagnetic<HTMLAnchorElement>();

    if (!data) return null;

    const { name, image, bio, bio_p, address, email, resumedownload } = data;
    const profilepic = `assets/img/${image}`;
    const experience = Math.round(monthDiff(new Date(2018, 3), new Date()));

    const formattedBio = bio.replace('{{EXPERIENCE}}', experience.toString());
    const formattedBioP = bio_p.replace('{{EXPERIENCE}}', experience.toString());

    const { city, state } = address;

    return (
        <section id="about">
            <div className="section-container">
                <div ref={ref} className={`reveal${inView ? ' is-visible' : ''}`}>
                    <div className="section-head">
                        <span className="section-kicker">01 / About Me</span>
                        <h2 className="section-title">
                            Get to know <span>me</span>
                        </h2>
                    </div>

                    <div className="about-grid">
                        <div className="about-media">
                            <div className="about-photo-ring">
                                <img className="profile-pic" src={profilepic} alt={`${name} profile`} />
                            </div>
                            <div className="about-badge">
                                <Icon name="briefcase" />
                                {experience}+ years experience
                            </div>
                        </div>

                        <div className="about-body">
                            <p>{formattedBio}</p>
                            <p>{formattedBioP}</p>

                            <div className="about-facts">
                                <span className="chip">
                                    <Icon name="map-pin" />
                                    {city}, {state}
                                </span>
                                <span className="chip">
                                    <Icon name="mail" />
                                    {email}
                                </span>
                            </div>

                            <div className="about-actions">
                                <a ref={magneticRef} className="btn btn-primary" href={resumedownload} download>
                                    <Icon name="download" />
                                    Download Résumé
                                </a>
                                <a
                                    className="btn btn-ghost"
                                    href="#contact"
                                    onClick={(e) => smoothScroll(e, 'contact')}
                                >
                                    Let&rsquo;s Talk
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
