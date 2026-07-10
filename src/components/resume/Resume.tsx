import React from 'react';
import './Resume.css';
import { ResumeData, Skill } from '../../types/types';
import Icon from '../icons/Icon';
import useInView from '../../hooks/useInView';

interface ResumeProps {
    data: ResumeData;
}

const RevealGroup: React.FC<{ className: string; children: React.ReactNode }> = ({ className, children }) => {
    const { ref, inView } = useInView<HTMLDivElement>();
    return (
        <div ref={ref} className={`${className} reveal-stagger${inView ? ' is-visible' : ''}`}>
            {children}
        </div>
    );
};

const skillTier = (rating: number): string => {
    if (rating >= 9) return 'Expert';
    if (rating >= 7) return 'Advanced';
    if (rating >= 5) return 'Proficient';
    return 'Familiar';
};

const SkillsGrid: React.FC<{ skills: Skill[] }> = ({ skills }) => {
    const { ref, inView } = useInView<HTMLDivElement>();
    return (
        <div ref={ref} className={`skills-grid reveal-stagger${inView ? ' is-visible' : ''}`}>
            {skills.map((skill) => {
                const rating = parseInt(skill.level, 10);
                const pct = Math.min(100, (rating / 10) * 100);
                return (
                    <div key={skill.name} className="skill-card">
                        <div className="skill-card-head">
                            <span className="skill-name">{skill.name}</span>
                            <span className="skill-tier">{skillTier(rating)}</span>
                        </div>
                        <div className="skill-track">
                            <span className="skill-fill" style={{ width: inView ? `${pct}%` : '0%' }} />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

const Resume: React.FC<ResumeProps> = ({ data }) => {
    const { ref: headRef, inView: headInView } = useInView<HTMLDivElement>();

    if (!data) return null;

    const { education, work, skills, volunteer, certifications, skillmessage } = data;

    return (
        <section id="resume">
            <div className="section-container">
                <div ref={headRef} className={`section-head reveal${headInView ? ' is-visible' : ''}`}>
                    <span className="section-kicker">02 / Experience</span>
                    <h2 className="section-title">
                        My journey <span>so far</span>
                    </h2>
                </div>

                <div className="resume-block">
                    <h3 className="block-title">
                        <Icon name="briefcase" />
                        Work Experience
                    </h3>
                    <RevealGroup className="timeline">
                        {work.map((job) => (
                            <div key={job.company} className="timeline-item">
                                <span className="timeline-dot" />
                                <div className="timeline-content glass-card">
                                    <span className="timeline-date">{job.years}</span>
                                    <h4>{job.title}</h4>
                                    <p className="timeline-org">{job.company}</p>
                                    <p className="timeline-desc">{job.description}</p>
                                </div>
                            </div>
                        ))}
                    </RevealGroup>
                </div>

                <div className="resume-block">
                    <h3 className="block-title">
                        <Icon name="graduation-cap" />
                        Education
                    </h3>
                    <RevealGroup className="timeline">
                        {education.map((edu) => (
                            <div key={edu.school} className="timeline-item">
                                <span className="timeline-dot" />
                                <div className="timeline-content glass-card">
                                    <span className="timeline-date">{edu.graduated}</span>
                                    <h4>{edu.degree}</h4>
                                    <p className="timeline-org">{edu.school}</p>
                                    <p className="timeline-desc">{edu.description}</p>
                                </div>
                            </div>
                        ))}
                    </RevealGroup>
                </div>

                <div className="resume-block">
                    <h3 className="block-title">
                        <Icon name="badge" />
                        Skills
                    </h3>
                    <p className="block-lead">{skillmessage}</p>
                    <SkillsGrid skills={skills} />
                </div>

                <div className="resume-block">
                    <h3 className="block-title">
                        <Icon name="heart" />
                        Volunteering
                    </h3>
                    <RevealGroup className="card-grid">
                        {volunteer.map((vol) => (
                            <div key={vol.organization} className="info-card glass-card">
                                <span className="timeline-date">{vol.year}</span>
                                <h4>{vol.role}</h4>
                                <p className="timeline-org">{vol.organization}</p>
                                <p className="timeline-desc">{vol.description}</p>
                            </div>
                        ))}
                    </RevealGroup>
                </div>

                <div className="resume-block">
                    <h3 className="block-title">
                        <Icon name="badge" />
                        Certifications
                    </h3>
                    <RevealGroup className="card-grid">
                        {certifications.map((cert) => (
                            <div key={cert.name} className="info-card glass-card">
                                <span className="timeline-date">{cert.year}</span>
                                <h4>{cert.name}</h4>
                                <p className="timeline-desc">{cert.description}</p>
                            </div>
                        ))}
                    </RevealGroup>
                </div>
            </div>
        </section>
    );
};

export default Resume;
