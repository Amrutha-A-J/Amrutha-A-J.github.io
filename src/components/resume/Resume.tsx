import React from 'react';
import './Resume.css';

interface Education {
    school: string;
    degree: string;
    graduated: string;
    description: string;
}

interface Work {
    company: string;
    title: string;
    years: string;
    description: string;
}

interface Skills {
    name: string;
    level: string;
}

interface ResumeProps {
    data: {
        skillmessage: string;
        education: Education[];
        work: Work[];
        skills: Skills[];
    };
}

const Resume: React.FC<ResumeProps> = ({ data }) => {
    if (!data) return null;

    const { skillmessage, education, work, skills } = data;

    const educationItems = education.map((edu) => (
        <div key={edu.school}>
            <h3>{edu.school}</h3>
            <p className="info">
                {edu.degree} <span>&bull;</span> <em className="date">{edu.graduated}</em>
            </p>
            <p>{edu.description}</p>
        </div>
    ));

    const workItems = work.map((job) => (
        <div key={job.company}>
            <h3>{job.company}</h3>
            <p className="info">
                {job.title} <span>&bull;</span> <em className="date">{job.years}</em>
            </p>
            <p>{job.description}</p>
        </div>
    ));

    const skillItems = skills.map((skill) => {
        const className = `bar-expand ${skill.name.toLowerCase()}`;
        return (
            <li key={skill.name}>
                <span style={{ width: skill.level }} className={className}></span>
                <em>{skill.name}</em>
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
        </section>
    );
};

export default Resume;
