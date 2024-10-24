import React from 'react';
import './Testimonials.css';

interface Testimonial {
  user: string;
  text: string;
}

interface TestimonialsProps {
  data: {
    testimonials: Testimonial[];
  };
}

const Testimonials: React.FC<TestimonialsProps> = ({ data }) => {
  if (!data) return null;

  const testimonials = data.testimonials.map((testimonial) => (
    <li key={testimonial.user}>
      <blockquote>
        <p>{testimonial.text}</p>
        <cite>{testimonial.user}</cite>
      </blockquote>
    </li>
  ));

  return (
    <section id="testimonials">
      <div className="text-container">
        <div className="row">
          <div className="two columns header-col">
            <h1>
              <span>Client Testimonials</span>
            </h1>
          </div>
          <div className="ten columns flex-container">
            <ul className="slides">{testimonials}</ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
