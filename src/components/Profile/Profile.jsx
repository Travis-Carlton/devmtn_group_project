import React, { Component } from 'react';
import './Profile.scss';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';

class Profile extends Component {
    render() {
        const {loggedIn,isDeveloper,userID,title,
                overview,hourlyRate,portfolio,skills,
                education,profilePicture,email,savedJobs} = this.props;


        return (
            <div className="profilep">
                <div className="profilec">
                    <img src={profilePicture} alt=""/>
                    <h1>{title}</h1>
                    <p>{overview}</p>
                    <p>${hourlyRate}</p>
                    <p>{portfolio}</p>
                    <p>{skills}</p>
                    <p>{education}</p>
                    <p>{email}</p>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    const {loggedIn,isDeveloper,userID,title,
        overview,hourlyRate,portfolio,skills,
        education,profilePicture,email,savedJobs} = state;
    return {
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
        email,
        savedJobs
    }
}

export default withRouter(connect(mapStateToProps)(Profile));