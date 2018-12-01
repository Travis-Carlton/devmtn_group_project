import React, { Component } from 'react';
import './LandingPage.scss';

export default class LandingPage extends Component {
    render() {
        return (
            <div className='landingpagep'>
                <div className="landingpagec">
                    <button>Get started as <br /> a developer</button>
                    <button>Get started as <br /> a client</button>
                </div>
            </div>
        );
    }
}