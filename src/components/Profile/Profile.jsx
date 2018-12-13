import React, { Component } from "react";
import "./Profile.scss";
import { connect } from "react-redux";
import { withRouter, Link } from "react-router-dom";
import { updateProfilePicture } from '../../redux/reducer';
import axios from "axios";

class Profile extends Component {
  constructor(){
    super();
    this.state = {
      jobData: [],
      image: ''
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

  uploadWidget = () => {
    window.cloudinary.openUploadWidget({
        cloud_name: 'dtjiplvkp',
        upload_preset: 'amedwnem',
        tags:['devway'],
        theme: 'minimal',
        autoMinimize: true,
        multiple: false,
        thumbnailTransformation: [{ width: 5, height: 100, crop: 'fit' }],
        styles: {
            width: "100%"
        }
        },
        (error, result) => {
            const userID = localStorage.getItem('userId')
            console.log(result.info.url)
            console.log(userID)
            this.props.updateProfilePicture(result.info.url)
            axios.post('/api/uploadprofilepicture', {profile_picture: result.info.url, user_id: userID})
        });
}

  render() {
    const {
        loggedIn,
        isDeveloper,
        // userID,
        name,
        title,
        overview,
        hourlyRate,
        portfolio,
        skills,
        education,
        profilePicture,
        devEmail
    } = this.props;


    let jobList = this.state.jobData.map(item => {
      return <div className="client-job-card">
        {console.log(item)}
        <h2>{item.title}</h2>
        <div>
          <Link to={`/job/${item.job_id}`}><button>View Job</button></Link>
          <Link to={`/applied/${item.job_id}`}><button>View Applied</button></Link>
        </div>
      </div>
    })


    return (
      <div className="profilep">
      {loggedIn ?
        <div className="profilec">
          <img src={profilePicture} alt="" />
          <button onClick={() => this.uploadWidget()} className="upload-button">Upload Picture</button>
          {console.log('this.state.image-=-=-=-=->', this.state.image)}
          <h1>{name}</h1>
          {isDeveloper ?
          <div className="dev-info">
          <h2>{title}</h2>
          <h3>{devEmail}</h3>
          <p className="overview">{overview}</p>
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

export default withRouter(connect(mapStateToProps, {updateProfilePicture})(Profile));
