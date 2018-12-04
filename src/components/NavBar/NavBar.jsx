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
                        <Link to='/'>HOME</Link>
                        {/* a tags are place holders for visual */}
                        <Link to='/howitworks'>HOW IT WORKS</Link>
                        <p onClick={this.props.login}>LOG IN</p>
                        <Link to='/jobfeed'>JOB FEED</Link>
                        <Link to='/profile'>PROFILE</Link>
                    </div>
                        <button onClick={this.toggleTabs} className='mobiletab'>❖</button>
                        {this.state.showTabs &&
                            <div className="showtabs">
                                <div>
                                    <Link to='/'>HOME</Link>
                                    <Link to='/howitworks'>HOW IT WORKS</Link>
                                    <p onClick={this.props.login}>LOG IN</p>
                                    <Link to='/jobfeed'>JOB FEED</Link>
                                    <Link to='/profile'>PROFILE</Link>
                                </div>
                            </div>
                        }
                </div>
            </div>
        );
    }
}