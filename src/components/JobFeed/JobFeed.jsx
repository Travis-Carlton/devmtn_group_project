import React, { Component } from 'react';
import axios from 'axios';
import './JobFeed.scss';
import {Link} from 'react-router-dom';

class JobFeed extends Component {
constructor(){
    super();
    this.state = {
        jobs: []
    }
}

componentDidMount(){
    setTimeout(() => {
    axios.get('/api/getalljobs').then(res => {
        this.setState({jobs: res.data})
    })
    }, 500)
}

render() { 
    return (
        <div className='jobfeedp'>
            {
                this.state.jobs.length > 0 ?
                this.state.jobs.map(job => {
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
                :
                <div>
                    <img style={{margin: '0 auto'}} src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' />
                </div>
            }
        </div>
    )}
}

export default JobFeed;
