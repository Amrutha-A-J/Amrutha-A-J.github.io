import React from 'react';
import './Personal.css';
import { Main } from '../../types/types';
import useInView from '../../hooks/useInView';

interface PersonalProps {
    data: Main;
}

const Personal: React.FC<PersonalProps> = ({ data }) => {
    const { ref, inView } = useInView<HTMLDivElement>();

    if (!data) return null;

    const { address } = data;

    return (
        <section id="personal">
            <div className="section-container">
                <div ref={ref} className={`reveal${inView ? ' is-visible' : ''}`}>
                    <div className="section-head">
                        <span className="section-kicker">04 / Beyond the Code</span>
                        <h2 className="section-title">
                            A little <span>about me</span>
                        </h2>
                    </div>

                    <div className="personal-body">
                        <p>
                            Before Saskatchewan, home was Thrissur, Kerala — a very different kind of green. These
                            days, when I&rsquo;m not writing code, I&rsquo;m usually fostering rescue cats with
                            SCRAPS Moose Jaw, or volunteering my tech skills for the Food Bank&rsquo;s community
                            programs. Home looks different than it used to, but the instinct to help and to build
                            hasn&rsquo;t changed.
                        </p>

                        <dl className="personal-facts">
                            <div>
                                <dt>Origin</dt>
                                <dd>Thrissur, Kerala</dd>
                            </div>
                            <div>
                                <dt>Home</dt>
                                <dd>
                                    {address.city}, {address.state}
                                </dd>
                            </div>
                            <div>
                                <dt>Off duty</dt>
                                <dd>Fostering rescue cats</dd>
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Personal;
