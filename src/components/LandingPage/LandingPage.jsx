import React, { Component } from 'react';
import './LandingPage.scss';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';
import { updateIsDeveloper } from '../../redux/reducer';

class LandingPage extends Component {

    login = () => {
        const redirecturi = encodeURIComponent(window.location.origin + '/auth/callback');
        const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirecturi}&response_type=code`
        window.location = url;  
    }

    setDeveloper = (developer, id) => {
        
        axios.post('/api/devorclient', {developer, id})
        .then(() => {
            this.props.updateIsDeveloper(developer)
            console.log('Developer set')
        }).catch(error => {
            console.error('Error on setDeveloper', error)
        })
    }
    
    render() {
        let userId = localStorage.getItem('userId')
        console.log(userId)
        return (
            <div className='landingpagep'>
                <div className="landingpagec">
                    <div className='landingpagecc'>
                        <h1>DevWay</h1>
                        <h2>The best site for developers to meet clients</h2>
                        <div>
                            {console.log(this.props.loggedIn)}
                            {this.props.loggedIn?
                            <>
                                <Link to='/devwiz'><button onClick={() => this.setDeveloper(true, userId)}>Get started as developer</button></Link>
                                <button onClick={() => this.setDeveloper(false, userId)}>Get started as client</button>
                            </>
                            :
                            <button onClick={this.login}>Login/Sign Up</button>

                            }
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps(state){
    const {loggedIn} = state;
    return {
        loggedIn
    }
}



export default withRouter(connect(mapStateToProps, {updateIsDeveloper})(LandingPage))