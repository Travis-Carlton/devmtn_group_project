import React, { Component } from 'react';
import './LandingPage.scss';

export default class LandingPage extends Component {
    render() {
        return (
            <div className='landingpagep'>
                <div className="landingpagec">
                    <div className='landingpagecc'>
                        <h1>DevWay</h1>
                        <h2>The best site for developers to meet clients</h2>
                        <div>
                            <button>Get started as developer</button>
                            <button>Get started as client</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}