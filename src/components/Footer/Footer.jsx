import React, { Component } from 'react';
import './Footer.scss';
import {Link} from 'react-router-dom';

export default class Footer extends Component {
    render() {
        return (
            <div className="footerp">
                <div className="footerc">
                    <a href="">Contact</a>
                    <Link to='/favorites' >Favorites</Link>
                </div>
            </div>
        );
    }
}