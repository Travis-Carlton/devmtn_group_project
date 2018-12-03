import React, { Component } from 'react';
import './NavBar.scss';
import {Link} from 'react-router-dom';

export default class NavBar extends Component {
    constructor(){
        super();
        this.state = {
            showTabs: false,
        }
    }

    toggleTabs = ()=>{
        this.setState({
            showTabs: !this.state.showTabs
        })
    }

    render() {
        return (
            <div className='navbarp'>
                <div className='navbarc'>
                    <div className='navbarlogo'>
                        DevWay
                    </div>
                    <div className="navbarcc">
                        <Link to='/'>Home</Link>
                        {/* a tags are place holders for visual */}
                        <Link to='/#'>How It Works</Link>
                        <Link to='/login'>Log In/Sign Up</Link>
                        <Link to='/#'>Link</Link>
                        <Link to='/#'>Link</Link>
                    </div>
                        <button onClick={this.toggleTabs} className='mobiletab'>❖</button>
                        {this.state.showTabs &&
                        <div className="showtabs">
                            <div>
                                <Link to='/'>Home</Link>
                                <Link to='/#'>How It Works</Link>
                                <Link to='/login'>Log In/Sign Up</Link>
                                <Link to='/#'>Link</Link>
                                <Link to='/#'>Link</Link>
                            </div>
                        </div>}
                </div>
            </div>
        );
    }
}