import React, { Component } from 'react';
import './DevWizard.scss';

export default class DevOrClient extends Component {

    continue = (e)=>{
        e.preventDefault();
        return window.location.assign('/jobfeed')
    }

    render() {
        return (
            <div className="devwizp">
                <form onSubmit={this.continue} className="devwizc">
                    <label>Title</label>
                    <input type="text" minLength='2' required/>
                    <br/>
                    <label>Overview</label>
                    <input type="text" minLength='2' required/>
                    <br/>
                    <label>Hourly rate</label>
                    <input type="number" required/>
                    <br/>
                    <label>Portfolio</label>
                    <input type="text" minLength='2' required/>
                    <br/>
                    <label>Skills</label>
                    <input type="text" minLength='2' required/>
                    <br/>
                    <label>Education</label>
                    <input type="text" minLength='2' required/>
                    <br/>
                    <button type='submit'>Submit</button>
                </form>
            </div>
        );
    }
}