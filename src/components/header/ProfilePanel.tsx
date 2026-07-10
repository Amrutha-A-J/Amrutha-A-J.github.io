import React from 'react';
import './ProfilePanel.css';
import { Skill } from '../../types/types';

interface ProfilePanelProps {
    image: string;
    name: string;
    occupation: string;
    city: string;
    state: string;
    experience: number;
    skills: Skill[];
}

const ProfilePanel: React.FC<ProfilePanelProps> = ({ image, name, occupation, city, state, experience, skills }) => {
    const topSkills = [...skills]
        .sort((a, b) => parseInt(b.level, 10) - parseInt(a.level, 10))
        .slice(0, 3)
        .map((skill) => skill.name)
        .join(' · ');

    return (
        <div className="profile-panel">
            <div className="profile-photo">
                <img src={`assets/img/${image}`} alt={`${name} portrait`} />
                <span className="profile-tag">Open to new opportunities</span>
            </div>

            <div className="profile-caption">
                <p className="profile-role">{occupation}</p>
                <p className="profile-meta">
                    {experience}+ years · {topSkills}
                </p>
                <p className="profile-meta">
                    {city}, {state}
                </p>
            </div>
        </div>
    );
};

export default ProfilePanel;
