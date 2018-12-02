import React, { Component } from 'react';
import './NavBar.scss';
import {Link} from 'react-router-dom';

export default class NavBar extends Component {
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
                        <Link to='/login'>Log In/Sign Up</Link>
                    </div>
                </div>
            </div>
        );
    }
}