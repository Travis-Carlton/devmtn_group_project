import React, { Component } from 'react';
import './NavBar.scss';
import {Link} from 'react-router-dom';
import axios from 'axios';

export default class NavBar extends Component {

login = () => {
        const redirecturi = encodeURIComponent(window.location.origin + '/auth/callback');
        const url = `https://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirecturi}&response_type=code`
        window.location = url;  
    }
    
logout = () => {
        axios.post('/api/logout').then(() => {
            this.props.updateShow(false)
            this.props.updateUser(null)
            this.props.alert.show('Logged Out')
    })
}

    render() {
        return (
            <div className='navbarp'>
                <div className='navbarc'>
                    <div className='navbarlogo'>
                        Logo
                    </div>
                    <div className="navbarcc">
                        <Link to='/'>Home</Link>
                        {/* a tags are place holders for visual */}
                        <button onClick={() => this.login()}>Log In/Sign Up</button>
                    </div>
                </div>
            </div>
        );
    }
}