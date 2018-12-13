import React, { Component } from 'react';
import './EditProfile.scss';
import axios from 'axios';

export default class EditProfile extends Component {
    constructor(props){
        super(props);
        this.state = {
            overview: props.overview,
            title: props.title,
            email: props.devEmail,
            hourlyRate: props.hourlyRate,
            portfolio: props.portfolio,
            skills: props.skills,
            education: props.education
        }
    }

    handleChange = (key,val)=>{
        this.setState({
            [key]:val
        })
    }

    updateProfile = (e)=>{
        e.preventDefault()
        const {userID} = this.props;
        const {overview,title,email,hourlyRate,portfolio,skills,education} = this.state;
        console.log(this.state)
        axios.put(`/api/updatedevprofile`,{userID,overview,title,email,hourlyRate,portfolio,skills,education})
        .then(res=>{
            res.data === 'success' && window.location.assign('/profile')
        })
    }

    render() {
        return (
            <form onSubmit={this.updateProfile} className='editprofileform'>
                <label>Overview</label>
                <input onChange={e=>this.handleChange('overview', e.target.value)} value={this.state.overview}  type="text"/>
                <br/>
                <label>Title</label>
                <input onChange={e=>this.handleChange('title', e.target.value)} value={this.state.title}  type="text"/>
                <br/>
                <label>Email</label>
                <input onChange={e=>this.handleChange('email', e.target.value)} value={this.state.email}  type="text"/>
                <br/>
                <label>Hourly Rate</label>
                <input onChange={e=>this.handleChange('hourlyRate', e.target.value)} value={this.state.hourlyRate}  type="number"/>
                <br/>
                <label>Portfolio</label>
                <input onChange={e=>this.handleChange('portfolio', e.target.value)} value={this.state.portfolio}  type="text"/>
                <br/>
                <label>Skills</label>
                <input onChange={e=>this.handleChange('skills', e.target.value)} value={this.state.skills}  type="text"/>
                <br/>
                <label>Education</label>
                <input onChange={e=>this.handleChange('education', e.target.value)} value={this.state.education}  type="text"/>
                <br/>
                <input type="submit"/>
            </form>
        );
    }
}