import React from 'react';
import './Portfolio.css';

interface Project {
    title: string;
    url: string;
    image: string;
    category: string;
}

interface PortfolioProps {
    data: {
        projects: Project[];
    };
}

const Portfolio: React.FC<PortfolioProps> = ({ data }) => {
    if (!data) return null;

    const projects = data.projects.map((project) => {
        const projectImage = `assets/img/portfolio/${project.image}`;
        return (
            <div key={project.title} className="portfolio-item">
                <div className="item-wrap">
                    <a href={project.url} title={project.title} target="_blank" rel="noopener noreferrer">
                        <img alt={project.title} src={projectImage} />
                        <div className="overlay">
                            <div className="portfolio-item-meta">
                                <h5>{project.title}</h5>
                                <p>{project.category}</p>
                            </div>
                        </div>
                        <div className="link-icon">
                            <i className="fa fa-link"></i>
                        </div>
                    </a>
                </div>
            </div>
        );
    });

    return (
        <section id="portfolio">
            <div className="portfolio-container">
                <h1>Check Out Some of My Works.</h1>
                <div id="portfolio-wrapper">
                    {projects}
                </div>
            </div>
        </section>
    );
};

export default Portfolio;
