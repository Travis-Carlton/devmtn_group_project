import React, { Component } from 'react';
import './DevWizard.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateName, updateTitle, updateOverview, 
    updateHourlyRate, updatePortfolio, updateSkills, 
    updateEducation, updateDevEmail, updateIsDeveloper} from '../../redux/reducer';

class DevOrClient extends Component {
    constructor() {
        super();
        this.state = {
            // name: '',
            title: '',
            email: '',
            overview: '',
            hourly_rate: '',
            portfolio: '',
            skills: '',
            education: ''
        }
    }

    continue = (e)=>{
        e.preventDefault();
        const { email, title, overview, hourly_rate, portfolio, skills, education } = this.state;
        const { userID, updateTitle, updateDevEmail, updateOverview, updateHourlyRate, updatePortfolio, updateSkills, updateEducation} = this.props;
        
        axios.post('/api/createdevprofile', {userID, title, email, overview, hourly_rate, portfolio, skills, education})
        .then(() => {
            console.log('It worked')
            // updateName(name)
            // this.setDeveloper(true,userID)
            updateTitle(title)
            updateDevEmail(email)
            updateOverview(overview)
            updateHourlyRate(hourly_rate)
            updatePortfolio(portfolio)
            updateSkills(skills)
            updateEducation(education)
            return window.location.assign('/feed')
        }).catch(error => {
            console.error('Error on Dev form submit', error)
        })
    }

 

    handleInputs = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        return (
            <div className="devwiz-container">
            <h1>Create Profile</h1>
            <div className="devwizp">
                <form onSubmit={this.continue} className="devwizc">
                    <label>Title:</label>
                    <input name="title" type="text" minLength='2' onChange={event => this.handleInputs(event)} required/>
                    <label>Email:</label>
                    <input name="email" type="email" minLength='2' onChange={event => this.handleInputs(event)} required/>
                    <label>Overview:</label>
                    <textarea name="overview" type="text" minLength='2' onChange={event => this.handleInputs(event)} required/>
                    <label>Hourly rate:</label>
                    <input name="hourly_rate" type="number" onChange={event => this.handleInputs(event)} required/>
                    <label>Portfolio:</label>
                    <input name="portfolio" type="text" onChange={event => this.handleInputs(event)} required/>
                    <label>Skills:</label>
                    <input name="skills" type="text" minLength='2' onChange={event => this.handleInputs(event)} required/>
                    <label>Education:</label>
                    <input name="education" type="text" minLength='2' onChange={event => this.handleInputs(event)} required/>
                    <br/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    const {loggedIn, userID} = state;
    return {
        loggedIn,
        userID
    }
}

export default withRouter(connect(mapStateToProps, 
    {updateName, updateTitle, updateDevEmail, updateOverview, 
        updateHourlyRate, updatePortfolio, updateSkills, updateEducation,
            updateIsDeveloper})(DevOrClient))