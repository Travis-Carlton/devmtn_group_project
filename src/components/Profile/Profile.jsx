import React, { Component } from "react";
import "./Profile.scss";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import axios from "axios";

class Profile extends Component {
  constructor(){
    super();
    this.state = {
      jobData: []
    }
  }

  componentWillMount(){
    this.getJobsPosted()
  }

  getJobsPosted = () => {
    let userID = localStorage.getItem('userId')
    axios.get(`/api/getjobsposted/${userID}`).then(res => {
      this.setState({jobData: res.data})
    })
  }

  render() {
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


    let jobList = this.state.jobData.map(item => {
      return <div>
        {console.log(item)}
        <p>{item.title}</p>
        <Link to={`/job/${item.job_id}`}><button>View Job</button></Link>
        <button>View Applied</button>
      </div>
    })


    return (
      <div className="profilep">
      {loggedIn ?
        <div className="profilec">
          <img src={profilePicture} alt="" />
          <h1>{name}</h1>
          <p className="overview">{overview}</p>
          {isDeveloper ?
          <div className="dev-info">
          <h2>{title}</h2>
          <h3>{devEmail}</h3>
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
        
          { !isDeveloper ?
            <div>
              
              {jobList}

            </div>
            :
            <p>I am not a client</p>
          }
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
