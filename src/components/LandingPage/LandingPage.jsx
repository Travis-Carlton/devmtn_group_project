import React, { Component } from 'react';
import './LandingPage.scss';
import {connect} from 'react-redux';
import {Link, withRouter} from 'react-router-dom';

class LandingPage extends Component {
    
    render() {
        return (
            <div className='landingpagep'>
                <div className="landingpagec">
                    <div className='landingpagecc'>
                        <h1>DevWay</h1>
                        <h2>The best site for developers to meet clients</h2>
                        <div>
                            {!this.props.loggedIn?
                            <>
                                <Link to='/devwiz'><button>Get started as developer</button></Link>
                                <button>Get started as client</button>
                            </>
                            :
                            <button>Login/Sign Up</button>

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

export default withRouter(connect(mapStateToProps)(LandingPage))