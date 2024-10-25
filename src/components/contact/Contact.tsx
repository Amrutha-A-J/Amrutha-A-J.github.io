import React from 'react';
import './Contact.css';
import { Main } from '../../types/types';

interface ContactProps {
    data: Main;
}

const Contact: React.FC<ContactProps> = ({ data }) => {
    if (!data) return null;

    const { phone, email, contactmessage } = data;

    return (
        <section id="contact" className="contact-section">
            <div className="row section-head">
                <div className="two columns header-col">
                    <h1><span>Get In Touch.</span></h1>
                </div>
                <div className="ten columns">
                    <p className="lead">{contactmessage}</p>
                    <p className="lead">{email}</p>
                    <p className="lead">{phone}</p>
                </div>
            </div>
        </section>
    );
};

export default Contact;
