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

    return (
      <div className="profilep">
        <div className="profilec">
          <img src={profilePicture} alt="" />
          <h1>{name}</h1>
          <h2>{title}</h2>
          <h3>{devEmail}</h3>
          <p>{overview}</p>
          <p>${hourlyRate}</p>
          <p>{portfolio}</p>
          <p>{skills}</p>
          <p>{education}</p>
        </div>
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
