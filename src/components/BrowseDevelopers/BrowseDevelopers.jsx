import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import './BrowseDevelopers.scss';
import {connect} from 'react-redux';
import Loading from '../../media/Loading.gif';

class BrowseDevelopers extends Component {
    constructor(){
        super();
        this.state = {
            developers: []
        }
    }

    componentDidMount(){
        setTimeout(() => {
        this.getDevelopers();
        }, 700)
    }

    getDevelopers = () => {
        axios.get('/api/getalldevelopers').then(res => {
            // console.log(res.data)
            this.setState({developers: res.data})
        })
    }

    

render() {
    return (
        <div className="developer-parent-container">
        {
            this.state.developers.length > 0 ?
            <div>
                <h1>Browse Developers</h1>
                <div className="developer-card-parent">
                {this.state.developers.map(devs => {
                    return <div key={devs.id}>
                        <div className="developer-card">
                            <div className="developer-card-details">
                                <img src={devs.profile_picture || 'https://cdn4.iconfinder.com/data/icons/ios-edge-glyph-12/25/User-Circle-512.png'} alt="profile"/>
                                <h2>{devs.name}</h2>
                                <p>{devs.skills}</p>
                            </div>
                            <div>
                                <Link to={`/devprofile/${devs.user_id}`}><button>View Developer</button></Link>
                            </div>
                        </div>
                    </div>
                    }
                )
                }
            </div>
            </div>
            :
            <div>
                <img src={Loading} alt="loading"/>
                {this.getDevelopers()}
            </div>
        }
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        userID: state.userID,
        profilePicture: state.profilePicture
    }
}

export default connect(mapStateToProps)(BrowseDevelopers);