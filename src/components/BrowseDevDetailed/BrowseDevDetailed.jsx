import React, { Component } from 'react';
import axios from 'axios';
import '../Profile/Profile';

class BrowseDevDetailed extends Component {
    constructor(){
        super();
        this.state = {
            devInfo: null
        }
    }

    componentDidMount(){
        setTimeout(() => {
        this.getInfo() 
        }, 700)
    }

    getInfo = () => {
        let userId = this.props.match.params.id
        axios.get(`/api/getdevprofile/${userId}`).then(res => {
            console.log(res.data)
            this.setState({devInfo: res.data})
        })
    }

    render() {
        let devInfo = this.state.devInfo
        return (
            <div className="profilep">
                {
                    devInfo !== null ?
                    <div className="profilec">
                        <img src={devInfo.profile_picture || 'https://cdn4.iconfinder.com/data/icons/ios-edge-glyph-12/25/User-Circle-512.png'} />
                        <h1>{devInfo.name}</h1>
                        <h2>{devInfo.title}</h2>
                        <h3>{devInfo.developer_email}</h3>
                        <p>{devInfo.overview}</p>
                        <div>
                            <div className="hourly-portfolio-parent">
                                <div className="child">
                                <p className="profile-category">Hourly rate: </p>
                                <p>${devInfo.hourly_rate}</p>
                                </div>
                                <div className="portfolio-child child">
                                    <p className="profile-category">Portfolio: </p>
                                    <p>{devInfo.portfolio}</p>
                                </div>
                            </div>
                            <div className="skills-education-parent">
                                <div className="child">
                                    <p className="profile-category">Skills: </p>
                                    <p>{devInfo.skills}</p>
                                </div>
                                <div className="child">
                                    <p className="profile-category">Education: </p>
                                    <p>{devInfo.education}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    :
                    <div>
                        <img src='http://www.vivo.com/themes/custom/vivo/img/loader.gif' />
                    </div>
                }
            </div>
        )
    }
}

export default BrowseDevDetailed