import React, { Component } from 'react';
import axios from 'axios';
import './JobFeed.scss';
import {Link} from 'react-router-dom';

class JobFeed extends Component {
constructor(){
    super();
    this.state = {
        jobs: [{title: 'Loading....',
            description: '',
            estimation: '',
            pay: ''}]
    }
}

componentDidMount(){
    axios.get('/api/getalljobs').then(res => {
        this.setState({jobs: res.data})
    })
}

render() {
    let displayJobs = this.state.jobs.map(job => {
        let num = job.description.split(' ').length
        let splitDescription = job.description.split(' ')
        let trimDescription = splitDescription.splice(0, ((splitDescription.length/1.5))).join(' ')
        console.log(num)
        return <div onClick={() => {}}>
                <Link to={`/job/${job.job_id}`}>
                    <div>
                        <h1>{job.title}</h1>
                        { num > 15
                        ?
                        <p>{trimDescription}...</p>
                        :
                        <p>{job.description}</p>
                        }
                        <p>${job.pay}</p>
                    </div>
                </Link>
        </div>
    })
    return (
        <div>
            <br /> <br /> <br />
            {displayJobs}
        </div>
    )}
}

export default JobFeed;
