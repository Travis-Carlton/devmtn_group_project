import React, { Component } from 'react';
import axios from 'axios';
import './JobFeed.scss';
import {Link} from 'react-router-dom';
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import Loading from '../../media/Loading.gif';

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
    }, 700)
}

render() { 
    const {title, profilePicture, name} = this.props
    return (
        <div className="job-feed-container">
            <div className="job-profile">
                <img src={profilePicture} alt="profile"/>
                <h1>{name}</h1>
                <h2>{title}</h2>
            </div>
            <div className='jobfeedp'>
            <h1 id="feed-title">Job Feed</h1>
                {
                    this.state.jobs.length > 0 ?
                    this.state.jobs.map(job => {
                        let num = job.description.split(' ').length
                        let splitDescription = job.description.split(' ')
                        let trimDescription = splitDescription.slice(0, 20).join(' ')
                        return <div onClick={() => {}}>
        
                                    <div className="jobfeedc">
                                        <div>
                                            <h1>{job.title}</h1>
                                            { num > 15
                                            ?
                                            <p>{trimDescription}...</p>
                                            :
                                            <p>{job.description}</p>
                                            }
                                        </div>
                                            <p className="pay">${job.pay}</p>
                                        <Link to={`/job/${job.job_id}`} style={{ textDecoration: 'none' }}>
                                        <div>
                                            <button>View Job</button>
                                        </div>
                                        </Link>
                                    </div>
                        </div>
                    })
                    :
                    <div>
                        <img src={Loading} />
                    </div>
                }
            </div>
        </div>
    )}
}

function mapStateToProps(state) {
    const {
      loggedIn,
      isDeveloper,
      userID,
      title,
      profilePicture,
      name
    } = state;
    return {
      loggedIn,
      isDeveloper,
      userID,
      name,
      title,
      profilePicture
    };
  }

export default withRouter(connect(mapStateToProps)(JobFeed));
