import React, { Component } from 'react';
import axios from 'axios';
import './JobForm.scss';

class JobForm extends Component {
    constructor(){
        super();
        this.state = {
            title: null,
            description: null,
            startDate: null,
            estimatedTime: null,
            pay: null,
            email: null
        }
    }
    handleSubmit = (e) => {
        e.preventDefault();
        const id = localStorage.getItem('userId')
        const title = this.state.title;
        const description = this.state.description;
        const startDate = this.state.startDate;
        const estimatedTime = this.state.estimatedTime;
        const pay = this.state.pay;
        const email = this.state.email;
        axios.post('/api/createjob', {
            client_id: id,
            title: title,
            description: description,
            start_date: startDate,
            estimation: estimatedTime,
            pay: pay,
            job_email: email,
        }).then(response => {
            alert('Job Posted')
            this.props.history.push('/')
        })
    }
    
    handleSearch = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    render() {
    return (
        <div className="job-form-container">
            {console.log(localStorage.getItem('userId'))}
            <h1>Create Job Posting</h1>
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <p>Title:</p><input type='text' name='title' onChange={(e) => this.handleSearch(e)} required/>
                <p>Description:</p><textarea type='text' rows='5' name='description' onChange={(e) => this.handleSearch(e)} required/>
                <p>Start:</p><input type='date' name='startDate' onChange={(e) => this.handleSearch(e)} required/>
                <p>Estimated Time:</p><input type='text' name='estimatedTime' onChange={(e) => this.handleSearch(e)} required/>
                <p>Pay: $</p><input type='text' name='pay' onChange={(e) => this.handleSearch(e)} required/>
                <p>Email:</p><input type='text' name='email' onChange={(e) => this.handleSearch(e)} required/>
                <br></br>
            <div>
                <button type="submit">Submit</button>
            </div>
            </form>
        </div>
        )
    }
}

export default JobForm;