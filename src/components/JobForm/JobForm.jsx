import React, { Component } from 'react';
import axios from 'axios';

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
            email: email,
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
        <div>
            {console.log(localStorage.getItem('userId'))}
            <form onSubmit={(e) => this.handleSubmit(e)}>
                <br /> <br /> <br /> <br />
                <h1>Create Job Posting</h1> <br />
                Title: <input type='text' name='title' onChange={(e) => this.handleSearch(e)} required/> <br />
                Description: <textarea type='text' rows='5' name='description' onChange={(e) => this.handleSearch(e)} required/> <br />
                Start Date: <input type='date' name='startDate' onChange={(e) => this.handleSearch(e)} required/> <br />
                Estimated Time: <input type='number' name='estimatedTime' onChange={(e) => this.handleSearch(e)} required/> <br />
                Pay: <input type='number' name='pay' onChange={(e) => this.handleSearch(e)} required/> <br />
                Email: <input type='number' name='email' onChange={(e) => this.handleSearch(e)} required/> <br />
                <button type="submit">Submit</button>
            </form>
        </div>
        )
    }
}

export default JobForm;