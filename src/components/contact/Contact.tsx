import React from 'react';
import './Contact.css';
import { Main } from '../../types/types';
import Icon from '../icons/Icon';
import useInView from '../../hooks/useInView';
import useMagnetic from '../../hooks/useMagnetic';

interface ContactProps {
    data: Main;
}

const Contact: React.FC<ContactProps> = ({ data }) => {
    const { ref, inView } = useInView<HTMLDivElement>();
    const magneticRef = useMagnetic<HTMLAnchorElement>();

    if (!data) return null;

    const { phone, email, contactmessage } = data;

    return (
        <section id="contact">
            <div className="section-container">
                <div ref={ref} className={`contact-panel glass-card reveal${inView ? ' is-visible' : ''}`}>
                    <span className="section-kicker">05 / Get In Touch</span>
                    <h2 className="section-title">
                        Let&rsquo;s build something <span>great</span> together
                    </h2>
                    <p className="contact-lead">{contactmessage}</p>

                    <div className="contact-links">
                        <a ref={magneticRef} className="btn btn-primary" href={`mailto:${email}`}>
                            <Icon name="mail" />
                            {email}
                        </a>
                        <a className="btn btn-ghost" href={`tel:${phone}`}>
                            <Icon name="phone" />
                            {phone}
                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
