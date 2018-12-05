import React, { Component } from 'react';
import './DevWizard.scss';
import axios from 'axios';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {updateName, updateTitle, updateOverview, updateHourlyRate, updatePortfolio, updateSkills, updateEducation} from '../../redux/reducer'

class DevOrClient extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            title: '',
            overview: '',
            hourly_rate: '',
            portfolio: '',
            skills: '',
            education: ''
        }
    }

    continue = (e)=>{
        e.preventDefault();
        const { name, title, overview, hourly_rate, portfolio, skills, education } = this.state;
        const { userID, updateName, updateTitle, updateOverview, updateHourlyRate, updatePortfolio, updateSkills, updateEducation} = this.props;
        axios.post('/api/createdevprofile', {userID, name, title, overview, hourly_rate, portfolio, skills, education})
        .then(() => {
            console.log('It worked')
            updateName(name)
            updateTitle(title)
            updateOverview(overview)
            updateHourlyRate(hourly_rate)
            updatePortfolio(portfolio)
            updateSkills(skills)
            updateEducation(education)
            return window.location.assign('/jobfeed')
        }).catch(error => {
            console.error('Error on Dev form submit', error)
        })
    }

    handleInputs = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    render() {
        console.log(this.state.name)
        return (
            <div className="devwizp">
                <form onSubmit={this.continue} className="devwizc">
                    <label>Name</label>
                    <input name="name" type="text" minLength='2' onChange={event => this.handleInputs(event)} required/>
                    <br/>
                    <label>Title</label>
                    <input name="title" type="text" minLength='2' onChange={event => this.handleInputs(event)} required/>
                    <br/>
                    <label>Overview</label>
                    <input name="overview" type="text" minLength='2' onChange={event => this.handleInputs(event)} required/>
                    <br/>
                    <label>Hourly rate</label>
                    <input name="hourly_rate" type="number" onChange={event => this.handleInputs(event)} required/>
                    <br/>
                    <label>Portfolio</label>
                    <input name="portfolio" type="text" minLength='2' onChange={event => this.handleInputs(event)} required/>
                    <br/>
                    <label>Skills</label>
                    <input name="skills" type="text" minLength='2' onChange={event => this.handleInputs(event)} required/>
                    <br/>
                    <label>Education</label>
                    <input name="education" type="text" minLength='2' onChange={event => this.handleInputs(event)} required/>
                    <br/>
                    <button type='submit'>Submit</button>
                </form>
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

export default withRouter(connect(mapStateToProps, {updateName, updateTitle, updateOverview, updateHourlyRate, updatePortfolio, updateSkills, updateEducation})(DevOrClient))