import React, { Component } from 'react';
import {connect} from 'react-redux';
import DevFeed from '../JobFeed/JobFeed';
import ClientFeed from '../BrowseDevelopers/BrowseDevelopers';

class Feed extends Component {
render() {
    return (
        <div>
            {
                this.props.loggedIn ?
                this.props.isDeveloper ?
                    <DevFeed />
                    :
                    <ClientFeed />
                :
                <div>
                    Please Log in before viewing feed
                </div>
            }
        </div>
    )}
}

function mapStateToProps(state){
    const { loggedIn, isDeveloper } = state;
    return {
        loggedIn,
        isDeveloper
    }
}

export default connect(mapStateToProps)(Feed);