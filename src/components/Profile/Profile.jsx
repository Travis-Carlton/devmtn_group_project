import React, { Component } from "react";
import "./Profile.scss";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

class Profile extends Component {
  render() {
    console.log("profile ===>", this.props);
    const {
        loggedIn,
        isDeveloper,
        userID,
        name,
        title,
        overview,
        hourlyRate,
        portfolio,
        skills,
        education,
        profilePicture,
        devEmail,
        savedJobs
    } = this.props;
    console.log(this.props.profilePicture)
    return (
      <div className="profilep">
      {loggedIn ?
        <div className="profilec">
          <img src={profilePicture} alt="" />
          <h1>{name}</h1>
          <h2>{title}</h2>
          <h3>{devEmail}</h3>
          <p className="overview">{overview}</p>
          {isDeveloper ?
          <div className="dev-info">
            <div className="hourly-portfolio-parent">
              <div className="child">
                <p className="profile-category">Hourly rate: </p>
                <p>${hourlyRate}</p>
              </div>
              <div className="portfolio-child child">
                <p className="profile-category">Portfolio: </p>
                <p >{portfolio}</p>
              </div>
            </div> 
            <div className="skills-education-parent">
              <div className="child">
                <p className="profile-category">Skills: </p>
                <p >{skills}</p>
              </div>
              <div className="child">
                <p className="profile-category">Education: </p>
                <p >{education}</p>
              </div>
            </div>
          </div>
          :
          console.log('Not a developer')}
        </div>
        : <h1>Please log in</h1>
      }
      </div>
    );
  }
}

function mapStateToProps(state) {
  const {
    loggedIn,
    isDeveloper,
    userID,
    title,
    overview,
    hourlyRate,
    portfolio,
    skills,
    education,
    profilePicture,
    devEmail,
    savedJobs,
    name
  } = state;
  return {
    loggedIn,
    isDeveloper,
    userID,
    name,
    title,
    overview,
    hourlyRate,
    portfolio,
    skills,
    education,
    profilePicture,
    devEmail,
    savedJobs
  };
}

export default withRouter(connect(mapStateToProps)(Profile));
