import React, { Component } from 'react';

class About extends Component {
  render() {
    function monthDiff(dateFrom, dateTo) {
      return (
        (dateTo.getMonth() -
          dateFrom.getMonth() +
          12 * (dateTo.getFullYear() - dateFrom.getFullYear())) /
        12
      );
    }

    if (this.props.data) {
      var name = this.props.data.name;
      var profilepic = 'images/' + this.props.data.image;
      var bio = this.props.data.bio;
      bio = bio
        .replace('{{AGE}}', new Date().getFullYear() - 1993)
        .replace(
          '{{EXPERIENCE}}',
          Math.round(monthDiff(new Date(2018, 3), new Date())),
        );
      var bio_p = this.props.data.bio_p;
      bio_p = bio_p
        .replace('{{AGE}}', new Date().getFullYear() - 1993)
        .replace(
          '{{EXPERIENCE}}',
          Math.round(monthDiff(new Date(2018, 3), new Date())),
        );
      var street = this.props.data.address.street;
      var city = this.props.data.address.city;
      var state = this.props.data.address.state;
      var zip = this.props.data.address.zip;
      var phone = this.props.data.phone;
      var email = this.props.data.email;
      var resumeDownload = this.props.data.resumedownload;
    }

    return (
      <section id="about">
        <div className="row">
          <div className="three columns">
            <img
              className="profile-pic"
              src={profilepic}
              alt="Amrutha AJ Profile Pic"
            />
          </div>
          <div className="nine columns main-col">
            <h2>About Me</h2>

            <p>{bio}</p>
            <p>{bio_p}</p>
            <div className="row">
              <div className="columns contact-details">
                <h2>Contact Details</h2>
                <p className="address">
                  <span>{name}</span>
                  <br />
                  <span>
                    {street}
                    <br />
                    {city} {state}, {zip}
                  </span>
                  <br />
                  <span>{email}</span>
                </p>
              </div>
              <div className="columns download">
                <p>
                  <a href={resumeDownload} className="button" download>
                    <i className="fa fa-download"></i>Download Resume
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }
}

export default About;
