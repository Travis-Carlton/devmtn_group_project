import React, { Component } from 'react'
import './HowItWorks.scss';
import handshake from '../../media/business.jpg';
import computer from '../../media/computer.jpg';

export default class HowItWorks extends Component {
    render() {
        return (
            <div className="workscontainer">
                <div className="worksp">
                <h1 className="workstitle">How It Works</h1>
                <div></div>
                    <div className="worksc">
                        <h2>If you’re hiring</h2>
                        <h3>Easily find quality freelancers</h3>
                        <p>As a client on DevWay you’ll find a range of top talent, from developers to designers, programmers and more. Start by creating your job, and share some of the details and skills required. That project will be broadcast to our developers, helping you find the talent that is a good match.</p>
                        <h3>Hire the best freelancer</h3>
                        <p>As a client, you will see freelancers who have submitted requests to work on your project. You will be able to review the profiles, see portfolios, and background information on the freelancer before approving them to start on your job.</p>
                        <h2>Start getting your projects done today!</h2>
                    </div>
                    <img className="worksimg" src={handshake} alt="handshake"/>
                    <img className="worksimg" src={computer} alt="developer" />
                    <div className="worksc">
                        <h2>If you’re a developer</h2>
                        <h3>Find fulfilling projects</h3>
                        <p>As a developer, you will quickly grow your own freelance business through the great tools provided by DevWay. You are in charge of your own business on DevWay - you can choose your own clients and projects.</p>
                        <h3>Get hired</h3>
                        <p>DevWay makes it easy to connect with clients to begin working on great projects. In the Job Feed, numerous jobs are displayed and clients are excited to match with you to start working on those projects together. </p>
                        <h2>Start growing your freelance business today!</h2>
                    </div>
                </div>
            </div>
        )
    }
}
