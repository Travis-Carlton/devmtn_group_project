import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import '../JobFeed/JobFeed.scss'

class Favorites extends Component {
    constructor(){
        super();
        this.state = {
            list: []
        }
    }
    componentDidMount(){
        setTimeout(() => {
        this.getUserFavorites()
        }, 700)
    }

    getUserFavorites = () => {
        let userId = localStorage.getItem('userId')
        console.log(userId)
        axios.get(`/api/getfavorite/${userId}`).then(res => {
            console.log(res)
            this.setState({list: res.data})
        })
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
        {
            this.props.loggedIn ?
            this.state.list.length > 0 && this.props.userID ?
            this.props.isDeveloper ?
            <div className='jobfeedp'>
                <h1 id="feed-title">Favorites</h1>
                {
                this.state.list.map(job => {
                    let num = job.description.split(' ').length
                    let splitDescription = job.description.split(' ')
                    let trimDescription = splitDescription.splice(0, ((splitDescription.length/1.5))).join(' ')
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
                }
            </div>
            :
                <div>
                    You do not have access to this page as a Client
                </div>
            :
            <div>
                <br /> <br /> <br /> <br /> <br />
                <img src='http://www.vivo.com/themes/custom/vivo/img/loader.gif' alt="loading"/>
                    Please make sure you have added something to your favoites
            </div>
            :
            <div>
                Please login to view favoites
            </div>
        }
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

export default connect(mapStateToProps)(Favorites);