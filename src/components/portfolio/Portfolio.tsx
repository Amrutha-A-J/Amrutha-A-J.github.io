import React from 'react';
import './Portfolio.css';
import { PortfolioData } from '../../types/types';
import Icon from '../icons/Icon';
import useInView from '../../hooks/useInView';

interface PortfolioProps {
    data: PortfolioData;
}

const Portfolio: React.FC<PortfolioProps> = ({ data }) => {
    const { ref: headRef, inView: headInView } = useInView<HTMLDivElement>();
    const { ref: gridRef, inView: gridInView } = useInView<HTMLDivElement>();

    if (!data) return null;

    return (
        <section id="portfolio">
            <div className="section-container">
                <div ref={headRef} className={`section-head reveal${headInView ? ' is-visible' : ''}`}>
                    <span className="section-kicker">03 / Selected Work</span>
                    <h2 className="section-title">
                        Things I&rsquo;ve <span>built</span>
                    </h2>
                </div>

                <div ref={gridRef} className={`portfolio-grid reveal-stagger${gridInView ? ' is-visible' : ''}`}>
                    {data.projects.map((project) => {
                        const projectImage = `assets/img/portfolio/${project.image}`;
                        const tech = project.technologies.split(',').map((t) => t.trim());

                        return (
                            <a
                                key={project.title}
                                className="portfolio-card glass-card"
                                href={project.url}
                                title={project.title}
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                <div className="portfolio-image">
                                    <img alt={project.title} src={projectImage} />
                                    <div className="portfolio-overlay">
                                        <span className="portfolio-overlay-link">
                                            View Project
                                            <Icon name="external-link" />
                                        </span>
                                    </div>
                                </div>
                                <div className="portfolio-body">
                                    <h4>{project.title}</h4>
                                    <p>{project.category}</p>
                                    <div className="tech-pills">
                                        {tech.map((t) => (
                                            <span key={t} className="chip">
                                                {t}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            </a>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
