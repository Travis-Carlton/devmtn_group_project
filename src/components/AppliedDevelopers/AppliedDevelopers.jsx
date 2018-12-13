import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom';
import './AppliedDevelopers.scss'
import axios from 'axios';


class AppliedDevelopers extends Component {
    constructor(){
        super();
        this.state = {
            developers: []
        }
    }

    componentDidMount(){
        this.getAppliedDevelopers()
    }

    getAppliedDevelopers = () => {
        axios.get(`/api/getapplied/${this.props.match.params.id}`).then(res => {
            console.log(res.data)
            this.setState({developers: res.data})
        })
    }

    acceptDeveloper = (user_id, job_id) => {
        axios.post('/api/accept', {user_id, job_id}).then(res => {
            console.log('Hired Dev')
        })
    }



render() {
    const appliedDevelopers = this.state.developers.map(applicant => {
        return <div className="applied-developer-card">
            <img src={applicant.profile_picture} />
            <p>Name: {applicant.profile_name}</p>
            <p>Email: {applicant.email}</p>
            <Link to={`/devprofile/${applicant.user_id}`}><button>View Developer</button></Link>
            <button onClick={() => this.acceptDeveloper(applicant.user_id, applicant.job_id)}>Hire Developer</button>
        </div>
    })
    return (
        <div className="applied-container">
            {console.log('this.props.match.params', this.props.match.params)}
            <h1>Applied Developers</h1>
            <div className="applied-card-container">
                {appliedDevelopers}
            </div>
        </div>
    )
    }
}

export default withRouter(AppliedDevelopers);