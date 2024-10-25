import React from 'react';
import './Resume.css';
import { ResumeData } from '../../types/types';

interface ResumeProps {
    data: ResumeData;
}

const Resume: React.FC<ResumeProps> = ({ data }) => {
    if (!data) return null;

    const { education, work, skills, volunteer, certifications, skillmessage } = data;

    // Calculate total years of experience since 2017
    const currentYear = new Date().getFullYear();
    const totalYearsExperience = currentYear - 2017;

    // Generate education items
    const educationItems = education.map((edu) => (
        <div key={edu.school}>
            <h3>{edu.school}</h3>
            <p className="info">
                {edu.degree}<br />
                {edu.graduated}
            </p>
            <p className="info">{edu.description}</p>
        </div>
    ));

    // Generate work items
    const workItems = work.map((job) => (
        <div key={job.company}>
            <h3>{job.company}</h3>
            <p className="info">
                {job.title}<br />
                {job.years}
            </p>
            <p className="info">{job.description}</p>
        </div>
    ));

    // Generate volunteer items
    const volunteerItems = volunteer.map((vol) => (
        <div key={vol.organization}>
            <h3>{vol.organization}</h3>
            <p className="info">
                {vol.role}<br />
                {vol.year}
            </p>
            <p className="info">{vol.description}</p>
        </div>
    ));

    // Generate certification items
    const certificationItems = certifications.map((cert) => (
        <div key={cert.name}>
            <h3>{cert.name}</h3>
            <p className="info">
                <em className="date">{cert.year}</em>
            </p>
            <p>{cert.description}</p>
        </div>
    ));

    // Calculate percentage for each skill based on years of experience
    const skillItems = skills.map((skill) => {
        const skillYears = parseInt(skill.level, 10);
        const skillPercentage = totalYearsExperience > 0 ? ((skillYears / totalYearsExperience) * 100).toFixed(2) : '0.00';

        const className = `bar-expand ${skill.name.toLowerCase()}`;
        return (
            <li key={skill.name}>
                <span style={{ width: `${skillPercentage}%` }} className={className}></span>
                <em>{skill.name} <span style={{ fontSize: '8px' }}>({skillYears} years)</span></em>
            </li>
        );
    });

    return (
        <section id="resume" className="resume-section">
            <div className="row education">
                <div className="three columns header-col">
                    <h1><span>Education</span></h1>
                </div>
                <div className="nine columns main-col">
                    <div className="education-items">
                        {educationItems}
                    </div>
                </div>
            </div>

            <div className="row work">
                <div className="three columns header-col">
                    <h1><span>Work</span></h1>
                </div>
                <div className="nine columns main-col">
                    {workItems}
                </div>
            </div>

            <div className="row skill">
                <div className="three columns header-col">
                    <h1><span>Skills</span></h1>
                </div>
                <div className="nine columns main-col">
                    <p>{skillmessage}</p>
                    <div className="bars">
                        <ul className="skills">
                            {skillItems}
                        </ul>
                    </div>
                </div>
            </div>

            <div className="row volunteer">
                <div className="three columns header-col">
                    <h1><span>Volunteering</span></h1>
                </div>
                <div className="nine columns main-col">
                    {volunteerItems}
                </div>
            </div>

            <div className="row certifications">
                <div className="three columns header-col">
                    <h1><span>Certifications</span></h1>
                </div>
                <div className="nine columns main-col">
                    {certificationItems}
                </div>
            </div>
        </section>
    );
};

export default Resume;
