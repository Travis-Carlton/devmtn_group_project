import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';

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
        }, 500)
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
    return (
        <div>
            {console.log(this.state.list)}
        {
            this.state.list.length > 0 && this.props.userID ?
            <div>
                {
                this.state.list.map(job => {
                    let num = job.description.split(' ').length
                    let splitDescription = job.description.split(' ')
                    let trimDescription = splitDescription.splice(0, ((splitDescription.length/1.5))).join(' ')
                    return <div onClick={() => {}}>
                    <br /> <br /> <br />
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
                }
            </div>
            :
            <div>
                <br /> <br /> <br /> <br /> <br />
                <img style={{margin: '0px auto'}} src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' />
                {/* PLease login before viewing watched tasks */}
            </div>
        }
        </div>
    )}
}

const mapStateToProps = (state) => {
    return {
        userID: state.userID
    }
}

export default connect(mapStateToProps)(Favorites);