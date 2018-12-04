import React, { Component } from 'react';
import axios from 'axios';

class JobForm extends Component {
    handleSubmit = (e) => {
        e.preventDefault();
        const title = document.getElementById('title').value;
        const description = document.getElementById('description').value;
        const startDate = document.getElementById('startDate').value;
        const estimatedTime = document.getElementById('estimatedTime').value;
        const pay = document.getElementById('pay').value;
        // axios.post('/', {
        //     title = title,
        //     description = description,
        //     startDate = startDate,
        //     estimatedTime = estimatedTime,
        //     pay = pay,
        // }).then(response => {
        //    alert('hello')
        // })
    }

    render() {
    return (
        <div>
            <form>
                <br /> <br /> <br /> <br />
                <h1>Create Job Posting</h1> <br />
                Title: <input type='text' id='title' required/> <br />
                Description: <textarea type='text' rows='5' id='description' required/> <br />
                Start Date: <input type='date' id='startDate' required/> <br />
                Estimated Time: <input type='number' id='estimatedTime' required/> <br />
                Pay: <input type='number' id='pay' required/> <br />
                <button type="submit" onSubmit={(e) => this.handleSubmit(e)}>Submit</button>
            </form>
        </div>
        )
    }
}

export default JobForm;