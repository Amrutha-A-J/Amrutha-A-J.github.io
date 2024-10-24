import React from 'react';
import './About.css';

interface Address {
    street: string;
    city: string;
    state: string;
    zip: string;
}

interface AboutProps {
    data: {
        name: string;
        image: string;
        bio: string;
        bio_p: string;
        address: Address;
        phone: string;
        email: string;
        resumedownload: string;
    };
}

const About: React.FC<AboutProps> = ({ data }) => {
    const monthDiff = (dateFrom: Date, dateTo: Date): number => {
        return (
            (dateTo.getMonth() -
                dateFrom.getMonth() +
                12 * (dateTo.getFullYear() - dateFrom.getFullYear())) /
            12
        );
    };

    if (!data) return null;

    const { name, image, bio, bio_p, address, email, resumedownload } = data;
    const profilepic = `assets/img/${image}`;
    const age = new Date().getFullYear() - 1993;
    const experience = Math.round(monthDiff(new Date(2018, 3), new Date()));

    const formattedBio = bio
        .replace('{{AGE}}', age.toString())
        .replace('{{EXPERIENCE}}', experience.toString());
    const formattedBioP = bio_p
        .replace('{{AGE}}', age.toString())
        .replace('{{EXPERIENCE}}', experience.toString());

    const { street, city, state, zip } = address;

    return (
        <section id="about">
            <div className="row">
                <div className="three columns">
                    <img className="profile-pic" src={profilepic} alt={`${name} Profile Pic`} />
                </div>
                <div className="nine columns main-col">
                    <h2>About Me</h2>

                    <p>{formattedBio}</p>
                    <p>{formattedBioP}</p>
                    <div className="row">
                        <div className="columns contact-details">
                            <h2>Contact Details</h2>
                            <p className="address">
                                <span>{name}</span>
                                <br />
                                <span>
                                    {street}
                                    <br />
                                    {city}, {state} {zip}
                                </span>
                                <br />
                                <span>{email}</span>
                            </p>
                        </div>
                        <div className="columns download">
                            <p>
                                <a href={resumedownload} className="button" download>
                                    <i className="fa fa-download"></i> 
                                    Download Resume
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default About;
