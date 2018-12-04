import React, { Component } from 'react';
import './JobFeed.scss';

class JobFeed extends Component {
constructor(){
    super();
    this.state = {
        jobs: [{title: 'test title1',
            description: 'test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description',
            start_date: 'test start date',
            estimation: 'test estimation',
            pay: 'test pay'},
            {title: 'test title2',
            description: 'test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description',
            start_date: 'test start date',
            estimation: 'test estimation',
            pay: 'test pay'},
            {title: 'test title3',
            description: 'test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description test description',
            start_date: 'test start date',
            estimation: 'test estimation',
            pay: 'test pay'}]
    }
}

componentDidMount(){
    axios.get('/').then(res => {
        this.setState({jobs: res.data})
    })
}

render() {
    let displayJobs = this.state.jobs.map(job => {
        let splitDescription = job.description.split(' ')
        let trimDescription = splitDescription.slice(10, (splitDescription.length-40)).join(' ')
        return <div>
            <h1>{job.title}</h1>
            <p>{trimDescription}...</p>
            <p>${job.pay}</p>
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
