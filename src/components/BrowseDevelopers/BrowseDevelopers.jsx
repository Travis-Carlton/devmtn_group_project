import React, { Component } from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class BrowseDevelopers extends Component {
    constructor(){
        super();
        this.state = {
            developers: []
        }
    }

    componentDidMount(){
        this.getDevelopers();
    }

    getDevelopers = () => {
        axios.get('/api/getalldevelopers').then(res => {
            {console.log(res.data)}
            this.setState({developers: res.data})
        })
    }

render() {
    return (
        <div>
        {
            this.state.developers.length > 0 ?
            <div>
                <br /> <br /> <br /> <br />
                <h1>Browse Developers</h1>
                {this.state.developers.map(devs => {
                    return <div>
                    {
                        devs.skills ?
                            <div>
                                <Link to={`/devprofile/${devs.user_id}`}>
                                    <div>
                                        
                                        <img style={{'maxWith': 100, 'maxHeight': 100}}src={devs.profile_picture || 'https://cdn4.iconfinder.com/data/icons/ios-edge-glyph-12/25/User-Circle-512.png'} /> <br />
                                        {devs.user_id} <br />
                                        {devs.skills} <br />
                                        {devs.hourly_rate}
                                    </div>
                                </Link>
                            </div>
                        :
                        <div></div>
                    }
                    </div>
                })
                }
            </div>
            :
            <div>
                <img src='https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif' />
                {this.getDevelopers()}
            </div>
        }
        </div>
    )}
}

export default BrowseDevelopers;