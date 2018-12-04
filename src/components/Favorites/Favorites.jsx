import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Favorites extends Component {
    constructor(){
        super();
        this.state = {
            list: []
        }
    }
    componentDidMount(){
        axios.get(`/api/getfavorite/1`).then(res => {
            this.setState({list: res.data})
        })
    }

render() {
    return (
        <div>
        {
            this.state.list.length > 0 ?
            <div>
                {
                this.state.list.map(job => {
                    console.log(job)
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
            <div>LOADING...</div>
        }
        </div>
    )}
}

export default Favorites;