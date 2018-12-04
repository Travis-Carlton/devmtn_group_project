import React, { Component } from 'react';
import axios from 'axios';

class DetailedJob extends Component {
    constructor(){
        super();
        this.state = {
            job: []
        }
    }
    componentDidMount(){
        axios.get( `/api/getselectedjob/${this.props.match.params.id}`).then(res => {
            console.log(res.data)
            this.setState({job: res.data})
        })
    }

    addFavorite = (userId, jobId) => {
        axios.post('/api/addfavorite', {user_id: userId, job_id: jobId}).then(res => {
            alert('Job added to favorites')
        })
    }

    render() {
        let {userID} = this.props;
        return (
            <div>
                <br /> <br /> <br />
                {
                    this.state.job.map(job => {
                        return <div>
                        <h2>{job.title}</h2>
                        <p>{job.description}</p>
                        <p>{job.start_date}</p>
                        <p>{job.estimation} Days</p>
                        <p>${job.pay}</p>
                        <button onClick={() => this.addFavorite(userID, job.job_id)}>Watch Post</button>
                        </div>
                    })
                }
                <br /> <br /> <br />
                {
                    this.state.job.map(job => {
                        return <div>
                        Posted By: <br />
                        <img src={job.picture} />
                        <h4>{job.profile_name}</h4>
                        <p>Contact: {job.email}</p>
                        </div>
                    })
                }
                {console.log(this.state.job)}
            </div>
        )}
}

export default DetailedJob;
